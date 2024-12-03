
from sqlalchemy import Column, String, Integer, ForeignKey, text, DateTime

from app.core.database import Base
from app.schemas.schema import *


class T_SESSION(Base):
    __tablename__ = "T_SESSION"
    uid = Column(Integer, primary_key=True, index=True)
    site_id = Column(String)
    user_uid = Column(Integer)
    user_id = Column(String)
    access_token = Column(String)
    refresh_token = Column(String)
    ip = Column(String)
    create_date = Column(DateTime, server_default=text(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))
