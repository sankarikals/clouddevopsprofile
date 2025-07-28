import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clock, Users, Star, CheckCircle, ArrowRight, Settings, Lock } from "lucide-react";
import CourseManagement from "./CourseManagement";

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: string;
  price: string;
  originalPrice?: string;
  features: string[];
  isPopular: boolean;
  published: boolean;
}

const Courses = () => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: "Complete DevOps Mastery",
      description: "Master the complete DevOps lifecycle with hands-on projects and real-world scenarios.",
      duration: "12 weeks",
      level: "Beginner to Advanced",
      price: "₹15,000",
      originalPrice: "₹25,000",
      features: [
        "CI/CD Pipeline Setup",
        "Docker & Kubernetes",
        "AWS/Azure Cloud Platforms",
        "Infrastructure as Code",
        "Monitoring & Logging",
        "Security Best Practices",
        "Live Projects",
        "Job Assistance"
      ],
      isPopular: true,
      published: true
    },
    {
      id: 2,
      title: "Cloud Architecture Fundamentals",
      description: "Learn cloud-native architectures and deployment strategies on major cloud platforms.",
      duration: "8 weeks",
      level: "Intermediate",
      price: "₹12,000",
      features: [
        "Multi-cloud Strategy",
        "Serverless Computing",
        "Cloud Security",
        "Cost Optimization",
        "Migration Strategies",
        "Hands-on Labs"
      ],
      isPopular: false,
      published: true
    },
    {
      id: 3,
      title: "Advanced Kubernetes Operations",
      description: "Deep dive into Kubernetes orchestration, scaling, and enterprise-grade deployments.",
      duration: "6 weeks",
      level: "Advanced",
      price: "₹10,000",
      features: [
        "Custom Controllers",
        "Helm Charts",
        "Service Mesh",
        "Advanced Networking",
        "Troubleshooting",
        "Production Scenarios"
      ],
      isPopular: false,
      published: true
    }
  ]);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAdminLogin = () => {
    if (adminPassword === "akhil2308") {
      setIsAdmin(true);
      setShowAdminPanel(true);
      setShowAuthDialog(false);
      setAdminPassword("");
    } else {
      alert("Incorrect password!");
    }
  };

  const handleManageClick = () => {
    if (isAdmin) {
      setShowAdminPanel(true);
    } else {
      setShowAuthDialog(true);
    }
  };

  const handleCoursesUpdate = (updatedCourses: Course[]) => {
    setCourses(updatedCourses);
  };

  // Filter only published courses for display
  const publishedCourses = courses.filter(course => course.published);

  return (
    <section id="courses" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex justify-between items-center">
            <div className="flex-1 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Transform Your Career</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose the perfect program to accelerate your DevOps journey
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleManageClick}
              className="hidden md:flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Manage Courses
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedCourses.map((course) => (
            <Card 
              key={course.id} 
              className={`relative bg-gradient-card shadow-card border-0 hover:shadow-hero transition-all duration-300 ${
                course.isPopular ? 'ring-2 ring-primary' : ''
              }`}
            >
              {course.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-hero shadow-hero">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">{course.title}</CardTitle>
                <CardDescription className="text-base">{course.description}</CardDescription>
                
                <div className="flex justify-center items-center space-x-4 mt-4">
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{course.duration}</span>
                  </div>
                  <Badge variant="outline">{course.level}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{course.price}</div>
                  {course.originalPrice && (
                    <div className="text-sm text-muted-foreground line-through">{course.originalPrice}</div>
                  )}
                  <div className="text-sm text-muted-foreground">One-time payment</div>
                </div>

                <div className="space-y-2">
                  {course.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="pt-6">
                <Button 
                  onClick={scrollToContact}
                  className={`w-full group ${
                    course.isPopular 
                      ? 'bg-gradient-hero shadow-hero' 
                      : ''
                  }`}
                  variant={course.isPopular ? 'default' : 'outline'}
                >
                  Enroll Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Not sure which program is right for you?
          </p>
          <Button 
            variant="outline" 
            onClick={scrollToContact}
            className="bg-gradient-accent"
          >
            Get Personalized Recommendation
          </Button>
        </div>

        <CourseManagement 
          isVisible={showAdminPanel} 
          onClose={() => setShowAdminPanel(false)}
          onCoursesUpdate={handleCoursesUpdate}
          initialCourses={courses}
        />
        
        <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Admin Authentication
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Enter admin password to manage course content:
              </p>
              <Input
                type="password"
                placeholder="Enter admin password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
              />
              <div className="flex gap-2">
                <Button onClick={handleAdminLogin} className="flex-1">
                  Login
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowAuthDialog(false);
                    setAdminPassword("");
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Courses;