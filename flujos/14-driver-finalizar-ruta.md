# Flujo 14 - DRIVER: Finalizar Ruta

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 14 |
| nombre | DRIVER: Finalizar Ruta |
| Actor | DRIVER |
| Objetivo | Terminar ruta activa |
| Prioridad | Alta |

## 2. Flujo Principal
1. DRIVER toca "Finalizar Ruta"
2. Sistema muestra resumen de la ruta:
   - Paradas completadas
   - Estudiantes abordados
   - Tiempo total
3. Verifica que todos estudiante descenso (stops DROPPED_OFF)
4. Si hay pendientes: Advertir
5. Confirmar finalizacion
6. POST /routes/{id}/complete
7. Cambiar estado a COMPLETED
8. Detener GPS tracking

## 3. Resumen a Mostrar
| Dato | Fuente |
|------|--------|
| Ruta nombre | GET /routes/{id} |
| Numero estudiantes | GET /stops/route/{id} |
| Events registrados | GET /events/route/{id} |
| Duracion | startTime - endTime |

## 4. Estados de Stops
| Estado | Descripcion |
|--------|-------------|
| PENDING | Por recoger |
| PICKED_UP | Estudiante abordado |
| DROPPED_OFF | Estudiante entregado |

## 5. Pendientes Check
```
Pendientes = stops.filter(status != DROPPED_OFF)
If Pendientes.length > 0:
  Mostrar warning "{n} estudiantes sin entregar"
  Opciones:
    - "Entregar todos y finish"
    - "Cancelar ruta"
```

## 6. API
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| Complete route | POST | /api/v1/routes/{id}/complete |
| Cancel route | POST | /api/v1/routes/{id}/cancel |

## 7. Response Complete
```json
{
  "id": "uuid",
  "status": "COMPLETED",
  "endTime": "2026-04-14T08:15:00Z",
  "statistics": {
    "totalStudents": 12,
    "boarded": 12,
    "droppedOff": 12,
    "duration": 75
  }
}
```

## 8. Notas UX
- Mostrar resumen antes de confirmar
- Confirmacion para evitar errores
- Advertir si hay pendientes