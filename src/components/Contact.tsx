import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Send, Upload, Lightbulb } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentField: "",
    experience: "",
    aspirations: "",
    linkedinProfile: "",
    phone: "",
    message: ""
  });
  const [recommendedCourses, setRecommendedCourses] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-recommend courses based on experience
    if (field === 'experience') {
      recommendCourses(value);
    }
  };

  const recommendCourses = (experience: string) => {
    const recommendations: string[] = [];
    
    if (experience === "0-1" || experience === "1-2") {
      recommendations.push("Complete DevOps Mastery", "Real-Time DevOps Projects");
    } else if (experience === "2-5") {
      recommendations.push("Real-Time DevOps Projects", "Interview Mastery Program");
    } else if (experience === "5+") {
      recommendations.push("Interview Mastery Program");
    }
    
    setRecommendedCourses(recommendations);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    
    toast({
      title: "Query Submitted Successfully!",
      description: "I'll get back to you within 24 hours with a personalized course recommendation.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      currentField: "",
      experience: "",
      aspirations: "",
      linkedinProfile: "",
      phone: "",
      message: ""
    });
    setRecommendedCourses([]);
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in your DevOps courses. Here are my details:\n` +
      `Name: ${formData.name}\n` +
      `Current Field: ${formData.currentField}\n` +
      `Experience: ${formData.experience} years\n` +
      `Aspirations: ${formData.aspirations}`
    );
    window.open(`https://wa.me/917259452403?text=${message}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-gradient-accent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started Today</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your background and aspirations. I'll recommend the perfect course for your career goals.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-card shadow-hero border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Course Recommendation Form</CardTitle>
              <CardDescription>
                Fill out your details to get a personalized course recommendation
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentField">Current Field/Role</Label>
                    <Input
                      id="currentField"
                      value={formData.currentField}
                      onChange={(e) => handleInputChange('currentField', e.target.value)}
                      placeholder="e.g., Software Developer, System Admin"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Select onValueChange={(value) => handleInputChange('experience', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 years</SelectItem>
                        <SelectItem value="1-2">1-2 years</SelectItem>
                        <SelectItem value="2-5">2-5 years</SelectItem>
                        <SelectItem value="5+">5+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aspirations">Career Aspirations</Label>
                  <Textarea
                    id="aspirations"
                    value={formData.aspirations}
                    onChange={(e) => handleInputChange('aspirations', e.target.value)}
                    placeholder="What are your career goals? What specific DevOps/Cloud role are you targeting?"
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="linkedinProfile">LinkedIn Profile (Optional)</Label>
                    <Input
                      id="linkedinProfile"
                      value={formData.linkedinProfile}
                      onChange={(e) => handleInputChange('linkedinProfile', e.target.value)}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume">Resume Upload (Optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Click to upload your resume (PDF, DOC)</p>
                    <Button variant="outline" className="mt-2" type="button">
                      Choose File
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Any specific questions or requirements?"
                    rows={3}
                  />
                </div>

                {recommendedCourses.length > 0 && (
                  <div className="p-4 bg-gradient-accent rounded-lg border">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold text-primary">Recommended Courses</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recommendedCourses.map((course) => (
                        <Badge key={course} className="bg-primary/10 text-primary">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gradient-hero shadow-hero group"
                  >
                    <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    Submit Query
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={handleWhatsAppContact}
                    className="flex-1 bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Contact via WhatsApp
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;