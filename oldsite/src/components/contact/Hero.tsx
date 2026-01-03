// src/components/contact/Hero.tsx
'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-[40vh] flex items-center">
      <div className="absolute inset-0">
        <Image
          src="/images/contact/hero-bg.jpg" // Use the URL path to the public folder
          alt="Contact Think Space"
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-2xl mx-auto">Get in touch with our team</p>
        </motion.div>
      </div>
    </section>
  );
}
