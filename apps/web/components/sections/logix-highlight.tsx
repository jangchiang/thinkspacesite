'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Bot, Network, Brain, Plug, Cloud, Server, ArrowRight } from 'lucide-react'

interface LogixHighlightProps {
  locale: 'en' | 'th'
}

export function LogixHighlight({ locale }: LogixHighlightProps) {
  const isTh = locale === 'th'
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const features = [
    {
      icon: Bot,
      title: isTh ? 'Agentic AI Harness' : 'Agentic AI Harness',
      desc: isTh
        ? 'การประสานงาน การให้เหตุผล และการใช้เครื่องมือ'
        : 'Orchestration, reasoning, and tool use',
    },
    {
      icon: Network,
      title: isTh ? 'Unified Knowledge System' : 'Unified Knowledge System',
      desc: isTh
        ? 'Wiki + Vectors + Graph ในระบบเดียว'
        : 'Wiki + Vectors + Graph in one',
    },
    {
      icon: Brain,
      title: isTh ? 'Triple Memory' : 'Triple Memory',
      desc: isTh
        ? 'Episodic + Semantic + Procedural'
        : 'Episodic + Semantic + Procedural',
    },
    {
      icon: Plug,
      title: isTh ? 'MCP Hub' : 'MCP Hub',
      desc: isTh
        ? 'โปรโตคอลมาตรฐานสำหรับเชื่อมต่อเครื่องมือ'
        : 'Standard tool integration protocol',
    },
  ]

  return (
    <section className="bg-secondary text-white">
      <div className="container-custom section-padding">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid gap-12 lg:grid-cols-12 lg:gap-16"
        >
          {/* Left: positioning */}
          <div className="lg:col-span-5">
            <p className="eyebrow">{isTh ? 'ผลิตภัณฑ์ของเรา' : 'Our Product'}</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {isTh ? (
                <>
                  Logix — แพลตฟอร์ม AI-native{' '}
                  <span className="text-primary">ที่เป็นอธิปไตยของคุณ</span>
                </>
              ) : (
                <>
                  Logix — sovereign{' '}
                  <span className="text-primary">AI-native platform</span>
                </>
              )}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              {isTh
                ? 'เป็นเจ้าของพื้นที่ทำงาน AI ของคุณเอง ไม่ใช่แค่เช่าใช้ — โครงสร้างพื้นฐาน AI แบบ agentic ที่ให้องค์กรควบคุมข้อมูล ความรู้ และโครงสร้างพื้นฐานได้อย่างเต็มที่'
                : 'Own your AI workspace, not rent it. Sovereign agentic AI infrastructure that gives your teams an AI workspace with full control over data, knowledge, and infrastructure.'}
            </p>

            {/* On-prem + on-cloud */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-6">
              <div className="flex items-center gap-2.5 text-sm text-white/90">
                <Server className="h-5 w-5 text-primary" aria-hidden />
                <span>{isTh ? 'ติดตั้งภายในองค์กร (On-Premise)' : 'On-Premise'}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/90">
                <Cloud className="h-5 w-5 text-primary" aria-hidden />
                <span>{isTh ? 'บนคลาวด์ (On-Cloud)' : 'On-Cloud'}</span>
              </div>
            </div>
            <p className="mt-3 text-sm text-white/85">
              {isTh
                ? 'Hybrid LLM Routing — สลับระหว่างคลาวด์และภายในองค์กรอย่างโปร่งใส'
                : 'Hybrid LLM Routing — transparent Cloud + On-Premise routing'}
            </p>

            <Link
              href={`/${locale}/products/logix`}
              className="btn btn-primary mt-10 gap-2"
            >
              {isTh ? 'รู้จัก Logix' : 'Discover Logix'}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          {/* Right: feature row */}
          <div className="lg:col-span-7">
            <div className="grid gap-px overflow-hidden rounded-box border border-white/10 bg-white/10 sm:grid-cols-2">
              {features.map((feature, i) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 + i * 0.08 }}
                    className="bg-secondary p-6 sm:p-8"
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-box bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-5 text-base font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/85">
                      {feature.desc}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
