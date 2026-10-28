# Design Principles — Source of Truth

This file is the studio's internal engineering standard. It is the merged
content of the two briefing documents used to plan this redesign:

1. **Senior-Level Website Design & Development Principles** — universal
   design-system discipline, plus a playbook for 12 business verticals
   (what each industry's information architecture, layout and conversion
   flow should actually look like).
2. **The Ultimate Master Principles** — how a senior/principal frontend
   developer thinks before building: the mental model, responsive/mobile as
   a first-class discipline (device tiers, container queries, fluid type,
   navigation patterns, table patterns, form patterns), and the full
   engineering/design principle set (hierarchy, typography, spacing, color,
   components, interaction, loading/error/empty states, animation,
   performance, accessibility, cross-browser, content resilience,
   maintainability).

Every implementation decision in `/src` is expected to trace back to a
principle in this document. Where a decision in the code deliberately
diverges from a principle below (e.g. Maison Form's desktop layout is kept
intentionally as-is), that's called out in a comment at the point of
divergence, not silently.

> The two source documents are reproduced in full below so nothing is
> summarized away. Skip to **Part 4** for the specific checklist this
> project is graded against.

---

## PART 1 — Universal Principles (every build)

**1.1 Design system before design.** A build starts with tokens — type
scale, color roles, an 8px spacing grid, and a component library with
defined states — not a homepage mockup. This project enforces it
mechanically: `tailwind.config.ts` *replaces* Tailwind's spacing/fontSize/
boxShadow/letterSpacing scales with the tokens declared in `globals.css`,
so `p-5` or `text-[15px]` don't compile, and `npm run audit:design` fails
the build on any arbitrary utility or raw px/rem value in markup.

**1.2 Information architecture before layout.** Every page should let a
visitor answer, within one scroll: *What is this? Is it for me? Can I
trust it? What do I do next?* If it can't, the layout has failed regardless
of polish.

**1.3 Visual hierarchy discipline.** One primary CTA style per screen,
consistently placed; secondary actions stay visually quiet; whitespace is a
tool, not empty space to fill.

**1.4 Grid & responsive architecture.** Mobile-first. 12-column grid or
CSS Grid/Flexbox equivalent. Breakpoints roughly 480/768/1024/1280/1440px.
Touch targets ≥44×44px. No accidental horizontal scroll — wide content
scrolls in its own contained region.

**1.5 Performance as a design constraint.** Modern image formats, responsive
`srcset`, lazy-loading below the fold. LCP < 2.5s, CLS near zero.

**1.6 Accessibility is non-negotiable.** Semantic HTML, one `<h1>` per page,
real alt text, WCAG AA contrast (4.5:1 body text), full keyboard and
screen-reader operability.

**1.7 Trust architecture.** Social proof placed at the exact decision
point, not a separate page. Transparency signals (real photos, clear
pricing, real contact info) over decoration. This project's specific rule:
**no invented credibility** — no fabricated review counts, ratings,
"years in business" or client logos on any demo, enforced by
`npm run audit:content`.

**1.8 Conversion architecture.** Every page has one job: a defined primary
goal, one repeated primary CTA, and friction (form fields, clicks,
redirects) cut ruthlessly.

---

## PART 2 — Industry Playbooks (condensed to what this project uses)

Each vertical gets its **own** information architecture, navigation
pattern, layout structure, typography pairing and conversion flow — never
the same `Hero → cards → features → testimonials → CTA` template reskinned.
The full 12-vertical playbook (e-commerce, real estate, fitness,
clinic/dental, photography, travel, auto dealership, wedding/events,
education, local retail/boutique, professional services, construction/
architecture) is carried in the master prompt (`Master Prompt — Redesign,
Refactor & Expand Gowra Studio`, section 5) and is the backlog this codebase
is built against. See `docs/AUDIT.md` for which verticals are implemented
in this delivery and which remain.

---

## PART 3 — Responsive & Mobile as a First-Class Discipline

- **Redesign, don't shrink.** A desktop layout scaled down is not a mobile
  layout — navigation pattern, density, and structure get rethought per
  breakpoint.
- **Device tiers:** small mobile 320–479px (single column, hamburger nav,
  tables become stacked cards, body text never below 16px), mobile-large
  480–767px (sticky bottom CTA becomes viable), tablet portrait 768–1023px
  (two-column grids viable), tablet-landscape/small-desktop 1024–1279px
  (sidebar layouts viable), desktop 1280–1439px, large desktop 1440px+
  (cap content width, don't stretch).
- **Container queries over viewport queries alone** for components reused
  in more than one layout context.
- **Fluid values** (`clamp()`) over hard breakpoint jumps where practical.
- **Navigation changes shape, not size** — hamburger/drawer, bottom tab
  bar, or a collapsing sticky header, never a shrunk desktop bar.
- **Tables never just scroll** — stack to cards, prioritize columns, or (if
  genuinely grid-like data) scroll with a pinned first column.
- **Forms restructure** to one field per row on mobile (except genuinely
  short paired fields like city/state/zip); inputs ≥16px to avoid iOS
  zoom-on-focus; 44×44px tap targets; long option lists use the native
  `<select>` on mobile.
- **Images adapt structurally** — `srcset`/`sizes`, reserved aspect ratio
  (this project's `<Frame>` primitive), a full-bleed gallery may become a
  single swipeable frame on mobile rather than a shrunk grid.
- **Test matrix:** 320, 375, 390, 428, 768, 1024 (portrait + landscape),
  1280, 1440, 1920px, plus `prefers-reduced-motion` and 200% zoom.

---

## PART 4 — Engineering & Design Principle Set (checklist this repo is held to)

- [ ] Design tokens (color/type/spacing) used consistently — zero one-off
      hardcoded values (`npm run audit:design`)
- [ ] Mobile-first, tested at the full breakpoint matrix above
- [ ] LCP-friendly images, lazy-loaded, no layout shift (`<Frame>` reserves
      aspect ratio before the picture arrives)
- [ ] WCAG AA contrast, full keyboard/screen-reader accessibility
- [ ] One clear primary CTA per page, repeated at natural intervals
- [ ] Trust signals at the decision point, not isolated
- [ ] Forms reduced to the minimum fields for that step
- [ ] No dead-end redirects to disconnected tools where avoidable
- [ ] Content editable without touching component code where it changes
      often (`src/config/*.ts`)
- [ ] Loading, empty and error states considered for anything client-side
      (filters, cart, search)
- [ ] Every added element earns its place — removed and asked "did the
      page get worse?"
- [ ] No invented credibility anywhere (`npm run audit:content`)

---

## Closing principle

Treating the website as a system — a consistent design language, an
information architecture built around the one action that matters for that
business, and an engineering standard that never gets sacrificed for how
something looks — is what makes industry adaptation straightforward. The
"one action" and the proof a visitor needs change per business; the
discipline underneath doesn't.
