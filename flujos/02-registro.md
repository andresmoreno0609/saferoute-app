# Flujo 02 - Registro

## 1. Overview

| Campo | Valor |
|-------|-------|
| **ID** | 02 |
| **Nombre** | Registro |
| **Actor** | DRIVER, GUARDIAN |
| **Objetivo** | Crear cuenta de usuario |
| **Prioridad** | Alta |

## 2. Descripcion

Registro unificado para padres y conductores.
Solo datos basicos de autenticacion.
Despues del registro, deben completar su perfil desde el Dashboard.

## 3. Pantallas

| Pantalla | Componente |
|---------|------------|
| Register Screen | `src/screens/auth/RegisterScreen.tsx` |

## 4. Flujo Principal

```
1. Usuario abre app
2. Toca "Registrarse"
3. Completa datos basicos
4. Crea cuenta
5. Redirect a Dashboard
6. Dashboard muestra "Completa tu perfil"
7. Usuario completa perfil
```

## 5. Formulario - Solo datos basicos

| Campo | Tipo | Requerido |
|------|------|----------|
| Nombre completo | text | SI |
| Email | email | SI |
| Contrasena | password | SI |
| Confirmar contrasena | password | SI |
| Telefono | tel | NO |

*Nota: No hay selector de rol aquiv

## 6. API - Registro

| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| Register | POST | `/api/v1/auth/register` |

### Request
```json
{
  "name": "Juan Perez",
  "email": "juan@example.com",
  "password": "password123",
  "phone": "+573001234567"
}
```

*Rol siempre: GUARDIAN por defecto

### Response (201)
```json
{
  "user": {
    "id": "uuid",
    "email": "juan@example.com",
    "name": "Juan Perez",
    "roles": ["GUARDIAN"]
  },
  "accessToken": "jwt",
  "refreshToken": "refresh"
}
```

## 7. Post-Registro

| Rol | Accion en Dashboard |
|-----|---------------------|
| DRIVER | Banner "Completa tu cuenta" → Flujo 02B |
| GUARDIAN | Banner "Completa tu perfil" → Flujo 02C (opcional) |

## 8. Validacion

| Campo | Regla | Feedback |
|------|-------|----------|
| nombre | Required | Boton disabled |
| email | Required, formato valido | Placeholder |
| contrasena | Minimo 6 chars | Helper text |
| confirmContrasena | Igual a contrasena | Error |

## 9. Navigation

| Desde | Hacia | Accion |
|-------|------|-------|
| Login | Register | Tocar Registrarse |
| Register | Home | Registro exitoso |

## 10. Notas UX

- Formulario simple, solo datos de cuenta
- No asking for role
- Redireccion a Dashboard
- Perfil se completa desde Dashboard