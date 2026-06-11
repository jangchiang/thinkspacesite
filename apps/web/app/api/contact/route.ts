import { NextResponse } from 'next/server'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('A valid email is required'),
  message: z.string().trim().min(1, 'Message is required'),
  company: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  subject: z.string().trim().optional(),
  locale: z.string().trim().optional(),
})

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, errors: { _form: ['Invalid JSON body'] } },
      { status: 400 }
    )
  }

  const result = contactSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      { ok: false, errors: result.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const { name, email, company, phone, subject, locale } = result.data

  // No email provider wired up yet — log the submission server-side.
  // Swap this for the Elysia /contact endpoint or an email service later.
  console.info('[contact] new submission', {
    name,
    email,
    company: company || null,
    phone: phone || null,
    subject: subject || null,
    locale: locale || null,
    receivedAt: new Date().toISOString(),
  })

  return NextResponse.json({ ok: true }, { status: 200 })
}
