import type { Core } from '@strapi/strapi';

interface PageHeroSeedData {
  pageIdentifier: string;
  title: { th: string; en: string };
  subtitle: { th: string; en: string };
  backgroundType: 'none' | 'image' | 'video';
  overlayOpacity: number;
  overlayColor: string;
  textColor: 'light' | 'dark';
}

interface StatSeedData {
  value: string;
  label: { th: string; en: string };
  order: number;
}

interface ResultItemSeedData {
  value: string;
  label: { th: string; en: string };
}

interface CaseStudySeedData {
  clientName: string;
  title: { th: string; en: string };
  excerpt: { th: string; en: string };
  challenge?: { th: string; en: string };
  solution?: { th: string; en: string };
  industry: { th: string; en: string };
  resultValue: string;
  resultLabel: { th: string; en: string };
  additionalResults?: ResultItemSeedData[];
  technologies?: string[];
}

const caseStudiesData: CaseStudySeedData[] = [
  {
    clientName: 'Bangkok Bank',
    title: { th: 'ระบบธนาคารดิจิทัล', en: 'Digital Banking System' },
    excerpt: {
      th: 'พัฒนาระบบธนาคารออนไลน์ที่รองรับผู้ใช้งานมากกว่า 10 ล้านคน พร้อมระบบความปลอดภัยระดับสูงสุด',
      en: 'Developed online banking system serving over 10 million users with highest security standards',
    },
    challenge: {
      th: 'ธนาคารกรุงเทพต้องการปรับปรุงระบบธนาคารออนไลน์เพื่อรองรับผู้ใช้งานที่เพิ่มขึ้นอย่างรวดเร็ว ระบบเดิมมีข้อจำกัดด้านประสิทธิภาพและความปลอดภัย',
      en: 'Bangkok Bank needed to upgrade their online banking system to handle rapidly growing users. The legacy system had performance and security limitations.',
    },
    solution: {
      th: 'เราพัฒนาระบบธนาคารดิจิทัลใหม่ทั้งหมดด้วยสถาปัตยกรรม Microservices รองรับ High Availability และระบบความปลอดภัยระดับสูงสุดตามมาตรฐานสากล',
      en: 'We developed a completely new digital banking system with Microservices architecture, High Availability support, and highest-level security following international standards.',
    },
    industry: { th: 'ธนาคาร', en: 'Banking' },
    resultValue: '10M+',
    resultLabel: { th: 'ผู้ใช้งาน', en: 'Users' },
    additionalResults: [
      { value: '99.99%', label: { th: 'ความพร้อมใช้งาน', en: 'Uptime' } },
      { value: '3x', label: { th: 'ความเร็วในการทำรายการ', en: 'Transaction Speed' } },
      { value: '0', label: { th: 'เหตุการณ์ด้านความปลอดภัย', en: 'Security Incidents' } },
    ],
    technologies: ['Kubernetes', 'PostgreSQL', 'Redis', 'React', 'Node.js'],
  },
  {
    clientName: 'PTT Exploration',
    title: { th: 'HPC Infrastructure', en: 'HPC Infrastructure' },
    excerpt: {
      th: 'ติดตั้งระบบ High Performance Computing สำหรับการวิเคราะห์ข้อมูลธรณีวิทยาและการสำรวจน้ำมัน',
      en: 'Deployed HPC systems for geological data analysis and oil exploration',
    },
    challenge: {
      th: 'ปตท.สึก ต้องการระบบประมวลผลประสิทธิภาพสูงเพื่อวิเคราะห์ข้อมูลธรณีวิทยาปริมาณมหาศาลสำหรับการสำรวจน้ำมัน',
      en: 'PTTEP needed high-performance computing systems to analyze massive geological data for oil exploration.',
    },
    solution: {
      th: 'ติดตั้งคลัสเตอร์ HPC ด้วย GPU computing และระบบจัดเก็บข้อมูลความเร็วสูง พร้อมซอฟต์แวร์วิเคราะห์ข้อมูลเฉพาะทาง',
      en: 'Deployed HPC cluster with GPU computing and high-speed storage systems, along with specialized data analysis software.',
    },
    industry: { th: 'พลังงาน', en: 'Energy' },
    resultValue: '50%',
    resultLabel: { th: 'ลดเวลาประมวลผล', en: 'Faster Processing' },
    additionalResults: [
      { value: '10PB', label: { th: 'ความจุข้อมูล', en: 'Data Capacity' } },
      { value: '24/7', label: { th: 'การทำงานต่อเนื่อง', en: 'Continuous Operation' } },
    ],
    technologies: ['NVIDIA GPU', 'Slurm', 'Lustre', 'Python', 'TensorFlow'],
  },
  {
    clientName: 'Revenue Department',
    title: { th: 'Cybersecurity', en: 'Cybersecurity' },
    excerpt: {
      th: 'ออกแบบและติดตั้งระบบรักษาความปลอดภัยทางไซเบอร์ครบวงจรสำหรับข้อมูลภาษีของประชาชน',
      en: 'Designed and implemented comprehensive cybersecurity for citizen tax data',
    },
    challenge: {
      th: 'กรมสรรพากรต้องการระบบความปลอดภัยทางไซเบอร์ที่แข็งแกร่งเพื่อปกป้องข้อมูลภาษีของประชาชนหลายล้านคน',
      en: 'The Revenue Department needed robust cybersecurity to protect tax data of millions of citizens.',
    },
    solution: {
      th: 'ออกแบบและติดตั้งระบบ Security Operation Center (SOC) ที่ทำงาน 24/7 พร้อมระบบตรวจจับภัยคุกคามอัตโนมัติ',
      en: 'Designed and implemented a 24/7 Security Operation Center (SOC) with automated threat detection systems.',
    },
    industry: { th: 'ภาครัฐ', en: 'Government' },
    resultValue: '99.99%',
    resultLabel: { th: 'ความปลอดภัย', en: 'Security Uptime' },
    additionalResults: [
      { value: '0', label: { th: 'การรั่วไหลของข้อมูล', en: 'Data Breaches' } },
      { value: '<5min', label: { th: 'เวลาตอบสนองภัยคุกคาม', en: 'Threat Response Time' } },
    ],
    technologies: ['SIEM', 'Zero Trust', 'Azure Sentinel', 'CrowdStrike'],
  },
  {
    clientName: 'Central Group',
    title: { th: 'Cloud Migration', en: 'Cloud Migration' },
    excerpt: {
      th: 'ย้ายระบบ E-commerce ไปยัง Multi-cloud พร้อมลดต้นทุน 40% และเพิ่มประสิทธิภาพ 200%',
      en: 'Migrated E-commerce to Multi-cloud, reducing costs by 40% and improving performance by 200%',
    },
    challenge: {
      th: 'เซ็นทรัลกรุ๊ปต้องการย้ายระบบ E-commerce ขนาดใหญ่ไปยัง Cloud โดยไม่ให้กระทบต่อการดำเนินธุรกิจ',
      en: 'Central Group needed to migrate large-scale E-commerce systems to Cloud without disrupting business operations.',
    },
    solution: {
      th: 'วางแผนและดำเนินการ Cloud Migration แบบเป็นขั้นตอนด้วยกลยุทธ์ Multi-cloud เพื่อความยืดหยุ่นและลดความเสี่ยง',
      en: 'Planned and executed phased Cloud Migration with Multi-cloud strategy for flexibility and risk reduction.',
    },
    industry: { th: 'ค้าปลีก', en: 'Retail' },
    resultValue: '40%',
    resultLabel: { th: 'ลดต้นทุน', en: 'Cost Reduction' },
    additionalResults: [
      { value: '200%', label: { th: 'เพิ่มประสิทธิภาพ', en: 'Performance Improvement' } },
      { value: '99.9%', label: { th: 'ความพร้อมใช้งาน', en: 'Uptime' } },
    ],
    technologies: ['AWS', 'Azure', 'Kubernetes', 'Terraform', 'Docker'],
  },
];

const statsData: StatSeedData[] = [
  {
    value: '500+',
    label: { th: 'ลูกค้าองค์กร', en: 'Enterprise Clients' },
    order: 1,
  },
  {
    value: '99.9%',
    label: { th: 'SLA เวลาทำงาน', en: 'SLA Uptime' },
    order: 2,
  },
  {
    value: '24/7',
    label: { th: 'สนับสนุนตลอดเวลา', en: 'Support Available' },
    order: 3,
  },
  {
    value: '15+',
    label: { th: 'ปีประสบการณ์', en: 'Years Experience' },
    order: 4,
  },
];

const pageHeroesData: PageHeroSeedData[] = [
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
  // Service detail pages
  {
    pageIdentifier: 'service-cloud',
    title: { th: 'บริการ Cloud', en: 'Cloud Services' },
    subtitle: {
      th: 'โซลูชันคลาวด์ครบวงจรสำหรับองค์กรของคุณ',
      en: 'Comprehensive cloud solutions for your organization'
    },
    backgroundType: 'none',
    overlayOpacity: 60,
    overlayColor: '#000000',
    textColor: 'light',
  },
  {
    pageIdentifier: 'service-software',
    title: { th: 'พัฒนาซอฟต์แวร์', en: 'Software Development' },
    subtitle: {
      th: 'พัฒนาซอฟต์แวร์ตามความต้องการของธุรกิจ',
      en: 'Custom software development for your business needs'
    },
    backgroundType: 'none',
    overlayOpacity: 60,
    overlayColor: '#000000',
    textColor: 'light',
  },
  {
    pageIdentifier: 'service-hpc-ai',
    title: { th: 'HPC & AI Infrastructure', en: 'HPC & AI Infrastructure' },
    subtitle: {
      th: 'โครงสร้างพื้นฐานสำหรับ High Performance Computing และ AI',
      en: 'Infrastructure for High Performance Computing and AI workloads'
    },
    backgroundType: 'none',
    overlayOpacity: 60,
    overlayColor: '#000000',
    textColor: 'light',
  },
  {
    pageIdentifier: 'service-ai-datascience',
    title: { th: 'AI & Data Science', en: 'AI & Data Science' },
    subtitle: {
      th: 'โซลูชัน AI และการวิเคราะห์ข้อมูลสำหรับธุรกิจ',
      en: 'AI and data analytics solutions for your business'
    },
    backgroundType: 'none',
    overlayOpacity: 60,
    overlayColor: '#000000',
    textColor: 'light',
  },
  {
    pageIdentifier: 'service-cybersecurity',
    title: { th: 'Cybersecurity', en: 'Cybersecurity' },
    subtitle: {
      th: 'ปกป้องธุรกิจของคุณด้วยโซลูชันความปลอดภัยไซเบอร์',
      en: 'Protect your business with comprehensive cybersecurity solutions'
    },
    backgroundType: 'none',
    overlayOpacity: 60,
    overlayColor: '#000000',
    textColor: 'light',
  },
  {
    pageIdentifier: 'service-consulting',
    title: { th: 'IT Consulting', en: 'IT Consulting' },
    subtitle: {
      th: 'ที่ปรึกษาด้านเทคโนโลยีสำหรับการเปลี่ยนแปลงดิจิทัล',
      en: 'Technology consulting for your digital transformation journey'
    },
    backgroundType: 'none',
    overlayOpacity: 60,
    overlayColor: '#000000',
    textColor: 'light',
  },
  {
    pageIdentifier: 'service-research',
    title: { th: 'Research & Development', en: 'Research & Development' },
    subtitle: {
      th: 'นวัตกรรมและการวิจัยเทคโนโลยีใหม่',
      en: 'Innovation and research for emerging technologies'
    },
    backgroundType: 'none',
    overlayOpacity: 60,
    overlayColor: '#000000',
    textColor: 'light',
  },
];

async function seedPageHeroes(strapi: Core.Strapi) {
  const existingHeroes = await strapi.documents('api::page-hero.page-hero').findMany({
    locale: 'th-TH',
  });

  // Get list of existing page identifiers
  const existingIdentifiers = new Set(existingHeroes.map((h) => h.pageIdentifier).filter(Boolean));

  // Filter to only seed missing entries
  const heroesToCreate = pageHeroesData.filter(hero => !existingIdentifiers.has(hero.pageIdentifier));

  if (heroesToCreate.length === 0) {
    strapi.log.info(`All ${pageHeroesData.length} page heroes already exist, skipping seed`);
    return;
  }

  strapi.log.info(`Seeding ${heroesToCreate.length} missing page heroes...`);

  for (const hero of heroesToCreate) {
    try {
      // Create Thai version (default locale)
      const thEntry = await strapi.documents('api::page-hero.page-hero').create({
        data: {
          pageIdentifier: hero.pageIdentifier,
          title: hero.title.th,
          subtitle: hero.subtitle.th,
          backgroundType: hero.backgroundType,
          overlayOpacity: hero.overlayOpacity,
          overlayColor: hero.overlayColor,
          textColor: hero.textColor,
        },
        locale: 'th-TH',
        status: 'published',
      });

      strapi.log.info(`Created Thai page hero: ${hero.pageIdentifier}`);

      // Create English localization
      await strapi.documents('api::page-hero.page-hero').update({
        documentId: thEntry.documentId,
        data: {
          pageIdentifier: hero.pageIdentifier,
          title: hero.title.en,
          subtitle: hero.subtitle.en,
          backgroundType: hero.backgroundType,
          overlayOpacity: hero.overlayOpacity,
          overlayColor: hero.overlayColor,
          textColor: hero.textColor,
        },
        locale: 'en',
        status: 'published',
      });

      strapi.log.info(`Created English page hero: ${hero.pageIdentifier}`);
    } catch (error) {
      strapi.log.error(`Failed to create page hero ${hero.pageIdentifier}:`, error);
    }
  }

  strapi.log.info('Page heroes seeding complete!');
}

async function seedStats(strapi: Core.Strapi) {
  const existingStats = await strapi.documents('api::stat.stat').findMany({
    locale: 'th-TH',
  });

  if (existingStats.length > 0) {
    strapi.log.info(`${existingStats.length} stats already exist, skipping seed`);
    return;
  }

  strapi.log.info('Seeding stats...');

  for (const stat of statsData) {
    try {
      // Create Thai version (default locale)
      const thEntry = await strapi.documents('api::stat.stat').create({
        data: {
          value: stat.value,
          label: stat.label.th,
          order: stat.order,
        },
        locale: 'th-TH',
        status: 'published',
      });

      strapi.log.info(`Created Thai stat: ${stat.value} - ${stat.label.th}`);

      // Create English localization
      await strapi.documents('api::stat.stat').update({
        documentId: thEntry.documentId,
        data: {
          value: stat.value,
          label: stat.label.en,
          order: stat.order,
        },
        locale: 'en',
        status: 'published',
      });

      strapi.log.info(`Created English stat: ${stat.value} - ${stat.label.en}`);
    } catch (error) {
      strapi.log.error(`Failed to create stat ${stat.value}:`, error);
    }
  }

  strapi.log.info('Stats seeding complete!');
}

async function seedCaseStudies(strapi: Core.Strapi) {
  const existingCaseStudies = await strapi.documents('api::case-study.case-study').findMany({
    locale: 'th-TH',
  });

  if (existingCaseStudies.length > 0) {
    strapi.log.info(`${existingCaseStudies.length} case studies already exist, skipping seed`);
    return;
  }

  strapi.log.info('Seeding case studies...');

  for (const caseStudy of caseStudiesData) {
    try {
      // Create slug from client name
      const slug = caseStudy.clientName.toLowerCase().replace(/\s+/g, '-');

      // Prepare Thai additional results
      const thAdditionalResults = caseStudy.additionalResults?.map(r => ({
        value: r.value,
        label: r.label.th,
      }));

      // Prepare English additional results
      const enAdditionalResults = caseStudy.additionalResults?.map(r => ({
        value: r.value,
        label: r.label.en,
      }));

      // Create Thai version (default locale)
      const thEntry = await strapi.documents('api::case-study.case-study').create({
        data: {
          clientName: caseStudy.clientName,
          title: caseStudy.title.th,
          slug: slug,
          excerpt: caseStudy.excerpt.th,
          challenge: caseStudy.challenge?.th,
          solution: caseStudy.solution?.th,
          industry: caseStudy.industry.th,
          resultValue: caseStudy.resultValue,
          resultLabel: caseStudy.resultLabel.th,
          additionalResults: thAdditionalResults,
          technologies: caseStudy.technologies,
        },
        locale: 'th-TH',
        status: 'published',
      });

      strapi.log.info(`Created Thai case study: ${caseStudy.clientName}`);

      // Create English localization
      await strapi.documents('api::case-study.case-study').update({
        documentId: thEntry.documentId,
        data: {
          clientName: caseStudy.clientName,
          title: caseStudy.title.en,
          slug: slug,
          excerpt: caseStudy.excerpt.en,
          challenge: caseStudy.challenge?.en,
          solution: caseStudy.solution?.en,
          industry: caseStudy.industry.en,
          resultValue: caseStudy.resultValue,
          resultLabel: caseStudy.resultLabel.en,
          additionalResults: enAdditionalResults,
          technologies: caseStudy.technologies,
        },
        locale: 'en',
        status: 'published',
      });

      strapi.log.info(`Created English case study: ${caseStudy.clientName}`);
    } catch (error) {
      strapi.log.error(`Failed to create case study ${caseStudy.clientName}:`, error);
    }
  }

  strapi.log.info('Case studies seeding complete!');
}

interface AboutPageSeedData {
  storyTitle: { th: string; en: string };
  storyParagraph1: { th: string; en: string };
  storyParagraph2: { th: string; en: string };
  milestonesTitle: { th: string; en: string };
  teamSectionTitle: { th: string; en: string };
  teamSectionDescription: { th: string; en: string };
  values: {
    iconName: string;
    title: { th: string; en: string };
    description: { th: string; en: string };
  }[];
  milestones: {
    year: string;
    event: { th: string; en: string };
    detail: { th: string; en: string };
  }[];
  teamMembers: {
    name: string;
    role: { th: string; en: string };
  }[];
}

const aboutPageData: AboutPageSeedData = {
  storyTitle: { th: 'เรื่องราวของเรา', en: 'Our Story' },
  storyParagraph1: {
    th: 'Thinkspace Technology เริ่มต้นจากทีมวิศวกรที่มีความหลงใหลในเทคโนโลยี ด้วยเป้าหมายในการช่วยให้องค์กรสามารถใช้ประโยชน์จากเทคโนโลยีได้อย่างเต็มที่',
    en: 'Thinkspace Technology started as a team of engineers passionate about technology, with a goal to help organizations leverage technology to its fullest potential.',
  },
  storyParagraph2: {
    th: 'ปัจจุบันเราให้บริการลูกค้ากว่า 500 รายในหลากหลายอุตสาหกรรม ตั้งแต่สตาร์ทอัพจนถึงองค์กรขนาดใหญ่ ด้วยทีมผู้เชี่ยวชาญกว่า 200 คน',
    en: 'Today, we serve over 500 clients across various industries, from startups to large enterprises, with a team of over 200 experts.',
  },
  milestonesTitle: { th: 'เหตุการณ์สำคัญ', en: 'Key Milestones' },
  teamSectionTitle: { th: 'ทีมผู้บริหาร', en: 'Leadership Team' },
  teamSectionDescription: {
    th: 'ทีมผู้บริหารที่มีประสบการณ์กว่า 20 ปีในอุตสาหกรรมเทคโนโลยี',
    en: 'Experienced leadership with over 20 years in the technology industry.',
  },
  values: [
    {
      iconName: 'Target',
      title: { th: 'พันธกิจ', en: 'Mission' },
      description: {
        th: 'เราช่วยองค์กรเปลี่ยนแปลงด้วยเทคโนโลยีที่ทันสมัยและโซลูชันที่ขับเคลื่อนผลลัพธ์',
        en: 'We help organizations transform with cutting-edge technology and solutions that drive results.',
      },
    },
    {
      iconName: 'Award',
      title: { th: 'วิสัยทัศน์', en: 'Vision' },
      description: {
        th: 'เป็นพันธมิตรด้านเทคโนโลยีชั้นนำในภูมิภาค สร้างนวัตกรรมและคุณค่าให้กับลูกค้า',
        en: 'To be the leading technology partner in the region, creating innovation and value for our clients.',
      },
    },
    {
      iconName: 'Users',
      title: { th: 'ทีมงาน', en: 'Team' },
      description: {
        th: 'ทีมผู้เชี่ยวชาญกว่า 200 คน พร้อมให้บริการและสนับสนุนลูกค้าทุกขนาด',
        en: 'Over 200 experts ready to serve and support clients of all sizes.',
      },
    },
    {
      iconName: 'Globe',
      title: { th: 'ขอบเขต', en: 'Reach' },
      description: {
        th: 'ให้บริการลูกค้าในกว่า 15 ประเทศทั่วภูมิภาคเอเชียแปซิฟิก',
        en: 'Serving clients in over 15 countries across the Asia-Pacific region.',
      },
    },
  ],
  milestones: [
    {
      year: '2008',
      event: { th: 'ก่อตั้งบริษัท', en: 'Company Founded' },
      detail: {
        th: 'เริ่มต้นด้วยทีมวิศวกร 5 คน ให้บริการด้าน IT Consulting',
        en: 'Started with a team of 5 engineers, providing IT Consulting services',
      },
    },
    {
      year: '2012',
      event: { th: 'ขยายบริการ Cloud', en: 'Cloud Services Expansion' },
      detail: {
        th: 'เปิดตัวบริการ Cloud Infrastructure และ Migration Services',
        en: 'Launched Cloud Infrastructure and Migration Services',
      },
    },
    {
      year: '2016',
      event: { th: 'เปิดศูนย์ Security', en: 'Security Center Launch' },
      detail: {
        th: 'เปิด Security Operations Center (SOC) ให้บริการ 24/7',
        en: 'Opened 24/7 Security Operations Center (SOC)',
      },
    },
    {
      year: '2020',
      event: { th: 'ลูกค้า 500+ ราย', en: '500+ Clients Milestone' },
      detail: {
        th: 'ให้บริการลูกค้าในกว่า 15 ประเทศทั่วเอเชียแปซิฟิก',
        en: 'Serving clients across 15+ countries in Asia-Pacific',
      },
    },
    {
      year: '2024',
      event: { th: 'ขยายสู่ AI Solutions', en: 'AI Solutions Launch' },
      detail: {
        th: 'เปิดตัว AI & Data Analytics Platform สำหรับองค์กร',
        en: 'Launched Enterprise AI & Data Analytics Platform',
      },
    },
  ],
  teamMembers: [
    {
      name: 'John Smith',
      role: { th: 'ประธานเจ้าหน้าที่บริหาร', en: 'CEO & Founder' },
    },
    {
      name: 'Sarah Chen',
      role: { th: 'ประธานเจ้าหน้าที่ฝ่ายเทคโนโลยี', en: 'CTO' },
    },
    {
      name: 'Michael Wong',
      role: { th: 'ประธานเจ้าหน้าที่ฝ่ายปฏิบัติการ', en: 'COO' },
    },
  ],
};

async function seedAboutPage(strapi: Core.Strapi) {
  try {
    const existingAbout = await strapi.documents('api::about-page.about-page').findFirst({
      locale: 'th-TH',
    });

    if (existingAbout) {
      strapi.log.info('About page already exists, skipping seed');
      return;
    }

    strapi.log.info('Seeding about page...');

    // Prepare Thai data
    const thValues = aboutPageData.values.map(v => ({
      iconName: v.iconName as 'Target' | 'Award' | 'Users' | 'Globe' | 'Lightbulb' | 'Shield' | 'Rocket' | 'Heart',
      title: v.title.th,
      description: v.description.th,
    }));

    const thMilestones = aboutPageData.milestones.map(m => ({
      year: m.year,
      event: m.event.th,
      detail: m.detail.th,
    }));

    const thTeamMembers = aboutPageData.teamMembers.map(t => ({
      name: t.name,
      role: t.role.th,
    }));

    // Create Thai version
    const thEntry = await strapi.documents('api::about-page.about-page').create({
      data: {
        storyTitle: aboutPageData.storyTitle.th,
        storyParagraph1: aboutPageData.storyParagraph1.th,
        storyParagraph2: aboutPageData.storyParagraph2.th,
        milestonesTitle: aboutPageData.milestonesTitle.th,
        teamSectionTitle: aboutPageData.teamSectionTitle.th,
        teamSectionDescription: aboutPageData.teamSectionDescription.th,
        values: thValues,
        milestones: thMilestones,
        teamMembers: thTeamMembers,
      },
      locale: 'th-TH',
      status: 'published',
    });

    strapi.log.info('Created Thai about page');

    // Prepare English data
    const enValues = aboutPageData.values.map(v => ({
      iconName: v.iconName as 'Target' | 'Award' | 'Users' | 'Globe' | 'Lightbulb' | 'Shield' | 'Rocket' | 'Heart',
      title: v.title.en,
      description: v.description.en,
    }));

    const enMilestones = aboutPageData.milestones.map(m => ({
      year: m.year,
      event: m.event.en,
      detail: m.detail.en,
    }));

    const enTeamMembers = aboutPageData.teamMembers.map(t => ({
      name: t.name,
      role: t.role.en,
    }));

    // Create English version
    await strapi.documents('api::about-page.about-page').update({
      documentId: thEntry.documentId,
      data: {
        storyTitle: aboutPageData.storyTitle.en,
        storyParagraph1: aboutPageData.storyParagraph1.en,
        storyParagraph2: aboutPageData.storyParagraph2.en,
        milestonesTitle: aboutPageData.milestonesTitle.en,
        teamSectionTitle: aboutPageData.teamSectionTitle.en,
        teamSectionDescription: aboutPageData.teamSectionDescription.en,
        values: enValues,
        milestones: enMilestones,
        teamMembers: enTeamMembers,
      },
      locale: 'en',
      status: 'published',
    });

    strapi.log.info('Created English about page');
    strapi.log.info('About page seeding complete!');
  } catch (error) {
    strapi.log.error('Failed to seed about page:', error);
  }
}

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await seedPageHeroes(strapi);
    await seedStats(strapi);
    await seedCaseStudies(strapi);
    await seedAboutPage(strapi);
  },
};
