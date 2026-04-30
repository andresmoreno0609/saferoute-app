# Flujo 04 - ADMIN: Dashboard

## 1. Overview

| Campo | Valor |
|-------|-------|
| **ID** | 04 |
| **Nombre** | ADMIN: Dashboard |
| **Actor** | ADMIN |
| **Objetivo** | Ver overview del sistema |
| **Prioridad** | Alta |

## 2. Pantallas

| Pantalla | Componente |
|---------|------------|
| Dashboard ADMIN | `src/screens/admin/DashboardScreen.tsx` |

## 3. Flujo Principal

```
1. ADMIN hace login
2. Redireccionar a Dashboard ADMIN
3. Cargar datos del dashboard
4. Mostrar loading mientras carga
5. Mostrar metricas y acciones
```

## 4. Componentes UI

### 4.1 Header
- Titulo: "SafeRoute - Admin"
- Badge con notificaciones

### 4.2 Metricas (Cards)
- Total usuarios activos (numero grande)
- Rutas en curso
- Conductores verificados vs pendientes
- Vehiculos con documentos vigentes

### 4.3 Alertas/Vencimientos
- Documentos por vencer (amarillo)
- Documentos vencidos (rojo)
- Conductores pendientes de verificacion

### 4.4 Acciones Rapidas
- Crear usuario
- Crear ruta
- Agregar vehiculo
- Verificar conductor

## 5. datos a Mostrar

| Metrica | Fuente API |
|--------|----------|
| Total usuarios | GET /api/v1/users/count |
| Rutas activas | GET /api/v1/routes?status=IN_PROGRESS |
| Conductores pendientes | GET /api/v1/drivers?verified=false |
| Documentos por vencer | GET /api/v1/vehicles/documents/expiring |

## 6. Navigation

| Desde | Hacia | Accion |
|-------|------|-------|
| Dashboard | Gestionar Usuarios | Menu |
| Dashboard | Gestionar Rutas | Menu |
| Dashboard | Gestionar Vehiculos | Menu |
| Dashboard | Verificar Conductores | Menu |

## 7. Notas UX

- Cards con numeros grandes
- Iconos por seccion
- pull-to-refresh
- Loading skeleton
- Alertas destacadas con color