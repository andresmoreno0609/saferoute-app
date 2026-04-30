# Flujo 09 - DRIVER: Dashboard

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 09 |
| nombre | DRIVER: Dashboard |
| Actor | DRIVER |
| Objetivo | Ver overview y estado de cuenta |
| Prioridad | Alta |

## 2. Estados de cuenta conductor

| Estado | Descripcion | Dashboard |
|--------|-------------|----------|
| PENDING_COMPLETE | Registro completo, sin docs | Banner "Completa tu cuenta" |
| PENDING_VERIFY | Docs subidos, sin verificar | Banner "Verificacion en proceso" |
| ACTIVE | Verificado | Dashboard normal |
| REJECTED | Rechazado | Banner "Verificacion rechazada" |

## 3. Flujo Principal
1. DRIVER hace login
2. Obtener estado del driver (is_verified)
3. Mostrar segun estado:

### 3.1 PENDING_COMPLETE - Banner activo
```
┌─────────────────────────────────────┐
│ ⚠️ Completa tu cuenta               │
│ Para comenzar a trabajar necesitas   │
│ cargar tus documentos.             │
│ [Completar cuenta]               │
└─────────────────────────────────────┘
- Redirect a CompleteDriverProfile
```

### 3.2 PENDING_VERIFY - Banner activo
```
┌─────────────────────────────────────┐
│ ⏳ Verificacion en proceso         │
│ Tu cuenta esta siendo verificada.    │
│ Tiempo estimado: 24-48 horas       │
└─────────────────────────────────────┘
- No puede iniciar rutas
```

### 3.3 ACTIVE - Dashboard normal
```
┌─────────────────────────────────────┐
│ Hola, Juan                         │
│ [Boton iniciar ruta]              │
│                                     │
│ Proxima ruta: Mañana 7:00am      │
│ Numero de estudiantes: 12          │
└─────────────────────────────────────┘
```

### 3.4 REJECTED - Banner activo
```
┌─────────────────────────────────────┐
│ ❌ Verificacion rechazada         │
│ Razon: Documentos illegibles    │
│ Por favor corrige y reenvia      │
│ [Editar documentos]            │
└─────────────────────────────────────┘
- Redirect a CompleteDriverProfile
```

## 4. API - Endpoints

| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| My user | GET | /api/v1/auth/me |
| My driver profile | GET | /api/v1/drivers/user/{userId} |
| My routes | GET | /api/v1/routes?driverId={id} |

## 5. API - Response

### Get Driver (is_verified)
```json
{
  "id": "uuid",
  "name": "Juan Perez",
  "phone": "+573001234567",
  "isVerified": false,
  "verificationStatus": "PENDING_VERIFY"
}
```

## 6. Navigation

| Banner | Pantalla |
|--------|---------|
| Completa tu cuenta | CompleteDriverProfileScreen |
| Editar documentos | CompleteDriverProfileScreen |
| Iniciar ruta | RoutesScreen |

## 7. Notas UX
- Banner prominently mostrado
- Colores por estado:
  - Amarillo: pendiente
  - Verde: verificado
  - Rojo: rechazado
- Boton de accion claro
- Tiempo estimado de espera