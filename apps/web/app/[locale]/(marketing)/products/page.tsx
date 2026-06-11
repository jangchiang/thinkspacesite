import { type Locale } from '@/lib/i18n'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BrainCircuit, Server } from 'lucide-react'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isTh = locale === 'th'

  return {
    title: isTh ? 'ผลิตภัณฑ์ | ThinkSpace' : 'Products | ThinkSpace',
    description: isTh
      ? 'แพลตฟอร์มและโซลูชันของ ThinkSpace — Logix แพลตฟอร์ม AI อธิปไตย และ Proxmox Virtual Environment สำหรับองค์กร'
      : 'ThinkSpace platforms and solutions — Logix sovereign AI platform and enterprise Proxmox Virtual Environment.',
  }
}

interface ProductCard {
  href: string
  eyebrow: string
  title: string
  blurb: string
  cta: string
  Icon: typeof BrainCircuit
}

export default async function ProductsPage({ params }: Props): Promise<React.JSX.Element> {
  const { locale } = await params
  const isTh = locale === 'th'

  const products: ProductCard[] = [
    {
      href: `/${locale}/products/logix`,
      eyebrow: isTh ? 'แพลตฟอร์ม AI อธิปไตย' : 'Sovereign AI Platform',
      title: 'Logix',
      blurb: isTh
        ? 'โครงสร้างพื้นฐาน AI เชิงเอเจนต์สำหรับองค์กรที่ต้องการ "เป็นเจ้าของ" พื้นที่ทำงาน AI ของตนเอง ไม่ใช่แค่เช่าใช้ ติดตั้งได้ทั้งบนเซิร์ฟเวอร์ภายในองค์กรและบนคลาวด์ พร้อมควบคุมข้อมูล ความรู้ และโครงสร้างพื้นฐานได้อย่างเต็มที่'
        : 'Agentic AI infrastructure for organizations that want to own their AI workspace, not rent it. Deploy on-premise or on-cloud with full control over your data, knowledge, and infrastructure.',
      cta: isTh ? 'ดูรายละเอียด Logix' : 'Explore Logix',
      Icon: BrainCircuit,
    },
    {
      href: `/${locale}/products/proxmox`,
      eyebrow: isTh ? 'ตัวแทนจำหน่ายที่ได้รับอนุญาต' : 'Authorized Reseller',
      title: 'Proxmox VE',
      blurb: isTh
        ? 'Proxmox Virtual Environment สำหรับการทำเวอร์ชวลไลเซชันระดับองค์กร — รวม KVM และ LXC, High Availability, Software-Defined Storage และการสำรองข้อมูล โดย ThinkSpace ในฐานะพันธมิตรตัวแทนจำหน่ายที่ได้รับอนุญาต'
        : 'Enterprise virtualization with Proxmox Virtual Environment — KVM & LXC, high availability, software-defined storage, and backup, delivered by ThinkSpace as an authorized reseller partner.',
      cta: isTh ? 'ดูรายละเอียด Proxmox' : 'Explore Proxmox',
      Icon: Server,
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-base-100">
        <div className="container-custom">
          <div className="max-w-3xl">
            <p className="eyebrow">{isTh ? 'ผลิตภัณฑ์' : 'Products'}</p>
            <div className="rule-accent" />
            <h1 className="display-heading text-4xl md:text-5xl lg:text-6xl mt-6">
              {isTh ? 'ผลิตภัณฑ์ของเรา' : 'Our Products'}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-base-content/70 leading-relaxed">
              {isTh
                ? 'แพลตฟอร์มและเทคโนโลยีที่เราพัฒนาและสนับสนุน เพื่อให้องค์กรเป็นเจ้าของโครงสร้างพื้นฐานดิจิทัลของตนเองอย่างแท้จริง'
                : 'Platforms and technologies we build and support, designed to help organizations truly own their digital infrastructure.'}
            </p>
          </div>
        </div>
      </section>

      {/* Product cards */}
      <section className="pb-20 md:pb-28 bg-base-100">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="card-surface group flex flex-col p-8 md:p-10"
              >
                <div className="w-14 h-14 flex items-center justify-center bg-secondary/5 text-primary mb-6">
                  <p.Icon className="w-7 h-7" />
                </div>
                <p className="eyebrow">{p.eyebrow}</p>
                <h2 className="display-heading text-2xl md:text-3xl mt-3">{p.title}</h2>
                <p className="mt-4 text-base-content/70 leading-relaxed flex-1">{p.blurb}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-primary font-semibold">
                  {p.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
