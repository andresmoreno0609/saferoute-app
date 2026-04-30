# Flujo 08 - ADMIN: Verificar Conductor

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 08 |
| Nombre | ADMIN: Verificar Conductor |
| Actor | ADMIN |
| Objetivo | Verificar conductor |
| Prioridad | Alta |

## 2. API - Segun Postman

### Driver Endpoints
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| List drivers | GET | /api/v1/drivers |
| Get driver | GET | /api/v1/drivers/{id} |
| Create driver | POST | /api/v1/drivers |
| Update driver | PUT | /api/v1/drivers/{id} |
| Delete driver | DELETE | /api/v1/drivers/{id} |
| Availability | GET | /api/v1/drivers/{id}/availability |
| From user | POST | /api/v1/drivers/from-user/{userId} |

### Driver Documents
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| List documents | GET | /api/v1/drivers/{id}/documents |
| Add document | POST | /api/v1/drivers/{id}/documents |
| Verify document | POST | /api/v1/drivers/{id}/documents/{docId}/verify |
| Reject document | POST | /api/v1/drivers/{id}/documents/{docId}/reject |

## 3. Documentos Conductor
| Campo | Descripcion |
|----------|------------|
| name | Nombre |
| phone | Telefono |
| documentNumber | Numero de identificacion |
| birthDate | Fecha de nacimiento |
| address | Direccion |
| licenseNumber | Numero de licencia |
| licenseCategory | Categoria (A, B, C, etc) |
| licenseExpirationDate | Vencimiento licencia |
| emergencyContact | Contacto emergencia |
| emergencyPhone | Telefono emergencia |
| yearsExperience | Anos de experiencia |
| photoUrl | URL foto |
| bankName | Banco (NEQUI, BANCOLOMBIA, etc) |
| bankAccount | Cuenta banco |
| vehicleId | Vehiculo asignado |
| userId | Usuario asociado |

## 4. Acciones
| Accion | Resultado |
|--------|----------|
| Aprobar | Conductor puede iniciar rutas |
| Rechazar | Notificar motivo al conductor |

## 5. Request Create Driver
```json
{
  "name": "Juan Perez",
  "phone": "+573001234567",
  "documentNumber": "1234567890",
  "birthDate": "1990-05-15",
  "address": "Calle 123, Bogota",
  "licenseNumber": "12345678",
  "licenseCategory": "B",
  "licenseExpirationDate": "2028-05-15",
  "emergencyContact": "Maria Perez",
  "emergencyPhone": "+573001234568",
  "yearsExperience": 5,
  "photoUrl": "https://...",
  "bankName": "NEQUI",
  "bankAccount": "3101234567",
  "vehicleId": "UUID_VEHICULO",
  "userId": "UUID_USUARIO"
}
```

## 6. Notas UX
- Badge con cantidad pendiente
- Campo para motivo de rechazo