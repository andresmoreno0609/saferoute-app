# Flujo 13 - DRIVER: Registrar Evento

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 13 |
| Nombre | DRIVER: Registrar Evento |
| Actor | DRIVER |
| Objetivo | Registrar evento de estudiante |
| Prioridad | Alta |

## 2. Flujo Principal - Por NFC
1. Escanear NFC (Flujo 12)
2. Mostrar estudiante
3. Seleccionar tipo evento
4. Confirmar registro
5. Notificar a guardian

## 3. Flujo Principal - Manual
1. Tocar "Registrar Manual"
2. Buscar estudiante
3. Seleccionar evento
4. Confirmar registro

## 4. Tipos de Evento
| Tipo | Descripcion |
|------|-------------|
| BOARD | Sube al bus |
| ARRIVAL | Llega al colegio |
| DROP | Baja en casa |

## 5. API
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| Create event | POST | /api/v1/events |

## 6. Datos Evento
| Campo | Descripcion |
|----------|------------|
| studentId | ID estudiante |
| routeId | ID ruta |
| type | BOARD/ARRIVAL/DROP |
| nfcId | ID NFC (si escaneo) |
| timestamp | Timestamp |

## 7. Notas UX
- Feedback inmediato
- Icono por tipo de evento