from sqlalchemy.orm import Session, aliased
from sqlalchemy import func, select, column, table, case
from fastapi import Request
from inspect import currentframe as frame
from fastapi.encoders import jsonable_encoder
import math
import json

from app.service.log_service import *
from app.core import util
from app.core.database import format_sql
from app.models.ums import *
from app.schemas.ums import *
from app.models.setting import *

# 발송_예정_내역
def push_send_list(request: Request):
    request.state.inspect = frame()
    db = request.state.db
    subquery = (
        db.query(T_PUSH_BOOKING.uid.label('buid'))
        .filter(
             T_PUSH_BOOKING.delete_at == None
            ,T_PUSH_BOOKING.state == '100'
            ,func.to_days(T_PUSH_BOOKING.booking_at) <= func.to_days(func.now())
        )
        .subquery()
    )
    res = (
        db.query(T_PUSH_BOOKING_MSG )
        .filter(T_PUSH_BOOKING_MSG.booking_uid.in_(subquery))
        .all()
    )
    return res

# 예약푸시발송 상태 수정
def push_send_resut(request: Request, booking_uids: List[int], send_count: int, success_count: int):
    request.state.inspect = frame()
    db = request.state.db
    sql = (
        db.query(T_PUSH_BOOKING )
        .filter(T_PUSH_BOOKING.uid.in_(booking_uids))
    )

    for v in sql.all():
        create_log(request, v.uid, "T_PUSH_BOOKING", "state", "상태", v.state, "200", "", "", util.getClientIP())
        request.state.inspect = frame()
        v.state = "200"
        v.send_count = send_count
        v.success_count = success_count
        v.send_at = util.getNow()




# 도메인_리스트
def domain_list(request: Request):
    request.state.inspect = frame()
    db = request.state.db

    sql = (
        db.query(
             T_SSL_DOMAIN.uid
            ,T_SSL_DOMAIN.domain
            ,T_SSL_DOMAIN.expire
            ,func.datediff(T_SSL_DOMAIN.expire, func.now()).label('diffnow')
            ,func.date_format(T_SSL_DOMAIN.create_at, '%Y-%m-%d %T').label('create_at')
            ,func.date_format(T_SSL_DOMAIN.update_at, '%Y-%m-%d %T').label('update_at')
            ,func.date_format(T_SSL_DOMAIN.delete_at, '%Y-%m-%d %T').label('delete_at')
        )
        .filter(T_SSL_DOMAIN.delete_at == None)
        .order_by(T_SSL_DOMAIN.expire.asc())
    )

    format_sql(sql)

    rows = []
    for c in sql.all():
        rows.append(dict(zip(c.keys(), c)))

    jsondata = {}
    jsondata.update({"list": rows})

    return jsondata