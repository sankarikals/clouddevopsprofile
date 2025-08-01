import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-devops.jpg";

interface HeroProps {
  onEnrollClick?: () => void;
}

const Hero = ({ onEnrollClick }: HeroProps) => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="DevOps and Cloud Engineering"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/90"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-gradient-accent rounded-full text-primary font-medium text-sm mb-4">
              10+ Years of DevOps & Cloud Expertise
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Transform Your Career in 
            <span className="bg-gradient-hero bg-clip-text text-transparent"> DevOps & Cloud</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            Master DevOps and Cloud technologies with personalized mentoring from an industry expert. 
            Get interview-ready, build real-world projects, and accelerate your tech career.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="lg" 
              onClick={() => scrollToSection('voice-assistant')}
              className="bg-gradient-hero shadow-hero text-lg px-8 py-6 group"
            >
              🎤 Try AI Voice Assistant
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={onEnrollClick}
              className="text-lg px-8 py-6"
            >
              Enroll Now
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-accent rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">50+</div>
                <div className="text-muted-foreground">Students Mentored</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-accent rounded-lg">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">95%</div>
                <div className="text-muted-foreground">Success Rate</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-accent rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">10+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;