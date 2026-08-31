-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can read their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage roles"
ON public.user_roles FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Projects
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  idx text NOT NULL DEFAULT '01',
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  building_type text NOT NULL,
  location text NOT NULL DEFAULT '',
  year text NOT NULL DEFAULT '',
  area text NOT NULL DEFAULT '',
  scope text[] NOT NULL DEFAULT '{}',
  verified boolean NOT NULL DEFAULT false,
  photo text NOT NULL DEFAULT '',
  plate text NOT NULL DEFAULT 'frames',
  overview text NOT NULL DEFAULT '',
  challenge text NOT NULL DEFAULT '',
  approach text NOT NULL DEFAULT '',
  execution text NOT NULL DEFAULT '',
  result text NOT NULL DEFAULT '',
  technical jsonb NOT NULL DEFAULT '[]'::jsonb,
  gallery jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are publicly readable"
ON public.projects FOR SELECT
USING (true);

CREATE POLICY "Admins can insert projects"
ON public.projects FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update projects"
ON public.projects FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete projects"
ON public.projects FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.projects (idx, slug, name, building_type, location, year, area, scope, verified, photo, plate, overview, challenge, approach, execution, result, technical, sort_order) VALUES
('01','project-01','[PROJECT 01 NAME]','Industrial Manufacturing Facility','[CITY], Gujarat','[YEAR]','[BUILT-UP AREA — SQ.FT.]',ARRAY['Design & Engineering','Fabrication','Supply','Erection'],false,'/images/project-01.jpg','plant',
'A manufacturing facility requiring column-free production floor with provision for overhead material handling. [PROJECT SUMMARY TO BE SUPPLIED BY DSI.]',
'Production layout demanded uninterrupted floor area while the crane duty imposed significant lateral and vertical loads on the frame. [SITE-SPECIFIC CONSTRAINTS TO BE SUPPLIED.]',
'Clear-span tapered portal frames were sized against combined crane, wind and gravity load cases. Crane brackets and gantry girders were integrated into the column design rather than added afterwards.',
'Members were fabricated as built-up sections, inspected at defined hold points and dispatched in erection sequence. Erection followed a planned lift order with temporary bracing at each stage.',
'A column-free production hall handed over with the crane system operational. [MEASURED OUTCOMES TO BE SUPPLIED BY DSI.]',
'[{"label":"Frame type","value":"Clear-span tapered portal"},{"label":"Span","value":"[SPAN — M]"},{"label":"Eave height","value":"[HEIGHT — M]"},{"label":"Bay spacing","value":"[BAY — M]"},{"label":"Crane capacity","value":"[CAPACITY — MT]"},{"label":"Steel tonnage","value":"[TONNAGE — MT]"}]'::jsonb,1),
('02','project-02','[PROJECT 02 NAME]','Large-Scale Warehouse','[CITY], Gujarat','[YEAR]','[BUILT-UP AREA — SQ.FT.]',ARRAY['Design & Engineering','Fabrication','Supply','Erection'],false,'/images/project-02.jpg','warehouse',
'A distribution warehouse planned around racking density and dock throughput. [PROJECT SUMMARY TO BE SUPPLIED BY DSI.]',
'The grid had to align with the racking layout so that no column landed in an operating aisle, while eave height was driven by vertical storage requirements.',
'Bay spacing was set from the rack line drawing before the structure was sized. High-eave framing was checked for wind uplift and for the deflection limits that the cladding system required.',
'Fabrication was sequenced by erection bay. Dock structures and canopies were detailed alongside the main frame so both arrived together.',
'A warehouse with the intended racking configuration installed without structural clashes. [MEASURED OUTCOMES TO BE SUPPLIED BY DSI.]',
'[{"label":"Frame type","value":"Clear-span portal"},{"label":"Span","value":"[SPAN — M]"},{"label":"Eave height","value":"[HEIGHT — M]"},{"label":"Bay spacing","value":"[BAY — M]"},{"label":"Dock positions","value":"[NUMBER OF DOCKS]"},{"label":"Steel tonnage","value":"[TONNAGE — MT]"}]'::jsonb,2),
('03','project-03','[PROJECT 03 NAME]','Cold Storage Facility','[CITY], Western India','[YEAR]','[BUILT-UP AREA — SQ.FT.]',ARRAY['Design & Engineering','Fabrication','Supply','Erection'],false,'/images/project-03.jpg','coldstore',
'A temperature-controlled storage facility where the structural frame and insulated envelope had to work as one system. [PROJECT SUMMARY TO BE SUPPLIED BY DSI.]',
'Thermal bridging at every point where steel crossed the insulated envelope, and vapour sealing continuity around panel supports and dock openings.',
'Panel support detailing and thermal breaks were resolved in the model before fabrication. Coating specification was set for a condensing environment rather than a general industrial one.',
'Members were coated to the cold-environment specification and inspected for film thickness before dispatch. Envelope and structure were installed in coordinated sequence.',
'A sealed, insulated volume with the structure detailed to hold temperature. [MEASURED OUTCOMES TO BE SUPPLIED BY DSI.]',
'[{"label":"Frame type","value":"Portal with insulated envelope"},{"label":"Span","value":"[SPAN — M]"},{"label":"Eave height","value":"[HEIGHT — M]"},{"label":"Panel system","value":"PUF / PIR insulated panel"},{"label":"Operating range","value":"[TEMPERATURE RANGE — °C]"},{"label":"Steel tonnage","value":"[TONNAGE — MT]"}]'::jsonb,3),
('04','project-04','[PROJECT 04 NAME]','Industrial Shed','[CITY], Gujarat','[YEAR]','[BUILT-UP AREA — SQ.FT.]',ARRAY['Design & Engineering','Fabrication','Supply','Erection'],false,'/images/project-04.jpg','frames',
'A general-purpose industrial shed for assembly and storage. [PROJECT SUMMARY TO BE SUPPLIED BY DSI.]',
'A constrained plot meant the building footprint was fixed, so usable volume had to come from eave height and span rather than area.',
'Frame geometry was optimised for maximum clear internal volume within the permitted envelope, with ridge ventilation and translucent sheeting for daylight.',
'Fabrication and erection were programmed around a live adjacent operation, with lifts scheduled outside working shifts.',
'Usable industrial volume delivered within a fixed footprint. [MEASURED OUTCOMES TO BE SUPPLIED BY DSI.]',
'[{"label":"Frame type","value":"Clear-span portal"},{"label":"Span","value":"[SPAN — M]"},{"label":"Eave height","value":"[HEIGHT — M]"},{"label":"Bay spacing","value":"[BAY — M]"},{"label":"Ventilation","value":"Ridge monitor"},{"label":"Steel tonnage","value":"[TONNAGE — MT]"}]'::jsonb,4),
('05','project-05','[PROJECT 05 NAME]','Factory Building with Crane Gantry','[CITY], Gujarat','[YEAR]','[BUILT-UP AREA — SQ.FT.]',ARRAY['Design & Engineering','Fabrication','Supply','Erection'],false,'/images/project-05.jpg','plant',
'A factory building carrying overhead cranes across multiple bays. [PROJECT SUMMARY TO BE SUPPLIED BY DSI.]',
'Crane duty cycles governed fatigue and deflection checks on the gantry girders and the columns supporting them.',
'Gantry girders and corbels were designed with the frame as a single system. Deflection limits were set by crane rail tolerance rather than by code minimums.',
'Rail alignment was surveyed during erection and corrected before the crane was commissioned.',
'A multi-bay crane-served factory within rail alignment tolerance. [MEASURED OUTCOMES TO BE SUPPLIED BY DSI.]',
'[{"label":"Frame type","value":"Multi-bay portal"},{"label":"Span","value":"[SPAN — M]"},{"label":"Eave height","value":"[HEIGHT — M]"},{"label":"Crane capacity","value":"[CAPACITY — MT]"},{"label":"Number of bays","value":"[BAY COUNT]"},{"label":"Steel tonnage","value":"[TONNAGE — MT]"}]'::jsonb,5),
('06','project-06','[PROJECT 06 NAME]','Commercial Steel Structure','[CITY], Gujarat','[YEAR]','[BUILT-UP AREA — SQ.FT.]',ARRAY['Design & Engineering','Fabrication','Supply','Erection'],false,'/images/project-06.jpg','frames',
'A commercial building with exposed structural steelwork as part of the architecture. [PROJECT SUMMARY TO BE SUPPLIED BY DSI.]',
'Steel that is visible in the finished building has to meet a finish standard, not only a strength standard — weld appearance, plate edges and coating uniformity all count.',
'Connections were designed to be seen: bolt groups arranged deliberately, plate edges dressed, and the coating system chosen for appearance as well as protection.',
'Exposed members were handled and packed to avoid coating damage in transit and during erection.',
'Exposed steelwork delivered to architectural finish standard. [MEASURED OUTCOMES TO BE SUPPLIED BY DSI.]',
'[{"label":"Frame type","value":"Braced frame, exposed"},{"label":"Span","value":"[SPAN — M]"},{"label":"Height","value":"[HEIGHT — M]"},{"label":"Finish","value":"Architectural coating system"},{"label":"Facade","value":"Coordinated with architect"},{"label":"Steel tonnage","value":"[TONNAGE — MT]"}]'::jsonb,6);