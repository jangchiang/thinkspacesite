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

      // Create English localization (only update localized fields - label)
      // value and order are non-localized, so they're shared from the Thai entry
      await strapi.documents('api::stat.stat').update({
        documentId: thEntry.documentId,
        data: {
          label: stat.label.en,
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
  teamSectionTitle: { th: 'ลูกค้าและพันธมิตรของเรา', en: 'Our Customers and Partners' },
  teamSectionDescription: {
    th: 'ได้รับความไว้วางใจจากองค์กรชั้นนำในหลากหลายอุตสาหกรรม',
    en: 'Trusted by leading organizations across various industries.',
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
      name: 'Bangkok Bank',
      role: { th: 'พันธมิตรด้านธนาคาร', en: 'Banking Partner' },
    },
    {
      name: 'PTT Exploration',
      role: { th: 'พันธมิตรด้านพลังงาน', en: 'Energy Partner' },
    },
    {
      name: 'Revenue Department',
      role: { th: 'พันธมิตรภาครัฐ', en: 'Government Partner' },
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

interface CareerBenefitSeedData {
  iconName: 'Heart' | 'Zap' | 'Users' | 'Shield' | 'Globe' | 'Award' | 'Coffee' | 'Briefcase' | 'Clock' | 'Target';
  title: { th: string; en: string };
  description: { th: string; en: string };
  order: number;
}

interface JobPositionSeedData {
  title: { th: string; en: string };
  slug: string;
  department: { th: string; en: string };
  location: { th: string; en: string };
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  description?: { th: string; en: string };
  requirements?: { th: string; en: string };
  dateOpen?: string;
  dateClose?: string;
  isActive: boolean;
  order: number;
}

const careerBenefitsData: CareerBenefitSeedData[] = [
  {
    iconName: 'Heart',
    title: { th: 'สวัสดิการครบครัน', en: 'Comprehensive Benefits' },
    description: { th: 'ประกันสุขภาพ, ทันตกรรม และสายตา', en: 'Health, dental, and vision insurance' },
    order: 1,
  },
  {
    iconName: 'Zap',
    title: { th: 'เติบโตอย่างรวดเร็ว', en: 'Fast Growth' },
    description: { th: 'โอกาสในการพัฒนาและเลื่อนตำแหน่ง', en: 'Development and promotion opportunities' },
    order: 2,
  },
  {
    iconName: 'Users',
    title: { th: 'ทีมที่ยอดเยี่ยม', en: 'Great Team' },
    description: { th: 'ทำงานร่วมกับผู้เชี่ยวชาญชั้นนำ', en: 'Work with top industry experts' },
    order: 3,
  },
  {
    iconName: 'Coffee',
    title: { th: 'สมดุลชีวิต-การทำงาน', en: 'Work-Life Balance' },
    description: { th: 'ชั่วโมงทำงานยืดหยุ่นและทำงานจากที่ไหนก็ได้', en: 'Flexible hours and remote work options' },
    order: 4,
  },
  {
    iconName: 'Award',
    title: { th: 'การเรียนรู้ตลอดชีวิต', en: 'Continuous Learning' },
    description: { th: 'งบประมาณสำหรับการฝึกอบรมและ Certification', en: 'Training budget and certification support' },
    order: 5,
  },
  {
    iconName: 'Globe',
    title: { th: 'โปรเจกต์ระดับโลก', en: 'Global Projects' },
    description: { th: 'ทำงานกับลูกค้าจากทั่วโลก', en: 'Work with clients from around the world' },
    order: 6,
  },
];

const jobPositionsData: JobPositionSeedData[] = [
  {
    title: { th: 'วิศวกรคลาวด์อาวุโส', en: 'Senior Cloud Engineer' },
    slug: 'senior-cloud-engineer',
    department: { th: 'วิศวกรรม', en: 'Engineering' },
    location: { th: 'กรุงเทพฯ / ทำงานระยะไกล', en: 'Bangkok / Remote' },
    employmentType: 'full-time',
    description: {
      th: 'เรากำลังมองหาวิศวกรคลาวด์อาวุโสที่มีประสบการณ์ในการออกแบบและพัฒนาระบบ Cloud Infrastructure สำหรับลูกค้าองค์กรขนาดใหญ่ คุณจะทำงานร่วมกับทีมเพื่อสร้างโซลูชันที่มีความยืดหยุ่นและปลอดภัย',
      en: 'We are looking for a Senior Cloud Engineer with experience in designing and developing Cloud Infrastructure for large enterprise clients. You will work with the team to build flexible and secure solutions.',
    },
    requirements: {
      th: 'ประสบการณ์ 5+ ปีในด้าน Cloud Engineering (AWS, Azure, หรือ GCP)\nความเชี่ยวชาญใน Kubernetes และ Docker\nประสบการณ์ใน Infrastructure as Code (Terraform, CloudFormation)\nทักษะการเขียนโปรแกรม Python, Go หรือ similar\nประสบการณ์ในการออกแบบระบบ High Availability\nทักษะการสื่อสารและทำงานเป็นทีมที่ดี',
      en: '5+ years experience in Cloud Engineering (AWS, Azure, or GCP)\nExpertise in Kubernetes and Docker\nExperience with Infrastructure as Code (Terraform, CloudFormation)\nProgramming skills in Python, Go or similar\nExperience designing High Availability systems\nStrong communication and teamwork skills',
    },
    dateOpen: '2025-01-01',
    dateClose: '2025-03-31',
    isActive: true,
    order: 1,
  },
  {
    title: { th: 'นักวิเคราะห์ความปลอดภัย', en: 'Security Analyst' },
    slug: 'security-analyst',
    department: { th: 'ความปลอดภัย', en: 'Security' },
    location: { th: 'กรุงเทพฯ', en: 'Bangkok' },
    employmentType: 'full-time',
    description: {
      th: 'ร่วมทีม Security Operations Center (SOC) ของเราเพื่อปกป้องลูกค้าจากภัยคุกคามทางไซเบอร์ คุณจะวิเคราะห์และตอบสนองต่อเหตุการณ์ด้านความปลอดภัยตลอด 24/7',
      en: 'Join our Security Operations Center (SOC) team to protect clients from cyber threats. You will analyze and respond to security incidents 24/7.',
    },
    requirements: {
      th: 'ประสบการณ์ 3+ ปีในด้าน Cybersecurity\nความรู้เกี่ยวกับ SIEM tools และ Security frameworks\nประสบการณ์ในการวิเคราะห์ภัยคุกคาม\nCertifications เช่น Security+, CEH, หรือ CISSP\nทักษะการวิเคราะห์และแก้ปัญหาที่ดี',
      en: '3+ years experience in Cybersecurity\nKnowledge of SIEM tools and Security frameworks\nExperience in threat analysis\nCertifications such as Security+, CEH, or CISSP\nStrong analytical and problem-solving skills',
    },
    dateOpen: '2025-01-05',
    dateClose: '2025-02-28',
    isActive: true,
    order: 2,
  },
  {
    title: { th: 'นักวิทยาศาสตร์ข้อมูล', en: 'Data Scientist' },
    slug: 'data-scientist',
    department: { th: 'ข้อมูลและ AI', en: 'Data & AI' },
    location: { th: 'ทำงานระยะไกล', en: 'Remote' },
    employmentType: 'full-time',
    description: {
      th: 'พัฒนาโมเดล Machine Learning และ AI solutions สำหรับลูกค้าในหลากหลายอุตสาหกรรม คุณจะทำงานกับข้อมูลขนาดใหญ่และสร้าง insights ที่มีคุณค่า',
      en: 'Develop Machine Learning models and AI solutions for clients across various industries. You will work with large datasets and create valuable insights.',
    },
    requirements: {
      th: 'ปริญญาโทหรือเอกในสาขา Data Science, Statistics, หรือที่เกี่ยวข้อง\nประสบการณ์ 3+ ปีในการพัฒนา ML models\nความเชี่ยวชาญใน Python, TensorFlow/PyTorch\nประสบการณ์ใน Big Data technologies (Spark, Hadoop)\nทักษะการสื่อสารผลลัพธ์ให้ผู้ไม่เชี่ยวชาญเข้าใจ',
      en: "Master's or PhD in Data Science, Statistics, or related field\n3+ years experience developing ML models\nExpertise in Python, TensorFlow/PyTorch\nExperience with Big Data technologies (Spark, Hadoop)\nAbility to communicate results to non-technical stakeholders",
    },
    dateOpen: '2024-12-15',
    dateClose: '2025-02-15',
    isActive: true,
    order: 3,
  },
  {
    title: { th: 'ผู้จัดการโครงการ', en: 'Project Manager' },
    slug: 'project-manager',
    department: { th: 'ปฏิบัติการ', en: 'Operations' },
    location: { th: 'กรุงเทพฯ', en: 'Bangkok' },
    employmentType: 'full-time',
    description: {
      th: 'บริหารจัดการโครงการ IT สำหรับลูกค้าองค์กร ประสานงานระหว่างทีมเทคนิคและลูกค้าเพื่อส่งมอบโครงการตรงเวลาและตามงบประมาณ',
      en: 'Manage IT projects for enterprise clients. Coordinate between technical teams and clients to deliver projects on time and within budget.',
    },
    requirements: {
      th: 'ประสบการณ์ 5+ ปีในการบริหารโครงการ IT\nPMP หรือ Scrum Master certification\nความเข้าใจเทคโนโลยี Cloud และ Enterprise systems\nทักษะการสื่อสารและ Stakeholder management\nประสบการณ์ใน Agile methodologies',
      en: '5+ years experience managing IT projects\nPMP or Scrum Master certification\nUnderstanding of Cloud and Enterprise systems\nStrong communication and Stakeholder management\nExperience with Agile methodologies',
    },
    dateOpen: '2025-01-10',
    dateClose: '2025-03-15',
    isActive: true,
    order: 4,
  },
  {
    title: { th: 'นักพัฒนา Full-Stack', en: 'Full-Stack Developer' },
    slug: 'full-stack-developer',
    department: { th: 'วิศวกรรม', en: 'Engineering' },
    location: { th: 'กรุงเทพฯ / ทำงานระยะไกล', en: 'Bangkok / Remote' },
    employmentType: 'full-time',
    description: {
      th: 'พัฒนาเว็บแอปพลิเคชันและระบบ Backend สำหรับลูกค้าองค์กร ใช้เทคโนโลยีสมัยใหม่และ Best practices ในการพัฒนา',
      en: 'Develop web applications and backend systems for enterprise clients. Use modern technologies and best practices in development.',
    },
    requirements: {
      th: 'ประสบการณ์ 3+ ปีในการพัฒนา Full-Stack\nความเชี่ยวชาญใน React/Next.js และ Node.js\nประสบการณ์กับ databases (PostgreSQL, MongoDB)\nความรู้เกี่ยวกับ CI/CD และ DevOps practices\nทักษะการเขียน Clean code และ Testing',
      en: '3+ years experience in Full-Stack development\nExpertise in React/Next.js and Node.js\nExperience with databases (PostgreSQL, MongoDB)\nKnowledge of CI/CD and DevOps practices\nClean code and Testing skills',
    },
    dateOpen: '2025-01-01',
    dateClose: '2025-04-30',
    isActive: true,
    order: 5,
  },
  {
    title: { th: 'นักศึกษาฝึกงาน DevOps', en: 'DevOps Intern' },
    slug: 'devops-intern',
    department: { th: 'วิศวกรรม', en: 'Engineering' },
    location: { th: 'กรุงเทพฯ', en: 'Bangkok' },
    employmentType: 'internship',
    description: {
      th: 'โอกาสฝึกงานสำหรับนักศึกษาที่สนใจ DevOps และ Cloud Infrastructure เรียนรู้จากทีมผู้เชี่ยวชาญและทำงานกับโปรเจกต์จริง',
      en: 'Internship opportunity for students interested in DevOps and Cloud Infrastructure. Learn from expert teams and work on real projects.',
    },
    requirements: {
      th: 'กำลังศึกษาหรือจบใหม่สาขา Computer Science หรือที่เกี่ยวข้อง\nความรู้พื้นฐาน Linux และ Networking\nความสนใจใน Cloud technologies และ Automation\nทักษะการเรียนรู้และทำงานเป็นทีม\nสามารถฝึกงานได้อย่างน้อย 3 เดือน',
      en: 'Currently studying or recently graduated in Computer Science or related field\nBasic knowledge of Linux and Networking\nInterest in Cloud technologies and Automation\nLearning ability and teamwork skills\nAvailable for at least 3 months internship',
    },
    dateOpen: '2025-01-15',
    dateClose: '2025-05-31',
    isActive: true,
    order: 6,
  },
];

async function seedCareerBenefits(strapi: Core.Strapi) {
  const existingBenefits = await strapi.documents('api::career-benefit.career-benefit').findMany({
    locale: 'th-TH',
  });

  if (existingBenefits.length > 0) {
    strapi.log.info(`${existingBenefits.length} career benefits already exist, skipping seed`);
    return;
  }

  strapi.log.info('Seeding career benefits...');

  for (const benefit of careerBenefitsData) {
    try {
      // Create Thai version (default locale)
      const thEntry = await strapi.documents('api::career-benefit.career-benefit').create({
        data: {
          iconName: benefit.iconName,
          title: benefit.title.th,
          description: benefit.description.th,
          order: benefit.order,
        },
        locale: 'th-TH',
        status: 'published',
      });

      strapi.log.info(`Created Thai career benefit: ${benefit.title.th}`);

      // Create English localization
      await strapi.documents('api::career-benefit.career-benefit').update({
        documentId: thEntry.documentId,
        data: {
          iconName: benefit.iconName,
          title: benefit.title.en,
          description: benefit.description.en,
          order: benefit.order,
        },
        locale: 'en',
        status: 'published',
      });

      strapi.log.info(`Created English career benefit: ${benefit.title.en}`);
    } catch (error) {
      strapi.log.error(`Failed to create career benefit ${benefit.title.en}:`, error);
    }
  }

  strapi.log.info('Career benefits seeding complete!');
}

// Contact Info seed data
interface ContactInfoSeedData {
  email: string;
  phone: string;
  lineId: string;
  address: { th: string; en: string };
  workingHours: { th: string; en: string };
  facebookUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  googleMapsUrl?: string;
}

const contactInfoData: ContactInfoSeedData = {
  email: 'info@techthinkspace.com',
  phone: '+66 082-808-7666',
  lineId: '@techthinkspace',
  address: {
    th: 'กรุงเทพมหานคร, ประเทศไทย',
    en: 'Bangkok, Thailand',
  },
  workingHours: {
    th: 'จันทร์ - ศุกร์: 9:00 - 18:00',
    en: 'Mon - Fri: 9:00 AM - 6:00 PM',
  },
  facebookUrl: 'https://facebook.com/techthinkspace',
  linkedinUrl: 'https://linkedin.com/company/techthinkspace',
};

// Legal Pages seed data
interface LegalPageSeedData {
  slug: string;
  title: { th: string; en: string };
  content: { th: string; en: string };
  lastUpdated: string;
}

const legalPagesData: LegalPageSeedData[] = [
  {
    slug: 'privacy-policy',
    title: { th: 'นโยบายความเป็นส่วนตัว', en: 'Privacy Policy' },
    content: {
      th: `## 1. ข้อมูลที่เราเก็บรวบรวม

เราเก็บรวบรวมข้อมูลที่คุณให้โดยตรง เช่น ชื่อ อีเมล และข้อมูลติดต่ออื่นๆ เมื่อคุณกรอกแบบฟอร์มติดต่อหรือสมัครรับข่าวสาร

## 2. การใช้ข้อมูล

เราใช้ข้อมูลที่เก็บรวบรวมเพื่อให้บริการ ปรับปรุงผลิตภัณฑ์ และสื่อสารกับคุณเกี่ยวกับบริการของเรา

## 3. การแบ่งปันข้อมูล

เราไม่ขายหรือให้เช่าข้อมูลส่วนบุคคลของคุณแก่บุคคลที่สาม เราอาจแบ่งปันข้อมูลกับผู้ให้บริการที่ช่วยเราดำเนินธุรกิจ

## 4. ความปลอดภัยของข้อมูล

เราใช้มาตรการรักษาความปลอดภัยที่เหมาะสมเพื่อปกป้องข้อมูลของคุณจากการเข้าถึงโดยไม่ได้รับอนุญาต

## 5. สิทธิ์ของคุณ

คุณมีสิทธิ์เข้าถึง แก้ไข หรือลบข้อมูลส่วนบุคคลของคุณ ติดต่อเราที่ info@techthinkspace.com

## 6. ติดต่อเรา

หากคุณมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวนี้ กรุณาติดต่อเราที่ info@techthinkspace.com`,
      en: `## 1. Information We Collect

We collect information you provide directly, such as name, email, and other contact information when you fill out contact forms or subscribe to our newsletter.

## 2. How We Use Information

We use the information collected to provide services, improve our products, and communicate with you about our services.

## 3. Information Sharing

We do not sell or rent your personal information to third parties. We may share information with service providers who help us operate our business.

## 4. Data Security

We implement appropriate security measures to protect your information from unauthorized access.

## 5. Your Rights

You have the right to access, correct, or delete your personal information. Contact us at info@techthinkspace.com

## 6. Contact Us

If you have questions about this privacy policy, please contact us at info@techthinkspace.com`,
    },
    lastUpdated: '2025-01-01',
  },
  {
    slug: 'terms-of-service',
    title: { th: 'ข้อกำหนดการใช้บริการ', en: 'Terms of Service' },
    content: {
      th: `## 1. การยอมรับข้อกำหนด

การใช้บริการของเราถือว่าคุณยอมรับข้อกำหนดเหล่านี้ หากคุณไม่เห็นด้วย กรุณาหยุดใช้บริการ

## 2. คำอธิบายบริการ

Thinkspace Technology ให้บริการด้านเทคโนโลยีและที่ปรึกษา รวมถึง Cloud Services, Software Development, Cybersecurity และอื่นๆ

## 3. ความรับผิดชอบของผู้ใช้

คุณต้องใช้บริการของเราอย่างถูกกฎหมายและไม่ละเมิดสิทธิ์ของผู้อื่น

## 4. ทรัพย์สินทางปัญญา

เนื้อหาและซอฟต์แวร์ทั้งหมดบนเว็บไซต์นี้เป็นทรัพย์สินของ Thinkspace Technology

## 5. การจำกัดความรับผิด

เราจะไม่รับผิดชอบต่อความเสียหายทางอ้อมหรือความเสียหายพิเศษใดๆ

## 6. การเปลี่ยนแปลงข้อกำหนด

เราอาจแก้ไขข้อกำหนดเหล่านี้ได้ตลอดเวลา การเปลี่ยนแปลงจะมีผลเมื่อประกาศบนเว็บไซต์`,
      en: `## 1. Acceptance of Terms

By using our services, you agree to these terms. If you do not agree, please stop using our services.

## 2. Service Description

Thinkspace Technology provides technology and consulting services, including Cloud Services, Software Development, Cybersecurity, and more.

## 3. User Responsibilities

You must use our services legally and not infringe on the rights of others.

## 4. Intellectual Property

All content and software on this website are property of Thinkspace Technology.

## 5. Limitation of Liability

We will not be liable for indirect or special damages of any kind.

## 6. Changes to Terms

We may modify these terms at any time. Changes will be effective when posted on the website.`,
    },
    lastUpdated: '2025-01-01',
  },
  {
    slug: 'cookie-policy',
    title: { th: 'นโยบายคุกกี้', en: 'Cookie Policy' },
    content: {
      th: `## 1. คุกกี้คืออะไร

คุกกี้คือไฟล์ข้อความขนาดเล็กที่เก็บไว้ในอุปกรณ์ของคุณเมื่อเข้าชมเว็บไซต์

## 2. ประเภทของคุกกี้ที่เราใช้

- **คุกกี้ที่จำเป็น**: จำเป็นสำหรับการทำงานของเว็บไซต์
- **คุกกี้วิเคราะห์**: ช่วยให้เราเข้าใจการใช้งานเว็บไซต์
- **คุกกี้การตลาด**: ใช้เพื่อแสดงโฆษณาที่เกี่ยวข้อง

## 3. การจัดการคุกกี้

คุณสามารถควบคุมหรือลบคุกกี้ผ่านการตั้งค่าเบราว์เซอร์ของคุณ

## 4. คุกกี้ของบุคคลที่สาม

เราอาจใช้บริการของบุคคลที่สาม เช่น Google Analytics ซึ่งอาจตั้งค่าคุกกี้ของตนเอง

## 5. ติดต่อเรา

หากคุณมีคำถามเกี่ยวกับนโยบายคุกกี้นี้ กรุณาติดต่อเราที่ info@techthinkspace.com`,
      en: `## 1. What Are Cookies

Cookies are small text files stored on your device when you visit a website.

## 2. Types of Cookies We Use

- **Essential Cookies**: Required for website functionality
- **Analytics Cookies**: Help us understand website usage
- **Marketing Cookies**: Used to display relevant advertisements

## 3. Managing Cookies

You can control or delete cookies through your browser settings.

## 4. Third-Party Cookies

We may use third-party services like Google Analytics, which may set their own cookies.

## 5. Contact Us

If you have questions about this cookie policy, please contact us at info@techthinkspace.com`,
    },
    lastUpdated: '2025-01-01',
  },
];

async function seedContactInfo(strapi: Core.Strapi) {
  try {
    const existingContact = await strapi.documents('api::contact-info.contact-info').findFirst({
      locale: 'th-TH',
    });

    if (existingContact) {
      strapi.log.info('Contact info already exists, skipping seed');
      return;
    }

    strapi.log.info('Seeding contact info...');

    // Create Thai version
    const thEntry = await strapi.documents('api::contact-info.contact-info').create({
      data: {
        email: contactInfoData.email,
        phone: contactInfoData.phone,
        lineId: contactInfoData.lineId,
        address: contactInfoData.address.th,
        workingHours: contactInfoData.workingHours.th,
        facebookUrl: contactInfoData.facebookUrl,
        linkedinUrl: contactInfoData.linkedinUrl,
        twitterUrl: contactInfoData.twitterUrl,
        googleMapsUrl: contactInfoData.googleMapsUrl,
      },
      locale: 'th-TH',
      status: 'published',
    });

    strapi.log.info('Created Thai contact info');

    // Create English version
    await strapi.documents('api::contact-info.contact-info').update({
      documentId: thEntry.documentId,
      data: {
        address: contactInfoData.address.en,
        workingHours: contactInfoData.workingHours.en,
      },
      locale: 'en',
      status: 'published',
    });

    strapi.log.info('Created English contact info');
    strapi.log.info('Contact info seeding complete!');
  } catch (error) {
    strapi.log.error('Failed to seed contact info:', error);
  }
}

async function seedLegalPages(strapi: Core.Strapi) {
  const existingLegalPages = await strapi.documents('api::legal-page.legal-page').findMany({
    locale: 'th-TH',
  });

  if (existingLegalPages.length > 0) {
    strapi.log.info(`${existingLegalPages.length} legal pages already exist, skipping seed`);
    return;
  }

  strapi.log.info('Seeding legal pages...');

  for (const legalPage of legalPagesData) {
    try {
      // Create Thai version
      const thEntry = await strapi.documents('api::legal-page.legal-page').create({
        data: {
          title: legalPage.title.th,
          slug: legalPage.slug,
          content: legalPage.content.th,
          lastUpdated: legalPage.lastUpdated,
        },
        locale: 'th-TH',
        status: 'published',
      });

      strapi.log.info(`Created Thai legal page: ${legalPage.slug}`);

      // Create English version
      await strapi.documents('api::legal-page.legal-page').update({
        documentId: thEntry.documentId,
        data: {
          title: legalPage.title.en,
          slug: legalPage.slug,
          content: legalPage.content.en,
          lastUpdated: legalPage.lastUpdated,
        },
        locale: 'en',
        status: 'published',
      });

      strapi.log.info(`Created English legal page: ${legalPage.slug}`);
    } catch (error) {
      strapi.log.error(`Failed to create legal page ${legalPage.slug}:`, error);
    }
  }

  strapi.log.info('Legal pages seeding complete!');
}

async function seedJobPositions(strapi: Core.Strapi) {
  const existingJobs = await strapi.documents('api::job-position.job-position').findMany({
    locale: 'th-TH',
  });

  if (existingJobs.length > 0) {
    strapi.log.info(`${existingJobs.length} job positions already exist, skipping seed`);
    return;
  }

  strapi.log.info('Seeding job positions...');

  for (const job of jobPositionsData) {
    try {
      // Create Thai version (default locale)
      const thEntry = await strapi.documents('api::job-position.job-position').create({
        data: {
          title: job.title.th,
          slug: job.slug,
          department: job.department.th,
          location: job.location.th,
          employmentType: job.employmentType,
          description: job.description?.th,
          requirements: job.requirements?.th,
          dateOpen: job.dateOpen,
          dateClose: job.dateClose,
          isActive: job.isActive,
          order: job.order,
        },
        locale: 'th-TH',
        status: 'published',
      });

      strapi.log.info(`Created Thai job position: ${job.title.th}`);

      // Create English localization
      await strapi.documents('api::job-position.job-position').update({
        documentId: thEntry.documentId,
        data: {
          title: job.title.en,
          slug: job.slug,
          department: job.department.en,
          location: job.location.en,
          employmentType: job.employmentType,
          description: job.description?.en,
          requirements: job.requirements?.en,
          dateOpen: job.dateOpen,
          dateClose: job.dateClose,
          isActive: job.isActive,
          order: job.order,
        },
        locale: 'en',
        status: 'published',
      });

      strapi.log.info(`Created English job position: ${job.title.en}`);
    } catch (error) {
      strapi.log.error(`Failed to create job position ${job.title.en}:`, error);
    }
  }

  strapi.log.info('Job positions seeding complete!');
}

// Homepage seed data
const homepageData = {
  heroSection: {
    th: {
      badge: 'พันธมิตรเทคโนโลยีชั้นนำ',
      title: 'เปลี่ยนธุรกิจของคุณด้วย',
      titleHighlight: 'เทคโนโลยีที่ทันสมัย',
      subtitle: 'เราช่วยองค์กรชั้นนำในการนำเทคโนโลยีมาขับเคลื่อนธุรกิจ ด้วยทีมผู้เชี่ยวชาญและโซลูชันที่ครบครัน',
      ctaButtonText: 'เริ่มต้นเลย',
      secondaryButtonText: 'ดูวิดีโอ',
      trustedByText: 'ได้รับความไว้วางใจจากองค์กรชั้นนำ',
    },
    en: {
      badge: 'Leading Technology Partner',
      title: 'Transform Your Business with',
      titleHighlight: 'Modern Technology',
      subtitle: 'We help leading organizations drive their business with technology through our expert team and comprehensive solutions.',
      ctaButtonText: 'Get Started',
      secondaryButtonText: 'Watch Demo',
      trustedByText: 'Trusted by leading organizations',
    },
  },
  servicesSectionTitle: { th: 'บริการของเรา', en: 'Our Services' },
  servicesSectionSubtitle: {
    th: 'โซลูชันเทคโนโลยีครบวงจรสำหรับทุกความต้องการทางธุรกิจ',
    en: 'Complete technology solutions for all your business needs',
  },
  whyChooseUsSection: {
    th: {
      title: 'ทำไมต้องเลือกเรา',
      subtitle: 'เราพร้อมสนับสนุนการเปลี่ยนแปลงทางดิจิทัลของคุณด้วยทีมผู้เชี่ยวชาญและเทคโนโลยีชั้นนำ',
      features: [
        { icon: 'Shield', title: 'ความปลอดภัยระดับองค์กร', description: 'มาตรฐานความปลอดภัยสูงสุดพร้อมการรับรอง ISO 27001' },
        { icon: 'Clock', title: 'ส่งมอบตรงเวลา', description: '99% ของโปรเจกต์ส่งมอบตามกำหนดเวลา' },
        { icon: 'Users', title: 'ทีมผู้เชี่ยวชาญ', description: 'วิศวกรและที่ปรึกษาที่มีประสบการณ์มากกว่า 15 ปี' },
        { icon: 'Award', title: 'พันธมิตรระดับพรีเมียม', description: 'พันธมิตรอย่างเป็นทางการของ AWS, Microsoft, Google Cloud' },
        { icon: 'Headphones', title: 'สนับสนุน 24/7', description: 'ทีมสนับสนุนพร้อมให้บริการตลอด 24 ชั่วโมง' },
        { icon: 'TrendingUp', title: 'ปรับขนาดได้ยืดหยุ่น', description: 'โซลูชันที่เติบโตไปพร้อมกับธุรกิจของคุณ' },
      ],
    },
    en: {
      title: 'Why Choose Us',
      subtitle: 'We are ready to support your digital transformation with our expert team and leading technology',
      features: [
        { icon: 'Shield', title: 'Enterprise Security', description: 'Highest security standards with ISO 27001 certification' },
        { icon: 'Clock', title: 'On-Time Delivery', description: '99% of projects delivered on schedule' },
        { icon: 'Users', title: 'Expert Team', description: 'Engineers and consultants with 15+ years experience' },
        { icon: 'Award', title: 'Premium Partners', description: 'Official partners of AWS, Microsoft, Google Cloud' },
        { icon: 'Headphones', title: '24/7 Support', description: 'Support team available around the clock' },
        { icon: 'TrendingUp', title: 'Scalable Solutions', description: 'Solutions that grow with your business' },
      ],
    },
  },
  featuredWorksTitle: { th: 'ผลงานที่โดดเด่น', en: 'Featured Works' },
  featuredWorksSubtitle: {
    th: 'โครงการที่เราภูมิใจนำเสนอ',
    en: 'Projects we are proud to present',
  },
  newsSectionTitle: { th: 'ข่าวสารล่าสุด', en: 'Latest News' },
  newsSectionSubtitle: {
    th: 'อัพเดทข่าวสารและบทความจากทีมของเรา',
    en: 'Updates and articles from our team',
  },
  statsSectionTitle: { th: 'ตัวเลขที่พูดแทนเรา', en: 'Numbers That Speak' },
  ctaSection: {
    th: {
      title: 'พร้อมที่จะเริ่มต้นโปรเจกต์ของคุณ?',
      subtitle: 'ติดต่อเราวันนี้เพื่อรับคำปรึกษาฟรีและเริ่มต้นการเปลี่ยนแปลงทางดิจิทัลของคุณ',
      primaryButtonText: 'นัดหมายปรึกษา',
      secondaryButtonText: 'ดูผลงาน',
    },
    en: {
      title: 'Ready to Start Your Project?',
      subtitle: 'Contact us today for a free consultation and begin your digital transformation',
      primaryButtonText: 'Schedule Consultation',
      secondaryButtonText: 'View Our Work',
    },
  },
};

async function seedHomepage(strapi: Core.Strapi) {
  try {
    const existingHomepage = await strapi.documents('api::homepage.homepage').findFirst({
      locale: 'th-TH',
    });

    if (existingHomepage) {
      strapi.log.info('Homepage already exists, skipping seed');
      return;
    }

    strapi.log.info('Seeding homepage...');

    // Create Thai version
    const thEntry = await strapi.documents('api::homepage.homepage').create({
      data: {
        heroSection: {
          ...homepageData.heroSection.th,
          ctaButtonLink: '/contact',
          showPartners: true,
        },
        showServicesSection: true,
        servicesSectionTitle: homepageData.servicesSectionTitle.th,
        servicesSectionSubtitle: homepageData.servicesSectionSubtitle.th,
        whyChooseUsSection: {
          title: homepageData.whyChooseUsSection.th.title,
          subtitle: homepageData.whyChooseUsSection.th.subtitle,
          features: homepageData.whyChooseUsSection.th.features as any,
          isVisible: true,
        },
        showFeaturedWorks: true,
        featuredWorksTitle: homepageData.featuredWorksTitle.th,
        featuredWorksSubtitle: homepageData.featuredWorksSubtitle.th,
        featuredWorksCount: 4,
        showNewsSection: true,
        newsSectionTitle: homepageData.newsSectionTitle.th,
        newsSectionSubtitle: homepageData.newsSectionSubtitle.th,
        newsCount: 3,
        showStatsSection: true,
        statsSectionTitle: homepageData.statsSectionTitle.th,
        ctaSection: {
          ...homepageData.ctaSection.th,
          primaryButtonLink: '/contact',
          secondaryButtonLink: '/works',
        },
      },
      locale: 'th-TH',
      status: 'published',
    });

    strapi.log.info('Created Thai homepage');

    // Create English version
    await strapi.documents('api::homepage.homepage').update({
      documentId: thEntry.documentId,
      data: {
        heroSection: {
          ...homepageData.heroSection.en,
          ctaButtonLink: '/contact',
          showPartners: true,
        },
        showServicesSection: true,
        servicesSectionTitle: homepageData.servicesSectionTitle.en,
        servicesSectionSubtitle: homepageData.servicesSectionSubtitle.en,
        whyChooseUsSection: {
          title: homepageData.whyChooseUsSection.en.title,
          subtitle: homepageData.whyChooseUsSection.en.subtitle,
          features: homepageData.whyChooseUsSection.en.features as any,
          isVisible: true,
        },
        showFeaturedWorks: true,
        featuredWorksTitle: homepageData.featuredWorksTitle.en,
        featuredWorksSubtitle: homepageData.featuredWorksSubtitle.en,
        featuredWorksCount: 4,
        showNewsSection: true,
        newsSectionTitle: homepageData.newsSectionTitle.en,
        newsSectionSubtitle: homepageData.newsSectionSubtitle.en,
        newsCount: 3,
        showStatsSection: true,
        statsSectionTitle: homepageData.statsSectionTitle.en,
        ctaSection: {
          ...homepageData.ctaSection.en,
          primaryButtonLink: '/contact',
          secondaryButtonLink: '/works',
        },
      },
      locale: 'en',
      status: 'published',
    });

    strapi.log.info('Created English homepage');
    strapi.log.info('Homepage seeding complete!');
  } catch (error) {
    strapi.log.error('Failed to seed homepage:', error);
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
    await seedCareerBenefits(strapi);
    await seedJobPositions(strapi);
    await seedContactInfo(strapi);
    await seedLegalPages(strapi);
    await seedHomepage(strapi);
  },
};
