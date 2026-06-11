import Link from 'next/link'
import { Mail, Phone, MessageCircle, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react'
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

export function Footer({ locale, dict, contactInfo, companyName = 'Thinkspace Technology', copyrightText }: FooterProps): React.JSX.Element {
  // Use Strapi data or fallback
  const email = contactInfo?.email || fallbackContact.email
  const phone = contactInfo?.phone || fallbackContact.phone
  const lineId = contactInfo?.lineId || fallbackContact.lineId
  const facebookUrl = contactInfo?.facebookUrl || fallbackContact.facebookUrl
  const linkedinUrl = contactInfo?.linkedinUrl || fallbackContact.linkedinUrl
  const twitterUrl = contactInfo?.twitterUrl
  const isTh = locale === 'th'
  const navigation = {
    products: [
      { name: isTh ? 'Logix — แพลตฟอร์ม AI' : 'Logix — AI Platform', href: `/${locale}/products/logix` },
      { name: 'Proxmox Virtualization', href: `/${locale}/products/proxmox` },
    ],
    services: [
      { name: isTh ? 'พัฒนาซอฟต์แวร์' : 'Software Solutions', href: `/${locale}/services/software` },
      { name: isTh ? 'ความปลอดภัยไซเบอร์และคลาวด์' : 'Cybersecurity & Cloud', href: `/${locale}/services/cybersecurity` },
      { name: isTh ? 'AI และวิทยาการข้อมูล' : 'AI & Data Science', href: `/${locale}/services/ai-datascience` },
      { name: isTh ? 'การประมวลผลสมรรถนะสูง (HPC)' : 'High-Performance Computing', href: `/${locale}/services/hpc` },
      { name: isTh ? 'IoT และระบบอัตโนมัติ' : 'IoT & Automation', href: `/${locale}/services/iot` },
      { name: isTh ? 'งานวิจัยขั้นสูง' : 'Advanced Research', href: `/${locale}/services/research` },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4">
              <span className="font-bold text-xl text-base-content">{companyName}</span>
            </Link>
            <p className="text-[15px] text-base-content/80 mb-6 max-w-sm">
              {dict.footer.tagline}
            </p>
            <div className="space-y-2.5 text-[15px]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-base-content/70">
                  {isTh
                    ? '211/141 หมู่ 2 ต.แม่เหียะ อ.เมืองเชียงใหม่ จ.เชียงใหม่ 50100'
                    : '211/141 Moo 2, Mae Hia, Muang, Chiang Mai 50100, Thailand'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-primary">{email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="hover:text-primary">{phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-primary shrink-0" />
                <a href={fallbackContact.lineUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary">{lineId}</a>
              </div>
            </div>
            <p className="mt-5 text-[13px] text-base-content/65">
              {isTh ? 'เลขทะเบียนนิติบุคคล' : 'Company Reg. No.'} 0505567026400
              <br />
              {isTh ? 'ตัวแทนจำหน่ายที่ได้รับอนุญาตของ Proxmox' : 'Authorized Proxmox Reseller'}
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-base mb-4 text-base-content">{isTh ? 'ผลิตภัณฑ์' : 'Products'}</h3>
            <ul className="space-y-2">
              {navigation.products.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-base-content/75 hover:text-primary text-[15px] transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-base mb-4 text-base-content">{dict.footer.services}</h3>
            <ul className="space-y-2">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-base-content/75 hover:text-primary text-[15px] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-base mb-4 text-base-content">{dict.footer.company}</h3>
            <ul className="space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-base-content/75 hover:text-primary text-[15px] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-base mb-4 text-base-content">{dict.footer.legal}</h3>
            <ul className="space-y-2">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-base-content/75 hover:text-primary text-[15px] transition-colors"
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
                  aria-label={item.name}
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
        <div className="border-t border-base-300 mt-12 pt-8 text-center text-[15px] text-base-content/70">
          <p>&copy; {new Date().getFullYear()} {companyName}. {copyrightText || dict.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
