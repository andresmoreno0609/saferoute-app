# Componentes Base - SafeRoute

Este documento define la estructura base de todos los componentes para mantener consistencia.

---

## 1. Layout Base

### Mobile App
```
┌─────────────────────────────────────┐
│ Header (56px)                       │
├─────────────────────────────────────┤
│                                     │
│ Content (flex: 1, scroll)            │
│                                     │
├─────────────────────────────────────┤
│ Bottom Nav (64px) - optional        │
└─────────────────────────────────────┘

- Width: 100%
- Max-width: 480px (centered if larger)
- Padding: 16px / 20px / 24px
```

### Web Desktop
```
┌─────────────────────────────────────────────────┐
│ Header (64px)                                    │
├──────────────┬──────────────────────────────────┤
│ Sidebar     │ Content                           │
│ 240px      │ max-width: 960px                 │
│             │ centered                          │
│             │                                   │
└──────────────┴──────────────────────────────────┘
```

---

## 2. Components Structure

### 2.1 Button

| Prop | Mobile | Desktop | Required |
|------|--------|---------|-----------|
| height | 40px | 44px | Yes |
| min-width | 88px | 96px | - |
| padding | 12px 20px | 12px 24px | - |
| radius | 8px | 12px | - |
| font-size | 16px | 16px | Yes |

**States:**
- Default
- Hover: brightness 110%
- Active: scale 0.98
- Disabled: opacity 0.5, cursor not-allowed
- Loading: spinner + disabled

**Types:**
- Primary (filled)
- Secondary
- Outline
- Ghost

### 2.2 Input

| Prop | Mobile | Desktop |
|------|--------|---------|
| height | 44px | 48px |
| padding | 12px 16px | 14px 20px |
| radius | 8px | 12px |
| font-size | 16px | 16px |
| border | 1.5px | 2px |

**States:**
- Default: border-outline
- Focus: border-primary, ring-2
- Error: border-error
- Disabled: bg-gray-100

### 2.3 Card

| Prop | Mobile | Desktop |
|------|--------|---------|
| width | 100% | max 400px |
| padding | 16px | 24px |
| radius | 12px | 16px |
| shadow | 0 2px 8px | 0 4px 16px |

### 2.4 Header (App)

```
height: 56px (mobile) / 64px (desktop)
padding: 0 16px / 0 24px

Elements:
├── Left: Back arrow / Menu (icon 24px)
├── Center: Title (h3)
└── Right: Actions (icons 24px)
```

### 2.5 Bottom Navigation (App)

```
height: 64px
icon: 24px
label: 12px
items: 4-5

Structure:
┌─────────────────────────────────────┐
│ [Icon] [Icon] [Icon] [Icon]       │
│ [Label] [Label] [Label] [Label]  │
└─────────────────────────────────────┘
```

### 2.6 Sidebar (Web)

```
width: 240px (expanded) / 64px (collapsed)
item-height: 44px
icon: 20px

Structure:
┌──────────────────┐
│ Logo            │
├──────────────────┤
│ Nav Item        │
│ Nav Item        │
│ Nav Item        │
├──────────────────┤
│ User / Settings │
└──────────────────┘
```

---

## 3. Form Elements

### 3.1 Text Input
```
┌─────────────────────────────────────┐
│ LABEL (caption, uppercase)         │
├─────────────────────────────────────┤
│ [Icon] Input Field                 │
├─────────────────────────────────────┤
│ Helper Text (optional, gray)        │
│ Error Text (optional, red)          │
└─────────────────────────────────────┘
```

### 3.2 Selector / Dropdown
```
Height: 44px (mobile) / 48px (desktop)
Icon: chevron_down, 20px
```

### 3.3 Checkbox
```
Size: 24px (mobile) / 28px (desktop)
Touch target: 44px (mobile)
```

### 3.4 Radio Button
```
Size: 24px
Touch target: 44px
```

### 3.5 Toggle / Switch
```
Width: 52px
Height: 28px
Thumb: 24px
```

---

## 4. Lists

### 4.1 List Item
```
Height: 56px (mobile) / 64px (desktop)
Padding: 16px horizontal
Avatar: 40px (mobile) / 48px (desktop)

Structure:
┌─────────────────────────────────────┐
│ [Avatar] Title          [Chevron]  │
│         Subtitle                    │
└─────────────────────────────────────┘
```

### 4.2 Swipe Action
```
Background: red (delete), blue (edit)
Width: 80px per action
```

---

## 5. Feedback Components

### 5.1 Banner / Alert
```
Height: auto (min 56px)
Padding: 12px 16px
Radius: 8px / 12px

Types:
- Info: bg-blue-50, icon-info
- Success: bg-green-50, icon-check
- Warning: bg-yellow-50, icon-warning
- Error: bg-red-50, icon-error
```

### 5.2 Toast
```
Position: bottom-center or top-center
Width: max 360px
Height: auto
Duration: 3-5 seconds

Animation: slide + fade
```

### 5.3 Loading Spinner
```
Size: 24px (inline), 48px (fullscreen)
Color: primary or gray-400
```

### 5.4 Skeleton
```
Background: gray-200
Animation: pulse (1.5s infinite)
Radius: match component
```

### 5.5 Empty State
```
Icon: 64px
Title: h3
Description: body-sm, gray-500
Action: button
```

---

## 6. Navigation

### 6.1 Tab Bar (Bottom)
```
Mobile only
Height: 64px
Items: 3-5

Active: icon + label, color-primary
Inactive: icon + label, color-gray-500
```

### 6.2 Breadcrumb
```
Separator: chevron_right, 16px
Font: body-sm
Current: color-gray-900, bold
```

### 6.3 Pagination
```
Button size: 32px (mobile) / 36px (desktop)
Arrows + numbers
```

---

## 7. Data Display

### 7.1 Badge
```
Height: 20px (small), 24px (medium)
Padding: 0 8px
Font: 12px
Radius: full

Colors:
- Primary: bg-primary-100, text-primary
- Success: bg-green-100, text-green
- Warning: bg-yellow-100, text-yellow
- Error: bg-red-100, text-red
```

### 7.2 Avatar
```
Sizes:
- xs: 24px
- sm: 32px
- md: 40px
- lg: 56px
- xl: 80px

Shape: circle (default), rounded (optional)
Fallback: initials
```

### 7.3 Chip / Tag
```
Height: 28px (small), 32px (medium)
Padding: 0 12px
Radius: full or 8px
```

### 7.4 Progress Bar
```
Height: 4px (small), 8px (medium)
Radius: full
Background: gray-200
Fill: primary
```

### 7.5 Divider
```
Margin: 16px 0
Color: gray-200
Thickness: 1px
```

---

## 8. Modal / Dialog

### 8.1 Bottom Sheet (Mobile)
```
Width: 100%
Radius: 16px (top corners)
Handle: 32px x 4px, centered
Backdrop: rgba(0,0,0,0.5)
```

### 8.2 Modal (Web)
```
Width: 400px (small), 560px (medium), 720px (large)
Max-height: 90vh
Radius: 16px
Backdrop: rgba(0,0,0,0.5)
```

### 8.3 Confirm Dialog
```
Width: 320px
Buttons: 2 (cancel, confirm)
Confirm: destructive (red) if danger
```

---

## 9. Maps (Specific)

### 9.1 Map Container
```
Height: 200px (small), 300px (medium), 50vh (large)
Radius: 12px / 16px
```

### 9.2 Map Marker
```
Size: 32px (default), 40px (selected)
Icon: vehicle, stop, student
```

### 9.3 Map Controls
```
Position: top-right or bottom-right
Button size: 40px
Spacing: 8px between
```

---

## 10. Touch Targets (Mobile Critical)

| Element | Min Size |
|---------|----------|
| Button | 44x44px |
| Icon Button | 44x44px |
| List Item | 48px height |
| Checkbox | 44x44px |
| Radio | 44x44px |
| Link | 44x44px (padding) |

---

## 11. Spacing System

| Token | Value |
|-------|--------|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |
| 3xl | 64px |

---

## 12. Responsive Breakpoints

```
Mobile: 320px - 479px
Mobile Large: 480px+
Tablet: 768px - 1023px
Desktop: 1024px+
Desktop Large: 1440px+
```

---

## Quick Reference

| Component | Mobile | Desktop |
|-----------|--------|---------|
| Page max-width | 100% | 1280px |
| Header | 56px | 64px |
| Button height | 40px | 44px |
| Input height | 44px | 48px |
| Card padding | 16px | 24px |
| Bottom nav | 64px | N/A |
| Sidebar | N/A | 240px |
| Touch target | 44px min | N/A |