# SafeRoute - Design Specifications

## 1. Viewports

### Mobile (App)
| Viewport | Width | Breakpoint |
|----------|-------|------------|
| Mobile Small | 320px | - 379px |
| Mobile | 380px | 380px - 479px |
| Mobile Large | 480px | 480px+ |

### Tablet
| Viewport | Width | Breakpoint |
|----------|-------|------------|
| Tablet | 768px | 768px - 1023px |
| Tablet Large | 1024px | 1024px+ |

### Desktop (Web)
| Viewport | Width | Breakpoint |
|----------|-------|------------|
| Desktop Small | 1024px | 1024px - 1279px |
| Desktop | 1280px | 1280px - 1535px |
| Desktop Large | 1536px | 1536px+ |

---

## 2. Layout Structure

### App (Mobile-first)
```
┌─────────────────────────────────────┐  100% width
│ Header Fixed                       │  56px height
├─────────────────────────────────────┤
│                                     │
│ Content Scroll                    │  flex: 1
│                                     │
├─────────────────────────────────────┤
│ Bottom Navigation (if tab)       │  64px height
└─────────────────────────────────────┘
```

### Web (Desktop)
```
┌─────────────────────────────────────┐  max-width: 1280px, centered
│ Header Fixed                       │  64px height
├─────────────────────────────────────┤
│ Sidebar     │   Main Content        │
│ 240px      │   flex: 1            │
│ (collaps)  │   max-width: 960px   │
│            │   centered          │
├─────────────────────────────────────┤
│ Footer (if needed)                │  80px
└─────────────────────────────────────┘
```

---

## 3. Spacing Scale

| Token | Mobile | Tablet | Desktop | Usage |
|-------|--------|--------|--------|-------|
| xs | 4px | 4px | 4px | icons, badges |
| sm | 8px | 8px | 8px | form fields |
| md | 12px | 16px | 16px | cards |
| lg | 16px | 24px | 24px | sections |
| xl | 20px | 32px | 32px | margins |
| 2xl | 24px | 40px | 40px | page sections |
| 3xl | 32px | 48px | 48px | hero |
| 4xl | 40px | 64px | 64px | page dividers |

---

## 4. Typography Scale

| Token | Mobile | Tablet | Desktop | Line Height |
|-------|--------|--------|--------|------------|
| xs | 12px | 12px | 12px | 16px |
| sm | 14px | 14px | 14px | 20px |
| base | 16px | 16px | 16px | 24px |
| lg | 18px | 18px | 20px | 28px |
| xl | 20px | 20px | 24px | 28px |
| 2xl | 24px | 24px | 30px | 36px |
| 3xl | 28px | 30px | 36px | 44px |
| 4xl | 32px | 36px | 48px | 52px |

Font Family: System default (SF Pro on iOS, Roboto on Android, Inter on Web)

---

## 5. Component Sizes

### Button
| Size | Height | Font | Padding | Mobile | Desktop |
|------|--------|------|--------|--------|--------|
| sm | 32px | 14px | 12px 16px | 32px | 36px |
| md | 40px | 16px | 12px 20px | 40px | 44px |
| lg | 48px | 18px | 14px 24px | 48px | 52px |

### Input
| Height | Font | Mobile | Desktop |
|--------|------|--------|---------|
| 44px | 16px | 44px | 48px |

### Card
| Mobile | Desktop |
|--------|---------|
| width: 100% | max-width: 400px |
| padding: 16px | padding: 24px |
| radius: 12px | radius: 16px |

### Avatar
| Size | Mobile | Desktop |
|------|--------|---------|
| sm | 24px | 28px |
| md | 40px | 44px |
| lg | 56px | 64px |
| xl | 80px | 96px |

### Bottom Navigation (App)
```
height: 64px
icon: 24px
label: 10px
```

### Sidebar (Web)
```
width: 240px (collapsed: 64px)
item height: 44px
icon: 20px
```

---

## 6. Breakpoints Reference

### Mobile First
```css
/* Base (mobile) */
container: 100%

/* sm */
@media (min-width: 380px) { }

/* md (tablet) */
@media (min-width: 768px) { }

/* lg (desktop) */
@media (min-width: 1024px) { }

/* xl (large desktop) */
@media (min-width: 1280px) { }
```

### Mobile App Specific
```javascript
// iPhone standard: 375 x 812
// iPhone Plus: 414 x 896
// iPhone Pro Max: 428 x 926

// Safe Area
// notch top: 44px (iPhone)
// home indicator bottom: 34px (iPhone X+)
```

---

## 7. Grid System

### Mobile
- Columns: 4
- Gutter: 16px

### Tablet
- Columns: 8
- Gutter: 24px

### Desktop
- Columns: 12
- Gutter: 24px

---

## 8. Touch Targets (App)

| Size | Minimum | Recommended |
|------|---------|--------------|
| Button | 44x44px | 48x48px |
| List Item | 48px height | 56px |
| Icon Button | 44x44px | 48x48px |
| Checkbox | 24x24px | 28x28px |

---

## 9. Responsive Patterns

### Card Grid
```
Mobile: 1 column
Tablet: 2 columns
Desktop: 3-4 columns
```

### Form Layout
```
Mobile: 1 column, full width
Tablet: 2 column (labels left, fields right)
Desktop: 2 column (labels left, fields right)
```

### Navigation
```
Mobile: Bottom tab bar
Tablet: Bottom tab bar (larger)
Desktop: Left sidebar
```

---

## 10. Quick Reference Card

| Element | Mobile | Desktop |
|---------|--------|---------|
| Page width | 100% | max 1280px centered |
| Header height | 56px | 64px |
| Content max | 100% | 960px |
| Sidebar | N/A | 240px |
| Card max width | 100% | 400px |
| Button min height | 40px | 44px |
| Input height | 44px | 48px |
| Bottom nav | 64px | N/A |
| Touch target min | 44px | N/A |
| Typography base | 16px | 16px |
| Spacing unit | 4px | 4px |