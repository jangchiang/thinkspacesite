import { type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { getService, getPageHero } from '@/lib/strapi'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { buildHeroBackground } from '@/lib/hero-utils'
import {
  ServiceHero,
  FeaturesSection,
  UseCasesSection,
  TechnologiesSection,
  ProcessSection,
  BenefitsSection,
  ServiceCTA,
} from '@/components/sections/service-detail-sections'
import { Breadcrumb } from '@/components/ui/breadcrumb'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

// Strapi service data interface
interface StrapiImage {
  id: number
  url: string
  formats?: {
    large?: { url: string }
    medium?: { url: string }
    small?: { url: string }
    thumbnail?: { url: string }
  }
}

interface StrapiService {
  id: number
  documentId: string
  title: string
  slug: string
  description?: string
  shortDescription?: string
  icon?: string
  color?: string
  featuredImage?: StrapiImage
  features?: { id: number; title: string }[]
  useCases?: { id: number; title: string; description: string }[]
  technologies?: { id: number; name: string }[]
  processSteps?: { id: number; title: string; description: string }[]
}

// Helper to build Strapi image URL (use public URL for browser access)
function getStrapiImageUrl(image: StrapiImage | undefined): string | undefined {
  if (!image) return undefined
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.techthinkspace.com'
  // Prefer large format, fallback to original
  const imageUrl = image.formats?.large?.url || image.formats?.medium?.url || image.url
  return `${baseUrl}${imageUrl}`
}

interface Bilingual {
  en: string
  th: string
}

interface BilingualPair {
  en: { title: string; description: string }
  th: { title: string; description: string }
}

interface ServiceData {
  iconName: string
  color: string
  title: Bilingual
  description: Bilingual
  image?: string
  features: Bilingual[]
  useCases: BilingualPair[]
  technologies: string[]
  process: BilingualPair[]
}

// REAL ThinkSpace service pillars (Chiang Mai, registered Nov 2024).
// Six pillars: software, cybersecurity, ai-datascience, hpc, iot, research.
const serviceData: Record<string, ServiceData> = {
  software: {
    iconName: 'Code',
    color: 'bg-primary',
    image: '/images/services/software-solutions.jpg',
    title: { en: 'Software Solutions', th: 'โซลูชันซอฟต์แวร์' },
    description: {
      en: 'Custom software, web and mobile platforms, and enterprise systems engineered end to end — from cross-border ERP to POS and digital marketplaces.',
      th: 'พัฒนาซอฟต์แวร์ตามความต้องการ แพลตฟอร์มเว็บและมือถือ และระบบองค์กรแบบครบวงจร ตั้งแต่ ERP ข้ามพรมแดน ไปจนถึงระบบ POS และมาร์เก็ตเพลส',
    },
    features: [
      { en: 'Custom software & web application development', th: 'พัฒนาซอฟต์แวร์และเว็บแอปพลิเคชันตามความต้องการ' },
      { en: 'Cross-border & enterprise ERP systems', th: 'ระบบ ERP องค์กรและข้ามพรมแดน' },
      { en: 'E-commerce, POS & digital marketplaces', th: 'อีคอมเมิร์ซ ระบบ POS และมาร์เก็ตเพลสดิจิทัล' },
      { en: 'Mobile applications (iOS & Android)', th: 'แอปพลิเคชันมือถือ (iOS และ Android)' },
      { en: 'API development & system integration', th: 'พัฒนา API และการเชื่อมต่อระบบ' },
      { en: 'Event & membership platforms', th: 'แพลตฟอร์มงานอีเวนต์และสมาชิก' },
    ],
    useCases: [
      {
        en: { title: 'Cross-border ERP', description: 'TH–MY enterprise ERP for Bedding Houze, unifying operations across two countries.' },
        th: { title: 'ERP ข้ามพรมแดน', description: 'ระบบ ERP องค์กรไทย–มาเลเซียสำหรับ Bedding Houze เชื่อมการดำเนินงานสองประเทศ' },
      },
      {
        en: { title: 'Gold-savings web app', description: 'Suppaisan Goldsmith digital gold-savings platform for retail customers.' },
        th: { title: 'เว็บแอปออมทอง', description: 'แพลตฟอร์มออมทองดิจิทัลสำหรับร้านทองศุภายศานต์ บริการลูกค้ารายย่อย' },
      },
      {
        en: { title: 'POS for hospitality', description: 'LUM-DEE point-of-sale system for Hidden Cafe with real-time operations.' },
        th: { title: 'ระบบ POS ร้านอาหาร', description: 'ระบบ POS LUM-DEE สำหรับ Hidden Cafe พร้อมการทำงานแบบเรียลไทม์' },
      },
      {
        en: { title: 'Digital marketplaces', description: 'Ubah Marketplace and the CMUAA graduate marketplace for community commerce.' },
        th: { title: 'มาร์เก็ตเพลสดิจิทัล', description: 'Ubah Marketplace และมาร์เก็ตเพลสบัณฑิต CMUAA สำหรับการค้าในชุมชน' },
      },
      {
        en: { title: 'Event platforms', description: "Engineers' Soul 2025 event platform for CMUEAA with registration and engagement." },
        th: { title: 'แพลตฟอร์มอีเวนต์', description: "แพลตฟอร์มงาน Engineers' Soul 2025 สำหรับ CMUEAA พร้อมระบบลงทะเบียน" },
      },
      {
        en: { title: 'Membership & alumni systems', description: 'Digital graduate ID and alumni engagement platforms for CMUAA.' },
        th: { title: 'ระบบสมาชิกและศิษย์เก่า', description: 'บัตรบัณฑิตดิจิทัลและแพลตฟอร์มศิษย์เก่าสำหรับ CMUAA' },
      },
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Bun', 'Elysia', 'Node.js', 'PostgreSQL', 'Strapi', 'Docker', 'React Native', 'Tailwind CSS', 'Redis'],
    process: [
      {
        en: { title: 'Discovery', description: 'Map business workflows, user needs, and technical requirements to scope the build.' },
        th: { title: 'ค้นพบความต้องการ', description: 'วิเคราะห์เวิร์กโฟลว์ธุรกิจ ความต้องการผู้ใช้ และข้อกำหนดทางเทคนิคเพื่อกำหนดขอบเขต' },
      },
      {
        en: { title: 'Design', description: 'Architect the system and craft intuitive interfaces through prototypes.' },
        th: { title: 'ออกแบบ', description: 'ออกแบบสถาปัตยกรรมระบบและอินเทอร์เฟซที่ใช้งานง่ายผ่านต้นแบบ' },
      },
      {
        en: { title: 'Build', description: 'Iterative agile development with regular demos and feedback cycles.' },
        th: { title: 'พัฒนา', description: 'พัฒนาแบบ Agile วนซ้ำ พร้อมการสาธิตและรอบการตอบรับสม่ำเสมอ' },
      },
      {
        en: { title: 'Deliver', description: 'Deploy, train your team, and provide ongoing maintenance and support.' },
        th: { title: 'ส่งมอบ', description: 'ติดตั้ง ฝึกอบรมทีมงาน และให้การบำรุงรักษาและสนับสนุนอย่างต่อเนื่อง' },
      },
    ],
  },
  cybersecurity: {
    iconName: 'Shield',
    color: 'bg-primary',
    image: '/images/services/cybersecurity.jpg',
    title: { en: 'Cybersecurity & Cloud Infrastructure', th: 'ความมั่นคงปลอดภัยไซเบอร์และโครงสร้างพื้นฐานคลาวด์' },
    description: {
      en: 'Enterprise security, identity and access control, and resilient cloud and network infrastructure — including private, sovereign deployments you fully own.',
      th: 'ความปลอดภัยระดับองค์กร การควบคุมตัวตนและสิทธิ์การเข้าถึง และโครงสร้างพื้นฐานคลาวด์และเครือข่ายที่มั่นคง รวมถึงระบบส่วนตัวที่คุณเป็นเจ้าของอย่างเต็มที่',
    },
    features: [
      { en: 'Enterprise cybersecurity assessment', th: 'การประเมินความมั่นคงปลอดภัยไซเบอร์องค์กร' },
      { en: 'Network Access Control (NAC) & central authentication', th: 'การควบคุมการเข้าถึงเครือข่าย (NAC) และระบบยืนยันตัวตนกลาง' },
      { en: 'Cloud & network infrastructure design', th: 'การออกแบบโครงสร้างพื้นฐานคลาวด์และเครือข่าย' },
      { en: 'Proxmox virtualization & private cloud', th: 'การจำลองเสมือนด้วย Proxmox และคลาวด์ส่วนตัว' },
      { en: 'High availability, backup & disaster recovery', th: 'ความพร้อมใช้งานสูง การสำรองข้อมูล และการกู้คืนระบบ' },
      { en: 'Sovereign on-premise deployments', th: 'การติดตั้งระบบอธิปไตยบนเซิร์ฟเวอร์ของคุณเอง' },
    ],
    useCases: [
      {
        en: { title: 'Enterprise cybersecurity', description: 'End-to-end cybersecurity engagement for GETHA across its Malaysian operations.' },
        th: { title: 'ความปลอดภัยไซเบอร์องค์กร', description: 'งานความปลอดภัยไซเบอร์แบบครบวงจรสำหรับ GETHA ในมาเลเซีย' },
      },
      {
        en: { title: 'Central authentication & NAC', description: 'Central authentication and network access control for Thidanukroh School.' },
        th: { title: 'ยืนยันตัวตนกลางและ NAC', description: 'ระบบยืนยันตัวตนกลางและควบคุมการเข้าถึงเครือข่ายสำหรับโรงเรียนธิดานุเคราะห์' },
      },
      {
        en: { title: 'Cloud & network infrastructure', description: 'Cloud and network infrastructure for CMU-RAILCFC research operations.' },
        th: { title: 'โครงสร้างพื้นฐานคลาวด์และเครือข่าย', description: 'โครงสร้างพื้นฐานคลาวด์และเครือข่ายสำหรับงานวิจัย CMU-RAILCFC' },
      },
      {
        en: { title: 'Private cloud with Proxmox', description: 'Enterprise virtualization and private cloud built on Proxmox Virtual Environment.' },
        th: { title: 'คลาวด์ส่วนตัวด้วย Proxmox', description: 'การจำลองเสมือนระดับองค์กรและคลาวด์ส่วนตัวบน Proxmox Virtual Environment' },
      },
      {
        en: { title: 'Sovereign AI infrastructure', description: 'Self-hosted, fully owned infrastructure for organizations handling sensitive data.' },
        th: { title: 'โครงสร้างพื้นฐาน AI อธิปไตย', description: 'โครงสร้างพื้นฐานที่โฮสต์เองและเป็นเจ้าของเต็มที่สำหรับองค์กรที่จัดการข้อมูลละเอียดอ่อน' },
      },
      {
        en: { title: 'Resilient operations', description: 'High availability, live migration, and backup strategies that keep systems online.' },
        th: { title: 'การดำเนินงานที่มั่นคง', description: 'ความพร้อมใช้งานสูง การย้ายระบบขณะทำงาน และกลยุทธ์สำรองข้อมูลที่ทำให้ระบบไม่หยุด' },
      },
    ],
    technologies: ['Proxmox VE', 'Ceph', 'ZFS', 'KVM', 'LXC', 'Docker', 'Cloudflare Tunnel', 'Caddy', 'Linux', 'pfSense', 'RADIUS', 'WireGuard'],
    process: [
      {
        en: { title: 'Assess', description: 'Evaluate your current security posture, infrastructure, and risk exposure.' },
        th: { title: 'ประเมิน', description: 'ประเมินสถานะความปลอดภัย โครงสร้างพื้นฐาน และความเสี่ยงปัจจุบัน' },
      },
      {
        en: { title: 'Architect', description: 'Design secure, resilient cloud and network architecture aligned to your needs.' },
        th: { title: 'ออกแบบสถาปัตยกรรม', description: 'ออกแบบสถาปัตยกรรมคลาวด์และเครือข่ายที่ปลอดภัยและมั่นคงตามความต้องการ' },
      },
      {
        en: { title: 'Implement', description: 'Deploy controls, virtualization, and access management with minimal disruption.' },
        th: { title: 'ดำเนินการ', description: 'ติดตั้งการควบคุม การจำลองเสมือน และการจัดการการเข้าถึง โดยกระทบงานน้อยที่สุด' },
      },
      {
        en: { title: 'Operate', description: 'Continuous monitoring, hardening, and support to keep you protected.' },
        th: { title: 'ดูแลระบบ', description: 'การตรวจสอบ ปรับความแข็งแกร่ง และสนับสนุนอย่างต่อเนื่องเพื่อปกป้องคุณ' },
      },
    ],
  },
  'ai-datascience': {
    iconName: 'Database',
    color: 'bg-primary',
    image: '/images/services/ai-&-data-science.jpg',
    title: { en: 'AI & Data Science', th: 'ปัญญาประดิษฐ์และวิทยาการข้อมูล' },
    description: {
      en: 'Applied AI, machine learning, and private AI systems — from risk-prediction models and document intelligence to sovereign on-premise AI workspaces.',
      th: 'การประยุกต์ใช้ AI แมชชีนเลิร์นนิง และระบบ AI ส่วนตัว ตั้งแต่โมเดลทำนายความเสี่ยงและความเข้าใจเอกสาร ไปจนถึงพื้นที่ทำงาน AI อธิปไตยบนเซิร์ฟเวอร์ของคุณเอง',
    },
    features: [
      { en: 'Machine learning & predictive modeling', th: 'แมชชีนเลิร์นนิงและการสร้างแบบจำลองเชิงทำนาย' },
      { en: 'Private AI & on-premise LLM deployment', th: 'AI ส่วนตัวและการติดตั้ง LLM บนเซิร์ฟเวอร์ของคุณเอง' },
      { en: 'Document intelligence & RAG systems', th: 'ความเข้าใจเอกสารและระบบ RAG' },
      { en: 'Data engineering & analytics pipelines', th: 'วิศวกรรมข้อมูลและไปป์ไลน์การวิเคราะห์' },
      { en: 'Risk & anomaly prediction', th: 'การทำนายความเสี่ยงและความผิดปกติ' },
      { en: 'AI formulation & recommendation engines', th: 'เครื่องมือสูตรและการแนะนำด้วย AI' },
    ],
    useCases: [
      {
        en: { title: 'Slope-stability risk AI', description: 'Risk-prediction AI with CMU-RAILCFC and EGAT for slope-stability monitoring.' },
        th: { title: 'AI ทำนายความเสี่ยงเสถียรภาพลาดดิน', description: 'AI ทำนายความเสี่ยงร่วมกับ CMU-RAILCFC และ กฟผ. สำหรับเสถียรภาพลาดดิน' },
      },
      {
        en: { title: 'Private legal AI', description: 'Private AI for legal work at Songkhla Rajabhat University with full data control.' },
        th: { title: 'AI กฎหมายส่วนตัว', description: 'AI ส่วนตัวสำหรับงานกฎหมายที่มหาวิทยาลัยราชภัฏสงขลา ควบคุมข้อมูลเต็มที่' },
      },
      {
        en: { title: 'Document intelligence', description: 'Private AI document intelligence for Wanawat Hardware operations.' },
        th: { title: 'ความเข้าใจเอกสาร', description: 'AI ส่วนตัววิเคราะห์เอกสารสำหรับการดำเนินงานของวนวัฒน์ฮาร์ดแวร์' },
      },
      {
        en: { title: 'AI formulation engine', description: 'AI-driven formulation engine for CCINNOMA product development.' },
        th: { title: 'เครื่องมือสูตร AI', description: 'เครื่องมือสร้างสูตรด้วย AI สำหรับการพัฒนาผลิตภัณฑ์ของ CCINNOMA' },
      },
      {
        en: { title: 'Traffic-accident analytics', description: 'Nationwide traffic-accident analytics to surface road-safety insights.' },
        th: { title: 'การวิเคราะห์อุบัติเหตุจราจร', description: 'การวิเคราะห์อุบัติเหตุจราจรทั่วประเทศเพื่อค้นหาข้อมูลเชิงลึกด้านความปลอดภัย' },
      },
      {
        en: { title: 'Track Quality Index ML', description: 'Machine-learning Track Quality Index models for railway maintenance (สทร.).' },
        th: { title: 'ดัชนีคุณภาพราง ด้วย ML', description: 'แบบจำลอง ML ดัชนีคุณภาพราง เพื่อการบำรุงรักษาทางรถไฟ (สทร.)' },
      },
    ],
    technologies: ['Python', 'PyTorch', 'scikit-learn', 'vLLM', 'LiteLLM', 'BGE-M3', 'pgvector', 'Apache AGE', 'LangChain', 'PostgreSQL', 'Pandas', 'MCP'],
    process: [
      {
        en: { title: 'Data assessment', description: 'Evaluate data sources, quality, and the problem to identify the right approach.' },
        th: { title: 'ประเมินข้อมูล', description: 'ประเมินแหล่งข้อมูล คุณภาพ และโจทย์ เพื่อหาแนวทางที่เหมาะสม' },
      },
      {
        en: { title: 'Data engineering', description: 'Build pipelines to collect, clean, and structure data for modeling.' },
        th: { title: 'วิศวกรรมข้อมูล', description: 'สร้างไปป์ไลน์รวบรวม ทำความสะอาด และจัดโครงสร้างข้อมูลสำหรับการสร้างแบบจำลอง' },
      },
      {
        en: { title: 'Model development', description: 'Train, validate, and tune models with rigorous evaluation.' },
        th: { title: 'พัฒนาแบบจำลอง', description: 'ฝึก ตรวจสอบ และปรับแต่งแบบจำลองด้วยการประเมินอย่างเข้มงวด' },
      },
      {
        en: { title: 'Deploy & operate', description: 'Ship to production — on-prem or on-cloud — with monitoring and retraining.' },
        th: { title: 'ติดตั้งและดูแล', description: 'นำขึ้นใช้งานจริง ทั้งบนเซิร์ฟเวอร์เองหรือคลาวด์ พร้อมการตรวจสอบและฝึกใหม่' },
      },
    ],
  },
  hpc: {
    iconName: 'Cpu',
    color: 'bg-primary',
    image: '/images/services/3d-printing.jpg',
    title: { en: 'High-Performance Computing (HPC)', th: 'การประมวลผลสมรรถนะสูง (HPC)' },
    description: {
      en: 'GPU-accelerated computing and large-scale simulation — accelerating discrete-element and engineering workloads for research and industry.',
      th: 'การประมวลผลเร่งด้วย GPU และการจำลองขนาดใหญ่ เร่งงานการคำนวณแบบ Discrete Element และงานวิศวกรรมสำหรับงานวิจัยและอุตสาหกรรม',
    },
    features: [
      { en: 'GPU-accelerated computing', th: 'การประมวลผลเร่งด้วย GPU' },
      { en: 'Large-scale numerical simulation', th: 'การจำลองเชิงตัวเลขขนาดใหญ่' },
      { en: 'Discrete Element Method (DEM) acceleration', th: 'การเร่งวิธี Discrete Element (DEM)' },
      { en: 'Parallel & cluster computing', th: 'การประมวลผลแบบขนานและคลัสเตอร์' },
      { en: 'Performance profiling & optimization', th: 'การวิเคราะห์และเพิ่มประสิทธิภาพ' },
      { en: 'Scientific & engineering computing', th: 'การคำนวณทางวิทยาศาสตร์และวิศวกรรม' },
    ],
    useCases: [
      {
        en: { title: 'GPU-accelerated DEM', description: 'GPU acceleration of LMGC90 discrete-element simulation with CMU-RAILCFC.' },
        th: { title: 'DEM เร่งด้วย GPU', description: 'การเร่งการจำลอง Discrete Element ของ LMGC90 ด้วย GPU ร่วมกับ CMU-RAILCFC' },
      },
      {
        en: { title: 'Railway ballast simulation', description: 'Large-scale ballast behaviour modeling underpinning the railway digital twin.' },
        th: { title: 'การจำลองหินโรยทาง', description: 'การสร้างแบบจำลองพฤติกรรมหินโรยทางขนาดใหญ่ เป็นฐานของดิจิทัลทวินทางรถไฟ' },
      },
      {
        en: { title: 'Engineering analysis', description: 'Compute-heavy structural and mechanical analysis for research partners.' },
        th: { title: 'การวิเคราะห์ทางวิศวกรรม', description: 'การวิเคราะห์โครงสร้างและกลศาสตร์ที่ใช้การคำนวณสูงสำหรับพันธมิตรวิจัย' },
      },
      {
        en: { title: 'Simulation acceleration', description: 'Cutting simulation runtimes from days to hours via parallel GPU workloads.' },
        th: { title: 'การเร่งการจำลอง', description: 'ลดเวลาการจำลองจากหลายวันเหลือหลายชั่วโมงด้วยงาน GPU แบบขนาน' },
      },
      {
        en: { title: 'Research computing', description: 'On-demand HPC capacity for university and laboratory research teams.' },
        th: { title: 'การประมวลผลเพื่อการวิจัย', description: 'กำลังประมวลผล HPC ตามต้องการสำหรับทีมวิจัยมหาวิทยาลัยและห้องปฏิบัติการ' },
      },
      {
        en: { title: 'Digital-twin compute', description: 'Compute backbone for 3D digital-twin models of physical infrastructure.' },
        th: { title: 'การประมวลผลดิจิทัลทวิน', description: 'แกนการประมวลผลสำหรับแบบจำลองดิจิทัลทวิน 3 มิติของโครงสร้างพื้นฐาน' },
      },
    ],
    technologies: ['CUDA', 'LMGC90', 'OpenMP', 'MPI', 'C++', 'Python', 'NumPy', 'Linux', 'NVIDIA GPU', 'Slurm', 'OpenMPI', 'ParaView'],
    process: [
      {
        en: { title: 'Workload analysis', description: 'Profile your computational workload to find bottlenecks and parallelism.' },
        th: { title: 'วิเคราะห์ภาระงาน', description: 'วิเคราะห์ภาระการคำนวณเพื่อหาคอขวดและความเป็นไปได้ในการประมวลผลขนาน' },
      },
      {
        en: { title: 'Architecture', description: 'Design compute, GPU, and storage architecture suited to the problem.' },
        th: { title: 'สถาปัตยกรรม', description: 'ออกแบบสถาปัตยกรรมการประมวลผล GPU และจัดเก็บข้อมูลให้เหมาะกับโจทย์' },
      },
      {
        en: { title: 'Acceleration', description: 'Port and optimize code for GPU and parallel execution.' },
        th: { title: 'การเร่งความเร็ว', description: 'พอร์ตและเพิ่มประสิทธิภาพโค้ดสำหรับ GPU และการประมวลผลแบบขนาน' },
      },
      {
        en: { title: 'Validation', description: 'Verify accuracy and benchmark speedups against the baseline.' },
        th: { title: 'การตรวจสอบ', description: 'ตรวจสอบความแม่นยำและวัดประสิทธิภาพที่เพิ่มขึ้นเทียบกับค่าเริ่มต้น' },
      },
    ],
  },
  iot: {
    iconName: 'Server',
    color: 'bg-primary',
    image: '/images/services/iot-systems.jpg',
    title: { en: 'IoT & Automation', th: 'IoT และระบบอัตโนมัติ' },
    description: {
      en: 'Connected devices, sensor networks, and automation platforms that capture real-world data and turn it into real-time monitoring and control.',
      th: 'อุปกรณ์เชื่อมต่อ เครือข่ายเซ็นเซอร์ และแพลตฟอร์มอัตโนมัติที่เก็บข้อมูลจากโลกจริง แล้วเปลี่ยนเป็นการตรวจสอบและควบคุมแบบเรียลไทม์',
    },
    features: [
      { en: 'IoT sensor networks & device integration', th: 'เครือข่ายเซ็นเซอร์ IoT และการเชื่อมต่ออุปกรณ์' },
      { en: 'Real-time monitoring dashboards', th: 'แดชบอร์ดตรวจสอบแบบเรียลไทม์' },
      { en: 'Industrial & facility automation', th: 'ระบบอัตโนมัติสำหรับโรงงานและอาคาร' },
      { en: 'Edge data collection & telemetry', th: 'การเก็บข้อมูลที่ขอบและการส่งข้อมูลทางไกล' },
      { en: 'Digital-twin integration', th: 'การเชื่อมต่อกับดิจิทัลทวิน' },
      { en: 'Alerting & remote control', th: 'การแจ้งเตือนและการควบคุมระยะไกล' },
    ],
    useCases: [
      {
        en: { title: '3D digital-twin railway', description: 'Digital-twin railway ballast monitoring linking physical sensors to a 3D model (CMU-RAILCFC).' },
        th: { title: 'ดิจิทัลทวินทางรถไฟ 3 มิติ', description: 'การตรวจสอบหินโรยทางแบบดิจิทัลทวิน เชื่อมเซ็นเซอร์จริงกับแบบจำลอง 3 มิติ (CMU-RAILCFC)' },
      },
      {
        en: { title: 'Infrastructure monitoring', description: 'Continuous sensing of structural and environmental conditions in the field.' },
        th: { title: 'การตรวจสอบโครงสร้างพื้นฐาน', description: 'การตรวจวัดสภาพโครงสร้างและสิ่งแวดล้อมอย่างต่อเนื่องในภาคสนาม' },
      },
      {
        en: { title: 'Facility automation', description: 'Automate building and facility systems for efficiency and control.' },
        th: { title: 'ระบบอัตโนมัติอาคาร', description: 'ทำให้ระบบอาคารและสิ่งอำนวยความสะดวกเป็นอัตโนมัติเพื่อประสิทธิภาพและการควบคุม' },
      },
      {
        en: { title: 'Real-time telemetry', description: 'Stream sensor data to dashboards for live operational visibility.' },
        th: { title: 'การส่งข้อมูลเรียลไทม์', description: 'ส่งข้อมูลเซ็นเซอร์ไปยังแดชบอร์ดเพื่อมองเห็นการดำเนินงานแบบสด' },
      },
      {
        en: { title: 'Predictive maintenance', description: 'Combine IoT telemetry with ML to flag issues before failures occur.' },
        th: { title: 'การบำรุงรักษาเชิงคาดการณ์', description: 'รวมข้อมูล IoT กับ ML เพื่อแจ้งปัญหาก่อนเกิดความเสียหาย' },
      },
      {
        en: { title: 'Smart operations', description: 'Connect devices and data flows to automate everyday operational decisions.' },
        th: { title: 'การดำเนินงานอัจฉริยะ', description: 'เชื่อมต่ออุปกรณ์และข้อมูลเพื่อทำให้การตัดสินใจเชิงปฏิบัติการเป็นอัตโนมัติ' },
      },
    ],
    technologies: ['MQTT', 'ESP32', 'Raspberry Pi', 'Node.js', 'InfluxDB', 'Grafana', 'PostgreSQL', 'Python', 'WebSocket', 'Modbus', 'Docker', 'Three.js'],
    process: [
      {
        en: { title: 'Define', description: 'Identify what to sense, measure, and control across your environment.' },
        th: { title: 'กำหนดโจทย์', description: 'ระบุสิ่งที่ต้องตรวจวัดและควบคุมในสภาพแวดล้อมของคุณ' },
      },
      {
        en: { title: 'Connect', description: 'Deploy sensors and devices, and integrate them into a unified network.' },
        th: { title: 'เชื่อมต่อ', description: 'ติดตั้งเซ็นเซอร์และอุปกรณ์ และรวมเข้าเป็นเครือข่ายเดียว' },
      },
      {
        en: { title: 'Visualize', description: 'Pipe data into real-time dashboards and alerting.' },
        th: { title: 'แสดงผล', description: 'นำข้อมูลเข้าสู่แดชบอร์ดเรียลไทม์และการแจ้งเตือน' },
      },
      {
        en: { title: 'Automate', description: 'Turn live data into automated rules, controls, and responses.' },
        th: { title: 'ทำให้อัตโนมัติ', description: 'เปลี่ยนข้อมูลสดเป็นกฎ การควบคุม และการตอบสนองอัตโนมัติ' },
      },
    ],
  },
  research: {
    iconName: 'FlaskConical',
    color: 'bg-primary',
    title: { en: 'Advanced Research', th: 'งานวิจัยขั้นสูง' },
    description: {
      en: 'Applied R&D in partnership with universities and industry — turning frontier research in simulation, AI, and digital engineering into working systems.',
      th: 'งานวิจัยและพัฒนาประยุกต์ร่วมกับมหาวิทยาลัยและภาคอุตสาหกรรม เปลี่ยนงานวิจัยล้ำสมัยด้านการจำลอง AI และวิศวกรรมดิจิทัลให้เป็นระบบที่ใช้งานได้จริง',
    },
    features: [
      { en: 'Academic & industry research collaboration', th: 'ความร่วมมือวิจัยกับมหาวิทยาลัยและอุตสาหกรรม' },
      { en: 'Simulation & digital-engineering research', th: 'งานวิจัยด้านการจำลองและวิศวกรรมดิจิทัล' },
      { en: 'Applied AI & data-science research', th: 'งานวิจัยประยุกต์ด้าน AI และวิทยาการข้อมูล' },
      { en: 'Prototype & proof-of-concept development', th: 'การพัฒนาต้นแบบและการพิสูจน์แนวคิด' },
      { en: 'Technology transfer to production', th: 'การถ่ายทอดเทคโนโลยีสู่การใช้งานจริง' },
      { en: 'Grant & research-program support', th: 'การสนับสนุนทุนและโครงการวิจัย' },
    ],
    useCases: [
      {
        en: { title: 'Railway research', description: 'Multi-year digital-twin and simulation research program with CMU-RAILCFC.' },
        th: { title: 'งานวิจัยทางรถไฟ', description: 'โครงการวิจัยดิจิทัลทวินและการจำลองหลายปีร่วมกับ CMU-RAILCFC' },
      },
      {
        en: { title: 'Energy-sector AI', description: 'Slope-stability risk research with EGAT applying AI to real infrastructure.' },
        th: { title: 'AI ภาคพลังงาน', description: 'งานวิจัยความเสี่ยงเสถียรภาพลาดดินกับ กฟผ. ประยุกต์ AI กับโครงสร้างจริง' },
      },
      {
        en: { title: 'University partnerships', description: 'Joint research and platforms with CMU, CMUEAA, CMUAA, and Rajabhat universities.' },
        th: { title: 'ความร่วมมือกับมหาวิทยาลัย', description: 'งานวิจัยและแพลตฟอร์มร่วมกับ มช., CMUEAA, CMUAA และมหาวิทยาลัยราชภัฏ' },
      },
      {
        en: { title: 'Proof of concept', description: 'Validate new methods and technologies before full-scale investment.' },
        th: { title: 'การพิสูจน์แนวคิด', description: 'ทดสอบวิธีและเทคโนโลยีใหม่ก่อนการลงทุนเต็มรูปแบบ' },
      },
      {
        en: { title: 'Technology transfer', description: 'Move research outcomes into production systems with documentation and training.' },
        th: { title: 'การถ่ายทอดเทคโนโลยี', description: 'นำผลงานวิจัยสู่ระบบใช้งานจริงพร้อมเอกสารและการฝึกอบรม' },
      },
      {
        en: { title: 'Analytics research', description: 'Nationwide traffic-accident and railway-quality analytics research.' },
        th: { title: 'งานวิจัยการวิเคราะห์', description: 'งานวิจัยการวิเคราะห์อุบัติเหตุจราจรทั่วประเทศและคุณภาพทางรถไฟ' },
      },
    ],
    technologies: ['Python', 'Jupyter', 'PyTorch', 'CUDA', 'LMGC90', 'NumPy', 'Pandas', 'C++', 'MATLAB', 'Git', 'Docker', 'ParaView'],
    process: [
      {
        en: { title: 'Scoping', description: 'Define research objectives, scope, and success criteria with partners.' },
        th: { title: 'กำหนดขอบเขต', description: 'กำหนดวัตถุประสงค์ ขอบเขต และเกณฑ์ความสำเร็จร่วมกับพันธมิตร' },
      },
      {
        en: { title: 'Experimentation', description: 'Conduct experiments and iterations to validate hypotheses.' },
        th: { title: 'การทดลอง', description: 'ดำเนินการทดลองและทำซ้ำเพื่อตรวจสอบสมมติฐาน' },
      },
      {
        en: { title: 'Prototyping', description: 'Build working prototypes that demonstrate feasibility and value.' },
        th: { title: 'การสร้างต้นแบบ', description: 'สร้างต้นแบบที่ใช้งานได้เพื่อแสดงความเป็นไปได้และคุณค่า' },
      },
      {
        en: { title: 'Transfer', description: 'Move validated outcomes into production with documentation and support.' },
        th: { title: 'การถ่ายทอด', description: 'นำผลลัพธ์ที่ผ่านการตรวจสอบสู่การใช้งานจริงพร้อมเอกสารและการสนับสนุน' },
      },
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(serviceData).flatMap((slug) => [
    { locale: 'en', slug },
    { locale: 'th', slug },
  ])
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params as { locale: Locale; slug: string }
  const service = serviceData[slug]

  if (!service) return { title: 'Service Not Found' }

  return {
    title: locale === 'th' ? service.title.th : service.title.en,
    description: locale === 'th' ? service.description.th : service.description.en,
  }
}

export default async function ServiceDetailPage({ params }: Props): Promise<React.JSX.Element> {
  const { locale, slug } = await params as { locale: Locale; slug: string }

  // Fetch dictionary, service, and hero data in parallel
  const [, strapiServiceResult, heroData] = await Promise.all([
    getDictionary(locale),
    getService(slug, locale).catch(() => null) as Promise<StrapiService | null>,
    getPageHero(`service-${slug}`, locale),
  ])

  const strapiService = strapiServiceResult
  const heroBackground = buildHeroBackground(heroData)

  // Fall back to hardcoded real data if not in Strapi
  const fallbackService = serviceData[slug]

  if (!strapiService && !fallbackService) {
    notFound()
  }

  // Use Strapi data if available, otherwise use real fallback
  let title: string
  let description: string
  let iconName: string
  let color: string
  let features: string[]
  let useCases: { title: string; description: string }[]
  let technologies: string[]
  let processSteps: { title: string; description: string }[]
  let featuredImageUrl: string | undefined

  if (strapiService) {
    // Use Strapi data
    title = strapiService.title
    description = strapiService.description || strapiService.shortDescription || ''
    iconName = strapiService.icon || 'Code'
    color = strapiService.color || 'bg-primary'
    features = strapiService.features?.map(f => f.title) || []
    useCases = strapiService.useCases?.map(uc => ({ title: uc.title, description: uc.description })) || []
    technologies = strapiService.technologies?.map(t => t.name) || []
    processSteps = strapiService.processSteps?.map(ps => ({ title: ps.title, description: ps.description })) || []
    featuredImageUrl = getStrapiImageUrl(strapiService.featuredImage)
  } else {
    // Use real fallback data
    const service = fallbackService!
    title = locale === 'th' ? service.title.th : service.title.en
    description = locale === 'th' ? service.description.th : service.description.en
    iconName = service.iconName
    color = service.color
    features = service.features.map((f) => (locale === 'th' ? f.th : f.en))
    useCases = service.useCases.map((uc) => locale === 'th' ? uc.th : uc.en)
    technologies = service.technologies
    processSteps = service.process.map((p) => locale === 'th' ? p.th : p.en)
    featuredImageUrl = service.image
  }

  const benefits = [
    {
      title: locale === 'th' ? 'ทีมจากงานจริง' : 'Proven in the Field',
      description: locale === 'th'
        ? 'ส่งมอบโครงการจริงให้กับองค์กร มหาวิทยาลัย และหน่วยงานภาครัฐทั้งในไทยและต่างประเทศ'
        : 'Delivered real projects for enterprises, universities, and government bodies in Thailand and abroad.',
    },
    {
      title: locale === 'th' ? 'โซลูชันที่ปรับแต่งได้' : 'Tailored Solutions',
      description: locale === 'th'
        ? 'ออกแบบตามความต้องการเฉพาะของแต่ละองค์กร ไม่ใช่โซลูชันสำเร็จรูป'
        : 'Designed around each organization’s specific needs, not one-size-fits-all.',
    },
    {
      title: locale === 'th' ? 'เป็นเจ้าของได้เต็มที่' : 'You Own It',
      description: locale === 'th'
        ? 'รองรับการติดตั้งแบบอธิปไตยบนเซิร์ฟเวอร์ของคุณเอง เพื่อควบคุมข้อมูลและโครงสร้างพื้นฐาน'
        : 'Sovereign, on-premise options that keep your data and infrastructure under your control.',
    },
  ]

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-base-200 py-4 border-b border-base-300">
        <div className="container-custom">
          <Breadcrumb
            items={[
              { label: locale === 'th' ? 'บริการ' : 'Services', href: `/${locale}/services` },
              { label: title }
            ]}
            locale={locale}
          />
        </div>
      </div>

      <ServiceHero
        iconName={iconName}
        color={color}
        title={title}
        description={description}
        background={heroBackground}
      />

      <FeaturesSection
        title={locale === 'th' ? 'สิ่งที่เรานำเสนอ' : 'What We Offer'}
        features={features}
        imagePlaceholder={locale === 'th' ? 'รูปภาพบริการ' : 'Service Image'}
        imageUrl={featuredImageUrl}
      />

      <UseCasesSection
        title={locale === 'th' ? 'กรณีการใช้งาน' : 'Use Cases'}
        subtitle={locale === 'th'
          ? 'ดูว่าโซลูชันของเราช่วยองค์กรได้อย่างไร'
          : 'See how our work helps organizations succeed'}
        useCases={useCases}
      />

      <TechnologiesSection
        title={locale === 'th' ? 'เทคโนโลยีที่เราใช้' : 'Technologies We Use'}
        technologies={technologies}
      />

      <ProcessSection
        title={locale === 'th' ? 'กระบวนการ' : 'Our Process'}
        subtitle={locale === 'th'
          ? 'วิธีการทำงานที่ได้รับการพิสูจน์แล้วเพื่อผลลัพธ์ที่ดีที่สุด'
          : 'A proven methodology for the best outcomes'}
        steps={processSteps}
      />

      <BenefitsSection
        title={locale === 'th' ? 'ทำไมต้องเลือกเรา' : 'Why Choose Us'}
        benefits={benefits}
      />

      <ServiceCTA
        title={locale === 'th' ? 'พร้อมเริ่มต้นหรือยัง?' : 'Ready to Get Started?'}
        description={
          locale === 'th'
            ? 'ติดต่อเราวันนี้เพื่อพูดคุยเกี่ยวกับความต้องการและรับคำปรึกษา'
            : 'Talk to us about your requirements and get a consultation.'
        }
        contactText={locale === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
        viewAllText={locale === 'th' ? 'ดูบริการทั้งหมด' : 'View All Services'}
        locale={locale}
      />
    </>
  )
}
