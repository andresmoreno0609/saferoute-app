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
Selector para elegir tipo de cuenta.

## 3. Pantallas

| Pantalla | Componente |
|---------|------------|
| Register Screen | `src/screens/auth/RegisterScreen.tsx` |

## 4. Flujo Principal

```
1. Usuario abre app
2. Toca "Registrarse"
3. Selecciona tipo de cuenta:
   - "Soy Padre/Acudiente"
   - "Soy Conductor"
4. Completa formulario
5. Crea cuenta
6. Redirect a Dashboard
7. Driver: Nota "Completa tu cuenta"
8. Guardian: Nota "Completa tu perfil"
```

## 5. Selector - Tipo de Cuenta

```
Label: "¿Cómo te vas a registrar?"

Opciones (radio buttons o cards):
┌─────────────────────┐  ┌─────────────────────┐
│   👤 PADRE         │  │   🚛 CONDUCTOR     │
│                     │  │                     │
│   Tengo hijos que   │  │   Transporte        │
│   usan ruta escolar│  │   escolares         │
│                     │  │                     │
│   [Seleccionar]    │  │   [Seleccionar]    │
└─────────────────────┘  └─────────────────────┘
```

## 6. Formulario - Datos Comunes

| Campo | Tipo | Requerido |
|------|------|----------|
| Nombre completo | text | SI |
| Email | email | SI |
| Contrasena | password | SI |
| Confirmar contrasena | password | SI |

## 7. Formulario - Si selecciona Conductor

Despues del registro, redirect a Dashboard,
luego toca "Completa tu cuenta" (Flujo 02B)

## 8. API - Registro

| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| Register | POST | `/api/v1/auth/register` |

### Request - Padre
```json
{
  "name": "Juan Perez",
  "email": "juan@example.com",
  "password": "password123",
  "role": "GUARDIAN"
}
```

### Request - Conductor
```json
{
  "name": "Juan Perez",
  "email": "juan@example.com",
  "password": "password123",
  "role": "DRIVER"
}
```

*Nota: role se envia en el registro*

## 9. Post-Registro

| Rol | Accion en Dashboard |
|-----|---------------------|
| DRIVER | Nota "Completa tu cuenta" → Flujo 02B |
| GUARDIAN | Nota "Completa tu perfil" → Flujo 02C (opcional) |

## 10. Validacion

| Campo | Regla | Feedback |
|------|-------|----------|
| tipo cuenta | Required | Debe seleccionar uno |
| nombre | Required | Boton disabled |
| email | Required, formato valido | Placeholder |
| contrasena | Minimo 6 chars | Helper text |
| confirmContrasena | Igual a contrasena | Error |

## 11. Navigation

| Desde | Hacia | Accion |
|-------|------|-------|
| Login | Register | Tocar Registrarse |
| Register | Dashboard | Registro exitoso |

## 12. Notas UX

- Selector con iconos claros
- Descripcion breve de cada tipo
- Preview de seleccionar
- Rol se guarda en la cuenta