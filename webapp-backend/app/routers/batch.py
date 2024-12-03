from fastapi import APIRouter, Depends, HTTPException, status, Response, Request, Body, Header, BackgroundTasks
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
from app.service import batch_service
from app.schemas.ums import *
from app.routers.ums import *

# from app.models.ums import *
# from app.schemas.ums import *

router = APIRouter (
    prefix = PROXY_PREFIX, # /be 
    tags=["batch"],
)

@router.get("/batch/test", dependencies=[Depends(api_same_origin)])
async def 배치_테스트 (
     request: Request
    ,x_token: Union[List[str], None] = Header(default=None) 
) :
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)

    print("x_token", x_token)

    push_list = batch_service.push_send_list(request)
    request.state.inspect = frame()

    PUSH_TOKEN = "m3zzaZ6Nf7fzngj1XKhCU88DW0JNNtU4"
    URL = "https://openapi2.byapps.co.kr/v2/"

    headers = {
        'Authorization': PUSH_TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }

    timestr = util.getNow("%Y-%m-%d")
    file_name = "push_send." + timestr + ".log"
    logm = util.getNow() + " |:| " + util.getClientIP() + "\n"
    logm = logm + "┏────────────send results─────────────┓" + "\n"

    booking_uids = []
    success_count = 0
    for v in push_list:
        send_param = {}
        send_param.update({"uid": v.bars_uuid})
        send_param.update({"os": v.device_os})
        send_param.update({"title": v.push_title})
        send_param.update({"msg": v.push_msg})
        if v.push_img != "" :
            send_param.update({"img": v.push_img})
        if v.push_link != "" :
            send_param.update({"url": v.push_link})

        # T_PUSH_BOOKING 업데이트 용 uids
        is_due_booking_uid = False
        for b in booking_uids :
            if v.booking_uid == b :
                is_due_booking_uid = True

        if not is_due_booking_uid :
            booking_uids.append(v.booking_uid)
        
        response = ""
        try : 
            prams = {}
            prams["data"] = json.dumps(send_param)
            response = requests.post(URL, headers=headers, data=prams).text
            if str(response) != "" :
                response = json.loads(response)
                if str(response["result"]["result"]) == "1" :
                    success_count = success_count + 1
                    v.push_result = "1"
                else :
                    v.push_result = str(response["result"]["msg"])
        except Exception as e:
            v.push_result = str(e)

        push_response_json = response
        push_response_json["bars_uuid"] = v.bars_uuid
        push_response_json["msg_uid"] = v.uid
        push_response_json["user_id"] = v.user_id

        logm = logm + json.dumps(push_response_json, ensure_ascii=False, indent=4) + "\n"
    # end for

    logm = logm + "└───────────────────────────────────────────┘" 
    
    util.file_open (
        "/usr/src/app/data/webapp-backend/batch/"
        ,file_name
        ,logm
    )

    batch_service.push_send_resut(request, booking_uids, len(push_list), success_count)
    request.state.inspect = frame()





# /be/batch/ssl/expire
@router.get("/batch/ssl/expire", dependencies=[Depends(api_same_origin)])
async def SSL_도메인_만료알림 (
     request: Request
    ,x_token: Union[List[str], None] = Header(default=None) 
) :
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)

    res = batch_service.domain_list(request)
    request.state.inspect = frame()
    
    URL = "http://0.0.0.0:5000/ums/send"
    headers = {
        'Content-Type': 'application/json; charset=utf-8'
        ,'x-user-ip': request.state.user_ip
    }

    domain_list_txt = []
    domain_list_txt.append('<table class="" cellspacing="0">')
    domain_list_txt.append('    <colgroup>')
    domain_list_txt.append('        <col style="width:200px;">')
    domain_list_txt.append('        <col style="width:150px;">')
    domain_list_txt.append('        <col style="width:100px;">')
    domain_list_txt.append('    </colgroup>')
    domain_list_txt.append('    <tbody>')
    domain_list_txt.append('        <tr>')
    domain_list_txt.append('            <td style="background-color:#f1f1f1;border:1px solid #9e9e9e; text-align:center; border-collapse: collapse;">')
    domain_list_txt.append('                도메인')
    domain_list_txt.append('            </td>')
    domain_list_txt.append('            <td style="background-color:#f1f1f1;border:1px solid #9e9e9e; text-align:center; border-collapse: collapse;">')
    domain_list_txt.append('                만료일')
    domain_list_txt.append('            </td>')
    domain_list_txt.append('            <td style="background-color:#f1f1f1;border:1px solid #9e9e9e; text-align:center; border-collapse: collapse;">')
    domain_list_txt.append('                남은기한')
    domain_list_txt.append('            </td>')
    domain_list_txt.append('        </tr>')
    
    SSL만료제목 = util.getNow("%Y-%m-%d") + " 기준 SSL 도메인 만료 리스트 입니다."
    for r in res["list"] :
        if (r["diffnow"] <= 30 ) :
            SSL만료제목 = str(r["domain"]) + "의 남은 기한이 " + str(r["diffnow"]) + "일 남았습니다."

        domain_list_txt.append('        <tr>')
        domain_list_txt.append('            <td style="border:1px solid #9e9e9e; border-collapse: collapse; text-align:center; padding-left: 10px; padding-right: 10px;">')
        domain_list_txt.append(                 str(r["domain"]))
        domain_list_txt.append('            </td>')
        domain_list_txt.append('            <td style="border:1px solid #9e9e9e; border-collapse: collapse; text-align:center; padding-left: 10px; padding-right: 10px;">')
        domain_list_txt.append(                 str(r["expire"]))
        domain_list_txt.append('            </td>')
        domain_list_txt.append('            <td style="border:1px solid #9e9e9e; border-collapse: collapse; text-align:center; padding-left: 10px; padding-right: 10px;">')
        domain_list_txt.append(                 str(r["diffnow"]))
        domain_list_txt.append('            </td>')
        domain_list_txt.append('        </tr>')

    domain_list_txt.append('    </tbody>')
    domain_list_txt.append('</table>')

    request_body = {
        "ums_uid": 8,
        "send_list": [
            {
                "ums_type": "email",
                "msgId": util.getNow("%Y%m%d%H%M%S"),
                "toEmail": "dev@indend.co.kr",
                "#{SSL만료제목}": SSL만료제목,
                "#{SSL만료내용}": ''.join(domain_list_txt)
            }
        ]
    }
    params = json.dumps(jsonable_encoder(request_body))
    try : 
        result = requests.post(URL, headers=headers, data=params, timeout=1).text
        print(result)
    except Exception as e:
        result = "fail"

    return ""







def tesk_test ():
    try :
        print("tesk v")
        timestr = util.getNow()
        file_name = "background.log"
        util.file_open (
            "/usr/src/app/data/webapp-backend/batch/"
            ,file_name
            ,timestr
        )
    except Exception as e:
        print(e)
    # t.sleep(1)

@router.get("/batch/push/test", dependencies=[Depends(api_same_origin)])
async def 배치_백그라운드_테스트 (
     request: Request
    ,background_tasks: BackgroundTasks
    ,x_token: Union[List[str], None] = Header(default=None) 
) :
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    
    # test_list = [1,2,3,4,5]
    # for v in test_list:
    #     print("route v", v)
    try :
        background_tasks.add_task(tesk_test)
        background_tasks.add_task(tesk_test)
        background_tasks.add_task(tesk_test)
        background_tasks.add_task(tesk_test)
        background_tasks.add_task(tesk_test)
    except Exception as e:
        print(e)





