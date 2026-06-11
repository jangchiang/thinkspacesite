import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Server,
  Boxes,
  Activity,
  HardDrive,
  Layers,
  ShieldCheck,
  Network,
  MonitorCheck,
  ArrowRight,
  Check,
  Database,
  Mail,
  Quote,
  type LucideIcon,
} from 'lucide-react'
import { MatrixGrid } from '@/components/backgrounds/matrix-grid'
import { getProduct } from '@/lib/strapi'
import { type Locale } from '@/lib/i18n'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ locale: Locale }>
}

// Resolve a CMS string icon name (or fall back to Server)
const iconMap: Record<string, LucideIcon> = {
  Boxes, Activity, HardDrive, Layers, ShieldCheck, Network, MonitorCheck, Server, Database, Mail,
}

interface PFeature { icon: string; title: string; body: string }
interface PTier { name: string; tagline: string; featured?: boolean; points: string[] }
interface PAddOn { icon: string; title: string; body: string; features: string[] }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isTh = locale === 'th'
  return {
    title: isTh
      ? 'Proxmox Virtual Environment | ThinkSpace ตัวแทนจำหน่ายที่ได้รับอนุญาต'
      : 'Proxmox Virtual Environment | ThinkSpace Authorized Reseller',
    description: isTh
      ? 'ThinkSpace เป็นตัวแทนจำหน่ายอย่างเป็นทางการของ Proxmox นำเสนอเวอร์ชวลไลเซชันระดับองค์กรด้วย Proxmox Virtual Environment พร้อมบริการให้คำปรึกษาและการสนับสนุนแบบ B2B'
      : 'ThinkSpace is an authorized Proxmox reseller delivering enterprise virtualization with Proxmox Virtual Environment, backed by B2B consulting, deployment and support.',
  }
}

export default async function ProxmoxProductPage({ params }: Props): Promise<React.JSX.Element> {
  const { locale } = await params
  const isTh = locale === 'th'

  // CMS content (editable in Strapi) — falls back to the in-code defaults below.
  const cms = (await getProduct('proxmox', locale).catch(() => null)) as Record<string, any> | null

  // ---- Fallback content (locale-resolved) ----
  const fb = {
    eyebrow: isTh ? 'ตัวแทนจำหน่ายที่ได้รับอนุญาต' : 'Authorized Proxmox Reseller',
    title: isTh ? 'เวอร์ชวลไลเซชันระดับองค์กรด้วย' : 'Enterprise virtualization with',
    titleHighlight: 'Proxmox VE',
    intro: isTh
      ? 'ในฐานะตัวแทนจำหน่ายอย่างเป็นทางการของ Proxmox Server Solutions ทีม ThinkSpace ออกแบบ ติดตั้ง และดูแลแพลตฟอร์มเวอร์ชวลไลเซชันแบบโอเพนซอร์สที่พร้อมใช้งานในระดับองค์กร — โครงสร้างพื้นฐานที่คุณเป็นเจ้าของและควบคุมได้เต็มที่ ปราศจาก vendor lock-in'
      : 'As an official reseller of Proxmox Server Solutions, ThinkSpace designs, deploys and operates production-grade open-source virtualization — infrastructure you fully own and control, free of vendor lock-in.',
    ctaLabel: isTh ? 'นัดหมายปรึกษาทางเทคนิค' : 'Schedule a Technical Consult',
    heroChips: ['KVM + LXC', 'ZFS / Ceph', 'High Availability', 'SDN + Firewall', 'Open Source'],
    features: [
      { icon: 'Boxes', title: 'KVM + LXC', body: isTh ? 'รันทั้ง virtual machine (KVM) และ container ที่มีน้ำหนักเบา (LXC) บนแพลตฟอร์มเดียว เพื่อความยืดหยุ่นสูงสุดของเวิร์กโหลด' : 'Run full virtual machines (KVM) and lightweight containers (LXC) on a single platform for maximum workload flexibility.' },
      { icon: 'Activity', title: isTh ? 'HA และ Live Migration' : 'HA & Live Migration', body: isTh ? 'คลัสเตอร์ที่มีความพร้อมใช้งานสูง ย้ายเครื่องเสมือนแบบ live ระหว่างโหนดได้โดยไม่ต้องหยุดให้บริการ' : 'High-availability clustering with live migration of running VMs between nodes — no service interruption.' },
      { icon: 'HardDrive', title: 'Software-Defined Storage', body: isTh ? 'สตอเรจที่กำหนดด้วยซอฟต์แวร์ในตัว รองรับ ZFS และ Ceph สำหรับ storage แบบกระจายที่ทนทาน' : 'Built-in software-defined storage with ZFS and Ceph for resilient, distributed block storage.' },
      { icon: 'Layers', title: 'Hyper-Converged Infrastructure', body: isTh ? 'รวมการประมวลผล สตอเรจ และเครือข่ายไว้ในคลัสเตอร์ HCI เดียว ลดความซับซ้อนและต้นทุนฮาร์ดแวร์' : 'Converge compute, storage and networking into one HCI cluster to reduce complexity and hardware cost.' },
      { icon: 'ShieldCheck', title: isTh ? 'Backup & Restore ในตัว' : 'Built-in Backup & Restore', body: isTh ? 'สำรองและกู้คืนเครื่องเสมือนและคอนเทนเนอร์ตามกำหนดเวลา พร้อมการกู้คืนแบบละเอียด' : 'Scheduled, integrated backup and restore for VMs and containers with point-in-time recovery.' },
      { icon: 'Network', title: 'SDN + Firewall', body: isTh ? 'เครือข่ายที่กำหนดด้วยซอฟต์แวร์ (SDN) และไฟร์วอลล์ในตัว ควบคุมความปลอดภัยระดับคลัสเตอร์ โหนด และ VM' : 'Software-defined networking (SDN) and an integrated firewall for cluster-, node- and VM-level security.' },
      { icon: 'MonitorCheck', title: isTh ? 'การจัดการผ่านเว็บแบบรวมศูนย์' : 'Central Web Management', body: isTh ? 'อินเทอร์เฟซเว็บเดียวสำหรับจัดการทั้งคลัสเตอร์ ไม่ต้องเสียค่าลิขสิทธิ์การจัดการเพิ่มเติม' : 'A single web interface to manage the entire cluster — no separate management licensing required.' },
      { icon: 'Server', title: isTh ? 'โอเพนซอร์สระดับองค์กร' : 'Enterprise Open Source', body: isTh ? 'แพลตฟอร์มโอเพนซอร์สที่พิสูจน์แล้ว ปราศจาก vendor lock-in พร้อม Enterprise Repository ที่ผ่านการทดสอบ' : 'A proven open-source platform free of vendor lock-in, with a tested Enterprise Repository for production.' },
    ] as PFeature[],
    tiers: [
      { name: 'Basic', tagline: isTh ? 'สำหรับการเริ่มต้นใช้งานจริง' : 'For getting into production', points: isTh ? ['เข้าถึง Enterprise Repository', 'อัปเดตที่ผ่านการทดสอบเพื่อความเสถียร', 'การสนับสนุนผ่านระบบ ticket'] : ['Enterprise Repository access', 'Stable, tested updates', 'Ticket-based support'] },
      { name: 'Standard', tagline: isTh ? 'เหมาะกับงานธุรกิจส่วนใหญ่' : 'Right-sized for most workloads', featured: true, points: isTh ? ['ทุกอย่างใน Basic', 'เวลาตอบสนองที่เร็วขึ้น', 'ความช่วยเหลือในการกำหนดค่าคลัสเตอร์'] : ['Everything in Basic', 'Faster response times', 'Cluster configuration assistance'] },
      { name: 'Premium', tagline: isTh ? 'สำหรับสภาพแวดล้อมที่สำคัญต่อภารกิจ' : 'For mission-critical estates', points: isTh ? ['ทุกอย่างใน Standard', 'ระดับการสนับสนุนสูงสุด', 'การวางแผนสถาปัตยกรรมเชิงรุก'] : ['Everything in Standard', 'Highest support level', 'Proactive architecture planning'] },
    ] as PTier[],
    addOns: [
      { icon: 'Database', title: 'Proxmox Backup Server', body: isTh ? 'โซลูชันสำรองข้อมูลระดับองค์กรสำหรับ VM, container และโฮสต์' : 'Enterprise backup solution for VMs, containers and physical hosts.', features: isTh ? ['การสำรองข้อมูลแบบ incremental และ deduplication', 'การเข้ารหัสฝั่งไคลเอนต์', 'การตรวจสอบความสมบูรณ์ของข้อมูล'] : ['Incremental, deduplicated backups', 'Client-side encryption', 'Data integrity verification'] },
      { icon: 'Mail', title: 'Proxmox Mail Gateway', body: isTh ? 'เกตเวย์อีเมลที่ป้องกันสแปมและมัลแวร์ก่อนถึงเซิร์ฟเวอร์เมลของคุณ' : 'A mail gateway that filters spam and malware before it reaches your mail server.', features: isTh ? ['การกรองสแปมและไวรัสแบบหลายชั้น', 'การกักกันและกฎที่ปรับแต่งได้', 'รายงานและสถิติแบบรวมศูนย์'] : ['Multi-layer spam & virus filtering', 'Quarantine and custom rules', 'Centralized reporting & statistics'] },
    ] as PAddOn[],
  }

  // ---- Merge CMS over fallback ----
  const nonEmpty = (a: unknown[] | undefined | null) => (Array.isArray(a) && a.length > 0 ? a : null)
  const data = {
    eyebrow: cms?.eyebrow || fb.eyebrow,
    title: cms?.title || fb.title,
    titleHighlight: cms?.titleHighlight || fb.titleHighlight,
    intro: cms?.intro || fb.intro,
    ctaLabel: cms?.ctaLabel || fb.ctaLabel,
    heroChips: (nonEmpty(cms?.heroChips) as string[]) || fb.heroChips,
    features: (nonEmpty(cms?.features) as PFeature[]) || fb.features,
    tiers: (nonEmpty(cms?.tiers) as PTier[]) || fb.tiers,
    addOns: (nonEmpty(cms?.addOns) as PAddOn[]) || fb.addOns,
  }
  const ctaLabel = data.ctaLabel

  // Bespoke (visual) section copy — editable via the product `extra` JSON, else defaults.
  const extra = (cms?.extra || {}) as Record<string, any>
  const dcm = {
    eyebrow: extra.dcmEyebrow || (isTh ? 'การควบคุมแบบรวมศูนย์' : 'Central Control Plane'),
    body: extra.dcmBody || (isTh
      ? 'จัดการคลัสเตอร์ Proxmox VE หลายชุดจากหน้าจอควบคุมเดียว มองเห็นทรัพยากรทั้งหมดทั่วทั้งดาต้าเซ็นเตอร์ และย้ายเวิร์กโหลดข้ามคลัสเตอร์ได้อย่างราบรื่น ThinkSpace ช่วยวางแผนและกำหนดค่าระนาบควบคุมส่วนกลางให้เหมาะกับขนาดและความต้องการขององค์กร'
      : 'Manage multiple Proxmox VE clusters from a single control plane, with unified visibility across the datacenter and seamless workload movement between clusters. ThinkSpace plans and configures this control plane to match your scale and requirements.'),
    points: (nonEmpty(extra.dcmPoints) as string[]) || (isTh
      ? ['มุมมองทรัพยากรแบบรวมศูนย์ทั่วทุกคลัสเตอร์', 'การย้ายเวิร์กโหลดข้ามคลัสเตอร์', 'การจัดการการเข้าถึงและบทบาทแบบรวม']
      : ['Unified resource view across all clusters', 'Cross-cluster workload migration', 'Consolidated access and role management']),
  }
  const social = {
    quote: extra.quote || (isTh
      ? '“ThinkSpace ช่วยให้องค์กรเป็นเจ้าของโครงสร้างพื้นฐานเวอร์ชวลไลเซชันของตนเองอย่างแท้จริง ด้วยแพลตฟอร์มโอเพนซอร์สที่ปลอดภัย พร้อมการสนับสนุนระดับองค์กร”'
      : '“ThinkSpace helps organizations truly own their virtualization infrastructure — a secure open-source platform backed by enterprise-grade support.”'),
    attribution: extra.attribution || (isTh ? 'ออกแบบและดูแลโดยทีมคลาวด์และโครงสร้างพื้นฐานของ ThinkSpace' : 'Designed and operated by the ThinkSpace cloud & infrastructure team.'),
    ctaTitle: extra.ctaTitle || (isTh ? 'พร้อมวางแผนสภาพแวดล้อม Proxmox ของคุณแล้วหรือยัง?' : 'Ready to plan your Proxmox environment?'),
    ctaBody: extra.ctaBody || (isTh ? 'พูดคุยกับวิศวกรของเราเพื่อกำหนดสถาปัตยกรรม การออกใบอนุญาต และเส้นทางการย้ายระบบ' : 'Talk to our engineers about architecture, licensing and your migration path.'),
  }

  const nodes = [
    { name: 'pve-node-01', cpu: 38 }, { name: 'pve-node-02', cpu: 64 },
    { name: 'pve-node-03', cpu: 22 }, { name: 'ceph-osd-01', cpu: 51 },
  ]

  return (
    <main className="bg-base-100">
      {/* Dark matrix hero with integrated Proxmox co-branding */}
      <section className="relative overflow-hidden bg-secondary text-white">
        <MatrixGrid />
        <div className="container-custom relative z-10 py-20 md:py-28 lg:py-32">
          <div className="max-w-3xl">
            <div className="mb-8 flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.18em] text-white/45">
                {isTh ? 'ความร่วมมือกับ' : 'In partnership with'}
              </span>
              <Image
                src="/images/partners/proxmox-reseller-inverted.png"
                alt="Proxmox Authorized Reseller"
                width={170}
                height={54}
                className="h-9 w-auto sm:h-10"
                priority
              />
            </div>

            <span className="eyebrow !text-primary">
              <span className="rule-accent" />
              {data.eyebrow}
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              {data.title} <span className="text-primary">{data.titleHighlight}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{data.intro}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href={`/${locale}/contact`} className="btn btn-primary btn-md gap-2 md:btn-lg">
                {ctaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="https://www.proxmox.com/en/products/proxmox-virtual-environment"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-md gap-2 border-white/40 text-white hover:border-primary hover:bg-primary/10 hover:text-white md:btn-lg"
              >
                {isTh ? 'เกี่ยวกับ Proxmox VE' : 'About Proxmox VE'}
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-2.5">
              {data.heroChips.map((c) => (
                <span key={c} className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/80">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Proxmox VE platform — feature grid */}
      <section className="section-padding bg-base-100">
        <div className="container-custom">
          <div className="max-w-2xl">
            <span className="eyebrow">{isTh ? 'แพลตฟอร์มหลัก' : 'The Platform'}</span>
            <h2 className="display-heading mt-4 text-3xl sm:text-4xl lg:text-5xl">Proxmox Virtual Environment</h2>
            <div className="rule-accent mt-6" />
            <p className="mt-6 text-lg text-base-content/70">
              {isTh
                ? 'แพลตฟอร์มจัดการเวอร์ชวลไลเซชันแบบโอเพนซอร์สที่สมบูรณ์ รวมการประมวลผล สตอเรจ และเครือข่ายในโซลูชันเดียว พร้อมการจัดการผ่านเว็บแบบรวมศูนย์'
                : 'A complete open-source virtualization management platform that unifies compute, storage and networking in one solution with central web-based management.'}
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.features.map((f) => {
              const Icon = iconMap[f.icon] || Server
              return (
                <div key={f.title} className="card-surface group flex h-full flex-col p-6">
                  <span className="flex h-11 w-11 items-center justify-center border border-base-300 bg-base-200 text-primary transition-colors duration-300 group-hover:bg-secondary group-hover:text-primary-content">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-semibold text-base-content">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-base-content/70">{f.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Reseller services — B2B subscription tiers */}
      <section className="section-padding bg-base-200">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">{isTh ? 'บริการจากตัวแทนจำหน่าย' : 'Reseller Services'}</span>
            <h2 className="display-heading mt-4 text-3xl sm:text-4xl">
              {isTh ? 'แพ็กเกจสมัครสมาชิกแบบ B2B' : 'B2B Subscription Tiers'}
            </h2>
            <p className="mt-4 text-base-content/70">
              {isTh
                ? 'การสนับสนุนระดับองค์กร การติดตั้ง และการเข้าถึง Enterprise Repository ผ่าน ThinkSpace'
                : 'Enterprise support, deployment and Enterprise Repository access — delivered through ThinkSpace.'}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {data.tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-box border bg-base-100 p-7 transition-all duration-300 ${
                  tier.featured ? 'border-primary shadow-md md:-translate-y-2' : 'border-base-300 hover:border-primary/40 hover:shadow-sm'
                }`}
              >
                {tier.featured && (
                  <span className="absolute right-5 top-5 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-content">
                    {isTh ? 'แนะนำ' : 'Popular'}
                  </span>
                )}
                <h3 className="text-xl font-bold text-base-content">{tier.name}</h3>
                <p className="mt-1 text-sm text-base-content/60">{tier.tagline}</p>
                <ul className="mt-6 space-y-3">
                  {(tier.points || []).map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm text-base-content/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${locale}/contact`}
                  className={`mt-8 gap-2 ${tier.featured ? 'btn btn-primary' : 'btn btn-outline border-base-300 hover:border-primary hover:bg-primary/5'}`}
                >
                  {ctaLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proxmox Datacenter Manager — control-plane mock */}
      <section className="section-padding bg-base-100">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="eyebrow">{dcm.eyebrow}</span>
              <h2 className="display-heading mt-4 text-3xl sm:text-4xl">Proxmox Datacenter Manager</h2>
              <p className="mt-5 leading-relaxed text-base-content/70">{dcm.body}</p>
              <ul className="mt-6 space-y-3">
                {dcm.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-base-content/80">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="overflow-hidden rounded-box border border-base-300 bg-secondary shadow-lg">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
                <span className="h-3 w-3 rounded-full bg-white/20" />
                <span className="h-3 w-3 rounded-full bg-white/20" />
                <span className="h-3 w-3 rounded-full bg-white/20" />
                <span className="ml-3 text-xs font-medium text-white/60">datacenter · control plane</span>
              </div>
              <div className="grid grid-cols-3 gap-px bg-white/10 text-center">
                {[
                  { k: isTh ? 'คลัสเตอร์' : 'Clusters', v: '3' },
                  { k: isTh ? 'โหนด' : 'Nodes', v: '12' },
                  { k: isTh ? 'เกสต์' : 'Guests', v: '184' },
                ].map((s) => (
                  <div key={s.k} className="bg-secondary px-3 py-5">
                    <div className="text-2xl font-bold text-primary">{s.v}</div>
                    <div className="mt-1 text-[11px] text-white/55">{s.k}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-2.5 p-5">
                {nodes.map((n) => (
                  <div key={n.name} className="flex items-center gap-3">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-primary shadow-[0_0_8px] shadow-primary/60" />
                    <span className="w-28 shrink-0 font-mono text-xs text-white/80">{n.name}</span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                      <span className="block h-full rounded-full bg-primary/80" style={{ width: `${n.cpu}%` }} />
                    </span>
                    <span className="w-9 shrink-0 text-right font-mono text-[11px] text-white/55">{n.cpu}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Optional add-ons */}
      <section className="section-padding bg-base-200">
        <div className="container-custom">
          <div className="max-w-2xl">
            <span className="eyebrow">{isTh ? 'ส่วนเสริม (ตามต้องการ)' : 'Optional Add-ons'}</span>
            <h2 className="display-heading mt-4 text-3xl sm:text-4xl">
              {isTh ? 'ขยายแพลตฟอร์มของคุณ' : 'Extend your platform'}
            </h2>
            <p className="mt-4 text-base-content/70">
              {isTh
                ? 'ผลิตภัณฑ์เสริมจาก Proxmox ที่ ThinkSpace สามารถจัดหาและติดตั้งร่วมกับ Proxmox VE'
                : 'Complementary Proxmox products that ThinkSpace can supply and deploy alongside Proxmox VE.'}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {data.addOns.map((a) => {
              const Icon = iconMap[a.icon] || Database
              return (
                <div key={a.title} className="card-surface flex flex-col p-7">
                  <span className="flex h-12 w-12 items-center justify-center border border-base-300 bg-base-100 text-primary">
                    <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-base-content">{a.title}</h3>
                  <p className="mt-2 text-base-content/70">{a.body}</p>
                  <ul className="mt-5 space-y-2.5">
                    {(a.features || []).map((f) => (
                      <li key={f} className="flex gap-2.5 text-sm text-base-content/80">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Social proof + CTA band */}
      <section className="relative overflow-hidden bg-secondary text-white">
        <MatrixGrid />
        <div className="container-custom relative z-10 section-padding">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Quote className="h-10 w-10 text-primary" aria-hidden="true" />
              <blockquote className="mt-5 text-2xl font-medium leading-relaxed text-white">{social.quote}</blockquote>
              <p className="mt-5 text-sm text-white/60">{social.attribution}</p>
            </div>
            <div className="lg:text-right">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{social.ctaTitle}</h2>
              <p className="mt-4 text-white/75">{social.ctaBody}</p>
              <Link href={`/${locale}/contact`} className="btn btn-primary mt-7 gap-2 lg:ml-auto">
                {ctaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer disclosure */}
      <section className="border-t border-base-300 bg-base-100">
        <div className="container-custom py-8">
          <p className="text-center text-sm text-base-content/60">
            {isTh
              ? 'บริษัท ThinkSpace Technologies จำกัด เป็นพันธมิตรตัวแทนจำหน่ายอย่างเป็นทางการของ Proxmox Server Solutions'
              : 'ThinkSpace Technologies Co., Ltd. is an official reseller partner of Proxmox Server Solutions.'}
          </p>
        </div>
      </section>
    </main>
  )
}
