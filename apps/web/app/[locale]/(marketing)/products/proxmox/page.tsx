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
  Gauge,
  Quote,
} from 'lucide-react'
import { Logo } from '@/components/ui/logo'
import { type Locale } from '@/lib/i18n'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ locale: Locale }>
}

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

  const veFeatures = [
    {
      icon: Boxes,
      title: isTh ? 'KVM + LXC' : 'KVM + LXC',
      body: isTh
        ? 'รันทั้ง virtual machine (KVM) และ container ที่มีน้ำหนักเบา (LXC) บนแพลตฟอร์มเดียว เพื่อความยืดหยุ่นสูงสุดของเวิร์กโหลด'
        : 'Run full virtual machines (KVM) and lightweight containers (LXC) on a single platform for maximum workload flexibility.',
    },
    {
      icon: Activity,
      title: isTh ? 'HA และ Live Migration' : 'HA & Live Migration',
      body: isTh
        ? 'คลัสเตอร์ที่มีความพร้อมใช้งานสูง ย้ายเครื่องเสมือนแบบ live ระหว่างโหนดได้โดยไม่ต้องหยุดให้บริการ'
        : 'High-availability clustering with live migration of running VMs between nodes — no service interruption.',
    },
    {
      icon: HardDrive,
      title: isTh ? 'Software-Defined Storage (ZFS / Ceph)' : 'Software-Defined Storage (ZFS / Ceph)',
      body: isTh
        ? 'สตอเรจที่กำหนดด้วยซอฟต์แวร์ในตัว รองรับ ZFS และ Ceph สำหรับ storage แบบกระจายที่ทนทาน'
        : 'Built-in software-defined storage with ZFS and Ceph for resilient, distributed block storage.',
    },
    {
      icon: Layers,
      title: isTh ? 'Hyper-Converged Infrastructure' : 'Hyper-Converged Infrastructure',
      body: isTh
        ? 'รวมการประมวลผล สตอเรจ และเครือข่ายไว้ในคลัสเตอร์ HCI เดียว ลดความซับซ้อนและต้นทุนฮาร์ดแวร์'
        : 'Converge compute, storage and networking into one HCI cluster to reduce complexity and hardware cost.',
    },
    {
      icon: ShieldCheck,
      title: isTh ? 'Backup & Restore ในตัว' : 'Built-in Backup & Restore',
      body: isTh
        ? 'สำรองและกู้คืนเครื่องเสมือนและคอนเทนเนอร์ตามกำหนดเวลา พร้อมการกู้คืนแบบละเอียด'
        : 'Scheduled, integrated backup and restore for VMs and containers with point-in-time recovery.',
    },
    {
      icon: Network,
      title: isTh ? 'SDN + Firewall' : 'SDN + Firewall',
      body: isTh
        ? 'เครือข่ายที่กำหนดด้วยซอฟต์แวร์ (SDN) และไฟร์วอลล์ในตัว ควบคุมความปลอดภัยระดับคลัสเตอร์ โหนด และ VM'
        : 'Software-defined networking (SDN) and an integrated firewall for cluster-, node- and VM-level security.',
    },
    {
      icon: MonitorCheck,
      title: isTh ? 'การจัดการผ่านเว็บแบบรวมศูนย์' : 'Central Web Management',
      body: isTh
        ? 'อินเทอร์เฟซเว็บเดียวสำหรับจัดการทั้งคลัสเตอร์ ไม่ต้องเสียค่าลิขสิทธิ์การจัดการเพิ่มเติม'
        : 'A single web interface to manage the entire cluster — no separate management licensing required.',
    },
    {
      icon: Server,
      title: isTh ? 'โอเพนซอร์สระดับองค์กร' : 'Enterprise Open Source',
      body: isTh
        ? 'แพลตฟอร์มโอเพนซอร์สที่พิสูจน์แล้ว ปราศจาก vendor lock-in พร้อม Enterprise Repository ที่ผ่านการทดสอบ'
        : 'A proven open-source platform free of vendor lock-in, with a tested Enterprise Repository for production.',
    },
  ]

  const tiers = [
    {
      name: isTh ? 'Basic' : 'Basic',
      tagline: isTh ? 'สำหรับการเริ่มต้นใช้งานจริง' : 'For getting into production',
      points: isTh
        ? ['เข้าถึง Enterprise Repository', 'อัปเดตที่ผ่านการทดสอบเพื่อความเสถียร', 'การสนับสนุนผ่านระบบ ticket']
        : ['Enterprise Repository access', 'Stable, tested updates', 'Ticket-based support'],
    },
    {
      name: isTh ? 'Standard' : 'Standard',
      tagline: isTh ? 'เหมาะกับงานธุรกิจส่วนใหญ่' : 'Right-sized for most workloads',
      featured: true,
      points: isTh
        ? ['ทุกอย่างใน Basic', 'เวลาตอบสนองที่เร็วขึ้น', 'ความช่วยเหลือในการกำหนดค่าคลัสเตอร์']
        : ['Everything in Basic', 'Faster response times', 'Cluster configuration assistance'],
    },
    {
      name: isTh ? 'Premium' : 'Premium',
      tagline: isTh ? 'สำหรับสภาพแวดล้อมที่สำคัญต่อภารกิจ' : 'For mission-critical estates',
      points: isTh
        ? ['ทุกอย่างใน Standard', 'ระดับการสนับสนุนสูงสุด', 'การวางแผนสถาปัตยกรรมเชิงรุก']
        : ['Everything in Standard', 'Highest support level', 'Proactive architecture planning'],
    },
  ]

  const addOns = [
    {
      icon: Database,
      title: isTh ? 'Proxmox Backup Server' : 'Proxmox Backup Server',
      body: isTh
        ? 'โซลูชันสำรองข้อมูลระดับองค์กรสำหรับ VM, container และโฮสต์'
        : 'Enterprise backup solution for VMs, containers and physical hosts.',
      features: isTh
        ? ['การสำรองข้อมูลแบบ incremental และ deduplication', 'การเข้ารหัสฝั่งไคลเอนต์', 'การตรวจสอบความสมบูรณ์ของข้อมูล']
        : ['Incremental, deduplicated backups', 'Client-side encryption', 'Data integrity verification'],
    },
    {
      icon: Mail,
      title: isTh ? 'Proxmox Mail Gateway' : 'Proxmox Mail Gateway',
      body: isTh
        ? 'เกตเวย์อีเมลที่ป้องกันสแปมและมัลแวร์ก่อนถึงเซิร์ฟเวอร์เมลของคุณ'
        : 'A mail gateway that filters spam and malware before it reaches your mail server.',
      features: isTh
        ? ['การกรองสแปมและไวรัสแบบหลายชั้น', 'การกักกันและกฎที่ปรับแต่งได้', 'รายงานและสถิติแบบรวมศูนย์']
        : ['Multi-layer spam & virus filtering', 'Quarantine and custom rules', 'Centralized reporting & statistics'],
    },
  ]

  return (
    <main className="bg-base-100">
      {/* 1) Co-branded header area */}
      <section className="border-b border-base-300 bg-base-100">
        <div className="container-custom flex flex-col items-center justify-between gap-6 py-6 sm:flex-row">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-base-content/60 sm:inline">
              {isTh ? 'ความร่วมมือกับ' : 'In partnership with'}
            </span>
            <Image
              src="/images/partners/proxmox-reseller.png"
              alt={isTh ? 'Proxmox Authorized Reseller' : 'Proxmox Authorized Reseller'}
              width={150}
              height={48}
              className="h-9 w-auto sm:h-10"
              priority
            />
          </div>
        </div>
      </section>

      {/* 2) Headline + intro */}
      <section className="section-padding bg-base-100">
        <div className="container-custom max-w-4xl">
          <span className="eyebrow">{isTh ? 'ตัวแทนจำหน่ายที่ได้รับอนุญาต' : 'Authorized Reseller'}</span>
          <h1 className="display-heading mt-4 text-4xl sm:text-5xl lg:text-6xl">
            {isTh
              ? 'เวอร์ชวลไลเซชันระดับองค์กรด้วย Proxmox Virtual Environment'
              : 'Enterprise Virtualization with Proxmox Virtual Environment'}
          </h1>
          <div className="rule-accent mt-6" />
          <p className="mt-6 text-lg leading-relaxed text-base-content/80">
            {isTh
              ? 'ในฐานะตัวแทนจำหน่ายอย่างเป็นทางการของ Proxmox Server Solutions ทีม ThinkSpace ออกแบบ ติดตั้ง และดูแลแพลตฟอร์มเวอร์ชวลไลเซชันแบบโอเพนซอร์สที่พร้อมใช้งานในระดับองค์กร เราผสาน Proxmox VE เข้ากับความเชี่ยวชาญด้านคลาวด์ ความปลอดภัย และการประมวลผลสมรรถนะสูงของเรา เพื่อมอบโครงสร้างพื้นฐานที่คุณเป็นเจ้าของและควบคุมได้อย่างเต็มที่ ปราศจาก vendor lock-in'
              : 'As an official reseller of Proxmox Server Solutions, ThinkSpace designs, deploys and operates production-grade open-source virtualization. We pair Proxmox VE with our cloud, security and high-performance computing expertise to deliver infrastructure you fully own and control — free of vendor lock-in.'}
          </p>
        </div>
      </section>

      {/* 3) MANDATORY — Proxmox VE overview + features + reseller services panel + CTA */}
      <section className="section-padding bg-base-200">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Overview + feature grid */}
            <div className="lg:col-span-8">
              <span className="eyebrow">{isTh ? 'แพลตฟอร์มหลัก' : 'The Platform'}</span>
              <h2 className="display-heading mt-4 text-3xl sm:text-4xl">Proxmox Virtual Environment</h2>
              <p className="mt-4 max-w-2xl text-base-content/80">
                {isTh
                  ? 'แพลตฟอร์มจัดการเวอร์ชวลไลเซชันแบบโอเพนซอร์สที่สมบูรณ์ รวมการประมวลผล สตอเรจ และเครือข่ายในโซลูชันเดียว พร้อมการจัดการผ่านเว็บแบบรวมศูนย์'
                  : 'A complete open-source virtualization management platform that unifies compute, storage and networking in one solution with central web-based management.'}
              </p>

              <div className="mt-10 grid gap-px overflow-hidden rounded-box border border-base-300 bg-base-300 sm:grid-cols-2">
                {veFeatures.map((f) => {
                  const Icon = f.icon
                  return (
                    <div key={f.title} className="bg-base-100 p-6">
                      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                      <h3 className="mt-4 font-semibold text-base-content">{f.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-base-content/70">{f.body}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Reseller services value-add panel */}
            <aside className="lg:col-span-4">
              <div className="card-surface sticky top-24 p-7">
                <span className="eyebrow">{isTh ? 'บริการจากตัวแทนจำหน่าย' : 'Reseller Services'}</span>
                <h3 className="display-heading mt-3 text-2xl">
                  {isTh ? 'แพ็กเกจสมัครสมาชิกแบบ B2B' : 'B2B Subscription Tiers'}
                </h3>
                <p className="mt-3 text-sm text-base-content/70">
                  {isTh
                    ? 'การสนับสนุนระดับองค์กร การติดตั้ง และการเข้าถึง Enterprise Repository ผ่าน ThinkSpace'
                    : 'Enterprise support, deployment and Enterprise Repository access, delivered through ThinkSpace.'}
                </p>

                <div className="mt-6 space-y-4">
                  {tiers.map((tier) => (
                    <div
                      key={tier.name}
                      className={`border p-4 ${
                        tier.featured
                          ? 'border-primary bg-primary/5'
                          : 'border-base-300 bg-base-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-base-content">{tier.name}</span>
                        {tier.featured && (
                          <span className="rounded-btn bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-content">
                            {isTh ? 'แนะนำ' : 'Popular'}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-base-content/60">{tier.tagline}</p>
                      <ul className="mt-3 space-y-1.5">
                        {tier.points.map((p) => (
                          <li key={p} className="flex gap-2 text-sm text-base-content/80">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Single dominant CTA */}
                <Link
                  href={`/${locale}/contact`}
                  className="btn btn-primary mt-7 w-full gap-2"
                >
                  {isTh ? 'นัดหมายปรึกษาทางเทคนิค' : 'Schedule a Technical Consult'}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 4) Proxmox Datacenter Manager */}
      <section className="section-padding bg-base-100">
        <div className="container-custom">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="eyebrow">{isTh ? 'การควบคุมแบบรวมศูนย์' : 'Central Control Plane'}</span>
              <h2 className="display-heading mt-4 text-3xl sm:text-4xl">Proxmox Datacenter Manager</h2>
              <p className="mt-5 leading-relaxed text-base-content/80">
                {isTh
                  ? 'จัดการคลัสเตอร์ Proxmox VE หลายชุดจากหน้าจอควบคุมเดียว มองเห็นทรัพยากรทั้งหมดทั่วทั้งดาต้าเซ็นเตอร์ และย้ายเวิร์กโหลดข้ามคลัสเตอร์ได้อย่างราบรื่น ThinkSpace ช่วยวางแผนและกำหนดค่าระนาบควบคุมส่วนกลางให้เหมาะกับขนาดและความต้องการขององค์กรของคุณ'
                  : 'Manage multiple Proxmox VE clusters from a single control plane, with unified visibility across the entire datacenter and seamless workload movement between clusters. ThinkSpace helps you plan and configure this centralized control plane to match the scale and requirements of your organization.'}
              </p>
              <ul className="mt-6 space-y-2">
                {(isTh
                  ? ['มุมมองทรัพยากรแบบรวมศูนย์ทั่วทุกคลัสเตอร์', 'การย้ายเวิร์กโหลดข้ามคลัสเตอร์', 'การจัดการการเข้าถึงและบทบาทแบบรวม']
                  : ['Unified resource view across all clusters', 'Cross-cluster workload migration', 'Consolidated access and role management']
                ).map((p) => (
                  <li key={p} className="flex gap-2 text-base-content/80">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-surface flex aspect-[4/3] items-center justify-center bg-secondary p-10">
              <Gauge className="h-24 w-24 text-primary" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* 5) Optional add-ons */}
      <section className="section-padding bg-base-200">
        <div className="container-custom">
          <div className="max-w-2xl">
            <span className="eyebrow">{isTh ? 'ส่วนเสริม (ตามต้องการ)' : 'Optional Add-ons'}</span>
            <h2 className="display-heading mt-4 text-3xl sm:text-4xl">
              {isTh ? 'ขยายแพลตฟอร์มของคุณ' : 'Extend Your Platform'}
            </h2>
            <p className="mt-4 text-base-content/80">
              {isTh
                ? 'ผลิตภัณฑ์เสริมจาก Proxmox ที่ ThinkSpace สามารถจัดหาและติดตั้งร่วมกับ Proxmox VE'
                : 'Complementary Proxmox products that ThinkSpace can supply and deploy alongside Proxmox VE.'}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {addOns.map((a) => {
              const Icon = a.icon
              return (
                <div key={a.title} className="card-surface p-7">
                  <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-semibold text-base-content">{a.title}</h3>
                  <p className="mt-2 text-base-content/80">{a.body}</p>
                  <ul className="mt-4 space-y-2">
                    {a.features.map((f) => (
                      <li key={f} className="flex gap-2 text-sm text-base-content/80">
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

      {/* 6) Social proof + CTA band */}
      <section className="bg-secondary">
        <div className="container-custom section-padding">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Quote className="h-10 w-10 text-primary" aria-hidden="true" />
              <blockquote className="mt-5 text-2xl font-medium leading-relaxed text-base-100">
                {isTh
                  ? '“ThinkSpace ช่วยให้องค์กรเป็นเจ้าของโครงสร้างพื้นฐานเวอร์ชวลไลเซชันของตนเองอย่างแท้จริง ด้วยแพลตฟอร์มโอเพนซอร์สที่ปลอดภัย พร้อมการสนับสนุนระดับองค์กร”'
                  : '“ThinkSpace helps organizations truly own their virtualization infrastructure — a secure open-source platform backed by enterprise-grade support.”'}
              </blockquote>
              <p className="mt-5 text-sm text-base-100/70">
                {isTh
                  ? 'ออกแบบและดูแลโดยทีมคลาวด์และโครงสร้างพื้นฐานของ ThinkSpace'
                  : 'Designed and operated by the ThinkSpace cloud & infrastructure team.'}
              </p>
            </div>
            <div className="lg:text-right">
              <h2 className="text-3xl font-bold tracking-tight text-base-100 sm:text-4xl">
                {isTh
                  ? 'พร้อมวางแผนสภาพแวดล้อม Proxmox ของคุณแล้วหรือยัง?'
                  : 'Ready to plan your Proxmox environment?'}
              </h2>
              <p className="mt-4 text-base-100/80">
                {isTh
                  ? 'พูดคุยกับวิศวกรของเราเพื่อกำหนดสถาปัตยกรรม การออกใบอนุญาต และเส้นทางการย้ายระบบ'
                  : 'Talk to our engineers about architecture, licensing and your migration path.'}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="btn btn-primary mt-7 gap-2 lg:ml-auto"
              >
                {isTh ? 'นัดหมายปรึกษาทางเทคนิค' : 'Schedule a Technical Consult'}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7) Footer disclosure */}
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
