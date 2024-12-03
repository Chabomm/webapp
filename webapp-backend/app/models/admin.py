from sqlalchemy import Column, String, Integer, ForeignKey, text, DateTime, JSON

from app.core.database import Base
from app.schemas.schema import *


class T_ADMIN(Base):
    __tablename__ = "T_ADMIN"
    uid = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, nullable=False)
    user_name = Column(String, nullable=False)
    user_pw = Column(String, nullable=False)
    mobile = Column(String)
    email = Column(String)
    role = Column(String, nullable=False, default='user')
    roles = Column(JSON, default=[])
    depart = Column(String)
    reg_date = Column(DateTime)
    reg_user = Column(String)
