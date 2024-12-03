from sqlalchemy.orm import Session
from app.model.proxy import *
from app.model.schemas import *
from sqlalchemy import func

# def read(db: Session, ums_uid: int):
#     return db.query(T_UMS_TEMPLATE).filter(T_UMS_TEMPLATE.uid == ums_uid).first()

# request insert
def create_request(db: Session, p: T_PROXY_REQUEST):
    db.add(p)
    db.flush()
    db.commit()
    return p

    
def create_zlgoon(db: Session, p: T_PROXY_ZLGOON, req_uid: int):

    for obj in p.list:
        db_item = T_PROXY_ZLGOON (
             req_uid = req_uid
            ,goodsId = obj.goodsId
            ,goodsName = obj.goodsName
            ,rcompanyName = obj.rcompanyName
            ,extendExpireDateYn = obj.extendExpireDateYn
            ,expireDate = obj.expireDate
            ,expireDays = obj.expireDays
            ,goodsPrice = obj.goodsPrice
            ,salePrice = obj.salePrice
            ,buyPrice = obj.buyPrice
            ,maxCntPerPerson = obj.maxCntPerPerson
            ,sendMessage = obj.sendMessage
            ,imageUrl500 = obj.imageUrl500
            ,imageUrl980 = obj.imageUrl980
        )
        db.add(db_item)
        db.flush()
        db.commit()
    
    return p

def readlist_zlgoon(db: Session):
    return db.query(T_PROXY_ZLGOON).all()

def readlist_roomio_hotel(db: Session):

    group_by_hotel = (
        db.query(
             T_PROXY_ROOMIO_HOTEL.hotel_id.label('hotel_id')
            ,func.max(T_PROXY_ROOMIO_HOTEL.uid).label('hotel_uid')
        )
        .group_by(T_PROXY_ROOMIO_HOTEL.hotel_id)
        .subquery()
    )

    res = (
        db.query(
            T_PROXY_ROOMIO_HOTEL.uid
            ,T_PROXY_ROOMIO_HOTEL.req_uid
            ,T_PROXY_ROOMIO_HOTEL.hotel_id
            ,T_PROXY_ROOMIO_HOTEL.status
            ,T_PROXY_ROOMIO_HOTEL.upldate_at
            ,T_PROXY_ROOMIO_HOTEL.price
            ,T_PROXY_ROOMIO_HOTEL.spot_nm
            ,T_PROXY_ROOMIO_HOTEL.spot_area1
            ,T_PROXY_ROOMIO_HOTEL.spot_area2
            ,T_PROXY_ROOMIO_HOTEL.spot_type1
            ,T_PROXY_ROOMIO_HOTEL.spot_type2
            ,T_PROXY_ROOMIO_HOTEL.tel
            ,T_PROXY_ROOMIO_HOTEL.holiday
            ,T_PROXY_ROOMIO_HOTEL.penalty_day
            ,T_PROXY_ROOMIO_HOTEL.penalty
            ,T_PROXY_ROOMIO_HOTEL.hp
            ,T_PROXY_ROOMIO_HOTEL.fax
            ,T_PROXY_ROOMIO_HOTEL.email
            ,T_PROXY_ROOMIO_HOTEL.homepage
            ,T_PROXY_ROOMIO_HOTEL.zip_code
            ,T_PROXY_ROOMIO_HOTEL.addr
            ,T_PROXY_ROOMIO_HOTEL.addr_desc
            ,T_PROXY_ROOMIO_HOTEL.lat
            ,T_PROXY_ROOMIO_HOTEL.lng
            ,T_PROXY_ROOMIO_HOTEL.check_in_h
            ,T_PROXY_ROOMIO_HOTEL.check_in_m
            ,T_PROXY_ROOMIO_HOTEL.check_out_h
            ,T_PROXY_ROOMIO_HOTEL.check_out_m
            ,T_PROXY_ROOMIO_HOTEL.txt
            ,T_PROXY_ROOMIO_HOTEL.cpoint
            ,T_PROXY_ROOMIO_HOTEL.sitems
            ,T_PROXY_ROOMIO_HOTEL.short_txt
            ,T_PROXY_ROOMIO_HOTEL.comfort
            ,T_PROXY_ROOMIO_HOTEL.rental
            ,T_PROXY_ROOMIO_HOTEL.room_inside
            ,T_PROXY_ROOMIO_HOTEL.dining
            ,T_PROXY_ROOMIO_HOTEL.facility
            ,T_PROXY_ROOMIO_HOTEL.theme
            ,T_PROXY_ROOMIO_HOTEL.create_at
        )
        .join(
            group_by_hotel,
            group_by_hotel.c.hotel_uid == T_PROXY_ROOMIO_HOTEL.uid,
        )
        .order_by(T_PROXY_ROOMIO_HOTEL.uid.desc())
    )

    rows = []
    for c in res.all():
        rows.append(dict(zip(c.keys(), c)))

    jsondata = {}
    jsondata.update({"list": rows})

    return jsondata

def readlist_roomio_hotel_img(db: Session, uid: int):
    return db.query(T_PROXY_ROOMIO_HOTEL_IMG).filter(T_PROXY_ROOMIO_HOTEL_IMG.hotel_uid == uid).all()
    



def create_roomio_hotel(db: Session, p: T_PROXY_ROOMIO_HOTEL, req_uid: int):

    for obj in p.list:
        db_item = T_PROXY_ROOMIO_HOTEL (
             req_uid = req_uid
            ,hotel_id = obj.hotel_id
            ,status = obj.status
            ,upldate_at = obj.upldate_at
            ,price = obj.price
            ,spot_nm = obj.spot_nm
            ,spot_area1 = obj.spot_area1
            ,spot_area2 = obj.spot_area2
            ,spot_type1 = obj.spot_type1
            ,spot_type2 = obj.spot_type2
            ,tel = obj.tel
            ,holiday = obj.holiday
            ,penalty_day = obj.penalty_day
            ,penalty = obj.penalty
            ,hp = obj.hp
            ,fax = obj.fax
            ,email = obj.email
            ,homepage = obj.homepage
            ,zip_code = obj.zip_code
            ,addr = obj.addr
            ,addr_desc = obj.addr_desc
            ,lat = obj.lat
            ,lng = obj.lng
            ,check_in_h = obj.check_in_h
            ,check_in_m = obj.check_in_m
            ,check_out_h = obj.check_out_h
            ,check_out_m = obj.check_out_m
            ,txt = obj.txt
            ,cpoint = obj.cpoint
            ,sitems = obj.sitems
            ,short_txt = obj.short_txt
            ,comfort = obj.comfort
            ,rental = obj.rental
            ,room_inside = obj.room_inside
            ,dining = obj.dining
            ,facility = obj.facility
            ,theme = obj.theme
            ,create_at = util.getNow()
        )
        db.add(db_item)
        db.flush()

        # 시설 이미지
        for hotel_img in obj.hotel_imgs:
            img_item = T_PROXY_ROOMIO_HOTEL_IMG (
                 hotel_uid = db_item.uid
                ,hotel_id = obj.hotel_id
                ,image = hotel_img
            )
            db.add(img_item)
            db.flush()
        # end for hotel_imgs

        # 객실 정보
        for room in obj.room_list:
            room_item = T_PROXY_ROOMIO_ROOM (
                 hotel_uid = db_item.uid
                ,hotel_id = obj.hotel_id
                ,room_id = room.room_id
                ,room_name = room.room_name
            )
            db.add(room_item)
            db.flush()

            for room_img in room.room_imgs:
                room_img_item = T_PROXY_ROOMIO_ROOM_IMG (
                     room_uid = room_item.uid
                    ,hotel_id = obj.hotel_id
                    ,room_id = room.room_id
                    ,image = room_img
                )
                db.add(room_img_item)
                db.flush()
            # end for room_imgs
        # end for room

    # end for list
    db.commit()
    return p
