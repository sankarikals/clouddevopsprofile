import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  review: string;
  course: string;
  created_at: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface ReviewsDisplayProps {
  onSubmitClick: () => void;
  onConsultationClick: () => void;
}

// Fallback reviews for when database is empty
const fallbackReviews: Review[] = [
  {
    id: "1",
    name: "Priya Sharma",
    role: "DevOps Engineer",
    company: "Amazon",
    rating: 5,
    review: "Akhil's mentoring transformed my career completely. The real-time projects and interview preparation were exactly what I needed to land my dream job at Amazon. His practical approach and industry insights are unmatched!",
    course: "Complete DevOps Mastery",
    created_at: "2024-01-15",
    status: 'approved'
  },
  {
    id: "2",
    name: "Rahul Kumar",
    role: "Cloud Engineer",
    company: "Microsoft",
    rating: 5,
    review: "Best investment I made for my career! Akhil's interview coaching program helped me crack Microsoft's technical rounds. His mock interviews and personalized feedback were game-changers.",
    course: "Interview Mastery Program",
    created_at: "2024-01-10",
    status: 'approved'
  },
  {
    id: "3",
    name: "Anjali Patel",
    role: "Site Reliability Engineer",
    company: "Google",
    rating: 5,
    review: "The real-time DevOps projects course gave me hands-on experience with industry-standard tools. Akhil's guidance helped me transition from development to DevOps seamlessly. Now I'm working at Google!",
    course: "Real-Time DevOps Projects",
    created_at: "2024-01-05",
    status: 'approved'
  }
];

const ReviewsDisplay = ({ onSubmitClick, onConsultationClick }: ReviewsDisplayProps) => {
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews);

  useEffect(() => {
    const fetchApprovedReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        setReviews(data as Review[]);
      }
    };

    fetchApprovedReviews();
  }, []);

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

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.slice(0, 6).map((review) => (
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
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline"
              onClick={onSubmitClick}
            >
              Share Your Review
            </Button>
            <Button 
              className="bg-gradient-hero shadow-hero"
              onClick={onConsultationClick}
            >
              Start Your Journey
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsDisplay;
