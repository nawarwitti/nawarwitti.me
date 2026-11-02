# TODO — what is still missing

Tick each box when it is done. Section 5 of `README.md` explains how to add files and images.
Until a picture is added, the site shows a dashed box with a label, so nothing looks broken.

## 1. Most important (before sharing the link)

- [x] **Real CV** — added as `public/cv.pdf` (FlowCV export without the phone number).
- [x] **Photo** — removed on request; the site has no photo. (README section 5 explains how to add one later.)
- [x] **Şam Şerif title confirmed:** "General Manager & Partner" (used on the site).
- [ ] **Match the title in the CV and on LinkedIn:** the CV says "Partner & Business Development Manager" and LinkedIn says "General Manager". Change both to "General Manager & Partner".
- [ ] **Proofread the Turkish version** (`/tr/`). The Turkish text was translated from the English plan — check it reads naturally to you, especially technical terms and job titles (`src/content/*/tr.json`, `src/content/projects/tr/`).
- [ ] **Push to your GitHub and turn on Pages + HTTPS** (README section 6).

## 2. Project images

Put each image once in `public/`, then add its `src:` line in **both** language files (`src/content/projects/en/…` and `src/content/projects/tr/…`).

### P1 — Wireless EMG/EKG/EOG device (`biosignal-device.md`)

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

- [ ] **P1 dates** — when did the TÜBİTAK project start, and when is it expected to finish? Add `date:` in `projects/en/biosignal-device.md` and `projects/tr/biosignal-device.md` (there is a `# TODO` line in both).
- [ ] **P6 date** — when was the signal simulation project done? Add `date:` in `projects/en/biosignal-simulator.md` and `projects/tr/biosignal-simulator.md`.
- [ ] **Phone number** — not published on purpose (privacy). Decide if you want it on the site. If yes, tell a developer or add it to `src/views/ContactPage.astro`.
- [ ] **P1 hardware results** (later) — when you have real measurements (measured CMRR, real EMG/EKG/EOG plots), add them to `results` and `gallery` in both `biosignal-device.md` files. Today all numbers are from simulation and are labelled "(sim.)".

## 4. Optional

- [ ] Better share image: `public/og-image.png` was generated automatically (black, name, red pulse line). You can replace it with your own 1200 × 630 image, or edit and run `npm run og`.
- [ ] After going live: add `https://nawarwitti.me` to LinkedIn and to the CV header.
- [ ] Run a Lighthouse test on the live site (Chrome → F12 → **Lighthouse**). Target: 95+ for Performance, Accessibility and SEO. Real photos should be compressed (under ~400 KB each) to keep the score high.

## 5. Phase 2 (later, from the plan)

- [x] Turkish version at `/tr/` (README section 9).
- [ ] `/notes` section for short technical write-ups or explainer videos.
- [ ] Optional full-dark theme toggle.
- [ ] Optional contact form (for example Formspree).
