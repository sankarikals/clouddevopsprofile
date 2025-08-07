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

  const aiSkills = [
    "GenAI/LLMs", "Agentic AI", "ML Ops", "AI Automation", "LangChain", "Vector DBs"
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
            Expert Cloud Architect & AI Engineering Leader with 10+ years architecting enterprise-scale 
            infrastructure, pioneering GenAI/Agentic AI solutions, and transforming businesses through 
            intelligent automation and cloud-native architectures
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
                    As a <strong className="text-foreground">Senior Cloud Architect & AI Engineering Leader</strong> with 10+ years of enterprise experience, 
                    I've architected mission-critical infrastructure serving millions of users while pioneering GenAI and Agentic AI solutions. 
                    My expertise spans multi-cloud environments, AI/ML operations, and intelligent automation systems.
                  </p>
                  <p>
                    <strong className="text-foreground">AI & Cloud Innovations:</strong> Designed enterprise GenAI platforms processing 1M+ AI requests daily. 
                    Built intelligent automation systems using Agentic AI reducing manual workflows by 60%. Led cloud migration strategies 
                    improving system performance by 35% while integrating AI-driven optimization reducing infrastructure costs by 25%.
                  </p>
                  <p>
                    <strong className="text-foreground">Mentorship Excellence:</strong> Successfully guided 50+ engineers into senior 
                    DevOps, Cloud, and AI roles at companies like Amazon, Microsoft, and Google. My hands-on approach combines 
                    cutting-edge AI technologies with proven cloud architecture patterns and industry best practices.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Technical Skills Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-gradient-card shadow-card border border-primary/10">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    AI & Machine Learning
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {aiSkills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary" 
                        className="text-xs bg-accent/20 text-accent hover:bg-accent/30"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

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
                        className="text-xs bg-primary/20 text-foreground hover:bg-primary/30"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Programming Skills */}
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
                      className="text-xs bg-secondary/50 text-foreground hover:bg-secondary/70 font-mono"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

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

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;