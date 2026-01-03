// src/components/home/Hero.tsx
'use client'
import { motion } from 'framer-motion'

export const Hero = () => (
  <motion.section 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="h-screen flex items-center bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800"
  >
    <div className="max-w-7xl mx-auto px-4 text-center">
      <motion.h1 
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="text-6xl font-bold mb-6"
      >
        Think Space Technology
      </motion.h1>
      <motion.p 
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="text-xl mb-8 text-gray-600 dark:text-gray-300"
      >
        Implementing new era technology solutions
      </motion.p>
      <motion.div 
        initial={{ y: 20 }}
        animate={{ y: 0 }}
      >
        <a 
          href="/services" 
          className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Explore Our Services
        </a>
      </motion.div>
    </div>
  </motion.section>
)