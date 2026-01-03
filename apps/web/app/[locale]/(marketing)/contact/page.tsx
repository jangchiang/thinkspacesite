import { type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { ContactForm } from '@/components/forms/contact-form'
import { Mail, Phone, MessageCircle, Clock } from 'lucide-react'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: locale === 'th' ? 'ติดต่อเรา' : 'Contact Us',
    description: locale === 'th'
      ? 'ติดต่อ Thinkspace Technology สำหรับคำปรึกษาด้านเทคโนโลยี'
      : 'Contact Thinkspace Technology for technology consulting',
  }
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  const contactInfo = [
    {
      icon: Mail,
      label: locale === 'th' ? 'อีเมล' : 'Email',
      value: 'info@techthinkspace.com',
      href: 'mailto:info@techthinkspace.com',
    },
    {
      icon: Phone,
      label: locale === 'th' ? 'โทรศัพท์' : 'Phone',
      value: '+66 082-808-7666',
      href: 'tel:+66828087666',
    },
    {
      icon: MessageCircle,
      label: 'Line',
      value: '@techthinkspace',
      href: 'https://lin.ee/PYH3ViE',
    },
    {
      icon: Clock,
      label: locale === 'th' ? 'เวลาทำการ' : 'Business Hours',
      value: locale === 'th'
        ? 'จันทร์ - ศุกร์: 9:00 - 18:00'
        : 'Mon - Fri: 9:00 AM - 6:00 PM',
      href: '#',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-base-100 to-primary/5">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {locale === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
            </h1>
            <p className="text-lg md:text-xl text-base-content/70">
              {locale === 'th'
                ? 'มีคำถามหรือต้องการข้อมูลเพิ่มเติม? ทีมงานของเราพร้อมให้ความช่วยเหลือ'
                : 'Have questions or need more information? Our team is here to help.'}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6">
                {locale === 'th' ? 'ข้อมูลติดต่อ' : 'Get in Touch'}
              </h2>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-content transition-colors">
                      <item.icon className="w-5 h-5 text-primary group-hover:text-primary-content" />
                    </div>
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-base-content/70">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-6">
                    {locale === 'th' ? 'ส่งข้อความถึงเรา' : 'Send us a Message'}
                  </h2>
                  <ContactForm locale={locale} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-base-200">
        <div className="container-custom">
          <div className="aspect-video bg-base-300 rounded-2xl flex items-center justify-center">
            <p className="text-base-content/50">
              {locale === 'th' ? 'แผนที่จะแสดงที่นี่' : 'Map will be displayed here'}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
