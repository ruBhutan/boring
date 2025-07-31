import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useAuth } from '../AuthContext';
import { Calendar, MapPin, Users, FileText, User, Route } from 'lucide-react';

interface Itinerary {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  currentParticipants: number;
  status: string;
  tour: {
    name: string;
    category: string;
    duration: number;
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

interface GuideProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  registrationType: string;
  specializations: string[];
  status: string;
  createdAt: string;
}

const GuideDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [profile, setProfile] = useState<GuideProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGuideData();
  }, []);

  const fetchGuideData = async () => {
    try {
      // Mock data for guide - in real app, fetch based on user ID
      const mockProfile: GuideProfile = {
        id: 1,
        name: user?.firstName + ' ' + user?.lastName || 'Guide Name',
        email: user?.email || 'guide@bhutan.com',
        phone: '+975-17-123456',
        registrationType: 'guide',
        specializations: ['Cultural Tours', 'Adventure Tours', 'Photography Tours'],
        status: 'assigned',
        createdAt: '2023-01-15'
      };

      const mockItineraries: Itinerary[] = [
        {
          id: 1,
          name: 'Cultural Heritage Tour - March 2024',
          description: 'A comprehensive cultural tour covering major dzongs and monasteries',
          startDate: '2024-03-15',
          endDate: '2024-03-22',
          maxParticipants: 8,
          currentParticipants: 6,
          status: 'active',
          tour: {
            name: 'Bhutan Cultural Heritage',
            category: 'Cultural',
            duration: 8
          },
          days: [
            {
              id: 1,
              dayNumber: 1,
              title: 'Arrival in Paro',
              description: 'Airport pickup and transfer to hotel',
              activities: ['Airport pickup', 'Hotel check-in', 'Welcome dinner'],
              accommodation: 'Uma Paro Hotel',
              meals: ['Dinner'],
              transportation: 'Private vehicle',
              notes: 'Early check-in arranged'
            },
            {
              id: 2,
              dayNumber: 2,
              title: 'Paro Sightseeing',
              description: 'Visit Tiger\'s Nest Monastery and Paro Dzong',
              activities: ['Tiger\'s Nest hike', 'Paro Dzong visit', 'Local market'],
              accommodation: 'Uma Paro Hotel',
              meals: ['Breakfast', 'Lunch', 'Dinner'],
              transportation: 'Private vehicle + hiking',
              notes: 'Moderate hiking required'
            }
          ]
        },
        {
          id: 2,
          name: 'Adventure Trek - April 2024',
          description: 'Jomolhari base camp trekking expedition',
          startDate: '2024-04-10',
          endDate: '2024-04-20',
          maxParticipants: 6,
          currentParticipants: 4,
          status: 'active',
          tour: {
            name: 'Jomolhari Base Camp Trek',
            category: 'Adventure',
            duration: 11
          },
          days: []
        }
      ];

      setProfile(mockProfile);
      setItineraries(mockItineraries);
    } catch (error) {
      console.error('Error fetching guide data:', error);
    } finally {
      setIsLoading(false);
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
              <h1 className="text-2xl font-bold text-gray-900">Guide Dashboard</h1>
              <Badge variant="default">Licensed Guide</Badge>
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
            <TabsTrigger value="itineraries" className="flex items-center gap-2">
              <Route className="h-4 w-4" />
              My Itineraries
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="registration" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Registration
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Tours</CardTitle>
                  <Route className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{itineraries.filter(i => i.status === 'active').length}</div>
                  <p className="text-xs text-muted-foreground">Currently assigned</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {itineraries.reduce((sum, i) => sum + i.currentParticipants, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Across all tours</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Status</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <Badge className="bg-green-100 text-green-800">
                      {profile?.status === 'assigned' ? 'Assigned' : profile?.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Current status</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {itineraries.map((itinerary) => (
                    <div key={itinerary.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{itinerary.name}</h3>
                        <p className="text-sm text-gray-600">{itinerary.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(itinerary.startDate).toLocaleDateString()} - {new Date(itinerary.endDate).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {itinerary.currentParticipants}/{itinerary.maxParticipants}
                          </span>
                        </div>
                      </div>
                      <Badge variant={itinerary.status === 'active' ? 'default' : 'secondary'}>
                        {itinerary.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="itineraries" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Assigned Itineraries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {itineraries.map((itinerary) => (
                    <Card key={itinerary.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{itinerary.name}</CardTitle>
                            <p className="text-gray-600">{itinerary.description}</p>
                          </div>
                          <Badge variant={itinerary.status === 'active' ? 'default' : 'secondary'}>
                            {itinerary.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium">Duration</p>
                            <p className="text-sm text-gray-600">{itinerary.tour.duration} days</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Category</p>
                            <p className="text-sm text-gray-600">{itinerary.tour.category}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Participants</p>
                            <p className="text-sm text-gray-600">{itinerary.currentParticipants}/{itinerary.maxParticipants}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Dates</p>
                            <p className="text-sm text-gray-600">
                              {new Date(itinerary.startDate).toLocaleDateString()} - {new Date(itinerary.endDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {itinerary.days.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-3">Daily Itinerary</h4>
                            <div className="space-y-3">
                              {itinerary.days.map((day) => (
                                <div key={day.id} className="border-l-4 border-blue-200 pl-4">
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
                                  {day.notes && (
                                    <div className="mt-2">
                                      <p className="font-medium">Notes:</p>
                                      <p className="text-sm text-gray-600">{day.notes}</p>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Guide Profile</CardTitle>
              </CardHeader>
              <CardContent>
                {profile && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <p className="text-gray-900">{profile.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <p className="text-gray-900">{profile.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <p className="text-gray-900">{profile.phone}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Registration Type</label>
                        <Badge variant="default">{profile.registrationType}</Badge>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <Badge className="bg-green-100 text-green-800">{profile.status}</Badge>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Registered Since</label>
                        <p className="text-gray-900">{new Date(profile.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Specializations</label>
                      <div className="flex flex-wrap gap-2">
                        {profile.specializations.map((spec, index) => (
                          <Badge key={index} variant="secondary">{spec}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="registration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Registration Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-medium text-green-800">Registration Status: Approved</h3>
                    <p className="text-sm text-green-700 mt-1">
                      Your registration as a licensed guide has been approved. You are now eligible for tour assignments.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Registration Date</label>
                      <p className="text-gray-900">{profile && new Date(profile.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">License Status</label>
                      <Badge className="bg-green-100 text-green-800">Valid</Badge>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Submitted Documents</label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded">
                        <span className="text-sm">Guide License Certificate</span>
                        <Badge variant="default">Verified</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <span className="text-sm">Identity Document</span>
                        <Badge variant="default">Verified</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <span className="text-sm">Training Certificates</span>
                        <Badge variant="default">Verified</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Contact Information</label>
                    <p className="text-sm text-gray-600">
                      If you need to update your registration information or have questions about your status, 
                      please contact the tourism board at admin@bhutan.com or call +975-2-323456.
                    </p>
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

export default GuideDashboard;