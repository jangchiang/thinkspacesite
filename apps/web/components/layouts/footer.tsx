import Link from 'next/link'
import { Mail, Phone, MessageCircle, Linkedin, Twitter, Github } from 'lucide-react'
import { type Locale } from '@/lib/i18n'

type Dict = Record<string, any>

interface FooterProps {
  locale: Locale
  dict: Dict
}

export function Footer({ locale, dict }: FooterProps) {
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
      { name: dict.nav.blog, href: `/${locale}/blog` },
      { name: dict.footer.caseStudies, href: `/${locale}/case-studies` },
      { name: dict.nav.contact, href: `/${locale}/contact` },
    ],
    legal: [
      { name: dict.footer.privacy, href: `/${locale}/privacy` },
      { name: dict.footer.terms, href: `/${locale}/terms` },
      { name: dict.footer.cookies, href: `/${locale}/cookies` },
    ],
    social: [
      { name: 'LinkedIn', href: '#', icon: Linkedin },
      { name: 'Twitter', href: '#', icon: Twitter },
      { name: 'GitHub', href: '#', icon: Github },
    ],
  }

  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4">
              <span className="font-bold text-xl">Thinkspace Technology</span>
            </Link>
            <p className="text-neutral-content/70 mb-6 max-w-sm">
              {dict.footer.tagline}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:info@techthinkspace.com" className="hover:text-primary">info@techthinkspace.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+66828087666" className="hover:text-primary">+66 082-808-7666</a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-primary" />
                <a href="https://lin.ee/PYH3ViE" target="_blank" rel="noopener noreferrer" className="hover:text-primary">@techthinkspace</a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">{dict.footer.services}</h3>
            <ul className="space-y-2">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-neutral-content/70 hover:text-neutral-content text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">{dict.footer.company}</h3>
            <ul className="space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-neutral-content/70 hover:text-neutral-content text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">{dict.footer.legal}</h3>
            <ul className="space-y-2">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-neutral-content/70 hover:text-neutral-content text-sm"
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
                  className="text-neutral-content/70 hover:text-primary"
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
        <div className="border-t border-neutral-content/10 mt-12 pt-8 text-center text-sm text-neutral-content/70">
          <p>&copy; {new Date().getFullYear()} Thinkspace Technology. {dict.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
