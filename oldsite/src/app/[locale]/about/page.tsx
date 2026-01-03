'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getTranslation } from '@/lib/localization';
import MissionAndValuesSection from '@/components/about/MissionAndValuesSection';
import Timeline from '@/components/about/Timeline';
import WhatWeDoSection from '@/components/about/WhatWeDoSection';

export default function AboutPage({ params }: { params: { locale: string } }) {
  // Unwrap the params using React.use() for compatibility with the latest Next.js changes
  const { locale } = React.use(params);

  const t = getTranslation(locale || 'en'); // Fallback to 'en' if locale is undefined

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/about/hero-bg.jpg"
            alt={t.about.hero.title}
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t.about.hero.title}</h1>
            <p className="text-xl max-w-2xl mx-auto">{t.about.hero.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <MissionAndValuesSection
        mission={t.about.mission.mission}
        vision={t.about.mission.vision}
        values={t.about.values.items}
      />

      {/* What We Do Section */}
      <WhatWeDoSection
        title={t.whatWeDo.title}
        description={t.whatWeDo.description}
        services={t.whatWeDo.services}
      />

      {/* Timeline Section */}
      <Timeline
        title={t.timeline.title}
        description={t.timeline.description}
        items={t.timeline.items}
      />
    </div>
  );
}
