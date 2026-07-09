-- ============================================================
-- FIX: products/categories not loading on the website
-- Cause: the Supabase API roles (anon, service_role) were never
--        granted privileges on the public tables (error 42501).
-- Run this once in the Supabase Dashboard → SQL Editor → Run.
-- ============================================================

-- 1) Schema fix: the app reads/writes products.slug, but the
--    original schema.sql never created that column.
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS slug VARCHAR(150);

UPDATE public.products
SET slug = lower(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g'))
WHERE slug IS NULL OR slug = '';

CREATE UNIQUE INDEX IF NOT EXISTS products_slug_key ON public.products (slug);

-- 2) Grant privileges to the Supabase API roles so PostgREST
--    can actually read/write these tables.
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- Public site reads the catalog (read-only for the browser role)
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;

-- Server-side admin actions use the secret key (service_role)
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO service_role;

-- Sequences are needed for INSERTs (SERIAL id columns)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;

-- 3) Make any FUTURE tables inherit the same grants automatically.
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT ON TABLES TO anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT USAGE, SELECT ON SEQUENCES TO anon, authenticated, service_role;
