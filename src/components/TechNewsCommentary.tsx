import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Newspaper, TrendingUp, MessageSquare, ExternalLink, Sparkles } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  category: string;
  url: string;
  mentorTake: string;
  aiAnalysis: string;
  trend: 'rising' | 'hot' | 'stable';
}

const TechNewsCommentary = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const categories = ['all', 'AI/ML', 'DevOps', 'Cloud', 'Security', 'Frontend'];

  const mockNewsData: NewsItem[] = [
    {
      id: '1',
      title: 'OpenAI Releases GPT-5 with Revolutionary Reasoning Capabilities',
      summary: 'The latest model shows significant improvements in mathematical reasoning and code generation.',
      source: 'TechCrunch',
      date: '2 hours ago',
      category: 'AI/ML',
      url: '#',
      mentorTake: "This is a game-changer for developers. The improved reasoning means we can build more sophisticated AI-powered applications. I'd recommend starting to experiment with the API now to understand its capabilities for your specific use cases.",
      aiAnalysis: "Impact Score: 9.5/10. This advancement will likely accelerate AI adoption in enterprise environments and create new opportunities for AI-first product development.",
      trend: 'hot'
    },
    {
      id: '2',
      title: 'Kubernetes 1.30 Introduces Enhanced Security Features',
      summary: 'New release focuses on zero-trust networking and improved pod security standards.',
      source: 'Cloud Native Computing Foundation',
      date: '6 hours ago',
      category: 'DevOps',
      url: '#',
      mentorTake: "Security-first approach is exactly what the enterprise needed. The enhanced pod security standards will make Kubernetes adoption much safer. Teams should start planning migration strategies now.",
      aiAnalysis: "Adoption Impact: High. Enterprise security requirements have been a major barrier to Kubernetes adoption. These features address critical concerns.",
      trend: 'rising'
    },
    {
      id: '3',
      title: 'React 19 Beta Released with Concurrent Features',
      summary: 'New concurrent rendering capabilities and improved developer experience.',
      source: 'React Team',
      date: '1 day ago',
      category: 'Frontend',
      url: '#',
      mentorTake: "The concurrent features will revolutionize how we think about React performance. Start experimenting with Suspense boundaries and concurrent rendering in non-critical projects to prepare for the stable release.",
      aiAnalysis: "Developer Impact: Very High. These features will change React development patterns significantly and require upskilling for existing React developers.",
      trend: 'stable'
    }
  ];

  useEffect(() => {
    loadLatestNews();
  }, []);

  const loadLatestNews = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setNewsItems(mockNewsData);
      setIsLoading(false);
      toast({
        title: "News Updated",
        description: "Latest tech news and commentary loaded",
      });
    }, 1000);
  };

  const filteredNews = selectedCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedCategory);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'hot': return '🔥';
      case 'rising': return '📈';
      default: return '📊';
    }
  };

  const generateAIInsight = (newsItem: NewsItem) => {
    toast({
      title: "AI Analysis Generated",
      description: "Extended AI analysis for this news item has been generated",
    });
  };

  return (
    <Card className="bg-gradient-to-br from-background to-accent/5 border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-accent">
          <Newspaper className="h-6 w-6" />
          Tech News Commentary
        </CardTitle>
        <CardDescription>
          Latest industry trends with expert analysis and AI insights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-2 flex-wrap">
          <Button onClick={loadLatestNews} disabled={isLoading} size="sm">
            {isLoading ? 'Loading...' : 'Refresh News'}
          </Button>
          <div className="flex gap-1 flex-wrap">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-gradient-tech text-white" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredNews.map((item) => (
            <Card key={item.id} className="bg-gradient-card border-accent/10">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getTrendIcon(item.trend)}</span>
                    <Badge variant="secondary" className="bg-accent/10 text-accent">
                      {item.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{item.source}</span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>

                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.summary}</p>

                <div className="space-y-4">
                  <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-accent" />
                      <span className="font-medium text-sm">Mentor's Take</span>
                    </div>
                    <p className="text-sm">{item.mentorTake}</p>
                  </div>

                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span className="font-medium text-sm">AI Analysis</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => generateAIInsight(item)}
                        className="text-primary"
                      >
                        Generate Insight
                      </Button>
                    </div>
                    <p className="text-sm">{item.aiAnalysis}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-muted/20 p-4 rounded-lg border border-accent/20">
          <h4 className="font-semibold text-sm mb-2">Commentary Features:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div>• Real-time industry trend analysis</div>
            <div>• AI-powered impact assessment</div>
            <div>• Expert mentor perspectives</div>
            <div>• Actionable implementation advice</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TechNewsCommentary;