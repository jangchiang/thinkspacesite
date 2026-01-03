import { Elysia, t } from 'elysia'
import { supabase } from '@/lib/supabase'
import { sendNewsletterWelcome } from '@/services/email.service'
import { formRateLimit } from '@/middleware/rateLimit'

export const newsletterRoutes = new Elysia({ prefix: '/newsletter' })
  .use(formRateLimit)
  .post(
    '/subscribe',
    async ({ body, set }) => {
      try {
        // Check if already subscribed
        const { data: existing } = await supabase
          .from('newsletter_subscribers')
          .select('id, status')
          .eq('email', body.email)
          .single()

        if (existing) {
          if (existing.status === 'active') {
            return {
              success: true,
              message: body.locale === 'th'
                ? 'คุณได้สมัครรับข่าวสารแล้ว'
                : 'You are already subscribed',
            }
          }

          // Reactivate if previously unsubscribed
          await supabase
            .from('newsletter_subscribers')
            .update({ status: 'active', resubscribed_at: new Date().toISOString() })
            .eq('id', existing.id)

          return {
            success: true,
            message: body.locale === 'th'
              ? 'สมัครรับข่าวสารอีกครั้งสำเร็จ'
              : 'Successfully resubscribed',
          }
        }

        // Insert new subscriber
        const { error } = await supabase
          .from('newsletter_subscribers')
          .insert({
            email: body.email,
            name: body.name,
            locale: body.locale || 'en',
            source: body.source || 'website',
          })

        if (error) {
          console.error('Newsletter subscribe error:', error)
          set.status = 500
          return {
            success: false,
            error: {
              code: 'DATABASE_ERROR',
              message: 'Failed to subscribe',
            },
          }
        }

        // Send welcome email
        sendNewsletterWelcome(body.email, body.locale || 'en')
          .catch((err) => console.error('Newsletter welcome email failed:', err))

        set.status = 201
        return {
          success: true,
          message: body.locale === 'th'
            ? 'สมัครรับข่าวสารสำเร็จ'
            : 'Successfully subscribed',
        }
      } catch (error) {
        console.error('Newsletter subscription error:', error)
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
        email: t.String({ format: 'email' }),
        name: t.Optional(t.String({ maxLength: 100 })),
        locale: t.Optional(t.String()),
        source: t.Optional(t.String()),
      }),
      detail: {
        tags: ['Newsletter'],
        summary: 'Subscribe to newsletter',
        description: 'Adds email to newsletter subscription list',
      },
    }
  )
  .post(
    '/unsubscribe',
    async ({ body, set }) => {
      try {
        const { error } = await supabase
          .from('newsletter_subscribers')
          .update({ status: 'unsubscribed', unsubscribed_at: new Date().toISOString() })
          .eq('email', body.email)

        if (error) {
          console.error('Newsletter unsubscribe error:', error)
          set.status = 500
          return {
            success: false,
            error: {
              code: 'DATABASE_ERROR',
              message: 'Failed to unsubscribe',
            },
          }
        }

        return {
          success: true,
          message: body.locale === 'th'
            ? 'ยกเลิกการสมัครสำเร็จ'
            : 'Successfully unsubscribed',
        }
      } catch (error) {
        console.error('Newsletter unsubscribe error:', error)
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
        email: t.String({ format: 'email' }),
        locale: t.Optional(t.String()),
      }),
      detail: {
        tags: ['Newsletter'],
        summary: 'Unsubscribe from newsletter',
        description: 'Removes email from newsletter subscription list',
      },
    }
  )
