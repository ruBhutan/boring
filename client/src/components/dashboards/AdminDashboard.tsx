import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useAuth } from '../AuthContext';
import TourManagement from './admin/TourManagement';
import TourOperatorManagement from './admin/TourOperatorManagement';
import TestimonialManagement from './admin/TestimonialManagement';
import BlogManagement from './admin/BlogManagement';
import FestivalManagement from './admin/FestivalManagement';
import HotelManagement from './admin/HotelManagement';
import GuideManagement from './admin/GuideManagement';
import ItineraryManagement from './admin/ItineraryManagement';
import BookingManagement from './admin/BookingManagement';
import UserAccountManagement from './admin/UserAccountManagement';
import DatabaseOperations from './admin/DatabaseOperations';
import { 
  Users, 
  MapPin, 
  Calendar, 
  Hotel, 
  MessageSquare, 
  FileText, 
  Settings,
  Database,
  BookOpen,
  Star,
  Route,
  TrendingUp,
  DollarSign,
  Activity,
  Bell,
  Search,
  Filter,
  Download,
  Plus,
  LogOut,
  User,
  Shield
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: "Total Tours",
      value: "24",
      change: "+12%",
      changeType: "positive",
      icon: MapPin,
      description: "Active tour packages"
    },
    {
      title: "Tour Operators",
      value: "10",
      change: "+2",
      changeType: "positive",
      icon: Users,
      description: "Registered operators"
    },
    {
      title: "Active Bookings",
      value: "156",
      change: "+23%",
      changeType: "positive",
      icon: BookOpen,
      description: "Pending & confirmed"
    },
    {
      title: "Guides & Drivers",
      value: "45",
      change: "+5",
      changeType: "positive",
      icon: Users,
      description: "Available staff"
    },
    {
      title: "Revenue (Monthly)",
      value: "$124,500",
      change: "+18%",
      changeType: "positive",
      icon: DollarSign,
      description: "This month's earnings"
    },
    {
      title: "Customer Satisfaction",
      value: "4.9/5",
      change: "+0.2",
      changeType: "positive",
      icon: Star,
      description: "Average rating"
    }
  ];

  const recentActivities = [
    { id: 1, action: "New tour booking", user: "John Doe", time: "2 minutes ago", type: "booking" },
    { id: 2, action: "Tour operator registered", user: "Bhutan Adventures", time: "15 minutes ago", type: "operator" },
    { id: 3, action: "New testimonial added", user: "Sarah Wilson", time: "1 hour ago", type: "testimonial" },
    { id: 4, action: "Guide assigned to tour", user: "Tenzin Dorji", time: "2 hours ago", type: "guide" },
    { id: 5, action: "Hotel booking confirmed", user: "Mike Johnson", time: "3 hours ago", type: "hotel" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Shield className="h-8 w-8 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Manage your tourism platform</p>
              </div>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                Administrator
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Welcome, {user?.firstName}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-emerald-600" />
                </div>
                <Button variant="outline" size="sm" onClick={logout} className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12 bg-white p-1 rounded-xl shadow-sm border border-gray-200">
            <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="tours" className="flex items-center gap-2 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Tours</span>
            </TabsTrigger>
            <TabsTrigger value="operators" className="flex items-center gap-2 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Operators</span>
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Guides</span>
            </TabsTrigger>
            <TabsTrigger value="itineraries" className="flex items-center gap-2 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700">
              <Route className="h-4 w-4" />
              <span className="hidden sm:inline">Itineraries</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="festivals" className="flex items-center gap-2 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Festivals</span>
            </TabsTrigger>
            <TabsTrigger value="hotels" className="flex items-center gap-2 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700">
              <Hotel className="h-4 w-4" />
              <span className="hidden sm:inline">Hotels</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700">
              <Star className="h-4 w-4" />
              <span className="hidden sm:inline">Reviews</span>
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Blog</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Database</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white border-gray-200 hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <stat.icon className="h-4 w-4 text-emerald-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className={`flex items-center text-sm ${
                        stat.changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        <TrendingUp className="h-4 w-4 mr-1" />
                        {stat.change}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Quick Actions and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quick Actions */}
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-emerald-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab('tours')}
                      className="h-20 flex flex-col items-center justify-center border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"
                    >
                      <Plus className="h-6 w-6 mb-2 text-emerald-600" />
                      <span className="text-sm font-medium">Add Tour</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab('bookings')}
                      className="h-20 flex flex-col items-center justify-center border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"
                    >
                      <BookOpen className="h-6 w-6 mb-2 text-emerald-600" />
                      <span className="text-sm font-medium">View Bookings</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab('guides')}
                      className="h-20 flex flex-col items-center justify-center border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"
                    >
                      <Users className="h-6 w-6 mb-2 text-emerald-600" />
                      <span className="text-sm font-medium">Manage Staff</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab('database')}
                      className="h-20 flex flex-col items-center justify-center border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"
                    >
                      <Database className="h-6 w-6 mb-2 text-emerald-600" />
                      <span className="text-sm font-medium">Database Tools</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-emerald-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className={`h-2 w-2 rounded-full ${
                          activity.type === 'booking' ? 'bg-emerald-500' :
                          activity.type === 'operator' ? 'bg-blue-500' :
                          activity.type === 'testimonial' ? 'bg-amber-500' :
                          activity.type === 'guide' ? 'bg-purple-500' :
                          'bg-gray-500'
                        }`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.user}</p>
                        </div>
                        <span className="text-xs text-gray-400">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tours">
            <TourManagement />
          </TabsContent>

          <TabsContent value="operators">
            <TourOperatorManagement />
          </TabsContent>

          <TabsContent value="guides">
            <GuideManagement />
          </TabsContent>

          <TabsContent value="itineraries">
            <ItineraryManagement />
          </TabsContent>

          <TabsContent value="bookings">
            <BookingManagement />
          </TabsContent>

          <TabsContent value="festivals">
            <FestivalManagement />
          </TabsContent>

          <TabsContent value="hotels">
            <HotelManagement />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialManagement />
          </TabsContent>

          <TabsContent value="blog">
            <BlogManagement />
          </TabsContent>

          <TabsContent value="users">
            <UserAccountManagement />
          </TabsContent>

          <TabsContent value="database">
            <DatabaseOperations />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;