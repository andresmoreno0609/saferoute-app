# Flujo 06 - ADMIN: Gestionar Rutas

## 1. Overview

| Campo | Valor |
|-------|-------|
| **ID** | 06 |
| **Nombre** | ADMIN: Gestionar Rutas |
| **Actor** | ADMIN |
| **Objetivo** | Crear, editar, ver rutas |
| **Prioridad** | Alta |

## 2. Pantallas

| Pantalla | Componente |
|---------|------------|
| Lista de Rutas | `src/screens/admin/RoutesScreen.tsx` |
| Detalle Ruta | `src/screens/admin/RouteDetailScreen.tsx` |
| Formulario Ruta | `src/screens/admin/RouteFormScreen.tsx` |

## 3. Flujo Principal - Ver Lista

```
1. ADMIN toca "Rutas" en menu
2. Fetch lista de rutas
3. Ver rutas por estado
4. Tocar ruta para detalle
```

## 4. Flujo Principal - Crear Ruta

```
1. Tocar "Nueva Ruta"
2. Ingresar nombre
3. Agregar paradas (en mapa)
4. Ordenar paradas
5. Asignar vehiculo
6. Asignar conductor
7. Guardar
```

## 5. Componentes UI

### 5.1 Lista
- Lista con nombre ruta, conductor, estado
- Filtros: estado (PENDING, IN_PROGRESS, COMPLETED)
- pull-to-refresh

### 5.2 Formulario
- Campo: Nombre
  - Tipo: text
  - Required: true

- Campo: Conductor
  - Tipo: dropdown
  - Solo conductores verificados
  - Required: true

- Campo: Vehiculo
  - Tipo: dropdown
  - Required: true

- Campo: Paradas
  - Tipo: lista arrastable
  - Mapa interactivo
  - Agregar/editar/eliminar

### 5.3 Estados de Ruta
| Estado | Descripcion |
|--------|-------------|
| PENDING | No iniciada |
| IN_PROGRESS | En curso |
| COMPLETED | Finalizada |
| CANCELLED | Cancelada |

## 6. Gestion de Paradas

| Accion | Descripcion |
|--------|-------------|
| Agregar | Tocar en mapa o buscar direccion |
| Reordenar | Arrastrar |
| Eliminar | Swipe o boton |
| Editar | Tocar para detalles |

## 7. API - Segun Postman

| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| List routes | GET | `/api/v1/routes` |
| Get route | GET | `/api/v1/routes/{id}` |
| Create route | POST | `/api/v1/routes` |
| Start route | POST | `/api/v1/routes/{id}/start` |
| Complete route | POST | `/api/v1/routes/{id}/complete` |
| Cancel route | POST | `/api/v1/routes/{id}/cancel` |

### Request Create
```json
{
  "name": "Ruta Norte - Manana",
  "driverId": "UUID_DEL_CONDUCTOR",
  "scheduledDate": "2026-04-01"
}
```

## 8. Validation

| Campo | Regla |
|------|-------|
| nombre | Required |
| conductor | Required, verificado |
| vehiculo | Required, documentos vigentes |
| paradas | Minimo 1 |

## 9. Navigation

| Desde | Hacia | Accion |
|-------|------|-------|
| Lista | Detalle | Tocar ruta |
| Lista | Crear | Tocar "+" |
| Detalle | Editar | Tocar "Editar" |

## 10. Notas UX

- Mapa interactivo para paradas
- Arrastrar para reordenar
- Mostrar conductor/vehiculo asignados
- Validar conductor verificado