# Supabase Instructions
## Database & Authentication Guide

---

## Overview

- **Database:** PostgreSQL 15
- **Auth:** Supabase Auth (JWT)
- **Storage:** Supabase Storage (S3-compatible)
- **Realtime:** Supabase Realtime (optional)

---

## Schema Design

### Core Tables

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===================
-- Leads & Contacts
-- ===================

CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    job_title VARCHAR(100),
    message TEXT,
    service VARCHAR(100),
    source VARCHAR(100) DEFAULT 'website',
    status VARCHAR(50) DEFAULT 'new',
    assigned_to UUID,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created ON leads(created_at DESC);

-- ===================
-- Newsletter
-- ===================

CREATE TABLE newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    preferences JSONB DEFAULT '{
        "updates": true,
        "blog": true,
        "events": true
    }',
    subscribed_at TIMESTAMPTZ DEFAULT NOW(),
    unsubscribed_at TIMESTAMPTZ,
    confirmation_token VARCHAR(100),
    confirmed_at TIMESTAMPTZ
);

CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_status ON newsletter_subscribers(status);

-- ===================
-- Event Registrations
-- ===================

CREATE TABLE event_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    job_title VARCHAR(100),
    dietary_requirements TEXT,
    status VARCHAR(50) DEFAULT 'registered',
    attendance_status VARCHAR(50),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_events_event_id ON event_registrations(event_id);
CREATE INDEX idx_events_email ON event_registrations(email);

-- ===================
-- Resource Downloads
-- ===================

CREATE TABLE resource_downloads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resource_id VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    downloaded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_downloads_resource ON resource_downloads(resource_id);
CREATE INDEX idx_downloads_email ON resource_downloads(email);

-- ===================
-- Analytics Events
-- ===================

CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR(100),
    event_type VARCHAR(100) NOT NULL,
    page_path VARCHAR(500),
    referrer VARCHAR(500),
    user_agent TEXT,
    ip_hash VARCHAR(64),
    country VARCHAR(2),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_analytics_session ON analytics_events(session_id);
CREATE INDEX idx_analytics_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_created ON analytics_events(created_at DESC);

-- Partitioning for analytics (monthly)
-- CREATE TABLE analytics_events_2026_01 PARTITION OF analytics_events
--     FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');

-- ===================
-- Contact Form Submissions
-- ===================

CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    form_type VARCHAR(50) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contact_form_type ON contact_submissions(form_type);
CREATE INDEX idx_contact_status ON contact_submissions(status);
```

### Trigger for Updated At

```sql
-- Function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to leads table
CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

---

## Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- ===================
-- Public Insert Policies (for forms)
-- ===================

CREATE POLICY "Allow public lead submission" ON leads
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow public newsletter subscription" ON newsletter_subscribers
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow public event registration" ON event_registrations
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow public resource download tracking" ON resource_downloads
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow public analytics events" ON analytics_events
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow public contact submission" ON contact_submissions
    FOR INSERT
    WITH CHECK (true);

-- ===================
-- Authenticated Read Policies (for admin)
-- ===================

CREATE POLICY "Allow authenticated users to read leads" ON leads
    FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update leads" ON leads
    FOR UPDATE
    USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to read subscribers" ON newsletter_subscribers
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- ===================
-- Service Role Full Access
-- ===================
-- The service role key bypasses RLS, use for server-side operations
```

---

## TypeScript Types

```typescript
// types/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

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
          status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
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
          status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
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
          status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
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
          status: 'active' | 'unsubscribed' | 'bounced'
          preferences: Json
          subscribed_at: string
          unsubscribed_at: string | null
          confirmation_token: string | null
          confirmed_at: string | null
        }
        Insert: {
          id?: string
          email: string
          status?: 'active' | 'unsubscribed' | 'bounced'
          preferences?: Json
          subscribed_at?: string
          unsubscribed_at?: string | null
          confirmation_token?: string | null
          confirmed_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          status?: 'active' | 'unsubscribed' | 'bounced'
          preferences?: Json
          subscribed_at?: string
          unsubscribed_at?: string | null
          confirmation_token?: string | null
          confirmed_at?: string | null
        }
      }
      // ... other tables
    }
  }
}
```

---

## Supabase Client Setup

### Server-Side (API/SSR)

```typescript
// lib/supabase-server.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

// Service role client (bypasses RLS)
export const supabaseAdmin = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)
```

### Client-Side

```typescript
// lib/supabase-client.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

// Anon client (respects RLS)
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

---

## Common Operations

### Insert

```typescript
// Create lead
const { data, error } = await supabase
  .from('leads')
  .insert({
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    message: 'Interested in cloud services',
  })
  .select()
  .single()

if (error) throw error
```

### Select

```typescript
// Get all leads
const { data, error } = await supabase
  .from('leads')
  .select('*')
  .order('created_at', { ascending: false })

// Get leads with filters
const { data, error } = await supabase
  .from('leads')
  .select('*')
  .eq('status', 'new')
  .gte('created_at', '2026-01-01')
  .order('created_at', { ascending: false })
  .limit(10)

// Get single record
const { data, error } = await supabase
  .from('leads')
  .select('*')
  .eq('id', leadId)
  .single()
```

### Update

```typescript
// Update lead status
const { data, error } = await supabase
  .from('leads')
  .update({ 
    status: 'contacted',
    metadata: { 
      last_contact: new Date().toISOString(),
      notes: 'Called and left voicemail'
    }
  })
  .eq('id', leadId)
  .select()
  .single()
```

### Upsert

```typescript
// Upsert newsletter subscriber
const { data, error } = await supabase
  .from('newsletter_subscribers')
  .upsert(
    { email: 'user@example.com', status: 'active' },
    { onConflict: 'email' }
  )
  .select()
  .single()
```

### Delete

```typescript
// Soft delete (update status)
const { error } = await supabase
  .from('newsletter_subscribers')
  .update({ 
    status: 'unsubscribed',
    unsubscribed_at: new Date().toISOString()
  })
  .eq('email', email)
```

---

## Aggregations & Analytics

```typescript
// Count leads by status
const { data, error } = await supabase
  .from('leads')
  .select('status', { count: 'exact' })
  .eq('status', 'new')

// Get count
const { count, error } = await supabase
  .from('leads')
  .select('*', { count: 'exact', head: true })
  .gte('created_at', startDate)
  .lte('created_at', endDate)
```

### Using SQL Functions

```sql
-- Create function for lead stats
CREATE OR REPLACE FUNCTION get_lead_stats(start_date DATE, end_date DATE)
RETURNS TABLE (
    status TEXT,
    count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        l.status::TEXT,
        COUNT(*)::BIGINT
    FROM leads l
    WHERE l.created_at >= start_date 
      AND l.created_at < end_date
    GROUP BY l.status;
END;
$$ LANGUAGE plpgsql;
```

```typescript
// Call function
const { data, error } = await supabase
  .rpc('get_lead_stats', {
    start_date: '2026-01-01',
    end_date: '2026-02-01'
  })
```

---

## Migrations

### Create Migration

```bash
# Using Supabase CLI
supabase migration new add_leads_table
```

### Migration File

```sql
-- supabase/migrations/20260103000000_add_leads_table.sql

CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    -- ... columns
);

-- Down migration (optional, in separate file)
-- DROP TABLE IF EXISTS leads;
```

### Apply Migrations

```bash
# Local
supabase db push

# Production
supabase db push --linked
```

---

## Database Functions

### Lead Scoring

```sql
CREATE OR REPLACE FUNCTION calculate_lead_score(lead_id UUID)
RETURNS INTEGER AS $$
DECLARE
    score INTEGER := 0;
    lead_record RECORD;
BEGIN
    SELECT * INTO lead_record FROM leads WHERE id = lead_id;
    
    -- Company provided: +20
    IF lead_record.company IS NOT NULL THEN
        score := score + 20;
    END IF;
    
    -- Phone provided: +15
    IF lead_record.phone IS NOT NULL THEN
        score := score + 15;
    END IF;
    
    -- Job title provided: +10
    IF lead_record.job_title IS NOT NULL THEN
        score := score + 10;
    END IF;
    
    -- Message provided: +15
    IF lead_record.message IS NOT NULL AND LENGTH(lead_record.message) > 50 THEN
        score := score + 15;
    END IF;
    
    RETURN score;
END;
$$ LANGUAGE plpgsql;
```

---

## Scheduled Jobs (pg_cron)

```sql
-- Enable pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Clean up old analytics data (keep 90 days)
SELECT cron.schedule(
    'cleanup-old-analytics',
    '0 3 * * *',  -- Daily at 3 AM
    $$DELETE FROM analytics_events WHERE created_at < NOW() - INTERVAL '90 days'$$
);

-- Send daily lead summary
SELECT cron.schedule(
    'daily-lead-summary',
    '0 9 * * 1-5',  -- Weekdays at 9 AM
    $$SELECT send_lead_summary()$$
);
```

---

## Environment Variables

```bash
# Supabase connection
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Direct database (for migrations)
DATABASE_URL=postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres
```
