# Design Document

## Feature: aesthetic-clinic-landing-page

---

## Overview

The aesthetic clinic landing page is a single `.jsx` file that renders a complete marketing website for a luxury aesthetic/laser treatment clinic. It is fully self-contained — no external component libraries, no separate CSS files, no required props. The component is a React functional component that uses only React hooks (`useState`, `useEffect`, `useRef`), Tailwind CSS utility classes for all styling, and Google Fonts loaded via an inline `<style>` tag.

The page guides visitors through a deliberate narrative arc:

1. **Navbar** — persistent orientation and quick access
2. **Hero** — immediate value proposition and primary CTA
3. **Services** — bento-grid overview of treatment categories
4. **About Us** — trust-building values and clinic identity
5. **Team** — specialist credibility
6. **FAQ** — objection handling
7. **CTA Banner** — final conversion push
8. **Footer** — contact and legal
9. **Floating WhatsApp** — always-available low-friction contact

### Design Goals

- Soft luxury editorial aesthetic: warm beige tones, generous whitespace, serif headings
- Gender-neutral copy throughout
- Mobile-first responsive layout (320 px → 1920 px)
- Zero runtime dependencies beyond React + Tailwind CDN

---

## Architecture

The entire page is one React component tree exported as the default export from a single `.jsx` file. There are no sub-files, no imports beyond React itself.

```
LandingPage (default export)
├── <style> tag — Google Fonts @import
├── Navbar
├── Hero
├── Services
├── About
├── Team
├── FAQ
├── CTABanner
├── Footer
└── WhatsAppButton
```

### State Management

All state lives in the top-level `LandingPage` component and is passed down as props to child sections. No context or external state library is used.

| State variable    | Type      | Owner         | Purpose                                              |
|-------------------|-----------|---------------|------------------------------------------------------|
| `scrolled`        | `boolean` | LandingPage   | Triggers Navbar shadow when page is scrolled > 0 px  |
| `mobileMenuOpen`  | `boolean` | LandingPage   | Toggles mobile hamburger menu visibility             |
| `openFaq`         | `number\|null` | LandingPage | Index of the currently expanded FAQ accordion item  |
| `teamScrollRef`   | `useRef`  | LandingPage   | Ref attached to the Team horizontal scroll container |

### Event Wiring

- `useEffect` on mount: attaches a `scroll` listener that sets `scrolled = window.scrollY > 0`, cleans up on unmount.
- Navbar hamburger `onClick`: toggles `mobileMenuOpen`.
- FAQ item `onClick`: sets `openFaq` to the clicked index, or `null` if already open (toggle).
- Team arrow buttons `onClick`: calls `teamScrollRef.current.scrollBy({ left: ±cardWidth, behavior: 'smooth' })`.

---

## Components and Interfaces

### LandingPage

The root component. Owns all state. Renders the `<style>` tag and all section components.

```jsx
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const teamScrollRef = useRef(null)
  // ...
}
```

---

### Navbar

**Props:** `scrolled`, `mobileMenuOpen`, `setMobileMenuOpen`

**Layout:** `fixed top-0 left-0 right-0 z-50 bg-white`

- Left: clinic logo text (Cormorant Garamond, espresso color)
- Center: nav links — `Home | Services | About Us | Doctors | FAQ` — hidden on mobile (`hidden md:flex`)
- Right: phone icon + email icon + "Book Appointment" dark pill button — icons hidden on mobile
- Mobile: hamburger icon (`md:hidden`) toggles a dropdown menu (`mobileMenuOpen && <MobileMenu />`)
- Scroll shadow: `scrolled ? 'shadow-md border-b border-gray-100' : ''`

**Scroll behavior:** All nav links are `<a href="#section-id">` anchors. Smooth scroll is applied globally via `html { scroll-behavior: smooth }` in the style tag.

---

### Hero

**Props:** none (reads no state)

**Layout:** `min-h-screen bg-[#FFF0EA] flex items-center`

- Two-column grid: `grid md:grid-cols-2 gap-8 items-center`
- Left column:
  - Section label: `(00) HERO` — small caps DM Sans
  - `<h1>` headline in Cormorant Garamond, large (`text-5xl md:text-7xl`), espresso color
  - Subtext paragraph in DM Sans
  - "Book Appointment" dark pill CTA button
  - Two floating Pill_Badge links: `"Facial Cleansing →"` and `"Anti-Cellulite Treatment →"`
- Right column:
  - `<img>` sourced from `https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600`
  - Rounded corners (`rounded-3xl`), full width of column
- Mobile: `grid-cols-1`, image column moves below text

---

### Services

**Props:** none

**Layout:** `py-20 px-6 md:px-16 bg-white`

- Section label: `(01) SERVICES`
- Bento grid: CSS grid with named areas

```
┌──────────────┬──────────────┐
│  Cosmetic    │  Aesthetic   │
│  Procedures  │  Procedures  │
├──────────────┴──────────────┤
│     Skin Care Services      │  ← col-span-2
├──────────────┬──────────────┤
│  Promo Card  │Special Offers│
└──────────────┴──────────────┘
```

Tailwind grid: `grid grid-cols-1 md:grid-cols-2 gap-4`

- Cards 1 & 2: `relative h-64 rounded-2xl overflow-hidden` — background image + dark overlay (`bg-black/40`) + white text + `→` arrow bottom-right
- Card 3 (Skin Care): `md:col-span-2 h-48 rounded-2xl` — wide card, background image + text overlay
- Card 4 (Promo): `bg-[#E9D2CA] rounded-2xl p-8 flex flex-col justify-center` — bold espresso text, no image
- Card 5 (Special Offers): `relative h-64 rounded-2xl overflow-hidden` — background image + overlay

Hover effect on all cards: `transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl`

---

### About

**Props:** none

**Layout:** `py-20 px-6 md:px-16 bg-[#FFF0EA]`

- Section label: `(02) ABOUT US`
- Two-column grid: `grid md:grid-cols-2 gap-12 items-center`
- Left column:
  - Intro paragraph
  - Three value props rendered from `VALUE_PROPS` array — each: icon (SVG inline) + bold title + supporting sentence
  - "View More" dark pill button
- Right column — image mosaic:
  - Three overlapping `<img>` elements in a `relative` container
  - Image 1: `absolute top-0 left-0 w-3/5 rounded-2xl`
  - Image 2: `absolute top-16 right-0 w-2/5 rounded-2xl`
  - Image 3: `absolute bottom-0 left-8 w-2/5 rounded-2xl`
  - Container height: `h-96 md:h-[480px]`

---

### Team

**Props:** `teamScrollRef`

**Layout:** `py-20 px-6 md:px-16 bg-white`

- Section label + arrow buttons row: `flex justify-between items-center mb-8`
- Arrow buttons: `←` and `→`, espresso border, rounded-full, `onClick` scrolls `teamScrollRef`
- Scroll container: `ref={teamScrollRef}` — `flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-hide`
- Each `Doctor_Card`: `flex-shrink-0 w-72 bg-[#FFF0EA] rounded-3xl p-6 flex flex-col items-center gap-3`

**Doctor_Card internals:**
- Circular photo: `w-32 h-32 rounded-full object-cover`
- Name: Cormorant Garamond, `text-xl font-semibold`
- Pill badges: `flex flex-wrap gap-2 justify-center` — each badge `bg-[#E9D2CA] text-[#231510] text-xs px-3 py-1 rounded-full`
- Experience text: DM Sans, small, muted
- "Book Appointment" button: dark pill, full width

---

### FAQ

**Props:** `openFaq`, `setOpenFaq`

**Layout:** `py-20 px-6 md:px-16 bg-white`

- Section label: `(04) FAQ`
- List of `Accordion_Item` components rendered from `FAQ_ITEMS` array
- Each `Accordion_Item`:
  - Header: `flex justify-between items-center cursor-pointer py-4 border-b border-gray-200`
  - Question text: DM Sans medium
  - Toggle icon: `+` / `−` (or chevron SVG)
  - Answer body: conditionally rendered with `max-h` transition for smooth animation
    - `overflow-hidden transition-all duration-300 ease-in-out`
    - Open: `max-h-96 opacity-100` / Closed: `max-h-0 opacity-0`

---

### CTABanner

**Props:** none

**Layout:** `py-24 px-6 bg-[#E9D2CA] text-center`

- Italic serif headline: Cormorant Garamond, `text-4xl md:text-6xl italic text-[#231510]`
- "Book Now" dark pill button below

---

### Footer

**Props:** none

**Layout:** `bg-[#231510] text-white py-16 px-6 md:px-16`

- Two-column grid: `grid md:grid-cols-2 gap-12`
- Column 1 — Support: links list (Home, Services, About Us, Doctors, FAQ, Privacy Policy)
- Column 2 — Contact Us: email, phone, address
- Bottom bar: `border-t border-white/20 mt-12 pt-6 text-center text-sm text-white/60` — "All Rights Reserved | Terms & Conditions · Privacy Policy"
- Mobile: `grid-cols-1`

---

### WhatsAppButton

**Props:** none

**Layout:** `fixed bottom-6 right-6 z-50`

- `<a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">`
- Circle: `w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg`
- WhatsApp SVG icon (white, inline)

---

## Data Models

All static data is defined as module-level constants at the top of the `.jsx` file, above the component definitions.

### `DOCTORS` array

```js
const DOCTORS = [
  {
    id: 1,
    name: "Dr. Alex Morgan",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300",
    tags: ["Laser Therapy", "Skin Rejuvenation"],
    experience: "12 years of experience in aesthetic medicine",
  },
  {
    id: 2,
    name: "Dr. Jordan Lee",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300",
    tags: ["Cosmetic Procedures", "Anti-Aging"],
    experience: "8 years specializing in non-invasive treatments",
  },
  {
    id: 3,
    name: "Dr. Sam Rivera",
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300",
    tags: ["Skin Care", "Chemical Peels"],
    experience: "10 years in dermatology and aesthetic care",
  },
  {
    id: 4,
    name: "Dr. Taylor Kim",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300",
    tags: ["Body Contouring", "Cellulite Treatment"],
    experience: "6 years focused on body aesthetic procedures",
  },
]
```

### `FAQ_ITEMS` array

```js
const FAQ_ITEMS = [
  {
    question: "What treatments do you offer?",
    answer: "We offer a comprehensive range of aesthetic treatments including laser therapy, skin rejuvenation, chemical peels, body contouring, anti-aging procedures, and personalized skin care consultations.",
  },
  {
    question: "Are the procedures safe?",
    answer: "All procedures are performed by certified specialists using FDA-approved equipment. We conduct a thorough consultation before any treatment to ensure it is appropriate for your skin type and health profile.",
  },
  {
    question: "How much do treatments cost?",
    answer: "Pricing varies by treatment type and individual needs. We offer transparent pricing during your consultation. First-time clients receive a 20% discount on their initial procedure.",
  },
  {
    question: "What should I expect on my first visit?",
    answer: "Your first visit begins with a 30-minute consultation where a specialist assesses your skin, discusses your goals, and recommends a personalized treatment plan. No procedure is performed without your informed consent.",
  },
  {
    question: "How long is the recovery time?",
    answer: "Recovery depends on the treatment. Many non-invasive procedures require no downtime at all. More intensive treatments may involve 1–3 days of mild redness or sensitivity. Your specialist will provide detailed aftercare instructions.",
  },
  {
    question: "How do I book an appointment?",
    answer: "You can book directly through the 'Book Appointment' button on this page, contact us via WhatsApp using the button in the bottom-right corner, or call us at the number listed in the footer.",
  },
]
```

### `SERVICES` array

```js
const SERVICES = [
  {
    id: "cosmetic",
    title: "Cosmetic Procedures",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600",
    span: 1,
  },
  {
    id: "aesthetic",
    title: "Aesthetic Procedures",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600",
    span: 1,
  },
  {
    id: "skincare",
    title: "Skin Care Services",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800",
    span: 2,
  },
  {
    id: "promo",
    title: null, // Promo card — no image, custom render
    image: null,
    span: 1,
    isPromo: true,
  },
  {
    id: "offers",
    title: "Special Offers & Packages",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600",
    span: 1,
  },
]
```

### `VALUE_PROPS` array

```js
const VALUE_PROPS = [
  {
    icon: "shield", // maps to inline SVG
    title: "Professionalism",
    description: "Our specialists continuously advance their qualifications to deliver the highest standard of care.",
  },
  {
    icon: "user",
    title: "Individual Approach",
    description: "Every client has unique skin and unique goals. We tailor every treatment plan accordingly.",
  },
  {
    icon: "heart",
    title: "Comfort and Safety",
    description: "We maintain a calm, welcoming atmosphere where you can relax and feel completely at ease.",
  },
]
```

### `NAV_LINKS` array

```js
const NAV_LINKS = [
  { label: "Home",     href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Doctors",  href: "#team" },
  { label: "FAQ",      href: "#faq" },
]
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Navbar shadow reflects scroll state

*For any* scroll position, when `scrolled` is `true` the Navbar element SHALL include the shadow/border CSS classes, and when `scrolled` is `false` those classes SHALL be absent.

**Validates: Requirements 1.6**

---

### Property 2: Services grid contains at least five cards

*For any* valid `SERVICES` data array with five or more entries, the rendered Services section SHALL contain at least five card elements.

**Validates: Requirements 3.2**

---

### Property 3: All service cards have rounded corners

*For any* service card rendered in the Bento_Grid, the card element SHALL include the `rounded-2xl` CSS class.

**Validates: Requirements 3.9**

---

### Property 4: Each value proposition contains all required fields

*For any* entry in the `VALUE_PROPS` array, the rendered About section SHALL display an icon, a bold title, and a supporting description sentence for that entry.

**Validates: Requirements 4.3**

---

### Property 5: Each Doctor_Card contains all required fields

*For any* doctor entry in the `DOCTORS` array, the rendered Doctor_Card SHALL display a photo, the doctor's name, at least one Pill_Badge tag, an experience description, and a Book Appointment CTA button.

**Validates: Requirements 5.3**

---

### Property 6: Team section renders at least two Doctor_Cards

*For any* `DOCTORS` array with two or more entries, the rendered Team section SHALL contain at least two Doctor_Card elements.

**Validates: Requirements 5.4**

---

### Property 7: Each FAQ accordion item contains question and answer

*For any* entry in the `FAQ_ITEMS` array, the rendered FAQ section SHALL display the question text as the item header and the answer text as the collapsible body.

**Validates: Requirements 6.2, 6.3**

---

### Property 8: FAQ accordion toggle is a round trip

*For any* FAQ item index, clicking the header when the item is closed SHALL open it (making the answer visible), and clicking the header again when the item is open SHALL close it (hiding the answer) — restoring the original closed state.

**Validates: Requirements 6.4, 6.5**

---

### Property 9: Font classes are applied consistently

*For any* heading element (h1–h3) rendered in the Landing_Page, it SHALL include the Cormorant Garamond font class. *For any* body text, label, or UI element rendered, it SHALL include the DM Sans font class.

**Validates: Requirements 10.2, 10.3**

---

### Property 10: All images are sourced from Unsplash

*For any* `<img>` element rendered in the Landing_Page, its `src` attribute SHALL contain `"unsplash.com"`.

**Validates: Requirements 11.5**

---

### Property 11: All rendered text is gender-neutral

*For any* text content rendered in the Landing_Page, it SHALL not contain the terms "ladies", "women", "woman", "her", "she", or "girls".

**Validates: Requirements 10.6**

---

## Error Handling

Since this is a static marketing landing page with no API calls, form submissions, or async operations, error handling is minimal:

1. **Missing images**: All `<img>` elements include an `alt` attribute. If an Unsplash URL fails to load, the browser renders the alt text gracefully. No `onError` handler is required for a landing page.

2. **Scroll ref not attached**: The Team section arrow buttons check `teamScrollRef.current` before calling `scrollBy`. If the ref is not yet attached (e.g., during SSR), the click handler is a no-op.

3. **Invalid FAQ index**: The `openFaq` state is either `null` or a valid index into `FAQ_ITEMS`. The toggle handler uses `setOpenFaq(prev => prev === index ? null : index)` which is always safe regardless of current state.

4. **WhatsApp link**: The link uses `href="https://wa.me/..."` with `target="_blank"` and `rel="noopener noreferrer"` to prevent tab-napping security issues.

5. **Font loading failure**: If Google Fonts CDN is unavailable, the page falls back to the browser's default serif (for headings) and sans-serif (for body text) — acceptable degradation.

---

## Testing Strategy

### PBT Applicability Assessment

This feature is a React UI landing page. The majority of requirements are rendering checks (does the DOM contain specific elements/text) and CSS class checks (are the right Tailwind classes applied). These are best tested with example-based unit tests and snapshot tests.

However, several requirements express **universal properties** that hold across all entries in data arrays (`DOCTORS`, `FAQ_ITEMS`, `VALUE_PROPS`, `SERVICES`) and across all rendered elements (images, headings, text content). These are well-suited to property-based testing because:

- The data arrays can be randomly generated with varying lengths and content
- The properties must hold for every entry, not just specific examples
- Input variation (different doctor names, FAQ content, service titles) can reveal rendering bugs

**PBT library**: [fast-check](https://github.com/dubzzz/fast-check) for JavaScript/React

### Unit Tests (Example-Based)

Focus on specific rendering checks and interaction behaviors:

- Navbar renders logo, nav links, and CTA button
- Navbar shows/hides mobile menu when hamburger is clicked
- Hero renders correct headline, subtext, pill badges, and image src
- Services section renders all five card titles
- About section renders "View More" button and three images in mosaic
- Team section renders arrow buttons
- Team arrow click calls `scrollBy` on the ref
- FAQ section renders correct number of items
- CTA Banner renders correct headline text and "Book Now" button
- Footer renders Support and Contact Us columns with correct content
- WhatsApp button has correct `href` and `target="_blank"`
- Style tag contains Google Fonts `@import`

### Property-Based Tests

Each property test runs a minimum of **100 iterations** with randomly generated inputs.

Tag format: `Feature: aesthetic-clinic-landing-page, Property {N}: {property_text}`

| Property | Test Description | Generator |
|----------|-----------------|-----------|
| P1 — Navbar shadow | For any boolean `scrolled` value, verify shadow class presence/absence | `fc.boolean()` |
| P2 — Services count | For any SERVICES array with ≥ 5 entries, rendered grid has ≥ 5 cards | `fc.array(serviceArb, { minLength: 5 })` |
| P3 — Card rounded corners | For any SERVICES array, every rendered card has `rounded-2xl` | `fc.array(serviceArb, { minLength: 1 })` |
| P4 — Value props structure | For any VALUE_PROPS array, each rendered prop has icon + title + description | `fc.array(valuePropArb, { minLength: 1 })` |
| P5 — Doctor_Card fields | For any DOCTORS array, each card has photo + name + tags + experience + CTA | `fc.array(doctorArb, { minLength: 1 })` |
| P6 — Team card count | For any DOCTORS array with ≥ 2 entries, team renders ≥ 2 cards | `fc.array(doctorArb, { minLength: 2 })` |
| P7 — FAQ item structure | For any FAQ_ITEMS array, each item renders question + answer | `fc.array(faqItemArb, { minLength: 5, maxLength: 6 })` |
| P8 — Accordion toggle | For any FAQ item index, open→close→open is a round trip | `fc.integer({ min: 0, max: 5 })` |
| P9 — Font classes | For any rendered heading, has Cormorant Garamond class; body has DM Sans | Render with default data, query all h1–h3 and body elements |
| P10 — Unsplash images | For any rendered img, src contains "unsplash.com" | Render with default data, query all img elements |
| P11 — Gender-neutral text | For any rendered text node, does not contain gendered terms | Render with default data, extract all text content |

### Integration Tests

Not applicable — this is a static client-side component with no backend integration.

### Snapshot Tests

A single snapshot test captures the full rendered output of `LandingPage` with default data. This catches unintended structural regressions.
