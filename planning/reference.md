# Icons from '96 — Planning & Reference

Quick reference for editing copy, styling, and finding things in the codebase.

---

## Edit copy here first

### `lib/event-config.ts` — main content file

Most party/site content lives here. The file header says **EDITABLE CONTENT**.

| Export | What to edit |
| --- | --- |
| `event.host` | Host name (sign-off, etc.) |
| `event.siteUrl` | Fake URL shown in IE address bar & footer |
| `event.title` | Main event title |
| `event.subtitle` | Tagline under the title |
| `event.celebrating` | Two lines under the title |
| `event.lastUpdated` | "Last updated" date |
| `event.rsvpDeadline` | RSVP deadline (shown in multiple places) |
| `event.when` | Date & time |
| `event.where` | Address (two lines) |
| `event.dressCode` | Dress code title + blurb |
| `event.facility` | House/facility status table in footer |
| `event.personalMessage` | "Message from the archive" body text |
| `archive` | Costume inspiration folders + list items |
| `gallery` | Gallery images (paths, filenames, categories, alt text) |

Gallery image files go in **`public/gallery/`** (paths in config look like `/gallery/win95-box.png`).

---

## Copy that lives in components

Some UI text is still hardcoded in component files:

| File | What's there |
| --- | --- |
| `components/welcome-screen.tsx` | "WELCOME TO JO'S HOMEPAGE!!!", **NEW!** badge, marquee banner text, RSVP button |
| `components/event-info.tsx` | "EVENT DETAILS" section heading |
| `components/costume-archive.tsx` | "COSTUME INSPIRATION ARCHIVE" heading + intro |
| `components/gallery.tsx` | "PHOTO ARCHIVE" heading + intro |
| `components/footer-eggs.tsx` | Guestbook seed entries, fake "View Source" HTML, easter-egg dialogs |
| `components/rsvp-window.tsx` | Form labels, placeholders, success/error messages |
| `components/ie-window.tsx` | IE toolbar chrome, status bar text |
| `app/page.tsx` | "A MESSAGE FROM THE ARCHIVE" section heading, page section order |
| `app/layout.tsx` | Browser tab title + SEO meta description |

**Rule of thumb:** party facts & lists → `event-config.ts`. UI chrome, form wording, easter eggs → components.

---

## Styling reference — `app/globals.css`

### Fonts (Tailwind classes → CSS variables)

Defined in the `@theme inline` block (~line 47):

| Class | Variable | Current stack |
| --- | --- | --- |
| `font-sans` | `--font-sans` | Comic Sans MS, Comic Sans, cursive, sans-serif |
| `font-serif` | `--font-serif` | Georgia, Times New Roman, Times, serif |
| `font-mono` | `--font-mono` | Courier New, Courier, monospace |

**Where fonts are used:**
- `font-sans` — default body, buttons (`.btn95`), title bars, form labels, section headers
- `font-serif` — headlines, event copy, gallery intro, guestbook messages
- `font-mono` — marquee, visitor counter, filenames, status text, code-ish UI

No web fonts are loaded — everything uses system font stacks.

### Theme colors (~line 52)

| Variable | Hex | Used for |
| --- | --- | --- |
| `--color-win` | `#c0c0c0` | Windows gray panels |
| `--color-win-shadow` | `#808080` | Shadows, dividers |
| `--color-navy` | `#000080` | Title bars, section headers |
| `--color-desktop` | `#008080` | Page background (teal) |
| `--color-ie-link` | `#0000ee` | Links |
| `--color-ie-visited` | `#551a8b` | Visited links |
| `--color-hween-orange` | `#ff8c00` | Halloween accent |
| `--color-hween-purple` | `#8a2be2` | Halloween accent |
| `--color-toxic` | `#39ff14` | Marquee text, visitor counter |

Tailwind classes: `bg-navy`, `text-hween-orange`, `text-toxic`, etc.

### Lo-fi / retro look (~line 177)

Applied on `body`:

```css
-webkit-font-smoothing: none;   /* chunkier text, no Retina smoothing */
-moz-osx-font-smoothing: unset;
text-rendering: optimizeSpeed;
filter: blur(0.4px) contrast(1.08) saturate(0.92);  /* soft CRT feel */
```

Images use `image-rendering: pixelated` for blocky scaling.

**Tune the lo-fi effect:**
- More blurry/washed out → increase blur (`0.8px`), lower saturation (`0.85`)
- Sharper/cleaner → remove the `filter` line, or re-add `antialiased` on `<body>` in `app/layout.tsx`

### Animation speeds

| Element | Class | File | Property | Current value | How to tune |
| --- | --- | --- | --- | --- | --- |
| Scrolling banner | `.marquee-track` | `globals.css` | `animation` duration | **36s** | Higher = slower scroll |
| Blink (* stars, NEW!, etc.) | `.blink` | `globals.css` | `animation` duration | **3s** | Higher = slower blink |
| Loading bar | `.loadbar-fill` | `globals.css` | `animation` duration | **2.4s** | — |

Marquee text itself is passed as a prop in `components/welcome-screen.tsx` (long string inside `<Marquee text="..." />`).

### Windows 95 UI classes (`globals.css`)

| Class | Purpose |
| --- | --- |
| `.bevel-out` | Raised panel/button edge |
| `.bevel-in` | Sunken input/content well |
| `.bevel-thin-in` | Thin sunken line |
| `.btn95` | Classic gray push button |
| `.titlebar` | Navy window title bar |
| `.blink` | On/off blink animation |
| `.link96` | Blue underlined IE-style link |
| `.marquee-track` | Scrolling marquee |

---

## Project structure

```
icons-from-96/
├── app/
│   ├── layout.tsx          # Root HTML shell, meta tags, analytics
│   ├── page.tsx            # Main page — assembles all sections
│   ├── globals.css         # All styling, theme, animations
│   └── api/rsvp/route.ts   # POST endpoint → saves RSVP to Notion
├── components/
│   ├── welcome-screen.tsx  # Hero: title, marquee, visitor counter, RSVP CTA
│   ├── ie-window.tsx       # IE 3.0 browser chrome wrapper
│   ├── win-window.tsx      # Generic Win95 modal (used by RSVP + easter eggs)
│   ├── event-info.tsx      # Date, time, location, dress code table
│   ├── costume-archive.tsx # Folder-style costume inspiration lists
│   ├── gallery.tsx         # Photo grid
│   ├── footer-eggs.tsx     # Facility status, guestbook, easter eggs
│   ├── rsvp-window.tsx     # RSVP form modal
│   ├── marquee.tsx         # Scrolling banner component
│   ├── visitor-counter.tsx # Fake hit counter
│   └── ui/button.tsx       # shadcn button (mostly unused by retro UI)
├── lib/
│   ├── event-config.ts     # EDIT COPY HERE
│   ├── notion.ts           # Notion API client for RSVP submissions
│   └── utils.ts            # Utility helpers
├── planning/               # Planning docs (this folder)
├── public/
│   └── gallery/            # Gallery image files
├── .env.local              # NOTION_TOKEN, NOTION_DATABASE_ID (not committed)
├── .env.example            # Template for env vars
└── README.md               # Dev setup & Notion instructions
```

### Page flow (`app/page.tsx`)

1. `IeWindow` (browser chrome)
   - `WelcomeScreen` — hero + marquee
   - Message from the archive
   - `EventInfo`
   - `CostumeArchive`
   - `Gallery`
   - `FooterEggs`
2. `RsvpWindow` — modal overlay (opens on RSVP click)

---

## RSVP & backend

| What | Where |
| --- | --- |
| Form UI | `components/rsvp-window.tsx` |
| API route | `app/api/rsvp/route.ts` |
| Notion integration | `lib/notion.ts` |
| Env vars | `.env.local` — see `.env.example` |

Required: `NOTION_TOKEN`. Optional: `NOTION_DATABASE_ID`.

Without Notion configured, the site runs locally but RSVP submissions fail.

See `README.md` for full Notion setup steps.

---

## Dev commands

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Node 22+ (see `.nvmrc`).

---

## Quick tuning cheatsheet

| I want to… | Edit this |
| --- | --- |
| Change party title, date, address, message | `lib/event-config.ts` → `event` |
| Add/remove costume ideas | `lib/event-config.ts` → `archive` |
| Add gallery photos | Drop image in `public/gallery/`, add entry in `gallery` array |
| Change marquee banner text | `components/welcome-screen.tsx` → `<Marquee text="..." />` |
| Slow down / speed up banner | `app/globals.css` → `.marquee-track` animation duration |
| Slow down / speed up blink (*, NEW!) | `app/globals.css` → `.blink` animation duration |
| Change fonts | `app/globals.css` → `--font-sans`, `--font-serif`, `--font-mono` |
| Change colors | `app/globals.css` → `--color-*` in `@theme inline` |
| More/less blurry retro feel | `app/globals.css` → `body` filter + font-smoothing |
| Change browser tab title | `app/layout.tsx` → `metadata.title` |
| Edit guestbook seed entries | `components/footer-eggs.tsx` → `SEED_GUESTBOOK` |
| Edit RSVP form labels | `components/rsvp-window.tsx` |

---

## Notes from styling session

- Sans font changed from Arial → **Comic Sans MS** for more authentic 1996 homepage feel
- Serif kept as Times/Georgia, mono as Courier New
- Removed Tailwind `antialiased` from body for chunkier text
- Marquee slowed from 18s → **36s**
- Blink slowed from 1s → **3s** (affects all `.blink` elements site-wide)
- All emoji removed from UI copy (replaced with ASCII where needed)
