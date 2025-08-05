import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlogManagement from "@/components/BlogManagement";
import ProjectManagement from "@/components/ProjectManagement";
import CourseManagement from "@/components/CourseManagement";
import Reviews from "@/components/Reviews";
import { ArrowLeft } from "lucide-react";

const Admin = () => {
  const [courseManagementVisible, setCourseManagementVisible] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
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