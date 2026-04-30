# Flujo 12 - DRIVER: Escanear NFC

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 12 |
| Nombre | DRIVER: Escanear NFC |
| Actor | DRIVER |
| Objetivo | Identificar estudiante |
| Prioridad | Alta |

## 2. API - Segun Postman

### NFC Endpoints
| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| Assign NFC | POST | /api/v1/students/{id}/nfc |
| Get NFC | GET | /api/v1/students/{id}/nfc |
| Delete NFC | DELETE | /api/v1/students/{id}/nfc |
| NFC History | GET | /api/v1/students/{id}/nfc/history |
| Scan NFC | POST | /api/v1/nfc/scan |

## 3. Flujo Principal
1. DRIVER toca "Escanear NFC"
2. Aproximar tag NFC
3. POST /nfc/scan
4. Sistema identifica estudiante
5. Mostrar estudiante (nombre, foto)
6. Registrar evento automaticamente

## 4. Request Scan NFC
```json
{
  "nfcUid": "ABC123456789"
}
```

## 5. Response Scan NFC (200)
```json
{
  "studentId": "uuid",
  "studentName": "Juan Perez",
  "schoolGrade": "5to Primaria"
}
```

## 6. Request Assign NFC
```json
{
  "nfcUid": "ABC123456789",
  "notes": "Tarjeta asignada el 06/04/2026"
}
```

## 7. Flujos Alternativos
| Caso | Accion |
|------|-------|
| NFC no asignado | "NFC no encontrado" |
| Estudiante repetido | Confirmar si ya registrado |
| Error lectura | Reintentar |

## 8. Notas UX
- Instrucciones en pantalla
- Feedback al detectar
- Timeout si no detecta