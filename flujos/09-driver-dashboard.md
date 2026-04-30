# Flujo 09 - DRIVER: Dashboard

## 1. Overview

| Campo | Valor |
|-------|-------|
| **ID** | 09 |
| **Nombre** | DRIVER: Dashboard |
| **Actor** | DRIVER |
| **Objetivo** | Ver overview personal |
| **Prioridad** | Alta |

## 2. API - Segun Postman

| Endpoint | Metodo | Descripcion |
|----------|-------|-------------|
| /api/v1/drivers/{id}/availability | GET | Disponibilidad |
| /api/v1/routes?driverId={id} | GET | Rutas del conductor |
| /api/v1/events/driver/{id} | GET | Eventos del conductor |
| /api/v1/notifications/guardian/{id}/unread | GET | Notificaciones |

## 3. Dashboard DRIVER

1. DRIVER hace login
2. GET /drivers/{id}/availability
3. Ver:
   - Ruta activa (si tiene)
   - Proximo inicio de ruta
   - Ultimos eventos registrados
   - Notificaciones

## 4. Estados

| Estado | Descripcion |
|--------|-------------|
| Sin ruta | Sin ruta asignada |
| Disponible | Ruta lista para iniciar |
| Ruta activa | En curso |

## 5. Availability Response

```json
{
  "isAvailable": true,
  "currentRouteId": null,
  "nextRouteId": "uuid",
  "nextRouteDate": "2026-04-15T07:00:00Z"
}
```

## 6. Notas UX
- Resaltar boton "Iniciar Ruta" si hay ruta disponible
- Tiempo restante para proxima ruta
- Numero de notificaciones sin leer