# Flujo 20 - Perfil de Usuario

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 20 |
| Nombre | Perfil de Usuario |
| Actor | DRIVER, GUARDIAN, ADMIN |
| Objetivo | Ver/editar perfil |
| Prioridad | Media |

## 2. API - Segun Postman

### Auth Endpoints
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| My user | GET | /api/v1/auth/me |
| Refresh token | POST | /api/v1/auth/refresh |

### User Endpoints (ADMIN)
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| Update user | PUT | /api/v1/users/{id} |

## 3. Campos Editables
| Campo | Editable |
|--------|----------|
| Nombre | Si |
| Email | No (readonly) |
| Telefono | Si |
| Contrasena | Si (separado) |
| Roles | No (admin) |

## 4. Secciones
- Datos personales
- Seguridad (cambiar contrasena)
- Cerrar sesion (/auth/logout)

## 5. Notas UX
- Campos editables segun permisos
- Seccion de contrasena separada