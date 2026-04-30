# Flujo 16 - GUARDIAN: Dashboard

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 16 |
| Nombre | GUARDIAN: Dashboard |
| Actor | GUARDIAN |
| Objetivo | Ver overview de hijos |
| Prioridad | Alta |

## 2. Pantallas
- Dashboard: `src/screens/guardian/DashboardScreen.tsx`

## 3. Flujo Principal
1. GUARDIAN hace login
2. Ver lista de hijos
3. Estado actual de cada hijo
4. Notificaciones recientes

## 4. Componentes UI
- Tarjetas por hijo
- Estado visual (en ruta, en colegio, en casa)
- Notificaciones recientes

## 5. Estados Estudiante
| Estado | Color |
|--------|-------|
| EN_RUTA | Azul |
| EN_COLEGIO | Verde |
| EN_CASA | Gris |

## 6. Notas UX
- Tarjetas por hijo
- Color por estado