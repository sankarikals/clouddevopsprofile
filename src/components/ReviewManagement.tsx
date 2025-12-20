import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Trash2, Check, X, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface Review {
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

interface ReviewManagementProps {
  adminPassword: string;
}

const ReviewManagement = ({ adminPassword }: ReviewManagementProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://crlrmhvvrnbmkezdtemu.supabase.co/functions/v1/admin-reviews",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-admin-password": adminPassword,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      
      const data = await response.json();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to fetch reviews");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [adminPassword]);

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(
        "https://crlrmhvvrnbmkezdtemu.supabase.co/functions/v1/admin-reviews",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-admin-password": adminPassword,
          },
          body: JSON.stringify({ id, status: "approved" }),
        }
      );
      
      if (!response.ok) throw new Error("Failed to approve review");
      
      setReviews(reviews.map(r => 
        r.id === id ? { ...r, status: 'approved' as const } : r
      ));
      toast.success("Review approved and will be visible on the website.");
    } catch (error) {
      console.error("Error approving review:", error);
      toast.error("Failed to approve review");
    }
  };

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(
        "https://crlrmhvvrnbmkezdtemu.supabase.co/functions/v1/admin-reviews",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-admin-password": adminPassword,
          },
          body: JSON.stringify({ id, status: "rejected" }),
        }
      );
      
      if (!response.ok) throw new Error("Failed to reject review");
      
      setReviews(reviews.map(r => 
        r.id === id ? { ...r, status: 'rejected' as const } : r
      ));
      toast.info("Review rejected and will not be displayed.");
    } catch (error) {
      console.error("Error rejecting review:", error);
      toast.error("Failed to reject review");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        "https://crlrmhvvrnbmkezdtemu.supabase.co/functions/v1/admin-reviews",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-admin-password": adminPassword,
          },
          body: JSON.stringify({ id }),
        }
      );
      
      if (!response.ok) throw new Error("Failed to delete review");
      
      setReviews(reviews.filter(r => r.id !== id));
      toast.success("Review deleted permanently.");
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete review");
    }
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
          <Button variant="outline" size="sm" onClick={fetchReviews} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
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
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading reviews...</div>
        ) : (
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
                            Submitted on {new Date(review.created_at).toLocaleDateString()}
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
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewManagement;
