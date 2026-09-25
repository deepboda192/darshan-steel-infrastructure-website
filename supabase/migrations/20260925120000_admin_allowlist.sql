-- Admin allow-list.
--
-- Staff addresses listed here receive the admin role automatically: at once
-- if the account already exists, and on sign-up otherwise (the sign-up
-- trigger below checks the list). Nobody but the service role can read or
-- change the list; the trigger runs as its definer, so it can.

CREATE TABLE IF NOT EXISTS public.admin_allowlist (
  email text PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now()
);

REVOKE ALL ON public.admin_allowlist FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.admin_allowlist TO service_role;
ALTER TABLE public.admin_allowlist ENABLE ROW LEVEL SECURITY;

INSERT INTO public.admin_allowlist (email)
VALUES ('shrey.kanani@darshansteelinfra.com')
ON CONFLICT (email) DO NOTHING;

-- Sign-up trigger: the first account ever, or any allow-listed address,
-- becomes an admin; everyone else is a plain user until an admin promotes
-- them from /admin/users.
CREATE OR REPLACE FUNCTION public.bootstrap_first_admin()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin')
     OR EXISTS (
       SELECT 1 FROM public.admin_allowlist
       WHERE lower(email) = lower(NEW.email)
     )
  THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT DO NOTHING;
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user')
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.bootstrap_first_admin() FROM PUBLIC, anon, authenticated;

-- Accounts that already exist for an allow-listed address get the role now.
INSERT INTO public.user_roles (user_id, role)
SELECT u.id, 'admin'
FROM auth.users u
JOIN public.admin_allowlist a ON lower(a.email) = lower(u.email)
ON CONFLICT (user_id, role) DO NOTHING;
