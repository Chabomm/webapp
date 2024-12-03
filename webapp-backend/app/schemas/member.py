from typing import List, Dict, Any, Union, Optional
from datetime import date, datetime, time, timedelta

from app.schemas.schema import *


class Member(Status):
    uid: int = Field(0, title="MEMBER 고유번호")
    user_id: str = Field("", title="아이디", max_length=150)
    user_name: Optional[str] = Field("", title="이름", max_length=50)
    user_pw: Optional[str] = Field("", title="비밀번호", max_length=100)
    mobile: Optional[str] = Field("", title="전화번호", max_length=20)
    email: Optional[str] = Field("", title="이메일", max_length=100)
    tel: Optional[str] = Field("", title="내선번호", max_length=10)
    role: Optional[str] = Field("", title="권한", max_length=20)
    depart: Optional[str] = Field("", title="부서", max_length=25)
    state: Optional[str] = Field(None, title="상태", max_length=10)
    roles: Optional[List[int]] = Field([], title="권한")

    class Config:
        orm_mode = True

class MemberReadInput(AppModel):
    uid: Optional[int] = Field(0)
    user_id: Optional[str] = Field(None)

class AdminMenuInput(AppModel):
    uid: Optional[int] = Field(0, title="T_ADMIN_MENU의 고유번호")
    name: Optional[str] = Field(None, title="메뉴명")
    icon: Optional[str] = Field(None, title="아이콘")
    to: Optional[str] = Field(None, title="링크")
    depth: Optional[int] = Field(None, title="단계")
    parent: Optional[int] = Field(None, title="부모 uid")
    sort_array: Optional[List[int]] = Field([], title="변경할 메뉴 순서")
    mode: Optional[str] = Field(None, title="REG/MOD/DEL")

class AdminMenuListInput(AppModel):
    parent: Optional[int] = Field(0, title="부모 uid")

class AdminMenu(AppModel):
    uid: Optional[int] = Field(0, title="T_ADMIN_MENU의 고유번호")
    name: Optional[str] = Field("", title="메뉴명")
    icon: Optional[str] = Field("", title="아이콘")
    to: Optional[str] = Field("", title="링크")
    sort: Optional[int] = Field("", title="순서")
    depth: Optional[int] = Field(1, title="단계")
    parent: Optional[int] = Field(0, title="부모uid")
    class Config:
        orm_mode = True

class AdminRoles(AppModel):
    uid: Optional[int] = Field(0, title="T_ADMIN_MENU의 고유번호")
    name: Optional[str] = Field("", title="역할명")
    menus: Optional[List[int]] = Field([], title="배정된메뉴 uids")
    class Config:
        orm_mode = True

class AdminRolesInput(AppModel):
    uid: Optional[int] = Field(0, title="T_ADMIN_ROLES의 고유번호")
    name: Optional[str] = Field(None, title="메뉴명")
    menus: Optional[List[int]] = Field([], title="배정된메뉴 uids")
    mode: Optional[str] = Field(None, title="REG/MOD/DEL")

class MyInfoInput(AppModel):
    user_pw: Optional[str] = Field(None, title="비밀번호")
    tel: Optional[str] = Field(None, title="내선번호")
    mobile: Optional[str] = Field(None, title="핸드폰번호")
