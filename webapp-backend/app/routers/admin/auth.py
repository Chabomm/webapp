from fastapi import APIRouter, Depends, HTTPException, status, Response, Request, Body
from fastapi.responses import RedirectResponse, JSONResponse
from inspect import currentframe as frame
import jwt

from app.core import exceptions as ex
from app.core import util
from app.core.config import PROXY_PREFIX, api_same_origin
from app.models.member import *
from app.models.session import *
from app.schemas.auth import *
from app.schemas.member import *
from app.schemas.board import *
from app.service import admin_service
from app.service import auth_service
from app.deps.auth import signin, signin_azure, create_access_token, get_current_active_user, ACCESS_TOKEN_EXPIRE_MINUTES, REFRESH_TOKEN_EXPIRE_MINUTES, SECRET_KEY, ALGORITHM

router = APIRouter (
    prefix = PROXY_PREFIX,
    tags=["admin"],
)

@router.post("/admin/signin")
def login_for_access_token(
    request: Request,
    response: Response,
    signin_request: SignInRequest = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "dev@indend.co.kr",
                "description": "",
                "value": {
                    "user_id" : "dev@indend.co.kr",
                    "user_pw" : "1234"
                }
            },
            "example02" : {
                "summary": "azure 로그인",
                "description": "",
                "value": {
                    "user_id" : "dev@indend.co.kr",
                    "sub" : "hash pw value"
                }
            },
        }
    )
):
    user = signin(request, signin_request)

    if user is None :
        return ex.ReturnOK(404, "정보를 찾을 수 없습니다. 아이디와 비밀번호를 다시 확인해 주세요", request)
    
    token_data = TokenDataAdmin (
         token_name = "WEBAPP-ADMIN"
        ,site_id = user.site_id
        ,depart = user.depart
        ,user_uid = user.uid
        ,user_id = user.user_id
        ,user_name = user.user_name
        ,role = user.role
        ,roles = user.roles
    )
    access_token = create_access_token (data=util.toJson(token_data), expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    refresh_token = create_access_token (data=util.toJson(token_data), expires_delta=timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES))
    session_param = T_SESSION (
         site_id = "WEBAPP-ADMIN"
        ,user_uid = token_data.user_uid
        ,user_id = token_data.user_id
        ,access_token = access_token
        ,refresh_token = refresh_token
        ,ip = util.getClientIP()
    )

    token_data.access_token = access_token
    request.state.user = token_data

    # 세션생성
    auth_service.create_session(request, session_param)
    request.state.inspect = frame()

    # 관리자 메뉴 가져오기
    res = auth_service.get_admin_menus(request, token_data.user_uid, user)
    request.state.inspect = frame()

    response = JSONResponse(ex.ReturnOK(200, "", request, {"access_token": access_token, "token_type": "bearer", "admin_menus": res["admin_menus"]}))

    response.set_cookie( key=token_data.token_name, value=access_token )

    return response
