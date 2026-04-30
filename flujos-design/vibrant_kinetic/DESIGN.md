---
name: Vibrant Kinetic
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
  on-surface-variant: '#3c4947'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#6c7a77'
  outline-variant: '#bbcac6'
  surface-tint: '#006b5f'
  primary: '#006b5f'
  on-primary: '#ffffff'
  primary-container: '#14b8a6'
  on-primary-container: '#00423b'
  inverse-primary: '#4fdbc8'
  secondary: '#515f74'
  on-secondary: '#ffffff'
  secondary-container: '#d5e3fc'
  on-secondary-container: '#57657a'
  tertiary: '#006591'
  on-tertiary: '#ffffff'
  tertiary-container: '#27aef3'
  on-tertiary-container: '#003e5c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#71f8e4'
  primary-fixed-dim: '#4fdbc8'
  on-primary-fixed: '#00201c'
  on-primary-fixed-variant: '#005048'
  secondary-fixed: '#d5e3fc'
  secondary-fixed-dim: '#b9c7df'
  on-secondary-fixed: '#0d1c2e'
  on-secondary-fixed-variant: '#3a485b'
  tertiary-fixed: '#c9e6ff'
  tertiary-fixed-dim: '#89ceff'
  on-tertiary-fixed: '#001e2f'
  on-tertiary-fixed-variant: '#004c6e'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin: 20px
---

## Brand & Style
The design system is built on a foundation of "Active Reliability." It bridges the gap between the serious nature of child safety and the energetic pace of daily commutes. The style is **Modern Corporate with a Kinetic Edge**, utilizing fluid transitions and a clean, optimistic aesthetic to reduce parental anxiety and increase driver focus. 

The visual language balances high-energy accents with a structured layout to ensure that critical information—like real-time locations or ETA changes—is processed instantly. We utilize a "Soft-Tech" approach: precise enough for data-heavy maps, but warm enough for a family-oriented service.

## Colors
The palette is dominated by **Vibrant Teal**, used for primary actions and "active state" indicators to signal safety and progress. **Slate Blue** serves as the secondary anchor, providing a grounded, professional contrast for navigation and secondary controls. 

To add depth and energy, subtle gradients are applied to primary buttons and status headers, moving from Teal to a slightly deeper Cyan. This prevents the UI from feeling "flat" and adds a premium, modern touch. Warning states should use a warm Amber, while Success states leverage the primary Teal to maintain a cohesive brand feel.

## Typography
This design system relies exclusively on **Inter** to ensure maximum legibility across different screen sizes and lighting conditions (critical for drivers). We use a tight tracking (-0.02em) on larger headings to give the UI a modern, "app-centric" feel. 

Hierarchy is established primarily through weight rather than size alone. Labels and interactive elements use Medium or Semi-Bold weights to stand out against the soft background, while body text remains Regular for long-form readability.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a 12-column structure for desktop and a 4-column structure for mobile. We use an 8px-based spatial system, but incorporate a 12px "safety" unit for internal component padding to match our corner radius.

Spacing is generous to prevent accidental taps (fat-finger errors) while driving. Large margins (20px-24px) are used on the edges of the screen to ensure content does not feel cramped on modern edge-to-edge mobile displays.

## Elevation & Depth
Depth is created through **Tonal Layers** and **Ambient Shadows**. We avoid heavy blacks in shadows, opting instead for a soft, diffused Slate Blue tint (#475569 at 8-12% opacity). 

- **Surface 0:** The main background (Neutral #F8FAFC).
- **Surface 1:** Elevated cards and containers with a white fill and a subtle 4px blur shadow.
- **Surface 2:** Active floating elements (like a "Current Location" button) with a 12px blur shadow.
- **Backdrop:** Map views and inactive overlays use a subtle 4px backdrop blur to maintain context while focusing user attention on the primary task.

## Shapes
The defining characteristic of this design system is the consistent **12px (0.75rem) corner radius**. This applies to all primary containers, buttons, and input fields. This "Rounded" approach softens the technical nature of the routing software and makes the interface feel more approachable for parents. Small elements like tags or badges use a fully "Pill-shaped" radius to differentiate them from actionable containers.

## Components
- **Buttons:** Primary buttons use the Teal-to-Cyan gradient with white text. Secondary buttons use a Slate Blue outline with 1.5px border width. All buttons have a minimum height of 48px for driver accessibility.
- **Cards:** Use a white background, 12px corner radius, and a subtle Slate Blue shadow. Content within cards should follow the 16px internal padding rule.
- **Input Fields:** Use a light Slate Gray border (#E2E8F0) that transforms into a 2px Teal border on focus.
- **Chips/Status Tags:** Utilize high-saturation background tints (e.g., light Teal background with dark Teal text) to indicate "On Time" or "Arrived" status at a glance.
- **Live Tracker:** A specialized component featuring a pulsing Teal dot for the vehicle location and a "pathway" line in Slate Blue with 40% opacity.
- **Parental Alerts:** Top-anchored "Toast" notifications with a 12px radius and a left-accent border in the color corresponding to the alert's urgency.