from typing import List, Dict, Any, Union, Optional
from datetime import date, datetime, time, timedelta

from app.schemas.schema import *

class SslDomain(Status):
    uid: int = Field(0, title="T_SSL_DOMAIN 고유번호")
    domain: str = Field("", title="도메인 주소", max_length=100)
    expire: Optional[date] = Field(None, title="만료일")
    create_at: Optional[datetime] = Field(None, title="등록일")
    update_at: Optional[datetime] = Field(None, title="수정일")
    delete_at: Optional[datetime] = Field(None, title="삭제일")
    class Config:
        orm_mode = True

class SslDomainInput(AppModel):
    uid: int = Field(0, title="T_SSL_DOMAIN 고유번호")
    domain: str = Field("", title="도메인 주소", max_length=100)
    expire: Optional[date] = Field(None, title="만료일")
    mode: Optional[str] = Field(None, title="REG/MOD/DEL")
