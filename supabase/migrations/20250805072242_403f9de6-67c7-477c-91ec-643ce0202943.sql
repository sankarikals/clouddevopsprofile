-- Update RLS policies to allow project management without authentication for admin purposes
-- This allows full CRUD operations on projects table
DROP POLICY IF EXISTS "Authenticated users can manage projects" ON public.projects;

CREATE POLICY "Allow all project operations for management" 
ON public.projects 
FOR ALL 
USING (true) 
WITH CHECK (true);