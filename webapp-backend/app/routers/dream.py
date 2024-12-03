from fastapi import APIRouter, Depends, HTTPException, status, Response, Request, Body
from inspect import currentframe as frame
import requests
import json
import urllib
from fastapi.encoders import jsonable_encoder

from app.core import exceptions as ex
# from app.deps.auth import get_current_active_user
from app.core import util
from app.core.config import PROXY_PREFIX, api_same_origin
from app.models.dream import *
from app.schemas.dream import *
from app.service import dream_service
from app.routers.ums import UMS보내기

router = APIRouter (
    prefix = PROXY_PREFIX,
    tags=["dream"],
)

# send doc create
# be/dream/send_intro_doc
@router.post("/dream/send_intro_doc", dependencies=[Depends(api_same_origin)])
async def 복지드림_서비스_소개서_받기(
    request:Request
    ,send_doc: SendDoc = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "복지드림 서비스 소개서 받기",
                "description": "",
                "value": {
                     "to_email" : "dev@indend.co.kr"
                    ,"doc_type" : "WELFARE"
                    ,"company" : "인디앤드코리아"
                    ,"staff" : "차봄"
                    ,"mobile" : "010-1234-1234"
                }
            },
        }
    )
):
    # result = await UMS보내기(request, {
    #     "ums_uid": 4,
    #     "send_list": [
    #         {
    #             "ums_type": "email",
    #             "msgId": util.getNow("%Y%m%d%H%M%S"),
    #             "toEmail": send_doc.to_email,
    #         }
    #     ]
    # })

    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)

    URL = "http://0.0.0.0:5000/ums/send"
    headers = {
        'Content-Type': 'application/json; charset=utf-8'
        ,'x-user-ip': request.state.user_ip
    }
    request_body = {
        "ums_uid": 9,
        "send_list": [
            {
                "ums_type": "email",
                "msgId": util.getNow("%Y%m%d%H%M%S"),
                "toEmail": send_doc.to_email
            }
        ]
    }
    params = json.dumps(jsonable_encoder(request_body))
    try : 
        result = requests.post(URL, headers=headers, data=params, timeout=1).text
        response = json.loads(result)
        if str(response[0]["result"]) == "OK" :# db에 insert해줌
            send_doc.client_ip = request.state.user_ip
            send_doc.result = str(result)
            res = dream_service.create(request, send_doc)
            request.state.inspect = frame()
            return ex.ReturnOK(200, "입력해주신 이메일주소로 소개서가 발생되었습니다. 감사합니다", request, {"uid" : res.UID})
        else :
            return ex.ReturnOK(500, "죄송합니다. 전송도중 오류가 발생하였습니다. 이메일 주소를 다시 한번 확인해 주시고 문제 지속시 관리자에게 문의바랍니다.", request, {"uid" : res.UID})

    except Exception as e:
        return ex.ReturnOK(501, "죄송합니다. 전송도중 오류가 발생하였습니다. 이메일 주소를 다시 한번 확인해 주시고 문제 지속시 관리자에게 문의바랍니다.", request, {"uid" : res.UID})

    # result = json.loads(result)

    # if result[0]["result"] == "OK" :
    #     return { "result_code" : 200, "result_msg" : "전송이 완료 되었습니다. 감사합니다." }
    # else :
    #     return { "result_code" : 500, "result_msg" : "죄송합니다. 전송도중 오류가 발생하였습니다. 이메일 주소를 다시 한번 확인해 주시고 문제 지속시 관리자에게 문의바랍니다." }

# 복지드림 inbound 고객사 정보 insert/update
# api/dream/partner/edit
@router.post("/dream/partner/edit", dependencies=[Depends(api_same_origin)])
async def 복지드림_고객사_편집 (
    request: Request, 
    request_body: Dict = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "고객사 등록 샘플",
                "description": "",
                "value": {
                     "partner_type" : "300"
                    ,"partner_id" : "test"
                    ,"mall_name" : "복지몰명"
                    ,"company_name" : "고객사회사명"
                    ,"sponsor" : "welfaredream"
                    ,"partner_code" : "GX12345"
                    ,"prefix" : "GX12345_"
                    ,"logo" : "https://"
                    ,"state" : "100"
                    ,"is_welfare" : "T"
                    ,"is_dream" : "T"
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
        "/usr/src/app/data/webapp-backend/partner/"
        ,file_name
        ,logm
    )

    if "partner_id" in request_body and request_body["partner_id"] != "" :
        res = dream_service.partner_edit(request, request_body)
        return ex.ReturnOK(200, "", request, {"result" : res})
    else :
        return ex.ReturnOK(404, "필수파라메터 오류", request)

# /be/dream/counsel/edit
@router.post("/dream/counsel/edit", dependencies=[Depends(api_same_origin)])
async def 복지드림_구축신청_편집(
     request:Request
    ,dreamCounsel: DreamCounsel = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "구축문의 등록 예시 1",
                "description": "",
                "value": {
                     "mode" : "REG"
                    ,"company_name" : "(주)어쩌구"
                    ,"homepage_url" : "https://adfasdf"
                    ,"staff_count" : 659
                    ,"staff" : "김가나"
                    ,"staff_position" : "직책"
                    ,"staff_phone" : "010-1234-1234"
                    ,"staff_email" : "asdf@ddd.co.kr"
                    ,"contents" : "테스트 상담 문의"
                }
            },
            "example03" : {
                "summary": "게시물 Board의 uid",
                "description": "",
                "value": {
                    "uid" : 2076
                    ,"mode" : "DEL"
                }
            },
        }
    )
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)

    # 등록
    if dreamCounsel.mode == "REG" :
        res = dream_service.counsel_create(request, dreamCounsel)
        request.state.inspect = frame()
        return ex.ReturnOK(200, "구축신청 등록 완료", request, {"uid" : res.uid})

    # 수정
    # if posts.mode == "MOD" :
    #     res = board_service.posts_update(request, posts)
    #     request.state.inspect = frame()
    #     return ex.ReturnOK(200, "게시물 수정 완료", request, {"uid" : res.uid})

    # 삭제
    # if posts.mode == "DEL" :
    #     res = board_service.posts_delete(request, posts.uid)
    #     request.state.inspect = frame()
    #     return ex.ReturnOK(200, "게시물 삭제 완료", request, {"uid" : res.uid})

@router.post("/dream/build/init", dependencies=[Depends(api_same_origin)])
async def 복지드림_구축신청_약관업종_받기(
    request:Request
    ,PRead: PRead = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "uid",
                "description": "",
                "value": {
                    "uid" : 0
                }
            },
        }
    )
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)

    URL = "http://192.168.0.81:8888/api/dream/getBuild.asp"
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }
    
    # params = urllib.parse.urlencode(jsonable_encoder(giftSchema))
    result = ""
    params = urllib.parse.urlencode(jsonable_encoder(PRead))
    result = requests.post(URL, headers=headers, data=params).text

    result = json.loads(result)
    return result

@router.post("/dream/build/check", dependencies=[Depends(api_same_origin)])
async def 복지드림_구축신청_아이디_중복확인(
    request:Request
    ,chkAdminIdSchema: ChkAdminIdSchema = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "구축신청 아이디 중복체크",
                "description": "",
                "value": {
                     "adminid_input_value" : "aaasssddd"
                    ,"adminid_check_value" : ""
                    ,"is_adminid_checked" : "false"
                }
            }
        }
    )
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)

    URL = "http://192.168.0.81:8888/api/dream/chkAdminId.asp"

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }
    
    result = ""
    params = urllib.parse.urlencode(jsonable_encoder(chkAdminIdSchema))
    result = requests.post(URL, headers=headers, data=params).text
    
    try :
        result = json.loads(result)
        # DreamBuild()
    except Exception as e:
        return ex.ReturnOK(500, "예기치 못한 오류가 발생하였습니다.\n문제 지속시 고객센터(032-719-3366)로 문의 바랍니다.\n평일 10:00~18:00(점심 11:30~12:30)\n주말/공휴일 휴무", request)

    return result

@router.post("/dream/build/edit", dependencies=[Depends(api_same_origin)])
async def 복지드림_구축신청_생성(
    request:Request
    ,dreamBuild: DreamBuild = Body(
        ...,
        examples = {
            "example01" : {
                "summary": "구축신청",
                "description": "",
                "value": {
                     "W_ComName" : "회사명"
                    ,"W_CeoName" : "김가나"
                    ,"W_ComPhone" : "010-1234-5678"
                    ,"W_ComSerial" : "000-00-00000"
                    ,"W_ComKind" : "300"
                    ,"W_ComItem" : "A"
                    ,"W_ComPOST" : "12345" 
                    ,"W_ComAdress" : "인천 연수구 갯벌로 3"
                    ,"W_ComAdressDetail" : "adfddd"
                    ,"W_StaffName" : "담당자명"
                    ,"W_StaffDept" : "경리부"
                    ,"W_StaffPhone" : "010-1234-7891"
                    ,"W_StaffEmail" : "a@dd.com"
                    ,"W_ComWelfareName" : "복지몰명"
                    ,"W_AdminId" : "zxczxczxc"
                    ,"W_File_ComSerial" : ""
                    ,"W_File_ComLogo" : ""
                    ,"W_File_ComBankPaper" : ""
                    ,"W_StaffAccountEmail" : "hhh@ddd.com"
                    ,"W_TermsWelfare" : "T"
                    ,"is_adminid_checked" : "true"
                    ,"adminid_check_value" : "zxczxczxc"
                    ,"adminid_input_value" : "zxczxczxc"
                }
            }
        }
    )
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)

    URL = "http://192.168.0.81:8888/api/dream/setBuild.asp"

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }
    
    result = ""
    params = urllib.parse.urlencode(jsonable_encoder(dreamBuild))
    result = requests.post(URL, headers=headers, data=params).text

    print("----") 
    print(result) 
    print("----") 

    try :
        result = json.loads(result)
    except Exception as e:
        return ex.ReturnOK(500, "예기치 못한 오류가 발생하였습니다.\n문제 지속시 고객센터(032-719-3366)로 문의 바랍니다.\n평일 10:00~18:00(점심 11:30~12:30)\n주말/공휴일 휴무", request)

    return result