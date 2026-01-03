'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FaLaptopCode,
  FaBrain,
  FaCogs,
  FaMicrochip,
  FaShieldAlt,
  FaFlask,
} from 'react-icons/fa';

interface Service {
  title: string;
  description: string;
}

interface WhatWeDoProps {
  title: string;
  description: string;
  services: Service[];
}

// Icons for services
const icons = [FaLaptopCode, FaBrain, FaCogs, FaMicrochip, FaShieldAlt, FaFlask];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

const WhatWeDoSection: React.FC<WhatWeDoProps> = ({ title, description, services }) => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{description}</p>
        </motion.div>

        {/* Service Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {services.map((item, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col items-center">
                  <Icon className="text-green-600 w-12 h-12 mb-4" aria-hidden="true" />
                  <h3 className="text-xl font-bold mb-2 text-center text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-center text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
