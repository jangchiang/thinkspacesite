// src/components/home/Services.tsx
'use client'
import { motion } from 'framer-motion'
import { Server, Brain, Printer, Cpu, Shield } from 'lucide-react'

const services = [
  {
    icon: Server,
    title: 'Software Solutions',
    description: 'Custom development and SaaS products',
    href: '/services/software'
  },
  {
    icon: Brain,
    title: 'AI & Data Science',
    description: 'Advanced ML and analytics solutions',
    href: '/services/ai-&-datascience'
  },
  {
    icon: Printer,
    title: '3D Printing',
    description: '3D printing services and solutions',
    href: '/services/3d-printing'
  },
  {
    icon: Cpu,
    title: 'IoT Systems',
    description: 'Full-stack IoT implementation',
    href: '/services/iot-systems'
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Security solutions and consulting',
    href: '/services/cybersecurity'
  }
]

export const Services = () => (
  <section className="py-20">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition"
          >
            <service.icon className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <a
              href={service.href}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Learn more →
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)