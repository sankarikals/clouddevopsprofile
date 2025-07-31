-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can manage blog posts" ON public.blog_posts;

-- Create new policy that allows all operations without authentication
CREATE POLICY "Allow all blog operations" 
ON public.blog_posts 
FOR ALL 
USING (true) 
WITH CHECK (true);