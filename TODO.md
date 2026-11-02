# TODO — what is still missing

Tick each box when it is done. Section 5 of `README.md` explains how to add files and images.
Until a picture is added, the site shows a dashed box with a label, so nothing looks broken.

## 1. Most important (before sharing the link)

- [ ] **Real CV** — export from FlowCV → save as `public/cv.pdf` (replace the placeholder).
  The current `cv.pdf` is a one-page **placeholder** that says the real CV is coming. Do not share the site before replacing it.
  **Remove the phone number in FlowCV before exporting** — the CV is public on the site and the phone must stay private.
- [x] **Professional photo** — added as `public/photo.jpg` (Home hero and About).
- [ ] **Confirm your Şam Şerif title.** The CV says "Partner & Business Development Manager", LinkedIn says "General Manager". The site now uses **"General Manager & Partner"** (`src/content/experience.json`). Change it there if you prefer another title.
- [ ] **Push to your GitHub and turn on Pages + HTTPS** (README section 6).

## 2. Project images

### P1 — Wireless EMG/EKG/EOG device (`src/content/projects/biosignal-device.md`)

- [ ] Block diagram → `public/projects/biosignal/block-diagram.png` (cover image)
- [ ] Frequency-response plot → `public/projects/biosignal/frequency-response.png`
- [ ] CMRR plot → `public/projects/biosignal/cmrr.png`
- [ ] Breadboard photo(s) → `public/projects/biosignal/breadboard.jpg`
- [ ] Optional: LTspice / Proteus screenshots (add them as more `gallery` items)

### P2 — Buck converter & measurement circuits (`buck-converter.md`)

- [ ] Buck converter photo or schematic → `public/projects/gp-tech/buck-converter.jpg` (cover)
- [ ] Buck schematic → `public/projects/gp-tech/buck-schematic.jpg`
- [ ] XL4016 module photo → `public/projects/gp-tech/xl4016.jpg`
- [ ] Measurement circuit on breadboard → `public/projects/gp-tech/measurement.jpg`

### P3 — Voltmeter/ammeter reverse engineering (`voltmeter-reverse-engineering.md`)

- [ ] HKS-DC028 module photo → `public/projects/gp-tech/hks-dc028.jpg` (cover)
- [ ] Redrawn Proteus schematic → `public/projects/gp-tech/hks-dc028-schematic.png`

### P4 — In-house PCB (`pcb-fabrication.md`)

- [ ] Etched copper board photo → `public/projects/gp-tech/pcb-etching.jpg`

### P5 — Transistor H-bridge (`h-bridge.md`)

- [ ] H-bridge on breadboard → `public/projects/gp-tech/h-bridge.jpg`

### P6 — Physiological signal simulation system (`biosignal-simulator.md`)

- [ ] Simulation screenshot → `public/projects/biosignal-simulator/cover.png`

## 3. Missing facts

- [ ] **P1 dates** — when did the TÜBİTAK project start, and when is it expected to finish? Add `date:` in `biosignal-device.md` (there is a `# TODO` line in the file).
- [ ] **P6 date** — when was the signal simulation project done? Add `date:` in `biosignal-simulator.md`.
- [ ] **Phone number** — not published on purpose (privacy). Decide if you want it on the site. If yes, tell a developer or add it to `src/pages/contact.astro`.
- [ ] **P1 hardware results** (later) — when you have real measurements (measured CMRR, real EMG/EKG/EOG plots), add them to `results` and `gallery` in `biosignal-device.md`. Today all numbers are from simulation and are labelled "(sim.)".

## 4. Optional

- [ ] Better share image: `public/og-image.png` was generated automatically (black, name, red pulse line). You can replace it with your own 1200 × 630 image, or edit and run `npm run og`.
- [ ] After going live: add `https://nawarwitti.me` to LinkedIn and to the CV header.
- [ ] Run a Lighthouse test on the live site (Chrome → F12 → **Lighthouse**). Target: 95+ for Performance, Accessibility and SEO. Real photos should be compressed (under ~400 KB each) to keep the score high.

## 5. Phase 2 (later, from the plan)

- [ ] Turkish version at `/tr/` (README section 9).
- [ ] `/notes` section for short technical write-ups or explainer videos.
- [ ] Optional full-dark theme toggle.
- [ ] Optional contact form (for example Formspree).
