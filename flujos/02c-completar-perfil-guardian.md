# Flujo 02C - Completar Perfil Guardian

## 1. Overview

| Campo | Valor |
|-------|-------|
| **ID** | 02C |
| **Nombre** | Completar Perfil Guardian |
| **Actor** | GUARDIAN |
| **Objetivo** | Completar datos personales |
| **Prioridad** | Media |

## 2. Descripcion

Despues del registro, guardian puede completar su perfil
desde el Dashboard. Es opcional pero recomendado.

## 3. Cuando se usa

- Desde GUARDIAN Dashboard: Banner "Completa tu perfil"
- Opcional: puede usarlo cuando quiera

## 4. Pantallas

| Pantalla | Componente |
|---------|------------|
| Complete Guardian Profile | `src/screens/guardian/CompleteProfileScreen.tsx` |

## 5. Formulario - Datos Guardian

| Campo | Tipo | Requerido |
|------|------|----------|
| Numero documento | text | **SI** |
| Fecha nacimiento | date | **SI** |
| Direccion | text | **SI** |
| Ocupacion | text | **SI** |
| Telefono trabajo | tel | **SI** |
| Contacto emergencia | text | **SI** |
| Telefono emergencia | tel | **SI** |

## 6. API - Endpoints

| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| Create/update guardian | POST / PUT | `/api/v1/guardians` |
| Update infoValidate | Se actualiza junto con el perfil |
| Upload FCM token | PUT | `/api/v1/guardians/{id}/fcm-token` |

## 7. Request Create Guardian
```json
{
  "name": "Pedro Garcia",
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

## 8. Flujo UI

```
1. Usuario toca "Completa tu perfil" (desde Dashboard)
2. Muestra formulario
3. Usuario completa datos
4. Boton "Guardar"
5. Submit
6. Redirect a Dashboard
```

## 9. Navigation

| Desde | Hacia | Accion |
|-------|------|-------|
| Dashboard | CompleteProfile | Banner click o menu |
| CompleteProfile | Dashboard | Guardar |

## 10. Notas UX

- REQUIRED: Todos los campos son obligatorios para mostrar en dashboard
- Campo `infoValidate` en guardian: false = incomplete, true = completo
- El banner "Completa tu perfil" aparece si infoValidate = false
- Boton "Guardar" activo siempre