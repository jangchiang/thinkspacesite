'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  details: string;
}

interface TimelineProps {
  title: string;
  description: string;
  items: TimelineItem[];
}

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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const Timeline: React.FC<TimelineProps> = ({ title, description, items }) => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        {/* Title Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Timeline Items */}
        <div className="relative border-l border-green-600">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="mb-10 ml-8"
            >
              <div className="absolute -left-4 w-8 h-8 bg-green-600 rounded-full border-white dark:border-gray-900 border-4"></div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.year}</h3>
              <h4 className="text-lg text-green-600 font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">{item.details}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
