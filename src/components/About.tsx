import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, BookOpen, ExternalLink, Code, Server, Cloud, Shield, Zap, Award, Users, Star } from "lucide-react";
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
    "GenAI/LLMs", "Agentic AI", "ML Ops", "AI Automation"
  ];

  const programmingSkills = [
    "Python", "Go", "Bash", "PowerShell", "YAML", "JSON", "HCL"
  ];

  const stats = [
    { number: "50+", label: "Students Mentored", icon: Users },
    { number: "95%", label: "Success Rate", icon: Star },
    { number: "10+", label: "Years Experience", icon: Award }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 tech-bg" />
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle, hsl(0 85% 60%) 1px, transparent 1px)`,
        backgroundSize: '30px 30px'
      }} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Code className="h-4 w-4 text-primary" />
            <span className="text-primary font-medium text-sm">Senior Cloud Architect & DevOps Engineer</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display">
            Your <span className="bg-gradient-hero bg-clip-text text-transparent">Technical Mentor</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Expert Cloud Architect & AI Engineering Leader with 10+ years architecting enterprise-scale 
            infrastructure, pioneering GenAI/Agentic AI solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="glass-card overflow-hidden group hover:border-primary/30 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-hero rounded-2xl blur-xl opacity-30" />
                    <img 
                      src={mentorProfile}
                      alt="Senior Cloud Architect"
                      className="relative w-36 h-36 rounded-2xl object-cover border-2 border-primary/30"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2">
                      <Shield className="h-4 w-4" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-1 font-display">Akhil Mittal</h3>
                  <p className="text-primary font-medium mb-1">Senior Cloud Architect & DevOps Engineer</p>
                  <p className="text-muted-foreground text-sm mb-6">Enterprise Infrastructure Specialist</p>
                  
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-secondary/50 border-border hover:bg-secondary hover:border-primary/30"
                      onClick={() => window.open('https://www.linkedin.com/in/akhil2308/', '_blank')}
                    >
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-secondary/50 border-border hover:bg-secondary hover:border-primary/30"
                      onClick={() => window.open('https://preplaced.in/profile/akhil-mittal', '_blank')}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Profile
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Core Technologies */}
            <Card className="glass-card">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 font-display">
                  <Server className="h-5 w-5 text-primary" />
                  Core Technologies
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {coreSkills.map((skill) => (
                    <div 
                      key={skill.name} 
                      className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      <skill.icon className="h-4 w-4 text-primary" />
                      <span className="font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <Card key={stat.label} className="glass-card text-center group hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-4">
                    <stat.icon className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-2xl font-bold text-primary font-display">{stat.number}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Professional Journey */}
            <Card className="glass-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 font-display">
                  <Code className="h-5 w-5 text-primary" />
                  Technical Excellence & Leadership
                </h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    As a <span className="text-foreground font-medium">Senior Cloud Architect & AI Engineering Leader</span> with 10+ years of enterprise experience, 
                    I've architected mission-critical infrastructure serving millions of users while pioneering GenAI and Agentic AI solutions.
                  </p>
                  <p>
                    <span className="text-foreground font-medium">AI & Cloud Innovations:</span> Designed enterprise GenAI platforms processing 1M+ AI requests daily. 
                    Built intelligent automation systems using Agentic AI reducing manual workflows by 60%.
                  </p>
                  <p>
                    <span className="text-foreground font-medium">Mentorship Excellence:</span> Successfully guided 50+ engineers into senior 
                    DevOps, Cloud, and AI roles at companies like Amazon, Microsoft, and Google.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Technical Skills Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="glass-card">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2 font-display text-sm">
                    <Zap className="h-4 w-4 text-primary" />
                    AI & Machine Learning
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {aiSkills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary" 
                        className="text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2 font-display text-sm">
                    <Server className="h-4 w-4 text-primary" />
                    DevOps & Automation
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {devopsTools.slice(0, 6).map((tool) => (
                      <Badge 
                        key={tool} 
                        variant="secondary" 
                        className="text-xs bg-secondary border-border hover:bg-secondary/80"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Programming Skills */}
            <Card className="glass-card">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2 font-display text-sm">
                  <Code className="h-4 w-4 text-primary" />
                  Programming & Scripting
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {programmingSkills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary" 
                      className="text-xs bg-secondary border-border hover:bg-secondary/80 font-mono"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
