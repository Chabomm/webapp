from sqlalchemy.orm import Session, aliased
from sqlalchemy import func, select, column, table, case
from fastapi import Request
from inspect import currentframe as frame
from fastapi.encoders import jsonable_encoder
import math

import smtplib
from pathlib import Path
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email.utils import formatdate
from email import encoders

from app.core.config import *
from app.core import util
from app.core.database import format_sql
from app.models.ums import *
from app.schemas.ums import *
from app.service.log_service import *

def read(request: Request, ums_uid: int):
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
            ,T_UMS_TEMPLATE.profile
        )
        .filter(T_UMS_TEMPLATE.uid == ums_uid)
    )
    format_sql(sql)
    res = sql.first()
    if res is not None :
        res = dict(zip(res.keys(), res))
    return res

def create_umslog(request: Request, log_param: T_UMS_LOG):
    request.state.inspect = frame()
    db = request.state.db
    db_item = log_param 
    db.add(db_item)
    db.flush()
    db.commit()
    return db_item

# 복지드림 앱 push uuid 등록
def device_update(request: Request, info: Dict) :
    request.state.inspect = frame()
    db = request.state.db 

    sql = db.query(T_APP_DEVICE).filter(T_APP_DEVICE.bars_uuid == info["bars_uuid"])
    format_sql(sql)
    res = sql.first()

    if res is None : # 없는 사용자면 INSERT
        db_item = T_APP_DEVICE (
             user_id = info["user_id"]
            ,partner_id = info["partner_id"]
            ,bars_uuid = info["bars_uuid"]
            ,device_os = info["device_os"]
            ,gender = info["gender"]
            ,birth = info["birth"]
            ,mobile = info["mobile"]
            ,email = info["email"]
            ,is_sms = info["is_sms"]
            ,is_mailing = info["is_mailing"]
        )
        db.add(db_item)
        db.flush()
        create_log(request, db_item.uid, "T_APP_DEVICE", "INSERT", "디바이스 등록", "", info["user_id"], "", "", info["bars_uuid"])
        request.state.inspect = frame()
        return 1

    else :  # 있는 사용자면 UPDATE
        if "user_id" in info and res.user_id != info["user_id"] :
            create_log(request, res.uid, "T_APP_DEVICE", "user_id", "로그인ID", res.user_id, info["user_id"], "", "", info["bars_uuid"])
            request.state.inspect = frame()
            res.user_id = info["user_id"]

        if "partner_id" in info and res.partner_id != info["partner_id"] :
            create_log(request, res.uid, "T_APP_DEVICE", "partner_id", "고객사", res.partner_id, info["partner_id"], "", "", info["bars_uuid"])
            request.state.inspect = frame()
            res.partner_id = info["partner_id"]

        if "bars_uuid" in info and res.bars_uuid != info["bars_uuid"] :
            create_log(request, res.uid, "T_APP_DEVICE", "bars_uuid", "바이앱스uuid", res.bars_uuid, info["bars_uuid"], "", "", info["bars_uuid"])
            request.state.inspect = frame()
            res.bars_uuid = info["bars_uuid"]

        if "device_os" in info and res.device_os != info["device_os"] :
            create_log(request, res.uid, "T_APP_DEVICE", "device_os", "android/ios", res.device_os, info["device_os"], "", "", info["bars_uuid"])
            request.state.inspect = frame()
            res.device_os = info["device_os"]

        if "gender" in info and res.gender != info["gender"] :
            create_log(request, res.uid, "T_APP_DEVICE", "gender", "성별", res.gender, info["gender"], "", "", info["bars_uuid"])
            request.state.inspect = frame()
            res.gender = info["gender"]

        if "birth" in info and res.birth != info["birth"] :
            create_log(request, res.uid, "T_APP_DEVICE", "birth", "생년월일", res.birth, info["birth"], "", "", info["bars_uuid"])
            request.state.inspect = frame()
            res.birth = info["birth"]

        if "mobile" in info and res.mobile != info["mobile"] :
            create_log(request, res.uid, "T_APP_DEVICE", "mobile", "휴대전화", res.mobile, info["mobile"], "", "", info["bars_uuid"])
            request.state.inspect = frame()
            res.mobile = info["mobile"]

        if "email" in info and res.email != info["email"] :
            create_log(request, res.uid, "T_APP_DEVICE", "email", "이메일", res.email, info["email"], "", "", info["bars_uuid"])
            request.state.inspect = frame()
            res.email = info["email"]

        if "is_sms" in info and res.is_sms != info["is_sms"] :
            create_log(request, res.uid, "T_APP_DEVICE", "is_sms", "문자 수신여부", res.is_sms, info["is_sms"], "", "", info["bars_uuid"])
            request.state.inspect = frame()
            res.is_sms = info["is_sms"]

        if "is_mailing" in info and res.is_mailing != info["is_mailing"] :
            create_log(request, res.uid, "T_APP_DEVICE", "is_mailing", "이메일 수신여부", res.is_mailing, info["is_mailing"], "", "", info["bars_uuid"])
            request.state.inspect = frame()
            res.is_mailing = info["is_mailing"]

        res.update_at = util.getNow()
        return 2

def readlist(request: Request, page_param: PPage_param):
    request.state.inspect = frame()
    db = request.state.db

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
        .count()
    )
    page_param.page_last = math.ceil(page_param.page_total / page_param.page_view_size)
    page_param.page_size = len(rows) # 현재 페이지에 검색된 수
    # [ E ] 페이징 처리

    jsondata = {}
    jsondata.update(page_param)
    jsondata.update({"list": rows})

    return jsondata

def getAtSendData(send_obj) :
    msgId = ""
    if "msgId" in send_obj and send_obj['msgId'] != "" :
        msgId = send_obj['msgId'] 
    
    if "at_msgId" in send_obj and send_obj['at_msgId'] != "" :
        msgId = send_obj['at_msgId'] 

    template_code = send_obj['template_code'] 
    toMobile = send_obj['toMobile'] 
    subject = send_obj['title'] 
    content = send_obj['content'] 
    sms_kind = "L"

    oData = {}
    oData["msgid"] = msgId
    oData["profile_key"] = send_obj["PROFILE_KEY"]
    oData["message_type"] = "AT"
    oData["template_code"] = template_code
    oData["receiver_num"] = toMobile
    oData["message"] = content
    oData["reserved_time"] = "00000000000000"
    oData["sms_title"] = subject
    oData["sms_message"] = content
    oData["sms_kind"] = sms_kind
    oData["sender_num"] = "01030342581"

    return oData

def getSmsSendData(send_obj) :
    
    msgId = ""

    if "msgId" in send_obj and send_obj['msgId'] != "" :
        msgId = send_obj['msgId'] 
    
    if "at_msgId" in send_obj and send_obj['at_msgId'] != "" : 
        msgId = send_obj['at_msgId'] 

    toMobile = send_obj['toMobile'] 
    subject = send_obj['title'] 
    content = send_obj['content'] 
    sms_kind = "S"

    oData = {}
    oData["msgid"] = msgId
    oData["profile_key"] = send_obj["PROFILE_KEY"]
    oData["receiver_num"] = toMobile
    oData["reserved_time"] = "00000000000000"
    oData["sms_only"] = "Y"
    oData["sms_message"] = content
    oData["sms_title"] = subject
    oData["sms_kind"] = sms_kind
    oData["sender_num"] = "01030342581"

    return oData

def send_mail(send_obj):
    send_cc = [] # 사용안하지만 선언은 해둠
    send_to = []
    send_to.append(send_obj["toEmail"])
    send_bcc = []

    if "bccEmail" in send_obj and send_obj["bccEmail"] != "" :
        send_bcc.append(send_obj["bccEmail"]) 
    
    elif "bcc_list" in send_obj and len(send_obj["bcc_list"]) > 0 :
        send_bcc = send_obj["bcc_list"] # 리스트

    if not util.emailVaild(send_obj["toEmail"]) :
        send_obj["result"] = "주소형식이 올바르지 않습니다"
        return send_obj

    msg = MIMEMultipart()
    msg['From'] = EMAIL_FROM
    msg['To'] = ', '.join(send_to)
    msg['Cc'] = ', '.join(send_cc)
    msg['Date'] = formatdate(localtime=True)
    msg['Subject'] = send_obj["title"]
    msg.attach(MIMEText(send_obj["content"], 'html'))
    
    files=[] # 사용안하지만 선언은 해둠
    for path in files:
        part = MIMEBase('application', "octet-stream")
        with open(path, 'rb') as file:
            part.set_payload(file.read())
        encoders.encode_base64(part)
        part.add_header('Content-Disposition', 'attachment', filename=Path(path).name)
        msg.attach(part)
    
    rcpt = send_cc + send_bcc + send_to
    try : 
        smtp = smtplib.SMTP(EMAIL_SERVER, EMAIL_PORT)
        smtp.starttls()
        smtp.login(EMAIL_USER, EMAIL_PASS)
        smtp.sendmail(EMAIL_FROM, rcpt, msg.as_string())
        smtp.quit()
        send_obj["result"] = "OK"
        
    except smtplib.SMTPSenderRefused as ssre:
        send_obj["result"] = "발신자 주소가 거부되었습니다. 모든 SMTPResponseException 예외에 의해 설정된 어트리뷰트 외에도, 이것은 ‘sender’를 SMTP 서버가 거부한 문자열로 설정합니다.", str(ssre)

    except smtplib.SMTPHeloError as she:
        send_obj["result"] = "서버가 HELO 메시지를 거부했습니다.", str(she)

    except smtplib.SMTPDataError as sde:
        send_obj["result"] = "SMTP 서버가 메시지 데이터 수락을 거부했습니다.", str(sde)

    except smtplib.SMTPConnectError as sce:
        send_obj["result"] = "서버와의 연결을 설정하는 동안 에러가 발생했습니다.", str(sce)

    except smtplib.SMTPServerDisconnected as ssde:
        send_obj["result"] = "이 예외는 예기치 않게 서버와의 연결이 끊어지거나, 서버에 연결하기 전에 SMTP 인스턴스를 사용하려고 할 때 발생합니다.", str(ssde)

    except smtplib.SMTPAuthenticationError as sae:
        send_obj["result"] = "SMTP 인증이 잘못되었습니다. 서버가 제공된 username/password 조합을 수락하지 않았을 가능성이 높습니다.", str(sae)
    
    except smtplib.SMTPResponseException as sre:
        send_obj["result"] = "SMTP 에러 코드가 포함된 모든 예외의 베이스 클래스. 이러한 예외는 SMTP 서버가 에러 코드를 반환하는 일부 경우에 생성됩니다. 에러 코드는 에러의 smtp_code 어트리뷰트에 저장되며, smtp_error 어트리뷰트는 에러 메시지로 설정됩니다.", str(sre)

    except smtplib.SMTPRecipientsRefused as srre:
        send_obj["result"] = "모든 수신자 주소가 거부되었습니다. 각 수신자의 에러는 SMTP.sendmail()이 반환하는 것과 정확히 같은 종류의 딕셔너리인 recipients 어트리뷰트를 통해 액세스 할 수 있습니다.", str(srre)

    except smtplib.SMTPNotSupportedError as snse:
        send_obj["result"] = "시도한 명령이나 옵션이 서버에서 지원되지 않습니다.", str(snse)

    except smtplib.SMTPException as se:
        send_obj["result"] = "이 모듈에서 제공하는 다른 모든 예외에 대한 베이스 예외 클래스인 OSError의 서브 클래스.", str(se)

    return send_obj
