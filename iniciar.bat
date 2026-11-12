@echo off
TITLE PoC Cluster Grupo06 - Iniciador de Servidores
cls
echo ============================================================
echo   INICIANDO PRUEBA DE CONCEPTO (PoC) - FASE 0
echo ============================================================
echo.

:: 1. Instalación automática forzada de dependencias en cada nodo
echo [1/4] Verificando e instalando dependencias en Nodo 1...
cd apache1.39.1
call npm install --silent
cd ..

echo [2/4] Verificando e instalando dependencias en Nodo 2...
cd apache1.39.2
call npm install --silent
cd ..

echo [3/4] Verificando e instalando dependencias en Nodo 3...
cd apache1.39.3
call npm install --silent
cd ..

echo.
echo [4/4] Iniciando Nodos Backend y Nginx...
start "Nodo Backend 1 (Port 3001)" cmd /k "cd apache1.39.1 && npm start"
start "Nodo Backend 2 (Port 3002)" cmd /k "cd apache1.39.2 && npm start"
start "Nodo Backend 3 (Port 3003)" cmd /k "cd apache1.39.3 && npm start"

if exist nginx\nginx.exe (
    start "Nginx Reverse Proxy" cmd /k "cd nginx && nginx.exe -c conf/nginx.conf"
) else (
    echo [AVISO] Nginx.exe no encontrado en la carpeta 'nginx'.
)

echo.
echo ============================================================
echo   CLUSTER LISTO
echo   Acceda a: http://localhost o http://127.0.0.1
echo ============================================================
echo.
pause