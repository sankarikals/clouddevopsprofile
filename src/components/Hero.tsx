import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Sparkles, BookOpen, Award, Users } from "lucide-react";

interface HeroProps {
  onEnrollClick?: () => void;
}

const Hero = ({ onEnrollClick }: HeroProps) => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    { icon: Sparkles, label: "Industry Experts" },
    { icon: BookOpen, label: "Lifetime Access" },
    { icon: Award, label: "Certificate" },
    { icon: Users, label: "Real Projects" }
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 tech-bg overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating tech badges */}
        <div className="absolute top-32 left-[10%] floating-badge hidden lg:block" style={{ animationDelay: '0s' }}>
          <span className="flex items-center gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" className="h-5 w-auto" />
            Microsoft Azure
          </span>
        </div>
        <div className="absolute top-48 right-[15%] floating-badge hidden lg:block" style={{ animationDelay: '1s' }}>
          <span className="flex items-center gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="h-5 w-auto" />
            AWS
          </span>
        </div>
        <div className="absolute bottom-40 left-[20%] floating-badge hidden lg:block" style={{ animationDelay: '2s' }}>
          <span className="flex items-center gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" alt="GCP" className="h-4 w-auto" />
            GCP
          </span>
        </div>
        <div className="absolute bottom-60 right-[10%] floating-badge hidden lg:block" style={{ animationDelay: '1.5s' }}>
          <span className="flex items-center gap-2">
            <span className="text-primary">🐳</span>
            Docker & K8s
          </span>
        </div>
        
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(hsl(0 85% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 85% 60%) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Top badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="floating-badge-primary flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              100% Practical Learning
            </span>
            <span className="floating-badge-primary flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Live Interactive Classes
            </span>
            <span className="floating-badge-primary flex items-center gap-2">
              <Award className="w-4 h-4" />
              Career Breakthrough
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight font-display">
            Transform Your
            <span className="block bg-gradient-hero bg-clip-text text-transparent text-glow">
              Future Through Education
            </span>
          </h1>

          {/* Feature icons */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {features.map((feature) => (
              <div key={feature.label} className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>{feature.label}</span>
              </div>
            ))}
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Join <span className="text-foreground font-semibold">50+</span> learners mastering cutting-edge skills with{" "}
            <span className="text-primary font-semibold">expert-led courses</span>, hands-on projects, 
            and industry-recognized certifications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              onClick={() => window.open('https://calendly.com/akhilmittal510', '_blank')}
              className="bg-gradient-hero hover:opacity-90 shadow-hero text-lg px-8 py-6 group glow-primary"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => scrollToSection('courses')}
              className="text-lg px-8 py-6 bg-secondary/50 border-border hover:bg-secondary"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              See All Courses
            </Button>
          </div>

          {/* Partners section */}
          <div className="mt-16">
            <p className="text-sm text-muted-foreground mb-6 uppercase tracking-wider">Accredited Training Partners</p>
            <div className="overflow-hidden relative">
              <div className="flex gap-12 items-center justify-center opacity-60">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" className="h-8 w-auto partner-logo" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="h-8 w-auto partner-logo" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" alt="Google Cloud" className="h-6 w-auto partner-logo" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-6 w-auto partner-logo" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg" alt="Cisco" className="h-6 w-auto partner-logo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
