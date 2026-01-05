'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown, Globe } from 'lucide-react'
import { type Locale, localeNames } from '@/lib/i18n'
import { ThemeToggle } from '@/components/theme-toggle'
import { motion, AnimatePresence } from 'framer-motion'

type Dict = Record<string, any>

interface ServiceItem {
  name: string
  href: string
}

interface NavbarProps {
  locale: Locale
  dict: Dict
  services?: ServiceItem[]
  companyName?: string
}

interface NavItem {
  name: string
  href: string
  children?: { name: string; href: string }[]
}

// Custom Dropdown Component with better hover UX
function NavDropdown({
  item,
  index,
  locale,
}: {
  item: NavItem
  index: number
  locale: Locale
}) {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 150) // Small delay so user can move to submenu
  }

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <motion.div
      ref={dropdownRef}
      className="relative"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="flex items-center gap-1 text-sm font-medium text-base-content/70 hover:text-base-content cursor-pointer transition-colors py-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.name}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && item.children && (
          <motion.div
            className="absolute top-full left-0 mt-1 w-56 bg-base-100 rounded-xl shadow-xl border border-base-200 overflow-hidden z-50"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="py-2">
              {item.children.map((child, childIndex) => (
                <motion.div
                  key={child.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: childIndex * 0.03 }}
                >
                  <Link
                    href={child.href}
                    className="block px-4 py-2.5 text-sm text-base-content/70 hover:text-primary hover:bg-primary/5 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {child.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            {/* View All Services Link */}
            <div className="border-t border-base-200 p-2">
              <Link
                href={item.href}
                className="block px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {locale === 'th' ? 'ดูบริการทั้งหมด' : 'View All Services'} →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function Navbar({ locale, dict, services: servicesProp, companyName = 'Thinkspace Technology' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Helper to get path for switching locale while preserving current page
  const getLocalizedPath = (newLocale: Locale) => {
    // Replace the current locale in the pathname with the new locale
    const segments = pathname.split('/')
    // pathname format: /en/... or /th/...
    if (segments.length > 1 && (segments[1] === 'en' || segments[1] === 'th')) {
      segments[1] = newLocale
    } else {
      // Fallback: prepend the new locale
      segments.splice(1, 0, newLocale)
    }
    return segments.join('/') || `/${newLocale}`
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Use services from props (Strapi) if available
  const servicesChildren = servicesProp && servicesProp.length > 0
    ? servicesProp
    : []

  const navigation: NavItem[] = [
    { name: dict.nav.home, href: `/${locale}` },
    {
      name: dict.nav.services,
      href: `/${locale}/services`,
      children: servicesChildren.length > 0 ? servicesChildren : undefined,
    },
    { name: dict.nav.works, href: `/${locale}/works` },
    { name: dict.nav.news, href: `/${locale}/news` },
    { name: dict.nav.about, href: `/${locale}/about` },
    { name: dict.nav.contact, href: `/${locale}/contact` },
  ]

  return (
    <motion.header
      className={`sticky top-0 z-50 backdrop-blur-lg border-b transition-all duration-300 ${
        scrolled
          ? 'bg-base-100/95 border-base-200 shadow-sm'
          : 'bg-base-100/80 border-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
            <motion.span
              className="font-bold text-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              {companyName}
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navigation.map((item, index) =>
              item.children ? (
                <NavDropdown key={item.name} item={item} index={index} locale={locale} />
              ) : (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-base-content/70 hover:text-base-content transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              )
            )}
          </div>

          {/* Right side: Theme, Language & CTA */}
          <div className="hidden lg:flex lg:items-center lg:gap-2">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Switcher */}
            <div className="dropdown dropdown-end dropdown-hover">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-sm gap-1 hover:bg-primary/10"
              >
                <Globe className="w-4 h-4" />
                {localeNames[locale]}
                <ChevronDown className="w-3 h-3" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-32 border border-base-200"
              >
                <li>
                  <Link
                    href={getLocalizedPath('en')}
                    className={`${locale === 'en' ? 'active bg-primary/10 text-primary' : ''} hover:bg-primary/10`}
                  >
                    English
                  </Link>
                </li>
                <li>
                  <Link
                    href={getLocalizedPath('th')}
                    className={`${locale === 'th' ? 'active bg-primary/10 text-primary' : ''} hover:bg-primary/10`}
                  >
                    ไทย
                  </Link>
                </li>
              </ul>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={`/${locale}/contact`} className="btn btn-primary btn-sm">
                {dict.nav.getStarted}
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            type="button"
            className="lg:hidden btn btn-ghost btn-square"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="lg:hidden py-4 border-t border-base-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="space-y-1">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.children ? (
                      // Services with expandable submenu
                      <div>
                        <button
                          className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-base-content/70 hover:text-base-content hover:bg-base-200 rounded-lg transition-colors"
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        >
                          {item.name}
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              mobileServicesOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileServicesOpen && (
                            <motion.div
                              className="pl-4 overflow-hidden"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.children.map((child, childIndex) => (
                                <motion.div
                                  key={child.name}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: childIndex * 0.02 }}
                                >
                                  <Link
                                    href={child.href}
                                    className="block px-3 py-2 text-sm text-base-content/60 hover:text-base-content hover:bg-base-200 rounded-lg transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {child.name}
                                  </Link>
                                </motion.div>
                              ))}
                              <Link
                                href={item.href}
                                className="block px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {locale === 'th' ? 'ดูบริการทั้งหมด' : 'View All Services'} →
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="block px-3 py-2 text-base font-medium text-base-content/70 hover:text-base-content hover:bg-base-200 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Mobile Theme & Language Switcher */}
              <motion.div
                className="mt-4 px-3 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <ThemeToggle />
                <Link
                  href={getLocalizedPath('en')}
                  className={`btn btn-sm ${locale === 'en' ? 'btn-primary' : 'btn-ghost'}`}
                >
                  EN
                </Link>
                <Link
                  href={getLocalizedPath('th')}
                  className={`btn btn-sm ${locale === 'th' ? 'btn-primary' : 'btn-ghost'}`}
                >
                  TH
                </Link>
              </motion.div>

              <motion.div
                className="mt-4 px-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Link
                  href={`/${locale}/contact`}
                  className="btn btn-primary btn-block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {dict.nav.getStarted}
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
