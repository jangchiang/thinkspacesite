/**
 * Seed the single types (site-setting, contact-info, homepage, about-page), bilingual.
 * Run: STRAPI_URL=http://127.0.0.1:1337 STRAPI_API_TOKEN=xxx bun scripts/seed-single-types.ts
 */
export {};

const STRAPI_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN || '';
const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${API_TOKEN}` };

async function putSingle(type: string, locale: string, data: Record<string, unknown>) {
  const res = await fetch(`${STRAPI_URL}/api/${type}?locale=${locale}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ data }),
  });
  if (!res.ok) {
    console.error(`  FAIL ${type} [${locale}]:`, (await res.text()).slice(0, 200));
  } else {
    console.log(`  ok ${type} [${locale}]`);
  }
}

async function main() {
  if (!API_TOKEN) { console.error('STRAPI_API_TOKEN not set'); process.exit(1); }
  console.log(`Seeding single types -> ${STRAPI_URL}\n`);

  // ---------- site-setting ----------
  console.log('site-setting');
  const siteCommon = { headerCompanyName: 'ThinkSpace Technologies', logoUrl: '/logo.png' };
  await putSingle('site-setting', 'th', { ...siteCommon, footerCompanyName: 'บริษัท ธิงค์สเปซ เทคโนโลยี จำกัด', copyrightText: 'สงวนลิขสิทธิ์', tagline: 'สร้างสรรค์อนาคต ที่มากกว่าแค่เทคโนโลยี' });
  await putSingle('site-setting', 'en', { ...siteCommon, footerCompanyName: 'ThinkSpace Technologies Co., Ltd.', copyrightText: 'All rights reserved.', tagline: 'Creating a future beyond technology.' });

  // ---------- contact-info ----------
  console.log('contact-info');
  const contactCommon = {
    email: 'info@techthinkspace.com',
    phone: '+66 82-808-7666',
    googleMapsUrl: 'https://maps.google.com/?q=Mae+Hia+Muang+Chiang+Mai',
    facebookUrl: 'https://facebook.com/techthinkspace',
    linkedinUrl: 'https://linkedin.com/company/techthinkspace',
    lineId: '@techthinkspace',
  };
  await putSingle('contact-info', 'th', { ...contactCommon, address: '211/141 หมู่ 2 ตำบลแม่เหียะ อำเภอเมืองเชียงใหม่ จังหวัดเชียงใหม่ 50100', workingHours: 'จันทร์–ศุกร์ 9:00–18:00 น.' });
  await putSingle('contact-info', 'en', { ...contactCommon, address: '211/141 Moo 2, Mae Hia, Muang, Chiang Mai 50100, Thailand', workingHours: 'Mon–Fri, 9:00 AM – 6:00 PM' });

  // ---------- homepage ----------
  console.log('homepage');
  const homeFlags = { showServicesSection: true, showFeaturedWorks: true, featuredWorksCount: 4, showNewsSection: true, newsCount: 3, showStatsSection: true };
  await putSingle('homepage', 'th', {
    ...homeFlags,
    heroSection: {
      badge: 'AI · ข้อมูล · การจำลอง · วิศวกรรมดิจิทัล',
      title: 'เปลี่ยนวิสัยทัศน์ให้เป็นความจริง',
      titleHighlight: 'ระบบอัจฉริยะที่ปลอดภัย',
      subtitle: 'บริษัท ธิงค์สเปซ เทคโนโลยี พันธมิตรด้านวิศวกรรมจากเชียงใหม่ ส่งมอบโซลูชัน AI วิทยาการข้อมูล การประมวลผลสมรรถนะสูง และวิศวกรรมดิจิทัลที่ปลอดภัย พร้อม Logix แพลตฟอร์ม AI ที่องค์กรเป็นเจ้าของข้อมูลเอง',
      ctaButtonText: 'เริ่มต้นใช้งาน', ctaButtonLink: '/th/contact',
      secondaryButtonText: 'รู้จัก Logix', trustedByText: 'ได้รับความไว้วางใจจากองค์กรชั้นนำ', showPartners: true,
    },
    servicesSectionTitle: 'ขีดความสามารถครบวงจรสำหรับองค์กร',
    servicesSectionSubtitle: 'หกเสาหลักด้านเทคโนโลยีที่ทำงานร่วมกัน ตั้งแต่ซอฟต์แวร์และความปลอดภัย ไปจนถึง AI การประมวลผลสมรรถนะสูง และงานวิจัยขั้นสูง',
    whyChooseUsSection: {
      title: 'ทำไมต้อง ThinkSpace', subtitle: 'วิศวกรรมเชิงลึก ทีมที่หยั่งรากจากมหาวิทยาลัยเชียงใหม่ และความเป็นเจ้าของข้อมูลอย่างแท้จริง', isVisible: true,
      features: [
        { icon: 'Target', title: 'วิศวกรรมเชิงลึก', description: 'ตั้งแต่ดิจิทัลทวิน การจำลอง ไปจนถึง HPC และ AI สำหรับงานวิศวกรรมจริง' },
        { icon: 'Users', title: 'ทีมผู้เชี่ยวชาญ', description: 'ทีมที่หยั่งรากจากวิศวกรรม มหาวิทยาลัยเชียงใหม่ พร้อมประสบการณ์ระดับสากล' },
        { icon: 'Shield', title: 'ข้อมูลเป็นของคุณ', description: 'Private AI และโครงสร้างพื้นฐานแบบ On-Premise ที่องค์กรควบคุมได้เต็มที่' },
        { icon: 'Zap', title: 'แพลตฟอร์ม Logix', description: 'แพลตฟอร์ม AI-native ของเราเอง ติดตั้งได้ทั้งบนองค์กรและบนคลาวด์' },
      ],
    },
    featuredWorksTitle: 'ผลงานที่คัดสรร', featuredWorksSubtitle: 'โครงการจริงกับองค์กรชั้นนำทั่วประเทศไทยและต่างประเทศ',
    newsSectionTitle: 'ข่าวสารล่าสุด', newsSectionSubtitle: 'อัปเดตและมุมมองจากทีมของเรา',
    statsSectionTitle: 'ตัวเลขของเรา',
    ctaSection: {
      title: 'พร้อมเริ่มต้นโครงการของคุณแล้วหรือยัง', subtitle: 'พูดคุยกับทีมวิศวกรของเราเพื่อค้นหาโซลูชันที่เหมาะกับองค์กรของคุณ',
      primaryButtonText: 'ติดต่อเรา', primaryButtonLink: '/th/contact', secondaryButtonText: 'ดูบริการ', secondaryButtonLink: '/th/services',
    },
  });
  await putSingle('homepage', 'en', {
    ...homeFlags,
    heroSection: {
      badge: 'AI · Data · Simulation · Digital Engineering',
      title: 'From Vision to Reality —',
      titleHighlight: 'Intelligent, Secure Systems',
      subtitle: 'ThinkSpace Technologies is a Chiang Mai engineering partner delivering AI, data science, high-performance computing and secure digital engineering — and Logix, our sovereign AI-native platform.',
      ctaButtonText: 'Get Started', ctaButtonLink: '/en/contact',
      secondaryButtonText: 'Discover Logix', trustedByText: 'Trusted by leading organizations', showPartners: true,
    },
    servicesSectionTitle: 'End-to-end capabilities for the modern enterprise',
    servicesSectionSubtitle: 'Six technology pillars working in concert — from software and security to AI, high-performance computing, and advanced research.',
    whyChooseUsSection: {
      title: 'Why ThinkSpace', subtitle: 'Deep engineering, a CMU-rooted team, and genuine data ownership.', isVisible: true,
      features: [
        { icon: 'Target', title: 'Deep engineering', description: 'From digital twins and simulation to HPC and applied AI for real engineering problems.' },
        { icon: 'Users', title: 'Expert team', description: 'A team rooted in Chiang Mai University engineering, with international experience.' },
        { icon: 'Shield', title: 'You own your data', description: 'Private AI and on-premise infrastructure your organization fully controls.' },
        { icon: 'Zap', title: 'The Logix platform', description: 'Our own AI-native platform, deployable on-premise or on-cloud.' },
      ],
    },
    featuredWorksTitle: 'Selected work', featuredWorksSubtitle: 'Real projects with leading organizations across Thailand and beyond.',
    newsSectionTitle: 'Latest news', newsSectionSubtitle: 'Updates and perspectives from our team.',
    statsSectionTitle: 'By the numbers',
    ctaSection: {
      title: 'Ready to start your project?', subtitle: 'Talk to our engineers about the right solution for your organization.',
      primaryButtonText: 'Contact us', primaryButtonLink: '/en/contact', secondaryButtonText: 'View services', secondaryButtonLink: '/en/services',
    },
  });

  // ---------- about-page ----------
  console.log('about-page');
  const values_en = [
    { iconName: 'Target', title: 'From Vision to Reality', description: 'We turn complex ideas into systems that ship and create lasting value.' },
    { iconName: 'Shield', title: 'Data Sovereignty', description: 'Your data, your models, your control — on-premise or on-cloud.' },
    { iconName: 'Lightbulb', title: 'Engineering Rigor', description: 'Academic-grade research applied to real-world business outcomes.' },
    { iconName: 'Users', title: 'Partnership', description: 'We work alongside our clients as a long-term engineering partner.' },
  ];
  const values_th = [
    { iconName: 'Target', title: 'เปลี่ยนวิสัยทัศน์ให้เป็นจริง', description: 'เราเปลี่ยนแนวคิดที่ซับซ้อนให้เป็นระบบที่ใช้งานได้จริงและสร้างคุณค่าอย่างยั่งยืน' },
    { iconName: 'Shield', title: 'ความเป็นเจ้าของข้อมูล', description: 'ข้อมูลของคุณ โมเดลของคุณ ควบคุมได้เอง ทั้งบนองค์กรและบนคลาวด์' },
    { iconName: 'Lightbulb', title: 'ความเข้มงวดทางวิศวกรรม', description: 'นำงานวิจัยระดับมหาวิทยาลัยมาประยุกต์ใช้กับผลลัพธ์ทางธุรกิจจริง' },
    { iconName: 'Users', title: 'ความเป็นพันธมิตร', description: 'เราทำงานเคียงข้างลูกค้าในฐานะพันธมิตรด้านวิศวกรรมระยะยาว' },
  ];
  const milestones_en = [
    { year: '2024', event: 'Founded in Chiang Mai', detail: 'ThinkSpace Technologies Co., Ltd. registered on 22 November 2024.' },
    { year: '2025', event: 'CMU-RAILCFC & EGAT', detail: '3D digital twins for railway ballast and an AI slope-stability risk system for high-voltage towers.' },
    { year: '2026', event: 'Scaling up', detail: 'Logix Private-AI deployments, cross-border ERP, and HPC engagements across sectors.' },
  ];
  const milestones_th = [
    { year: '2024', event: 'ก่อตั้งที่เชียงใหม่', detail: 'จดทะเบียนบริษัท ธิงค์สเปซ เทคโนโลยี จำกัด เมื่อวันที่ 22 พฤศจิกายน 2567' },
    { year: '2025', event: 'CMU-RAILCFC และ กฟผ.', detail: 'ดิจิทัลทวิน 3 มิติของหินโรยทางรถไฟ และระบบ AI ประเมินความเสี่ยงเสถียรภาพลาดดินของเสาส่งไฟฟ้าแรงสูง' },
    { year: '2026', event: 'ขยายการเติบโต', detail: 'การติดตั้ง Logix Private AI, ERP ข้ามพรมแดน และงาน HPC ในหลากหลายอุตสาหกรรม' },
  ];
  const team_en = [
    { name: 'Theeradon Somsri', role: 'Chief Technology Officer', bio: 'M.Sc. Computer Science (AI), Monash University; B.IT (Computer Science & Networking), James Cook University, Singapore.' },
    { name: 'Sararat Khwanjai', role: 'Chief Executive Officer', bio: 'Ph.D., M.Eng. and B.Eng. in Civil Engineering, Chiang Mai University.' },
    { name: 'Teepachalit Binaree', role: 'Chief Data Officer', bio: 'Ph.D. and B.Eng. in Mechanical Engineering, Chiang Mai University.' },
  ];
  const team_th = [
    { name: 'นายธีรดนย์ สมศรี', role: 'Chief Technology Officer', bio: 'ปริญญาโท วิทยาการคอมพิวเตอร์ (ปัญญาประดิษฐ์) มหาวิทยาลัย Monash; ปริญญาตรี เทคโนโลยีสารสนเทศ มหาวิทยาลัย James Cook ประเทศสิงคโปร์' },
    { name: 'นางสาวสรารัตน์ ขวัญใจ', role: 'Chief Executive Officer', bio: 'ปริญญาเอก/โท/ตรี วิศวกรรมโยธา มหาวิทยาลัยเชียงใหม่' },
    { name: 'นายทีปัชลิต บินอารี', role: 'Chief Data Officer', bio: 'ปริญญาเอก/ตรี วิศวกรรมเครื่องกล มหาวิทยาลัยเชียงใหม่' },
  ];
  await putSingle('about-page', 'th', {
    storyTitle: 'เรื่องราวของเรา',
    storyParagraph1: 'บริษัท ธิงค์สเปซ เทคโนโลยี จำกัด ก่อตั้งขึ้นที่จังหวัดเชียงใหม่ในปี 2567 ในฐานะพันธมิตรด้านเทคโนโลยีและวิศวกรรมที่เชี่ยวชาญด้านปัญญาประดิษฐ์ การวิเคราะห์ข้อมูล การจำลองทางวิศวกรรม การประมวลผลสมรรถนะสูง และซอฟต์แวร์เฉพาะทาง',
    storyParagraph2: 'เรามุ่งสู่การเป็นผู้นำด้าน AI, DATA, SIMULATION และ DIGITAL ENGINEERING SOLUTIONS ผสานเทคโนโลยี นวัตกรรม และองค์ความรู้ทางวิศวกรรม เพื่อสร้างโซลูชันที่มีประสิทธิภาพ ปลอดภัย และยั่งยืนให้กับองค์กรและสังคม',
    milestonesTitle: 'เส้นทางของเรา',
    teamSectionTitle: 'คณะผู้บริหาร',
    teamSectionDescription: 'ทีมผู้นำที่ผสานความเชี่ยวชาญด้าน AI วิศวกรรม และวิทยาการข้อมูล',
    values: values_th, milestones: milestones_th, teamMembers: team_th,
  });
  await putSingle('about-page', 'en', {
    storyTitle: 'Our story',
    storyParagraph1: 'ThinkSpace Technologies Co., Ltd. was founded in Chiang Mai in 2024 as a technology and engineering partner specialising in artificial intelligence, data analytics, engineering simulation, high-performance computing, and bespoke software.',
    storyParagraph2: 'We aim to lead in AI, DATA, SIMULATION and DIGITAL ENGINEERING SOLUTIONS — combining technology, innovation, and engineering knowledge to build effective, secure, and sustainable solutions for organizations and society.',
    milestonesTitle: 'Our journey',
    teamSectionTitle: 'Leadership',
    teamSectionDescription: 'A leadership team blending AI, engineering, and data science expertise.',
    values: values_en, milestones: milestones_en, teamMembers: team_en,
  });

  console.log('\nSingle types seeding complete!');
}

main().catch(console.error);
