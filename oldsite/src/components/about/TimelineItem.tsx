// src/components/about/TimelineItem.tsx
'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCircle } from 'react-icons/fa';

interface TimelineItemProps {
  item: {
    year: string;
    title: string;
    description: string;
    details?: string; // Additional detail text
  };
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-10 ml-6 relative cursor-pointer"
    >
      {/* Circle */}
      <div className="absolute -left-3 top-1/2 transform -translate-y-1/2">
        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center shadow-md">
          <FaCircle className="text-white" size={12} />
        </div>
      </div>

      {/* Content */}
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-500 ease-in-out"
        onClick={handleToggle} // Toggle expansion on click
      >
        {/* Title */}
        <motion.h3
          className="text-xl font-bold mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0 }}
        >
          {item.title}
        </motion.h3>

        {/* Year */}
        <motion.span
          className="block mb-2 text-sm text-gray-500"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {item.year}
        </motion.span>

        {/* Description */}
        <motion.p
          className="text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          {item.description}
        </motion.p>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && item.details && (
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <p className="text-gray-600 dark:text-gray-300">{item.details}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
