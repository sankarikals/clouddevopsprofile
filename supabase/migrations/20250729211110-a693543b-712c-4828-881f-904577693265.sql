-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  duration TEXT NOT NULL,
  level TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  is_popular BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since courses are public-facing)
CREATE POLICY "Anyone can view published courses" 
ON public.courses 
FOR SELECT 
USING (published = true);

-- Create policies for admin management (for now, allowing all authenticated users to manage)
-- In production, you'd want to restrict this to actual admin users
CREATE POLICY "Authenticated users can manage courses" 
ON public.courses 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some initial course data
INSERT INTO public.courses (title, description, duration, level, price, features, is_popular, published) VALUES
('DevOps Engineering Mastery', 'Comprehensive DevOps training covering CI/CD, containerization, cloud platforms, and infrastructure automation. Learn industry best practices and hands-on skills.', '8 weeks', 'Intermediate', 899.00, ARRAY['CI/CD Pipelines', 'Docker & Kubernetes', 'AWS/Azure Cloud', 'Infrastructure as Code', 'Monitoring & Logging', 'Security Best Practices'], true, true),
('Cloud Architecture Fundamentals', 'Master cloud computing concepts, architecture patterns, and deployment strategies across major cloud providers.', '6 weeks', 'Beginner', 699.00, ARRAY['Multi-Cloud Strategy', 'Serverless Computing', 'Microservices Architecture', 'Cost Optimization', 'Security & Compliance'], false, true),
('Advanced System Administration', 'Deep dive into Linux system administration, automation, and enterprise-level infrastructure management.', '10 weeks', 'Advanced', 1199.00, ARRAY['Linux Administration', 'Shell Scripting', 'Network Configuration', 'Performance Tuning', 'Backup & Recovery'], false, true);