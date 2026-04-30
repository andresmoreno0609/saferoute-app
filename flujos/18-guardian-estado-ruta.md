# Flujo 18 - GUARDIAN: Estado de Ruta

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 18 |
| nombre | GUARDIAN: Estado de Ruta |
| Actor | GUARDIAN |
| Objetivo | Ver estado en tiempo real |
| Prioridad | Alta |

## 2. API - Segun Postman

### Analytics Endpoints
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| Distance | GET | /api/v1/routes/{id}/distance |
| Estimated time | GET | /api/v1/routes/{id}/estimated-time |
| Statistics | GET | /api/v1/routes/{id}/statistics |
| Trajectory | GET | /api/v1/routes/{id}/trajectory |
| Current position | GET | /api/v1/routes/{id}/current-position |

## 3. Flujo Principal
1. Tocar "Ver Ruta" en hijo
2. GET /routes/{id}/current-position
3. Ver mapa con:
   - Posicion actual del bus
   - Paradas
   - Tiempo estimado
4. GET /routes/{id}/estimated-time

## 4. Datos en Mapa
| Elemento | Descripcion |
|----------|------------|
| Bus marker | Posicion actual |
| Stop markers | Paradas ordenadas |
| Route line | Recorrido |

## 5. Analytics Response
```json
{
  "distance": 12500,
  "estimatedTime": 45,
  "studentsOnBoard": 8,
  "stopsCompleted": 5,
  "stopsRemaining": 3
}
```

## 6. Notas UX
- Actualizacion en tiempo real (polling cada 10 seg)
- Mapa claro con posicion