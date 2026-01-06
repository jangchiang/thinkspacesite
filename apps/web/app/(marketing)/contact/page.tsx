import type { Metadata } from 'next'
import { ContactForm } from '@/components/forms/contact-form'
import { Mail, Phone, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Think Space. Contact our team for inquiries about our enterprise technology solutions.',
}

export default function ContactPage(): React.JSX.Element {
  return (
    <div className="container-custom section-padding">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg text-base-content/70">
          Have a question or want to learn more about our solutions? We&apos;d love to
          hear from you.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-base-content/70">contact@thinkspace.com</p>
              <p className="text-base-content/70">sales@thinkspace.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Phone</h3>
              <p className="text-base-content/70">+1 (555) 123-4567</p>
              <p className="text-base-content/70">Mon-Fri 9am-6pm</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Office</h3>
              <p className="text-base-content/70">
                123 Tech Boulevard
                <br />
                San Francisco, CA 94105
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="card bg-base-200">
            <div className="card-body">
              <h2 className="card-title mb-4">Send us a message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
