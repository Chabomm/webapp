from sqlalchemy import Column, String, Integer, ForeignKey, text, DateTime, JSON

from app.core.database import Base
from app.schemas.schema import *

class T_SSL_DOMAIN(Base):
    __tablename__ = "T_SSL_DOMAIN"
    uid = Column(Integer, primary_key=True, index=True)
    domain = Column(String, nullable=False, comment="도메인 주소")
    expire = Column(String, comment="만료일")
    create_at = Column(DateTime, server_default=text(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"), comment="등록일")
    update_at = Column(DateTime, comment="수정일")
    delete_at = Column(DateTime, comment="삭제일")