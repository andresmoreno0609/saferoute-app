# Flujo 17 - GUARDIAN: Ver Hijos

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 17 |
| Nombre | GUARDIAN: Ver Hijos |
| Actor | GUARDIAN |
| Objetivo | Ver detalle de hijos |
| Prioridad | Alta |

## 2. Pantallas
- Lista Hijos: `src/screens/guardian/ChildrenScreen.tsx`
- Detalle Estudiante: `src/screens/guardian/ChildDetailScreen.tsx`

## 3. Flujo Principal
1. Tocar hijo en dashboard
2. Ver detalle:
   - Informacion personal
   - Colegio
   - Paradas asignadas
   - NFC asignado
   - Historial eventos

## 4. Componentes UI
- Foto estudiante
- Nombre
- Colegio
- NFC
- Historial de eventos

## 5. API
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| Get children | GET | /api/v1/guardians/{id}/children |
| Get child detail | GET | /api/v1/students/{id} |
| Get events | GET | /api/v1/students/{id}/events |

## 6. Notas UX
- Foto del estudiante
- Informacion de contacto del colegio