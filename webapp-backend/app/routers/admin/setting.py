from fastapi import APIRouter, Depends, HTTPException, status, Response, Request, Body
from fastapi.responses import RedirectResponse, JSONResponse
from inspect import currentframe as frame
import jwt
import requests

from app.models.session import *
from app.schemas.auth import *
from app.core import exceptions as ex
from app.core import util
from app.core.config import *
from app.core.config import PROXY_PREFIX, api_same_origin
from app.models.setting import *
from app.schemas.setting import *
from app.service.admin import setting_service
from app.deps.auth import signin, create_access_token, get_current_active_user, ACCESS_TOKEN_EXPIRE_MINUTES, REFRESH_TOKEN_EXPIRE_MINUTES, SECRET_KEY, ALGORITHM

router = APIRouter (
    prefix = PROXY_PREFIX,
    tags=["admin/setting"],
)

# /be/admin/setting/domain/list
@router.post("/admin/setting/domain/list", dependencies=[Depends(api_same_origin)])
async def 도메인_리스트 (
    request: Request
    ,page_param: PPage_param
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    if not page_param.page or int(page_param.page) == 0:
        page_param.page = 1
    
    if not page_param.page_view_size or int(page_param.page_view_size) == 0 :
        page_param.page_view_size = 30

    res = setting_service.domain_list(request, page_param) 
    request.state.inspect = frame()
    return res

# /be/admin/setting/domain/read
@router.post("/admin/setting/domain/read", dependencies=[Depends(api_same_origin)])
async def 도메인_상세(
    request: Request
    ,pRead : PRead = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "T_SSL_DOMAIN uid",
                "description": "",
                "value": {
                    "uid" : 1
                }
            },
        }
    )
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    if pRead.uid == 0 :
        return SslDomain()
    
    res = setting_service.domain_read(request, pRead.uid)

    if res is None :
        return ex.ReturnOK(404, "데이터를 찾을 수 없습니다.", request)
        
    return res

# /be/admin/setting/domain/edit
@router.post("/admin/setting/domain/edit", dependencies=[Depends(api_same_origin)])
async def 도메인_편집(
    request: Request
    ,sslDomainInput: SslDomainInput = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "도메인 등록예시 01",
                "description": "",
                "value": {
                     "domain" : "test.com"
                    ,"expire" : "2023-08-22"
                    ,"mode" : "REG"
                }
            },
            "example02" : {
                "summary": "도메인 수정예시 01",
                "description": "",
                "value": {
                    "uid" : 4
                    ,"domain" : "ttttest.co.kr"
                    ,"expire" : "2023-08-23"
                    ,"mode" : "MOD"
                }
            },
            "example04" : {
                "summary": "도메인 삭제예시 01",
                "description": "",
                "value": {
                    "uid" : 4
                    ,"mode" : "DEL"
                }
            },
        }
    )
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    # 등록
    if sslDomainInput.mode == "REG" :
        res = setting_service.domain_create(request, sslDomainInput)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "도메인 등록 완료", request, {"uid" : res.uid})

    # 수정
    if sslDomainInput.mode == "MOD" :
        res = setting_service.domain_update(request, sslDomainInput)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "도메인 수정 완료", request, {"uid" : res.uid})

    # 삭제
    if sslDomainInput.mode == "DEL" :
        res = setting_service.domain_delete(request, sslDomainInput.uid)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "도메인 삭제 완료", request, {"uid" : res.uid})