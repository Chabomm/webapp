import json
from typing import Optional
from fastapi import Depends, HTTPException, status, Request, Response
from fastapi.responses import RedirectResponse, JSONResponse
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from inspect import currentframe as frame

from app.core import exceptions as ex
from app.core import util
from app.core.database import engine
from app.models.model import User
from app.models.member import *
from app.service import auth_service
from app.schemas.auth import TokenDataAdmin
from app.schemas.auth import *
from app.models.session import *

# to get a string like this run:
# openssl rand -hex 32
# ACCESS_TOKEN_EXPIRE_MINUTES = 43200 # ACCESS_TOKEN 만료 (분)
# REFRESH_TOKEN_EXPIRE_MINUTES = 43200 # REFRESH_TOKEN 만료 (분)
ACCESS_TOKEN_EXPIRE_MINUTES = 30 # ACCESS_TOKEN 만료 (분)
REFRESH_TOKEN_EXPIRE_MINUTES = 43200 # REFRESH_TOKEN 만료 (분)
SECRET_KEY = "0000000000000000000000000000000000000000000000000000000000000000"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def authenticate_user(username: str, password: str):

    print(username, password)

    with Session(engine) as session:
        results = session.query(User).filter(User.username == username)
        user = results.first()

        if not user:
            return False
        # if not verify_password(password, user.password):
        #     return False
        return user

def signin(request: Request, signin_request: SignInRequest) :
    request.state.inspect = frame()
    db = request.state.db 

    results = db.query(T_MEMBER).filter(signin_request.user_id == T_MEMBER.user_id)
    user = results.first()

    if not user:
        return None
    
    if signin_request.user_pw is not None :
        if not verify_password(signin_request.user_pw, user.user_pw):
            return None
    else :
        if signin_request.sub != user.user_pw :
            return None

    return user

def signin_azure(request: Request, signin_request: SignInRequest) :
    request.state.inspect = frame()
    db = request.state.db 

    results = db.query(T_MEMBER).filter(signin_request.user_id == T_MEMBER.user_id)
    user = results.first()

    if not user:
        return None
    
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(request: Request, response: Response, access_token: str = Depends(oauth2_scheme)):
    request.state.inspect = frame()
    credentials_exception = HTTPException (
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    is_expried_error = False

    try:
        print("access_token", access_token)
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        print("payload", payload)
        if payload.get("user_uid") is None or payload.get("user_id") is None:
            raise credentials_exception

    except jwt.ExpiredSignatureError:  # access_token의 만료가 지나면
        print("access_token 만료", access_token)
        is_expried_error = True

    if is_expried_error :
        # T_SESSION 테이블에서 access와 매칭되는 refresh token 가져오기
        res = auth_service.read_session(request, None, access_token)
        request.state.inspect = frame()
        
        print("-=-=-=-=-= read T_SESSION ", util.toJson(res))
        print("")
        
        if res is None or res.refresh_token is None :
            raise credentials_exception

        payload = jwt.decode(res.refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        print("-=-=-=-=-= payload by refresh_token", payload)
        print("")

        token_data = TokenDataAdmin (
            token_name = "WEBAPP-ADMIN"
            ,site_id = payload["site_id"]
            ,user_uid = payload["user_uid"]
            ,user_id = payload["user_id"]
            ,user_name = payload["user_name"]
            ,depart = payload["depart"]
            ,role = payload["role"]
            ,roles = payload["roles"]
        )

        access_token = create_access_token(data=util.toJson(token_data), expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
        refresh_token = create_access_token(data=util.toJson(token_data), expires_delta=timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES))
        session_param = T_SESSION (
            site_id = token_data.site_id
            ,user_uid = token_data.user_uid
            ,user_id = token_data.user_id
            ,access_token = access_token
            ,refresh_token = refresh_token
            ,ip = util.getClientIP()
        )

        token_data.access_token = access_token
        request.state.user = token_data

        res = auth_service.create_session(request, session_param)
        request.state.inspect = frame()

        print("-=-=-=-=-= recreate access_token", access_token)
        print("")
                
        # except Exception as e:
        #     print("deps auth Exception----------", str(e))
        #     raise credentials_exception

    if payload is None :
        raise credentials_exception

    payload["access_token"] = access_token

    response.set_cookie (
         key=payload["token_name"]
        ,value=access_token
    )

    return payload
        
    # results = session.query(User).filter(User.username == token_data.username)
    # user = results.first()
    # if user is None:
    #     raise credentials_exception
    # return user

def get_current_active_user(current_user: User = Depends(get_current_user)):
    return current_user