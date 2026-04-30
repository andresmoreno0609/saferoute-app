# Flujo 09 - DRIVER: Dashboard

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 09 |
| Nombre | DRIVER: Dashboard |
| Actor | DRIVER |
| Objetivo | Ver overview personal |
| Prioridad | Alta |

## 2. Pantallas
- Dashboard DRIVER: `src/screens/driver/DashboardScreen.tsx`

## 3. Flujo Principal
1. DRIVER hace login
2. Mostrar dashboard con:
   - Ruta activa (si tiene)
   - Proximo inicio de ruta
   - Ultimos eventos registrados
   - Notificaciones

## 4. Componentes UI
- Resaltar boton "Iniciar Ruta" si hay ruta disponible
- Tiempo restante para proxima ruta
- Lista de ultimos eventos
- Badge de notificaciones

## 5. Estados
| Estado | Descripcion |
|--------|-------------|
| Sin ruta | Sin ruta asignada |
| Disponible | Ruta lista para iniciar |
| Ruta activa | En curso |

## 6. Notas UX
- Resaltar boton inicio si ruta disponible
- Tiempo restante visible