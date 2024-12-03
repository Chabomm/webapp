from sqlalchemy.orm import Session, aliased
from sqlalchemy import func, select, column, table, case, and_
from fastapi import Request
from inspect import currentframe as frame
import math

from app.core import exceptions as ex
from app.core import util
from app.core.database import format_sql
from app.models.dream import *
from app.schemas.dream import *
from app.service.log_service import *

# 소개서 다운로드 리스트
def docs_list(request: Request, page_param: PPage_param):
    request.state.inspect = frame()
    db = request.state.db

    filters = []

    # [ S ] search filter start
    if page_param.filters :
        if page_param.filters["skeyword"] :
            if page_param.filters["skeyword_type"] != "" :
                filters.append(getattr(T_SEND_DOC, page_param.filters["skeyword_type"]).like("%"+page_param.filters["skeyword"]+"%"))
            else : 
                filters.append(
                    T_SEND_DOC.DOC_TYPE.like("%"+page_param.filters["skeyword"]+"%") 
                    | T_SEND_DOC.TO_EMAIL.like("%"+page_param.filters["skeyword"]+"%")
                    | T_SEND_DOC.CLIENT_IP.like("%"+page_param.filters["skeyword"]+"%")
                )

        if page_param.filters["create_at"]["startDate"] and page_param.filters["create_at"]["endDate"] :
            filters.append(
                and_(
                    T_SEND_DOC.REG_DATE >= page_param.filters["create_at"]["startDate"]
                    ,T_SEND_DOC.REG_DATE <= page_param.filters["create_at"]["endDate"] + " 23:59:59"
                )
            )
    # [ E ] search filter end

    sql = (
        db.query(
             T_SEND_DOC.UID
            ,T_SEND_DOC.TO_EMAIL
            ,T_SEND_DOC.CLIENT_IP
            ,T_SEND_DOC.RESULT
            ,T_SEND_DOC.DOC_TYPE
            ,T_SEND_DOC.COMPANY
            ,T_SEND_DOC.STAFF
            ,T_SEND_DOC.MOBILE
            ,func.date_format(T_SEND_DOC.REG_DATE, '%Y-%m-%d %T').label('REG_DATE')
        )
        .filter(*filters)
        .order_by(T_SEND_DOC.REG_DATE.desc())
        .offset((page_param.page-1)*page_param.page_view_size)
        .limit(page_param.page_view_size)
    )

    format_sql(sql)

    rows = []
    for c in sql.all():
        rows.append(dict(zip(c.keys(), c)))

    # [ S ] 페이징 처리
    page_param.page_total = (
        db.query(T_SEND_DOC)
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
