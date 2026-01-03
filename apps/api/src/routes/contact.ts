import { Elysia, t } from 'elysia'
import { supabase } from '@/lib/supabase'
import { sendContactConfirmation, sendContactNotification } from '@/services/email.service'
import { formRateLimit } from '@/middleware/rateLimit'

export const contactRoutes = new Elysia({ prefix: '/contact' })
  .use(formRateLimit)
  .post(
    '/',
    async ({ body, set }) => {
      try {
        // Insert into database
        const { data, error } = await supabase
          .from('contact_submissions')
          .insert({
            name: body.name,
            email: body.email,
            company: body.company,
            phone: body.phone,
            subject: body.subject,
            message: body.message,
            locale: body.locale || 'en',
          })
          .select()
          .single()

        if (error) {
          console.error('Contact insert error:', error)
          set.status = 500
          return {
            success: false,
            error: {
              code: 'DATABASE_ERROR',
              message: 'Failed to save contact submission',
            },
          }
        }

        // Send emails asynchronously
        const locale = body.locale || 'en'

        Promise.all([
          sendContactConfirmation(body.email, body.name, locale),
          sendContactNotification({
            name: body.name,
            email: body.email,
            company: body.company,
            message: body.message,
          }),
        ]).catch((err) => console.error('Contact emails failed:', err))

        set.status = 201
        return {
          success: true,
          data: { id: data.id },
          message: locale === 'th'
            ? 'ส่งข้อความสำเร็จ'
            : 'Message sent successfully',
        }
      } catch (error) {
        console.error('Contact submission error:', error)
        set.status = 500
        return {
          success: false,
          error: {
            code: 'INTERNAL_ERROR',
            message: 'An unexpected error occurred',
          },
        }
      }
    },
    {
      body: t.Object({
        name: t.String({ minLength: 2, maxLength: 100 }),
        email: t.String({ format: 'email' }),
        company: t.Optional(t.String({ maxLength: 200 })),
        phone: t.Optional(t.String({ maxLength: 20 })),
        subject: t.Optional(t.String({ maxLength: 200 })),
        message: t.String({ minLength: 10, maxLength: 5000 }),
        locale: t.Optional(t.String()),
      }),
      detail: {
        tags: ['Contact'],
        summary: 'Submit contact form',
        description: 'Handles contact form submissions',
      },
    }
  )
