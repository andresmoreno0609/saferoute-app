# Flujo 08 - ADMIN: Verificar Conductor

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 08 |
| Nombre | ADMIN: Verificar Conductor |
| Actor | ADMIN |
| Objetivo | Verificar conductor |
| Prioridad | Alta |

## 2. Pantallas
- Lista pendientes: `src/screens/admin/PendingDriversScreen.tsx`
- Detalle conductor: `src/screens/admin/DriverDetailScreen.tsx`

## 3. Flujo Principal
1. ADMIN toca "Pendientes" en menu
2. Ver lista de conductores sin verificar
3. Tocar conductor
4. Ver documentos
5. Aprobar o Rechazar

## 4. Documentos Requeridos Conductor
| Documento | Descripcion |
|----------|------------|
| LICENCIA | Archivo imagen/PDF |
| CEDULA | Identificacion |

## 5. Acciones
| Accion | Resultado |
|--------|----------|
| Aprobar | Conductor puede iniciar rutas |
| Rechazar | Notificar motivo al conductor |

## 6.Flujos Alternativos
- Aprobar: cambio a verified=true
- Rechazar: campo motivo requerido

## 7. Notas UX
- Badge con cantidad pendiente
- Campo para motivo de rechazo