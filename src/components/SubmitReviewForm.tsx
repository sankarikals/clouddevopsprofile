import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface SubmitReviewFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubmitReviewForm = ({ isOpen, onClose }: SubmitReviewFormProps) => {
  const [newReview, setNewReview] = useState({
    name: "",
    role: "",
    company: "",
    rating: 5,
    review: "",
    course: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from("reviews")
        .insert({
          name: newReview.name,
          role: newReview.role,
          company: newReview.company,
          rating: newReview.rating,
          review: newReview.review,
          course: newReview.course,
          status: 'pending'
        });

      if (error) throw error;
      
      toast.success("Review Submitted!", {
        description: "Thank you for your feedback. Your review has been submitted successfully.",
      });
      
      setNewReview({
        name: "",
        role: "",
        company: "",
        rating: 5,
        review: "",
        course: ""
      });
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <Card className="w-full max-w-2xl bg-gradient-card border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Share Your Experience</CardTitle>
            <CardDescription>
              Your review will be visible once approved by our team
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reviewName">Name *</Label>
                <Input
                  id="reviewName"
                  value={newReview.name}
                  onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="reviewRole">Role *</Label>
                <Input
                  id="reviewRole"
                  value={newReview.role}
                  onChange={(e) => setNewReview({...newReview, role: e.target.value})}
                  placeholder="e.g. DevOps Engineer"
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reviewCompany">Company *</Label>
                <Input
                  id="reviewCompany"
                  value={newReview.company}
                  onChange={(e) => setNewReview({...newReview, company: e.target.value})}
                  placeholder="Your company name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="reviewCourse">Course *</Label>
                <Input
                  id="reviewCourse"
                  value={newReview.course}
                  onChange={(e) => setNewReview({...newReview, course: e.target.value})}
                  placeholder="Course you took"
                  required
                />
              </div>
            </div>
            <div>
              <Label>Rating *</Label>
              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({...newReview, rating: star})}
                    className="focus:outline-none"
                  >
                    <Star 
                      className={`h-6 w-6 cursor-pointer transition-colors ${
                        star <= newReview.rating 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300 hover:text-yellow-200'
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="reviewText">Your Review *</Label>
              <Textarea
                id="reviewText"
                value={newReview.review}
                onChange={(e) => setNewReview({...newReview, review: e.target.value})}
                placeholder="Share your experience with our mentoring program..."
                rows={4}
                required
              />
            </div>
            <div className="flex gap-4 pt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmitReviewForm;
