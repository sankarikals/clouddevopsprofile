import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, BookOpen, ExternalLink } from "lucide-react";
import professionalPortrait from "@/assets/professional-portrait.jpg";

const About = () => {
  const skills = [
    "AWS", "Azure", "GCP", "Kubernetes", "Docker", "Terraform", 
    "Jenkins", "GitLab CI/CD", "Ansible", "Prometheus", "Grafana",
    "ELK Stack", "ArgoCD", "Helm", "Linux", "Python", "Bash"
  ];

  return (
    <section id="about" className="py-20 bg-gradient-accent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Your Mentor</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A seasoned DevOps and Cloud engineer dedicated to nurturing the next generation of tech professionals
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Card className="bg-gradient-card shadow-card border-0">
              <CardContent className="p-8">
                <img 
                  src={professionalPortrait}
                  alt="Professional Portrait"
                  className="w-48 h-48 rounded-full mx-auto mb-6 object-cover shadow-hero"
                />
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Senior DevOps Engineer</h3>
                  <p className="text-muted-foreground mb-6">10+ Years Industry Experience</p>
                  
                  <div className="flex justify-center space-x-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-2"
                      onClick={() => window.open('https://www.linkedin.com/in/akhil2308/', '_blank')}
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-2"
                      onClick={() => window.open('https://preplaced.in/profile/akhil-mittal', '_blank')}
                    >
                      <BookOpen className="h-4 w-4" />
                      Preplaced
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">My Journey</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                With over 10 years of hands-on experience in DevOps and Cloud technologies, I've helped 
                organizations scale their infrastructure, implement CI/CD pipelines, and migrate to cloud-native 
                architectures. My passion lies in sharing this knowledge and helping aspiring professionals 
                break into this exciting field.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I've successfully mentored 500+ students, with a 95% success rate in helping them land 
                their dream jobs in top tech companies. My approach combines theoretical knowledge with 
                real-world project experience, ensuring you're industry-ready from day one.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">Core Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-card rounded-lg shadow-card">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Students Mentored</div>
              </div>
              <div className="text-center p-4 bg-card rounded-lg shadow-card">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Companies Worked With</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;