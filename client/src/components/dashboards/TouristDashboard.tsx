import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useAuth } from '../AuthContext';
import { Calendar, MapPin, Users, Star, User, BookOpen, MessageSquare } from 'lucide-react';

interface TouristBooking {
  id: number;
  tourName: string;
  tourCategory: string;
  startDate: string;
  endDate: string;
  duration: number;
  groupSize: number;
  totalAmount: number;
  status: string;
  guide?: {
    name: string;
    phone: string;
    email: string;
  };
  driver?: {
    name: string;
    phone: string;
    vehicle: string;
  };
  itinerary: {
    days: ItineraryDay[];
  };
}

interface ItineraryDay {
  dayNumber: number;
  title: string;
  description: string;
  activities: string[];
  accommodation?: string;
  meals: string[];
}

interface Review {
  id: number;
  tourName: string;
  rating: number;
  comment: string;
  category: string;
  createdAt: string;
}

const TouristDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState<TouristBooking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<TouristBooking | null>(null);
  const [reviewForm, setReviewForm] = useState({
    bookingId: 0,
    rating: 5,
    comment: '',
    category: 'overall'
  });

  useEffect(() => {
    fetchTouristData();
  }, []);

  const fetchTouristData = async () => {
    try {
      // Mock data for tourist - in real app, fetch based on user ID
      const mockBookings: TouristBooking[] = [
        {
          id: 1,
          tourName: 'Bhutan Cultural Heritage',
          tourCategory: 'Cultural',
          startDate: '2024-03-15',
          endDate: '2024-03-22',
          duration: 8,
          groupSize: 2,
          totalAmount: 6400,
          status: 'confirmed',
          guide: {
            name: 'Tenzin Norbu',
            phone: '+975-17-123456',
            email: 'tenzin@bhutan.com'
          },
          driver: {
            name: 'Karma Wangchuk',
            phone: '+975-17-654321',
            vehicle: 'Toyota Land Cruiser (BP-1-A-1234)'
          },
          itinerary: {
            days: [
              {
                dayNumber: 1,
                title: 'Arrival in Paro',
                description: 'Welcome to Bhutan! Airport pickup and transfer to hotel.',
                activities: ['Airport pickup', 'Hotel check-in', 'Welcome dinner', 'Orientation briefing'],
                accommodation: 'Uma Paro Hotel',
                meals: ['Dinner']
              },
              {
                dayNumber: 2,
                title: 'Paro Sightseeing',
                description: 'Explore Paro valley including the famous Tiger\'s Nest Monastery.',
                activities: ['Tiger\'s Nest Monastery hike', 'Paro Dzong visit', 'Traditional archery demonstration', 'Local market visit'],
                accommodation: 'Uma Paro Hotel',
                meals: ['Breakfast', 'Lunch', 'Dinner']
              },
              {
                dayNumber: 3,
                title: 'Paro to Thimphu',
                description: 'Journey to the capital city and explore its highlights.',
                activities: ['Drive to Thimphu', 'Memorial Chorten visit', 'Buddha Dordenma statue', 'Weekend market (if weekend)'],
                accommodation: 'Taj Tashi Thimphu',
                meals: ['Breakfast', 'Lunch', 'Dinner']
              }
            ]
          }
        },
        {
          id: 2,
          tourName: 'Himalayan Photography Workshop',
          tourCategory: 'Photography',
          startDate: '2024-05-10',
          endDate: '2024-05-16',
          duration: 7,
          groupSize: 1,
          totalAmount: 2200,
          status: 'pending',
          itinerary: {
            days: []
          }
        }
      ];

      const mockReviews: Review[] = [
        {
          id: 1,
          tourName: 'Bhutan Cultural Heritage',
          rating: 5,
          comment: 'Absolutely amazing experience! The guide was knowledgeable and the itinerary was perfect. Tiger\'s Nest was breathtaking!',
          category: 'overall',
          createdAt: '2024-01-15'
        }
      ];

      setBookings(mockBookings);
      setReviews(mockReviews);
    } catch (error) {
      console.error('Error fetching tourist data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // In real app, submit to API
      const newReview: Review = {
        id: reviews.length + 1,
        tourName: bookings.find(b => b.id === reviewForm.bookingId)?.tourName || '',
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        category: reviewForm.category,
        createdAt: new Date().toISOString()
      };

      setReviews([...reviews, newReview]);
      setReviewForm({
        bookingId: 0,
        rating: 5,
        comment: '',
        category: 'overall'
      });
      
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">My Travel Dashboard</h1>
              <Badge variant="default">Tourist</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.firstName}</span>
              <Button variant="outline" onClick={logout}>Logout</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              My Bookings
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{bookings.length}</div>
                  <p className="text-xs text-muted-foreground">All time</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Tours</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {bookings.filter(b => new Date(b.startDate) > new Date()).length}
                  </div>
                  <p className="text-xs text-muted-foreground">Confirmed & pending</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Countries Visited</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1</div>
                  <p className="text-xs text-muted-foreground">Bhutan</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Reviews Given</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{reviews.length}</div>
                  <p className="text-xs text-muted-foreground">Total reviews</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{booking.tourName}</h3>
                        <p className="text-sm text-gray-600">{booking.tourCategory} • {booking.duration} days</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(booking.startDate).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {booking.groupSize} {booking.groupSize === 1 ? 'person' : 'people'}
                          </span>
                          <span>${booking.totalAmount}</span>
                        </div>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Tour Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {bookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{booking.tourName}</CardTitle>
                            <p className="text-gray-600">{booking.tourCategory} Tour • {booking.duration} days</p>
                          </div>
                          {getStatusBadge(booking.status)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium">Start Date</p>
                            <p className="text-sm text-gray-600">{new Date(booking.startDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">End Date</p>
                            <p className="text-sm text-gray-600">{new Date(booking.endDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Group Size</p>
                            <p className="text-sm text-gray-600">{booking.groupSize} {booking.groupSize === 1 ? 'person' : 'people'}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Total Amount</p>
                            <p className="text-sm text-gray-600">${booking.totalAmount}</p>
                          </div>
                        </div>

                        {booking.guide && (
                          <div className="mb-4">
                            <h4 className="font-medium mb-2">Your Guide</h4>
                            <div className="bg-gray-50 p-3 rounded">
                              <p className="font-medium">{booking.guide.name}</p>
                              <p className="text-sm text-gray-600">{booking.guide.phone} • {booking.guide.email}</p>
                            </div>
                          </div>
                        )}

                        {booking.driver && (
                          <div className="mb-4">
                            <h4 className="font-medium mb-2">Your Driver</h4>
                            <div className="bg-gray-50 p-3 rounded">
                              <p className="font-medium">{booking.driver.name}</p>
                              <p className="text-sm text-gray-600">{booking.driver.phone} • {booking.driver.vehicle}</p>
                            </div>
                          </div>
                        )}

                        {booking.itinerary.days.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-3">Detailed Itinerary</h4>
                            <div className="space-y-3">
                              {booking.itinerary.days.map((day) => (
                                <div key={day.dayNumber} className="border-l-4 border-blue-200 pl-4">
                                  <h5 className="font-medium">Day {day.dayNumber}: {day.title}</h5>
                                  <p className="text-sm text-gray-600 mb-2">{day.description}</p>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <p className="font-medium">Activities:</p>
                                      <ul className="list-disc list-inside text-gray-600">
                                        {day.activities.map((activity, index) => (
                                          <li key={index}>{activity}</li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div>
                                      <p className="font-medium">Accommodation:</p>
                                      <p className="text-gray-600">{day.accommodation || 'N/A'}</p>
                                      <p className="font-medium mt-2">Meals:</p>
                                      <p className="text-gray-600">{day.meals.join(', ')}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex justify-end mt-4">
                          <Button
                            variant="outline"
                            onClick={() => setSelectedBooking(booking)}
                          >
                            View Full Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Write a Review</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Select Tour</label>
                      <Select 
                        value={reviewForm.bookingId.toString()} 
                        onValueChange={(value) => setReviewForm({...reviewForm, bookingId: parseInt(value)})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a completed tour" />
                        </SelectTrigger>
                        <SelectContent>
                          {bookings.filter(b => b.status === 'completed' || b.status === 'confirmed').map((booking) => (
                            <SelectItem key={booking.id} value={booking.id.toString()}>
                              {booking.tourName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Review Category</label>
                      <Select 
                        value={reviewForm.category} 
                        onValueChange={(value) => setReviewForm({...reviewForm, category: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="overall">Overall Experience</SelectItem>
                          <SelectItem value="guide">Guide Service</SelectItem>
                          <SelectItem value="driver">Driver Service</SelectItem>
                          <SelectItem value="accommodation">Accommodation</SelectItem>
                          <SelectItem value="tour">Tour Content</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Rating</label>
                    <Select 
                      value={reviewForm.rating.toString()} 
                      onValueChange={(value) => setReviewForm({...reviewForm, rating: parseInt(value)})}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 Stars - Excellent</SelectItem>
                        <SelectItem value="4">4 Stars - Very Good</SelectItem>
                        <SelectItem value="3">3 Stars - Good</SelectItem>
                        <SelectItem value="2">2 Stars - Fair</SelectItem>
                        <SelectItem value="1">1 Star - Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Your Review</label>
                    <Textarea
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                      placeholder="Share your experience with other travelers..."
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" disabled={!reviewForm.bookingId}>
                    Submit Review
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>My Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{review.tourName}</h3>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {review.category} • {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-gray-900">{review.comment}</p>
                    </div>
                  ))}
                  {reviews.length === 0 && (
                    <p className="text-gray-500 text-center py-8">
                      No reviews yet. Complete a tour to write your first review!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">First Name</label>
                      <p className="text-gray-900">{user?.firstName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Last Name</label>
                      <p className="text-gray-900">{user?.lastName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <p className="text-gray-900">{user?.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Account Type</label>
                      <Badge variant="default">Tourist</Badge>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium mb-4">Travel Statistics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{bookings.length}</div>
                        <div className="text-sm text-gray-600">Total Bookings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {bookings.reduce((sum, b) => sum + b.duration, 0)}
                        </div>
                        <div className="text-sm text-gray-600">Days Traveled</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{reviews.length}</div>
                        <div className="text-sm text-gray-600">Reviews Written</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : '0'}
                        </div>
                        <div className="text-sm text-gray-600">Avg Rating Given</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TouristDashboard;