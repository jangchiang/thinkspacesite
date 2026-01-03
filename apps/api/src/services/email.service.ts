import { Resend } from 'resend'

const resendApiKey = process.env.RESEND_API_KEY || ''
const fromEmail = process.env.FROM_EMAIL || 'noreply@thinkspace.com'
const adminEmail = process.env.ADMIN_EMAIL || 'admin@thinkspace.com'

const resend = new Resend(resendApiKey)

interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}

export const sendEmail = async (options: EmailOptions): Promise<{ success: boolean; id?: string; error?: string }> => {
  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    })

    if (error) {
      console.error('Email send error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, id: data?.id }
  } catch (error) {
    console.error('Email send exception:', error)
    return { success: false, error: 'Failed to send email' }
  }
}

// Email templates
export const sendContactConfirmation = async (email: string, name: string, locale: string = 'en') => {
  const subject = locale === 'th'
    ? 'ขอบคุณสำหรับการติดต่อ Think Space'
    : 'Thank you for contacting Think Space'

  const html = locale === 'th'
    ? `
      <h1>สวัสดีคุณ ${name},</h1>
      <p>ขอบคุณที่ติดต่อ Think Space</p>
      <p>เราได้รับข้อความของคุณแล้วและจะติดต่อกลับภายใน 24 ชั่วโมง</p>
      <br/>
      <p>ขอแสดงความนับถือ,<br/>ทีม Think Space</p>
    `
    : `
      <h1>Hello ${name},</h1>
      <p>Thank you for reaching out to Think Space.</p>
      <p>We have received your message and will get back to you within 24 hours.</p>
      <br/>
      <p>Best regards,<br/>The Think Space Team</p>
    `

  return sendEmail({ to: email, subject, html })
}

export const sendContactNotification = async (data: {
  name: string
  email: string
  company?: string
  message: string
}) => {
  const subject = `New Contact Form Submission from ${data.name}`

  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
    <hr/>
    <p><strong>Message:</strong></p>
    <p>${data.message}</p>
  `

  return sendEmail({
    to: adminEmail,
    subject,
    html,
    replyTo: data.email,
  })
}

export const sendNewsletterWelcome = async (email: string, locale: string = 'en') => {
  const subject = locale === 'th'
    ? 'ยินดีต้อนรับสู่ Think Space Newsletter'
    : 'Welcome to Think Space Newsletter'

  const html = locale === 'th'
    ? `
      <h1>ยินดีต้อนรับ!</h1>
      <p>ขอบคุณที่สมัครรับข่าวสารจาก Think Space</p>
      <p>คุณจะได้รับข้อมูลเชิงลึกด้านเทคโนโลยี กรณีศึกษา และข่าวสารล่าสุด</p>
      <br/>
      <p>ขอแสดงความนับถือ,<br/>ทีม Think Space</p>
    `
    : `
      <h1>Welcome!</h1>
      <p>Thank you for subscribing to Think Space newsletter.</p>
      <p>You'll receive technology insights, case studies, and the latest updates.</p>
      <br/>
      <p>Best regards,<br/>The Think Space Team</p>
    `

  return sendEmail({ to: email, subject, html })
}

export const sendLeadNotification = async (data: {
  name: string
  email: string
  company: string
  phone?: string
  service: string
  message?: string
}) => {
  const subject = `New Lead: ${data.company} - ${data.service}`

  const html = `
    <h2>New Lead Submission</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Company:</strong> ${data.company}</p>
    ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
    <p><strong>Service Interest:</strong> ${data.service}</p>
    ${data.message ? `<hr/><p><strong>Message:</strong></p><p>${data.message}</p>` : ''}
  `

  return sendEmail({
    to: adminEmail,
    subject,
    html,
    replyTo: data.email,
  })
}
