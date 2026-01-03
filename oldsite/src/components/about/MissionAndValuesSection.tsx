'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

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

// Props for the component
interface MissionAndValuesProps {
  mission: string;
  vision: string;
  values: {
    title: string;
    description: string;
  }[];
}

const MissionAndValuesSection: React.FC<MissionAndValuesProps> = ({ mission, vision, values }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.1 });
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (inView && !isAnimated) {
      setIsAnimated(true);
    }
  }, [inView, isAnimated]);

  return (
    <motion.section
      ref={ref}
      className="py-20 bg-gray-50 dark:bg-gray-900"
      initial="hidden"
      animate={isAnimated ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Mission & Vision */}
        <motion.div className="text-center mb-12">
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            Mission & Vision
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            {mission}
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            {vision}
          </motion.p>
        </motion.div>

        {/* Core Values */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default MissionAndValuesSection;
