from typing import List, Dict, Any, Union, Optional
from datetime import date, datetime, time, timedelta

from app.schemas.schema import *


from fastapi.datastructures import UploadFile
from fastapi.param_functions import File, Body, Form

class Board(AppModel): # 게시판
    uid: int = Field(0, title="게시판 고유번호")
    site_id: str = Field("", title="프로젝트", max_length=50)
    board_type: str = Field('common', title="게시판 유형", max_length=10)
    board_name: str = Field("", title="게시판 이름", max_length=50)
    per_write: Optional[str] = Field('admin', title="쓰기권한", max_length=50)
    per_read: Optional[str] = Field('admin', title="읽기권한", max_length=50)
    is_comment: Optional[str] = Field('F', title="댓글여부", max_length=1)
    is_display: str = Field('T', title="노출여부", max_length=1)
    front_url: str = Field('', title="프론트 URL")
    create_at: Optional[datetime] = Field(None, title="등록일")
    update_at: Optional[datetime] = Field(None, title="수정일")
    delete_at: Optional[datetime] = Field(None, title="삭제일")
    mode: Optional[str] = Field(None, title="REG/MOD/DEL")
    class Config:
        orm_mode = True

class BoardList(PPage_param, Status):
    list: List[Board] = Field([], title="게시판 리스트")
    class Config:
        orm_mode = True

class PostsInput(BaseModel): # 게시물
    posts_uid: int = Field(0, title="게시물 고유번호")
    password: Optional[str] = Field(None, title="비밀번호", max_length=100)
    board_uid: int = Field(None, title="게시판 번호")
    
# class BoardConfigRes(BaseModel):
#     params: PPage_param
#     list: List[Board]
#     class Config:
#         orm_mode = True

# class BoardConfigOutput(BoardConfig, Status):
#     class Config:
#         orm_mode = True

# class BoardConfigListInput(BaseModel):
#     page: int = Field(1, title="현재페이지")
#     sort: str = Field("new", title="정렬방법")

class PostsCate(BaseModel) : 
    uid: Optional[int] = Field(0, title="카테고리 고유번호")
    cate_name: Optional[str] = Field(None, title="카테고리 명")
    cate_icon: Optional[str] = Field(None, title="카티고리 아이콘")
    cate_sort: Optional[int] = Field(0, title="카티고리 순서")

# uha 추가
class contentsList(BaseModel):
    image_url: Optional[str] = Field("")
    link: Optional[str] = Field("")
    html: Optional[str] = Field("")
    link_target: Optional[str] = Field("")
    btype: Optional[str] = Field("")



class Posts(BaseModel): # 게시물
    no: Optional[int] = Field(0, title="게시물넘버링")
    uid: int = Field(0, title="게시물 고유번호")
    board_uid: int = Field(0, title="게시판 번호")
    cate_uid: Optional[int] = Field(0, title="카테고리 번호")
    thumb: Optional[str] = Field(None, title="썸네일", max_length=255)
    title: str = Field(None, title="게시물 제목", max_length=200)
    # contents: str = Field(None, title="게시물 본문") -> 원본(uha)
    contents: List[contentsList] = Field([], title="contents List")
    tags: Optional[str] = Field(None, title="태그", max_length=200)
    is_display: str = Field('T', title="노출여부", max_length=1)
    create_at: Optional[datetime] = Field(None, title="등록일")
    update_at: Optional[datetime] = Field(None, title="수정일")
    delete_at: Optional[datetime] = Field(None, title="삭제일")
    mode: Optional[str] = Field(None, title="REG/MOD/DEL")
    class Config:
        orm_mode = True





class PostsListInput(PPage_param, Status):
    board_uid: int = Field(0, title="T_BOARD의 uid")
    cate_uid: Optional[int] = Field(0, title="T_MAIN_CATE uid")
    class Config:
        orm_mode = True

class PostsList(PPage_param, Status):
    list: List[Posts] = Field([], title="게시물 리스트")
    board_uid: int = Field(0, title="T_BOARD의 uid")
    cate_uid: Optional[int] = Field(0, title="T_MAIN_CATE uid")
    board: Board = Field({}, title="게시판 상세정보")
    category_list: List[PostsCate] = Field([], title="게시물 리스트")
    class Config:
        orm_mode = True

# uha추가
class BoardPostsReadInput(PPage_param, Status):
    board_uid: int = Field(0, title="T_BOARD의 uid")
    uid: int = Field(0, title="T_BOARD_POSTS uid")
    class Config:
        orm_mode = True

class PostsEditInput(BaseModel): # 게시물
    board_uid: int = Field(0, title="T_BOARD의 uid")
    uid: int = Field(0, title="T_BOARD_POSTS uid")
    cate_uid: Optional[int] = Field(0, title="T_MAIN_CATE uid")
    thumb: Optional[str] = Field(None, title="")
    title: Optional[str] = Field(None, title="")
    tags: Optional[str] = Field(None, title="")
    is_display: Optional[str] = Field(None, title="")
    contents: Optional[str] = Field(None, title="")
    mode: Optional[str] = Field(None, title="REG/MOD/DEL")

# class BoardOutput(Board, Status):
#     class Config:
#         orm_mode = True

# class BoardListInput(PPage_param):
#     uid: int = Field(0, title="baord config uid")
#     cate_uid: Optional[int] = Field(0, title="카테고리 uid")

# class BoardListInput(BaseModel):
#     uid: int = Field(0, title="baord config uid")
#     page: int = Field(1, title="현재페이지")
#     sort: str = Field("new", title="정렬방법")
#     cate_uid: Optional[int] = Field(0, title="카테고리 uid")

# class BoardListOutput(PPage_param, Status):
#     list: List[Board] = Field([], title="board list")
#     class Config:
#         orm_mode = True

# class BoardCateListInput(BaseModel):
#     cate_uid: int = Field(0, title="main cate uid")
#     config_uid: int = Field(0, title="게시판 config uid")

# class BoardCateListOutput (Status):
#     list: List[Board] = Field([], title="Board list")
#     class Config:
#         orm_mode = True

# class BoardInput(BaseModel):
#     uid: int = Field(0, title="baord config uid")
#     cate_uid: Optional[int] = Field(0, title="카테고리 uid")