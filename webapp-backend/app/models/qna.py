from sqlalchemy import Column, String, Integer, ForeignKey, text, DateTime

from app.core.database import Base
from app.schemas.schema import *

class T_QNA(Base):
    __tablename__ = "T_QNA"
    uid = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    contents = Column(String)
    user_name = Column(String)
    com_name = Column(String)
    email = Column(String)
    mobile = Column(String)
    post = Column(String)
    addr = Column(String)
    addrDetail = Column(String)
    reg_ip = Column(String)
    reg_date = Column(DateTime, server_default=text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))




