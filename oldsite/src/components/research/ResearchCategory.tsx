'use client';

import React from 'react';

const ResearchCategory = ({ category }: { category: any }) => {
  const Icon = category.icon;

  return (
    <div className="mb-16 last:mb-0">
      <div className="flex items-center mb-8">
        {Icon && <Icon className="h-8 w-8 text-green-600 mr-3" />}
        <h2 className="text-2xl font-bold">{category.title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {category.areas.map((area: any) => (
          <div key={area.name} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-3">{area.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{area.description}</p>
            <ul className="list-disc list-inside space-y-1">
              {area.topics.map((topic: string, i: number) => (
                <li key={i} className="text-gray-500 dark:text-gray-400">
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchCategory;
