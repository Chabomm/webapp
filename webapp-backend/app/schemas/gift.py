from typing import Optional
from pydantic import BaseModel, Field

class GiftSchema(BaseModel):
    orderNo : Optional[str] = Field(None, title="오더번호")
    client_ip : Optional[str] = Field(None, title="client ip")
    action_token : Optional[str] = Field(None, title="ok에 보낼 토큰")

class GiftOK(BaseModel):
    action_token : Optional[str] = Field(None, title="ok에 보낼 토큰")
    mode : Optional[str] = Field(None, title="mode")
    orderUid : int = Field(0, title="orderUid")
    agree : Optional[str] = Field(None, title="동의")
    RcvName : Optional[str] = Field(None, title="수령인 성함")
    RcvMobile : Optional[str] = Field(None, title="수령자 휴대번호")
    RcvPost : Optional[str] = Field(None, title="우편번호")
    RcvAddr : Optional[str] = Field(None, title="주소")
    RcvAddrDetail : Optional[str] = Field(None, title="상세주소")
    OrderMemo : Optional[str] = Field(None, title="배송메모")
    client_ip : Optional[str] = Field(None, title="client ip")