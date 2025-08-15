import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RechartsTooltipProps
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Calendar,
  MapPin,
  Star,
  RefreshCw,
  Download,
  Filter,
  Eye
} from 'lucide-react';

interface BookingData {
  id: string;
  customerName: string;
  tourId: string;
  tourTitle: string;
  bookingDate: string;
  travelDate: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  amount: number;
  groupSize: number;
  customerLocation: string;
  paymentStatus: 'pending' | 'partial' | 'complete' | 'refunded';
}

interface AnalyticsData {
  totalBookings: number;
  totalRevenue: number;
  averageBookingValue: number;
  conversionRate: number;
  monthlyGrowth: number;
  revenueGrowth: number;
  topTours: Array<{
    id: string;
    title: string;
    bookings: number;
    revenue: number;
  }>;
  monthlyData: Array<{
    month: string;
    bookings: number;
    revenue: number;
    cancellations: number;
  }>;
  statusBreakdown: Array<{
    status: string;
    count: number;
    percentage: number;
  }>;
  customerLocations: Array<{
    country: string;
    bookings: number;
    revenue: number;
  }>;
  dailyBookings: Array<{
    date: string;
    bookings: number;
    revenue: number;
  }>;
}

interface RealtimeMetrics {
  activeUsers: number;
  todayBookings: number;
  todayRevenue: number;
  pendingPayments: number;
  avgResponseTime: string;
  lastUpdated: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const BookingAnalytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [realtimeMetrics, setRealtimeMetrics] = useState<RealtimeMetrics | null>(null);
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30d');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  useEffect(() => {
    fetchAnalyticsData();
    fetchRealtimeMetrics();

    if (autoRefresh) {
      const interval = setInterval(() => {
        fetchRealtimeMetrics();
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
    }
  }, [dateRange, autoRefresh]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API calls
      const mockAnalytics: AnalyticsData = {
        totalBookings: 1247,
        totalRevenue: 2850000,
        averageBookingValue: 2287,
        conversionRate: 12.5,
        monthlyGrowth: 8.2,
        revenueGrowth: 15.7,
        topTours: [
          { id: '1', title: 'Bhutan Cultural Heritage', bookings: 156, revenue: 390000 },
          { id: '2', title: 'Himalayan Trekking', bookings: 89, revenue: 311500 },
          { id: '3', title: 'Tiger\'s Nest Monastery', bookings: 134, revenue: 268000 },
          { id: '4', title: 'Photography Tour', bookings: 67, revenue: 201000 },
          { id: '5', title: 'Festival Experience', bookings: 45, revenue: 157500 }
        ],
        monthlyData: [
          { month: 'Jan', bookings: 95, revenue: 237500, cancellations: 8 },
          { month: 'Feb', bookings: 108, revenue: 270000, cancellations: 6 },
          { month: 'Mar', bookings: 142, revenue: 355000, cancellations: 12 },
          { month: 'Apr', bookings: 158, revenue: 395000, cancellations: 9 },
          { month: 'May', bookings: 167, revenue: 417500, cancellations: 11 },
          { month: 'Jun', bookings: 185, revenue: 462500, cancellations: 14 },
          { month: 'Jul', bookings: 201, revenue: 502500, cancellations: 16 },
          { month: 'Aug', bookings: 191, revenue: 477500, cancellations: 13 }
        ],
        statusBreakdown: [
          { status: 'confirmed', count: 687, percentage: 55.1 },
          { status: 'completed', count: 398, percentage: 31.9 },
          { status: 'pending', count: 112, percentage: 9.0 },
          { status: 'cancelled', count: 50, percentage: 4.0 }
        ],
        customerLocations: [
          { country: 'United States', bookings: 234, revenue: 585000 },
          { country: 'Germany', bookings: 156, revenue: 390000 },
          { country: 'United Kingdom', bookings: 134, revenue: 335000 },
          { country: 'Australia', bookings: 89, revenue: 222500 },
          { country: 'France', bookings: 78, revenue: 195000 },
          { country: 'Japan', bookings: 67, revenue: 167500 },
          { country: 'Canada', bookings: 56, revenue: 140000 },
          { country: 'Netherlands', bookings: 45, revenue: 112500 }
        ],
        dailyBookings: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          bookings: Math.floor(Math.random() * 15) + 5,
          revenue: Math.floor(Math.random() * 30000) + 10000
        }))
      };

      setAnalyticsData(mockAnalytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRealtimeMetrics = async () => {
    try {
      const mockMetrics: RealtimeMetrics = {
        activeUsers: Math.floor(Math.random() * 50) + 20,
        todayBookings: Math.floor(Math.random() * 10) + 5,
        todayRevenue: Math.floor(Math.random() * 25000) + 15000,
        pendingPayments: Math.floor(Math.random() * 5) + 2,
        avgResponseTime: `${(Math.random() * 2 + 1).toFixed(1)}s`,
        lastUpdated: new Date().toISOString()
      };

      setRealtimeMetrics(mockMetrics);
    } catch (error) {
      console.error('Error fetching realtime metrics:', error);
    }
  };

  const exportData = () => {
    // Export functionality
    const csvData = analyticsData?.monthlyData.map(item => 
      `${item.month},${item.bookings},${item.revenue},${item.cancellations}`
    ).join('\n');
    
    const blob = new Blob([`Month,Bookings,Revenue,Cancellations\n${csvData}`], 
      { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'booking-analytics.csv';
    a.click();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  if (loading || !analyticsData || !realtimeMetrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading analytics...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Booking Analytics</h2>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            variant={autoRefresh ? "default" : "outline"} 
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
            Auto Refresh
          </Button>
        </div>
      </div>

      {/* Real-time Metrics */}
      <Card className="border-green-200 bg-green-50/50">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2" />
            Live Metrics
            <span className="text-xs text-muted-foreground ml-2">
              Updated: {new Date(realtimeMetrics.lastUpdated).toLocaleTimeString()}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{realtimeMetrics.activeUsers}</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{realtimeMetrics.todayBookings}</div>
              <div className="text-sm text-muted-foreground">Today's Bookings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {formatCurrency(realtimeMetrics.todayRevenue)}
              </div>
              <div className="text-sm text-muted-foreground">Today's Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{realtimeMetrics.pendingPayments}</div>
              <div className="text-sm text-muted-foreground">Pending Payments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">{realtimeMetrics.avgResponseTime}</div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalBookings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              +{formatPercentage(analyticsData.monthlyGrowth)} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(analyticsData.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              +{formatPercentage(analyticsData.revenueGrowth)} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Booking Value</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(analyticsData.averageBookingValue)}</div>
            <p className="text-xs text-muted-foreground">Per booking average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercentage(analyticsData.conversionRate)}</div>
            <p className="text-xs text-muted-foreground">Visitors to bookings</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="tours">Top Tours</TabsTrigger>
          <TabsTrigger value="locations">Customer Locations</TabsTrigger>
          <TabsTrigger value="status">Booking Status</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analyticsData.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bookings & Cancellations</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="bookings" 
                      stroke="#00C49F" 
                      strokeWidth={2}
                      name="Bookings"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cancellations" 
                      stroke="#FF8042" 
                      strokeWidth={2}
                      name="Cancellations"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Daily Booking Activity (Last 30 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={analyticsData.dailyBookings}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => new Date(date).getDate().toString()}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    formatter={(value: number) => [value, 'Bookings']}
                  />
                  <Bar dataKey="bookings" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tours">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Tours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topTours.map((tour, index) => (
                  <div key={tour.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold">
                        #{index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold">{tour.title}</h4>
                        <p className="text-sm text-muted-foreground">{tour.bookings} bookings</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(tour.revenue)}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatCurrency(tour.revenue / tour.bookings)} avg
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations">
          <Card>
            <CardHeader>
              <CardTitle>Bookings by Customer Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.customerLocations.slice(0, 5)}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="bookings"
                      nameKey="country"
                    >
                      {analyticsData.customerLocations.slice(0, 5).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [value, 'Bookings']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>

                <div className="space-y-3">
                  {analyticsData.customerLocations.map((location, index) => (
                    <div key={location.country} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="font-medium">{location.country}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{location.bookings}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatCurrency(location.revenue)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Booking Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.statusBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="count"
                      nameKey="status"
                    >
                      {analyticsData.statusBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [value, 'Bookings']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.statusBreakdown.map((status, index) => (
                    <div key={status.status} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="capitalize font-medium">{status.status}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{status.count}</span>
                          <Badge variant="outline">{formatPercentage(status.percentage)}</Badge>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${status.percentage}%`,
                            backgroundColor: COLORS[index % COLORS.length]
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingAnalytics;
