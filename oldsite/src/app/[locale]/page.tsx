'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { getTranslation } from '@/lib/localization';
import { Server, Brain, Printer, Shield, Cpu, ChevronRight, ArrowRight, User, Building, Clock } from 'lucide-react';

const fadeInUp = {
 hidden: { opacity: 0, y: 50 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
 hidden: { opacity: 1 },
 visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

export default function HomePage({ params }: { params: { locale: string } }) {
 const [locale, setLocale] = useState('en');
 const [translations, setTranslations] = useState<any>(null);

 useEffect(() => {
   const resolveParams = async () => {
     const resolvedLocale = (await params)?.locale || 'en';
     setLocale(resolvedLocale);
     const t = getTranslation(resolvedLocale);
     setTranslations(t);
   };
   resolveParams();
 }, [params]);

 if (!translations) return <div>Loading...</div>;

 const t = translations;
 
 const services = t['services-main']?.items?.map((service: any, index: number) => ({
   ...service,
   icon: [Server, Brain, Printer, Shield, Cpu][index],
   image: `/images/services/${service.title.replace(/ & /g, '-&-').replace(/ /g, '-')}.jpg`,
   link: `/services/${service.title.toLowerCase()
     .replace('ai & data science', 'ai-&-datascience')
     .replace('iot systems', 'iot-systems')
     .replace(/ & /g, '-&-')
     .replace(/ /g, '-')
     .replace(/^3d/, '3d')
     .replace('systems', 'Systems')}`
 })) || [];

 const stats = [
   { number: '10+', label: t.stats.yearsExperience },
   { number: '500+', label: t.stats.projectsCompleted },
   { number: '100+', label: t.stats.teamMembers },
   { number: '50+', label: t.stats.globalClients },
 ];

 const features = t.features.items.map((item: any, index: number) => ({
   ...item,
   icon: [User, Building, Clock][index],
 }));

 const Section = ({ children, className }: { children: React.ReactNode; className?: string }) => {
   const ref = React.useRef(null);
   const inView = useInView(ref, { threshold: 0.2 });

   return (
     <motion.div
       ref={ref}
       className={className}
       variants={fadeInUp}
       initial="hidden"
       animate={inView ? 'visible' : 'hidden'}
     >
       {children}
     </motion.div>
   );
 };

 return (
   <motion.div className="min-h-screen bg-[#111827]" initial="hidden" animate="visible" exit="hidden" variants={staggerContainer}>
     <section className="relative h-screen flex items-center">
       <div className="absolute inset-0 z-0 overflow-hidden">
         <video
           src="/video/hero-main.mp4"
           autoPlay
           loop
           muted
           playsInline
           className="absolute inset-0 w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-black/50" />
       </div>
       <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
         <motion.div variants={fadeInUp}>
           <h1 className="text-5xl md:text-7xl font-bold mb-6">{t.hero.title}</h1>
           <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">{t.hero.subtitle}</p>
           <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link href="/services" className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition">
               {t.hero.exploreServices}
             </Link>
             <Link href="/contact" className="bg-white text-green-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition">
               {t.hero.contactUs}
             </Link>
           </div>
         </motion.div>
       </div>
     </section>

     <Section className="py-20">
       <div className="max-w-7xl mx-auto px-4">
         <motion.div variants={fadeInUp} className="text-center mb-12">
           <h2 className="text-4xl font-bold text-white mb-4">{t['services-main'].heading}</h2>
           <p className="text-gray-400 max-w-2xl mx-auto">{t['services-main'].description}</p>
         </motion.div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {services.map((service, index) => (
             <motion.div
               key={service.title}
               variants={fadeInUp}
               whileHover={{ scale: 1.05 }}
               className="bg-[#1a1f2e] rounded-lg p-6 hover:bg-[#22283a] transition-all group"
             >
               <div className="relative h-48 mb-6 bg-[#2a314a] rounded-lg overflow-hidden">
                 <Image
                   src={service.image}
                   alt={service.title}
                   fill
                   className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                   onError={(e: any) => {
                     e.target.src = '/images/placeholder-service.jpg';
                   }}
                 />
               </div>
               <div className="flex items-center mb-4 text-white">
                 <service.icon className="h-6 w-6 text-green-500 mr-3" />
                 <h3 className="text-xl font-bold">{service.title}</h3>
               </div>
               <p className="text-gray-400 mb-4">{service.description}</p>
               <Link 
                 href={service.link} 
                 className="inline-flex items-center text-green-500 hover:text-green-400 transition-colors"
               >
                 Learn more <ArrowRight className="ml-2 h-4 w-4" />
               </Link>
             </motion.div>
           ))}
         </div>
       </div>
     </Section>

     <Section className="py-20 bg-[#1a1f2e]">
       <div className="max-w-7xl mx-auto px-4">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
           {stats.map((stat) => (
             <motion.div key={stat.label} variants={fadeInUp} className="text-center">
               <div className="text-4xl font-bold text-green-500 mb-2">{stat.number}</div>
               <div className="text-gray-400">{stat.label}</div>
             </motion.div>
           ))}
         </div>
       </div>
     </Section>

     <Section className="py-20">
       <div className="max-w-7xl mx-auto px-4">
         <motion.div variants={fadeInUp} className="text-center mb-12">
           <h2 className="text-4xl font-bold text-white mb-4">{t.features.heading}</h2>
         </motion.div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {features.map((feature, index) => (
             <motion.div
               key={feature.title}
               variants={fadeInUp}
               whileHover={{ scale: 1.05 }}
               className="text-center p-6"
             >
               <div className="inline-block p-4 bg-[#22283a] rounded-full mb-4">
                 <feature.icon className="h-8 w-8 text-green-500" />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
               <p className="text-gray-400">{feature.description}</p>
             </motion.div>
           ))}
         </div>
       </div>
     </Section>

     <Section className="py-20 bg-green-600">
       <div className="max-w-7xl mx-auto px-4 text-center">
         <h2 className="text-4xl font-bold text-white mb-6">{t.cta.heading}</h2>
         <p className="text-white/90 mb-8 max-w-2xl mx-auto">{t.cta.description}</p>
         <Link href="/contact" className="inline-flex items-center bg-white text-green-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition">
           {t.cta.button} <ChevronRight className="ml-2 h-5 w-5" />
         </Link>
       </div>
     </Section>
   </motion.div>
 );
}