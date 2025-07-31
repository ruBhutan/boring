import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useAuth } from '../AuthContext';
import { Calendar, Car, Users, FileText, User, Route, MapPin } from 'lucide-react';

interface DriverItinerary {
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
  route: RouteInfo[];
}

interface RouteInfo {
  day: number;
  from: string;
  to: string;
  distance: string;
  estimatedTime: string;
  vehicleType: string;
  notes?: string;
}

interface DriverProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  registrationType: string;
  specializations: string[];
  status: string;
  createdAt: string;
  vehicleInfo: {
    type: string;
    model: string;
    capacity: number;
    licensePlate: string;
  };
}

const DriverDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [itineraries, setItineraries] = useState<DriverItinerary[]>([]);
  const [profile, setProfile] = useState<DriverProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDriverData();
  }, []);

  const fetchDriverData = async () => {
    try {
      // Mock data for driver - in real app, fetch based on user ID
      const mockProfile: DriverProfile = {
        id: 1,
        name: user?.firstName + ' ' + user?.lastName || 'Driver Name',
        email: user?.email || 'driver@bhutan.com',
        phone: '+975-17-654321',
        registrationType: 'driver',
        specializations: ['Mountain Driving', 'Long Distance', 'Tourist Transport'],
        status: 'assigned',
        createdAt: '2023-02-10',
        vehicleInfo: {
          type: 'SUV',
          model: 'Toyota Land Cruiser',
          capacity: 8,
          licensePlate: 'BP-1-A-1234'
        }
      };

      const mockItineraries: DriverItinerary[] = [
        {
          id: 1,
          name: 'Cultural Heritage Tour - March 2024',
          description: 'Transportation for cultural tour covering major dzongs and monasteries',
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
          route: [
            {
              day: 1,
              from: 'Paro Airport',
              to: 'Uma Paro Hotel',
              distance: '7 km',
              estimatedTime: '15 minutes',
              vehicleType: 'SUV',
              notes: 'Airport pickup - check flight arrival time'
            },
            {
              day: 2,
              from: 'Uma Paro Hotel',
              to: 'Tiger\'s Nest Monastery Parking',
              distance: '12 km',
              estimatedTime: '25 minutes',
              vehicleType: 'SUV',
              notes: 'Early morning departure at 8:00 AM'
            },
            {
              day: 3,
              from: 'Paro',
              to: 'Thimphu',
              distance: '65 km',
              estimatedTime: '1.5 hours',
              vehicleType: 'SUV',
              notes: 'Scenic route via Chuzom'
            }
          ]
        },
        {
          id: 2,
          name: 'Adventure Trek Support - April 2024',
          description: 'Transportation and logistics support for trekking expedition',
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
          route: [
            {
              day: 1,
              from: 'Thimphu',
              to: 'Paro',
              distance: '65 km',
              estimatedTime: '1.5 hours',
              vehicleType: 'SUV',
              notes: 'Pick up trekking group'
            },
            {
              day: 2,
              from: 'Paro',
              to: 'Shana Trailhead',
              distance: '25 km',
              estimatedTime: '45 minutes',
              vehicleType: '4WD',
              notes: 'Mountain road - 4WD required'
            }
          ]
        }
      ];

      setProfile(mockProfile);
      setItineraries(mockItineraries);
    } catch (error) {
      console.error('Error fetching driver data:', error);
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
              <h1 className="text-2xl font-bold text-gray-900">Driver Dashboard</h1>
              <Badge variant="default">Licensed Driver</Badge>
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
            <TabsTrigger value="routes" className="flex items-center gap-2">
              <Route className="h-4 w-4" />
              My Routes
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                  <CardTitle className="text-sm font-medium">Total Passengers</CardTitle>
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
                  <CardTitle className="text-sm font-medium">Vehicle</CardTitle>
                  <Car className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">{profile?.vehicleInfo.model}</div>
                  <p className="text-xs text-muted-foreground">{profile?.vehicleInfo.licensePlate}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Status</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">
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
                <CardTitle>Upcoming Assignments</CardTitle>
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
                            {itinerary.currentParticipants} passengers
                          </span>
                          <span className="flex items-center">
                            <Car className="h-4 w-4 mr-1" />
                            {profile?.vehicleInfo.type}
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

          <TabsContent value="routes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Assigned Routes</CardTitle>
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
                            <p className="text-sm font-medium">Passengers</p>
                            <p className="text-sm text-gray-600">{itinerary.currentParticipants}/{itinerary.maxParticipants}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Vehicle</p>
                            <p className="text-sm text-gray-600">{profile?.vehicleInfo.model}</p>
                          </div>
                        </div>

                        {itinerary.route.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-3">Route Details</h4>
                            <div className="space-y-3">
                              {itinerary.route.map((route, index) => (
                                <div key={index} className="border-l-4 border-blue-200 pl-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <h5 className="font-medium">Day {route.day}</h5>
                                    <Badge variant="outline">{route.vehicleType}</Badge>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <p className="font-medium flex items-center">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        Route:
                                      </p>
                                      <p className="text-gray-600">{route.from} → {route.to}</p>
                                    </div>
                                    <div>
                                      <p className="font-medium">Distance & Time:</p>
                                      <p className="text-gray-600">{route.distance} • {route.estimatedTime}</p>
                                    </div>
                                  </div>
                                  {route.notes && (
                                    <div className="mt-2">
                                      <p className="font-medium">Notes:</p>
                                      <p className="text-sm text-gray-600">{route.notes}</p>
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
                <CardTitle>Driver Profile</CardTitle>
              </CardHeader>
              <CardContent>
                {profile && (
                  <div className="space-y-6">
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

                    <div>
                      <h3 className="text-lg font-medium mb-3">Vehicle Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Vehicle Type</label>
                          <p className="text-gray-900">{profile.vehicleInfo.type}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Model</label>
                          <p className="text-gray-900">{profile.vehicleInfo.model}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Capacity</label>
                          <p className="text-gray-900">{profile.vehicleInfo.capacity} passengers</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">License Plate</label>
                          <p className="text-gray-900">{profile.vehicleInfo.licensePlate}</p>
                        </div>
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
                      Your registration as a licensed driver has been approved. You are now eligible for tour assignments.
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
                        <span className="text-sm">Driving License</span>
                        <Badge variant="default">Verified</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <span className="text-sm">Vehicle Registration</span>
                        <Badge variant="default">Verified</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <span className="text-sm">Insurance Certificate</span>
                        <Badge variant="default">Verified</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <span className="text-sm">Tourist Transport Permit</span>
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

export default DriverDashboard;