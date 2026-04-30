# Flujo 05 - ADMIN: Gestionar Usuarios

## 1. Overview

| Campo | Valor |
|-------|-------|
| **ID** | 05 |
| **Nombre** | ADMIN: Gestionar Usuarios |
| **Actor** | ADMIN |
| **Objetivo** | Crear, editar, ver usuarios |
| **Prioridad** | Alta |

## 2. Pantallas

| Pantalla | Componente |
|---------|------------|
| Lista de Usuarios | `src/screens/admin/UsersScreen.tsx` |
| Detalle Usuario | `src/screens/admin/UserDetailScreen.tsx` |
| Formulario Usuario | `src/screens/admin/UserFormScreen.tsx` |

## 3. Flujo Principal - Ver Lista

```
1. ADMIN toca "Usuarios" en menu
2. Fetch lista de usuarios
3. Mostrar lista con filtros
4. Buscar por nombre/email
5. Tocar usuario para detalle
```

## 4. Flujo Principal - Crear

```
1. Tocar "+" o "Nuevo Usuario"
2. Llenar formulario
3. Asignar rol(es)
4. Guardar
5. Mostrar exito
```

## 5. Flujo Principal - Editar

```
1. Tocar usuario en lista
2. Modificar datos
3. Guardar cambios
4. Mostrar exito
```

## 6. Componentes UI

### 6.1 Lista
- Search bar
- Filtros: rol (dropdown), estado (dropdown)
- Lista con avatar, nombre, email, rol
- Pull-to-refresh

### 6.2 Formulario
- Nombre completo
- Email
- Rol(es): checkbox multiple (ADMIN, DRIVER, GUARDIAN)
- Estado: dropdown (ACTIVE, INACTIVE)

### 6.3 API - Segun Postman
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| List users | GET | `/api/v1/users` |
| Get user | GET | `/api/v1/users/{id}` |
| Create user | POST | `/api/v1/users` |
| Update user | PUT | `/api/v1/users/{id}` |
| Delete user | DELETE | `/api/v1/users/{id}` |

### Request Create
```json
{
  "email": "conductor@test.com",
  "password": "password123",
  "name": "Juan Perez",
  "roles": ["DRIVER"]
}
```

*Nota: roles es un array*

## 9. Navigation

| Desde | Hacia | Accion |
|-------|------|-------|
| Lista | Detalle | Tocar usuario |
| Detalle | Editar | Tocar "Editar" |
| Lista | Crear | Tocar "+" |

## 10. Notas UX

- Lista con buscador
- Filtros por rol
- pull-to-refresh
- Estados visuales (activo/inactivo)