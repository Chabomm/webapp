from fastapi import APIRouter, Depends, HTTPException, status, Response, Request, Body
from fastapi.responses import RedirectResponse, JSONResponse
from inspect import currentframe as frame

from app.core import exceptions as ex
from app.core import util
from app.deps.auth import get_current_active_user
from app.schemas.auth import *
from app.core.config import PROXY_PREFIX, api_same_origin

from app.schemas.main import *
from app.schemas.display import *
from app.service.admin import main_service, filter_service

from app.routers.display import *
from app.routers.board import *

router = APIRouter (
    prefix = PROXY_PREFIX,
    tags=["admin/main"],
)

# /be/admin/main/list
@router.post("/admin/main/list", dependencies=[Depends(api_same_origin)])
async def 메인영역_리스트(
     request: Request
    ,mainListInput: MainListInput
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    res = main_service.main_list(request, mainListInput) 
    request.state.inspect = frame()

    return res

# /be/admin/main/read
@router.post("/admin/main/read", dependencies=[Depends(api_same_origin)])
async def 메인영역_상세(
    request: Request
    ,pRead : PRead = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "T_MAIN 의 uid",
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
        return Main()
    
    res = main_service.main_read(request, pRead.uid)
    request.state.inspect = frame()

    if res is None :
        return ex.ReturnOK(404, "데이터를 찾을 수 없습니다.", request)
        
    return res

# /be/admin/main/edit
@router.post("/admin/main/edit", dependencies=[Depends(api_same_origin)])
async def 메인영역_편집(
    request: Request
    ,main: Main = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "게시판 등록예시 01",
                "description": "",
                "value": {
                    "site_id" : "welfaredream"
                    ,"board_type" : "common"
                    ,"board_name" : "테스트 일반 게시판"
                    ,"per_write" : "admin"
                    ,"per_read" : "admin"
                    ,"is_comment" : "F"
                }
            },
            "example02" : {
                "summary": "게시판 등록예시 02",
                "description": "",
                "value": {
                    "site_id" : "welfaredream"
                    ,"board_type" : "notice"
                    ,"board_name" : "테스트 공지사항 게시판"
                    ,"per_write" : "admin"
                    ,"per_read" : "admin"
                    ,"is_comment" : "F"
                }
            },
            "example03" : {
                "summary": "게시판 수정예시 01",
                "description": "",
                "value": {
                    "uid" : 1
                    ,"site_id" : "welfaredream"
                    ,"board_type" : "common"
                    ,"board_name" : "테스트 일반 게시판"
                    ,"per_write" : "admin"
                    ,"per_read" : "admin"
                    ,"is_comment" : "F"
                    ,"is_display" : "T"
                }
            },
            "example04" : {
                "summary": "게시판 삭제예시 01",
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

    if main.mode == "REG" :
        res = main_service.main_create(request, main)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "메인영역 등록 완료", request, {"uid" : res.uid})

    if main.mode == "MOD" :
        res = main_service.main_update(request, main)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "메인영역 수정 완료", request, {"uid" : res.uid})

    if main.mode == "DEL" :
       res = main_service.main_delete(request, main.uid)
       request.state.inspect = frame()
       return ex.ReturnOK(200, "메인영역 삭제 완료", request, {"uid" : res.uid})
    
# /be/admin/main/create
@router.post("/admin/main/create", dependencies=[Depends(api_same_origin)])
async def 메인영역_생성(
    request: Request
    ,mainCreateInput: MainCreateInput = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "메인생성 예시",
                "description": "",
                "value": {
                     "site_id" : "dream"
                    ,"area" : "MAIN_BANNER"
                    ,"area_class" : "A"
                    ,"display_type": "MAIN"
                }
            },
        }
    )
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)
    try :
        save_folder = "/usr/src/app/resource/welfaredream/main/"
        util.makedirs(save_folder)
        save_name = mainCreateInput.display_type + ".json"

        # 기존 파일 로드
        read_file = open(save_folder+save_name, 'r')

        try :
            # befjson = json.loads(read_file.read())
            # befjson = dict(read_file.read())
            befjson = dict(json.loads(read_file.read()))
        except Exception as e:
            befjson = {}

        if mainCreateInput.area == "ALL" or mainCreateInput.area == "MAIN_BANNER" :
            result = await 배너_리스트(
                request
                ,MainBannerListInput(
                    cate_uid = 0
                    ,site_id = mainCreateInput.site_id
                    ,area = mainCreateInput.area
                )
            )
            result[mainCreateInput.area+"_LIST"] = result["list"]
            del result["list"]
            befjson.update(result)

        if mainCreateInput.area == "ALL" or mainCreateInput.area == "DDY" :
            result = await 배너_리스트(
                request
                ,MainBannerListInput(
                    cate_uid = 0
                    ,site_id = mainCreateInput.site_id
                    ,area = mainCreateInput.area
                )
            )
            result[mainCreateInput.area+"_LIST"] = result["list"]
            del result["list"]
            befjson.update(result)

        if mainCreateInput.area == "ALL" or mainCreateInput.area == "MAIN_COUNT" :
            result = await 배너_리스트(
                request
                ,MainBannerListInput(
                    cate_uid = 0
                    ,site_id = mainCreateInput.site_id
                    ,area = mainCreateInput.area
                )
            )
            result[mainCreateInput.area+"_LIST"] = result["list"]
            del result["list"]
            befjson.update(result)

        if mainCreateInput.area == "ALL" or mainCreateInput.area == "PARTNER" :
            result = await 배너_리스트(
                request
                ,MainBannerListInput(
                    cate_uid = 0
                    ,site_id = mainCreateInput.site_id
                    ,area = mainCreateInput.area
                )
            )
            result[mainCreateInput.area+"_LIST"] = result["list"]
            del result["list"]
            befjson.update(result)

        if mainCreateInput.area == "ALL" or mainCreateInput.area == "MAIN_BENEFIT" :
            result = await 배너_리스트(
                request
                ,MainBannerListInput(
                    cate_uid = 0
                    ,site_id = mainCreateInput.site_id
                    ,area = mainCreateInput.area
                )
            )
            result[mainCreateInput.area+"_LIST"] = result["list"]
            del result["list"]
            befjson.update(result)

        if mainCreateInput.area == "ALL" or mainCreateInput.area == "CONSUMER_CATE" :
            result = await 배너_카테고리_리스트(
                request
                ,MainBannerListInput(
                    site_id = mainCreateInput.site_id
                    ,area = mainCreateInput.area
                )
        )
            result[mainCreateInput.area+"_CATE_LIST"] = result["list"]
            del result["list"]
            befjson.update(result)

        if mainCreateInput.area == "ALL" or mainCreateInput.area == "CONSUMER" :
            result = await 배너_리스트(
                request
                ,MainBannerListInput(
                    cate_uid = 0
                    ,site_id = mainCreateInput.site_id
                    ,area = mainCreateInput.area
                )
            )
            result[mainCreateInput.area+"_LIST"] = result["list"]
            del result["list"]
            befjson.update(result)

        if mainCreateInput.area == "ALL" or mainCreateInput.area == "WELFARE_CATE" :
            result = await 배너_카테고리_리스트(
                request
                ,MainBannerListInput(
                    site_id = mainCreateInput.site_id
                    ,area = mainCreateInput.area
                )
            )
            result[mainCreateInput.area+"_CATE_LIST"] = result["list"]
            del result["list"]
            befjson.update(result)

        if mainCreateInput.area == "ALL" or mainCreateInput.area == "WELFARE" :
            result = await 배너_리스트(
                request
                ,MainBannerListInput(
                    cate_uid = 0
                    ,site_id = mainCreateInput.site_id
                    ,area = mainCreateInput.area
                )
            )
            result[mainCreateInput.area+"_LIST"] = result["list"]
            del result["list"]
            befjson.update(result)      

        if mainCreateInput.area == "ALL" or mainCreateInput.area == "MAIN_REVIEW" :
            result = await 배너_리스트(
                request
                ,MainBannerListInput(
                    cate_uid = 0
                    ,site_id = mainCreateInput.site_id
                    ,area = mainCreateInput.area
                )
            )
            result[mainCreateInput.area+"_LIST"] = result["list"]
            del result["list"]
            befjson.update(result)      

        if mainCreateInput.area == "ALL" or mainCreateInput.area == "BLOG" :
            result = await 배너_리스트(
                request
                ,MainBannerListInput(
                    cate_uid = 0
                    ,site_id = mainCreateInput.site_id
                    ,area = mainCreateInput.area
                )
            )
            result[mainCreateInput.area+"_LIST"] = result["list"]
            del result["list"]
            befjson.update(result)      

        if mainCreateInput.area == "ALL" or mainCreateInput.area == "NEWS" :
            result = await 게시물_리스트(
                request
                ,PostsListInput(
                    page = 1
                    ,page_size = 0
                    ,page_view_size = 5
                    ,page_total = 0
                    ,page_last = 0 
                    ,board_uid = mainCreateInput.cont_uid
                    ,cate_uid = 0
                )
            )
            result[mainCreateInput.area+"_LIST"] = result["list"]
            del result["list"]
            befjson.update(result)   

        if mainCreateInput.area == "ALL" or mainCreateInput.area == "MEDIA" :
            result = await 게시물_리스트(
                request
                ,PostsListInput(
                    page = 1
                    ,page_size = 0
                    ,page_view_size = 5
                    ,page_total = 0
                    ,page_last = 0 
                    ,board_uid = mainCreateInput.cont_uid
                    ,cate_uid = 0
                )
            )
            result[mainCreateInput.area+"_LIST"] = result["list"]
            del result["list"]
            befjson.update(result)   

        if mainCreateInput.area == "ALL" or mainCreateInput.area == "PARTNER" :
            result = await 배너_리스트(
                request
                ,MainBannerListInput(
                    cate_uid = 0
                    ,site_id = mainCreateInput.site_id
                    ,area = mainCreateInput.area
                )
            )
            result[mainCreateInput.area+"_LIST"] = result["list"]
            del result["list"]
            befjson.update(result)     

        if mainCreateInput.area == "ALL" or mainCreateInput.area == "INQUIRY_DREAM" :
            result = await 배너_리스트(
                request
                ,MainBannerListInput(
                    cate_uid = 0
                    ,site_id = mainCreateInput.site_id
                    ,area = mainCreateInput.area
                )
            )
            result[mainCreateInput.area+"_LIST"] = result["list"]
            del result["list"]
            befjson.update(result)     

        if mainCreateInput.area == "ALL" or mainCreateInput.area == "POPUP" :
            result = await 배너_리스트(
                request
                ,MainBannerListInput(
                    cate_uid = 0
                    ,site_id = mainCreateInput.site_id
                    ,area = mainCreateInput.area
                )
            )

            result[mainCreateInput.area+"_LIST"] = result["list"]
            del result["list"]
            befjson.update(result)

        save_file = open(save_folder+save_name, "w")  
        json.dump(befjson, save_file, indent=4, default=str)
        save_file.close() 
        # uha추가
        return ex.ReturnOK(200, "생성이 완료되었습니다.", request, {})
    
    except Exception as e :
        print(e)
        return ex.ReturnOK(500, "오류가 발생하였습니다. 다시 시도하여 주세요", request)


## ========== 배너 start ======== 

# /be/admin/main/banner/list
@router.post("/admin/main/banner/list", response_model=BannerListOutput, dependencies=[Depends(api_same_origin)])
async def 배너_리스트_어드민(
    request: Request
    ,pRead: PRead = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "배너리스트 (T_MAIN의 uid)",
                "description": "",
                "value": {
                     "uid" : 2
                }
            },
        }
    )
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    # 영역상세 (T_MAIN)
    main_banner = main_service.main_read(request, pRead.uid)
    request.state.inspect = frame()

    res = main_service.banner_list(request, pRead)
    request.state.inspect = frame()

    # return main_banner, res
    res.update({"main": main_banner})

    return res

# /be/admin/main/banner/read
@router.post("/admin/main/banner/read", response_model=BannerReadOutput, dependencies=[Depends(api_same_origin)])
async def 배너_상세정보(
    request: Request
    ,pRead: PRead = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "배너 상세정보",
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
        return BannerReadOutput()
    
    res = main_service.banner_read(request, pRead.uid)
    request.state.inspect = frame()

    print(util.toJson(res))

    if res is None :
        return ex.ReturnOK(404, "데이터를 찾을 수 없습니다.", request)
        
    return res

# /be/admin/main/banner/edit
@router.post("/admin/main/banner/edit", dependencies=[Depends(api_same_origin)])
async def 배너_편집(
    request: Request
    ,mainBanner: MainBanner = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "배너 등록예시 01",
                "description": "",
                "value": {
                     "mode" : "REG"
                    ,"main_uid" : 2
                    ,"site_id" : "dream"
                    ,"area" : "MAIN_BANNER"
                    ,"area_class" : "W"
                    ,"banner_name" : "테스트 메인배너"
                    ,"link_type" : "inside"
                    ,"link" : "asdfasdf"
                    ,"sort" : 1
                }
            },
            "example02" : {
                "summary": "배너 등록예시 02",
                "description": "",
                "value": {
                     "mode" : "REG"
                    ,"main_uid" : 8
                    ,"site_id" : "dream"
                    ,"area" : "CONSUMER"
                    ,"area_class" : "A"
                    ,"cate_uid" : 7
                    ,"banner_name" : "test"
                    ,"txt1" : "배너 텍스트1"
                    ,"txt2" : "배너 텍스트2"
                    ,"txt3" : "배너 텍스트3"
                    ,"txt4" : "배너 텍스트4"
                    ,"txt5" : "배너 텍스트5"
                }
            },
            "example03" : {
                "summary": "배너 수정예시 01",
                "description": "",
                "value": {
                     "mode" : "MOD"
                    ,"uid" : 132
                    ,"main_uid" : 6
                    ,"site_id" : "dream"
                    ,"area" : "MAIN_BENEFIT"
                    ,"area_class" : "A"
                    ,"cate_uid" : 5
                    ,"banner_name" : "도입혜택 TEST"
                    ,"banner_src" : "http://www.welfaredream.com/img/mbenefit/benefit_04.png"
                    ,"sort" : 5
                    ,"is_display" : "F"
                }
            },
            "example04" : {
                "summary": "배너 삭제예시 01",
                "description": "",
                "value": {
                     "mode" : "DEL"
                    ,"uid" : 132
                }
            },
        }
    )
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    if mainBanner.mode == "REG" :
        res = main_service.banner_create(request, mainBanner)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "배너 등록 완료", request, {"uid" : res.uid})

    if mainBanner.mode == "MOD" :
        res = main_service.banner_update(request, mainBanner)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "배너 수정 완료", request, {"uid" : res.uid})

    if mainBanner.mode == "DEL" :
        res = main_service.banner_delete(request, mainBanner.uid)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "배너 삭제 완료", request, {"uid" : res.uid})

    if mainBanner.mode == "SORT" :
        main_service.banner_sort(request, mainBanner)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "순서 수정 완료", request)