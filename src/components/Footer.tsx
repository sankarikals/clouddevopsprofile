import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Linkedin, BookOpen, MessageCircle, Mail, Phone, Sparkles } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                D
              </div>
              <span className="font-display font-bold text-xl">
                DevOps<span className="text-primary">Mentor</span>
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Empowering the next generation of DevOps and Cloud professionals through 
              personalized mentoring, real-world projects, and industry-focused training.
            </p>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-secondary/50 border-border hover:bg-secondary hover:border-primary/30"
                onClick={() => window.open('https://www.linkedin.com/in/akhil2308/', '_blank')}
              >
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-secondary/50 border-border hover:bg-secondary hover:border-primary/30"
                onClick={() => window.open('https://preplaced.in/profile/akhil-mittal', '_blank')}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Preplaced
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 font-display">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Courses
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
                </button>
              </li>
               <li>
                <button 
                  onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Reviews
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 font-display">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm">mentor@devopsexpert.com</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm">+91 725-945-2403</span>
              </div>
              <Button 
                className="w-full bg-gradient-hero hover:opacity-90 glow-primary"
                onClick={() => window.open('https://wa.me/917259452403', '_blank')}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border/50" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {currentYear} DevOps Mentor. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
