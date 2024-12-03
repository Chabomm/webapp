import os
import json
from fastapi import APIRouter, Depends, HTTPException, status, Response, Request, Body
from sqlalchemy.orm import Session
from datetime import timedelta
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from inspect import currentframe as frame

from app.core import exceptions as ex
from app.core import util
from app.core.config import PROXY_PREFIX, api_same_origin
from app.deps.auth import signin, create_access_token, get_current_active_user, get_password_hash
from app.models.model import User, Role, UserToRole
from app.models.member import *
# from app.schemas.schema import *
from app.schemas.auth import *
from app.service import auth_service
from app.deps.auth import ACCESS_TOKEN_EXPIRE_MINUTES, REFRESH_TOKEN_EXPIRE_MINUTES

router = APIRouter (
    prefix = PROXY_PREFIX+"/auth", # /be/auth
    tags=["auth"],
)
        
@router.get("/users/test")
def read_users_me(request: Request):
    request.state.inspect = frame()

    res = auth_service.read_session(request, 10, None)

    session_param = T_SESSION (
         site_id = res.site_id
        ,user_uid = res.user_uid
        ,user_id = res.user_id
        ,access_token = res.access_token
        ,refresh_token = res.refresh_token
        ,ip = util.getClientIP()
    )
    res = auth_service.create_session(request, session_param)
    return res

@router.post("/sso", dependencies=[Depends(api_same_origin)])
async def login_for_sso (
    request:Request,
    response:Response,
    sso_input: SsoInput
):
    """
    - 외부채널에서 frontend로 보낸 데이터를 받아서 회원등록 or 로그인 처리
    """

    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request) # post data

    access_token = ""
    aesKey = os.environ['AES_KEY']
    aesIv = os.environ['AES_IV']

    decrypt_sso_prams = SsoInput (
         user_idx = util.decrypt_aes_128(sso_input.user_idx, aesKey, aesIv)
        ,user_id = util.decrypt_aes_128(sso_input.user_id, aesKey, aesIv)
        ,user_name = util.decrypt_aes_128(sso_input.user_name, aesKey, aesIv)
        ,user_mobile = util.decrypt_aes_128(sso_input.user_mobile, aesKey, aesIv)
        ,user_email = util.decrypt_aes_128(sso_input.user_email, aesKey, aesIv)
        ,site_id = util.decrypt_aes_128(sso_input.site_id, aesKey, aesIv)
        ,sso_url = sso_input.sso_url
        ,redirect_url = sso_input.redirect_url
    )

    print(json.dumps(util.toJson(decrypt_sso_prams), ensure_ascii=False, indent=2))
    res = auth_service.read (
         request
        ,decrypt_sso_prams.site_id
        ,decrypt_sso_prams.user_idx
        ,decrypt_sso_prams.user_id
    )
    request.state.inspect = frame()
    print(json.dumps(util.toJson(res), ensure_ascii=False, indent=2))

    ###########################################################################################################################################################################################
    if res is None :
        # 회원 등록 해야됨
        # decrypt_sso_prams.redirect_url을 "{fonrend_url}/welcome" 으로 강제 변경해야됨
        raise ex.NotFoundUser
    #########################################################################################################################################################

    token_data = TokenDataAdmin (
         site_id = res.site_id
        ,user_uid = res.uid
        ,user_id = res.user_id
        ,user_name = res.nick_name
        ,profile_img = res.profile_img
    )
    print(json.dumps(util.toJson(token_data), ensure_ascii=False, indent=2))

    access_token = create_access_token (data=util.toJson(token_data), expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    refresh_token = create_access_token (data=util.toJson(token_data), expires_delta=timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES))
    print("user.uid : ", util.toJson(token_data))
    session_param = T_SESSION (
         site_id = token_data.site_id
        ,user_uid = token_data.user_uid
        ,user_id = token_data.user_id
        ,access_token = access_token
        ,refresh_token = refresh_token
        ,ip = util.getClientIP()
    )
    print(json.dumps(util.toJson(session_param), ensure_ascii=False, indent=2))

    res = auth_service.create_session(request, session_param)
    request.state.inspect = frame()

    print(json.dumps(util.toJson(res), ensure_ascii=False, indent=2))

    encrypt_uid = util.encrypt_aes_128(str(res.uid), aesKey, aesIv)

    return {"token": encrypt_uid, "redirect_url": decrypt_sso_prams.redirect_url}

@router.post("/give_me_token", response_model=TokenOutput, dependencies=[Depends(api_same_origin)])
async def give_me_token (
    request: Request,
    response: Response,
    token: tokenInput
):
    """
    - /sso 에서 발급받은 token(T_SESSION의 uid 암호화값)으로 acess_token 발급
    """
    request.state.inspect = frame()
    request.state.body = await util.getRequestParams(request) # post data

    access_token = ""
    aesKey = os.environ['AES_KEY']
    aesIv = os.environ['AES_IV']

    session_uid = int(util.decrypt_aes_128(token.token, aesKey, aesIv))
    res = auth_service.read_session (request, session_uid, None)
    request.state.inspect = frame()
    print(json.dumps(util.toJson(res), ensure_ascii=False, indent=2))

    return {"access_token": res.access_token, "token_type": "bearer"}

@router.get("/users/me")
def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

@router.post("/token", response_model=TokenOutput)
def login_for_access_token (
    request: Request
    ,form_data: OAuth2PasswordRequestForm = Depends()
):
    """
    - **oauth2_scheme** 스키마로 로그인 return access_token
    - docs에서 authorizations로 토큰 발급하는 경우
    """
    # print("form_data : " , form_data.__dict__)
    request.state.inspect = frame()

    access_token = ""

    res = auth_service.read_by_userid(request, form_data.username)
    request.state.inspect = frame()

    if res is None :
        raise ex.NotFoundUser

    token_data = TokenDataAdmin (
         token_name = "WEBAPP-ADMIN"
        ,depart = res.depart
        ,user_uid = res.uid
        ,user_id = res.user_id
        ,user_name = res.user_name
        ,role = res.role
        ,roles = res.roles
    )

    # 관리자 꺼는 만료일 : REFRESH_TOKEN_EXPIRE_MINUTES
    access_token = create_access_token (data=util.toJson(token_data), expires_delta=timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES))

    return {"access_token": access_token, "token_type": "bearer"}

    # user = authenticate_user(form_data.username, form_data.password)
    # if not user:
    #     raise HTTPException (
    #         status_code=status.HTTP_401_UNAUTHORIZED,
    #         detail="Incorrect username or password",
    #         headers={"WWW-Authenticate": "Bearer"},
    #     )
    # access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    # access_token = create_access_token(
    #     data={"sub": user.username}, expires_delta=access_token_expires
    # )
    # return {"access_token": access_token, "token_type": "bearer"}







# @router.get("/users/me/items")
# def read_own_items(current_user: User = Depends(get_current_active_user)):
#     return [{"item_id": "Foo", "owner": current_user.username}]

# @router.post("/signup", response_model=UserRead)
# def sign_up(user: UserIn, session: Session = Depends(get_session)):

#     hashed_password = get_password_hash(user.password)

#     role = session.query(Role).filter(Role.name == "ROLE_USER").first()
#     print("role", role.__dict__)

#     user_to_role = UserToRole()
#     user_to_role.role = role
#     print("user_to_role", user_to_role.__dict__)

#     new_user = User(id=1, email=user.email, username=user.username, password=hashed_password)
#     new_user.roles.append(user_to_role)
#     session.add(new_user)
#     session.commit()
#     session.refresh(new_user)
#     return UserRead(username=new_user.username, email=new_user.email)
