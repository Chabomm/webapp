from fastapi import APIRouter, Depends, HTTPException, status, Response, Request, Body
from inspect import currentframe as frame
from fastapi.encoders import jsonable_encoder
import requests
import json
import urllib
from datetime import datetime
import datetime
import os

from app.core import exceptions as ex
from app.service import inbound_service
from app.service.admin import applink_service
from app.core import util
from app.core.config import PROXY_PREFIX, api_same_origin
from app.schemas.gift import *
from app.schemas.applink import *
from app.schemas.inbound import *
    
aesKey = os.environ['AES_KEY']
aesIv = os.environ['AES_IV']

router = APIRouter (
    prefix = PROXY_PREFIX+"/welfare", # /be 
    tags=["welfare"],
)

@router.post("/test", dependencies=[Depends(api_same_origin)])
async def test(
    request: Request
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)

    result = ""

    json_params = {
         "spotId": "7815"
        ,"checkInDate": "20230323"
        ,"checkOutDate": "20230324"
        ,"roomCnt": "1"
    }

    dict_params = dict (
         spotId = "7815"
        ,checkInDate = "20230323"
        ,checkOutDate = "20230324"
        ,roomCnt = "1"
    )

    URL = "https://"
    headers = {
         "Content-Type": "application/json"
        ,"enterId": ""
        ,"apiKey": ""
    }
    result = requests.get(URL, headers=headers, params=json_params).text
    result = json.loads(result)
    return result

# from email import message
# from email.mime import multipart
# from email.mime import nonmultipart
# from email.mime import text

# class MIMEFormdata(nonmultipart.MIMENonMultipart):
#     def __init__(self, keyname, *args, **kwargs):
#         super(MIMEFormdata, self).__init__(*args, **kwargs)
#         self.add_header(
#             "Content-Disposition", "form-data; name=\"%s\"" % keyname)

# def encode_multipart_formdata(fields):
#     m = multipart.MIMEMultipart("form-data")
#     for field, value in fields.items():
#         data = MIMEFormdata(field, "text", "plain")
#         data.set_payload(value)
#         m.attach(data)
#     return m


# A223655030603
@router.post("/gift", dependencies=[Depends(api_same_origin)])
async def getOrder(
     request: Request
    ,giftSchema:GiftSchema = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "선물하기 주문번호",
                "description": "",
                "value": {
                    "orderNo" : "A223655030603"
                }
            },
            "example02" : {
                "summary": "선물하기 주문번호 암호화",
                "description": "",
                "value": {
                    "orderNo" : "mw/56yC/bIIXvACAgfIX0g=="
                }
            },
        }
    )
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)

    giftSchema.client_ip = request.client.host

    inbound = Inbound (
         route_path = "/welfare/gift"
        ,route_name = "선물하기 상품정보"
        ,request = json.dumps(jsonable_encoder(giftSchema), ensure_ascii=False, indent=2)
        ,response = ""
        ,reg_user = giftSchema.client_ip
    )
    inbound_db_item = inbound_service.create_inbound_log(request, inbound)
    request.state.inspect = frame()

    if giftSchema.orderNo == "" or giftSchema.orderNo is None :
        inbound_db_item.response = json.dumps(ex.ReturnOK(402, "유효하지 않은 요청입니다.", request), ensure_ascii=False, indent=2)
        inbound_service.create_inbound_log_commit(request, inbound_db_item)
        return ex.ReturnOK(402, "유효하지 않은 요청입니다.", request)

    try :
        giftSchema.orderNo = util.decrypt_aes_128(giftSchema.orderNo, aesKey, aesIv)
    except Exception as e:
        print(e)

    # PROFILE = os.environ['PROFILE']
    # if PROFILE == "development" :
    #     URL = "http://192.168.0.81:8888/inbound/gift/getOrder.asp"
    # elif PROFILE == "production" :
    #     URL = "https://welfaredream.com/inbound/gift/getOrder.asp"

    URL = "https://welfaredream.com/inbound/gift/getOrder.asp"

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }

    params = urllib.parse.urlencode(jsonable_encoder(giftSchema))

    result = ""
    result = requests.post(URL, headers=headers, data=params).text

    try :
        result = json.loads(result)
    except Exception as e:
        inbound_db_item.response = result
        inbound_service.create_inbound_log_commit(request, inbound_db_item)
        return ex.ReturnOK(500, "예기치 못한 오류가 발생하였습니다.\n문제 지속시 고객센터(032-719-3366)로 문의 바랍니다.\n평일 10:00~18:00(점심 11:30~12:30)\n주말/공휴일 휴무", request)

    if(int(result["result_code"]) != 200) :
        inbound_db_item.response = json.dumps(ex.ReturnOK(400, result["result_msg"], request, result), ensure_ascii=False, indent=2)
        inbound_service.create_inbound_log_commit(request, inbound_db_item)
        return ex.ReturnOK(400, result["result_msg"], request, result)

    # if "expiryDate" in result :
    #     print("expiryDateexpiryDate", result['expiryDate'])
    #     try :
    #         str_date = datetime.datetime.strptime(result['expiryDate'], '%Y%m%d')
    #         df = '%Y년 %#m월 %#d일'
    #         kor_date = str_date.strftime(df)
    #         kor_date = str(kor_date) + " 23:59:59"
    #         result['expiryDate'] = kor_date

    #     except Exception as e:
    #         result['expiryDate'] = ""
    
    # giftOK에 보낼 토큰
    action_token = util.encrypt_aes_128(result["orderUid"]+"|:|"+giftSchema.client_ip, aesKey, aesIv)
    giftSchema.action_token = action_token
    inbound_db_item.request = json.dumps(jsonable_encoder(giftSchema), ensure_ascii=False, indent=2)

    inbound_db_item.response = json.dumps(ex.ReturnOK(200, result["result_msg"], request, result), ensure_ascii=False, indent=2)
    inbound_service.create_inbound_log_commit(request, inbound_db_item)
    
    result['action_token'] = action_token

    return ex.ReturnOK(200, result["result_msg"], request, result)

# /be/welfare/giftOk
@router.post("/giftOk", dependencies=[Depends(api_same_origin)])
async def setOrder(
    request: Request
    ,giftOk:GiftOK
):
    giftOk.client_ip = request.client.host

    inbound = Inbound (
         route_path = "/welfare/giftOk"
        ,route_name = "선물하기 " + "승인" if giftOk.mode=="accept" else "거절"
        ,request = json.dumps(jsonable_encoder(giftOk), ensure_ascii=False, indent=2)
        ,response = ""
        ,reg_user = giftOk.client_ip
    )
    inbound_db_item = inbound_service.create_inbound_log(request, inbound)
    request.state.inspect = frame()

    if giftOk.mode == "" or giftOk.mode is None :
        inbound_db_item.response = json.dumps(ex.ReturnOK(402, "유효하지 않은 요청입니다.", request), ensure_ascii=False, indent=2)
        inbound_service.create_inbound_log_commit(request, inbound_db_item)
        return ex.ReturnOK(402, "유효하지 않은 요청입니다.", request)

    result = ""
    # PROFILE = os.environ['PROFILE']
    # if PROFILE == "development" :
    #     URL = "http://192.168.0.81:8888/inbound/gift/setOrder.asp"
    # elif PROFILE == "production" :
    #     URL = "https://welfaredream.com/inbound/gift/setOrder.asp"

    URL = "https://welfaredream.com/inbound/gift/setOrder.asp"

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }

    params = urllib.parse.urlencode(jsonable_encoder(giftOk))
    result = requests.post(URL, headers=headers, data=params).text
    try :
        result = json.loads(result)
    except Exception as e:
        inbound_db_item.response = result
        inbound_service.create_inbound_log_commit(request, inbound_db_item)
        return ex.ReturnOK(500, "예기치 못한 오류가 발생하였습니다.\n문제 지속시 고객센터(032-719-3366)로 문의 바랍니다.\n평일 10:00~18:00(점심 11:30~12:30)\n주말/공휴일 휴무", request)

    
    return ex.ReturnOK(200, result["result_msg"], request, result)















    
def getAtSendData(send_obj) :
    
    msgId = ""
    if "msgId" in send_obj and send_obj['msgId'] != "" :
        msgId = send_obj['msgId'] 
    
    if "at_msgId" in send_obj and send_obj['at_msgId'] != "" :
        msgId = send_obj['at_msgId'] 

    template_code = send_obj['template_code'] 
    toMobile = send_obj['toMobile'] 
    subject = send_obj['title'] 
    content = send_obj['content'] 
    sms_kind = "L"

    oData = {}
    oData["msgid"] = msgId
    oData["profile_key"] = send_obj["PROFILE_KEY"]
    oData["message_type"] = "AT"
    oData["template_code"] = template_code
    oData["receiver_num"] = toMobile
    oData["message"] = content
    oData["reserved_time"] = "00000000000000"
    oData["sms_title"] = subject
    oData["sms_message"] = content
    oData["sms_kind"] = sms_kind
    oData["sender_num"] = "01030342581"

    return oData

def getSmsSendData(send_obj) :
    
    msgId = ""

    if "msgId" in send_obj and send_obj['msgId'] != "" :
        msgId = send_obj['msgId'] 
    
    if "at_msgId" in send_obj and send_obj['at_msgId'] != "" : 
        msgId = send_obj['at_msgId'] 

    toMobile = send_obj['toMobile'] 
    subject = send_obj['title'] 
    content = send_obj['content'] 
    sms_kind = "S"

    oData = {}
    oData["msgid"] = msgId
    oData["profile_key"] = send_obj["PROFILE_KEY"]
    oData["receiver_num"] = toMobile
    oData["reserved_time"] = "00000000000000"
    oData["sms_only"] = "Y"
    oData["sms_message"] = content
    oData["sms_title"] = subject
    oData["sms_kind"] = sms_kind
    oData["sender_num"] = "01030342581"

    return oData





# [ S ] uha추가
# /be/applink/read
@router.post("/applink/deeplink/app/read", dependencies=[Depends(api_same_origin)])
async def 딥링크앱_상세(
    request: Request
    ,deepLinkAppInput : DeepLinkAppInput = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "T_DEEP_LINK uid",
                "description": "",
                "value": {
                    "group_uid" : 2,
                    "uid" : 2
                }
            },
        }
    )
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)

    # if deepLinkAppInput.uid == 0 :
    #     return DeepLink()
    
    res = applink_service.deeplink_app_read(request, deepLinkAppInput)
    request.state.inspect = frame()
    
    return ex.ReturnOK(200, "", request, res, False)
# [ E ] uha추가