-- Enable Row Level Security on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- ===================
-- Public Insert Policies (for forms)
-- ===================

DROP POLICY IF EXISTS "Allow public lead submission" ON leads;
CREATE POLICY "Allow public lead submission" ON leads
    FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public newsletter subscription" ON newsletter_subscribers;
CREATE POLICY "Allow public newsletter subscription" ON newsletter_subscribers
    FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public event registration" ON event_registrations;
CREATE POLICY "Allow public event registration" ON event_registrations
    FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public resource download tracking" ON resource_downloads;
CREATE POLICY "Allow public resource download tracking" ON resource_downloads
    FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public analytics events" ON analytics_events;
CREATE POLICY "Allow public analytics events" ON analytics_events
    FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public contact submission" ON contact_submissions;
CREATE POLICY "Allow public contact submission" ON contact_submissions
    FOR INSERT
    WITH CHECK (true);

-- ===================
-- Authenticated Read Policies (for admin)
-- ===================

DROP POLICY IF EXISTS "Allow authenticated users to read leads" ON leads;
CREATE POLICY "Allow authenticated users to read leads" ON leads
    FOR SELECT
    USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated users to update leads" ON leads;
CREATE POLICY "Allow authenticated users to update leads" ON leads
    FOR UPDATE
    USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated users to read subscribers" ON newsletter_subscribers;
CREATE POLICY "Allow authenticated users to read subscribers" ON newsletter_subscribers
    FOR SELECT
    USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated users to update subscribers" ON newsletter_subscribers;
CREATE POLICY "Allow authenticated users to update subscribers" ON newsletter_subscribers
    FOR UPDATE
    USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated users to read events" ON event_registrations;
CREATE POLICY "Allow authenticated users to read events" ON event_registrations
    FOR SELECT
    USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated users to read analytics" ON analytics_events;
CREATE POLICY "Allow authenticated users to read analytics" ON analytics_events
    FOR SELECT
    USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated users to read contacts" ON contact_submissions;
CREATE POLICY "Allow authenticated users to read contacts" ON contact_submissions
    FOR SELECT
    USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated users to update contacts" ON contact_submissions;
CREATE POLICY "Allow authenticated users to update contacts" ON contact_submissions
    FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Note: The service role key bypasses RLS, use for server-side operations
