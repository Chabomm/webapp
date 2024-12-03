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
from app.models.applink import *
from app.schemas.applink import *
from app.service.admin import applink_service, filter_service
from app.deps.auth import signin, create_access_token, get_current_active_user, ACCESS_TOKEN_EXPIRE_MINUTES, REFRESH_TOKEN_EXPIRE_MINUTES, SECRET_KEY, ALGORITHM

router = APIRouter (
    prefix = PROXY_PREFIX,
    tags=["admin/applink"],
)

# /be/admin/applink/read
@router.post("/admin/applink/deeplink/read", dependencies=[Depends(api_same_origin)])
async def 딥링크_상세(
    request: Request
    ,deepLinkReadInput : DeepLinkReadInput
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)
    
    group = applink_service.dpplink_group_read(request, deepLinkReadInput.group_uid) 
    request.state.inspect = frame()

    if deepLinkReadInput.link_uid == 0 :
        deep_link = DeepLink(site_id = group.site_id, group_id = group.uid)
    else :
        deep_link = applink_service.applink_read(request, deepLinkReadInput.link_uid)
        request.state.inspect = frame()

        if deep_link is None :
            return ex.ReturnOK(404, "게시물이 존재하지 않습니다.", request)

    jsondata = {}
    jsondata.update(deep_link)
    jsondata.update({"group" : group})
        
    return jsondata

# /be/admin/applink/deeplink/filter
@router.post("/admin/applink/deeplink/filter", dependencies=[Depends(api_same_origin)])
async def 딥링크_리스트_필터조건(
    request: Request
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    result = {}
    result.update({"skeyword_type": [
        {"key": 'title', "text": '그룹명'},
    ]})

    # 프로젝트
    result.update({"site_id": [
        {"key": 'eum', "text": '인천e몰', "checked": True},
        {"key": 'dream', "text": '복지드림', "checked": True},
    ]})

    # 링크 타입
    result.update({"dlink_type": [
        {"key": 'etc', "text": '기타', "checked": True},
        {"key": 'event', "text": '이벤트', "checked": True},
        {"key": 'special', "text": '특별관', "checked": True},
        {"key": 'weekend', "text": '주말특가', "checked": True},
        {"key": 'month', "text": '대기획전', "checked": True},
        {"key": 'month_intro', "text": '대기획전 인트로', "checked": True},
        {"key": 'today', "text": '오늘만할인', "checked": True},
        {"key": 'group', "text": '공동구매', "checked": True},
        {"key": 'plan', "text": '기획전', "checked": True},
        {"key": 'goods', "text": '상품상세', "checked": True},
    ]})
    
    group_list = filter_service.deeplink_gorup_list(request)
    request.state.inspect = frame()
    result.update({"group_list": group_list["list"]})
    
    return result

# /be/admin/deeplink/edit
@router.post("/admin/applink/deeplink/edit", dependencies=[Depends(api_same_origin)])
async def 딥링크_편집(
    request: Request
    ,deepLinkInput: DeepLinkInput
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)
    print('clickckckc')
    # 등록
    if deepLinkInput.mode == "REG" :
        res = applink_service.deeplink_create(request, deepLinkInput)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "딥링크 등록 완료", request, {"uid" : res.uid})

    # 수정
    if deepLinkInput.mode == "MOD" :
        res = applink_service.deeplink_update(request, deepLinkInput)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "딥링크 수정 완료", request, {"uid" : res.uid})

    # 삭제
    if deepLinkInput.mode == "DEL" :
        res = applink_service.deeplink_delete(request, deepLinkInput.uid)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "딥링크 삭제 완료", request, {"uid" : res.uid})
    
    # 순서
    if deepLinkInput.mode == "SORT" :
        applink_service.deeplink_sort(request, deepLinkInput)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "순서 수정 완료", request)
    
# /be/admin/deeplink/edit
@router.post("/admin/applink/deeplink/group/edit", dependencies=[Depends(api_same_origin)])
async def 딥링크_그룹_편집(
    request: Request
    ,deepLinkGroupInput: DeepLinkGroupInput = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "딥링크 그룹 등록예시 01",
                "description": "",
                "value": {
                     "site_id" : "goobi"
                    ,"title" : "6월 3주차"
                    ,"mode" : "REG"
                }
            },
            "example02" : {
                "summary": "딥링크 그룹 수정예시 01",
                "description": "",
                "value": {
                    "uid" : 4
                    ,"title" : "6월 3주차 수정!!!"
                    ,"mode" : "MOD"
                }
            },
            "example04" : {
                "summary": "딥링크 그룹 삭제예시 01",
                "description": "",
                "value": {
                    "uid" : 5
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
    if deepLinkGroupInput.mode == "REG" :
        res = applink_service.deeplink_group_create(request, deepLinkGroupInput)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "딥링크 그룹 등록 완료", request, {"uid" : res.uid})

    # 수정
    if deepLinkGroupInput.mode == "MOD" :
        res = applink_service.deeplink_group_update(request, deepLinkGroupInput)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "딥링크 그룹 수정 완료", request, {"uid" : res.uid})

    # 삭제
    if deepLinkGroupInput.mode == "DEL" :
        res = applink_service.deeplink_group_delete(request, deepLinkGroupInput.uid)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "딥링크 그룹 삭제 완료", request, {"uid" : res.uid})
    
# /be/admin/applink/read
@router.post("/admin/applink/deeplink/group/read", dependencies=[Depends(api_same_origin)])
async def 딥링크_그룹_상세(
    request: Request
    ,pRead : PRead = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "T_DEEP_LINK_GROUP uid",
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
        return DeepLinkGroup()
    
    res = applink_service.dpplink_group_read(request, pRead.uid)

    if res is None :
        return ex.ReturnOK(404, "그룹이 존재하지 않습니다.", request)
        
    return res


# [ S ] ------------uha

# /be/admin/applink/deeplink/posts
@router.post("/admin/applink/deeplink/posts", dependencies=[Depends(api_same_origin)])
async def 딥링크_게시글_리스트 (
    request: Request
    ,pRead: PRead
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    res = applink_service.applink_posts(request, pRead.uid) 
    request.state.inspect = frame()
    
    group = applink_service.dpplink_group_read(request, pRead.uid) 
    request.state.inspect = frame()

    res.update({"group":group})

    return res

# /be/admin/applink/deeplink/group/list
@router.post("/admin/applink/deeplink/group/list", dependencies=[Depends(api_same_origin)])
async def 딥링크_그룹_리스트 (
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

    res = applink_service.applink_group_list(request, page_param) 
    request.state.inspect = frame()
    return res

# [ E ] uha