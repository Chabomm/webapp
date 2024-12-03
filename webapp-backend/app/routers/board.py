from fastapi import APIRouter, Depends, HTTPException, status, Response, Request, Body
from inspect import currentframe as frame

from app.core import exceptions as ex
from app.core import util
from app.core.config import PROXY_PREFIX, api_same_origin
from app.models.board import *
from app.schemas.board import *

from app.service import board_service as front_board_service

router = APIRouter (
    prefix = PROXY_PREFIX,
    tags=["board"],
)
# /be/front/posts/init
@router.post("/front/posts/init", dependencies=[Depends(api_same_origin)])
async def 프론트_게시물_init (
     request : Request
    ,pRead: PRead
):  
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    
    jsondata = {}

    if util.checkNumeric(pRead.uid) == 0 :
        return ex.ReturnOK(404, "페이지를 불러오는데 실패하였습니다.", request)
    
    elif (util.checkNumeric(pRead.uid) != 1 
          and util.checkNumeric(pRead.uid) != 2
          and util.checkNumeric(pRead.uid) != 3
          and util.checkNumeric(pRead.uid) != 4 ) :
        return ex.ReturnOK(405, "페이지를 불러오는데 실패하였습니다.", request)

    # [ S ] 게시판 정보
    board = front_board_service.board_read(request, pRead.uid) 
    request.state.inspect = frame()

    if board is None :
        return ex.ReturnOK(406, "페이지를 불러오는데 실패하였습니다.", request)
    
    if board.is_display != "T" :
        return ex.ReturnOK(407, "페이지를 불러오는데 실패하였습니다.", request)

    jsondata.update({"board": dict(zip(board.keys(), board))})

    # [ S ] 카테고리 정보
    cates = front_board_service.posts_cate_list(request, board.uid)
    request.state.inspect = frame()
    jsondata.update({"cates": cates["list"]})

    params = {
         "board_uid" : pRead.uid
        ,"cate_uid" : 0
        ,"page" : 1
        ,"page_view_size": 30
        ,"page_size": 0
        ,"page_total": 0
        ,"page_last": 0
        ,"filters": {}
    }
    jsondata.update({"params": params})

    filter = {}

    filter.update({"skeyword_type": [
        {"key": '', "value": '제목+본문'},
        {"key": 'title', "value": '제목'},
        {"key": 'contents', "value": '본문내용'},
        {"key": 'create_name', "value": '작성자'}
    ]})

    if board.board_type == "qna" :
        filter.update({"state": [
            {"key": '100', "value": '미답변'},
            {"key": '200', "value": '답변완료'},
            {"key": '300', "value": '공지'},
        ]})
    else :
        filter.update({"state": []})

    jsondata.update({"filter": filter})



    return ex.ReturnOK(200, "", request, jsondata)

# /be/front/posts/list
@router.post("/front/posts/list", dependencies=[Depends(api_same_origin)])
async def 게시물_리스트(
     request : Request
    ,postsListInput: PostsListInput
):  
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)

    if not postsListInput.page or int(postsListInput.page) == 0:
        postsListInput.page = 1
    
    if not postsListInput.page_view_size or int(postsListInput.page_view_size) == 0 :
        postsListInput.page_view_size = 30

    # with_contents = False
    # if postsListInput.board_uid == 1 : # FAQ는 contents 도 같이 가져오기
    #     with_contents = True

    # posts = front_board_service.posts_list(request, postsListInput, with_contents) 
    posts = front_board_service.posts_list(request, postsListInput) 
    request.state.inspect = frame()

    return posts



# /be/front/posts/read
@router.post("/front/posts/read", dependencies=[Depends(api_same_origin)])
async def 게시물_상세(
     request: Request
    ,postsInput : PostsInput
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)

    board = Board()
    person = {}
    replys = {}
    replys["list"] = []
    prev_next = {}
    prev_next["prev_posts"] = {}
    prev_next["next_posts"] = {}

    if postsInput.posts_uid == 0 :
        posts = Posts()
    else :
        posts = front_board_service.posts_read(request, postsInput.posts_uid)
        request.state.inspect = frame()

        if posts is None :
            return ex.ReturnOK(404, "게시물을 찾을 수 없습니다.", request)

        board = front_board_service.board_read(request, posts.board_uid) 
        request.state.inspect = frame()

        if postsInput.posts_uid != 0 and board is None :
            return ex.ReturnOK(406, "페이지를 불러오는데 실패하였습니다.", request)
        
        if postsInput.posts_uid != 0 and board.is_display != "T" :
            return ex.ReturnOK(407, "페이지를 불러오는데 실패하였습니다.", request)
    
        if board.board_type != "faq" :
            prev_next = front_board_service.read_prev_next_posts(request, postsInput.posts_uid, posts.board_uid)
            request.state.inspect = frame()

        else : # 문의 게시물은 다음글 이전글 비노출
            prev_next = {}
            prev_next["prev_posts"] = {}
            prev_next["next_posts"] = {}
        
    
    jsondata = {}
    jsondata.update(posts)
    jsondata.update({"board": board})
    jsondata.update({"person": person})
    jsondata.update({"replys": replys["list"]})
    jsondata.update({"prev_posts": prev_next["prev_posts"]})
    jsondata.update({"next_posts": prev_next["next_posts"]})
    
    return ex.ReturnOK(200, "", request, jsondata, False)


# /be/front/posts/read
# @router.post("/front/posts/read", dependencies=[Depends(api_same_origin)])
# async def 게시물_상세(
#      request: Request
#     ,postsInput : PostsInput
# ):
#     request.state.inspect = frame()
#     request.state.body = await util.getRequestParams(request)

#     board = Board()
#     person = {}
#     files = []
#     replys = {}
#     replys["list"] = []
#     prev_next = {}
#     prev_next["prev_posts"] = {}
#     prev_next["next_posts"] = {}
#     contents = []

#     if postsInput.posts_uid == 0 :
#         posts = Posts()
#     else :
#         posts = front_board_service.posts_read(request, postsInput.posts_uid)
#         request.state.inspect = frame()

#         contents = front_board_service.contents_read(request, posts.uid, posts.board_uid)
#         request.state.inspect = frame()

#         if posts is None :
#             return ex.ReturnOK(404, "게시물을 찾을 수 없습니다.", request)

#         board = front_board_service.board_read(request, posts.board_uid) 
#         request.state.inspect = frame()

#         if postsInput.posts_uid != 0 and board is None :
#             return ex.ReturnOK(406, "페이지를 불러오는데 실패하였습니다.", request)
        
#         if postsInput.posts_uid != 0 and board.is_display != "T" :
#             return ex.ReturnOK(407, "페이지를 불러오는데 실패하였습니다.", request)
    
#         if board.board_type != "faq" :
#             prev_next = front_board_service.read_prev_next_posts(request, postsInput.posts_uid, posts.board_uid)
#             request.state.inspect = frame()

#         else : # 문의 게시물은 다음글 이전글 비노출
#             prev_next = {}
#             prev_next["prev_posts"] = {}
#             prev_next["next_posts"] = {}
        
    
#     jsondata = {}
#     jsondata.update(posts)
#     jsondata.update({"board": board})
#     jsondata.update({"person": person})
#     jsondata.update({"files": files})
#     jsondata.update({"replys": replys["list"]})
#     jsondata.update({"prev_posts": prev_next["prev_posts"]})
#     jsondata.update({"next_posts": prev_next["next_posts"]})
#     jsondata.update({"contents": contents})
    
#     return ex.ReturnOK(200, "", request, jsondata, False)











# /be/board/list
@router.post("/board/list", response_model=BoardList, dependencies=[Depends(api_same_origin)])
async def 게시판_리스트(
     request: Request
    ,page_param: PPage_param
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)

    if not page_param.page or int(page_param.page) == 0:
        page_param.page = 1
    
    if not page_param.page_view_size or int(page_param.page_view_size) == 0 :
        page_param.page_view_size = 30

    res = front_board_service.board_list(request, page_param) 
    request.state.inspect = frame()

    return res

# /be/board/read
@router.post("/board/read", response_model=Board, dependencies=[Depends(api_same_origin)])
async def 게시판_상세(
    request: Request
    ,pRead : PRead = Body (
        ...,
        examples = {
            "example01" : {
                "summary": "FAQ 게시판 상세",
                "description": "",
                "value": {
                    "uid" : 1
                }
            },
        }
    )
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    
    res = front_board_service.board_read(request, pRead.uid)

    if res is None :
        return ex.ReturnOK(404, "데이터를 찾을 수 없습니다.", request)
        
    return res

## ========== 게시물 start ========

# /be/posts/cate
@router.post("/posts/cate", dependencies=[Depends(api_same_origin)])
async def 게시물_카테고리_리스트(
    request: Request
    ,pRead : PRead = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "T_BOARD_POSTS의 board_uid",
                "description": "",
                "value": {
                    "uid" : 1
                }
            },
        }
    )
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    res = front_board_service.posts_cate_list(request, pRead.uid)
    request.state.inspect = frame()
    return res

# /be/posts/list
@router.post("/posts/list", dependencies=[Depends(api_same_origin)])
async def 게시물_리스트(
    request : Request
    ,postsListInput: PostsListInput = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "FAQ 리스트 예시1",
                "description": "",
                "value": {
                     "page": 1
                    ,"page_size": 0
                    ,"page_view_size": 0
                    ,"page_total": 0
                    ,"page_last": 0
                    ,"board_uid" : 1
                    ,"cate_uid" : 0
                }
            },
        }
    )
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)

    if not postsListInput.page or int(postsListInput.page) == 0:
        postsListInput.page = 1
    
    if not postsListInput.page_view_size or int(postsListInput.page_view_size) == 0 :
        postsListInput.page_view_size = 30

    # 게시판 정보
    res_board = front_board_service.board_read(request, postsListInput.board_uid)
    request.state.inspect = frame()

    # 카테고리 정보
    res_cate = front_board_service.posts_cate_list(request, postsListInput.board_uid)
    request.state.inspect = frame()

    if res_board.board_type != None and res_board.board_type == "faq": # 페이징 없는 리스트
        # result = await faq.게시물_리스트(request, postsListInput)
        result = front_board_service.posts_list_none_page(request, postsListInput) 
        request.state.inspect = frame()

        result.update({"board": res_board})
        result.update({"category_list" : res_cate["list"]})
        return result


    res = front_board_service.posts_list(request, postsListInput) 
    request.state.inspect = frame()

    res.update({"board": res_board})
    res.update({"category_list" : res_cate["list"]})
    print('resultresult',res)

    return res

# /be/posts/read
@router.post("/posts/read", dependencies=[Depends(api_same_origin)])
async def 게시물_상세(
    request: Request
    ,pRead : PRead = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "T_BOARD_POSTS의 uid",
                "description": "",
                "value": {
                    "uid" : 1
                }
            },
        }
    )
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    res = front_board_service.posts_read(request, pRead.uid)
    request.state.inspect = frame()

    if res is None :
        return ex.ReturnOK(404, "데이터를 찾을 수 없습니다.", request)
        
    return res

