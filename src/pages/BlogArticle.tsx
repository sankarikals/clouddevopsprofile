import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BlogArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchArticle(id);
    }
  }, [id]);

  const fetchArticle = async (articleId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', articleId)
        .eq('published', true)
        .single();

      if (error) {
        console.error('Error fetching article:', error);
        return;
      }

      setArticle(data);
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Loading...</h1>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist or is not published.</p>
          <Button onClick={() => navigate("/#blog")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <article className="container mx-auto px-4 py-20 max-w-4xl">
        <Button 
          variant="outline" 
          onClick={() => navigate("/#blog")}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>

        <Card className="bg-gradient-card shadow-hero border-0">
          <CardHeader className="pb-8">
            <div className="mb-4">
              <Badge variant="secondary" className="mb-4">
                {article.category}
              </Badge>
            </div>
            <CardTitle className="text-3xl md:text-4xl mb-6 leading-tight">
              {article.title}
            </CardTitle>
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Akhil Sharma</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(article.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{article.read_time}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="prose prose-lg max-w-none">
            <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {article.content}
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Ready to accelerate your DevOps journey?
          </p>
          <Button 
            onClick={() => navigate("/#courses")}
            className="bg-gradient-hero shadow-hero"
          >
            Explore Our Courses
          </Button>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default BlogArticle;