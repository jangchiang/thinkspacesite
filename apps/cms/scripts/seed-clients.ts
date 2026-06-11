/**
 * Seed the Client collection ("Trusted by" logos). Uploads logos from
 * apps/web/public/images/partners/clients/ when present; otherwise creates the
 * client without a logo (wordmark fallback on the site) so the script stays runnable.
 * Run: STRAPI_URL=http://127.0.0.1:1337 STRAPI_API_TOKEN=xxx bun scripts/seed-clients.ts
 */
export {};

import { readFileSync, existsSync } from 'fs';
import { join, basename } from 'path';

const STRAPI_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN || '';
const PARTNERS_DIR = join(__dirname, '..', '..', 'web', 'public', 'images', 'partners');

interface ClientData {
  name: string;
  website?: string;
  order: number;
  logoFile?: string;
}

const clients: ClientData[] = [
  { name: 'Chiang Mai University', website: 'https://www.cmu.ac.th', order: 1, logoFile: 'clients/cmu.png' },
  { name: 'CMU-RAILCFC', order: 2, logoFile: 'clients/cmu-railcfc.png' },
  { name: 'CMU Alumni Association', order: 3, logoFile: 'clients/cmu-alumni.png' },
  { name: 'CMU Engineering Alumni', order: 4, logoFile: 'clients/cmueaa.png' },
  { name: 'EGAT', website: 'https://www.egat.co.th', order: 5 },
  { name: 'GETHÁ', order: 6, logoFile: 'clients/getha.png' },
  { name: 'Bedding Houz', order: 7, logoFile: 'clients/bedding-houz.png' },
  { name: 'Suppaisan Goldsmith', order: 8, logoFile: 'clients/suppaisan.png' },
  { name: 'CCINNOMA', order: 9, logoFile: 'clients/ccinnoma.png' },
  { name: 'Silver Temple Foundation', order: 10, logoFile: 'clients/silver-temple.png' },
  { name: 'Hidden Cafe', order: 11, logoFile: 'clients/hidden-cafe.png' },
  { name: 'Songkhla Rajabhat University', order: 12, logoFile: 'clients/songkhla-rajabhat.png' },
  { name: 'Nana Digital', order: 13 },
  { name: 'Wanawat Hardware', order: 14 },
];

function guessMime(file: string): string {
  if (file.endsWith('.png')) return 'image/png';
  if (file.endsWith('.svg')) return 'image/svg+xml';
  if (file.endsWith('.jpg') || file.endsWith('.jpeg')) return 'image/jpeg';
  if (file.endsWith('.webp')) return 'image/webp';
  return 'application/octet-stream';
}

async function uploadLogo(logoFile: string): Promise<number | null> {
  const filePath = join(PARTNERS_DIR, logoFile);
  if (!existsSync(filePath)) return null;
  const buffer = readFileSync(filePath);
  const blob = new Blob([buffer], { type: guessMime(logoFile) });
  const form = new FormData();
  form.append('files', blob, basename(filePath));
  const res = await fetch(`${STRAPI_URL}/api/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_TOKEN}` },
    body: form,
  });
  if (!res.ok) { console.error(`Failed to upload ${logoFile}:`, await res.text()); return null; }
  const uploaded = (await res.json()) as Array<{ id: number }>;
  return uploaded[0]?.id ?? null;
}

async function createClient(c: ClientData) {
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${API_TOKEN}` };
  let logoId: number | null = null;
  if (c.logoFile) {
    logoId = await uploadLogo(c.logoFile);
    console.log(logoId ? `Uploaded logo for ${c.name} (id ${logoId})` : `No logo for ${c.name}`);
  }
  const data: Record<string, unknown> = { name: c.name, order: c.order };
  if (c.website) data.website = c.website;
  if (logoId) data.logo = logoId;
  const res = await fetch(`${STRAPI_URL}/api/clients`, { method: 'POST', headers, body: JSON.stringify({ data }) });
  if (!res.ok) { console.error(`Failed to create client ${c.name}:`, await res.text()); return; }
  console.log(`Created client ${c.name}`);
}

async function main() {
  if (!API_TOKEN) { console.error('STRAPI_API_TOKEN not set'); process.exit(1); }
  console.log(`Seeding ${clients.length} clients -> ${STRAPI_URL}\n`);
  for (const c of clients) await createClient(c);
  console.log('\nClients seeding complete!');
}

main().catch(console.error);
