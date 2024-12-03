from fastapi import APIRouter, Depends, HTTPException, status, Response, Request, Body
from fastapi.responses import RedirectResponse, JSONResponse
from inspect import currentframe as frame
import jwt
import requests

from app.models.member import *
from app.models.session import *
from app.schemas.auth import *
from app.core import exceptions as ex
from app.core import util
from app.core.config import *
from app.core.config import PROXY_PREFIX, api_same_origin
from app.models.ums import *
from app.schemas.ums import *
from app.service.admin import ums_service, filter_service
from app.deps.auth import signin, create_access_token, get_current_active_user, ACCESS_TOKEN_EXPIRE_MINUTES, REFRESH_TOKEN_EXPIRE_MINUTES, SECRET_KEY, ALGORITHM

router = APIRouter (
    prefix = PROXY_PREFIX,
    tags=["admin/ums"],
)

# /be/admin/ums/template/list
@router.post("/admin/ums/template/list", dependencies=[Depends(api_same_origin)])
async def UMS템플릿_리스트 (
    request: Request
    ,page_param: PPage_param
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    if not page_param.page or int(page_param.page) == 0:
        page_param.page = 1
    
    if not page_param.page_view_size or int(page_param.page_view_size) == 0 :
        page_param.page_view_size = 30

    res = ums_service.ums_list(request, page_param) 
    request.state.inspect = frame()
    return res

# /be/admin/ums/template/read
@router.post("/admin/ums/template/read", dependencies=[Depends(api_same_origin)])
async def UMS_상세(
    request: Request
    ,pRead : PRead = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "T_UMS_TEMPLATE uid",
                "description": "",
                "value": {
                    "uid" : 5
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
        return Ums_template()
    
    res = ums_service.ums_read(request, pRead.uid)

    if res is None :
        return ex.ReturnOK(404, "데이터를 찾을 수 없습니다.", request)
        
    return res

# /be/admin/board/edit
@router.post("/admin/ums/template/edit", dependencies=[Depends(api_same_origin)])
async def UMS_편집(
    request: Request
    ,ums_template: Ums_template = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "ums템플릿 등록예시 01",
                "description": "",
                "value": {
                     "ums_type" : "at"
                    ,"platform" : "admin"
                    ,"template_code" : "ab123"
                    ,"subject" : "[임직원] 신규 사내 복지정보 등록"
                    ,"content" : "[#{회사명} 사내 복지정보 등록 안내]\n\n안녕하세요, #{임직원명}님!\n좋은 직장을 선택하는 기준, 복지드림입니다.\n\n#{회사명}의 신규 사내 복지 정보가 #{복지몰명}에 등록되었습니다.\n자세한 복지 정보는 복지몰 또는 복지드림 어플에서 확인하실 수 있습니다.\n\n#{복지정보}\n\n※ 복지드림 카카오톡 : @복지드림\n※ 복지드림 고객센터 : 1668-1317\n(평일 9:00 ~ 18:00, 주말 및 공휴일 휴무)"
                    ,"memo" : "4/11 등록 · 발송대상: 임직원"
                    ,"profile" : "indend"
                    ,"mode" : "REG"
                }
            },
            "example02" : {
                "summary": "ums템플릿 등록예시 02",
                "description": "",
                "value": {
                    "ums_type" : "email"
                    ,"platform" : "admin"
                    ,"subject" : "[복지드림] 복지드림 서비스 소개서가 도착했습니다"
                    ,"content" : "<div>dsfdfsd</div>"
                    ,"mode" : "REG"
                }
            },
            
            "example03" : {
                "summary": "ums템플릿 수정예시 01",
                "description": "",
                "value": {
                    "uid" : 7
                    ,"ums_type" : "sms"
                    ,"subject" : "테스트 문자 입니다."
                    ,"content" : "#{플랫폼}에서 요청하신 인증번호는 #{인증번호} 입니다"
                    ,"memo" : "수정함"
                    ,"mode" : "MOD"
                }
            },
            "example04" : {
                "summary": "ums템플릿 삭제예시 01",
                "description": "",
                "value": {
                    "uid" : 7
                    ,"mode" : "DEL"
                }
            },
        }
    )
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    # 등록
    if ums_template.mode == "REG" :
        res = ums_service.ums_create(request, ums_template)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "ums 등록 완료", request, {"uid" : res.uid})

    # 수정
    if ums_template.mode == "MOD" :
        res = ums_service.ums_update(request, ums_template)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "ums 수정 완료", request, {"uid" : res.uid})

    # 삭제
    if ums_template.mode == "DEL" :
        res = ums_service.ums_delete(request, ums_template.uid)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "ums 삭제 완료", request, {"uid" : res.uid})
    
# /be/admin/ums/template/filter
@router.post("/admin/ums/template/filter", dependencies=[Depends(api_same_origin)])
async def UMS템플릿_리스트_필터조건(
    request: Request
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    result = {}
    result.update({"skeyword_type": [
        {"key": 'subject', "text": '제목'},
        {"key": 'template_code', "text": '템플릿 코드'}, 
    ]})

    # 분류
    result.update({"ums_type": [
        {"key": 'email', "text": '이메일', "checked": True},
        {"key": 'at', "text": '알림톡', "checked": True},
        {"key": 'sms', "text": '문자', "checked": True},
    ]})

    # 프로필
    result.update({"profile": [
        {"key": 'indend', "text": '인디앤드코리아', "checked": True},
        {"key": 'eum', "text": '인천e몰', "checked": True},
        {"key": 'goolbi', "text": '굴비몰', "checked": True},
        {"key": 'dream', "text": '복지드림', "checked": True},
    ]})

    # 플랫폼
    result.update({"platform": [
        {"key": 'manager', "text": '매니저', "checked": True},
        {"key": 'admin', "text": '관리자', "checked": True},
    ]})

    return result
    
# /be/admin/ums/push/booking/filter
@router.post("/admin/ums/push/booking/filter", dependencies=[Depends(api_same_origin)])
async def 푸시발송예약_리스트_필터조건 (
    request: Request
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    result = {}
    result.update({"skeyword_type": [
        {"key": 'push_title', "text": '푸시 제목'},
        {"key": 'push_msg', "text": '푸시 내용'},
        {"key": 'create_user', "text": '등록자'},
    ]})

    # 수신대상
    result.update({"rec_type": [
        {"key": 'A', "text": '앱사용자전체', "checked": True},
        {"key": 'P', "text": '고객사', "checked": True},
        {"key": 'S', "text": '개별', "checked": True},
    ]})

    # 발송상태
    result.update({"state": [
        {"key": '100', "text": '대기', "checked": True},
        {"key": '200', "text": '발송완료', "checked": True},
        {"key": '300', "text": '발송취소', "checked": True},
    ]})

    return result

# /be/admin/ums/push/booking
@router.post("/admin/ums/push/booking/list", dependencies=[Depends(api_same_origin)])
async def 푸시발송예약_리스트(
    request: Request
    ,page_param: PPage_param
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    if not page_param.page or int(page_param.page) == 0:
        page_param.page = 1
    
    if not page_param.page_view_size or int(page_param.page_view_size) == 0 :
        page_param.page_view_size = 30

    res = ums_service.push_booking_list(request, page_param) 
    request.state.inspect = frame()
    return res

@router.post("/admin/ums/push/booking/read", dependencies=[Depends(api_same_origin)])
async def 푸시발송예약_상세(
    request: Request
    ,pRead : PRead = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "T_PUSH_BOOKING uid",
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
        return PushBooking()
    
    res = ums_service.push_booking_read(request, pRead.uid)

    if res is None :
        return ex.ReturnOK(404, "데이터를 찾을 수 없습니다.", request)
    
    # return res
    
    jsondata = dict(zip(res.keys(), res))
    jsondata.update({"booking_at_date": {
        "startDate" : str(res.booking_at)[0:10]
        ,"endDate" : str(res.booking_at)[0:10]
    }})
    jsondata.update({"booking_at_time": str(res.booking_at)[11:19]})
    return jsondata

# /be/admin/ums/push/booking/edit
@router.post("/admin/ums/push/booking/edit", dependencies=[Depends(api_same_origin)])
async def 푸시발송예약_편집(
    request: Request
    ,pushBooking: PushBooking = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "푸시발송예약 등록예시 01",
                "description": "",
                "value": {
                     "mode" : "REG"
                    ,"push_title" : "예약발송 #{복지몰명} 테스트"
                    ,"push_msg" : "예약발송 #{고객사명} 테스트"
                    ,"push_img" : ""
                    ,"rec_type" : "P"
                    ,"send_type" : "20230519130000"
                    ,"partners" : ["143", "129", "140", "136"]
                }
            },
        }
    )
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)
    
    # 등록
    if pushBooking.mode == "REG" :
        res = ums_service.push_booking_create(request, pushBooking)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "ums 등록 완료", request, {"uid" : res.uid})

    # 수정
    if pushBooking.mode == "MOD" :
        res = ums_service.push_booking_update(request, pushBooking)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "ums 수정 완료", request, {"uid" : res.uid})

    
# /be/admin/ums/push/rec_type/partners
@router.post("/admin/ums/push/rec_type/partners", dependencies=[Depends(api_same_origin)])
async def 푸시발송예약_수신대상_고객사(
    request: Request
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    res = ums_service.rec_type_partners(request) 
    request.state.inspect = frame()
    return res

# /be/admin/ums/push/booking/send/list
@router.post("/admin/ums/push/booking/send/list", dependencies=[Depends(api_same_origin)])
async def 발송_예정_내역 (
    request: Request
    ,page_param: PushBookingMsgListInput
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    if not page_param.page or int(page_param.page) == 0:
        page_param.page = 1
    
    if not page_param.page_view_size or int(page_param.page_view_size) == 0 :
        page_param.page_view_size = 30

    res = ums_service.push_send_list(request, page_param) 
    request.state.inspect = frame()
    return res


















# /be/admin/ums/device/filter
@router.post("/admin/ums/device/filter", dependencies=[Depends(api_same_origin)])
async def 디바이스_리스트_필터조건 (
    request: Request
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    result = {}
    result.update({"skeyword_type": [
        {"key": 'user_id', "value": '아이디'},
    ]})

    result.update({"device_os": [
        {"key": '', "value": '전체'},
        {"key": 'android', "value": '안드로이드'},
        {"key": 'ios', "value": '아이폰'},
    ]})

    result.update({"gender": [
        {"key": '', "value": '전체'},
        {"key": '남자', "value": '남자'},
        {"key": '여자', "value": '여자'},
    ]})

    # 디바이스 partner_id 구룹바이
    board_list = filter_service.device_partner(request)
    request.state.inspect = frame()
    result.update({"partner_id": board_list["list"]})

    return result

# /be/admin/ums/device/list
@router.post("/admin/ums/device/list", dependencies=[Depends(api_same_origin)])
async def 디바이스_리스트(
    request: Request
    ,page_param: PPage_param
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    if not page_param.page or int(page_param.page) == 0:
        page_param.page = 1
    
    if not page_param.page_view_size or int(page_param.page_view_size) == 0 :
        page_param.page_view_size = 30

    res = ums_service.device_list(request, page_param) 
    request.state.inspect = frame()
    return res



# /be/admin/ums/push/sender
@router.post("/admin/ums/push/sender", dependencies=[Depends(api_same_origin)])
async def PUSH_보내기_상세(
    request: Request
    ,pushDeviceList : PushDeviceList = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "T_APP_DEVICE의 uid들",
                "description": "",
                "value": {
                    "device_uids" : [1,2,3,4,5]
                }
            },
        }
    )
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    

    return PushMessage()

# /be/admin/ums/push/send
@router.post("/admin/ums/push/send", dependencies=[Depends(api_same_origin)])
async def PUSH_보내기(
    request: Request
    ,pushMessage : PushMessage
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)

    res = ums_service.device_list_by_uids(request, pushMessage.device_uids)
    request.state.inspect = frame()

    send_list = []
    for v in res :
        send = {}
        send.update({"uid": v["bars_uuid"]})
        send.update({"os": v["device_os"]})
        send.update({"title": pushMessage.title})
        send.update({"msg": pushMessage.msg})
        if pushMessage.img != "" :
            send.update({"img": pushMessage.img})
        send.update({"url": pushMessage.url})
        send.update({"is_list": pushMessage.is_list})
        send_list.append(send)

    PUSH_TOKEN = "m3zzaZ6Nf7fzngj1XKhCU88DW0JNNtU4"
    URL = "https://openapi2.byapps.co.kr/v2/"

    headers = {
        'Authorization': PUSH_TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }

    success_count = 0
    for send_obj in send_list:
        prams = {}
        prams["data"] = json.dumps(send_obj)
        resut = requests.post(URL, headers=headers, data=prams).text
        if str(resut) != "" :
            resut = json.loads(resut)
            if str(resut["result"]["result"]) == "1" :
                success_count = success_count + 1

    return ex.ReturnOK(200, "푸시 전송완료 전체 " + str(len(pushMessage.device_uids)) + "개 중 " + str(success_count) + "개 성공", request )


# @router.post("/ums/send/push", dependencies=[Depends(api_same_origin)])
# async def 복지드림_푸쉬_보내기(
#     request: Request, 
#     request_body: Dict = Body(
#         ...,
#         examples = {
#             "example01" : {
#                 "summary": "개인 푸쉬 전송 (MD2 업무폰 aos)",
#                 "description": "",
#                 "value": {
#                     "ums_uid": 1,
#                     "send_list": [
#                         {
#                             "uid": "d54576e246badccb",
#                             "os": "android",
#                             "title": "push test",
#                             "msg": "message",
#                             "url": "https://indend.welfaredream.com",
#                             "is_list": "Y"
#                         }
#                     ]
#                 }
#             },
#             "example02" : {
#                 "summary": "개인 푸쉬 전송 (권남구 ios)",
#                 "description": "",
#                 "value": {
#                     "ums_uid": 1,
#                     "send_list": [
#                         {
#                             "uid": "41923975-377E-4DCD-8986-E8EB33310CE3",
#                             "os": "ios",
#                             "title": "push test",
#                             "msg": "message",
#                             "url": "https://indend.welfaredream.com",
#                             "is_list": "Y"
#                         }
#                     ]
#                 }
#             },
#         }
#     )
# ) :
#     request.state.inspect = frame()
#     request.state.body = await util.getRequestParams(request)
    
#     PUSH_TOKEN = "m3zzaZ6Nf7fzngj1XKhCU88DW0JNNtU4"
#     URL = "https://openapi2.byapps.co.kr/v2/"

#     headers = {
#         'Authorization': PUSH_TOKEN,
#         'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
#     }

#     # msg = "\uc0ac\uc6a9\uc790\uc815\ubcf4\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4"
#     # print(msg.encode().decode())

#     for send_obj in request_body["send_list"]:
#         prams = {}
#         prams["data"] = json.dumps(send_obj)
#         send_result = requests.post(URL, headers=headers, data=prams).text
#         if str(send_result) != "" :
#             send_result = json.loads(send_result)
#             return send_result