# 인디앤드코리아 webapp

# ui ref
https://flowbite.com/docs/getting-started/introduction/
https://tailwindcss.com/docs/justify-content
https://headlessui.com/react/popover

# development
UP `docker-compose up --build -d`
DN `docker-compose down --rmi all`

# Production

## nginx
TT `nginx -t`
RE `sudo service nginx restart`

## network 통합
- `docker network create common`
- `docker network ls`

## 데이터베이스 compose UP
cd /home/webapp/database
docker-compose up --build -d

## 데이터베이스 compose DOWN
cd /home/webapp/database
docker-compose down --rmi all

## 백앤드 compose UP
cd /home/webapp/webapp-backend 
docker-compose up --build -d

## 백앤드 compose DOWN
cd /home/webapp/webapp-backend 
docker-compose down --rmi all

로그 `docker logs --tail 20 -f backend`

## nginx
TT `nginx -t`
RE `sudo service nginx restart`

# 어드민 콘솔 admin 
배포 `/home/webapp/webapp-admin/deploy.sh`
원격 `docker exec -it admin-blue sh`
로그 `docker logs --tail 20 -f admin-blue`

# 복지드림 홈페이지 welfaredream
배포 `/home/webapp/webapp-welfaredream/deploy.sh`
원격 `docker exec -it welfaredream-blue sh`
로그 `docker logs --tail 20 -f welfaredream-blue`

# 인디앤드 홈페이지 indendkorea
배포 `/home/webapp/webapp-indendkorea/deploy.sh`
원격 `docker exec -it indendkorea-blue sh`
로그 `docker logs --tail 20 -f indendkorea-blue`

# 도커 메모리 CPU 사용량 확인
`docker stats`

## 6. 컨테이너 강제 삭제
docker rm -f 9b6a6fb4d43b

## 도커 정리 docker clean (https://depot.dev/blog/docker-clear-cache)
docker image prune -a -f
docker container prune -f
docker builder prune -f
docker volume prune -f
docker system prune -a  -f
docker buildx prune -f
docker network prune -f
docker volume rm $(docker volume ls -f dangling=true -q)
docker network create common
docker system df

## nginx
TT `nginx -t`
RE `sudo service nginx restart`












## 컨테이너 빌드 및 시작
[prod] docker-compose up --build -d

## 컨테이너 정지 및 삭제
[dev] docker-compose -f docker-compose.dev.yml down --rmi all
[prod] docker-compose down --rmi all

## 특정 컨테이너만 빌드
[dev] docker-compose -f docker-compose.dev.yml up --build -d {compose의 빌드명}
[prod] docker-compose up --build -d {compose의 빌드명}

## 컨테이너 로그 확인 (linux server)
docker logs backend
docker logs --tail 20 -f backend
docker logs --tail 20 -f admin

## 컨테이너 원격 접속
docker exec -it backend bash
docker exec -it backend sh

## database 컨테이너 안에서 db접속
docker exec -it database /bin/bash
[bash-4.4#] mysql -uroot -pmysql_root_password
mysql -uroot -pG6H$th8%NdRL@n2
mysql> use mysql
Database changed
mysql> select user, host from user;

## 1. 실행 중인 컨테이너 삭제하기
docker kill $(docker ps -q)

## 2. 중지된 컨테이너 삭제하기
docker rm $(docker ps -a -q)

## 3. untagged image 삭제하기
docker rmi $(docker images -q -f dangling=true)

## 4. 모든 이미지 삭제하기 (컨터이너 삭제와 동일한 방식이다.)
docker rmi $(docker images -q)

## 5. 모든 매핑안된 volume 삭제 하기 - volume은 하드디스크 스페이스인데 
docker volume rm $(docker volume ls -f dangling=true -q)

## 6. 컨테이너 강제 삭제
docker rm -f 9b6a6fb4d43b
docker rm -f 0e7ecdd9a41b

## 7. 한방에 삭제 
docker rm -f $(docker ps -aq)
docker container prune

## 이미지 제거, 볼륨 제거
docker system prune -a
docker volume prune

## nginx(proxy) reload
docker-compose exec proxy nginx -s reload

# commit 안될때 main브런치에서
git pull --rebase


# 리눅스 디렉토리 삭제 directory
rm -rf node_modules