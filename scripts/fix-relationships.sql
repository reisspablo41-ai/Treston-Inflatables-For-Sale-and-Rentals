-- ============================================================
-- FIX: products don't display — "Could not find a relationship
-- between 'products' and 'product_images'" (PostgREST PGRST200).
--
-- Cause: the actual database is missing the foreign-key
-- constraints, so PostgREST can't resolve the embedded joins
-- (product_images(...) and categories(...)) the app uses.
--
-- Run once in Supabase Dashboard → SQL Editor → Run.
-- ============================================================

-- Safety: make sure no orphaned rows block the constraints.
UPDATE public.products p
SET category_id = NULL
WHERE category_id IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM public.categories c WHERE c.id = p.category_id);

DELETE FROM public.product_images pi
WHERE NOT EXISTS (SELECT 1 FROM public.products p WHERE p.id = pi.product_id);

-- FK: products.category_id -> categories.id
ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_category_id_fkey;
ALTER TABLE public.products
  ADD CONSTRAINT products_category_id_fkey
  FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE SET NULL;

-- FK: product_images.product_id -> products.id
ALTER TABLE public.product_images DROP CONSTRAINT IF EXISTS product_images_product_id_fkey;
ALTER TABLE public.product_images
  ADD CONSTRAINT product_images_product_id_fkey
  FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;

-- Tell PostgREST to reload its schema cache so the joins work immediately.
NOTIFY pgrst, 'reload schema';
