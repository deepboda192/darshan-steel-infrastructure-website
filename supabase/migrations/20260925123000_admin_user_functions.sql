-- Staff-account management without the service-role key.
--
-- The admin Users screen used to list accounts through a server function
-- backed by the service-role client, which only exists where that secret
-- is configured. These two functions do the same work inside the database,
-- run as their definer, and refuse anyone who does not hold the admin role,
-- so the signed-in browser client can call them directly.

CREATE OR REPLACE FUNCTION public.admin_list_users()
RETURNS TABLE (
  id uuid,
  email text,
  created_at timestamptz,
  last_sign_in_at timestamptz,
  is_admin boolean
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Admin role required' USING ERRCODE = '42501';
  END IF;

  RETURN QUERY
  SELECT
    u.id,
    u.email::text,
    u.created_at,
    u.last_sign_in_at,
    EXISTS (
      SELECT 1 FROM public.user_roles r
      WHERE r.user_id = u.id AND r.role = 'admin'
    ) AS is_admin
  FROM auth.users u
  ORDER BY u.created_at;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_list_users() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_users() TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.admin_set_role(_user_id uuid, _make_admin boolean)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Admin role required' USING ERRCODE = '42501';
  END IF;

  IF _make_admin THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  ELSE
    IF _user_id = auth.uid() THEN
      RAISE EXCEPTION 'You cannot remove your own admin access';
    END IF;
    IF (SELECT count(*) FROM public.user_roles WHERE role = 'admin') <= 1 THEN
      RAISE EXCEPTION 'At least one administrator is required';
    END IF;
    DELETE FROM public.user_roles
    WHERE user_id = _user_id AND role = 'admin';
  END IF;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_set_role(uuid, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_role(uuid, boolean) TO authenticated, service_role;
