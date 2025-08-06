-- Add language column to external_articles table
ALTER TABLE public.external_articles 
ADD COLUMN language text NOT NULL DEFAULT 'en';

-- Create index for better performance on language filtering
CREATE INDEX idx_external_articles_language ON public.external_articles(language);

-- Update existing articles to be marked as English
UPDATE public.external_articles SET language = 'en' WHERE language IS NULL;