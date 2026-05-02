# Flujo 17 - GUARDIAN: Gestionar Hijos

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 17 |
| nombre | GUARDIAN: Gestionar Hijos |
| Actor | GUARDIAN |
| Objetivo | Crear, ver, actualizar y eliminar hijos |
| Prioridad | Alta |

## 2. API - Endpoints

| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| List children | GET | `/api/v1/guardians/{guardianId}/students` |
| Get child detail | GET | `/api/v1/guardians/{guardianId}/students/{studentId}` |
| Create child | POST | `/api/v1/guardians/{guardianId}/students` |
| Update child | PUT | `/api/v1/guardians/{guardianId}/students/{studentId}` |
| Delete child | DELETE | `/api/v1/guardians/{guardianId}/students/{studentId}` |

## 3. Request - Create/Update Child

```json
{
  "name": "Maria Garcia",
  "address": "Calle 123, Bogota, Colombia",
  "homeLatitude": 4.7110,
  "homeLongitude": -74.0721,
  "schoolName": "Colegio San Jose",
  "schoolLatitude": 4.7200,
  "schoolLongitude": -74.0800,
  "grade": "1° Primaria",
  "birthDate": "2015-05-15",
  "emergencyContact": "Juan Garcia",
  "emergencyPhone": "+573001234567",
  "medicalInfo": "Alergia a frutos secos",
  "photoUrl": "https://...",
  "studentCode": "EST-001",
  "relationship": "PADRE",
  "isEmergencyContact": true,
  "notifyEvents": true
}
```

## 4. Response

```json
{
  "id": "uuid-relacion",
  "studentId": "uuid-estudiante",
  "studentName": "Maria Garcia",
  "guardianId": "uuid-guardian",
  "guardianName": "Juan Garcia",
  "relationship": "PADRE",
  "isEmergencyContact": true,
  "notifyEvents": true,
  "createdAt": "2026-05-01T10:00:00"
}
```

## 5. Relationship Types

| Valor | Descripcion |
|-------|-------------|
| PADRE | Padre |
| MADRE | Madre |
| HERMANO | Hermano/a |
| TIO | Tio/a |
| ABUELO | Abuelo/a |
| OTRO | Otro familiar |

## 6. Validaciones

- El guardian solo puede modificar sus propios hijos
- No se puede eliminar si el hijo está en una ruta activa
- La dirección y coordenadas de casa son obligatorias

## 7. Screens

- **ChildrenListScreen**: Lista de hijos con estado de ruta
- **ChildDetailScreen**: Ver detalle del hijo
- **ChildFormScreen**: Crear/editar hijo

## 8. Notas UX
- Foto del estudiante
- Indicador de estado de ruta (EN_RUTA, EN_COLEGIO, EN_CASA, SIN_RUTA)
- Botón para agregar nuevo hijo
- Swipe para editar/eliminar