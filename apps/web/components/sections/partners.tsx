'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PartnerLogo } from '@/components/ui/partner-logo'

interface CmsPartner {
  id: number
  name: string
  website?: string
  role?: string
  logo?: {
    url: string
    formats?: { thumbnail?: { url: string }; small?: { url: string }; medium?: { url: string } }
  }
}

interface PartnersBandProps {
  locale: 'en' | 'th'
  /** Client collection entries (Trusted-by wall) */
  clients?: CmsPartner[]
  /** Partner collection entries (technology partners) */
  partners?: CmsPartner[]
  strapiUrl?: string
}

interface Client { name: string; src?: string }
interface TechPartner { name: string; src?: string; roleEn: string; roleTh: string }

const logoUrl = (strapiUrl: string, logo?: CmsPartner['logo']): string | undefined => {
  if (!logo) return undefined
  const path = logo.formats?.small?.url || logo.formats?.medium?.url || logo.url
  return path?.startsWith('http') ? path : `${strapiUrl}${path}`
}

// ---- Fallback (used only when the Strapi Partner collection is empty/unreachable) ----
const FALLBACK_CLIENTS: Client[] = [
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

const FALLBACK_TECH: TechPartner[] = [
  { name: 'Proxmox', src: '/images/partners/proxmox-reseller.png', roleEn: 'Authorized Reseller', roleTh: 'ตัวแทนจำหน่ายอย่างเป็นทางการ' },
  { name: 'Dell', roleEn: 'Technology Partner', roleTh: 'พันธมิตรเทคโนโลยี' },
  { name: 'Google Cloud', roleEn: 'Cloud Partner', roleTh: 'พันธมิตรคลาวด์' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export function PartnersBand({ locale, clients: cmsClientsInput = [], partners = [], strapiUrl = '' }: PartnersBandProps): React.JSX.Element {
  const isTh = locale === 'th'
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Prefer CMS data (edit/upload in Strapi Admin → Client / Partner); fall back to bundled logos.
  const cmsClients = cmsClientsInput.map((c) => ({ name: c.name, src: logoUrl(strapiUrl, c.logo) }))
  const cmsTech = partners.map((p) => ({
    name: p.name,
    src: logoUrl(strapiUrl, p.logo),
    roleEn: p.role || 'Partner',
    roleTh: p.role || 'พันธมิตร',
  }))

  const clients: Client[] = cmsClients.length > 0 ? cmsClients : FALLBACK_CLIENTS
  const techPartners: TechPartner[] = cmsTech.length > 0 ? cmsTech : FALLBACK_TECH

  return (
    <section className="section-padding bg-base-200" ref={ref}>
      <div className="container-custom">
        {/* Band A — Clients / Trusted by */}
        <motion.div className="text-center max-w-2xl mx-auto" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp}>
          <p className="eyebrow justify-center">{isTh ? 'ลูกค้าของเรา' : 'Our Clients'}</p>
          <h2 className="display-heading text-2xl md:text-3xl lg:text-4xl mt-3">
            {isTh ? 'ได้รับความไว้วางใจจากองค์กรชั้นนำ' : 'Trusted by leading organizations'}
          </h2>
        </motion.div>

        {/* Tile-free logo wall */}
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-9 sm:gap-x-14 md:gap-x-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {clients.map((client) => (
            <div key={client.name} className="flex h-10 md:h-12 items-center justify-center">
              <PartnerLogo
                name={client.name}
                src={client.src}
                className="h-full opacity-95 transition-transform duration-300 hover:scale-[1.06]"
                wordmarkClassName="text-base md:text-lg font-semibold text-base-content/70 transition-colors duration-300 hover:text-base-content"
              />
            </div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="mx-auto my-16 md:my-20 max-w-xs border-t border-base-300" />

        {/* Band B — Technology Partners */}
        <motion.div className="text-center max-w-2xl mx-auto" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp} transition={{ delay: 0.1 }}>
          <p className="eyebrow justify-center">{isTh ? 'พันธมิตร' : 'Partners'}</p>
          <h2 className="display-heading text-2xl md:text-3xl lg:text-4xl mt-3">
            {isTh ? 'พันธมิตรเทคโนโลยี' : 'Technology Partners'}
          </h2>
          <p className="mt-4 text-base md:text-lg text-base-content/70">
            {isTh
              ? 'เราทำงานร่วมกับผู้นำด้านแพลตฟอร์มและโครงสร้างพื้นฐานระดับองค์กร'
              : 'We partner with leaders in enterprise platforms and infrastructure.'}
          </p>
        </motion.div>

        {/* Tile-free partner row */}
        <div className="mt-12 flex flex-wrap items-start justify-center gap-x-16 gap-y-10 sm:gap-x-20">
          {techPartners.map((partner, index) => (
            <motion.div
              key={partner.name}
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex h-10 md:h-12 items-center justify-center">
                <PartnerLogo
                  name={partner.name}
                  src={partner.src}
                  className="h-full opacity-90 transition-opacity duration-300 hover:opacity-100"
                  wordmarkClassName="text-xl md:text-2xl font-bold text-base-content"
                />
              </div>
              <span className="eyebrow justify-center text-[10px]">{isTh ? partner.roleTh : partner.roleEn}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
