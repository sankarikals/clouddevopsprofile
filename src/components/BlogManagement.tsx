import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye, Calendar, Clock } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  featured: boolean;
  published: boolean;
  date: string;
}

const BlogManagement = () => {
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    readTime: "",
    featured: false,
    published: true
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "Mastering Kubernetes Security: Best Practices for 2024",
      excerpt: "A comprehensive guide to securing your Kubernetes clusters with the latest security practices and tools.",
      content: "Full article content would go here...",
      category: "Kubernetes",
      readTime: "8 min read",
      featured: true,
      published: true,
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "DevOps Interview Questions: What to Expect and How to Prepare",
      excerpt: "Essential interview questions and tips to help you ace your next DevOps interview.",
      content: "Full article content would go here...",
      category: "Career",
      readTime: "12 min read",
      featured: false,
      published: true,
      date: "2024-01-10"
    }
  ]);

  const categories = ["Kubernetes", "Career", "Terraform", "CI/CD", "AWS", "Azure", "Docker", "Security"];

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPost) {
      // Update existing post
      setBlogPosts(posts => posts.map(post => 
        post.id === editingPost.id 
          ? { ...editingPost, ...newPost, id: editingPost.id, date: editingPost.date }
          : post
      ));
      setEditingPost(null);
      toast({
        title: "Article Updated!",
        description: "Your blog post has been updated successfully.",
      });
    } else {
      // Add new post
      const post: BlogPost = {
        id: blogPosts.length + 1,
        ...newPost,
        date: new Date().toISOString().split('T')[0]
      };
      setBlogPosts([post, ...blogPosts]);
      toast({
        title: "Article Published!",
        description: "Your new blog post has been added successfully.",
      });
    }

    setNewPost({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      readTime: "",
      featured: false,
      published: true
    });
    setShowAddForm(false);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setNewPost({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      readTime: post.readTime,
      featured: post.featured,
      published: post.published
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: number) => {
    setBlogPosts(posts => posts.filter(post => post.id !== id));
    toast({
      title: "Article Deleted",
      description: "The blog post has been removed.",
    });
  };

  const toggleFeatured = (id: number) => {
    setBlogPosts(posts => posts.map(post =>
      post.id === id ? { ...post, featured: !post.featured } : { ...post, featured: false }
    ));
  };

  const togglePublished = (id: number) => {
    setBlogPosts(posts => posts.map(post =>
      post.id === id ? { ...post, published: !post.published } : post
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Blog Management</h2>
          <p className="text-muted-foreground">Create and manage your learning insights</p>
        </div>
        <Button 
          onClick={() => {
            setShowAddForm(true);
            setEditingPost(null);
            setNewPost({
              title: "",
              excerpt: "",
              content: "",
              category: "",
              readTime: "",
              featured: false,
              published: true
            });
          }}
          className="bg-gradient-hero shadow-hero"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Article
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card className="bg-gradient-card border-primary/20">
          <CardHeader>
            <CardTitle>
              {editingPost ? 'Edit Article' : 'Create New Article'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitPost} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  placeholder="Enter article title"
                  required
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newPost.category} onValueChange={(value) => setNewPost({...newPost, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="readTime">Read Time</Label>
                  <Input
                    id="readTime"
                    value={newPost.readTime}
                    onChange={(e) => setNewPost({...newPost, readTime: e.target.value})}
                    placeholder="e.g., 5 min read"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={newPost.excerpt}
                  onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                  placeholder="Brief description of the article"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  placeholder="Write your article content here (Markdown supported)"
                  rows={10}
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={newPost.featured}
                      onCheckedChange={(checked) => setNewPost({...newPost, featured: checked})}
                    />
                    <Label>Featured Article</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={newPost.published}
                      onCheckedChange={(checked) => setNewPost({...newPost, published: checked})}
                    />
                    <Label>Publish Now</Label>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit">
                  {editingPost ? 'Update Article' : 'Publish Article'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Articles List */}
      <div className="space-y-4">
        {blogPosts.map((post) => (
          <Card key={post.id} className="bg-gradient-card shadow-card border-0">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    {post.featured && (
                      <Badge className="bg-gradient-hero text-xs">Featured</Badge>
                    )}
                    {!post.published && (
                      <Badge variant="outline" className="text-xs">Draft</Badge>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground mb-3">{post.excerpt}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Button variant="ghost" size="sm" onClick={() => toggleFeatured(post.id)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(post)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(post.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Switch
                    checked={post.published}
                    onCheckedChange={() => togglePublished(post.id)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogManagement;