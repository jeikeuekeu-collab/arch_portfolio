@echo off
chcp 65001 > nul

cd /d "%~dp0"

echo [INFO] Git 환경 및 원격 저장소 확인...
git remote -v
echo.
echo [INFO] GitHub로 파일 전송을 시작합니다...
git add .
git commit -m "update: 코드 변경사항 업로드"
git push -u origin main

if errorlevel 1 (
    echo.
    echo [ERROR] 업로드에 실패했습니다. GitHub 연결 상태를 확인해 주세요.
) else (
    echo.
    echo [OK] GitHub 저장소로 업로드가 성공적으로 완료되었습니다!
)

pause
