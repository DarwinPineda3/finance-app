💰 Sistema de Gestión Financiera – Prueba Técnica Fullstack

Aplicación para la gestión de ingresos y egresos, administración de usuarios y generación de reportes financieros.
Desarrollada como parte de una prueba técnica para Desarrollador Fullstack, cumpliendo todos los requisitos funcionales, técnicos y de seguridad solicitados.

🚀 Tecnologías Utilizadas
Frontend
Next.js (Pages Router)
TypeScript
Tailwind CSS
Shadcn/UI

Backend
Next.js API Routes
Prisma ORM

Autenticación y Seguridad
Better Auth con GitHub OAuth
Sesiones persistidas en base de datos
RBAC (Role-Based Access Control)

Base de Datos
PostgreSQL (Supabase)

Documentación y Pruebas
Swagger / OpenAPI → /api/docs
Jest
React Testing Library

Despliegue
Vercel

👥 Roles y Permisos (RBAC)

La aplicación implementa control de acceso basado en roles a nivel de backend.
Roles disponibles
USER
Acceso a la gestión de movimientos (ingresos y egresos).
ADMIN

Acceso completo:
Gestión de movimientos
Gestión de usuarios
Reportes financieros

⚠️ Nota importante (requisito de la prueba):
Todos los nuevos usuarios registrados son automáticamente asignados con el rol ADMIN, lo cual se implementa directamente en el esquema de Prisma.

🏠 Home / Navegación
La página principal permite navegar a las siguientes secciones:
Gestión de Ingresos y Egresos (todos los usuarios autenticados)
Gestión de Usuarios (solo administradores)
Reportes (solo administradores)

💸 Sistema de Gestión de Ingresos y Egresos
📄 Vista de Movimientos
Tabla que muestra:
Concepto
Monto
Fecha
Usuario

➕ Nuevo Movimiento (solo ADMIN)
Formulario con los campos:
Concepto
Monto
Fecha
Los movimientos pueden ser ingresos o egresos y quedan asociados al usuario que los crea.

👤 Gestión de Usuarios (solo ADMIN)
📋 Vista de Usuarios
Tabla con:
Nombre
Correo
Teléfono
Rol

Acciones (editar)
✏️ Edición de Usuario
Formulario para:
Cambiar nombre
Cambiar rol

📊 Reportes (solo ADMIN)
Gráfico de movimientos financieros
Saldo actual calculado
Descarga del reporte en formato CSV

🔐 Seguridad
Backend protegido contra accesos no autenticados
Control de acceso por roles en API Routes
Helpers reutilizables:
requireAuth
requireAdmin
El frontend no controla la seguridad, solo consume un backend protegido

📘 Documentación de la API
La API está completamente documentada usando OpenAPI / Swagger.

📍 Ruta: /api/docs
Cada endpoint incluye:
Método HTTP
Parámetros
Respuestas
Códigos de estado
Ejemplos

🧪 Pruebas Unitarias
Se incluyen al menos 3 pruebas unitarias para validar:
Lógica crítica del sistema
Componentes clave del frontend
Comportamiento esperado de funciones principales

Ejecutar pruebas:
npm test

🛠️ Instalación y Configuración Local
Requisitos
Node.js v18+
Cuenta de GitHub (OAuth)
Base de datos PostgreSQL (Supabase recomendada)

Pasos
git clone <https://github.com/DarwinPineda3/finance-app.git>
cd finance-app
npm install

Crear archivo .env:

DATABASE_URL=
BETTER_AUTH_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
NEXT_PUBLIC_APP_URL=http://localhost:3000

Sincronizar la base de datos:
npx prisma db push

Ejecutar el proyecto:
npm run dev

☁️ Despliegue en Vercel
Conectar el repositorio a Vercel
Configurar las variables de entorno
Deploy automático

🔗 URL del proyecto desplegado:

(URL de Vercel PENDIENTE)

📦 Entregables
Repositorio GitHub con el código fuente

Proyecto desplegado en Vercel
Archivo README con instrucciones claras
Variables de entorno compartidas según lo solicitado

👨‍💻 Autor

Darwin Pineda
Desarrollador Frontend / Fullstack
Prueba técnica – Sistema de Gestión Financiera

🧠 Comentario final

Este proyecto fue desarrollado priorizando:
Seguridad backend
Buenas prácticas
Código mantenible
Claridad en la arquitectura
Cumplimiento estricto del enunciado