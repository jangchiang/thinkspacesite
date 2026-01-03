'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaBrain, FaCogs, FaMicrochip, FaShieldAlt, FaUsers, FaBuilding, FaClock } from 'react-icons/fa';

export default function HomePageClient({ t }: { t: any }) {
  const services = [
    {
      title: t.services.items[0]?.title || 'Default Title',
      description: t.services.items[0]?.description || 'Default Description',
      icon: FaLaptopCode,
      image: '/images/services/software.jpg',
      link: '/services/software',
    },
    {
      title: t.services.items[1]?.title || 'Default Title',
      description: t.services.items[1]?.description || 'Default Description',
      icon: FaBrain,
      image: '/images/services/ai-datascience.jpg',
      link: '/services/ai-datascience',
    },
    {
      title: t.services.items[2]?.title || 'Default Title',
      description: t.services.items[2]?.description || 'Default Description',
      icon: FaCogs,
      image: '/images/services/3d-printing.jpg',
      link: '/services/3d-printing',
    },
    {
      title: t.services.items[3]?.title || 'Default Title',
      description: t.services.items[3]?.description || 'Default Description',
      icon: FaMicrochip,
      image: '/images/services/iot.jpg',
      link: '/services/iot',
    },
    {
      title: t.services.items[4]?.title || 'Default Title',
      description: t.services.items[4]?.description || 'Default Description',
      icon: FaShieldAlt,
      image: '/images/services/cybersecurity.jpg',
      link: '/services/cybersecurity',
    },
  ];

  const stats = [
    { number: '10+', label: t.stats?.yearsExperience || 'Default Stat' },
    { number: '500+', label: t.stats?.projectsCompleted || 'Default Stat' },
    { number: '100+', label: t.stats?.teamMembers || 'Default Stat' },
    { number: '50+', label: t.stats?.globalClients || 'Default Stat' },
  ];

  const features = [
    {
      title: t.features.items[0]?.title || 'Default Feature',
      description: t.features.items[0]?.description || 'Default Description',
      icon: FaUsers,
    },
    {
      title: t.features.items[1]?.title || 'Default Feature',
      description: t.features.items[1]?.description || 'Default Description',
      icon: FaBuilding,
    },
    {
      title: t.features.items[2]?.title || 'Default Feature',
      description: t.features.items[2]?.description || 'Default Description',
      icon: FaClock,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <video
            src="/videos/hero-main.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">{t.hero?.title || 'Default Title'}</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">{t.hero?.subtitle || 'Default Subtitle'}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/services"
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition"
              >
                {t.hero?.exploreServices || 'Explore Services'}
              </Link>
              <Link
                href="/contact"
                className="bg-white text-green-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition"
              >
                {t.hero?.contactUs || 'Contact Us'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-200 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-xl font-bold"
              >
                <div className="text-green-600 text-4xl">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
