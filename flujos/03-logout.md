# Flujo 03 - Logout

## 1. Overview

| Campo | Valor |
|-------|-------|
| **ID** | 03 |
| **Nombre** | Logout |
| **Actor** | DRIVER, GUARDIAN, ADMIN |
| **Objetivo** | Cerrar sesion |
| **Prioridad** | Alta |

## 2. Pantallas

| Pantalla | Componente |
|---------|------------|
| Confirmacion | Alert/Modal |

## 3. Flujo Principal

```
1. Usuario toca "Cerrar Sesion" en Perfil
2. Mostrar confirmacion (Alert/Modal)
3. Usuario confirma
4. Sistema limpia tokens
5. Sistema limpia estado
6. Redirecciona a Login
```

## 4. Componentes UI

### 4.1 Alert/Modal
- Titulo: "Cerrar Sesion"
- Mensaje: "Estas seguro que quieres salir?"
- Botones:
  - "Cancelar" (secondary)
  - "Salir" (destructive)

## 5. Flujos Alternativos

### 5.1 Cancelar
```
1. Usuario toca "Cancelar"
2. Cerrar alert
3. Permanecer en pantalla actual
```

## 6. Accesibilidad

| Regla | Implementacion |
|-------|--------------|
| Botones accesibles | accessibilityRole en botones |
| Confirmacion clara | Titulo y mensaje claros |
| Escape key | Cerrar con boton back |

## 7. Accion API

| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| Logout | POST | `/api/v1/auth/logout` |

- Optional: notificar al backend para invalidar token

## 8. Estado Post-Logout

```typescript
// Limpiar todo
const reset = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};
```

## 9. Navigation

| Desde | Hacia | Condicion |
|-------|------|----------|
| Cualquiera | Login | Logout confirmado |

## 10. Notas UX

- Confirmar antes de cerrar (evitar salidas accidentales)
- No mostrar siempre (solo en boton)
- Limpiar cualquier estado en memoria