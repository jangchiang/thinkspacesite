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
  Cpu,
  Target,
  FileText,
  Database,
  Code2,
  GraduationCap,
  Lock,
  Users,
  FileCheck,
  type LucideIcon,
} from 'lucide-react'
import { MatrixGrid } from '@/components/backgrounds/matrix-grid'
import { getProduct } from '@/lib/strapi'
import { FaqSection, type FaqItem } from '@/components/sections/faq-section'
import { ComparisonTable } from '@/components/sections/comparison-table'
import { LogixWorkspaceDemo } from '@/components/sections/logix-workspace-demo'
import { CapabilityGrid } from '@/components/sections/capability-grid'
import { RoadmapTimeline, type RoadmapNode } from '@/components/sections/roadmap-timeline'
import { JsonLd, productJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'

export const dynamic = 'force-dynamic'
// Render dynamically but reuse cached CMS responses (revalidate + tags) — fast TTFB, no per-request Strapi round-trips.
export const fetchCache = 'default-cache'

type Props = {
  params: Promise<{ locale: string }>
}

const iconMap: Record<string, LucideIcon> = {
  Bot, Library, Brain, Plug, Sparkles, UserCog, Server, Rocket, KeyRound, Network,
  ServerCog, ShieldCheck, Cloud, Building2,
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


  const heroChips = isTh
    ? ['เอเจนต์ AI', 'อธิปไตยข้อมูล', 'On-Prem + On-Cloud']
    : ['Agentic AI', 'Data Sovereignty', 'On-Prem + On-Cloud']

  // Lifecycle pillars — prefer structured CMS field → extra JSON → in-code default
  const pillars = (Array.isArray(cms?.pillars) && cms.pillars.length > 0
    ? cms.pillars.map((p: any) => ({ icon: p.icon, title: p.title, tagline: p.tagline, points: String(p.points || '').split('\n').map((s: string) => s.trim()).filter(Boolean) }))
    : (nonEmpty(cms?.extra?.pillars) as any[])) || [
    {
      icon: 'Sparkles',
      title: isTh ? 'สร้าง' : 'Build',
      tagline: isTh ? 'ประกอบเอเจนต์ ความรู้ และสกิลเข้าด้วยกัน' : 'Compose agents, knowledge & skills',
      points: isTh
        ? ['Agentic AI harness สำหรับการใช้เหตุผลและเครื่องมือ', 'ระบบความรู้รวม: Wiki + Vectors + Graph', 'หน่วยความจำสามชั้นเพื่อบริบทที่ต่อเนื่อง', 'สกิล, MCP และเพอร์โซนาที่ปรับแต่งได้']
        : ['Agentic AI harness for reasoning & tools', 'Unified knowledge: Wiki + Vectors + Graph', 'Triple memory for durable context', 'Skills, MCP & configurable personas'],
    },
    {
      icon: 'ServerCog',
      title: isTh ? 'ติดตั้ง' : 'Deploy',
      tagline: isTh ? 'รันที่ใดก็ได้ที่คุณเลือก' : 'Run anywhere you choose',
      points: isTh
        ? ['ติดตั้งในคลิกเดียวจากแคตตาล็อกแอป AI', 'Infrastructure Manager: vLLM / Ollama / SGLang', 'กำหนดเส้นทาง LLM แบบไฮบริด (คลาวด์ + ออนพรีม)', 'ติดตั้งบนองค์กรหรือบนคลาวด์']
        : ['One-click deployment from an AI app catalog', 'Infrastructure Manager: vLLM / Ollama / SGLang', 'Hybrid LLM routing (cloud + on-prem)', 'Deploy on-premise or on-cloud'],
    },
    {
      icon: 'ShieldCheck',
      title: isTh ? 'กำกับดูแล' : 'Govern',
      tagline: isTh ? 'เป็นเจ้าของและควบคุมทุกอย่าง' : 'Own & control everything',
      points: isTh
        ? ['ข้อมูล โมเดล และความรู้เป็นของคุณ', 'ควบคุมการเข้าถึงด้วยระบบ API token', 'ไม่มีการผูกขาดกับผู้ขาย (โอเพนซอร์ส)', 'รองรับสภาพแวดล้อมแบบ air-gapped']
        : ['Your data, models & knowledge stay yours', 'Access control via API token system', 'No vendor lock-in (open source)', 'Air-gapped capable'],
    },
  ]

  // Use cases — prefer structured CMS field → extra JSON → in-code default
  const useCases = (Array.isArray(cms?.useCases) && cms.useCases.length > 0
    ? cms.useCases.map((u: any) => ({ icon: u.icon, title: u.title, body: u.body }))
    : (nonEmpty(cms?.extra?.useCases) as any[])) || [
    { icon: 'Brain', title: isTh ? 'ผู้ช่วยวิจัยและความรู้' : 'Research & knowledge copilots', body: isTh ? 'ค้นหาและสังเคราะห์ความรู้ภายในองค์กรด้วยเอเจนต์ที่อ้างอิงแหล่งข้อมูลของคุณ' : 'Search and synthesize internal knowledge with agents grounded in your own sources.' },
    { icon: 'UserCog', title: isTh ? 'ผู้ช่วยสนับสนุนนักศึกษาและลูกค้า' : 'Student & customer support', body: isTh ? 'ผู้ช่วยตอบคำถามตลอด 24 ชม. ที่เข้าใจบริบทและนโยบายขององค์กร' : '24/7 assistants that understand your context, policies and tone.' },
    { icon: 'Library', title: isTh ? 'วิเคราะห์เอกสารและข้อมูล' : 'Document & data analysis', body: isTh ? 'สรุป สกัด และถามตอบกับเอกสารและชุดข้อมูลขนาดใหญ่ด้วย RAG' : 'Summarize, extract and query large document sets and data with RAG.' },
    { icon: 'Sparkles', title: isTh ? 'ระบบอัตโนมัติของงานภายใน' : 'Internal workflow automation', body: isTh ? 'สร้างสกิลที่นำกลับมาใช้ซ้ำเพื่ออัตโนมัติงานที่ทำซ้ำ ๆ ของทีม' : 'Build reusable skills to automate repetitive team workflows.' },
    { icon: 'Plug', title: isTh ? 'โคไพลอตเฉพาะทางด้วยเพอร์โซนา' : 'Domain copilots via personas', body: isTh ? 'กำหนดเพอร์โซนา AI ที่เชี่ยวชาญเฉพาะแผนกหรือกรณีการใช้งาน' : 'Configure expert AI personas specialized per department or use case.' },
    { icon: 'KeyRound', title: isTh ? 'ถามตอบข้อมูลภายในอย่างปลอดภัย' : 'Secure private-data Q&A', body: isTh ? 'ให้ทีมถามตอบกับข้อมูลที่ละเอียดอ่อนได้โดยข้อมูลไม่ออกนอกองค์กร' : 'Let teams ask questions of sensitive data without it ever leaving your walls.' },
  ]

  const faqs: FaqItem[] = (Array.isArray(cms?.faqs) && cms.faqs.length > 0
    ? cms.faqs.map((f: any) => ({ q: f.question, a: f.answer }))
    : (nonEmpty(cms?.extra?.faqs) as FaqItem[])) || (isTh
    ? [
        { q: 'คำว่า “อธิปไตย (Sovereign)” หมายความว่าอย่างไร', a: 'องค์กรของคุณเป็นเจ้าของและโฮสต์แพลตฟอร์มเอง ข้อมูล โมเดล และความรู้ทั้งหมดอยู่ภายในโครงสร้างพื้นฐานของคุณ ไม่ออกไปสู่บุคคลที่สาม' },
        { q: 'Logix ติดตั้งภายในองค์กรแบบ Air-gapped ได้ไหม', a: 'ได้ Logix ติดตั้งได้ทั้งบนองค์กร บนคลาวด์ หรือแบบไฮบริด และรองรับสภาพแวดล้อมแบบปิด (air-gapped) อย่างสมบูรณ์' },
        { q: 'Logix รองรับโมเดล LLM ใดบ้าง', a: 'รองรับโมเดลโอเพนซอร์สผ่าน vLLM, Ollama และ SGLang รวมถึงโมเดลบนคลาวด์ผ่านการกำหนดเส้นทางแบบไฮบริด (LiteLLM)' },
        { q: 'ข้อมูลขององค์กรถูกเก็บเป็นความลับอย่างไร', a: 'ข้อมูล เวกเตอร์ และฐานความรู้ทั้งหมดอยู่ในฐานข้อมูลของคุณ ไม่มีการเรียกออกภายนอก เว้นแต่คุณเลือกกำหนดเส้นทางไปยังโมเดลบนคลาวด์เอง' },
        { q: 'ทีมงานใช้ Logix ในแต่ละวันอย่างไร', a: 'เป็นพื้นที่ทำงาน AI คล้าย ChatGPT หรือ Claude พร้อมเอเจนต์ สกิล เพอร์โซนา และระบบความรู้แบบรวมศูนย์' },
        { q: 'การติดตั้งและดูแลระบบเป็นอย่างไร', a: 'มีแคตตาล็อกติดตั้งในคลิกเดียวและ Infrastructure Manager แบบ GUI โดยทีม ThinkSpace ช่วยดูแลการนำไปใช้งาน' },
      ]
    : [
        { q: 'What does “sovereign” actually mean?', a: 'Your organization owns and hosts the platform. Your data, models, and knowledge stay inside your own infrastructure and never leave to a third party.' },
        { q: 'Can Logix run fully on-premise / air-gapped?', a: 'Yes. Logix deploys on-premise, on-cloud, or hybrid, and fully supports air-gapped environments.' },
        { q: 'Which LLMs does Logix support?', a: 'Open models via vLLM, Ollama, and SGLang, plus cloud models through transparent hybrid routing (LiteLLM).' },
        { q: 'How is our data kept private?', a: 'All data, vectors, and knowledge live in your own database. There are no external calls unless you explicitly route to a cloud model.' },
        { q: 'How do teams use it day-to-day?', a: 'It’s an AI workspace like ChatGPT or Claude — with agents, skills, personas, and a unified knowledge system.' },
        { q: 'How is it deployed and maintained?', a: 'A one-click deployment catalog plus an Infrastructure Manager GUI, with ThinkSpace supporting your rollout.' },
      ])

  const compareColumns = [
    { label: isTh ? 'Logix (อธิปไตย)' : 'Logix (Sovereign)', highlight: true },
    { label: isTh ? 'AI คลาวด์สาธารณะ' : 'Public Cloud AI' },
  ]
  const compareRows = isTh
    ? [
        { feature: 'ข้อมูลอยู่ในโครงสร้างพื้นฐานของคุณ', values: [true, false] },
        { feature: 'ติดตั้ง On-Prem / Air-gapped', values: [true, false] },
        { feature: 'เป็นเจ้าของโมเดลและความรู้', values: ['เป็นเจ้าของ', 'เช่าใช้'] },
        { feature: 'เอเจนต์ สกิล และเพอร์โซนาที่ปรับแต่งได้', values: [true, 'จำกัด'] },
        { feature: 'กำหนดเส้นทาง LLM แบบไฮบริด', values: [true, false] },
        { feature: 'รูปแบบค่าใช้จ่าย', values: ['โครงสร้างพื้นฐานของคุณเอง', 'รายเดือนต่อผู้ใช้'] },
        { feature: 'การผูกขาดกับผู้ขาย', values: ['ไม่มี (โอเพนซอร์ส)', 'สูง'] },
      ]
    : [
        { feature: 'Data stays in your infrastructure', values: [true, false] },
        { feature: 'On-premise / air-gapped deployment', values: [true, false] },
        { feature: 'Own the models & knowledge', values: ['Own', 'Rent'] },
        { feature: 'Custom agents, skills & personas', values: [true, 'Limited'] },
        { feature: 'Hybrid LLM routing (cloud + on-prem)', values: [true, false] },
        { feature: 'Cost model', values: ['Your own infrastructure', 'Recurring per-seat'] },
        { feature: 'Vendor lock-in', values: ['None (open source)', 'High'] },
      ]

  const structuredData = [
    breadcrumbJsonLd(locale, [
      { name: isTh ? 'ผลิตภัณฑ์' : 'Products', path: '/products' },
      { name: 'Logix', path: '/products/logix' },
    ]),
    productJsonLd({
      locale,
      name: 'Logix — Sovereign AI Platform',
      description: data.intro,
      path: '/products/logix',
      category: 'BusinessApplication',
    }),
    faqJsonLd(faqs),
  ]

  // Product roadmap (grounded in the real phase plan: v1.0 live, platform rolling out, clients + ecosystem next)
  const roadmap: RoadmapNode[] = (Array.isArray(cms?.roadmap) && cms.roadmap.length > 0
    ? cms.roadmap.map((n: any) => ({ milestone: n.milestone, status: n.status, statusLabel: n.statusLabel, features: String(n.features || '').split('\n').map((s: string) => s.trim()).filter(Boolean) }))
    : (nonEmpty(cms?.extra?.roadmap) as RoadmapNode[])) || [
    {
      milestone: isTh ? 'พร้อมใช้งานแล้ว · v1.0' : 'Available now · v1.0',
      status: 'live', statusLabel: isTh ? 'ใช้งานจริง' : 'Live',
      features: isTh
        ? ['พื้นที่ทำงาน AI อธิปไตย', 'แชท + RAG พร้อมการอ้างอิง', 'ความรู้ หน่วยความจำ และเพอร์โซนา', 'หลายผู้เช่า ติดตั้งในองค์กร']
        : ['Sovereign AI workspace', 'Chat + RAG with citations', 'Knowledge, memory & personas', 'Multi-tenant, on-premise'],
    },
    {
      milestone: isTh ? 'เร็ว ๆ นี้ · v1.5' : 'Coming soon · v1.5',
      status: 'soon', statusLabel: isTh ? 'กำลังจะมา' : 'Coming soon',
      features: isTh
        ? ['API ที่เข้ากันได้กับ OpenAI', 'ตัวเชื่อมต่อข้อมูลสด', 'โหมด ADE ความแม่นยำสูง', 'การกำกับดูแล + SSO ระดับองค์กร']
        : ['OpenAI-compatible API', 'Live Data Connectors', 'ADE high-accuracy mode', 'Enterprise SSO & governance'],
    },
    {
      milestone: isTh ? 'ถัดไป · v2.0' : 'Next · v2.0',
      status: 'soon', statusLabel: isTh ? 'กำลังจะมา' : 'Coming soon',
      features: isTh
        ? ['กราฟความรู้', 'จัดการ GPU คลัสเตอร์', 'มาร์เก็ตเพลสสกิล', 'แอปมือถือ (iOS + Android)']
        : ['Knowledge graph', 'GPU cluster management', 'Skills marketplace', 'Mobile apps (iOS + Android)'],
    },
    {
      milestone: isTh ? 'แผนงาน · v2.5+' : 'Roadmap · v2.5+',
      status: 'planned', statusLabel: isTh ? 'ในแผนงาน' : 'Planned',
      features: isTh
        ? ['แอปเดสก์ท็อป + CLI', 'อะแดปเตอร์โมเดล/มีเดียเพิ่มเติม', 'ระบบนิเวศและการขยายขนาด']
        : ['Desktop app + CLI', 'More model & media adapters', 'Ecosystem & scale'],
    },
  ]

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
                ? 'ออกแบบมาเพื่อ SME องค์กรธุรกิจ หน่วยงานภาครัฐ และองค์กรที่ต้องการความเป็นส่วนตัวของข้อมูลอย่างเข้มงวด'
                : 'Built for SMEs, enterprises, government and organizations with strict data-privacy demands.'}
            </p>
          </div>
        </div>
      </section>

      {/* Product showcase — Logix workspace mockup ("show the product") */}
      <section className="section-padding bg-base-200">
        <div className="container-custom">
          <div className="max-w-2xl">
            <span className="eyebrow text-accent">{isTh ? 'ดูการทำงานจริง' : 'See it in action'}</span>
            <h2 className="display-heading mt-4 text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
              {isTh ? 'พื้นที่ทำงาน AI ที่ทีมของคุณคุ้นเคย' : 'An AI workspace your team already knows'}
            </h2>
            <p className="mt-4 leading-relaxed text-base-content/70">
              {isTh
                ? 'พื้นที่ทำงาน AI ที่ทันสมัยและคุ้นเคย — ทำงานบนความรู้ ข้อมูล และโครงสร้างพื้นฐานขององค์กรคุณเองทั้งหมด เพื่อความเป็นส่วนตัวสูงสุด'
                : 'A familiar, modern AI workspace — running entirely on your own knowledge, data and infrastructure, for maximum privacy.'}
            </p>
          </div>

          <div className="mt-12">
            <LogixWorkspaceDemo isTh={isTh} />
          </div>
        </div>
      </section>

      {/* Grounded answers — RAG with a Sources panel (headline feature) */}
      <section className="section-padding bg-base-100">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow text-accent">{isTh ? 'คำตอบที่ตรวจสอบได้' : 'Grounded answers'}</span>
            <h2 className="display-heading mt-4 text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
              {isTh ? 'ทุกคำตอบอ้างอิงจากเอกสารของคุณเอง' : 'Every answer, grounded in your own documents'}
            </h2>
            <p className="mt-5 leading-relaxed text-base-content/70">
              {isTh
                ? 'อัปโหลดไฟล์แล้ว Logix จะแยก แบ่งส่วน และฝังเวกเตอร์บนเครื่องของคุณเอง (BGE-M3) เมื่อถามคำถาม คุณจะได้คำตอบพร้อมแผงแหล่งที่มาที่ระบุเอกสารและหน้าที่อ้างอิงอย่างชัดเจน ทีมของคุณจึงตรวจสอบได้ ไม่ใช่แค่เชื่อ'
                : 'Upload your files and Logix parses, chunks and embeds them on your own hardware (BGE-M3). Ask a question and get an answer with a Sources panel that cites the exact document and page it came from — so your team can verify, not just trust.'}
            </p>
            <ul className="mt-6 space-y-3">
              {(isTh
                ? ['ฝังเวกเตอร์ในองค์กรด้วย BGE-M3', 'อ้างอิงเอกสารและเลขหน้าที่แน่นอน', 'ข้อมูลไม่ออกนอกองค์กร']
                : ['On-prem embeddings with BGE-M3', 'Cites the exact document and page', 'Nothing leaves your infrastructure']
              ).map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-base-content/75">
                  <FileCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Sources-panel visual */}
          <div className="rounded-xl border border-base-300 bg-base-200/60 p-5 shadow-sm">
            <div className="rounded-lg border border-base-300 bg-base-100 p-4 text-sm leading-relaxed text-base-content/80">
              {isTh
                ? 'งบประมาณ Q3 เพิ่มขึ้น 12% โดยเน้นที่โครงสร้างพื้นฐานและการวิจัย'
                : 'The Q3 budget increased 12%, focused on infrastructure and research.'}
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  { f: 'Q3-Budget.pdf', p: 'p.4' },
                  { f: 'Board-Notes.docx', p: 'p.2' },
                ].map((s) => (
                  <span key={s.f} className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 text-[11px] text-accent">
                    <FileText className="h-3 w-3" aria-hidden="true" />{s.f} · {s.p}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-3 px-1 text-[11px] uppercase tracking-wider text-base-content/45">
              {isTh ? 'แผงแหล่งที่มา' : 'Sources panel'}
            </p>
          </div>
        </div>
      </section>

      {/* Lifecycle pillars — Build · Deploy · Govern */}
      <section className="section-padding bg-base-100">
        <div className="container-custom">
          <div className="max-w-2xl">
            <span className="eyebrow text-accent">{isTh ? 'วงจรชีวิต AI' : 'The AI lifecycle'}</span>
            <h2 className="display-heading mt-4 text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
              {isTh ? 'เป็นเจ้าของ AI ตลอดวงจรชีวิต' : 'Own your AI across its lifecycle'}
            </h2>
            <p className="mt-4 leading-relaxed text-base-content/70">
              {isTh
                ? 'สร้าง ติดตั้ง และกำกับดูแล AI ขององค์กรบนแพลตฟอร์มเดียวที่คุณควบคุมได้เต็มที่'
                : 'Build, deploy and govern your organization’s AI on one platform you fully control.'}
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map((p) => {
              const Icon = iconMap[p.icon] || Sparkles
              return (
                <div key={p.title} className="card-surface flex flex-col bg-base-100 p-7">
                  <span className="inline-flex h-12 w-12 items-center justify-center border border-base-300 bg-primary/5 text-accent">
                    <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-base-content">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-base-content/60">{p.tagline}</p>
                  <ul className="mt-5 space-y-3">
                    {p.points.map((pt: string) => (
                      <li key={pt} className="flex items-start gap-2.5 text-sm text-base-content/75">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
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

          {/* deployment simplicity */}
          <div className="mt-8 flex flex-col items-start gap-4 rounded-xl border border-base-300 bg-base-100 p-6 sm:flex-row sm:items-center">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-base-300 bg-primary/5 text-accent">
              <Rocket className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-semibold text-base-content">{isTh ? 'ติดตั้งเองได้ในไม่ถึงหนึ่งชั่วโมง' : 'Self-host in under an hour'}</h3>
              <p className="mt-1 text-sm leading-relaxed text-base-content/70">
                {isTh
                  ? 'สแตกทั้งหมดติดตั้งด้วยคำสั่ง docker compose เดียว ไม่ต้องใช้ Kubernetes หรือทีม DevOps เฉพาะ และเพราะทุกอย่างอยู่ในฐานข้อมูล PostgreSQL เดียว การสำรองข้อมูลครั้งเดียวก็ครอบคลุมทั้งหมด'
                  : 'The whole stack deploys with a single docker compose command — no Kubernetes, no dedicated DevOps team. And because everything lives in one PostgreSQL database, a single backup captures all of it.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core capabilities — dark grid with cursor-spotlight cards */}
      <section className="relative overflow-hidden bg-secondary py-20 text-white md:py-24">
        <MatrixGrid />
        <div className="container-custom relative z-10">
          <div className="max-w-2xl">
            <span className="eyebrow !text-primary">{isTh ? 'ความสามารถหลัก' : 'Core Capabilities'}</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {isTh ? 'ทุกอย่างที่จำเป็นสำหรับ AI ระดับองค์กร' : 'Everything you need for enterprise AI'}
            </h2>
            <div className="rule-accent mt-6" />
            <p className="mt-6 text-lg text-white/70">
              {isTh
                ? 'แพลตฟอร์มครบวงจรที่รวมการประสานงานเอเจนต์ ความรู้ หน่วยความจำ และการจัดการโครงสร้างพื้นฐานไว้ในที่เดียว'
                : 'A complete platform that unifies agent orchestration, knowledge, memory, and infrastructure management in one place.'}
            </p>
          </div>

          <CapabilityGrid features={data.features} />
        </div>
      </section>

      {/* Built for developers — OpenAI-compatible API */}
      <section className="section-padding bg-base-200">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow text-accent">{isTh ? 'สำหรับนักพัฒนา' : 'Built for developers'}</span>
            <h2 className="display-heading mt-4 text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
              {isTh ? 'API ที่เข้ากันได้กับ OpenAI' : 'An OpenAI-compatible API'}
            </h2>
            <p className="mt-5 leading-relaxed text-base-content/70">
              {isTh
                ? 'ชี้ OpenAI SDK, LangChain หรือ LlamaIndex เดิมของคุณมาที่ Logix เพียงเปลี่ยนบรรทัดเดียว คือ base URL ออก API token ที่กำหนดสิทธิ์และเพิกถอนได้ ทุกการเรียกถูกจำกัดอัตราและบันทึกไว้ — แอปของเราเองก็ใช้ API สาธารณะตัวเดียวกับที่คุณได้รับ'
                : 'Point your existing OpenAI SDKs, LangChain or LlamaIndex at Logix by changing one line — the base URL. Issue scoped, revocable API tokens; every call is rate-limited and audit-logged. Our own apps use the exact same public API you get.'}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-base-content/75">
              {['/v1/chat/completions', '/v1/embeddings', '/v1/models'].map((e) => (
                <span key={e} className="inline-flex items-center gap-1.5 font-mono text-xs">
                  <Code2 className="h-3.5 w-3.5 text-accent" aria-hidden="true" />{e}
                </span>
              ))}
            </div>
          </div>
          {/* code snippet */}
          <div className="overflow-hidden rounded-xl border border-white/10 bg-secondary text-sm shadow-2xl">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-2 text-[11px] text-white/40">python</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed text-white/85"><code>{`from openai import OpenAI

client = OpenAI(
    base_url="https://logix.your-org.com/v1",  `}<span className="text-primary">{`# 👈 the only change`}</span>{`
    api_key="logix-•••••••••••",
)

resp = client.chat.completions.create(
    model="logix-private",
    messages=[{"role": "user", "content": "..."}],
)`}</code></pre>
          </div>
        </div>
      </section>

      {/* Use cases — What teams build with Logix */}
      <section className="section-padding bg-base-200">
        <div className="container-custom">
          <div className="max-w-2xl">
            <span className="eyebrow text-accent">{isTh ? 'กรณีการใช้งาน' : 'Use cases'}</span>
            <h2 className="display-heading mt-4 text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
              {isTh ? 'สิ่งที่ทีมสร้างด้วย Logix' : 'What teams build with Logix'}
            </h2>
            <p className="mt-4 leading-relaxed text-base-content/70">
              {isTh
                ? 'จากผู้ช่วยวิจัยไปจนถึงระบบอัตโนมัติ — พื้นที่ทำงาน AI เดียวสำหรับทั้งองค์กร'
                : 'From research copilots to automation — one AI workspace for the whole organization.'}
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u) => {
              const Icon = iconMap[u.icon] || Sparkles
              return (
                <div key={u.title} className="card-surface bg-base-100 p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center border border-base-300 bg-primary/5 text-accent">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-base-content">{u.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-base-content/70">{u.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Data Connectors — query live operational databases */}
      <section className="section-padding bg-base-100">
        <div className="container-custom">
          <div className="max-w-2xl">
            <span className="eyebrow text-accent">{isTh ? 'ตัวเชื่อมต่อข้อมูล' : 'Data Connectors'}</span>
            <h2 className="display-heading mt-4 text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
              {isTh ? 'เชื่อมต่อฐานข้อมูลสดของคุณ โดยไม่คัดลอกข้อมูล' : 'Connect your live databases — nothing copied'}
            </h2>
            <p className="mt-5 leading-relaxed text-base-content/70">
              {isTh
                ? 'ชี้ Logix ไปยังฐานข้อมูล HR งานขาย คลังสินค้า หรือทะเบียนนักศึกษาที่มีอยู่ แล้วให้ AI ตอบคำถามจากข้อมูลปฏิบัติการจริงแบบเรียลไทม์ การสืบค้นเป็นแบบอ่านอย่างเดียว จำกัดเฉพาะตารางที่อนุญาต และบล็อกคำสั่งที่ทำลายข้อมูล Logix เก็บเพียงค่าการเชื่อมต่อ — ข้อมูลของคุณไม่ออกจากฐานข้อมูลของคุณ'
                : 'Point Logix at your existing HR, sales, inventory or student-records database and let the AI answer questions over real, up-to-the-minute operational data. Queries are read-only, limited to allow-listed tables, and destructive statements are blocked. Logix stores only a connection config — your data never leaves your database.'}
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              { icon: Database, t: isTh ? 'ข้อมูลสด ไม่ใช่สำเนา' : 'Live, not copied', b: isTh ? 'ตอบจากข้อมูลปฏิบัติการจริงแบบเรียลไทม์' : 'Answers over real-time operational data.' },
              { icon: Lock, t: isTh ? 'อ่านอย่างเดียว' : 'Read-only & safe', b: isTh ? 'จำกัดตารางที่อนุญาต บล็อกคำสั่งทำลายข้อมูล' : 'Allow-listed tables; destructive statements blocked.' },
              { icon: ShieldCheck, t: isTh ? 'ข้อมูลอยู่กับคุณ' : 'Data stays put', b: isTh ? 'Logix เก็บเพียงค่าการเชื่อมต่อ ไม่นำเข้าข้อมูล' : 'Logix stores only a connection config — no ingestion.' },
            ].map(({ icon: Icon, t, b }) => (
              <div key={t} className="card-surface bg-base-100 p-6">
                <span className="flex h-11 w-11 items-center justify-center border border-base-300 bg-primary/5 text-accent">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-semibold text-base-content">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-base-content/70">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Logix engine — private model + ADE Mode (flagship) */}
      <section className="relative overflow-hidden bg-secondary py-20 text-white md:py-24">
        <MatrixGrid />
        <div className="container-custom relative z-10">
          <div className="max-w-2xl">
            <span className="eyebrow !text-primary">{isTh ? 'เครื่องยนต์ Logix' : 'The Logix engine'}</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {isTh ? 'โมเดลส่วนตัวของคุณ พร้อมโหมด ADE' : 'Your own private model — with ADE Mode'}
            </h2>
            <p className="mt-4 max-w-xl text-white/70">
              {isTh
                ? 'Logix มาพร้อมโมเดล LLM ส่วนตัวที่รันบนโครงสร้างพื้นฐานของคุณ และโหมด ADE ที่ให้ความแม่นยำสูงพร้อมข้อผิดพลาดที่น้อยลง'
                : 'Logix ships with its own private LLM that runs on your infrastructure — plus ADE Mode for high accuracy with fewer mistakes.'}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {/* Private model */}
            <div className="rounded-xl border border-white/12 bg-white/[0.03] p-7">
              <span className="inline-flex h-12 w-12 items-center justify-center border border-white/15 bg-primary/10 text-primary">
                <Cpu className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{isTh ? 'โมเดล LLM ส่วนตัวของ Logix' : 'The Logix private model'}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {isTh
                  ? 'โมเดลภาษาที่เป็นกรรมสิทธิ์ เปิดตัวพร้อม Logix Native — รันภายในองค์กรของคุณทั้งหมด ข้อมูลไม่ออกนอกองค์กร และปรับแต่งให้เข้ากับโดเมนของคุณได้'
                  : 'A sovereign language model launching with Logix Native — runs entirely inside your organization, your data never leaves, and it tunes to your domain.'}
              </p>
              <ul className="mt-5 space-y-2.5 text-sm text-white/75">
                {(isTh
                  ? ['รันภายในองค์กร / on-premise ทั้งหมด', 'ข้อมูลและความรู้ไม่ออกนอกองค์กร', 'ปรับแต่ง (fine-tune) ตามโดเมนของคุณ', 'ไม่มีค่าใช้จ่ายต่อ token แบบคลาวด์']
                  : ['Runs fully on-premise / in your cloud', 'Data and knowledge never leave your walls', 'Fine-tunes to your domain', 'No per-token cloud cost']
                ).map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ADE Mode — flagship feature */}
            <div className="rounded-xl border border-primary/30 bg-primary/[0.06] p-7">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center border border-primary/30 bg-primary/15 text-primary">
                  <Target className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  {isTh ? 'ฟีเจอร์เด่น' : 'Flagship'}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold">{isTh ? 'โหมด ADE — แม่นยำสูง ผิดพลาดน้อย' : 'ADE Mode — high accuracy, fewer mistakes'}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                {isTh
                  ? 'โหมดความแม่นยำสูงที่ลดข้อผิดพลาดและการให้ข้อมูลที่คลาดเคลื่อน (hallucination) ออกแบบมาสำหรับงานที่ความถูกต้องสำคัญที่สุด'
                  : 'A high-accuracy mode that reduces errors and hallucinations — built for the work where correctness matters most.'}
              </p>
              <ul className="mt-5 space-y-2.5 text-sm text-white/80">
                {(isTh
                  ? ['ความแม่นยำสูงขึ้น ข้อผิดพลาดน้อยลง', 'อ้างอิงจากแหล่งข้อมูลของคุณเสมอ', 'ขั้นตอนการตรวจสอบก่อนตอบ', 'เหมาะกับงานที่สำคัญต่อภารกิจ']
                  : ['Higher accuracy, fewer mistakes', 'Always grounded in your sources', 'Built-in verification before answering', 'For mission-critical work']
                ).map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* How ADE Mode works */}
          <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-7">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {isTh ? 'ADE Mode ทำงานอย่างไร' : 'How ADE Mode works'}
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70">
              {isTh
                ? 'ก่อนตอบ Logix จะแยกคำตอบออกเป็นข้อความย่อยแต่ละข้อ แล้วตรวจสอบกับเอกสารต้นทางของคุณ ข้อความที่ยืนยันไม่ได้จะถูกลดน้ำหนัก และเมื่อไม่มีหลักฐานเพียงพอ Logix จะปฏิเสธที่จะเดา — ผลลัพธ์คือคำตอบที่อ้างอิงจากแหล่งข้อมูลของคุณ หรือคำตอบที่ซื่อสัตย์ว่า “ไม่ทราบ”'
                : 'Before answering, Logix breaks the response into individual claims and checks each one against your source documents. Claims it can’t support are demoted, and when the evidence isn’t there, Logix abstains rather than guesses — answers grounded in your sources, or an honest “I don’t know.”'}
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2.5">
              {(isTh
                ? ['แยกเป็นข้อความย่อย', 'จับคู่กับแหล่งที่มา', 'ลดน้ำหนักข้อที่ยืนยันไม่ได้', 'ปฏิเสธอย่างซื่อสัตย์']
                : ['Decompose into claims', 'Match to sources', 'Demote unsupported', 'Calibrated abstention']
              ).map((s, i) => (
                <span key={s} className="inline-flex items-center gap-2 text-xs text-white/65">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-primary/30 text-[10px] font-semibold text-primary">{i + 1}</span>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <ComparisonTable
        eyebrow={isTh ? 'เปรียบเทียบ' : 'Compare'}
        heading={isTh ? 'อธิปไตย เทียบกับ AI คลาวด์สาธารณะ' : 'Sovereign vs. public cloud AI'}
        subheading={isTh
          ? 'พื้นที่ทำงาน AI ที่คุ้นเคยแบบ ChatGPT/Claude แต่องค์กรเป็นเจ้าของข้อมูล โมเดล และโครงสร้างพื้นฐานเอง'
          : 'A familiar ChatGPT/Claude-style workspace — but your organization owns the data, models, and infrastructure.'}
        columns={compareColumns}
        rows={compareRows}
      />

      {/* Enterprise security */}
      <section className="relative overflow-hidden bg-secondary py-20 text-white md:py-24">
        <MatrixGrid />
        <div className="container-custom relative z-10">
          <div className="max-w-2xl">
            <span className="eyebrow !text-primary">{isTh ? 'ความปลอดภัยระดับองค์กร' : 'Enterprise security'}</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {isTh ? 'ปลอดภัยและแยกข้อมูลตั้งแต่การออกแบบ' : 'Secure and isolated by design'}
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: Users, t: isTh ? 'แยกข้อมูลที่ระดับฐานข้อมูล' : 'Database-enforced isolation', b: isTh ? 'หลายผู้เช่าตั้งแต่วันแรก ด้วย PostgreSQL Row-Level Security การสืบค้นข้ามองค์กรจะไม่คืนข้อมูลใด ๆ ตรวจสอบด้วยชุดทดสอบความปลอดภัยทุกการปล่อยเวอร์ชัน' : 'Multi-tenant from day one with PostgreSQL Row-Level Security — a cross-organization query simply returns nothing, verified by a security regression suite on every release.' },
              { icon: KeyRound, t: isTh ? 'SSO ระดับองค์กร' : 'Enterprise SSO', b: isTh ? 'เข้าสู่ระบบผ่าน OIDC ด้วย Azure AD / Entra, Okta, Google Workspace และ Auth0 พร้อมมุมมอง Sessions ที่เพิกถอนอุปกรณ์ได้ในคลิกเดียว' : 'Single sign-on over OIDC — Azure AD / Entra, Okta, Google Workspace and Auth0 — plus a Sessions view to revoke any device in one click.' },
              { icon: Lock, t: isTh ? 'ควบคุมการเข้าถึงความรู้' : 'Knowledge access control', b: isTh ? 'ทุกเอกสาร เพอร์โซนา และสกิลมีระดับการมองเห็น (ส่วนตัว/แผนก/องค์กร/สาธารณะ) บังคับใช้ที่ระดับฐานข้อมูล ผู้ใช้เห็นเฉพาะที่ได้รับอนุญาต' : 'Every document, persona and skill carries a visibility tier — personal, department, organization or public — enforced at the database level, so people only see what they’re allowed to.' },
            ].map(({ icon: Icon, t, b }) => (
              <div key={t} className="rounded-xl border border-white/12 bg-white/[0.03] p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center border border-white/15 bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for research & universities */}
      <section className="section-padding bg-base-100">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow text-accent">{isTh ? 'เพื่อการวิจัยและมหาวิทยาลัย' : 'Built for research & universities'}</span>
            <h2 className="display-heading mt-4 text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
              {isTh ? 'จากงานวิจัยสู่ต้นฉบับพร้อมตีพิมพ์' : 'From research papers to publication-ready manuscripts'}
            </h2>
            <p className="mt-5 leading-relaxed text-base-content/70">
              {isTh
                ? 'อัปโหลด PDF แล้ว Logix สกัดทั้งรูปภาพ ตาราง สมการ และข้อมูลกราฟ — ไม่ใช่แค่ข้อความ เอกสารถูกเชื่อมเข้ากราฟความรู้พร้อมข้อมูลบรรณานุกรมครบถ้วน และตัวแก้ไขต้นฉบับจัดการการอ้างอิงและส่งออกไปยัง Word, LaTeX พร้อม BibTeX หรือ Overleaf ได้ทันที — พื้นที่ทำงานเดียวตั้งแต่ทบทวนวรรณกรรมจนถึงส่งตีพิมพ์'
                : 'Upload PDFs and Logix extracts the figures, tables, equations and plot data — not just text. Papers are linked into a knowledge graph with full bibliographic metadata, and the manuscript editor manages your citations and exports straight to Word, LaTeX with BibTeX, or Overleaf. One workspace from literature review to submission.'}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: FileText, t: isTh ? 'สกัดรูป/ตาราง/สมการ' : 'Figure & table extraction' },
              { icon: Brain, t: isTh ? 'กราฟความรู้ของงานวิจัย' : 'Research knowledge graph' },
              { icon: GraduationCap, t: isTh ? 'จัดการการอ้างอิง' : 'Citation management' },
              { icon: FileCheck, t: 'Word · LaTeX · BibTeX · Overleaf' },
            ].map(({ icon: Icon, t }) => (
              <div key={t} className="card-surface bg-base-100 p-5">
                <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} aria-hidden="true" />
                <p className="mt-3 text-sm font-medium text-base-content">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap timeline */}
      <section className="relative overflow-hidden bg-secondary py-20 text-white md:py-24">
        <MatrixGrid />
        <div className="container-custom relative z-10">
          <div className="max-w-2xl">
            <span className="eyebrow !text-primary">{isTh ? 'แผนงานผลิตภัณฑ์' : 'Product roadmap'}</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {isTh ? 'ทิศทางของ Logix' : 'Where Logix is headed'}
            </h2>
            <p className="mt-4 max-w-xl text-white/70">
              {isTh
                ? 'แพลตฟอร์มหลักพร้อมใช้งานแล้ววันนี้ และยังมีฟีเจอร์ใหม่ที่กำลังจะมาอย่างต่อเนื่อง'
                : 'The core platform is available today — with new capabilities rolling out continuously.'}
            </p>
          </div>
          <RoadmapTimeline nodes={roadmap} />
        </div>
      </section>

      {/* FAQ */}
      <FaqSection
        eyebrow={isTh ? 'คำถามที่พบบ่อย' : 'FAQ'}
        heading={isTh ? 'คำถามที่พบบ่อยเกี่ยวกับ Logix' : 'Frequently asked questions'}
        faqs={faqs}
        surface="muted"
      />

      {/* Structured data: Product · FAQ · Breadcrumb */}
      <JsonLd data={structuredData} />

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
                  ? 'พูดคุยกับทีมของเราเกี่ยวกับการนำ Logix ไปใช้ทั้งบนองค์กรหรือบนคลาวด์ — ออกแบบมาเพื่อ SME องค์กรธุรกิจ หน่วยงานภาครัฐ และองค์กรที่ต้องการความเป็นส่วนตัวของข้อมูลอย่างเข้มงวด'
                  : 'Talk to our team about deploying Logix on-premise or on-cloud — built for SMEs, enterprises, government and any organization with strict data-privacy demands.'}
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
