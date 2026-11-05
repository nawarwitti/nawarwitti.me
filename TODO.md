# TODO — what is still missing

Tick each box when it is done. Section 5 of `README.md` explains how to add files and images.
Until a picture is added, the site shows a dashed box with a label, so nothing looks broken.

## 1. Most important (before sharing the link)

- [x] **Real CV** — added as `public/cv.pdf` (FlowCV export without the phone number).
- [x] **Photo** — shown on the About page only (`public/photo.webp`).
- [x] **Şam Şerif title confirmed:** "General Manager & Partner" (used on the site).
- [ ] **Match the title in the CV and on LinkedIn:** the CV says "Partner & Business Development Manager" and LinkedIn says "General Manager". Change both to "General Manager & Partner".
- [ ] **Proofread the Turkish version** (`/tr/`). The Turkish text was translated from the English plan — check it reads naturally to you, especially technical terms and job titles (`src/content/*/tr.json`, `src/content/projects/tr/`).
- [ ] **Proofread the Arabic version** (`/ar/`). Check the wording, job titles and month names (`src/content/*/ar.json`, `src/content/projects/ar/`). Your Arabic name is written "نوار وتي" (header, page titles, footer).
- [x] **Pushed to GitHub, Pages + custom domain + HTTPS on.** After each change run `git push`.

## 2. Project images

Put each image once in `public/`, then add its `src:` line in **both** language files (`src/content/projects/en/…` and `src/content/projects/tr/…`).

### P1 — Wireless EMG/EKG/EOG device (`biosignal-device.md`)

- [x] Concept drawings (PCB top view + device/app) — added as cover and gallery, labelled as concept
- [ ] Optional: real block diagram → `public/projects/biosignal/block-diagram.png`
- [ ] Frequency-response plot → `public/projects/biosignal/frequency-response.png`
- [ ] CMRR plot → `public/projects/biosignal/cmrr.png`
- [ ] Breadboard photo(s) → `public/projects/biosignal/breadboard.jpg`
- [ ] Optional: LTspice / Proteus screenshots (add them as more `gallery` items)

### P2 — Buck converter & measurement circuits (`buck-converter.md`)

- [x] Op-amp circuits on breadboard, LTspice OP747 simulation, Proteus voltage divider (from the internship notebook)
- [ ] Buck converter schematic → `public/projects/gp-tech/buck-schematic.jpg`
- [ ] XL4016 module photo → `public/projects/gp-tech/xl4016.jpg`

### P3 — Voltmeter/ammeter reverse engineering (`voltmeter-reverse-engineering.md`)

- [x] HKS-DC028 module photo + redrawn Proteus schematic (from the internship notebook)

### P4 — In-house PCB (`pcb-fabrication.md`)

- [x] Finished board + EasyEDA layout photo (from the internship notebook)
- [ ] Optional: photo of the etched copper side

### P5 — Transistor H-bridge (`h-bridge.md`)

- [x] Proteus schematic (from the internship notebook)
- [ ] Optional: photo of the H-bridge on the breadboard

### P6 — Physiological signal simulation system (`biosignal-simulator.md`)

- [ ] Simulation screenshot → `public/projects/biosignal-simulator/cover.png`

## 3. Missing facts

- [ ] **P1 dates** — when did the TÜBİTAK project start, and when is it expected to finish? Add `date:` in `projects/en/biosignal-device.md` and `projects/tr/biosignal-device.md` (there is a `# TODO` line in both).
- [ ] **P6 date** — when was the signal simulation project done? Add `date:` in `projects/en/biosignal-simulator.md` and `projects/tr/biosignal-simulator.md`.
- [ ] **Phone number** — not published on purpose (privacy). Decide if you want it on the site. If yes, tell a developer or add it to `src/views/ContactPage.astro`.
- [ ] **P1 hardware results** (later) — when you have real measurements (measured CMRR, real EMG/EKG/EOG plots), add them to `results` and `gallery` in both `biosignal-device.md` files. Today all numbers are from simulation and are labelled "(sim.)".

## 4. Optional

- [ ] Better share image: `public/og-image.png` was generated automatically (black, name, red pulse line). You can replace it with your own 1200 × 630 image, or edit and run `npm run og`.
- [ ] After going live: add `https://nawarwitti.me` to LinkedIn and to the CV header.
- [x] Lighthouse (local, built site): 100 / 100 / 100 / 100 on every page tested, mobile and desktop; About page on mobile 98–99 (photo). Re-test on the live site after big changes.
- [x] Fonts self-hosted (no Google Fonts).
- [ ] **Turn on visitor statistics:** sign up at goatcounter.com and put the code in `src/site.config.ts` (README section 10).

## 5. Phase 2 (later, from the plan)

- [x] Turkish version at `/tr/` (README section 12).
- [x] Arabic version at `/ar/`.
- [ ] `/notes` section for short technical write-ups or explainer videos.
- [ ] Optional full-dark theme toggle.
- [ ] Optional contact form (for example Formspree).
