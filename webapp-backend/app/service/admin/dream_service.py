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

# 구축문의 리스트
def counsel_list(request: Request, page_param: PPage_param):
    request.state.inspect = frame()
    db = request.state.db

    filters = []
    filters.append(getattr(T_DREAM_COUNSEL, "delete_at") == None)

    # [ S ] search filter start
    if page_param.filters :
        if page_param.filters["skeyword"] :
            if page_param.filters["skeyword_type"] != "" :
                filters.append(getattr(T_DREAM_COUNSEL, page_param.filters["skeyword_type"]).like("%"+page_param.filters["skeyword"]+"%"))
            else : 
                filters.append(
                    T_DREAM_COUNSEL.company_name.like("%"+page_param.filters["skeyword"]+"%") 
                    | T_DREAM_COUNSEL.staff.like("%"+page_param.filters["skeyword"]+"%")
                    | T_DREAM_COUNSEL.state.like("%"+page_param.filters["skeyword"]+"%")
                )

        if page_param.filters["create_at"]["startDate"] and page_param.filters["create_at"]["endDate"] :
            filters.append(
                and_(
                    T_DREAM_COUNSEL.create_at >= page_param.filters["create_at"]["startDate"]
                    ,T_DREAM_COUNSEL.create_at <= page_param.filters["create_at"]["endDate"] + " 23:59:59"
                )
            )
    # [ E ] search filter end

    sql = (
        db.query(
             T_DREAM_COUNSEL.uid
            ,T_DREAM_COUNSEL.company_name
            ,T_DREAM_COUNSEL.staff_count
            ,T_DREAM_COUNSEL.wish_build_at
            ,T_DREAM_COUNSEL.staff
            ,T_DREAM_COUNSEL.state
            ,T_DREAM_COUNSEL.create_at
        )
        .filter(*filters)
        .order_by(T_DREAM_COUNSEL.create_at.desc())
        .offset((page_param.page-1)*page_param.page_view_size)
        .limit(page_param.page_view_size)
    )

    format_sql(sql)

    rows = []
    for c in sql.all():
        rows.append(dict(zip(c.keys(), c)))

    # [ S ] 페이징 처리
    page_param.page_total = (
        db.query(T_DREAM_COUNSEL)
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

# 구축문의_상세
def counsel_read(request: Request, uid: int):
    request.state.inspect = frame()
    db = request.state.db
    sql = ( 
        db.query(
             T_DREAM_COUNSEL.uid
            ,T_DREAM_COUNSEL.company_name
            ,T_DREAM_COUNSEL.homepage_url
            ,T_DREAM_COUNSEL.staff_count
            ,T_DREAM_COUNSEL.wish_build_at
            ,T_DREAM_COUNSEL.staff
            ,T_DREAM_COUNSEL.staff_position
            ,T_DREAM_COUNSEL.staff_phone
            ,T_DREAM_COUNSEL.staff_email
            ,T_DREAM_COUNSEL.contents
            ,T_DREAM_COUNSEL.state
            ,T_DREAM_COUNSEL.create_at
            ,T_DREAM_COUNSEL.update_at
            ,T_DREAM_COUNSEL.delete_at
        )
        .filter(
            T_DREAM_COUNSEL.uid == uid
            ,T_DREAM_COUNSEL.delete_at == None
        )
    )
    format_sql(sql)
    res = sql.first()
    if res is not None :
        res = dict(zip(res.keys(), res))
    return res

# 구축문의_편집 - update  
def counsel_update(request: Request, dreamCounsel: DreamCounsel):
    request.state.inspect = frame()
    db = request.state.db 
    user = request.state.user

    res = db.query(T_DREAM_COUNSEL).filter(T_DREAM_COUNSEL.uid == dreamCounsel.uid).first()

    if res is None :
        raise ex.NotFoundUser

    # print("user--------",user)
    # return

    if dreamCounsel.memo is not None and dreamCounsel.memo != "" : 
        # insert
        create_memo(request, dreamCounsel.uid, "T_DREAM_COUNSEL", dreamCounsel.memo, user.user_name)
        request.state.inspect = frame()



    if dreamCounsel.company_name is not None and res.company_name != dreamCounsel.company_name : 
        create_log(request, dreamCounsel.uid, "T_DREAM_COUNSEL", "company_name", "기업명", res.company_name, dreamCounsel.company_name, "", "", user.user_id)
        request.state.inspect = frame()
        res.company_name = dreamCounsel.company_name

    if dreamCounsel.homepage_url is not None and res.homepage_url != dreamCounsel.homepage_url : 
        create_log(request, dreamCounsel.uid, "T_DREAM_COUNSEL", "homepage_url", "홈페이지 url", res.homepage_url, dreamCounsel.homepage_url, "", "", user.user_id)
        request.state.inspect = frame()
        res.homepage_url = dreamCounsel.homepage_url
    
    if dreamCounsel.staff_count is not None and res.staff_count != dreamCounsel.staff_count : 
        create_log(request, dreamCounsel.uid, "T_DREAM_COUNSEL", "staff_count", "직원수", res.staff_count, dreamCounsel.staff_count, "", "", user.user_id)
        request.state.inspect = frame()
        res.staff_count = dreamCounsel.staff_count

    if dreamCounsel.wish_build_at is not None and res.wish_build_at != dreamCounsel.wish_build_at : 
        create_log(request, dreamCounsel.uid, "T_DREAM_COUNSEL", "wish_build_at", "구축희망일", res.wish_build_at, dreamCounsel.wish_build_at, "", "", user.user_id)
        request.state.inspect = frame()
        res.wish_build_at = dreamCounsel.wish_build_at 

    if dreamCounsel.staff is not None and res.staff != dreamCounsel.staff : 
        create_log(request, dreamCounsel.uid, "T_DREAM_COUNSEL", "staff", "담당자명", res.staff, dreamCounsel.staff, "", "", user.user_id)
        request.state.inspect = frame()
        res.staff = dreamCounsel.staff   

    if dreamCounsel.staff_position is not None and res.staff_position != dreamCounsel.staff_position : 
        create_log(request, dreamCounsel.uid, "T_DREAM_COUNSEL", "staff_position", "직급/직책", res.staff_position, dreamCounsel.staff_position, "", "", user.user_id)
        request.state.inspect = frame()
        res.staff_position = dreamCounsel.staff_position    

    if dreamCounsel.staff_phone is not None and res.staff_phone != dreamCounsel.staff_phone : 
        create_log(request, dreamCounsel.uid, "T_DREAM_COUNSEL", "staff_phone", "담당자 전화번호", res.staff_phone, dreamCounsel.staff_phone, "", "", user.user_id)
        request.state.inspect = frame()
        res.staff_phone = dreamCounsel.staff_phone  

    if dreamCounsel.staff_email is not None and res.staff_email != dreamCounsel.staff_email : 
        create_log(request, dreamCounsel.uid, "T_DREAM_COUNSEL", "staff_email", "담당자 이메일", res.staff_email, dreamCounsel.staff_email, "", "", user.user_id)
        request.state.inspect = frame()
        res.staff_email = dreamCounsel.staff_email 

    if dreamCounsel.contents is not None and res.contents != dreamCounsel.contents : 
        create_log(request, dreamCounsel.uid, "T_DREAM_COUNSEL", "contents", "상담문의내용", res.contents, dreamCounsel.contents, "", "", user.user_id)
        request.state.inspect = frame()
        res.contents = dreamCounsel.contents  

    if dreamCounsel.state is not None and res.state != dreamCounsel.state : 
        create_log(request, dreamCounsel.uid, "T_DREAM_COUNSEL", "state", "진행상태", res.state, dreamCounsel.state, "", "", user.user_id)
        request.state.inspect = frame()
        res.state = dreamCounsel.state

    res.update_at = util.getNow()
    return res

# 구축문의_편집 - delete  
def counsel_delete(request: Request, uid: int):
    request.state.inspect = frame()
    db = request.state.db
    user = request.state.user
    
    db_item = db.query(T_DREAM_COUNSEL).filter(T_DREAM_COUNSEL.uid == uid).first()

    db_item.delete_at = util.getNow()

    create_log(request, uid, "T_DREAM_COUNSEL", "DELETE", "구축문의신청서 삭제", 0, db_item.uid, "", "", user.user_id)
    request.state.inspect = frame()

    return db_item
