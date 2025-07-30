import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Award,
  Building2,
  CheckCircle,
  Database,
  Edit,
  Eye,
  Globe,
  Mail,
  Phone,
  Plus,
  RefreshCw,
  Shield,
  Star,
  Trash2,
  UserCog,
  X
} from "lucide-react";
import { useState } from "react";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Tour {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  imageUrl: string;
  rating: string;
  reviewCount: number;
  highlights?: string[];
  tourOperatorId?: number;
}

interface TourOperator {
  id: number;
  name: string;
  website: string;
  description: string;
  bestFeature: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  logoUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  isActive: boolean;
  establishedYear?: number;
  certifications: string[];
  awards: string[];
  createdAt: string;
}

interface Guide {
  id: number;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  specialties: string[];
  experience: number;
  status: 'active' | 'inactive' | 'pending';
  licenseDocument?: string;
}

interface CustomTourRequest {
  id: number;
  name: string;
  email: string;
  duration: string;
  groupSize: number;
  interests: string[];
  budget: string;
  travelDate: string;
  specialRequests?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [adminPassword, setAdminPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [editingGuide, setEditingGuide] = useState<Guide | null>(null);
  const [editingOperator, setEditingOperator] = useState<TourOperator | null>(null);
  const [seedingStatus, setSeedingStatus] = useState<string>("");
  const queryClient = useQueryClient();

  const handleAdminLogin = () => {
    // Simple admin authentication - in production, use proper auth
    if (adminPassword === "bhutan2025admin") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid admin password");
    }
  };

  // Fetch data
  const { data: tours = [] } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
    enabled: isAuthenticated,
  });

  const { data: tourOperators = [] } = useQuery<TourOperator[]>({
    queryKey: ["/api/tour-operators"],
    enabled: isAuthenticated,
  });

  const { data: guides = [] } = useQuery<Guide[]>({
    queryKey: ["/api/guides"],
    enabled: isAuthenticated,
  });

  const { data: customRequests = [] } = useQuery<CustomTourRequest[]>({
    queryKey: ["/api/custom-tours"],
    enabled: isAuthenticated,
  });

  const { data: festivals = [] } = useQuery({
    queryKey: ["/api/festivals"],
    enabled: isAuthenticated,
  });

  const { data: hotels = [] } = useQuery({
    queryKey: ["/api/hotels"],
    enabled: isAuthenticated,
  });

  const { data: testimonials = [] } = useQuery({
    queryKey: ["/api/testimonials"],
    enabled: isAuthenticated,
  });

  const { data: blogPosts = [] } = useQuery({
    queryKey: ["/api/blog"],
    enabled: isAuthenticated,
  });

  // Seed database mutation
  const seedDatabaseMutation = useMutation({
    mutationFn: async () => {
      setSeedingStatus("Seeding database...");
      const response = await fetch("/api/seed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to seed database");
      }
      return response.json();
    },
    onSuccess: (data) => {
      setSeedingStatus(`✅ Database seeded successfully! Created ${data.tourOperators} operators, ${data.tours} tours, ${data.testimonials} testimonials, ${data.blogPosts} blog posts`);
      // Invalidate all queries to refresh data
      queryClient.invalidateQueries();
      setTimeout(() => setSeedingStatus(""), 5000);
    },
    onError: (error) => {
      setSeedingStatus(`❌ Error seeding database: ${error.message}`);
      setTimeout(() => setSeedingStatus(""), 5000);
    },
  });

  // Clear database mutation
  const clearDatabaseMutation = useMutation({
    mutationFn: async () => {
      setSeedingStatus("Clearing database...");
      const response = await fetch("/api/clear-database", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to clear database");
      }
      return response.json();
    },
    onSuccess: () => {
      setSeedingStatus("✅ Database cleared successfully!");
      queryClient.invalidateQueries();
      setTimeout(() => setSeedingStatus(""), 5000);
    },
    onError: (error) => {
      setSeedingStatus(`❌ Error clearing database: ${error.message}`);
      setTimeout(() => setSeedingStatus(""), 5000);
    },
  });

  // Mutations
  const updateTourMutation = useMutation({
    mutationFn: async (tour: Tour) => {
      const response = await fetch(`/api/tours/${tour.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tour),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tours"] });
      setEditingTour(null);
    },
  });

  const updateOperatorMutation = useMutation({
    mutationFn: async (operator: TourOperator) => {
      const response = await fetch(`/api/tour-operators/${operator.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(operator),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tour-operators"] });
      setEditingOperator(null);
    },
  });

  const updateGuideStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await fetch(`/api/guides/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/guides"] });
    },
  });

  const updateRequestStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await fetch(`/api/custom-tours/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/custom-tours"] });
    },
  });

  if (!isOpen) return null;

  if (!isAuthenticated) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Admin Login
            </DialogTitle>
            <DialogDescription>
              Enter the admin password to access the management panel.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="adminPassword">Admin Password</Label>
              <Input
                id="adminPassword"
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter admin password"
                onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleAdminLogin}>
                Login
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCog className="w-5 h-5 text-blue-600" />
            Admin Management Panel
          </DialogTitle>
          <DialogDescription>
            Manage tours, operators, guides, and database operations
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="database" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 text-xs">
            <TabsTrigger value="database">Database</TabsTrigger>
            <TabsTrigger value="operators">Operators</TabsTrigger>
            <TabsTrigger value="tours">Tours(package)</TabsTrigger>
            <TabsTrigger value="festivals">Festivals</TabsTrigger>
            <TabsTrigger value="hotels">Hotels</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="testimonials">Reviews</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
          </TabsList>

          <div className="max-h-[70vh] overflow-y-auto mt-4">
            {/* Database Management Tab */}
            <TabsContent value="database" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Database Operations</h3>
                <div className="flex gap-2">
                  <Badge variant="secondary">Tours(package): {tours.length}</Badge>
                  <Badge variant="secondary">Operators: {tourOperators.length}</Badge>
                  <Badge variant="secondary">Guides: {guides.length}</Badge>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-green-600" />
                      Seed Database
                    </CardTitle>
                    <CardDescription>
                      Populate the database with comprehensive tour data from 10 Bhutan tour operators
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">
                        This will add:
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1 ml-4">
                        <li>• 10 Tour Operators (Heavenly Bhutan, Druk Asia, etc.)</li>
                        <li>• 14+ Comprehensive Tour Packages</li>
                        <li>• 10+ Authentic Testimonials</li>
                        <li>• 5+ Informative Blog Posts</li>
                      </ul>
                      <Button 
                        onClick={() => seedDatabaseMutation.mutate()}
                        disabled={seedDatabaseMutation.isPending}
                        className="w-full"
                      >
                        {seedDatabaseMutation.isPending ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Seeding...
                          </>
                        ) : (
                          <>
                            <Database className="w-4 h-4 mr-2" />
                            Seed Database
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trash2 className="w-5 h-5 text-red-600" />
                      Clear Database
                    </CardTitle>
                    <CardDescription>
                      Remove all data from the database (use with caution)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">
                        This will remove all:
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1 ml-4">
                        <li>• Tour operators and their data</li>
                        <li>• Tour packages and details</li>
                        <li>• Testimonials and reviews</li>
                        <li>• Blog posts and content</li>
                      </ul>
                      <Button 
                        variant="destructive"
                        onClick={() => {
                          if (confirm("Are you sure you want to clear all database data? This action cannot be undone.")) {
                            clearDatabaseMutation.mutate();
                          }
                        }}
                        disabled={clearDatabaseMutation.isPending}
                        className="w-full"
                      >
                        {clearDatabaseMutation.isPending ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Clearing...
                          </>
                        ) : (
                          <>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Clear Database
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {seedingStatus && (
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <p className="text-sm font-medium text-blue-800">{seedingStatus}</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Tour Operators Tab */}
            <TabsContent value="operators" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Tour Operators</h3>
                <div className="flex gap-2">
                  <Badge variant="secondary">Total: {tourOperators.length}</Badge>
                  <Badge variant="outline">Active: {tourOperators.filter(op => op.isActive).length}</Badge>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Operator
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-4">
                {tourOperators.map((operator) => (
                  <Card key={operator.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Building2 className="w-4 h-4 text-blue-600" />
                            <h4 className="font-semibold">{operator.name}</h4>
                            <Badge variant={operator.isActive ? "default" : "secondary"}>
                              {operator.isActive ? "Active" : "Inactive"}
                            </Badge>
                            {operator.establishedYear && (
                              <span className="text-sm text-gray-500">Est. {operator.establishedYear}</span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{operator.description}</p>
                          <div className="space-y-2">
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1">
                                <Globe className="w-3 h-3" />
                                {operator.website}
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3" />
                                {operator.rating} ({operator.reviewCount} reviews)
                              </span>
                            </div>
                            {(operator.contactEmail || operator.contactPhone) && (
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                {operator.contactEmail && (
                                  <span className="flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                    {operator.contactEmail}
                                  </span>
                                )}
                                {operator.contactPhone && (
                                  <span className="flex items-center gap-1">
                                    <Phone className="w-3 h-3" />
                                    {operator.contactPhone}
                                  </span>
                                )}
                              </div>
                            )}
                            <div className="flex gap-1 flex-wrap">
                              {operator.specialties.map((specialty, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                            {operator.awards.length > 0 && (
                              <div className="flex gap-1 flex-wrap">
                                {operator.awards.map((award, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    <Award className="w-3 h-3 mr-1" />
                                    {award}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setEditingOperator(operator)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Tours Tab */}
            <TabsContent value="tours" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Tour Packages</h3>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Tour
                </Button>
              </div>
              
              <div className="grid gap-4">
                {(tours as Tour[]).map((tour: Tour) => (
                  <Card key={tour.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{tour.name}</h4>
                            <Badge>{tour.category}</Badge>
                            <span className="text-sm text-gray-500">{tour.duration}</span>
                            {tour.tourOperatorId && (
                              <Badge variant="outline" className="text-xs">
                                Operator ID: {tour.tourOperatorId}
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{tour.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              {tour.rating} ({tour.reviewCount} reviews)
                            </span>
                            <span className="font-semibold text-green-600">${tour.price}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setEditingTour(tour)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Guides Tab */}
            <TabsContent value="guides" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Registered Guides</h3>
                <div className="flex gap-2">
                  <Badge variant="secondary">Total: {guides.length}</Badge>
                  <Badge variant="outline">Pending: {(guides as Guide[]).filter((g: Guide) => g.status === 'pending').length}</Badge>
                </div>
              </div>

              <div className="grid gap-4">
                {(guides as Guide[]).map((guide: Guide) => (
                  <Card key={guide.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{guide.name}</h4>
                            <Badge 
                              variant={guide.status === 'active' ? 'default' : guide.status === 'pending' ? 'secondary' : 'destructive'}
                            >
                              {guide.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>Email: {guide.email}</p>
                            <p>Phone: {guide.phone}</p>
                            <p>License: {guide.licenseNumber}</p>
                            <p>Experience: {guide.experience} years</p>
                            <div className="flex gap-1 flex-wrap mt-2">
                              {guide.specialties?.map((specialization, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {specialization.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </Badge>
                              )) || []}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {guide.status === 'pending' && (
                            <>
                              <Button 
                                size="sm" 
                                onClick={() => updateGuideStatusMutation.mutate({ id: guide.id, status: 'active' })}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => updateGuideStatusMutation.mutate({ id: guide.id, status: 'rejected' })}
                              >
                                <X className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          <Button variant="outline" size="sm" onClick={() => setEditingGuide(guide)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Festivals Tab */}
            <TabsContent value="festivals" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Festival Management</h3>
                <div className="flex gap-2">
                  <Badge variant="secondary">Total: {festivals.length}</Badge>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Festival
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-4">
                {festivals.map((festival: any) => (
                  <Card key={festival.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{festival.name}</h4>
                            <Badge variant={festival.category === 'religious' ? 'default' : 'secondary'}>
                              {festival.category}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {new Date(festival.startDate).toLocaleDateString()} - {new Date(festival.endDate).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{festival.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>📍 {festival.location}</span>
                            {festival.ticketPrice && (
                              <span className="text-green-600 font-semibold">${festival.ticketPrice}</span>
                            )}
                            {festival.maxCapacity && (
                              <span>👥 Max {festival.maxCapacity}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Hotels Tab */}
            <TabsContent value="hotels" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Hotel Management</h3>
                <div className="flex gap-2">
                  <Badge variant="secondary">Total: {hotels.length}</Badge>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Hotel
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-4">
                {hotels.map((hotel: any) => (
                  <Card key={hotel.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{hotel.name}</h4>
                            <Badge variant="outline">{hotel.category}</Badge>
                            <div className="flex items-center">
                              {[...Array(hotel.starRating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{hotel.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>📍 {hotel.location}</span>
                            <span className="text-green-600 font-semibold">From ${hotel.pricePerNight}/night</span>
                            {hotel.contactPhone && <span>📞 {hotel.contactPhone}</span>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Testimonials Tab */}
            <TabsContent value="testimonials" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Testimonials & Reviews</h3>
                <div className="flex gap-2">
                  <Badge variant="secondary">Total: {testimonials.length}</Badge>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Review
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-4">
                {testimonials.map((testimonial: any) => (
                  <Card key={testimonial.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{testimonial.name}</h4>
                            <Badge variant="outline">{testimonial.country}</Badge>
                            <div className="flex items-center">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">"{testimonial.text}"</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>🎯 {testimonial.tripName}</span>
                            <span>⏱️ {testimonial.duration}</span>
                            <Badge variant={testimonial.isActive ? 'default' : 'secondary'}>
                              {testimonial.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Blog Tab */}
            <TabsContent value="blog" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Blog Management</h3>
                <div className="flex gap-2">
                  <Badge variant="secondary">Total: {blogPosts.length}</Badge>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Post
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-4">
                {blogPosts.map((post: any) => (
                  <Card key={post.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{post.title}</h4>
                            <Badge variant="outline">{post.category}</Badge>
                            <Badge variant={post.isPublished ? 'default' : 'secondary'}>
                              {post.isPublished ? 'Published' : 'Draft'}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{post.excerpt}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>✍️ {post.author}</span>
                            <span>📖 {post.readTime}</span>
                            <span>📅 {new Date(post.publishedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Custom Requests Tab */}
            <TabsContent value="requests" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Custom Tour Requests</h3>
                <div className="flex gap-2">
                  <Badge variant="secondary">Total: {customRequests.length}</Badge>
                  <Badge variant="outline">Pending: {(customRequests as CustomTourRequest[]).filter((r: CustomTourRequest) => r.status === 'pending').length}</Badge>
                </div>
              </div>

              <div className="grid gap-4">
                {(customRequests as CustomTourRequest[]).map((request: CustomTourRequest) => (
                  <Card key={request.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{request.name}</h4>
                            <Badge 
                              variant={request.status === 'approved' ? 'default' : request.status === 'pending' ? 'secondary' : 'destructive'}
                            >
                              {request.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>Email: {request.email}</p>
                            <p>Duration: {request.duration}</p>
                            <p>Group Size: {request.groupSize} people</p>
                            <p>Budget: {request.budget}</p>
                            <p>Travel Date: {request.travelDate}</p>
                            <div className="flex gap-1 flex-wrap mt-2">
                              {request.interests.map((interest, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {interest}
                                </Badge>
                              ))}
                            </div>
                            {request.specialRequests && (
                              <p className="mt-2 p-2 bg-gray-50 rounded text-sm">
                                <strong>Special Requests:</strong> {request.specialRequests}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {request.status === 'pending' && (
                            <>
                              <Button 
                                size="sm"
                                onClick={() => updateRequestStatusMutation.mutate({ id: request.id, status: 'approved' })}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => updateRequestStatusMutation.mutate({ id: request.id, status: 'rejected' })}
                              >
                                <X className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => {
            setIsAuthenticated(false);
            setAdminPassword("");
            onClose();
          }}>
            Logout
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}