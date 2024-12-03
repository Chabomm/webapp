from fastapi import APIRouter, Depends, HTTPException, status, Response, Request, Body, Header
from inspect import currentframe as frame
import requests
import json
import re
from fastapi.encoders import jsonable_encoder
import urllib

from app.core import exceptions as ex
from app.core import util
from app.core.config import *
from app.core.config import PROXY_PREFIX, api_same_origin
from app.models.ums import *
from app.schemas.ums import *
from app.service import ums_service

router = APIRouter (
    prefix = PROXY_PREFIX, # /be 
    tags=["usm"],
)

@router.post("/ums/readlist", dependencies=[Depends(api_same_origin)])
async def UMS템플릿_리스트 (
    request: Request
    ,page_param: PPage_param
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)

    if not page_param.page or int(page_param.page) == 0:
        page_param.page = 1
    
    if not page_param.page_view_size or int(page_param.page_view_size) == 0 :
        page_param.page_view_size = 30

    res = ums_service.readlist(request, page_param) 
    request.state.inspect = frame()
    return res

@router.post("/ums/send", dependencies=[Depends(api_same_origin)])
async def UMS보내기 (
    request: Request, 
    request_body:Dict = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "이메일 sample",
                "description": "",
                "value": {
                    "ums_uid": 1,
                    "send_list": [
                        {
                            "ums_type": "email",
                            "msgId": "sample_0001",
                            "toEmail": "dev@indend.co.kr",
                            "#{받는사람}": "받는이",
                            "#{보내는사람}": "인디앤드코리아",
                        }
                    ]
                }
            },
            "example02" : {
                "summary": "이메일 여러명",
                "description": "",
                "value": {
                    "ums_uid": 1,
                    "send_list": [
                        {
                            "ums_type": "email",
                            "msgId": "sample_0001",
                            "toEmail": "dev@indend.co.kr",
                            "#{받는사람}": "권남구",
                            "#{보내는사람}": "인디앤드코리아",
                        },{
                            "ums_type": "email",
                            "msgId": "sample_0002",
                            "toEmail": "uhjung@indend.co.kr",
                            "#{받는사람}": "정유하",
                            "#{보내는사람}": "인디앤드코리아",
                        },{
                            "ums_type": "email",
                            "msgId": "sample_0003",
                            "toEmail": "bcha@indend.co.kr",
                            "#{받는사람}": "차봄",
                            "#{보내는사람}": "인디앤드코리아",
                        }

                    ]
                }
            },
            "example03" : {
                "summary": "문자 sample",
                "description": "",
                "value": {
                    "ums_uid": 2,
                    "send_list": [
                        {
                            "ums_type": "sms",
                            "msgId": "sample_0001",
                            "toMobile": "01028962650",
                            "#{플랫폼}": "테스트",
                            "#{인증번호}": "123456",
                        }
                    ]
                }
            },
            "example04" : {
                "summary": "알림톡 sample",
                "description": "",
                "value": {
                    "ums_uid": 3,
                    "send_list": [
                        {
                            "ums_type": "at",
                            "msgId": "sample_0002",
                            "toMobile": "01028962650",
                            "#{발송인}": "테스트",
                            "#{상품명}": "테스트상품",
                            "#{고객센터번호}": "123-456",
                        }
                    ]
                }
            },
        }
    )
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)

    timestr = util.getNow("%Y-%m-%d")
    file_name = timestr + ".ums.log"

    logm = util.getNow() + " |:| " + util.getClientIP() + "\n"
    logm = logm + "┏────────────request.state.body─────────────┓" + "\n"
    logm = logm + json.dumps(request_body, ensure_ascii=False, indent=4) + "\n"

    # ums 템플릿 가져오기
    tmpl = ums_service.read(request, request_body["ums_uid"])
    request.state.inspect = frame()

    if tmpl is None :
        raise ex.APIExceptionCustom(401, "empty data", "UMS템플릿을 찾을 수 없습니다.")

    arr_title_val = re.compile('#{[^{}]*}').findall(tmpl["subject"])
    arr_content_val = re.compile('#{[^{}]*}').findall(tmpl["content"])

    alimtalk_list = []
    send_result = ""
    result_list = []

    for send_obj in request_body["send_list"]:
        send_obj["PROFILE_KEY"] = getATprofileKey(tmpl["profile"])
        send_obj["title"] = tmpl["subject"]
        for k in arr_title_val :
            if k in send_obj["title"]:
                v = send_obj[k]
                send_obj["title"] = send_obj["title"].replace(k, v)
            else:
                send_obj["title"] = send_obj["title"].replace(k, "")

        send_obj["content"] = tmpl["content"]
        for k in arr_content_val :
            if k in send_obj:
                v = send_obj[k]
                send_obj["content"] = send_obj["content"].replace(k,v)
            else:
                send_obj["content"] = send_obj["content"].replace(k,"")
        
        # 이메일 보내기
        if send_obj["ums_type"] == "email" or ("toEmail" in send_obj and send_obj["toEmail"] != "") :
            send_obj = ums_service.send_mail(send_obj)
            result_obj = {}
            result_obj["msgId"] = send_obj["msgId"]
            result_obj["result"] = send_obj["result"]
            result_list.append(result_obj)
            
        # sms 보내기
        elif send_obj["ums_type"] == "sms" :
            send_obj = ums_service.getSmsSendData(send_obj)
            alimtalk_list.append(send_obj)
            result_obj = {}
            result_obj["msgId"] = send_obj["msgid"]
            result_obj["result"] = ""
            result_list.append(result_obj)

        # 알림톡 발송
        elif send_obj["ums_type"] == "at" :
            send_obj["template_code"] = tmpl["template_code"]
            send_obj = ums_service.getAtSendData(send_obj)
            alimtalk_list.append(send_obj)
            result_obj = {}
            result_obj["msgId"] = send_obj["msgid"]
            result_obj["result"] = ""
            result_list.append(result_obj)
        # end if
    # end for

    if len(alimtalk_list) > 0 :
        profile_key = alimtalk_list[0]['profile_key']
        URL = "https://alimtalk-api.sweettracker.net/v2/"+profile_key+"/sendMessage"
        headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'userid': AT_USER_ID,
            'profile_key': profile_key
        }
        send_result = requests.post(URL, headers=headers, data=json.dumps(alimtalk_list)).text
        send_result = json.loads(send_result)
        
        for i in range(len(send_result)): 
            if send_result[i]["result"] == "Y" :
                result_list[i]["result"] = "OK"
            else :
                result_list[i]["result"] = send_result[i]["error"]
            # end if
        # end for
    # end if

    logm = logm + "┏───────────────────response────────────────┓" + "\n"
    logm = logm + json.dumps(result_list, ensure_ascii=False, indent=4) + "\n"

    util.file_open (
        "/usr/src/app/data/webapp-backend/ums/"
        ,file_name
        ,logm
    )
    
    # ums log db에 들어갈 데이터들 만들어줌
    log_param = T_UMS_LOG (
        ums_uid = tmpl["uid"]
        ,ums_type = tmpl["ums_type"]
        ,platform = tmpl["platform"]
        ,template_code = tmpl["template_code"]
        ,profile = tmpl["profile"]
        ,req = json.dumps(request_body, ensure_ascii=False, indent=4)
        ,res = json.dumps(result_list, ensure_ascii=False, indent=4)
    )
    ums_service.create_umslog(request, log_param)
    request.state.inspect = frame()
    
    return result_list

@router.post("/ums/send_method", dependencies=[Depends(api_same_origin)])
async def UMS함수로보내기(request: Request) :
    """
    함수호출하기 샘플 예제, 소스코드를 보기
    """
    result = await UMS보내기(request, {
        "ums_uid": 1,
        "send_list": [
            {
                "ums_type": "email",
                "msgId": "sample_0001",
                "toEmail": "dev@indend.co.kr",
                "#{받는사람}": "받는이",
                "#{보내는사람}": "인디앤드코리아",
            }
        ]
    })
    
    return result

@router.post("/ums/device", dependencies=[Depends(api_same_origin)])
async def 푸시기기등록(
    request: Request, 
    request_body: Dict = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "기기 등록 샘플",
                "description": "",
                "value": {
                     "user_id" : "ind_test"
                    ,"partner_id" : "indend"
                    ,"bars_uuid" : "d54576e246badccb"
                    ,"device_os" : "android"
                    ,"gender" : "남자"
                    ,"birth" : "1988-11-06"
                    ,"mobile" : "010-2896-2650"
                    ,"email" : "dev@indend.co.kr"
                    ,"is_sms" : "T"
                    ,"is_mailing" : "F"
                }
            },
        }
    )
) :
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    
    timestr = util.getNow("%Y-%m-%d")
    file_name = timestr + ".log"

    logm = util.getNow() + " |:| " + util.getClientIP() + "\n"
    logm = logm + "┏────────────request.state.body─────────────┓" + "\n"
    logm = logm + json.dumps(request_body, ensure_ascii=False, indent=4) + "\n"
    logm = logm + "└───────────────────────────────────────────┘" 
    util.file_open (
        "/usr/src/app/data/webapp-backend/device/"
        ,file_name
        ,logm
    )

    if "bars_uuid" in request_body and request_body["bars_uuid"] != "" :
        res = ums_service.device_update(request, request_body)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "", request, {"result" : res})
    else :
        return ex.ReturnOK(404, "필수파라메터 오류", request)
