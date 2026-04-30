# Flujo 11 - DRIVER: Tracking GPS

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 11 |
| Nombre | DRIVER: Tracking GPS |
| Actor | DRIVER (automatico) |
| Objetivo | Enviar ubicacion |
| Prioridad | Alta |

## 2. API - Segun Postman

### GPS Endpoints
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| Send position | POST | /api/v1/gps/position |
| Positions by route | GET | /api/v1/gps/route/{routeId} |
| Current position | GET | /api/v1/gps/route/{routeId}/current |

## 3. Flujo Principal (Automatico)
1. Ruta activa
2. App envia GPS cada intervalo (10-30 segundos)
3. POST /gps/position
4. Backend guarda posicion
5. Continuar hasta finalizar ruta

## 4. Request Send Position
```json
{
  "routeId": "UUID_RUTA",
  "driverId": "UUID_CONDUCTOR",
  "latitude": 4.7120,
  "longitude": -74.0730
}
```

*Nota: driverId es requerido*

## 5. Response (Current Position)
```json
{
  "latitude": 4.7120,
  "longitude": -74.0730,
  "speed": 35.5,
  "heading": 180.0,
  "timestamp": "2026-04-14T06:45:00Z"
}
```

## 6. Manejo de Errores
| Error | Accion |
|--------|----------|
| Sin GPS | Advertir usuario |
| Sin permiso | Solicitar permiso |
| Sin red | Guardar y reintentar |

## 7. Notas UX
- Indicador visual de tracking activo
- Notificar si pierde senal