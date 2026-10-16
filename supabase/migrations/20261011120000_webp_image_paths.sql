-- The site's photographs became WebP on 2026-10-11 (scripts/optimize-images.mjs).
-- Rows seeded with /images/name.jpg now point at /images/name.webp. The app also
-- normalises these paths at read time (lib/projects-map.ts), so this is tidy-up.
UPDATE public.projects
SET photo = regexp_replace(photo, '^(/images/[^/]+)\.jpe?g$', '\1.webp')
WHERE photo ~ '^/images/[^/]+\.jpe?g$';

UPDATE public.projects
SET gallery = (
  SELECT jsonb_agg(
    CASE
      WHEN item->>'src' ~ '^/images/[^/]+\.jpe?g$'
        THEN jsonb_set(item, '{src}', to_jsonb(regexp_replace(item->>'src', '^(/images/[^/]+)\.jpe?g$', '\1.webp')))
      ELSE item
    END
  )
  FROM jsonb_array_elements(gallery) AS item
)
WHERE jsonb_typeof(gallery) = 'array'
  AND gallery::text ~ '/images/[^/"]+\.jpe?g"';
