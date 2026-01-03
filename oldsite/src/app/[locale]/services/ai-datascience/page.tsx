// src/app/[locale]/services/ai-datascience/page.tsx
'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Brain, LineChart, Database, Eye, ChevronRight, Search, Cpu, Bot } from 'lucide-react'
import Link from 'next/link'

const aiServices = [
 {
   icon: LineChart,
   title: 'Predictive Analytics',
   description: 'Leverage data to predict future trends and make informed decisions',
   features: [
     'Time series forecasting',
     'Risk assessment',
     'Market analysis',
     'Demand prediction'
   ]
 },
 {
   icon: Database,
   title: 'Data Science',
   description: 'Extract meaningful insights from complex data sets',
   features: [
     'Data mining',
     'Statistical analysis',
     'Pattern recognition',
     'Data visualization'
   ]
 },
 {
   icon: Eye,
   title: 'Computer Vision',
   description: 'Advanced image and video processing solutions',
   features: [
     'Object detection',
     'Image classification',
     'Facial recognition',
     'Video analysis'
   ]
 },
 {
   icon: Bot,
   title: 'Custom AI Solutions',
   description: 'Tailored AI solutions for your specific needs',
   features: [
     'Machine learning models',
     'Neural networks',
     'Natural language processing',
     'Reinforcement learning'
   ]
 }
]

const technologies = [
 {
   category: 'Machine Learning',
   tools: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras']
 },
 {
   category: 'Data Processing',
   tools: ['Pandas', 'NumPy', 'Apache Spark', 'Hadoop']
 },
 {
   category: 'Visualization',
   tools: ['Matplotlib', 'Plotly', 'D3.js', 'Tableau']
 },
 {
   category: 'Cloud AI',
   tools: ['AWS SageMaker', 'Google AI', 'Azure ML', 'IBM Watson']
 }
]

export default function AiDataSciencePage() {
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
             <Brain className="h-16 w-16 text-green-500" />
           </div>
           <h1 className="text-5xl md:text-6xl font-bold mb-6">AI & Data Science</h1>
           <p className="text-xl text-gray-300 max-w-2xl mx-auto">
             Transform your business with cutting-edge AI and data science solutions
           </p>
         </motion.div>
       </div>
     </section>

     {/* Services Section */}
     <section className="py-20">
       <div className="max-w-7xl mx-auto px-4">
         <h2 className="text-3xl font-bold text-center mb-12">Our AI Services</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {aiServices.map((service, index) => {
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

     {/* Technologies Section */}
     <section className="py-20 bg-gray-50 dark:bg-gray-800">
       <div className="max-w-7xl mx-auto px-4">
         <h2 className="text-3xl font-bold text-center mb-12">Technologies We Use</h2>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           {technologies.map((tech, index) => (
             <motion.div
               key={tech.category}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: index * 0.1 }}
               className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg"
             >
               <h3 className="text-lg font-semibold mb-4 text-green-600">{tech.category}</h3>
               <ul className="space-y-2">
                 {tech.tools.map((tool) => (
                   <li key={tool} className="text-gray-600 dark:text-gray-300">
                     {tool}
                   </li>
                 ))}
               </ul>
             </motion.div>
           ))}
         </div>
       </div>
     </section>

     {/* Process Section */}
     <section className="py-20">
       <div className="max-w-7xl mx-auto px-4">
         <h2 className="text-3xl font-bold text-center mb-12">Our AI Development Process</h2>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           {[
             { step: '01', title: 'Data Collection', icon: Search },
             { step: '02', title: 'Data Processing', icon: Database },
             { step: '03', title: 'Model Development', icon: Cpu },
             { step: '04', title: 'Implementation', icon: Bot }
           ].map((step, index) => {
             const Icon = step.icon
             return (
               <motion.div
                 key={step.title}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: index * 0.1 }}
                 className="text-center"
               >
                 <div className="bg-green-50 dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Icon className="h-8 w-8 text-green-600" />
                 </div>
                 <div className="text-green-600 font-bold mb-2">{step.step}</div>
                 <h3 className="text-xl font-bold mb-2">{step.title}</h3>
               </motion.div>
             )
           })}
         </div>
       </div>
     </section>

     {/* CTA Section */}
     <section className="py-20 bg-green-50 dark:bg-gray-800">
       <div className="max-w-7xl mx-auto px-4">
         <div className="text-center">
           <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business with AI?</h2>
           <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
             Let's discuss how our AI and data science solutions can help you achieve your goals
           </p>
           <Link
             href="/contact"
             className="inline-flex items-center px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
           >
             Start Your AI Journey
             <ChevronRight className="ml-2 h-5 w-5" />
           </Link>
         </div>
       </div>
     </section>
   </div>
 )
}