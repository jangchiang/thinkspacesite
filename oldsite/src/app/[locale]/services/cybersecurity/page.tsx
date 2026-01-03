// src/app/[locale]/services/cybersecurity/page.tsx
'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Search, Lock, AlertTriangle, ChevronRight, FileSearch, Monitor, Settings, Database } from 'lucide-react'
import Link from 'next/link'

const securityServices = [
 {
   icon: Search,
   title: 'Security Assessment',
   description: 'Comprehensive evaluation of your security posture',
   features: [
     'Vulnerability assessment',
     'Penetration testing',
     'Security architecture review',
     'Risk assessment'
   ]
 },
 {
   icon: Shield,
   title: 'Threat Protection',
   description: 'Active monitoring and threat prevention',
   features: [
     'Real-time monitoring',
     'Threat detection',
     'Incident response',
     'Malware protection'
   ]
 },
 {
   icon: Lock,
   title: 'Security Compliance',
   description: 'Meet industry security standards and regulations',
   features: [
     'GDPR compliance',
     'ISO 27001 certification',
     'HIPAA compliance',
     'PCI DSS compliance'
   ]
 },
 {
   icon: AlertTriangle,
   title: 'Incident Response',
   description: 'Rapid response to security incidents',
   features: [
     'Incident investigation',
     'Threat containment',
     'Recovery planning',
     'Post-incident analysis'
   ]
 }
]

const solutions = [
 {
   icon: Monitor,
   title: 'Network Security',
   items: [
     'Firewall management',
     'Network monitoring',
     'Intrusion detection',
     'VPN solutions'
   ]
 },
 {
   icon: Database,
   title: 'Data Security',
   items: [
     'Data encryption',
     'Access control',
     'Data loss prevention',
     'Backup solutions'
   ]
 },
 {
   icon: Settings,
   title: 'System Security',
   items: [
     'Endpoint protection',
     'System hardening',
     'Patch management',
     'Configuration management'
   ]
 },
 {
   icon: FileSearch,
   title: 'Security Audit',
   items: [
     'Security assessments',
     'Compliance audits',
     'Risk analysis',
     'Security reporting'
   ]
 }
]

export default function CybersecurityPage() {
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
             <Shield className="h-16 w-16 text-green-500" />
           </div>
           <h1 className="text-5xl md:text-6xl font-bold mb-6">Cybersecurity</h1>
           <p className="text-xl text-gray-300 max-w-2xl mx-auto">
             Protect your digital assets with advanced security solutions
           </p>
         </motion.div>
       </div>
     </section>

     {/* Services Section */}
     <section className="py-20">
       <div className="max-w-7xl mx-auto px-4">
         <h2 className="text-3xl font-bold text-center mb-12">Security Services</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {securityServices.map((service, index) => {
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

     {/* Security Process */}
     <section className="py-20 bg-gray-50 dark:bg-gray-800">
       <div className="max-w-7xl mx-auto px-4">
         <h2 className="text-3xl font-bold text-center mb-12">Our Security Process</h2>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           {[
             { step: '01', title: 'Assessment', desc: 'Security evaluation' },
             { step: '02', title: 'Planning', desc: 'Strategy development' },
             { step: '03', title: 'Implementation', desc: 'Security deployment' },
             { step: '04', title: 'Monitoring', desc: 'Continuous protection' }
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
               <p className="text-gray-600 dark:text-gray-300">{phase.desc}</p>
             </motion.div>
           ))}
         </div>
       </div>
     </section>

     {/* Solutions Grid */}
     <section className="py-20">
       <div className="max-w-7xl mx-auto px-4">
         <h2 className="text-3xl font-bold text-center mb-12">Security Solutions</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {solutions.map((solution, index) => {
             const Icon = solution.icon
             return (
               <motion.div
                 key={solution.title}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: index * 0.1 }}
                 className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
               >
                 <Icon className="h-8 w-8 text-green-600 mb-4" />
                 <h3 className="text-xl font-bold mb-4">{solution.title}</h3>
                 <ul className="space-y-2">
                   {solution.items.map((item) => (
                     <li key={item} className="text-gray-600 dark:text-gray-300 flex items-center">
                       <ChevronRight className="h-4 w-4 text-green-600 mr-2" />
                       {item}
                     </li>
                   ))}
                 </ul>
               </motion.div>
             )
           })}
         </div>
       </div>
     </section>

     {/* Stats Section */}
     <section className="py-20 bg-green-50 dark:bg-gray-800">
       <div className="max-w-7xl mx-auto px-4">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           {[
             { number: '100+', label: 'Security Audits' },
             { number: '24/7', label: 'Monitoring' },
             { number: '99.9%', label: 'Threat Detection' },
             { number: '500+', label: 'Clients Protected' }
           ].map((stat, index) => (
             <motion.div
               key={stat.label}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: index * 0.1 }}
               className="text-center"
             >
               <div className="text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
               <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
             </motion.div>
           ))}
         </div>
       </div>
     </section>

     {/* CTA Section */}
     <section className="py-20">
       <div className="max-w-7xl mx-auto px-4">
         <div className="bg-green-600 text-white rounded-2xl p-12 text-center">
           <h2 className="text-3xl font-bold mb-6">Secure Your Digital Assets Today</h2>
           <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
             Let's build a comprehensive security strategy for your organization
           </p>
           <Link
             href="/contact"
             className="inline-flex items-center px-8 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors duration-300"
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