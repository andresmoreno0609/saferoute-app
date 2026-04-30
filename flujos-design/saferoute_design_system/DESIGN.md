---
name: SafeRoute Design System
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#006a61'
  on-secondary: '#ffffff'
  secondary-container: '#86f2e4'
  on-secondary-container: '#006f66'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#0d1c2f'
  on-tertiary-container: '#76859b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#89f5e7'
  secondary-fixed-dim: '#6bd8cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#d5e3fd'
  tertiary-fixed-dim: '#b9c7e0'
  on-tertiary-fixed: '#0d1c2f'
  on-tertiary-fixed-variant: '#3a485c'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: '0'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  container-padding: 20px
  gutter: 16px
---

## Brand & Style

The brand personality of the design system is anchored in reliability, vigilance, and composure. It is designed to feel like a "silent co-pilot"—present when needed but never distracting. The target audience of drivers and parents requires a UI that balances the authority of a safety tool with the approachability of a family-oriented service.

The design style is **Modern Corporate**. It avoids unnecessary ornamentation to prioritize information density and clarity. By utilizing generous white space and a restricted color palette, the design system ensures that critical safety alerts and navigation data are processed instantly, even in high-stress or outdoor environments.

## Colors

The color strategy focuses on high-contrast pairings to ensure legibility under direct sunlight. The primary color is a **Deep Navy**, used for core branding and primary text to establish a foundation of trust and authority. The accent color is a **Vibrant Teal**, reserved exclusively for primary actions and "active" states, providing a clear visual signal that cuts through the neutral background.

Backgrounds utilize a tiered system of **Soft Grays** to separate content areas without the use of harsh lines. Functional colors for success and error states are slightly desaturated to maintain the professional aesthetic while remaining globally recognizable for safety alerts.

## Typography

This design system utilizes **Inter** for all typographic needs. Inter’s tall x-height and neutral character make it ideal for the high-legibility requirements of a transport app. 

Hierarchy is established through weight and scale rather than color shifts. Headings use a tighter letter-spacing and heavier weights to appear grounded. Body text is set with generous line heights to prevent "visual crowding," ensuring that parents can read updates quickly and drivers can glance at information safely.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** model with a base-8 rhythmic scale. This ensures consistency across mobile and tablet devices, which are common in vehicle mounts and home environments. 

Margins are intentionally wide (20px minimum) to create a protective "frame" around content, preventing it from feeling cramped. Elements within cards or modules should use a 24px internal padding to maintain the minimalist aesthetic and emphasize the importance of the content.

## Elevation & Depth

Depth in the design system is conveyed through **Ambient Shadows** and **Tonal Layering**. Instead of heavy borders, surfaces are differentiated by their "elevation" above the soft gray background.

- **Level 0 (Floor):** The main application background (#F8FAFC).
- **Level 1 (Card):** White surfaces with a very soft, diffused shadow (0px 4px 20px rgba(0,0,0,0.04)).
- **Level 2 (Overlay):** Used for modals or critical alerts, featuring a more defined shadow to pull the element forward.

This approach creates a sense of physical stacks, helping users understand which information is most relevant at any given moment.

## Shapes

The design system employs **Medium Rounded Corners** to soften the professional aesthetic, making it feel more approachable for families. A consistent 8px (0.5rem) radius is applied to standard components like input fields and buttons. Larger containers, such as dashboard cards, utilize a 16px (1rem) radius to emphasize their role as distinct content "buckets."

## Components

### Buttons
Primary buttons use the Vibrant Teal background with white text for maximum contrast. Secondary buttons use a Deep Navy outline with a transparent fill. Button height is standardized at 48px to ensure they are easy "tap targets" for drivers.

### Input Fields
Forms must be highly accessible. Use a 1px border (#CBD5E1) that thickens and changes to the primary blue on focus. Labels always remain visible above the field (never just placeholder text) to ensure context is never lost during data entry.

### Cards
Cards are the primary organizational unit. They feature a white background, the 1rem corner radius, and a subtle ambient shadow. Use cards to group related safety data, such as "Vehicle Status" or "Driver Behavior."

### Status Indicators
Safety icons and status chips use high-contrast combinations. A "Safe" status uses a soft green background with a dark green icon, while "Alerts" use a high-visibility red or amber.

### Lists
Lists are designed with ample vertical padding (16px) and subtle dividers to ensure each item is distinct, preventing accidental taps on the wrong row.