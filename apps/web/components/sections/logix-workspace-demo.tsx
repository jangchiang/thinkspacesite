'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  MessageSquare, Library, Sparkles, UserCog, Bot, ServerCog,
  Cpu, Search, FileText, Send, Lock, Check, Play, Network, Activity,
} from 'lucide-react'

type Tab = 'chat' | 'knowledge' | 'skills' | 'personas' | 'agents' | 'infrastructure'
const ORDER: Tab[] = ['chat', 'knowledge', 'skills', 'personas', 'agents', 'infrastructure']
const AUTOPLAY_MS = 4200

export function LogixWorkspaceDemo({ isTh }: { isTh: boolean }): React.JSX.Element {
  const [active, setActive] = useState<Tab>('chat')
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()

  // Auto-cycle through the features; pause on hover/focus or reduced-motion.
  useEffect(() => {
    if (paused || reduce) return
    const id = setTimeout(() => {
      setActive((cur) => ORDER[(ORDER.indexOf(cur) + 1) % ORDER.length])
    }, AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [active, paused, reduce])

  const nav: { id: Tab; icon: typeof Library; label: string }[] = [
    { id: 'chat', icon: MessageSquare, label: isTh ? 'แชทใหม่' : 'New chat' },
    { id: 'knowledge', icon: Library, label: isTh ? 'ความรู้' : 'Knowledge' },
    { id: 'skills', icon: Sparkles, label: isTh ? 'สกิล' : 'Skills' },
    { id: 'personas', icon: UserCog, label: isTh ? 'เพอร์โซนา' : 'Personas' },
    { id: 'agents', icon: Bot, label: isTh ? 'เอเจนต์' : 'Agents' },
    { id: 'infrastructure', icon: ServerCog, label: isTh ? 'โครงสร้างพื้นฐาน' : 'Infrastructure' },
  ]

  return (
    <div
      className="overflow-hidden rounded-xl border border-base-300 bg-secondary shadow-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-white/15" />
        <span className="h-3 w-3 rounded-full bg-white/15" />
        <span className="h-3 w-3 rounded-full bg-white/15" />
        <span className="ml-3 text-xs font-medium text-white/45">Logix Workspace · {isTh ? 'ภายในองค์กร' : 'on-premise'}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)]">
        {/* sidebar — clickable */}
        <aside className="border-b border-white/10 p-4 md:border-b-0 md:border-r">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-primary/20 text-primary">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            Logix
          </div>
          <p className="mt-5 px-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/35">
            {isTh ? 'พื้นที่ทำงาน' : 'Workspace'}
          </p>
          <nav className="mt-1.5 flex gap-1.5 overflow-x-auto md:block md:space-y-1 md:overflow-visible">
            {nav.map(({ id, icon: Icon, label }) => {
              const on = active === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActive(id)}
                  aria-pressed={on}
                  className={`relative flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                    on ? 'bg-primary/15 font-medium text-white' : 'text-white/60 hover:bg-white/5 hover:text-white/90'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${on ? 'text-primary' : 'text-white/40'}`} aria-hidden="true" />
                  {label}
                  {on && !paused && !reduce && (
                    <motion.span
                      key={active}
                      className="absolute inset-x-2 bottom-1 hidden h-0.5 origin-left rounded-full bg-primary/70 md:block"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                    />
                  )}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* panel */}
        <div className="relative min-h-[420px] min-w-0 p-4 sm:p-5 md:p-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col"
            >
              <Panel tab={active} isTh={isTh} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// ---- per-feature panels ----------------------------------------------------

function Panel({ tab, isTh }: { tab: Tab; isTh: boolean }): React.JSX.Element {
  if (tab === 'chat') return <ChatPanel isTh={isTh} />
  if (tab === 'knowledge') return <KnowledgePanel isTh={isTh} />
  if (tab === 'skills') return <SkillsPanel isTh={isTh} />
  if (tab === 'personas') return <PersonasPanel isTh={isTh} />
  if (tab === 'agents') return <AgentsPanel isTh={isTh} />
  return <InfraPanel isTh={isTh} />
}

function PanelHead({ title, sub }: { title: string; sub: string }): React.JSX.Element {
  return (
    <div className="mb-5 border-b border-white/10 pb-4">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <p className="mt-0.5 text-xs text-white/50">{sub}</p>
    </div>
  )
}

function ChatPanel({ isTh }: { isTh: boolean }): React.JSX.Element {
  return (
    <>
      <div className="mb-5 flex flex-wrap items-center gap-2 border-b border-white/10 pb-4 text-xs">
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1.5 font-medium text-white/80">
          <Cpu className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> Logix · {isTh ? 'โมเดลส่วนตัว' : 'Private model'}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1.5 font-semibold text-primary">
          <span className="h-2 w-2 rounded-full bg-primary" /> ADE Mode · {isTh ? 'แม่นยำสูง' : 'High accuracy'}
        </span>
      </div>
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-primary/15 px-4 py-3 text-sm text-white/90">
          {isTh ? 'สรุปงานวิจัย Q3 ของเราพร้อมอ้างอิงแหล่งที่มา' : 'Summarize our Q3 research and cite the sources.'}
        </div>
      </div>
      <div className="mt-5 flex gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/55">
            <Search className="h-3 w-3 shrink-0" aria-hidden="true" /> {isTh ? 'กำลังค้นหาในฐานความรู้…' : 'Searching knowledge base…'}
          </span>
          <div className="mt-3 break-words rounded-2xl rounded-tl-sm bg-white/[0.06] px-4 py-3 text-sm leading-relaxed text-white/85">
            {isTh
              ? 'งานวิจัย Q3 มุ่งเน้น 3 ประเด็น: ประสิทธิภาพของโมเดล การประมวลผล on-prem และการกำกับดูแลข้อมูล — สรุปจากเอกสารภายในของคุณ'
              : 'Your Q3 research focused on three themes: model efficiency, on-premise inference, and data governance — drawn from your internal documents.'}
            <div className="mt-3 flex flex-wrap gap-2">
              {['Q3-Research.pdf', 'Inference-Notes.md', 'Governance.docx'].map((s) => (
                <span key={s} className="inline-flex items-center gap-1 rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-[11px] text-primary">
                  <FileText className="h-3 w-3" aria-hidden="true" />{s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto pt-6">
        <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3">
          <span className="text-sm text-white/40">{isTh ? 'ถาม Logix…' : 'Ask Logix…'}</span>
          <span className="ml-auto flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-white">
            <Send className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-white/35">
          <Lock className="h-3 w-3" aria-hidden="true" />
          {isTh ? 'ข้อมูลทั้งหมดอยู่ในโครงสร้างพื้นฐานของคุณ' : 'All data stays inside your own infrastructure.'}
        </p>
      </div>
    </>
  )
}

function KnowledgePanel({ isTh }: { isTh: boolean }): React.JSX.Element {
  const sources = [
    { name: isTh ? 'วิกิองค์กร' : 'Company Wiki', type: 'Wiki', meta: isTh ? '248 หน้า' : '248 pages' },
    { name: isTh ? 'เวกเตอร์งานวิจัย' : 'Research Vectors', type: 'Vectors', meta: '12,480 chunks' },
    { name: isTh ? 'กราฟความรู้องค์กร' : 'Org Knowledge Graph', type: 'Graph', meta: '3,200 nodes' },
    { name: isTh ? 'นโยบายและ SOP' : 'Policies & SOPs', type: 'Vectors', meta: isTh ? '86 เอกสาร' : '86 docs' },
  ]
  return (
    <>
      <PanelHead title={isTh ? 'ฐานความรู้' : 'Knowledge base'} sub={isTh ? 'รวม Wiki + Vectors + Graph ไว้ในที่เดียว' : 'Wiki + Vectors + Graph, unified'} />
      <div className="space-y-2.5">
        {sources.map((s) => (
          <div key={s.name} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
            <Library className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-white/90">{s.name}</span>
            <span className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 text-[10px] text-white/55">{s.type}</span>
            <span className="ml-auto shrink-0 text-xs text-white/45">{s.meta}</span>
          </div>
        ))}
      </div>
      <p className="mt-auto pt-6 text-xs text-white/45">{isTh ? 'เอเจนต์อ้างอิงคำตอบจากแหล่งความรู้เหล่านี้เสมอ' : 'Agents ground every answer in these sources.'}</p>
    </>
  )
}

function SkillsPanel({ isTh }: { isTh: boolean }): React.JSX.Element {
  const skills = isTh
    ? ['สรุปรายงาน', 'สกัดข้อมูลใบแจ้งหนี้', 'ร่างอีเมลตอบลูกค้า', 'แปลเอกสาร', 'สร้างสรุปประจำสัปดาห์', 'จัดหมวดหมู่ทิกเก็ต']
    : ['Summarize report', 'Extract invoice data', 'Draft customer reply', 'Translate document', 'Weekly digest', 'Classify tickets']
  return (
    <>
      <PanelHead title={isTh ? 'สกิล' : 'Skills'} sub={isTh ? 'ระบบอัตโนมัติที่นำกลับมาใช้ซ้ำได้ สร้างและแชร์ได้' : 'Reusable automations — create and share'} />
      <div className="grid grid-cols-2 gap-2.5">
        {skills.map((s) => (
          <div key={s} className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary">
              <Play className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="text-sm text-white/85">{s}</span>
          </div>
        ))}
      </div>
    </>
  )
}

function PersonasPanel({ isTh }: { isTh: boolean }): React.JSX.Element {
  const personas = isTh
    ? [{ n: 'นักวิเคราะห์วิจัย', t: 'อ้างอิงแหล่งข้อมูล เข้มงวด' }, { n: 'เจ้าหน้าที่สนับสนุน', t: 'เป็นมิตร ตรงแบรนด์' }, { n: 'ผู้ตรวจทานกฎหมาย', t: 'ระมัดระวัง ชี้ความเสี่ยง' }]
    : [{ n: 'Research Analyst', t: 'Cites sources, rigorous' }, { n: 'Support Agent', t: 'Friendly, on-brand' }, { n: 'Legal Reviewer', t: 'Cautious, flags risk' }]
  return (
    <>
      <PanelHead title={isTh ? 'เพอร์โซนา' : 'Personas'} sub={isTh ? 'AI เฉพาะทางตามแผนกหรือกรณีใช้งาน' : 'Specialized AI per department or use case'} />
      <div className="space-y-2.5">
        {personas.map((p) => (
          <div key={p.n} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
              <UserCog className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <div className="text-sm font-medium text-white/90">{p.n}</div>
              <div className="text-xs text-white/50">{p.t}</div>
            </div>
            <span className="ml-auto rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] text-primary">{isTh ? 'พร้อมใช้' : 'Active'}</span>
          </div>
        ))}
      </div>
    </>
  )
}

function AgentsPanel({ isTh }: { isTh: boolean }): React.JSX.Element {
  const steps = isTh
    ? [{ l: 'วางแผนงาน', done: true }, { l: 'ค้นหาในฐานความรู้', done: true }, { l: 'เรียกใช้เครื่องมือ: คิวรีฐานข้อมูล', done: true }, { l: 'สังเคราะห์คำตอบ', done: false }]
    : [{ l: 'Plan the task', done: true }, { l: 'Search knowledge base', done: true }, { l: 'Call tool: database query', done: true }, { l: 'Synthesize answer', done: false }]
  return (
    <>
      <PanelHead title={isTh ? 'เอเจนต์กำลังทำงาน' : 'Agent run'} sub={isTh ? 'การใช้เหตุผลและเครื่องมือแบบอัตโนมัติ' : 'Autonomous reasoning and tool use'} />
      <div className="space-y-2">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
            {s.done ? (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary"><Check className="h-3 w-3" aria-hidden="true" /></span>
            ) : (
              <motion.span
                className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
              />
            )}
            <span className={`text-sm ${s.done ? 'text-white/70' : 'text-white'}`}>{s.l}</span>
            {!s.done && <span className="ml-auto text-[11px] text-primary">{isTh ? 'กำลังทำงาน…' : 'running…'}</span>}
          </div>
        ))}
      </div>
    </>
  )
}

function InfraPanel({ isTh }: { isTh: boolean }): React.JSX.Element {
  const models = [
    { n: 'Logix-Private', e: 'vLLM', gpu: 62 },
    { n: 'Llama-3-70B', e: 'Ollama', gpu: 38 },
    { n: 'BGE-M3 (embeddings)', e: 'vLLM', gpu: 24 },
  ]
  return (
    <>
      <PanelHead title={isTh ? 'ตัวจัดการโครงสร้างพื้นฐาน' : 'Infrastructure Manager'} sub={isTh ? 'โมเดลที่รันอยู่ · การกำหนดเส้นทางแบบไฮบริด' : 'Running models · hybrid routing'} />
      <div className="space-y-3">
        {models.map((m) => (
          <div key={m.n} className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Cpu className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="min-w-0 flex-1 truncate font-medium text-white/90">{m.n}</span>
              <span className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 text-[10px] text-white/55">{m.e}</span>
              <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-primary"><span className="h-1.5 w-1.5 rounded-full bg-primary" />{isTh ? 'ทำงาน' : 'running'}</span>
            </div>
            <div className="mt-2.5 flex items-center gap-2">
              <span className="text-[10px] text-white/40">GPU</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.div className="h-full rounded-full bg-primary" initial={{ width: 0 }} animate={{ width: `${m.gpu}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} />
              </div>
              <span className="w-8 text-right text-[10px] text-white/50">{m.gpu}%</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto flex items-center gap-2 pt-5 text-xs text-white/55">
        <Network className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        {isTh ? 'การกำหนดเส้นทางแบบไฮบริด: on-prem ↔ cloud' : 'Hybrid routing: on-prem ↔ cloud'}
        <Activity className="ml-auto h-3.5 w-3.5 text-white/30" aria-hidden="true" />
      </div>
    </>
  )
}
