from fastapi import APIRouter, Depends, HTTPException, status, Response, Request, Body
from fastapi.responses import RedirectResponse, JSONResponse
from inspect import currentframe as frame

from app.core import exceptions as ex
from app.core import util
from app.core.config import PROXY_PREFIX, api_same_origin
from app.models.member import *
from app.models.session import *
from app.models.board import *
from app.schemas.auth import *
from app.schemas.member import *
from app.schemas.board import *
from app.service.admin import board_service, filter_service
from app.deps.auth import signin, create_access_token, get_current_active_user, ACCESS_TOKEN_EXPIRE_MINUTES, REFRESH_TOKEN_EXPIRE_MINUTES, SECRET_KEY, ALGORITHM

from fastapi.datastructures import UploadFile
from fastapi.param_functions import File, Body, Form

from app.routers import aws

router = APIRouter (
    prefix = PROXY_PREFIX,
    tags=["admin/board"],
)

# /be/admin/board/list
@router.post("/admin/board/list", dependencies=[Depends(api_same_origin)])
async def 게시판_리스트(
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

    res = board_service.board_list(request, page_param) 
    request.state.inspect = frame()

    return res

# /be/admin/board/read
@router.post("/admin/board/read", dependencies=[Depends(api_same_origin)])
async def 게시판_상세(
    request: Request
    ,pRead : PRead = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "게시판환경 BoardConfig의  uid",
                "description": "",
                "value": {
                    "uid" : 363
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
        return Board()
    
    res = board_service.board_read(request, pRead.uid)

    if res is None :
        return ex.ReturnOK(404, "데이터를 찾을 수 없습니다.", request)
        
    return res

# /be/admin/board/edit
@router.post("/admin/board/edit", dependencies=[Depends(api_same_origin)])
async def 게시판_편집(
    request: Request
    ,board: Board = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "게시판 등록예시 01",
                "description": "",
                "value": {
                    "site_id" : "dream"
                    ,"board_type" : "common"
                    ,"board_name" : "테스트 일반 게시판"
                    ,"per_write" : "admin"
                    ,"per_read" : "admin"
                    ,"is_comment" : "F"
                    ,"mode" : "REG"
                }
            },
            "example02" : {
                "summary": "게시판 등록예시 02",
                "description": "",
                "value": {
                    "site_id" : "dream"
                    ,"board_type" : "notice"
                    ,"board_name" : "테스트 공지사항 게시판"
                    ,"per_write" : "admin"
                    ,"per_read" : "admin"
                    ,"is_comment" : "F"
                    ,"mode" : "REG"
                }
            },
            "example03" : {
                "summary": "게시판 수정예시 01",
                "description": "",
                "value": {
                    "uid" : 1
                    ,"site_id" : "dream"
                    ,"board_type" : "common"
                    ,"board_name" : "테스트 일반 게시판"
                    ,"per_write" : "admin"
                    ,"per_read" : "admin"
                    ,"is_comment" : "F"
                    ,"is_display" : "T"
                    ,"mode" : "MOD"
                }
            },
            "example04" : {
                "summary": "게시판 삭제예시 01",
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
    if board.mode == "REG" :
        res = board_service.create(request, board)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "게시판 등록 완료", request, {"uid" : res.uid})

    # 수정
    if board.mode == "MOD" :
        res = board_service.update(request, board)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "게시판 수정 완료", request, {"uid" : res.uid})

    # 삭제
    if board.mode == "DEL" :
        res = board_service.delete(request, board.uid)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "게시판 삭제 완료", request, {"uid" : res.uid})
    

## ========== 게시물 start ========

# /be/admin/posts/list
@router.post("/admin/posts/list", dependencies=[Depends(api_same_origin)])
async def 게시물_리스트(
    request : Request
    ,postsListInput: PostsListInput = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "관리자 게시물 리스트 예시1",
                "description": "",
                "value": {
                     "page": 1
                    ,"page_size": 0
                    ,"page_view_size": 0
                    ,"page_total": 0
                    ,"page_last": 0
                    ,"board_uid" : 0
                    ,"cate_uid" : 0
                }
            },
            "example02" : {
                "summary": "관리자 게시물 리스트 예시2",
                "description": "",
                "value": {
                     "page": 1
                    ,"page_size": 0
                    ,"page_view_size": 0
                    ,"page_total": 0
                    ,"page_last": 0
                    ,"board_uid" : 363
                    ,"cate_uid" : 0
                }
            },
        }
    )
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):  
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    if not postsListInput.page or int(postsListInput.page) == 0:
        postsListInput.page = 1
    
    if not postsListInput.page_view_size or int(postsListInput.page_view_size) == 0 :
        postsListInput.page_view_size = 30

    res = board_service.posts_list(request, postsListInput) 
    request.state.inspect = frame()

    return res

# /be/admin/posts/read
@router.post("/admin/posts/read", dependencies=[Depends(api_same_origin)])
async def 게시물_상세(
    request: Request
    ,pRead : PRead = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "게시물번호 T_BOARD의 uid",
                "description": "",
                "value": {
                    "uid" : 6
                }
            },
        }
    )
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    copy_deps_user = user # router Depends 때문에 따로 복사해둠
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)


    if pRead.uid == 0 :
        res = Posts()
    else :
        res = board_service.posts_read(request, pRead.uid)
        request.state.inspect = frame()    
    
    if res is None :
        return ex.ReturnOK(404, "데이터를 찾을 수 없습니다.", request)
    
    jsondata = {}
    jsondata.update({"values": res})
    jsondata.update({"filter": await 게시물_리스트_필터조건(request, copy_deps_user)})
        
    return jsondata

# /be/admin/posts/edit
@router.post("/admin/posts/edit")
async def 게시물_편집(
    request:Request
    ,postsEditInput : PostsEditInput
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)
    
    if postsEditInput.cate_uid == 0 :
        postsEditInput.cate_uid = None
        
    if postsEditInput.mode == 'REG' : 
        res = board_service.posts_create(request, postsEditInput)
        request.state.inspect = frame()
        
        if res is None :
            return ex.ReturnOK(500, "게시물 등록에 실패했습니다.", request)
        else :
            return ex.ReturnOK(200, "게시물 등록이 완료되었습니다.", request, {"uid":res.uid})
    
    elif postsEditInput.mode == 'MOD' :
        res = board_service.posts_update(request, postsEditInput)
        request.state.inspect = frame()

        return ex.ReturnOK(200, "게시물 수정이 완료되었습니다.", request)
    
    elif postsEditInput.mode == 'DEL' :
        board_service.posts_delete(request, postsEditInput)
        return ex.ReturnOK(200, "게시물 삭제가 완료되었습니다.", request)

    
















    

# /be/admin/board/filter
@router.post("/admin/board/filter", dependencies=[Depends(api_same_origin)])
async def 게시판_리스트_필터조건 (
    request: Request
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    result = {}
    result.update({"skeyword_type": [
        {"key": 'board_name', "value": '게시판 이름'},
    ]})

    # config site list (프로젝트)
    site_list = filter_service.config(request)
    request.state.inspect = frame()
    result.update({"site_id": site_list["list"]})

    # board type list (게시판 유형)
    result.update({"board_type": [
        {"key": 'notice', "value": 'notice'},
        {"key": 'faq', "value": 'faq'},
        {"key": 'common', "value": 'common'},
        {"key": 'gallery', "value": 'gallery'},
    ]})

    return result

# /be/admin/posts/filter
@router.post("/admin/posts/filter", dependencies=[Depends(api_same_origin)])
async def 게시물_리스트_필터조건 (
    request: Request
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    result = {}
    result.update({"skeyword_type": [
        {"key": 'title', "value": '제목'},
        {"key": 'contents', "value": '본문내용'}
    ]})

    # board list (게시판)
    board_list = filter_service.board(request)
    request.state.inspect = frame()
    result.update({"board_uid": board_list["list"]})

    # config site list (프로젝트)
    site_list = filter_service.config(request)
    request.state.inspect = frame()
    result.update({"site_id": site_list["list"]})

    # category list (카테고리)
    cate_list = filter_service.cate(request, "T_BOARD_POSTS")
    request.state.inspect = frame()
    result.update({"cate_uid": cate_list["list"]})

    return result

