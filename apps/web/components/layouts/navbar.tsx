'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronDown, Globe } from 'lucide-react'
import { type Locale, localeNames } from '@/lib/i18n'
import { ThemeToggle } from '@/components/theme-toggle'

type Dict = Record<string, any>

interface NavbarProps {
  locale: Locale
  dict: Dict
}

export function Navbar({ locale, dict }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: dict.nav.home, href: `/${locale}` },
    {
      name: dict.nav.services,
      href: `/${locale}/services`,
      children: [
        { name: dict.services.cloud.title, href: `/${locale}/services/cloud` },
        { name: dict.services.software.title, href: `/${locale}/services/software` },
        { name: dict.services.hpc.title, href: `/${locale}/services/hpc-ai` },
        { name: dict.services.dataAi.title, href: `/${locale}/services/ai-datascience` },
        { name: dict.services.security.title, href: `/${locale}/services/cybersecurity` },
        { name: dict.services.consulting.title, href: `/${locale}/services/consulting` },
        { name: dict.services.research.title, href: `/${locale}/services/research` },
      ],
    },
    { name: dict.nav.about, href: `/${locale}/about` },
    { name: dict.nav.blog, href: `/${locale}/blog` },
    { name: dict.nav.contact, href: `/${locale}/contact` },
  ]

  const alternateLocale: Locale = locale === 'en' ? 'th' : 'en'

  return (
    <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-lg border-b border-base-200">
      <nav className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="font-bold text-xl">Thinkspace Technology</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.children ? (
                  <div className="dropdown dropdown-hover">
                    <label
                      tabIndex={0}
                      className="flex items-center gap-1 text-sm font-medium text-base-content/70 hover:text-base-content cursor-pointer"
                    >
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-2"
                    >
                      {item.children.map((child) => (
                        <li key={child.name}>
                          <Link href={child.href}>{child.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-base-content/70 hover:text-base-content"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right side: Theme, Language & CTA */}
          <div className="hidden lg:flex lg:items-center lg:gap-2">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Switcher */}
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-sm gap-1"
              >
                <Globe className="w-4 h-4" />
                {localeNames[locale]}
                <ChevronDown className="w-3 h-3" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-32"
              >
                <li>
                  <Link
                    href={`/en`}
                    className={locale === 'en' ? 'active' : ''}
                  >
                    English
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/th`}
                    className={locale === 'th' ? 'active' : ''}
                  >
                    ไทย
                  </Link>
                </li>
              </ul>
            </div>

            <Link href={`/${locale}/contact`} className="btn btn-primary btn-sm">
              {dict.nav.getStarted}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden btn btn-ghost btn-square"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-base-200">
            <div className="space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-base-content/70 hover:text-base-content hover:bg-base-200 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-base-content/60 hover:text-base-content hover:bg-base-200 rounded-lg"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Theme & Language Switcher */}
            <div className="mt-4 px-3 flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="/en"
                className={`btn btn-sm ${locale === 'en' ? 'btn-primary' : 'btn-ghost'}`}
              >
                EN
              </Link>
              <Link
                href="/th"
                className={`btn btn-sm ${locale === 'th' ? 'btn-primary' : 'btn-ghost'}`}
              >
                TH
              </Link>
            </div>

            <div className="mt-4 px-3">
              <Link
                href={`/${locale}/contact`}
                className="btn btn-primary btn-block"
                onClick={() => setMobileMenuOpen(false)}
              >
                {dict.nav.getStarted}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
