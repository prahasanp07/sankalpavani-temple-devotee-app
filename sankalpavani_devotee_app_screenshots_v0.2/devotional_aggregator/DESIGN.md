---
name: Dravidian Elegance
colors:
  surface: '#0c1322'
  surface-dim: '#0c1322'
  surface-bright: '#323949'
  surface-container-lowest: '#070e1d'
  surface-container-low: '#141b2b'
  surface-container: '#191f2f'
  surface-container-high: '#232a3a'
  surface-container-highest: '#2e3545'
  on-surface: '#dce2f7'
  on-surface-variant: '#d2c4b4'
  inverse-surface: '#dce2f7'
  inverse-on-surface: '#293040'
  outline: '#9b8f80'
  outline-variant: '#4e4539'
  surface-tint: '#edbf79'
  primary: '#facb84'
  on-primary: '#432c00'
  primary-container: '#dcb06b'
  on-primary-container: '#614205'
  inverse-primary: '#7a581c'
  secondary: '#f2be72'
  on-secondary: '#442b00'
  secondary-container: '#684400'
  on-secondary-container: '#e6b369'
  tertiary: '#b9d5ff'
  on-tertiary: '#0e3157'
  tertiary-container: '#9bb9e6'
  on-tertiary-container: '#2a4970'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdeae'
  primary-fixed-dim: '#edbf79'
  on-primary-fixed: '#281900'
  on-primary-fixed-variant: '#604104'
  secondary-fixed: '#ffddb1'
  secondary-fixed-dim: '#f2be72'
  on-secondary-fixed: '#291800'
  on-secondary-fixed-variant: '#624000'
  tertiary-fixed: '#d4e3ff'
  tertiary-fixed-dim: '#aac8f6'
  on-tertiary-fixed: '#001c39'
  on-tertiary-fixed-variant: '#29486f'
  background: '#0c1322'
  on-background: '#dce2f7'
  surface-variant: '#2e3545'
  navy-bg: '#111827'
  navy-surface: '#1f2937'
  gold-primary: '#dcb06b'
  gold-secondary: '#b88a44'
  white-muted: rgba(255, 255, 255, 0.7)
  border-subtle: rgba(255, 255, 255, 0.1)
typography:
  display-vertical:
    fontFamily: Oswald
    fontSize: 20px
    fontWeight: '700'
    lineHeight: normal
    letterSpacing: 0.15em
  headline-lg:
    fontFamily: Oswald
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Oswald
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Oswald
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  margin-main: 24px
  stack-lg: 48px
  stack-md: 32px
  stack-sm: 16px
  section-gap: 40px
  gutter-grid: 16px
---

## Brand & Style
The brand identity is rooted in "Modern Spiritualism"—a blend of traditional Indian heritage and premium, contemporary interface design. It targets a global audience seeking religious connection through a sophisticated, cinematic lens. 

The visual style is **High-Contrast / Modern Dark Mode**, utilizing deep "Navy-Bg" tones to evoke the sanctity of a temple at night, punctuated by "Gold-Primary" accents that mimic metallic temple icons and the glow of oil lamps. The aesthetic is editorial and majestic, using large-scale photography and vertical typography to create a sense of architectural scale and reverence.

## Colors
The palette is dominated by a deep, monochromatic dark base to ensure the spiritual imagery and golden accents remain the focal point.

- **Navy-Bg (#111827):** The primary canvas, providing a sense of depth and focus.
- **Navy-Surface (#1f2937):** Used for cards and secondary containers to provide subtle separation from the background.
- **Gold-Primary (#dcb06b):** Reserved for high-importance actions, icons, and branding elements. It signifies value and divinity.
- **White/Neutral:** Typography uses high-purity white for titles and a 70-80% opacity variant for body text to maintain hierarchy without visual fatigue.

## Typography
The system uses a high-contrast pairing of **Oswald** and **Inter**. 

- **Oswald (Display/Headlines):** Used for all structural titles, price points, and key identifiers. Its condensed nature allows for impactful, large-scale uppercase text that mimics stone inscriptions.
- **Inter (Body/Labels):** Used for all long-form content and UI labels to ensure maximum legibility against the dark background.
- **Vertical Orientation:** Key branding or location names are occasionally set vertically with high letter spacing to emphasize architectural height.

## Layout & Spacing
The layout follows a **Fluid Grid** with generous vertical breathing room. 

- **Vertical Rhythm:** Sections are separated by large gaps (40px+) to maintain an editorial feel.
- **Safe Margins:** A standard 24px horizontal margin is applied to all main content containers.
- **Horizontal Scrolling:** For service or "Seva" cards, use a snap-aligned horizontal carousel that bleeds into the margins to indicate more content.
- **Fixed Elements:** Key transactional actions (Booking) are pinned to the bottom of the viewport with a blurred or solid background.

## Elevation & Depth
In this dark theme, depth is communicated through **Tonal Layering** and **Subtle Outlines** rather than heavy shadows.

- **Base Layer:** Navy-Bg (#111827).
- **Secondary Layer:** Navy-Surface (#1f2937) is used for interactive cards, with a 1px border at 10% white opacity to define edges.
- **Gradients:** Use linear gradients (Navy-Bg to transparent) over full-width images to ensure text legibility while creating a seamless transition from media to content.
- **Overlays:** Navigation and utility icons use soft drop-shadows only when placed directly over high-detail photography.

## Shapes
The shape language is **Structured and Geometric**. 

- **Containers:** Cards and buttons use a "Soft" (0.25rem - 0.75rem) corner radius. This balances the sharp, condensed nature of the Oswald typeface with modern app standards.
- **Dividers:** Horizontal rules are used frequently to separate content sections, styled as 1px lines with low-opacity white (10%).
- **Interactive Elements:** Buttons are typically full-width or large blocks, emphasizing ease of use on mobile.

## Components

### Buttons
- **Primary Action:** Large, full-width blocks with Gold-Primary background and Navy-Bg text. All caps Oswald for the label.
- **Secondary/Ghost:** Gold-Primary border (2px) with transparent background. Used for high-priority but non-transactional actions like "Donate".
- **Text Buttons:** Gold-Primary text with a leading icon (e.g., "View on Map"), all caps, bold.

### Cards
- **Service Cards:** Navy-Surface background with a subtle border. Vertical stack: Headline (Oswald), Body (Inter), Price (Gold, Oswald).
- **Event Items:** Horizontal layout with a leading square icon/date block in Navy-Bg, separated from the card surface.

### Navigation
- **Floating Header:** Transparent background initially, with high-contrast icons and white text.
- **Fixed Footer:** Sticky container at the bottom of the screen housing the primary conversion button and a secondary square icon button (e.g., Favorites).

### Chips/Amenities
- Small Navy-Surface containers with Gold-Primary icons and muted white labels. Rounded-lg (0.5rem) corners.