import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Trash2, Check, X } from "lucide-react";
import { toast } from "sonner";

interface Review {
  id: number;
  name: string;
  role: string;
  company: string;
  rating: number;
  review: string;
  course: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

const ReviewManagement = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "Priya Sharma",
      role: "DevOps Engineer",
      company: "Amazon",
      rating: 5,
      review: "Akhil's mentoring transformed my career completely. The real-time projects and interview preparation were exactly what I needed to land my dream job at Amazon.",
      course: "Complete DevOps Mastery",
      date: "2024-01-15",
      status: 'approved'
    },
    {
      id: 2,
      name: "Rahul Kumar",
      role: "Cloud Engineer",
      company: "Microsoft",
      rating: 5,
      review: "Best investment I made for my career! Akhil's interview coaching program helped me crack Microsoft's technical rounds.",
      course: "Interview Mastery Program",
      date: "2024-01-10",
      status: 'approved'
    },
    {
      id: 3,
      name: "Anjali Patel",
      role: "Site Reliability Engineer",
      company: "Google",
      rating: 5,
      review: "The real-time DevOps projects course gave me hands-on experience with industry-standard tools.",
      course: "Real-Time DevOps Projects",
      date: "2024-01-05",
      status: 'approved'
    },
    {
      id: 4,
      name: "Vikram Singh",
      role: "Junior Developer",
      company: "TCS",
      rating: 4,
      review: "Great course content and practical examples. Looking forward to more advanced topics!",
      course: "Complete DevOps Mastery",
      date: "2024-01-20",
      status: 'pending'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const handleApprove = (id: number) => {
    setReviews(reviews.map(r => 
      r.id === id ? { ...r, status: 'approved' as const } : r
    ));
    toast.success("Review approved and will be visible on the website.");
  };

  const handleReject = (id: number) => {
    setReviews(reviews.map(r => 
      r.id === id ? { ...r, status: 'rejected' as const } : r
    ));
    toast.info("Review rejected and will not be displayed.");
  };

  const handleDelete = (id: number) => {
    setReviews(reviews.filter(r => r.id !== id));
    toast.success("Review deleted permanently.");
  };

  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(r => r.status === filter);

  const pendingCount = reviews.filter(r => r.status === 'pending').length;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Review Management
            {pendingCount > 0 && (
              <Badge variant="destructive">{pendingCount} Pending</Badge>
            )}
          </CardTitle>
        </div>
        <div className="flex gap-2 mt-4">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('all')}
          >
            All ({reviews.length})
          </Button>
          <Button 
            variant={filter === 'pending' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('pending')}
          >
            Pending ({reviews.filter(r => r.status === 'pending').length})
          </Button>
          <Button 
            variant={filter === 'approved' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('approved')}
          >
            Approved ({reviews.filter(r => r.status === 'approved').length})
          </Button>
          <Button 
            variant={filter === 'rejected' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('rejected')}
          >
            Rejected ({reviews.filter(r => r.status === 'rejected').length})
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredReviews.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No reviews found.</p>
          ) : (
            filteredReviews.map((review) => (
              <Card key={review.id} className="border border-border/50">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{review.name}</h4>
                          {getStatusBadge(review.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {review.role} at {review.company}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">{renderStars(review.rating)}</div>
                          <span className="text-xs text-muted-foreground">• {review.course}</span>
                        </div>
                        <p className="mt-2 text-sm">"{review.review}"</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Submitted on {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {review.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-green-500 hover:text-green-600 hover:bg-green-50"
                            onClick={() => handleApprove(review.id)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleReject(review.id)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(review.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewManagement;
