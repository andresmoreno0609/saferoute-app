# Flujo 16 - GUARDIAN: Dashboard

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 16 |
| nombre | GUARDIAN: Dashboard |
| Actor | GUARDIAN |
| Objetivo | Ver overview de hijos |
| Prioridad | Alta |

## 2. Nota: Completar Perfil

Al inicio, mostrar recordatorio si perfil incompleto (infoValidate = false).

**Si perfil incompleto:**
```
┌─────────────────────────────────────┐
│ 💡 Completa tu perfil              │
│ Agrega info de contacto de emergencia│
│ [Completar perfil] → Flujo 02C    │
└─────────────────────────────────────┘
```

## 3. Dashboard Layout

```
┌─────────────────────────────────────┐
│ SafeRoute - Padre         👤 Pedro    │
├─────────────────────────────────────┤
│                                       │
│ Nota (solo si perfil incompleto):     │
│ ┌─────────────────────────────────┐ │
│ │ 💡 Completa tu perfil           │ │
│ └─────────────────────────────────┘ │
│                                       │
│ ────────────────────────────────────│
│                                       │
│ MIS HIJOS (tarjetas)                  │
│ ┌───────────────────────────────────┐│
│ │ 🚸 Maria Garcia   🚌 En Ruta     ││
│ │ 5to Primaria    📍Parada 3/8      ││
│ └───────────────────────────────────┘│
│ ┌───────────────────────────────────┐│
│ │ 🚸 Santiago Garcia  🏠 En Casa    ││
│ │ 3ro Secundaria  Sin ruta hoy     ││
│ └───────────────────────────────────┘│
│                                       │
│ ────────────────────────────────────│
│ NOTIFICACIONES RECIENTES              │
│ ├• Maria subio al bus - 7:30am     │
│ ├• Santiago llego al colegio - 1pm│
│ └• Ruta actualizada - 6:00am      │
│                                       │
│ ───────────────────────────────────│
│ [Mi Perfil] [Mis Hijos] [Notif]     │
└─────────────────────────────────────┘
```

## 4. Tarjeta de Hijo - Estados

| Estado | Icono | Color |
|--------|------|-------|
| EN_RUTA | 🚌 | Azul |
| EN_COLEGIO | 🏫 | Verde |
| EN_CASA | 🏠 | Gris |
| SIN_RUTA | ❌ | Gris claro |

## 5. API - Endpoints

| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| My user | GET | /api/v1/auth/me |
| My guardian | GET | /api/v1/guardians/user/{userId} |
| My children | GET | `/api/v1/student-guardians/guardian/{id}` |
| Children details | GET | /api/v1/students/{id} |
| My notifications | GET | /api/v1/notifications/guardian/{guardianId} |
| Unread notifications | GET | /api/v1/notifications/guardian/{guardianId}/unread |

**My guardian response:**
```json
{
  "id": "...",
  "userId": "...",
  "infoValidate": false,
  ...
}
```

## 6. Navigation

| Desde | Hacia | Accion |
|-------|------|-------|
| Nota "Completar perfil" | CompleteProfileScreen | Flujo 02C |
| Tap hijo | ChildDetailScreen | Ver detalle |
| Notificacion | NotificationDetail | Ver detalle |

## 7. Notas UX
- Tarjetas con color segun estado
- Banner "Completa tu perfil" si infoValidate = false
- pull-to-refresh para actualizar