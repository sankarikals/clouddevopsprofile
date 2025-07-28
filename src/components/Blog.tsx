import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, ArrowRight, BookOpen, Settings, Lock } from "lucide-react";
import BlogAdmin from "./BlogAdmin";

const Blog = () => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  
  const handleAdminLogin = () => {
    // Simple password check - in production, use proper authentication
    if (adminPassword === "akhil2308") {
      setIsAdmin(true);
      setShowAdminPanel(true);
      setShowAuthDialog(false);
      setAdminPassword("");
    } else {
      alert("Incorrect password!");
    }
  };

  const handleManageClick = () => {
    if (isAdmin) {
      setShowAdminPanel(true);
    } else {
      setShowAuthDialog(true);
    }
  };
  // Placeholder blog posts - in a real app, these would come from a CMS or API
  const blogPosts = [
    {
      id: 1,
      title: "Mastering Kubernetes Security: Best Practices for 2024",
      excerpt: "A comprehensive guide to securing your Kubernetes clusters with the latest security practices and tools.",
      date: "2024-01-15",
      category: "Kubernetes",
      readTime: "8 min read",
      featured: true
    },
    {
      id: 2,
      title: "DevOps Interview Questions: What to Expect and How to Prepare",
      excerpt: "Essential interview questions and tips to help you ace your next DevOps interview.",
      date: "2024-01-10",
      category: "Career",
      readTime: "12 min read",
      featured: false
    },
    {
      id: 3,
      title: "Infrastructure as Code with Terraform: Advanced Patterns",
      excerpt: "Learn advanced Terraform patterns for managing complex cloud infrastructure at scale.",
      date: "2024-01-05",
      category: "Terraform",
      readTime: "15 min read",
      featured: false
    },
    {
      id: 4,
      title: "CI/CD Pipeline Optimization: Speed vs Security Trade-offs",
      excerpt: "How to balance deployment speed with security in your continuous integration pipelines.",
      date: "2023-12-28",
      category: "CI/CD",
      readTime: "10 min read",
      featured: false
    }
  ];

  const categories = ["All", "Kubernetes", "Career", "Terraform", "CI/CD", "AWS", "Azure"];

  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-start mb-16">
          <div className="text-center flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Learning Insights</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest DevOps trends, tutorials, and industry insights
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleManageClick}
            className="hidden md:flex items-center gap-2 mt-2"
          >
            <Settings className="h-4 w-4" />
            Manage
          </Button>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
              className={category === "All" ? "bg-gradient-hero" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured post */}
        {blogPosts.filter(post => post.featured).map((post) => (
          <Card key={post.id} className="mb-12 bg-gradient-card shadow-hero border-0 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="bg-gradient-accent p-8 flex items-center justify-center">
                <div className="text-center">
                  <BookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
                  <Badge className="bg-gradient-hero">Featured Article</Badge>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="outline">{post.category}</Badge>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <span className="text-muted-foreground text-sm">{post.readTime}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{post.excerpt}</p>
                <Button className="group">
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {/* Regular blog posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.filter(post => !post.featured).map((post) => (
            <Card key={post.id} className="bg-gradient-card shadow-card border-0 hover:shadow-hero transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{post.category}</Badge>
                  <span className="text-muted-foreground text-sm">{post.readTime}</span>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <div className="flex items-center text-muted-foreground text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 leading-relaxed">
                  {post.excerpt}
                </CardDescription>
                <Button variant="outline" size="sm" className="group">
                  Read More
                  <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="bg-gradient-accent">
            View All Articles
          </Button>
        </div>
      </div>
      
      <BlogAdmin 
        isVisible={showAdminPanel} 
        onClose={() => setShowAdminPanel(false)} 
      />
      
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Admin Authentication
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Enter admin password to manage blog content:
            </p>
            <Input
              type="password"
              placeholder="Enter admin password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
            />
            <div className="flex gap-2">
              <Button onClick={handleAdminLogin} className="flex-1">
                Login
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowAuthDialog(false);
                  setAdminPassword("");
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Blog;