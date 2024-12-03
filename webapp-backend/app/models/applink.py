from sqlalchemy import Column, String, Integer, ForeignKey, text, DateTime, JSON

from app.core.database import Base
from app.schemas.schema import *

class T_DEEP_LINK(Base):
    __tablename__ = "T_DEEP_LINK"
    uid = Column(Integer, primary_key=True, index=True)
    site_id = Column(String, comment="프로젝트")
    dlink_type = Column(String, comment="event, special, month, today, plan, goods")
    dlink_uid = Column(Integer, comment="타입 uid")
    mall_link = Column(String, comment="mall 링크")
    app_link = Column(String, comment="app link")
    group_id = Column(Integer, comment="그룹아이디")
    sort = Column(Integer, comment="순서")
    banner = Column(String, comment="배너")
    create_at = Column(DateTime, server_default=text(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"), comment="등록일")
    update_at = Column(DateTime, comment="수정일")
    delete_at = Column(DateTime, comment="삭제일")

class T_DEEP_LINK_APP(Base):
    __tablename__ = "T_DEEP_LINK_APP"
    uid = Column(Integer, primary_key=True, index=True)
    site_id = Column(String, comment="프로젝트")
    site_name = Column(String, comment="프로젝트 이름")
    deep_link = Column(String, comment="deep 링크")
    aos_store = Column(String, comment="안드로이드 스토어 링크")
    ios_store = Column(String, comment="ios 스토어 링크")
    create_at = Column(DateTime, server_default=text(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"), comment="등록일")
    update_at = Column(DateTime, comment="수정일")
    delete_at = Column(DateTime, comment="삭제일")

class T_DEEP_LINK_GROUP(Base):
    __tablename__ = "T_DEEP_LINK_GROUP"
    uid = Column(Integer, primary_key=True, index=True)
    title = Column(String, comment="제목")
    site_id = Column(String, comment="프로젝트")
    create_at = Column(DateTime, server_default=text(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"), comment="등록일")
    update_at = Column(DateTime, comment="수정일")
    delete_at = Column(DateTime, comment="삭제일")