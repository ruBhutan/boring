import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  ChartBarIcon,
  UserGroupIcon,
  MapIcon,
  CreditCardIcon,
  ClockIcon,
  TruckIcon,
  CalendarIcon,
  StarIcon,
  BellIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'tour-manager' | 'guide' | 'driver' | 'tourist';
}

interface DashboardStats {
  totalUsers?: number;
  totalBookings?: number;
  totalRevenue?: number;
  activePackages?: number;
  pendingItineraries?: number;
  completedTours?: number;
  upcomingRoutes?: number;
  totalReviews?: number;
}

const DashboardOverview: React.FC = () => {
  const { user } = useOutletContext<{ user: User }>();
  const [stats, setStats] = useState<DashboardStats>({});
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetching dashboard stats based on role
    const mockStats: { [key: string]: DashboardStats } = {
      admin: {
        totalUsers: 1247,
        totalBookings: 856,
        totalRevenue: 125000,
        activePackages: 42
      },
      'tour-manager': {
        totalBookings: 234,
        pendingItineraries: 18,
        activePackages: 15,
        totalRevenue: 45000
      },
      guide: {
        completedTours: 89,
        upcomingRoutes: 12,
        totalReviews: 156,
        pendingItineraries: 3
      },
      driver: {
        completedTours: 145,
        upcomingRoutes: 8,
        totalReviews: 89,
        pendingItineraries: 2
      },
      tourist: {
        totalBookings: 5,
        completedTours: 3,
        upcomingRoutes: 2,
        totalReviews: 8
      }
    };

    setStats(mockStats[user.role] || {});

    // Mock recent activity
    const mockActivity: { [key: string]: any[] } = {
      admin: [
        { id: 1, type: 'user', message: 'New tour manager registered', time: '2 hours ago', status: 'info' },
        { id: 2, type: 'booking', message: '15 new bookings today', time: '4 hours ago', status: 'success' },
        { id: 3, type: 'system', message: 'Server maintenance completed', time: '1 day ago', status: 'success' }
      ],
      'tour-manager': [
        { id: 1, type: 'booking', message: 'New luxury tour booking', time: '1 hour ago', status: 'success' },
        { id: 2, type: 'itinerary', message: 'Tiger\'s Nest trek itinerary confirmed', time: '3 hours ago', status: 'info' },
        { id: 3, type: 'communication', message: 'Tourist inquiry about cultural tour', time: '5 hours ago', status: 'warning' }
      ],
      guide: [
        { id: 1, type: 'tour', message: 'Thimphu city tour completed', time: '2 hours ago', status: 'success' },
        { id: 2, type: 'assignment', message: 'New assignment: Cultural heritage tour', time: '1 day ago', status: 'info' },
        { id: 3, type: 'review', message: 'Received 5-star review from tourist', time: '2 days ago', status: 'success' }
      ],
      driver: [
        { id: 1, type: 'route', message: 'Paro to Thimphu route completed', time: '1 hour ago', status: 'success' },
        { id: 2, type: 'schedule', message: 'Tomorrow\'s schedule updated', time: '3 hours ago', status: 'info' },
        { id: 3, type: 'vehicle', message: 'Vehicle maintenance reminder', time: '1 day ago', status: 'warning' }
      ],
      tourist: [
        { id: 1, type: 'booking', message: 'Booking confirmation for Punakha tour', time: '1 day ago', status: 'success' },
        { id: 2, type: 'itinerary', message: 'Custom itinerary approved', time: '2 days ago', status: 'info' },
        { id: 3, type: 'payment', message: 'Payment processed successfully', time: '3 days ago', status: 'success' }
      ]
    };

    setRecentActivity(mockActivity[user.role] || []);
  }, [user.role]);

  const getWelcomeMessage = () => {
    const timeOfDay = new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening';
    const roleSpecificMessage = {
      admin: `Good ${timeOfDay}! Here's your system overview.`,
      'tour-manager': `Good ${timeOfDay}! Let's check today's tours and bookings.`,
      guide: `Good ${timeOfDay}! Ready for today's adventures?`,
      driver: `Good ${timeOfDay}! Your route schedule is ready.`,
      tourist: `Good ${timeOfDay}! Plan your next Bhutan adventure.`
    };
    return roleSpecificMessage[user.role];
  };

  const renderStatsCards = () => {
    const cardConfigs: { [key: string]: any[] } = {
      admin: [
        { title: 'Total Users', value: stats.totalUsers, icon: UserGroupIcon, color: 'text-blue-600', bgColor: 'bg-blue-100' },
        { title: 'Total Bookings', value: stats.totalBookings, icon: CreditCardIcon, color: 'text-green-600', bgColor: 'bg-green-100' },
        { title: 'Revenue', value: `$${stats.totalRevenue?.toLocaleString()}`, icon: ChartBarIcon, color: 'text-purple-600', bgColor: 'bg-purple-100' },
        { title: 'Active Packages', value: stats.activePackages, icon: MapIcon, color: 'text-orange-600', bgColor: 'bg-orange-100' }
      ],
      'tour-manager': [
        { title: 'Total Bookings', value: stats.totalBookings, icon: CreditCardIcon, color: 'text-blue-600', bgColor: 'bg-blue-100' },
        { title: 'Pending Itineraries', value: stats.pendingItineraries, icon: ClockIcon, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
        { title: 'Active Packages', value: stats.activePackages, icon: MapIcon, color: 'text-green-600', bgColor: 'bg-green-100' },
        { title: 'Revenue', value: `$${stats.totalRevenue?.toLocaleString()}`, icon: ChartBarIcon, color: 'text-purple-600', bgColor: 'bg-purple-100' }
      ],
      guide: [
        { title: 'Completed Tours', value: stats.completedTours, icon: MapIcon, color: 'text-green-600', bgColor: 'bg-green-100' },
        { title: 'Upcoming Tours', value: stats.upcomingRoutes, icon: CalendarIcon, color: 'text-blue-600', bgColor: 'bg-blue-100' },
        { title: 'Total Reviews', value: stats.totalReviews, icon: StarIcon, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
        { title: 'Pending Tasks', value: stats.pendingItineraries, icon: ClockIcon, color: 'text-orange-600', bgColor: 'bg-orange-100' }
      ],
      driver: [
        { title: 'Completed Trips', value: stats.completedTours, icon: TruckIcon, color: 'text-green-600', bgColor: 'bg-green-100' },
        { title: 'Upcoming Routes', value: stats.upcomingRoutes, icon: CalendarIcon, color: 'text-blue-600', bgColor: 'bg-blue-100' },
        { title: 'Customer Reviews', value: stats.totalReviews, icon: StarIcon, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
        { title: 'Scheduled Trips', value: stats.pendingItineraries, icon: ClockIcon, color: 'text-orange-600', bgColor: 'bg-orange-100' }
      ],
      tourist: [
        { title: 'My Bookings', value: stats.totalBookings, icon: CreditCardIcon, color: 'text-blue-600', bgColor: 'bg-blue-100' },
        { title: 'Completed Tours', value: stats.completedTours, icon: MapIcon, color: 'text-green-600', bgColor: 'bg-green-100' },
        { title: 'Upcoming Tours', value: stats.upcomingRoutes, icon: CalendarIcon, color: 'text-purple-600', bgColor: 'bg-purple-100' },
        { title: 'My Reviews', value: stats.totalReviews, icon: StarIcon, color: 'text-yellow-600', bgColor: 'bg-yellow-100' }
      ]
    };

    const cards = cardConfigs[user.role] || [];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <div key={index} className="modern-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value || 0}</p>
              </div>
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+12%</span>
              <span className="text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderQuickActions = () => {
    const actionConfigs: { [key: string]: any[] } = {
      admin: [
        { title: 'Manage Users', description: 'Add or edit user accounts', link: '/dashboard/users', color: 'btn-blue' },
        { title: 'View Analytics', description: 'Check system performance', link: '/dashboard/analytics', color: 'btn-orange' },
        { title: 'Site Settings', description: 'Configure system settings', link: '/dashboard/settings', color: 'btn-blue-outline' }
      ],
      'tour-manager': [
        { title: 'Create Package', description: 'Add new tour package', link: '/dashboard/packages', color: 'btn-blue' },
        { title: 'View Bookings', description: 'Manage current bookings', link: '/dashboard/bookings', color: 'btn-orange' },
        { title: 'Send Updates', description: 'Communicate with tourists', link: '/dashboard/communications', color: 'btn-blue-outline' }
      ],
      guide: [
        { title: 'Today\'s Tours', description: 'View scheduled tours', link: '/dashboard/my-itineraries', color: 'btn-blue' },
        { title: 'Tourist Info', description: 'Check tourist details', link: '/dashboard/tourists', color: 'btn-orange' },
        { title: 'Update Profile', description: 'Edit your information', link: '/dashboard/profile', color: 'btn-blue-outline' }
      ],
      driver: [
        { title: 'Today\'s Route', description: 'View scheduled routes', link: '/dashboard/schedule', color: 'btn-blue' },
        { title: 'Vehicle Status', description: 'Check vehicle details', link: '/dashboard/vehicle', color: 'btn-orange' },
        { title: 'Passenger Info', description: 'View passenger details', link: '/dashboard/passengers', color: 'btn-blue-outline' }
      ],
      tourist: [
        { title: 'Browse Tours', description: 'Explore tour packages', link: '/tours', color: 'btn-blue' },
        { title: 'Custom Package', description: 'Create custom itinerary', link: '/dashboard/custom-packages', color: 'btn-orange' },
        { title: 'My Bookings', description: 'Manage your bookings', link: '/dashboard/my-bookings', color: 'btn-blue-outline' }
      ]
    };

    const actions = actionConfigs[user.role] || [];

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {actions.map((action, index) => (
          <Link key={index} to={action.link} className="block">
            <div className="modern-card hover:shadow-xl transition-all duration-300 h-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{action.description}</p>
              <button className={`${action.color} w-full`}>
                Get Started
              </button>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="modern-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-600">{getWelcomeMessage()}</p>
          </div>
          <div className="hidden md:block">
            <div className={`w-16 h-16 rounded-lg role-card flex items-center justify-center`}>
              {user.role === 'admin' && <UserGroupIcon className="w-8 h-8 text-white" />}
              {user.role === 'tour-manager' && <MapIcon className="w-8 h-8 text-white" />}
              {user.role === 'guide' && <MapIcon className="w-8 h-8 text-white" />}
              {user.role === 'driver' && <TruckIcon className="w-8 h-8 text-white" />}
              {user.role === 'tourist' && <CalendarIcon className="w-8 h-8 text-white" />}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {renderStatsCards()}

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        {renderQuickActions()}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="modern-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <BellIcon className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events/Tasks */}
        <div className="modern-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {user.role === 'tourist' ? 'Upcoming Tours' : 'Today\'s Schedule'}
            </h3>
            <CalendarIcon className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ClockIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {user.role === 'tourist' ? 'Cultural Heritage Tour' : 
                     user.role === 'driver' ? 'Paro to Thimphu Route' :
                     'Morning Briefing'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item === 1 ? '9:00 AM - 5:00 PM' : 
                     item === 2 ? '2:00 PM - 4:00 PM' : '8:00 AM - 9:00 AM'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
