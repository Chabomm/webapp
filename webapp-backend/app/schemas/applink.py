from typing import List, Dict, Any, Union, Optional
from datetime import date, datetime, time, timedelta

from app.schemas.schema import *
from app.schemas.log import *

class DeepLink(Status):
    uid: int = Field(0, title="T_DEEP_LINK uid")
    site_id: Optional[str] = Field(None, title="프로젝트", max_length=50)
    dlink_type: Optional[str] = Field("etc", title="event, special, month, today, plan, goods", max_length=50)
    dlink_uid: Optional[int] = Field(0, title="타입 uid")
    mall_link: Optional[str] = Field(None, title="mall 링크", max_length=255)
    app_link: Optional[str] = Field(None, title="app 링크", max_length=255)
    group_id: Optional[int] = Field(None, title="그룹 uid")
    banner: Optional[str] = Field(None, title="배너 이미지", max_length=255)
    create_at: Optional[datetime] = Field(None, title="등록일")
    update_at: Optional[datetime] = Field(None, title="수정일")
    delete_at: Optional[datetime] = Field(None, title="삭제일")
    class Config:
        orm_mode = True

class DeepLinkGroup(Status):
    uid: int = Field(0, title="T_DEEP_LINK_GROUP uid")
    site_id: Optional[str] = Field("eum", title="프로젝트", max_length=50)
    title: Optional[str] = Field("", title="그룹명", max_length=255)
    create_at: Optional[datetime] = Field(None, title="등록일")
    update_at: Optional[datetime] = Field(None, title="수정일")
    delete_at: Optional[datetime] = Field(None, title="삭제일")
    class Config:
        orm_mode = True

class DeepLinkInput(AppModel):
    uid: int = Field(0, title="T_DEEP_LINK 고유번호")
    site_id: Optional[str] = Field(None, title="프로젝트", max_length=50)
    dlink_type: Optional[str] = Field(None, title="event, special, month, today, plan, goods", max_length=50)
    dlink_uid: Optional[int] = Field(0, title="타입 uid")
    mall_link: Optional[str] = Field(None, title="mall 링크", max_length=255)
    app_link: Optional[str] = Field(None, title="app 링크", max_length=255)
    group_id: Optional[int] = Field(None, title="그룹uid")
    sort_array: Optional[List[int]] = Field([], title="변경할 메뉴 순서")
    banner: Optional[str] = Field(None, title="배너 이미지", max_length=255)
    mode: Optional[str] = Field(None, title="REG/MOD/DEL")
    class Config:
        orm_mode = True

class DeepLinkGroupInput(AppModel):
    uid: int = Field(0, title="T_DEEP_LINK_GROUP 고유번호")
    title: Optional[str] = Field(None, title="이름", max_length=255)
    site_id: Optional[str] = Field(None, title="프로젝트", max_length=50)
    mode: Optional[str] = Field(None, title="REG/MOD/DEL")
    class Config:
        orm_mode = True

class DeepLinkAppInput(AppModel):
    group_uid: Optional[int] = Field(0, title="T_DEEP_LINK_GROUP 고유번호")
    uid: Optional[int] = Field(0, title="T_DEEP_LINK 고유번호")
    class Config:
        orm_mode = True

class DeepLinkReadInput(AppModel):
    site_id: Optional[str] = Field(None, title="site id")
    link_uid: Optional[int] = Field(0, title="T_DEEP_LINK 고유번호")
    group_uid: Optional[int] = Field(0, title="T_DEEP_LINK_GROUP 고유번호")
    class Config:
        orm_mode = True