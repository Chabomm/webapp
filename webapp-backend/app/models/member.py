from sqlalchemy import Column, String, Integer, ForeignKey, text, DateTime, JSON

from app.core.database import Base
from app.schemas.schema import *


class T_MEMBER(Base):
    __tablename__ = "T_MEMBER"
    uid = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, nullable=False)
    user_name = Column(String, nullable=False)
    user_pw = Column(String, nullable=False)
    mobile = Column(String)
    email = Column(String)
    tel = Column(String)
    role = Column(String, nullable=False, default='user')
    roles = Column(JSON)
    depart = Column(String)
    site_id = Column(String)
    state = Column(String, default='200')
    create_at = Column(DateTime, server_default=text(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"), comment="등록일")
    update_at = Column(DateTime, comment="수정일")
    delete_at = Column(DateTime, comment="삭제일")

class T_ADMIN_MENU(Base):
    __tablename__ = "T_ADMIN_MENU"
    uid = Column(Integer, primary_key=True, index=True)
    name = Column(String, comment="메뉴명")
    icon = Column(String, comment="아이콘")
    to = Column(String, comment="링크")
    sort = Column(Integer, comment="순서")
    depth = Column(Integer, comment="단계", default=1)
    parent = Column(Integer, comment="부모uid", default=0)

class T_ADMIN_ROLE(Base):
    __tablename__ = "T_ADMIN_ROLE"
    uid = Column(Integer, primary_key=True, index=True)
    name = Column(String, comment="역할명")
    menus = Column(JSON, comment="배정된메뉴 uids")
