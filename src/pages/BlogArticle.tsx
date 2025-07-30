import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BlogArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock blog data - in a real app this would come from your database
  const blogPosts = [
    {
      id: 1,
      title: "Mastering Kubernetes Deployments",
      excerpt: "Learn advanced deployment strategies and best practices for production Kubernetes environments.",
      content: `
        <h2>Introduction to Kubernetes Deployments</h2>
        <p>Kubernetes has revolutionized how we deploy and manage containerized applications. In this comprehensive guide, we'll explore advanced deployment strategies that will help you achieve zero-downtime deployments and robust application lifecycle management.</p>
        
        <h3>Deployment Strategies</h3>
        <p>There are several deployment strategies you can use with Kubernetes:</p>
        <ul>
          <li><strong>Rolling Updates:</strong> The default strategy that gradually replaces old pods with new ones</li>
          <li><strong>Blue-Green Deployments:</strong> Maintains two identical production environments</li>
          <li><strong>Canary Deployments:</strong> Gradually rolls out changes to a small subset of users</li>
        </ul>
        
        <h3>Best Practices</h3>
        <p>Follow these best practices for successful Kubernetes deployments:</p>
        <ol>
          <li>Always use health checks and readiness probes</li>
          <li>Set appropriate resource limits and requests</li>
          <li>Use namespaces to organize your applications</li>
          <li>Implement proper logging and monitoring</li>
        </ol>
        
        <h3>Conclusion</h3>
        <p>Mastering Kubernetes deployments is crucial for any DevOps engineer. By following these strategies and best practices, you'll be able to deploy applications with confidence and maintain high availability.</p>
      `,
      category: "Kubernetes",
      author: "Akhil Sharma",
      date: "2024-01-15",
      readTime: "8 min read",
      featured: true
    },
    {
      id: 2,
      title: "CI/CD Pipeline Best Practices",
      excerpt: "Build robust CI/CD pipelines that scale with your team and improve deployment reliability.",
      content: `
        <h2>Building Effective CI/CD Pipelines</h2>
        <p>Continuous Integration and Continuous Deployment (CI/CD) pipelines are the backbone of modern software development. They enable teams to deliver software faster, more reliably, and with higher quality.</p>
        
        <h3>Key Components</h3>
        <p>A well-designed CI/CD pipeline includes:</p>
        <ul>
          <li>Source code management integration</li>
          <li>Automated testing at multiple levels</li>
          <li>Build and artifact management</li>
          <li>Deployment automation</li>
          <li>Monitoring and feedback loops</li>
        </ul>
        
        <h3>Implementation Tips</h3>
        <p>When implementing your CI/CD pipeline, consider these tips:</p>
        <ol>
          <li>Start simple and iterate</li>
          <li>Fail fast with comprehensive testing</li>
          <li>Use infrastructure as code</li>
          <li>Implement proper secret management</li>
        </ol>
      `,
      category: "CI/CD",
      author: "Akhil Sharma",
      date: "2024-01-10",
      readTime: "6 min read",
      featured: false
    },
    {
      id: 3,
      title: "Career Growth in DevOps",
      excerpt: "Navigate your DevOps career path with these essential tips and insights from industry experts.",
      content: `
        <h2>Your DevOps Career Journey</h2>
        <p>The DevOps field offers numerous opportunities for career growth and development. Whether you're just starting out or looking to advance to senior positions, understanding the career landscape is crucial.</p>
        
        <h3>Essential Skills</h3>
        <p>To succeed in DevOps, focus on developing these core skills:</p>
        <ul>
          <li>Cloud platforms (AWS, Azure, GCP)</li>
          <li>Container orchestration (Kubernetes, Docker)</li>
          <li>Infrastructure as Code (Terraform, CloudFormation)</li>
          <li>CI/CD tools and practices</li>
          <li>Monitoring and observability</li>
          <li>Security best practices</li>
        </ul>
        
        <h3>Career Progression</h3>
        <p>Typical career progression in DevOps:</p>
        <ol>
          <li>Junior DevOps Engineer</li>
          <li>DevOps Engineer</li>
          <li>Senior DevOps Engineer</li>
          <li>DevOps Architect / Team Lead</li>
          <li>Principal Engineer / Engineering Manager</li>
        </ol>
      `,
      category: "Career",
      author: "Akhil Sharma",
      date: "2024-01-05",
      readTime: "10 min read",
      featured: false
    }
  ];

  const article = blogPosts.find(post => post.id === parseInt(id || "0"));

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
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
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(article.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="prose prose-lg max-w-none">
            <div 
              className="text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
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