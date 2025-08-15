import React, { useState, useEffect } from 'react';
import {
  Users,
  TrendingUp,
  DollarSign,
  MapPin,
  Calendar,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AdminDashboardProps {
  user: any;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    monthlyRevenue: 0,
    activeTours: 0,
    pendingApprovals: 0,
    systemAlerts: 0
  });

  const [recentUsers, setRecentUsers] = useState([]);
  const [systemAlerts, setSystemAlerts] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    // Simulate API calls to fetch admin data
    setStats({
      totalUsers: 1247,
      totalBookings: 856,
      monthlyRevenue: 125000,
      activeTours: 42,
      pendingApprovals: 7,
      systemAlerts: 3
    });

    setRecentUsers([
      { id: 1, name: 'Sarah Johnson', email: 'sarah@email.com', role: 'Tourist', joinDate: '2024-01-15', status: 'Active' },
      { id: 2, name: 'Mike Chen', email: 'mike@email.com', role: 'Guide', joinDate: '2024-01-14', status: 'Pending' },
      { id: 3, name: 'Emma Wilson', email: 'emma@email.com', role: 'Tourist', joinDate: '2024-01-13', status: 'Active' },
      { id: 4, name: 'David Brown', email: 'david@email.com', role: 'Driver', joinDate: '2024-01-12', status: 'Active' },
      { id: 5, name: 'Lisa Garcia', email: 'lisa@email.com', role: 'Tour Manager', joinDate: '2024-01-11', status: 'Active' }
    ]);

    setSystemAlerts([
      { id: 1, type: 'warning', message: 'Server load is above 80%', time: '10 min ago', severity: 'medium' },
      { id: 2, type: 'info', message: 'Database backup completed successfully', time: '2 hours ago', severity: 'low' },
      { id: 3, type: 'error', message: 'Payment gateway timeout detected', time: '3 hours ago', severity: 'high' }
    ]);

    setRevenueData([
      { month: 'Jan', revenue: 45000 },
      { month: 'Feb', revenue: 52000 },
      { month: 'Mar', revenue: 48000 },
      { month: 'Apr', revenue: 61000 },
      { month: 'May', revenue: 55000 },
      { month: 'Jun', revenue: 67000 }
    ]);
  }, []);

  const getRoleColor = (role: string) => {
    const colors = {
      'Admin': 'bg-red-100 text-red-800',
      'Tour Manager': 'bg-blue-100 text-blue-800',
      'Guide': 'bg-green-100 text-green-800',
      'Driver': 'bg-yellow-100 text-yellow-800',
      'Tourist': 'bg-purple-100 text-purple-800'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Inactive': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'info': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6 dashboard-admin">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Complete system oversight and management</p>
        </div>
        <div className="flex space-x-3">
          <Button className="btn-blue">
            <Settings className="w-4 h-4 mr-2" />
            System Settings
          </Button>
          <Button variant="outline" className="border-orange-600 text-orange-600">
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <Card className="modern-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+8.2%</span>
              <span className="text-gray-500 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="modern-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBookings.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+12.5%</span>
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
              <span className="text-green-600 font-medium">+15.3%</span>
              <span className="text-gray-500 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="modern-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Tours</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeTours}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+3</span>
              <span className="text-gray-500 ml-2">new this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="modern-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Approvals</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingApprovals}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <AlertTriangle className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-yellow-600 font-medium">Needs attention</span>
            </div>
          </CardContent>
        </Card>

        <Card className="modern-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">System Alerts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.systemAlerts}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Activity className="w-4 h-4 text-red-500 mr-1" />
              <span className="text-red-600 font-medium">Active monitoring</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card className="modern-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Recent User Registrations
              </span>
              <Button variant="ghost" size="sm" className="text-blue-600">
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{user.name}</h4>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex space-x-2">
                      <Badge className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">{user.joinDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card className="modern-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                System Alerts
              </span>
              <Button variant="ghost" size="sm" className="text-red-600">
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 mt-1">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {alert.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{alert.time}</span>
                      <Badge className={
                        alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                        alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }>
                        {alert.severity}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart Placeholder */}
      <Card className="modern-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-purple-600" />
            Revenue Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue Chart</h3>
              <p className="text-gray-600">Interactive revenue analytics would appear here</p>
              <p className="text-sm text-gray-500 mt-2">Monthly Growth: +15.3%</p>
            </div>
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
              <Users className="w-6 h-6" />
              <span>Manage Users</span>
            </Button>
            <Button className="btn-orange h-20 flex-col space-y-2">
              <Settings className="w-6 h-6" />
              <span>System Settings</span>
            </Button>
            <Button className="btn-blue-outline h-20 flex-col space-y-2">
              <BarChart3 className="w-6 h-6" />
              <span>Analytics</span>
            </Button>
            <Button className="btn-orange-outline h-20 flex-col space-y-2">
              <MapPin className="w-6 h-6" />
              <span>Tour Management</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
