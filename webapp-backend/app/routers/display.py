from fastapi import APIRouter, Depends, HTTPException, status, Response, Request, Body
from inspect import currentframe as frame

from app.core import exceptions as ex
# from app.deps.auth import get_current_active_user
from app.core import util
from app.core.config import PROXY_PREFIX, api_same_origin
from app.models.display import *
from app.schemas.display import *
from app.service import display_service

router = APIRouter (
    prefix = PROXY_PREFIX,
    tags=["display"],
)

# 배너 cate detail select
@router.post("/display/main_cate", dependencies=[Depends(api_same_origin)])
async def 배너_카테고리_리스트 (
    request: Request
    ,mainBannerInput: MainBannerListInput = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "배너 카테고리 리스트 예시1",
                "description": "",
                "value": {
                     "cate_uid" : 1
                    ,"site_id" : "dream"
                    ,"area" : "WELFARE"
                }
            },
        }
    )
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)

    res = display_service.readlist_cate(request, mainBannerInput)
    request.state.inspect = frame()
    return res

# 배너 cate/banner/txt select
@router.post("/display/main_banner", dependencies=[Depends(api_same_origin)])
async def 배너_리스트(
    request: Request
    ,mainBannerInput: MainBannerListInput= Body(
        ...,
        examples = {
            "example01" : {
                "summary": "배너 리스트 예시1",
                "description": "",
                "value": {
                     "cate_uid" : 1
                    ,"site_id" : "dream"
                    ,"area" : "WELFARE"
                }
            },
            "example02" : {
                "summary": "배너 리스트 예시2",
                "description": "",
                "value": {
                     "cate_uid" : 0
                    ,"site_id" : "dream"
                    ,"area" : "MAIN"
                }
            },
            "example03" : {
                "summary": "복지드림 - 파트너 ",
                "description": "",
                "value": {
                     "cate_uid" : 0
                    ,"site_id" : "dream"
                    ,"area" : "PARTNER"
                }
            },
        }
    )
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)

    res = display_service.readlist(request, mainBannerInput)
    request.state.inspect = frame()
    return res
