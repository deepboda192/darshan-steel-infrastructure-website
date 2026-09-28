-- Building type: "Industrial Manufacturing Facility" → "Industrial Manufacturing".
--
-- The project editor now files records under a fixed list of building types;
-- the manufacturing entry is "Industrial Manufacturing". Records seeded with
-- the older, longer name are moved onto it so the cards, filter chips and
-- editor all read the same value.

UPDATE public.projects
SET building_type = 'Industrial Manufacturing'
WHERE building_type ILIKE 'industrial manufacturing%'
  AND building_type <> 'Industrial Manufacturing';
