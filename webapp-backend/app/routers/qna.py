from fastapi import APIRouter, Depends, HTTPException, status, Response, Request, Body
from inspect import currentframe as frame

from app.core import exceptions as ex
from app.deps.auth import get_current_active_user
from app.schemas.auth import *
from app.core import util
from app.core.config import PROXY_PREFIX, api_same_origin
from app.models.qna import *
from app.schemas.qna import *
from app.service import qna_service

router = APIRouter (
    prefix = PROXY_PREFIX+"/qna", # /be 
    tags=["qna"],
)

@router.get("/count/", dependencies=[Depends(api_same_origin)])
async def 문의갯수 (
    request: Request
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    res = qna_service.count(request)
    request.state.inspect = frame()
    return ex.ReturnOK(200, "", request, {"count" : res})

@router.post("/create", dependencies=[Depends(api_same_origin)])
async def 문의_등록 (
    request: Request,
    qna: Qna = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "문의등록 예시",
                "description": "",
                "value": {
                     "title" : "제목 테스트 입니다."
                    ,"contents" : "본문 테스트 입니다."
                    ,"user_name" : "김인디"
                    ,"com_name" : "인디앤드코리아"
                    ,"email" : "dev@indend.co.kr"
                    ,"mobile" : "010-1234-1234"
                    ,"post" : "22007"
                    ,"addr" : "인천시 연수구 인천타워대로 323"
                    ,"addrDetail" : "B동 2105호 인디앤드코리아"
                    ,"reg_ip" : "0.0.0.0"
                }
            },
        }
    )
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)

    res = qna_service.create(request, qna)
    request.state.inspect = frame()
    return ex.ReturnOK(200, "문의등록 완료", request, {"uid" : res.uid})

@router.post("/readlist", response_model=QnaListOutput, dependencies=[Depends(api_same_origin)])
async def 문의_리스트 (
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

    res = qna_service.readlist(request, page_param) 
    request.state.inspect = frame()
    return res

@router.post("/read", response_model=Qna, dependencies=[Depends(api_same_origin)])
async def 문의_상세 (
    request: Request
    ,pRead : PRead = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "문의번호 T_QNA의 uid",
                "description": "",
                "value": {
                    "uid" : 73
                }
            },
        }
    )
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    res = qna_service.read(request, pRead.uid)

    if res is None :
        return ex.ReturnOK(404, "데이터를 찾을 수 없습니다.", request)
        
    return res

