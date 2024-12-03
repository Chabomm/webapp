from sqlalchemy.orm import Session, aliased
from sqlalchemy import func, select, column, table, case, and_
from fastapi import Request
from inspect import currentframe as frame
import math
import re

from app.core import exceptions as ex
from app.core import util
from app.core.database import format_sql
from app.models.applink import *
from app.schemas.applink import *
from app.service.log_service import *

# 딥링크_상세
def applink_read(request: Request, uid: int):
    request.state.inspect = frame()
    db = request.state.db
    sql = ( 
        db.query(
             T_DEEP_LINK.uid
            ,T_DEEP_LINK.site_id
            ,T_DEEP_LINK.dlink_type
            ,T_DEEP_LINK.dlink_uid
            ,T_DEEP_LINK.mall_link
            ,T_DEEP_LINK.app_link
            ,T_DEEP_LINK.group_id
            ,T_DEEP_LINK.banner
            ,func.date_format(T_DEEP_LINK.create_at, '%Y-%m-%d %T').label('create_at')
            ,func.date_format(T_DEEP_LINK.update_at, '%Y-%m-%d %T').label('update_at')
            ,func.date_format(T_DEEP_LINK.delete_at, '%Y-%m-%d %T').label('delete_at')
            ,T_DEEP_LINK_GROUP.title
        )
        .join(
            T_DEEP_LINK_GROUP,
            T_DEEP_LINK_GROUP.uid == T_DEEP_LINK.group_id,
            isouter = True
        )
        .filter(T_DEEP_LINK.uid == uid)
    ).first()
    
    return dict(zip(sql.keys(), sql))


# 딥링크_편집 - 등록
def deeplink_create(request: Request, deepLinkInput: DeepLinkInput) :
    request.state.inspect = frame()
    db = request.state.db 
    user = request.state.user
    
    db_item = T_DEEP_LINK (
         site_id = deepLinkInput.site_id
        ,dlink_type = deepLinkInput.dlink_type
        ,dlink_uid = deepLinkInput.dlink_uid
        ,mall_link = deepLinkInput.mall_link
        ,app_link = deepLinkInput.app_link
        ,group_id = deepLinkInput.group_id
        ,banner = deepLinkInput.banner
    )
    db.add(db_item)
    db.flush()

    create_log(request, db_item.uid, "T_DEEP_LINK", "INSERT", "딥링크 등록", 0, db_item.uid, "", "", user.user_id)
    request.state.inspect = frame()

    return db_item

# 딥링크_편집 - 수정
def deeplink_update(request: Request, deepLinkInput: DeepLinkInput) :
    request.state.inspect = frame()
    db = request.state.db 
    user = request.state.user

    res = db.query(T_DEEP_LINK).filter(T_DEEP_LINK.uid == deepLinkInput.uid).first()

    if res is None :
        return ex.ReturnOK(404, "딥링크가 존재하지 않습니다. 확인 후 다시 시도해주세요.", request)

    if deepLinkInput.site_id is not None and res.site_id != deepLinkInput.site_id : 
        create_log(request, res.uid, "T_DEEP_LINK", "site_id", "프로젝트"
                   , res.site_id, deepLinkInput.site_id, "", "", user.user_id)
        request.state.inspect = frame()
        res.site_id = deepLinkInput.site_id

    if deepLinkInput.dlink_type is not None and res.dlink_type != deepLinkInput.dlink_type : 
        create_log(request, res.uid, "T_DEEP_LINK", "dlink_type", "dlink_type"
                   , res.dlink_type, deepLinkInput.dlink_type, "", "", user.user_id)
        request.state.inspect = frame()
        res.dlink_type = deepLinkInput.dlink_type

    if deepLinkInput.dlink_uid is not None and res.dlink_uid != deepLinkInput.dlink_uid : 
        create_log(request, res.uid, "T_DEEP_LINK", "dlink_uid", "링크 uid"
                   , res.dlink_uid, deepLinkInput.dlink_uid, "", "", user.user_id)
        request.state.inspect = frame()
        res.dlink_uid = deepLinkInput.dlink_uid

    if deepLinkInput.mall_link is not None and res.mall_link != deepLinkInput.mall_link : 
        create_log(request, res.uid, "T_DEEP_LINK", "mall_link", "mall 링크"
                   , res.mall_link, deepLinkInput.mall_link, "", "", user.user_id)
        request.state.inspect = frame()
        res.mall_link = deepLinkInput.mall_link

    if deepLinkInput.app_link is not None and res.app_link != deepLinkInput.app_link : 
        create_log(request, res.uid, "T_DEEP_LINK", "app_link", "app 링크"
                   , res.app_link, deepLinkInput.app_link, "", "", user.user_id)
        request.state.inspect = frame()
        res.app_link = deepLinkInput.app_link

    if deepLinkInput.group_id is not None and res.group_id != deepLinkInput.group_id : 
        create_log(request, res.uid, "T_DEEP_LINK", "group_id", "그룹 uid"
                   , res.group_id, deepLinkInput.group_id, "", "", user.user_id)
        request.state.inspect = frame()
        res.group_id = deepLinkInput.group_id

    if deepLinkInput.banner is not None and res.banner != deepLinkInput.banner : 
        create_log(request, res.uid, "T_DEEP_LINK", "banner", "배너 이미지"
                   , res.banner, deepLinkInput.banner, "", "", user.user_id)
        request.state.inspect = frame()
        res.banner = deepLinkInput.banner

    res.update_at = util.getNow()
    return res

# 딥링크_편집 - 삭제
def deeplink_delete(request: Request, uid: int):
    request.state.inspect = frame()
    db = request.state.db
    user = request.state.user
    
    db_item = db.query(T_DEEP_LINK).filter(T_DEEP_LINK.uid == uid).first()

    db_item.delete_at = util.getNow()

    create_log(request, uid, "T_DEEP_LINK", "DELETE", "딥링크 삭제", 0, db_item.uid, "", "", user.user_id)
    request.state.inspect = frame()

    return db_item


# 딥링크_리스트_편집 - 순서정렬
def deeplink_sort(request: Request, deepLinkInput: DeepLinkInput) :
    request.state.inspect = frame()
    db = request.state.db

    filters = []
    filters.append(getattr(T_DEEP_LINK, "group_id") == deepLinkInput.group_id)

    res = (
        db.query(
            T_DEEP_LINK
        )
        .filter(*filters)
        .all()
    )
    
    for c in res :
        for i in deepLinkInput.sort_array :
            if c.uid == i :
                c.sort = deepLinkInput.sort_array.index(i)+1
        print('c.sort',c.sort)
    return




# 딥링크_그룹_편집 - 등록
def deeplink_group_create(request: Request, deepLinkGroupInput: DeepLinkGroupInput) :
    request.state.inspect = frame()
    db = request.state.db 
    user = request.state.user
    
    db_item = T_DEEP_LINK_GROUP (
         title = deepLinkGroupInput.title
        ,site_id = deepLinkGroupInput.site_id
    )
    db.add(db_item)
    db.flush()

    create_log(request, db_item.uid, "T_DEEP_LINK_GROUP", "INSERT", "딥링크 그룹 등록", 0, db_item.uid, "", "", user.user_id)
    request.state.inspect = frame()

    return db_item

# 딥링크_그룹_편집 - 수정
def deeplink_group_update(request: Request, deepLinkGroupInput: DeepLinkGroupInput) :
    request.state.inspect = frame()
    db = request.state.db 
    user = request.state.user

    res = db.query(T_DEEP_LINK_GROUP).filter(T_DEEP_LINK_GROUP.uid == deepLinkGroupInput.uid).first()

    if res is None :
        return ex.ReturnOK(404, "그룹이 존재하지 않습니다.", request)

    if deepLinkGroupInput.site_id is not None and res.site_id != deepLinkGroupInput.site_id : 
        create_log(request, deepLinkGroupInput.uid, "T_DEEP_LINK_GROUP", "site_id", "프로젝트"
                   , res.site_id, deepLinkGroupInput.site_id, "", "", user.user_id)
        request.state.inspect = frame()
        res.site_id = deepLinkGroupInput.site_id

    if deepLinkGroupInput.title is not None and res.title != deepLinkGroupInput.title : 
        create_log(request, deepLinkGroupInput.uid, "T_DEEP_LINK_GROUP", "title", "제목"
                   , res.title, deepLinkGroupInput.title, "", "", user.user_id)
        request.state.inspect = frame()
        res.title = deepLinkGroupInput.title

    res.update_at = util.getNow()
    return res

# 딥링크_편집 - 삭제
def deeplink_group_delete(request: Request, uid: int):
    request.state.inspect = frame()
    db = request.state.db
    user = request.state.user
    
    db_item = db.query(T_DEEP_LINK_GROUP).filter(T_DEEP_LINK_GROUP.uid == uid).first()

    db_item.delete_at = util.getNow()

    create_log(request, uid, "T_DEEP_LINK_GROUP", "DELETE", "딥링크 그룹삭제", 0, db_item.uid, "", "", user.user_id)
    request.state.inspect = frame()

    return db_item

# 딥링크_그룹_상세
def dpplink_group_read(request: Request, uid: int):
    request.state.inspect = frame()
    db = request.state.db
    sql = ( 
        db.query(
             T_DEEP_LINK_GROUP.uid
            ,T_DEEP_LINK_GROUP.title
            ,T_DEEP_LINK_GROUP.site_id
            ,func.date_format(T_DEEP_LINK_GROUP.create_at, '%Y-%m-%d %T').label('create_at')
            ,T_DEEP_LINK_APP.site_name
            ,T_DEEP_LINK_APP.deep_link
            ,T_DEEP_LINK_APP.aos_store
            ,T_DEEP_LINK_APP.ios_store
        )
        .join(T_DEEP_LINK_APP,T_DEEP_LINK_APP.site_id == T_DEEP_LINK_GROUP.site_id)
        .filter(T_DEEP_LINK_GROUP.uid == uid)
        .filter(T_DEEP_LINK_GROUP.delete_at == None)
    )
    format_sql(sql)
    return sql.first()



# [ S ] ---------uha---------

# 딥링크 게시글 상세
def applink_posts(request: Request, uid:int):
    request.state.inspect = frame()
    db = request.state.db

    filters = []
    filters.append(getattr(T_DEEP_LINK, "delete_at") == None)
    filters.append(getattr(T_DEEP_LINK, "group_id") == uid)

    sql = (
        db.query(
             T_DEEP_LINK.uid
            ,T_DEEP_LINK.site_id
            ,T_DEEP_LINK.dlink_type
            ,T_DEEP_LINK.dlink_uid
            ,T_DEEP_LINK.mall_link
            ,T_DEEP_LINK.app_link
            ,T_DEEP_LINK.group_id
            ,T_DEEP_LINK.sort
            ,T_DEEP_LINK.banner
            ,func.date_format(T_DEEP_LINK.create_at, '%Y-%m-%d %T').label('create_at')
            ,func.date_format(T_DEEP_LINK.update_at, '%Y-%m-%d %T').label('update_at')
            ,func.date_format(T_DEEP_LINK.delete_at, '%Y-%m-%d %T').label('delete_at')
            ,T_DEEP_LINK_GROUP.title
        )
        .join(
            T_DEEP_LINK_GROUP,
            T_DEEP_LINK_GROUP.uid == T_DEEP_LINK.group_id,
            isouter = True
        )
        .filter(*filters)
        .order_by(T_DEEP_LINK.sort)
    )

    format_sql(sql)

    rows = []
    for c in sql.all():
        rows.append(dict(zip(c.keys(), c)))

    jsondata = {}
    jsondata.update({"list": rows})

    return jsondata

# 딥링크_그룹_리스트
def applink_group_list(request: Request, page_param: PPage_param):
    request.state.inspect = frame()
    db = request.state.db

    filters = []
    filters.append(getattr(T_DEEP_LINK_GROUP, "delete_at") == None)

    # [ S ] search filter start
    if page_param.filters :
        if page_param.filters["skeyword"] :
            if page_param.filters["skeyword_type"] != "" :
                filters.append(getattr(T_DEEP_LINK_GROUP, page_param.filters["skeyword_type"]).like("%"+page_param.filters["skeyword"]+"%"))
            else : 
                filters.append(
                    T_DEEP_LINK_GROUP.title.like("%"+page_param.filters["skeyword"]+"%") 
                )
        if page_param.filters["create_at"]["startDate"] and page_param.filters["create_at"]["endDate"] :
            filters.append(
                and_(
                    T_DEEP_LINK_GROUP.create_at >= page_param.filters["create_at"]["startDate"]
                    ,T_DEEP_LINK_GROUP.create_at <= page_param.filters["create_at"]["endDate"] + " 23:59:59"
                )
            )
        if page_param.filters["site_id"] :
            filters.append(T_DEEP_LINK_GROUP.site_id.in_(page_param.filters["site_id"]))
    # [ E ] search filter end

    sql = (
        db.query(
             T_DEEP_LINK_GROUP.uid
            ,T_DEEP_LINK_GROUP.title
            ,T_DEEP_LINK_GROUP.site_id
            ,func.date_format(T_DEEP_LINK_GROUP.create_at, '%Y-%m-%d %T').label('create_at')
            ,func.date_format(T_DEEP_LINK_GROUP.update_at, '%Y-%m-%d %T').label('update_at')
            ,func.date_format(T_DEEP_LINK_GROUP.delete_at, '%Y-%m-%d %T').label('delete_at')
        )
        .filter(*filters)
        .order_by(T_DEEP_LINK_GROUP.uid.desc())
        .offset((page_param.page-1)*page_param.page_view_size)
        .limit(page_param.page_view_size)
    )

    rows = []
    for c in sql.all():
        rows.append(dict(zip(c.keys(), c)))

    # [ S ] 페이징 처리
    page_param.page_total = (
        db.query(T_DEEP_LINK_GROUP)
        .filter(*filters)
        .count()
    )
    page_param.page_last = math.ceil(page_param.page_total / page_param.page_view_size)
    page_param.page_size = len(rows) # 현재 페이지에 검색된 수
    # [ E ] 페이징 처리

    jsondata = {}
    jsondata.update(page_param)
    jsondata.update({"list": rows})

    return jsondata

# 딥링크앱_상세정보
def deeplink_app_read(request: Request, deepLinkAppInput : DeepLinkAppInput):
    request.state.inspect = frame()
    db = request.state.db
    
    filters = []
    filters.append(getattr(T_DEEP_LINK, "delete_at") == None)
    filters.append(getattr(T_DEEP_LINK, "group_id") == deepLinkAppInput.group_uid)


    sql = (
        db.query(
             T_DEEP_LINK_APP.site_name
            ,T_DEEP_LINK_APP.deep_link 
            ,T_DEEP_LINK_APP.aos_store
            ,T_DEEP_LINK_APP.ios_store
            ,T_DEEP_LINK.uid
            ,T_DEEP_LINK.app_link
            ,T_DEEP_LINK.group_id
            ,T_DEEP_LINK.banner
            ,T_DEEP_LINK_GROUP.site_id
            ,T_DEEP_LINK_GROUP.title
        ) 
        .join(
            T_DEEP_LINK,
            T_DEEP_LINK.site_id == T_DEEP_LINK_APP.site_id,
            isouter = True
        ) 
        .join(
            T_DEEP_LINK_GROUP,
            T_DEEP_LINK_GROUP.uid == deepLinkAppInput.group_uid,
            isouter = True
        )
        .filter(*filters)
        .order_by(T_DEEP_LINK.sort.asc())
    )

    format_sql(sql)
    
    if sql is None :
        return ex.ReturnOK(405, "죄송합니다. 오류가 발생 하였습니다. 문제 지속시 문의 바랍니다.", request)
    
    rows = []
    for c in sql.all():
        rows.append(dict(zip(c.keys(), c)))

    jsondata = {}
    jsondata.update({"list": rows})

    return jsondata


# 딥링크_url
def app_link_read(request: Request, site_id: str):
    request.state.inspect = frame()
    db = request.state.db
    sql = ( 
        db.query(
             T_DEEP_LINK_APP.site_id
            ,T_DEEP_LINK_APP.deep_link
        )
        .filter(T_DEEP_LINK_APP.site_id == site_id)
    )
    format_sql(sql)
    return sql.first()
    
# [ E ] uha 추가