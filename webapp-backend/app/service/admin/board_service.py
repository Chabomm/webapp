from sqlalchemy.orm import Session, aliased
from sqlalchemy import func, select, column, table, case, and_
from fastapi import Request
from inspect import currentframe as frame
from fastapi.encoders import jsonable_encoder
import math

from app.core import exceptions as ex
from app.core import util
from app.core.database import format_sql
from app.models.config import *
from app.models.display import *
from app.models.board import *
from app.schemas.config import *
from app.schemas.board import *
from app.service.log_service import *
from app.service.admin import board_service


# 게시판_리스트
def board_list(request: Request, page_param: PPage_param):
    request.state.inspect = frame()
    db = request.state.db

    filters = []
    filters.append(getattr(T_BOARD, "delete_at") == None)

    # [ S ] search filter start
    if page_param.filters :
        if page_param.filters["skeyword"] :
            if page_param.filters["skeyword_type"] != "" :
                filters.append(getattr(T_BOARD, page_param.filters["skeyword_type"]).like("%"+page_param.filters["skeyword"]+"%"))
            else : 
                filters.append(
                    T_BOARD.uid.like("%"+page_param.filters["skeyword"]+"%") 
                    | T_BOARD.board_name.like("%"+page_param.filters["skeyword"]+"%")
                )

        if page_param.filters["create_at"]["startDate"] and page_param.filters["create_at"]["endDate"] :
            filters.append(
                and_(
                    T_BOARD.create_at >= page_param.filters["create_at"]["startDate"]
                    ,T_BOARD.create_at <= page_param.filters["create_at"]["endDate"] + " 23:59:59"
                )
            )
        
        if page_param.filters["site_id"] :
            filters.append(T_BOARD.site_id == page_param.filters["site_id"])

        if page_param.filters["board_type"] :
            filters.append(T_BOARD.board_type == page_param.filters["board_type"])
    # [ E ] search filter end

    # 게시물 총개수
    posts_count_stmt = (
        db.query(
            T_BOARD_POSTS.board_uid.label("board_uid")
            ,func.count(T_BOARD_POSTS.uid).label('count')
        )
        .filter(T_BOARD_POSTS.delete_at == None)
        .group_by(T_BOARD_POSTS.board_uid)
        .subquery()
    )
    
    sql = (
        db.query(
             T_BOARD.uid
            ,T_BOARD.site_id
            ,T_BOARD.board_type
            ,T_BOARD.board_name
            ,T_BOARD.per_write
            ,T_BOARD.per_read
            ,T_BOARD.is_comment
            ,T_BOARD.is_display
            ,T_BOARD.front_url
            ,T_BOARD.create_at
            ,T_BOARD.update_at
            ,T_BOARD.delete_at
            ,posts_count_stmt.c.count
        )
        .join(
            posts_count_stmt, 
            T_BOARD.uid == posts_count_stmt.c.board_uid,
            isouter = True 
        )
        .filter(*filters)
        .order_by(T_BOARD.uid.desc())
        .offset((page_param.page-1)*page_param.page_view_size)
        .limit(page_param.page_view_size)
    )

    format_sql(sql)

    rows = []
    for c in sql.all():
        rows.append(dict(zip(c.keys(), c)))

    # [ S ] 페이징 처리
    page_param.page_total = (
         db.query(T_BOARD)
        .filter(*filters)
        .count()
    )
    page_param.page_last = math.ceil(page_param.page_total / page_param.page_view_size)
    page_param.page_size = len(rows) # 현재 페이지에 검색된 수
    # [ E ] 페이징 처리

    jsondata = {}
    jsondata.update(page_param)
    jsondata.update({"list": rows})

    return jsondata

# 게시판_상세
def board_read(request: Request, uid: int):
    request.state.inspect = frame()
    db = request.state.db
    sql = ( 
        db.query(
             T_BOARD.uid
            ,T_BOARD.site_id
            ,T_BOARD.board_type
            ,T_BOARD.board_name
            ,T_BOARD.per_write
            ,T_BOARD.per_read
            ,T_BOARD.is_comment
            ,T_BOARD.is_display
            ,T_BOARD.front_url
            ,T_BOARD.create_at
            ,T_BOARD.update_at
            ,T_BOARD.delete_at
        )
        .filter(T_BOARD.uid == uid)
    )
    format_sql(sql)
    return sql.first()

# 게시판 create  
def create(request: Request, board: Board):
    request.state.inspect = frame()
    db = request.state.db 
    user = request.state.user

    db_item = T_BOARD (
         site_id = board.site_id
        ,board_type = board.board_type
        ,board_name = board.board_name
        ,per_write = board.per_write
        ,per_read = board.per_read
        ,is_comment = board.is_comment
        ,front_url = board.front_url
    )
    db.add(db_item)
    db.flush()

    create_log(request, db_item.uid, "T_BOARD", "INSERT", "게시판 등록", 0, db_item.uid, "", "", user.user_id)
    request.state.inspect = frame()

    return db_item

# 게시판 수정
def update(request: Request, board: Board):
    request.state.inspect = frame()
    db = request.state.db 
    user = request.state.user

    res = db.query(T_BOARD).filter(T_BOARD.uid == board.uid).first()

    if res is None :
        raise ex.NotFoundUser

    # if member.email is not None and res.email != member.email : 

    if board.site_id is not None and res.site_id != board.site_id : 
        create_log(request, board.uid, "T_BOARD", "site_id", "프로젝트", res.site_id, board.site_id, "", "", user.user_id)
        request.state.inspect = frame()
        res.site_id = board.site_id

    if board.board_type is not None and res.board_type != board.board_type : 
        create_log(request, board.uid, "T_BOARD", "board_type", "게시판유형", res.board_type, board.board_type, "", "", user.user_id)
        request.state.inspect = frame()
        res.board_type = board.board_type 

    if board.board_name is not None and res.board_name != board.board_name : 
        create_log(request, board.uid, "T_BOARD", "board_name", "게시판 이름", res.board_name, board.board_name, "", "", user.user_id)
        request.state.inspect = frame()
        res.board_name = board.board_name 

    if board.per_write is not None and res.per_write != board.per_write : 
        create_log(request, board.uid, "T_BOARD", "per_write", "게시판 쓰기권한", res.per_write, board.per_write, "", "", user.user_id)
        request.state.inspect = frame()
        res.per_write = board.per_write 

    if board.per_read is not None and res.per_read != board.per_read : 
        create_log(request, board.uid, "T_BOARD", "per_read", "게시판 읽기권한", res.per_read, board.per_read, "", "", user.user_id)
        request.state.inspect = frame()
        res.per_read = board.per_read 

    if board.is_comment is not None and res.is_comment != board.is_comment : 
        create_log(request, board.uid, "T_BOARD", "is_comment", "게시판 댓글여부", res.is_comment, board.is_comment, "", "", user.user_id)
        request.state.inspect = frame()
        res.is_comment = board.is_comment 

    if board.is_display is not None and res.is_display != board.is_display : 
        create_log(request, board.uid, "T_BOARD", "is_display", "게시판 표시여부", res.is_display, board.is_display, "", "", user.user_id)
        request.state.inspect = frame()
        res.is_display = board.is_display    

    if board.front_url is not None and res.front_url != board.front_url : 
        create_log(request, board.uid, "T_BOARD", "front_url", "게시판 프론트 URL", res.front_url, board.front_url, "", "", user.user_id)
        request.state.inspect = frame()
        res.front_url = board.front_url   

    res.update_at = util.getNow()
    return res

# 게시판 삭제
def delete(request: Request, uid: int):
    request.state.inspect = frame()
    db = request.state.db
    user = request.state.user
    
    db_item = db.query(T_BOARD).filter(T_BOARD.uid == uid).first()

    db_item.is_display = 'F'
    db_item.delete_at = util.getNow()

    create_log(request, uid, "T_BOARD", "DELETE", "게시판 삭제", 0, db_item.uid, "", "", user.user_id)
    request.state.inspect = frame()

    return db_item

# 게시물_카테고리_리스트
def posts_cate_list(request: Request, uid: int):
    request.state.inspect = frame()
    db = request.state.db

    subquery = (
        db.query (T_BOARD_POSTS.cate_uid)
        .filter(T_BOARD_POSTS.board_uid == uid)
        .subquery()
    )

    sql = (
        db.query(
             T_MAIN_CATE.uid
            ,T_MAIN_CATE.cate_name
            ,T_MAIN_CATE.cate_icon
            ,T_MAIN_CATE.cate_sort
        )
        .filter(T_MAIN_CATE.uid.in_(subquery))
        .order_by(T_MAIN_CATE.cate_sort.asc())
    )

    format_sql(sql)

    rows = []
    for c in sql.all():
        rows.append(dict(zip(c.keys(), c)))

    jsondata = {}
    jsondata.update({"list": rows})

    return jsondata

# 게시물_리스트
def posts_list(request: Request, postsListInput: PostsListInput):
    request.state.inspect = frame()
    db = request.state.db

    filters = []
    # filters.append(getattr(T_BOARD_POSTS, "is_display") == 'T')
    filters.append(getattr(T_BOARD_POSTS, "delete_at") == None)

    # [ S ] search filter start
    if postsListInput.filters :
        if postsListInput.filters["skeyword"] :
            if postsListInput.filters["skeyword_type"] != "" :
                filters.append(getattr(T_BOARD_POSTS, postsListInput.filters["skeyword_type"]).like("%"+postsListInput.filters["skeyword"]+"%"))
            else : 
                filters.append(
                    T_BOARD_POSTS.title.like("%"+postsListInput.filters["skeyword"]+"%") 
                    | T_BOARD_POSTS.contents.like("%"+postsListInput.filters["skeyword"]+"%")
                )

        if postsListInput.filters["create_at"]["startDate"] and postsListInput.filters["create_at"]["endDate"] :
            filters.append(
                and_(
                    T_BOARD_POSTS.create_at >= postsListInput.filters["create_at"]["startDate"]
                    ,T_BOARD_POSTS.create_at <= postsListInput.filters["create_at"]["endDate"] + " 23:59:59"
                )
            )
        
        if postsListInput.filters["site_id"] :
            stmt = db.query(T_BOARD.uid).filter(T_BOARD.site_id == postsListInput.filters["site_id"]).subquery()
            filters.append(T_BOARD_POSTS.board_uid.in_(stmt))

        if postsListInput.filters["cate_uid"] :
            filters.append(T_BOARD_POSTS.cate_uid == postsListInput.filters["cate_uid"])

        if postsListInput.filters["board_uid"] :
            filters.append(T_BOARD_POSTS.board_uid == postsListInput.filters["board_uid"])
    # [ E ] search filter end
            

    sql = (
        db.query(
             T_BOARD_POSTS.uid
            ,T_BOARD_POSTS.board_uid
            ,T_BOARD_POSTS.cate_uid
            ,T_BOARD_POSTS.thumb
            ,T_BOARD_POSTS.title
            ,T_BOARD_POSTS.tags
            ,T_BOARD_POSTS.is_display
            ,func.date_format(T_BOARD_POSTS.create_at, '%Y-%m-%d<br>%T').label('create_at')
            ,T_BOARD_POSTS.update_at
            ,T_BOARD_POSTS.delete_at
            ,T_BOARD.site_id
            ,T_BOARD.board_type
            ,T_BOARD.board_name
            ,T_MAIN_CATE.uid.label('cate_uid')
            ,T_MAIN_CATE.cate_name
            ,T_MAIN_CATE.cate_icon
            ,T_MAIN_CATE.cate_sort
        )
        .join(
            T_BOARD,
            T_BOARD.uid == T_BOARD_POSTS.board_uid
        )
        .join(
            T_MAIN_CATE,
            T_MAIN_CATE.uid == T_BOARD_POSTS.cate_uid,
            isouter = True 
        )
        .filter(*filters)
        .order_by(T_BOARD_POSTS.uid.desc())
        .offset((postsListInput.page-1)*postsListInput.page_view_size)
        .limit(postsListInput.page_view_size)
    )

    format_sql(sql)

    rows = []
    for c in sql.all():
        rows.append(dict(zip(c.keys(), c)))

    # [ S ] 페이징 처리
    postsListInput.page_total = (
        db.query(T_BOARD_POSTS)
        .filter(*filters)
        .count()
    )
    postsListInput.page_last = math.ceil(postsListInput.page_total / postsListInput.page_view_size)
    postsListInput.page_size = len(rows) # 현재 페이지에 검색된 수
    # [ E ] 페이징 처리

    jsondata = {}
    jsondata.update(postsListInput)
    jsondata.update({"list": rows})

    return jsondata

# 게시물_상세
def posts_read(request: Request, uid: int):
    request.state.inspect = frame()
    db = request.state.db
    sql = ( 
        db.query(
             T_BOARD_POSTS.uid
            ,T_BOARD_POSTS.board_uid
            ,T_BOARD_POSTS.cate_uid
            ,T_BOARD_POSTS.thumb
            ,T_BOARD_POSTS.title
            ,T_BOARD_POSTS.contents
            ,T_BOARD_POSTS.tags
            ,T_BOARD_POSTS.is_display
            ,T_BOARD_POSTS.create_at
            ,T_BOARD_POSTS.update_at
            ,T_BOARD_POSTS.delete_at
        )
        .filter(
             T_BOARD_POSTS.uid == uid
            ,T_BOARD_POSTS.delete_at == None
        )
    )


    format_sql(sql)
    
    res = sql.first()
    

    if res == None :
        return ex.ReturnOK(404, "게시물을 찾을 수 없습니다.", request)
    else :
        res = dict(zip(res.keys(), res))

    return res

    # return sql.first() #-> 원본



# posts_contents_상세
# def contents_read(request: Request, uid: int, board_uid:int):
#     request.state.inspect = frame()
#     db = request.state.db
    
#     sql = ( 
#         db.query(
#              T_BOARD_CONTENTS.uid
#             ,T_BOARD_CONTENTS.board_uid
#             ,T_BOARD_CONTENTS.posts_uid
#             ,T_BOARD_CONTENTS.btype
#             ,T_BOARD_CONTENTS.html
#             ,T_BOARD_CONTENTS.image_url
#             ,T_BOARD_CONTENTS.link
#             ,T_BOARD_CONTENTS.link_target
#             ,T_BOARD_CONTENTS.is_display
#             ,T_BOARD_CONTENTS.create_at
#         )
#         .filter(T_BOARD_CONTENTS.board_uid == board_uid)
#         .filter(T_BOARD_CONTENTS.posts_uid == uid)
#         .filter(T_BOARD_CONTENTS.delete_at == None)
#         .order_by(T_BOARD_CONTENTS.sort.asc())
#     )
#     format_sql(sql)
    
#     rows = []
#     for c in sql.all():
#         list = dict(zip(c.keys(), c))
#         list.update({"files" : {}})
#         rows.append( list )

#     return rows




# 게시물_편집 - create
def posts_create(request: Request, postsEditInput : PostsEditInput):
    request.state.inspect = frame()
    db = request.state.db 
    user = request.state.user

    db_item = T_BOARD_POSTS (
         board_uid = postsEditInput.board_uid
        ,thumb = postsEditInput.thumb
        ,title = postsEditInput.title
        ,tags = postsEditInput.tags
        ,cate_uid = postsEditInput.cate_uid
        ,contents = postsEditInput.contents
        ,is_display = "T"
    )
    db.add(db_item)
    db.flush()

    create_log(request, db_item.uid, "T_BOARD_POSTS", "INSERT", "게시물 등록", 0, db_item.uid, "", "", user.user_id)
    request.state.inspect = frame()

    return db_item
    
# 게시물_편집 - update  
def posts_update(request: Request, postsEditInput : PostsEditInput):
    request.state.inspect = frame()
    db = request.state.db 
    user = request.state.user
    
    res = db.query(T_BOARD_POSTS).filter(T_BOARD_POSTS.uid == postsEditInput.uid, T_BOARD_POSTS.board_uid == postsEditInput.board_uid).first()

    if res is None :
        return ex.ReturnOK(404, "죄송합니다. 오류가 발생 하였습니다. 문제 지속시 개발자에게 접수 바랍니다.", request)
    
    if postsEditInput.thumb is not None and res.thumb != postsEditInput.thumb : 
        create_log(request, res.uid, "T_BOARD_POSTS", "thumb", "thumb", res.thumb, postsEditInput.thumb, "", "", user.user_id)
        request.state.inspect = frame()
        res.thumb = postsEditInput.thumb
    
    if res.cate_uid != postsEditInput.cate_uid : 
        create_log(request, res.uid, "T_BOARD_POSTS", "cate_uid", "cate_uid", res.cate_uid, postsEditInput.cate_uid, "", "", user.user_id)
        request.state.inspect = frame()
        res.cate_uid = postsEditInput.cate_uid
    
    if postsEditInput.title is not None and res.title != postsEditInput.title : 
        create_log(request, res.uid, "T_BOARD_POSTS", "title", "title", res.title, postsEditInput.title, "", "", user.user_id)
        request.state.inspect = frame()
        res.title = postsEditInput.title
    
    if postsEditInput.contents is not None and res.contents != postsEditInput.contents : 
        create_log(request, res.uid, "T_BOARD_POSTS", "contents", "contents", res.contents, postsEditInput.contents, "", "", user.user_id)
        request.state.inspect = frame()
        res.contents = postsEditInput.contents
    
    if postsEditInput.tags is not None and res.tags != postsEditInput.tags : 
        create_log(request, res.uid, "T_BOARD_POSTS", "tags", "tags", res.tags, postsEditInput.tags, "", "", user.user_id)
        request.state.inspect = frame()
        res.tags = postsEditInput.tags
    
    if postsEditInput.is_display is not None and res.is_display != postsEditInput.is_display : 
        create_log(request, res.uid, "T_BOARD_POSTS", "is_display", "is_display", res.is_display, postsEditInput.is_display, "", "", user.user_id)
        request.state.inspect = frame()
        res.is_display = postsEditInput.is_display
        
    res.update_at = util.getNow()
    return res


# 게시물 삭제
def posts_delete(request: Request, postsEditInput : PostsEditInput):
    request.state.inspect = frame()
    db = request.state.db
    user = request.state.user

    board_posts_res = db.query(T_BOARD_POSTS).filter(T_BOARD_POSTS.board_uid == postsEditInput.board_uid, T_BOARD_POSTS.uid == postsEditInput.uid, T_BOARD_POSTS.delete_at == None).first()

    board_posts_res.delete_at = util.getNow()
    create_log(request, board_posts_res.uid, "T_BOARD_POSTS", "delete_at", "삭제일", "", board_posts_res.delete_at, "", "", user.user_id)
    request.state.inspect = frame()

    return board_posts_res
