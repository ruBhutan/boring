import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  Mail,
  Plus,
  Edit,
  Eye,
  Star,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TourManagerDashboardProps {
  user: any;
}

const TourManagerDashboard: React.FC<TourManagerDashboardProps> = ({ user }) => {
  const [stats, setStats] = useState({
    totalPackages: 0,
    activeBookings: 0,
    monthlyRevenue: 0,
    pendingItineraries: 0,
    averageRating: 0,
    totalTourists: 0
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [packagePerformance, setPackagePerformance] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [upcomingTours, setUpcomingTours] = useState([]);

  useEffect(() => {
    // Simulate API calls to fetch tour manager data
    setStats({
      totalPackages: 24,
      activeBookings: 167,
      monthlyRevenue: 85000,
      pendingItineraries: 12,
      averageRating: 4.7,
      totalTourists: 342
    });

    setRecentBookings([
      { id: 1, tourist: 'Alice Johnson', package: 'Cultural Heritage Tour', date: '2024-02-15', status: 'confirmed', amount: 2500 },
      { id: 2, tourist: 'Robert Smith', package: 'Tiger\'s Nest Trek', date: '2024-02-18', status: 'pending', amount: 1800 },
      { id: 3, tourist: 'Maria Garcia', package: 'Luxury Bhutan Experience', date: '2024-02-20', status: 'confirmed', amount: 4200 },
      { id: 4, tourist: 'David Chen', package: 'Photography Expedition', date: '2024-02-22', status: 'pending', amount: 3100 },
      { id: 5, tourist: 'Emma Wilson', package: 'Wellness Retreat', date: '2024-02-25', status: 'confirmed', amount: 2800 }
    ]);

    setPackagePerformance([
      { name: 'Cultural Heritage Tour', bookings: 45, revenue: 112500, rating: 4.8 },
      { name: 'Tiger\'s Nest Trek', bookings: 38, revenue: 68400, rating: 4.9 },
      { name: 'Luxury Bhutan Experience', bookings: 15, revenue: 63000, rating: 4.6 },
      { name: 'Photography Expedition', bookings: 22, revenue: 68200, rating: 4.7 },
      { name: 'Wellness Retreat', bookings: 28, revenue: 78400, rating: 4.8 }
    ]);

    setPendingTasks([
      { id: 1, type: 'itinerary', title: 'Review Cultural Tour itinerary', priority: 'high', dueDate: 'Today' },
      { id: 2, type: 'communication', title: 'Respond to custom tour inquiry', priority: 'medium', dueDate: 'Tomorrow' },
      { id: 3, type: 'pricing', title: 'Update seasonal pricing for wellness tours', priority: 'low', dueDate: 'This Week' },
      { id: 4, type: 'approval', title: 'Approve guide assignment for Tiger\'s Nest', priority: 'high', dueDate: 'Today' }
    ]);

    setUpcomingTours([
      { id: 1, package: 'Cultural Heritage Tour', guide: 'Tenzin Norbu', tourists: 8, date: '2024-02-16', status: 'ready' },
      { id: 2, package: 'Tiger\'s Nest Trek', guide: 'Karma Wangchuk', tourists: 6, date: '2024-02-18', status: 'confirmed' },
      { id: 3, package: 'Photography Expedition', guide: 'Pema Dorji', tourists: 4, date: '2024-02-20', status: 'ready' },
      { id: 4, package: 'Wellness Retreat', guide: 'Choden Lhamo', tourists: 10, date: '2024-02-22', status: 'pending' }
    ]);
  }, []);

  const getBookingStatusColor = (status: string) => {
    const colors = {
      'confirmed': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'cancelled': 'bg-red-100 text-red-800',
      'completed': 'bg-blue-100 text-blue-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTourStatusColor = (status: string) => {
    const colors = {
      'ready': 'bg-green-100 text-green-800',
      'confirmed': 'bg-blue-100 text-blue-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'high': 'bg-red-100 text-red-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'low': 'bg-green-100 text-green-800'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6 dashboard-tour-manager">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tour Manager Dashboard</h1>
          <p className="text-gray-600">Manage packages, bookings, and tourist experiences</p>
        </div>
        <div className="flex space-x-3">
          <Button className="btn-blue">
            <Plus className="w-4 h-4 mr-2" />
            Create Package
          </Button>
          <Button variant="outline" className="border-orange-600 text-orange-600">
            <Mail className="w-4 h-4 mr-2" />
            Send Updates
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <Card className="modern-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Packages</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPackages}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+2</span>
              <span className="text-gray-500 ml-2">this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="modern-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeBookings}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+18%</span>
              <span className="text-gray-500 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="modern-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${stats.monthlyRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+22%</span>
              <span className="text-gray-500 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="modern-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Itineraries</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingItineraries}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <AlertCircle className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-yellow-600 font-medium">Needs review</span>
            </div>
          </CardContent>
        </Card>

        <Card className="modern-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <Star className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Star className="w-4 h-4 text-amber-500 mr-1" />
              <span className="text-amber-600 font-medium">Excellent</span>
              <span className="text-gray-500 ml-2">rating</span>
            </div>
          </CardContent>
        </Card>

        <Card className="modern-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Tourists</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalTourists}</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+47</span>
              <span className="text-gray-500 ml-2">this month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card className="modern-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Recent Bookings
              </span>
              <Button variant="ghost" size="sm" className="text-blue-600">
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{booking.tourist}</h4>
                    <p className="text-sm text-gray-600">{booking.package}</p>
                    <p className="text-xs text-gray-500">{booking.date}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={getBookingStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                    <span className="text-sm font-semibold text-gray-900">${booking.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card className="modern-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-yellow-600" />
                Pending Tasks
              </span>
              <Button variant="ghost" size="sm" className="text-yellow-600">
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      {task.title}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{task.dueDate}</span>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Package Performance */}
      <Card className="modern-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
            Package Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {packagePerformance.map((pkg, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">{pkg.name}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bookings:</span>
                    <span className="font-medium">{pkg.bookings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Revenue:</span>
                    <span className="font-medium">${pkg.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{pkg.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Tours */}
      <Card className="modern-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-green-600" />
              Upcoming Tours
            </span>
            <Button variant="ghost" size="sm" className="text-green-600">
              View All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingTours.map((tour) => (
              <div key={tour.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{tour.package}</h4>
                  <p className="text-sm text-gray-600">Guide: {tour.guide}</p>
                  <p className="text-xs text-gray-500">{tour.date}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge className={getTourStatusColor(tour.status)}>
                    {tour.status}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{tour.tourists} tourists</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="modern-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="btn-blue h-20 flex-col space-y-2">
              <Plus className="w-6 h-6" />
              <span>Create Package</span>
            </Button>
            <Button className="btn-orange h-20 flex-col space-y-2">
              <Edit className="w-6 h-6" />
              <span>Update Pricing</span>
            </Button>
            <Button className="btn-blue-outline h-20 flex-col space-y-2">
              <Mail className="w-6 h-6" />
              <span>Send Updates</span>
            </Button>
            <Button className="btn-orange-outline h-20 flex-col space-y-2">
              <Calendar className="w-6 h-6" />
              <span>Manage Calendar</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TourManagerDashboard;
