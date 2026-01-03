// Database types for Supabase

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
export type SubscriberStatus = 'active' | 'unsubscribed' | 'bounced'
export type ContactFormType = 'general' | 'sales' | 'support' | 'partner'
export type EventAttendanceStatus = 'registered' | 'confirmed' | 'attended' | 'no-show' | 'cancelled'

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone: string | null
          company: string | null
          job_title: string | null
          message: string | null
          service: string | null
          source: string
          status: LeadStatus
          assigned_to: string | null
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          company?: string | null
          job_title?: string | null
          message?: string | null
          service?: string | null
          source?: string
          status?: LeadStatus
          assigned_to?: string | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          company?: string | null
          job_title?: string | null
          message?: string | null
          service?: string | null
          source?: string
          status?: LeadStatus
          assigned_to?: string | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          status: SubscriberStatus
          preferences: Json
          subscribed_at: string
          unsubscribed_at: string | null
          confirmation_token: string | null
          confirmed_at: string | null
        }
        Insert: {
          id?: string
          email: string
          status?: SubscriberStatus
          preferences?: Json
          subscribed_at?: string
          unsubscribed_at?: string | null
          confirmation_token?: string | null
          confirmed_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          status?: SubscriberStatus
          preferences?: Json
          subscribed_at?: string
          unsubscribed_at?: string | null
          confirmation_token?: string | null
          confirmed_at?: string | null
        }
      }
      event_registrations: {
        Row: {
          id: string
          event_id: string
          first_name: string
          last_name: string
          email: string
          company: string | null
          job_title: string | null
          dietary_requirements: string | null
          status: string
          attendance_status: EventAttendanceStatus | null
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          first_name: string
          last_name: string
          email: string
          company?: string | null
          job_title?: string | null
          dietary_requirements?: string | null
          status?: string
          attendance_status?: EventAttendanceStatus | null
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          first_name?: string
          last_name?: string
          email?: string
          company?: string | null
          job_title?: string | null
          dietary_requirements?: string | null
          status?: string
          attendance_status?: EventAttendanceStatus | null
          metadata?: Json
          created_at?: string
        }
      }
      resource_downloads: {
        Row: {
          id: string
          resource_id: string
          resource_type: string
          first_name: string | null
          last_name: string | null
          email: string
          company: string | null
          downloaded_at: string
        }
        Insert: {
          id?: string
          resource_id: string
          resource_type: string
          first_name?: string | null
          last_name?: string | null
          email: string
          company?: string | null
          downloaded_at?: string
        }
        Update: {
          id?: string
          resource_id?: string
          resource_type?: string
          first_name?: string | null
          last_name?: string | null
          email?: string
          company?: string | null
          downloaded_at?: string
        }
      }
      analytics_events: {
        Row: {
          id: string
          session_id: string | null
          event_type: string
          page_path: string | null
          referrer: string | null
          user_agent: string | null
          ip_hash: string | null
          country: string | null
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          session_id?: string | null
          event_type: string
          page_path?: string | null
          referrer?: string | null
          user_agent?: string | null
          ip_hash?: string | null
          country?: string | null
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string | null
          event_type?: string
          page_path?: string | null
          referrer?: string | null
          user_agent?: string | null
          ip_hash?: string | null
          country?: string | null
          metadata?: Json
          created_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          form_type: ContactFormType
          first_name: string
          last_name: string
          email: string
          phone: string | null
          company: string | null
          subject: string | null
          message: string
          status: string
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          form_type: ContactFormType
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          company?: string | null
          subject?: string | null
          message: string
          status?: string
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          form_type?: ContactFormType
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          company?: string | null
          subject?: string | null
          message?: string
          status?: string
          metadata?: Json
          created_at?: string
        }
      }
    }
  }
}

// Helper types
export type Lead = Database['public']['Tables']['leads']['Row']
export type LeadInsert = Database['public']['Tables']['leads']['Insert']
export type LeadUpdate = Database['public']['Tables']['leads']['Update']

export type NewsletterSubscriber = Database['public']['Tables']['newsletter_subscribers']['Row']
export type NewsletterSubscriberInsert = Database['public']['Tables']['newsletter_subscribers']['Insert']

export type EventRegistration = Database['public']['Tables']['event_registrations']['Row']
export type EventRegistrationInsert = Database['public']['Tables']['event_registrations']['Insert']

export type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row']
export type ContactSubmissionInsert = Database['public']['Tables']['contact_submissions']['Insert']

export type AnalyticsEvent = Database['public']['Tables']['analytics_events']['Row']
export type AnalyticsEventInsert = Database['public']['Tables']['analytics_events']['Insert']
