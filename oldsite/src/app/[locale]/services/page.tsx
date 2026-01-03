// src/app/[locale]/services/page.tsx
'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Server, Brain, Printer, Shield, Cpu, ChevronRight } from 'lucide-react'

const services = [
 {
   icon: Server,
   title: 'Software Solutions',
   description: 'Custom software development and SaaS products for enterprise needs',
   features: [
     'Custom software development',
     'SaaS platforms',
     'Enterprise applications',
     'System integration'
   ],
   link: '/services/software',
   image: '/images/services/software-solutions.jpg',
   bgColor: 'bg-blue-50 dark:bg-gray-800'
 },
 {
   icon: Brain,
   title: 'AI & Data Science',
   description: 'Advanced analytics and machine learning solutions to drive insights',
   features: [
     'Machine learning',
     'Predictive analytics',
     'Computer vision',
     'Natural language processing'
   ],
   link: '/services/ai-&-datascience',
   image: '/images/services/ai-&-data-science.jpg',
   bgColor: 'bg-purple-50 dark:bg-gray-800'
 },
 {
   icon: Printer,
   title: '3D Printing',
   description: 'Professional 3D printing services and manufacturing solutions',
   features: [
     'Rapid prototyping',
     'Custom manufacturing',
     'Design services',
     'Material selection'
   ],
   link: '/services/3d-printing',
   image: '/images/services/3d-printing.jpg',
   bgColor: 'bg-green-50 dark:bg-gray-800'
 },
 {
   icon: Shield,
   title: 'Cybersecurity',
   description: 'Comprehensive security solutions to protect your digital assets',
   features: [
     'Security assessment',
     'Threat protection',
     'Compliance solutions',
     'Security monitoring'
   ],
   link: '/services/cybersecurity',
   image: '/images/services/cybersecurity.jpg',
   bgColor: 'bg-red-50 dark:bg-gray-800'
 },
 {
   icon: Cpu,
   title: 'IoT Systems',
   description: 'Full-stack IoT implementation and development services',
   features: [
     'IoT architecture',
     'Device management',
     'Data analytics',
     'Cloud integration'
   ],
   link: '/services/iot-systems',
   image: '/images/services/iot-systems.jpg',
   bgColor: 'bg-yellow-50 dark:bg-gray-800'
 }
]

export default function ServicesPage() {
 return (
   <div className="min-h-screen bg-white dark:bg-gray-900">
     {/* Hero Section */}
     <section className="relative h-[40vh] flex items-center bg-[#14171f] dark:bg-gray-900">
       <div className="absolute inset-0">
         <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-transparent" />
       </div>
       <div className="relative max-w-7xl mx-auto px-4">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center text-white"
         >
           <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
           <p className="text-xl text-gray-300 max-w-2xl mx-auto">
             Comprehensive technology solutions for the modern enterprise
           </p>
         </motion.div>
       </div>
     </section>

     {/* Services Grid */}
     <section className="py-20">
       <div className="max-w-7xl mx-auto px-4">
         <div className="grid grid-cols-1 gap-12">
           {services.map((service, index) => {
             const Icon = service.icon
             return (
               <motion.div
                 key={service.title}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: index * 0.1 }}
                 className={`${service.bgColor} rounded-2xl overflow-hidden shadow-lg`}
               >
                 <div className="grid grid-cols-1 md:grid-cols-2">
                   <div className="p-8 flex flex-col justify-center">
                     <div className="flex items-center mb-4">
                       <Icon className="h-8 w-8 text-green-600 mr-3" />
                       <h2 className="text-3xl font-bold">{service.title}</h2>
                     </div>
                     <p className="text-gray-600 dark:text-gray-300 mb-6">
                       {service.description}
                     </p>
                     <ul className="space-y-3 mb-6">
                       {service.features.map((feature) => (
                         <li 
                           key={feature} 
                           className="flex items-center text-gray-700 dark:text-gray-200"
                         >
                           <ChevronRight className="h-4 w-4 text-green-600 mr-2" />
                           {feature}
                         </li>
                       ))}
                     </ul>
                     <Link
                       href={service.link}
                       className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                     >
                       Learn more
                       <ChevronRight className="ml-1 h-4 w-4" />
                     </Link>
                   </div>
                   <div className="relative h-64 md:h-auto">
                     <Image
                       src={service.image}
                       alt={service.title}
                       fill
                       className="object-cover"
                     />
                   </div>
                 </div>
               </motion.div>
             )
           })}
         </div>
       </div>
     </section>

     {/* CTA Section */}
     <section className="py-20 bg-green-50 dark:bg-gray-800">
       <div className="max-w-7xl mx-auto px-4 text-center">
         <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
         <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
           Contact us to discuss how our services can help transform your business
         </p>
         <Link
           href="/contact"
           className="inline-flex items-center px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
         >
           Contact Us
           <ChevronRight className="ml-2 h-5 w-5" />
         </Link>
       </div>
     </section>
   </div>
 )
}