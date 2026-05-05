# SafeRoute - Revisión de Pantallas

> Proceso de revisión: Flujo → Diseño (estructura) → UI (web guidelines)

---

## 22 Flujos a Revisar

| # | Flujo | Carpeta Flujo | Carpeta Diseño | Estado Diseño | Estado Flujo | Notas |
|---|------|---------------|----------------|---------------|--------------|-------|
| 01 | Login | 01-login | login/ | ⏳ | ⏳ | |
| 02 | Registro | 02-registro | 02 registro/ | ⏳ | ⏳ | |
| 02b | Completar perfil conductor | 02b-completar-perfil-conductor | - | ⏳ | ⏳ | |
| 02c | Completar perfil guardian | 02c-completar-perfil-guardian | - | ⏳ | ⏳ | |
| 03 | Logout | 03-logout | cerrar_sesion*/ | ⏳ | ⏳ | |
| 04 | Admin Dashboard | 04-admin-dashboard | panel_de_administracion*/ | ⏳ | ⏳ | |
| 05 | Admin Gestionar usuarios | 05-admin-gestionar-usuarios | gesti_n_de_usuarios*/ | ⏳ | ⏳ | |
| 06 | Admin Gestionar rutas | 06-admin-gestionar-rutas | gesti_n_de_rutas*/ | ⏳ | ⏳ | |
| 07 | Admin Gestionar vehiculos | 07-admin-gestionar-vehiculos | gesti_n_de_veh_culos*/ | ⏳ | ⏳ | |
| 08 | Admin Verificar conductor | 08-admin-verificar-conductor | verificaci_n_de_conductores*/ | ⏳ | ⏳ | |
| 09 | Driver Dashboard | 09-driver-dashboard | dashboard_conductor*/ | ⏳ | ⏳ | |
| 10 | Driver Iniciar ruta | 10-driver-iniciar-ruta | iniciar_ruta*/ | ⏳ | ⏳ | |
| 11 | Driver Tracking GPS | 11-driver-tracking-gps | seguimiento_gps*/ | ⏳ | ⏳ | |
| 12 | Driver Escanear NFC | 12-driver-escanear-nfc | escanear_estudiante*/ | ⏳ | ⏳ | |
| 13 | Driver Registrar evento | 13-driver-registrar-evento | registro_de_evento*/ | ⏳ | ⏳ | |
| 14 | Driver Finalizar ruta | 14-driver-finalizar-ruta | finalizar_ruta*/ | ⏳ | ⏳ | |
| 15 | Driver Ver mis rutas | 15-driver-ver-mis-rutas | mis_rutas*/ | ⏳ | ⏳ | |
| 16 | Guardian Dashboard | 16-guardian-dashboard | dashboard_padre*/ | ⏳ | ⏳ | |
| 17 | Guardian Ver hijos | 17-guardian-ver-hijos | detalle_del_hijo*/ | ✅ | ✅ | Implementado: foto en crear/editar/detalle |
| 18 | Guardian Estado ruta | 18-guardian-estado-ruta | seguimiento_de_ruta*/ | ⏳ | ⏳ | |
| 19 | Guardian Notificaciones | 19-guardian-notificaciones | notificaciones*/ | ⏳ | ⏳ | |
| 20 | Perfil usuario | 20-perfil-usuario | mi_perfil*/ | ⏳ | ⏳ | |

---

## Checklist de Revisión

### Por Flujo (flujos/*.md)
- [ ] Actor correcto
- [ ] Pasos claros
- [ ] API endpoints correctos
- [ ] Navigation coherente

### Por Diseño (flujos-design/*/code.html)
- [ ] Componentes identificados (sin detalles de estilos)
- [ ] Estructura visual понятная
- [ ] Elementos de accesibilidad básicos

### Por UI (web-design-guidelines)
- [ ] Labels en formularios
- [ ] Botones semánticos (<button>)
- [ ] Links navegables
- [ ] Form controls accesibles
- [ ] Focus states visibles

---

## Símbolos de Estado

| Símbolo | Significado |
|---------|-------------|
| ⏳ | Pendiente de revisar |
| 🔄 | En revisión |
| ✅ | Aprobado |
| ⚠️ | Necesita corrección |

---

## cómo Usar

1. **Revisar flujo**: Leer `flujos/{id}-nombre.md`
2. **Revisar diseño**: Leer `flujos-design/{carpeta}/code.html` (solo estructura)
3. **Actualizar UI**: Aplicar web-design-guidelines
4. **Marcar estado**: Actualizar este documento