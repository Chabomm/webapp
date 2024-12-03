from fastapi import Request
from inspect import currentframe as frame
from fastapi.encoders import jsonable_encoder

from app.core import exceptions as ex
from app.core.database import format_sql
from app.models.display import *
from app.schemas.main import *
from app.service.log_service import *

# 카테고리_리스트
def cate_list(request: Request, cateInput: CateInput) :
    request.state.inspect = frame()
    db = request.state.db

    sql = (
        db.query(
            T_MAIN_CATE.uid
           ,T_MAIN_CATE.cate_name
           ,T_MAIN_CATE.cate_icon
           ,T_MAIN_CATE.cate_sort
           ,T_MAIN_CATE.table_name
           ,T_MAIN_CATE.table_uid
        )
        .filter(
             T_MAIN_CATE.table_name == cateInput.table_name
            ,T_MAIN_CATE.table_uid == cateInput.table_uid
        )
        .order_by(T_MAIN_CATE.cate_sort.asc())
    )

    format_sql(sql)

    rows = []
    for c in sql.all():
        rows.append(dict(zip(c.keys(), c)))

    jsondata = {}
    jsondata.update({"list": rows})
    return jsondata

# 카테고리_편집 - 등록
def cate_create(request: Request, mainCate: MainCate) :
    request.state.inspect = frame()
    db = request.state.db 
    user = request.state.user

    print("mainCate", mainCate)
    # return
    db_item = T_MAIN_CATE (
         cate_name = mainCate.cate_name
        ,cate_icon = mainCate.cate_icon
        ,cate_sort = mainCate.cate_sort
        ,table_name = mainCate.table_name
        ,table_uid = mainCate.table_uid
    )
    db.add(db_item)
    db.flush()

    create_log(request, db_item.uid, "T_MAIN_CATE", "INSERT", "메인 카테고리 등록", 0, db_item.uid, "", "", user.user_id)
    request.state.inspect = frame()

    return db_item

# 카테고리_편집 - 수정
def cate_update(request: Request, mainCate: MainCate) :
    request.state.inspect = frame()
    db = request.state.db 
    user = request.state.user

    # 기존 등록된 item select 
    res = db.query(T_MAIN_CATE).filter(T_MAIN_CATE.uid == mainCate.cuid).first()

    if res is None :
        raise ex.NotFoundUser

    if mainCate.cate_name is not None and mainCate.cate_name != "" : 
        create_log(request, mainCate.cuid, "T_MAIN_CATE", "cate_name", "카테고리 이름", res.cate_name, mainCate.cate_name, "", "", user.user_id)
        request.state.inspect = frame()
        res.cate_name = mainCate.cate_name

    if mainCate.cate_icon is not None and mainCate.cate_icon != "" : 
        create_log(request, mainCate.cuid, "T_MAIN_CATE", "cate_icon", "카테고리 이미지", res.cate_icon, mainCate.cate_icon, "", "", user.user_id)
        request.state.inspect = frame()
        res.cate_icon = mainCate.cate_icon

    if mainCate.cate_sort is not None and mainCate.cate_sort != "" : 
        create_log(request, mainCate.cuid, "T_MAIN_CATE", "cate_sort", "카테고리 순서", res.cate_sort, mainCate.cate_sort, "", "", user.user_id)
        request.state.inspect = frame()
        res.cate_sort = mainCate.cate_sort
        
    return res

# 카테고리_편집 - 삭제
def cate_delete(request: Request, mainCate: MainCate) :
    request.state.inspect = frame()
    db = request.state.db
    user = request.state.user
    
    count = db.query(T_MAIN_BANNER).filter(T_MAIN_BANNER.cate_uid == mainCate.cuid).count()

    if count :
        return None
    else :
        db_item = db.query(T_MAIN_CATE).filter(T_MAIN_CATE.uid == mainCate.cuid).delete()

    create_log(request, mainCate.cuid, "T_MAIN_CATE", "DELETE", "카테고리 삭제", 0, 0, "", "", user.user_id)
    request.state.inspect = frame()

    return db_item

# 카테고리_상세정보
def cate_read(request: Request, uid: int):
    request.state.inspect = frame()
    db = request.state.db
    
    sql = (
        db.query(
             T_MAIN_CATE.uid.label("cuid")
            ,T_MAIN_CATE.cate_name
            ,T_MAIN_CATE.cate_icon
            ,T_MAIN_CATE.cate_sort
            ,T_MAIN_CATE.table_name
            ,T_MAIN_CATE.table_uid
        )
        .filter(T_MAIN_CATE.uid == uid)
    )

    format_sql(sql)

    return sql.first()


# 카테고리_편집 - 순서정렬
def cate_sort(request: Request, mainCate: MainCate) :
    request.state.inspect = frame()
    db = request.state.db

    res = (
        db.query(
            T_MAIN_CATE
        )
        .filter(T_MAIN_CATE.table_uid == mainCate.table_uid, T_MAIN_CATE.table_name == mainCate.table_name)
        .all()
    )
    
    for c in res :
        for i in mainCate.sort_array :
            if c.uid == i :
                c.cate_sort = mainCate.sort_array.index(i)+1

    return
