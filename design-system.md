# SafeRoute - Design System

> Versión: 2.0  
> Basado en: `vibrant_kinetic/DESIGN.md` + `design-specs.md`  
> Fecha: Mayo 2026

---

## 1. Fundamentos

### 1.1 Marca

** Personality**: "Silent Copilot" — presente cuando se necesita, nunca distractivo.

**Valores**:
- Fiabilidad (reliability)
- Vigilancia (vigilance)  
- Composición (composure)

**Estilo**: Modern Corporate con Kinetic Edge — transiciones fluidas, estética optimista y limpia.

---

## 2. Paleta de Colores

> Basado en flujos-design HTMLs (login, 02 registro, saferoute_design_system)

### 2.1 Colores Principales

| Nombre | Hex | Uso |
|--------|-----|-----|
| Primary | `#000000` | Branding, logo |
| Secondary (Primary Action) | `#006a61` | Botones principales, acciones ✅ |
| On Secondary | `#ffffff` | Texto sobre botones |
| Secondary Container | `#86f2e4` | Hover/active backgrounds |
| On Secondary Container | `#006f66` | Text on secondary |
| Tertiary | `#000000` | Links |
| Tertiary Container | `#0d1c2f` | Link hover states |

### 2.2 Colores de Fondo/Superficie

| Nombre | Hex | Uso |
|--------|-----|-----|
| Background | `#f7f9fb` | Fondo app |
| Surface | `#f7f9fb` | Surface base |
| Surface Container Lowest | `#ffffff` | Cards |
| Surface Container Low | `#f2f4f6` | Input backgrounds |
| Surface Container | `#eceef0` | Dividers |
| On Surface | `#191c1e` | Texto principal |
| On Surface Variant | `#45464d` | Texto secundario |
| Outline | `#76777d` | Borders |
| Outline Variant | `#c6c6cd` | Light borders |

### 2.3 Estados

| Estado | Hex | Uso |
|--------|-----|-----|
| Error | `#ba1a1a` | Errores |
| Error Container | `#ffdad6` | Error backgrounds |
| On Error | `#ffffff` | Error text |
| Surface | `#191c1e` | Fondo dark |
| On Surface | `#f7f9fb` | Texto dark |
| Primary | `#4fdbc8` | Primary dark |
| Secondary | `#7c8fa8` | Secondary dark |

---

## 3. Tipografía

### 3.1 Familia

**Inter** — legibilidad máxima en todas las condiciones (critico para conductores).

### 3.2 Escala

| Token | Tamaño Mobile | Tamaño Desktop | Peso | Line Height |
|-------|--------------|----------------|------|-------------|
| Display | 36px | 48px | 700 | 44px |
| H1 | 32px | 40px | 700 | 40px |
| H2 | 28px | 32px | 600 | 36px |
| H3 | 24px | 28px | 600 | 32px |
| H4 | 20px | 24px | 600 | 28px |
| Body LG | 18px | 20px | 400 | 28px |
| Body | 16px | 16px | 400 | 24px |
| Body SM | 14px | 14px | 400 | 20px |
| Label | 14px | 14px | 600 | 20px |
| Caption | 12px | 12px | 500 | 16px |

### 3.3 Usage

- **Display/H1**: Pantallas de login, headers de secciones
- **H2-H4**: Titulos de tarjetas, secciones
- **Body**: Contenido principal, formularios
- **Body SM**: Descripciones, texto secundario
- **Label**: Botones, tabs, chips
- **Caption**: Timestamps, metadata

### 3.4 Letter Spacing

| Estilo | Tracking |
|-------|----------|
| Display | -0.02em |
| H1-H3 | -0.01em |
| Body | 0 |
| Label | 0.01em |

---

## 4. Espaciado

### 4.1 Sistema (Base 8px)

| Token | Valor | Uso |
|-------|-------|-----|
| xs | 4px | Iconos pequeños |
| sm | 8px | Entre elementos relacionados |
| md | 16px | Padding de cards, botones |
| lg | 24px | Entre secciones |
| xl | 32px | Margins de pagina |
| 2xl | 40px | Entre grupos |
| 3xl | 48px | Hero sections |

### 4.2 Container Padding

| Viewport | Padding |
|----------|--------|
| Mobile | 16px |
| Tablet | 24px |
| Desktop | 32px |

### 4.3 Touch Targets

| Elemento | Tamaño Minimo |
|---------|-------------|
| Button | 44x44px (48px recomendado) |
| Icon Button | 44x44px |
| List Item | 48px altura |
| Checkbox | 24x24px |

---

## 5. Componentes

### 5.1 Button

| Variante | Background | Border | Texto |
|----------|------------|--------|-------|
| Primary | `#006b5f` | none | `#ffffff` |
| Primary Pressed | `#00423b` | none | `#ffffff` |
| Secondary | `#f2f4f6` | none | `#191c1e` |
| Secondary Pressed | `#e6e8ea` | none | `#191c1e` |
| Outline | transparent | 1.5px `#006b5f` | `#006b5f` |
| Ghost | transparent | none | `#006b5f` |
| Disabled | `#e6e8ea` | none | `#9ca3af` |

**Props**:
- Height: 48px (minimo)
- Padding: 16px horizontal
- Radius: 8px (12px para primary)
- Font: Label (14px, 600)

**Estados** (Web Guidelines):
- `:hover`: Brightness 110%
- `:active`: Scale 0.98
- `:focus-visible`: Ring 2px primary

### 5.2 Input

| Estado | Border | Background |
|--------|--------|-----------|
| Default | 1px `#cbd5e1` | `#ffffff` |
| Focus | 2px `#006b5f` | `#ffffff` |
| Error | 2px `#dc2626` | `#fef2f2` |
| Disabled | 1px `#e6e8ea` | `#f9fafb` |

**Props**:
- Height: 48px
- Padding: 16px
- Radius: 8px
- Font: Body (16px)
- Label: Caption (12px), uppercase

**Accesibilidad** (Web Guidelines):
- `autocomplete` segun tipo
- `inputmode` sesuai
- Label clickeable

### 5.3 Card

| Prop | Mobile | Desktop |
|------|--------|--------|
| Background | `#ffffff` | `#ffffff` |
| Padding | 16px | 24px |
| Radius | 12px | 16px |
| Shadow | `0 2px 8px rgba(0,0,0,0.04)` | `0 4px 16px rgba(0,0,0,0.06)` |

### 5.4 Badge / Chip

| Variante | Background | Texto |
|---------|-----------|-------|
| Primary | `#d1fae5` | `#006b5f` |
| Success | `#dcfce7` | `#16a34a` |
| Warning | `#fef3c7` | `#d97706` |
| Error | `#fee2e2` | `#dc2626` |
| Info | `#dbeafe` | `#2563eb` |

**Props**:
- Height: 24px (badge), 32px (chip)
- Padding: 0 8px
- Radius: 9999px (full)

### 5.5 Avatar

| Size | Dimension |
|------|-----------|
| xs | 24px |
| sm | 32px |
| md | 40px |
| lg | 56px |
| xl | 80px |

Shape: Circle (default)

### 5.6 Header (App)

- Height: 56px (mobile), 64px (desktop)
- Background: `#ffffff`
- Border: 1px `#e6e8ea`
- Shadow: `0 1px 3px rgba(0,0,0,0.04)`

### 5.7 Bottom Navigation (App)

- Height: 64px
- Background: `#ffffff`
- Icon: 24px
- Label: 12px
- Active: Color primary `#006b5f`
- Inactive: Color `#6b7280`

### 5.8 Sidebar (Web Admin)

- Width: 240px (expandido), 64px (colapsado)
- Background: `#191c1e` (dark)
- Item Height: 44px
- Icon: 20px
- Active: Background `#1f2937`

### 5.9 List Item

- Height: 56px (minimo)
- Padding: 16px horizontal
- Divider: 1px `#e6e8ea` (excepto ultimo)

### 5.10 Toast / Alert

| Tipo | Borde Izq | Background |
|------|-----------|------------|
| Success | 4px `#16a34a` | `#f0fdf4` |
| Warning | 4px `#d97706` | `#fffbeb` |
| Error | 4px `#dc2626` | `#fef2f2` |
| Info | 4px `#2563eb` | `#eff6ff` |

Position: Top (web) / Bottom (app)
Radius: 12px
Padding: 16px

---

## 6. Forms

### 6.1 Validacion (Web Guidelines)

| Campo | Regla | Feedback |
|-------|-------|---------|
| Requerido | No vacio | Label con * |
| Email | Formato valido | Helper text con ejemplo |
| Password | Minimo 6 chars | Helper text |
| Match | password == confirm | Error inline |

### 6.2 Errores

- inline al lado del campo
- Focus en primer error al submit
- No block paste

---

## 7. Accessibility (Web Guidelines)

### 7.1 Requisitos

- [ ] Icon buttons: `aria-label`
- [ ] Form controls: `<label>` o `aria-label`
- [ ] Botones: `<button>` (no `<div onClick>`)
- [ ] Links: `<a>` o `<Link>` (no div)
- [ ] Images: `alt` (o `alt=""` decorativo)
- [ ] Decorative icons: `aria-hidden="true"`
- [ ] Async updates: `aria-live="polite"`
- [ ] Focus visible: `focus-visible:ring`

### 7.2 Focus States

- Never `outline: none` sin reemplazo
- Usar `:focus-visible` sobre `:focus`
- Grupo focus con `:focus-within`

### 7.3 Navigation & State

- URL refleja estado (filtros, tabs)
- Deep-link todo estado con `useState`

---

## 8. Animations

### 8.1 Transiciones

- Duration: 150ms (fast), 300ms (medium)
- Easing: ease-in-out

### 8.2 Propiedades

Solo `transform` y `opacity` (compositor-friendly)

### 8.3 Reduced Motion

Honor `prefers-reduced-motion`

---

## 9. Mapas (Driver)

### 9.1 Colores de Estado

| Estado | Marker | Line |
|--------|--------|------|
| En ruta | `#006b5f` (pulsing) | `#4fdbc8` 40% |
| Parqueado | `#6b7280` | none |
| Completado | `#16a34a` | `#16a34a` |

### 9.2 Componentes

- Vehicle marker: 32px, animacion pulsing
- Stop marker: 24px
- Route line: 4px dashed

---

## 10. Quick Reference

### Colores
```
Primary: #006b5f
Secondary: #515f74  
Background: #f7f9fb
Surface: #ffffff
Text: #191c1e
Text Secondary: #6b7280
Success: #16a34a
Warning: #d97706
Error: #dc2626
```

### Tamaños
```
Button: 48px height
Input: 48px height
Card padding: 16px mobile / 24px desktop
Radius: 8px (buttons), 12px (cards)
Header: 56px / 64px
Bottom Nav: 64px
Sidebar: 240px
```

### Breakpoints
```
Mobile: < 480px
Tablet: 768px - 1023px
Desktop: 1024px+
```

---

## 11. Notas de Implementacion

### 11.1 React Native

Usar estos valores en StyleSheet:
```typescript
const colors = {
  primary: '#006b5f',
  secondary: '#515f74',
  background: '#f7f9fb',
  surface: '#ffffff',
  text: '#191c1e',
  textSecondary: '#6b7280',
  success: '#16a34a',
  warning: '#d97706',
  error: '#dc2626',
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
```

### 11.2 Web

CSS Variables:
```css
:root {
  --color-primary: #006b5f;
  --color-secondary: #515f74;
  --color-background: #f7f9fb;
  --color-surface: #ffffff;
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
}
```