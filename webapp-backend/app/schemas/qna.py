from typing import List, Dict, Any, Union, Optional
from datetime import date, datetime, time, timedelta

from app.schemas.schema import *

class Qna(Status):
    uid: int = Field(0, title="Qna 고유번호")
    title: str = Field("", title="문의 제목", max_length=200)
    contents: str = Field("", title="문의 내용", max_length=1000)
    user_name: str = Field("", title="이름", max_length=200)
    com_name: str = Field("", title="회사명", max_length=200)
    email: str = Field("", title="이메일", max_length=255)
    mobile: str = Field("", title="연락처", max_length=255)
    post: str = Field("", title="우편번호", max_length=20)
    addr: str = Field("", title="주소", max_length=100)
    addrDetail: str = Field("", title="주소상세", max_length=100)
    reg_ip: str = Field("", title="등록자IP", max_length=50)
    reg_date: datetime = Field(None, title="등록일")
    class Config:
        orm_mode = True

class QnaListInput(AppModel):
    page: int = Field(1, title="현재페이지")
    sort: str = Field("new", title="정렬방법")

class QnaListOutput(PPage_param, Status):
    list: List[Qna] = Field([], title="qna list")
    class Config:
        orm_mode = True




