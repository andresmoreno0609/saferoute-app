# Flujo 19 - GUARDIAN: Notificaciones

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 19 |
| Nombre | GUARDIAN: Notificaciones |
| Actor | GUARDIAN |
| Objetivo | Ver notificaciones |
| Prioridad | Alta |

## 2. Pantallas
- Lista: `src/screens/guardian/NotificationsScreen.tsx`

## 3. Flujo Principal
1. Tocar icono notificaciones
2. Ver lista cronologica
3. Tocar para detalle

## 4. Tipos de Notificacion
| Tipo | Descripcion | Icono |
|------|-------------|-------|
| BOARD | Estudiante subio al bus | Bus |
| ARRIVAL | Llego al colegio | School |
| DROP | Llego a casa | Home |
| ADVERTENCIA | Ruta atrasada | Warning |

## 5. Estados
| Estado | Visual |
|--------|--------|
| No leida | Negrita, background |
| Leida | Normal |

## 6. Acciones
- Tocar: ver detalle
- Swipe: eliminar

## 7. API
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| Get notifications | GET | /api/v1/notifications |
| Mark read | PUT | /api/v1/notifications/{id}/read |

## 8. Notas UX
- No leidas destacadas
- pull-to-refresh
- Eliminar alSwipe