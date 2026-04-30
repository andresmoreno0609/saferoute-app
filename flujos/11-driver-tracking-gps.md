# Flujo 11 - DRIVER: Tracking GPS

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 11 |
| Nombre | DRIVER: Tracking GPS |
| Actor | DRIVER (automatico) |
| Objetivo | Enviar ubicacion |
| Prioridad | Alta |

## 2. Funcionamiento (Automatico)
1. Ruta activa
2. App envia GPS cada intervalo (10-30 segundos)
3. Backend guarda posicion
4. Continuar hasta finalizar ruta

## 3. Implementacion
- Usar geolocation API o expo-location
- Intervalo configurable
- Background task (opcional)

## 4. Datos a Enviar
| Campo | Descripcion |
|----------|------------|
| latitude | Latitud |
| longitude | Longitud |
| accuracy | Precision GPS |
| timestamp | Timestamp |
| routeId | ID de ruta |

## 5. Manejo de Errores
| Error | Accion |
|--------|----------|
| Sin GPS | Advertir usuario |
| Sin permiso | Solicitar permiso |
| Sin red | Guardar y reintentar |

## 6. Notas UX
- Indicador visual de tracking activo
- Notificar si pierde señal