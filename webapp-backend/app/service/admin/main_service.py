from sqlalchemy.orm import Session, aliased
from sqlalchemy import func, select, column, table, case, and_
from fastapi import Request
from inspect import currentframe as frame
from fastapi.encoders import jsonable_encoder
import math

from app.core import exceptions as ex
from app.core import util
from app.core.database import format_sql
from app.models.display import *
from app.models.main import *
from app.schemas.main import *
from app.service.log_service import *

# 메인영역_리스트
def main_list(request: Request, mainListInput: MainListInput):
    request.state.inspect = frame()
    db = request.state.db

    sql = (
        db.query(
             T_MAIN.uid
            ,T_MAIN.site_id
            ,T_MAIN.area
            ,T_MAIN.area_class
            ,T_MAIN.area_name
            ,T_MAIN.area_sort
            ,T_MAIN.area_thumb
            ,T_MAIN.is_display
            ,T_MAIN.per_write
            ,T_MAIN.per_read
            ,T_MAIN.display_type
            ,T_MAIN.cont_uid
            ,T_MAIN.cont_type
            ,T_MAIN.create_at
            ,T_MAIN.update_at
            ,T_MAIN.delete_at
        )
        .filter(
            T_MAIN.delete_at == None
            ,T_MAIN.site_id == mainListInput.site_id
            ,T_MAIN.display_type == mainListInput.display_type
        )
        .order_by(T_MAIN.area_sort.asc())
    )

    format_sql(sql)

    rows = []
    for c in sql.all():
        rows.append(dict(zip(c.keys(), c)))

    jsondata = {}
    jsondata.update(mainListInput)
    jsondata.update({"list": rows})

    return jsondata

# 메인영역_상세
def main_read(request: Request, uid: int):
    request.state.inspect = frame()
    db = request.state.db
    sql = ( 
        db.query(
             T_MAIN.uid
            ,T_MAIN.site_id
            ,T_MAIN.area
            ,T_MAIN.area_class
            ,T_MAIN.area_name
            ,T_MAIN.area_sort
            ,T_MAIN.area_thumb
            ,T_MAIN.is_display
            ,T_MAIN.per_write
            ,T_MAIN.per_read
            ,T_MAIN.display_type
            ,T_MAIN.cont_uid
            ,T_MAIN.cont_type
            ,T_MAIN.create_at
            ,T_MAIN.update_at
            ,T_MAIN.delete_at
        )
        .filter(T_MAIN.uid == uid)
    )
    format_sql(sql)
    return sql.first()

# 메인영역_편집 - 등록
def main_create(request: Request, main: Main) :
    request.state.inspect = frame()
    db = request.state.db 
    user = request.state.user

    db_item = T_MAIN (
         site_id = main.site_id
        ,area = main.area
        ,area_class = main.area_class
        ,area_name = main.area_name
        ,area_sort = main.area_sort
        ,area_thumb = main.area_thumb
        ,is_display = main.is_display
        ,per_write = main.per_write
        ,per_read = main.per_read
        ,display_type = main.display_type
        ,cont_uid = main.cont_uid
        ,cont_type = main.cont_type
    )
    db.add(db_item)
    db.flush()

    create_log(request, db_item.uid, "T_MAIN", "INSERT", "메인영역등록", 0, db_item.uid, "", "", user.user_id)
    request.state.inspect = frame()

    return db_item

# 메인영역_편집 - 수정
def main_update(request: Request, main: Main) :
    request.state.inspect = frame()
    db = request.state.db 
    user = request.state.user

    # 기존 등록된 item select 
    res = db.query(T_MAIN).filter(T_MAIN.uid == main.uid).first()

    if res is None :
        raise ex.NotFoundUser

    if main.site_id is not None and main.site_id != "" : 
        create_log(request, main.uid, "T_MAIN", "site_id", "프로젝트", res.site_id, main.site_id, "", "", user.user_id)
        request.state.inspect = frame()
        res.site_id = main.site_id

    if main.area is not None and main.area != "" : 
        create_log(request, main.uid, "T_MAIN", "area", "영역", res.area, main.area, "", "", user.user_id)
        request.state.inspect = frame()
        res.area = main.area

    if main.area_class is not None and main.area_class != "" : 
        create_log(request, main.uid, "T_MAIN", "area_class", "영역플랫폼", res.area_class, main.area_class, "", "", user.user_id)
        request.state.inspect = frame()
        res.area_class = main.area_class

    if main.area_name is not None and main.area_name != "" : 
        create_log(request, main.uid, "T_MAIN", "area_name", "영역명", res.area_name, main.area_name, "", "", user.user_id)
        request.state.inspect = frame()
        res.area_name = main.area_name

    if main.area_sort is not None and main.area_sort != "" : 
        create_log(request, main.uid, "T_MAIN", "area_sort", "영역순서", res.area_sort, main.area_sort, "", "", user.user_id)
        request.state.inspect = frame()
        res.area_sort = main.area_sort

    if main.area_thumb is not None and main.area_thumb != "" : 
        create_log(request, main.uid, "T_MAIN", "area_thumb", "영역썸네일", res.area_thumb, main.area_thumb, "", "", user.user_id)
        request.state.inspect = frame()
        res.area_thumb = main.area_thumb

    if main.is_display is not None and main.is_display != "" : 
        create_log(request, main.uid, "T_MAIN", "is_display", "노출여부", res.is_display, main.is_display, "", "", user.user_id)
        request.state.inspect = frame()
        res.is_display = main.is_display

    if main.per_write is not None and main.per_write != "" : 
        create_log(request, main.uid, "T_MAIN", "per_write", "쓰기권한", res.per_write, main.per_write, "", "", user.user_id)
        request.state.inspect = frame()
        res.per_write = main.per_write

    if main.per_read is not None and main.per_read != "" : 
        create_log(request, main.uid, "T_MAIN", "per_read", "읽기권한", res.per_read, main.per_read, "", "", user.user_id)
        request.state.inspect = frame()
        res.per_read = main.per_read

    if main.display_type is not None and main.display_type != "" : 
        create_log(request, main.uid, "T_MAIN", "display_type", "노출타입", res.display_type, main.display_type, "", "", user.user_id)
        request.state.inspect = frame()
        res.display_type = main.display_type
    
    if main.cont_uid is not None and main.cont_uid != "" : 
        create_log(request, main.uid, "T_MAIN", "cont_uid", "테이블의 uid", res.cont_uid, main.cont_uid, "", "", user.user_id)
        request.state.inspect = frame()
        res.cont_uid = main.cont_uid

    if main.cont_type is not None and main.cont_type != "" : 
        create_log(request, main.uid, "T_MAIN", "cont_type", "컨텐츠타입", res.cont_type, main.cont_type, "", "", user.user_id)
        request.state.inspect = frame()
        res.cont_type = main.cont_type
    
    res.update_at = util.getNow()

    return res

# 메인영역_편집 - 삭제
def main_delete(request: Request, uid: int):
    request.state.inspect = frame()
    db = request.state.db
    user = request.state.user
    
    db_item = db.query(T_MAIN).filter(T_MAIN.uid == uid).first()

    db_item.is_display = 'F'
    db_item.delete_at = util.getNow()

    create_log(request, uid, "T_MAIN", "DELETE", "메인영역삭제", 0, db_item.uid, "", "", user.user_id)
    request.state.inspect = frame()

    return db_item

# 배너_리스트
def banner_list(request: Request, pRead: PRead):
    request.state.inspect = frame()
    db = request.state.db

    main_cate_stmt = (
        db.query(
            T_MAIN_CATE.cate_name.label("cate_name")
            , T_MAIN_CATE.uid.label("cate_uid")
        )
        .filter(T_MAIN_CATE.table_uid == pRead.uid)
        .subquery()
    )

    filters = []
    filters.append(getattr(T_MAIN_BANNER, "delete_at") == None)
    filters.append(getattr(T_MAIN_BANNER, "main_uid") == pRead.uid)

    sql = (
        db.query(
             T_MAIN_BANNER.uid
            ,T_MAIN_BANNER.main_uid
            ,T_MAIN_BANNER.site_id
            ,T_MAIN_BANNER.area
            ,T_MAIN_BANNER.area_class
            ,T_MAIN_BANNER.cate_uid
            ,T_MAIN_BANNER.banner_name
            ,T_MAIN_BANNER.banner_src
            ,T_MAIN_BANNER.link_type
            ,T_MAIN_BANNER.link
            ,T_MAIN_BANNER.sort
            ,T_MAIN_BANNER.is_display
            ,T_MAIN_BANNER.create_at
            ,T_MAIN_BANNER.delete_at
            ,T_MAIN_BANNER.update_at
            ,main_cate_stmt.c.cate_name
        ) 
        .join(
            main_cate_stmt, 
            T_MAIN_BANNER.cate_uid == main_cate_stmt.c.cate_uid,
            isouter = True 
        )
        .filter(*filters)
        .order_by(T_MAIN_BANNER.sort.asc())
    )

    format_sql(sql)
    rows = []
    for c in sql.all():

        rows.append(dict(zip(c.keys(), c)))

    jsondata = {}
    jsondata.update({"list": rows})

    return jsondata

# 배너_상세정보
def banner_read(request: Request, uid: int):
    request.state.inspect = frame()
    db = request.state.db

    print('-----------------banner_read-----------------------')
    
    sql = (
        db.query(
             T_MAIN_CATE.uid.label("cuid")
            ,T_MAIN_CATE.cate_name
            ,T_MAIN_CATE.cate_icon
            ,T_MAIN_CATE.cate_sort
            ,T_MAIN_CATE.table_name
            ,T_MAIN_CATE.table_uid
            ,T_MAIN_BANNER.uid
            ,T_MAIN_BANNER.main_uid
            ,T_MAIN_BANNER.site_id
            ,T_MAIN_BANNER.area
            ,T_MAIN_BANNER.area_class
            ,T_MAIN_BANNER.cate_uid
            ,T_MAIN_BANNER.banner_name
            ,T_MAIN_BANNER.banner_src
            ,T_MAIN_BANNER.link_type
            ,T_MAIN_BANNER.link
            ,T_MAIN_BANNER.sort
            ,T_MAIN_BANNER.is_display
            ,T_MAIN_BANNER.create_at
            ,T_MAIN_BANNER.delete_at
            ,T_MAIN_BANNER.update_at
            ,T_MAIN_BANNER_TXT.banner_uid
            ,T_MAIN_BANNER_TXT.txt1
            ,T_MAIN_BANNER_TXT.txt2
            ,T_MAIN_BANNER_TXT.txt3
            ,T_MAIN_BANNER_TXT.txt4
            ,T_MAIN_BANNER_TXT.txt5
        ) 
        .join(
            T_MAIN_CATE,
            T_MAIN_CATE.uid == T_MAIN_BANNER.cate_uid,
            isouter = True
        ) 
        .join(
            T_MAIN_BANNER_TXT,
            T_MAIN_BANNER_TXT.banner_uid == T_MAIN_BANNER.uid,
            isouter = True 
        ) 
        .filter(T_MAIN_BANNER.uid == uid)
    )

    format_sql(sql)

    return sql.first()

# 배너_편집 - 등록
def banner_create(request: Request, mainBanner: MainBanner) :
    request.state.inspect = frame()
    db = request.state.db 
    user = request.state.user

    db_item = T_MAIN_BANNER (
         main_uid = mainBanner.main_uid
        ,site_id = mainBanner.site_id
        ,area = mainBanner.area
        ,area_class = mainBanner.area_class
        ,cate_uid = mainBanner.cate_uid
        ,banner_name = mainBanner.banner_name
        ,banner_src = mainBanner.banner_src
        ,link_type = mainBanner.link_type
        ,link = mainBanner.link
        ,sort = mainBanner.sort
    )
    db.add(db_item)
    db.flush()

    create_log(request, db_item.uid, "T_MAIN_BANNER", "INSERT", "배너 등록", 0, db_item.uid, "", "", user.user_id)
    request.state.inspect = frame()

    if mainBanner.txt1 != "" or mainBanner.txt2 != "" or mainBanner.txt3 != "" or mainBanner.txt4 != "" or mainBanner.txt5 != "" :
        db_item_2 = T_MAIN_BANNER_TXT (
            banner_uid = db_item.uid
            ,txt1 = mainBanner.txt1 
            ,txt2 = mainBanner.txt2 
            ,txt3 = mainBanner.txt3 
            ,txt4 = mainBanner.txt4 
            ,txt5 = mainBanner.txt5 
        )
        db.add(db_item_2)
        db.flush()
        create_log(request, db_item_2.banner_uid, "T_MAIN_BANNER_TXT", "INSERT", "배너텍스트 등록", 0, db_item.uid, "", "", user.user_id)
        request.state.inspect = frame()

    return db_item

# 배너_편집 - 수정
def banner_update(request: Request, mainBanner: MainBanner) :
    request.state.inspect = frame()
    db = request.state.db 
    user = request.state.user

    # 기존 등록된 item select 
    res = db.query(T_MAIN_BANNER).filter(T_MAIN_BANNER.uid == mainBanner.uid).first()
    res2 = db.query(T_MAIN_BANNER_TXT).filter(T_MAIN_BANNER_TXT.banner_uid == mainBanner.uid).first()

    if res is None :
        raise ex.NotFoundUser
    
    # return
    
    if mainBanner.main_uid is not None and res.main_uid != mainBanner.main_uid : 
        create_log(request, mainBanner.uid, "T_MAIN_BANNER", "main_uid", "T_MAIN의 uid", res.main_uid, mainBanner.main_uid, "", "", user.user_id)
        request.state.inspect = frame()
        res.main_uid = mainBanner.main_uid

    if mainBanner.site_id is not None and res.site_id != mainBanner.site_id : 
        create_log(request, mainBanner.uid, "T_MAIN_BANNER", "site_id", "프로젝트", res.site_id, mainBanner.site_id, "", "", user.user_id)
        request.state.inspect = frame()
        res.site_id = mainBanner.site_id

    if mainBanner.area is not None and res.area != mainBanner.area : 
        create_log(request, mainBanner.uid, "T_MAIN_BANNER", "area", "영역", res.area, mainBanner.area, "", "", user.user_id)
        request.state.inspect = frame()
        res.area = mainBanner.area

    if mainBanner.area_class is not None and res.area_class != mainBanner.area_class : 
        create_log(request, mainBanner.uid, "T_MAIN_BANNER", "area_class", "플랫폼", res.area_class, mainBanner.area_class, "", "", user.user_id)
        request.state.inspect = frame()
        res.area_class = mainBanner.area_class

    if mainBanner.cate_uid is not None and res.cate_uid != mainBanner.cate_uid : 
        create_log(request, mainBanner.uid, "T_MAIN_BANNER", "cate_uid", "카테고리", res.cate_uid, mainBanner.cate_uid, "", "", user.user_id)
        request.state.inspect = frame()
        res.cate_uid = mainBanner.cate_uid

    if mainBanner.banner_name is not None and res.banner_name != mainBanner.banner_name : 
        create_log(request, mainBanner.uid, "T_MAIN_BANNER", "banner_name", "배너명", res.banner_name, mainBanner.banner_name, "", "", user.user_id)
        request.state.inspect = frame()
        res.banner_name = mainBanner.banner_name

    if mainBanner.banner_src is not None and res.banner_src != mainBanner.banner_src : 
        create_log(request, mainBanner.uid, "T_MAIN_BANNER", "banner_src", "배너 이미지", res.banner_src, mainBanner.banner_src, "", "", user.user_id)
        request.state.inspect = frame()
        res.banner_src = mainBanner.banner_src

    if mainBanner.link_type is not None and res.link_type != mainBanner.link_type : 
        create_log(request, mainBanner.uid, "T_MAIN_BANNER", "link_type", "링크타입", res.link_type, mainBanner.link_type, "", "", user.user_id)
        request.state.inspect = frame()
        res.link_type = mainBanner.link_type

    if mainBanner.link is not None and res.link != mainBanner.link : 
        create_log(request, mainBanner.uid, "T_MAIN_BANNER", "link", "링크", res.link, mainBanner.link, "", "", user.user_id)
        request.state.inspect = frame()
        res.link = mainBanner.link

    if mainBanner.sort is not None and res.sort != mainBanner.sort : 
        create_log(request, mainBanner.uid, "T_MAIN_BANNER", "sort", "순서", res.sort, mainBanner.sort, "", "", user.user_id)
        request.state.inspect = frame()
        res.sort = mainBanner.sort

    if mainBanner.is_display is not None and res.is_display != mainBanner.is_display : 
        create_log(request, mainBanner.uid, "T_MAIN_BANNER", "is_display", "노출여부", res.is_display, mainBanner.is_display, "", "", user.user_id)
        request.state.inspect = frame()
        res.is_display = mainBanner.is_display
        
    if mainBanner.txt1 is not None and res2.txt1 != mainBanner.txt1 : 
        create_log(request, mainBanner.uid, "T_MAIN_BANNER_TXT", "txt1", "텍스트1", res2.txt1, mainBanner.txt1, "", "", user.user_id)
        request.state.inspect = frame()
        res2.txt1 = mainBanner.txt1

    if mainBanner.txt2 is not None and res2.txt2 != mainBanner.txt2 : 
        create_log(request, mainBanner.uid, "T_MAIN_BANNER_TXT", "txt2", "텍스트2", res2.txt2, mainBanner.txt2, "", "", user.user_id)
        request.state.inspect = frame()
        res2.txt2 = mainBanner.txt2

    if mainBanner.txt3 is not None and res2.txt3 != mainBanner.txt3 : 
        create_log(request, mainBanner.uid, "T_MAIN_BANNER_TXT", "txt3", "텍스트3", res2.txt3, mainBanner.txt3, "", "", user.user_id)
        request.state.inspect = frame()
        res2.txt3 = mainBanner.txt3

    if mainBanner.txt4 is not None and res2.txt4 != mainBanner.txt4 : 
        create_log(request, mainBanner.uid, "T_MAIN_BANNER_TXT", "txt4", "텍스트4", res2.txt4, mainBanner.txt4, "", "", user.user_id)
        request.state.inspect = frame()
        res2.txt4 = mainBanner.txt4

    if mainBanner.txt5 is not None and res2.txt5 != mainBanner.txt5 : 
        create_log(request, mainBanner.uid, "T_MAIN_BANNER_TXT", "txt5", "텍스트5", res2.txt5, mainBanner.txt5, "", "", user.user_id)
        request.state.inspect = frame()
        res2.txt5 = mainBanner.txt5

    res.update_at = util.getNow()

    return res

# 배너_편집 - 삭제
def banner_delete(request: Request, uid: int):
    request.state.inspect = frame()
    db = request.state.db
    user = request.state.user
    
    db_item = db.query(T_MAIN_BANNER).filter(T_MAIN_BANNER.uid == uid).first()

    db_item.is_display = 'F'
    db_item.delete_at = util.getNow()

    create_log(request, uid, "T_MAIN_BANNER", "DELETE", "배너삭제", 0, db_item.uid, "", "", user.user_id)
    request.state.inspect = frame()

    return db_item




# 배너_편집 - 순서정렬
def banner_sort(request: Request, mainBanner : MainBanner) :
    request.state.inspect = frame()
    db = request.state.db

    res = (
        db.query(
            T_MAIN_BANNER
        )
        .filter(T_MAIN_BANNER.main_uid == mainBanner.main_uid, T_MAIN_BANNER.delete_at == None)
        .all()
    )
    
    for c in res :
        for i in mainBanner.sort_array :
            if c.uid == i :
                c.sort = mainBanner.sort_array.index(i)+1

    return


