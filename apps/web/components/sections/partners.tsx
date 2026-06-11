'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PartnerLogo } from '@/components/ui/partner-logo'

interface PartnersBandProps {
  locale: 'en' | 'th'
  strapiUrl?: string
}

interface Client {
  name: string
  src?: string
}

// Real client logos extracted from the company profile (transparent PNGs).
// Clients without a clean mark fall back to a text wordmark.
const CLIENTS: Client[] = [
  { name: 'Chiang Mai University', src: '/images/partners/clients/cmu.png' },
  { name: 'CMU-RAILCFC', src: '/images/partners/clients/cmu-railcfc.png' },
  { name: 'CMU Alumni Association', src: '/images/partners/clients/cmu-alumni.png' },
  { name: 'CMU Engineering Alumni', src: '/images/partners/clients/cmueaa.png' },
  { name: 'EGAT' },
  { name: 'GETHÁ', src: '/images/partners/clients/getha.png' },
  { name: 'Bedding Houz', src: '/images/partners/clients/bedding-houz.png' },
  { name: 'Suppaisan Goldsmith', src: '/images/partners/clients/suppaisan.png' },
  { name: 'CCINNOMA', src: '/images/partners/clients/ccinnoma.png' },
  { name: 'Silver Temple Foundation', src: '/images/partners/clients/silver-temple.png' },
  { name: 'Hidden Cafe', src: '/images/partners/clients/hidden-cafe.png' },
  { name: 'Songkhla Rajabhat University', src: '/images/partners/clients/songkhla-rajabhat.png' },
  { name: 'Nana Digital' },
  { name: 'Wanawat Hardware' },
]

interface TechPartner {
  name: string
  src?: string
  roleEn: string
  roleTh: string
}

const TECH_PARTNERS: TechPartner[] = [
  {
    name: 'Proxmox',
    src: '/images/partners/proxmox-reseller.png',
    roleEn: 'Authorized Reseller',
    roleTh: 'ตัวแทนจำหน่ายอย่างเป็นทางการ',
  },
  {
    name: 'Dell',
    src: '/images/partners/dell.svg',
    roleEn: 'Technology Partner',
    roleTh: 'พันธมิตรเทคโนโลยี',
  },
  {
    name: 'Google Cloud',
    src: '/images/partners/google-cloud.svg',
    roleEn: 'Cloud Partner',
    roleTh: 'พันธมิตรคลาวด์',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

export function PartnersBand({ locale }: PartnersBandProps): React.JSX.Element {
  const isTh = locale === 'th'
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding bg-base-200" ref={ref}>
      <div className="container-custom">
        {/* Band A — Clients / Trusted by */}
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
        >
          <p className="eyebrow">{isTh ? 'ลูกค้าของเรา' : 'Our Clients'}</p>
          <h2 className="display-heading text-2xl md:text-3xl lg:text-4xl mt-3">
            {isTh ? 'ได้รับความไว้วางใจจากองค์กรชั้นนำ' : 'Trusted by leading organizations'}
          </h2>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-box border border-base-300 bg-base-300 sm:grid-cols-3 lg:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {CLIENTS.map((client) => (
            <div
              key={client.name}
              className="flex h-24 items-center justify-center bg-white px-6 py-6 text-center"
            >
              <PartnerLogo
                name={client.name}
                src={client.src}
                className={
                  client.src
                    ? 'opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0'
                    : 'text-sm md:text-base font-semibold text-slate-500 transition-colors duration-300 hover:text-slate-800'
                }
              />
            </div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="my-14 md:my-16 border-t border-base-300" />

        {/* Band B — Technology Partners */}
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          transition={{ delay: 0.1 }}
        >
          <p className="eyebrow">{isTh ? 'พันธมิตรเทคโนโลยี' : 'Technology Partners'}</p>
          <h2 className="display-heading text-2xl md:text-3xl lg:text-4xl mt-3">
            {isTh ? 'พันธมิตรเทคโนโลยี' : 'Technology Partners'}
          </h2>
          <p className="mt-4 text-base md:text-lg text-base-content/70">
            {isTh
              ? 'เราทำงานร่วมกับผู้นำด้านแพลตฟอร์มและโครงสร้างพื้นฐานระดับองค์กร'
              : 'We partner with leaders in enterprise platforms and infrastructure.'}
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {TECH_PARTNERS.map((partner, index) => (
            <motion.div
              key={partner.name}
              className="card-surface flex flex-col items-center justify-center gap-4 px-6 py-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative flex h-16 w-full max-w-[200px] items-center justify-center rounded-md bg-white px-4 py-3">
                <PartnerLogo
                  name={partner.name}
                  src={partner.src}
                  className="text-xl font-bold text-slate-700"
                />
              </div>
              <span className="eyebrow text-[10px]">
                {isTh ? partner.roleTh : partner.roleEn}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
