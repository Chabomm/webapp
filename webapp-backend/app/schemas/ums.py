from typing import List, Dict, Any, Union, Optional
from datetime import date, datetime, time, timedelta

from app.schemas.schema import *

class Ums_template(AppModel): 
    uid: int = Field(0, title="ums 고유번호")
    ums_type: Optional[str] = Field("", title="분류", max_length=10)
    platform: str = Field(None, title="분류", max_length=30)
    template_code: Optional[str] = Field("", title="템플릿코드", max_length=20)
    subject: Optional[str] = Field("", title="제목", max_length=200)
    content: Optional[str] = Field("", title="내용", max_length=1000)
    create_at: Optional[datetime] = Field(None, title="등록일")
    update_at: Optional[datetime] = Field(None, title="수정일")
    delete_at: Optional[datetime] = Field(None, title="삭제일")
    memo: Optional[str] = Field("", title="메모", max_length=1000)
    profile: Optional[str] = Field("", title="알림톡 프로필", max_length=50)
    mode: Optional[str] = Field("", title="REG/MOD/DEL")
    class Config:
        orm_mode = True

class send_obj(AppModel): 
    ums_type: str = Field(None, title="아이디")
    msgId: str = Field(None, title="아이디")
    toEmail : Optional[str] = Field(None, max_length=50)
    bccEmail : Optional[str] = Field(None, title="숨은참조", max_length=50)
    
class EmailSchema(AppModel):
    ums_uid : int
    send_list : List[send_obj]

class PushDeviceList(AppModel):
    device_uids : List[int]

class PushMessage(AppModel):
    device_uids : Optional[List[int]]
    title : str = Field("", title="메세지제목")
    msg : str = Field("", title="메세지내용")
    url : str = Field("", title="연결링크URL")
    img: str = Field("", title="이미지")
    is_list: str = Field("Y", title="메세지노출여부(Y/N)")
    etiquette : str = Field("Y", title="야간일때 야간차단 사용자에게 발송 여부(Y/N)")

class PushBooking(AppModel):
    uid : int= Field(0)
    img: Optional[str] = Field("")
    send_type: Optional[str] = Field("00000000000000")
    rec_type: Optional[str] = Field("P")
    rec_list: Optional[List[int]]
    push_title: Optional[str] = Field("")
    push_msg: Optional[str] = Field("")
    push_img: Optional[str] = Field("")
    push_link: Optional[str] = Field("")
    state: Optional[str] = Field("100")
    send_count: Optional[int] = Field(0)
    success_count: Optional[int] = Field(0)
    mode: Optional[str] = Field(None, title="REG/MOD/DEL")
    partners: Optional[List[int]] = Field([])
    devices: Optional[List[int]] = Field([])
    booking_at: Optional[datetime] = Field(None)
    booking_at_date: Optional[Dict] = Field(default_factory=dict)
    booking_at_time: Optional[str] = Field("08:00:00")

class PushBookingMsgListInput(PPage_param):
    booking_uid : int= Field(0)
    class Config:
        orm_mode = True