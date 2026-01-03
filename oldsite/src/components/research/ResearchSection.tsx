'use client';

import React from 'react';
import ResearchCategory from './ResearchCategory';

const ResearchSection = ({ t }: { t: any }) => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{t.research.heading}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.research.description}
          </p>
        </div>

        <div className="space-y-16">
          {t.research.categories.map((category: any, index: number) => (
            <ResearchCategory key={index} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
