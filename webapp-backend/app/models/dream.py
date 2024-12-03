from sqlalchemy import Column, String, Integer, ForeignKey, text, DateTime

from app.core.database import Base
from app.schemas.schema import *

class T_SEND_DOC(Base):
    __tablename__ = "T_SEND_DOC"
    UID = Column(Integer, primary_key=True, index=True)
    TO_EMAIL = Column(String) 
    CLIENT_IP = Column(String) 
    RESULT = Column(String) 
    DOC_TYPE = Column(String) 
    COMPANY = Column(String) 
    STAFF = Column(String) 
    MOBILE = Column(String) 
    REG_DATE = Column(DateTime, server_default=text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))

class T_DREAM_COUNSEL(Base):
    __tablename__ = "T_DREAM_COUNSEL"
    uid = Column(Integer, primary_key=True, index=True)
    company_name = Column(String) 
    homepage_url = Column(String) 
    staff_count = Column(Integer) 
    wish_build_at = Column(DateTime) 
    staff = Column(String) 
    staff_position = Column(String) 
    staff_phone = Column(String) 
    staff_email = Column(String) 
    contents = Column(String)
    state = Column(String, default='100') 
    create_at = Column(DateTime, server_default=text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))
    update_at = Column(DateTime) 
    delete_at = Column(DateTime) 

class T_PARTNER(Base):
    __tablename__ = "T_PARTNER"
    uid = Column(Integer, primary_key=True, index=True)
    partner_type = Column(String) 
    partner_id = Column(String) 
    mall_name = Column(String) 
    company_name = Column(String) 
    sponsor = Column(String) 
    partner_code = Column(String) 
    prefix = Column(String) 
    logo = Column(String) 
    is_welfare = Column(String) 
    is_dream = Column(String) 
    state = Column(String) 
    create_at = Column(DateTime, server_default=text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))
    delete_at = Column(DateTime) 
    update_at = Column(DateTime) 