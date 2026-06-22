-- 0002_theme_crud_hybrid.sql
-- Migration to add hybrid video options and frontend metadata to theme_configs

ALTER TABLE public.theme_configs
ADD COLUMN IF NOT EXISTS video_portrait TEXT,
ADD COLUMN IF NOT EXISTS focal_point TEXT DEFAULT '50% 50%',
ADD COLUMN IF NOT EXISTS edition_label TEXT DEFAULT 'Standard Edition',
ADD COLUMN IF NOT EXISTS accent_name TEXT DEFAULT 'Standard';

-- Update the existing seed data with their correct labels
UPDATE public.theme_configs
SET 
  focal_point = '50% 50%',
  edition_label = 'Thunder Breathing · Zenitsu Edition',
  accent_name = 'Yellow'
WHERE id = 'zenitsu';

UPDATE public.theme_configs
SET 
  focal_point = '50% 50%',
  edition_label = 'Limitless Void · Gojo Edition',
  accent_name = 'Blue'
WHERE id = 'gojo';

UPDATE public.theme_configs
SET 
  focal_point = '50% 50%',
  edition_label = 'Shadow Commander · Igris Edition',
  accent_name = 'Purple'
WHERE id = 'igris';
