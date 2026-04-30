# Flujo 02 - Registro

## 1. Overview

| Campo | Valor |
|-------|-------|
| **ID** | 02 |
| **Nombre** | Registro |
| **Actor** | DRIVER, GUARDIAN |
| **Objetivo** | Crear cuenta de usuario |
| **Prioridad** | Alta |

## 2. Pantallas

| Pantalla | Componente |
|---------|------------|
| Register Screen | `src/screens/auth/RegisterScreen.tsx` |
| Completar Informacion (conductor) | `src/screens/auth/CompleteDriverProfileScreen.tsx` |

## 3. Flujo Principal

```
1. Usuario abre app
2. Toca "Registrarse"
3. Selecciona tipo de cuenta:
   - "Soy Padre/Acudiente" → rol GUARDIAN
   - "Soy Conductor" → rol DRIVER
4. Completa formulario
5. Crea cuenta
6. Redirect a Home

7. SI ES CONDUCTOR:
8. Home muestra banner "Completa tu cuenta"
9. Toca "Completar"
10. Completa perfil conductor
11. Sube documentos requeridos
12. Submit para verificacion
13. Espera verificacion de ADMIN
```

## 4. Select - Tipo de Cuenta

```
Label: "Tipo de cuenta"
Opciones:
  - "Soy Padre/Acudiente" (default, rol: GUARDIAN)
  - "Soy Conductor" (rol: DRIVER)
```

## 5. Formulario - Datos Comunes

| Campo | Tipo | Requerido |
|------|------|----------|
| Nombre completo | text | SI |
| Email | email | SI |
| Contrasena | password | SI |
| Confirmar contrasena | password | SI |
| Telefono | tel | NO |

## 6. Formulario - Conductor (solo muestra si selecciono conductor)

| Campo | Tipo | Requerido |
|------|------|----------|
| Numero documento | text | SI |
| Numero licencia | text | SI |
| Categoria licencia | dropdown | SI |
| Vencimiento licencia | date | SI |
| Banco (pago) | text | SI |
| Cuenta banco | text | SI |
| Foto licencia | file | SI |

## 7. Estados de Cuenta conductor

| Estado | Descripcion | Accion |
|--------|-------------|-------|
| PENDING_COMPLETE | Registrado, falta completar | Completa tu cuenta |
| PENDING_VERIFY | Docs subidos, esperandverificacion | Espera verificacion |
| ACTIVE | Verificado por ADMIN | Puede iniciar rutas |
| REJECTED | Verificacion rechazada | Editar y reenviar |

## 8. API - Registro

| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| Register | POST | `/api/v1/auth/register` |

### Request
```json
{
  "name": "Juan Perez",
  "email": "juan@example.com",
  "password": "password123",
  "phone": "+573001234567",
  "role": "DRIVER"  // o "GUARDIAN"
}
```

## 9. API - Completar Perfil Conductor

| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| Create driver | POST | `/api/v1/drivers` |
| Upload document | POST | `/api/v1/drivers/{id}/documents` |

### Request Create Driver
```json
{
  "name": "Juan Perez",
  "phone": "+573001234567",
  "documentNumber": "12345678",
  "licenseNumber": "12345678",
  "licenseCategory": "B",
  "licenseExpirationDate": "2028-05-15",
  "bankName": "NEQUI",
  "bankAccount": "3101234567",
  "vehicleId": "UUID"  // opcional
}
```

### Request Upload Document
```json
{
  "documentType": "LICENCIA",
  "documentNumber": "12345678",
  "licenseCategory": "B",
  "fileUrl": "https://...",
  "startDate": "2026-01-01",
  "endDate": "2028-01-01"
}
```

## 10. Home - Banner conductor

```
Si driver.state != ACTIVE:
Mostrar banner "Completa tu cuenta para comenzar"
  - PENDING_COMPLETE: "Completa tu informacion"
  - PENDING_VERIFY: "Verificacion en proceso"
  - REJECTED: "Verificacion rechazada. Edita y renvial"
```

## 11. Validacion Registro

| Campo | Regla | Feedback |
|------|-------|----------|
| nombre | Required | Boton disabled |
| email | Required, formato valido | Placeholder |
| email | Unico | Error backend |
| contrasena | Minimo 6 chars | Helper text |
| confirmContrasena | Igual a contrasena | Error |
| tipo cuenta | Required | Selector |

## 12. Validacion Perfil Conductor

| Campo | Requerido |
|------|----------|
| documentNumber | SI |
| licenseNumber | SI |
| licenseCategory | SI |
| licenseExpirationDate | SI |
| bankName | SI |
| bankAccount | SI |

## 13. Navigation

|Desde|Hacia|Condicion|
|-----|-----|--------|
|Login|Register|Tocar Registrarse|
|Register|Home|Registro exitoso|
|Home|CompleteDriverProfile|Es conductor + no verificado|

## 14. Notas UX

- Selector claro "Tipo de cuenta"
- Campos requeridos marcados con *
- Progress indicator al subir documentos
- Estados claros del banner
- Tiempo estimado de verificacion (24-48h)