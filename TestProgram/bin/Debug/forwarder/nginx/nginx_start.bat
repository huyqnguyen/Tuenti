del /q logs\*.*
mkdir logs
taskkill /f /im nginx.exe
start /B /WAIT nginx.exe
pause
