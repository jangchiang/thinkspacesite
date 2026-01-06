import type { Metadata } from 'next'
import Link from 'next/link'
import { Cloud, Shield, Database, Code, BarChart, Headphones } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore our comprehensive enterprise technology services including cloud solutions, cybersecurity, data analytics, and more.',
}

const services = [
  {
    icon: Cloud,
    title: 'Cloud Services',
    description:
      'Cloud migration, multi-cloud management, and cloud-native development solutions.',
    href: '/services/cloud',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description:
      'Comprehensive security assessments, threat protection, and compliance solutions.',
    href: '/services/cybersecurity',
  },
  {
    icon: Database,
    title: 'Data & AI',
    description:
      'Data analytics, machine learning, and business intelligence solutions.',
    href: '/services/data-ai',
  },
  {
    icon: Code,
    title: 'Software Development',
    description:
      'Custom application development, API integration, and mobile solutions.',
    href: '/services/development',
  },
  {
    icon: BarChart,
    title: 'IT Consulting',
    description:
      'Digital transformation strategy, technology assessment, and IT roadmaps.',
    href: '/services/consulting',
  },
  {
    icon: Headphones,
    title: 'Managed Services',
    description:
      '24/7 infrastructure monitoring, help desk support, and IT management.',
    href: '/services/managed',
  },
]

export default function ServicesPage(): React.JSX.Element {
  return (
    <div className="container-custom section-padding">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
        <p className="text-lg text-base-content/70">
          Comprehensive technology solutions to power your business transformation
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <Link
            key={service.title}
            href={service.href}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow group"
          >
            <div className="card-body">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h2 className="card-title">{service.title}</h2>
              <p className="text-base-content/70">{service.description}</p>
              <div className="card-actions justify-end mt-4">
                <span className="text-primary font-medium group-hover:underline">
                  Learn more →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
