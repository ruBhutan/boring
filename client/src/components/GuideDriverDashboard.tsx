import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useAuth } from './AuthContext';
import { 
  User, Calendar, MapPin, Star, Clock, Users, 
  Phone, Mail, Award, Mountain, Camera, CheckCircle,
  TrendingUp, Activity, Target, Sparkles, ArrowUp
} from 'lucide-react';

interface Assignment {
  id: string;
  tourTitle: string;
  clientName: string;
  startDate: string;
  endDate: string;
  groupSize: number;
  status: 'upcoming' | 'active' | 'completed';
  location: string;
  specialRequirements?: string;
}

interface Review {
  id: string;
  clientName: string;
  tourTitle: string;
  rating: number;
  comment: string;
  date: string;
}

interface GuideDriverProfile {
  id: string;
  name: string;
  role: 'guide' | 'driver';
  email: string;
  phone: string;
  experience: string;
  languages: string[];
  specialties: string[];
  rating: number;
  totalTours: number;
  profileImage?: string;
}

const GuideDriverDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with actual API calls
  const profile: GuideDriverProfile = {
    id: user?.id || '1',
    name: user?.name || 'Tenzin Norbu',
    role: user?.role as 'guide' | 'driver' || 'guide',
    email: user?.email || 'tenzin.norbu@bhutanmindbreak.com',
    phone: '+975-17-123456',
    experience: '8 years',
    languages: ['English', 'Dzongkha', 'Hindi', 'Nepali'],
    specialties: user?.role === 'guide' 
      ? ['Cultural Tours', 'Monastery Visits', 'Photography', 'Trekking']
      : ['Mountain Driving', '4WD Specialist', 'Airport Transfers', 'Long Distance'],
    rating: 4.8,
    totalTours: 156,
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'
  };

  const assignments: Assignment[] = [
    {
      id: '1',
      tourTitle: 'Cultural Heritage Tour',
      clientName: 'Smith Family',
      startDate: '2024-02-15',
      endDate: '2024-02-22',
      groupSize: 4,
      status: 'upcoming',
      location: 'Thimphu - Paro - Punakha',
      specialRequirements: 'Vegetarian meals, elderly client (70+)'
    },
    {
      id: '2',
      tourTitle: 'Tiger\'s Nest Trek',
      clientName: 'Adventure Group',
      startDate: '2024-02-10',
      endDate: '2024-02-12',
      groupSize: 8,
      status: 'completed',
      location: 'Paro Valley'
    },
    {
      id: '3',
      tourTitle: 'Photography Expedition',
      clientName: 'Johnson & Wilson',
      startDate: '2024-02-20',
      endDate: '2024-02-25',
      groupSize: 2,
      status: 'active',
      location: 'Various locations',
      specialRequirements: 'Early morning shoots, specialized equipment'
    }
  ];

  const reviews: Review[] = [
    {
      id: '1',
      clientName: 'Sarah Johnson',
      tourTitle: 'Cultural Heritage Tour',
      rating: 5,
      comment: 'Tenzin was an exceptional guide! His knowledge of Buddhist culture and local traditions made our trip unforgettable. Highly recommended!',
      date: '2024-01-28'
    },
    {
      id: '2',
      clientName: 'Mike Chen',
      tourTitle: 'Tiger\'s Nest Trek',
      rating: 5,
      comment: 'Amazing experience! Professional, knowledgeable, and very patient with our group. The trek was challenging but Tenzin made it enjoyable.',
      date: '2024-01-15'
    },
    {
      id: '3',
      clientName: 'Emma Wilson',
      tourTitle: 'Photography Tour',
      rating: 4,
      comment: 'Great guide with excellent local knowledge. Helped us capture beautiful shots of hidden gems in Bhutan.',
      date: '2024-01-10'
    }
  ];

  const getStatusColor = (status: Assignment['status']) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Modern Header with Profile */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-3xl p-8 mb-8 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/80 to-blue-600/80 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20 ring-4 ring-white/30">
                  <AvatarImage src={profile.profileImage} alt={profile.name} />
                  <AvatarFallback className="bg-white/20 text-white text-xl">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-4xl font-bold mb-2">Welcome back, {profile.name}!</h1>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-white/20 text-white border-white/30">
                      {profile.role === 'guide' ? '🎯 Tour Guide' : '🚗 Driver'}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-300 fill-current" />
                      <span className="font-medium">{profile.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">{profile.totalTours} tours</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white/80 text-sm">Performance Score</div>
                <div className="text-3xl font-bold">{Math.round(profile.rating * 20)}%</div>
                <Progress value={profile.rating * 20} className="w-32 mt-2" />
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="assignments" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Assignments
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Tours</p>
                      <p className="text-2xl font-bold text-gray-900">{profile.totalTours}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Star className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Average Rating</p>
                      <p className="text-2xl font-bold text-gray-900">{profile.rating}/5</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Experience</p>
                      <p className="text-2xl font-bold text-gray-900">{profile.experience}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-full">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Tours</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {assignments.filter(a => a.status === 'active').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Assignments */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Assignments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignments.slice(0, 3).map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-teal-100 rounded-full">
                          <MapPin className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{assignment.tourTitle}</h4>
                          <p className="text-sm text-gray-600">{assignment.clientName} • {assignment.groupSize} people</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {formatDate(assignment.startDate)} - {formatDate(assignment.endDate)}
                          </p>
                          <p className="text-xs text-gray-500">{assignment.location}</p>
                        </div>
                        <Badge className={getStatusColor(assignment.status)}>
                          {assignment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Assignments</CardTitle>
                <p className="text-sm text-gray-600">View all your tour assignments and itineraries</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <Card key={assignment.id} className="border-l-4 border-l-teal-500">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-lg font-semibold text-gray-900">{assignment.tourTitle}</h3>
                              <Badge className={getStatusColor(assignment.status)}>
                                {assignment.status}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-gray-500" />
                                <span>{assignment.clientName}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-gray-500" />
                                <span>{assignment.groupSize} people</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                <span>{formatDate(assignment.startDate)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-gray-500" />
                                <span>{assignment.location}</span>
                              </div>
                            </div>

                            {assignment.specialRequirements && (
                              <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                                <p className="text-sm text-yellow-800">
                                  <strong>Special Requirements:</strong> {assignment.specialRequirements}
                                </p>
                              </div>
                            )}
                          </div>
                          
                          <Button variant="outline" size="sm">
                            View Details
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
                <CardTitle>Client Reviews & Feedback</CardTitle>
                <p className="text-sm text-gray-600">See what clients are saying about your services</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-6 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.clientName}</h4>
                          <p className="text-sm text-gray-600">{review.tourTitle}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <p className="text-xs text-gray-500">{formatDate(review.date)}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 italic">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                      <img 
                        src={profile.profileImage} 
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{profile.name}</h3>
                      <p className="text-gray-600 capitalize">{profile.role}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <span>{profile.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <span>{profile.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <span>{profile.experience} of experience</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills & Specialties</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.languages.map((language) => (
                        <Badge key={language} variant="secondary">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.specialties.map((specialty) => (
                        <Badge key={specialty} className="bg-teal-100 text-teal-800">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Performance</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Average Rating</span>
                        <span className="font-medium">{profile.rating}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Tours Completed</span>
                        <span className="font-medium">{profile.totalTours}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GuideDriverDashboard;
