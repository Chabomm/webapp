from sqlalchemy.orm import Session, aliased
from sqlalchemy import func, select, column, table, case
from fastapi import Request
from inspect import currentframe as frame
from fastapi.encoders import jsonable_encoder
import math

from app.core import exceptions as ex
from app.core import util
from app.core.database import format_sql
from app.models.display import *
from app.models.board import *
from app.schemas.board import *
from app.service import board_service

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
        )
        .filter(
            T_BOARD.uid == uid
            ,T_BOARD.delete_at == None
        )
    )
    return sql.first()

# 게시물_카테고리_리스트
def posts_cate_list(request: Request, uid: int):
    request.state.inspect = frame()
    db = request.state.db

    subquery = (
        db.query (T_BOARD_POSTS.cate_uid)
        .filter(
             T_BOARD_POSTS.board_uid == uid
            ,T_BOARD_POSTS.delete_at == None
        )
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

    # format_sql(sql)

    rows = []
    for c in sql.all():
        rows.append(dict(zip(c.keys(), c)))

    jsondata = {}
    jsondata.update({"list": rows})

    return jsondata

# 게시물_리스트
def posts_list(request: Request, postsListInput: PostsListInput):
# def posts_list(request: Request, postsListInput: PostsListInput, with_contents: bool):
    request.state.inspect = frame()
    db = request.state.db

    filters = []
    filters.append(getattr(T_BOARD_POSTS, "board_uid") == postsListInput.board_uid)
    filters.append(getattr(T_BOARD_POSTS, "is_display") == 'T')
    filters.append(getattr(T_BOARD_POSTS, "delete_at") == None)

    if postsListInput.cate_uid > 0 :
        filters.append(getattr(T_BOARD_POSTS, "cate_uid") == postsListInput.cate_uid)

    sql = (
        db.query(
             func.row_number().over(order_by=T_BOARD_POSTS.uid.desc()).label("no")
            ,T_BOARD_POSTS.uid
            ,T_BOARD_POSTS.board_uid
            ,T_BOARD_POSTS.cate_uid
            ,T_BOARD_POSTS.thumb
            ,T_BOARD_POSTS.title
            ,T_BOARD_POSTS.contents
            ,T_BOARD_POSTS.is_display
            ,func.date_format(T_BOARD_POSTS.create_at, '%Y.%m.%d').label('create_at')
        )
        .filter(*filters)
        .order_by(T_BOARD_POSTS.uid.desc())
        .offset((postsListInput.page-1)*postsListInput.page_view_size)
        .limit(postsListInput.page_view_size)
    )

    rows = []
    for c in sql.all():
        row = dict(zip(c.keys(), c))
        # if with_contents :
        #     contents = board_service.contents_read(request, row["uid"], row["board_uid"])
        #     request.state.inspect = frame()
        #     row.update({"contents" : contents})
        rows.append(row)

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
    jsondata.update({"params": postsListInput})
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
            ,func.date_format(T_BOARD_POSTS.create_at, '%Y.%m.%d').label('create_at')
        )
        .filter(
             T_BOARD_POSTS.uid == uid
            ,T_BOARD_POSTS.is_display == "T"
            ,T_BOARD_POSTS.delete_at == None
        )
    )
    
    res = sql.first()
    
    

    return res

# posts_contents_상세
# def contents_read(request: Request, posts_uid: int, board_uid:int):
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
#         .filter(
#              T_BOARD_CONTENTS.board_uid == board_uid
#             ,T_BOARD_CONTENTS.posts_uid == posts_uid
#             ,T_BOARD_CONTENTS.delete_at == None
#         )
#         .order_by(T_BOARD_CONTENTS.sort.asc())
#     )
    
#     rows = []
#     for c in sql.all():
#         rows.append( dict(zip(c.keys(), c)) )

#     return rows

# 게시물의 이전글, 다음글
def read_prev_next_posts(request: Request, posts_uid: int, board_uid: int):
    request.state.inspect = frame()
    db = request.state.db

    sql = """
        SELECT 
            uid
            ,title 
            ,DATE_FORMAT(create_at, '%Y-%m-%d %T') as create_at
        FROM T_BOARD_POSTS 
        where uid = (
            SELECT MAX(uid)
            FROM T_BOARD_POSTS
            WHERE uid < {posts_uid}
            and board_uid = {board_uid}
            and is_display = 'T'
            and delete_at is null
        )
    """.format(board_uid=board_uid, posts_uid=posts_uid)
    prev_posts = db.execute(text(sql)).first()

    sql = """
        SELECT 
            uid
            ,title 
            ,DATE_FORMAT(create_at, '%Y-%m-%d %T') as create_at
        FROM T_BOARD_POSTS 
        where uid = (
            SELECT MIN(uid)
            FROM T_BOARD_POSTS
            WHERE uid > {posts_uid} 
            and board_uid = {board_uid}
            and is_display = 'T'
            and delete_at is null
        )
    """.format(board_uid=board_uid, posts_uid=posts_uid)
    next_posts = db.execute(text(sql)).first()

    if prev_posts is None:
        prev_posts = {"uid":0, "title": "이전 게시물이 없습니다.", "create_at": ""}
    else :
        prev_posts = dict(zip(prev_posts.keys(), prev_posts))

    if next_posts is None:
        next_posts = {"uid":0, "title": "다음 게시물이 없습니다.", "create_at": ""}
    else :
        next_posts = dict(zip(next_posts.keys(), next_posts))

    jsondata = {}
    jsondata.update({"prev_posts": prev_posts})
    jsondata.update({"next_posts": next_posts})
    return jsondata