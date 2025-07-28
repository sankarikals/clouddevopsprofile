import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";

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

interface CourseManagementProps {
  isVisible: boolean;
  onClose: () => void;
  onCoursesUpdate: (courses: Course[]) => void;
  initialCourses: Course[];
}

const CourseManagement = ({ isVisible, onClose, onCoursesUpdate, initialCourses }: CourseManagementProps) => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState<Course>({
    id: 0,
    title: "",
    description: "",
    duration: "",
    level: "",
    price: "",
    originalPrice: "",
    features: [""],
    isPopular: false,
    published: true,
  });
  const { toast } = useToast();

  if (!isVisible) return null;

  const handleSubmitCourse = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCourse.title || !newCourse.description || !newCourse.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const filteredFeatures = newCourse.features.filter(feature => feature.trim() !== "");
    
    if (editingCourse) {
      const updatedCourses = courses.map(course =>
        course.id === editingCourse.id
          ? { ...newCourse, features: filteredFeatures }
          : course
      );
      setCourses(updatedCourses);
      onCoursesUpdate(updatedCourses);
      setEditingCourse(null);
      toast({
        title: "Success",
        description: "Course updated successfully!",
      });
    } else {
      const newCourseWithId = {
        ...newCourse,
        id: Math.max(...courses.map(c => c.id), 0) + 1,
        features: filteredFeatures,
      };
      const updatedCourses = [...courses, newCourseWithId];
      setCourses(updatedCourses);
      onCoursesUpdate(updatedCourses);
      toast({
        title: "Success",
        description: "Course added successfully!",
      });
    }

    setNewCourse({
      id: 0,
      title: "",
      description: "",
      duration: "",
      level: "",
      price: "",
      originalPrice: "",
      features: [""],
      isPopular: false,
      published: true,
    });
    setShowAddForm(false);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setNewCourse({ ...course });
    setShowAddForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      const updatedCourses = courses.filter(course => course.id !== id);
      setCourses(updatedCourses);
      onCoursesUpdate(updatedCourses);
      toast({
        title: "Success",
        description: "Course deleted successfully!",
      });
    }
  };

  const togglePopular = (id: number) => {
    const updatedCourses = courses.map(course =>
      course.id === id ? { ...course, isPopular: !course.isPopular } : course
    );
    setCourses(updatedCourses);
    onCoursesUpdate(updatedCourses);
  };

  const togglePublished = (id: number) => {
    const updatedCourses = courses.map(course =>
      course.id === id ? { ...course, published: !course.published } : course
    );
    setCourses(updatedCourses);
    onCoursesUpdate(updatedCourses);
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg shadow-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Course Management</h2>
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
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
                      <Label htmlFor="price">Price *</Label>
                      <Input
                        id="price"
                        value={newCourse.price}
                        onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                        placeholder="e.g., ₹15,000"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="originalPrice">Original Price (optional)</Label>
                    <Input
                      id="originalPrice"
                      value={newCourse.originalPrice || ""}
                      onChange={(e) => setNewCourse({ ...newCourse, originalPrice: e.target.value })}
                      placeholder="e.g., ₹25,000"
                    />
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
                        checked={newCourse.isPopular}
                        onCheckedChange={(checked) => setNewCourse({ ...newCourse, isPopular: checked })}
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
                    <Button type="submit" className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      {editingCourse ? "Update Course" : "Add Course"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingCourse(null);
                        setNewCourse({
                          id: 0,
                          title: "",
                          description: "",
                          duration: "",
                          level: "",
                          price: "",
                          originalPrice: "",
                          features: [""],
                          isPopular: false,
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
                        {course.isPopular && (
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
                        <span>Price: {course.price}</span>
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
                        onClick={() => togglePopular(course.id)}
                        className={course.isPopular ? "bg-primary/10" : ""}
                      >
                        ⭐
                      </Button>
                      <Switch
                        checked={course.published}
                        onCheckedChange={() => togglePublished(course.id)}
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
      </div>
    </div>
  );
};

export default CourseManagement;