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
    pageIdentifier: 'home',
    title: { th: 'เปลี่ยนวิสัยทัศน์ให้เป็นความจริง', en: 'From Vision to Reality' },
    subtitle: {
      th: 'ThinkSpace สร้างซอฟต์แวร์ AI โครงสร้างพื้นฐาน และงานวิจัยขั้นสูง ให้องค์กรเป็นเจ้าของเทคโนโลยีของตนเอง',
      en: 'ThinkSpace builds software, AI, infrastructure, and advanced research that let organizations own their own technology.'
    },
    backgroundType: 'none',
    overlayOpacity: 60,
    overlayColor: '#0B2447',
    textColor: 'light',
  },
  {
    pageIdentifier: 'works',
    title: { th: 'ผลงานของเรา', en: 'Our Work' },
    subtitle: {
      th: 'โครงการจริงด้านซอฟต์แวร์ AI โครงสร้างพื้นฐาน และงานวิจัย ที่เราส่งมอบให้องค์กรทั้งในไทยและต่างประเทศ',
      en: 'Real projects in software, AI, infrastructure, and research delivered for organizations in Thailand and abroad.'
    },
    backgroundType: 'none',
    overlayOpacity: 60,
    overlayColor: '#0B2447',
    textColor: 'light',
  },
  {
    pageIdentifier: 'news',
    title: { th: 'ข่าวสาร', en: 'News' },
    subtitle: {
      th: 'ข่าวสารล่าสุด อัปเดต และข้อมูลเชิงลึกจากทีม ThinkSpace',
      en: 'Latest news, updates, and insights from the ThinkSpace team.'
    },
    backgroundType: 'none',
    overlayOpacity: 60,
    overlayColor: '#0B2447',
    textColor: 'light',
  },
  {
    pageIdentifier: 'about',
    title: { th: 'เกี่ยวกับเรา', en: 'About Us' },
    subtitle: {
      th: 'ThinkSpace บริษัทเทคโนโลยีจากเชียงใหม่ ที่สร้างสรรค์อนาคต ที่มากกว่าแค่เทคโนโลยี',
      en: 'ThinkSpace is a Chiang Mai technology company creating a future beyond technology.'
    },
    backgroundType: 'none',
    overlayOpacity: 60,
    overlayColor: '#0B2447',
    textColor: 'light',
  },
  {
    pageIdentifier: 'contact',
    title: { th: 'ติดต่อเรา', en: 'Contact Us' },
    subtitle: {
      th: 'มีโจทย์ที่อยากเปลี่ยนเป็นจริง? ทีม ThinkSpace พร้อมพูดคุยกับคุณ',
      en: 'Have a vision you want to make real? The ThinkSpace team is ready to talk.'
    },
    backgroundType: 'none',
    overlayOpacity: 60,
    overlayColor: '#0B2447',
    textColor: 'light',
  },
  {
    pageIdentifier: 'services',
    title: { th: 'โซลูชันของเรา', en: 'Our Solutions' },
    subtitle: {
      th: 'หกกลุ่มโซลูชันหลัก ตั้งแต่ซอฟต์แวร์ ความมั่นคงปลอดภัยไซเบอร์ AI HPC IoT ไปจนถึงงานวิจัยขั้นสูง',
      en: 'Six core solution pillars — software, cybersecurity, AI, HPC, IoT, and advanced research.'
    },
    backgroundType: 'none',
    overlayOpacity: 60,
    overlayColor: '#0B2447',
    textColor: 'light',
  },
  {
    pageIdentifier: 'products',
    title: { th: 'ผลิตภัณฑ์ของเรา', en: 'Our Products' },
    subtitle: {
      th: 'Logix แพลตฟอร์ม AI ของเราเอง และ Proxmox ในฐานะตัวแทนจำหน่ายที่ได้รับอนุญาต',
      en: 'Logix, our own AI platform, and Proxmox as an authorized reseller.'
    },
    backgroundType: 'none',
    overlayOpacity: 60,
    overlayColor: '#0B2447',
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
