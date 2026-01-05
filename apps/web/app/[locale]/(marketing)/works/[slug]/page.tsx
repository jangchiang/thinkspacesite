import { type Locale } from '@/lib/i18n'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Building2, Quote, CheckCircle2, Lightbulb, Target, Rocket } from 'lucide-react'
import type { Metadata } from 'next'
import { getCaseStudy } from '@/lib/strapi'
import { notFound } from 'next/navigation'
import { MarkdownRenderer } from '@/components/markdown-renderer'
import { Breadcrumb } from '@/components/ui/breadcrumb'

type Props = {
  params: Promise<{ locale: Locale; slug: string }>
}

interface StrapiResultItem {
  id: number
  value: string
  label: string
}

interface StrapiWork {
  id: number
  documentId: string
  title: string
  slug: string
  clientName?: string
  industry?: string
  excerpt?: string
  challenge?: string
  solution?: string
  resultValue?: string
  resultLabel?: string
  additionalResults?: StrapiResultItem[]
  technologies?: string[]
  featuredImage?: {
    url: string
    formats?: {
      large?: { url: string }
      medium?: { url: string }
      small?: { url: string }
    }
  }
  clientLogo?: {
    url: string
    formats?: {
      thumbnail?: { url: string }
      small?: { url: string }
    }
  }
}

// Fallback data with additional fields for modern design
const fallbackWorks: Record<string, {
  client: { en: string; th: string }
  industry: { en: string; th: string }
  title: { en: string; th: string }
  excerpt: { en: string; th: string }
  challenge: { en: string; th: string }
  solution: { en: string; th: string }
  resultValue: string
  resultLabel: { en: string; th: string }
  additionalResults?: { value: string; label: { en: string; th: string } }[]
  testimonial?: { quote: { en: string; th: string }; author: string; role: { en: string; th: string } }
  technologies?: string[]
}> = {
  'fintech-cloud-migration': {
    client: { en: 'FinTech Corp', th: 'FinTech Corp' },
    industry: { en: 'Financial Services', th: 'บริการทางการเงิน' },
    title: { en: 'Cloud Migration for FinTech', th: 'การย้ายระบบสู่คลาวด์สำหรับ FinTech' },
    excerpt: {
      en: 'Transforming legacy infrastructure into a scalable, cloud-native platform',
      th: 'การเปลี่ยนแปลงโครงสร้างพื้นฐานเดิมสู่แพลตฟอร์มคลาวด์ที่ยืดหยุ่น'
    },
    challenge: {
      en: 'FinTech Corp faced significant challenges with their legacy systems that couldn\'t support rapid business growth. The aging infrastructure experienced frequent downtime, security vulnerabilities, and maintenance costs that consumed over 40% of their IT budget. They needed a modern solution that could scale with their expanding customer base while maintaining strict financial compliance requirements.',
      th: 'FinTech Corp ประสบปัญหาระบบเก่าที่ไม่สามารถรองรับการเติบโตของธุรกิจที่รวดเร็ว โครงสร้างพื้นฐานเก่ามีการหยุดทำงานบ่อยครั้ง มีช่องโหว่ด้านความปลอดภัย และค่าใช้จ่ายในการดูแลรักษาที่สูงถึง 40% ของงบประมาณ IT พวกเขาต้องการโซลูชันที่ทันสมัยที่สามารถขยายตัวตามฐานลูกค้าที่เพิ่มขึ้น พร้อมรักษามาตรฐานการปฏิบัติตามข้อกำหนดทางการเงิน'
    },
    solution: {
      en: 'We designed and executed a comprehensive cloud migration strategy, moving their entire infrastructure to AWS. Using Kubernetes for container orchestration and Terraform for Infrastructure as Code, we built a resilient, auto-scaling architecture. The migration was completed in phases to ensure zero downtime, with each component thoroughly tested before going live.',
      th: 'เราได้ออกแบบและดำเนินกลยุทธ์การย้ายระบบสู่คลาวด์อย่างครบวงจร โดยย้ายโครงสร้างพื้นฐานทั้งหมดไปยัง AWS ใช้ Kubernetes สำหรับการจัดการ container และ Terraform สำหรับ Infrastructure as Code เราสร้างสถาปัตยกรรมที่ยืดหยุ่นและปรับขนาดได้อัตโนมัติ การย้ายระบบทำแบบเป็นขั้นตอนเพื่อให้มั่นใจว่าไม่มีการหยุดชะงัก'
    },
    resultValue: '60%',
    resultLabel: { en: 'IT Cost Reduction', th: 'ลดค่าใช้จ่าย IT' },
    additionalResults: [
      { value: '99.99%', label: { en: 'Uptime Achieved', th: 'ความพร้อมใช้งาน' } },
      { value: '3x', label: { en: 'Faster Deployment', th: 'การ Deploy เร็วขึ้น' } },
      { value: '0', label: { en: 'Security Incidents', th: 'เหตุการณ์ด้านความปลอดภัย' } },
    ],
    testimonial: {
      quote: {
        en: 'The migration exceeded our expectations. We now have a platform that can grow with us.',
        th: 'การย้ายระบบเกินความคาดหมาย ตอนนี้เรามีแพลตฟอร์มที่สามารถเติบโตไปพร้อมกับเรา'
      },
      author: 'John Smith',
      role: { en: 'CTO, FinTech Corp', th: 'CTO, FinTech Corp' }
    },
    technologies: ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'PostgreSQL'],
  },
  'retail-digital-transformation': {
    client: { en: 'RetailMax', th: 'RetailMax' },
    industry: { en: 'Retail & E-commerce', th: 'ค้าปลีกและอีคอมเมิร์ซ' },
    title: { en: 'Digital Transformation for Retail', th: 'การเปลี่ยนแปลงดิจิทัลสำหรับค้าปลีก' },
    excerpt: {
      en: 'Creating a seamless omnichannel experience that bridges online and offline retail',
      th: 'สร้างประสบการณ์ Omnichannel ที่ไร้รอยต่อระหว่างออนไลน์และออฟไลน์'
    },
    challenge: {
      en: 'RetailMax operated with disconnected systems across their 50+ stores and online platform. Inventory data was often 24 hours outdated, customer profiles were fragmented, and the checkout experience varied dramatically between channels. They were losing customers to competitors with more integrated experiences.',
      th: 'RetailMax ดำเนินงานด้วยระบบที่ไม่เชื่อมต่อกันในกว่า 50 สาขาและแพลตฟอร์มออนไลน์ ข้อมูลสินค้าคงคลังล่าช้า 24 ชั่วโมง ข้อมูลลูกค้ากระจัดกระจาย และประสบการณ์การชำระเงินแตกต่างกันในแต่ละช่องทาง พวกเขาสูญเสียลูกค้าให้กับคู่แข่งที่มีระบบบูรณาการดีกว่า'
    },
    solution: {
      en: 'We developed a unified commerce platform that synchronizes inventory in real-time, provides a 360-degree customer view, and enables features like buy-online-pickup-in-store. The new CRM system uses AI to personalize recommendations and predict customer needs.',
      th: 'เราพัฒนาแพลตฟอร์มการค้าแบบรวมที่ซิงโครไนซ์สินค้าคงคลังแบบเรียลไทม์ ให้มุมมองลูกค้า 360 องศา และเปิดใช้งานฟีเจอร์ซื้อออนไลน์รับที่ร้าน ระบบ CRM ใหม่ใช้ AI เพื่อปรับแต่งคำแนะนำและคาดการณ์ความต้องการของลูกค้า'
    },
    resultValue: '3x',
    resultLabel: { en: 'Online Sales Increase', th: 'เพิ่มยอดขายออนไลน์' },
    additionalResults: [
      { value: '45%', label: { en: 'Customer Retention', th: 'การรักษาลูกค้า' } },
      { value: '2hr', label: { en: 'Inventory Sync Time', th: 'เวลาซิงค์สต็อก' } },
      { value: '28%', label: { en: 'AOV Increase', th: 'มูลค่าคำสั่งซื้อเฉลี่ย' } },
    ],
    technologies: ['React', 'Node.js', 'Redis', 'Elasticsearch', 'AWS'],
  },
  'healthcare-security': {
    client: { en: 'MediCare Plus', th: 'MediCare Plus' },
    industry: { en: 'Healthcare', th: 'การแพทย์และสุขภาพ' },
    title: { en: 'Healthcare Data Security', th: 'ความปลอดภัยข้อมูลสุขภาพ' },
    excerpt: {
      en: 'Building a fortress around sensitive patient data while maintaining seamless access for healthcare providers',
      th: 'สร้างระบบป้องกันข้อมูลผู้ป่วยที่แข็งแกร่ง พร้อมรักษาการเข้าถึงที่ราบรื่นสำหรับผู้ให้บริการทางการแพทย์'
    },
    challenge: {
      en: 'MediCare Plus needed to protect sensitive patient data across 12 hospitals and 200+ clinics while complying with HIPAA and PDPA regulations. Previous security audits had identified vulnerabilities, and the threat of cyberattacks on healthcare organizations was increasing exponentially.',
      th: 'MediCare Plus ต้องปกป้องข้อมูลผู้ป่วยที่ละเอียดอ่อนใน 12 โรงพยาบาลและคลินิกกว่า 200 แห่ง พร้อมปฏิบัติตามข้อกำหนด HIPAA และ PDPA การตรวจสอบความปลอดภัยก่อนหน้านี้พบช่องโหว่ และภัยคุกคามจากการโจมตีทางไซเบอร์ต่อองค์กรด้านสุขภาพเพิ่มขึ้นอย่างทวีคูณ'
    },
    solution: {
      en: 'We implemented a comprehensive security framework including a 24/7 Security Operation Center, end-to-end encryption for all data, Zero Trust Architecture, and advanced threat detection using AI. Regular penetration testing ensures ongoing security posture.',
      th: 'เราได้วางระบบ Security Operation Center (SOC) ที่ทำงาน 24/7 การเข้ารหัสข้อมูลแบบ end-to-end สถาปัตยกรรม Zero Trust และการตรวจจับภัยคุกคามขั้นสูงด้วย AI การทดสอบการเจาะระบบอย่างสม่ำเสมอเพื่อรักษาความปลอดภัย'
    },
    resultValue: '100%',
    resultLabel: { en: 'Compliance Achieved', th: 'ปฏิบัติตามข้อกำหนด' },
    additionalResults: [
      { value: '0', label: { en: 'Data Breaches', th: 'การรั่วไหลของข้อมูล' } },
      { value: '< 5min', label: { en: 'Threat Response', th: 'เวลาตอบสนองภัยคุกคาม' } },
      { value: '99.9%', label: { en: 'Threat Detection Rate', th: 'อัตราการตรวจจับ' } },
    ],
    technologies: ['SIEM', 'Zero Trust', 'Azure Sentinel', 'CrowdStrike', 'Splunk'],
  },
  'manufacturing-iot': {
    client: { en: 'Thai Manufacturing Co.', th: 'Thai Manufacturing Co.' },
    industry: { en: 'Manufacturing', th: 'อุตสาหกรรมการผลิต' },
    title: { en: 'IoT System for Smart Factory', th: 'ระบบ IoT สำหรับโรงงานอัจฉริยะ' },
    excerpt: {
      en: 'Transforming traditional manufacturing into an intelligent, predictive operation',
      th: 'เปลี่ยนการผลิตแบบดั้งเดิมสู่การดำเนินงานอัจฉริยะที่คาดการณ์ได้'
    },
    challenge: {
      en: 'Thai Manufacturing Co. was experiencing unexpected machine downtime averaging 15 hours per month, costing millions in lost production. Maintenance was purely reactive, and there was no visibility into machine health until failures occurred.',
      th: 'Thai Manufacturing Co. ประสบปัญหาเครื่องจักรหยุดทำงานโดยไม่คาดคิดเฉลี่ย 15 ชั่วโมงต่อเดือน สูญเสียเงินหลายล้านบาท การบำรุงรักษาทำแบบตั้งรับ และไม่มีการมองเห็นสุขภาพของเครื่องจักรจนกว่าจะเกิดความเสียหาย'
    },
    solution: {
      en: 'We deployed 500+ IoT sensors across the factory floor, connected to a central analytics platform. Machine learning models analyze vibration, temperature, and power consumption patterns to predict failures 2-3 weeks in advance, enabling planned maintenance.',
      th: 'เราติดตั้งเซ็นเซอร์ IoT กว่า 500 ตัวทั่วโรงงาน เชื่อมต่อกับแพลตฟอร์มวิเคราะห์ข้อมูลส่วนกลาง โมเดล Machine Learning วิเคราะห์รูปแบบการสั่นสะเทือน อุณหภูมิ และการใช้พลังงาน เพื่อทำนายความเสียหายล่วงหน้า 2-3 สัปดาห์'
    },
    resultValue: '45%',
    resultLabel: { en: 'Reduced Downtime', th: 'ลดเวลาหยุดทำงาน' },
    additionalResults: [
      { value: '30%', label: { en: 'Maintenance Cost Savings', th: 'ลดค่าบำรุงรักษา' } },
      { value: '95%', label: { en: 'Prediction Accuracy', th: 'ความแม่นยำการทำนาย' } },
      { value: '12%', label: { en: 'Production Increase', th: 'เพิ่มผลผลิต' } },
    ],
    technologies: ['Azure IoT Hub', 'TensorFlow', 'Time Series DB', 'Grafana', 'Edge Computing'],
  },
  'logistics-ai': {
    client: { en: 'FastShip Logistics', th: 'FastShip Logistics' },
    industry: { en: 'Logistics & Supply Chain', th: 'โลจิสติกส์และซัพพลายเชน' },
    title: { en: 'AI for Route Optimization', th: 'AI สำหรับการจัดเส้นทางขนส่ง' },
    excerpt: {
      en: 'Revolutionizing delivery operations with intelligent route planning and real-time optimization',
      th: 'ปฏิวัติการดำเนินงานจัดส่งด้วยการวางแผนเส้นทางอัจฉริยะและการปรับแต่งแบบเรียลไทม์'
    },
    challenge: {
      en: 'FastShip Logistics managed a fleet of 200+ vehicles making 5,000+ daily deliveries. Manual route planning took hours each morning, often resulting in suboptimal routes. Fuel costs were spiraling, and late deliveries were damaging customer relationships and resulting in penalty fees.',
      th: 'FastShip Logistics บริหารรถขนส่งกว่า 200 คัน จัดส่งกว่า 5,000 รายการต่อวัน การวางแผนเส้นทางด้วยมือใช้เวลาหลายชั่วโมงทุกเช้า มักได้เส้นทางที่ไม่เหมาะสม ค่าเชื้อเพลิงพุ่งสูง และการจัดส่งล่าช้าทำให้สูญเสียความสัมพันธ์กับลูกค้าและถูกปรับ'
    },
    solution: {
      en: 'We developed an AI-powered route optimization platform that considers real-time traffic, weather conditions, delivery time windows, and vehicle capacity. The system generates optimal routes in minutes and dynamically adjusts throughout the day as conditions change.',
      th: 'เราพัฒนาแพลตฟอร์มปรับเส้นทางด้วย AI ที่พิจารณาการจราจรแบบเรียลไทม์ สภาพอากาศ กรอบเวลาจัดส่ง และความจุของยานพาหนะ ระบบสร้างเส้นทางที่เหมาะสมภายในไม่กี่นาที และปรับตัวตลอดทั้งวันตามสถานการณ์ที่เปลี่ยนแปลง'
    },
    resultValue: '30%',
    resultLabel: { en: 'Fuel Cost Reduction', th: 'ลดค่าเชื้อเพลิง' },
    additionalResults: [
      { value: '25%', label: { en: 'More Deliveries/Day', th: 'จัดส่งได้มากขึ้น/วัน' } },
      { value: '98%', label: { en: 'On-Time Delivery', th: 'จัดส่งตรงเวลา' } },
      { value: '< 5min', label: { en: 'Route Planning Time', th: 'เวลาวางแผนเส้นทาง' } },
    ],
    testimonial: {
      quote: {
        en: 'This AI system has transformed our operations. What used to take hours now happens in minutes, and our drivers are happier with smarter routes.',
        th: 'ระบบ AI นี้เปลี่ยนแปลงการดำเนินงานของเราอย่างสิ้นเชิง สิ่งที่เคยใช้เวลาหลายชั่วโมง ตอนนี้เกิดขึ้นในไม่กี่นาที และคนขับของเรามีความสุขกับเส้นทางที่ชาญฉลาดขึ้น'
      },
      author: 'Somchai Thanakorn',
      role: { en: 'Operations Director, FastShip', th: 'ผู้อำนวยการฝ่ายปฏิบัติการ, FastShip' }
    },
    technologies: ['Python', 'TensorFlow', 'Google OR-Tools', 'Real-time APIs', 'React Native'],
  },
}

function getStrapiImageUrl(url: string | undefined): string | undefined {
  if (!url) return undefined
  const baseUrl = process.env.STRAPI_URL || 'http://localhost:1337'
  return `${baseUrl}${url}`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  let title = ''
  let description = ''

  try {
    const work = (await getCaseStudy(slug, locale)) as StrapiWork | null
    if (work) {
      title = work.title
      description = work.excerpt || work.challenge || ''
    }
  } catch {
    const fallback = fallbackWorks[slug]
    if (fallback) {
      title = locale === 'th' ? fallback.title.th : fallback.title.en
      description = locale === 'th' ? fallback.excerpt.th : fallback.excerpt.en
    }
  }

  return {
    title: title || (locale === 'th' ? 'ผลงาน' : 'Work Profile'),
    description: description || (locale === 'th' ? 'รายละเอียดผลงาน' : 'Work details'),
  }
}

export default async function WorkDetailPage({ params }: Props) {
  const { locale, slug } = await params

  let strapiWork: StrapiWork | null = null
  try {
    strapiWork = (await getCaseStudy(slug, locale)) as StrapiWork | null
  } catch (error) {
    console.log('Failed to fetch work from Strapi, using fallback data')
  }

  const fallback = fallbackWorks[slug]
  if (!strapiWork && !fallback) {
    notFound()
  }

  // Build the work data - use Strapi data if available, otherwise fallback
  const work = strapiWork ? {
    title: strapiWork.title,
    client: strapiWork.clientName || '',
    industry: strapiWork.industry || '',
    excerpt: strapiWork.excerpt || '',
    challenge: strapiWork.challenge || '',
    solution: strapiWork.solution || '',
    resultValue: strapiWork.resultValue || '',
    resultLabel: strapiWork.resultLabel || '',
    featuredImage: getStrapiImageUrl(
      strapiWork.featuredImage?.formats?.large?.url ||
      strapiWork.featuredImage?.formats?.medium?.url ||
      strapiWork.featuredImage?.url
    ),
    clientLogo: getStrapiImageUrl(
      strapiWork.clientLogo?.formats?.small?.url ||
      strapiWork.clientLogo?.url
    ),
    // Use Strapi data for additional results and technologies, with fallback as backup
    additionalResults: strapiWork.additionalResults && strapiWork.additionalResults.length > 0
      ? strapiWork.additionalResults.map(r => ({ value: r.value, label: r.label }))
      : fallback?.additionalResults?.map(r => ({
          value: r.value,
          label: locale === 'th' ? r.label.th : r.label.en
        })),
    testimonial: undefined, // Remove testimonial for Strapi data
    technologies: strapiWork.technologies && strapiWork.technologies.length > 0
      ? strapiWork.technologies
      : fallback?.technologies,
  } : {
    title: locale === 'th' ? fallback!.title.th : fallback!.title.en,
    client: locale === 'th' ? fallback!.client.th : fallback!.client.en,
    industry: locale === 'th' ? fallback!.industry.th : fallback!.industry.en,
    excerpt: locale === 'th' ? fallback!.excerpt.th : fallback!.excerpt.en,
    challenge: locale === 'th' ? fallback!.challenge.th : fallback!.challenge.en,
    solution: locale === 'th' ? fallback!.solution.th : fallback!.solution.en,
    resultValue: fallback!.resultValue,
    resultLabel: locale === 'th' ? fallback!.resultLabel.th : fallback!.resultLabel.en,
    featuredImage: undefined,
    clientLogo: undefined,
    additionalResults: fallback!.additionalResults?.map(r => ({
      value: r.value,
      label: locale === 'th' ? r.label.th : r.label.en
    })),
    testimonial: fallback!.testimonial,
    technologies: fallback!.technologies,
  }

  const allResults = [
    { value: work.resultValue, label: work.resultLabel },
    ...(work.additionalResults || [])
  ]

  const journeySteps = [
    {
      icon: Target,
      title: locale === 'th' ? 'ความท้าทาย' : 'Challenge',
      description: locale === 'th' ? 'ระบุปัญหาและความต้องการ' : 'Identify problems and needs'
    },
    {
      icon: Lightbulb,
      title: locale === 'th' ? 'โซลูชัน' : 'Solution',
      description: locale === 'th' ? 'ออกแบบและพัฒนา' : 'Design and develop'
    },
    {
      icon: Rocket,
      title: locale === 'th' ? 'ผลลัพธ์' : 'Results',
      description: locale === 'th' ? 'ส่งมอบคุณค่า' : 'Deliver value'
    },
  ]

  return (
    <>
      {/* Hero Section - Full Width with Gradient */}
      <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary/20 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Featured Image Overlay */}
        {work.featuredImage && (
          <div className="absolute inset-0">
            <Image
              src={work.featuredImage}
              alt={work.title}
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-transparent" />
          </div>
        )}

        <div className="container-custom relative z-10 py-20">
          <Breadcrumb
            items={[
              { label: locale === 'th' ? 'ผลงาน' : 'Works', href: `/${locale}/works` },
              { label: work.title }
            ]}
            locale={locale}
            className="mb-8 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-white/40"
          />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {/* Client Badge */}
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                {work.clientLogo ? (
                  <Image
                    src={work.clientLogo}
                    alt={work.client}
                    width={32}
                    height={32}
                    className="object-contain rounded"
                  />
                ) : (
                  <Building2 className="w-5 h-5 text-primary" />
                )}
                <span className="font-medium">{work.client}</span>
                <span className="text-white/50">•</span>
                <span className="text-white/70">{work.industry}</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {work.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-white/80 max-w-xl">
                {work.excerpt}
              </p>

              {/* Primary Metric */}
              {work.resultValue && (
                <div className="flex items-center gap-4 pt-4">
                  <div className="text-5xl md:text-6xl font-bold text-primary">
                    {work.resultValue}
                  </div>
                  <div className="text-lg text-white/70 max-w-[150px]">
                    {work.resultLabel}
                  </div>
                </div>
              )}
            </div>

            {/* Stats Cards - Floating */}
            {work.additionalResults && work.additionalResults.length > 0 && (
              <div className="hidden lg:grid grid-cols-2 gap-4">
                {allResults.slice(0, 4).map((result, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-colors"
                  >
                    <div className="text-3xl font-bold text-primary mb-1">
                      {result.value}
                    </div>
                    <div className="text-sm text-white/70">
                      {result.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-16 bg-base-100 border-b border-base-200">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {journeySteps.map((step, index) => (
              <div key={index} className="flex items-center gap-4 flex-1">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{step.title}</h3>
                  <p className="text-sm text-base-content/60">{step.description}</p>
                </div>
                {index < journeySteps.length - 1 && (
                  <ArrowRight className="hidden md:block w-6 h-6 text-base-content/30 ml-auto" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Stats (visible on small screens) */}
      {work.additionalResults && work.additionalResults.length > 0 && (
        <section className="lg:hidden py-8 bg-base-200">
          <div className="container-custom">
            <div className="grid grid-cols-2 gap-4">
              {allResults.map((result, index) => (
                <div
                  key={index}
                  className="bg-base-100 rounded-xl p-4 text-center"
                >
                  <div className="text-2xl font-bold text-primary mb-1">
                    {result.value}
                  </div>
                  <div className="text-xs text-base-content/70">
                    {result.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Challenge Section */}
      <section className="py-20 bg-base-100">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-error" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                {locale === 'th' ? 'ความท้าทาย' : 'The Challenge'}
              </h2>
            </div>
            <div className="pl-0 md:pl-16">
              {work.challenge && (
                <MarkdownRenderer content={work.challenge} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-base-200">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                {locale === 'th' ? 'โซลูชันของเรา' : 'Our Solution'}
              </h2>
            </div>
            <div className="pl-0 md:pl-16">
              {work.solution && (
                <div className="mb-8">
                  <MarkdownRenderer content={work.solution} />
                </div>
              )}

              {/* Technologies Used */}
              {work.technologies && work.technologies.length > 0 && (
                <div className="mt-8 pt-8 border-t border-base-300">
                  <h3 className="text-sm font-semibold text-base-content/50 uppercase tracking-wider mb-4">
                    {locale === 'th' ? 'เทคโนโลยีที่ใช้' : 'Technologies Used'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {work.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-base-100 rounded-lg text-sm font-medium border border-base-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-content">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-4">
                <Rocket className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                {locale === 'th' ? 'ผลลัพธ์ที่ได้' : 'The Results'}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allResults.map((result, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
                >
                  <CheckCircle2 className="w-8 h-8 mx-auto mb-3 text-white/80" />
                  <div className="text-4xl font-bold mb-2">{result.value}</div>
                  <div className="text-sm text-primary-content/80">{result.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {work.testimonial && (
        <section className="py-20 bg-base-100">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-base-200 rounded-3xl p-8 md:p-12">
                <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/20" />
                <blockquote className="relative z-10">
                  <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8 pl-8">
                    "{locale === 'th' ? work.testimonial.quote.th : work.testimonial.quote.en}"
                  </p>
                  <footer className="flex items-center gap-4 pl-8">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">
                        {work.testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <cite className="not-italic font-semibold block">
                        {work.testimonial.author}
                      </cite>
                      <span className="text-sm text-base-content/60">
                        {locale === 'th' ? work.testimonial.role.th : work.testimonial.role.en}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {locale === 'th'
                ? 'พร้อมที่จะเริ่มโปรเจกต์ของคุณ?'
                : 'Ready to Start Your Project?'}
            </h2>
            <p className="text-lg text-white/70 mb-8">
              {locale === 'th'
                ? 'ติดต่อเราวันนี้เพื่อพูดคุยว่าเราจะช่วยธุรกิจของคุณได้อย่างไร'
                : 'Contact us today to discuss how we can help your business'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/contact`} className="btn btn-primary btn-lg">
                {locale === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href={`/${locale}/works`} className="btn btn-outline btn-lg text-white border-white/30 hover:bg-white/10 hover:border-white/50">
                {locale === 'th' ? 'ดูผลงานเพิ่มเติม' : 'View More Works'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
