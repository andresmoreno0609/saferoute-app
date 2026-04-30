---
name: SafeRoute Precision
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
  on-surface-variant: '#434656'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737688'
  outline-variant: '#c3c5d9'
  surface-tint: '#004dea'
  primary: '#0041c8'
  on-primary: '#ffffff'
  primary-container: '#0055ff'
  on-primary-container: '#e3e6ff'
  inverse-primary: '#b6c4ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#415166'
  on-tertiary: '#ffffff'
  tertiary-container: '#596980'
  on-tertiary-container: '#dbe9ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b3'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  container-margin: 24px
  gutter: 16px
---

## Brand & Style

The design system is rooted in **Ultra-Minimalism**, prioritizing cognitive clarity and rapid information processing for users navigating safety-critical environments. The brand personality is clinical, disciplined, and dependable. By stripping away ornamental layers and maximizing whitespace, the UI reduces "visual noise," allowing users to focus entirely on their route and safety data.

The aesthetic utilizes a monochromatic slate foundation to establish a calm, institutional atmosphere. This neutrality is punctured only by a singular "Precision Blue" used for critical actions, ensuring that user intent is always met with high-contrast visual cues. The emotional response is one of controlled confidence and absolute structural integrity.

## Colors

This design system employs a **Monochromatic Slate** palette to define the interface structure, with a single functional accent.

- **Primary (Precision Blue):** Reserved exclusively for primary Call-to-Actions (CTAs), active toggles, and critical wayfinding markers.
- **Secondary (Deep Slate):** Used for primary headings and high-priority text to ensure maximum legibility.
- **Neutral (Cloud & Frost):** A range of very light slates used for backgrounds and subtle section differentiation.
- **Borders:** A consistent, thin slate used to define boundaries without adding weight.

The background remains predominantly white (#FFFFFF) to provide the "high whitespace" feel requested, using #F8FAFC only for subtle grouping containers.

## Typography

The typography strategy focuses on a "Utility-First" hierarchy. **Manrope** is used for headlines to provide a modern, slightly geometric feel that remains professional and trustworthy. **Inter** is utilized for all functional text, body copy, and UI labels due to its exceptional readability at small sizes and neutral, systematic character.

Generous line-heights are maintained to prevent text density, ensuring that safety instructions and data points are easily scannable at a glance. Labels use an uppercase treatment with slight letter-spacing to distinguish them from interactive body text.

## Layout & Spacing

This design system utilizes a **Fixed Grid** model for desktop and a **Fluid Content** model for mobile. All spacing is derived from a 4px baseline grid to ensure mathematical harmony with the 4px corner radii.

Layouts should prioritize "High Whitespace" by using the `xl` (64px) spacing unit between major content blocks. This intentional emptiness guides the eye and prevents the user from feeling overwhelmed by data. Margins are generous, ensuring that content never feels crowded against the edge of the viewport.

## Elevation & Depth

To maintain the ultra-minimalist aesthetic, this design system rejects traditional drop shadows. Instead, it utilizes **Low-Contrast Outlines** and **Tonal Layering**.

- **Depth:** Content is separated by 1px solid borders in a light slate (#E2E8F0).
- **Surface:** When an element needs to feel "above" the background (like a modal or a floating card), it uses a slightly different background tint (#F8FAFC) combined with a crisp 1px border.
- **Focus:** Active states do not "lift" off the page; they are highlighted using the primary Precision Blue border or a subtle neutral fill change.

## Shapes

The shape language is defined by **Sharp 4px corners**. This specific radius provides a "technical" and "architectural" feel—it is softer than a raw 90-degree angle but significantly more disciplined than a standard rounded UI. 

All buttons, input fields, cards, and modal windows must strictly adhere to this 4px radius. No "pill" shapes are permitted, as they conflict with the sharp, minimalist narrative of the system.

## Components

- **Buttons:** Primary buttons are solid "Precision Blue" with white text. Secondary buttons use a 1px slate border with slate text. All buttons use the 4px corner radius and 16px horizontal padding.
- **Inputs:** Text fields are defined by a 1px slate border. On focus, the border transitions to Precision Blue. Placeholder text uses a light slate (#94A3B8).
- **Cards:** Cards are flat with a 1px border (#E2E8F0). No shadows. Padding inside cards should be generous (24px or 32px) to maintain the minimalist feel.
- **Chips/Status:** Status indicators for "Safe" or "Hazard" use minimal fills (light green or light red) with high-contrast text. They maintain the 4px corner radius.
- **Lists:** Items are separated by a 1px horizontal rule. High vertical padding (16px) is used to ensure touch targets are clear and the layout remains airy.
- **Progress Indicators:** Thin 2px or 4px lines. The "filled" portion uses Precision Blue, while the track uses a light neutral slate.