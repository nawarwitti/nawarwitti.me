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

/* ---- 5: mouse: a glowing signal trail follows the pointer --------------------------- */

if (!reduced && finePointer) {
  const canvas = document.createElement('canvas');
  canvas.className = 'mouse-trail';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.append(canvas);
  const ctx = canvas.getContext('2d');
  const LIFE = 420; // ms a point stays on screen
  const points: { x: number; y: number; t: number }[] = [];
  let running = false;

  const resize = () => {
    const dpr = Math.min(2, devicePixelRatio || 1);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  addEventListener('resize', resize, { passive: true });

  const draw = () => {
    if (!ctx) return;
    const now = performance.now();
    while (points.length && now - points[0].t > LIFE) points.shift();
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    if (points.length < 2) {
      running = false;
      return;
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1];
      const b = points[i];
      const life = 1 - (now - b.t) / LIFE; // 1 = newest
      const k = (i / points.length) * life;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = `rgba(240, 69, 90, ${(k * 0.9).toFixed(3)})`;
      ctx.lineWidth = 0.6 + k * 3;
      ctx.shadowColor = 'rgba(255, 138, 152, 0.9)';
      ctx.shadowBlur = 10 * k;
      ctx.stroke();
    }
    requestAnimationFrame(draw);
  };

  addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      points.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (points.length > 60) points.shift();
      if (!running) {
        running = true;
        requestAnimationFrame(draw);
      }
    },
    { passive: true },
  );
}

/* ---- 6: mouse: dark sections light up the circuit board under the pointer ----------- */

if (!reduced && finePointer) {
  document.querySelectorAll<HTMLElement>('.circuit-backdrop').forEach((board) => {
    const section = board.parentElement;
    if (!section) return;
    const rtl = document.documentElement.dir === 'rtl'; // the board is mirrored in RTL
    section.addEventListener('pointermove', (e) => {
      const r = board.getBoundingClientRect();
      const x = rtl ? r.right - e.clientX : e.clientX - r.left;
      const y = e.clientY - r.top;
      board.style.setProperty('--cx', `${x}px`);
      board.style.setProperty('--cy', `${y}px`);
      // Parallax: the board drifts a little against the pointer.
      board.style.setProperty('--px', `${((0.5 - x / r.width) * 18).toFixed(1)}px`);
      board.style.setProperty('--py', `${((0.5 - y / r.height) * 12).toFixed(1)}px`);
      board.classList.add('is-lit');
    });
    section.addEventListener('pointerleave', () => {
      board.classList.remove('is-lit');
      board.style.setProperty('--px', '0px');
      board.style.setProperty('--py', '0px');
    });
  });
}

/* ---- 7: mouse: buttons are pulled a little towards the pointer ---------------------- */

if (!reduced && finePointer) {
  document
    .querySelectorAll<HTMLElement>('.btn-primary, .btn-outline-dark, .btn-outline-light')
    .forEach((btn) => {
      btn.classList.add('magnetic');
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        btn.style.setProperty('--gx', `${(dx * 0.22).toFixed(1)}px`);
        btn.style.setProperty('--gy', `${(dy * 0.32).toFixed(1)}px`);
      });
      btn.addEventListener('pointerleave', () => {
        btn.style.setProperty('--gx', '0px');
        btn.style.setProperty('--gy', '0px');
      });
    });
}
