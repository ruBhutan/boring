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
  Route
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <Badge variant="secondary">Administrator</Badge>
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
          <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="tours" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Tours
            </TabsTrigger>
            <TabsTrigger value="operators" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Operators
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Guides
            </TabsTrigger>
            <TabsTrigger value="itineraries" className="flex items-center gap-2">
              <Route className="h-4 w-4" />
              Itineraries
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="festivals" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Festivals
            </TabsTrigger>
            <TabsTrigger value="hotels" className="flex items-center gap-2">
              <Hotel className="h-4 w-4" />
              Hotels
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Database
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Tours</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">Active tour packages</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tour Operators</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">10</div>
                  <p className="text-xs text-muted-foreground">Registered operators</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">Pending & confirmed</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Guides & Drivers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45</div>
                  <p className="text-xs text-muted-foreground">Available staff</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Admin Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Welcome to the admin dashboard. You can manage all aspects of the tourism platform from here.
                  Use the tabs above to navigate between different management sections.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" onClick={() => setActiveTab('tours')}>
                    Manage Tours
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab('bookings')}>
                    View Bookings
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab('guides')}>
                    Manage Staff
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab('database')}>
                    Database Tools
                  </Button>
                </div>
              </CardContent>
            </Card>
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