// Visual effects. All of them are decorative, and none run for visitors who asked their
// system for reduced motion (the reading-progress line still shows, without its beat).
//
// 1. Circuit trace down the side of the page (wide screens).
// 2. Reading progress: ECG line at the top of the screen.
// 3. Headings "decode" from signal noise when they come into view (English and Turkish).
// 4. Project cards: red glow that follows the mouse, and a slight 3D tilt.
// (Page transitions are pure CSS: see @view-transition in global.css.)

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const wide = matchMedia('(min-width: 1280px)');

/* ---- 1 + 2: scroll-driven trace and reading progress -------------------------------- */

const main = document.getElementById('main');
const trace = document.querySelector<HTMLElement>('[data-trace]');
const progress = document.querySelector<HTMLElement>('[data-read-progress]');

let nodes: { el: HTMLElement; y: number }[] = [];
let mainTop = 0;
let mainHeight = 0;
let traceOn = false;
let ticking = false;

function layoutTrace() {
  if (!main || !trace) return;
  traceOn = !reduced && wide.matches;
  trace.querySelectorAll('.trace-node').forEach((n) => n.remove());
  nodes = [];
  if (!traceOn) return;
  const rect = main.getBoundingClientRect();
  mainTop = rect.top + scrollY;
  mainHeight = main.offsetHeight;
  main.querySelectorAll<HTMLElement>(':scope > section').forEach((section) => {
    const y = section.getBoundingClientRect().top + scrollY - mainTop + 56;
    if (y > mainHeight - 20) return;
    const el = document.createElement('span');
    el.className = 'trace-node';
    el.style.top = `${y}px`;
    trace.append(el);
    nodes.push({ el, y });
  });
}

function update() {
  ticking = false;
  const docHeight = document.documentElement.scrollHeight - innerHeight;

  if (progress) {
    const p = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
    progress.style.setProperty('--read-p', p.toFixed(4));
    progress.classList.toggle('is-done', p > 0.995);
  }

  if (trace && traceOn) {
    const reach = Math.min(mainHeight, Math.max(0, scrollY + innerHeight * 0.6 - mainTop));
    trace.style.setProperty('--trace-p', `${reach}px`);
    for (const n of nodes) n.el.classList.toggle('is-on', reach >= n.y);
  }
}

function requestUpdate() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(update);
  }
}

if (progress && document.documentElement.scrollHeight > innerHeight * 1.3) {
  progress.classList.add('is-active');
}
layoutTrace();
update();
addEventListener('scroll', requestUpdate, { passive: true });
addEventListener('resize', requestUpdate, { passive: true });
wide.addEventListener('change', () => {
  layoutTrace();
  update();
});
// Images and fonts can change the page height after load: re-place the pads.
if (main && 'ResizeObserver' in window) {
  let last = main.offsetHeight;
  new ResizeObserver(() => {
    if (Math.abs(main.offsetHeight - last) < 2) return;
    last = main.offsetHeight;
    layoutTrace();
    update();
  }).observe(main);
}

/* ---- 3: headings decode from noise (Latin scripts only) ------------------------------ */

const NOISE = '01<>/\\#_=+*%$&ABCDEFXYZ';
const randomChar = () => NOISE[Math.floor(Math.random() * NOISE.length)];

function decode(el: HTMLElement) {
  const original = el.textContent ?? '';
  const text = original.trim();
  const chars = Array.from(text);
  if (!chars.length) return;

  // Keep the heading's box fixed while the text changes, so nothing below it moves.
  el.style.height = `${el.offsetHeight}px`;
  const label = document.createElement('span');
  label.className = 'sr-only';
  label.textContent = text;
  const shown = document.createElement('span');
  shown.setAttribute('aria-hidden', 'true');
  const done = document.createElement('span');
  const noise = document.createElement('span');
  noise.className = 'decode-noise';
  shown.append(done, noise);
  el.replaceChildren(label, shown);

  const duration = Math.min(1100, 350 + chars.length * 22);
  const start = performance.now();
  let lastNoise = 0;

  const frame = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const resolved = Math.floor(t * chars.length);
    done.textContent = chars.slice(0, resolved).join('');
    if (now - lastNoise > 45 || t === 1) {
      lastNoise = now;
      noise.textContent = chars
        .slice(resolved)
        .map((c) => (c.trim() ? randomChar() : c))
        .join('');
    }
    if (t < 1) {
      requestAnimationFrame(frame);
    } else {
      el.textContent = original;
      el.style.height = '';
    }
  };
  requestAnimationFrame(frame);
}

if (!reduced && document.documentElement.lang !== 'ar' && 'IntersectionObserver' in window) {
  const headings = Array.from(document.querySelectorAll<HTMLElement>('main h2')).filter(
    (h) => h.childElementCount === 0 && !h.classList.contains('eyebrow') && h.textContent?.trim(),
  );
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          io.unobserve(e.target);
          decode(e.target as HTMLElement);
        }
      }
    },
    { threshold: 0.6 },
  );
  headings.forEach((h) => io.observe(h));
}

/* ---- 4: cards: glow that follows the mouse, slight 3D tilt -------------------------- */

if (!reduced && finePointer) {
  document.querySelectorAll<HTMLElement>('[data-glow]').forEach((card) => {
    const tilt = card.hasAttribute('data-tilt');
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
      if (tilt) {
        card.style.setProperty('--rx', `${((0.5 - y / r.height) * 5).toFixed(2)}deg`);
        card.style.setProperty('--ry', `${((x / r.width - 0.5) * 5).toFixed(2)}deg`);
      }
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}
