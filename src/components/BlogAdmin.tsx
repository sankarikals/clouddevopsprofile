import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Edit, X, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  read_time: string;
  featured: boolean;
  published: boolean;
  date: string;
}

interface BlogAdminProps {
  isVisible: boolean;
  onClose: () => void;
}

const BlogAdmin: React.FC<BlogAdminProps> = ({ isVisible, onClose }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const { toast } = useToast();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    read_time: "",
    featured: false,
    published: false,
    date: new Date().toISOString().split('T')[0]
  });

  // Fetch blog posts from Supabase
  useEffect(() => {
    if (isVisible) {
      fetchAllPosts();
    }
  }, [isVisible]);

  const fetchAllPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        toast({
          title: "Error",
          description: "Failed to fetch blog posts",
          variant: "destructive",
        });
        return;
      }

      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingPost) {
        // Update existing post
        const { error } = await supabase
          .from('blog_posts')
          .update({
            title: newPost.title,
            excerpt: newPost.excerpt,
            content: newPost.content,
            category: newPost.category,
            read_time: newPost.read_time,
            featured: newPost.featured,
            published: newPost.published,
            date: newPost.date
          })
          .eq('id', editingPost.id);

        if (error) {
          console.error('Error updating post:', error);
          toast({
            title: "Error",
            description: "Failed to update blog post",
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Success",
          description: "Blog post updated successfully",
        });
      } else {
        // Add new post
        const { error } = await supabase
          .from('blog_posts')
          .insert({
            title: newPost.title,
            excerpt: newPost.excerpt,
            content: newPost.content,
            category: newPost.category,
            read_time: newPost.read_time,
            featured: newPost.featured,
            published: newPost.published,
            date: newPost.date
          });

        if (error) {
          console.error('Error creating post:', error);
          toast({
            title: "Error",
            description: "Failed to create blog post",
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Success",
          description: "Blog post created successfully",
        });
      }

      // Reset form and refresh posts
      setNewPost({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        read_time: "",
        featured: false,
        published: false,
        date: new Date().toISOString().split('T')[0]
      });
      setEditingPost(null);
      setShowAddForm(false);
      fetchAllPosts();
    } catch (error) {
      console.error('Error submitting post:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setNewPost(post);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting post:', error);
        toast({
          title: "Error",
          description: "Failed to delete blog post",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
      fetchAllPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const togglePublished = async (id: string) => {
    try {
      const post = posts.find(p => p.id === id);
      if (!post) return;

      const { error } = await supabase
        .from('blog_posts')
        .update({ published: !post.published })
        .eq('id', id);

      if (error) {
        console.error('Error updating published status:', error);
        toast({
          title: "Error",
          description: "Failed to update published status",
          variant: "destructive",
        });
        return;
      }

      fetchAllPosts();
    } catch (error) {
      console.error('Error updating published status:', error);
    }
  };

  if (!isVisible) return null;

  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Blog Management
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(90vh-100px)] space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Manage Blog Posts</h3>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Article
            </Button>
          </div>

          {showAddForm && (
            <Card>
              <CardHeader>
                <CardTitle>{editingPost ? 'Edit Article' : 'Add New Article'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitPost} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newPost.title || ""}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        placeholder="Article title"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newPost.category || ""}
                        onValueChange={(value) => setNewPost({ ...newPost, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Kubernetes">Kubernetes</SelectItem>
                          <SelectItem value="Career">Career</SelectItem>
                          <SelectItem value="Terraform">Terraform</SelectItem>
                          <SelectItem value="CI/CD">CI/CD</SelectItem>
                          <SelectItem value="AWS">AWS</SelectItem>
                          <SelectItem value="Azure">Azure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="readTime">Read Time</Label>
                      <Input
                        id="readTime"
                        value={newPost.read_time || ""}
                        onChange={(e) => setNewPost({ ...newPost, read_time: e.target.value })}
                        placeholder="e.g., 5 min read"
                      />
                    </div>
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newPost.date || ""}
                        onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={newPost.excerpt || ""}
                      onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                      placeholder="Brief description of the article"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={newPost.content || ""}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      placeholder="Full article content"
                      rows={10}
                    />
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="featured"
                        checked={newPost.featured || false}
                        onCheckedChange={(checked) => setNewPost({ ...newPost, featured: checked })}
                      />
                      <Label htmlFor="featured">Featured Article</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={newPost.published || false}
                        onCheckedChange={(checked) => setNewPost({ ...newPost, published: checked })}
                      />
                      <Label htmlFor="published">Publish Now</Label>
                    </div>
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
                          read_time: "",
                          featured: false,
                          published: false,
                          date: new Date().toISOString().split('T')[0]
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

          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
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
                        <span>{post.read_time}</span>
                        <span>{post.category}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePublished(post.id)}
                      >
                        {post.published ? "Unpublish" : "Publish"}
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
      </DialogContent>
    </Dialog>
  );
};

export default BlogAdmin;