# Flujo 19 - GUARDIAN: Notificaciones

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 19 |
| nombre | GUARDIAN: Notificaciones |
| Actor | GUARDIAN |
| Objetivo | Ver notificaciones |
| Prioridad | Alta |

## 2. API - Segun Postman

### Notifications Endpoints
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| Create notification | POST | /api/v1/notifications |
| By guardian | GET | /api/v1/notifications/guardian/{guardianId} |
| Unread | GET | /api/v1/notifications/guardian/{guardianId}/unread |
| Mark read | PUT | /api/v1/notifications/{id}/read |
| Mark all read | PUT | /api/v1/notifications/guardian/{guardianId}/read-all |

## 3. Flujo Principal
1. Tocar icono notificaciones
2. GET /notifications/guardian/{id}
3. Ver lista cronologica
4. Tocar para detalle

## 4. Tipos de Notificacion
| Tipo | Descripcion | Icono |
|------|-------------|-------|
| BOARD | Estudiante subio al bus | Bus |
| DROP | Llego a casa | Home |
| ARRIVAL | Llego al colegio | School |
| ADVERTENCIA | Ruta atrasada | Warning |

## 5. Request Create Notification
```json
{
  "guardianId": "UUID_ACUDIENTE",
  "title": "Estudiante subido al bus",
  "body": "Maria Garcia ha subido al autobus",
  "type": "BOARD"
}
```

## 6. Estados
| Estado | Visual |
|--------|--------|
| No leida | Negrita, background |
| Leida | Normal |

## 7. Notas UX
- No leidas destacadas con badge
- pull-to-refresh
- Eliminar al swipe