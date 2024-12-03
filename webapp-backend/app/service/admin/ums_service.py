from sqlalchemy.orm import Session, aliased
from sqlalchemy import func, select, column, table, case, and_
from fastapi import Request
from inspect import currentframe as frame
import math
import re

from app.core import exceptions as ex
from app.core import util
from app.core.database import format_sql
from app.models.ums import *
from app.schemas.ums import *
from app.service.log_service import *
from app.models.dream import *

# ums템플릿_리스트
def ums_list(request: Request, page_param: PPage_param):
    request.state.inspect = frame()
    db = request.state.db

    filters = []
    filters.append(getattr(T_UMS_TEMPLATE, "delete_at") == None)

    # [ S ] search filter start
    if page_param.filters :
        if page_param.filters["skeyword"] :
            if page_param.filters["skeyword_type"] != "" :
                filters.append(getattr(T_UMS_TEMPLATE, page_param.filters["skeyword_type"]).like("%"+page_param.filters["skeyword"]+"%"))
            else : 
                filters.append(
                    T_UMS_TEMPLATE.company_name.like("%"+page_param.filters["skeyword"]+"%") 
                    | T_UMS_TEMPLATE.subject.like("%"+page_param.filters["skeyword"]+"%")
                    | T_UMS_TEMPLATE.template_code.like("%"+page_param.filters["skeyword"]+"%")
                )

        if page_param.filters["create_at"]["startDate"] and page_param.filters["create_at"]["endDate"] :
            filters.append(
                and_(
                    T_UMS_TEMPLATE.create_at >= page_param.filters["create_at"]["startDate"]
                    ,T_UMS_TEMPLATE.create_at <= page_param.filters["create_at"]["endDate"] + " 23:59:59"
                )
            )
    # [ E ] search filter end

    sql = (
        db.query(
             T_UMS_TEMPLATE.uid
            ,T_UMS_TEMPLATE.ums_type
            ,T_UMS_TEMPLATE.platform
            ,T_UMS_TEMPLATE.template_code
            ,T_UMS_TEMPLATE.subject
            ,T_UMS_TEMPLATE.create_at
            ,T_UMS_TEMPLATE.update_at
            ,T_UMS_TEMPLATE.profile
        )
        .filter(*filters)
        .order_by(T_UMS_TEMPLATE.uid.desc())
        .offset((page_param.page-1)*page_param.page_view_size)
        .limit(page_param.page_view_size)
    )

    format_sql(sql)

    rows = []
    for c in sql.all():
        rows.append(dict(zip(c.keys(), c)))

    # [ S ] 페이징 처리
    page_param.page_total = (
        db.query(T_UMS_TEMPLATE)
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

# ums템플릿_상세
def ums_read(request: Request, uid: int):
    request.state.inspect = frame()
    db = request.state.db
    sql = ( 
        db.query(
             T_UMS_TEMPLATE.uid
            ,T_UMS_TEMPLATE.ums_type
            ,T_UMS_TEMPLATE.platform
            ,T_UMS_TEMPLATE.template_code
            ,T_UMS_TEMPLATE.subject
            ,T_UMS_TEMPLATE.content
            ,func.date_format(T_UMS_TEMPLATE.create_at, '%Y-%m-%d %T').label('create_at')
            ,func.date_format(T_UMS_TEMPLATE.update_at, '%Y-%m-%d %T').label('update_at')
            ,func.date_format(T_UMS_TEMPLATE.delete_at, '%Y-%m-%d %T').label('delete_at')
            ,T_UMS_TEMPLATE.memo
            ,T_UMS_TEMPLATE.profile
        )
        .filter(T_UMS_TEMPLATE.uid == uid)
    )
    format_sql(sql)
    return sql.first()

# ums템플릿_편집 - 등록
def ums_create(request: Request, ums_template: Ums_template) :
    request.state.inspect = frame()
    db = request.state.db 
    user = request.state.user

    db_item = T_UMS_TEMPLATE (
         ums_type = ums_template.ums_type 
        ,platform = ums_template.platform 
        ,template_code = ums_template.template_code 
        ,subject = ums_template.subject 
        ,content = ums_template.content 
        ,memo = ums_template.memo 
        ,profile = ums_template.profile 
    )
    db.add(db_item)
    db.flush()

    create_log(request, db_item.uid, "T_UMS_TEMPLATE", "INSERT", "UMS템플릿등록", 0, db_item.uid, "", "", user.user_id)
    request.state.inspect = frame()

    return db_item

# ums템플릿_편집 - 수정
def ums_update(request: Request, ums_template: Ums_template) :
    request.state.inspect = frame()
    db = request.state.db 
    user = request.state.user

    res = db.query(T_UMS_TEMPLATE).filter(T_UMS_TEMPLATE.uid == ums_template.uid).first()

    if res is None :
        raise ex.NotFoundUser

    if ums_template.ums_type is not None and res.ums_type != ums_template.ums_type : 
        create_log(request, ums_template.uid, "T_UMS_TEMPLATE", "ums_type", "분류", res.ums_type, ums_template.ums_type, "", "", user.user_id)
        request.state.inspect = frame()
        res.ums_type = ums_template.ums_type


    if ums_template.platform is not None and res.platform != ums_template.platform : 
            create_log(request, ums_template.uid, "T_UMS_TEMPLATE", "platform", "플랫폼", res.platform, ums_template.platform, "", "", user.user_id)
            request.state.inspect = frame()
            res.platform = ums_template.platform
    
    if ums_template.template_code is not None and res.template_code != ums_template.template_code : 
            create_log(request, ums_template.uid, "T_UMS_TEMPLATE", "template_code", "템플릿코드", res.template_code, ums_template.template_code, "", "", user.user_id)
            request.state.inspect = frame()
            res.template_code = ums_template.template_code
    
    if ums_template.subject is not None and res.subject != ums_template.subject : 
            create_log(request, ums_template.uid, "T_UMS_TEMPLATE", "subject", "제목", res.subject, ums_template.subject, "", "", user.user_id)
            request.state.inspect = frame()
            res.subject = ums_template.subject
    
    if ums_template.content is not None and res.content != ums_template.content : 
            create_log(request, ums_template.uid, "T_UMS_TEMPLATE", "content", "내용", res.content, ums_template.content, "", "", user.user_id)
            request.state.inspect = frame()
            res.content = ums_template.content

    if ums_template.memo is not None and res.memo != ums_template.memo : 
            create_log(request, ums_template.uid, "T_UMS_TEMPLATE", "memo", "메모", res.memo, ums_template.memo, "", "", user.user_id)
            request.state.inspect = frame()
            res.memo = ums_template.memo

    if ums_template.profile is not None and res.profile != ums_template.profile : 
            create_log(request, ums_template.uid, "T_UMS_TEMPLATE", "profile", "알림톡 프로필", res.profile, ums_template.profile, "", "", user.user_id)
            request.state.inspect = frame()
            res.profile = ums_template.profile

    res.update_at = util.getNow()
    return res

# ums템플릿_편집 - 삭제
def ums_delete(request: Request, uid: int):
    request.state.inspect = frame()
    db = request.state.db
    user = request.state.user
    
    db_item = db.query(T_UMS_TEMPLATE).filter(T_UMS_TEMPLATE.uid == uid).first()
    db_item.delete_at = util.getNow()

    create_log(request, uid, "T_UMS_TEMPLATE", "DELETE", "ums템플릿 삭제", 0, db_item.uid, "", "", user.user_id)
    request.state.inspect = frame()

    return db_item

# 디바이스_리스트
def device_list(request: Request, page_param: PPage_param):
    request.state.inspect = frame()
    db = request.state.db

    filters = []
    filters.append(getattr(T_APP_DEVICE, "delete_at") == None)

    sql = (
        db.query(
             T_APP_DEVICE.uid
            ,T_APP_DEVICE.user_id
            ,T_APP_DEVICE.partner_id
            ,T_APP_DEVICE.bars_uuid
            ,T_APP_DEVICE.device_os
            ,T_APP_DEVICE.gender
            ,T_APP_DEVICE.birth
            ,T_APP_DEVICE.mobile
            ,T_APP_DEVICE.email
            ,T_APP_DEVICE.is_sms
            ,T_APP_DEVICE.is_mailing
            ,T_APP_DEVICE.create_at
            ,T_APP_DEVICE.update_at
            ,T_APP_DEVICE.delete_at
        )
        .filter(*filters)
        .order_by(T_APP_DEVICE.uid.desc())
        .offset((page_param.page-1)*page_param.page_view_size)
        .limit(page_param.page_view_size)
    )

    format_sql(sql)

    rows = []
    for c in sql.all():
        rows.append(dict(zip(c.keys(), c)))

    # [ S ] 페이징 처리
    page_param.page_total = (
        db.query(T_APP_DEVICE)
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

def device_list_by_uids(request: Request, device_uids: List[int]):
    request.state.inspect = frame()
    db = request.state.db

    filters = []
    filters.append(getattr(T_APP_DEVICE, "delete_at") == None)
    filters.append(getattr(T_APP_DEVICE, "uid").in_(device_uids))

    sql = (
        db.query(
             T_APP_DEVICE.uid
            ,T_APP_DEVICE.user_id
            ,T_APP_DEVICE.partner_id
            ,T_APP_DEVICE.bars_uuid
            ,T_APP_DEVICE.device_os
            ,T_APP_DEVICE.gender
            ,T_APP_DEVICE.birth
            ,T_APP_DEVICE.mobile
            ,T_APP_DEVICE.email
            ,T_APP_DEVICE.is_sms
            ,T_APP_DEVICE.is_mailing
            ,T_APP_DEVICE.create_at
            ,T_APP_DEVICE.update_at
            ,T_APP_DEVICE.delete_at
        )
        .filter(*filters)
    )

    format_sql(sql)

    rows = []
    for c in sql.all():
        rows.append(dict(zip(c.keys(), c)))

    return rows

    # jsondata = {}
    # jsondata.update(page_param)
    # jsondata.update({"list": rows})

    # return jsondata

# 푸시발송예약_리스트
def push_booking_list(request: Request, page_param: PPage_param):
    request.state.inspect = frame()
    db = request.state.db

    filters = []
    filters.append(getattr(T_PUSH_BOOKING, "delete_at") == None)

    sql = (
        db.query(
             T_PUSH_BOOKING.uid
            ,T_PUSH_BOOKING.send_type
            ,T_PUSH_BOOKING.rec_type
            ,T_PUSH_BOOKING.push_title
            ,T_PUSH_BOOKING.push_msg
            ,T_PUSH_BOOKING.push_img
            ,T_PUSH_BOOKING.push_link
            ,T_PUSH_BOOKING.state
            ,T_PUSH_BOOKING.send_count
            ,T_PUSH_BOOKING.success_count
            ,T_PUSH_BOOKING.create_user
            ,T_PUSH_BOOKING.partners
            ,T_PUSH_BOOKING.devices
            ,func.date_format(T_PUSH_BOOKING.booking_at, '%Y-%m-%d %T').label('booking_at')
            ,func.date_format(T_PUSH_BOOKING.create_at, '%Y-%m-%d %T').label('create_at')
            ,func.date_format(T_PUSH_BOOKING.update_at, '%Y-%m-%d %T').label('update_at')
            ,func.date_format(T_PUSH_BOOKING.delete_at, '%Y-%m-%d %T').label('delete_at')
            ,func.date_format(T_PUSH_BOOKING.send_at, '%Y-%m-%d %T').label('send_at')
        )
        .filter(*filters)
        .order_by(T_PUSH_BOOKING.uid.desc())
        .offset((page_param.page-1)*page_param.page_view_size)
        .limit(page_param.page_view_size)
    )

    format_sql(sql)


    rows = []
    for c in sql.all():
        rows.append(dict(zip(c.keys(), c)))

    # [ S ] 페이징 처리
    page_param.page_total = (
        db.query(T_PUSH_BOOKING)
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

# 푸시발송예약_상세
def push_booking_read(request: Request, uid: int):
    request.state.inspect = frame()
    db = request.state.db
    sql = ( 
        db.query(
             T_PUSH_BOOKING.uid
            ,T_PUSH_BOOKING.send_type
            ,T_PUSH_BOOKING.rec_type
            ,T_PUSH_BOOKING.push_title
            ,T_PUSH_BOOKING.push_msg
            ,T_PUSH_BOOKING.push_img
            ,T_PUSH_BOOKING.push_link
            ,T_PUSH_BOOKING.state
            ,T_PUSH_BOOKING.send_count
            ,T_PUSH_BOOKING.success_count
            ,T_PUSH_BOOKING.create_user
            ,T_PUSH_BOOKING.booking_at
            ,T_PUSH_BOOKING.partners
            ,T_PUSH_BOOKING.devices
            ,func.date_format(T_PUSH_BOOKING.create_at, '%Y-%m-%d %T').label('create_at')
            ,func.date_format(T_PUSH_BOOKING.update_at, '%Y-%m-%d %T').label('update_at')
            ,func.date_format(T_PUSH_BOOKING.delete_at, '%Y-%m-%d %T').label('delete_at')
            ,func.date_format(T_PUSH_BOOKING.send_at, '%Y-%m-%d %T').label('send_at')
        )
        .filter(T_PUSH_BOOKING.uid == uid)
    )
    format_sql(sql)
    return sql.first()

# 푸시발송예약_편집 - 등록
def push_booking_create(request: Request, pushBooking: PushBooking) :
    request.state.inspect = frame()
    db = request.state.db 
    user = request.state.user

    db_item = T_PUSH_BOOKING (
         send_type = pushBooking.send_type
        ,rec_type = pushBooking.rec_type
        ,push_title = pushBooking.push_title
        ,push_msg = pushBooking.push_msg
        ,push_img = pushBooking.push_img
        ,push_link = pushBooking.push_link
        ,create_user = user.user_id
        ,booking_at = pushBooking.booking_at
        ,partners = pushBooking.partners
        ,devices = pushBooking.devices
    )
    db.add(db_item)
    db.flush()

    pushBooking.uid = db_item.uid
    push_booking_msg_create(request, pushBooking)
    request.state.inspect = frame()

    create_log(request, db_item.uid, "T_PUSH_BOOKING", "INSERT", "푸쉬 발송 예약 등록", 0, db_item.uid, "", "", user.user_id)
    request.state.inspect = frame()

    return db_item

# 푸시메시지 미리 생성
def push_booking_msg_create(request: Request, pushBooking: PushBooking) :
    request.state.inspect = frame()
    db = request.state.db 
    user = request.state.user

    if pushBooking.rec_type == "P" : # 고객사
        device_list = get_partners_device(request, pushBooking.partners)
        request.state.inspect = frame()
    
    elif pushBooking.rec_type == "S" : # 디바이스개별
        # device_list = get_partners_device(request, pushBooking.partners)
        request.state.inspect = frame()

    for c in device_list:
        push_title = pushBooking.push_title
        arr_title_val = re.compile('#{[^{}]*}').findall(push_title)
        for k in arr_title_val :
            if k in push_title:
                if k == "#{복지몰명}" :
                    v = c.mall_name
                if k == "#{고객사명}" :
                    v = c.company_name
                push_title = push_title.replace(k, v)
            else:
                push_title = push_title.replace(k, "")

        push_msg = pushBooking.push_msg
        arr_msg_val = re.compile('#{[^{}]*}').findall(push_msg)
        for k in arr_msg_val :
            if k in push_msg:
                if k == "#{복지몰명}" :
                    v = c.mall_name
                if k == "#{고객사명}" :
                    v = c.company_name
                push_msg = push_msg.replace(k, v)
            else:
                push_msg = push_msg.replace(k, "")

        # 링크 도메인 연결 
        push_link = pushBooking.push_link
        if push_link != "" :
            push_link = "https://" + c.partner_id + ".welfaredream.com" + push_link
        
        db_item2 = T_PUSH_BOOKING_MSG (
            booking_uid = pushBooking.uid
            ,bars_uuid = c.bars_uuid
            ,user_id = c.user_id
            ,partner_id = c.partner_id
            ,device_os = c.device_os
            ,push_title = push_title
            ,push_msg = push_msg
            ,push_img = pushBooking.push_img
            ,push_link = push_link
            ,push_result = ""
            ,send_at = pushBooking.booking_at
        )
        db.add(db_item2)
        db.flush()

# 푸시발송예약_편집 - 수정
def push_booking_update(request: Request, pushBooking: PushBooking) :
    request.state.inspect = frame()
    db = request.state.db 
    user = request.state.user

    res = db.query(T_PUSH_BOOKING).filter(T_PUSH_BOOKING.uid == pushBooking.uid).first()

    if res is None :
        raise ex.NotFoundUser

    if pushBooking.rec_type is not None and res.rec_type != pushBooking.rec_type : 
        create_log(request, pushBooking.uid, "T_PUSH_BOOKING", "rec_type", "수신대상", res.rec_type, pushBooking.rec_type, "", "", user.user_id)
        request.state.inspect = frame()
        res.rec_type = pushBooking.rec_type

    if pushBooking.push_title is not None and res.push_title != pushBooking.push_title : 
        create_log(request, pushBooking.uid, "T_PUSH_BOOKING", "push_title", "푸시 제목", res.push_title, pushBooking.push_title, "", "", user.user_id)
        request.state.inspect = frame()
        res.push_title = pushBooking.push_title

    if pushBooking.push_msg is not None and res.push_msg != pushBooking.push_msg : 
        create_log(request, pushBooking.uid, "T_PUSH_BOOKING", "push_msg", "푸시 내용", res.push_msg, pushBooking.push_msg, "", "", user.user_id)
        request.state.inspect = frame()
        res.push_msg = pushBooking.push_msg

    if pushBooking.push_img is not None and res.push_img != pushBooking.push_img : 
        create_log(request, pushBooking.uid, "T_PUSH_BOOKING", "push_img", "푸시 이미지", res.push_img, pushBooking.push_img, "", "", user.user_id)
        request.state.inspect = frame()
        res.push_img = pushBooking.push_img

    if pushBooking.push_link is not None and res.push_link != pushBooking.push_link : 
        create_log(request, pushBooking.uid, "T_PUSH_BOOKING", "push_link", "푸시 연결링크", res.push_link, pushBooking.push_link, "", "", user.user_id)
        request.state.inspect = frame()
        res.push_link = pushBooking.push_link

    if pushBooking.booking_at is not None and res.booking_at != pushBooking.booking_at : 
        create_log(request, pushBooking.uid, "T_PUSH_BOOKING", "booking_at", "발송예약일", res.booking_at, pushBooking.booking_at, "", "", user.user_id)
        request.state.inspect = frame()
        res.booking_at = pushBooking.booking_at

    if pushBooking.partners is not None and res.partners != pushBooking.partners : 
        create_log(request, pushBooking.uid, "T_PUSH_BOOKING", "partners", "수신대상 P 고객사", res.partners, pushBooking.partners, "", "", user.user_id)
        request.state.inspect = frame()
        res.partners = pushBooking.partners

    if pushBooking.devices is not None and res.devices != pushBooking.devices : 
        create_log(request, pushBooking.uid, "T_PUSH_BOOKING", "devices", "수신대상 S 개별디바이스", res.devices, pushBooking.devices, "", "", user.user_id)
        request.state.inspect = frame()
        res.devices = pushBooking.devices

    db.query(T_PUSH_BOOKING_MSG).filter(T_PUSH_BOOKING_MSG.booking_uid == pushBooking.uid).delete()
    push_booking_msg_create(request, pushBooking)
    request.state.inspect = frame()

    res.update_at = util.getNow()
    return res

# 푸시발송예약_편집 - 삭제
def push_booking_delete(request: Request, uid: int):
    request.state.inspect = frame()
    db = request.state.db
    user = request.state.user
    
    db_item = db.query(T_UMS_TEMPLATE).filter(T_UMS_TEMPLATE.uid == uid).first()
    db_item.delete_at = util.getNow()

    create_log(request, uid, "T_UMS_TEMPLATE", "DELETE", "ums템플릿 삭제", 0, db_item.uid, "", "", user.user_id)
    request.state.inspect = frame()

    return db_item

# 푸시발송예약_수신대상_고객사
def rec_type_partners(request: Request):
    request.state.inspect = frame()
    db = request.state.db

    filters = []
    filters.append(getattr(T_PARTNER, "delete_at") == None)
    filters.append(getattr(T_PARTNER, "state") == "200")
    filters.append(getattr(T_PARTNER, "sponsor") == "welfaredream")

    # 고객사 별 DEVICE 수
    device_count_stmt = (
        db.query(
            T_APP_DEVICE.partner_id.label("partner_id")
            ,func.count(T_APP_DEVICE.partner_id).label('count')
        )
        .filter(T_APP_DEVICE.is_push == 'T')
        .group_by(T_APP_DEVICE.partner_id)
        .subquery()
    )

    sql = (
        db.query(
             T_PARTNER.uid
            ,T_PARTNER.partner_id
            ,T_PARTNER.mall_name
            ,T_PARTNER.company_name
            ,T_PARTNER.state
            ,device_count_stmt.c.count
        )
        .join(
            device_count_stmt, 
            T_PARTNER.partner_id == device_count_stmt.c.partner_id
        )
        .filter(*filters)
        .order_by(T_PARTNER.uid.desc())
    )

    format_sql(sql)

    rows = []
    for c in sql.all():
        rows.append(dict(zip(c.keys(), c)))

    jsondata = {}
    jsondata.update({"list": rows})

    return jsondata

# 푸시수신대상 고객사의 device 리스트
def get_partners_device (request: Request, partners: List[int]) :
    request.state.inspect = frame()
    db = request.state.db 
    filters = []
    filters.append(getattr(T_APP_DEVICE, "delete_at") == None)

    subquery = (
        db.query (T_PARTNER.uid, T_PARTNER.partner_id, T_PARTNER.mall_name, T_PARTNER.company_name)
        .filter(T_PARTNER.uid.in_(partners), T_PARTNER.delete_at == None)
        .subquery()
    )

    sql = (
        db.query(
             T_APP_DEVICE.uid
            ,T_APP_DEVICE.user_id
            ,T_APP_DEVICE.partner_id
            ,T_APP_DEVICE.bars_uuid
            ,T_APP_DEVICE.device_os
            ,T_APP_DEVICE.gender
            ,T_APP_DEVICE.birth
            ,T_APP_DEVICE.mobile
            ,T_APP_DEVICE.email
            ,T_APP_DEVICE.is_sms
            ,T_APP_DEVICE.is_mailing
            ,T_APP_DEVICE.create_at
            ,T_APP_DEVICE.update_at
            ,T_APP_DEVICE.delete_at
            ,subquery.c.uid
            ,subquery.c.partner_id
            ,subquery.c.mall_name
            ,subquery.c.company_name
        )
        .join(
            subquery,
            subquery.c.partner_id == T_APP_DEVICE.partner_id
        ) 
        .filter(*filters)
    )

    # format_sql(sql)

    # rows = []
    # for c in sql.all():
    #     rows.append(dict(zip(c.keys(), c)))

    return sql.all()



# 발송_예정_내역
def push_send_list(request: Request, page_param: PushBookingMsgListInput):
    request.state.inspect = frame()
    db = request.state.db

    filters = []
    filters.append(getattr(T_PUSH_BOOKING_MSG, "booking_uid") == page_param.booking_uid)

    sql = (
        db.query(
             T_PUSH_BOOKING_MSG.uid
            ,T_PUSH_BOOKING_MSG.booking_uid
            ,T_PUSH_BOOKING_MSG.bars_uuid
            ,T_PUSH_BOOKING_MSG.user_id
            ,T_PUSH_BOOKING_MSG.partner_id
            ,T_PUSH_BOOKING_MSG.device_os
            ,T_PUSH_BOOKING_MSG.push_title
            ,T_PUSH_BOOKING_MSG.push_msg
            ,T_PUSH_BOOKING_MSG.push_img
            ,T_PUSH_BOOKING_MSG.push_result
            ,T_PUSH_BOOKING_MSG.send_at
            ,T_PUSH_BOOKING_MSG.create_at
        )
        .filter(*filters)
        .order_by(T_PUSH_BOOKING_MSG.uid.desc())
        .offset((page_param.page-1)*page_param.page_view_size)
        .limit(page_param.page_view_size)
    )

    format_sql(sql)

    rows = []
    for c in sql.all():
        rows.append(dict(zip(c.keys(), c)))

    # [ S ] 페이징 처리
    page_param.page_total = (
        db.query(T_PUSH_BOOKING)
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