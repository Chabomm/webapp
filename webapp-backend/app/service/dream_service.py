from sqlalchemy.orm import Session, aliased
from sqlalchemy import func, select, column, table, case
from fastapi import Request
from inspect import currentframe as frame
from fastapi.encoders import jsonable_encoder

from app.core import util
from app.core.database import format_sql
from app.models.dream import *
from app.schemas.dream import *
from app.service.log_service import *

def create(request: Request, send_doc: SendDoc):
    request.state.inspect = frame()
    db = request.state.db 

    db_item = T_SEND_DOC (
         TO_EMAIL = send_doc.to_email
        ,CLIENT_IP = send_doc.client_ip
        ,RESULT = send_doc.result
        ,DOC_TYPE = send_doc.doc_type
        ,COMPANY = send_doc.company
        ,STAFF = send_doc.staff
        ,MOBILE = send_doc.mobile
    )
    db.add(db_item)
    db.flush()
    return db_item

# 복지드림 inbound 고객사 정보 편집
def partner_edit(request: Request, info: Dict) :
    request.state.inspect = frame()
    db = request.state.db 

    res = db.query(T_PARTNER).filter(T_PARTNER.uid == info["uid"]).first()

    if res is None : # 없는 사용자면 INSERT
        db_item = T_PARTNER (
             uid = info["uid"]
            ,partner_type = info["partner_type"]
            ,partner_id = info["partner_id"]
            ,mall_name = info["mall_name"]
            ,company_name = info["company_name"]
            ,sponsor = info["sponsor"]
            ,partner_code = info["partner_code"]
            ,prefix = info["prefix"]
            ,logo = info["logo"]
            ,state = info["state"]
            ,is_welfare = info["is_welfare"]
            ,is_dream = info["is_dream"]
        )
        db.add(db_item)
        db.flush()
        create_log(request, db_item.uid, "T_PARTNER", "INSERT", "고객사 등록", "", info["partner_id"], "", "", info["partner_id"])
        request.state.inspect = frame()
        return 1

    else :  # 있는 사용자면 UPDATE
        if "partner_type" in info and res.partner_type != info["partner_type"] :
            create_log(request, res.uid, "T_PARTNER", "partner_type", "복지몰 로그인 타입", res.partner_type, info["partner_type"], "", "", info["partner_id"])
            request.state.inspect = frame()
            res.partner_type = info["partner_type"]
            
        if "partner_id" in info and res.partner_id != info["partner_id"] :
            create_log(request, res.uid, "T_PARTNER", "partner_id", "고객사 아이디", res.partner_id, info["partner_id"], "", "", info["partner_id"])
            request.state.inspect = frame()
            res.partner_id = info["partner_id"]
            
        if "mall_name" in info and res.mall_name != info["mall_name"] :
            create_log(request, res.uid, "T_PARTNER", "mall_name", "고객사 복지몰명", res.mall_name, info["mall_name"], "", "", info["partner_id"])
            request.state.inspect = frame()
            res.mall_name = info["mall_name"]
            
        if "company_name" in info and res.company_name != info["company_name"] :
            create_log(request, res.uid, "T_PARTNER", "company_name", "고객사 회사명", res.company_name, info["company_name"], "", "", info["partner_id"])
            request.state.inspect = frame()
            res.company_name = info["company_name"]
            
        if "sponsor" in info and res.sponsor != info["sponsor"] :
            create_log(request, res.uid, "T_PARTNER", "sponsor", "스폰서", res.sponsor, info["sponsor"], "", "", info["partner_id"])
            request.state.inspect = frame()
            res.sponsor = info["sponsor"]
            
        if "partner_code" in info and res.partner_code != info["partner_code"] :
            create_log(request, res.uid, "T_PARTNER", "partner_code", "고객사 코드", res.partner_code, info["partner_code"], "", "", info["partner_id"])
            request.state.inspect = frame()
            res.partner_code = info["partner_code"]
            
        if "prefix" in info and res.prefix != info["prefix"] :
            create_log(request, res.uid, "T_PARTNER", "prefix", "아이디 프리픽스", res.prefix, info["prefix"], "", "", info["partner_id"])
            request.state.inspect = frame()
            res.prefix = info["prefix"]
            
        if "logo" in info and res.logo != info["logo"] :
            create_log(request, res.uid, "T_PARTNER", "logo", "로고 이미지", res.logo, info["logo"], "", "", info["partner_id"])
            request.state.inspect = frame()
            res.logo = info["logo"]

        if "state" in info and res.state != info["state"] :
            create_log(request, res.uid, "T_PARTNER", "state", "복지몰 상태", res.state, info["state"], "", "", info["partner_id"])
            request.state.inspect = frame()
            res.state = info["state"]
            
        if "is_welfare" in info and res.is_welfare != info["is_welfare"] :
            create_log(request, res.uid, "T_PARTNER", "is_welfare", "복지포인트 사용여부", res.is_welfare, info["is_welfare"], "", "", info["partner_id"])
            request.state.inspect = frame()
            res.is_welfare = info["is_welfare"]
            
        if "is_dream" in info and res.is_dream != info["is_dream"] :
            create_log(request, res.uid, "T_PARTNER", "is_dream", "드림포인트 사용여부", res.is_dream, info["is_dream"], "", "", info["partner_id"])
            request.state.inspect = frame()
            res.is_dream = info["is_dream"]


        res.update_at = util.getNow()
        return 2
    
    # 메인영역_편집 - 등록
def counsel_create(request: Request, dreamCounsel: DreamCounsel) :
    request.state.inspect = frame()
    db = request.state.db 

    db_item = T_DREAM_COUNSEL (
         company_name = dreamCounsel.company_name
        ,homepage_url = dreamCounsel.homepage_url
        ,staff_count = dreamCounsel.staff_count
        ,wish_build_at = dreamCounsel.wish_build_at
        ,staff = dreamCounsel.staff
        ,staff_position = dreamCounsel.staff_position
        ,staff_phone = dreamCounsel.staff_phone
        ,staff_email = dreamCounsel.staff_email
        ,contents = dreamCounsel.contents
    )
    db.add(db_item)
    db.flush()

    return db_item


# util.getNow()