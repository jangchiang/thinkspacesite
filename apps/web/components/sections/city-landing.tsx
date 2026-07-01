import Link from 'next/link'
import {
  Code2, Globe, Smartphone, BrainCircuit, Building2, Cloud,
  ArrowRight, Check, MapPin, Phone, Mail,
  type LucideIcon,
} from 'lucide-react'
import { MatrixGrid } from '@/components/backgrounds/matrix-grid'
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/seo/json-ld'
import { type Locale } from '@/lib/i18n'

export interface CityLandingData {
  /** URL slug segment, e.g. "software-chiang-mai" */
  slug: string
  cityEn: string
  cityTh: string
  /** LocalBusiness @id anchor in the root layout, e.g. "chiangmai" */
  anchor: string
}

const SERVICES: { icon: LucideIcon; th: string; en: string; bodyTh: string; bodyEn: string }[] = [
  { icon: Code2, th: 'รับพัฒนาซอฟต์แวร์', en: 'Custom Software', bodyTh: 'ออกแบบและพัฒนาซอฟต์แวร์ตามความต้องการขององค์กร ตั้งแต่วางระบบจนถึงส่งมอบ', bodyEn: 'Bespoke software built to your requirements, from architecture to delivery.' },
  { icon: Globe, th: 'พัฒนาเว็บแอปพลิเคชัน', en: 'Web Applications', bodyTh: 'เว็บและเว็บแอปสมัยใหม่ที่รวดเร็ว ปลอดภัย และรองรับการเติบโต', bodyEn: 'Modern, fast and secure web apps that scale with your business.' },
  { icon: Smartphone, th: 'พัฒนาโมบายแอป', en: 'Mobile Apps', bodyTh: 'แอปพลิเคชันบน iOS และ Android สำหรับลูกค้าและทีมงานของคุณ', bodyEn: 'iOS and Android apps for your customers and internal teams.' },
  { icon: BrainCircuit, th: 'AI และวิทยาการข้อมูล', en: 'AI & Data', bodyTh: 'โซลูชัน AI, แชตบอต, RAG และการวิเคราะห์ข้อมูลที่ใช้งานได้จริง', bodyEn: 'Practical AI, chatbots, RAG and data analytics that deliver value.' },
  { icon: Building2, th: 'ระบบสำหรับองค์กร (ERP/CRM)', en: 'Enterprise Systems', bodyTh: 'ระบบภายในองค์กร ERP, CRM และระบบอัตโนมัติของกระบวนการทำงาน', bodyEn: 'ERP, CRM and workflow automation tailored to your operations.' },
  { icon: Cloud, th: 'คลาวด์และโครงสร้างพื้นฐาน', en: 'Cloud & Infrastructure', bodyTh: 'วางระบบคลาวด์ เซิร์ฟเวอร์ และเวอร์ชวลไลเซชัน Proxmox ที่คุณเป็นเจ้าของเอง', bodyEn: 'Cloud, servers and Proxmox virtualization you fully own.' },
]

export function cityMetadata(city: CityLandingData, locale: Locale) {
  const isTh = locale === 'th'
  const cityName = isTh ? city.cityTh : city.cityEn
  return {
    title: isTh
      ? `บริษัทซอฟต์แวร์ใน${cityName} · รับพัฒนาซอฟต์แวร์และ AI | ThinkSpace`
      : `Software Company in ${cityName} · Custom Software & AI | ThinkSpace`,
    description: isTh
      ? `ThinkSpace Technology บริษัทเทคโนโลยีและซอฟต์แวร์ใน${cityName} รับพัฒนาซอฟต์แวร์ เว็บและโมบายแอปพลิเคชัน AI และระบบสำหรับองค์กร โดยทีมผู้เชี่ยวชาญในพื้นที่`
      : `ThinkSpace Technology is a software and technology company in ${cityName}, Thailand — custom software, web & mobile apps, AI and enterprise systems by a local expert team.`,
    alternates: { canonical: `/${locale}/${city.slug}` },
  }
}

export function CityLanding({ city, locale }: { city: CityLandingData; locale: Locale }): React.JSX.Element {
  const isTh = locale === 'th'
  const cityName = isTh ? city.cityTh : city.cityEn
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techthinkspace.com'

  const faqs = isTh
    ? [
        { q: `ThinkSpace เป็นบริษัทซอฟต์แวร์ใน${cityName} ใช่ไหม`, a: `ใช่ เราเป็นบริษัทเทคโนโลยีและซอฟต์แวร์ที่มีทีมงานใน${cityName} ให้บริการพัฒนาซอฟต์แวร์ เว็บและโมบายแอป AI และระบบสำหรับองค์กร` },
        { q: 'รับพัฒนาซอฟต์แวร์และโปรแกรมประเภทใดบ้าง', a: 'เรารับพัฒนาซอฟต์แวร์ตามสั่ง เว็บแอปพลิเคชัน โมบายแอป ระบบ ERP/CRM โซลูชัน AI และการวางระบบคลาวด์และเซิร์ฟเวอร์' },
        { q: 'ทำงานกับองค์กรนอกพื้นที่ได้ไหม', a: `ได้ นอกจาก${cityName} เรายังให้บริการลูกค้าทั่วประเทศไทย ทั้งแบบทำงานในพื้นที่และทางไกล` },
        { q: 'ติดต่อขอใบเสนอราคาได้อย่างไร', a: 'ติดต่อผ่านหน้าติดต่อเรา อีเมล info@techthinkspace.com หรือโทร +66 82-808-7666 ทีมงานยินดีให้คำปรึกษาฟรี' },
      ]
    : [
        { q: `Is ThinkSpace a software company in ${cityName}?`, a: `Yes — we are a technology and software company with a team in ${cityName}, offering custom software, web & mobile apps, AI and enterprise systems.` },
        { q: 'What kinds of software do you build?', a: 'Custom software, web applications, mobile apps, ERP/CRM systems, AI solutions, and cloud & server infrastructure.' },
        { q: 'Do you work with clients outside the city?', a: `Yes. Beyond ${cityName}, we serve clients across Thailand, both on-site and remotely.` },
        { q: 'How do I get a quote?', a: 'Reach us via the contact page, email info@techthinkspace.com, or call +66 82-808-7666 for a free consultation.' },
    ]

  const structuredData = [
    breadcrumbJsonLd(locale, [{ name: cityName, path: `/${city.slug}` }]),
    faqJsonLd(faqs),
    { '@context': 'https://schema.org', '@type': 'WebPage', url: `${siteUrl}/${locale}/${city.slug}`, about: { '@id': `${siteUrl}/#${city.anchor}` } },
  ]

  return (
    <main className="bg-base-100">
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary text-white">
        <MatrixGrid />
        <div className="container-custom relative z-10 py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="eyebrow !text-primary">
              <span className="rule-accent" />
              {isTh ? `บริษัทเทคโนโลยีใน${cityName}` : `Technology company in ${cityName}`}
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              {isTh ? (
                <>บริษัทซอฟต์แวร์และเทคโนโลยี<br /><span className="text-primary">ใน{cityName}</span></>
              ) : (
                <>Software &amp; Technology Company<br /><span className="text-primary">in {cityName}</span></>
              )}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              {isTh
                ? `ThinkSpace Technology รับพัฒนาซอฟต์แวร์ เว็บและโมบายแอปพลิเคชัน AI และระบบสำหรับองค์กรใน${cityName} ด้วยทีมผู้เชี่ยวชาญที่เข้าใจธุรกิจของคุณ`
                : `ThinkSpace Technology builds custom software, web & mobile apps, AI and enterprise systems in ${cityName}, with an expert team that understands your business.`}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href={`/${locale}/contact`} className="btn btn-primary btn-md gap-2 md:btn-lg">
                {isTh ? 'ปรึกษาฟรี / ขอใบเสนอราคา' : 'Free consultation / Get a quote'}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href={`/${locale}/products/logix`} className="btn btn-outline btn-md gap-2 border-white/40 text-white hover:border-primary hover:bg-primary/10 hover:text-white md:btn-lg">
                {isTh ? 'รู้จัก Logix' : 'Discover Logix'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-base-100">
        <div className="container-custom">
          <div className="max-w-2xl">
            <span className="eyebrow text-accent">{isTh ? 'บริการของเรา' : 'Our services'}</span>
            <h2 className="display-heading mt-4 text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
              {isTh ? `บริการซอฟต์แวร์และเทคโนโลยีใน${cityName}` : `Software & technology services in ${cityName}`}
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.en} className="card-surface bg-base-100 p-7">
                <span className="flex h-12 w-12 items-center justify-center border border-base-300 bg-primary/5 text-accent">
                  <s.icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-base-content">{isTh ? s.th : s.en}</h3>
                <p className="mt-2 text-sm leading-relaxed text-base-content/70">{isTh ? s.bodyTh : s.bodyEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us + local presence */}
      <section className="section-padding bg-base-200">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow text-accent">{isTh ? 'ทำไมต้อง ThinkSpace' : 'Why ThinkSpace'}</span>
            <h2 className="display-heading mt-4 text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
              {isTh ? `พาร์ตเนอร์เทคโนโลยีในพื้นที่${cityName}` : `A local technology partner in ${cityName}`}
            </h2>
            <ul className="mt-6 space-y-3">
              {(isTh
                ? ['ทีมงานในพื้นที่ เข้าใจบริบทธุรกิจไทย', 'ประสบการณ์จริงกับองค์กร ภาครัฐ และมหาวิทยาลัย', 'เป็นเจ้าของโค้ดและข้อมูล ไม่ผูกขาดผู้ขาย', 'ดูแลต่อเนื่องหลังส่งมอบ']
                : ['A local team that understands Thai business', 'Proven work with enterprises, government and universities', 'You own your code and data — no vendor lock-in', 'Ongoing support after delivery']
              ).map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-base-content/80">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-surface bg-base-100 p-8">
            <h3 className="text-lg font-semibold text-base-content">{isTh ? 'ติดต่อทีมงาน' : 'Contact the team'}</h3>
            <div className="mt-5 space-y-3 text-sm text-base-content/80">
              <p className="flex items-center gap-2.5"><MapPin className="h-4 w-4 text-primary" aria-hidden="true" />{cityName}, {isTh ? 'ประเทศไทย' : 'Thailand'}</p>
              <p className="flex items-center gap-2.5"><Phone className="h-4 w-4 text-primary" aria-hidden="true" /><a href="tel:+66828087666" className="hover:text-accent">+66 82-808-7666</a></p>
              <p className="flex items-center gap-2.5"><Mail className="h-4 w-4 text-primary" aria-hidden="true" /><a href="mailto:info@techthinkspace.com" className="hover:text-accent">info@techthinkspace.com</a></p>
            </div>
            <Link href={`/${locale}/contact`} className="btn btn-primary mt-7 w-full gap-2">
              {isTh ? 'ขอใบเสนอราคา' : 'Get a quote'}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-base-100">
        <div className="container-custom max-w-3xl">
          <span className="eyebrow text-accent">{isTh ? 'คำถามที่พบบ่อย' : 'FAQ'}</span>
          <h2 className="display-heading mt-4 text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
            {isTh ? `บริษัทซอฟต์แวร์ใน${cityName} — คำถามที่พบบ่อย` : `Software company in ${cityName} — FAQ`}
          </h2>
          <div className="mt-10 space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="card-surface bg-base-100 p-6">
                <summary className="cursor-pointer font-semibold text-base-content">{f.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-base-content/70">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <JsonLd data={structuredData} />
    </main>
  )
}
