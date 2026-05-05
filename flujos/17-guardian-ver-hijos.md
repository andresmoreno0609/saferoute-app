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

## 4. DISEÑO - BASADO EN DESIGN SYSTEM

### 4.1 Design System Reference

```
Colores:
- Primary: #006b5f
- Background: #f7f9fb
- Surface: #ffffff
- Text: #191c1e
- Text Secondary: #45464d
- Error: #ba1a1a
- Success: #16a34a

Estados de ruta:
- EN_RUTA: #006b5f (primary)
- EN_COLEGIO: #16a34a (success)
- EN_CASA: #6b7280 (gray)
- SIN_RUTA: #9ca3af (light gray)

Tamaños:
- Button height: 48px
- Input height: 48px
- Card radius: 12px
- Button radius: 8px
```

### 4.2 ChildrenListScreen - Lista de Hijos

```
┌─────────────────────────────────────┐
│ ← Mis Hijos                    [+ +] │  ← Header: 56px, #ffffff
├─────────────────────────────────────┤
│                                     │
│  ── Mis hijos (2) ──              │  ← Label, #45464d
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🚸                      🚌     │ │  ← Card: #ffffff, radius 12px
│ │ Maria Garcia                    │ │     shadow: 0 2px 8px rgba(0,0,0,0.04)
│ │ 5to Primaria                   │ │  <- Body SM, #45464d
│ │ 🟢 En Ruta (Parada 3/8)        │ │  <- Badge: #d1fae5 bg, #006b5f text
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🚸                      🏠     │ │
│ │ Santiago Garcia                 │ │
│ │ 3ro Primaria                  │ │
│ │ ⚪ En Casa                    │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ═══════════════════════════════════════│
│ [Mi Perfil]  [Mis Hijos]  [Notif]   │  ← Bottom Nav: 64px, #ffffff
└─────────────────────────────────────┘
```

**Componente: ChildCard**
| Prop | Valor |
|------|-------|
| Background | #ffffff |
| Padding | 16px |
| Radius | 12px |
| Shadow | 0 2px 8px rgba(0,0,0,0.04) |
| Margin Bottom | 12px |

**States:**
| Estado | Icono | Badge BG | Badge Text |
|--------|------|----------|-----------|
| EN_RUTA | 🚌 | #d1fae5 | #006b5f |
| EN_COLEGIO | 🏫 | #dcfce7 | #16a34a |
| EN_CASA | 🏠 | #f3f4f6 | #6b7280 |
| SIN_RUTA | ❌ | #f9fafb | #9ca3af |

### 4.3 ChildDetailScreen - Detalle del Hijo

```
┌─────────────────────────────────────┐
│ ← Detalle Maria           [✏️] [🗑️] │  ← Header actions: icon buttons 44x44
├─────────────────────────────────────┤
│                                     │
│         ┌─────────────┐              │
│         │   📷      │              │  <- Avatar: 80px, circle
│         └─────────────┘              │
│         Maria Garcia               │  <- H2, #191c1e
│         5to Primaria           │  <- Body, #45464d
│                                     │
│ ════════════════════════════════════│
│                                     │
│  📍 DIRECCIÓN DE CASA           │  <- Label, #45464d
│  Carrera 45 #12-34, Bogotá   │  <- Body, #191c1e
│                                     │
│  🏫 COLEGIO                  │
│  Colegio San José               │
│                                     │
│  👤 CONTACTO EMERGENCIA       │
│  Juan García                 │
│  +57 300 123 4567           │
│                                     │
│  ⚕️ INFO MÉDICA              │
│  Alergia a frutos secos     │
│                                     │
│ ════════════════════════════════│
│  📱 RUTAS RECIENTES           │
│  ├── 🚸 Ruta Mañana - 7:30am │
│  └── 🚸 Ruta Tarde - 1:00pm  │
│                                     │
│ [Mi Perfil]  [Mis Hijos]  [Notif] │
└─────────────────────────────────────┘
```

**Componente: InfoRow**
| Prop | Valor |
|------|-------|
| Label | Label (14px, 600), #45464d |
| Value | Body (16px, 400), #191c1e |
| Padding Vertical | 12px |
| Border Bottom | 1px #e6e8ea |

### 4.4 ChildFormScreen - Crear/Editar

```
┌─────────────────────────────────────┐
│ ← Nuevo Hijo              [Guardar]  │  <- Primary button
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ DATOS PERSONALES             │  <- Section title
│ └─────────────────────────────────┘ │
│                                     │
│ Nombre *                            │
│ ┌─────────────────────────────────┐ │
│ │ Maria Garcia                    │ │  <- Input: #f2f4f6 bg
│ └─────────────────────────────────┘ │     radius 8px, 48px height
│                                     │
│ Fecha de nacimiento                 │
│ ┌─────────────────────────────────┐ │
│ │ 2015-05-15                     │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Grado / Curso *                   │
│ ┌─────────────────────────────────┐ │
│ │ 5to Primaria               ▼  │ │  <- Dropdown
│ └──────────────���─��────────────────┘ │
│                                     │
│ ════════════════════════════════════│
│ ┌─────────────────────────────────┐ │
│ │ DIRECCIÓN DE CASA              │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Dirección *                       │
│ ┌─────────────────────────────────┐ │
│ │ Calle 123, Bogotá              │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 📍 Seleccionar en mapa             │  <- Secondary button
│                                     │
│ ════════════════════════════════════│
│ ┌─────────────────────────────────┐ │
│ │ INFORMACIÓN DEL COLEGIO        │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Nombre del colegio               │
│ ┌─────────────────────────────────┐ │
│ │ Colegio San José               │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ════════════════════════════════════│
│ ┌─────────────────────────────────┐ │
│ │ CONTACTO DE EMERGENCIA       │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Nombre *                         │
│ ┌─────────────────────────────────┐ │
│ │ Juan García                    │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Teléfono *                       │
│ ┌─────────────────────────────────┐ │
│ │ +57 300 123 4567               │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Observaciones médicas           │
│ ┌─────────────────────────────────┐ │
│ │ Alergia a frutos secos         │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ════════════════════════════════════│
│ ┌─────────────────────────────────┐ │
│ │ RELACIÓN CON EL ESTUDIANTE   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Parentesco *                    │
│ ┌─────────────────────────────────┐ │
│ │ PADRE                       ▼  │ │  <- Dropdown options:
│ ���─���───────────────────────────────┘ │     PADRE, MADRE, HERMANO,
│                                     │     TIO, ABUELO, OTRO
│ ☑ Contacto de emergencia        │  <- Checkbox
│ ☑ Notificar eventos             │
└─────────────────────────────────────┘
```

**Form Components:**
| Component | Prop | Valor |
|------------|------|-------|
| Input | Height | 48px |
| | Background | #f2f4f6 |
| | Border | none (default) |
| | Focus Border | 2px #006b5f |
| | Radius | 8px |
| | Padding | 16px |
| | Font | Body (16px) |
| | Label | Caption (12px), #45464d, uppercase |
| Section | Title | H4 (20px, 600), #191c1e |
| | Margin Bottom | 16px |
| Required | Marker | * en rojo (#ba1a1a) |
| Dropdown | Height | 48px |
| | Options max height | 200px |
| Checkbox | Size | 24x24px |
| Primary Button | Background | #006b5f |
| | Text | #ffffff |
| | Height | 48px |
| | Radius | 8px |

### 4.5 Estados de Loading

```
┌─────────────────────────────────────┐
│ ← Mis Hijos                    [+ +] │
├────────────────────────────��────────┤
│                                     │
│loading...                         │  <- ActivityIndicator
│                                     │
└─────────────────────────────────────┘
```

### 4.6 Estados de Error

```
┌─────────────────────────────────────┐
│ ← Mis Hijos                    [+ +] │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ ⚠️ Error cargando hijos        │ │  <- Alert: #fef2f2 bg, #dc2626 border-left
│ │ Intentá de nuevo              │ │
│ │ [Reintentar]                  │ │  <- Secondary button
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

## 5. Foto del Estudiante

El campo `photoUrl` permite agregar una foto del estudiante.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| photoUrl | string (opcional) | URL de la imagen del estudiante |

**Funcionalidad actual:**
- Selector de galería (expo-image-picker)
- Cámara para tomar foto directa
- Preview de la imagen antes de guardar
- La imagen se guarda como URI local temporalmente
- Se envía al backend junto con los demás datos

**Nota:** Actualmente la imagen se guarda como URI local. Cuando el backend tenga almacenamiento en la nube, se subirá la imagen y se obtendrá la URL pública.

---

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
- Campos requeridos marcados con *

## 9. Manejo de Errores

| Error Code | Mensaje Usuario | Accion |
|-----------|-----------------|-------|
| 400 | Datos inválidos. Verificá los campos | Mostrar campos con error |
| 401 | Sesión expirada. Iniciá sesión | Redirect to login |
| 403 | No tenés permiso para esta acción | Mostrar mensaje |
| 404 | Estudiante no encontrado | Mostrar mensaje |
| 409 | No se puede eliminar. Está en ruta activa | Mostrar mensaje |
| 500 | Error del servidor. Intentá más tarde | Mostrar + boton reintentar |

## 10. Navigation Logic

```
Dashboard → [Mis Hijos]
    │
    ├── Tap Card → ChildDetailScreen
    │       ├── [✏️] → ChildFormScreen (edit mode)
    │       ├── [🗑️] → Confirm Dialog → DELETE → Back
    │       └── [←] → Back to list
    │
    └── [+ +] → ChildFormScreen (create mode)
            ├── [Guardar] → POST → Success Alert → Back to list
            └── [←] → Back to list (confirm discard?)
```

## 11. Notas UX

- Pull-to-refresh en lista de hijos
- Loading Indicator durante llamadas API (ActivityIndicator)
- Confirmación con Dialog antes de eliminar (Alert)
- Campos obligatorios marcados con * en rojo
- Selector de parentesco como Dropdown
- Mapa para ubicación (opcional, future feature)
- Deep link al hijo específico via URL params