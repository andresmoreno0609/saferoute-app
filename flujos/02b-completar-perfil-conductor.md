# Flujo 02B - Completar Perfil Conductor

## 1. Overview

| Campo | Valor |
|-------|-------|
| **ID** | 02B |
| **Nombre** | Completar Perfil Conductor |
| **Actor** | DRIVER |
| **Objetivo** | Completar datos y documentos para verificacion |
| **Prioridad** | Alta |

## 2. Descripcion

Despues del registro, conductor debe completar su perfil
desde el Dashboard. Requiere cargar documentos.

## 3. Cuando se usa

- Desde DRIVER Dashboard: Banner "Completa tu cuenta"
- Solo si driver profile no esta completo

## 4. Pantallas

| Pantalla | Componente |
|---------|------------|
| Complete Driver Profile | `src/screens/driver/CompleteProfileScreen.tsx` |

## 5. Formulario - Datos Conductor

| Campo | Tipo | Requerido |
|------|------|----------|
| Numero documento | text | SI |
| Fecha nacimiento | date | SI |
| Direccion | text | SI |
| Telefono | tel | SI |
| Numero licencia | text | SI |
| Categoria licencia | dropdown (A,B,C) | SI |
| Vencimiento licencia | date | SI |
| Banco para pago | dropdown | SI |
| Numero cuenta | text | SI |
| Foto licencia | file (image) | SI |
| Foto cedula | file (image) | SI |

## 6. Formulario - Vehiculo (opcional)

| Campo | Tipo | Requerido |
|------|------|----------|
| Seleccionar vehiculo | dropdown | NO |
| o crear nuevo | button | NO |

## 7. Estados

| Estado | Descripcion | Puede iniciar rutas |
|--------|-------------|---------------------|
| INCOMPLETO | Datos sin completar | NO |
| PENDING_VERIFY | Docs subidos, esperandverificacion | NO |
| ACTIVE | Verificado por ADMIN | SI |
| REJECTED | Rechazado, debe corregir | NO |

## 8. API - Endpoints

| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| Create driver profile | POST | `/api/v1/drivers` |
| Update infoValidate | Se actualiza junto con el perfil |
| Upload document | POST | `/api/v1/drivers/{id}/documents` |

## 9. Request Create Driver
```json
{
  "name": "Juan Perez",
  "phone": "+573001234567",
  "documentNumber": "12345678",
  "birthDate": "1990-05-15",
  "address": "Calle 123, Bogota",
  "licenseNumber": "12345678",
  "licenseCategory": "B",
  "licenseExpirationDate": "2028-05-15",
  "emergencyContact": "Maria Perez",
  "emergencyPhone": "+573001234568",
  "bankName": "NEQUI",
  "bankAccount": "3101234567"
}
```

## 10. Request Upload Document
```json
{
  "documentType": "LICENCIA",
  "documentNumber": "12345678",
  "licenseCategory": "B",
  "fileUrl": "https://storage.../license.jpg",
  "startDate": "2026-01-01",
  "endDate": "2028-01-01"
}
```

## 11. Flujo UI

```
1. Usuario toca "Completa tu cuenta" (desde Dashboard)
2. Muestra formulario datos personales
3. Usuario completa datos
4. Usuario carga documentos (foto licencia, foto cedula)
5. Preview documentos
6. Boton "Enviar para verificacion"
7. Submit → cambia estado a PENDING_VERIFY
8. Redirect a Dashboard
9. Banner cambia a "Verificacion en proceso"
```

## 12. Validacion

Todos los campos requeridos deben estar llenos antes de submit.

## 13. Navigation

| Desde | Hacia | Accion |
|-------|------|-------|
| Dashboard | CompleteProfile | Banner click |
| CompleteProfile | Dashboard | Submit exitoso |

## 14. Notas UX

- Progress indicator al subir archivos
- Preview de documentos subidos
- Campos requeridos marcados con *
- Tiempo estimado de verificacion (24-48h)