from fastapi import APIRouter, Depends, HTTPException, status, Response, Request, Body
from fastapi.responses import RedirectResponse, JSONResponse
from inspect import currentframe as frame
from Cryptodome.Cipher import AES
from urllib import parse
import requests
import base64
import msal
import os

from app.deps.auth import get_current_active_user
from app.core import exceptions as ex
from app.core import util
from app.schemas.azure import *
from app.service import auth_service
from app.routers.admin import auth
from app.schemas.auth import *

aesKey = "0000000000000000"
aesIv = "9999999999999999"

router = APIRouter (
    tags=["azure"],
)

CLIENT_ID = "00000000-0000-0000-0000-000000000000"
CLIENT_SECRET = "0000000000000000000000000000000000000000"
AUTHORITY = "https://login.microsoftonline.com/common"

API_LOCATION = os.environ['HOST']
TOKEN_ENDPOINT = "/azure/get_auth_token"
SCOPE = ["User.ReadBasic.All"]

def _load_cache():
    cache = msal.SerializableTokenCache()
    return cache

def _build_msal_app(cache=None, authority=None):
    return msal.ConfidentialClientApplication(
        CLIENT_ID, authority=authority or AUTHORITY,
        client_credential=CLIENT_SECRET, token_cache=cache)

def _build_auth_url(authority=None, scopes=None, state=None):
    return _build_msal_app(authority=authority).get_authorization_request_url(
        scopes or [],
        state=state,
        redirect_uri=API_LOCATION+TOKEN_ENDPOINT)

def _get_token_from_cache(scope=None):
    cache = _load_cache()  # This web app maintains one cache per session
    cca = _build_msal_app(cache=cache)
    accounts = cca.get_accounts()
    if accounts:  # So all account(s) belong to the current signed-in user
        result = cca.acquire_token_silent(scope, account=accounts[0])
        return result

# http://localhost:5000/azure/signin/?client_id=local&service=adm&redirect_url=http%3A%2F%2F192%2E168%2E0%2E81%3A8888%2Fadm%2F
@router.get(path="/azure/signin/", response_class=RedirectResponse)
async def signin (
     request:Request
    ,is_local: str = "F"
    ,client_id: str = "local"
    ,service: str = "adm"
    ,redirect_url: str = "http%3A%2F%2F192%2E168%2E0%2E81%3A8888%2Fadm%2F"
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    access_token = request.cookies.get("Authorization")

    if access_token is not None and access_token != "" : # 기존 토큰존재
        headers = {
            'Authorization' : '{0}'.format(access_token),
            'Content-Type': 'application/json'
        }
        response = requests.get("https://graph.microsoft.com/v1.0/me", headers=headers).json()

        print("┏────────────── 기존 토큰존재 ────────────┓")
        print(util.toJson(response))
        print("└─────────────────────────────────────────┘")

        callback_url = get_callback_url (
            request
            ,is_local
            ,client_id
            ,service
            ,redirect_url
            ,response["userPrincipalName"]
        )

        response = RedirectResponse(url=callback_url)
        
    else : # 새로 발급
        auth_url = _build_auth_url(scopes=SCOPE, state=redirect_url)
        response = RedirectResponse(url=auth_url)
        response.set_cookie(
             key="is_local"
            ,value=is_local
            ,httponly=True
            ,max_age=3600
            ,expires=3600
        )
        response.set_cookie(
             key="client_id"
            ,value=client_id
            ,httponly=True
            ,max_age=3600
            ,expires=3600
        )
        response.set_cookie(
            key="service"
            ,value=service
            ,httponly=True
            ,max_age=3600
            ,expires=3600
        )

    return response

@router.get("/azure/get_auth_token")
async def get_auth_token(request: Request, code: str = "", state: str = ""):
    
    if code == "" :
        raise HTTPException(status_code=400, detail="NO CODE GIVEN BY MICROSOFT")

    cache = _load_cache()
    cca = _build_msal_app(cache=cache)
    result = cca.acquire_token_by_authorization_code (
        code,
        scopes=SCOPE,
        redirect_uri=API_LOCATION+TOKEN_ENDPOINT
    )

    print("┏──────────── get token result ─────────────┓")
    print(util.toJson(result))
    print("└───────────────────────────────────────────┘")
    
    accounts = cca.get_accounts()
    print("┏─────────────── get_accounts ──────────────┓")
    print(util.toJson(accounts))
    print("└───────────────────────────────────────────┘")

    token = cca.acquire_token_silent(SCOPE,account=accounts[0])
    real_token = token["access_token"]
    token_to_encode = result.get("id_token_claims")
    print("┏────────────── id_token_claims ────────────┓")
    print(util.toJson(token_to_encode))
    print("└───────────────────────────────────────────┘")
    preferred_username = token_to_encode.get("preferred_username")

    callback_url = get_callback_url (
        request
        ,request.cookies.get("is_local")
        ,request.cookies.get("client_id")
        ,request.cookies.get("service")
        ,state
        ,preferred_username
    )
    response = RedirectResponse(url=callback_url)
    response.set_cookie(
        key="Authorization",
        value=f"Bearer {real_token}",
        httponly=True,
        max_age=3600,
        expires=3600,
    )
    return response

def get_callback_url (
    request:Request
    ,is_local: str = ""   
    ,client_id: str = ""
    ,service: str = ""
    ,redirect_url: str = ""
    ,user_id: str = ""
) :
    plantext = user_id

    if client_id == "webapp" :
        plantext = plantext + "|:|" + auth_service.read_pw_by_userid(request, user_id)

    print("plantext", plantext)

    encrypted_str = parse.quote(util.encrypt_aes_128(plantext, aesKey, aesIv))
    redirect_url = parse.quote(redirect_url)

    callback_url = ""
    if client_id == "local" and service == "adm" :
        callback_url = "http://192.168.0.81:8888/adm/callback.asp?sub=" + encrypted_str + "&redirect_url=" + redirect_url
    
    elif client_id == "dev" and service == "adm" :
        redirect_url = redirect_url.replace("www.", "")
        callback_url = "https://devindend.co.kr/adm/callback.asp?sub=" + encrypted_str + "&redirect_url=" + redirect_url
    
    elif client_id == "indend" and service == "adm" :
        callback_url = "https://welfaredream.com/adm/callback.asp?sub=" + encrypted_str + "&redirect_url=" + redirect_url
    
    elif is_local == "T" and client_id == "webapp" and service == "admin" :
        callback_url = "http://localhost:7020/callback?sub=" + encrypted_str + "&redirect_url=" + redirect_url

    elif is_local == "F" and client_id == "webapp" and service == "admin" :
        callback_url = "https://adm.bokjidream.com/callback?sub=" + encrypted_str + "&redirect_url=" + redirect_url

    elif is_local == "T" and client_id == "dream" and service == "admin" :
        callback_url = "http://localhost:7010/callback?sub=" + encrypted_str + "&redirect_url=" + redirect_url

    elif is_local == "F" and client_id == "dream" and service == "admin" :
        callback_url = "https://adm.dreamy.kr/callback?sub=" + encrypted_str + "&redirect_url=" + redirect_url

    elif is_local == "T" and client_id == "semall" and service == "admin" :
        callback_url = "http://localhost:7030/callback?sub=" + encrypted_str + "&redirect_url=" + redirect_url

    elif is_local == "F" and client_id == "semall" and service == "admin" :
        callback_url = "https://adm.semarket.co.kr/callback?sub=" + encrypted_str + "&redirect_url=" + redirect_url

    print("┏────────────── callback_url ────────────┓")
    print(is_local, client_id, service)
    print(callback_url)
    print("└────────────────────────────────────────┘")

    return callback_url

@router.get(path="/azure/logout", response_class=RedirectResponse)
def logout (
    request:Request
    ,client_id: str = ""
    ,service: str = ""
    ,redirect_url: str = ""
    ,user_id: str = ""
):
    if client_id == "dev" and service == "adm" :
        callback_url = "https://devindend.co.kr/adm/login.asp"
    elif client_id == "indend" and service == "adm" :
        callback_url = "https://welfaredream.com/adm/login.asp"
    else :
        callback_url = "https://welfaredream.com/adm/login.asp"

    response = RedirectResponse(url=callback_url)
    response.delete_cookie("Authorization")
    return response

# 암호화 풀기
# 그냥 여기서 sub받아다가 로그인시키면 될듯 ?
@router.post(path="/be/azure/pullgy")
async def pullgy (
     request: Request
    ,response: Response
    ,sub: Sub
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)

    # ddd = util.encrypt_aes_128("bcha@indend.co.kr|:|$2b$12$YpEQYsvPp1Rqm3TJIDJSIee9jJu61cdgkzFdyXcL8mBt.sCMlSbnW", aesKey, aesIv)
    # print(ddd) 
    # XTDhoX5/3ubMzgIUcHgv/kT9OS4HdWS4LwmCglb1zGCeQu1BwxEroD1QSvzOHV2seWBha0qm9rdbjr8AMJ2LqT8P3CkJdM1fqObllqFAp9B3HOnaeTZr/Xwgy8EhdABE
    # XTDhoX5%2F3ubMzgIUcHgv%2FkT9OS4HdWS4LwmCglb1zGCeQu1BwxEroD1QSvzOHV2seWBha0qm9rdbjr8AMJ2LqT8P3CkJdM1fqObllqFAp9B3HOnaeTZr%2FXwgy8EhdABE
    # return

    plantext = util.decrypt_aes_128(sub.sub, aesKey, aesIv)

    user_info = plantext.split("|:|")

    response = auth.login_for_access_token(
         request
        ,response
        ,SignInRequest(
             user_id=user_info[0]
            ,sub=user_info[1]
        )
    )

    return response

# 로그아웃
@router.post(path="/be/admin/logout")
async def logout (
     request: Request
    ,response: Response
    ,user: TokenDataAdmin = Depends(get_current_active_user)
):
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request)
    user, request.state.user = getTokenDataAdmin(user), getTokenDataAdmin(user)
    
    auth_service.delete_session(request, user.user_uid) # 세션 제거
    response.delete_cookie(request.state.user.token_name) # 쿠키 제거

    response = JSONResponse(
        ex.ReturnOK(200, "", request, {})
    )

    return response