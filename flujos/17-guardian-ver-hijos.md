# Flujo 17 - GUARDIAN: Ver Hijos

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 17 |
| nombre | GUARDIAN: Ver Hijos |
| Actor | GUARDIAN |
| Objetivo | Ver detalle de hijos |
| Prioridad | Alta |

## 2. API - Segun Postman

### Students Endpoints
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| List students | GET | /api/v1/students |
| Get student | GET | /api/v1/students/{id} |
| Create student | POST | /api/v1/students |
| Update student | PUT | /api/v1/students/{id} |
| Delete student | DELETE | /api/v1/students/{id} |

## 3. Flujo Principal
1. Tocar hijo en dashboard
2. GET /students/{id}
3. Ver detalle:
   - Informacion personal
   - Colegio
   - Paradas asignadas
   - NFC asignado
   - Historial eventos
4. GET /events/student/{studentId}

## 4. Modelo de Datos - Estudiante
```json
{
  "name": "Maria Garcia",
  "address": "Calle 123, Bogota, Colombia",
  "homeLatitude": 4.7110,
  "homeLongitude": -74.0721,
  "schoolName": "Colegio San Jose",
  "schoolLatitude": 4.7200,
  "schoolLongitude": -74.0800,
  "grade": "1°",
  "birthDate": "2015-05-15",
  "emergencyContact": "Juan Garcia",
  "emergencyPhone": "+573001234567",
  "medicalInfo": "Alergia a frutos secos",
  "studentCode": "EST-001"
}
```

*Nota: coordenadas separadas (homeLatitude/homeLongitude, schoolLatitude/schoolLongitude)*

## 5. Notas UX
- Foto del estudiante
- Informacion de contacto del colegio