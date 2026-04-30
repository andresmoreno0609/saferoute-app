# Flujo 10 - DRIVER: Iniciar Ruta

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 10 |
| nombre | DRIVER: Iniciar Ruta |
| Actor | DRIVER |
| Objetivo | Comenzar una ruta asignada |
| Prioridad | Alta |

## 2. API - Segun Postman

### Route Endpoints
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| List routes | GET | /api/v1/routes |
| Get route | GET | /api/v1/routes/{id} |
| Start route | POST | /api/v1/routes/{id}/start |
| Complete route | POST | /api/v1/routes/{id}/complete |
| Cancel route | POST | /api/v1/routes/{id}/cancel |

### Stops Endpoints
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| List stops | GET | /api/v1/stops |
| Create stop | POST | /api/v1/stops |
| Stops by route | GET | /api/v1/stops/route/{routeId} |
| Mark picked-up | PUT | /api/v1/stops/{id}/picked-up |
| Mark dropped-off | PUT | /api/v1/stops/{id}/dropped-off |

## 3. Flujo Principal
1. DRIVER toca "Iniciar Ruta"
2. Seleccionar ruta (si hay varias)
3. Ver resumen: paradas, estudiantes
4. Tocar "Confirmar Inicio"
5. POST /routes/{id}/start
6. Cambiar estado a IN_PROGRESS
7. Iniciar tracking GPS

## 4. Resumen de Ruta
- Nombre ruta
- Numero estudiantes
- Lista paradas
- Horario estimado

## 5. Estados Ruta
| Estado | Accion |
|--------|----------|
| PENDING | Iniciar |
| IN_PROGRESS | - |
| COMPLETED | Ver historial |
| CANCELLED | Cancelada |

## 6. Request Create Route (ADMIN)
```json
{
  "name": "Ruta Norte - Manana",
  "driverId": "UUID_CONDUCTOR",
  "scheduledDate": "2026-04-01"
}
```

## 7. Notas UX
- Confirmacion clara
- Mostrar estudiantes asignados