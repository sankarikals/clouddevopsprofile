import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Trash2, Plus, Settings, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const BlogAdmin = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "Getting Started with DevOps: A Complete Roadmap",
      excerpt: "Learn the essential skills and tools you need to start your DevOps journey...",
      content: "DevOps is a set of practices that combines software development and IT operations...",
      category: "Beginner",
      readTime: "8 min read",
      featured: true,
      published: true,
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Kubernetes Best Practices for Production",
      excerpt: "Discover the essential practices for running Kubernetes in production environments...",
      content: "Running Kubernetes in production requires careful planning and implementation...",
      category: "Advanced",
      readTime: "12 min read",
      featured: false,
      published: true,
      date: "2024-01-10"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    readTime: "",
    featured: false,
    published: false
  });

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPost) {
      setPosts(posts.map(post => 
        post.id === editingPost.id 
          ? { ...editingPost, ...newPost, date: editingPost.date }
          : post
      ));
      toast({ title: "Blog post updated successfully!" });
    } else {
      const post: BlogPost = {
        id: Date.now(),
        ...newPost,
        date: new Date().toISOString().split('T')[0]
      };
      setPosts([post, ...posts]);
      toast({ title: "Blog post created successfully!" });
    }
    
    setNewPost({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      readTime: "",
      featured: false,
      published: false
    });
    setShowAddForm(false);
    setEditingPost(null);
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
    setPosts(posts.filter(post => post.id !== id));
    toast({ title: "Blog post deleted successfully!" });
  };

  const togglePublished = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, published: !post.published } : post
    ));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Blog Management</h2>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Manage Blog Posts</h3>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Article
            </Button>
          </div>

          {showAddForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{editingPost ? 'Edit Article' : 'Add New Article'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitPost} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Article Title"
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      required
                    />
                    <Input
                      placeholder="Category"
                      value={newPost.category}
                      onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                      required
                    />
                  </div>
                  
                  <Input
                    placeholder="Read Time (e.g., 5 min read)"
                    value={newPost.readTime}
                    onChange={(e) => setNewPost({...newPost, readTime: e.target.value})}
                    required
                  />
                  
                  <Textarea
                    placeholder="Article Excerpt"
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                    required
                  />
                  
                  <Textarea
                    placeholder="Article Content"
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    rows={8}
                    required
                  />
                  
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newPost.featured}
                        onChange={(e) => setNewPost({...newPost, featured: e.target.checked})}
                      />
                      Featured Article
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newPost.published}
                        onChange={(e) => setNewPost({...newPost, published: e.target.checked})}
                      />
                      Publish Now
                    </label>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button type="submit">
                      {editingPost ? 'Update Article' : 'Create Article'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingPost(null);
                        setNewPost({
                          title: "",
                          excerpt: "",
                          content: "",
                          category: "",
                          readTime: "",
                          featured: false,
                          published: false
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{post.title}</h3>
                        {post.featured && <Badge>Featured</Badge>}
                        <Badge variant={post.published ? "default" : "secondary"}>
                          {post.published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-2">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                        <span>{post.category}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePublished(post.id)}
                      >
                        {post.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(post)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin;