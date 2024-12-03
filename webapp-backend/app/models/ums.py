from sqlalchemy import Column, String, Integer, ForeignKey, text, DateTime, JSON

from app.core.database import Base
from app.schemas.schema import *

class T_UMS_LOG(Base):
    __tablename__ = "T_UMS_LOG"
    uid = Column(Integer, primary_key=True, index=True)
    ums_uid = Column(Integer)
    ums_type = Column(String)
    platform = Column(String)
    template_code = Column(String)
    profile = Column(String)
    req = Column(String)
    res = Column(String)
    reg_date = Column(DateTime, server_default=text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))

class T_UMS_TEMPLATE(Base):
    __tablename__ = "T_UMS_TEMPLATE"
    uid = Column(Integer, primary_key=True, index=True)
    ums_type = Column(String)
    platform = Column(String, default='admin')
    template_code = Column(String)
    subject = Column(String)
    content = Column(String)
    create_at = Column(DateTime, server_default=text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))
    update_at = Column(DateTime)
    delete_at = Column(DateTime)
    memo = Column(String)
    profile = Column(String)

class T_APP_DEVICE(Base):
    __tablename__ = "T_APP_DEVICE"
    uid = Column(Integer, primary_key=True, index=True)
    user_id = Column(String)
    partner_id = Column(String)
    bars_uuid = Column(String)
    device_os = Column(String)
    gender = Column(String)
    birth = Column(String)
    mobile = Column(String)
    email = Column(String)
    is_sms = Column(String)
    is_mailing = Column(String)
    is_push = Column(String)
    create_at = Column(DateTime, server_default=text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))
    update_at = Column(DateTime)
    delete_at = Column(DateTime)
  
  
class T_PUSH_BOOKING(Base):
    __tablename__ = "T_PUSH_BOOKING"
    uid = Column(Integer, primary_key=True, index=True)
    send_type = Column(String, comment="예약일")
    rec_type = Column(String, comment="수신대상")
    push_title = Column(String, comment="푸시 제목")
    push_msg = Column(String, comment="푸시 내용")
    push_img = Column(String, comment="푸시 이미지")
    push_link = Column(String, comment="푸시 연결링크")
    state = Column(String, default='100', comment="상태")
    send_count = Column(Integer, default=0, comment="발송 수")
    success_count = Column(Integer, default=0, comment="발송 성공 수")
    create_user = Column(String, comment="등록자")
    create_at = Column(DateTime, server_default=text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"), comment="등록일")
    update_at = Column(DateTime, comment="수정일")
    delete_at = Column(DateTime, comment="삭제일")
    send_at = Column(DateTime, comment="발송일")
    booking_at = Column(DateTime, comment="발송예약일")
    partners = Column(JSON, comment="수신대상 P 고객사")
    devices = Column(JSON, comment="수신대상 S 개별디바이스")
  
class T_PUSH_BOOKING_MSG(Base):
    __tablename__ = "T_PUSH_BOOKING_MSG"
    uid = Column(Integer, primary_key=True, index=True)
    booking_uid = Column(Integer, comment="T_PUSH_BOOKING uid")
    bars_uuid = Column(String, comment="DEVICE UUID")
    user_id = Column(String, comment="로그인 아이디")
    partner_id = Column(String, comment="고객사 아이디")
    device_os = Column(String, comment="android/ios")
    push_title = Column(String, comment="푸시 제목")
    push_msg = Column(String, comment="푸시 내용")
    push_img = Column(String, comment="푸시 이미지")
    push_link = Column(String, comment="푸시 연결링크")
    push_result = Column(String, comment="전송결과")
    send_at = Column(DateTime, comment="전송예정일")
    create_at = Column(DateTime, server_default=text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"), comment="등록일")
  
  
  
