import Link from 'next/link'
import { Mail, Phone, MessageCircle, Linkedin, Twitter, Facebook } from 'lucide-react'
import { type Locale } from '@/lib/i18n'
import { type ContactInfo } from '@/lib/strapi'

type Dict = Record<string, any>

// Fallback contact info if Strapi is unavailable
const fallbackContact = {
  email: 'info@techthinkspace.com',
  phone: '+66 082-808-7666',
  lineId: '@techthinkspace',
  lineUrl: 'https://lin.ee/PYH3ViE',
  facebookUrl: 'https://facebook.com/techthinkspace',
  linkedinUrl: 'https://linkedin.com/company/techthinkspace',
}

interface FooterProps {
  locale: Locale
  dict: Dict
  contactInfo?: ContactInfo | null
  companyName?: string
  copyrightText?: string
}

export function Footer({ locale, dict, contactInfo, companyName = 'Thinkspace Technology', copyrightText }: FooterProps) {
  // Use Strapi data or fallback
  const email = contactInfo?.email || fallbackContact.email
  const phone = contactInfo?.phone || fallbackContact.phone
  const lineId = contactInfo?.lineId || fallbackContact.lineId
  const facebookUrl = contactInfo?.facebookUrl || fallbackContact.facebookUrl
  const linkedinUrl = contactInfo?.linkedinUrl || fallbackContact.linkedinUrl
  const twitterUrl = contactInfo?.twitterUrl
  const navigation = {
    services: [
      { name: dict.services.cloud.title, href: `/${locale}/services/cloud` },
      { name: dict.services.software.title, href: `/${locale}/services/software` },
      { name: dict.services.hpc.title, href: `/${locale}/services/hpc-ai` },
      { name: dict.services.dataAi.title, href: `/${locale}/services/ai-datascience` },
      { name: dict.services.security.title, href: `/${locale}/services/cybersecurity` },
      { name: dict.services.consulting.title, href: `/${locale}/services/consulting` },
      { name: dict.services.research.title, href: `/${locale}/services/research` },
    ],
    company: [
      { name: dict.nav.about, href: `/${locale}/about` },
      { name: dict.footer.careers, href: `/${locale}/careers` },
      { name: dict.footer.news, href: `/${locale}/news` },
      { name: dict.footer.works, href: `/${locale}/works` },
      { name: dict.nav.contact, href: `/${locale}/contact` },
    ],
    legal: [
      { name: dict.footer.privacy, href: `/${locale}/privacy` },
      { name: dict.footer.terms, href: `/${locale}/terms` },
      { name: dict.footer.cookies, href: `/${locale}/cookies` },
    ],
    social: [
      ...(facebookUrl ? [{ name: 'Facebook', href: facebookUrl, icon: Facebook }] : []),
      ...(linkedinUrl ? [{ name: 'LinkedIn', href: linkedinUrl, icon: Linkedin }] : []),
      ...(twitterUrl ? [{ name: 'Twitter', href: twitterUrl, icon: Twitter }] : []),
    ],
  }

  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4">
              <span className="font-bold text-xl text-base-content">{companyName}</span>
            </Link>
            <p className="text-base-content/70 mb-6 max-w-sm">
              {dict.footer.tagline}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href={`mailto:${email}`} className="hover:text-primary">{email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-primary">{phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-primary" />
                <a href={fallbackContact.lineUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary">{lineId}</a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 text-base-content">{dict.footer.services}</h3>
            <ul className="space-y-2">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-base-content/60 hover:text-primary text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-base-content">{dict.footer.company}</h3>
            <ul className="space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-base-content/60 hover:text-primary text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-base-content">{dict.footer.legal}</h3>
            <ul className="space-y-2">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-base-content/60 hover:text-primary text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-base-content/60 hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-base-300 mt-12 pt-8 text-center text-sm text-base-content/60">
          <p>&copy; {new Date().getFullYear()} {companyName}. {copyrightText || dict.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
