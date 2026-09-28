-- Storing enquiries without the service-role key.
--
-- The contact form posts to the site's own API route, which validates and
-- rate-limits the submission and then stores it. Storing used the
-- service-role client, which only exists where that secret is configured.
-- This function does the insert as its definer instead, so the API can call
-- it with the publishable key. Only the API should call it: the anon grant
-- is what the API's client carries, and the API remains the gate (honeypot,
-- validation, rate limit) in front of it.

CREATE OR REPLACE FUNCTION public.submit_enquiry(
  _name text,
  _company text,
  _phone text,
  _email text,
  _project_type text,
  _location text,
  _area text,
  _message text,
  _subject text,
  _ip text,
  _user_agent text,
  _referer text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_id uuid;
BEGIN
  IF coalesce(btrim(_name), '') = '' OR coalesce(btrim(_phone), '') = '' OR coalesce(btrim(_email), '') = '' THEN
    RAISE EXCEPTION 'name, phone and email are required';
  END IF;

  INSERT INTO public.enquiries (
    name, company, phone, email, project_type, location, area, message, subject, ip, user_agent, referer
  ) VALUES (
    left(btrim(_name), 120),
    nullif(left(btrim(coalesce(_company, '')), 120), ''),
    left(btrim(_phone), 40),
    left(lower(btrim(_email)), 200),
    nullif(left(btrim(coalesce(_project_type, '')), 80), ''),
    nullif(left(btrim(coalesce(_location, '')), 160), ''),
    nullif(left(btrim(coalesce(_area, '')), 80), ''),
    nullif(left(coalesce(_message, ''), 4000), ''),
    coalesce(nullif(btrim(_subject), ''), 'Request Quote'),
    nullif(left(coalesce(_ip, ''), 64), ''),
    nullif(left(coalesce(_user_agent, ''), 200), ''),
    nullif(left(coalesce(_referer, ''), 300), '')
  )
  RETURNING id INTO new_id;

  RETURN new_id;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.submit_enquiry(text, text, text, text, text, text, text, text, text, text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_enquiry(text, text, text, text, text, text, text, text, text, text, text, text) TO anon, authenticated, service_role;

-- The panel marks enquiries handled; admins only.
DROP POLICY IF EXISTS "Authenticated staff can update enquiries" ON public.enquiries;
CREATE POLICY "Admins update enquiries"
ON public.enquiries FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Authenticated staff can read enquiries" ON public.enquiries;
CREATE POLICY "Admins read enquiries"
ON public.enquiries FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
