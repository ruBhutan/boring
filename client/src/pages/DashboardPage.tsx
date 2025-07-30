import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import {
  Award,
  Calendar,
  CheckCircle,
  Clock,
  LogOut,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  User,
  Users
} from "lucide-react";
import { useEffect, useState } from "react";

interface UserProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: string;
  profileImage?: string;
}

interface Itinerary {
  id: number;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  currentParticipants: number;
  status: string;
  tour: {
    id: number;
    name: string;
    description: string;
    category: string;
    imageUrl: string;
  };
  days: ItineraryDay[];
}

interface ItineraryDay {
  id: number;
  dayNumber: number;
  title: string;
  description: string;
  activities: string[];
  accommodation?: string;
  meals: string[];
  transportation?: string;
  notes?: string;
}

interface Feedback {
  id?: number;
  itineraryId: number;
  tourId?: number;
  rating: number;
  comment?: string;
  category: string;
  isPublic: boolean;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackData, setFeedbackData] = useState<Partial<Feedback>>({
    rating: 5,
    category: "overall",
    isPublic: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const { data: itineraries = [], isLoading } = useQuery<Itinerary[]>({
    queryKey: ["/api/itineraries"],
    enabled: !!user,
  });

  const { data: userFeedback = [] } = useQuery({
    queryKey: [`/api/user-feedback?userId=${user?.id}`],
    enabled: !!user?.id,
  });

  // Filter itineraries based on user role
  const userItineraries = itineraries.filter(itinerary => {
    if (user?.role === "guide") {
      return itinerary.guide?.id === user.id;
    } else if (user?.role === "driver") {
      return itinerary.driver?.id === user.id;
    }
    return false;
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedItinerary || !user) {
      toast({
        title: "Error",
        description: "Missing required information.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/user-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...feedbackData,
          userId: user.id,
          itineraryId: selectedItinerary.id,
          tourId: selectedItinerary.tour.id,
        }),
      });

      if (response.ok) {
        toast({
          title: "Feedback Submitted!",
          description: "Thank you for your feedback. It helps us improve our services.",
        });
        setIsFeedbackModalOpen(false);
        setFeedbackData({
          rating: 5,
          category: "overall",
          isPublic: false,
        });
        setSelectedItinerary(null);
      } else {
        throw new Error("Failed to submit feedback");
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your feedback. Please try again.",
        variant: "destructive",
      });
    }
  };

  const openFeedbackModal = (itinerary: Itinerary) => {
    setSelectedItinerary(itinerary);
    setIsFeedbackModalOpen(true);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <p className="mb-4">Please log in to access your dashboard.</p>
            <Button onClick={() => window.location.href = "/login"}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading your dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {user.firstName}!
            </h1>
            <p className="text-gray-600">
              {user.role === "guide" ? "Guide" : "Driver"} Dashboard
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold">{user.firstName} {user.lastName}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Profile Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span>{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{user.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-gray-500" />
                <Badge variant="secondary">{user.role}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Assignments</p>
                  <p className="text-2xl font-bold">{userItineraries.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Tours</p>
                  <p className="text-2xl font-bold">
                    {userItineraries.filter(i => i.status === "active").length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed Tours</p>
                  <p className="text-2xl font-bold">
                    {userItineraries.filter(i => i.status === "completed").length}
                  </p>
                </div>
                <Award className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Feedback Given</p>
                  <p className="text-2xl font-bold">{userFeedback.length}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Itineraries */}
        <Card>
          <CardHeader>
            <CardTitle>Your Assigned Itineraries</CardTitle>
            <CardDescription>
              View details of tours you're assigned to and provide feedback
            </CardDescription>
          </CardHeader>
          <CardContent>
            {userItineraries.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No itineraries assigned yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userItineraries.map((itinerary) => (
                  <Card key={itinerary.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{itinerary.name}</h3>
                            <Badge variant={itinerary.status === "active" ? "default" : "secondary"}>
                              {itinerary.status}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-600 mb-3">{itinerary.description}</p>
                          
                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {new Date(itinerary.startDate).toLocaleDateString()} - 
                                  {new Date(itinerary.endDate).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Users className="w-4 h-4" />
                                <span>
                                  {itinerary.currentParticipants}/{itinerary.maxParticipants} participants
                                </span>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4" />
                                <span>{itinerary.tour.category} Tour</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="w-4 h-4" />
                                <span>{itinerary.days?.length || 0} days</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Tour Details */}
                          <div className="bg-gray-50 rounded-lg p-3 mb-4">
                            <h4 className="font-semibold mb-2">Tour: {itinerary.tour.name}</h4>
                            <p className="text-sm text-gray-600">{itinerary.tour.description}</p>
                          </div>
                          
                          {/* Itinerary Days */}
                          {itinerary.days && itinerary.days.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="font-semibold">Daily Itinerary:</h4>
                              <div className="space-y-2 max-h-40 overflow-y-auto">
                                {itinerary.days.map((day) => (
                                  <div key={day.id} className="bg-white border rounded p-2">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <p className="font-medium">Day {day.dayNumber}: {day.title}</p>
                                        <p className="text-sm text-gray-600">{day.description}</p>
                                        {day.activities.length > 0 && (
                                          <div className="mt-1">
                                            <span className="text-xs font-medium">Activities: </span>
                                            <span className="text-xs">{day.activities.join(", ")}</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col gap-2 ml-4">
                          <Button
                            size="sm"
                            onClick={() => setSelectedItinerary(itinerary)}
                          >
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openFeedbackModal(itinerary)}
                          >
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Give Feedback
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Itinerary Details Modal */}
      <Dialog open={!!selectedItinerary && !isFeedbackModalOpen} onOpenChange={() => setSelectedItinerary(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedItinerary && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedItinerary.name}</DialogTitle>
                <DialogDescription>
                  {selectedItinerary.tour.name} • {selectedItinerary.tour.category}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <img
                  src={selectedItinerary.tour.imageUrl}
                  alt={selectedItinerary.tour.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Tour Information</h3>
                    <p className="text-gray-600 mb-4">{selectedItinerary.tour.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(selectedItinerary.startDate).toLocaleDateString()} - 
                          {new Date(selectedItinerary.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>
                          {selectedItinerary.currentParticipants}/{selectedItinerary.maxParticipants} participants
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={selectedItinerary.status === "active" ? "default" : "secondary"}>
                          {selectedItinerary.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Your Role</h3>
                    <p className="text-gray-600 mb-2">
                      You are assigned as the {user?.role} for this tour.
                    </p>
                    {user?.role === "guide" && (
                      <p className="text-sm text-gray-500">
                        Responsible for guiding guests, sharing knowledge about local culture, 
                        and ensuring a memorable experience.
                      </p>
                    )}
                    {user?.role === "driver" && (
                      <p className="text-sm text-gray-500">
                        Responsible for safe transportation, punctuality, and assisting 
                        with luggage and logistics.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Feedback Modal */}
      <Dialog open={isFeedbackModalOpen} onOpenChange={setIsFeedbackModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Share Your Feedback</DialogTitle>
            <DialogDescription>
              Help us improve by sharing your experience with this tour.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleFeedbackSubmit} className="space-y-4">
            <div>
              <Label htmlFor="category">Feedback Category</Label>
              <Select 
                value={feedbackData.category} 
                onValueChange={(value) => setFeedbackData({ ...feedbackData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overall">Overall Experience</SelectItem>
                  <SelectItem value="tour">Tour Quality</SelectItem>
                  <SelectItem value="guide">Guide Performance</SelectItem>
                  <SelectItem value="driver">Driver Service</SelectItem>
                  <SelectItem value="accommodation">Accommodation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="rating">Rating</Label>
              <Select 
                value={feedbackData.rating?.toString()} 
                onValueChange={(value) => setFeedbackData({ ...feedbackData, rating: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent</SelectItem>
                  <SelectItem value="4">⭐⭐⭐⭐ Good</SelectItem>
                  <SelectItem value="3">⭐⭐⭐ Average</SelectItem>
                  <SelectItem value="2">⭐⭐ Poor</SelectItem>
                  <SelectItem value="1">⭐ Very Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="comment">Comments (Optional)</Label>
              <Textarea
                id="comment"
                value={feedbackData.comment || ""}
                onChange={(e) => setFeedbackData({ ...feedbackData, comment: e.target.value })}
                placeholder="Share your thoughts and suggestions..."
                rows={4}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isPublic"
                checked={feedbackData.isPublic}
                onChange={(e) => setFeedbackData({ ...feedbackData, isPublic: e.target.checked })}
              />
              <Label htmlFor="isPublic" className="text-sm">
                Allow this feedback to be shown publicly (helps other travelers)
              </Label>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsFeedbackModalOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Submit Feedback
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}