@echo off
title PrintPro Starter
echo.
echo  [1/3] Nettoyage des anciens processus...
:: إغلاق أي سيرفر قديم شغال على بورت 9001 لتفادي التعارض
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :9001 ^| findstr LISTENING') do taskkill /f /pid %%a >nul 2>&1

echo  [2/3] Demarrage du Serveur PHP (Port 9001)...
:: استخدام الأمر الذي نجح معك سابقاً
start "PHP_SERVER" cmd /c "php -S localhost:9001 -t public"

echo  [3/3] Demarrage de Vite (Assets)...
start "VITE_DEV" cmd /c "npm run dev"

echo.
echo  -----------------------------------------
echo     PATIENTEZ 5 SECONDES...
echo  -----------------------------------------
timeout /t 5 /nobreak > nul

:: فتح المتصفح
start http://localhost:9001

echo.
echo  [OK] Tout est pret ! 
echo  [!] Gardez les fenetres CMD ouvertes.
echo.
pause
