# Flujo 14 - DRIVER: Finalizar Ruta

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 14 |
| Nombre | DRIVER: Finalizar Ruta |
| Actor | DRIVER |
| Objetivo | Terminar ruta activa |
| Prioridad | Alta |

## 2. Pantallas
- Confirmar: Alert/Modal
- Resumen: `src/screens/driver/RouteSummaryScreen.tsx`

## 3. Flujo Principal
1. DRIVER toca "Finalizar Ruta"
2. Ver resumen (estudiantes, eventos)
3. Confirmar finalizacion
4. Cambiar estado a COMPLETED
5. Detener tracking GPS

## 4. Resumen a Mostrar
- Total estudiantes
- Eventos registrados
- Duracion de ruta

## 5. Flujos Alternativos
- Registros pendientes: Advertir

## 6. API
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| Complete route | PUT | /api/v1/routes/{id}/complete |

## 7. Notas UX
- Mostrar resumen antes de confirmar
- Confirmacion para evitar errores