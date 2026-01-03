// src/components/contact/ContactInfo.tsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  MessagesSquare,
} from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'info@thinkspace.com',
    link: 'mailto:info@thinkspace.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 234 567 890',
    link: 'tel:+1234567890',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: 'Bangkok, Thailand',
    link: 'https://maps.google.com',
  },
  {
    icon: MessagesSquare,
    label: 'LINE',
    value: '@thinkspace',
    link: 'https://line.me/R/ti/p/@thinkspace',
  },
];

const socialLinks = [
  {
    icon: Facebook,
    href: 'https://facebook.com/thinkspace',
    label: 'Facebook',
  },
  {
    icon: Instagram,
    href: 'https://instagram.com/thinkspace',
    label: 'Instagram',
  },
  {
    icon: Linkedin,
    href: 'https://linkedin.com/company/thinkspace',
    label: 'LinkedIn',
  },
  {
    icon: MessagesSquare,
    href: 'https://line.me/R/ti/p/@thinkspace',
    label: 'LINE',
  },
];

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Have a question or want to work together? Contact us using the form or
          through any of the channels below.
        </p>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        {contactInfo.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.link}
              target={item.label === 'LINE' ? '_blank' : undefined}
              rel={item.label === 'LINE' ? 'noopener noreferrer' : undefined}
              className="flex items-center space-x-4 text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors"
            >
              <Icon className="h-6 w-6" />
              <div>
                <p className="font-medium">{item.label}</p>
                <p>{item.value}</p>
              </div>
            </a>
          );
        })}
      </div>

      {/* Social Links */}
      <div>
        <h3 className="text-xl font-bold mb-4">Follow Us</h3>
        <div className="flex space-x-4">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors"
                aria-label={social.label}
              >
                <Icon className="h-6 w-6" />
              </a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
