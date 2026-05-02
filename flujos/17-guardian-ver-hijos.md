# Flujo 17 - GUARDIAN: Gestionar Hijos

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 17 |
| nombre | GUARDIAN: Gestionar Hijos |
| Actor | GUARDIAN |
| Objetivo | Crear, ver, actualizar y eliminar hijos |
| Prioridad | Alta |

## 2. Navigation - Desde Dashboard (Flujo 16)

```
Dashboard Guardian
│
├── [Mis Hijos] → ChildrenListScreen (este flujo)
│   ├── Tap hijo → ChildDetailScreen
│   └── [+ Agregar] → ChildFormScreen (modo crear)
```

## 3. API - Endpoints

| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| List children | GET | `/api/v1/guardians/{guardianId}/students` |
| Get child detail | GET | `/api/v1/guardians/{guardianId}/students/{studentId}` |
| Create child | POST | `/api/v1/guardians/{guardianId}/students` |
| Update child | PUT | `/api/v1/guardians/{guardianId}/students/{studentId}` |
| Delete child | DELETE | `/api/v1/guardians/{guardianId}/students/{studentId}` |

## 4. Screens

### 4.1 ChildrenListScreen - Lista de Hijos

```
┌─────────────────────────────────────┐
│ ← Mis Hijos               [+ Agregar]│
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🚸 Maria Garcia                  │ │
│ │ 5to Primaria  🚌 En Ruta        │ │
│ │ [Ver] [Editar]                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🚸 Santiago                     │ │
│ │ 3ro Primaria  🏠 En Casa      │ │
│ │ [Ver] [Editar]                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ────────────────────────────────────│
│ Total: 2 hijos                      │
│                                     │
│ [Mi Perfil] [Mis Hijos] [Notif]     │
└─────────────────────────────────────┘
```

**Estados del hijo:**
| Estado | Icono | Color |
|--------|------|-------|
| EN_RUTA | 🚌 | #006a61 |
| EN_COLEGIO | 🏫 | #22c55e |
| EN_CASA | 🏠 | #6b7280 |
| SIN_RUTA | ❌ | #9ca3af |

### 4.2 ChildDetailScreen - Detalle del Hijo

```
┌─────────────────────────────────────┐
│ ← Detalle                [Editar] 🗑️│
├─────────────────────────────────────┤
│                                     │
│         📷 Foto                     │
│       Maria Garcia                 │
│       5to Primaria              │
│                                     │
│ ───────────────────────────────────│
│                                     │
│ 📍 DIRECCIÓN DE CASA              │
│ Calle 123, Bogotá                │
│                                     │
│ 🏫 COLEGIO                       │
│ Colegio San José                 │
│                                     │
│ 👤 CONTACTO DE EMERGENCIA         │
│ Juan García (+57 300 123 4567)   │
│                                     │
│ ⚕️ INFO MÉDICA                   │
│ Alergia a frutos secos          │
│                                     │
│ ───────────────────────────────────│
│ 📱 RASTREO                     │
│ Última actualización: 7:30am   │
│ ████████░░░░ 80% completado   │
│                                     │
│ ───────────────────────────────────│
│ [Mi Perfil] [Mis Hijos] [Notif]     │
└─────────────────────────────────────┘
```

### 4.3 ChildFormScreen - Crear/Editar

```
┌─────────────────────────────────────┐
│ ← Nuevo Hijo / Editar Hijo    [Guardar]│
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ INFORMACIÓN PERSONAL            │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Nombre *                          │
│ [________________________________] │
│                                     │
│ Fecha de Nacimiento              │
│ [________________________________] │
│                                     │
│ Grado/Curso *                    │
│ [________________________________] │
│                                     │
│ ───────────────────────────────────│
│ ┌─────────────────────────────────┐ │
│ │ DIRECCIÓN DE CASA               │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Dirección *                     │
│ [________________________________] │
│                                     │
│ 📍 Ubicación (mapa)             │
│ [Seleccionar en mapa]            │
│                                     │
│ ───────────────────────────────────│
│ ┌─────────────────────────────────┐ │
│ │ INFORMACIÓN DEL COLEGIO         │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Nombre del Colegio                │
│ [________________________________] │
│                                     │
│ 📍 Ubicación (mapa)             │
│ [Seleccionar en mapa]            │
│                                     │
│ ───────────────────────────────────│
│ ┌─────────────────────────────────┐ │
│ │ CONTACTO DE EMERGENCIA         │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Nombre *                        │
│ [________________________________] │
│                                     │
│ Teléfono *                     │
│ [________________________________] │
│                                     │
│ Observaciones médicas           │
│ [________________________________] │
│                                     │
│ ───────────────────────────────────│
│ ┌─────────────────────────────────┐ │
│ │ RELACIÓN CON EL ESTUDIANTE      │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Parentesco *                    │
│ [PADRE ▼]                      │
│                                     │
│ ☑ Es contacto de emergencia      │
│ ☑ Notificar eventos           │
└─────────────────────────────────────┘
```

## 5. Request - Create/Update

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

## 6. Response

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

## 7. Relationship Types

| Valor | Descripcion |
|-------|-------------|
| PADRE | Padre |
| MADRE | Madre |
| HERMANO | Hermano/a |
| TIO | Tio/a |
| ABUELO | Abuelo/a |
| OTRO | Otro familiar |

## 8. Validaciones

- El guardian solo puede modificar sus propios hijos
- No se puede eliminar si el hijo está en una ruta activa
- La dirección y coordenadas de casa son obligatorias
- Nombre, teléfono y parentesco son obligatorios

## 9. Manejo de Errores

| Error | Mensaje usuario |
|-------|-----------------|
| 400 | Datos inválidos. Verificá los campos |
| 401 | Sesión expirada. Iniciá sesión |
| 403 | No tenés permiso |
| 404 | Estudiante no encontrado |
| 409 | No se puede eliminar. Está en ruta activa |
| 500 | Error del servidor. Intentá más tarde |

## 10. Notas UX
- Pull-to-refresh en lista
- Loading states durante llamadas API
- Confirmación antes de eliminar
- Campos obligatorios marcados con *
- Selector de parentesco dropdown
- Mapa para ubicación (opcional)