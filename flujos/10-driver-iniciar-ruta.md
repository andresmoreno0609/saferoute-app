# Flujo 10 - DRIVER: Iniciar Ruta

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 10 |
| Nombre | DRIVER: Iniciar Ruta |
| Actor | DRIVER |
| Objetivo | Comenzar una ruta asignada |
| Prioridad | Alta |

## 2. Pantallas
- Mis Rutas: `src/screens/driver/RoutesScreen.tsx`
- Confirmar Inicio: `src/screens/driver/StartRouteScreen.tsx`

## 3. Flujo Principal
1. DRIVER toca "Iniciar Ruta"
2. Seleccionar ruta (si hay varias)
3. Ver resumen: paradas, estudiantes
4. Tocar "Confirmar Inicio"
5. Cambiar estado a IN_PROGRESS
6. Iniciar tracking GPS

## 4. Resumen de Ruta
- Nombre ruta
- Numero estudiantes
- Lista paradas
- Horario estimado

## 5. Estados Ruta
| Estado | Accion |
|--------|----------|
| PENDING | Iniciar |
| IN_PROGRESS | - |
| COMPLETED | Ver historial |

## 6. Flujos Alternativos
- Sin rutas: mensaje "No hay rutas asignadas"
- Ya tiene ruta activa: no permitir inicio

## 7. Notas UX
- Confirmacion clara
- Mostrar estudiantes asignados