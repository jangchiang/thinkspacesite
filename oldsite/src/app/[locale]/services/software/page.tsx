// src/app/[locale]/services/software/page.tsx
'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Code, Cloud, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function SoftwarePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden bg-[#14171f] dark:bg-gray-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Software Solutions</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Enterprise-grade software solutions tailored to your needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Custom Development */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-center mb-6">
                <Code className="h-8 w-8 text-green-600 mr-4" />
                <h2 className="text-2xl font-bold">Custom Development</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Tailored solutions for your specific business needs
              </p>
              <ul className="space-y-3">
                {[
                  'Customized software development',
                  'System integration',
                  'Legacy system modernization',
                  'Workflow automation',
                  'API development'
                ].map((feature) => (
                  <li key={feature} className="flex items-center text-gray-700 dark:text-gray-200">
                    <ChevronRight className="h-4 w-4 text-green-600 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* SaaS Solutions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-center mb-6">
                <Cloud className="h-8 w-8 text-green-600 mr-4" />
                <h2 className="text-2xl font-bold">SaaS Solutions</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Ready-to-use cloud-based software solutions
              </p>
              <ul className="space-y-3">
                {[
                  'Scalable cloud infrastructure',
                  'Automatic updates',
                  'Pay-as-you-go pricing',
                  'Regular maintenance',
                  '24/7 support'
                ].map((feature) => (
                  <li key={feature} className="flex items-center text-gray-700 dark:text-gray-200">
                    <ChevronRight className="h-4 w-4 text-green-600 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                title: 'Frontend',
                techs: ['React', 'Next.js', 'Vue', 'Angular']
              },
              {
                title: 'Backend',
                techs: ['Node.js', 'Python', 'Java', '.NET']
              },
              {
                title: 'Database',
                techs: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis']
              },
              {
                title: 'Cloud',
                techs: ['AWS', 'Azure', 'GCP', 'Digital Ocean']
              }
            ].map((stack, index) => (
              <motion.div
                key={stack.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-4 text-green-600">{stack.title}</h3>
                <ul className="space-y-2">
                  {stack.techs.map((tech) => (
                    <li key={tech} className="text-gray-600 dark:text-gray-300">
                      {tech}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-green-600 text-white rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Let's discuss how our software solutions can transform your business
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Contact Us
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}