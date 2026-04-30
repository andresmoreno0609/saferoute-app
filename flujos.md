# Flujos de Usuario - SafeRoute App

---

## Flujo 01 - Login

**Actor:**DRIVER, GUARDIAN, ADMIN  
**Objetivo:** Acceder a la aplicación

### Pantallas
1. Login Screen

### Flujo Principal
1. Usuario abre la app
2. Ingresa email
3. Ingresa contrasena
4. Toca boton "Iniciar Sesion"
5. Sistema valida credenciales
6. Redirecciona segun rol al Dashboard correspondiente

### Flujos Alternativos
- **Credenciales invalidas:** Mostrar error "Email o contrasena incorrectos"
- **Campo vacio:** Deshabilitar boton hasta llenar ambos campos
- **Olvidaste contrasena:**Mostrar opcion "Olvidaste su contrasena?"

### Notas UX
- Mostrar contrasena como puntos mientras se escribe
- Boton deshabilitado si campos vacios
- Loading mientras valida
- Recordar sesion (opcional)

---

## Flujo 02 - Registro

**Actor:** DRIVER, GUARDIAN  
**Objetivo:** Crear cuenta

### Pantallas
1. Registro Screen

### Flujo Principal
1. Usuario toca "Registrarse" en Login
2. Ingresa nombre completo
3. Ingresa email
4. Ingresa contrasena
5. Confirma contrasena
6. Acepta terminos y condiciones
7. Toca "Crear Cuenta"
8. Sistema crea usuario
9. Redirecciona a Login

### Flujos Alternativos
- **Email ya existe:** Mostrar error
- **Contrasenas no coinciden:** Mostrar error en campo confirmacion
- **Menor de 6 caracteres:** Mostrar helper text
- **Sin aceptar terminos:** Deshabilitar boton

### Notas UX
- Validacion en tiempo real
- Placeholder con ejemplo en contrasena
- Checkbox visible para terminos

---

## Flujo 03 - Logout

**Actor:** DRIVER, GUARDIAN, ADMIN  
**Objetivo:** Cerrar sesion

### Pantallas
1. Confirmacion (opcional)

### Flujo Principal
1. Usuario toca "Cerrar Sesion" en menu/perfil
2. Confirmar accion (si hay confirmacion)
3. Sistema limpia sesion
4. Redirecciona a Login

### Notas UX
- Confirmar antes de cerrar (evitar salidas accidentales)

---

## Flujo 04 - ADMIN: Dashboard

**Actor:** ADMIN  
**Objetivo:** Ver overview del sistema

### Pantallas
1. Dashboard ADMIN

### Flujo Principal
1. ADMIN hace login
2. Ver resumen:
   - Total usuarios activos
   - Rutas en curso
   -Conductoresverificados vs pendientes
   - Alertas/documentos vence
   - Acciones rapidas

### Notas UX
- Cards con numeros grandes
- Iconos por seccion
- Acciones rapidas visibles

---

## Flujo 05 - ADMIN: Gestionar Usuarios

**Actor:** ADMIN  
**Objetivo:** Crear/editar/ver usuarios

### Pantallas
1. Lista de Usuarios
2. Detalle Usuario (ver)
3. Formulario Usuario (crear/editar)

### Flujo Principal - Ver Lista
1. ADMIN toca "Usuarios" en menu
2. Ver lista con filtros (rol, estado)
3. Buscar por nombre/email
4. Tocar usuario para detalle

### Flujo Principal - Crear
1. Tocar "+" o "Nuevo Usuario"
2. Llenar formulario
3. Asignar rol(es)
4. Guardar

### Flujo Principal - Editar
1. Tocar usuario en lista
2. Modificar datos
3. Guardar cambios

### Flujos Alternativos
- **Cambiar rol:** Seleccionar nuevo rol
- **Desactivar usuario:** Cambio de estado (no eliminar)

### Notas UX
- Lista con buscador
- Filtros por rol
- pull-to-refresh
- Estados visuales

---

## Flujo 06 - ADMIN: Gestionar Rutas

**Actor:** ADMIN  
**Objetivo:** Crear/editar/ver rutas

### Pantallas
1. Lista de Rutas
2. Detalle Ruta
3. Formulario Ruta

### Flujo Principal - Crear Ruta
1. Tocar "Nueva Ruta"
2. Ingresar nombre
3. Agregar paradas (ordenar en mapa)
4. Asignarfahrzeug (vehiculo)
5. Asignar conductor
6. Guardar

### Flujo Principal - Editar Ruta
1. Tocar ruta en lista
2. Modificar paradas/vehiculo/conductor
3. Guardar cambios

### Flujos Alternativos
- **Asignar a conductor pendiente:** Mostrar advertencia
- **Eliminar ruta:** Solo si no tiene eventos

### Notas UX
- Mapa interactivo para paradas
- Arrastrar para reordenar paradas

---

## Flujo 07 - ADMIN: Gestionar Vehiculos

**Actor:** ADMIN  
**Objetivo:** Gestionar vehiculos y documentos

### Pantallas
1. Lista de Vehiculos
2. Detalle Vehiculo
3. Formulario Vehiculo

### Flujo Principal
1. ADMIN toca "Vehiculos" en menu
2. Ver lista de vehiculos
3. Tocar vehiculo para ver detalle
4. Ver/gestionar documentos

### Gestion de Documentos
- Agregar documento (tipo, fecha vencimiento, archivo)
- Estados: VIGENTE, POR_VENCER, VENCIDO
- Notificar cuando documento por vencer

### Notas UX
- Indicador visual de estado de documentos
- Colores: verde (vigente), amarillo (por vencer), rojo (vencido)

---

## Flujo 08 - ADMIN: Verificar Conductor

**Actor:** ADMIN  
**Objetivo:** Verificar conductor

### Pantallas
1. Lista Conductores Pendientes
2. Detalle Conductor

### Flujo Principal
1. ADMIN toca "Pendientes" en menu
2. Ver lista de conductors sin verificar
3. Tocar conductor
4. Ver documentos
5. Aprobar o Rechazar
6. Confirmar accion

### Flujos Alternativos
- **Aprobar:** Conductor puede iniciar rutas
- **Rechazar:** Notificar al conductor el motivo

### Notas UX
- Resaltar pendientes con badge
- Mostrar documentos claramente
- Campo para motivo de rechazo

---

## Flujo 09 - DRIVER: Dashboard

**Actor:** DRIVER  
**Objetivo:** Ver overview personal

### Pantallas
1. Dashboard DRIVER

### Flujo Principal
1. DRIVER hace login
2. Ver:
   - Ruta activa (si tiene)
   - Proximo inicio de ruta
   - Ultimos eventos registrados
   - Notificaciones

### Notas UX
- Resaltar boton "Iniciar Ruta" si hay ruta disponible
- Tiempo restante para proxima ruta

---

## Flujo 10 - DRIVER: Iniciar Ruta

**Actor:** DRIVER  
**Objetivo:** Comenzar una ruta asignada

### Pantallas
1. Mis Rutas (seleccionar)
2. Confirmar Inicio

### Flujo Principal
1. DRIVER toca "Iniciar Ruta"
2. Seleccionar ruta de la lista (si hay varias)
3. Ver resumen de ruta (paradas, estudiantes)
4. Tocar "Confirmar Inicio"
5. Sistema cambia estado a IN_PROGRESS
6. Comenzar tracking GPS automatico

### Flujos Alternativos
- **Sin rutas asignadas:** Mostrar mensaje
- **Ya tiene ruta activa:** No permitir iniciar otra

### Notas UX
- Confirmacion clara
- Mostrar estudiantes.assignados

---

## Flujo 11 - DRIVER: Tracking GPS

**Actor:** DRIVER (automatico)  
**Objetivo:** Enviar ubicacion

### Flujo Principal (Automatico)
1. Ruta activa
2. App envia GPS cada 10-30 segundos
3. Backend guarda posicion
4. Continuar hasta finalizar ruta

### Notas UX
- No requiere interaccion
- Mostrar indicador de tracking activo
- Notificar si GPS pierde seal

---

## Flujo 12 - DRIVER: Escanear NFC

**Actor:** DRIVER  
**Objetivo:** Identificar estudiante

### Pantallas
1. Pantalla de Escaneo NFC

### Flujo Principal
1. DRIVER toca boton "Escanear NFC"
2. Aproximar tag NFC al dispositivo
3. Sistema identifica estudiante
4. Mostrar estudiante (nombre, foto)
5. Registrar evento automaticamente (BOARD o DROP)

### Flujos Alternativos
- **NFC no asignado:** Mostrar "NFC no encontrado"
- **Estudiante重复:** Confirmar si ya registrado

### Notas UX
- Instrucciones claras en pantalla
- Feedback visual/audio al detectar
- Timeout si no detecta

---

## Flujo 13 - DRIVER: Registrar Evento

**Actor:** DRIVER  
**Objetivo:** Registrar evento de estudiante

### Pantallas
1. Selector de Evento
2. Lista de Estudiantes (manual)

### Flujo Principal - Por NFC
1. Escanear NFC (Flujo 12)
2. Seleccionar tipo evento:
   - BOARD (sube al bus)
   - ARRIVAL (llega al colegio)
   - DROP (baja en casa)
3. Confirmar registro
4. Notificar a guardian

### Flujo Principal - Manual
1. Tocar "Registrar Manual"
2. Buscar estudiante
3. Seleccionar evento
4. Confirmar registro

### Notas UX
- Feedback inmediato
- Icono por tipo de evento

---

## Flujo 14 - DRIVER: Finalizar Ruta

**Actor:** DRIVER  
**Objetivo:** Terminar ruta activa

### Pantallas
1. Confirmar Finalizacion
2. Resumen de Ruta

### Flujo Principal
1. DRIVER toca "Finalizar Ruta"
2. Ver resumen (estudiantes registrados, eventos)
3. Confirmar finalizacion
4. Sistema cambia estado a COMPLETED
5. Detener tracking GPS

### Flujos Alternativos
- **Registros pendientes:** Advertir antes de finalizar

### Notas UX
- Mostrar resumen antes de confirmar
- Confirmacion para evitar errores

---

## Flujo 15 - DRIVER: Ver Mis Rutas

**Actor:** DRIVER  
**Objetivo:** Ver rutas asignadas

### Pantallas
1. Lista de Mis Rutas

### Flujo Principal
1. DRIVER toca "Mis Rutas"
2. Ver lista de rutas:
   - Proximas
   - Activas
   - Historico
3. Tocar ruta para ver detalle

### Notas UX
- Separar por estado
- Fechas visibles
- pull-to-refresh

---

## Flujo 16 - GUARDIAN: Dashboard

**Actor:** GUARDIAN  
**Objetivo:** Ver overview de hijos

### Pantallas
1. Dashboard GUARDIAN

### Flujo Principal
1. GUARDIAN hace login
2. Ver lista de hijos
3. Estado actual de cada hijo
4. Notificaciones recientes

### Notas UX
- Tarjetas por hijo
- Color por estado (en ruta, en colegio, en casa)

---

## Flujo 17 - GUARDIAN: Ver Hijos

**Actor:** GUARDIAN  
**Objetivo:** Ver detalle de hijos

### Pantallas
1. Lista de Hijos
2. Detalle de Estudiante

### Flujo Principal
1. Tocar hijo en dashboard
2. Ver detalle:
   - Informacion personal
   - Colegio
   - Paradas asignadas
   - NFC asignado
   - Historial de eventos

### Notas UX
- Foto del estudiante
- Informacion de contacto del colegio

---

## Flujo 18 - GUARDIAN: Estado de Ruta

**Actor:** GUARDIAN  
**Objetivo:** Ver estado en tiempo real

### Pantallas
1. Mapa de Ruta

### Flujo Principal
1. GUARDIAN toca "Ver Ruta" en hijo
2. Ver mapa con:
   - Posicion actual del bus
   - Paradas
   - Tiempo estimado

### Flujos Alternativos
- **Sin ruta activa:** Mostrar "Sin ruta activa"

### Notas UX
- Mapa claro con posicion
- Actualizacion en tiempo real

---

## Flujo 19 - GUARDIAN: Notificaciones

**Actor:** GUARDIAN  
**Objetivo:** Ver notificaciones

### Pantallas
1. Lista de Notificaciones

### Flujo Principal
1. Tocar icono de notificaciones
2. Ver lista cronologica
3. Tocar notificacion para detalle

### Tipos de Notificacion
- BOARD: "Estudiante subio al bus"
- ARRIVAL: "Llego al colegio"
- DROP: "llego a casa"
- ADVERTENCIA: Ruta atrasada

### Notas UX
- No leidas destacadas
- pull-to-refresh
- Eliminar al tocar

---

## Flujo 20 - Perfil de Usuario

**Actor:** DRIVER, GUARDIAN, ADMIN  
**Objetivo:** Ver/editar perfil

### Pantallas
1. Perfil Screen

### Flujo Principal
1. Tocar icono de perfil
2. Ver datos:
   - Nombre
   - Email
   - Roles
   - Foto (si tiene)
3. Editar datos
4. Cambiar contrasena
5. Cerrar sesion

### Notas UX
- Campos/editables solo los permitidos
- Foto opcional