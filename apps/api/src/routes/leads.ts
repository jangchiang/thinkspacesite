import { Elysia, t } from 'elysia'
import { supabase } from '@/lib/supabase'
import { sendLeadNotification } from '@/services/email.service'
import { formRateLimit } from '@/middleware/rateLimit'

export const leadsRoutes = new Elysia({ prefix: '/leads' })
  .use(formRateLimit)
  .post(
    '/',
    async ({ body, set }) => {
      try {
        // Insert into database
        const { data, error } = await supabase
          .from('leads')
          .insert({
            name: body.name,
            email: body.email,
            company: body.company,
            phone: body.phone,
            service_interest: body.service,
            message: body.message,
            source: body.source || 'website',
            locale: body.locale || 'en',
          })
          .select()
          .single()

        if (error) {
          console.error('Lead insert error:', error)
          set.status = 500
          return {
            success: false,
            error: {
              code: 'DATABASE_ERROR',
              message: 'Failed to save lead',
            },
          }
        }

        // Send notification email (async, don't wait)
        sendLeadNotification({
          name: body.name,
          email: body.email,
          company: body.company,
          phone: body.phone,
          service: body.service,
          message: body.message,
        }).catch((err) => console.error('Lead notification email failed:', err))

        set.status = 201
        return {
          success: true,
          data: { id: data.id },
          message: 'Lead submitted successfully',
        }
      } catch (error) {
        console.error('Lead submission error:', error)
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
        company: t.String({ minLength: 2, maxLength: 200 }),
        phone: t.Optional(t.String({ maxLength: 20 })),
        service: t.String({ minLength: 2, maxLength: 100 }),
        message: t.Optional(t.String({ maxLength: 2000 })),
        source: t.Optional(t.String()),
        locale: t.Optional(t.String()),
      }),
      detail: {
        tags: ['Leads'],
        summary: 'Submit a new lead',
        description: 'Creates a new lead from service inquiry form',
      },
    }
  )
