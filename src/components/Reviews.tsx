import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: number;
  name: string;
  role: string;
  company: string;
  rating: number;
  review: string;
  course: string;
  date: string;
}

const Reviews = () => {
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    role: "",
    company: "",
    rating: 5,
    review: "",
    course: ""
  });

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "Priya Sharma",
      role: "DevOps Engineer",
      company: "Amazon",
      rating: 5,
      review: "Akhil's mentoring transformed my career completely. The real-time projects and interview preparation were exactly what I needed to land my dream job at Amazon. His practical approach and industry insights are unmatched!",
      course: "Complete DevOps Mastery",
      date: "2024-01-15"
    },
    {
      id: 2,
      name: "Rahul Kumar",
      role: "Cloud Engineer",
      company: "Microsoft",
      rating: 5,
      review: "Best investment I made for my career! Akhil's interview coaching program helped me crack Microsoft's technical rounds. His mock interviews and personalized feedback were game-changers.",
      course: "Interview Mastery Program",
      date: "2024-01-10"
    },
    {
      id: 3,
      name: "Anjali Patel",
      role: "Site Reliability Engineer",
      company: "Google",
      rating: 5,
      review: "The real-time DevOps projects course gave me hands-on experience with industry-standard tools. Akhil's guidance helped me transition from development to DevOps seamlessly. Now I'm working at Google!",
      course: "Real-Time DevOps Projects",
      date: "2024-01-05"
    }
  ]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    const review: Review = {
      id: reviews.length + 1,
      ...newReview,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([review, ...reviews]);
    setNewReview({
      name: "",
      role: "",
      company: "",
      rating: 5,
      review: "",
      course: ""
    });
    setShowAddForm(false);

    toast({
      title: "Review Added Successfully!",
      description: "Thank you for sharing your feedback.",
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section id="reviews" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from mentees who transformed their careers with our DevOps programs
          </p>
        </div>

        {/* Admin Add Review Button */}
        <div className="text-center mb-8">
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-hero shadow-hero"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Review
          </Button>
        </div>

        {/* Add Review Form */}
        {showAddForm && (
          <Card className="mb-8 bg-gradient-card border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Add New Review</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reviewName">Name</Label>
                    <Input
                      id="reviewName"
                      value={newReview.name}
                      onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="reviewRole">Role</Label>
                    <Input
                      id="reviewRole"
                      value={newReview.role}
                      onChange={(e) => setNewReview({...newReview, role: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reviewCompany">Company</Label>
                    <Input
                      id="reviewCompany"
                      value={newReview.company}
                      onChange={(e) => setNewReview({...newReview, company: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="reviewCourse">Course</Label>
                    <Input
                      id="reviewCourse"
                      value={newReview.course}
                      onChange={(e) => setNewReview({...newReview, course: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="reviewText">Review</Label>
                  <Textarea
                    id="reviewText"
                    value={newReview.review}
                    onChange={(e) => setNewReview({...newReview, review: e.target.value})}
                    rows={4}
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <Button type="submit">Add Review</Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-gradient-card shadow-card border-0 hover:shadow-hero transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{review.name}</h4>
                      <p className="text-sm text-muted-foreground">{review.role}</p>
                      <p className="text-sm text-primary font-medium">{review.company}</p>
                    </div>
                  </div>
                  <Quote className="h-6 w-6 text-primary/30" />
                </div>
                <div className="flex items-center space-x-1 mt-2">
                  {renderStars(review.rating)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  "{review.review}"
                </p>
                <Badge variant="outline" className="text-xs">
                  {review.course}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Ready to write your own success story?
          </p>
          <Button 
            className="bg-gradient-hero shadow-hero"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Your Journey
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;