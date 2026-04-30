# Flujo 16 - GUARDIAN: Dashboard

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 16 |
| nombre | GUARDIAN: Dashboard |
| Actor | GUARDIAN |
| Objetivo | Ver overview de hijos |
| Prioridad | Alta |

## 2. API - Segun Postman

### Guardians Endpoints
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| List guardians | GET | /api/v1/guardians |
| Get guardian | GET | /api/v1/guardians/{id} |
| Create guardian | POST | /api/v1/guardians |
| Update FCM token | PUT | /api/v1/guardians/{id}/fcm-token |
| From user | POST | /api/v1/guardians/from-user/{userId} |

### Student-Guardian Relations
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| List relations | GET | /api/v1/student-guardians |
| Create relation | POST | /api/v1/student-guardians |
| By student | GET | /api/v1/student-guardians/student/{studentId} |
| By guardian | GET | /api/v1/student-guardians/guardian/{guardianId} |

## 3. Modelo de Datos - Guardian
```json
{
  "name": "Pedro Garcia",
  "email": "pedro@email.com",
  "phone": "+573001234567",
  "documentNumber": "12345678",
  "birthDate": "1980-05-15",
  "address": "Calle 123 #45-67, Bogota",
  "emergencyContact": "Maria Garcia",
  "emergencyPhone": "+573009876543",
  "occupation": "Ingeniero",
  "workPhone": "+5712345678"
}
```

## 4. Notas UX
- Tarjetas por hijo
- Color por estado (en ruta, en colegio, en casa)