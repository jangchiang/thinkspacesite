/**
 * Seed Page Heroes data to Strapi
 * This creates default page hero entries that admins can later customize
 */

// Make this file a module to avoid variable conflicts
export {};

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN || '';

interface PageHeroData {
  pageIdentifier: string;
  title: { th: string; en: string };
  subtitle: { th: string; en: string };
  backgroundType: 'none' | 'image' | 'video';
  overlayOpacity: number;
  overlayColor: string;
  textColor: 'light' | 'dark';
}

const pageHeroes: PageHeroData[] = [
  {
    pageIdentifier: 'works',
    title: { th: 'ผลงานของเรา', en: 'Our Work Profile' },
    subtitle: {
      th: 'ดูผลงานและโครงการที่เราได้ดำเนินการให้กับลูกค้า',
      en: 'Explore our portfolio of successful projects and client work'
    },
    backgroundType: 'none',
    overlayOpacity: 60,
    overlayColor: '#000000',
    textColor: 'light',
  },
  {
    pageIdentifier: 'news',
    title: { th: 'ข่าวสาร', en: 'News' },
    subtitle: {
      th: 'ข่าวสารล่าสุด อัพเดท และข้อมูลเชิงลึกจากทีมของเรา',
      en: 'Latest news, updates, and insights from our team'
    },
    backgroundType: 'none',
    overlayOpacity: 60,
    overlayColor: '#000000',
    textColor: 'light',
  },
  {
    pageIdentifier: 'about',
    title: { th: 'เกี่ยวกับเรา', en: 'About Us' },
    subtitle: {
      th: 'Thinkspace Technology เป็นผู้นำด้านโซลูชันเทคโนโลยีสำหรับองค์กร',
      en: 'Thinkspace Technology is a leading enterprise technology solutions provider'
    },
    backgroundType: 'none',
    overlayOpacity: 60,
    overlayColor: '#000000',
    textColor: 'light',
  },
  {
    pageIdentifier: 'contact',
    title: { th: 'ติดต่อเรา', en: 'Contact Us' },
    subtitle: {
      th: 'มีคำถามหรือต้องการข้อมูลเพิ่มเติม? ทีมงานของเราพร้อมให้ความช่วยเหลือ',
      en: 'Have questions or need more information? Our team is here to help.'
    },
    backgroundType: 'none',
    overlayOpacity: 60,
    overlayColor: '#000000',
    textColor: 'light',
  },
  {
    pageIdentifier: 'services',
    title: { th: 'บริการของเรา', en: 'Our Services' },
    subtitle: {
      th: 'โซลูชันเทคโนโลยีครบวงจรสำหรับองค์กรของคุณ',
      en: 'Comprehensive technology solutions for your organization'
    },
    backgroundType: 'none',
    overlayOpacity: 60,
    overlayColor: '#000000',
    textColor: 'light',
  },
];

async function createPageHero(hero: PageHeroData) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN}`,
  };

  // Create Thai version first (default locale)
  const thData = {
    data: {
      pageIdentifier: hero.pageIdentifier,
      title: hero.title.th,
      subtitle: hero.subtitle.th,
      backgroundType: hero.backgroundType,
      overlayOpacity: hero.overlayOpacity,
      overlayColor: hero.overlayColor,
      textColor: hero.textColor,
    },
  };

  console.log(`Creating Thai page hero for ${hero.pageIdentifier}...`);

  const thResponse = await fetch(`${STRAPI_URL}/api/page-heroes`, {
    method: 'POST',
    headers,
    body: JSON.stringify(thData),
  });

  if (!thResponse.ok) {
    const error = await thResponse.text();
    console.error(`Failed to create Thai ${hero.pageIdentifier}:`, error);
    return null;
  }

  const thResult = await thResponse.json() as { data: { documentId: string } };
  const documentId = thResult.data.documentId;
  console.log(`Created Thai ${hero.pageIdentifier} with documentId: ${documentId}`);

  // Publish Thai version
  await fetch(`${STRAPI_URL}/api/page-heroes/${documentId}/actions/publish`, {
    method: 'POST',
    headers,
  });
  console.log(`Published Thai ${hero.pageIdentifier}`);

  // Create English localization
  const enData = {
    data: {
      pageIdentifier: hero.pageIdentifier,
      title: hero.title.en,
      subtitle: hero.subtitle.en,
      backgroundType: hero.backgroundType,
      overlayOpacity: hero.overlayOpacity,
      overlayColor: hero.overlayColor,
      textColor: hero.textColor,
    },
  };

  console.log(`Creating English page hero for ${hero.pageIdentifier}...`);

  const enResponse = await fetch(`${STRAPI_URL}/api/page-heroes/${documentId}?locale=en`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(enData),
  });

  if (!enResponse.ok) {
    const error = await enResponse.text();
    console.error(`Failed to create English ${hero.pageIdentifier}:`, error);
    return documentId;
  }

  console.log(`Created English ${hero.pageIdentifier}`);

  // Publish English version
  await fetch(`${STRAPI_URL}/api/page-heroes/${documentId}/actions/publish?locale=en`, {
    method: 'POST',
    headers,
  });
  console.log(`Published English ${hero.pageIdentifier}\n`);

  return documentId;
}

async function main() {
  if (!API_TOKEN) {
    console.error('Error: STRAPI_API_TOKEN is not set');
    console.log('Please set the STRAPI_API_TOKEN environment variable');
    console.log('You can create an API token in Strapi Admin > Settings > API Tokens');
    process.exit(1);
  }

  console.log('Seeding Page Heroes data...\n');

  for (const hero of pageHeroes) {
    await createPageHero(hero);
  }

  console.log('Seeding complete!');
  console.log('\nTo customize hero backgrounds:');
  console.log('1. Go to Strapi Admin > Content Manager > Page Hero');
  console.log('2. Select a page (e.g., "works")');
  console.log('3. Change backgroundType to "image" or "video"');
  console.log('4. Upload a background image or video');
  console.log('5. Adjust overlayOpacity (0-100) for the dark overlay');
  console.log('6. Publish the changes');
}

main().catch(console.error);
