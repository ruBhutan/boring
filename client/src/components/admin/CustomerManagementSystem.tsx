import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, Search, Filter, Mail, Phone, MapPin, Calendar, 
  Star, Eye, Edit, Trash2, Plus, Download, MessageCircle,
  Clock, DollarSign, Package, TrendingUp, Send, Flag, UserPlus
} from 'lucide-react';

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  dateOfBirth?: string;
  nationality: string;
  preferredLanguage: string;
  profileImage?: string;
  customerType: 'individual' | 'family' | 'group' | 'corporate';
  status: 'active' | 'inactive' | 'vip' | 'blocked';
  totalBookings: number;
  totalSpent: number;
  averageRating: number;
  lifetimeValue: number;
  lastBookingDate: string;
  registrationDate: string;
  preferences: {
    tourTypes: string[];
    accommodationType: string;
    budget: string;
    travelStyle: string;
    groupSize: number;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
    email: string;
  };
  notes: string;
  tags: string[];
}

interface Booking {
  id: string;
  customerId: string;
  tourTitle: string;
  bookingDate: string;
  travelDate: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  amount: number;
  groupSize: number;
  paymentStatus: 'pending' | 'partial' | 'complete' | 'refunded';
}

interface Communication {
  id: string;
  customerId: string;
  type: 'email' | 'phone' | 'meeting' | 'note';
  direction: 'incoming' | 'outgoing';
  subject: string;
  content: string;
  date: string;
  staff: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'closed' | 'pending';
}

const CustomerManagementSystem: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [customerTypeFilter, setCustomerTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('lastBooking');

  // New communication form
  const [newCommunication, setNewCommunication] = useState({
    type: 'email' as Communication['type'],
    subject: '',
    content: '',
    priority: 'medium' as Communication['priority']
  });

  // Form state for customer creation/editing
  const [formData, setFormData] = useState<Partial<Customer>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    nationality: '',
    preferredLanguage: 'English',
    customerType: 'individual',
    status: 'active',
    preferences: {
      tourTypes: [],
      accommodationType: 'standard',
      budget: 'medium',
      travelStyle: 'balanced',
      groupSize: 2
    },
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
      email: ''
    },
    notes: '',
    tags: []
  });

  useEffect(() => {
    fetchCustomers();
    fetchBookings();
    fetchCommunications();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockCustomers: Customer[] = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Smith',
          email: 'john.smith@email.com',
          phone: '+1-555-0123',
          country: 'United States',
          city: 'New York',
          nationality: 'American',
          preferredLanguage: 'English',
          customerType: 'individual',
          status: 'vip',
          totalBookings: 5,
          totalSpent: 12500,
          averageRating: 4.8,
          lifetimeValue: 15000,
          lastBookingDate: '2024-01-15',
          registrationDate: '2023-06-10',
          preferences: {
            tourTypes: ['Cultural', 'Adventure'],
            accommodationType: 'luxury',
            budget: 'high',
            travelStyle: 'comfort',
            groupSize: 2
          },
          emergencyContact: {
            name: 'Jane Smith',
            relationship: 'Spouse',
            phone: '+1-555-0124',
            email: 'jane.smith@email.com'
          },
          notes: 'Regular customer, prefers premium tours. Has dietary restrictions.',
          tags: ['VIP', 'Repeat Customer', 'High Value']
        },
        {
          id: '2',
          firstName: 'Emma',
          lastName: 'Wilson',
          email: 'emma.wilson@email.com',
          phone: '+44-20-1234-5678',
          country: 'United Kingdom',
          city: 'London',
          nationality: 'British',
          preferredLanguage: 'English',
          customerType: 'family',
          status: 'active',
          totalBookings: 2,
          totalSpent: 6800,
          averageRating: 4.5,
          lifetimeValue: 8000,
          lastBookingDate: '2023-12-20',
          registrationDate: '2023-08-15',
          preferences: {
            tourTypes: ['Cultural', 'Photography'],
            accommodationType: 'standard',
            budget: 'medium',
            travelStyle: 'balanced',
            groupSize: 4
          },
          emergencyContact: {
            name: 'David Wilson',
            relationship: 'Husband',
            phone: '+44-20-1234-5679',
            email: 'david.wilson@email.com'
          },
          notes: 'Traveling with two children (ages 8 and 12). Needs family-friendly activities.',
          tags: ['Family', 'Photography Enthusiast']
        }
      ];

      setCustomers(mockCustomers);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const mockBookings: Booking[] = [
        {
          id: '1',
          customerId: '1',
          tourTitle: 'Bhutan Cultural Heritage Tour',
          bookingDate: '2024-01-10',
          travelDate: '2024-03-15',
          status: 'confirmed',
          amount: 2500,
          groupSize: 2,
          paymentStatus: 'complete'
        },
        {
          id: '2',
          customerId: '2',
          tourTitle: 'Photography Tour of Bhutan',
          bookingDate: '2023-12-15',
          travelDate: '2024-02-20',
          status: 'completed',
          amount: 3400,
          groupSize: 4,
          paymentStatus: 'complete'
        }
      ];

      setBookings(mockBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchCommunications = async () => {
    try {
      const mockCommunications: Communication[] = [
        {
          id: '1',
          customerId: '1',
          type: 'email',
          direction: 'outgoing',
          subject: 'Welcome to Bhutan Mind Break',
          content: 'Thank you for choosing us for your upcoming Bhutan tour...',
          date: '2024-01-10T14:30:00Z',
          staff: 'Sarah Johnson',
          priority: 'medium',
          status: 'closed'
        },
        {
          id: '2',
          customerId: '1',
          type: 'phone',
          direction: 'incoming',
          subject: 'Tour Customization Request',
          content: 'Customer called to discuss modifying the itinerary...',
          date: '2024-01-12T10:15:00Z',
          staff: 'Mike Chen',
          priority: 'high',
          status: 'closed'
        }
      ];

      setCommunications(mockCommunications);
    } catch (error) {
      console.error('Error fetching communications:', error);
    }
  };

  const handleCreateCustomer = () => {
    setEditMode(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      city: '',
      nationality: '',
      preferredLanguage: 'English',
      customerType: 'individual',
      status: 'active',
      preferences: {
        tourTypes: [],
        accommodationType: 'standard',
        budget: 'medium',
        travelStyle: 'balanced',
        groupSize: 2
      },
      emergencyContact: {
        name: '',
        relationship: '',
        phone: '',
        email: ''
      },
      notes: '',
      tags: []
    });
    setIsDialogOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditMode(true);
    setFormData(customer);
    setSelectedCustomer(customer);
    setIsDialogOpen(true);
  };

  const handleSaveCustomer = async () => {
    try {
      setLoading(true);
      if (editMode && selectedCustomer) {
        // Update customer
        const updatedCustomers = customers.map(customer =>
          customer.id === selectedCustomer.id
            ? { ...customer, ...formData }
            : customer
        );
        setCustomers(updatedCustomers);
      } else {
        // Create new customer
        const newCustomer: Customer = {
          ...formData,
          id: Date.now().toString(),
          totalBookings: 0,
          totalSpent: 0,
          averageRating: 0,
          lifetimeValue: 0,
          lastBookingDate: '',
          registrationDate: new Date().toISOString().split('T')[0]
        } as Customer;
        setCustomers([...customers, newCustomer]);
      }
      setIsDialogOpen(false);
      setSelectedCustomer(null);
    } catch (error) {
      console.error('Error saving customer:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendCommunication = async (customerId: string) => {
    if (!newCommunication.subject || !newCommunication.content) return;

    try {
      const communication: Communication = {
        id: Date.now().toString(),
        customerId,
        type: newCommunication.type,
        direction: 'outgoing',
        subject: newCommunication.subject,
        content: newCommunication.content,
        date: new Date().toISOString(),
        staff: 'Current User', // Replace with actual user
        priority: newCommunication.priority,
        status: 'closed'
      };

      setCommunications([...communications, communication]);
      setNewCommunication({
        type: 'email',
        subject: '',
        content: '',
        priority: 'medium'
      });
    } catch (error) {
      console.error('Error sending communication:', error);
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    const matchesType = customerTypeFilter === 'all' || customer.customerType === customerTypeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getCustomerBookings = (customerId: string) => {
    return bookings.filter(booking => booking.customerId === customerId);
  };

  const getCustomerCommunications = (customerId: string) => {
    return communications.filter(comm => comm.customerId === customerId);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status: Customer['status']) => {
    switch (status) {
      case 'vip': return 'bg-purple-100 text-purple-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customer Management</h2>
        <Button onClick={handleCreateCustomer}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Customer
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="search">Search Customers</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Name or email..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="type">Customer Type</Label>
              <Select value={customerTypeFilter} onValueChange={setCustomerTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="group">Group</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sortBy">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lastBooking">Last Booking</SelectItem>
                  <SelectItem value="totalSpent">Total Spent</SelectItem>
                  <SelectItem value="totalBookings">Total Bookings</SelectItem>
                  <SelectItem value="registrationDate">Registration Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer List */}
      <div className="grid gap-4">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4 flex-1">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={customer.profileImage} />
                    <AvatarFallback>
                      {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">
                        {customer.firstName} {customer.lastName}
                      </h3>
                      <Badge className={getStatusColor(customer.status)}>
                        {customer.status}
                      </Badge>
                      <Badge variant="outline">{customer.customerType}</Badge>
                      {customer.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        <span>{customer.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{customer.country}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Last booking: {customer.lastBookingDate || 'Never'}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span>{customer.totalBookings} bookings</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span>{formatCurrency(customer.totalSpent)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{customer.averageRating}/5</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-purple-600" />
                        <span>LTV: {formatCurrency(customer.lifetimeValue)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>
                          {customer.firstName} {customer.lastName} - Customer Details
                        </DialogTitle>
                      </DialogHeader>
                      
                      <Tabs defaultValue="profile" className="space-y-4">
                        <TabsList>
                          <TabsTrigger value="profile">Profile</TabsTrigger>
                          <TabsTrigger value="bookings">
                            Bookings ({getCustomerBookings(customer.id).length})
                          </TabsTrigger>
                          <TabsTrigger value="communications">
                            Communications ({getCustomerCommunications(customer.id).length})
                          </TabsTrigger>
                          <TabsTrigger value="preferences">Preferences</TabsTrigger>
                        </TabsList>

                        <TabsContent value="profile" className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">Personal Information</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-3">
                                <div>
                                  <Label className="text-sm text-muted-foreground">Full Name</Label>
                                  <p className="font-medium">{customer.firstName} {customer.lastName}</p>
                                </div>
                                <div>
                                  <Label className="text-sm text-muted-foreground">Email</Label>
                                  <p className="font-medium">{customer.email}</p>
                                </div>
                                <div>
                                  <Label className="text-sm text-muted-foreground">Phone</Label>
                                  <p className="font-medium">{customer.phone}</p>
                                </div>
                                <div>
                                  <Label className="text-sm text-muted-foreground">Location</Label>
                                  <p className="font-medium">{customer.city}, {customer.country}</p>
                                </div>
                                <div>
                                  <Label className="text-sm text-muted-foreground">Nationality</Label>
                                  <p className="font-medium">{customer.nationality}</p>
                                </div>
                                <div>
                                  <Label className="text-sm text-muted-foreground">Preferred Language</Label>
                                  <p className="font-medium">{customer.preferredLanguage}</p>
                                </div>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">Emergency Contact</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-3">
                                <div>
                                  <Label className="text-sm text-muted-foreground">Name</Label>
                                  <p className="font-medium">{customer.emergencyContact.name}</p>
                                </div>
                                <div>
                                  <Label className="text-sm text-muted-foreground">Relationship</Label>
                                  <p className="font-medium">{customer.emergencyContact.relationship}</p>
                                </div>
                                <div>
                                  <Label className="text-sm text-muted-foreground">Phone</Label>
                                  <p className="font-medium">{customer.emergencyContact.phone}</p>
                                </div>
                                <div>
                                  <Label className="text-sm text-muted-foreground">Email</Label>
                                  <p className="font-medium">{customer.emergencyContact.email}</p>
                                </div>
                              </CardContent>
                            </Card>
                          </div>

                          {customer.notes && (
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">Notes</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-muted-foreground">{customer.notes}</p>
                              </CardContent>
                            </Card>
                          )}
                        </TabsContent>

                        <TabsContent value="bookings">
                          <div className="space-y-4">
                            {getCustomerBookings(customer.id).map((booking) => (
                              <Card key={booking.id}>
                                <CardContent className="pt-4">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-semibold">{booking.tourTitle}</h4>
                                      <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-muted-foreground">
                                        <div>Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</div>
                                        <div>Travel Date: {new Date(booking.travelDate).toLocaleDateString()}</div>
                                        <div>Group Size: {booking.groupSize}</div>
                                        <div>Amount: {formatCurrency(booking.amount)}</div>
                                      </div>
                                    </div>
                                    <div className="flex gap-2">
                                      <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                                        {booking.status}
                                      </Badge>
                                      <Badge variant={booking.paymentStatus === 'complete' ? 'default' : 'secondary'}>
                                        {booking.paymentStatus}
                                      </Badge>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="communications">
                          <div className="space-y-4">
                            {/* Send new communication */}
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">Send New Communication</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Type</Label>
                                    <Select value={newCommunication.type} onValueChange={(value: Communication['type']) => 
                                      setNewCommunication({...newCommunication, type: value})
                                    }>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="email">Email</SelectItem>
                                        <SelectItem value="phone">Phone</SelectItem>
                                        <SelectItem value="meeting">Meeting</SelectItem>
                                        <SelectItem value="note">Note</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label>Priority</Label>
                                    <Select value={newCommunication.priority} onValueChange={(value: Communication['priority']) => 
                                      setNewCommunication({...newCommunication, priority: value})
                                    }>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div>
                                  <Label>Subject</Label>
                                  <Input
                                    value={newCommunication.subject}
                                    onChange={(e) => setNewCommunication({
                                      ...newCommunication, 
                                      subject: e.target.value
                                    })}
                                    placeholder="Communication subject"
                                  />
                                </div>
                                <div>
                                  <Label>Content</Label>
                                  <Textarea
                                    value={newCommunication.content}
                                    onChange={(e) => setNewCommunication({
                                      ...newCommunication, 
                                      content: e.target.value
                                    })}
                                    placeholder="Communication content"
                                    rows={4}
                                  />
                                </div>
                                <Button 
                                  onClick={() => handleSendCommunication(customer.id)}
                                  disabled={!newCommunication.subject || !newCommunication.content}
                                >
                                  <Send className="h-4 w-4 mr-2" />
                                  Send Communication
                                </Button>
                              </CardContent>
                            </Card>

                            <Separator />

                            {/* Communication history */}
                            <div className="space-y-3">
                              <h4 className="font-semibold">Communication History</h4>
                              {getCustomerCommunications(customer.id).map((comm) => (
                                <Card key={comm.id}>
                                  <CardContent className="pt-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <div className="flex items-center gap-2">
                                        <Badge variant="outline">{comm.type}</Badge>
                                        <Badge variant={comm.direction === 'incoming' ? 'default' : 'secondary'}>
                                          {comm.direction}
                                        </Badge>
                                        <Badge variant={comm.priority === 'high' ? 'destructive' : 'outline'}>
                                          {comm.priority}
                                        </Badge>
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        {new Date(comm.date).toLocaleString()}
                                      </div>
                                    </div>
                                    <h5 className="font-semibold mb-1">{comm.subject}</h5>
                                    <p className="text-sm text-muted-foreground mb-2">{comm.content}</p>
                                    <div className="text-xs text-muted-foreground">
                                      Staff: {comm.staff}
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="preferences">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">Travel Preferences</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-3">
                                <div>
                                  <Label className="text-sm text-muted-foreground">Preferred Tour Types</Label>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {customer.preferences.tourTypes.map(type => (
                                      <Badge key={type} variant="secondary">{type}</Badge>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-sm text-muted-foreground">Accommodation Type</Label>
                                  <p className="font-medium capitalize">{customer.preferences.accommodationType}</p>
                                </div>
                                <div>
                                  <Label className="text-sm text-muted-foreground">Budget Range</Label>
                                  <p className="font-medium capitalize">{customer.preferences.budget}</p>
                                </div>
                                <div>
                                  <Label className="text-sm text-muted-foreground">Travel Style</Label>
                                  <p className="font-medium capitalize">{customer.preferences.travelStyle}</p>
                                </div>
                                <div>
                                  <Label className="text-sm text-muted-foreground">Typical Group Size</Label>
                                  <p className="font-medium">{customer.preferences.groupSize} people</p>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="outline" size="sm" onClick={() => handleEditCustomer(customer)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create/Edit Customer Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editMode ? 'Edit Customer' : 'Add New Customer'}
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList>
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="contact">Contact & Emergency</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="notes">Notes & Tags</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    placeholder="First name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    placeholder="Last name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    placeholder="Country"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                    placeholder="Nationality"
                  />
                </div>
                <div>
                  <Label htmlFor="preferredLanguage">Preferred Language</Label>
                  <Select 
                    value={formData.preferredLanguage} 
                    onValueChange={(value) => setFormData({...formData, preferredLanguage: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="German">German</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="Japanese">Japanese</SelectItem>
                      <SelectItem value="Chinese">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="customerType">Customer Type</Label>
                  <Select 
                    value={formData.customerType} 
                    onValueChange={(value: Customer['customerType']) => setFormData({...formData, customerType: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="family">Family</SelectItem>
                      <SelectItem value="group">Group</SelectItem>
                      <SelectItem value="corporate">Corporate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value: Customer['status']) => setFormData({...formData, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="vip">VIP</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <h4 className="font-semibold">Emergency Contact Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergencyName">Contact Name</Label>
                  <Input
                    id="emergencyName"
                    value={formData.emergencyContact?.name}
                    onChange={(e) => setFormData({
                      ...formData, 
                      emergencyContact: {...formData.emergencyContact!, name: e.target.value}
                    })}
                    placeholder="Emergency contact name"
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyRelationship">Relationship</Label>
                  <Input
                    id="emergencyRelationship"
                    value={formData.emergencyContact?.relationship}
                    onChange={(e) => setFormData({
                      ...formData, 
                      emergencyContact: {...formData.emergencyContact!, relationship: e.target.value}
                    })}
                    placeholder="Relationship"
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyPhone">Phone</Label>
                  <Input
                    id="emergencyPhone"
                    value={formData.emergencyContact?.phone}
                    onChange={(e) => setFormData({
                      ...formData, 
                      emergencyContact: {...formData.emergencyContact!, phone: e.target.value}
                    })}
                    placeholder="Emergency contact phone"
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyEmail">Email</Label>
                  <Input
                    id="emergencyEmail"
                    type="email"
                    value={formData.emergencyContact?.email}
                    onChange={(e) => setFormData({
                      ...formData, 
                      emergencyContact: {...formData.emergencyContact!, email: e.target.value}
                    })}
                    placeholder="Emergency contact email"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="accommodationType">Accommodation Type</Label>
                  <Select 
                    value={formData.preferences?.accommodationType} 
                    onValueChange={(value) => setFormData({
                      ...formData, 
                      preferences: {...formData.preferences!, accommodationType: value}
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Budget</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="budget">Budget Range</Label>
                  <Select 
                    value={formData.preferences?.budget} 
                    onValueChange={(value) => setFormData({
                      ...formData, 
                      preferences: {...formData.preferences!, budget: value}
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low ($1000-$2000)</SelectItem>
                      <SelectItem value="medium">Medium ($2000-$4000)</SelectItem>
                      <SelectItem value="high">High ($4000+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="travelStyle">Travel Style</Label>
                  <Select 
                    value={formData.preferences?.travelStyle} 
                    onValueChange={(value) => setFormData({
                      ...formData, 
                      preferences: {...formData.preferences!, travelStyle: value}
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adventure">Adventure</SelectItem>
                      <SelectItem value="comfort">Comfort</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="groupSize">Typical Group Size</Label>
                  <Input
                    id="groupSize"
                    type="number"
                    value={formData.preferences?.groupSize}
                    onChange={(e) => setFormData({
                      ...formData, 
                      preferences: {...formData.preferences!, groupSize: parseInt(e.target.value)}
                    })}
                    min="1"
                    max="20"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Customer notes, special requirements, preferences..."
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags?.join(', ')}
                  onChange={(e) => setFormData({
                    ...formData, 
                    tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                  })}
                  placeholder="VIP, Repeat Customer, High Value, Family"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCustomer} disabled={loading}>
              {loading ? 'Saving...' : (editMode ? 'Update Customer' : 'Add Customer')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerManagementSystem;
