from typing import List, Dict, Any, Union, Optional
from datetime import date, datetime, time, timedelta

from app.schemas.schema import *
from app.schemas.log import *

# backend/app/controller/dream.py
class SendDoc(BaseModel):
    uid: int = Field(0, title="uid")
    to_email: Optional[str] = Field(None, title="이메일", max_length=255)
    client_ip: Optional[str] = Field(None, title="아이피", max_length=15)
    result: Optional[str] = Field(None, title="result", max_length=255)
    doc_type: Optional[str] = Field(None, title="doc_type", max_length=50)
    company: Optional[str] = Field(None, title="기업명", max_length=100)
    staff: Optional[str] = Field(None, title="담당자명", max_length=11)
    mobile: Optional[str] = Field(None, title="전화번호", max_length=15)
    reg_date: Optional[datetime] = Field(None, title="등록일")
    class Config:
        orm_mode = True

class SendDocOutput(SendDoc, Status):
    class Config:
        orm_mode = True

class SendDocListOutput(PPage_param, Status):
    list: List[SendDoc] = Field([], title="send doc list")
    class Config:
        orm_mode = True

class DreamCounsel(BaseModel):
    mode: Optional[str] = Field(0, title="REG/MOD/DEL")
    uid: Optional[int] = Field(0, title="uid")
    company_name: Optional[str] = Field(None, title="기업명", max_length=100)
    homepage_url: Optional[str] = Field(None, title="홈페이지url", max_length=255)
    staff_count: Optional[int] = Field(None, title="직원수")
    wish_build_at: Optional[date] = Field(None, title="구축희망일")
    staff: Optional[str] = Field(None, title="담당자명", max_length=30)
    staff_position: Optional[str] = Field(None, title="담당자 직무", max_length=20)
    staff_phone: Optional[str] = Field(None, title="담당자 핸드폰 번호", max_length=15)
    staff_email: Optional[str] = Field(None, title="담당자 이메일", max_length=100)
    contents: Optional[str] = Field(None, title="상담문의 & 요청내용")
    state: Optional[str] = Field(None, title="100:상담문의, 200:상담중, 300:도입보류, 501:도입대기, 502:도입신청완료", max_length=30)
    create_at: Optional[datetime] = Field(None, title="등록일")
    update_at: Optional[datetime] = Field(None, title="수정일")
    delete_at: Optional[datetime] = Field(None, title="삭제일")
    memo: Optional[str] = Field(None, title="상담로그")
    class Config:
        orm_mode = True

class Partner(BaseModel):
    uid: int = Field(0, title="uid")
    partner_type: Optional[str] = Field(None, title="복지몰 로그인 타입")
    partner_id: Optional[str] = Field(None, title="고객사 아이디")
    mall_name: Optional[str] = Field(None, title="고객사 복지몰명")
    company_name: Optional[str] = Field(None, title="고객사 회사명")
    sponsor: Optional[str] = Field(None, title="스폰서")
    partner_code: Optional[str] = Field(None, title="고객사 코드")
    prefix: Optional[str] = Field(None, title="아이디 프리픽스")
    logo: Optional[str] = Field(None, title="로고 이미지")
    is_welfare: Optional[str] = Field(None, title="복지포인트 사용여부")
    is_dream: Optional[str] = Field(None, title="드림포인트 사용여부")
    state: Optional[str] = Field(None, title="복지몰 상태")
    create_at: Optional[datetime] = Field(None, title="등록일")
    update_at: Optional[datetime] = Field(None, title="수정일")
    delete_at: Optional[datetime] = Field(None, title="삭제일")
    class Config:
        orm_mode = True

class DreamCounselOutput(Status) :
    uid: Optional[int] = Field(0, title="uid")
    company_name: Optional[str] = Field(None, title="기업명", max_length=100)
    homepage_url: Optional[str] = Field(None, title="홈페이지url", max_length=255)
    staff_count: Optional[int] = Field(None, title="직원수")
    wish_build_at: Optional[date] = Field(None, title="구축희망일")
    staff: Optional[str] = Field(None, title="담당자명", max_length=30)
    staff_position: Optional[str] = Field(None, title="담당자 직무", max_length=20)
    staff_phone: Optional[str] = Field(None, title="담당자 핸드폰 번호", max_length=15)
    staff_email: Optional[str] = Field(None, title="담당자 이메일", max_length=100)
    contents: Optional[str] = Field(None, title="상담문의 & 요청내용")
    state: Optional[str] = Field(None, title="100:상담문의, 200:상담중, 300:도입보류, 501:도입대기, 502:도입신청완료", max_length=30)
    create_at: Optional[datetime] = Field(None, title="등록일")
    update_at: Optional[datetime] = Field(None, title="수정일")
    delete_at: Optional[datetime] = Field(None, title="삭제일")
    memo_list: List[Memo] = Field([], title="변경할 배너 순서")
    class Config:
        orm_mode = True

class ChkAdminIdSchema(BaseModel) :
    adminid_input_value : Optional[str] = Field(None, title="체크할 값")
    adminid_check_value : Optional[str] = Field(None, title="이전에 체크한 값")
    is_adminid_checked : Optional[str] = Field(None, title="이전에 체크 했는지")

class DreamBuild(BaseModel) :
    intro_uid : Optional[int] = Field(0, title="T_DREAM_COUNSEL 의 uid")
    W_ComName : Optional[str] = Field("", title="회사명")
    W_CeoName : Optional[str] = Field("", title="대표자 이름")
    W_ComPhone : Optional[str] = Field("", title="회사 대표번호")
    W_ComSerial : Optional[str] = Field("", title="사업자등록번호")
    W_ComKind : Optional[str] = Field("", title="사업자 분류")
    W_ComItem : Optional[str] = Field("", title="업종")
    W_ComPOST : Optional[str] = Field("", title="회사 우편번호")
    W_ComAdress : Optional[str] = Field("", title="회사주소")
    W_ComAdressDetail : Optional[str] = Field("", title="상세주소")
    W_StaffName : Optional[str] = Field("", title="담당자 이름")
    W_StaffDept : Optional[str] = Field("", title="담당자 부서 및 직책")
    W_StaffPhone : Optional[str] = Field("", title="담당자 휴대전화번호")
    W_StaffEmail : Optional[str] = Field("", title="담당자 이메일주소")
    W_ComWelfareName : Optional[str] = Field("", title="복지몰명")
    W_AdminId : Optional[str] = Field("", title="복지몰 도메인")
    W_File_ComSerial : Optional[str] = Field("", title="사업자등록증")
    W_File_ComLogo : Optional[str] = Field("", title="회사 로고 파일")
    W_File_ComBankPaper : Optional[str] = Field("", title="통장사본")
    W_StaffAccountEmail : Optional[str] = Field("", title="정산 이메일")
    W_TermsWelfare : Optional[str] = Field("", title="약관동의")
    is_adminid_checked : Optional[str] = Field("", title="이전에 체크 했는지")
    adminid_check_value : Optional[str] = Field("", title="이전에 체크한 값")
    adminid_input_value : Optional[str] = Field("", title="체크할 값")