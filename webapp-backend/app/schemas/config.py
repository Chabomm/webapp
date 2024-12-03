from typing import List, Dict, Any, Union, Optional
from datetime import date, datetime, time, timedelta

from app.schemas.schema import *

class Config(AppModel):
    uid: int = Field(0, title="고유번호")
    site_id: str = Field("", title="프로젝트 ID")
    site_name: str = Field("", title="프로젝트 이름")
    at_profile: Optional[str] = Field("", title="알림톡프로필")
    logo: Optional[str] = Field('', title="로고이미지")
    port: Optional[str] = Field('', title="포트번호")
    create_at: Optional[datetime] = Field(None, title="등록일")
    update_at: Optional[datetime] = Field(None, title="수정일")
    delete_at: Optional[datetime] = Field(None, title="삭제일")
    class Config:
        orm_mode = True
