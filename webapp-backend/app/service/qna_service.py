from sqlalchemy.orm import Session, aliased
from sqlalchemy import func, select, column, table, case
from fastapi import Request
from inspect import currentframe as frame
from fastapi.encoders import jsonable_encoder
import math

from app.core import util
from app.core.database import format_sql
from app.models.qna import *
from app.schemas.qna import *

def count(request: Request):
    request.state.inspect = frame()
    db = request.state.db 
    return db.query(T_QNA).filter(T_QNA.uid!=0).count()

def create(request: Request, qna: T_QNA):
    request.state.inspect = frame()
    db = request.state.db 
    db_item = T_QNA (
         title = qna.title
        ,contents = qna.contents
        ,user_name = qna.user_name
        ,com_name = qna.com_name
        ,email = qna.email
        ,mobile = qna.mobile
        ,post = qna.post
        ,addr = qna.addr
        ,addrDetail = qna.addrDetail
        ,reg_ip = util.getClientIP()
    )
    db.add(db_item)
    db.flush()
    return db_item

def readlist(request: Request, page_param: PPage_param):
    request.state.inspect = frame()
    db = request.state.db
    
    sql = (
        db.query(
             T_QNA.uid
            ,T_QNA.title
            ,T_QNA.contents
            ,T_QNA.user_name
            ,T_QNA.com_name
            ,T_QNA.email
            ,T_QNA.mobile
            ,T_QNA.post
            ,T_QNA.addr
            ,T_QNA.addrDetail
            ,T_QNA.reg_ip
            ,T_QNA.reg_date
        )
        .order_by(T_QNA.uid.desc())
        .offset((page_param.page-1)*page_param.page_view_size)
        .limit(page_param.page_view_size)
    )

    format_sql(sql)

    rows = []
    for c in sql.all():
        rows.append(dict(zip(c.keys(), c)))

    # [ S ] 페이징 처리
    page_param.page_total = (
        db.query(T_QNA)
        .count()
    )
    page_param.page_last = math.ceil(page_param.page_total / page_param.page_view_size)
    page_param.page_size = len(rows) # 현재 페이지에 검색된 수
    # [ E ] 페이징 처리

    jsondata = {}
    jsondata.update(page_param)
    jsondata.update({"list": rows})

    return jsondata

def read(request: Request, uid: int):
    request.state.inspect = frame()
    db = request.state.db
    sql = (
        db.query(
            T_QNA
        )
        .filter(T_QNA.uid == uid)
    )
    format_sql(sql)
    return sql.first()
