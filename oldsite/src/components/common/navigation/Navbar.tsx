'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const navItems = [
  {
    name: 'Services',
    href: '/services',
    subItems: [
      { name: 'Software Solutions', href: '/services/software-solutions' },
      { name: 'AI & Data Science', href: '/services/ai-&-datascience' },
      { name: '3D Printing', href: '/services/3d-printing' },
      { name: 'Cybersecurity', href: '/services/cybersecurity' },
      { name: 'IoT Systems', href: '/services/iot-systems' },
    ],
  },
  { name: 'About', href: '/about' },
  { name: 'Research', href: '/research' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en'; // Extract current locale from the URL

  const changeLanguage = (newLocale: string) => {
    if (newLocale !== currentLocale) {
      const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
      router.push(newPath);
    }
  };

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href={`/${currentLocale}`} className="text-2xl font-bold text-green-600">
          Think Space
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-center space-x-6">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={`/${currentLocale}${item.href}`}
                className={`text-gray-700 dark:text-gray-200 hover:text-green-600 ${
                  pathname.startsWith(`${item.href}`) ? 'text-green-600' : ''
                }`}
              >
                {item.name} {item.subItems && <ChevronDown className="ml-1 h-4 w-4 inline-block" />}
              </Link>

              {/* Sub-Navbar */}
              {item.subItems && (
                <AnimatePresence>
                  {activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-56 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg"
                    >
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={`/${currentLocale}${subItem.href}`}
                          className={`block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        {/* Language and Theme Toggles */}
        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <div className="relative">
            <button
              className="flex items-center text-gray-700 dark:text-gray-200 hover:text-green-600"
              onClick={() => changeLanguage(currentLocale === 'en' ? 'th' : 'en')}
            >
              {currentLocale.toUpperCase()}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
