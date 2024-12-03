from sqlalchemy import Column, String, Integer, ForeignKey, text, DateTime

from app.core.database import Base
from app.schemas.schema import *

class T_CONFIG(Base):
    __tablename__ = "T_CONFIG"
    uid = Column(Integer, primary_key=True, index=True)
    site_id = Column(String)
    site_name = Column(String)
    at_profile = Column(String)
    logo = Column(String)
    port = Column(String)
    create_at = Column(DateTime, server_default=text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"), comment="등록일")
    update_at = Column(DateTime, comment="수정일")
    delete_at = Column(DateTime, comment="삭제일")

class ConfigInput(BaseModel):
    site_id     :	Optional[str] = Field("", title="사이트 아이디", example="")

class Config(BaseModel):
    uid          :	Optional[int] = Field("", title="uid", example="")
    site_id     :	Optional[str] = Field("", title="사이트 아이디", example="")
    site_name   :	Optional[str] = Field("", title="사이트 이름", example="")
    port        :	Optional[str] = Field("", title="사이트 port", example="8085")
    class Config:
        orm_mode = True