from fastapi import Request
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from typing import Optional
from inspect import currentframe as frame
from sqlalchemy.dialects import mysql as mysql_dialetct
from pymysql.converters import conversions, escape_item, encoders
from sqlalchemy import select, update, delete, Table, MetaData

from app.schemas.auth import *
from app.models.member import *
from app.models.session import *
from app.core import util
from app.core.database import format_sql
# from app.deps.auth import verify_password

# 유저 정보 by user_id
def read_by_userid(request: Request, user_id:str):
    request.state.inspect = frame()
    db = request.state.db 
    sql = db.query(T_MEMBER).filter(T_MEMBER.user_id == user_id)
    format_sql(sql)
    return sql.first()

# 유저 password 정보 by user_id
def read_pw_by_userid(request: Request, user_id:str):
    request.state.inspect = frame()
    db = request.state.db 
    sql = db.query(T_MEMBER).filter(T_MEMBER.user_id == user_id)
    format_sql(sql)
    res = sql.first()
    return str(res.user_pw)


# 유저 정보 get
def read(request: Request, site_id:str, user_idx: str, user_id: str):
    request.state.inspect = frame()
    db = request.state.db 
    sql = (
        db.query(T_MEMBER)
        .filter(
             T_MEMBER.user_id == user_id
            ,T_MEMBER.user_idx == user_idx
            ,T_MEMBER.site_id == site_id
        )
    )
    format_sql(sql)
    return sql.first()

def subquerytest(request: Request) :
    request.state.inspect = frame()
    db = request.state.db 

	# (select access_token from T_SESSION where user_uid = T_MEMBER.uid)
    stmt = db.query(T_SESSION.access_token.label("uid_token"), T_SESSION.user_uid).subquery()
    stmt2 = db.query(T_SESSION.access_token.label("id_token"), T_SESSION.user_id).subquery()

    sql = (
        db.query(
            T_MEMBER.uid, 
            T_MEMBER.user_id, 
            T_MEMBER.user_name,
            stmt.c.uid_token,
            stmt2.c.id_token
        )
        .join(
            stmt, 
            T_MEMBER.uid == stmt.c.user_uid,
            isouter = True 
        )
        .join(
            stmt2, 
            T_MEMBER.user_id == stmt2.c.user_id,
            isouter = True 
        )
    )
    format_sql(sql)
    return sql.all()

# 세션 insert
def create_session(request: Request, session_param: T_SESSION):
    request.state.inspect = frame()
    db = request.state.db 

    delete_session(request, session_param.user_uid)
    
    db_item = session_param 
    db.add(db_item)
    db.flush()
    return db_item

# 세션 delete
def delete_session(request: Request, user_uid: int):
    request.state.inspect = frame()
    db = request.state.db 
    return db.query(T_SESSION).filter(T_SESSION.user_uid == user_uid).delete()

# 세선 select
def read_session(request: Request, session_uid: Optional[int] = None, access_token: Optional[str] = None):
    request.state.inspect = frame()
    db = request.state.db 

    filters = []
    if session_uid is not None and session_uid > 0 :
        filters.append(getattr(T_SESSION, "uid") == session_uid)
    elif access_token is not None and access_token != "" :
        filters.append(getattr(T_SESSION, "access_token") == access_token)

    if len(filters) == 0 :
        return None

    sql = db.query(T_SESSION).filter(*filters)
    format_sql(sql)
    return sql.first()



def get_admin_menus(request: Request, user_uid: int, user: T_MEMBER) :
    request.state.inspect = frame()
    db = request.state.db
    user = request.state.user
    
    # [ S ] 관리자의 roles
    if user.token_name == "WEBAPP-ADMIN" : # 어드민
        user_roles = (
            db.query(T_MEMBER.roles)
            .filter(T_MEMBER.uid == user_uid)
        ).first()
    # [ E ] 관리자의 roles

    # 역할의 menus
    dict_roles = dict(user_roles)
    if len(dict_roles["roles"]) > 0 :
        roles_to_menus = ( # 역할의 메뉴 리스트
            db.query(T_ADMIN_ROLE.menus)
            .filter(T_ADMIN_ROLE.uid.in_(user_roles.roles))
        )

        my_menus = [] # 역할의 메뉴 리스트를 한 배열에 담기
        for c in roles_to_menus.all() :
            row = dict(zip(c.keys(), c))
            my_menus = my_menus + row["menus"]

        my_menus.append(51) # 정보수정 메뉴 고정

        sql = (
            db.query(
                T_ADMIN_MENU.uid
                ,T_ADMIN_MENU.name
                ,T_ADMIN_MENU.icon
            )
            .filter(T_ADMIN_MENU.uid.in_(my_menus))
        )

    # roles to 2depth menus
    filters = []
    if user.role != "admin" :
        filters.append(getattr(T_ADMIN_MENU, "uid").in_(my_menus))

    sql2 = (
        db.query(
             T_ADMIN_MENU.uid
            ,T_ADMIN_MENU.name
            ,T_ADMIN_MENU.to
            ,T_ADMIN_MENU.sort
            ,T_ADMIN_MENU.parent
        )
        .filter(*filters)
        .order_by(T_ADMIN_MENU.sort.asc())
    )

    depth1s = []
    for c in sql2.all():
        is_due = False # 중복이 안된다고 가정
        for d1 in depth1s :
            if d1 == c.parent :
                is_due =  True # 이미 추가된 1depth 메뉴
        if not is_due :
            depth1s.append(c.parent)

    # 1depth menu
    sql = (
        db.query(
             T_ADMIN_MENU.uid
            ,T_ADMIN_MENU.name
            ,T_ADMIN_MENU.icon
            ,T_ADMIN_MENU.sort
        )
        .filter(T_ADMIN_MENU.uid.in_(depth1s))
        .order_by(T_ADMIN_MENU.sort.asc())
    )

    # from app.core.database import format_sql
    # format_sql(sql)

    rows = []
    for c in sql.all():
        column_json = dict(zip(c.keys(), c))
        column_json["children"] = []

        for cc in sql2.all():
            if cc.parent == c.uid :
                d2_json = dict(zip(cc.keys(), cc))
                column_json["children"].append(d2_json)

        rows.append(column_json)
    
    jsondata = {}
    jsondata.update({"admin_menus": rows})

    return jsondata