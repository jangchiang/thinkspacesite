// src/app/[locale]/services/iot/page.tsx
'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Cpu, Wifi, Cloud, Settings, ChevronRight, Smartphone, Shield, Layers } from 'lucide-react'
import Link from 'next/link'

const iotServices = [
  {
    icon: Cpu,
    title: 'IoT Hardware Solutions',
    description: 'Custom IoT device development and integration',
    features: [
      'Sensor integration',
      'Custom hardware design',
      'Embedded systems',
      'Prototype development'
    ]
  },
  {
    icon: Cloud,
    title: 'IoT Cloud Platform',
    description: 'Scalable cloud infrastructure for IoT applications',
    features: [
      'Real-time data processing',
      'Device management',
      'Data analytics',
      'Cloud storage solutions'
    ]
  },
  {
    icon: Shield,
    title: 'IoT Security',
    description: 'End-to-end security for IoT ecosystems',
    features: [
      'Secure communication',
      'Device authentication',
      'Encryption protocols',
      'Security monitoring'
    ]
  },
  {
    icon: Smartphone,
    title: 'IoT Applications',
    description: 'Custom applications for IoT device control',
    features: [
      'Mobile apps',
      'Web dashboards',
      'Remote monitoring',
      'Control interfaces'
    ]
  }
]

const industries = [
  {
    title: 'Smart Manufacturing',
    applications: [
      'Industrial automation',
      'Predictive maintenance',
      'Asset tracking',
      'Quality control'
    ]
  },
  {
    title: 'Smart Buildings',
    applications: [
      'Energy management',
      'Access control',
      'Environmental monitoring',
      'Security systems'
    ]
  },
  {
    title: 'Agriculture',
    applications: [
      'Precision farming',
      'Crop monitoring',
      'Irrigation control',
      'Weather monitoring'
    ]
  },
  {
    title: 'Healthcare',
    applications: [
      'Patient monitoring',
      'Medical device tracking',
      'Environment control',
      'Asset management'
    ]
  }
]

export default function IotPage() {
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
            <div className="flex justify-center mb-6">
              <Wifi className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">IoT Systems</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Full-stack IoT solutions for the connected world
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our IoT Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {iotServices.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center mb-6">
                    <Icon className="h-8 w-8 text-green-600 mr-4" />
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-700 dark:text-gray-200">
                        <ChevronRight className="h-4 w-4 text-green-600 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">IoT Development Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Requirements Analysis', description: 'Understanding your needs' },
              { step: '02', title: 'System Design', description: 'Architecture planning' },
              { step: '03', title: 'Development', description: 'Implementation' },
              { step: '04', title: 'Deployment', description: 'Testing and launch' }
            ].map((phase, index) => (
              <motion.div
                key={phase.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-green-50 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold">{phase.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{phase.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{phase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Industries We Serve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-bold mb-4 text-green-600">{industry.title}</h3>
                <ul className="space-y-2">
                  {industry.applications.map((app) => (
                    <li key={app} className="text-gray-600 dark:text-gray-300 flex items-center">
                      <ChevronRight className="h-4 w-4 text-green-600 mr-2" />
                      {app}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Build Your IoT Solution?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how our IoT systems can revolutionize your business
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
            >
              Get Started
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}