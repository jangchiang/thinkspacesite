/**
 * Seed script for Case Studies — the ~20 REAL ThinkSpace projects from the
 * company profile. Bilingual TH/EN. Follows the case-study content type:
 * title, slug, clientName, excerpt, challenge (richtext), solution (richtext),
 * industry, resultValue/resultLabel, technologies (json).
 *
 * Run with: STRAPI_URL=http://localhost:1337 STRAPI_API_TOKEN=your_token npx ts-node scripts/seed-case-studies.ts
 */

export {};

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN || '';

interface CaseStudyData {
  slug: string;
  clientName: string;
  title: { th: string; en: string };
  industry: { th: string; en: string };
  excerpt: { th: string; en: string };
  challenge: { th: string; en: string };
  solution: { th: string; en: string };
  resultLabel: { th: string; en: string };
  resultValue: string;
  technologies: string[];
}

const caseStudies: CaseStudyData[] = [
  {
    slug: 'bedding-houze-cross-border-erp',
    clientName: 'Bedding Houze',
    title: {
      th: 'ระบบ ERP ข้ามพรมแดน ไทย–มาเลเซีย',
      en: 'Cross-Border ERP (Thailand–Malaysia)',
    },
    industry: { th: 'ค้าปลีก / การผลิต', en: 'Retail / Manufacturing' },
    excerpt: {
      th: 'ระบบ ERP ที่เชื่อมการดำเนินงานข้ามพรมแดนไทยและมาเลเซียให้เป็นหนึ่งเดียว',
      en: 'A unified ERP connecting cross-border operations across Thailand and Malaysia.',
    },
    challenge: {
      th: 'Bedding Houze ดำเนินธุรกิจทั้งในไทยและมาเลเซีย แต่ระบบงานแยกส่วน หลายสกุลเงินและหลายภาษา ทำให้ข้อมูลไม่ตรงกันและบริหารจัดการได้ยาก',
      en: 'Bedding Houze operated across Thailand and Malaysia with fragmented systems, multiple currencies, and multiple languages, leaving data inconsistent and operations hard to manage.',
    },
    solution: {
      th: 'เราออกแบบและพัฒนาระบบ ERP รวมศูนย์ที่รองรับหลายประเทศ หลายสกุลเงิน และหลายภาษา เชื่อมข้อมูลการขาย คลังสินค้า และบัญชีให้เป็นภาพเดียว',
      en: 'We designed and built a centralized ERP supporting multiple countries, currencies, and languages, unifying sales, inventory, and accounting into a single view.',
    },
    resultLabel: { th: 'การดำเนินงานข้ามพรมแดน', en: 'Cross-Border Operations' },
    resultValue: '2',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'TypeScript'],
  },
  {
    slug: 'getha-enterprise-cybersecurity',
    clientName: 'GETHA',
    title: {
      th: 'ความมั่นคงปลอดภัยไซเบอร์ระดับองค์กร',
      en: 'Enterprise Cybersecurity',
    },
    industry: { th: 'องค์กรเอกชน (มาเลเซีย)', en: 'Enterprise (Malaysia)' },
    excerpt: {
      th: 'วางระบบความมั่นคงปลอดภัยไซเบอร์ระดับองค์กรให้ GETHA ในประเทศมาเลเซีย',
      en: 'Enterprise-grade cybersecurity delivered for GETHA in Malaysia.',
    },
    challenge: {
      th: 'GETHA ต้องการยกระดับความมั่นคงปลอดภัยไซเบอร์ขององค์กรให้ครอบคลุมและตรวจสอบได้',
      en: 'GETHA needed to elevate its enterprise cybersecurity posture to be comprehensive and auditable.',
    },
    solution: {
      th: 'เราประเมินความเสี่ยง ออกแบบมาตรการป้องกัน และวางระบบความมั่นคงปลอดภัยไซเบอร์ให้ครอบคลุมโครงสร้างพื้นฐานองค์กร',
      en: 'We assessed risk, designed protective controls, and deployed an enterprise cybersecurity program across the organization’s infrastructure.',
    },
    resultLabel: { th: 'ความมั่นคงปลอดภัยองค์กร', en: 'Enterprise Security' },
    resultValue: '24/7',
    technologies: ['pfSense', 'Linux', 'Proxmox VE'],
  },
  {
    slug: 'suppaisan-goldsmith-gold-savings',
    clientName: 'Suppaisan Goldsmith',
    title: {
      th: 'เว็บแอปออมทอง',
      en: 'Gold-Savings Web Application',
    },
    industry: { th: 'การเงิน / ค้าปลีก', en: 'Finance / Retail' },
    excerpt: {
      th: 'แอปออมทองออนไลน์สำหรับร้านทอง Suppaisan Goldsmith',
      en: 'An online gold-savings app for the Suppaisan Goldsmith store.',
    },
    challenge: {
      th: 'ร้านต้องการให้ลูกค้าออมทองและติดตามยอดได้อย่างสะดวกผ่านช่องทางออนไลน์',
      en: 'The store wanted customers to save in gold and track their balances conveniently online.',
    },
    solution: {
      th: 'เราพัฒนาเว็บแอปออมทองที่ใช้งานง่าย รองรับการสะสมยอดและการติดตามมูลค่าทองแบบเรียลไทม์',
      en: 'We built an easy-to-use gold-savings web app supporting balance accrual and real-time gold-value tracking.',
    },
    resultLabel: { th: 'ช่องทางออมทองออนไลน์', en: 'Online Savings Channel' },
    resultValue: '100%',
    technologies: ['Next.js', 'React', 'PostgreSQL'],
  },
  {
    slug: 'cmu-railcfc-3d-digital-twin-ballast',
    clientName: 'CMU-RAILCFC',
    title: {
      th: 'Digital Twin 3 มิติของหินโรยทางรถไฟ',
      en: '3D Digital Twin of Railway Ballast',
    },
    industry: { th: 'วิศวกรรมระบบราง / วิจัย', en: 'Railway Engineering / Research' },
    excerpt: {
      th: 'สร้าง Digital Twin แบบ 3 มิติของหินโรยทางรถไฟเพื่อการวิเคราะห์เชิงวิศวกรรม',
      en: 'A 3D digital twin of railway ballast for engineering analysis.',
    },
    challenge: {
      th: 'ทีมวิจัยต้องการแบบจำลองดิจิทัลของหินโรยทางที่สะท้อนพฤติกรรมจริงเพื่อการวิเคราะห์',
      en: 'The research team needed a digital model of track ballast that reflected real behavior for analysis.',
    },
    solution: {
      th: 'เราสร้าง Digital Twin แบบ 3 มิติของหินโรยทางรถไฟ ร่วมกับ CMU-RAILCFC เพื่อใช้ในการศึกษาและจำลอง',
      en: 'We built a 3D digital twin of railway ballast with CMU-RAILCFC for study and simulation.',
    },
    resultLabel: { th: 'แบบจำลองดิจิทัล 3 มิติ', en: '3D Digital Model' },
    resultValue: '3D',
    technologies: ['Python', 'C++', 'LMGC90', 'CUDA'],
  },
  {
    slug: 'ubah-marketplace-nana-digital',
    clientName: 'Nana Digital',
    title: {
      th: 'มาร์เก็ตเพลส Ubah',
      en: 'Ubah Marketplace',
    },
    industry: { th: 'อีคอมเมิร์ซ / แพลตฟอร์ม', en: 'E-Commerce / Platform' },
    excerpt: {
      th: 'พัฒนาแพลตฟอร์มมาร์เก็ตเพลส Ubah ร่วมกับ Nana Digital',
      en: 'The Ubah marketplace platform built with Nana Digital.',
    },
    challenge: {
      th: 'ต้องการแพลตฟอร์มมาร์เก็ตเพลสที่รองรับผู้ขายหลายราย พร้อมระบบสมาชิกและการชำระเงิน',
      en: 'A multi-vendor marketplace was needed, complete with membership and payment flows.',
    },
    solution: {
      th: 'เราพัฒนาแพลตฟอร์มมาร์เก็ตเพลส Ubah ที่รองรับผู้ขายหลายราย การจัดการสินค้า และการชำระเงิน',
      en: 'We built the Ubah marketplace supporting multiple sellers, product management, and payments.',
    },
    resultLabel: { th: 'แพลตฟอร์มมาร์เก็ตเพลส', en: 'Marketplace Platform' },
    resultValue: '100%',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'TypeScript'],
  },
  {
    slug: 'egat-slope-stability-risk-ai',
    clientName: 'CMU-RAILCFC + EGAT',
    title: {
      th: 'AI ประเมินความเสี่ยงเสถียรภาพลาดดิน',
      en: 'Slope-Stability Risk AI',
    },
    industry: { th: 'พลังงาน / วิจัย', en: 'Energy / Research' },
    excerpt: {
      th: 'โมเดล AI ประเมินความเสี่ยงเสถียรภาพลาดดิน ร่วมกับ CMU-RAILCFC และ กฟผ. (EGAT)',
      en: 'A slope-stability risk AI developed with CMU-RAILCFC and EGAT.',
    },
    challenge: {
      th: 'การประเมินความเสี่ยงเสถียรภาพลาดดินด้วยวิธีเดิมใช้เวลานานและพึ่งพาผู้เชี่ยวชาญสูง',
      en: 'Traditional slope-stability risk assessment was time-consuming and highly expert-dependent.',
    },
    solution: {
      th: 'เราพัฒนาโมเดล AI ประเมินความเสี่ยงเสถียรภาพลาดดิน ร่วมกับ CMU-RAILCFC และ กฟผ. เพื่อช่วยสนับสนุนการตัดสินใจ',
      en: 'We developed an AI model for slope-stability risk assessment with CMU-RAILCFC and EGAT to support decision-making.',
    },
    resultLabel: { th: 'การประเมินความเสี่ยงด้วย AI', en: 'AI Risk Assessment' },
    resultValue: 'AI',
    technologies: ['Python', 'PyTorch', 'scikit-learn'],
  },
  {
    slug: 'engineers-soul-2025-cmueaa',
    clientName: 'CMUEAA',
    title: {
      th: 'แพลตฟอร์มงาน Engineers’ Soul 2025',
      en: 'Engineers’ Soul 2025 Event Platform',
    },
    industry: { th: 'การศึกษา / กิจกรรม', en: 'Education / Events' },
    excerpt: {
      th: 'แพลตฟอร์มจัดงาน Engineers’ Soul 2025 ให้สมาคมศิษย์เก่าวิศวฯ มช. (CMUEAA)',
      en: 'The Engineers’ Soul 2025 event platform for the CMU Engineering Alumni Association.',
    },
    challenge: {
      th: 'งานต้องการระบบลงทะเบียนและบริหารผู้เข้าร่วมจำนวนมากให้ราบรื่น',
      en: 'The event needed smooth registration and management for a large number of attendees.',
    },
    solution: {
      th: 'เราพัฒนาแพลตฟอร์มจัดงาน Engineers’ Soul 2025 รองรับการลงทะเบียนและบริหารผู้เข้าร่วม',
      en: 'We built the Engineers’ Soul 2025 platform handling registration and attendee management.',
    },
    resultLabel: { th: 'แพลตฟอร์มกิจกรรม', en: 'Event Platform' },
    resultValue: '2025',
    technologies: ['Next.js', 'React', 'PostgreSQL'],
  },
  {
    slug: 'cmuaa-graduate-marketplace',
    clientName: 'CMUAA',
    title: {
      th: 'มาร์เก็ตเพลสบัณฑิต',
      en: 'Graduate Marketplace',
    },
    industry: { th: 'การศึกษา / แพลตฟอร์ม', en: 'Education / Platform' },
    excerpt: {
      th: 'มาร์เก็ตเพลสสำหรับบัณฑิตของสมาคมศิษย์เก่ามหาวิทยาลัยเชียงใหม่ (CMUAA)',
      en: 'A graduate marketplace for the CMU Alumni Association (CMUAA).',
    },
    challenge: {
      th: 'สมาคมต้องการพื้นที่ออนไลน์ที่เชื่อมบัณฑิตและกิจกรรมในระยะยาว',
      en: 'The association needed an online space connecting graduates and activities over the long term.',
    },
    solution: {
      th: 'เราพัฒนาแพลตฟอร์มมาร์เก็ตเพลสบัณฑิตที่รองรับการใช้งานต่อเนื่องในระยะยาว',
      en: 'We built a graduate marketplace platform designed for sustained long-term use.',
    },
    resultLabel: { th: 'แพลตฟอร์มบัณฑิต', en: 'Graduate Platform' },
    resultValue: '100%',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL'],
  },
  {
    slug: 'cmuaa-digital-graduate-id',
    clientName: 'CMUAA',
    title: {
      th: 'บัตรบัณฑิตดิจิทัล',
      en: 'Digital Graduate ID',
    },
    industry: { th: 'การศึกษา / แพลตฟอร์ม', en: 'Education / Platform' },
    excerpt: {
      th: 'ระบบบัตรบัณฑิตดิจิทัลสำหรับสมาคมศิษย์เก่ามหาวิทยาลัยเชียงใหม่',
      en: 'A digital graduate ID system for the CMU Alumni Association.',
    },
    challenge: {
      th: 'ต้องการบัตรประจำตัวบัณฑิตในรูปแบบดิจิทัลที่ใช้งานและตรวจสอบได้สะดวก',
      en: 'A digital graduate ID was needed that was easy to use and verify.',
    },
    solution: {
      th: 'เราพัฒนาระบบบัตรบัณฑิตดิจิทัลที่ออกและตรวจสอบได้อย่างปลอดภัย',
      en: 'We built a digital graduate ID system that can be issued and verified securely.',
    },
    resultLabel: { th: 'บัตรดิจิทัล', en: 'Digital Identity' },
    resultValue: '100%',
    technologies: ['Next.js', 'PostgreSQL', 'TypeScript'],
  },
  {
    slug: 'hidden-cafe-lum-dee-pos',
    clientName: 'Hidden Cafe',
    title: {
      th: 'ระบบ POS LUM-DEE',
      en: 'LUM-DEE Point-of-Sale',
    },
    industry: { th: 'ค้าปลีก / ร้านอาหาร', en: 'Retail / F&B' },
    excerpt: {
      th: 'ระบบ POS LUM-DEE สำหรับ Hidden Cafe',
      en: 'The LUM-DEE POS system for Hidden Cafe.',
    },
    challenge: {
      th: 'ร้านต้องการระบบขายหน้าร้านที่ใช้งานง่ายและจัดการรายการได้รวดเร็ว',
      en: 'The café needed an easy-to-use point-of-sale that handled orders quickly.',
    },
    solution: {
      th: 'เราพัฒนาระบบ POS LUM-DEE ที่ใช้งานง่าย รองรับการขายและการจัดการรายการสินค้า',
      en: 'We built the LUM-DEE POS — easy to use, supporting sales and order management.',
    },
    resultLabel: { th: 'ระบบขายหน้าร้าน', en: 'Point-of-Sale' },
    resultValue: '100%',
    technologies: ['Next.js', 'React', 'PostgreSQL'],
  },
  {
    slug: 'thidanukroh-school-central-auth-nac',
    clientName: 'Thidanukroh School',
    title: {
      th: 'ระบบพิสูจน์ตัวตนรวมศูนย์และ NAC',
      en: 'Central Authentication & NAC',
    },
    industry: { th: 'การศึกษา / โครงสร้างพื้นฐาน', en: 'Education / Infrastructure' },
    excerpt: {
      th: 'ระบบพิสูจน์ตัวตนรวมศูนย์และควบคุมการเข้าถึงเครือข่าย (NAC) ให้โรงเรียนธิดานุเคราะห์',
      en: 'Central authentication and network access control (NAC) for Thidanukroh School.',
    },
    challenge: {
      th: 'โรงเรียนต้องการรวมการพิสูจน์ตัวตนและควบคุมการเข้าถึงเครือข่ายให้เป็นระบบเดียว',
      en: 'The school needed to unify authentication and control network access in one system.',
    },
    solution: {
      th: 'เราออกแบบและติดตั้งระบบพิสูจน์ตัวตนรวมศูนย์พร้อม NAC เพื่อความปลอดภัยของเครือข่าย',
      en: 'We designed and deployed centralized authentication with NAC to secure the network.',
    },
    resultLabel: { th: 'พิสูจน์ตัวตนรวมศูนย์', en: 'Centralized Auth' },
    resultValue: '100%',
    technologies: ['Linux', 'pfSense', 'RADIUS'],
  },
  {
    slug: 'songkhla-rajabhat-private-ai-legal',
    clientName: 'Songkhla Rajabhat University',
    title: {
      th: 'Private AI งานกฎหมาย',
      en: 'Private AI for Legal Work',
    },
    industry: { th: 'การศึกษา / กฎหมาย', en: 'Education / Legal' },
    excerpt: {
      th: 'ระบบ Private AI สำหรับงานกฎหมายให้มหาวิทยาลัยราชภัฏสงขลา',
      en: 'A Private AI system for legal work at Songkhla Rajabhat University.',
    },
    challenge: {
      th: 'งานกฎหมายต้องการผู้ช่วย AI ที่ทำงานกับเอกสารภายในได้โดยที่ข้อมูลไม่รั่วไหลออกนอกองค์กร',
      en: 'Legal work needed an AI assistant for internal documents without data leaving the organization.',
    },
    solution: {
      th: 'เราพัฒนาระบบ Private AI ที่ทำงานกับเอกสารกฎหมายภายในองค์กร โดยควบคุมข้อมูลและโมเดลภายในองค์กรเอง',
      en: 'We built a Private AI working over internal legal documents, keeping data and models in-house.',
    },
    resultLabel: { th: 'AI ในองค์กร', en: 'On-Premise AI' },
    resultValue: 'Private',
    technologies: ['vLLM', 'pgvector', 'BGE-M3', 'PostgreSQL'],
  },
  {
    slug: 'silver-temple-web-platform',
    clientName: 'Silver Temple Foundation',
    title: {
      th: 'แพลตฟอร์มเว็บวัดเงิน',
      en: 'Silver Temple Web Platform',
    },
    industry: { th: 'องค์กรไม่แสวงหากำไร / วัฒนธรรม', en: 'Non-Profit / Culture' },
    excerpt: {
      th: 'แพลตฟอร์มเว็บสำหรับมูลนิธิวัดเงิน',
      en: 'A web platform for the Silver Temple Foundation.',
    },
    challenge: {
      th: 'มูลนิธิต้องการพื้นที่ออนไลน์เพื่อสื่อสารและเผยแพร่ข้อมูลของวัด',
      en: 'The foundation needed an online presence to communicate and share information.',
    },
    solution: {
      th: 'เราพัฒนาแพลตฟอร์มเว็บที่นำเสนอข้อมูลของวัดเงินได้อย่างสวยงามและใช้งานง่าย',
      en: 'We built a web platform presenting the Silver Temple’s information attractively and accessibly.',
    },
    resultLabel: { th: 'แพลตฟอร์มเว็บ', en: 'Web Platform' },
    resultValue: '100%',
    technologies: ['Next.js', 'React'],
  },
  {
    slug: 'ccinnoma-ai-formulation-engine',
    clientName: 'CCINNOMA',
    title: {
      th: 'เครื่องมือ AI ช่วยคิดค้นสูตรผลิตภัณฑ์',
      en: 'AI Formulation Engine',
    },
    industry: { th: 'นวัตกรรม / การผลิต', en: 'Innovation / Manufacturing' },
    excerpt: {
      th: 'เครื่องมือ AI ช่วยคิดค้นสูตรผลิตภัณฑ์ให้ CCINNOMA',
      en: 'An AI engine that assists product formulation for CCINNOMA.',
    },
    challenge: {
      th: 'การคิดค้นสูตรผลิตภัณฑ์ใช้เวลามากและพึ่งพาการลองผิดลองถูก',
      en: 'Developing product formulations was time-consuming and trial-and-error heavy.',
    },
    solution: {
      th: 'เราพัฒนาเครื่องมือ AI ที่ช่วยเสนอและประเมินสูตรผลิตภัณฑ์เพื่อเร่งการคิดค้น',
      en: 'We built an AI engine that proposes and evaluates formulations to accelerate development.',
    },
    resultLabel: { th: 'AI ช่วยคิดค้นสูตร', en: 'AI-Assisted R&D' },
    resultValue: 'AI',
    technologies: ['Python', 'PyTorch', 'scikit-learn'],
  },
  {
    slug: 'wanawat-hardware-private-ai-doc-intelligence',
    clientName: 'Wanawat Hardware',
    title: {
      th: 'Private AI วิเคราะห์เอกสารองค์กร',
      en: 'Private AI Document Intelligence',
    },
    industry: { th: 'ค้าปลีก / กระจายสินค้า', en: 'Retail / Distribution' },
    excerpt: {
      th: 'ระบบ Private AI วิเคราะห์เอกสารภายในองค์กรให้ Wanawat Hardware',
      en: 'A Private AI document-intelligence system for Wanawat Hardware.',
    },
    challenge: {
      th: 'องค์กรมีเอกสารภายในจำนวนมากที่ค้นหาและสรุปได้ยาก โดยข้อมูลต้องไม่ออกนอกองค์กร',
      en: 'The company held many internal documents that were hard to search and summarize, with data that must stay in-house.',
    },
    solution: {
      th: 'เราพัฒนาระบบ Private AI วิเคราะห์เอกสารที่ทำงานภายในองค์กร ช่วยค้นหาและสรุปข้อมูลได้รวดเร็ว',
      en: 'We built an on-premise Private AI document-intelligence system that searches and summarizes content quickly.',
    },
    resultLabel: { th: 'AI ในองค์กร', en: 'On-Premise AI' },
    resultValue: 'Private',
    technologies: ['vLLM', 'pgvector', 'BGE-M3', 'PostgreSQL'],
  },
  {
    slug: 'rajaprajanugroh-19-school-site',
    clientName: 'Rajaprajanugroh 19 School',
    title: {
      th: 'เว็บไซต์โรงเรียน',
      en: 'School Website',
    },
    industry: { th: 'การศึกษา', en: 'Education' },
    excerpt: {
      th: 'เว็บไซต์ของโรงเรียนราชประชานุเคราะห์ 19',
      en: 'The website for Rajaprajanugroh 19 School.',
    },
    challenge: {
      th: 'โรงเรียนต้องการเว็บไซต์ที่นำเสนอข้อมูลและข่าวสารได้อย่างเป็นทางการ',
      en: 'The school needed a website to present information and news in a professional way.',
    },
    solution: {
      th: 'เราพัฒนาเว็บไซต์โรงเรียนที่ดูแลและอัปเดตเนื้อหาได้ง่าย',
      en: 'We built a school website that is easy to maintain and update.',
    },
    resultLabel: { th: 'เว็บไซต์องค์กร', en: 'Institutional Website' },
    resultValue: '100%',
    technologies: ['Next.js', 'React'],
  },
  {
    slug: 'entaneer-golf-club-platform',
    clientName: 'Entaneer Golf Club',
    title: {
      th: 'แพลตฟอร์มชมรมกอล์ฟ Entaneer',
      en: 'Entaneer Golf Club Platform',
    },
    industry: { th: 'กิจกรรม / ชุมชน', en: 'Events / Community' },
    excerpt: {
      th: 'แพลตฟอร์มสำหรับชมรมกอล์ฟ Entaneer',
      en: 'A platform for the Entaneer Golf Club.',
    },
    challenge: {
      th: 'ชมรมต้องการระบบบริหารสมาชิกและกิจกรรมที่ใช้งานสะดวก',
      en: 'The club needed a convenient way to manage members and activities.',
    },
    solution: {
      th: 'เราพัฒนาแพลตฟอร์มที่ช่วยบริหารสมาชิกและกิจกรรมของชมรมกอล์ฟ',
      en: 'We built a platform to manage the golf club’s members and activities.',
    },
    resultLabel: { th: 'แพลตฟอร์มชุมชน', en: 'Community Platform' },
    resultValue: '100%',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL'],
  },
  {
    slug: 'cmu-railcfc-cloud-network-infra',
    clientName: 'CMU-RAILCFC',
    title: {
      th: 'โครงสร้างพื้นฐานคลาวด์และเครือข่าย',
      en: 'Cloud & Network Infrastructure',
    },
    industry: { th: 'วิจัย / โครงสร้างพื้นฐาน', en: 'Research / Infrastructure' },
    excerpt: {
      th: 'วางและดูแลโครงสร้างพื้นฐานคลาวด์และเครือข่ายระยะยาวให้ CMU-RAILCFC',
      en: 'Long-running cloud and network infrastructure for CMU-RAILCFC.',
    },
    challenge: {
      th: 'ศูนย์วิจัยต้องการโครงสร้างพื้นฐานคลาวด์และเครือข่ายที่มั่นคงและขยายได้สำหรับงานวิจัย',
      en: 'The research center needed reliable, scalable cloud and network infrastructure for research workloads.',
    },
    solution: {
      th: 'เราวางและดูแลโครงสร้างพื้นฐานคลาวด์และเครือข่ายให้ CMU-RAILCFC อย่างต่อเนื่อง',
      en: 'We deployed and operated cloud and network infrastructure for CMU-RAILCFC on an ongoing basis.',
    },
    resultLabel: { th: 'โครงสร้างพื้นฐานต่อเนื่อง', en: 'Sustained Infrastructure' },
    resultValue: '3yr',
    technologies: ['Proxmox VE', 'Ceph', 'Linux', 'Docker'],
  },
  {
    slug: 'lmgc90-gpu-acceleration-dem',
    clientName: 'CMU-RAILCFC',
    title: {
      th: 'เร่งความเร็ว DEM ด้วย GPU บน LMGC90',
      en: 'GPU Acceleration of DEM on LMGC90',
    },
    industry: { th: 'HPC / วิจัย', en: 'HPC / Research' },
    excerpt: {
      th: 'เร่งความเร็วการคำนวณ Discrete Element Method (DEM) ด้วย GPU บน LMGC90',
      en: 'GPU acceleration of Discrete Element Method (DEM) computation on LMGC90.',
    },
    challenge: {
      th: 'การคำนวณ DEM ขนาดใหญ่ใช้เวลานานมากบนการประมวลผลแบบ CPU',
      en: 'Large-scale DEM computation took very long on CPU-based processing.',
    },
    solution: {
      th: 'เราเร่งความเร็วการคำนวณ DEM ด้วย GPU บน LMGC90 ทำให้งานจำลองเสร็จเร็วขึ้นอย่างมีนัยสำคัญ',
      en: 'We accelerated DEM computation with GPUs on LMGC90, significantly speeding up the simulations.',
    },
    resultLabel: { th: 'การเร่งความเร็วด้วย GPU', en: 'GPU Speed-Up' },
    resultValue: 'GPU',
    technologies: ['CUDA', 'LMGC90', 'C++', 'Python'],
  },
  {
    slug: 'nationwide-traffic-accident-analytics',
    clientName: 'Public Sector',
    title: {
      th: 'การวิเคราะห์ข้อมูลอุบัติเหตุจราจรระดับประเทศ',
      en: 'Nationwide Traffic-Accident Analytics',
    },
    industry: { th: 'ภาครัฐ / ข้อมูล', en: 'Public Sector / Data' },
    excerpt: {
      th: 'วิเคราะห์ข้อมูลอุบัติเหตุจราจรในระดับประเทศเพื่อสนับสนุนการตัดสินใจ',
      en: 'Nationwide traffic-accident analytics to support decision-making.',
    },
    challenge: {
      th: 'ข้อมูลอุบัติเหตุจราจรมีจำนวนมากและกระจัดกระจาย ทำให้สรุปภาพรวมได้ยาก',
      en: 'Traffic-accident data was large and scattered, making it hard to see the big picture.',
    },
    solution: {
      th: 'เรารวบรวมและวิเคราะห์ข้อมูลอุบัติเหตุจราจรระดับประเทศ พร้อมแสดงผลเชิงพื้นที่เพื่อสนับสนุนการตัดสินใจ',
      en: 'We aggregated and analyzed nationwide traffic-accident data with spatial visualization to support decisions.',
    },
    resultLabel: { th: 'การวิเคราะห์ระดับประเทศ', en: 'Nationwide Analytics' },
    resultValue: 'National',
    technologies: ['Python', 'Pandas', 'PostGIS', 'PostgreSQL'],
  },
  {
    slug: 'track-quality-index-ml',
    clientName: 'สทร. (Rail Research Institute)',
    title: {
      th: 'ดัชนีคุณภาพราง (Track Quality Index) ด้วย Machine Learning',
      en: 'Track Quality Index via Machine Learning',
    },
    industry: { th: 'วิศวกรรมระบบราง / วิจัย', en: 'Railway Engineering / Research' },
    excerpt: {
      th: 'พัฒนาดัชนีคุณภาพราง (Track Quality Index) ด้วย Machine Learning ร่วมกับ สทร.',
      en: 'A machine-learning Track Quality Index developed with the rail research institute (สทร.).',
    },
    challenge: {
      th: 'การประเมินคุณภาพรางต้องการตัวชี้วัดเชิงข้อมูลที่สม่ำเสมอและทำซ้ำได้',
      en: 'Assessing track quality required a consistent, repeatable data-driven metric.',
    },
    solution: {
      th: 'เราพัฒนาดัชนีคุณภาพรางด้วย Machine Learning เพื่อให้ประเมินคุณภาพรางได้อย่างเป็นระบบ',
      en: 'We built a machine-learning Track Quality Index for systematic track-quality assessment.',
    },
    resultLabel: { th: 'ดัชนีเชิงข้อมูล', en: 'Data-Driven Index' },
    resultValue: 'ML',
    technologies: ['Python', 'scikit-learn', 'Pandas'],
  },
];

async function createCaseStudy(cs: CaseStudyData) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN}`,
  };

  // Create Thai version first (default locale)
  const thData = {
    data: {
      title: cs.title.th,
      slug: cs.slug,
      clientName: cs.clientName,
      industry: cs.industry.th,
      excerpt: cs.excerpt.th,
      challenge: cs.challenge.th,
      solution: cs.solution.th,
      resultValue: cs.resultValue,
      resultLabel: cs.resultLabel.th,
      technologies: cs.technologies,
    },
  };

  console.log(`Creating Thai case study: ${cs.slug}...`);

  const thResponse = await fetch(`${STRAPI_URL}/api/case-studies`, {
    method: 'POST',
    headers,
    body: JSON.stringify(thData),
  });

  if (!thResponse.ok) {
    const error = await thResponse.text();
    console.error(`Failed to create Thai ${cs.slug}:`, error);
    return null;
  }

  const thResult = await thResponse.json() as { data: { documentId: string } };
  const documentId = thResult.data.documentId;
  console.log(`Created Thai ${cs.slug} with documentId: ${documentId}`);

  // Publish Thai version
  await fetch(`${STRAPI_URL}/api/case-studies/${documentId}/actions/publish`, {
    method: 'POST',
    headers,
  });
  console.log(`Published Thai ${cs.slug}`);

  // Create English localization
  const enData = {
    data: {
      title: cs.title.en,
      slug: cs.slug,
      clientName: cs.clientName,
      industry: cs.industry.en,
      excerpt: cs.excerpt.en,
      challenge: cs.challenge.en,
      solution: cs.solution.en,
      resultValue: cs.resultValue,
      resultLabel: cs.resultLabel.en,
      technologies: cs.technologies,
    },
  };

  console.log(`Creating English case study: ${cs.slug}...`);

  const enResponse = await fetch(`${STRAPI_URL}/api/case-studies/${documentId}?locale=en`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(enData),
  });

  if (!enResponse.ok) {
    const error = await enResponse.text();
    console.error(`Failed to create English ${cs.slug}:`, error);
    return documentId;
  }

  console.log(`Created English ${cs.slug}`);

  // Publish English version
  await fetch(`${STRAPI_URL}/api/case-studies/${documentId}/actions/publish?locale=en`, {
    method: 'POST',
    headers,
  });
  console.log(`Published English ${cs.slug}\n`);

  return documentId;
}

async function main() {
  if (!API_TOKEN) {
    console.error('Error: STRAPI_API_TOKEN is not set');
    console.log('Please set the STRAPI_API_TOKEN environment variable');
    console.log('You can create an API token in Strapi Admin > Settings > API Tokens');
    process.exit(1);
  }

  console.log('Seeding Case Studies with real ThinkSpace projects...\n');
  console.log(`Using Strapi URL: ${STRAPI_URL}\n`);

  for (const cs of caseStudies) {
    await createCaseStudy(cs);
  }

  console.log('Seeding complete!');
  console.log(`\n${caseStudies.length} case studies created:`);
  caseStudies.forEach((cs, i) => {
    console.log(`${i + 1}. ${cs.clientName} — ${cs.title.en} (/${cs.slug})`);
  });
}

main().catch(console.error);
