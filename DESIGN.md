# Design System Specification

## 1. Overview & Creative North Star: "The Electric Pulse"

This design system is engineered to capture the high-octane energy of a premium nightlife showcase. Moving away from static, corporate layouts, our Creative North Star is **"The Electric Pulse"**—an aesthetic that prioritizes kinetic energy, depth, and atmospheric lighting.

To break the "template" look, designers must embrace **intentional asymmetry** and **overlapping elements**. In this system, content does not simply sit within a grid; it erupts from it. By using high-contrast typography scales and "explosive" magenta and neon green accents against a deep, electric purple foundation, we create a digital experience that feels as curated and prestigious as a VIP backstage pass.

---

## 2. Colors: High-Voltage Darkness

The palette is anchored in deep shadows and neon luminescence. It is designed to vibrate with energy while maintaining a premium, dark-mode-first aesthetic.

### Core Palette
*   **Primary (Electric Purple):** `#cf96ff` — Used for main brand elements and primary interaction states.
*   **Secondary (Neon Green):** `#2ff801` — Reserved for "High-Energy" moments, success states, and aggressive calls to action.
*   **Tertiary (Magenta Accent):** `#ff51fa` — Used for supplemental highlights and decorative "glow" elements.
*   **Background / Surface:** `#0f0d16` — A deep, saturated violet-black that serves as the canvas for all luminescence.

### The "No-Line" Rule
**Explicit Instruction:** Prohibit 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts. A `surface-container-low` section sitting on a `surface` background is the only acceptable way to define regional change. We are building with light and shadow, not wireframes.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of obsidian and frosted glass.
*   **Surface-Container-Lowest (`#000000`):** Deepest background elements.
*   **Surface-Container-Low (`#14121c`):** Standard grouping containers.
*   **Surface-Container-Highest (`#272431`):** Active or prominent interactive surfaces.

### The "Glass & Gradient" Rule
To achieve the "premium night club" vibe, use Glassmorphism for floating modals and navigation bars. Use `surface-variant` with a **20-40% opacity** and a `backdrop-blur` of at least `20px`. 

**Signature Texture:** Main CTAs should utilize a linear gradient from `primary` (`#cf96ff`) to `primary-container` (`#c683ff`) to provide a "glossy" finish that flat color cannot replicate.

---

## 3. Typography: Aggressive Modernism

The typography is the "voice" of the showcase: loud, bold, and unapologetically modern.

*   **Display & Headlines:** **Space Grotesk.** This typeface provides the "Aggressive Modern" feel required. It should be used at extreme scales (e.g., `display-lg` at 3.5rem) with tight letter spacing to maximize impact.
*   **Body & Titles:** **Manrope.** Chosen for its technical precision and readability. It balances the aggression of Space Grotesk with high-end editorial clarity.

**Hierarchy as Identity:**
- **Display-LG:** For names of headline performers or explosive announcements.
- **Label-MD:** Using Space Grotesk in all-caps for "Technical" metadata, adding a gritty, industrial edge to the glossy UI.

---

## 4. Elevation & Depth: Tonal Layering

We reject traditional drop shadows in favor of **Ambient Luminescence**.

*   **The Layering Principle:** Stacking `surface-container` tiers creates soft, natural lift. Place a `surface-container-highest` card on a `surface-container-low` section to define importance without visual clutter.
*   **Ambient Shadows:** For floating elements, use extra-diffused shadows. 
    - *Shadow color:* Use a 10% opacity version of `primary` (`#cf96ff`) or `secondary` (`#2ff801`) instead of black. This simulates the way neon lights cast color onto surrounding surfaces.
*   **The "Ghost Border" Fallback:** If a container requires a boundary, use the `outline-variant` token at **15% opacity**. Never use 100% opaque borders.
*   **Glossy Surfaces:** Incorporate a 1px inner-stroke (top and left only) using a light-tinted version of the primary color to simulate a "specular highlight" on the edge of the glass.

---

## 5. Components

### Buttons
*   **Primary:** High-gloss gradient (Primary to Primary-Container). Roundedness: `md` (0.375rem). Text: `label-md` in all-caps.
*   **Secondary:** Ghost style. Transparent background with a `secondary` (`#2ff801`) "Ghost Border" and neon outer glow on hover.
*   **Tertiary:** No background. Bold `tertiary` (`#ff51fa`) text with a subtle underline.

### Cards & Lists
*   **Constraint:** Forbid the use of divider lines.
*   **Design:** Separate list items using a 12px vertical gap. Use a subtle `surface-container-low` background on hover to indicate interactivity. Use `secondary` (`#2ff801`) accents for status indicators.

### Input Fields
*   **Style:** Dark fill (`surface-container-highest`) with a "Ghost Border" bottom-only. 
*   **Active State:** The border glows with a `primary` (`#cf96ff`) box-shadow (blur: 10px, spread: -2px).

### Signature Component: "The Smoke Reveal"
*   For Hero sections or image cards, use a "smoke/steam" texture overlay (PNG or CSS Noise) set to `screen` or `overlay` blend mode. This integrates the aggressive typography with the organic, high-energy atmosphere of a club.

---

## 6. Do's and Don'ts

### Do:
*   **DO** overlap typography over images and decorative smoke textures.
*   **DO** use the `secondary` neon green sparingly—only for the most critical actions or "VIP" statuses.
*   **DO** use aggressive 45-degree gradients to imply movement and energy.
*   **DO** ensure high contrast; `on-surface` (`#f5eefc`) must remain legible against the dark background.

### Don't:
*   **DON'T** use standard 1px grey borders; they kill the "immersive" vibe.
*   **DON'T** use pure white backgrounds; always use the `surface` tokens to maintain the dark-room depth.
*   **DON'T** use soft, rounded "pill" shapes for everything. Stick to the `md` (0.375rem) or `none` scale to keep the aggressive, modern edge.
*   **DON'T** use standard grey drop shadows. If it doesn't glow, it shouldn't be there.