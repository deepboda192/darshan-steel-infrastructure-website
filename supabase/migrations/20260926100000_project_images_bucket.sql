-- Project cover images.
--
-- A public bucket for the photographs the admin editor uploads. Anyone can
-- read (the site renders them by public URL); only administrators can add,
-- replace or remove files.

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-images',
  'project-images',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
ON CONFLICT (id) DO UPDATE
SET public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Project images are public" ON storage.objects;
CREATE POLICY "Project images are public"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

DROP POLICY IF EXISTS "Admins upload project images" ON storage.objects;
CREATE POLICY "Admins upload project images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins replace project images" ON storage.objects;
CREATE POLICY "Admins replace project images"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins remove project images" ON storage.objects;
CREATE POLICY "Admins remove project images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));
