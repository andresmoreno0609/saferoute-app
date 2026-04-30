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
| Confirmacion | (opcional) |

## 3. Flujo Principal

```
1. Usuario toca "Registrarse" en Login Screen
2. Navegar a Register Screen
3. Usuario ingresa nombre completo
4. Usuario ingresa email
5. Usuario ingresa contrasena
6. Usuario confirma contrasena
7. Usuario acepta terminos y condiciones
8. Usuario toca "Crear Cuenta"
9. Sistema muestra estado de carga
10. Sistema valida datos en frontend
11. Sistema envia al backend
12. Sistema crea usuario
13. Redirecciona a Login
14. Mostrar mensaje "Cuenta creada. inicia sesion"
```

## 4. Componentes UI

### 4.1 Header
- Logo (opcional)
- Titulo: "Crear Cuenta"
- Subtitulo: "Unete a SafeRoute" o similar

### 4.2 Formulario
- Campo: Nombre Completo
  - Tipo: `text`
  - Placeholder: "Juan Perez"
  - Autocomplete: `name`
  - capitalize: `words`
  - Required: true

- Campo: Email
  - Tipo: `email`
  - Placeholder: "correo@ejemplo.com"
  - Autocomplete: `email`
  - InputMode: `email`
  - Required: true

- Campo: Contrasena
  - Tipo: `password`
  - Placeholder: "Minimo 6 caracteres..."
  - Autocomplete: `new-password`
  - SecureTextEntry: true
  - Required: true
  - Helper text: "Minimo 6 caracteres"

- Campo: Confirmar Contrasena
  - Tipo: `password`
  - Placeholder: "Repite tu contrasena"
  - SecureTextEntry: true
  - Required: true

### 4.3 Checkbox
- Terminos y Condiciones
  - Checkbox personalizado
  - Texto: "Acepto los terminos y condiciones"
  - Link: "Ver terminos" (Pressable)

### 4.4 Botones
- Principal: "Crear Cuenta"
  - Disabled si: campos vacios o terminos no aceptados
  - Loading: "Creando cuenta..."

- Secundario: "Ya tienes cuenta? Inicia sesion"
  - Navega a Login

### 4.5 Errores
- Email ya existe: "Este email ya esta registrado"
- Contrasenas no coinciden: "Las contrasenas no coinciden"
- Contrasena muy corta: "Minimo 6 caracteres"
- Terminos no aceptados: "Debes aceptar los terminos"

## 5. Flujos Alternativos

### 5.1 Email Ya Existe
```
1. Backend retorna 400
2. Mostrar error en campo email
3. Suggestion: "Olvidaste tu contrasena?"
```

### 5.2 Contrasenas No Coinciden
```
1. Validar al tocar boton crear
2. Mostrar error en campo confirmacion
3. Enfocar campo confirmacion
```

### 5.3 Contrasena Muy Corta
```
1. Validar en tiempo real (onChange)
2. Mostrar helper text en rojo
```

### 5.4 Sin Aceptar Terminos
```
1. Boton deshabilitado hasta aceptar
2. Checkbox requiere aceptar
```

### 5.5 Registro Exitoso
```
1. Mostrar exito
2. Redireccionar a Login
3. Mostrar toast "Cuenta creada"
```

## 6. Validacion

| Campo | Regla | Feedback |
|------|-------|----------|
| nombre | Required | Boton disabled |
| nombre | Minimo 2 palabras | Help text opcional |
| email | Required | Boton disabled |
| email | Formato valido | Placeholder con ejemplo |
| email | Unico en sistema | Error del backend |
| contrasena | Required | Boton disabled |
| contrasena | Minimo 6 chars | Helper text |
| confirmContrasena | Required | Boton disabled |
| confirmContrasena | Igual a contrasena | Error "no coinciden" |
| terminos | Aceptado | Boton disabled si false |

## 7. Accesibilidad

| Regla | Implementacion |
|-------|--------------|
| Labels | htmlFor en label, nativeID en input |
| Autocomplete | Atributos completos |
| Focus visible | Borde/color al enfocar |
| Inputs tipo Pressable | Checkbox como Pressable |
| Errores en campos | aria-describedby |
| Boton deshabilitado | accessibilityState={{ disabled }} |
| Loading en boton | accessibilityLabel con estado |

## 8. Estado

```typescript
interface RegisterState {
  nombre: string;
  email: string;
  contrasena: string;
  confirmContrasena: string;
  aceptaTerminos: boolean;
  isLoading: boolean;
  errors: {
    nombre?: string;
    email?: string;
    contrasena?: string;
    confirmContrasena?: string;
  };
}
```

## 9. API

| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| Register | POST | `/api/v1/auth/register` |

### Request
```json
{
  "name": "Juan Perez",
  "email": "juan@example.com",
  "password": "password123"
}
```

### Response Exito (201)
```json
{
  "user": { ... },
  "accessToken": "jwt",
  "refreshToken": "refresh"
}
```

### Response Error (400)
```json
{
  "message": "Email ya existe"
}
```

## 10. Navigation

| Desde | Hacia | Accion |
|-------|------|-------|
| Login | Register | Tocar "Registrarse" |
| Register | Login | Tocar "Inicia sesion" |
| Register | Dashboard | Registro exitoso |

## 11. Notas UX

- Validacion en tiempo real para contrasena
- Placeholder con ejemplo muestra patron
- Checkbox visible y facil de tocar
- Colores de error claros
- Focus en primer campo al abrir
- Teclado numerico para telefono (si aplica)
- Loading durante peticion
- Success feedback claro