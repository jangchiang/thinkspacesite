// src/components/layout/Footer.tsx
'use client'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-green-600">Think Space</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Implementing new era technology solutions
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-green-600 dark:text-gray-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600 dark:text-gray-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600 dark:text-gray-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/software-solutions" className="text-gray-600 hover:text-green-600 dark:text-gray-300">
                  Software Solutions
                </Link>
              </li>
              <li>
                <Link href="/services/ai-&-datascience" className="text-gray-600 hover:text-green-600 dark:text-gray-300">
                  AI & Data Science
                </Link>
              </li>
              <li>
                <Link href="/services/3d-printing" className="text-gray-600 hover:text-green-600 dark:text-gray-300">
                  3D Printing
                </Link>
              </li>
              <li>
                <Link href="/services/iot-systems" className="text-gray-600 hover:text-green-600 dark:text-gray-300">
                  IoT Systems
                </Link>
              </li>
              <li>
                <Link href="/services/cybersecurity" className="text-gray-600 hover:text-green-600 dark:text-gray-300">
                  Cybersecurity
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-green-600 dark:text-gray-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-gray-600 hover:text-green-600 dark:text-gray-300">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-green-600 dark:text-gray-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <Mail size={16} />
                <span>info@thinkspace.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <Phone size={16} />
                <span>+1 234 567 890</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} Think Space Technology. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}