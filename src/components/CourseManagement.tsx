import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  price: number;
  features: string[];
  is_popular: boolean;
  published: boolean;
}

interface CourseManagementProps {
  isVisible: boolean;
  onClose: () => void;
  onCoursesUpdate: () => void;
}

const CourseManagement = ({ isVisible, onClose, onCoursesUpdate }: CourseManagementProps) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);
  const [newCourse, setNewCourse] = useState<{
    title: string;
    description: string;
    duration: string;
    level: string;
    price: string;
    features: string[];
    is_popular: boolean;
    published: boolean;
  }>({
    title: "",
    description: "",
    duration: "",
    level: "",
    price: "",
    features: [""],
    is_popular: false,
    published: true,
  });
  const { toast } = useToast();

  const loadCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error loading courses:', error);
      toast({
        title: "Error",
        description: "Failed to load courses",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (isVisible) {
      loadCourses();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const handleSubmitCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCourse.title || !newCourse.description || !newCourse.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const priceNumber = parseFloat(newCourse.price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid price",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const filteredFeatures = newCourse.features.filter(feature => feature.trim() !== "");
    
    try {
      if (editingCourse) {
        const { error } = await supabase
          .from('courses')
          .update({
            title: newCourse.title,
            description: newCourse.description,
            duration: newCourse.duration,
            level: newCourse.level,
            price: priceNumber,
            features: filteredFeatures,
            is_popular: newCourse.is_popular,
            published: newCourse.published,
          })
          .eq('id', editingCourse.id);

        if (error) throw error;
        setEditingCourse(null);
        toast({
          title: "Success",
          description: "Course updated successfully!",
        });
      } else {
        const { error } = await supabase
          .from('courses')
          .insert({
            title: newCourse.title,
            description: newCourse.description,
            duration: newCourse.duration,
            level: newCourse.level,
            price: priceNumber,
            features: filteredFeatures,
            is_popular: newCourse.is_popular,
            published: newCourse.published,
          });

        if (error) throw error;
        toast({
          title: "Success",
          description: "Course added successfully!",
        });
      }

      setNewCourse({
        title: "",
        description: "",
        duration: "",
        level: "",
        price: "",
        features: [""],
        is_popular: false,
        published: true,
      });
      setShowAddForm(false);
      loadCourses();
      onCoursesUpdate();
    } catch (error) {
      console.error('Error saving course:', error);
      toast({
        title: "Error",
        description: "Failed to save course",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setNewCourse({
      title: course.title,
      description: course.description,
      duration: course.duration,
      level: course.level,
      price: course.price.toString(),
      features: course.features.length > 0 ? course.features : [""],
      is_popular: course.is_popular,
      published: course.published,
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const { error } = await supabase
          .from('courses')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Course deleted successfully!",
        });
        loadCourses();
        onCoursesUpdate();
      } catch (error) {
        console.error('Error deleting course:', error);
        toast({
          title: "Error",
          description: "Failed to delete course",
          variant: "destructive",
        });
      }
    }
  };

  const togglePopular = async (id: string, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from('courses')
        .update({ is_popular: !currentValue })
        .eq('id', id);

      if (error) throw error;
      loadCourses();
      onCoursesUpdate();
    } catch (error) {
      console.error('Error updating course:', error);
      toast({
        title: "Error",
        description: "Failed to update course",
        variant: "destructive",
      });
    }
  };

  const togglePublished = async (id: string, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from('courses')
        .update({ published: !currentValue })
        .eq('id', id);

      if (error) throw error;
      loadCourses();
      onCoursesUpdate();
    } catch (error) {
      console.error('Error updating course:', error);
      toast({
        title: "Error",
        description: "Failed to update course",
        variant: "destructive",
      });
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...newCourse.features];
    updatedFeatures[index] = value;
    setNewCourse({ ...newCourse, features: updatedFeatures });
  };

  const addFeature = () => {
    setNewCourse({ ...newCourse, features: [...newCourse.features, ""] });
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = newCourse.features.filter((_, i) => i !== index);
    setNewCourse({ ...newCourse, features: updatedFeatures });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Course Management</h2>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Manage Courses</h3>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Course
        </Button>
      </div>

      {showAddForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{editingCourse ? "Edit Course" : "Add New Course"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitCourse} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Course Title *</Label>
                  <Input
                    id="title"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                    placeholder="Enter course title"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                    placeholder="e.g., 8 weeks"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="level">Level</Label>
                  <Input
                    id="level"
                    value={newCourse.level}
                    onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
                    placeholder="e.g., Beginner to Advanced"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                    placeholder="e.g., 899"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  placeholder="Enter course description"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label>Course Features</Label>
                {newCourse.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder="Enter feature"
                    />
                    {newCourse.features.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeFeature(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addFeature}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="popular"
                    checked={newCourse.is_popular}
                    onCheckedChange={(checked) => setNewCourse({ ...newCourse, is_popular: checked })}
                  />
                  <Label htmlFor="popular">Mark as Popular</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={newCourse.published}
                    onCheckedChange={(checked) => setNewCourse({ ...newCourse, published: checked })}
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex items-center gap-2" disabled={loading}>
                  <Save className="h-4 w-4" />
                  {loading ? "Saving..." : (editingCourse ? "Update Course" : "Add Course")}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingCourse(null);
                    setNewCourse({
                      title: "",
                      description: "",
                      duration: "",
                      level: "",
                      price: "",
                      features: [""],
                      is_popular: false,
                      published: true,
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    {course.is_popular && (
                      <Badge variant="secondary">Most Popular</Badge>
                    )}
                    <Badge variant={course.published ? "default" : "secondary"}>
                      {course.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
                  <div className="flex gap-4 text-sm">
                    <span>Duration: {course.duration}</span>
                    <span>Level: {course.level}</span>
                    <span>Price: ${course.price.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(course)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => togglePopular(course.id, course.is_popular)}
                    className={course.is_popular ? "bg-primary/10" : ""}
                  >
                    ⭐
                  </Button>
                  <Switch
                    checked={course.published}
                    onCheckedChange={() => togglePublished(course.id, course.published)}
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(course.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <strong>Features:</strong>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {course.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseManagement;