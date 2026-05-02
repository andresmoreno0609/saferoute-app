# Flujo 09 - DRIVER: Dashboard

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 09 |
| nombre | DRIVER: Dashboard |
| Actor | DRIVER |
| Objetivo | Ver overview y estado de cuenta |
| Prioridad | Alta |

## 2. Nota: Completar Perfil

Al inicio, mostrar recordatorio si perfil incompleto.

**Si driver profile no esta creado:**
```
┌─────────────────────────────────────┐
│ ⚠️ Completa tu cuenta               │
│ Para comenzar a trabajar necesitas   │
│ cargar tus documentos.             │
│ [Completar cuenta] → Flujo 02B    │
└─────────────────────────────────────┘
```

## 3. Estados de cuenta conductor

| Estado | Descripcion | Dashboard |
|--------|-------------|----------|
| SIN_PERFIL |Registro nuevo, sin perfil | Nota "Completa tu cuenta" |
| PENDING_VERIFY | Docs subidos, verificacion | Nota "Verificacion en proceso" |
| ACTIVE | Verificado | Dashboard normal |
| REJECTED | Rechazado | Nota "Verificacion rechazada" |

## 4. Flujo Principal
1. DRIVER hace login
2. Obtener estado del driver
3. Mostrar segun estado:

### 4.1 SIN_PERFIL - Nota activo
```
┌─────────────────────────────────────┐
│ ⚠️ Completa tu cuenta               │
│ Para comenzar a trabajar necesitas   │
│ cargar tus documentos.             │
│ [Completar cuenta]               │
└─────────────────────────────────────┘
→ Navega a Flujo 02B
```

### 4.2 PENDING_VERIFY - Nota activo
```
┌─────────────────────────────────────┐
│ ⏳ Verificacion en proceso         │
│ Tu cuenta esta siendo verificada.    │
│ Tiempo estimado: 24-48 horas       │
└─────────────────────────────────────┘
```

### 4.3 ACTIVE - Dashboard normal
```
┌─────────────────────────────────────┐
│ Hola, Juan                         │
│ [Boton iniciar ruta]              │
│                                     │
│ Proxima ruta: Mañana 7:00am      │
│ Numero de estudiantes: 12          │
└─────────────────────────────────────┘
```

### 4.4 REJECTED - Nota activo
```
┌─────────────────────────────────────┐
│ ❌ Verificacion rechazada         │
│ Razon: Documentos illegibles    │
│ Por favor corrige y reenvia      │
│ [Editar documentos]            │
└─────────────────────────────────────┘
→ Navega a Flujo 02B
```

## 5. Dashboard ACTIVE Layout

```
┌─────────────────────────────────────┐
│ SafeRoute - Conductor      👤 Juan  │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Hola, Juan!                     │ │
│ │                                 │ │
│ │ [  INICIAR RUTA  ]              │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ PROXIMA RUTAS         RUTAS HOY     │
│ ┌───────────────────┐ ┌──────────┐│
│ │Ruta Norte-7am     │ │   2       ││
│ │12 estudiantes    │ │  activas  ││
│ └───────────────────┘ └──────────┘│
│                                     │
│ ───────────────────────────────────│
│ [Mi Perfil] [Mis Rutas] [Notif]     │
└─────────────────────────────────────┘
```

## 6. API - Endpoints

| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| My user | GET | /api/v1/auth/me |
| My driver | GET | /api/v1/drivers/user/{userId} |
| Update infoValidate | Se actualiza junto con el perfil |
| My routes | GET | /api/v1/routes?driverId={id} |

## 7. Navigation

| Desde | Hacia | Accion |
|-------|------|-------|
| Nota "Completa tu cuenta" | CompleteProfileScreen | Flujo 02B |
| Nota "Editar documentos" | CompleteProfileScreen | Flujo 02B |
| Boton "Iniciar ruta" | RoutesScreen | Flujo 10 |

## 8. Notas UX
- Nota prominentemente mostrada
- Colores: Amarillo (pendiente), Verde (verificado), Rojo (rechazado)
- Si ACTIVE, muestra dashboard normal