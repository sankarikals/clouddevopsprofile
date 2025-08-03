import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ExternalLink, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface ExternalArticle {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  source_url: string;
  source_platform: string;
  category: string;
  published_date: string;
  read_time: string;
  is_featured: boolean;
}

const LearningInsights = () => {
  const [articles, setArticles] = useState<ExternalArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { toast } = useToast();

  const categories = ["All", "AWS", "Azure", "DevOps", "Kubernetes", "CI/CD", "Security", "GenAI"];

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('external_articles' as any)
        .select('*')
        .order('published_date', { ascending: false });

      if (error) throw error;
      setArticles((data as unknown as ExternalArticle[]) || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast({
        title: "Error",
        description: "Failed to fetch learning insights",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshArticles = async () => {
    setRefreshing(true);
    try {
      const { data, error } = await supabase.functions.invoke('fetch-articles');
      
      if (error) throw error;

      toast({
        title: "Success",
        description: `Fetched ${data.articlesAdded} new articles`,
      });

      await fetchArticles();
    } catch (error) {
      console.error('Error refreshing articles:', error);
      toast({
        title: "Error",
        description: "Failed to refresh articles",
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  };

  const filteredArticles = selectedCategory === "All" 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  if (loading) {
    return (
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading learning insights...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-between items-start mb-6">
            <div className="text-center flex-1">
              <h2 className="text-3xl font-bold mb-4">Learning Insights</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Stay updated with curated articles from industry experts and write your own insights on 
                cloud architecture, DevOps, and modern development practices.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = '/admin'}
              className="hidden md:flex items-center gap-2 mt-2"
            >
              Write Article
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-sm"
              >
                {category}
              </Button>
            ))}
          </div>

          <Button 
            onClick={refreshArticles} 
            disabled={refreshing}
            variant="outline"
            size="sm"
            className="mb-8"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Articles'}
          </Button>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No articles found for {selectedCategory}. Try refreshing or check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {article.source_platform}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>By {article.author}</span>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span>{article.read_time}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {new Date(article.published_date).toLocaleDateString()}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(article.source_url, '_blank')}
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Read Article
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LearningInsights;