import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ARProfile = () => {
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add 3D transform and animation effects to simulate AR experience
    if (profileRef.current) {
      profileRef.current.style.transform = 'perspective(1000px) rotateY(10deg) rotateX(5deg)';
      profileRef.current.style.transition = 'all 0.5s ease';
    }

    // Simulate AR tracking animation
    const interval = setInterval(() => {
      if (profileRef.current) {
        const randomY = Math.sin(Date.now() * 0.001) * 5;
        const randomX = Math.cos(Date.now() * 0.001) * 3;
        profileRef.current.style.transform = `perspective(1000px) rotateY(${10 + randomY}deg) rotateX(${5 + randomX}deg) translateZ(20px)`;
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="container mx-auto max-w-4xl">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')} 
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Website
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-tech bg-clip-text text-transparent">
            AR Profile Experience
          </h1>
          <p className="text-muted-foreground">
            Welcome to the augmented reality profile view
          </p>
        </div>

        <div 
          ref={profileRef}
          className="relative bg-gradient-card p-8 rounded-3xl border border-primary/20 shadow-tech backdrop-blur-sm"
          style={{
            boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.1) inset'
          }}
        >
          {/* Holographic overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 rounded-3xl pointer-events-none animate-pulse" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              <div className="relative">
                <img 
                  src="/mentor-profile.png" 
                  alt="DevOps Mentor" 
                  className="w-32 h-32 rounded-full border-4 border-primary/30 shadow-tech"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(var(--primary), 0.3))'
                  }}
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 animate-pulse" />
              </div>
              
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2 text-primary">
                  DevOps Mentor & Tech Expert
                </h2>
                <p className="text-xl text-muted-foreground mb-4">
                  15+ Years of Cloud & DevOps Excellence
                </p>
                
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    AWS Certified
                  </Badge>
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                    Kubernetes Expert
                  </Badge>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    DevOps Leader
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">Core Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Cloud Architecture (AWS, Azure, GCP)</li>
                    <li>• Kubernetes & Container Orchestration</li>
                    <li>• CI/CD Pipeline Design & Implementation</li>
                    <li>• Infrastructure as Code (Terraform, Ansible)</li>
                    <li>• Monitoring & Observability</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-secondary/5 border-secondary/20">
                <CardHeader>
                  <CardTitle className="text-lg text-secondary">Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• 500+ Students Mentored</li>
                    <li>• 95% Job Placement Rate</li>
                    <li>• 20+ Enterprise Projects</li>
                    <li>• Industry Speaker & Trainer</li>
                    <li>• Open Source Contributor</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="default" className="bg-gradient-tech text-white">
                <Mail className="h-4 w-4 mr-2" />
                Get Mentoring
              </Button>
              <Button variant="outline">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button variant="outline">
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
              <Button variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Schedule Call
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
            <p className="text-sm text-muted-foreground">
              🚀 This is a simulated AR experience. In a real implementation, this would use WebXR or ARCore/ARKit 
              to display this profile as a 3D hologram in your physical space.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARProfile;