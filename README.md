# Studio website + fourteen business demos

A Next.js 14 / TypeScript / Tailwind site with two jobs:

- `/` — the studio's own marketing site and lead-capture flow.
- `/demos/*` — fourteen complete, standalone business websites you can send
  directly to a prospect.

```bash
npm install
npm run dev      # http://localhost:3000
```

### Windows (PowerShell)

```powershell
# 1. Install Node.js 20 LTS from https://nodejs.org if `node -v` fails.
Expand-Archive .\studio-website-v26.zip -DestinationPath .\studio-website
cd .\studio-website
npm install
npm run dev          # http://localhost:3000
```

If PowerShell blocks `npm` with "running scripts is disabled", run
`Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once, or use
`npm.cmd run dev`. No Google Fonts access is needed at any point: every font
is bundled in `src/fonts/`.

Before showing the site to anyone, run the one check that needs your
network (it requests every photo from Unsplash):

```powershell
npm run check:images
```

Full verification: `npm run verify` (content audit, design audit, image
check, production build).

See **`docs/DESIGN_PRINCIPLES.md`** for the engineering standard this
codebase is held to, and **`docs/AUDIT.md`** for what's been verified,
what's been fixed, and what's still open against the master prompt.

---

## Studio homepage

The homepage is built from live views of the demo sites themselves.

- `src/config/studio-demos.ts` is the single list of the fourteen demos
  (name, industry, group, summary, highlights). The hero explorer, the work
  tiles and the filterable index all read from it.
- `src/config/projects.ts` lists deployed projects outside this repo. Only
  entries with a real URL render. To add Goal4u, ZiloPlay or later versions
  such as Goal4u-v1, uncomment or add an entry with its verified URL.
- `src/components/ScaledFrame.tsx` shows a demo in a scaled iframe at a true
  desktop or phone width, so previews never go stale.
- Buttons come from `buttonClass` / `Button` in `src/components/ui.tsx`.


## The fourteen demos

| Route | Business | Identity |
|---|---|---|
| `/demos/restaurant` | Ember & Olive | Dark wood-fired room. DM Serif Display + Work Sans. Full-screen overlay nav, reservation ticker, horizontal dish rail, newspaper menu. USD. |
| `/demos/hotel` | The Aurelia House | Fourteen-room house in Lisbon. Cormorant Garamond + Jost. Booking bar floating over the hero, alternating full-width rooms, numbered house list. EUR. |
| `/demos/salon` | Maison Form | Monochrome editorial. Bodoni Moda + Space Grotesk. Fixed vertical nav rail on desktop, oversized type, marquee band. GBP, Newcastle upon Tyne. |
| `/demos/service` | Northline Home Services | Trade-business trust. Plus Jakarta Sans only. Quote form embedded in the hero, connected process timeline, sticky mobile action bar. USD. |
| `/demos/retail` | Fielding & Rye | Product-forward retail. Syne + Manrope, squared-off frames. Asymmetric hero-plus-stack grid, real filter/sort PLP, PDP with a sticky mobile add-to-cart bar, a working cart. USD. |
| `/demos/realestate` | Halyard Property | Research-tool real estate. Marcellus + Public Sans. GET-based search hero, homepage listings as a ledger row list, map-synced listings page, key-facts table on every property page. AUD, Sydney. |
| `/demos/fitness` | Vantage Athletic Club | Dark, bold gym. Anton + Barlow. Diagonal-offset trainer stack, a membership comparison table. USD, Austin. |
| `/demos/clinic` | Willowmere Dental Care | Calm dental practice. Literata + Karla. Zero-JS accordion for services, a mid-page appointment band. USD, Portland. |
| `/demos/photography` | Rowan & Ash Photography | Minimal-chrome portfolio site. Spectral throughout. CSS-columns masonry, plain-type pricing, no cards. USD. |
| `/demos/travel` | Wayfare & Co | Warm tour agency. Petrona + Nunito Sans. Zero-JS destination search, a day-rail itinerary, a staggered trip grid. USD. |
| `/demos/auto` | Ridgeline Motors | Confident dealership. Oswald + Roboto. Inventory search, a real spec-comparison `<table>` with a pinned first column. USD, Detroit. |
| `/demos/wedding` | Linden & Rose Events | Soft editorial. Italiana + Mulish, `rounded-3xl`. A story scroll, a plain dated process list, a consultative enquiry form. USD, Savannah. |
| `/demos/education` | Cobalt University | University site (fictional). Newsreader + Source Sans 3. Programs as fact rows with a `<dl>`, admissions as a checklist. USD. |
| `/demos/construction` | Marrow & Stone | Industrial/blueprint. Big Shoulders Display + IBM Plex Sans. A static before/after pane, a bordered process grid. USD. |

Each demo gets one country, and its address format, currency and date format
all agree. Changing one means changing all of them on that page. No two
demos share a homepage section composition or a corner-radius language —
see `docs/AUDIT.md`'s round 3 entry for the reasoning behind each choice.

---

## Photography


All image references live in **`src/config/images.ts`**. Nothing else in the
codebase contains a URL.

Each entry is a `Photo` record — a URL *plus the alt text describing what is
actually in the frame*:

```ts
shortRib: photo("photo-1550367363-ea12860cc124", "Cooked short rib"),
```

Two rules follow from that, and both are enforced by `npm run audit:content`:

1. **Components never write their own alt text.** They render `photo.alt`.
   A caption and its picture are described by the same source of truth, so a
   dish name can't drift away from the photograph beside it.
2. **Nothing renders `<Image>` or `<img>` directly** — everything goes
   through `<Photo>` in `src/components/Photo.tsx`.

### Swapping a photo

Change the ID *and* rewrite the alt to match the new frame. If a page shows
that description as a visible caption (restaurant gallery, hotel gallery),
the caption updates with it automatically. If you change a photo under a
hand-written label — a dish name, a service name — rewrite the label too.

> **Before sending this to a prospect:** run `npm run check:images`. The
> `retail`, `realestate`, `fitness`, `clinic`, `photography`, `travel`,
> `auto`, `wedding`, `education` and `construction` entries were all added
> without network access in the environment that built them, so their
> Unsplash IDs are unverified — everything from the original four demos
> has been checked. A failed ID doesn't break the layout (the graded
> placeholder in `public/img/` takes over automatically) but it does mean
> the wrong photo, so swap any that fail before it goes out.

### Why images can't leave holes

`<Photo>` sits inside a `<Frame>` that owns its own aspect ratio, so the box
exists before the picture arrives and keeps its size if the picture never
does. If a URL fails, the component swaps to a locally bundled placeholder
(`public/img/placeholder-*.svg`, generated by `npm run make:placeholders`)
rather than dumping alt text into the layout. Alt text still reaches screen
readers; it never becomes visible debris.

### Colour grading

Stock photography from different sessions never matches out of the box.
Every image on a demo is graded through one curve — `.grade-ember`,
`.grade-aurelia`, `.grade-maison`, `.grade-northline`, `.grade-retail`,
`.grade-realestate`, `.grade-fitness`, `.grade-clinic`, `.grade-photo`,
`.grade-travel`, `.grade-auto`, `.grade-wedding`, `.grade-education`,
`.grade-construction` in `globals.css` — so a mixed set reads as a single
shoot. Maison Form's full monochrome grade is the brand's identity, not a
patch.

---

## Contact details

No placeholder contact value renders anywhere. Studio details come from env
vars (`.env.example`); demo-business details come from
**`src/config/demos.ts`**, where all fourteen businesses ship empty:

```ts
restaurant: { phone: "", whatsapp: "", email: "" },
```

An empty value means the affordance that would have shown it renders
*nothing* — no greyed-out button, no `(000) 000-0000`. Fill a value in and
the call / WhatsApp / email button appears on its own. The service demo's
sticky mobile bar falls back to "Get a free quote" until a number exists.

---

## Layout patterns

Two small reusable primitives carry the motion and rail patterns across the
site, rather than each section inventing its own:

- **`src/components/Reveal.tsx`** — the one scroll-entrance animation.
  Wrap anything in `<Reveal index={i}>` and it fades and slides in the first
  time it enters the viewport, staggered by `index` (4 delay steps, then
  repeating). It renders nothing extra when `prefers-reduced-motion` is set —
  the content is just shown immediately.
- **`src/components/Rail.tsx`** — the one horizontal-scroll pattern (built
  for the restaurant's dish rail, reused as-is for the hotel's gallery). It
  pairs the existing `.rail` scroll-snap track with a faint drifting
  starfield texture (`.rail-field` in `globals.css`) and staggers its cards
  through `Reveal` automatically.

Composition is deliberately varied section-to-section on every page — no two
sections on the same page share the same shape, and no page repeats a
"heading + row of N equal items" layout. Each section's `className` is
preceded by a one-line comment naming its composition (asymmetric span grid,
alternating text/image blocks, mixed-size gallery tiles, info row, full-bleed
breather, marquee divider, and so on) so the intent is visible in the code,
not just on screen.

## Verification

```bash
npm run audit:content   # content audit — runs offline
npm run audit:design    # design-system audit — runs offline
npm run check:images    # HTTP status + real pixel dimensions — needs network
npm run build           # type-check and compile
npm run verify          # all three
```

**`audit:content`** asserts the defects that make a site read as generated
rather than built can't come back: no placeholder contact values, no invented
statistics or star ratings or named testimonials, no banned copy, no photo
key referenced but undefined, no photo defined but never rendered, and no
image bypassing `<Photo>`.

**`audit:design`** fails on any arbitrary Tailwind utility (`p-[18px]`,
`text-[15px]`) or raw length in markup. It can afford to be that strict
because `tailwind.config.ts` *replaces* the spacing, fontSize, boxShadow and
letterSpacing scales with the tokens in `globals.css` rather than extending
them — `p-5`, `text-4xl` and `shadow-lg` don't compile at all.

**`check:images`** requests every URL in the registry, decodes the real pixel
dimensions from the response bytes (no image library needed), and exits
non-zero on any non-200 or any image under 800px on its longest edge. Run it
before you send a demo link to anyone.

---

## What's honest here

These are concept builds, not client work, and the sites say so. There are no
invented statistics, ratings, review counts or testimonials on any of the four
demos — a real business's numbers go in when that business gives them to you.

---

## Content, not code

Most of what you'll change per prospect lives in three files:

- `src/config/site.ts` — studio name, founder, links
- `src/config/demos.ts` — the demo businesses' contact details
- `src/config/images.ts` — every photograph and its description

Page copy — menus, room types, prices, service lists, FAQs — sits in plain
arrays at the top of each `page.tsx`.

## Deploying

Works as-is on Vercel or Netlify. Set the env vars from `.env.example`.
`next.config.mjs` already allows `images.unsplash.com`; add any new image host
there before referencing it.

The studio contact form posts to `/api/lead` (`src/app/api/lead/route.ts`) and
emails you via Resend and/or calls a webhook. See **DEPLOY.md** for setup; without
configuration the form shows an honest error instead of a fake success.

---

## Routes added in v11

Every demo that used to be a single scrolling page now has at least one
dedicated second route, linked from its nav and footer:

| Demo | New route(s) |
|---|---|
| Restaurant | `/demos/restaurant/menu` — full menu with sticky section index |
| Hotel | `/demos/hotel/rooms` — rate table + per-room spreads |
| Salon | `/demos/salon/services` — prices with appointment-length bars |
| Fitness | `/demos/fitness/schedule` — filterable weekly timetable |
| Clinic | `/demos/clinic/treatments` — keyboard-navigable treatment tabs |
| Photography | `/demos/photography/portfolio` — filterable gallery + lightbox |
| Travel | `/demos/travel/trips` — four itineraries with sample days |
| Auto | `/demos/auto/financing` — working payment estimator |
| Wedding | `/demos/wedding/weddings`, `/demos/wedding/packages` |
| Education | `/demos/education/programs` — program comparison |
| Construction | `/demos/construction/projects` — projects as spec sheets |

Retail, Real Estate and Service already had multi-route structures (shop /
product pages, listings / listing pages) or the deepest single page
(Service, 8 sections), so they received footer, bug-fix and content-honesty
changes rather than new routes. See `docs/AUDIT.md` (v11 section).

## Mobile checks

`npm run audit:mobile` (needs `npx playwright install chromium` once and the site
running) crawls every route in a phone viewport and flags horizontal overflow,
off-screen elements, small tap targets, form fields under 16px (iOS zooms the page
on focus) and tiny text. `audit-shots/` holds a screenshot per route. As of this
version it reports 0 issues at 390x844 and 360x740 across all 41 routes.

## Known item: one product photo needs a real image (currently a bundled graphic)

`retail.belt` in `src/config/images.ts` points at an Unsplash photo ID that does
not exist (the dev log shows a 404 for `photo-1553062407-98eeb64c6a63`). The site
handles it by showing that photo's bundled fallback graphic, so nothing breaks,
but it should be replaced: find a leather-belt photo on unsplash.com, copy the
`photo-…` part of its URL into `retail.belt`, keep the alt text accurate to what
the photo shows, then run `npm run check:images` on a machine with internet.
Messages like `GET /.well-known/appspecific/com.chrome.devtools.json 404` in the
dev log are Chrome DevTools probing for a file and are harmless.

## Navigation speed, loader and scrolling

- **Previews:** the homepage previews are whole sites running in iframes. They load only after the page is idle and near the viewport, they run sandboxed, and they are removed the moment an internal link is clicked (`components/ScaledFrame.tsx`). Measured on a production build: clicking from the homepage to a demo went from about 2.3 s to about 0.15 s.
- **Loader:** a thin progress bar (`components/NavigationProgress.tsx`) starts on any internal link click; `app/loading.tsx` shows a spinner while a page is fetched.
- **Scrolling:** `components/ScrollManager.tsx` opens every page at the top, on navigation and on refresh. Links with an `#anchor` still land on their target. Browser Back no longer restores the old scroll position.
- `npm run dev` is slower than production because each page compiles on first visit. Judge speed on `npm run build && npm start` or the deployed site.

## Search setup (v26)

The homepage title/description, structured data and a services page
(`/website-design-and-development`) target "website designer and developer"
searches. Set `NEXT_PUBLIC_SERVICE_AREA` (e.g. Guntur) to add a place to the
title and structured data. Existing pages were not changed: their rendered HTML
is identical to the previous version. See DEPLOY.md, Part 6.
