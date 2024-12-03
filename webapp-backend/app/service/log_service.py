from sqlalchemy.orm import Session, aliased
from sqlalchemy import func, select, column, table, case
from fastapi import Request
from inspect import currentframe as frame

from app.core import util
from app.core.database import format_sql
from app.models.log import *

# update 로그 쌓기
def create_log( 
     request: Request
    ,cl_uid: int
    ,table_name: str
    ,column_key: str
    ,column_name: str
    ,cl_before: str
    ,cl_after: str
    ,seller: str
    ,buyer: str
    ,reg_user: str
):  
    request.state.inspect = frame()
    db = request.state.db 
    db_item = T_CHANGE_LOG (
         cl_uid = cl_uid
        ,table_name = table_name      
        ,column_key = column_key      
        ,column_name = column_name   
        ,cl_before = str(cl_before)
        ,cl_after = str(cl_after)
        ,seller = seller
        ,buyer = buyer
        ,reg_user = reg_user
        ,reg_date = util.getNow()
    )
    db.add(db_item)
    db.flush()
    return db_item

# memo insert
def create_memo( 
     request: Request
    ,table_uid: int
    ,table_name: str
    ,memo: str
    ,create_user: str
):  
    request.state.inspect = frame()
    db = request.state.db 
    db_item = T_MEMO (
         table_uid = table_uid
        ,table_name = table_name
        ,memo = memo
        ,create_user = create_user
    )
    db.add(db_item)
    db.flush()
    return db_item

def memo_list(request: Request, uid: int):
    request.state.inspect = frame()
    db = request.state.db
    
    sql = (
        db.query(
         T_MEMO.uid
        ,T_MEMO.memo
        ,T_MEMO.create_user
        ,T_MEMO.create_at
        )
        .filter(T_MEMO.table_uid == uid)
        .order_by(T_MEMO.create_at.desc())
    )

    format_sql(sql)

    rows = []
    for c in sql.all():
        rows.append(dict(zip(c.keys(), c)))

    jsondata = {}
    jsondata.update({"list": rows})

    return jsondata


