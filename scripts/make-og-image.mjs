// Generates public/og-image.png (1200×630) — the preview image for links shared on LinkedIn, WhatsApp, etc.
// Run with: npm run og
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const out = fileURLToPath(new URL('../public/og-image.png', import.meta.url));

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#111111"/>
  <text x="80" y="150" font-family="JetBrains Mono, Consolas, monospace" font-size="26" fill="#F0455A" letter-spacing="1">ELECTRICAL &amp; ELECTRONICS ENGINEER</text>
  <text x="80" y="270" font-family="Source Serif 4, Georgia, serif" font-weight="600" font-size="96" fill="#F5F3EF">Nawar Witti</text>
  <text x="80" y="345" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="34" fill="#C9C7C1">Electronic hardware · Medical devices · Technical sales</text>
  <polyline points="0,470 560,470 600,470 625,420 655,520 680,440 705,470 1200,470" fill="none" stroke="#D7263D" stroke-width="4" stroke-linejoin="round"/>
  <text x="80" y="575" font-family="JetBrains Mono, Consolas, monospace" font-size="26" fill="#A8A6A0">nawarwitti.me</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log(`Wrote ${out}`);
