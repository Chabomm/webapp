from sqlalchemy.orm import Session, aliased
from sqlalchemy import func, select, column, table, case, and_
from fastapi import Request
from inspect import currentframe as frame
import math
import re

from app.core import exceptions as ex
from app.core import util
from app.core.database import format_sql
from app.models.setting import *
from app.schemas.setting import *
from app.service.log_service import *

# 도메인_리스트
def domain_list(request: Request, page_param: PPage_param):
    request.state.inspect = frame()
    db = request.state.db

    sql = (
        db.query(
             T_SSL_DOMAIN.uid
            ,T_SSL_DOMAIN.domain
            ,T_SSL_DOMAIN.expire
            ,func.date_format(T_SSL_DOMAIN.create_at, '%Y-%m-%d %T').label('create_at')
            ,func.date_format(T_SSL_DOMAIN.update_at, '%Y-%m-%d %T').label('update_at')
            ,func.date_format(T_SSL_DOMAIN.delete_at, '%Y-%m-%d %T').label('delete_at')
        )
        .order_by(T_SSL_DOMAIN.expire.asc())
        .offset((page_param.page-1)*page_param.page_view_size)
        .limit(page_param.page_view_size)
    )

    format_sql(sql)

    rows = []
    for c in sql.all():
        rows.append(dict(zip(c.keys(), c)))

    # [ S ] 페이징 처리
    page_param.page_total = (
        db.query(T_SSL_DOMAIN)
        .count()
    )
    page_param.page_last = math.ceil(page_param.page_total / page_param.page_view_size)
    page_param.page_size = len(rows) # 현재 페이지에 검색된 수
    # [ E ] 페이징 처리

    jsondata = {}
    jsondata.update(page_param)
    jsondata.update({"list": rows})

    return jsondata

# 도메인_상세
def domain_read(request: Request, uid: int):
    request.state.inspect = frame()
    db = request.state.db
    sql = ( 
        db.query(
             T_SSL_DOMAIN.uid
            ,T_SSL_DOMAIN.domain
            ,T_SSL_DOMAIN.expire
            ,func.date_format(T_SSL_DOMAIN.create_at, '%Y-%m-%d %T').label('create_at')
            ,func.date_format(T_SSL_DOMAIN.update_at, '%Y-%m-%d %T').label('update_at')
            ,func.date_format(T_SSL_DOMAIN.delete_at, '%Y-%m-%d %T').label('delete_at')
        )
        .filter(T_SSL_DOMAIN.uid == uid)
    )
    format_sql(sql)
    return sql.first()

# 도메인_편집 - 등록
def domain_create(request: Request, sslDomainInput: SslDomainInput) :
    request.state.inspect = frame()
    db = request.state.db 
    user = request.state.user
    
    db_item = T_SSL_DOMAIN (
         domain = sslDomainInput.domain 
        ,expire = sslDomainInput.expire
    )
    db.add(db_item)
    db.flush()

    create_log(request, db_item.uid, "T_SSL_DOMAIN", "INSERT", "도메인 등록", 0, db_item.uid, "", "", user.user_id)
    request.state.inspect = frame()

    return db_item

# 도메인_편집 - 수정
def domain_update(request: Request, sslDomainInput: SslDomainInput) :
    request.state.inspect = frame()
    db = request.state.db 
    user = request.state.user

    res = db.query(T_SSL_DOMAIN).filter(T_SSL_DOMAIN.uid == sslDomainInput.uid).first()

    if res is None :
        raise ex.NotFoundUser
    
    if sslDomainInput.domain is not None and res.domain != sslDomainInput.domain : 
        create_log(request, sslDomainInput.uid, "T_SSL_DOMAIN", "domain", "도메인 주소"
                   , res.domain, sslDomainInput.domain, "", "", user.user_id)
        request.state.inspect = frame()
        res.domain = sslDomainInput.domain

    if sslDomainInput.expire is not None and res.expire != sslDomainInput.expire : 
        create_log(request, sslDomainInput.uid, "T_SSL_DOMAIN", "expire", "만료일"
                   , res.expire, sslDomainInput.expire, "", "", user.user_id)
        request.state.inspect = frame()
        res.expire = sslDomainInput.expire

    res.update_at = util.getNow()
    return res

# 도메인_편집 - 삭제
def domain_delete(request: Request, uid: int):
    request.state.inspect = frame()
    db = request.state.db
    user = request.state.user
    
    db_item = db.query(T_SSL_DOMAIN).filter(T_SSL_DOMAIN.uid == uid).first()

    db_item.delete_at = util.getNow()

    create_log(request, uid, "T_SSL_DOMAIN", "DELETE", "도메인 주소 삭제", 0, db_item.uid, "", "", user.user_id)
    request.state.inspect = frame()

    return db_item
