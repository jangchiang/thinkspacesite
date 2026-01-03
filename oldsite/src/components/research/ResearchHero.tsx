'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ResearchHero = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <section className="relative h-[40vh] flex items-center">
      <div className="absolute inset-0">
        <Image
          src="/images/research/hero-bg.jpg"
          alt="Research at Think Space"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{title}</h1>
          <p className="text-xl max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchHero;
