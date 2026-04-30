# Flujo 20 - Perfil de Usuario

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 20 |
| Nombre | Perfil de Usuario |
| Actor | DRIVER, GUARDIAN, ADMIN |
| Objetivo | Ver/editar perfil |
| Prioridad | Media |

## 2. Pantallas
- Perfil: `src/screens/profile/ProfileScreen.tsx`

## 3. Flujo Principal
1. Tocar icono perfil
2. Ver datos:
   - Nombre
   - Email
   - Roles
   - Foto (si tiene)
3. Editar datos
4. Cambiar contrasena
5. Cerrar sesion

## 4. Campos Editables
| Campo | editable |
|--------|----------|
| Nombre | Si |
| Telefono | Si |
| Foto | Si |
| Contrasena | Si (separado) |

## 5. Campos Solo Lectura
| Campo |
|-------|
| Email |
| Roles |

## 6. Secciones
- Datos personales
- Seguridad (cambiar contrasena)
- Cerrar sesion

## 7. API
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| Get profile | GET | /api/v1/users/me |
| Update profile | PUT | /api/v1/users/me |
| Change password | POST | /api/v1/users/me/password |

## 8. Notas UX
- Campos editables segun permisos
- Foto opcional
- Seccion de contrasena separada