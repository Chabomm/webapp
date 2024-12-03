from fastapi import APIRouter, Depends, HTTPException, status, Response, Request, Body
from fastapi.responses import RedirectResponse, JSONResponse
from inspect import currentframe as frame

from app.core import exceptions as ex
from app.core import util
from app.deps.auth import get_current_active_user
from app.schemas.auth import *
from app.core.config import PROXY_PREFIX, api_same_origin

from app.schemas.dream import *
from app.service.admin import dream_service
from app.service import log_service

router = APIRouter (
    prefix = PROXY_PREFIX,
    tags=["admin/dream"],
)

# /be/admin/dream/list
@router.post("/admin/dream/counsel/list", dependencies=[Depends(api_same_origin)])
async def 구축문의_리스트 (
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

    res = dream_service.counsel_list(request, page_param) 
    request.state.inspect = frame()
    return res

# /be/admin/dream/counsel/read
@router.post("/admin/dream/counsel/read", response_model=DreamCounselOutput, dependencies=[Depends(api_same_origin)])
async def 구축문의_상세정보(
    request: Request
    ,pRead : PRead = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "구축문의번호 T_DREAM_COUNSEL의 uid",
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

    res = dream_service.counsel_read(request, pRead.uid)
    request.state.inspect = frame()

    # memo list 서비스 호출
    memo_list = log_service.memo_list(request, pRead.uid)
    request.state.inspect = frame()

    res.update({"memo_list" : memo_list["list"]})

    if pRead.uid == 0 :
        return DreamCounsel()
    
    if res is None :
        return ex.ReturnOK(404, "데이터를 찾을 수 없습니다.", request)
        
    return res

# /be/admin/qna/docs/filter
@router.post("/admin/dream/counsel/filter", dependencies=[Depends(api_same_origin)])
async def 구축문의_리스트_필터조건 (
    request: Request
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    result = {}
    result.update({"skeyword_type": [
        {"key": 'company_name', "value": '기업명'},
        {"key": 'staff', "value": '담당자명'},
        {"key": 'state', "value": '진행상태'},
    ]})

    # 진행상태
    result.update({"state": [
        {"key": '100', "text": '상담문의', "checked": True},
        {"key": '200', "text": '상담중', "checked": True},
        {"key": '300', "text": '도입보류', "checked": True},
        {"key": '501', "text": '도입대기', "checked": True},
        {"key": '502', "text": '도입신청완료', "checked": True},
    ]})

    return result

# /be/admin/dream/counsel/edit
@router.post("/admin/dream/counsel/edit", dependencies=[Depends(api_same_origin)])
async def 어드민_복지드림_구축신청_편집(
     request:Request
    ,dreamCounsel: DreamCounsel = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "구축문의 수정 예시 1",
                "description": "",
                "value": {
                     "mode" : "MOD"
                    ,"uid" : 10
                    ,"state" : "200"
                    ,"company_name" : "(주)가나다라"
                    ,"homepage_url" : "https://adfasdf"
                    ,"staff_count" : 659
                    ,"wish_build_at" : "2023-05-31"
                    ,"staff" : "담당자"
                    ,"staff_position" : "직책"
                    ,"staff_phone" : "010-1234-1234"
                    ,"staff_email" : "asdf@ttt.com"
                    ,"contents" : "테스트 상담 문의"
                }
            },
            "example02" : {
                "summary": "구축문의 uid",
                "description": "",
                "value": {
                     "mode" : "DEL"
                    ,"uid" : 9
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
    # if dreamCounsel.mode == "REG" :
    #     res = dream_service.counsel_create(request, dreamCounsel)
    #     request.state.inspect = frame()
    #     return ex.ReturnOK(200, "구축신청 등록 완료", request, {"uid" : res.uid})

    # 수정
    if dreamCounsel.mode == "MOD" :
        res = dream_service.counsel_update(request, dreamCounsel)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "구축신청서 수정 완료", request, {"uid" : res.uid})

    # 삭제
    if dreamCounsel.mode == "DEL" :
        res = dream_service.counsel_delete(request, dreamCounsel.uid)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "구축신청서 삭제 완료", request, {"uid" : res.uid})
