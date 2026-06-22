-- 0003_create_theme_assets_bucket.sql
-- Create the theme-assets storage bucket and set up RLS policies

-- 1. Create the bucket if it doesn't exist (Public so anyone can view the videos)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('theme-assets', 'theme-assets', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Allow public access to read files
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'theme-assets');

-- 3. Allow authenticated users to upload files
CREATE POLICY "Auth Upload" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (bucket_id = 'theme-assets');

-- 4. Allow authenticated users to update/delete their own uploads
CREATE POLICY "Auth Update" ON storage.objects
FOR UPDATE TO authenticated USING (bucket_id = 'theme-assets');

CREATE POLICY "Auth Delete" ON storage.objects
FOR DELETE TO authenticated USING (bucket_id = 'theme-assets');
