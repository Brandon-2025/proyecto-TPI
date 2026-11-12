============================================================
  GUÍA DE DESPLIEGUE - PRUEBA DE CONCEPTO (PoC FASE 0)
============================================================

Estructura de la entrega (siguiendo especificación de la pizarra):
C:\PoC_Grupo01   ├── iniciar.bat        <-- Script automatizado de ejecución
   ├── nginx\             <-- Servidor Frontal Balanceador
   ├── apache1.39.1\      <-- Nodo Backend 1 (Puerto 3001)
   ├── apache1.39.2\      <-- Nodo Backend 2 (Puerto 3002)
   └── apache1.39.3\      <-- Nodo Backend 3 (Puerto 3003)

REQUISITOS PREVIOS:
1. Tener instalado Node.js (https://nodejs.org/).
2. Descargar Nginx para Windows y extraer el ejecutable nginx.exe dentro de la carpeta 'nginx'.

INSTRUCCIONES DE EJECUCIÓN:
1. Haga doble clic en el archivo 'iniciar.bat'.
2. El script instalará dependencias npm automáticamente y abrirá 4 procesos:
   - Nodo 1 escuchando en 127.0.0.1:3001
   - Nodo 2 escuchando en 127.0.0.1:3002
   - Nodo 3 escuchando en 127.0.0.1:3003
   - Nginx escuchando en el puerto 8085 (y 443 HTTPS) -> dado que la prueba se realiza en el LCOMP
3. Abra su navegador e ingrese a: http://localhost o http://127.0.0.1

VERIFICACIÓN DE REQUISITOS:
- PWA Instalable: Puede hacer clic en instalar la app desde la barra del navegador.
- Identificación de Nodo: Cada clic en "Probar Siguiente Petición" mostrará qué nodo específico atiende la petición (Nodo 1, 2 o 3).
- Sesión Compartida (Stateless JWT): Cierre o detenga la consola de uno de los nodos. Haga clic en la app y verá que cualquier otro nodo sigue atendiendo manteniendo el mismo ID de sesión.
- Cambio de Entorno por Configuración: Al modificar la variable APP_ENV en el archivo server.js o variables de entorno, la interfaz conmuta entre Intranet e Internet sin alterar el código base.
