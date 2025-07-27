import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, CheckCircle, ArrowRight } from "lucide-react";

const Courses = () => {
  const courses = [
    {
      id: "interview-coaching",
      title: "Interview Mastery Program",
      duration: "1 Month",
      price: "$299",
      description: "Intensive interview preparation focused on technical and behavioral questions for DevOps roles.",
      features: [
        "Mock interviews with real scenarios",
        "Resume optimization",
        "System design for DevOps",
        "Behavioral question preparation",
        "Salary negotiation tips",
        "Job search strategy"
      ],
      popular: false,
      level: "All Levels"
    },
    {
      id: "real-time-projects",
      title: "Real-Time DevOps Projects",
      duration: "2 Months",
      price: "$599",
      description: "Build production-ready projects using latest DevOps tools and cloud technologies.",
      features: [
        "3 end-to-end projects",
        "CI/CD pipeline implementation",
        "Kubernetes deployment",
        "Infrastructure as Code",
        "Monitoring and logging setup",
        "Portfolio development"
      ],
      popular: true,
      level: "Intermediate"
    },
    {
      id: "full-coaching",
      title: "Complete DevOps Mastery",
      duration: "4 Months",
      price: "$1,199",
      description: "Comprehensive program covering everything from basics to advanced DevOps practices.",
      features: [
        "Fundamentals to advanced topics",
        "Cloud architecture design",
        "Security best practices",
        "Performance optimization",
        "Team leadership skills",
        "Career guidance & placement support"
      ],
      popular: false,
      level: "Beginner to Advanced"
    }
  ];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="courses" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Transform Your Career</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect program to accelerate your DevOps journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card 
              key={course.id} 
              className={`relative bg-gradient-card shadow-card border-0 hover:shadow-hero transition-all duration-300 ${
                course.popular ? 'ring-2 ring-primary' : ''
              }`}
            >
              {course.popular && (
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
                    course.popular 
                      ? 'bg-gradient-hero shadow-hero' 
                      : ''
                  }`}
                  variant={course.popular ? 'default' : 'outline'}
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
      </div>
    </section>
  );
};

export default Courses;