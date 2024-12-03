import uuid
from fastapi import APIRouter, Depends, HTTPException, status, Response, Request, Body
from inspect import currentframe as frame

from app.core import exceptions as ex
from app.core import util
from app.core.config import PROXY_PREFIX, api_same_origin

from fastapi.datastructures import UploadFile
from fastapi.exceptions import HTTPException
from fastapi.param_functions import File, Body, Form
from app.core.aws.s3_utils import S3_SERVICE
import datetime
import os
# from app.core import log

AWS_ACCESS_KEY_ID = "AAAAAAAAAAAAAAAAAAAA"
AWS_SECRET_ACCESS_KEY = "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"
AWS_REGION = "ap-northeast-1"

S3_Key = ""
s3_client = S3_SERVICE(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION)

router = APIRouter (
    prefix = PROXY_PREFIX+"/aws", # /be 
    tags=["aws"],
)

@router.get(path="/test")
def test (request:Request):

    # print(request.client.host)
    # print(request.url)
    # print(request.url.path)
    # print(dict(zip(request.path.keys(), request.path.values())))

    # for r in request :
    #     print(r)

    return {}

# file_option: FileOption,
# be/aws/upload
@router.post("/upload", status_code=200, description="***** AWS S3 파일업로드 *****")
async def upload(
    file_object: UploadFile = File(...),
    bucket: str = Form("indend-homepage"),
    upload_path: str = Form(...)
):

    fake_name = file_object.filename
    current_time = datetime.datetime.now()
    split_file_name = os.path.splitext(fake_name)   #split the file name into two different path (string + extention)
    file_name = str(current_time.timestamp()).replace('.','')  #for realtime application you must have genertae unique name for the file
    file_ext = split_file_name[1]  #file extention
    data = file_object.file._file  # Converting tempfile.SpooledTemporaryFile to io.BytesIO
    
    
    print("bucket", bucket)
    print("upload_path", upload_path)
    print("fake_name", fake_name)
    print("current_time", current_time)
    print("split_file_name", split_file_name)
    print("file_name", file_name)
    print("file_ext", file_ext)
    print("data", data)

    if upload_path != "" and upload_path[0:1] == "/" :
        # 첫 글자에 / 빼기
        upload_path = upload_path[1:len(upload_path)]
    
    if upload_path != "" and upload_path[len(upload_path)-1:len(upload_path)] != "/" :
        # 마지막 글자에 / 없으면 넣기
        upload_path = upload_path + "/"

    uploads3 = await s3_client.upload_fileobj (
        bucket = bucket, 
        key = upload_path + file_name + file_ext, 
        fileobject = data
    )

    if uploads3:
        s3_url = f"https://{bucket}.s3.{AWS_REGION}.amazonaws.com/{upload_path}{file_name+file_ext}"
        return {
            "result_code": 200, 
            "result_msg": "",
            "s3_url": s3_url,
            "fake_name": fake_name,
            "file_name": file_name,
            "file_ext": file_ext
        }
    else:
        return {
            "result_code": 500, 
            "result_msg": "upload fail"
        }
    
# 원격 이미지 다운로드
import urllib.request
@router.post("/download_img")
async def download_img(
    request: Request
):
    # array_img_urls = [
    #     'http://www.welfaredream.com/img/mpartner/1636089059_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1636089063_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1636089066_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1636089071_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1636089075_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1636089087_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1636089091_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1636089101_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1636089107_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1636089111_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1636089119_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1636089123_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1636089127_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1636089131_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1636089136_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1636089145_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1636089150_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1636089155_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1636089158_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1636089161_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1636089165_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1636089168_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1636089172_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1636089176_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1636089179_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654671645_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654671649_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654671832_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654671836_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654671845_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654671909_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654674002_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654674014_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654674031_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654674039_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654674042_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654674049_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654674065_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654674074_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654674079_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654674084_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654674092_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654674107_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654674169_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654674192_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654674481_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654674486_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654674489_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654674496_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654674500_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654674505_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654674981_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654674989_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654674998_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654675006_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654675093_mainB01.png'
    #     ,'http://www.welfaredream.com/img/mpartner/1654675160_mainB01.png'
    # ]

    array_img_urls = [
        'http://www.welfaredream.com/img/mwelfare/1652838998_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1652846787_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1652846795_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1652846802_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1652846805_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1652846970_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1652846975_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1652846981_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1652846988_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1652847082_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1652847089_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1652847098_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1652847161_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1652847241_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1652847249_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1652847257_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1652847262_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1652938567_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1652938570_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1652938776_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1652938783_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1652938823_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1652938862_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1652938942_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1652938968_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1652939014_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1652939019_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1653292939_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1653292946_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1653292964_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1653293315_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1653293339_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1653293355_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1653293370_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1653293409_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1653293417_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1653293469_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1653293476_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1656311075_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1656660658_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1663131613_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1663131632_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1663131663_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1663131725_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1663131752_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1663131784_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1663131811_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1663131880_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1663131971_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1663131982_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1663131989_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1663131996_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1663132003_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1663133720_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1669795335_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1669795412_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1669795417_mainB01.jpg'
        ,'http://www.welfaredream.com/img/mwelfare/1671064654_mainB01.jpg'
    ]

    for url in array_img_urls :
        split_imgs = url.split('/')
        file_name = split_imgs[len(split_imgs)-1]
        savelocation = "/usr/src/app/data/webapp-backend/" + file_name
        urllib.request.urlretrieve(url, savelocation)




    # 원격 이미지 다운로드


import urllib.request
# be/aws/upload_file
@router.post("/upload_file", status_code=200)
async def upload_file(
    request: Request,
    file_object: UploadFile = File(...),
):
    UPLOAD_DIR = "./"  # 이미지를 저장할 서버 경로
    
    content = await file_object.read()
    filename = f"{str(uuid.uuid4())}.jpg"  # uuid로 유니크한 파일명으로 변경
    with open(os.path.join(UPLOAD_DIR, filename), "wb") as fp:
        fp.write(content)  # 서버 로컬 스토리지에 이미지 저장 (쓰기)

    return {"upload_url": filename}



# [ S ] CKEditor 로 인해 새로 추가
# /be/aws/files/upload
@router.post("/files/upload", description="***** AWS S3 파일업로드 *****")
async def upload(
    file_object: UploadFile = File(...),
    bucket: str = Form("indend-homepage"),
    upload_path: str = Form(...)
):
    fake_name = file_object.filename
    current_time = datetime.datetime.now()
    split_file_name = os.path.splitext(fake_name)   #split the file name into two different path (string + extention)
    file_name = str(current_time.timestamp()).replace('.','')  #for realtime application you must have genertae unique name for the file
    file_ext = split_file_name[1]  #file extention
    data = file_object.file._file  # Converting tempfile.SpooledTemporaryFile to io.BytesIO
    
    print("bucket", bucket)
    print("upload_path", upload_path)
    print("fake_name", fake_name)
    print("current_time", current_time)
    print("split_file_name", split_file_name)
    print("file_name", file_name)
    print("file_ext", file_ext)
    print("data", data)

    if upload_path != "" and upload_path[0:1] == "/" :
        # 첫 글자에 / 빼기
        upload_path = upload_path[1:len(upload_path)]
    
    if upload_path != "" and upload_path[len(upload_path)-1:len(upload_path)] != "/" :
        # 마지막 글자에 / 없으면 넣기
        upload_path = upload_path + "/"

    uploads3 = await s3_client.upload_fileobj (
        bucket = bucket, 
        key = upload_path + file_name + file_ext, 
        fileobject = data
    )

    if uploads3:
        s3_url = f"https://{bucket}.s3.{AWS_REGION}.amazonaws.com/{upload_path}{file_name+file_ext}"
        return {
            "result_code": 200, 
            "result_msg": "",
            "s3_url": s3_url,
            "fake_name": fake_name,
            "file_name": file_name,
            "file_ext": file_ext
        }
    else:
        return {
            "result_code": 500, 
            "result_msg": "upload fail"
        }

