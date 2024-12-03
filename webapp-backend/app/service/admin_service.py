from sqlalchemy.orm import Session, aliased
from sqlalchemy import func, select, column, table, case
from fastapi import Request
from inspect import currentframe as frame
from fastapi.encoders import jsonable_encoder
import math

from app.core import exceptions as ex
from app.core import util
from app.core.database import format_sql
from app.models.member import *
from app.models.board import *
from app.models.display import *
from app.schemas.auth import *
from app.schemas.member import *
from app.schemas.board import *
from app.deps.auth import get_password_hash
from app.service.log_service import *

def admin_user_list(request: Request, page_param: PPage_param):
    request.state.inspect = frame()
    db = request.state.db

    # sql = (
    #     db.query(
    #         T_MEMBER.uid
    #         ,T_MEMBER.user_id
    #         ,T_MEMBER.user_name
    #         ,T_MEMBER.mobile
    #         ,T_MEMBER.email
    #         ,T_MEMBER.role
    #         ,T_MEMBER.depart
    #         ,func.date_format(T_MEMBER.create_at, '%Y-%m-%d %T').label('create_at')
    #         ,T_MEMBER.site_id
    #         ,T_MEMBER.state
    #         ,T_MEMBER.roles
    #     )
    #     .order_by(T_MEMBER.uid.desc())
    #     .offset((page_param.page-1)*page_param.page_view_size)
    #     .limit(page_param.page_view_size)
    # )

    # format_sql(sql)

    # rows = []
    # for c in sql.all():
    #     rows.append(dict(zip(c.keys(), c)))

    # # [ S ] 페이징 처리
    # page_param.page_total = (
    #     db.query(T_MEMBER)
    #     .count()
    # )
    # page_param.page_last = math.ceil(
    #     page_param.page_total / page_param.page_view_size)
    # page_param.page_size = len(rows)  # 현재 페이지에 검색된 수
    # # [ E ] 페이징 처리

    # jsondata = {}
    # jsondata.update(page_param)
    # jsondata.update({"list": rows})

    
    sql = """
        SELECT 
             uid
            ,user_id
            ,user_name
            ,mobile
            ,email
            ,role
            ,depart
            ,DATE_FORMAT(create_at, '%Y-%m-%d %T') as create_at
            ,state
            ,roles
            ,( 
                select GROUP_CONCAT(name SEPARATOR ', ') AS result  
                From T_ADMIN_ROLE 
                where uid MEMBER OF(roles->>'$')
            ) as roles_txt
        FROM T_MEMBER
        WHERE delete_at is NULL
        ORDER BY uid DESC
        LIMIT {start}, {end}
    """.format(start=(page_param.page-1)*page_param.page_view_size, end=page_param.page_view_size)

    print(sql)

    res = db.execute(text(sql)).fetchall()

    rows = []
    for c in res :
        rows.append(dict(zip(c.keys(), c)))

    page_param.page_total = db.execute(text("select count(uid) as cnt from T_MEMBER where delete_at is NULL")).scalar()

    page_param.page_last = math.ceil(
        page_param.page_total / page_param.page_view_size)
    page_param.page_size = len(rows) 

    jsondata = {}
    jsondata.update(page_param)
    jsondata.update({"list": rows})

    return jsondata

def admin_user_read(request: Request, uid: int = 0, user_id: str = ""):
    request.state.inspect = frame()
    db = request.state.db

    filters = []
    if uid > 0:
        filters.append(getattr(T_MEMBER, "uid") == uid)
    elif user_id != "":
        filters.append(getattr(T_MEMBER, "user_id") == user_id)
    else:
        return {
            "dd": "dd"
        }

    sql = (
        db.query(
            T_MEMBER.uid
            ,T_MEMBER.user_id
            ,T_MEMBER.user_pw
            ,T_MEMBER.user_name
            ,T_MEMBER.mobile
            ,T_MEMBER.email
            ,T_MEMBER.tel
            ,T_MEMBER.role
            ,T_MEMBER.depart
            ,T_MEMBER.create_at
            ,T_MEMBER.site_id
            ,T_MEMBER.state
            ,T_MEMBER.roles
        )
        .filter(*filters)
    )
    format_sql(sql)
    res = sql.first()
    if res is not None:
        res = dict(zip(res.keys(), res))
    return res

def admin_user_edit(request: Request, member: Member):
    request.state.inspect = frame()
    db = request.state.db
    user = request.state.user

    # 기존 등록된 상품 select
    res = db.query(T_MEMBER).filter(T_MEMBER.uid == member.uid).first()

    if res is None:
        raise ex.NotFoundUser

    if member.user_pw is not None and member.user_pw != "":
        create_log(request, member.uid, "T_MEMBER", "user_pw",
                   "비밀번호", "비밀번호", "변경", "", "", user.user_id)
        request.state.inspect = frame()
        res.user_pw = get_password_hash(member.user_pw)

    if member.user_name is not None and res.user_name != member.user_name:
        create_log(request, member.uid, "T_MEMBER", "user_name", "이름",
                   res.user_name, member.user_name, "", "", user.user_id)
        request.state.inspect = frame()
        res.user_name = member.user_name

    if member.mobile is not None and res.mobile != member.mobile:
        create_log(request, member.uid, "T_MEMBER", "mobile", "연락처",
                   res.mobile, member.mobile, "", "", user.user_id)
        request.state.inspect = frame()
        res.mobile = member.mobile

    if member.email is not None and res.email != member.email:
        create_log(request, member.uid, "T_MEMBER", "email", "이메일",
                   res.email, member.email, "", "", user.user_id)
        request.state.inspect = frame()
        res.email = member.email

    if member.tel is not None and res.tel != member.tel:
        create_log(request, member.uid, "T_MEMBER", "tel", "연락처",
                   res.tel, member.tel, "", "", user.user_id)
        request.state.inspect = frame()
        res.tel = member.tel

    if member.role is not None and res.role != member.role:
        create_log(request, member.uid, "T_MEMBER", "role", "권한",
                   res.role, member.role, "", "", user.user_id)
        request.state.inspect = frame()
        res.role = member.role

    if member.depart is not None and res.depart != member.depart:
        create_log(request, member.uid, "T_MEMBER", "depart", "부서",
                   res.depart, member.depart, "", "", user.user_id)
        request.state.inspect = frame()
        res.depart = member.depart

    if member.state is not None and res.state != member.state:
        create_log(request, member.uid, "T_MEMBER", "state", "상태",
                   res.state, member.state, "", "", user.user_id)
        request.state.inspect = frame()
        res.state = member.state

    if member.roles is not None and res.roles != member.roles:
        create_log(request, member.uid, "T_MEMBER", "roles", "권한",
                   res.roles, member.roles, "", "", user.user_id)
        request.state.inspect = frame()
        res.roles = member.roles

    return res

def admin_user_create(request: Request, member: Member):
    request.state.inspect = frame()
    db = request.state.db

    user_data = admin_user_read(request, 0, member.user_id)
    request.state.inspect = frame()

    if user_data is not None:
        return ex.ReturnOK(300, "이미 등록된 아이디 입니다.", request)

    db_item = T_MEMBER(
        user_id=member.user_id, user_name=member.user_name, user_pw=get_password_hash(member.user_pw)
        , mobile=member.mobile, email=member.email, tel=member.tel, role=member.role, depart=member.depart
        , state=member.state, site_id="admin", roles=member.roles
    )
    db.add(db_item)
    db.flush()

    return db_item


# 관리자 역할 전체 리스트
def admin_rols_list(request: Request):
    request.state.inspect = frame()
    db = request.state.db

    # filters = []
    # sql = (
    #     db.query(
    #         T_ADMIN_ROLE.uid
    #         ,T_ADMIN_ROLE.name
    #         ,T_ADMIN_ROLE.menus
    #     )
    #     .filter(*filters)
    # )

    # return sql.all()
    
    
    sql = """
        SELECT 
            uid
            ,name
            ,menus
            ,( 
                select GROUP_CONCAT(name SEPARATOR ', ') AS result  
                From T_ADMIN_MENU 
                where uid MEMBER OF(menus->>'$')
            ) as roles_txt 
        FROM T_ADMIN_ROLE
        ORDER BY uid DESC
    """.format()
    print(sql)

    res = db.execute(text(sql)).fetchall()

    rows = []
    for c in res :
        rows.append(dict(zip(c.keys(), c)))

    jsondata = {}
    jsondata.update({"list": rows})

    return jsondata

    





# 관리자_역할관리_리스트_필터조건
def menu_list_for_filter(request: Request):
    request.state.inspect = frame()
    db = request.state.db
    
    jsondata = {}
    sql1 = (
        db.query(
             T_ADMIN_MENU.uid
            ,T_ADMIN_MENU.name
            ,T_ADMIN_MENU.depth
            ,T_ADMIN_MENU.parent
        )
        .filter(T_ADMIN_MENU.depth == 1)
        .order_by(T_ADMIN_MENU.sort.asc())
    )
    depth1 = []
    for c in sql1.all() :
        depth1.append(dict(zip(c.keys(), c)))
    jsondata.update({"depth1": depth1})
    sql2 = (
        db.query(
             T_ADMIN_MENU.uid
            ,T_ADMIN_MENU.name
            ,T_ADMIN_MENU.depth
            ,T_ADMIN_MENU.parent
        )
        .filter(T_ADMIN_MENU.depth == 2)
        .order_by(T_ADMIN_MENU.sort.asc())
    )
    depth2 = []
    for c in sql2.all() :
        depth2.append(dict(zip(c.keys(), c)))
    jsondata.update({"depth2": depth2})
    return jsondata

    # filters = []
    # filters.append(getattr(T_ADMIN_MENU, "depth") == 2)

    # sql = (
    #     db.query(
    #         T_ADMIN_MENU.uid
    #         ,T_ADMIN_MENU.name
    #         ,T_ADMIN_MENU.depth
    #         ,T_ADMIN_MENU.parent
    #     )
    #     .filter(*filters)
    #     .order_by(T_ADMIN_MENU.parent.asc())
    # )

    # return sql.all()

# 관리자 메뉴설정 리스트
def admin_menu_list(request: Request, parent: int):
    request.state.inspect = frame()
    db = request.state.db

    filters = []
    if parent > 0:
        filters.append(getattr(T_ADMIN_MENU, "depth") == 2)
        filters.append(getattr(T_ADMIN_MENU, "parent") == parent)
    else :
        filters.append(getattr(T_ADMIN_MENU, "depth") == 1)

    sql = (
        db.query(
             T_ADMIN_MENU.uid
            ,T_ADMIN_MENU.name
            ,T_ADMIN_MENU.icon
            ,T_ADMIN_MENU.to
            ,T_ADMIN_MENU.sort
            ,T_ADMIN_MENU.depth
            ,T_ADMIN_MENU.parent
        )
        .filter(*filters)
        .order_by(T_ADMIN_MENU.sort.asc())
    )

    return sql.all()

# 관리자 메뉴설정 - 상세
def admin_menu_read(request: Request, uid: int):
    request.state.inspect = frame()
    db = request.state.db
    
    sql = (
        db.query(
             T_ADMIN_MENU.uid
            ,T_ADMIN_MENU.name
            ,T_ADMIN_MENU.icon
            ,T_ADMIN_MENU.to
            ,T_ADMIN_MENU.sort
            ,T_ADMIN_MENU.parent
            ,T_ADMIN_MENU.depth
        )
        .filter(T_ADMIN_MENU.uid == uid)
    )
    format_sql(sql)
    return sql.first()

# 어드민메뉴_편집 - 등록
def admin_menu_create(request: Request, adminMenuInput: AdminMenuInput) :
    request.state.inspect = frame()
    db = request.state.db 
    user = request.state.user

    db_item = T_ADMIN_MENU (
         name = adminMenuInput.name
        ,icon = adminMenuInput.icon
        ,to = adminMenuInput.to
        ,depth = adminMenuInput.depth
        ,parent = adminMenuInput.parent
    )
    db.add(db_item)
    db.flush()

    create_log(request, db_item.uid, "T_ADMIN_MENU", "INSERT", "어드민 메뉴 등록", 0, db_item.uid, "", "", user.user_id)
    request.state.inspect = frame()

    return db_item

# 어드민메뉴_편집 - 수정
def admin_menu_update(request: Request, adminMenuInput: AdminMenuInput) :
    request.state.inspect = frame()
    db = request.state.db 
    user = request.state.user

    res = db.query(T_ADMIN_MENU).filter(T_ADMIN_MENU.uid == adminMenuInput.uid).first()

    if res is None :
        raise ex.NotFoundUser

    if adminMenuInput.name is not None and res.name != adminMenuInput.name : 
        create_log(request, adminMenuInput.uid, "T_ADMIN_MENU", "name", "메뉴명", res.name, adminMenuInput.name, "", "", user.user_id)
        request.state.inspect = frame()
        res.name = adminMenuInput.name

    if adminMenuInput.icon is not None and res.icon != adminMenuInput.icon : 
        create_log(request, adminMenuInput.uid, "T_ADMIN_MENU", "icon", "아이콘", res.icon, adminMenuInput.icon, "", "", user.user_id)
        request.state.inspect = frame()
        res.icon = adminMenuInput.icon

    if adminMenuInput.to is not None and res.to != adminMenuInput.to : 
        create_log(request, adminMenuInput.uid, "T_ADMIN_MENU", "to", "링크", res.to, adminMenuInput.to, "", "", user.user_id)
        request.state.inspect = frame()
        res.to = adminMenuInput.to

    return res

# 어드민메뉴_편집 - 순서정렬
def admin_menu_sort(request: Request, adminMenuInput: AdminMenuInput) :
    request.state.inspect = frame()
    db = request.state.db

    filters = []
    if adminMenuInput.parent > 0:
        filters.append(getattr(T_ADMIN_MENU, "parent") == adminMenuInput.parent)
    else :
        filters.append(getattr(T_ADMIN_MENU, "depth") == 1)

    res = (
        db.query(
            T_ADMIN_MENU
        )
        .filter(*filters)
        .all()
    )
    
    for c in res :
        for i in adminMenuInput.sort_array :
            if c.uid == i :
                c.sort = adminMenuInput.sort_array.index(i)+1

    return









# 관리자 역할관리 - 상세
def admin_roles_read(request: Request, uid: int):
    request.state.inspect = frame()
    db = request.state.db
    
    sql = (
        db.query(
             T_ADMIN_ROLE.uid
            ,T_ADMIN_ROLE.name
            ,T_ADMIN_ROLE.menus
        )
        .filter(T_ADMIN_ROLE.uid == uid)
    )
    format_sql(sql)
    res = sql.first()
    if res is not None:
        res = dict(zip(res.keys(), res))
    return res

# 관리자 역할관리_편집 - 등록
def admin_roles_create(request: Request, adminRolesInput: AdminRolesInput) :
    request.state.inspect = frame()
    db = request.state.db 
    user = request.state.user

    db_item = T_ADMIN_ROLE (
         name = adminRolesInput.name
        ,menus = adminRolesInput.menus
    )
    db.add(db_item)
    db.flush()

    create_log(request, db_item.uid, "T_ADMIN_ROLE", "INSERT", "어드민 역할관리 등록", 0, db_item.uid, "", "", user.user_id)
    request.state.inspect = frame()

    return db_item

# 관리자 역할관리_편집 - 수정
def admin_roles_update(request: Request, adminRolesInput: AdminRolesInput) :
    request.state.inspect = frame()
    db = request.state.db 
    user = request.state.user

    res = db.query(T_ADMIN_ROLE).filter(T_ADMIN_ROLE.uid == adminRolesInput.uid).first()

    if res is None :
        raise ex.NotFoundUser

    if adminRolesInput.name is not None and res.name != adminRolesInput.name : 
        create_log(request, adminRolesInput.uid, "T_ADMIN_ROLE", "name", "메뉴명",
                    res.name, adminRolesInput.name, "", "", user.user_id)
        request.state.inspect = frame()
        res.name = adminRolesInput.name

    if adminRolesInput.menus is not None and res.menus != adminRolesInput.menus : 
        create_log(request, adminRolesInput.uid, "T_ADMIN_ROLE", "menus", "배정된 메뉴 uids",
                    res.menus, adminRolesInput.menus, "", "", user.user_id)
        request.state.inspect = frame()
        res.menus = adminRolesInput.menus

    return res

# 관리자 역할관리_편집 - 삭제  
def admin_roles_delete(request: Request, uid: int):
    request.state.inspect = frame()
    db = request.state.db
    user = request.state.user

    db.query(T_ADMIN_ROLE).filter(T_ADMIN_ROLE.uid == uid).delete()

    create_log(request, uid, "T_ADMIN_ROLE", "DELETE", "관리자 역할관리 삭제", 0, uid, "", "", user.user_id)
    request.state.inspect = frame()

    return

# 내 정보 보기
def info_read(request: Request):
    request.state.inspect = frame()
    db = request.state.db
    user = request.state.user

    sql = (
        db.query(
             T_MEMBER.uid
            ,T_MEMBER.user_id
            ,T_MEMBER.user_name
            ,T_MEMBER.mobile
            ,T_MEMBER.email
            ,T_MEMBER.tel
            ,T_MEMBER.depart
            ,T_MEMBER.create_at
            ,T_MEMBER.site_id
            ,T_MEMBER.state
        )
        .filter(T_MEMBER.user_id == user.user_id)
    )
    format_sql(sql)
    res = sql.first()
    if res is not None:
        res = dict(zip(res.keys(), res))
    return res


# 내 정보 보기 - 수정
def info_update(request: Request, myInfoInput: MyInfoInput) :
    request.state.inspect = frame()
    db = request.state.db 
    user = request.state.user

    res = db.query(T_MEMBER).filter(T_MEMBER.user_id == user.user_id).first()

    if res is None :
        raise ex.NotFoundUser

    if myInfoInput.user_pw is not None and res.user_pw != myInfoInput.user_pw : 
        create_log(request, res.uid, "T_MEMBER", "user_pw", "비밀번호", res.user_pw, myInfoInput.user_pw, "", "", user.user_id)
        request.state.inspect = frame()
        res.user_pw = myInfoInput.user_pw

    if myInfoInput.tel is not None and res.tel != myInfoInput.tel : 
        create_log(request, res.uid, "T_MEMBER", "tel", "내선번호", res.tel, myInfoInput.tel, "", "", user.user_id)
        request.state.inspect = frame()
        res.tel = myInfoInput.tel

    if myInfoInput.mobile is not None and res.mobile != myInfoInput.mobile : 
        create_log(request, res.uid, "T_MEMBER", "mobile", "핸드폰번호", res.mobile, myInfoInput.mobile, "", "", user.user_id)
        request.state.inspect = frame()
        res.mobile = myInfoInput.mobile

    res.update_at = util.getNow()

    return res