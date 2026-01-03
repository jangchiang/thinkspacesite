// src/app/[locale]/contact/page.tsx
'use client'

import React from 'react'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'
import Hero from '@/components/contact/Hero'

export default function ContactPage() {
  return React.createElement('div', { className: 'min-h-screen bg-white dark:bg-gray-900' },
    React.createElement(Hero),
    React.createElement('section', { className: 'py-20' },
      React.createElement('div', { className: 'max-w-7xl mx-auto px-4' },
        React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-12' },
          React.createElement(ContactInfo),
          React.createElement(ContactForm)
        )
      )
    )
  )
}