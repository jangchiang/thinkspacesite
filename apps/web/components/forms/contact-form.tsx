'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { type Locale } from '@/lib/i18n'

interface ContactFormProps {
  locale?: Locale
}

export function ContactForm({ locale = 'en' }: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus('idle')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      phone: formData.get('phone') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      locale,
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      const response = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setStatus('success')
        e.currentTarget.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  const t = {
    name: locale === 'th' ? 'ชื่อ' : 'Name',
    email: locale === 'th' ? 'อีเมล' : 'Email',
    company: locale === 'th' ? 'บริษัท' : 'Company',
    phone: locale === 'th' ? 'โทรศัพท์' : 'Phone',
    subject: locale === 'th' ? 'หัวข้อ' : 'Subject',
    message: locale === 'th' ? 'ข้อความ' : 'Message',
    submit: locale === 'th' ? 'ส่งข้อความ' : 'Send Message',
    success: locale === 'th' ? 'ส่งข้อความสำเร็จ!' : 'Message sent successfully!',
    successDesc: locale === 'th' ? 'เราจะติดต่อกลับโดยเร็วที่สุด' : 'We will get back to you soon.',
    error: locale === 'th' ? 'ส่งไม่สำเร็จ กรุณาลองอีกครั้ง' : 'Failed to send. Please try again.',
    sendAnother: locale === 'th' ? 'ส่งข้อความอีกครั้ง' : 'Send another message',
  }

  if (status === 'success') {
    return (
      <motion.div
        className="text-center py-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
          >
            <CheckCircle className="w-8 h-8 text-success" />
          </motion.div>
        </motion.div>
        <motion.h3
          className="text-xl font-semibold mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {t.success}
        </motion.h3>
        <motion.p
          className="text-base-content/70"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {t.successDesc}
        </motion.p>
        <motion.button
          className="btn btn-outline btn-sm mt-4"
          onClick={() => setStatus('idle')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t.sendAnother}
        </motion.button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text">{t.name} *</span>
          </label>
          <input
            type="text"
            name="name"
            required
            className="input input-bordered w-full"
            placeholder={t.name}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">{t.email} *</span>
          </label>
          <input
            type="email"
            name="email"
            required
            className="input input-bordered w-full"
            placeholder={t.email}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text">{t.company}</span>
          </label>
          <input
            type="text"
            name="company"
            className="input input-bordered w-full"
            placeholder={t.company}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">{t.phone}</span>
          </label>
          <input
            type="tel"
            name="phone"
            className="input input-bordered w-full"
            placeholder={t.phone}
          />
        </div>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">{t.subject}</span>
        </label>
        <input
          type="text"
          name="subject"
          className="input input-bordered w-full"
          placeholder={t.subject}
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">{t.message} *</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="textarea textarea-bordered w-full"
          placeholder={t.message}
        />
      </div>

      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            className="alert alert-error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <AlertCircle className="w-5 h-5" />
            <span>{t.error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary w-full md:w-auto gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            {t.submit}
            <Send className="w-5 h-5" />
          </>
        )}
      </motion.button>
    </form>
  )
}
