from typing import Optional
from pydantic import BaseModel, Field

class Inbound(BaseModel):
    # uid : int = Field(0, title="orderUid")
    route_path : Optional[str] = Field(None, title="요청경로")
    route_name : Optional[str] = Field(None, title="요청명")
    request : Optional[str] = Field(None, title="요청")
    response : Optional[str] = Field(None, title="응답")
    reg_user : Optional[str] = Field(None, title="등록자")