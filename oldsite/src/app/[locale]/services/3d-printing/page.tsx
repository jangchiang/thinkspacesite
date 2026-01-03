// src/app/[locale]/services/3d-printing/page.tsx
'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Printer, Box, PenTool, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const features = [
 {
   icon: Printer,
   title: '3D Printing Services',
   description: 'Professional 3D printing on demand with high-quality materials',
   subFeatures: [
     'High-quality material options',
     'Fast turnaround times', 
     'Competitive pricing',
     'Complex geometry printing'
   ]
 },
 {
   icon: Box,
   title: 'Custom Products',
   description: 'Our brand of specialized 3D printed products',
   subFeatures: [
     'Custom design solutions',
     'Product prototyping',
     'Small batch production',
     'Quality assurance'
   ]
 },
 {
   icon: PenTool,
   title: 'Design Services',
   description: 'Professional 3D modeling and design consultation',
   subFeatures: [
     '3D modeling expertise',
     'Design optimization',
     'Technical consultation',
     'File preparation'
   ]
 }
]

export default function PrintingPage() {
 return (
   <div className="min-h-screen pt-16">
     {/* Hero Section */}
     <section className="bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 py-20">
       <div className="max-w-7xl mx-auto px-4">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center"
         >
           <h1 className="text-5xl font-bold mb-6">3D Printing Solutions</h1>
           <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
             Turn your ideas into reality with our advanced 3D printing services
           </p>
         </motion.div>
       </div>
     </section>

     {/* Features Section */}
     <section className="py-20">
       <div className="max-w-7xl mx-auto px-4">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {features.map((feature, index) => {
             const Icon = feature.icon;
             return (
               <motion.div
                 key={feature.title}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: index * 0.1 }}
                 className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
               >
                 <Icon className="h-12 w-12 text-green-600 mb-4" />
                 <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                 <p className="text-gray-600 dark:text-gray-300 mb-6">{feature.description}</p>
                 <ul className="space-y-2">
                   {feature.subFeatures.map((subFeature) => (
                     <li 
                       key={subFeature}
                       className="flex items-center text-gray-600 dark:text-gray-300"
                     >
                       <ChevronRight className="h-4 w-4 text-green-600 mr-2" />
                       {subFeature}
                     </li>
                   ))}
                 </ul>
               </motion.div>
             );
           })}
         </div>
       </div>
     </section>

     {/* CTA Section */}
     <section className="bg-green-50 dark:bg-gray-800 py-20">
       <div className="max-w-7xl mx-auto px-4 text-center">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="space-y-6"
         >
           <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
           <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
             Contact us today to discuss your 3D printing needs and get a custom quote for your project.
           </p>
           <Link
             href="/contact"
             className="inline-flex items-center px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
           >
             Get Started
             <ChevronRight className="ml-2 h-5 w-5" />
           </Link>
         </motion.div>
       </div>
     </section>
   </div>
 )
}