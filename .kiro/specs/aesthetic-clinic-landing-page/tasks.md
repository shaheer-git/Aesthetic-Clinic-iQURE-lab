# Implementation Plan: Aesthetic Clinic Landing Page

## Overview

Implement a single self-contained `AestheticClinic.jsx` file that renders a complete luxury aesthetic clinic marketing website. The component uses React hooks, Tailwind CSS utility classes, and Google Fonts loaded via an inline `<style>` tag. All state lives in the root `LandingPage` component and is passed down as props.

## Tasks

- [x] 1. Scaffold AestheticClinic.jsx — imports, fonts, constants, data arrays
  - Create `AestheticClinic.jsx` with the React import at the top
  - Add an inline `<style>` tag string constant containing the Google Fonts `@import` for "Cormorant Garamond" and "DM Sans", plus `html { scroll-behavior: smooth }`
  - Define color constants: `ESPRESSO`, `CREAM`, `BEIGE`, `WHITE`
  - Define the `NAV_LINKS` array with five entries (Home, Services, About Us, Doctors, FAQ) and their `#section-id` hrefs
  - Define the `SERVICES` array with five entries (cosmetic, aesthetic, skincare wide, promo, offers) including `id`, `title`, `image`, `span`, and optional `isPromo` fields
  - Define the `VALUE_PROPS` array with three entries (Professionalism, Individual Approach, Comfort and Safety) each with `icon`, `title`, and `description`
  - Define the `DOCTORS` array with four entries (Dr. Alex Morgan, Dr. Jordan Lee, Dr. Sam Rivera, Dr. Taylor Kim) each with `id`, `name`, `photo`, `tags`, and `experience`
  - Define the `FAQ_ITEMS` array with six entries covering treatments, safety, pricing, first visit, recovery, and booking
  - _Requirements: 1.3, 2.5, 3.2, 4.3, 5.3, 6.2, 10.1, 10.5, 11.3_

- [x] 2. Implement Navbar component
  - [x] 2.1 Write the `Navbar` functional component accepting `scrolled`, `mobileMenuOpen`, `setMobileMenuOpen` props
    - Render `fixed top-0 left-0 right-0 z-50 bg-white` wrapper
    - Left: clinic logo text in Cormorant Garamond, espresso color
    - Center: `NAV_LINKS` mapped to `<a href>` anchors, `hidden md:flex`
    - Right: phone icon SVG + email icon SVG + "Book Appointment" dark pill button; icons hidden on mobile
    - Mobile hamburger icon (`md:hidden`) that calls `setMobileMenuOpen` on click
    - Conditional mobile dropdown menu rendered when `mobileMenuOpen` is true
    - Apply `shadow-md border-b border-gray-100` classes when `scrolled` is true, none when false
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8_

  - [ ]* 2.2 Write property test for Navbar shadow (Property 1)
    - **Property 1: Navbar shadow reflects scroll state**
    - For any `fc.boolean()` value of `scrolled`, assert shadow/border classes are present when `true` and absent when `false`
    - **Validates: Requirements 1.6**

- [x] 3. Implement Hero section
  - [x] 3.1 Write the `Hero` functional component (no props)
    - Render `min-h-screen bg-[#FFF0EA] flex items-center` wrapper with `id="hero"`
    - Two-column grid: `grid md:grid-cols-2 gap-8 items-center`; single column on mobile
    - Left column: section label `(00) HERO`, `<h1>` headline in Cormorant Garamond (`text-5xl md:text-7xl`), subtext paragraph in DM Sans, "Book Appointment" dark pill CTA button, two Pill_Badge links ("Facial Cleansing →" and "Anti-Cellulite Treatment →")
    - Right column: `<img>` from `https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600` with `rounded-3xl w-full` and descriptive `alt`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8_

  - [ ]* 3.2 Write unit test for Hero rendering
    - Assert headline text, subtext, pill badge labels, and image `src` are present in the rendered output
    - _Requirements: 2.2, 2.3, 2.5, 2.6_

- [x] 4. Implement Services section
  - [x] 4.1 Write the `Services` functional component (no props)
    - Render `py-20 px-6 md:px-16 bg-white` wrapper with `id="services"`
    - Section label `(01) SERVICES` in DM Sans small caps
    - Bento grid: `grid grid-cols-1 md:grid-cols-2 gap-4`
    - Cards 1 & 2 (Cosmetic, Aesthetic): `relative h-64 rounded-2xl overflow-hidden` — background image via `style={{ backgroundImage }}` + `bg-black/40` dark overlay + white title text + `→` arrow bottom-right
    - Card 3 (Skin Care): `md:col-span-2 h-48 rounded-2xl` — wide card with background image and text overlay
    - Card 4 (Promo): `bg-[#E9D2CA] rounded-2xl p-8 flex flex-col justify-center` — bold espresso text "Sign up for your first procedure and get a 20% DISCOUNT!"
    - Card 5 (Special Offers): `relative h-64 rounded-2xl overflow-hidden` — background image + overlay
    - All cards: `transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl rounded-2xl`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10_

  - [ ]* 4.2 Write property test for Services card count (Property 2)
    - **Property 2: Services grid contains at least five cards**
    - Use `fc.array(serviceArb, { minLength: 5 })` to generate SERVICES arrays; assert rendered grid has ≥ 5 card elements
    - **Validates: Requirements 3.2**

  - [ ]* 4.3 Write property test for Services card rounded corners (Property 3)
    - **Property 3: All service cards have rounded corners**
    - Use `fc.array(serviceArb, { minLength: 1 })`; assert every rendered card element includes `rounded-2xl`
    - **Validates: Requirements 3.9**

- [x] 5. Implement About Us section
  - [x] 5.1 Write the `About` functional component (no props)
    - Render `py-20 px-6 md:px-16 bg-[#FFF0EA]` wrapper with `id="about"`
    - Section label `(02) ABOUT US`
    - Two-column grid: `grid md:grid-cols-2 gap-12 items-center`; single column on mobile
    - Left column: intro paragraph, three value props mapped from `VALUE_PROPS` (each: inline SVG icon for shield/user/heart, bold title, description sentence), "View More" dark pill button
    - Right column: `relative h-96 md:h-[480px]` container with three overlapping `<img>` elements positioned absolutely (`top-0 left-0 w-3/5`, `top-16 right-0 w-2/5`, `bottom-0 left-8 w-2/5`), all `rounded-2xl`
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [ ]* 5.2 Write property test for value proposition structure (Property 4)
    - **Property 4: Each value proposition contains all required fields**
    - Use `fc.array(valuePropArb, { minLength: 1 })`; for each entry assert icon element, bold title, and description are rendered
    - **Validates: Requirements 4.3**

- [x] 6. Implement Team section
  - [x] 6.1 Write the `Doctor_Card` sub-component and the `Team` functional component accepting `teamScrollRef` prop
    - `Doctor_Card` props: `{ name, photo, tags, experience }` — render `flex-shrink-0 w-72 bg-[#FFF0EA] rounded-3xl p-6 flex flex-col items-center gap-3`; circular photo `w-32 h-32 rounded-full object-cover`; name in Cormorant Garamond; pill badges from `tags` array; experience text; "Book Appointment" dark pill button
    - `Team` wrapper: `py-20 px-6 md:px-16 bg-white` with `id="team"`
    - Header row: section label `(03) TEAM OF PROFESSIONALS` + `←` / `→` arrow buttons (`onClick` calls `teamScrollRef.current?.scrollBy({ left: ±320, behavior: 'smooth' })`)
    - Scroll container: `ref={teamScrollRef}` with `flex gap-6 overflow-x-auto scroll-smooth pb-4` — maps `DOCTORS` to `Doctor_Card` components
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8_

  - [ ]* 6.2 Write property test for Doctor_Card fields (Property 5)
    - **Property 5: Each Doctor_Card contains all required fields**
    - Use `fc.array(doctorArb, { minLength: 1 })`; for each doctor assert photo `src`, name text, at least one tag badge, experience text, and CTA button are present
    - **Validates: Requirements 5.3**

  - [ ]* 6.3 Write property test for Team card count (Property 6)
    - **Property 6: Team section renders at least two Doctor_Cards**
    - Use `fc.array(doctorArb, { minLength: 2 })`; assert rendered Team section contains ≥ 2 Doctor_Card elements
    - **Validates: Requirements 5.4**

- [x] 7. Implement FAQ section
  - [x] 7.1 Write the `FAQ` functional component accepting `openFaq` and `setOpenFaq` props
    - Render `py-20 px-6 md:px-16 bg-white` wrapper with `id="faq"`
    - Section label `(04) FAQ`
    - Map `FAQ_ITEMS` to accordion items; each item: header `flex justify-between items-center cursor-pointer py-4 border-b border-gray-200` with question text and `+`/`−` toggle icon; answer body with `overflow-hidden transition-all duration-300 ease-in-out` and `max-h-96 opacity-100` when open vs `max-h-0 opacity-0` when closed
    - Header `onClick`: `setOpenFaq(prev => prev === index ? null : index)`
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

  - [ ]* 7.2 Write property test for FAQ item structure (Property 7)
    - **Property 7: Each FAQ accordion item contains question and answer**
    - Use `fc.array(faqItemArb, { minLength: 5, maxLength: 6 })`; assert each item renders its question as header text and answer as body text
    - **Validates: Requirements 6.2, 6.3**

  - [ ]* 7.3 Write property test for FAQ accordion toggle round trip (Property 8)
    - **Property 8: FAQ accordion toggle is a round trip**
    - Use `fc.integer({ min: 0, max: 5 })`; simulate click to open, assert answer visible; click again to close, assert answer hidden — restoring original closed state
    - **Validates: Requirements 6.4, 6.5**

- [x] 8. Implement CTA Banner and Footer
  - [x] 8.1 Write the `CTABanner` functional component (no props)
    - Render `py-24 px-6 bg-[#E9D2CA] text-center` wrapper
    - Italic serif headline in Cormorant Garamond (`text-4xl md:text-6xl italic text-[#231510]`): "YOUR PERFECT SKIN STARTS HERE. LET OUR EXPERTS HELP YOU UNCOVER YOUR TRUE BEAUTY."
    - "Book Now" dark pill button below the headline
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [x] 8.2 Write the `Footer` functional component (no props)
    - Render `bg-[#231510] text-white py-16 px-6 md:px-16` wrapper
    - Two-column grid `grid md:grid-cols-2 gap-12`; single column on mobile
    - Column 1 (Support): links list — Home, Services, About Us, Doctors, FAQ, Privacy Policy
    - Column 2 (Contact Us): email address, phone number, physical address
    - Bottom bar: `border-t border-white/20 mt-12 pt-6 text-center text-sm text-white/60` — "All Rights Reserved | Terms & Conditions · Privacy Policy"
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 9. Implement WhatsApp floating button
  - [x] 9.1 Write the `WhatsAppButton` functional component (no props)
    - Render `fixed bottom-6 right-6 z-50` wrapper
    - `<a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">`
    - Circle: `w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg`
    - Inline WhatsApp SVG icon (white fill)
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [x] 10. Checkpoint — Ensure all components render without errors
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Wire everything together in LandingPage default export
  - [x] 11.1 Write the `LandingPage` root component and default export
    - Declare state: `const [scrolled, setScrolled] = useState(false)`, `const [mobileMenuOpen, setMobileMenuOpen] = useState(false)`, `const [openFaq, setOpenFaq] = useState(null)`
    - Declare ref: `const teamScrollRef = useRef(null)`
    - `useEffect` on mount: attach `scroll` listener that sets `scrolled = window.scrollY > 0`; return cleanup that removes the listener
    - Render in order: `<style>` tag (Google Fonts + smooth scroll), `<Navbar>`, `<Hero>`, `<Services>`, `<About>`, `<Team>`, `<FAQ>`, `<CTABanner>`, `<Footer>`, `<WhatsAppButton>`
    - Pass props: `scrolled`, `mobileMenuOpen`, `setMobileMenuOpen` to Navbar; `teamScrollRef` to Team; `openFaq`, `setOpenFaq` to FAQ
    - _Requirements: 1.1, 10.1, 10.4, 11.3, 11.4_

  - [ ]* 11.2 Write property test for font class consistency (Property 9)
    - **Property 9: Font classes are applied consistently**
    - Render `LandingPage` with default data; query all `h1`–`h3` elements and assert Cormorant Garamond font class; query body text/label elements and assert DM Sans font class
    - **Validates: Requirements 10.2, 10.3**

  - [ ]* 11.3 Write property test for Unsplash image sources (Property 10)
    - **Property 10: All images are sourced from Unsplash**
    - Render `LandingPage` with default data; query all `<img>` elements and assert every `src` attribute contains `"unsplash.com"`
    - **Validates: Requirements 11.5**

  - [ ]* 11.4 Write property test for gender-neutral text (Property 11)
    - **Property 11: All rendered text is gender-neutral**
    - Render `LandingPage` with default data; extract all text content and assert none contains "ladies", "women", "woman", "her", "she", or "girls"
    - **Validates: Requirements 10.6**

- [x] 12. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- All 11 correctness properties from design.md are covered by property-based test sub-tasks (2.2, 4.2, 4.3, 5.2, 6.2, 6.3, 7.2, 7.3, 11.2, 11.3, 11.4)
- Property tests use `fast-check` with a minimum of 100 iterations each
- The entire output is a single `AestheticClinic.jsx` file — no sub-files, no separate CSS
- All placeholder images must be sourced from Unsplash URLs (Requirement 11.5)
- All copy must remain gender-neutral throughout (Requirement 10.6)
