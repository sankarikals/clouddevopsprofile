import { Button } from "@/components/ui/button";
import { MessageCircle, Settings, Sparkles } from "lucide-react";

interface HeaderProps {
  onContactClick?: () => void;
}

const Header = ({ onContactClick }: HeaderProps) => {
  const scrollToSection = (id: string) => {
    if (id === 'contact' && onContactClick) {
      onContactClick();
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            D
          </div>
          <span className="font-display font-bold text-xl">
            DevOps<span className="text-primary">Mentor</span>
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('about')}
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('courses')}
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Courses
          </button>
          <button 
            onClick={() => scrollToSection('projects')}
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Projects
          </button>
          <button 
            onClick={() => scrollToSection('learning-insights')}
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Blog
          </button>
          <button 
            onClick={() => scrollToSection('reviews')}
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Reviews
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Contact
          </button>
        </nav>

        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => window.location.href = '/admin'}
            className="hidden lg:flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <Settings className="h-4 w-4" />
            Admin
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => window.open('https://wa.me/917259452403', '_blank')}
            className="hidden sm:flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </Button>
          <Button 
            onClick={onContactClick}
            className="bg-gradient-hero hover:opacity-90 shadow-hero glow-primary"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
