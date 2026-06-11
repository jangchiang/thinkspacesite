/**
 * Seed script for Partners — real ThinkSpace clients ("Trusted by") and
 * Technology Partners (Proxmox / Dell / Google Cloud). Follows the partner
 * content type: name, logo (media, required), website, order.
 *
 * Logos are uploaded from apps/web/public/images/partners/ when a matching file
 * exists; otherwise the entry is created without a logo and a warning is logged
 * so the script stays runnable (logos can be attached later in Strapi Admin).
 *
 * Run with: STRAPI_URL=http://localhost:1337 STRAPI_API_TOKEN=your_token npx ts-node scripts/seed-partners.ts
 */

export {};

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { basename } from 'path';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN || '';

// Where partner/client logo files live (relative to the web app's public dir).
const PARTNERS_DIR = join(__dirname, '..', '..', 'web', 'public', 'images', 'partners');

interface PartnerData {
  name: string;
  website?: string;
  order: number;
  /** Optional logo filename inside PARTNERS_DIR. */
  logoFile?: string;
}

// Technology partners (real) — Proxmox logo asset already exists.
const technologyPartners: PartnerData[] = [
  {
    name: 'Proxmox (Authorized Reseller)',
    website: 'https://www.proxmox.com',
    order: 1,
    logoFile: 'proxmox-reseller.png',
  },
  {
    name: 'Dell Technologies',
    website: 'https://www.dell.com',
    order: 2,
    logoFile: 'dell.svg',
  },
  {
    name: 'Google Cloud',
    website: 'https://cloud.google.com',
    order: 3,
    logoFile: 'google-cloud.svg',
  },
];

// Clients ("Trusted by") — real organizations from the company profile.
const clients: PartnerData[] = [
  { name: 'GETHA', order: 10, logoFile: 'getha.svg' },
  { name: 'Bedding Houze', order: 11, logoFile: 'bedding-houze.svg' },
  { name: 'CMU-RAILCFC', order: 12, logoFile: 'cmu-railcfc.svg' },
  { name: 'Suppaisan Goldsmith', order: 13, logoFile: 'suppaisan.svg' },
  { name: 'CMUEAA', order: 14, logoFile: 'cmueaa.svg' },
  { name: 'Chiang Mai University', website: 'https://www.cmu.ac.th', order: 15, logoFile: 'cmu.svg' },
  { name: 'CMU Alumni Association', order: 16, logoFile: 'cmuaa.svg' },
  { name: 'Nana Digital', order: 17, logoFile: 'nana-digital.svg' },
  { name: 'CCINNOMA', order: 18, logoFile: 'ccinnoma.svg' },
  { name: 'Silver Temple Foundation', order: 19, logoFile: 'silver-temple.svg' },
  { name: 'Hidden Cafe', order: 20, logoFile: 'hidden-cafe.svg' },
  { name: 'Wanawat Hardware', order: 21, logoFile: 'wanawat.svg' },
  { name: 'EGAT', website: 'https://www.egat.co.th', order: 22, logoFile: 'egat.svg' },
  { name: 'Thidanukroh School', order: 23, logoFile: 'thidanukroh.svg' },
  { name: 'Songkhla Rajabhat University', order: 24, logoFile: 'songkhla-rajabhat.svg' },
];

const partners: PartnerData[] = [...technologyPartners, ...clients];

function guessMime(file: string): string {
  if (file.endsWith('.png')) return 'image/png';
  if (file.endsWith('.svg')) return 'image/svg+xml';
  if (file.endsWith('.jpg') || file.endsWith('.jpeg')) return 'image/jpeg';
  if (file.endsWith('.webp')) return 'image/webp';
  return 'application/octet-stream';
}

/** Upload a logo file to the Strapi media library; returns its id, or null. */
async function uploadLogo(logoFile: string): Promise<number | null> {
  const filePath = join(PARTNERS_DIR, logoFile);
  if (!existsSync(filePath)) {
    return null;
  }

  const buffer = readFileSync(filePath);
  const blob = new Blob([buffer], { type: guessMime(logoFile) });
  const form = new FormData();
  form.append('files', blob, basename(filePath));

  const res = await fetch(`${STRAPI_URL}/api/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_TOKEN}` },
    body: form,
  });

  if (!res.ok) {
    const error = await res.text();
    console.error(`Failed to upload logo ${logoFile}:`, error);
    return null;
  }

  const uploaded = (await res.json()) as Array<{ id: number }>;
  return uploaded[0]?.id ?? null;
}

async function createPartner(partner: PartnerData) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_TOKEN}`,
  };

  let logoId: number | null = null;
  if (partner.logoFile) {
    logoId = await uploadLogo(partner.logoFile);
    if (logoId) {
      console.log(`Uploaded logo for ${partner.name} (media id ${logoId})`);
    } else {
      console.warn(
        `No logo file for ${partner.name} (expected ${partner.logoFile}). ` +
          `Creating partner without logo — attach it in Strapi Admin later.`
      );
    }
  }

  const data: Record<string, unknown> = {
    name: partner.name,
    order: partner.order,
  };
  if (partner.website) data.website = partner.website;
  if (logoId) data.logo = logoId;

  console.log(`Creating partner: ${partner.name}...`);

  const res = await fetch(`${STRAPI_URL}/api/partners`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ data }),
  });

  if (!res.ok) {
    const error = await res.text();
    console.error(`Failed to create partner ${partner.name}:`, error);
    return null;
  }

  const result = (await res.json()) as { data: { documentId: string } };
  const documentId = result.data.documentId;
  console.log(`Created partner ${partner.name} with documentId: ${documentId}`);

  // Publish
  await fetch(`${STRAPI_URL}/api/partners/${documentId}/actions/publish`, {
    method: 'POST',
    headers,
  });
  console.log(`Published partner ${partner.name}\n`);

  return documentId;
}

async function main() {
  if (!API_TOKEN) {
    console.error('Error: STRAPI_API_TOKEN is not set');
    console.log('Please set the STRAPI_API_TOKEN environment variable');
    console.log('You can create an API token in Strapi Admin > Settings > API Tokens');
    process.exit(1);
  }

  console.log('Seeding Partners (clients + technology partners)...\n');
  console.log(`Using Strapi URL: ${STRAPI_URL}`);
  console.log(`Looking for logos in: ${PARTNERS_DIR}\n`);

  for (const partner of partners) {
    await createPartner(partner);
  }

  console.log('Seeding complete!');
  console.log(`\n${partners.length} partners created (${technologyPartners.length} technology, ${clients.length} clients).`);
}

main().catch(console.error);
