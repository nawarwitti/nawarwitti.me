# nawarwitti.me — Nawar Witti's personal website

This is the code for **https://nawarwitti.me**.
It is built with [Astro](https://astro.build) and Tailwind CSS, and it is hosted for free on **GitHub Pages**.

You do **not** need to know how to code to change the text. All text lives in simple files inside `src/content/`.

---

## 1. See the site on your computer

You need [Node.js](https://nodejs.org) installed once (version 24 LTS is best; at least 22.23.4).

Open a terminal in this folder and run:

```bash
npm install
```

```bash
npm run dev
```

Then open **http://localhost:4321** in your browser. The page updates by itself every time you save a file. Press `Ctrl + C` in the terminal to stop it.

Other useful commands:

| Command           | What it does                                                    |
| ----------------- | --------------------------------------------------------------- |
| `npm run build`   | Builds the final website into the `dist/` folder.               |
| `npm run preview` | Shows the built `dist/` site, exactly as visitors will see it.  |
| `npm run check`   | Checks the content files and code for mistakes.                 |
| `npm run og`      | Re-creates `public/og-image.png` (the picture shown when the link is shared). |
| `npm run font-fallbacks` | Re-creates the size-matched fallback fonts (only if you change fonts). |

> Tip: always run `npm run build` before you push. If it says **Complete!**, it is safe to publish.

---

## 2. Where the content is

The site has three languages: **English** at `/`, **Turkish** at `/tr/` and **Arabic** at `/ar/` (right-to-left).
Every content file exists three times: `en`, `tr` and `ar`.
**When you change something, change it in all three files.**

| What you want to change | English file | Turkish / Arabic file |
| --- | --- | --- |
| Name, pitch, summary, email, LinkedIn, About text, quick facts, education, certifications | `src/content/profile/en.json` | `profile/tr.json`, `profile/ar.json` |
| Jobs and roles (Experience page and Home)                | `src/content/experience/en.json` | `experience/tr.json`, `experience/ar.json` |
| Skills and languages                                     | `src/content/skills/en.json`     | `skills/tr.json`, `skills/ar.json` |
| Projects (one file per project)                          | `src/content/projects/en/*.md`   | `projects/tr/*.md`, `projects/ar/*.md` |
| Menu words, buttons, headings, page titles and descriptions (SEO) | `src/content/ui/en.json` | `ui/tr.json`, `ui/ar.json` |
| The CV that visitors download (same file for both)       | `public/cv.pdf`                  | `public/cv.pdf`                  |
| Images (same files for both)                             | `public/` (see section 5)        | `public/`                        |

Rules when editing `.json` files:

- Keep the quotes `"..."` around text.
- Put a comma `,` between items, but **not** after the last item in a list.
- If something breaks, run `npm run dev` — the terminal will tell you the file and line with the problem.

Rule when editing `.md` project files: if a value contains a comma — for example a Turkish decimal like `0,08 Hz` — put it in quotes: `'0,08 Hz'`.

---

## 3. Edit content

**Example — change the pitch on the Home page.** Open `src/content/profile/en.json` (and `tr.json` for Turkish) and change:

```json
"pitch": "From schematic to soldered board: analog, power and embedded electronics.",
```

**Example — add a new job.** Open `src/content/experience/en.json` and copy one `{ ... }` block inside `"jobs"`. Set `"order"` (1 = shown first, newest at the top). The Home page shows the first 4. Then do the same in `experience/tr.json` with the Turkish text.

```json
{
  "company": "New Company",
  "location": "City",
  "order": 1,
  "summary": "One sentence shown on the Home page.",
  "roles": [{ "role": "Your Role", "dates": "Jan 2027 – Present" }],
  "bullets": ["What you did.", "Another thing you did."]
}
```

Then change the `"order"` numbers of the other jobs so there are no duplicates.

To show several roles at one company (like Şam Şerif), list them in `"roles"`, newest first.
In Turkish files, write dates with Turkish month names (Oca, Şub, Mar, Nis, May, Haz, Tem, Ağu, Eyl, Eki, Kas, Ara) and "Günümüz" for "Present".

---

## 4. Add a new project

Adding a project = adding **one file per language**. No code changes.

1. Copy an existing file in `src/content/projects/en/`, for example `buck-converter.md`.
2. Rename it. The file name becomes the web address:
   `my-new-project.md` → `https://nawarwitti.me/projects/my-new-project/` and `https://nawarwitti.me/tr/projects/my-new-project/`
   (use small letters and dashes, no spaces).
3. Change the fields between the two `---` lines (see the example below).
4. Copy the file to `src/content/projects/tr/` and `src/content/projects/ar/` **with the same file name** and translate the text.
   If you skip this step, that language shows the English version until you add it.

```yaml
---
title: My new project
summary: One line that appears on the project card.
status: Completed            # or: In progress  (keep these English words in both languages)
date: Mar 2027               # optional
context: University project  # optional
tags: [Analog, PCB]
featured: false              # only ONE project should be true (it is shown big on Home)
order: 7                     # position in the list (1 = first)
cover:
  label: 'TODO: photo of the board'          # text shown until you add a picture
  src: /projects/my-new-project/cover.jpg    # add this line when the picture exists
  alt: Assembled PCB of my new project       # describe the picture (for blind visitors and Google)
problem: What problem it solves.             # optional
approach: How you solved it.                 # optional
whatIDid:
  - First thing I did.
  - Second thing I did.
results:                                     # optional — only real, measured numbers
  - { value: '12 V', label: Output voltage }
tools: [ESP32, KiCad]
gallery:                                     # optional — more pictures
  - label: Schematic
    src: /projects/my-new-project/schematic.png
    alt: Schematic of the circuit
nextSteps:                                   # optional — for projects in progress
  - Next thing to do.
---

You can also write normal text here (below the second ---). It appears on the project page.
```

Any section you leave out is simply not shown.
The Home page shows the `featured: true` project big, and the next 4 projects (by `order`) as cards.

---

## 5. Replace the CV and add images

### CV

To update the CV later:

1. In FlowCV, **remove your phone number** (the CV is public on the website).
2. Click **Download** to get your CV as a PDF.
3. Rename the file to exactly `cv.pdf`.
4. Put it in the `public/` folder and replace the old one.

All "Download CV" buttons (English and Turkish) use this file automatically.

### Your photo (About page)

Your photo is `public/photo.webp` and it is shown on the **About** page only (not on Home).
To change it, save a new portrait photo (4:5 shape, about 600 × 750 pixels, under 100 KB) in `public/` and put its name in `"photo": { "src": "/your-file.webp" }` in the three profile files. `.jpg` also works; `.webp` is smaller.
To remove it, delete the `"photo": { ... }` block from `src/content/profile/en.json`, `tr.json` and `ar.json`.

### Project images

1. Put the files in `public/projects/...`, for example `public/projects/biosignal/block-diagram.png`.
2. In the project's `.md` file — in **all** of `projects/en/`, `projects/tr/` and `projects/ar/` — add `src:` to the `cover` or `gallery` item (the path starts with `/` and does **not** include `public`):

```yaml
cover:
  label: Block diagram
  src: /projects/biosignal/block-diagram.png
  alt: Block diagram of the biosignal acquisition device
```

Until a `src` is added, the site shows a dashed box with the `label` text, so you can see what is still missing.

Tips: use `.jpg` for photos and `.png` for diagrams and plots. Keep each image under about 400 KB so the site stays fast. Never use stock photos — only your real boards, schematics and plots.

---

## 6. Put the site online (GitHub Pages)

Do these steps **once**, logged in to **your own** GitHub account.

### 6.1 Create the repository on GitHub

1. Go to https://github.com/new
2. Repository name: for example `nawarwitti.me`
3. Choose **Public**.
4. Do **not** tick "Add a README", ".gitignore" or "license" (this folder already has them).
5. Click **Create repository**.

### 6.2 Push this folder

This folder is already a git repository with the first commit made. Open a terminal **in this folder** and run these commands one by one. Replace `YOUR-USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR-USERNAME/nawarwitti.me.git
```

```bash
git branch -M main
```

```bash
git push -u origin main
```

The first time, a window opens and asks you to sign in to GitHub. Sign in with **your** account.

> If git says "Please tell me who you are", run these two commands with your own name and email, then try again:
>
> ```bash
> git config --global user.name "Nawar Witti"
> ```
>
> ```bash
> git config --global user.email "your-email@example.com"
> ```

### 6.3 Turn on GitHub Pages

1. On GitHub, open your repository → **Settings** → **Pages** (left menu).
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Go to the **Actions** tab. You will see "Deploy to GitHub Pages" running. Wait for the green tick (about 1–2 minutes). If it did not start, click it and press **Run workflow**.

### 6.4 Custom domain and HTTPS

1. Go back to **Settings → Pages**.
2. Under **Custom domain**, type `nawarwitti.me` and click **Save**.
   - If GitHub says the domain is already used, it is still set on another of your repositories. Open that repository → Settings → Pages → remove the custom domain there, then try again.
3. Wait until GitHub shows **"DNS check successful"** (a few minutes, sometimes up to 24 hours).
4. Tick **Enforce HTTPS**. (If it is greyed out, wait — GitHub is still creating the certificate. This can take up to an hour.)
5. Recommended: verify the domain for your account at GitHub → your profile picture → **Settings → Pages → Add a domain**. This stops other people from using it.

The file `public/CNAME` (containing `nawarwitti.me`) is already in this project, so the domain stays set after every deploy.

### 6.5 Check your DNS (at your domain provider)

Your domain should already point to GitHub. If the DNS check fails, make sure these records exist at the company where you bought `nawarwitti.me`:

| Type  | Name / Host | Value                     |
| ----- | ----------- | ------------------------- |
| A     | `@`         | `185.199.108.153`         |
| A     | `@`         | `185.199.109.153`         |
| A     | `@`         | `185.199.110.153`         |
| A     | `@`         | `185.199.111.153`         |
| AAAA  | `@`         | `2606:50c0:8000::153`     |
| AAAA  | `@`         | `2606:50c0:8001::153`     |
| AAAA  | `@`         | `2606:50c0:8002::153`     |
| AAAA  | `@`         | `2606:50c0:8003::153`     |
| CNAME | `www`       | `YOUR-USERNAME.github.io` |

Remove any other A/AAAA records for `@` (for example from a "parking" page).

To check from your computer (Windows terminal):

```bash
nslookup nawarwitti.me
```

You should see the four `185.199.x.153` addresses.

---

## 7. Update the site later

After you change any file:

```bash
npm run build
```

```bash
git add .
```

```bash
git commit -m "Update content"
```

```bash
git push
```

GitHub rebuilds and publishes the site automatically in about 1–2 minutes (watch the **Actions** tab).

---

## 8. After the site is live

- Add `https://nawarwitti.me` as the website on your LinkedIn profile.
- Add it to the header of your CV in FlowCV (then export the CV again and replace `public/cv.pdf`).
- Test your share preview by pasting the link into a LinkedIn post draft.

---

## 9. Look and animation

- Dark sections have a circuit-board background with red "signals" running along the traces: `src/components/CircuitBackdrop.astro`.
- The red pulse lines have a moving "heart monitor" blip, the home headline appears word by word, sections fade up as you scroll, project cards lift on hover, and the signal chain of the featured project lights up stage by stage.
- More effects, all in `src/scripts/effects.ts` (styles at the end of `global.css`):
  - **Circuit trace:** a copper line down the side of the page fills with "current" as you scroll, and a pad lights up at each section. Wide screens only (1280 px and up).
  - **Reading progress:** an ECG line along the top of the screen draws as you scroll and beats at the end.
  - **Heading decode:** section headings appear from red signal noise (English and Turkish; Arabic letters join, so Arabic keeps the fade).
  - **Card glow:** on a computer, project cards glow and tilt slightly where the mouse is.
  - **Page transitions:** the new page wipes in behind a glowing red edge (Chrome, Edge and Safari; other browsers just open the page).
- All animation styles are at the end of `src/styles/global.css`. Visitors who turn on "reduce motion" in their phone or computer settings see the site without animation.

---

## 10. Visitor statistics (GoatCounter)

The site is ready for **GoatCounter**: free for personal sites, no cookies and no personal data, so no cookie banner is needed.

1. Sign up at https://www.goatcounter.com/signup and choose a code, for example `nawarwitti`.
2. Open `src/site.config.ts` and put the code in: `export const GOATCOUNTER_CODE = 'nawarwitti';`
3. Run `npm run build`, then `git add .`, `git commit -m "Turn on statistics"`, `git push`.
4. See your visitors at `https://nawarwitti.goatcounter.com`: pages, languages, countries, where visitors came from (LinkedIn, Google…).

Clicks on **Download CV**, **LinkedIn** and **email** are counted too: they show up as `cv-download`, `linkedin` and `email` in the dashboard.
Leave the code empty (`''`) to turn statistics off.

---

## 11. Speed (Lighthouse)

Fonts are served from the site itself (no Google Fonts), only the Latin, Turkish and Arabic character sets are loaded, and system fonts are size-matched to the web fonts so text does not jump while loading (`src/styles/font-fallbacks.css`, made by `npm run font-fallbacks`).
To test: open the live site in Chrome → F12 → **Lighthouse** → Analyze. Keep new images small (under ~150 KB, `.webp` is best).

---

## 12. Languages

- English pages: `https://nawarwitti.me/...`
- Turkish pages: `https://nawarwitti.me/tr/...`
- Arabic pages: `https://nawarwitti.me/ar/...` — right-to-left, with Arabic fonts (IBM Plex Sans Arabic, Noto Naskh Arabic)
- The **EN · TR · AR** buttons in the header switch to the same page in the other language.
- Search engines are told that each page has an English and a Turkish version (hreflang), and the sitemap lists both.

To add another language later, a developer needs to add it to `LOCALES` in `src/lib/content.ts` and `locales` in `astro.config.mjs`, create `src/pages/<lang>/`, and add `<lang>.json` / `<lang>/` files in every content folder. For a right-to-left language, also add it to `isRtl()` in `src/lib/content.ts`.

---

## Project structure (for developers)

```
public/                 Files copied as-is: CNAME, cv.pdf, og-image.png, favicon.svg, robots.txt, images
src/content/            ALL text and data, one file or folder per language (edit these)
src/content.config.ts   Rules for the content files (what fields exist)
src/components/         Hero, QuickFacts, ProjectCard, Timeline, SkillGroup, ContactCTA, Tag, StatusBadge, PulseLine, Placeholder…
src/layouts/            Page frame: <head>, SEO tags, header, footer
src/pages/              One small file per URL (English), src/pages/tr/ (Turkish), src/pages/ar/ (Arabic)
src/views/              The page templates shared by both languages
src/site.config.ts      Site settings (visitor statistics code)
src/styles/global.css   Colours and fonts ("Carbon and pulse" design tokens)
.github/workflows/      Automatic deploy to GitHub Pages
scripts/                Helper scripts (share image)
```
