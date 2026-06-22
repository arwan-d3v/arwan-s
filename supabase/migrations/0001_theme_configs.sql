-- 0001_theme_configs.sql
-- Migration to create and seed the theme_configs and admin_config tables

-- Create theme_configs table if not exists
CREATE TABLE IF NOT EXISTS public.theme_configs (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    layout_id TEXT,
    preview_url TEXT,
    palette JSONB NOT NULL,
    video_background TEXT,
    min_role TEXT DEFAULT 'public',
    active BOOLEAN DEFAULT true,
    is_default BOOLEAN DEFAULT false,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure admin_config table exists
CREATE TABLE IF NOT EXISTS public.admin_config (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed Initial 3 Public Themes
INSERT INTO public.theme_configs (id, name, category, layout_id, palette, video_background, min_role, active, is_default, sort_order)
VALUES
    (
        'zenitsu',
        'Zenitsu Agatsuma',
        'public',
        'classic',
        '{"primary": "#FFD700", "secondary": "#1a1a1a", "background": "#0d0d0d", "text": "#F5F5F5", "accent": "#E60000"}',
        'zenitsu-bg.mp4',
        'public',
        true,
        true,
        1
    ),
    (
        'gojo',
        'Satoru Gojo',
        'public',
        'classic',
        '{"primary": "#4A90D9", "secondary": "#1a1a1a", "background": "#0d0d0d", "text": "#F5F5F5", "accent": "#d946ef"}',
        'gojo-bg.mp4',
        'public',
        true,
        false,
        2
    ),
    (
        'igris',
        'Shadow Commander Igris',
        'public',
        'classic',
        '{"primary": "#8B5CF6", "secondary": "#1a1a1a", "background": "#0d0d0d", "text": "#F5F5F5", "accent": "#ef4444"}',
        'igris-bg.mp4',
        'public',
        true,
        false,
        3
    )
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    palette = EXCLUDED.palette,
    video_background = EXCLUDED.video_background,
    is_default = EXCLUDED.is_default;

-- Seed admin_config with default theme
INSERT INTO public.admin_config (key, value)
VALUES ('active_theme_id', 'zenitsu')
ON CONFLICT (key) DO NOTHING;

-- Enforce single is_default policy using a trigger
CREATE OR REPLACE FUNCTION ensure_single_default_theme()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_default = true THEN
        UPDATE public.theme_configs
        SET is_default = false
        WHERE id != NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS single_default_theme ON public.theme_configs;
CREATE TRIGGER single_default_theme
BEFORE INSERT OR UPDATE OF is_default ON public.theme_configs
FOR EACH ROW
EXECUTE FUNCTION ensure_single_default_theme();
