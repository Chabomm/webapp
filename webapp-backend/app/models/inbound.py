from sqlalchemy import Column, String, Integer, ForeignKey, text, DateTime

from app.core.database import Base
from app.schemas.schema import *

class T_INBOUND_LOG(Base):
    __tablename__ = "T_INBOUND_LOG"
    uid = Column(Integer, primary_key=True, index=True)
    route_path = Column(String) 
    route_name = Column(String) 
    request = Column(String) 
    response = Column(String) 
    reg_user = Column(String) 
    reg_date = Column(DateTime, server_default=text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))