import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Project {
  id: string;
  title: string;
  description: string;
  github_url: string;
  skills: string[];
  image_url?: string;
  is_featured: boolean;
}

interface ProjectsProps {
  onEnrollClick: () => void;
}

const Projects = ({ onEnrollClick }: ProjectsProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="projects" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Real-World Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hands-on projects we'll build together to master DevOps and Cloud technologies
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-full"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Real-World Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hands-on projects we'll build together to master DevOps and Cloud technologies. 
            Each project includes complete source code, documentation, and step-by-step implementation guides.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project) => (
            <Card key={project.id} className={`relative group hover:shadow-lg transition-all duration-300 ${
              project.is_featured ? 'ring-2 ring-primary' : ''
            }`}>
              {project.is_featured && (
                <div className="absolute -top-3 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                  Featured
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-lg leading-tight">{project.title}</CardTitle>
                <CardDescription className="text-sm line-clamp-3">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {project.skills.slice(0, 4).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {project.skills.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.skills.length - 4} more
                    </Badge>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => window.open(project.github_url, '_blank')}
                  >
                    <Github className="h-4 w-4 mr-2" />
                    View Code
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(project.github_url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            Ready to build these projects and advance your DevOps career?
          </p>
          <Button onClick={onEnrollClick} size="lg" className="px-8">
            Start Building Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;