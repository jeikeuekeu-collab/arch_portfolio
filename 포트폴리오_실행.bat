@echo off
chcp 65001 > nul
echo ========================================================
echo  신구대학교 건축학과 유시윤 포트폴리오 로컬 서버 실행
echo ========================================================
echo.
echo [INFO] 브라우저 보안(CORS)으로 인해 3D 모델(GLB)은 웹 서버를 통해 열어야 정상 로드됩니다.
echo [INFO] 로컬 웹 서버 주소: http://localhost:8090/index.html
echo.
start "" http://localhost:8090/index.html
python -m http.server 8090 --directory "%~dp0"
pause
