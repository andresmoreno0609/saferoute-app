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
| My user + profile | GET | /api/v1/auth/me (incluye datos de guardian/driver) |
| Refresh token | POST | /api/v1/auth/refresh |

### Guardian Endpoints
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| Get guardian | GET | /api/v1/guardians/user/{userId} |
| Update guardian | PUT | /api/v1/guardians/{id} |

### User Endpoints (ADMIN)
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| Update user | PUT | /api/v1/users/{id} |

## 3. Datos por Rol

### Common (User)
| Campo | Editable | Tipo |
|------|----------|------|
| name | Si | string |
| email | No | string (readonly) |
| phone | Si | string |
| roles | No | array |

### Guardian (adicional)
| Campo | Editable | Tipo |
|------|----------|------|
| documentNumber | Si | string |
| birthDate | Si | date |
| address | Si | string |
| occupation | Si | string |
| workPhone | Si | string |
| emergencyContactName | Si | string |
| emergencyContactPhone | Si | string |

### Driver (adicional)
| Campo | Editable | Tipo |
|------|----------|------|
| licenseNumber | Si | string |
| vehicleId | Si | string |
| isVerified | No | boolean |

## 4. Secciones
- Datos personales (nombre, email, teléfono)
- Información de guardian/driver (según rol)
- Seguridad (cambiar contraseña)
- Cerrar sesión

## 5. Notas UX
- Campos editables según permisos
- Sección de contraseña separada
- Loading state mientras carga datos
- Error state si falla cargar