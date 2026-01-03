'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ResearchSection from '@/components/research/ResearchSection';
import { getTranslation } from '@/lib/localization';

export default function ResearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const [locale, setLocale] = useState('en');
  const [t, setT] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      const resolvedParams = await params;
      const locale = resolvedParams?.locale || 'en';
      setLocale(locale);
      const translations = await getTranslation(locale);
      setT(translations);
    }
    loadData();
  }, [params]);

  if (!t) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <section className="relative h-[40vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/research/hero-bg.jpg"
            alt={t.research.hero.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t.research.hero.title}</h1>
            <p className="text-xl max-w-2xl mx-auto">{t.research.hero.subtitle}</p>
          </div>
        </div>
      </section>

      <ResearchSection t={t} />
    </div>
  );
}
