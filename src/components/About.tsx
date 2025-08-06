import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, BookOpen, ExternalLink, Code, Server, Cloud, Shield, Zap, Award } from "lucide-react";
// Using the uploaded image directly
const mentorProfile = "/lovable-uploads/c6fd809d-84fa-42cf-b1fb-34918dc8e06e.png";

const About = () => {
  const coreSkills = [
    { name: "AWS", icon: Cloud },
    { name: "Azure", icon: Cloud },
    { name: "GCP", icon: Cloud },
    { name: "Kubernetes", icon: Server },
    { name: "Docker", icon: Server },
    { name: "Terraform", icon: Code }
  ];

  const devopsTools = [
    "Jenkins", "GitLab CI/CD", "GitHub Actions", "ArgoCD", "Helm", 
    "Ansible", "Prometheus", "Grafana", "ELK Stack", "Istio"
  ];

  const programmingSkills = [
    "Python", "Go", "Bash", "PowerShell", "YAML", "JSON", "HCL"
  ];

  const achievements = [
    { number: "50+", label: "Students Mentored", icon: Award },
    { number: "95%", label: "Success Rate", icon: Zap },
    { number: "10+", label: "Years Experience", icon: Shield }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-accent relative overflow-hidden">
      {/* Tech background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-6xl">{"</"}</div>
        <div className="absolute top-32 right-20 text-4xl">{"{}"}</div>
        <div className="absolute bottom-20 left-1/4 text-5xl">{"</>"}</div>
        <div className="absolute bottom-32 right-1/3 text-3xl">{"[]"}</div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <Code className="h-5 w-5 text-primary" />
            <span className="text-primary font-medium">Senior Cloud Architect & DevOps Engineer</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-tech bg-clip-text text-transparent">
            Your Technical Mentor
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A battle-tested Cloud Architect and DevOps specialist with 10+ years building enterprise-scale 
            infrastructure, automating complex workflows, and mentoring the next generation of engineers
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <Card className="bg-gradient-card shadow-tech border border-primary/20 overflow-hidden group hover:shadow-hero transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-tech opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              <CardContent className="p-8 relative z-10">
                <div className="relative">
                  <img 
                    src={mentorProfile}
                    alt="Senior Cloud Architect"
                    className="w-40 h-40 rounded-2xl mx-auto mb-6 object-cover shadow-tech border-2 border-primary/20"
                  />
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-2">
                    <Shield className="h-4 w-4" />
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-tech bg-clip-text text-transparent">
                    Akhil Mittal
                  </h3>
                  <p className="text-primary font-semibold mb-1">Senior Cloud Architect & DevOps Engineer</p>
                  <p className="text-muted-foreground mb-6">Enterprise Infrastructure Specialist</p>
                  
                  <div className="flex justify-center space-x-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-2 border-primary/20 hover:bg-primary/10"
                      onClick={() => window.open('https://www.linkedin.com/in/akhil2308/', '_blank')}
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-2 border-primary/20 hover:bg-primary/10"
                      onClick={() => window.open('https://preplaced.in/profile/akhil-mittal', '_blank')}
                    >
                      <BookOpen className="h-4 w-4" />
                      Profile
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Core Technologies */}
            <Card className="bg-gradient-card shadow-card border border-primary/10">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Server className="h-5 w-5 text-primary" />
                  Core Technologies
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {coreSkills.map((skill) => (
                    <div key={skill.name} className="flex items-center gap-2 p-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                      <skill.icon className="h-4 w-4 text-primary" />
                      <span className="font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Professional Journey */}
            <Card className="bg-gradient-card shadow-card border border-primary/10">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Code className="h-6 w-6 text-primary" />
                  Technical Excellence & Leadership
                </h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    As a <strong className="text-foreground">Senior Cloud Architect</strong> with 10+ years of enterprise experience, 
                    I've architected and deployed mission-critical infrastructure serving millions of users. My expertise spans 
                    multi-cloud environments, container orchestration, and enterprise-grade DevOps automation.
                  </p>
                  <p>
                    <strong className="text-foreground">Key Achievements:</strong> Led cloud migration strategies improving system 
                    performance by 35% while reducing infrastructure costs by 25%. Designed scalable Kubernetes clusters handling 
                    100K+ concurrent users. Built automated CI/CD pipelines reducing deployment time from hours to minutes.
                  </p>
                  <p>
                    <strong className="text-foreground">Mentorship Impact:</strong> Successfully guided 50+ engineers into senior 
                    DevOps and Cloud roles at companies like Amazon, Microsoft, and Google. My hands-on approach combines 
                    real-world project experience with industry best practices.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Technical Skills Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-gradient-card shadow-card border border-primary/10">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Server className="h-4 w-4 text-primary" />
                    DevOps & Automation
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {devopsTools.map((tool) => (
                      <Badge 
                        key={tool} 
                        variant="secondary" 
                        className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-card border border-primary/10">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Code className="h-4 w-4 text-primary" />
                    Programming & Scripting
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {programmingSkills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary" 
                        className="text-xs bg-primary/10 text-primary hover:bg-primary/20 font-mono"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <Card key={achievement.label} className="bg-gradient-card shadow-card border border-primary/10 text-center group hover:shadow-tech transition-all duration-300">
                  <CardContent className="p-4">
                    <achievement.icon className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-2xl font-bold text-primary">{achievement.number}</div>
                    <div className="text-xs text-muted-foreground">{achievement.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Admin Access Note */}
            <Card className="bg-primary/5 border border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-primary">
                  <Shield className="h-4 w-4" />
                  <span className="font-semibold">Project Management</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Access the admin panel at <code className="bg-primary/10 px-1 rounded">/admin</code> to manage projects, courses, and content.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;