'use client'

import { useState } from 'react'
import { Send, Loader2, CheckCircle } from 'lucide-react'
import { type Locale } from '@/lib/i18n'

interface ContactFormProps {
  locale: Locale
}

export function ContactForm({ locale }: ContactFormProps) {
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
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{t.success}</h3>
        <p className="text-base-content/70">{t.successDesc}</p>
        <button
          className="btn btn-outline btn-sm mt-4"
          onClick={() => setStatus('idle')}
        >
          {t.sendAnother}
        </button>
      </div>
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

      {status === 'error' && (
        <div className="alert alert-error">
          <span>{t.error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary w-full md:w-auto"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            {t.submit}
            <Send className="w-5 h-5 ml-2" />
          </>
        )}
      </button>
    </form>
  )
}
