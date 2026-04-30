# Flujo 15 - DRIVER: Ver Mis Rutas

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 15 |
| Nombre | DRIVER: Ver Mis Rutas |
| Actor | DRIVER |
| Objetivo | Ver rutas asignadas |
| Prioridad | Alta |

## 2. Pantallas
- Lista: `src/screens/driver/MyRoutesScreen.tsx`

## 3. Flujo Principal
1. DRIVER toca "Mis Rutas"
2. Ver lista:
   - Proximas
   - Activas
   - Historico

## 4. Estados
| Estado | Seccion |
|--------|----------|
| PENDING | Proximas |
| IN_PROGRESS | Activa |
| COMPLETED | Historico |

## 5. Detalle Ruta
- Nombre
- Fecha/hora
- Numero estudiantes
-Lista paradas
- Estado actual

## 6. Notas UX
- Separar por estado
- Fechas visibles
- pull-to-refresh