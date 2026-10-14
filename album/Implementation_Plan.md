# Birthday Photo Album Website: Implementation Plan

## Phase 0: Project setup

- Create the Next.js app with TypeScript, Tailwind and ESLint: `npx create-next-app@latest`
- Install: `react-pageflip`, `framer-motion`, `howler`
- Set up the folders: `app/`, `components/`, `config/`, `data/`, `public/photos`, `public/music`
- Push to GitHub and connect it to Vercel for auto-deploy

**Done when:** a blank page is live on a Vercel URL.

## Phase 1: Theme system (single place for all styling)

- `app/theme.css`: all design tokens as CSS variables on `:root`
  - Colors: `--color-cover`, `--color-paper`, `--color-ink`, `--color-accent`, `--color-tape`, `--color-bg`
  - Fonts: `--font-title`, `--font-body`, `--font-hand`
  - Others: `--page-radius`, `--photo-border`, `--photo-shadow`, `--paper-texture`, `--flip-speed`
- `config/fonts.ts`: load the Google fonts with `next/font` and bind each to its CSS variable
- Map the variables into Tailwind (`@theme` / `tailwind.config`), so classes like `bg-paper` and `font-hand` read from the variables
- Rule: no hardcoded color or font anywhere else in the code

**Done when:** changing one variable in `theme.css` restyles the whole site.

## Phase 2: Data and types

- `config/layouts.ts`: all 10 templates plus the cover, as slots on a 200×100 spread
- `types.ts`: `TemplateName` union, `Slot`, `TextItem`, `StickerItem`, `SpreadData`
- `data/pages.ts`: your content, one object per spread (template, photos, texts)
- `config/site.ts`: her name, title, music file, cover text, end message

**Done when:** types compile and sample data autocompletes.

## Phase 3: Page renderer

- `SpreadCanvas`: draws one spread from a template and clips it to the left or right half
- `PhotoSlot`: image with `next/image`, `object-fit: cover`, tilt and tape options, click handler
- `TextItem` and `Sticker`: free-position layers on top of the photos
- Size everything in percent or container units so it scales on every screen

**Done when:** a single spread renders correctly for every template with dummy images.

## Phase 4: Book engine

- `Book.tsx`: wrap `HTMLFlipBook`, build the pages array from `pages.ts` (each spread becomes a left and a right page)
- `useBookSize` hook: computes width and height from the viewport, one page on mobile, two on desktop
- Leather cover and back cover pages, with paper texture and page shadows from the theme variables
- Full-viewport layout with centered book and no scrollbars

**Done when:** the book flips on desktop and phone.

## Phase 5: Interactions

- **Controls:** Prev and Next buttons, keyboard arrows, page counter
- **Image modal:** fullscreen overlay with close button, Esc to close, and click propagation stopped so it doesn't flip the page
- **Music:** "Open the book" button on the intro screen starts the audio and the cover animation, plus a mute/unmute button
- **Fullscreen toggle** button

**Done when:** all controls work and music starts after the first tap.

## Phase 6: Content

- Compress photos to WebP (200–300 KB), name them in order, and add them to `public/photos`
- Add the music file (MP3, under 5 MB) to `public/music`
- Fill `pages.ts` with all pages, photos and captions
- Write the cover and end-page messages in `site.ts`

**Done when:** the full album is readable from cover to end.

## Phase 7: Polish

- Preloader and lazy loading for page images
- Cover effects: sparkles or falling petals, soft page-turn sound (optional)
- Secret link or simple password gate
- OG preview image and page title
- Disable text selection and image dragging where needed

**Done when:** it feels finished on both devices.

## Phase 8: Test and deploy

- Test on a real phone (iOS Safari and Android Chrome) and on desktop
- Check touch swipe vs. image tap conflicts, music autoplay and slow-network loading
- Deploy to Vercel, set a custom project name for the URL, and test the final link
- Send her the link

**Done when:** the link works end to end on her phone.

## Order of work

Phases 0 to 5 can be built with dummy images. Phase 6 only needs your real photos at the end, so build in order 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8.
