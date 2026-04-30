# Flujo 12 - DRIVER: Escanear NFC

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 12 |
| Nombre | DRIVER: Escanear NFC |
| Actor | DRIVER |
| Objetivo | Identificar estudiante |
| Prioridad | Alta |

## 2. Pantallas
- Pantalla escaneo: `src/screens/driver/NfcScanScreen.tsx`

## 3. Flujo Principal
1. DRIVER toca "Escanear NFC"
2. Aproximar tag NFC
3. Sistema identifica estudiante
4. Mostrar estudiante (nombre, foto)
5. Registrar evento automaticamente

## 4. Componentes UI
- Instrucciones claras
- Indicador de espera
- Feedback visual/audio al detectar

## 5. Flujos Alternativos
| Caso | Accion |
|------|-------|
| NFC no asignado | "NFC no encontrado" |
| Estudiante repetido | Confirmar si ya registrado |
| Error lectura | Reintentar |

## 6. API
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| Read NFC | POST | /api/v1/nfc/scan |

## 7. Notas UX
- Instrucciones en pantalla
- Feedback al detectar
- Timeout si no detecta