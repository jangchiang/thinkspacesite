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
  params: Promise<{ locale: Locale; slug: string }>
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

interface ServiceData {
  iconName: string
  key: string
  color: string
  features: { en: string; th: string }[]
  useCases: { en: { title: string; description: string }; th: { title: string; description: string } }[]
  technologies: string[]
  process: { en: { title: string; description: string }; th: { title: string; description: string } }[]
}

const serviceData: Record<string, ServiceData> = {
  cloud: {
    iconName: 'Cloud',
    key: 'cloud',
    color: 'bg-blue-500',
    features: [
      { en: 'Cloud Migration & Strategy', th: 'การย้ายและกลยุทธ์คลาวด์' },
      { en: 'Multi-cloud Management', th: 'การจัดการมัลติคลาวด์' },
      { en: 'Cloud Security & Compliance', th: 'ความปลอดภัยและการปฏิบัติตามข้อกำหนดคลาวด์' },
      { en: 'Cost Optimization & FinOps', th: 'การเพิ่มประสิทธิภาพค่าใช้จ่ายและ FinOps' },
      { en: 'DevOps & CI/CD Automation', th: 'DevOps และระบบอัตโนมัติ CI/CD' },
      { en: 'Kubernetes & Container Orchestration', th: 'Kubernetes และการจัดการ Container' },
    ],
    useCases: [
      {
        en: { title: 'Enterprise Migration', description: 'Migrate legacy systems to cloud with zero downtime and full data integrity' },
        th: { title: 'การย้ายระบบองค์กร', description: 'ย้ายระบบเก่าไปยังคลาวด์โดยไม่มีการหยุดทำงานและรักษาความสมบูรณ์ของข้อมูล' }
      },
      {
        en: { title: 'Hybrid Cloud Setup', description: 'Connect on-premises infrastructure with public cloud for optimal flexibility' },
        th: { title: 'การติดตั้ง Hybrid Cloud', description: 'เชื่อมต่อโครงสร้างพื้นฐานภายในกับคลาวด์สาธารณะเพื่อความยืดหยุ่นสูงสุด' }
      },
      {
        en: { title: 'Disaster Recovery', description: 'Implement robust backup and recovery solutions across multiple regions' },
        th: { title: 'การกู้คืนระบบ', description: 'ติดตั้งโซลูชันสำรองและกู้คืนข้อมูลที่แข็งแกร่งในหลายภูมิภาค' }
      },
      {
        en: { title: 'Auto-scaling Infrastructure', description: 'Dynamic resource allocation based on real-time demand patterns' },
        th: { title: 'โครงสร้างพื้นฐานแบบ Auto-scaling', description: 'การจัดสรรทรัพยากรแบบไดนามิกตามรูปแบบความต้องการแบบเรียลไทม์' }
      },
      {
        en: { title: 'Cloud-Native Development', description: 'Build applications designed specifically for cloud environments' },
        th: { title: 'การพัฒนา Cloud-Native', description: 'สร้างแอปพลิเคชันที่ออกแบบมาสำหรับสภาพแวดล้อมคลาวด์โดยเฉพาะ' }
      },
      {
        en: { title: 'Multi-Cloud Strategy', description: 'Leverage multiple cloud providers to avoid vendor lock-in' },
        th: { title: 'กลยุทธ์ Multi-Cloud', description: 'ใช้ประโยชน์จากผู้ให้บริการคลาวด์หลายรายเพื่อหลีกเลี่ยงการผูกขาด' }
      },
    ],
    technologies: ['AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'Docker', 'Terraform', 'Ansible', 'Jenkins', 'GitLab CI', 'Prometheus', 'Grafana', 'Helm'],
    process: [
      {
        en: { title: 'Assessment & Discovery', description: 'Analyze your current infrastructure, applications, and business requirements to create a tailored cloud strategy.' },
        th: { title: 'การประเมินและค้นหา', description: 'วิเคราะห์โครงสร้างพื้นฐาน แอปพลิเคชัน และความต้องการทางธุรกิจปัจจุบันเพื่อสร้างกลยุทธ์คลาวด์ที่เหมาะสม' }
      },
      {
        en: { title: 'Architecture Design', description: 'Design scalable, secure, and cost-effective cloud architecture aligned with best practices.' },
        th: { title: 'การออกแบบสถาปัตยกรรม', description: 'ออกแบบสถาปัตยกรรมคลาวด์ที่ขยายได้ ปลอดภัย และคุ้มค่าตามแนวปฏิบัติที่ดีที่สุด' }
      },
      {
        en: { title: 'Migration & Implementation', description: 'Execute migration with minimal disruption using proven methodologies and automation tools.' },
        th: { title: 'การย้ายและดำเนินการ', description: 'ดำเนินการย้ายโดยมีการหยุดชะงักน้อยที่สุดโดยใช้วิธีการและเครื่องมืออัตโนมัติที่ได้รับการพิสูจน์แล้ว' }
      },
      {
        en: { title: 'Optimization & Support', description: 'Continuously monitor, optimize costs, and provide 24/7 support for your cloud environment.' },
        th: { title: 'การปรับปรุงและสนับสนุน', description: 'ตรวจสอบอย่างต่อเนื่อง ปรับปรุงค่าใช้จ่าย และให้การสนับสนุน 24/7 สำหรับสภาพแวดล้อมคลาวด์ของคุณ' }
      },
    ],
  },
  software: {
    iconName: 'Code',
    key: 'software',
    color: 'bg-green-500',
    features: [
      { en: 'Custom Software Development', th: 'พัฒนาซอฟต์แวร์ตามความต้องการ' },
      { en: 'SaaS Platform Development', th: 'พัฒนาแพลตฟอร์ม SaaS' },
      { en: 'Web & Mobile Applications', th: 'แอปพลิเคชันเว็บและมือถือ' },
      { en: 'API Development & Integration', th: 'พัฒนาและเชื่อมต่อ API' },
      { en: 'Legacy System Modernization', th: 'ปรับปรุงระบบเก่าให้ทันสมัย' },
      { en: 'Microservices Architecture', th: 'สถาปัตยกรรม Microservices' },
    ],
    useCases: [
      {
        en: { title: 'Enterprise Applications', description: 'Build custom ERP, CRM, and business management systems tailored to your workflow' },
        th: { title: 'แอปพลิเคชันองค์กร', description: 'สร้างระบบ ERP, CRM และระบบจัดการธุรกิจที่ปรับแต่งตามเวิร์กโฟลว์ของคุณ' }
      },
      {
        en: { title: 'E-commerce Platforms', description: 'Develop scalable online stores with payment integration and inventory management' },
        th: { title: 'แพลตฟอร์ม E-commerce', description: 'พัฒนาร้านค้าออนไลน์ที่ขยายได้พร้อมการเชื่อมต่อการชำระเงินและการจัดการสินค้าคงคลัง' }
      },
      {
        en: { title: 'API & Integration', description: 'Design and develop RESTful and GraphQL APIs with seamless third-party integrations' },
        th: { title: 'API และการเชื่อมต่อ', description: 'ออกแบบและพัฒนา RESTful และ GraphQL API พร้อมการเชื่อมต่อกับระบบภายนอกอย่างราบรื่น' }
      },
      {
        en: { title: 'DevOps & Automation', description: 'Implement CI/CD pipelines, infrastructure as code, and automated deployment workflows' },
        th: { title: 'DevOps และระบบอัตโนมัติ', description: 'วาง CI/CD Pipeline, Infrastructure as Code และระบบ Deployment อัตโนมัติ' }
      },
      {
        en: { title: 'Legacy Modernization', description: 'Transform legacy systems to modern architecture with minimal disruption to operations' },
        th: { title: 'ปรับปรุงระบบเก่า', description: 'แปลงระบบเก่าให้เป็นสถาปัตยกรรมสมัยใหม่โดยกระทบการดำเนินงานน้อยที่สุด' }
      },
      {
        en: { title: 'SaaS Products', description: 'Build multi-tenant SaaS platforms with subscription management and analytics' },
        th: { title: 'ผลิตภัณฑ์ SaaS', description: 'สร้างแพลตฟอร์ม SaaS แบบ Multi-tenant พร้อมการจัดการการสมัครสมาชิกและการวิเคราะห์' }
      },
      {
        en: { title: 'System Integration', description: 'Connect disparate systems and automate data flow across your organization' },
        th: { title: 'การเชื่อมต่อระบบ', description: 'เชื่อมต่อระบบที่แตกต่างกันและทำให้การไหลของข้อมูลเป็นอัตโนมัติทั่วทั้งองค์กร' }
      },
      {
        en: { title: 'IoT Solutions', description: 'Develop IoT applications for smart devices, sensors, and real-time monitoring' },
        th: { title: 'โซลูชัน IoT', description: 'พัฒนาแอปพลิเคชัน IoT สำหรับอุปกรณ์อัจฉริยะ เซ็นเซอร์ และการตรวจสอบแบบเรียลไทม์' }
      },
    ],
    technologies: ['React', 'Next.js', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Go', 'Rust', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Terraform', 'GitHub Actions', 'GitLab CI', 'Elasticsearch', 'RabbitMQ', 'Kafka'],
    process: [
      {
        en: { title: 'Requirements Analysis', description: 'Deep dive into your business needs, user stories, and technical requirements to define project scope.' },
        th: { title: 'การวิเคราะห์ความต้องการ', description: 'เจาะลึกความต้องการทางธุรกิจ User Stories และความต้องการทางเทคนิคเพื่อกำหนดขอบเขตโครงการ' }
      },
      {
        en: { title: 'UI/UX Design', description: 'Create intuitive user interfaces and experiences through wireframes, prototypes, and user testing.' },
        th: { title: 'การออกแบบ UI/UX', description: 'สร้าง User Interface และประสบการณ์ที่ใช้งานง่ายผ่าน Wireframes, Prototypes และการทดสอบผู้ใช้' }
      },
      {
        en: { title: 'Agile Development', description: 'Iterative development with regular sprints, demos, and feedback cycles for continuous improvement.' },
        th: { title: 'การพัฒนาแบบ Agile', description: 'การพัฒนาแบบวนซ้ำด้วย Sprints ปกติ การสาธิต และรอบการตอบรับเพื่อการปรับปรุงอย่างต่อเนื่อง' }
      },
      {
        en: { title: 'Testing & QA', description: 'Comprehensive testing including unit, integration, and end-to-end tests to ensure quality.' },
        th: { title: 'การทดสอบและ QA', description: 'การทดสอบที่ครอบคลุมรวมถึง Unit, Integration และ End-to-end Tests เพื่อให้มั่นใจในคุณภาพ' }
      },
      {
        en: { title: 'Deployment & Maintenance', description: 'Smooth deployment with CI/CD pipelines and ongoing maintenance and support.' },
        th: { title: 'การติดตั้งและบำรุงรักษา', description: 'การติดตั้งที่ราบรื่นด้วย CI/CD Pipelines และการบำรุงรักษาและสนับสนุนอย่างต่อเนื่อง' }
      },
    ],
  },
  'hpc-ai': {
    iconName: 'Server',
    key: 'hpc',
    color: 'bg-indigo-500',
    features: [
      { en: 'HPC Infrastructure Design', th: 'ออกแบบโครงสร้าง HPC' },
      { en: 'GPU Cluster Management', th: 'จัดการ GPU Cluster' },
      { en: 'AI/ML Training Infrastructure', th: 'โครงสร้างสำหรับ AI/ML Training' },
      { en: 'Performance Optimization', th: 'เพิ่มประสิทธิภาพระบบ' },
      { en: 'Scientific Computing', th: 'การประมวลผลทางวิทยาศาสตร์' },
      { en: 'Parallel Processing Solutions', th: 'โซลูชันการประมวลผลแบบขนาน' },
    ],
    useCases: [
      {
        en: { title: 'Deep Learning Training', description: 'Scale AI model training across multiple GPUs and nodes for faster iterations' },
        th: { title: 'การฝึก Deep Learning', description: 'ขยายการฝึกโมเดล AI บน GPU และ Nodes หลายตัวเพื่อการทำซ้ำที่เร็วขึ้น' }
      },
      {
        en: { title: 'Scientific Simulations', description: 'Run complex physics, chemistry, and engineering simulations at scale' },
        th: { title: 'การจำลองทางวิทยาศาสตร์', description: 'รันการจำลองฟิสิกส์ เคมี และวิศวกรรมที่ซับซ้อนในระดับใหญ่' }
      },
      {
        en: { title: 'Financial Modeling', description: 'Execute high-frequency trading algorithms and risk analysis computations' },
        th: { title: 'การสร้างแบบจำลองทางการเงิน', description: 'รันอัลกอริทึมการซื้อขายความถี่สูงและการคำนวณวิเคราะห์ความเสี่ยง' }
      },
      {
        en: { title: 'Genomics Research', description: 'Process large-scale genomic data for medical research and drug discovery' },
        th: { title: 'การวิจัยจีโนมิกส์', description: 'ประมวลผลข้อมูลจีโนมขนาดใหญ่สำหรับการวิจัยทางการแพทย์และการค้นพบยา' }
      },
      {
        en: { title: 'Rendering & VFX', description: 'Accelerate 3D rendering and visual effects processing for media production' },
        th: { title: 'การเรนเดอร์และ VFX', description: 'เร่งการเรนเดอร์ 3D และการประมวลผลเอฟเฟกต์ภาพสำหรับการผลิตสื่อ' }
      },
      {
        en: { title: 'Weather Forecasting', description: 'Run complex meteorological models for accurate weather predictions' },
        th: { title: 'การพยากรณ์อากาศ', description: 'รันแบบจำลองอุตุนิยมวิทยาที่ซับซ้อนสำหรับการพยากรณ์อากาศที่แม่นยำ' }
      },
    ],
    technologies: ['NVIDIA DGX', 'CUDA', 'TensorFlow', 'PyTorch', 'Slurm', 'OpenMPI', 'InfiniBand', 'NVLink', 'Singularity', 'Kubernetes', 'NVIDIA Triton', 'Ray'],
    process: [
      {
        en: { title: 'Workload Analysis', description: 'Analyze your computational workloads to determine optimal hardware and software configurations.' },
        th: { title: 'การวิเคราะห์ภาระงาน', description: 'วิเคราะห์ภาระงานการคำนวณของคุณเพื่อกำหนดการกำหนดค่าฮาร์ดแวร์และซอฟต์แวร์ที่เหมาะสม' }
      },
      {
        en: { title: 'Infrastructure Design', description: 'Design HPC architecture with appropriate compute, storage, and networking components.' },
        th: { title: 'การออกแบบโครงสร้างพื้นฐาน', description: 'ออกแบบสถาปัตยกรรม HPC พร้อมส่วนประกอบการประมวลผล การจัดเก็บ และเครือข่ายที่เหมาะสม' }
      },
      {
        en: { title: 'Deployment & Configuration', description: 'Deploy and configure HPC cluster with job schedulers and resource management.' },
        th: { title: 'การติดตั้งและกำหนดค่า', description: 'ติดตั้งและกำหนดค่า HPC Cluster พร้อม Job Schedulers และการจัดการทรัพยากร' }
      },
      {
        en: { title: 'Optimization & Scaling', description: 'Continuously optimize performance and scale resources based on demand.' },
        th: { title: 'การปรับปรุงและขยาย', description: 'ปรับปรุงประสิทธิภาพอย่างต่อเนื่องและขยายทรัพยากรตามความต้องการ' }
      },
    ],
  },
  'ai-datascience': {
    iconName: 'Database',
    key: 'dataAi',
    color: 'bg-purple-500',
    features: [
      { en: 'Data Analytics & Business Intelligence', th: 'การวิเคราะห์ข้อมูลและ Business Intelligence' },
      { en: 'Machine Learning Solutions', th: 'โซลูชัน Machine Learning' },
      { en: 'Data Engineering & Pipelines', th: 'วิศวกรรมข้อมูลและ Pipelines' },
      { en: 'AI Model Development', th: 'การพัฒนาโมเดล AI' },
      { en: 'Predictive Analytics', th: 'การวิเคราะห์เชิงคาดการณ์' },
      { en: 'Natural Language Processing', th: 'การประมวลผลภาษาธรรมชาติ' },
    ],
    useCases: [
      {
        en: { title: 'Customer Analytics', description: 'Understand customer behavior, predict churn, and personalize experiences' },
        th: { title: 'การวิเคราะห์ลูกค้า', description: 'เข้าใจพฤติกรรมลูกค้า ทำนายการเลิกใช้บริการ และปรับแต่งประสบการณ์' }
      },
      {
        en: { title: 'Demand Forecasting', description: 'Predict future demand for inventory optimization and resource planning' },
        th: { title: 'การพยากรณ์ความต้องการ', description: 'ทำนายความต้องการในอนาคตสำหรับการปรับปรุงสินค้าคงคลังและการวางแผนทรัพยากร' }
      },
      {
        en: { title: 'Fraud Detection', description: 'Identify fraudulent transactions and anomalies in real-time' },
        th: { title: 'การตรวจจับการฉ้อโกง', description: 'ระบุธุรกรรมที่ผิดปกติและความผิดปกติแบบเรียลไทม์' }
      },
      {
        en: { title: 'Recommendation Systems', description: 'Build personalized recommendation engines for products and content' },
        th: { title: 'ระบบแนะนำ', description: 'สร้างเครื่องมือแนะนำส่วนบุคคลสำหรับผลิตภัณฑ์และเนื้อหา' }
      },
      {
        en: { title: 'Process Automation', description: 'Automate document processing, data extraction, and workflow optimization' },
        th: { title: 'ระบบอัตโนมัติ', description: 'ทำให้การประมวลผลเอกสาร การดึงข้อมูล และการปรับปรุงเวิร์กโฟลว์เป็นอัตโนมัติ' }
      },
      {
        en: { title: 'Chatbots & Virtual Assistants', description: 'Deploy AI-powered conversational interfaces for customer support' },
        th: { title: 'Chatbots และผู้ช่วยเสมือน', description: 'ติดตั้งอินเทอร์เฟซการสนทนาที่ขับเคลื่อนด้วย AI สำหรับการสนับสนุนลูกค้า' }
      },
    ],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Apache Spark', 'Airflow', 'dbt', 'Snowflake', 'Databricks', 'Power BI', 'Tableau', 'LangChain'],
    process: [
      {
        en: { title: 'Data Assessment', description: 'Evaluate your data sources, quality, and availability to identify opportunities.' },
        th: { title: 'การประเมินข้อมูล', description: 'ประเมินแหล่งข้อมูล คุณภาพ และความพร้อมใช้งานเพื่อระบุโอกาส' }
      },
      {
        en: { title: 'Data Engineering', description: 'Build robust data pipelines to collect, transform, and store data efficiently.' },
        th: { title: 'วิศวกรรมข้อมูล', description: 'สร้าง Data Pipelines ที่แข็งแกร่งเพื่อรวบรวม แปลง และจัดเก็บข้อมูลอย่างมีประสิทธิภาพ' }
      },
      {
        en: { title: 'Model Development', description: 'Develop and train ML models using best practices and rigorous validation.' },
        th: { title: 'การพัฒนาโมเดล', description: 'พัฒนาและฝึกโมเดล ML โดยใช้แนวปฏิบัติที่ดีที่สุดและการตรวจสอบอย่างเข้มงวด' }
      },
      {
        en: { title: 'Deployment & MLOps', description: 'Deploy models to production with monitoring, versioning, and automated retraining.' },
        th: { title: 'การติดตั้งและ MLOps', description: 'ติดตั้งโมเดลสู่ Production พร้อมการตรวจสอบ การควบคุมเวอร์ชัน และการฝึกใหม่อัตโนมัติ' }
      },
    ],
  },
  cybersecurity: {
    iconName: 'Shield',
    key: 'security',
    color: 'bg-red-500',
    features: [
      { en: 'Security Assessment & Penetration Testing', th: 'การประเมินความปลอดภัยและ Penetration Testing' },
      { en: 'Threat Detection & Response (SOC)', th: 'การตรวจจับและตอบสนองภัยคุกคาม (SOC)' },
      { en: 'Identity & Access Management', th: 'การจัดการตัวตนและสิทธิ์การเข้าถึง' },
      { en: 'Compliance & Governance', th: 'การปฏิบัติตามข้อกำหนดและธรรมาภิบาล' },
      { en: 'Security Awareness Training', th: 'การฝึกอบรมความตระหนักด้านความปลอดภัย' },
      { en: 'Incident Response & Forensics', th: 'การตอบสนองเหตุการณ์และนิติวิทยาศาสตร์' },
    ],
    useCases: [
      {
        en: { title: 'Security Operations Center', description: '24/7 monitoring and rapid response to security threats and incidents' },
        th: { title: 'ศูนย์ปฏิบัติการความปลอดภัย', description: 'การตรวจสอบ 24/7 และการตอบสนองอย่างรวดเร็วต่อภัยคุกคามและเหตุการณ์ด้านความปลอดภัย' }
      },
      {
        en: { title: 'Zero Trust Implementation', description: 'Design and implement zero trust architecture for modern security posture' },
        th: { title: 'การติดตั้ง Zero Trust', description: 'ออกแบบและติดตั้งสถาปัตยกรรม Zero Trust สำหรับท่าทีความปลอดภัยสมัยใหม่' }
      },
      {
        en: { title: 'Compliance Readiness', description: 'Achieve ISO 27001, SOC 2, PDPA, and other regulatory compliance' },
        th: { title: 'ความพร้อมด้านการปฏิบัติตาม', description: 'บรรลุ ISO 27001, SOC 2, PDPA และการปฏิบัติตามกฎระเบียบอื่นๆ' }
      },
      {
        en: { title: 'Cloud Security', description: 'Secure your cloud infrastructure with CSPM, CWPP, and security automation' },
        th: { title: 'ความปลอดภัยคลาวด์', description: 'รักษาความปลอดภัยโครงสร้างพื้นฐานคลาวด์ของคุณด้วย CSPM, CWPP และระบบอัตโนมัติด้านความปลอดภัย' }
      },
      {
        en: { title: 'Application Security', description: 'Integrate security into development lifecycle with DevSecOps practices' },
        th: { title: 'ความปลอดภัยแอปพลิเคชัน', description: 'รวมความปลอดภัยเข้ากับวงจรการพัฒนาด้วยแนวปฏิบัติ DevSecOps' }
      },
      {
        en: { title: 'Data Protection', description: 'Implement encryption, DLP, and data classification for sensitive information' },
        th: { title: 'การปกป้องข้อมูล', description: 'ติดตั้งการเข้ารหัส DLP และการจัดประเภทข้อมูลสำหรับข้อมูลที่ละเอียดอ่อน' }
      },
    ],
    technologies: ['CrowdStrike', 'Splunk', 'Microsoft Sentinel', 'Palo Alto', 'Fortinet', 'Okta', 'HashiCorp Vault', 'Tenable', 'Qualys', 'Wiz', 'Snyk', 'SentinelOne'],
    process: [
      {
        en: { title: 'Security Assessment', description: 'Comprehensive evaluation of your current security posture and vulnerabilities.' },
        th: { title: 'การประเมินความปลอดภัย', description: 'การประเมินท่าทีความปลอดภัยปัจจุบันและช่องโหว่ของคุณอย่างครอบคลุม' }
      },
      {
        en: { title: 'Strategy & Roadmap', description: 'Develop a prioritized security roadmap aligned with business objectives.' },
        th: { title: 'กลยุทธ์และแผนงาน', description: 'พัฒนาแผนงานความปลอดภัยที่จัดลำดับความสำคัญตามวัตถุประสงค์ทางธุรกิจ' }
      },
      {
        en: { title: 'Implementation', description: 'Deploy security controls, tools, and processes with minimal disruption.' },
        th: { title: 'การดำเนินการ', description: 'ติดตั้งการควบคุมความปลอดภัย เครื่องมือ และกระบวนการโดยมีการหยุดชะงักน้อยที่สุด' }
      },
      {
        en: { title: 'Continuous Monitoring', description: 'Ongoing monitoring, threat hunting, and security operations support.' },
        th: { title: 'การตรวจสอบอย่างต่อเนื่อง', description: 'การตรวจสอบอย่างต่อเนื่อง การล่าภัยคุกคาม และการสนับสนุนการดำเนินงานด้านความปลอดภัย' }
      },
    ],
  },
  consulting: {
    iconName: 'BarChart',
    key: 'consulting',
    color: 'bg-orange-500',
    features: [
      { en: 'Digital Transformation Strategy', th: 'กลยุทธ์การเปลี่ยนแปลงดิจิทัล' },
      { en: 'IT Strategy & Planning', th: 'กลยุทธ์และการวางแผน IT' },
      { en: 'Business Process Optimization', th: 'การเพิ่มประสิทธิภาพกระบวนการธุรกิจ' },
      { en: 'Technology Assessment', th: 'การประเมินเทคโนโลยี' },
      { en: 'Change Management', th: 'การจัดการการเปลี่ยนแปลง' },
      { en: 'Vendor Selection & Management', th: 'การคัดเลือกและจัดการผู้ขาย' },
    ],
    useCases: [
      {
        en: { title: 'Digital Roadmap', description: 'Create a comprehensive digital transformation roadmap with clear milestones' },
        th: { title: 'แผนงานดิจิทัล', description: 'สร้างแผนงานการเปลี่ยนแปลงดิจิทัลที่ครอบคลุมพร้อมเป้าหมายที่ชัดเจน' }
      },
      {
        en: { title: 'Technology Selection', description: 'Evaluate and select the right technologies for your business needs' },
        th: { title: 'การคัดเลือกเทคโนโลยี', description: 'ประเมินและเลือกเทคโนโลยีที่เหมาะสมกับความต้องการทางธุรกิจของคุณ' }
      },
      {
        en: { title: 'IT Governance', description: 'Establish IT governance frameworks and best practices' },
        th: { title: 'ธรรมาภิบาล IT', description: 'สร้างกรอบการกำกับดูแล IT และแนวปฏิบัติที่ดีที่สุด' }
      },
      {
        en: { title: 'Process Automation', description: 'Identify and implement automation opportunities across the organization' },
        th: { title: 'ระบบอัตโนมัติ', description: 'ระบุและดำเนินการโอกาสในการทำระบบอัตโนมัติทั่วทั้งองค์กร' }
      },
      {
        en: { title: 'Cost Optimization', description: 'Analyze IT spending and identify opportunities for cost reduction' },
        th: { title: 'การปรับปรุงค่าใช้จ่าย', description: 'วิเคราะห์การใช้จ่าย IT และระบุโอกาสในการลดค่าใช้จ่าย' }
      },
      {
        en: { title: 'Organizational Change', description: 'Guide organizational change with training and communication strategies' },
        th: { title: 'การเปลี่ยนแปลงองค์กร', description: 'นำทางการเปลี่ยนแปลงองค์กรด้วยกลยุทธ์การฝึกอบรมและการสื่อสาร' }
      },
    ],
    technologies: ['TOGAF', 'ITIL', 'Agile', 'SAFe', 'Design Thinking', 'Lean Six Sigma', 'COBIT', 'Prince2', 'Jira', 'Confluence', 'Miro', 'Power Platform'],
    process: [
      {
        en: { title: 'Discovery Workshop', description: 'Understand your business goals, challenges, and current state through facilitated sessions.' },
        th: { title: 'เวิร์คช็อปค้นพบ', description: 'เข้าใจเป้าหมายทางธุรกิจ ความท้าทาย และสถานะปัจจุบันผ่านเซสชันที่อำนวยความสะดวก' }
      },
      {
        en: { title: 'Analysis & Recommendations', description: 'Analyze findings and develop actionable recommendations with clear ROI.' },
        th: { title: 'การวิเคราะห์และข้อเสนอแนะ', description: 'วิเคราะห์ผลการค้นพบและพัฒนาข้อเสนอแนะที่นำไปปฏิบัติได้พร้อม ROI ที่ชัดเจน' }
      },
      {
        en: { title: 'Roadmap Development', description: 'Create a prioritized implementation roadmap with timelines and resources.' },
        th: { title: 'การพัฒนาแผนงาน', description: 'สร้างแผนงานการดำเนินการที่จัดลำดับความสำคัญพร้อมกรอบเวลาและทรัพยากร' }
      },
      {
        en: { title: 'Implementation Support', description: 'Provide guidance and support throughout the implementation journey.' },
        th: { title: 'การสนับสนุนการดำเนินการ', description: 'ให้คำแนะนำและการสนับสนุนตลอดการเดินทางการดำเนินการ' }
      },
    ],
  },
  research: {
    iconName: 'FlaskConical',
    key: 'research',
    color: 'bg-teal-500',
    features: [
      { en: 'Academic Research Collaboration', th: 'ความร่วมมือวิจัยเชิงวิชาการ' },
      { en: 'Enterprise R&D Projects', th: 'โครงการวิจัยและพัฒนาสำหรับองค์กร' },
      { en: 'Prototype & MVP Development', th: 'พัฒนาต้นแบบและ MVP' },
      { en: 'Technology Transfer', th: 'การถ่ายทอดเทคโนโลยี' },
      { en: 'Innovation Workshops', th: 'เวิร์คช็อปนวัตกรรม' },
      { en: 'Patent & IP Strategy', th: 'กลยุทธ์สิทธิบัตรและทรัพย์สินทางปัญญา' },
    ],
    useCases: [
      {
        en: { title: 'Joint Research Projects', description: 'Collaborate with universities on cutting-edge technology research' },
        th: { title: 'โครงการวิจัยร่วม', description: 'ร่วมมือกับมหาวิทยาลัยในการวิจัยเทคโนโลยีล้ำสมัย' }
      },
      {
        en: { title: 'Proof of Concept', description: 'Validate new ideas and technologies before full-scale investment' },
        th: { title: 'การพิสูจน์แนวคิด', description: 'ตรวจสอบแนวคิดและเทคโนโลยีใหม่ก่อนการลงทุนเต็มรูปแบบ' }
      },
      {
        en: { title: 'Innovation Lab', description: 'Set up dedicated innovation labs for continuous experimentation' },
        th: { title: 'ห้องปฏิบัติการนวัตกรรม', description: 'ตั้งห้องปฏิบัติการนวัตกรรมเฉพาะสำหรับการทดลองอย่างต่อเนื่อง' }
      },
      {
        en: { title: 'Technology Scouting', description: 'Identify emerging technologies relevant to your industry' },
        th: { title: 'การสำรวจเทคโนโลยี', description: 'ระบุเทคโนโลยีใหม่ที่เกี่ยวข้องกับอุตสาหกรรมของคุณ' }
      },
      {
        en: { title: 'Startup Incubation', description: 'Support internal startups and spin-off initiatives' },
        th: { title: 'การบ่มเพาะ Startup', description: 'สนับสนุน Startup ภายในและโครงการ Spin-off' }
      },
      {
        en: { title: 'Grant Applications', description: 'Assist with government and research grant applications' },
        th: { title: 'การขอทุน', description: 'ช่วยเหลือในการขอทุนวิจัยจากรัฐบาลและหน่วยงานวิจัย' }
      },
    ],
    technologies: ['Python', 'Jupyter', 'TensorFlow', 'PyTorch', 'MATLAB', 'R', 'Git', 'Docker', 'AWS SageMaker', 'Weights & Biases', 'MLflow', 'DVC'],
    process: [
      {
        en: { title: 'Ideation & Scoping', description: 'Define research objectives, scope, and success criteria through collaborative workshops.' },
        th: { title: 'การคิดไอเดียและกำหนดขอบเขต', description: 'กำหนดวัตถุประสงค์การวิจัย ขอบเขต และเกณฑ์ความสำเร็จผ่านเวิร์คช็อปร่วม' }
      },
      {
        en: { title: 'Research & Experimentation', description: 'Conduct research, experiments, and iterations to validate hypotheses.' },
        th: { title: 'การวิจัยและทดลอง', description: 'ดำเนินการวิจัย การทดลอง และการทำซ้ำเพื่อตรวจสอบสมมติฐาน' }
      },
      {
        en: { title: 'Prototype Development', description: 'Build functional prototypes to demonstrate feasibility and value.' },
        th: { title: 'การพัฒนาต้นแบบ', description: 'สร้างต้นแบบที่ใช้งานได้เพื่อแสดงความเป็นไปได้และคุณค่า' }
      },
      {
        en: { title: 'Technology Transfer', description: 'Transfer research outcomes to production with documentation and training.' },
        th: { title: 'การถ่ายทอดเทคโนโลยี', description: 'ถ่ายทอดผลลัพธ์การวิจัยไปสู่ Production พร้อมเอกสารและการฝึกอบรม' }
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
  const { locale, slug } = await params
  const service = serviceData[slug]

  if (!service) return { title: 'Service Not Found' }

  const dict = await getDictionary(locale)
  const title = dict.services?.[service.key]?.title || slug

  return {
    title,
    description: dict.services?.[service.key]?.description || '',
  }
}

export default async function ServiceDetailPage({ params }: Props): Promise<React.JSX.Element> {
  const { locale, slug } = await params

  // Fetch dictionary, service, and hero data in parallel
  const [dict, strapiServiceResult, heroData] = await Promise.all([
    getDictionary(locale),
    getService(slug, locale).catch(() => null) as Promise<StrapiService | null>,
    getPageHero(`service-${slug}`, locale),
  ])

  const strapiService = strapiServiceResult
  const heroBackground = buildHeroBackground(heroData)

  // Fall back to hardcoded data if not in Strapi
  const fallbackService = serviceData[slug]

  if (!strapiService && !fallbackService) {
    notFound()
  }

  // Use Strapi data if available, otherwise use fallback
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
    // Use fallback hardcoded data
    const service = fallbackService!
    title = dict.services?.[service.key]?.title || slug
    description = dict.services?.[service.key]?.description || ''
    iconName = service.iconName
    color = service.color
    features = service.features.map((f) => (locale === 'th' ? f.th : f.en))
    useCases = service.useCases.map((uc) => locale === 'th' ? uc.th : uc.en)
    technologies = service.technologies
    processSteps = service.process.map((p) => locale === 'th' ? p.th : p.en)
  }

  const benefits = [
    {
      title: locale === 'th' ? 'ทีมผู้เชี่ยวชาญ' : 'Expert Team',
      description: locale === 'th'
        ? 'ทีมวิศวกรที่มีประสบการณ์และได้รับการรับรองจากผู้ให้บริการชั้นนำ'
        : 'Experienced engineers certified by leading technology providers',
    },
    {
      title: locale === 'th' ? 'โซลูชันที่ปรับแต่งได้' : 'Tailored Solutions',
      description: locale === 'th'
        ? 'ออกแบบตามความต้องการเฉพาะของธุรกิจคุณ ไม่ใช่โซลูชันสำเร็จรูป'
        : 'Designed for your specific business needs, not one-size-fits-all',
    },
    {
      title: locale === 'th' ? 'สนับสนุน 24/7' : '24/7 Support',
      description: locale === 'th'
        ? 'ทีมสนับสนุนพร้อมให้บริการตลอดเวลาด้วย SLA ที่รับประกัน'
        : 'Support team available around the clock with guaranteed SLAs',
    },
  ]

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-base-200 py-4">
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
          ? 'ดูว่าโซลูชันของเราช่วยธุรกิจได้อย่างไร'
          : 'See how our solutions help businesses succeed'}
        useCases={useCases}
      />

      <TechnologiesSection
        title={locale === 'th' ? 'เทคโนโลยีที่เราใช้' : 'Technologies We Use'}
        technologies={technologies}
      />

      <ProcessSection
        title={locale === 'th' ? 'กระบวนการทำงานของเรา' : 'Our Process'}
        subtitle={locale === 'th'
          ? 'วิธีการทำงานที่ได้รับการพิสูจน์แล้วเพื่อผลลัพธ์ที่ดีที่สุด'
          : 'Proven methodology for the best outcomes'}
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
            ? 'ติดต่อเราวันนี้เพื่อรับคำปรึกษาฟรีและพูดคุยเกี่ยวกับความต้องการของคุณ'
            : 'Contact us today for a free consultation and discuss your requirements'
        }
        contactText={locale === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
        viewAllText={locale === 'th' ? 'ดูบริการทั้งหมด' : 'View All Services'}
        locale={locale}
      />
    </>
  )
}
