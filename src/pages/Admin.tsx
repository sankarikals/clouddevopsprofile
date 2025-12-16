import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BlogManagement from "@/components/BlogManagement";
import ProjectManagement from "@/components/ProjectManagement";
import CourseManagement from "@/components/CourseManagement";
import Reviews from "@/components/Reviews";
import { ArrowLeft, Lock, LogOut } from "lucide-react";
import { toast } from "sonner";

const ADMIN_PASSWORD = "DevOps@2024"; // In production, use proper auth

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if already authenticated in this session
    const adminSession = sessionStorage.getItem("adminAuthenticated");
    if (adminSession === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple password check
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        setIsAuthenticated(true);
        sessionStorage.setItem("adminAuthenticated", "true");
        toast.success("Welcome, Admin!");
      } else {
        toast.error("Invalid password. Please try again.");
      }
      setIsLoading(false);
      setPassword("");
    }, 500);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("adminAuthenticated");
    toast.info("Logged out successfully");
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <p className="text-muted-foreground text-sm mt-2">
              Enter your password to access the admin dashboard
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Access Dashboard"}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = '/'}
                className="text-muted-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Website
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show admin dashboard if authenticated
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Website
            </Button>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="flex items-center gap-2 text-muted-foreground hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="blogs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="blogs">Blog Management</TabsTrigger>
            <TabsTrigger value="projects">Project Management</TabsTrigger>
            <TabsTrigger value="courses">Course Management</TabsTrigger>
            <TabsTrigger value="reviews">Review Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="blogs">
            <BlogManagement />
          </TabsContent>
          
          <TabsContent value="projects">
            <ProjectManagement />
          </TabsContent>
          
          <TabsContent value="courses">
            <CourseManagement 
              isVisible={true}
              onClose={() => {}}
              onCoursesUpdate={() => {}}
            />
          </TabsContent>
          
          <TabsContent value="reviews">
            <Reviews />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
