import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, Users, Clock, Star, Plus, Edit, Plane, Hotel } from "lucide-react";
import { useState } from "react";

export default function TouristDashboard() {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [customTourModalOpen, setCustomTourModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  // Mock data - replace with real API calls
  const myBookings = [
    {
      id: 1,
      name: "Cultural Heritage Tour",
      type: "tour",
      startDate: "2024-03-15",
      endDate: "2024-03-22",
      status: "confirmed",
      guide: "Tenzin Norbu",
      driver: "Sonam Dorji",
      price: 2500
    },
    {
      id: 2,
      name: "Hotel Uma Paro",
      type: "hotel",
      checkIn: "2024-03-14",
      checkOut: "2024-03-16",
      status: "confirmed",
      price: 450
    }
  ];

  const myItineraries = [
    {
      id: 1,
      name: "Bhutan Discovery",
      startDate: "2024-01-10",
      endDate: "2024-01-17",
      status: "completed",
      guide: "Karma Wangchuk",
      driver: "Ugyen Tshering",
      rating: null
    }
  ];

  const myReviews = [
    {
      id: 1,
      type: "guide",
      name: "Tenzin Norbu",
      rating: 5,
      comment: "Excellent guide with deep knowledge of Bhutanese culture!",
      date: "2024-01-18"
    }
  ];

  function openReviewModal(booking: any) {
    setSelectedBooking(booking);
    setReviewModalOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-brand-primary">My Travel Dashboard</h1>
        <Badge className="bg-brand-accent text-brand-primary px-3 py-1">Tourist</Badge>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          className="btn-brand-primary h-16 flex items-center justify-center gap-2"
          onClick={() => setCustomTourModalOpen(true)}
        >
          <Plus className="w-5 h-5" />
          Request Custom Tour
        </Button>
        <Button className="btn-brand-secondary h-16 flex items-center justify-center gap-2">
          <Hotel className="w-5 h-5" />
          Book Hotel
        </Button>
        <Button className="btn-brand-outline h-16 flex items-center justify-center gap-2">
          <Plane className="w-5 h-5" />
          Book Flight
        </Button>
      </div>

      {/* My Bookings */}
      <section id="bookings">
        <Card className="brand-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-brand-primary">
              <Calendar className="w-5 h-5" />
              My Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {myBookings.length === 0 ? (
              <div className="text-center py-8 text-brand-text/70">
                No bookings yet. Start planning your Bhutan adventure!
              </div>
            ) : (
              <div className="space-y-4">
                {myBookings.map((booking) => (
                  <div key={booking.id} className="border border-brand-primary/20 rounded-lg p-4 hover:border-brand-primary transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-brand-text">{booking.name}</h3>
                          <Badge className="bg-brand-light text-brand-primary text-xs">
                            {booking.type}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-brand-text/70">
                          {booking.type === 'tour' ? (
                            <>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {booking.startDate} - {booking.endDate}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                Guide: {booking.guide}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                Driver: {booking.driver}
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {booking.checkIn} - {booking.checkOut}
                            </div>
                          )}
                          <div className="font-semibold text-brand-primary">
                            ${booking.price}
                          </div>
                        </div>
                      </div>
                      <Badge className={`${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" className="btn-brand-primary">View Details</Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        Modify
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* My Itineraries */}
      <section id="itineraries">
        <Card className="brand-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-brand-primary">
              <MapPin className="w-5 h-5" />
              My Itineraries
            </CardTitle>
          </CardHeader>
          <CardContent>
            {myItineraries.length === 0 ? (
              <div className="text-center py-8 text-brand-text/70">
                No itineraries yet.
              </div>
            ) : (
              <div className="space-y-4">
                {myItineraries.map((itinerary) => (
                  <div key={itinerary.id} className="border border-brand-primary/20 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-brand-text">{itinerary.name}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm text-brand-text/70">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {itinerary.startDate} - {itinerary.endDate}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            Guide: {itinerary.guide}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            Driver: {itinerary.driver}
                          </div>
                        </div>
                      </div>
                      <Badge className={`${
                        itinerary.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        itinerary.status === 'active' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {itinerary.status}
                      </Badge>
                    </div>
                    {itinerary.status === 'completed' && !itinerary.rating && (
                      <div className="mt-4 flex gap-2">
                        <Button 
                          size="sm" 
                          className="btn-brand-accent"
                          onClick={() => openReviewModal(itinerary)}
                        >
                          <Star className="w-4 h-4 mr-1" />
                          Leave Review
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* My Reviews */}
      <section id="reviews">
        <Card className="brand-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-brand-primary">
              <Star className="w-5 h-5" />
              My Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            {myReviews.length === 0 ? (
              <div className="text-center py-8 text-brand-text/70">
                No reviews yet. Complete a tour to leave reviews!
              </div>
            ) : (
              <div className="space-y-4">
                {myReviews.map((review) => (
                  <div key={review.id} className="border border-brand-primary/20 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-brand-text">{review.name}</h3>
                        <Badge className="bg-brand-light text-brand-primary text-xs mt-1">
                          {review.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'text-brand-accent fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-brand-text/80 mb-2">{review.comment}</p>
                    <div className="text-xs text-brand-text/60">Reviewed on {review.date}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Profile Section */}
      <section id="profile">
        <Card className="brand-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-brand-primary">
              <Users className="w-5 h-5" />
              My Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-brand-text mb-4">Personal Information</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Name:</strong> John Smith</div>
                  <div><strong>Email:</strong> john.smith@email.com</div>
                  <div><strong>Phone:</strong> +1 555 123 4567</div>
                  <div><strong>Country:</strong> United States</div>
                  <div><strong>Member Since:</strong> January 2024</div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-brand-text mb-4">Travel Preferences</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Interests:</strong> Culture, Adventure, Photography</div>
                  <div><strong>Dietary:</strong> Vegetarian</div>
                  <div><strong>Accommodation:</strong> Luxury Hotels</div>
                  <div><strong>Group Size:</strong> Small Groups (2-6 people)</div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button className="btn-brand-primary">Edit Profile</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Custom Tour Request Modal */}
      <Dialog open={customTourModalOpen} onOpenChange={setCustomTourModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Request Custom Tour</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Tour Name</Label>
              <Input placeholder="e.g., My Dream Bhutan Adventure" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>End Date</Label>
                <Input type="date" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Number of Travelers</Label>
                <Input type="number" min="1" max="20" defaultValue="2" />
              </div>
              <div>
                <Label>Budget Range (USD)</Label>
                <Input placeholder="e.g., $2000-3000" />
              </div>
            </div>
            <div>
              <Label>Interests & Preferences</Label>
              <Textarea placeholder="Tell us about your interests, preferred activities, accommodation type, dietary requirements, etc." />
            </div>
            <div>
              <Label>Special Requests</Label>
              <Textarea placeholder="Any special requests or requirements?" />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button className="btn-brand-primary">Submit Request</Button>
            <Button variant="outline" onClick={() => setCustomTourModalOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Modal */}
      <Dialog open={reviewModalOpen} onOpenChange={setReviewModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave a Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Rate your Guide</Label>
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 text-brand-accent cursor-pointer hover:fill-current" />
                ))}
              </div>
            </div>
            <div>
              <Label>Rate your Driver</Label>
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 text-brand-accent cursor-pointer hover:fill-current" />
                ))}
              </div>
            </div>
            <div>
              <Label>Overall Experience</Label>
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 text-brand-accent cursor-pointer hover:fill-current" />
                ))}
              </div>
            </div>
            <div>
              <Label>Comments</Label>
              <Textarea placeholder="Share your experience..." />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button className="btn-brand-primary">Submit Review</Button>
            <Button variant="outline" onClick={() => setReviewModalOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}