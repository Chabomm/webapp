from fastapi import APIRouter, Depends, HTTPException, status, Response, Request, Body
from fastapi.responses import RedirectResponse, JSONResponse
from inspect import currentframe as frame

from app.core import exceptions as ex
from app.core import util
from app.deps.auth import get_current_active_user
from app.schemas.auth import *
from app.core.config import PROXY_PREFIX, api_same_origin

from app.schemas.dream import *
from app.service.admin import qna_service

from app.routers.dream import *

router = APIRouter (
    prefix = PROXY_PREFIX,
    tags=["admin/qna"],
)

# /be/admin/qna/docs
@router.post("/admin/qna/docs", dependencies=[Depends(api_same_origin)])
async def 소개서_다운이력_리스트 (
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

    res = qna_service.docs_list(request, page_param) 
    request.state.inspect = frame()
    return res

# /be/admin/qna/docs/filter
@router.post("/admin/qna/docs/filter", dependencies=[Depends(api_same_origin)])
async def 소개서_다운이력_리스트_필터조건 (
    request: Request
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    result = {}
    result.update({"skeyword_type": [
        {"key": 'DOC_TYPE', "value": '타입'},
        {"key": 'TO_EMAIL', "value": '이메일'},
        {"key": 'CLIENT_IP', "value": '아이피'},
    ]})

    # # config site list (프로젝트)
    # site_list = filter_service.config(request)
    # request.state.inspect = frame()
    # result.update({"site_id": site_list["list"]})

    # # board type list (게시판 유형)
    # result.update({"board_type": [
    #     {"key": 'notice', "value": 'notice'},
    #     {"key": 'faq', "value": 'faq'},
    #     {"key": 'common', "value": 'common'},
    #     {"key": 'gallery', "value": 'gallery'},
    # ]})

    return result