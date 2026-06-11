import { type Locale } from '@/lib/i18n'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  Library,
  Brain,
  Plug,
  Sparkles,
  UserCog,
  Server,
  Rocket,
  KeyRound,
  Network,
  Building2,
  ServerCog,
  Cloud,
  Check,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import { MatrixGrid } from '@/components/backgrounds/matrix-grid'
import { getProduct } from '@/lib/strapi'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ locale: string }>
}

const iconMap: Record<string, LucideIcon> = {
  Bot, Library, Brain, Plug, Sparkles, UserCog, Server, Rocket, KeyRound, Network,
}

interface PFeature { icon: string; title: string; body: string }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params as { locale: Locale }
  const isTh = locale === 'th'

  return {
    title: isTh ? 'Logix — แพลตฟอร์ม AI อธิปไตย | ThinkSpace' : 'Logix — Sovereign AI Platform | ThinkSpace',
    description: isTh
      ? 'Logix คือโครงสร้างพื้นฐาน AI เชิงเอเจนต์สำหรับองค์กรที่ต้องการเป็นเจ้าของพื้นที่ทำงาน AI ของตนเอง ติดตั้งได้ทั้งบนองค์กรและบนคลาวด์'
      : 'Logix is sovereign agentic AI infrastructure for organizations that want to own their AI workspace, not rent it. Deploy on-premise or on-cloud.',
  }
}

export default async function LogixPage({ params }: Props): Promise<React.JSX.Element> {
  const { locale } = await params as { locale: Locale }
  const isTh = locale === 'th'

  // CMS content (editable in Strapi) — falls back to the in-code defaults below.
  const cms = (await getProduct('logix', locale).catch(() => null)) as Record<string, any> | null

  const fb = {
    eyebrow: isTh ? 'ผลิตภัณฑ์ · Logix' : 'Product · Logix',
    title: isTh ? 'แพลตฟอร์ม AI อธิปไตยของคุณ' : 'Your Sovereign AI Platform',
    intro: isTh
      ? 'Logix คือโครงสร้างพื้นฐาน AI เชิงเอเจนต์สำหรับองค์กรที่ต้องการ "เป็นเจ้าของ" พื้นที่ทำงาน AI ของตนเอง ไม่ใช่แค่เช่าใช้ มอบพื้นที่ทำงาน AI แบบเดียวกับ Claude.ai หรือ ChatGPT ให้ทีมของคุณ พร้อมการควบคุมข้อมูล ความรู้ และโครงสร้างพื้นฐานได้อย่างเต็มที่'
      : 'Logix is sovereign agentic AI infrastructure for organizations that want to own their AI workspace, not rent it. Give your teams an AI workspace like Claude.ai or ChatGPT with full control over your data, knowledge, and infrastructure.',
    ctaLabel: isTh ? 'ติดต่อเรา' : 'Get Started',
    features: [
      { icon: 'Bot', title: 'Agentic AI Harness', body: isTh ? 'การประสานงานเอเจนต์ การใช้เหตุผล และการเรียกใช้เครื่องมืออัตโนมัติ' : 'Orchestration, reasoning, and tool use across autonomous agents.' },
      { icon: 'Library', title: isTh ? 'ระบบความรู้แบบรวมศูนย์' : 'Unified Knowledge System', body: isTh ? 'รวม Wiki, Vectors และ Graph ไว้ในระบบเดียว' : 'Wiki, Vectors, and Graph unified into a single knowledge layer.' },
      { icon: 'Brain', title: isTh ? 'หน่วยความจำสามชั้น' : 'Triple Memory', body: isTh ? 'Episodic + Semantic + Procedural เพื่อความต่อเนื่องของบริบท' : 'Episodic, Semantic, and Procedural memory for durable context.' },
      { icon: 'Plug', title: 'MCP Hub', body: isTh ? 'โปรโตคอลมาตรฐานสำหรับการเชื่อมต่อเครื่องมือ' : 'A standard protocol hub for integrating tools.' },
      { icon: 'Sparkles', title: 'Skills + Marketplace', body: isTh ? 'ระบบอัตโนมัติที่ผู้ใช้สร้างเองและแชร์ได้' : 'User-created, shareable automation skills.' },
      { icon: 'UserCog', title: 'Personas', body: isTh ? 'กำหนดบุคลิก AI ได้ตามแต่ละกรณีการใช้งาน' : 'Configurable AI personas tailored per use case.' },
      { icon: 'Server', title: isTh ? 'ตัวจัดการโครงสร้างพื้นฐาน' : 'Infrastructure Manager', body: isTh ? 'GUI สำหรับจัดการ vLLM / Ollama / SGLang' : 'A GUI for managing vLLM, Ollama, and SGLang.' },
      { icon: 'Rocket', title: isTh ? 'ติดตั้งในคลิกเดียว' : 'One-Click Deployment', body: isTh ? 'แคตตาล็อกแอป AI พร้อมรองรับ repo ที่กำหนดเอง' : 'A catalog of AI apps plus support for custom repos.' },
      { icon: 'KeyRound', title: isTh ? 'ระบบ API Token' : 'API Token System', body: isTh ? 'ให้แอปภายนอกเชื่อมต่อผ่าน API ได้อย่างปลอดภัย' : 'Let external applications integrate securely via API.' },
      { icon: 'Network', title: isTh ? 'การกำหนดเส้นทาง LLM แบบไฮบริด' : 'Hybrid LLM Routing', body: isTh ? 'กำหนดเส้นทางระหว่าง Cloud และ On-Premise อย่างโปร่งใส' : 'Transparent routing between Cloud and On-Premise models.' },
    ] as PFeature[],
  }

  const nonEmpty = (a: unknown[] | undefined | null) => (Array.isArray(a) && a.length > 0 ? a : null)
  const data = {
    eyebrow: cms?.eyebrow || fb.eyebrow,
    title: cms?.title || fb.title,
    intro: cms?.intro || fb.intro,
    ctaLabel: cms?.ctaLabel || fb.ctaLabel,
    features: (nonEmpty(cms?.features) as PFeature[]) || fb.features,
  }

  const techStack = (nonEmpty(cms?.extra?.techStack) as string[]) || [
    'Next.js 15',
    'Bun + Elysia',
    'PostgreSQL + pgvector + Apache AGE',
    'vLLM · LiteLLM · BGE-M3 · MCP',
    'Docker · Cloudflare Tunnel · Caddy',
  ]

  const heroChips = isTh
    ? ['เอเจนต์ AI', 'อธิปไตยข้อมูล', 'On-Prem + On-Cloud', 'โอเพนซอร์ส']
    : ['Agentic AI', 'Data Sovereignty', 'On-Prem + On-Cloud', 'Open Source']

  return (
    <main className="bg-base-100">
      {/* Dark matrix hero */}
      <section className="relative overflow-hidden bg-secondary text-white">
        <MatrixGrid />
        <div className="container-custom relative z-10 py-20 md:py-28 lg:py-32">
          <div className="max-w-3xl animate-fade-in-up">
            <span className="eyebrow !text-primary">
              <span className="rule-accent" />
              {data.eyebrow}
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              {isTh ? (
                <>แพลตฟอร์ม <span className="text-primary">AI อธิปไตย</span> ของคุณ</>
              ) : (
                <>Your Sovereign <span className="text-primary">AI Platform</span></>
              )}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{data.intro}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href={`/${locale}/contact`} className="btn btn-primary btn-md gap-2 md:btn-lg">
                {data.ctaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={`/${locale}/products`}
                className="btn btn-outline btn-md gap-2 border-white/40 text-white hover:border-primary hover:bg-primary/10 hover:text-white md:btn-lg"
              >
                {isTh ? 'ผลิตภัณฑ์ทั้งหมด' : 'All Products'}
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-2.5">
              {heroChips.map((c) => (
                <span key={c} className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/80">
                  {c}
                </span>
              ))}
            </div>

            <p className="mt-8 text-sm text-white/55">
              {isTh
                ? 'พัฒนาและเป็นเจ้าของโดย ThinkSpace · เริ่มติดตั้งใช้งานครั้งแรกที่มหาวิทยาลัยทักษิณ'
                : 'Built and owned by ThinkSpace · Initial deployment at Thaksin University.'}
            </p>
          </div>
        </div>
      </section>

      {/* On-premise vs On-cloud */}
      <section className="section-padding bg-base-200">
        <div className="container-custom">
          <div className="max-w-2xl">
            <span className="eyebrow">{isTh ? 'การติดตั้งใช้งาน' : 'Deployment'}</span>
            <h2 className="display-heading mt-4 text-3xl sm:text-4xl lg:text-5xl">
              {isTh ? 'ภายในองค์กร หรือ บนคลาวด์' : 'On-Premise or On-Cloud'}
            </h2>
            <div className="rule-accent mt-6" />
            <p className="mt-6 text-lg text-base-content/70">
              {isTh
                ? 'Logix รองรับทั้งสองรูปแบบ และกำหนดเส้นทางคำขอระหว่างทั้งสองอย่างโปร่งใสด้วย Hybrid LLM Routing'
                : 'Logix supports both, and routes requests transparently between them with Hybrid LLM Routing.'}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="card-surface flex flex-col p-8">
              <span className="flex h-12 w-12 items-center justify-center border border-base-300 bg-base-100 text-primary">
                <ServerCog className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-base-content">
                {isTh ? 'ติดตั้งภายในองค์กร (On-Premise)' : 'On-Premise'}
              </h3>
              <p className="mt-3 leading-relaxed text-base-content/70">
                {isTh
                  ? 'รันโมเดลและข้อมูลทั้งหมดภายในศูนย์ข้อมูลของคุณ เพื่ออธิปไตยข้อมูลสูงสุด ควบคุมต้นทุน และความเป็นส่วนตัวระดับองค์กร'
                  : 'Run models and data entirely inside your own datacenter for maximum data sovereignty, cost control, and enterprise privacy.'}
              </p>
              <ul className="mt-5 space-y-2.5">
                {(isTh
                  ? ['ข้อมูลไม่ออกจากองค์กร', 'รองรับ vLLM / Ollama / SGLang', 'ควบคุมโครงสร้างพื้นฐานเต็มรูปแบบ']
                  : ['Data never leaves your organization', 'vLLM / Ollama / SGLang serving', 'Full infrastructure control']
                ).map((p) => (
                  <li key={p} className="flex gap-2.5 text-sm text-base-content/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-surface flex flex-col p-8">
              <span className="flex h-12 w-12 items-center justify-center border border-base-300 bg-base-100 text-primary">
                <Cloud className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-base-content">
                {isTh ? 'บนคลาวด์ (On-Cloud)' : 'On-Cloud'}
              </h3>
              <p className="mt-3 leading-relaxed text-base-content/70">
                {isTh
                  ? 'เริ่มต้นได้รวดเร็วและขยายตามต้องการ ผสานโมเดลคลาวด์ชั้นนำเข้ากับเวิร์กโหลดของคุณได้อย่างยืดหยุ่น'
                  : 'Start fast and scale on demand, blending leading cloud models into your workloads with flexibility.'}
              </p>
              <ul className="mt-5 space-y-2.5">
                {(isTh
                  ? ['ขยายขนาดได้ยืดหยุ่น', 'เริ่มใช้งานได้เร็ว', 'กำหนดเส้นทางแบบไฮบริดร่วมกับ On-Premise']
                  : ['Elastic scaling', 'Fast time to value', 'Hybrid routing with on-premise']
                ).map((p) => (
                  <li key={p} className="flex gap-2.5 text-sm text-base-content/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core capabilities — tightened grid with icon tiles */}
      <section className="section-padding bg-base-100">
        <div className="container-custom">
          <div className="max-w-2xl">
            <span className="eyebrow">{isTh ? 'ความสามารถหลัก' : 'Core Capabilities'}</span>
            <h2 className="display-heading mt-4 text-3xl sm:text-4xl lg:text-5xl">
              {isTh ? 'ทุกอย่างที่จำเป็นสำหรับ AI ระดับองค์กร' : 'Everything you need for enterprise AI'}
            </h2>
            <div className="rule-accent mt-6" />
            <p className="mt-6 text-lg text-base-content/70">
              {isTh
                ? 'แพลตฟอร์มครบวงจรที่รวมการประสานงานเอเจนต์ ความรู้ หน่วยความจำ และการจัดการโครงสร้างพื้นฐานไว้ในที่เดียว'
                : 'A complete platform that unifies agent orchestration, knowledge, memory, and infrastructure management in one place.'}
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.features.map((c) => {
              const Icon = iconMap[c.icon] || Bot
              return (
                <div key={c.title} className="card-surface group flex h-full flex-col p-6">
                  <span className="flex h-11 w-11 items-center justify-center border border-base-300 bg-base-200 text-primary transition-colors duration-300 group-hover:bg-secondary group-hover:text-primary-content">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-semibold text-base-content">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-base-content/70">{c.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tech stack strip */}
      <section className="bg-secondary py-14">
        <div className="container-custom">
          <span className="eyebrow !text-primary">{isTh ? 'สถาปัตยกรรม' : 'Architecture'}</span>
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-3">
            {techStack.map((t, i) => (
              <span key={t} className="flex items-center gap-3">
                <span className="text-sm font-medium text-white/85 md:text-base">{t}</span>
                {i < techStack.length - 1 && <span className="text-white/30">·</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — dark matrix band */}
      <section className="relative overflow-hidden bg-secondary text-white">
        <MatrixGrid />
        <div className="container-custom relative z-10 section-padding">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="flex h-12 w-12 items-center justify-center border border-white/15 bg-white/[0.04] text-primary">
                <Building2 className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
                {isTh
                  ? 'พร้อมเป็นเจ้าของพื้นที่ทำงาน AI ขององค์กรคุณแล้วหรือยัง'
                  : 'Ready to own your organization’s AI workspace?'}
              </h2>
              <p className="mt-4 max-w-xl text-white/75">
                {isTh
                  ? 'พูดคุยกับทีมของเราเกี่ยวกับการนำ Logix ไปใช้ทั้งบนองค์กรหรือบนคลาวด์ ปัจจุบันเริ่มติดตั้งใช้งานครั้งแรกที่มหาวิทยาลัยทักษิณ'
                  : 'Talk to our team about deploying Logix on-premise or on-cloud. Logix is currently in initial deployment at Thaksin University.'}
              </p>
              <Link href={`/${locale}/contact`} className="btn btn-primary mt-8 gap-2">
                {data.ctaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <ul className="space-y-4 lg:justify-self-end">
              {(isTh
                ? ['เป็นเจ้าของพื้นที่ทำงาน AI ไม่ใช่แค่เช่าใช้', 'ควบคุมข้อมูล ความรู้ และโครงสร้างพื้นฐานเต็มที่', 'ติดตั้งได้ทั้งภายในองค์กรและบนคลาวด์']
                : ['Own your AI workspace, never just rent it', 'Full control over data, knowledge & infrastructure', 'Deploy on-premise or on-cloud']
              ).map((p) => (
                <li key={p} className="flex items-start gap-3 text-white/85">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
