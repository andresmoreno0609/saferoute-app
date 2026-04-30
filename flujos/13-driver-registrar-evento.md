# Flujo 13 - DRIVER: Registrar Evento

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 13 |
| Nombre | DRIVER: Registrar Evento |
| Actor | DRIVER |
| Objetivo | Registrar evento de estudiante |
| Prioridad | Alta |

## 2. API - Segun Postman

### Events Endpoints
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| Create event | POST | /api/v1/events |
| Events by student | GET | /api/v1/events/student/{studentId} |
| Events by route | GET | /api/v1/events/route/{routeId} |
| Last event | GET | /api/v1/events/student/{studentId}/route/{routeId}/last |

## 3. Flujo Principal - Por NFC
1. Escanear NFC (Flujo 12)
2. Mostrar estudiante
3. Seleccionar tipo evento
4. POST /events
5. Confirmar registro
6. Notificar a guardian

## 4. Tipos de Evento
| Tipo | Descripcion |
|------|-------------|
| BOARD | Sube al bus |
| DROP | Baja en casa |

*Nota: ARRIVAL se marca automaticamente al llegar al colegio*

## 5. Request Create Event
```json
{
  "studentId": "UUID_ESTUDIANTE",
  "driverId": "UUID_CONDUCTOR",
  "routeId": "UUID_RUTA",
  "eventType": "BOARD",
  "latitude": 4.7110,
  "longitude": -74.0721
}
```

*Nota: driverId es requerido*

## 6. Observations (Novo)
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| Create observation | POST | /api/v1/observations |
| List observations | GET | /api/v1/observations |
| By student | GET | /api/v1/observations/student/{studentId} |

### Request Create Observation
```json
{
  "studentId": "UUID_ESTUDIANTE",
  "driverId": "UUID_CONDUCTOR",
  "description": "El estudiante se porto muy bien",
  "severity": "LOW"
}
```

*Severity: LOW, MEDIUM, HIGH*

## 7. Notas UX
- Feedback inmediato
- Icono por tipo de evento