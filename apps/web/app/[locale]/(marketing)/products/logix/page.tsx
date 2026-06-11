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
  type LucideIcon,
} from 'lucide-react'
import { getProduct } from '@/lib/strapi'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ locale: Locale }>
}

const iconMap: Record<string, LucideIcon> = {
  Bot, Library, Brain, Plug, Sparkles, UserCog, Server, Rocket, KeyRound, Network,
}

interface PFeature { icon: string; title: string; body: string }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isTh = locale === 'th'

  return {
    title: isTh ? 'Logix — แพลตฟอร์ม AI อธิปไตย | ThinkSpace' : 'Logix — Sovereign AI Platform | ThinkSpace',
    description: isTh
      ? 'Logix คือโครงสร้างพื้นฐาน AI เชิงเอเจนต์สำหรับองค์กรที่ต้องการเป็นเจ้าของพื้นที่ทำงาน AI ของตนเอง ติดตั้งได้ทั้งบนองค์กรและบนคลาวด์'
      : 'Logix is sovereign agentic AI infrastructure for organizations that want to own their AI workspace, not rent it. Deploy on-premise or on-cloud.',
  }
}

export default async function LogixPage({ params }: Props): Promise<React.JSX.Element> {
  const { locale } = await params
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

  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-base-100">
        <div className="container-custom">
          <div className="max-w-3xl">
            <p className="eyebrow">{data.eyebrow}</p>
            <div className="rule-accent" />
            <h1 className="display-heading text-4xl md:text-5xl lg:text-6xl mt-6">{data.title}</h1>
            <p className="mt-6 text-lg md:text-xl text-base-content/70 leading-relaxed">{data.intro}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={`/${locale}/contact`} className="btn btn-primary">
                {data.ctaLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={`/${locale}/products`} className="btn btn-ghost">
                {isTh ? 'ผลิตภัณฑ์ทั้งหมด' : 'All Products'}
              </Link>
            </div>
            <p className="mt-6 text-sm text-base-content/60">
              {isTh
                ? 'พัฒนาและเป็นเจ้าของโดย ThinkSpace · เริ่มติดตั้งใช้งานครั้งแรกที่มหาวิทยาลัยทักษิณ'
                : 'Built and owned by ThinkSpace · Initial deployment at Thaksin University.'}
            </p>
          </div>
        </div>
      </section>

      {/* On-premise vs On-cloud */}
      <section className="section-padding bg-base-200 border-y border-base-300">
        <div className="container-custom">
          <div className="max-w-2xl">
            <p className="eyebrow">{isTh ? 'การติดตั้งใช้งาน' : 'Deployment'}</p>
            <div className="rule-accent" />
            <h2 className="display-heading text-3xl md:text-4xl mt-6">
              {isTh ? 'ภายในองค์กร หรือ บนคลาวด์' : 'On-Premise or On-Cloud'}
            </h2>
            <p className="mt-4 text-base-content/70 leading-relaxed">
              {isTh
                ? 'Logix รองรับทั้งสองรูปแบบ และกำหนดเส้นทางคำขอระหว่างทั้งสองอย่างโปร่งใสด้วย Hybrid LLM Routing'
                : 'Logix supports both, and routes requests transparently between them with Hybrid LLM Routing.'}
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-8">
            <div className="card-surface p-8 bg-base-100">
              <div className="w-12 h-12 flex items-center justify-center bg-secondary/5 text-primary mb-5">
                <ServerCog className="w-6 h-6" />
              </div>
              <h3 className="display-heading text-xl">{isTh ? 'ติดตั้งภายในองค์กร (On-Premise)' : 'On-Premise'}</h3>
              <p className="mt-3 text-base-content/70 leading-relaxed">
                {isTh
                  ? 'รันโมเดลและข้อมูลทั้งหมดภายในศูนย์ข้อมูลของคุณ เพื่ออธิปไตยข้อมูลสูงสุด ควบคุมต้นทุน และความเป็นส่วนตัวระดับองค์กร'
                  : 'Run models and data entirely inside your own datacenter for maximum data sovereignty, cost control, and enterprise privacy.'}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-base-content/70">
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>{isTh ? 'ข้อมูลไม่ออกจากองค์กร' : 'Data never leaves your organization'}</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>{isTh ? 'รองรับ vLLM / Ollama / SGLang' : 'vLLM / Ollama / SGLang serving'}</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>{isTh ? 'ควบคุมโครงสร้างพื้นฐานเต็มรูปแบบ' : 'Full infrastructure control'}</li>
              </ul>
            </div>

            <div className="card-surface p-8 bg-base-100">
              <div className="w-12 h-12 flex items-center justify-center bg-secondary/5 text-primary mb-5">
                <Cloud className="w-6 h-6" />
              </div>
              <h3 className="display-heading text-xl">{isTh ? 'บนคลาวด์ (On-Cloud)' : 'On-Cloud'}</h3>
              <p className="mt-3 text-base-content/70 leading-relaxed">
                {isTh
                  ? 'เริ่มต้นได้รวดเร็วและขยายตามต้องการ ผสานโมเดลคลาวด์ชั้นนำเข้ากับเวิร์กโหลดของคุณได้อย่างยืดหยุ่น'
                  : 'Start fast and scale on demand, blending leading cloud models into your workloads with flexibility.'}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-base-content/70">
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>{isTh ? 'ขยายขนาดได้ยืดหยุ่น' : 'Elastic scaling'}</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>{isTh ? 'เริ่มใช้งานได้เร็ว' : 'Fast time to value'}</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>{isTh ? 'กำหนดเส้นทางแบบไฮบริดร่วมกับ On-Premise' : 'Hybrid routing with on-premise'}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core capabilities */}
      <section className="section-padding bg-base-100">
        <div className="container-custom">
          <div className="max-w-2xl">
            <p className="eyebrow">{isTh ? 'ความสามารถหลัก' : 'Core Capabilities'}</p>
            <div className="rule-accent" />
            <h2 className="display-heading text-3xl md:text-4xl mt-6">
              {isTh ? 'ทุกอย่างที่จำเป็นสำหรับ AI ระดับองค์กร' : 'Everything you need for enterprise AI'}
            </h2>
            <p className="mt-4 text-base-content/70 leading-relaxed">
              {isTh
                ? 'แพลตฟอร์มครบวงจรที่รวมการประสานงานเอเจนต์ ความรู้ หน่วยความจำ และการจัดการโครงสร้างพื้นฐานไว้ในที่เดียว'
                : 'A complete platform that unifies agent orchestration, knowledge, memory, and infrastructure management in one place.'}
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.features.map((c) => {
              const Icon = iconMap[c.icon] || Bot
              return (
                <div key={c.title} className="card-surface p-6">
                  <div className="w-11 h-11 flex items-center justify-center bg-secondary/5 text-primary mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-base-content">{c.title}</h3>
                  <p className="mt-2 text-sm text-base-content/70 leading-relaxed">{c.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tech stack strip */}
      <section className="py-14 bg-secondary">
        <div className="container-custom">
          <p className="eyebrow text-primary/90">{isTh ? 'สถาปัตยกรรม' : 'Architecture'}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-3">
            {techStack.map((t, i) => (
              <span key={t} className="flex items-center gap-3">
                <span className="text-sm md:text-base text-white/85 font-medium">{t}</span>
                {i < techStack.length - 1 && <span className="text-white/30">·</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-base-100">
        <div className="container-custom">
          <div className="card-surface p-10 md:p-14 flex flex-col items-start">
            <div className="w-12 h-12 flex items-center justify-center bg-secondary/5 text-primary mb-6">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="display-heading text-2xl md:text-3xl max-w-2xl">
              {isTh
                ? 'พร้อมเป็นเจ้าของพื้นที่ทำงาน AI ขององค์กรคุณแล้วหรือยัง'
                : 'Ready to own your organization’s AI workspace?'}
            </h2>
            <p className="mt-4 max-w-2xl text-base-content/70 leading-relaxed">
              {isTh
                ? 'พูดคุยกับทีมของเราเกี่ยวกับการนำ Logix ไปใช้ทั้งบนองค์กรหรือบนคลาวด์ ปัจจุบันเริ่มติดตั้งใช้งานครั้งแรกที่มหาวิทยาลัยทักษิณ'
                : 'Talk to our team about deploying Logix on-premise or on-cloud. Logix is currently in initial deployment at Thaksin University.'}
            </p>
            <Link href={`/${locale}/contact`} className="btn btn-primary mt-8">
              {data.ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
