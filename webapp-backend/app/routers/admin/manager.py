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
from app.deps.auth import signin, create_access_token, get_current_active_user, ACCESS_TOKEN_EXPIRE_MINUTES, REFRESH_TOKEN_EXPIRE_MINUTES, SECRET_KEY, ALGORITHM

router = APIRouter(
    prefix=PROXY_PREFIX,
    tags=["admin"],
)

@router.post("/admin/admin_user_list/filter", dependencies=[Depends(api_same_origin)])
async def 관리자_리스트_필터조건(
    request: Request
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    result = {}

    # 전체 역할 리스트
    roles = admin_service.admin_rols_list(request)
    result.update({"roles": roles["list"]})

    print(result)

    # result.update({"skeyword_type": [
    #     {"key": 'push_title', "text": '푸시 제목'},
    #     {"key": 'push_msg', "text": '푸시 내용'},
    #     {"key": 'create_user', "text": '등록자'},
    # ]})

    # # 수신대상
    # result.update({"rec_type": [
    #     {"key": 'A', "text": '앱사용자전체', "checked": True},
    #     {"key": 'P', "text": '고객사', "checked": True},
    #     {"key": 'S', "text": '개별', "checked": True},
    # ]})

    # # 발송상태
    # result.update({"state": [
    #     {"key": '100', "text": '대기', "checked": True},
    #     {"key": '200', "text": '발송완료', "checked": True},
    #     {"key": '300', "text": '발송취소', "checked": True},
    # ]})

    return result
    
@router.post("/admin/admin_user_list", dependencies=[Depends(api_same_origin)])
async def 관리자_리스트(
    request: Request, page_param: PPage_param, user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    if not page_param.page or int(page_param.page) == 0:
        page_param.page = 1

    if not page_param.page_view_size or int(page_param.page_view_size) == 0:
        page_param.page_view_size = 30

    res = admin_service.admin_user_list(request, page_param)
    request.state.inspect = frame()

    return res

@router.post("/admin/admin_user_read", dependencies=[Depends(api_same_origin)])
async def 관리자_상세(
    request: Request, memberReadInput: MemberReadInput = Body(
        ...,
        examples={
            "example01": {
                "summary": "uid로 검색",
                "description": "",
                "value": {
                    "uid": 2
                },
            },
            "example02": {
                "summary": "user_id로 검색",
                "description": "",
                "value": {
                    "user_id": "dev@indend.co.kr"
                }
            },
        }
    ), user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    if memberReadInput.uid == 0:
        return Member()

    res = admin_service.admin_user_read(request, memberReadInput.uid, memberReadInput.user_id)
    request.state.inspect = frame()

    if res is None:
        return ex.ReturnOK(404, "데이터를 찾을 수 없습니다.", request)

    res.update({"user_pw": ""})
    # res = dict(zip(res.keys(), res))

    return res

@router.post("/admin/admin_user_edit", dependencies=[Depends(api_same_origin)])
async def 관리자_등록수정(
    request: Request, member: Member = Body(
        ...,
        examples={
            "example01": {
                "summary": "등록예시",
                "description": "",
                "value": {
                    "user_id": "test@indend.co.kr", "user_name": "테스트", "user_pw": "1q2w3e4r", "mobile": "010-0000-0000", "email": "test@indend.co.kr", "role": "test", "depart": "dev", "state": "200"
                }
            },
            "example02": {
                "summary": "수정예시",
                "description": "",
                "value": {
                    "uid": 8, "user_name": "권남구", "user_pw": "", "mobile": "010-2896-2650", "email": "dev@indend.co.kr", "role": "admin", "depart": "dev", "state": "200"
                }
            },
        }
    ), user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    if member.uid > 0:  # 관리자 수정
        res = admin_service.admin_user_edit(request, member)
        message = "수정이 완료되었습니다."

    elif member.uid is None or member.uid == 0:
        res = admin_service.admin_user_create(request, member)
        message = "등록이 완료되었습니다."

    request.state.inspect = frame()

    if 'dict' in str(type(res)) and "code" in res:
        if res["code"] == 300:
            return res

    return ex.ReturnOK(200, message, request, {"uid": res.uid})










## ========== 어드민 메뉴설정 start ========
@router.post("/admin/setup/menus", dependencies=[Depends(api_same_origin)])
async def 관리자_메뉴설정_리스트(
    request: Request
    ,adminMenuListInput: AdminMenuListInput = Body(
        ...,
        examples={
            "example01": {
                "summary": "T_ADMIN_MENU의 uid(depth)",
                "description": "",
                "value": {
                    "parent": 2
                },
            }
        }
    ), user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    res = admin_service.admin_menu_list(request, adminMenuListInput.parent)
    request.state.inspect = frame()
    return res

# async def 관리자_메뉴설정_상세
@router.post("/admin/setup/menus/read", dependencies=[Depends(api_same_origin)])
async def 관리자_메뉴설정_상세(
    request: Request
    ,pRead : PRead = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "T_ADMIN_MENU의  uid",
                "description": "",
                "value": {
                    "uid" : 23
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
        return AdminMenu()
    
    res = admin_service.admin_menu_read(request, pRead.uid)

    if res is None :
        return ex.ReturnOK(404, "데이터를 찾을 수 없습니다.", request)
        
    return res

@router.post("/admin/setup/menus/edit", dependencies=[Depends(api_same_origin)])
async def 관리자_메뉴_편집(
    request: Request
    ,adminMenuInput: AdminMenuInput = Body(
        ...,
        examples={
            "example01": {
                "summary": "대메뉴 등록하기 예시1",
                "description": "",
                "value": {
                    "name": "대메뉴 등록test",
                    "icon": "fas fa-vihara",
                    "mode": "REG"
                },
            },
            "example02": {
                "summary": "대메뉴 수정하기 예시1",
                "description": "",
                "value": {
                    "uid": 29,
                    "name": "대메뉴 수정test",
                    "icon": "fas fa-tree",
                    "mode": "MOD"
                },
            },
            "example03": {
                "summary": "소메뉴 수정하기 예시1",
                "description": "",
                "value": {
                    "uid": 22,
                    "name": "",
                    "to": "",
                    "mode": "REG"
                },
            },
        }
    ), user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    # if pRead.uid == 0:
    #     return Member()

    # 등록
    if adminMenuInput.mode == "REG" :
        res = admin_service.admin_menu_create(request, adminMenuInput)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "메뉴 등록 완료", request, {"uid" : res.uid})
    
    # 수정
    if adminMenuInput.mode == "MOD" :
        res = admin_service.admin_menu_update(request, adminMenuInput)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "메뉴 수정 완료", request, {"uid" : res.uid})
    
    # 순서
    if adminMenuInput.mode == "SORT" :
        admin_service.admin_menu_sort(request, adminMenuInput)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "순서 수정 완료", request)
    





## ========== 어드민 역할관리 start ========
@router.post("/admin/setup/roles/filter", dependencies=[Depends(api_same_origin)])
async def 관리자_역할관리_리스트_필터조건(
    request: Request
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    result = {}

    # 전체 메뉴 리스트
    menus = admin_service.menu_list_for_filter(request)
    result.update({"menus": menus})

    return result

@router.post("/admin/setup/roles", dependencies=[Depends(api_same_origin)])
async def 관리자_역할관리_리스트(
    request: Request
    , user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    # result = {}

    # 전체 역할 리스트
    roles = admin_service.admin_rols_list(request)
    request.state.inspect = frame()
    # result.update({"roles": roles})

    return roles

@router.post("/admin/setup/roles/read", dependencies=[Depends(api_same_origin)])
async def 관리자_역할관리_상세(
    request: Request
    ,pRead : PRead = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "T_ADMIN_ROULES의  uid",
                "description": "",
                "value": {
                    "uid" : 2
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
        return AdminRoles()
    
    res = admin_service.admin_roles_read(request, pRead.uid)

    if res is None :
        return ex.ReturnOK(404, "데이터를 찾을 수 없습니다. 다시 확인 후 시도해주세요", request)
        
    return res

@router.post("/admin/setup/roles/edit", dependencies=[Depends(api_same_origin)])
async def 관리자_역할관리_편집(
    request: Request
    ,adminRolesInput: AdminRolesInput = Body(
        ...,
        examples={
            "example01": {
                "summary": "대메뉴 등록하기 예시1",
                "description": "",
                "value": {
                    "name": "ㅇㅇ팀테스트",
                    "menus": [16, 17],
                    "mode": "REG"
                },
            },
            "example02": {
                "summary": "대메뉴 수정하기 예시1",
                "description": "",
                "value": {
                    "uid": 29,
                    "name": "대메뉴 수정test",
                    "icon": "fas fa-tree",
                    "mode": "MOD"
                },
            },
            "example03": {
                "summary": "소메뉴 수정하기 예시1",
                "description": "",
                "value": {
                    "uid": 22,
                    "name": "",
                    "to": "",
                    "mode": "REG"
                },
            },
        }
    ), user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    # 등록
    if adminRolesInput.mode == "REG" :
        res = admin_service.admin_roles_create(request, adminRolesInput)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "등록이 완료되었습니다.", request, {"uid" : res.uid})

    # 수정
    if adminRolesInput.mode == "MOD" :
        res = admin_service.admin_roles_update(request, adminRolesInput)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "수정이 완료되었습니다.", request, {"uid" : res.uid})
    
    # 삭제
    if adminRolesInput.mode == "DEL" :
        admin_service.admin_roles_delete(request, adminRolesInput.uid)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "삭제가 완료되었습니다.", request)
    



# /be/admin/setup/info/read
@router.post("/admin/setup/info/read", dependencies=[Depends(api_same_origin)])
async def 내정보보기 (
     request: Request
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    res = admin_service.info_read(request)
    request.state.inspect = frame()

    # a = 10 / 0

    if res is None:
        return ex.ReturnOK(404, "데이터를 찾을 수 없습니다.", request)

    return res



@router.post("/admin/setup/info/update", dependencies=[Depends(api_same_origin)])
async def 내정보수정 (
    request: Request
    ,myInfoInput: MyInfoInput = Body(
        ...,
        examples={
            "example01": {
                "summary": "내 정보 수정하기 예시1",
                "description": "",
                "value": {
                    "user_pw": "a1234",
                    "tel": "0321231234",
                    "mobile": "01012341234"
                },
            },
        }
    ), user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    # 수정
    res = admin_service.info_update(request, myInfoInput)
    request.state.inspect = frame()
    
    # import time
    # print("Python, time.sleep(2) -> 2초 기다림") 
    # time.sleep(5)

    return ex.ReturnOK(200, "수정이 완료되었습니다.", request, {"uid" : res.uid})
    