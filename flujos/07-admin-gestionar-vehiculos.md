# Flujo 07 - ADMIN: Gestionar Vehiculos

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 07 |
| Nombre | ADMIN: Gestionar Vehiculos |
| Actor | ADMIN |
| Objetivo | Gestionar vehiculos y documentos |
| Prioridad | Alta |

## 2. Pantallas
- Lista vehiculos: `src/screens/admin/VehiclesScreen.tsx`
- Detalle vehiculo: `src/screens/admin/VehicleDetailScreen.tsx`
- Formulario vehiculo: `src/screens/admin/VehicleFormScreen.tsx`

## 3. Flujo Principal
1. ADMIN toca "Vehiculos"
2. Ver lista de vehiculos
3. Tocar para ver detalle
4. Gestionar documentos

## 4. Gestion de Documentos
| Documento | Tipo |
|-----------|------|
| SOAP | fecha vencimiento |
| SEGURO | fecha vencimiento |
| TECNOMECANICA | fecha vencimiento |
| TARJETA_PROPIEDAD | fecha vencimiento |

## 5. Estados Documentos
| Estado | Color |
|--------|-------|
| VIGENTE | Verde |
| POR_VENCER (< 30 dias) | Amarillo |
| VENCIDO | Rojo |

## 6. Formulario - Vehiculo
- Placa (required)
- Marca
- Modelo
- Ano
- Color
- Capacidad

## 7. API - Segun Postman
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| List | GET | /api/v1/vehicles |
| Get | GET | /api/v1/vehicles/{id} |
| Create | POST | /api/v1/vehicles |
| Update | PUT | /api/v1/vehicles/{id} |
| Delete | DELETE | /api/v1/vehicles/{id} |
| List documents | GET | /api/v1/vehicles/{id}/documents |
| Add document | POST | /api/v1/vehicles/{id}/documents |
| Update document | PUT | /api/v1/vehicles/{id}/documents/{docId} |
| Verify document | POST | /api/v1/vehicles/{id}/documents/{docId}/verify |
| Reject document | POST | /api/v1/vehicles/{id}/documents/{docId}/reject |
| Delete document | DELETE | /api/v1/vehicles/{id}/documents/{docId} |

### Request Create Vehicle
```json
{
  "plate": "ABC123",
  "model": "Toyota Hiace",
  "brand": "Toyota",
  "color": "Blanco",
  "capacity": 15
}
```

### Request Add Document
```json
{
  "documentType": "SOAP",
  "fileUrl": "https://...",
  "startDate": "2026-01-01",
  "endDate": "2027-01-01"
}
```

### Request Verify/Reject Document
```json
{
  "verifiedBy": "UUID_DEL_ADMIN",
  "reason": "motivo (solo reject)"
}
```

## 8. Notas UX
- Indicador visual de estado documentos
- Notificar 30 dias antes de vencer