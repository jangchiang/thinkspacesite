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
  role?: string;
  /** Optional logo filename inside PARTNERS_DIR (real files only). */
  logoFile?: string;
}

// Technology partners (real) — Proxmox logo asset exists; Dell/GCP show as wordmarks.
// Clients live in the separate Client collection (see seed-clients.ts).
const partners: PartnerData[] = [
  { name: 'Proxmox', website: 'https://www.proxmox.com', order: 1, role: 'Authorized Reseller', logoFile: 'proxmox-reseller.png' },
  { name: 'Dell', website: 'https://www.dell.com', order: 2, role: 'Technology Partner' },
  { name: 'Google Cloud', website: 'https://cloud.google.com', order: 3, role: 'Cloud Partner' },
];

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
  if (partner.role) data.role = partner.role;
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
  console.log(`\n${partners.length} technology partners created.`);
}

main().catch(console.error);
