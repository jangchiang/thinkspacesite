'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const ResearchArea = ({ area }: { area: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <h3 className="text-xl font-bold mb-3 flex items-center">
        <ChevronRight className="h-5 w-5 text-green-600 mr-2" />
        {area.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{area.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {area.topics.map((topic: string) => (
          <div key={topic} className="bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded text-sm">
            {topic}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ResearchArea;
