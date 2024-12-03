import json
from typing import Optional, List
from pydantic import BaseModel, Field
from fastapi.encoders import jsonable_encoder


# 최고 관리자
class TokenDataAdmin(BaseModel):
    token_name: Optional[str] = Field("WEBAPP-ADMIN")
    site_id: Optional[str] = Field(None)
    user_uid: Optional[int] = Field(None)
    user_id: Optional[str] = Field(None)
    user_name: Optional[str] = Field(None)
    depart: Optional[str] = Field(None)
    roles: Optional[List[int]] = Field([], title="권한")
    role: Optional[str] = Field(None)
    access_token: Optional[str] = Field(None)

def getTokenDataAdmin(user) :
    return TokenDataAdmin (
         token_name = user["token_name"]
        ,site_id = user["site_id"]
        ,user_uid = user["user_uid"]
        ,user_id = user["user_id"]
        ,user_name = user["user_name"]
        ,depart = user["depart"]
        ,roles = user["roles"]
        ,role = user["role"]
        ,access_token = user["access_token"]
    )


# def getUserData(user) :
#     return TokenData(
#          user_uid = user["user_uid"]
#         ,user_id = user["user_id"]
#         ,user_name = user["user_name"]
#         ,depart = user["depart"]
#         ,role = user["role"]
#         ,access_token = user["access_token"]
#     )


# class TokenData(BaseModel):
#     site_id: Optional[str] = Field(None)
#     user_uid: Optional[int] = Field(None)
#     user_id: Optional[str] = Field(None)
#     user_name: Optional[str] = Field(None)
#     depart: Optional[str] = Field(None)
#     role: Optional[str] = Field(None)
#     access_token: Optional[str] = Field(None)

class SignInRequest(BaseModel):
    user_id: Optional[str] = Field(None)
    user_pw: Optional[str] = Field(None)
    sub: Optional[str] = Field(None)
    
class SsoInput(BaseModel):
    user_idx: Optional[str] = Field(None, title="user_idx", example="bULjqtssy7C4kh11RKzLxQ==")
    user_id: Optional[str] = Field(None, title="user_id", example="R0CNcPaYXUOOFhk3Z7HFkj8sRnUPXSy1MZ/PDQPE4/E=")
    user_name: Optional[str] = Field(None, title="user_name", example="y2tmd+J6dcHv/7CVs2pu3A==")
    user_mobile: Optional[str] = Field(None, title="user_mobile", example="uY2VEABgZiqXe2Bsm5urtQ==")
    user_email: Optional[str] = Field(None, title="user_email", example="R82Vbt1fhCvhZTbl4wiznw==")
    site_id: Optional[str] = Field(None, title="site_id", example="ZvwvE150FFpOi5otp3uH7A==")
    sso_url: Optional[str] = Field(None, title="SSO_URL", example="http://localhost:5000/api/auth/sso/")
    redirect_url: Optional[str] = Field(None, title="REDIRECT_URL", example="http://localhost:8089/")

class tokenInput(BaseModel):
    token: str

class TokenOutput(BaseModel):
    access_token: str
    token_type: str

    # user_body = json.loads(user.body)
    # return TokenData(
    #      user_uid = user_body["user_uid"]
    #     ,user_id = user_body["user_id"]
    #     ,user_name = user_body["user_name"]
    #     ,depart = user_body["depart"]
    #     ,role = user_body["role"]
    # )