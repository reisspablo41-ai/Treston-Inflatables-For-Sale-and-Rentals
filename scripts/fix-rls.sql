-- ============================================================
-- Public read RLS policies for the storefront catalog.
-- Run once in Supabase Dashboard → SQL Editor → Run.
--
-- This lets the anon (publishable) key read the catalog so the
-- public website fetches through RLS instead of the secret key.
-- Writes are NOT granted to anon — admin actions use the secret
-- key server-side and bypass RLS.
-- ============================================================

-- Make sure RLS is on for these tables
ALTER TABLE public.categories      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images  ENABLE ROW LEVEL SECURITY;

-- Idempotent: drop any prior copy of these policies, then recreate
DROP POLICY IF EXISTS "Public read categories"     ON public.categories;
DROP POLICY IF EXISTS "Public read products"       ON public.products;
DROP POLICY IF EXISTS "Public read product_images" ON public.product_images;

CREATE POLICY "Public read categories"
  ON public.categories
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read products"
  ON public.products
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read product_images"
  ON public.product_images
  FOR SELECT
  TO anon, authenticated
  USING (true);
