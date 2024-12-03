
from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session
from app.core.connection import get_db
from app.core.config import PROXY_PREFIX
from fastapi.encoders import jsonable_encoder
from app.core import util
from app.core import log
import json

from app.model.proxy import *
from app.service import proxy_service

router = APIRouter (
    prefix = PROXY_PREFIX+"/proxy", # /be/proxy
    tags=["proxy"],
)

@router.post(path="/zlgoon", status_code=200, description="***** 즐거운 상품정보 중계채널 (바스켓) *****")
def zlgoon (
    request:Request, 
    zlgGoods: ZlgGoodsList,
    db: Session = Depends(get_db)
):
    log.log("")
    log.log("==== START controller [ {0} ] ====".format(request.url.path))
    print(type(zlgGoods.list[0]), len(zlgGoods.list), zlgGoods)
    
    p = T_PROXY_REQUEST (
         request_count = len(zlgGoods.list)
        ,request_body = json.dumps(jsonable_encoder(zlgGoods), ensure_ascii=False, indent=4)
        ,reg_user = request.client.host
    )
    res = proxy_service.create_request(db, p)
    proxy_service.create_zlgoon(db, zlgGoods, res.uid)

    log.log("==== END controller [ {0} ] ====".format(request.url.path))
    log.log("")
    return {
        "result_code" : 200,
        "result_msg" : ""
    }


@router.get(path="/zlgoon", status_code=200, description="***** 즐거운 상품정보 리스트 *****")
def readlist_zlgoon (
    request:Request, 
    db: Session = Depends(get_db)
):
    log.log("")
    log.log("==== START controller [ {0} ] ====".format(request.url.path))
    
    headers = dict(zip(request.headers.keys(), request.headers.values()))

    try:
        if headers['ayo'] != "asdf1234kkk" :
            raise HTTPException(status_code = 404, detail = "not found")
    except KeyError:
        if not util.IS_LOCAL(request) :
            raise HTTPException(status_code = 404, detail = "not found")

    res = proxy_service.readlist_zlgoon(db)

    log.log("==== END controller [ {0} ] ====".format(request.url.path))
    log.log("")
    return {
        "result_code" : 200,
        "result_msg" : "",
        "list" : res
    }





@router.post(path="/roomio_hotel", status_code=200, description="***** 루미오 숙소상품 중계채널 (바스켓) *****")
def roomio_hotel (
    request:Request, 
    roomioHotel: RoomioHotelList,
    db: Session = Depends(get_db)
):
    log.log("")
    log.log("==== START controller [ {0} ] ====".format(request.url.path))
    print(type(roomioHotel.list[0]), len(roomioHotel.list), roomioHotel)
    
    p = T_PROXY_REQUEST (
         request_count = len(roomioHotel.list)
        ,request_body = json.dumps(jsonable_encoder(roomioHotel), ensure_ascii=False, indent=4)
        ,reg_user = request.client.host
    )
    
    res = proxy_service.create_request(db, p)
    proxy_service.create_roomio_hotel(db, roomioHotel, res.uid)

    log.log("==== END controller [ {0} ] ====".format(request.url.path))
    log.log("")
    return {
        "result_code" : 200,
        "result_msg" : ""
    }






@router.get(path="/roomio_hotel", status_code=200, description="***** 루미오 상품정보 리스트 *****")
def readlist_roomio_hotel (
    request:Request, 
    db: Session = Depends(get_db)
):
    log.log("")
    log.log("==== START controller [ {0} ] ====".format(request.url.path))
    
    # headers = dict(zip(request.headers.keys(), request.headers.values()))
    # try:
    #     if headers['ayo'] != "asdf1234kkk" :
    #         raise HTTPException(status_code = 404, detail = "not found")
    # except KeyError:
    #     if not util.IS_LOCAL(request) :
    #         raise HTTPException(status_code = 404, detail = "not found")

    res = proxy_service.readlist_roomio_hotel(db)
    
    for obj in res["list"]: 
        hotel_images = proxy_service.readlist_roomio_hotel_img(db, obj["uid"])
        obj.update({"hotel_imgs": hotel_images})

    res.update({
        "result_code" : 200,
        "result_msg" : ""
    })

    log.log("==== END controller [ {0} ] ====".format(request.url.path))
    log.log("")
    return res