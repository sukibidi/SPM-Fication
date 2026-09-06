---
name: Arcade Lumina
colors:
  surface: '#0e1320'
  surface-dim: '#0e1320'
  surface-bright: '#343948'
  surface-container-lowest: '#090e1b'
  surface-container-low: '#161b29'
  surface-container: '#1a1f2d'
  surface-container-high: '#252a38'
  surface-container-highest: '#303443'
  on-surface: '#dee2f5'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#dee2f5'
  inverse-on-surface: '#2b303e'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#ffc640'
  on-secondary: '#402d00'
  secondary-container: '#e3aa00'
  on-secondary-container: '#5a4100'
  tertiary: '#fff3f4'
  on-tertiary: '#66002c'
  tertiary-container: '#ffccd6'
  on-tertiary-container: '#bb0058'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#ffdf9f'
  secondary-fixed-dim: '#f9bd22'
  on-secondary-fixed: '#261a00'
  on-secondary-fixed-variant: '#5c4300'
  tertiary-fixed: '#ffd9e0'
  tertiary-fixed-dim: '#ffb1c3'
  on-tertiary-fixed: '#3f0019'
  on-tertiary-fixed-variant: '#8f0041'
  background: '#0e1320'
  on-background: '#dee2f5'
  surface-variant: '#303443'
typography:
  display-arcade:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 60px
    letterSpacing: -0.04em
  display-arcade-mobile:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Outfit
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Outfit
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Outfit
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-numeric:
    fontFamily: JetBrains Mono
    fontSize: 15px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.05em
  label-badge:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '800'
    lineHeight: 12px
    letterSpacing: 0.08em
  label-code:
    fontFamily: JetBrains Mono
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
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4rem
  gutter-mobile: 1rem
  gutter-desktop: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2.5rem
---

## Brand & Style

This design system channels an adrenaline-charged, retro-futuristic arcade aesthetic tailored for high-stakes secondary school revision. It re-engineers the psychological friction of exam preparation into an intoxicating cycle of momentum, daily streaks, and tactical mastery. The experience addresses students facing rigorous public examinations who crave stimulation over clinical, sterile edtech utility.

The core visual narrative unites deep-space navy canvases with hyper-saturated neon lasers, frosted glass shields, and tactile, coin-op arcade tokens. It borrows structural discipline from technical dashboards while amplifying interactions through electric luminescence, physical button-press responses, and luminous status artifacts. Every interaction must evoke the visceral feedback loop of inserting a token into an arcade cabinet: crisp, urgent, rewarding, and distinctly forward-looking.

## Colors

The palette operates on strict contrast ratios against an abyss-dark field. The primary canvas transitions between Void Navy (`#080D1A`) and Dark Slate (`#0F172A`), establishing the darkroom necessary for optical glow effects.

- **Primary (`#00F0FF`, Neon Cyan):** Drives core interactive surfaces, active streak channels, and digital telemetry. Supported by `#06B6D4` for inset bevels and focused state glows.
- **Secondary (`#FBBF24`, Arcade Gold):** Reserved exclusively for high-tier incentives, multiplier streaks, XP trophies, and coin counters. Anchored by amber `#F59E0B` for hard-pressed button shadows.
- **Tertiary (`#FF007A`, Neon Laser Magenta):** Deployed for critical warnings, combo breaks, boss battles, and hyper-streak milestones.
- **Surface Neutrals (`#080D1A`, `#0F172A`, `#1E293B`):** Form the layered frosted glass backdrops. Semitransparent opacities (`rgba(15, 23, 42, 0.65)` to `rgba(30, 41, 59, 0.8)`) are applied over underlying gradients.
- **Subject Chroma Tokens:**
  - *Bahasa Melayu (BM):* Crimson Neon (`#EF4444`) with ambient underglow.
  - *Sejarah:* Ancient Amber (`#F59E0B`) with burnished gold rim.
  - *Matematik:* Hyper Cyan (`#00F0FF`) with electric grid reflections.
  - *Sains:* Bio Hazard Emerald (`#10B981`) with radioactive dispersion.
  - *Geografi:* Terra Topaz (`#3B82F6` / `#06B6D4`) with oceanic depth styling.

## Typography

The typography implements a strict three-tier role system:

1. **Space Grotesk (Headlines & Metric Counts):** Delivers aggressive geometric proportion and tech-infused brutalism. Used for large streak numbers, challenge banners, and section markers. High tracking compression creates a dense, arcade-marquee presence.
2. **Outfit (Body & Dialogues):** Provides high legibility and balanced proportions on dark glowing canvases, keeping long-form exam questions, syllabus guides, and solutions effortless to parse.
3. **JetBrains Mono (Telemetry, XP, Badges, & Timers):** Acts as the hardware read-out. Monospaced character widths stop jitter during real-time countdowns, point counters, and live streak increments.

## Layout & Spacing

The layout is built on a responsive 12-column fluid grid on desktop (max container width: 1280px) and a dense 4-column framework on mobile devices, optimized for single-thumb arcade interactions. 

- **Spacing Rhythm:** Base unit is 4px (0.25rem). Standard stack intervals default to `space-md` (16px) for interior glass container modules and `space-xl` (32px) between major tactical zones.
- **Mobile Paradigm:** Screen height is treated like an arcade screen chassis. Persistent telemetry strips (Streak Flame, Fuel XP, Gems) lock to the top safe zone with backdrop blur, while primary action triggers anchor to the bottom thumb-zone.
- **Adaptive Breakpoints:**
  - `Mobile (<640px)`: 4 columns, 16px margins, 12px gutters. Cards stack vertically with edge-to-edge swipe mechanics for subject modules.
  - `Tablet (640px–1024px)`: 8 columns, 24px margins, 16px gutters. Split-pane layout with quest paths on the left and live streak stats pinned to the right.
  - `Desktop (>1024px)`: 12 columns, 40px margins, 24px gutters. Tri-column layout: Subject Orbit Navigation, Central Battlefield/Quiz Arena, and Global Leaderboard Holo-deck.

## Elevation & Depth

Depth is established not through realistic drop shadows, but through luminous glass stratification and neon underglow dispersion:

- **Base Void (Elevation 0):** Hex `#080D1A` with a fixed radial vignette of deep obsidian slate (`#0F172A`) blooming at the viewport top.
- **Glass Plate (Elevation 1 - Content Containers, Quests):** Background `rgba(15, 23, 42, 0.65)`, backdrop blur filter of `16px`, bordered by an ultra-thin 1px border `rgba(0, 240, 255, 0.15)`. Soft ambient glow: `0 8px 32px 0 rgba(0, 0, 0, 0.45)`.
- **Interactive Floating Holo (Elevation 2 - Active Modals, Hovered Cards):** Background `rgba(30, 41, 59, 0.75)`, backdrop blur `24px`, inner light refraction border `inset 0 1px 0 0 rgba(255, 255, 255, 0.2)`. Border intensifies to `1px solid rgba(0, 240, 255, 0.5)`. Exterior laser projection: `0 0 20px rgba(0, 240, 255, 0.25)`.
- **Overdrive Tier (Elevation 3 - Streak Flame, Level Up Modals):** Semi-opaque composite `rgba(8, 13, 26, 0.92)` rimmed with golden multi-layered neon glow: `0 0 10px rgba(251, 191, 36, 0.4), 0 0 30px rgba(245, 158, 11, 0.25)`.

## Shapes

The geometry fuses aerodynamic modern ergonomics with industrial arcade consoles. Standard containers leverage roundedness level `2` (base radius 8px / 0.5rem; large containers at 16px / 1rem; focal cards at 24px / 1.5rem).

To maintain the gaming flavor, specific elements utilize chamfered or angled corners via clip-path treatments:
- Subject identification tags use an angular 45-degree corner notch on the top-right.
- Tactile arcade push-buttons maintain a solid pill or radius-2 silhouette with an exaggerated physical base line (a bottom border of 3px to 4px) to simulate mechanical travel when pressed.
- Streak counters feature hexagonal or faceted perimeter rings with glowing energy cores.

## Components

### Buttons & Arcade Push Triggers
- **Primary Action (Arcade Glow):** Solid high-contrast Neon Cyan (`#00F0FF`) fill with dark ink typography (`#080D1A`). Bottom edge features a 4px inset shadow/border in `#06B6D4` for tactile depth. On active press: transforms downward by 2px, reducing the bottom bevel, accompanied by an instantaneous bloom filter of `0 0 24px rgba(0, 240, 255, 0.6)`.
- **Secondary (Holo Plate):** Translucent `#0F172A` with a 1px border in Cyan (`#00F0FF`). White text. Hover yields an interior neon wash.
- **Critical / Multiplier Trigger:** Arcade Gold (`#FBBF24`) fill with burnt amber (`#B45309`) physical bottom border. Used strictly for "Double XP", "Claim Streak", and "Final Exam Sprint".

### Streak Indicators (The Core Engine)
- **The Flame Vessel:** A stylized geometric flame contained inside a frosted glass pill. The flame shifts state:
  - *Dormant (0-2 Days):* Cool Cyan ember (`#06B6D4`) with quiet breathing pulse.
  - *Ignited (3-6 Days):* Searing Amber-Gold (`#FBBF24`) with kinetic spark particles.
  - *Supercharged (7+ Days):* Plasma Fusion (Magenta `#FF007A` bleeding into Gold `#FBBF24`) surrounded by an electric halo (`box-shadow: 0 0 25px rgba(255, 0, 122, 0.5)`).
- **Streak Tracker Node:** A chain of connected nodes. Completed nodes become glowing cyan disks with checkmarks; the active day pulses with an animated radar ping; upcoming days remain dark translucent slate nodes with faint dotted outlines.

### Subject Arcade Badges
- High-contrast, micro-dashboard tags displaying subject acronyms (BM, SEJ, MAT, SN, GEO).
- Constructed using `JetBrains Mono` bold lettering within a glass pill or angled chip.
- Bordered by that subject's characteristic neon signature. Includes a small LED-style status dot indicating question mastery or overdue review status.

### Frosted Container Cards
- Utilized for exam questions, daily quests, and syllabus nodes.
- Surface: Glassmorphic Dark Slate (`rgba(15, 23, 42, 0.7)`).
- Subtle, luminous gradient borders running from `rgba(0, 240, 255, 0.3)` top-left fading to transparent bottom-right.
- Hover interaction: Elevates the card by -4px with border luminosity jumping to 100% opacity and ambient colored shadow bleeding outward.

### Input Fields & Quiz Pickers
- **Multiple Choice Tokens:** Sleek, elongated glass bars. Neutral state has faint slate borders. Selecting an answer causes an instantaneous arcade state-lock: the radio pip flashes with cyan/gold light, the card interior fills with 15% cyan tint, and the border erupts in neon glow.
- **Text Inputs:** Dark recessed slate fields (`#080D1A`) with interior inset shadows. Active focus highlights the perimeter in razor-sharp `#00F0FF` with glowing caret tracking.

### Checkboxes & Radios
- Replaced by micro arcade toggles and diamond-cut chips.
- Unchecked: Inset dark slate square with a 1px soft cyan-slate perimeter.
- Checked: Snaps to full Neon Cyan fill with an inner black arcade bolt or check glyph, haloed by an exterior glow.