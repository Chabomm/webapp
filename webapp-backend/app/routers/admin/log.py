import os
from fastapi import APIRouter, Depends, HTTPException, status, Response, Request, Body
from fastapi.responses import RedirectResponse, JSONResponse
from inspect import currentframe as frame

from app.core import exceptions as ex
from app.core import util
from app.deps.auth import get_current_active_user
from app.schemas.auth import *
from app.core.config import PROXY_PREFIX, api_same_origin

from app.schemas.log import *
from app.service.admin import log_service

router = APIRouter (
    prefix = PROXY_PREFIX,
    tags=["admin/log"],
)

# /be/admin/log/list
@router.post("/admin/log/list", dependencies=[Depends(api_same_origin)])
async def 로그_리스트(
     request: Request
    ,logListInput: LogListInput
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    if not logListInput.page or int(logListInput.page) == 0:
        logListInput.page = 1

    if not logListInput.page_view_size or int(logListInput.page_view_size) == 0 :
        logListInput.page_view_size = 30

    table_name = ''
    if logListInput.table_name == 'MAIN' :
        table_name = ['T_MAIN','T_MAIN_BANNER','T_MAIN_CATE','T_MAIN_BANNER_TXT']
    elif logListInput.table_name == 'MEMBER' :
        table_name = ['T_MEMBER']
    elif logListInput.table_name == 'BOARD' :
        table_name = ['T_BOARD_POSTS','T_BOARD_CONTENTS']

    res = log_service.list(request, table_name, logListInput) 
    request.state.inspect = frame()

    return res


# /be/admin/log/filter
@router.post("/admin/log/filter", dependencies=[Depends(api_same_origin)])
async def 로그_리스트_필터조건 (
    request: Request
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    result = {}
    result.update({"skeyword_type": [
        {"key": 'cl_uid', "value": '고유번호'},
        {"key": 'table_name', "value": '테이블명'},
        {"key": 'column_key', "value": '컬럼키'},
        {"key": 'column_name', "value": '컬럼명'},
        {"key": 'cl_before', "value": '전'},
        {"key": 'cl_after', "value": '후'},
        {"key": 'reg_user', "value": '등록자'},
    ]})


    return result


# [ S ] 백엔드 로그 파일관리 
# /be/admin/log/backend/log
@router.post("/admin/log/backend/log", dependencies=[Depends(api_same_origin)])
async def 폴더리스트_backend_log(
     request: Request
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    folers = os.listdir("/usr/src/app/data/webapp-backend/")
    
    ll = []
    for folder in folers:
        this_path_obj = {}
        path = os.path.join('/usr/src/app/data/webapp-backend/', folder)
        this_path_obj["folder"] = folder
        this_path_obj["path"] = path.replace("./", "/be/")
        this_path_obj["open"] = False
        ll.append(this_path_obj)

    result = {}
    # result.update({"list": sorted([f"{f}" for f in folers])})
    result.update({"list": ll})
    return result

# /be/admin/log/backend/files
@router.post("/admin/log/backend/files", dependencies=[Depends(api_same_origin)])
async def 파일리스트_backend_files(
     request: Request
    ,backendFileListInput: BackendFileListInput
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    def print_files_in_dir(root_dir, ll):
        files = os.listdir(root_dir)
        for file in files:
            this_path_obj = {}
            path = os.path.join(root_dir, file)
            this_path_obj["name"] = file
            this_path_obj["path"] = path.replace("./", "/be/")
            this_path_obj["real"] = path
            ll.append(this_path_obj)
        return ll

    file_list = []
    res = print_files_in_dir(backendFileListInput.folder_name, file_list)

    result = {}
    result.update({"list": res})

    return result

# /be/admin/log/backend/read
@router.post("/admin/log/backend/read", dependencies=[Depends(api_same_origin)])
async def 파일상세_backend_read(
     request: Request
    ,backendFileReadInput: BackendFileReadInput
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    f = open("/usr/src/app/data/webapp-backend/"+backendFileReadInput.folder_name+'/'+backendFileReadInput.file_name,'r')
    lines = f.readlines()
    return lines
# [ E ] 백엔드 로그 파일관리 