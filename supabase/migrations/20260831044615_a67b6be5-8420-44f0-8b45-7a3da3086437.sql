CREATE TABLE public.enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT,
  location TEXT,
  area TEXT,
  message TEXT,
  subject TEXT NOT NULL DEFAULT 'General Enquiry',
  ip TEXT,
  user_agent TEXT,
  referer TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT ALL ON public.enquiries TO service_role;
GRANT SELECT, UPDATE ON public.enquiries TO authenticated;

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated staff can read enquiries"
ON public.enquiries FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated staff can update enquiries"
ON public.enquiries FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE INDEX enquiries_created_at_idx ON public.enquiries (created_at DESC);