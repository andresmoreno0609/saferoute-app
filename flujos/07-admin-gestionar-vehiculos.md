# Flujo 07 - ADMIN: Gestionar Vehiculos

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 07 |
| Nombre | ADMIN: Gestionar Vehiculos |
| Actor | ADMIN |
| Objetivo | Gestionar vehiculos y documentos |
| Prioridad | Alta |

## 2. Pantallas
-Lista vehiculos: `src/screens/admin/VehiclesScreen.tsx`
- Detalle vehiculo: `src/screens/admin/VehicleDetailScreen.tsx`
- Formulario vehiculo: `src/screens/admin/VehicleFormScreen.tsx`

## 3. Flujo Principal
1. ADMIN toca "Vehiculos"
2. Ver lista de vehiculos
3. Tocar para ver detalle
4. Gestionar documentos

## 4. Gestion de Documentos
| Documento | Tipo |
|-----------|------|
| SOAP | fecha vencimiento |
| SEGURO | fecha vencimiento |
| TECNOMECANICA | fecha vencimiento |
| TARJETA_PROPIEDAD | fecha vencimiento |

## 5. Estados Documentos
| Estado | Color |
|--------|-------|
| VIGENTE | Verde |
| POR_VENCER (< 30 dias) | Amarillo |
| VENCIDO | Rojo |

## 6. Formulario - Vehiculo
- Placa (required)
- Marca
- Modelo
- Ano
- Color
- capacidad

## 7. API
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| List | GET | /api/v1/vehicles |
| Get | GET | /api/v1/vehicles/{id} |
| Create | POST | /api/v1/vehicles |
| Update | PUT | /api/v1/vehicles/{id} |
| Documents | CRUD | /api/v1/vehicles/{id}/documents |

## 8. Notas UX
- Indicador visual de estado documentos
- Notificar 30 dias antes de vencer