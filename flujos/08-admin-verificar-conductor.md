# Flujo 08 - ADMIN: Verificar Conductor

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 08 |
| nombre | ADMIN: Verificar Conductor |
| Actor | ADMIN |
| Objetivo | Verificar conductor |
| Prioridad | Alta |

## 2. Flujo Principal
1. ADMIN toca "Conductores pendientes" en menu
2. Ver lista de conductors sin verificar (PENDING_VERIFY)
3. Tocar conductor
4. Ver documentos subidos
5. Descargar y revisar documentos
6. Aprobar o Rechazar
7. Notificar al conductor

## 3. Estados conductor en sistema
| Estado | Descripcion | origen |
|--------|-------------|--------|
| PENDING_COMPLETE | Registro nuevo | usuario creo driver profile |
| PENDING_VERIFY | Docs subidos | usuario submitio documentos |
| ACTIVE | Aprobado por admin | admin aprobo |
| REJECTED | Rechazado | admin rechazo |

## 4. Estados de Documentos
| Estado | Color | Descripcion |
|--------|-------|-------------|
| PENDING | Amarillo | Esperando revision |
| VERIFIED | Verde | Aprobado por admin |
| REJECTED | Rojo | Rechazado |

## 5. API - Endpoints

### Driver Management
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| List pending | GET | `/api/v1/drivers?is_verified=false` |
| Get driver | GET | `/api/v1/drivers/{id}` |

### Documents
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| List documents | GET | `/api/v1/drivers/{id}/documents` |
| Verify document | POST | `/api/v1/drivers/{id}/documents/{docId}/verify` |
| Reject document | POST | `/api/v1/drivers/{id}/documents/{docId}/reject` |

### Request Verify
```json
{
  "verifiedBy": "UUID_ADMIN"
}
```

### Request Reject
```json
{
  "verifiedBy": "UUID_ADMIN",
  "reason": "Documento ilegible, legible"
}
```

## 6. Documentos Requeridos
| Tipo | Descripcion |
|------|-------------|
| LICENCIA | Licencia de conducir |
| CEDULA | Identificacion |

## 7. UI - Lista Pendientes
- Card conductor:
  - Nombre
  - Fecha de registro
  - Numero documentos subidos
  - Badge "X documentos pendientes"
- Filtro: por fecha
- Bulk actions: aprobar/rechazar

## 8. UI - Detalle Conductor
- Informacion personal
- Documents list:
  - Tipo documento
  - Estado (PENDING/VERIFIED/REJECTED)
  - Descargar
- Botones: Aprobar todo | Rechazar todo

## 9. Approval Logic
```
1. ADMIN revisa cada documento
2. Si todos OK → "Aprobar"
3. Si alguno問題 → "Rechazar" con motivo
4. Sistema cambia driver.is_verified = true (si aprobar)
5. Notificar al conductor
```

## 10. Notification al conductor
```
- APROVED: "Tu cuenta ha sido verificada. Puedes iniciar rutas"
- REJECTED: "Tu verificacion fue rechazada. Razon: {reason}. Por favor corrige y reenvia"
```

## 11. Notas UX
- Ver documentos en modal o nueva pantalla
- Descarga para revisar detalle
- Historial de verificaciones