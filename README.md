# HomeClub API - Sistema de Gestión de Apartamentos

## Descripción
HomeClub API es un sistema backend desarrollado con NestJS que gestiona la reserva y administración de apartamentos. El sistema maneja diferentes tipos de apartamentos (Corporativos y Turísticos), reservas, pagos y usuarios.

## Características Principales

### 1. Gestión de Apartamentos
- Registro de apartamentos con información detallada (nombre, dirección, tipo, ubicación)
- Soporte para dos tipos de apartamentos: Corporativos y Turísticos
- Sistema de geolocalización (latitud/longitud)
- Gestión de estados (activo/inactivo)

### 2. Sistema de Tarifas
- Tarifas corporativas (tarifas mensuales)
- Tarifas turísticas (tarifas diarias)
- Asignación de tarifas específicas por tipo de apartamento

### 3. Gestión de Reservas
- Sistema de reservas con códigos únicos
- Validación de disponibilidad de fechas
- Asignación de tarifas según el tipo de apartamento
- Estados de reserva (Activo/Cancelado)

### 4. Sistema de Pagos
- Registro de transacciones con montos y fechas

### 5. Gestión de Clientes
- Registro de clientes con información personal
- Sistema de correo electrónico único

### 6. Autenticación y Usuarios
- Sistema de autenticación JWT
- Gestión de usuarios con diferentes estados
- Protección de rutas

## Arquitectura Técnica

### Tecnologías Principales
- NestJS como framework principal
- Prisma como ORM
- MySQL como base de datos
- Fastify como servidor web

### Estructura de Base de Datos
- Múltiples bases de datos (DB1, DB2, DB3) para separación de responsabilidades
- DB1: Datos principales (apartamentos, reservas, pagos)
- DB2: Información adicional de propiedades
- DB3: Gestión de usuarios y autenticación

### Características Técnicas
- API RESTful con prefijo `/api/v1`
- CORS configurado
- Logging con Morgan
- Validación de datos con class-validator
- Manejo de errores centralizado

## Endpoints Principales

### Apartamentos
- Creación de apartamentos
- Búsqueda de apartamentos cercanos
- Gestión de información de propiedades

### Reservas
- Creación de reservas

### Pagos
- Registro de pagos

### Clientes
- Registro de clientes
- Gestión de información personal

## Seguridad
- Autenticación JWT
- Protección de rutas
- Validación de datos
- Manejo de errores
- CORS configurado

## Características Adicionales
- Búsqueda de apartamentos por proximidad
- Sistema de tarifas dinámico
- Validación de fechas y disponibilidad
- Generación de códigos únicos para reservas
- Gestión de estados de apartamentos y reservas

## Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/andresfc96/homeclub_api.git
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
```bash
# Crear archivo .env con las siguientes variables
DATABASE_URL_DB1=mysql://user:password@localhost:3306/db1
DATABASE_URL_DB2=mysql://user:password@localhost:3306/db2
DATABASE_URL_DB3=mysql://user:password@localhost:3306/db3
JWT_SECRET=your-secret-key
JWT_EXPIRATION_TIME=1h
PORT=3000
```

4. Ejecutar migraciones de Prisma
```bash
npx prisma migrate dev
```

5. Iniciar la aplicación
```bash
npm run start:dev
```

## Características de la Prueba Técnica
Esta aplicación demuestra un buen manejo de:
- Arquitectura modular
- Separación de responsabilidades
- Validación de datos
- Manejo de errores
- Relaciones entre entidades
- Tipos de datos y enums
- Autenticación y autorización
- Documentación de API