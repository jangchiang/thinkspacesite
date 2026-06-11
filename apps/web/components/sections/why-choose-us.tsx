'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Shield, Clock, Users, Award, Headphones, TrendingUp, CheckCircle, Zap, Target, Heart, LucideIcon } from 'lucide-react'
import { type Locale } from '@/lib/i18n'

// Icon mapping for Strapi data
const iconMap: Record<string, LucideIcon> = {
  Shield,
  Clock,
  Users,
  Award,
  Headphones,
  TrendingUp,
  CheckCircle,
  Zap,
  Target,
  Heart,
}

interface FeatureItem {
  icon: string
  title: string
  description?: string
}

interface WhyChooseUsData {
  title?: string
  subtitle?: string
  features?: FeatureItem[]
  isVisible?: boolean
}

interface WhyChooseUsSectionProps {
  locale: Locale
  data?: WhyChooseUsData | null
}

// Default features as fallback — real ThinkSpace positioning
const defaultFeatures = [
  {
    icon: Target,
    titleTh: 'วิศวกรรมดิจิทัลเชิงลึก',
    titleEn: 'Deep Digital Engineering',
    descTh: 'รวมงานวิจัย AI การจำลองเชิงคำนวณ และวิศวกรรมซอฟต์แวร์เข้าด้วยกัน',
    descEn: 'AI research, computational simulation, and software engineering under one roof',
  },
  {
    icon: Users,
    titleTh: 'ทีมระดับมหาวิทยาลัย',
    titleEn: 'Research-Grade Team',
    descTh: 'ทีมผู้ก่อตั้งจากภาควิชาวิศวกรรมและงานวิจัยของมหาวิทยาลัยเชียงใหม่',
    descEn: 'Founders rooted in Chiang Mai University engineering and research',
  },
  {
    icon: Shield,
    titleTh: 'อธิปไตยทางข้อมูล',
    titleEn: 'Data Sovereignty',
    descTh: 'รองรับการติดตั้งแบบ On-Premise ให้องค์กรเป็นเจ้าของข้อมูลและโครงสร้างพื้นฐานเอง',
    descEn: 'On-premise deployments so you own your data and infrastructure',
  },
  {
    icon: Zap,
    titleTh: 'แพลตฟอร์ม AI ของเราเอง',
    titleEn: 'Our Own AI Platform',
    descTh: 'ขับเคลื่อนด้วย Logix แพลตฟอร์ม AI แบบ agentic ที่พัฒนาภายใน',
    descEn: 'Powered by Logix, our in-house agentic AI platform',
  },
  {
    icon: Award,
    titleTh: 'พันธมิตรเทคโนโลยีที่ได้รับการรับรอง',
    titleEn: 'Authorized Technology Partners',
    descTh: 'Authorized Reseller ของ Proxmox พร้อมพันธมิตร Dell และ Google Cloud',
    descEn: 'Proxmox Authorized Reseller, with Dell and Google Cloud partnerships',
  },
  {
    icon: TrendingUp,
    titleTh: 'ส่งมอบจริง พิสูจน์ได้',
    titleEn: 'Proven Delivery',
    descTh: 'ส่งมอบโครงการให้องค์กร ภาครัฐ และมหาวิทยาลัยทั้งในและต่างประเทศ',
    descEn: 'Delivered for enterprises, government, and universities across borders',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

export function WhyChooseUsSection({ locale, data }: WhyChooseUsSectionProps): React.JSX.Element | null {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const isTh = locale === 'th'

  // Check if section should be hidden
  if (data?.isVisible === false) {
    return null
  }

  // Use Strapi data if available, otherwise fallback to defaults
  const hasStapiFeatures = data?.features && data.features.length > 0
  const sectionTitle = data?.title || (isTh ? 'ทำไมต้องเลือก ThinkSpace' : 'Why ThinkSpace')
  const sectionSubtitle = data?.subtitle || (isTh
    ? 'เราผสานงานวิจัย วิศวกรรม และเทคโนโลยี AI เข้าด้วยกัน เพื่อสร้างโซลูชันที่องค์กรเป็นเจ้าของได้อย่างแท้จริง'
    : 'We combine research, engineering, and AI to build solutions your organization can truly own.')

  return (
    <section className="section-padding bg-base-100" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="max-w-3xl mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-3">{isTh ? 'จุดเด่นของเรา' : 'Our Difference'}</p>
          <h2 className="display-heading text-3xl md:text-4xl lg:text-5xl mb-5">
            {sectionTitle}
          </h2>
          <div className="rule-accent mb-6" />
          <p className="text-lg text-base-content/70 leading-relaxed">
            {sectionSubtitle}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {hasStapiFeatures ? (
            // Render Strapi features
            data.features!.map((feature, index) => {
              const IconComponent = iconMap[feature.icon] || Shield
              return (
                <motion.div
                  key={index}
                  className="card-surface p-7"
                  variants={itemVariants}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary mb-5">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-base-content mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-base-content/70 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })
          ) : (
            // Render default features
            defaultFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="card-surface p-7"
                variants={itemVariants}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary mb-5">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-base-content mb-2">
                  {isTh ? feature.titleTh : feature.titleEn}
                </h3>
                <p className="text-base-content/70 text-sm leading-relaxed">
                  {isTh ? feature.descTh : feature.descEn}
                </p>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  )
}
