# Flujo 01 - Login

## 1. Overview

| Campo | Valor |
|-------|-------|
| **ID** | 01 |
| **Nombre** | Login |
| **Actor** | DRIVER, GUARDIAN, ADMIN |
| **Objetivo** | Acceder a la aplicación |
| **Prioridad** | Alta |

## 2. Pantallas

| Pantalla | Componente |
|---------|------------|
| Login Screen | `src/screens/auth/LoginScreen.tsx` |

## 3. Flujo Principal

```
1. Usuario abre la app
2. Valida si hay sesion guardada
   └─ Si hay: redirecciona a Dashboard segun rol
   └─ Si no: muestra Login Screen
3. Usuario ingresa email
4. Usuario ingresa contrasena
5. Usuario toca boton "Iniciar Sesion"
6. Sistema muestra estado de carga (loading)
7. Sistema valida credenciales con backend
8. Sistema guarda sesion (opcional)
9. Redirecciona segun rol al Dashboard correspondiente
   ├─ ADMIN → Dashboard ADMIN
   ├─ DRIVER → Dashboard DRIVER
   └─ GUARDIAN → Dashboard GUARDIAN
```

## 4. Componentes UI

### 4.1 Header
- Logo de la app (centrado)
- Titulo "SafeRoute"
- Subtitulo "Bienvenido de nuevo" o similar

### 4.2 Formulario
- Campo: Email
  - Tipo: `email`
  - Placeholder: `correo@ejemplo.com`
  - Autocomplete: `email`
  - InputMode: `email`
  - Teclado: email-address
  - Required: true

- Campo: Contrasena
  - Tipo: `password`
  - Placeholder: `Ingresa tu contrasena`
  - Autocomplete: `current-password`
  - SecureTextEntry: true
  - Required: true

### 4.3 Botones
- Boton principal: "Iniciar Sesion"
  - Estado: disabled si campos vacios
  - Loading: texto cambia a "Iniciando sesion..."
  - Tipo: `Pressable` (no TouchableOpacity)

- Link: "Olvidaste tu contrasena?"
  - Tipo: `Pressable` con accessibilityRole="link"
  - Navega a pantalla de recuperacion

- Link: "No tienes cuenta? Registrate"
  - Tipo: `Pressable` con accessibilityRole="link"
  - Navega a Registro

### 4.4 Errores
-	Error de credenciales: "Email o contrasena incorrectos"
-	Error de red: "Error de conexion. Intenta de nuevo"
-	Error de servidor: "Error del servidor. Intenta mas tarde"

## 5. Flujos Alternativos

### 5.1 Credenciales Invalidas
```
1. Backend retorna 401
2. Mostraralert o mensaje de error
3. Limpiar campo contrasena
4. Enfocar campo email
```

### 5.2 Campo Vacio
```
1. Deshabilitar boton mientras email o contrasena vacio
2. Mostrar estado disabled visual
```

### 5.3 Olvidaste Contrasena
```
1. Usuario toca "Olvidaste tu contrasena?"
2. Navegar a pantalla de recuperacion
3. Ingresar email
4. Sistema envia enlace de reset
5. Mostrar success "Correo enviado"
```

### 5.4 Sin Conexion
```
1. fetch() throw network error
2. Mostrar mensaje de error
3. Ofrecer reintento
```

### 5.5 Cuenta Inactiva
```
1. Backend retorna 403 con mensaje
2. Mostrar mensaje "Cuenta inactiva. Contacta al administrador"
```

## 6. validacion

| Campo | Regla | Feedback |
|------|-------|----------|
| email | Required | Boton deshabilitado |
| email | Formato email valido | Placeholder con ejemplo |
| email | No existe en sistema | Error en backend |
| contrasena | Required | Boton deshabilitado |
| contrasena | Minimo 6 caracteres | Mensaje helper |
| contrasena | Incorrecta | Error en backend |

## 7. Accesibilidad

| Regla | Implementacion |
|-------|--------------|
| Labels asociados | htmlFor en label, nativeID en input |
| Autocomplete | Atributo autocomplete en inputs |
| Focus visible | Borde/color cambia al enfocar |
| Teclado correcto | inputMode y keyboardType |
| Errores accesibles | aria-describedby para errores |
| Botones tipo Pressable | Pressable con feedback visual |
| Loading accesible | accessibilityState={{ disabled: true }} |
| Placeholder descriptivo | Ends con ejemplo "..." |

## 8. Estado de Componentes

```typescript
interface LoginState {
  email: string;
  contrasena: string;
  isLoading: boolean;
  error: string | null;
}
```

## 9. Llamadas API

| Operacion | Metodo | Endpoint |
|-----------|-------|----------|
| Login | POST | `/api/v1/auth/login` |

### Request
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Response Exito (200)
```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "tokenType": "Bearer",
  "expiresIn": 3600,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "Juan Perez",
    "roles": ["DRIVER"]
  }
}
```

### Response Error (401)
```json
{
  "message": "Credenciales invalidas"
}
```

## 10. Persistencia

- Guardar tokens en storage seguro (expo-secure-store)
- Opcional: "Recordarme" para sesion persistente
- Limpiar sesion al hacer logout

## 11. Navigation

| Desde | Hacia | Condicion |
|-------|------|----------|
| Login | Dashboard | Login exitoso |
| Login | Registro | Usuario sin cuenta |
| Login | Recuperar Contrasena | Olvidaste contrasena |

## 12. Notas UX

- Mostrar contrasena como puntos (secureTextEntry)
- no autocomplete en formulario de login
- Boton deshabilitado si campos vacios
- Loading mientras valida
- Focus en email al iniciar pantalla
- Teclado se cierra al tocar fuera
- pull-to-refresh no aplica en login
- Soporte para Biometric (opcional)