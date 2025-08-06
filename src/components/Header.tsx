import { Button } from "@/components/ui/button";
import { MessageCircle, Settings } from "lucide-react";

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="font-bold text-xl text-primary">DevOps Mentor</div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => scrollToSection('about')}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('courses')}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Courses
          </button>
          <button 
            onClick={() => scrollToSection('projects')}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Projects
          </button>
          <button 
            onClick={() => scrollToSection('learning-insights')}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Blog
          </button>
          <button 
            onClick={() => scrollToSection('reviews')}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Reviews
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Contact
          </button>
        </nav>

        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => window.location.href = '/admin'}
            className="hidden lg:flex items-center gap-2 text-muted-foreground hover:text-primary"
          >
            <Settings className="h-4 w-4" />
            Admin
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open('https://wa.me/917259452403', '_blank')}
            className="hidden sm:flex items-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </Button>
          <Button 
            onClick={onContactClick}
            className="bg-gradient-hero shadow-hero"
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;