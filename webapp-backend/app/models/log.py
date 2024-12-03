from sqlalchemy import Column, String, Integer, ForeignKey, text, DateTime, Boolean

from app.core.database import Base
from app.schemas.schema import *

class T_CHANGE_LOG(Base):
    __tablename__ = "T_CHANGE_LOG"
    uid = Column(Integer, primary_key=True, index=True)
    cl_uid = Column(Integer)
    table_name = Column(String)
    column_key = Column(String)
    column_name = Column(String)
    cl_before = Column(String)
    cl_after = Column(String)
    seller = Column(String)
    buyer = Column(String)
    reg_user = Column(String)
    reg_date = Column(DateTime, server_default=text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))

class T_CHANGE_LOG_SPEC(Base):
    __tablename__ = "T_CHANGE_LOG_SPEC"
    uid = Column(Integer, primary_key=True, index=True)
    cl_uid = Column(Integer)
    table_name = Column(String)
    column_key = Column(String)
    column_name = Column(String)
    cl_before = Column(String)
    cl_after = Column(String)
    seller = Column(String)
    buyer = Column(String)
    reg_user = Column(String)
    reg_date = Column(DateTime, server_default=text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))

class T_MEMO(Base):
    __tablename__ = "T_MEMO"
    uid = Column(Integer, primary_key=True, index=True)
    table_uid = Column(Integer)
    table_name = Column(String)
    memo = Column(String)
    create_user = Column(String)
    create_at = Column(DateTime, server_default=text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))