import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MediumArticle {
  title: string;
  subtitle: string;
  url: string;
  author: string;
  publishedDate: string;
  readTime: string;
  claps: number;
  thumbnail?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      "https://crlrmhvvrnbmkezdtemu.supabase.co",
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Fetch articles from Medium RSS feeds for various tech topics
    const topics = [
      { name: 'AWS', urls: ['https://medium.com/feed/@akhilmittal510', 'https://medium.com/feed/tag/aws'] },
      { name: 'DevOps', urls: ['https://medium.com/feed/tag/devops', 'https://medium.com/feed/tag/docker'] },
      { name: 'Kubernetes', urls: ['https://medium.com/feed/tag/kubernetes', 'https://medium.com/feed/tag/k8s'] },
      { name: 'CI/CD', urls: ['https://medium.com/feed/tag/cicd', 'https://medium.com/feed/tag/continuous-integration'] },
      { name: 'Security', urls: ['https://medium.com/feed/tag/cybersecurity', 'https://medium.com/feed/tag/cloud-security'] },
    ];

    const allArticles: any[] = [];

    for (const topic of topics) {
      for (const feedUrl of topic.urls) {
        try {
          const response = await fetch(feedUrl);
          const xmlText = await response.text();
          
          // Parse RSS/XML (simplified parsing for demo)
          const items = xmlText.match(/<item>(.*?)<\/item>/gs) || [];
          
          for (const item of items.slice(0, 3)) { // Limit to 3 per feed
            const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] || 
                         item.match(/<title>(.*?)<\/title>/)?.[1] || '';
            const link = item.match(/<link>(.*?)<\/link>/)?.[1] || '';
            const description = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1] || 
                               item.match(/<description>(.*?)<\/description>/)?.[1] || '';
            const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';
            const creator = item.match(/<dc:creator><!\[CDATA\[(.*?)\]\]><\/dc:creator>/)?.[1] || 
                           item.match(/<author>(.*?)<\/author>/)?.[1] || 'Unknown';

            if (title && link) {
              // Check if article already exists
              const { data: existingArticle } = await supabaseClient
                .from('external_articles')
                .select('id')
                .eq('source_url', link)
                .single();

              if (!existingArticle) {
                // Extract read time from description or estimate
                const readTimeMatch = description.match(/(\d+)\s*min\s*read/i);
                const readTime = readTimeMatch ? `${readTimeMatch[1]} min read` : '5 min read';

                // Clean description for excerpt
                const excerpt = description.replace(/<[^>]*>/g, '').substring(0, 200) + '...';

                const articleData = {
                  title: title.substring(0, 255),
                  excerpt: excerpt,
                  content: description,
                  author: creator,
                  source_url: link,
                  source_platform: 'medium',
                  category: topic.name,
                  published_date: pubDate ? new Date(pubDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                  read_time: readTime,
                  tags: [topic.name.toLowerCase()]
                };

                const { data: newArticle, error } = await supabaseClient
                  .from('external_articles')
                  .insert(articleData)
                  .select()
                  .single();

                if (!error && newArticle) {
                  allArticles.push(newArticle);
                }
              }
            }
          }
        } catch (error) {
          console.error(`Error fetching from ${feedUrl}:`, error);
        }
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      articlesAdded: allArticles.length,
      articles: allArticles 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in fetch-articles function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});