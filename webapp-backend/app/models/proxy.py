from sqlalchemy import Column, String, Integer, DateTime
from app.core import util
from app.core.session import Base

from typing import List, Optional
from pydantic import BaseModel, Field
from app.model.schemas import *

class T_PROXY_REQUEST(Base):
    __tablename__ = "T_PROXY_REQUEST"
    uid = Column(Integer, primary_key=True, index=True)
    request_count = Column(Integer)
    request_body = Column(String)
    reg_user = Column(String)







class T_PROXY_ZLGOON(Base):
    __tablename__ = "T_PROXY_ZLGOON"
    uid = Column(Integer, primary_key=True, index=True)
    req_uid = Column(Integer)
    goodsId = Column(String)
    goodsName = Column(String)
    rcompanyName = Column(String)
    extendExpireDateYn = Column(String)
    expireDate = Column(String)
    expireDays = Column(Integer)
    goodsPrice = Column(Integer)
    salePrice = Column(Integer)
    buyPrice = Column(Integer)
    maxCntPerPerson = Column(Integer)
    sendMessage = Column(String)
    imageUrl500 = Column(String)
    imageUrl980 = Column(String)

class ZlgGoods(BaseModel):
    goodsId            :	Optional[str] = Field("", title="상품 번호 (uk)", example="1234")
    goodsName          :	Optional[str] = Field("", title="상품 이름", example="상품 이름")
    rcompanyName       :	Optional[str] = Field("", title="브랜드명", example="브랜드명")
    extendExpireDateYn :	Optional[str] = Field("", title="유효기간연장가능여부", example="Y")
    expireDate         :	Optional[str] = Field("", title="유효기간(특정일까지)", example="2000.11.12")
    expireDays         :	Optional[int] = Field(0, title="유효기간(발행 이후 기간)", example=1)
    goodsPrice         :	Optional[int] = Field(0, title="정상가", example=2)
    salePrice          :	Optional[int] = Field(0, title="판매가", example=3)
    buyPrice           :	Optional[int] = Field(0, title="매입가", example=4)
    maxCntPerPerson    :	Optional[int] = Field(0, title="최대발행개수", example=4)
    sendMessage        :	Optional[str] = Field("", title="상품MMS메시지", example="상품MMS메시지")
    imageUrl500        :	Optional[str] = Field("", title="이미지1 url", example="https://indend-resource.s3.amazonaws.com/mall/goods/S9849/thumb/20221014180413-717_1.jpg")
    imageUrl980        :	Optional[str] = Field("", title="이미지2 url", example="https://indend-resource.s3.amazonaws.com/mall/goods/S9849/thumb/20221014180413-717_1.jpg")
    class Config:
        orm_mode = True

class ZlgGoodsList(BaseModel):
    list: List[ZlgGoods] = Field([], title="ZlgGoods list")
    class Config:
        orm_mode = True





















class T_PROXY_ROOMIO_HOTEL(Base):
    __tablename__ = "T_PROXY_ROOMIO_HOTEL"
    uid = Column(Integer, primary_key=True, index=True)
    req_uid = Column(String)
    hotel_id = Column(Integer)
    status = Column(String)
    upldate_at = Column(String)
    price = Column(Integer)
    spot_nm = Column(String)
    spot_area1 = Column(String)
    spot_area2 = Column(String)
    spot_type1 = Column(String)
    spot_type2 = Column(String)
    tel = Column(String)
    holiday = Column(Integer)
    penalty_day = Column(Integer)
    penalty = Column(Integer)
    hp = Column(String)
    fax = Column(String)
    email = Column(String)
    homepage = Column(String)
    zip_code = Column(String)
    addr = Column(String)
    addr_desc = Column(String)
    lat = Column(String)
    lng = Column(String)
    check_in_h = Column(Integer)
    check_in_m = Column(Integer)
    check_out_h = Column(Integer)
    check_out_m = Column(Integer)
    txt = Column(String)
    cpoint = Column(String)
    sitems = Column(String)
    short_txt = Column(String)
    comfort = Column(String)
    rental = Column(String)
    room_inside = Column(String)
    dining = Column(String)
    facility = Column(String)
    theme = Column(String)
    create_at = Column(String)

class T_PROXY_ROOMIO_HOTEL_IMG(Base):
    __tablename__ = "T_PROXY_ROOMIO_HOTEL_IMG"
    uid = Column(Integer, primary_key=True, index=True)
    hotel_uid = Column(Integer)
    hotel_id = Column(Integer)
    image = Column(String)



class T_PROXY_ROOMIO_ROOM(Base):
    __tablename__ = "T_PROXY_ROOMIO_ROOM"
    uid = Column(Integer, primary_key=True, index=True)
    hotel_uid = Column(Integer)
    hotel_id = Column(Integer)
    room_id = Column(Integer)
    room_name = Column(String)

class T_PROXY_ROOMIO_ROOM_IMG(Base):
    __tablename__ = "T_PROXY_ROOMIO_ROOM_IMG"
    uid = Column(Integer, primary_key=True, index=True)
    room_uid = Column(Integer)
    hotel_id = Column(Integer)
    room_id = Column(Integer)
    image = Column(String)
    
class RoomioRoom(BaseModel):
    room_id    : Optional[int] = Field("", title="객실고유번호", example="2993")
    room_name  : Optional[str] = Field("", title="객실명", example="호텔 디럭스")
    room_imgs  : List[str] = Field([], title="객실이미지")
    class Config:
        orm_mode = True

class RoomioHotel(BaseModel):
    hotel_id    : Optional[int] = Field("", title="시설고유번호", example="8122")
    status      : Optional[str] = Field("", title="시설상태", example="enabled")
    upldate_at  : Optional[str] = Field("", title="최종수정날짜", example="2022-11-06 11:11:11")
    price       : Optional[int] = Field(0, title="대표판매가", example="120000")
    hotel_imgs  : List[str] = Field([], title="시설이미지")
    spot_nm     : Optional[str] = Field("", title="시설명", example="한화리조트 평창")
    spot_area1  : Optional[str] = Field("", title="지역1", example="전라남도")
    spot_area2  : Optional[str] = Field("", title="지역2", example="여수시")
    spot_type1  : Optional[str] = Field("", title="종류1", example="숙박")
    spot_type2  : Optional[str] = Field("", title="종류1", example="호텔")
    tel         : Optional[str] = Field("", title="유선번호", example="0333346100")
    holiday     : Optional[int] = Field(0, title="공휴일", example="1")
    penalty_day : Optional[int] = Field(0, title="취소일", example="7")
    penalty     : Optional[int] = Field(100, title="위약금", example="100")
    hp          : Optional[str] = Field("", title="휴대폰", example="")
    fax         : Optional[str] = Field("", title="팩스번호", example="")
    email       : Optional[str] = Field("", title="이메일", example="")
    homepage    : Optional[str] = Field("", title="홈페이지", example="")
    zip_code    : Optional[str] = Field("", title="우편번호", example="")
    addr        : Optional[str] = Field("", title="주소", example="")
    addr_desc   : Optional[str] = Field("", title="주소상세", example="")
    lat         : Optional[str] = Field("", title="위도", example="37.57883500000000")
    lng         : Optional[str] = Field("", title="경도", example="128.33166300000000")
    check_in_h  : Optional[int] = Field(0, title="체크인 시", example="15")
    check_in_m  : Optional[int] = Field(0, title="체크인 분", example="0")
    check_out_h : Optional[int] = Field(0, title="체크아웃 시", example="11")
    check_out_m : Optional[int] = Field(0, title="체크아웃 분", example="0")
    txt         : Optional[str] = Field("", title="추가요금안내", example="<p style='line-height: 1.8;'>asdf...</p>")
    cpoint      : Optional[str] = Field("", title="이용안내", example="<p style='line-height: 1.8;'>asdf...</p>")
    sitems      : Optional[str] = Field("", title="유의사항", example="<p style='line-height: 1.8;'>asdf...</p>")
    short_txt   : Optional[str] = Field("", title="한줄소개", example="대관령의 깨끗한 자연과 활기차고...")
    comfort     : Optional[str] = Field("", title="편의시설", example="주차가능,주차불가,연회장")
    rental      : Optional[str] = Field("", title="대여용품", example="VOD,프로젝터,침대가드")
    room_inside : Optional[str] = Field("", title="객실內", example="미니바,벽난로,TV")
    dining      : Optional[str] = Field("", title="다이닝", example="레스토랑,라운지,루프탑바")
    facility    : Optional[str] = Field("", title="부대시설", example="노래방,실내수영장,인피니티풀")
    theme       : Optional[str] = Field("", title="테마", example="한옥,가족여행")
    room_list   : List[RoomioRoom] = Field([], title="객실정보")
    class Config:
        orm_mode = True

class RoomioHotelList(BaseModel):
    list: List[RoomioHotel] = Field([], title="RoomioHotel list")
    class Config:
        orm_mode = True