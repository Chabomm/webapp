from sqlalchemy.orm import Session, aliased
from sqlalchemy import func, select, column, table, case
from fastapi import Request
from inspect import currentframe as frame
from fastapi.encoders import jsonable_encoder
import math

from app.core import util
from app.core.database import format_sql

from app.models.config import *
from app.models.display import *
from app.models.board import *
from app.models.ums import *
from app.models.applink import *

# 프로젝트 리스트
def config (request: Request) :
    request.state.inspect = frame()
    db = request.state.db
    sql = db.query(T_CONFIG.site_id.label("key"), T_CONFIG.site_name.label("value")).filter(T_CONFIG.delete_at == None)

    rows = []
    # rows.append({"key" : "", "value" : "전체"})
    for c in sql.all():
        rows.append(dict(zip(c.keys(), c)))

    jsondata = {}
    jsondata.update({"list": rows})
    
    return jsondata

# 카테고리 리스트
def cate (request: Request, table_name: str) :
    request.state.inspect = frame()
    db = request.state.db

    if table_name == "T_BOARD_POSTS" :
        stmt = db.query(T_BOARD_POSTS.cate_uid.label("cate_uid")).filter(T_BOARD_POSTS.cate_uid != None).filter(T_BOARD_POSTS.delete_at == None).group_by(T_BOARD_POSTS.cate_uid).subquery()

    if not 'stmt' in vars() :
        jsondata = {"list": []}
        return jsondata
    
    sql = (
        db.query(T_MAIN_CATE.uid.label("key"), T_MAIN_CATE.cate_name.label("value"))
        .filter(T_MAIN_CATE.uid.in_(stmt))
        .order_by(T_MAIN_CATE.cate_sort.asc())
    )

    rows = []
    # rows.append({"key" : "", "value" : "전체"})
    for c in sql.all():
        rows.append(dict(zip(c.keys(), c)))

    jsondata = {}
    jsondata.update({"list": rows})
    
    return jsondata

# 게시판
def board(request: Request) :
    request.state.inspect = frame()
    db = request.state.db

    # stmt = db.query(T_BOARD_POSTS.cate_uid.label("cate_uid")).filter(T_BOARD_POSTS.cate_uid != None).filter(T_BOARD_POSTS.delete_at == None).group_by(T_BOARD_POSTS.cate_uid).subquery()
    
    sql = (
        db.query(T_BOARD.uid.label("key"), T_BOARD.board_name.label("value"))
        .filter(T_BOARD.delete_at == None)
        .order_by(T_BOARD.uid.asc())
    )

    rows = []
    for c in sql.all():
        rows.append(dict(zip(c.keys(), c)))

    jsondata = {}
    jsondata.update({"list": rows})
    
    return jsondata

# 배너
def banner(request: Request) :
    request.state.inspect = frame()
    db = request.state.db

    # stmt = db.query(T_BOARD_POSTS.cate_uid.label("cate_uid")).filter(T_BOARD_POSTS.cate_uid != None).filter(T_BOARD_POSTS.delete_at == None).group_by(T_BOARD_POSTS.cate_uid).subquery()
    
    sql = (
        db.query(T_MAIN_BANNER.uid.label("key"), T_MAIN_BANNER.board_name.label("value"))
        .filter(T_MAIN_BANNER.delete_at == None)
        .order_by(T_MAIN_BANNER.uid.asc())
    )

    rows = []
    for c in sql.all():
        rows.append(dict(zip(c.keys(), c)))

    jsondata = {}
    jsondata.update({"list": rows})
    
    return jsondata

# 디바이스 고객사 group by
def device_partner (request: Request) :
    request.state.inspect = frame()
    db = request.state.db

    sql = (
        db.query(T_APP_DEVICE.partner_id.label("partner_id"))
        .filter(T_APP_DEVICE.delete_at == None)
        .group_by(T_APP_DEVICE.partner_id)
    )

    rows = []
    # rows.append({"key" : "", "value" : "전체"})
    for c in sql.all():
        rows.append(dict(zip(c.keys(), c)))

    jsondata = {}
    jsondata.update({"list": rows})
    
    return jsondata

# 딥링크 그룹 리스트
def deeplink_gorup_list(request: Request) :
    request.state.inspect = frame()
    db = request.state.db

    sql = (
        db.query(
            T_DEEP_LINK_GROUP.uid.label("key")
            ,T_DEEP_LINK_GROUP.title.label("value")
        )
        .filter(T_DEEP_LINK_GROUP.delete_at == None)
    )

    rows = []
    for c in sql.all():
        column = dict(zip(c.keys(), c))
        column["checked"] = True
        rows.append(column)

    jsondata = {}
    jsondata.update({"list": rows})
    
    return jsondata