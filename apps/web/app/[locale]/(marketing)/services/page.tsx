import { type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import Link from 'next/link'
import Image from 'next/image'
import { Cloud, Shield, Database, Code, BarChart, Server, FlaskConical, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: locale === 'th' ? 'บริการของเรา' : 'Our Services',
    description: locale === 'th'
      ? 'บริการด้านเทคโนโลยีครบวงจรจาก Think Space'
      : 'Comprehensive technology services from Think Space',
  }
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  const services = [
    {
      icon: Cloud,
      key: 'cloud',
      href: `/${locale}/services/cloud`,
      color: 'bg-blue-500',
    },
    {
      icon: Code,
      key: 'software',
      href: `/${locale}/services/software`,
      color: 'bg-green-500',
    },
    {
      icon: Server,
      key: 'hpc',
      href: `/${locale}/services/hpc-ai`,
      color: 'bg-indigo-500',
    },
    {
      icon: Database,
      key: 'dataAi',
      href: `/${locale}/services/ai-datascience`,
      color: 'bg-purple-500',
    },
    {
      icon: Shield,
      key: 'security',
      href: `/${locale}/services/cybersecurity`,
      color: 'bg-red-500',
    },
    {
      icon: BarChart,
      key: 'consulting',
      href: `/${locale}/services/consulting`,
      color: 'bg-orange-500',
    },
    {
      icon: FlaskConical,
      key: 'research',
      href: `/${locale}/services/research`,
      color: 'bg-teal-500',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-base-100 to-primary/5">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {dict.services?.title || (locale === 'th' ? 'บริการของเรา' : 'Our Services')}
            </h1>
            <p className="text-lg md:text-xl text-base-content/70">
              {dict.services?.subtitle || (locale === 'th'
                ? 'โซลูชันเทคโนโลยีครบวงจรสำหรับองค์กรของคุณ'
                : 'Comprehensive technology solutions for your organization')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.key}
                href={service.href}
                className="group card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-200 hover:border-primary/20"
              >
                <div className="card-body">
                  <div className={`w-16 h-16 rounded-xl ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="card-title text-xl mb-2">
                    {dict.services?.[service.key]?.title || service.key}
                  </h3>
                  <p className="text-base-content/70 mb-4">
                    {dict.services?.[service.key]?.description || ''}
                  </p>
                  <div className="card-actions mt-auto">
                    <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                      {dict.services?.learnMore || 'Learn More'}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-content">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {locale === 'th' ? 'พร้อมเริ่มต้นหรือยัง?' : 'Ready to Get Started?'}
            </h2>
            <p className="text-lg text-primary-content/80 mb-8">
              {locale === 'th'
                ? 'ติดต่อเราวันนี้เพื่อรับคำปรึกษาฟรี'
                : 'Contact us today for a free consultation'}
            </p>
            <Link href={`/${locale}/contact`} className="btn btn-secondary btn-lg">
              {locale === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
