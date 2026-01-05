'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Shield, Clock, Users, Award, Headphones, TrendingUp } from 'lucide-react'
import { type Locale } from '@/lib/i18n'

interface WhyChooseUsSectionProps {
  locale: Locale
}

const features = [
  {
    icon: Shield,
    titleTh: 'ความปลอดภัยระดับองค์กร',
    titleEn: 'Enterprise Security',
    descTh: 'มาตรฐานความปลอดภัยสูงสุดพร้อมการรับรอง ISO 27001',
    descEn: 'Highest security standards with ISO 27001 certification',
  },
  {
    icon: Clock,
    titleTh: 'ส่งมอบตรงเวลา',
    titleEn: 'On-Time Delivery',
    descTh: '99% ของโปรเจกต์ส่งมอบตามกำหนดเวลา',
    descEn: '99% of projects delivered on schedule',
  },
  {
    icon: Users,
    titleTh: 'ทีมผู้เชี่ยวชาญ',
    titleEn: 'Expert Team',
    descTh: 'วิศวกรและที่ปรึกษาที่มีประสบการณ์มากกว่า 15 ปี',
    descEn: 'Engineers and consultants with 15+ years experience',
  },
  {
    icon: Award,
    titleTh: 'พันธมิตรระดับพรีเมียม',
    titleEn: 'Premium Partners',
    descTh: 'พันธมิตรอย่างเป็นทางการของ AWS, Microsoft, Google Cloud',
    descEn: 'Official partners of AWS, Microsoft, Google Cloud',
  },
  {
    icon: Headphones,
    titleTh: 'สนับสนุน 24/7',
    titleEn: '24/7 Support',
    descTh: 'ทีมสนับสนุนพร้อมให้บริการตลอด 24 ชั่วโมง',
    descEn: 'Support team available around the clock',
  },
  {
    icon: TrendingUp,
    titleTh: 'ปรับขนาดได้ยืดหยุ่น',
    titleEn: 'Scalable Solutions',
    descTh: 'โซลูชันที่เติบโตไปพร้อมกับธุรกิจของคุณ',
    descEn: 'Solutions that grow with your business',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

export function WhyChooseUsSection({ locale }: WhyChooseUsSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-base-100" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {locale === 'th' ? 'ทำไมต้องเลือกเรา' : 'Why Choose Us'}
          </h2>
          <p className="text-lg md:text-xl text-base-content/70">
            {locale === 'th'
              ? 'เราพร้อมสนับสนุนการเปลี่ยนแปลงทางดิจิทัลของคุณด้วยทีมผู้เชี่ยวชาญและเทคโนโลยีชั้นนำ'
              : 'We are ready to support your digital transformation with our expert team and leading technology'}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group p-6 rounded-2xl bg-base-200/50 hover:bg-base-200 border border-base-300 hover:border-primary/30 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all duration-300 flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-content transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">
                    {locale === 'th' ? feature.titleTh : feature.titleEn}
                  </h3>
                  <p className="text-base-content/60 text-sm">
                    {locale === 'th' ? feature.descTh : feature.descEn}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
