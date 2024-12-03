from sqlalchemy import Column, String, Integer, ForeignKey, text, DateTime, Text

from app.core.database import Base
from app.schemas.schema import *

class T_BOARD(Base): # 게시판
    __tablename__ = "T_BOARD"
    uid = Column(Integer, primary_key=True, index=True)
    site_id= Column(String, comment="프로젝트")
    board_type = Column(String, default='common', comment="게시판 유형")
    board_name = Column(String, comment="게시판 이름")
    per_write = Column(String, comment="쓰기권한")
    per_read = Column(String, comment="읽기권한")
    is_comment = Column(String, default='F', comment="댓글여부")
    is_display = Column(String, default='T', comment="표시여부")
    front_url = Column(String, comment="프론트 URL")
    create_at = Column(DateTime, server_default=text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"), comment="등록일")
    update_at = Column(DateTime, comment="수정일")
    delete_at = Column(DateTime, comment="삭제일")

class T_BOARD_POSTS(Base): # 게시물
    __tablename__ = "T_BOARD_POSTS"
    uid = Column(Integer, primary_key=True, index=True, nullable=False)
    board_uid = Column(Integer, ForeignKey('T_BOARD.uid'), nullable=False)
    cate_uid = Column(Integer, ForeignKey('T_MAIN_CATE.uid'))
    thumb  = Column(String, comment="썸네일")
    title  = Column(String, comment="게시물 제목")
    contents  = Column(Text, comment="게시물 본문")
    tags  = Column(String, comment="태그")
    is_display = Column(String, default='T', comment="공개여부")
    create_at = Column(DateTime, server_default=text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"), comment="등록일")
    update_at = Column(DateTime, comment="수정일")
    delete_at = Column(DateTime, comment="삭제일")

# uha추가
class T_BOARD_CONTENTS(Base): # 게시물
    __tablename__ = "T_BOARD_CONTENTS"
    uid = Column(Integer, primary_key=True, index=True, nullable=False)
    board_uid = Column(Integer, ForeignKey('T_BOARD.uid'), nullable=False)
    posts_uid = Column(Integer, ForeignKey('T_BOARD_POSTS.uid'))
    sort = Column(Integer)
    btype  = Column(String, comment="블록타입")
    html  = Column(Text, comment="")
    image_url  = Column(String, comment="이미지 주소")
    link  = Column(String, comment="링크주소")
    link_target = Column(String, default='_self', comment="링크타겟")
    is_display = Column(String, default='T', comment="공개여부")
    create_at = Column(DateTime, server_default=text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"), comment="등록일")
    update_at = Column(DateTime, comment="수정일")
    delete_at = Column(DateTime, comment="삭제일")


    