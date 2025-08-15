import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, Package, Calendar, Star, Settings, BarChart, FileText, Image } from 'lucide-react';

// Lazy load admin components for better performance
const TourManagementInterface = lazy(() => import('./TourManagementInterface'));
const BookingAnalytics = lazy(() => import('./BookingAnalytics'));
const CustomerManagementSystem = lazy(() => import('./CustomerManagementSystem'));
const ContentManagementSystem = lazy(() => import('./ContentManagementSystem'));

interface TourStats {
  totalBookings: number;
  totalRevenue: number;
  activeTours: number;
  newCustomers: number;
  monthlyData: Array<{
    month: string;
    bookings: number;
    revenue: number;
  }>;
}

interface Tour {
  id: string;
  title: string;
  price: number;
  duration: number;
  difficulty: string;
  status: 'active' | 'inactive';
  bookings: number;
  rating: number;
}

const EnhancedAdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<TourStats>({
    totalBookings: 0,
    totalRevenue: 0,
    activeTours: 0,
    newCustomers: 0,
    monthlyData: []
  });

  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard data
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Simulate API call
      const mockData: TourStats = {
        totalBookings: 1250,
        totalRevenue: 875000,
        activeTours: 45,
        newCustomers: 320,
        monthlyData: [
          { month: 'Jan', bookings: 85, revenue: 59500 },
          { month: 'Feb', bookings: 92, revenue: 64400 },
          { month: 'Mar', bookings: 110, revenue: 77000 },
          { month: 'Apr', bookings: 125, revenue: 87500 },
          { month: 'May', bookings: 140, revenue: 98000 },
          { month: 'Jun', bookings: 135, revenue: 94500 }
        ]
      };

      const mockTours: Tour[] = [
        { id: '1', title: 'Bhutan Cultural Tour', price: 2500, duration: 7, difficulty: 'Easy', status: 'active', bookings: 45, rating: 4.8 },
        { id: '2', title: 'Trekking Adventure', price: 3500, duration: 10, difficulty: 'Moderate', status: 'active', bookings: 32, rating: 4.9 },
        { id: '3', title: 'Luxury Bhutan Experience', price: 5000, duration: 5, difficulty: 'Easy', status: 'active', bookings: 28, rating: 4.7 }
      ];

      setStats(mockData);
      setTours(mockTours);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Enhanced Admin Dashboard</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tours</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeTours}</div>
              <p className="text-xs text-muted-foreground">+5 new this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.newCustomers}</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="bookings" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Comprehensive Admin Interface */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="tours" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Tours
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Customers
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground">Quick Actions</h3>
                    <p className="text-2xl font-bold">Add Tour</p>
                  </div>
                  <Package className="h-8 w-8 text-primary" />
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground">Quick Actions</h3>
                    <p className="text-2xl font-bold">View Analytics</p>
                  </div>
                  <BarChart className="h-8 w-8 text-primary" />
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground">Quick Actions</h3>
                    <p className="text-2xl font-bold">Manage Content</p>
                  </div>
                  <FileText className="h-8 w-8 text-primary" />
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground">Quick Actions</h3>
                    <p className="text-2xl font-bold">Settings</p>
                  </div>
                  <Settings className="h-8 w-8 text-primary" />
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">New booking for "Bhutan Cultural Tour"</p>
                      <p className="text-sm text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Tour "Photography Expedition" updated</p>
                      <p className="text-sm text-muted-foreground">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">New customer registered: John Smith</p>
                      <p className="text-sm text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Tours Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Tours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Tour Name</th>
                        <th className="text-left py-2">Price</th>
                        <th className="text-left py-2">Duration</th>
                        <th className="text-left py-2">Difficulty</th>
                        <th className="text-left py-2">Status</th>
                        <th className="text-left py-2">Bookings</th>
                        <th className="text-left py-2">Rating</th>
                        <th className="text-left py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tours.map((tour) => (
                        <tr key={tour.id} className="border-b">
                          <td className="py-2">{tour.title}</td>
                          <td className="py-2">${tour.price}</td>
                          <td className="py-2">{tour.duration} days</td>
                          <td className="py-2">
                            <Badge variant={tour.difficulty === 'Easy' ? 'default' : tour.difficulty === 'Moderate' ? 'secondary' : 'destructive'}>
                              {tour.difficulty}
                            </Badge>
                          </td>
                          <td className="py-2">
                            <Badge variant={tour.status === 'active' ? 'default' : 'secondary'}>
                              {tour.status}
                            </Badge>
                          </td>
                          <td className="py-2">{tour.bookings}</td>
                          <td className="py-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              {tour.rating}
                            </div>
                          </td>
                          <td className="py-2">
                            <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                            <Button variant="outline" size="sm">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tours">
            <Suspense fallback={
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2">Loading tour management...</span>
              </div>
            }>
              <TourManagementInterface />
            </Suspense>
          </TabsContent>

          <TabsContent value="analytics">
            <Suspense fallback={
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2">Loading analytics...</span>
              </div>
            }>
              <BookingAnalytics />
            </Suspense>
          </TabsContent>

          <TabsContent value="customers">
            <Suspense fallback={
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2">Loading customer management...</span>
              </div>
            }>
              <CustomerManagementSystem />
            </Suspense>
          </TabsContent>

          <TabsContent value="content">
            <Suspense fallback={
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2">Loading content management...</span>
              </div>
            }>
              <ContentManagementSystem />
            </Suspense>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Advanced system configuration and settings will be available here.</p>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">SEO Configuration</h4>
                      <p className="text-sm text-muted-foreground">Manage global SEO settings, meta tags, and schema markup.</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Performance Settings</h4>
                      <p className="text-sm text-muted-foreground">Configure caching, image optimization, and performance metrics.</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Email Templates</h4>
                      <p className="text-sm text-muted-foreground">Customize booking confirmations, newsletters, and notifications.</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Payment Integration</h4>
                      <p className="text-sm text-muted-foreground">Configure payment gateways and pricing rules.</p>
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

export default EnhancedAdminDashboard;
