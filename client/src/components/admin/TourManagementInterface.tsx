import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import {
  CalendarIcon,
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  DollarSign,
  Users,
  Star,
  MapPin,
  Clock,
  Camera
} from 'lucide-react';

interface Tour {
  id: string;
  title: string;
  description: string;
  price: number;
  basePriceUSD: number;
  duration: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  category: string;
  status: 'active' | 'inactive' | 'draft';
  bookings: number;
  rating: number;
  images: string[];
  itinerary: string[];
  included: string[];
  excluded: string[];
  maxGroupSize: number;
  availableDates: string[];
  seasonalPricing: {
    peak: number;
    shoulder: number;
    low: number;
  };
  location: string;
  highlights: string[];
  requirements: string[];
  createdAt: string;
  updatedAt: string;
}

interface PricingRule {
  id: string;
  tourId: string;
  season: 'peak' | 'shoulder' | 'low';
  startDate: string;
  endDate: string;
  multiplier: number;
  isActive: boolean;
}

const TourManagementInterface: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [pricingRules, setPricingRules] = useState<PricingRule[]>([]);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Form state for tour creation/editing
  const [formData, setFormData] = useState<Partial<Tour>>({
    title: '',
    description: '',
    price: 0,
    basePriceUSD: 0,
    duration: 1,
    difficulty: 'Easy',
    category: '',
    status: 'draft',
    maxGroupSize: 10,
    location: '',
    highlights: [],
    requirements: [],
    included: [],
    excluded: [],
    itinerary: [],
    seasonalPricing: {
      peak: 1.3,
      shoulder: 1.0,
      low: 0.8
    }
  });

  useEffect(() => {
    fetchTours();
    fetchPricingRules();
  }, []);

  const fetchTours = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockTours: Tour[] = [
        {
          id: '1',
          title: 'Bhutan Cultural Heritage Tour',
          description: 'Explore the rich cultural heritage of Bhutan with visits to ancient monasteries and traditional villages.',
          price: 2500,
          basePriceUSD: 2500,
          duration: 7,
          difficulty: 'Easy',
          category: 'Cultural',
          status: 'active',
          bookings: 45,
          rating: 4.8,
          images: ['/tours/cultural-1.jpg', '/tours/cultural-2.jpg'],
          itinerary: [
            'Day 1: Arrival in Thimphu',
            'Day 2: Thimphu Sightseeing',
            'Day 3: Thimphu to Punakha',
            'Day 4: Punakha Exploration',
            'Day 5: Punakha to Paro',
            'Day 6: Paro Valley Tour',
            'Day 7: Departure'
          ],
          included: ['Accommodation', 'All meals', 'Transport', 'Guide'],
          excluded: ['International flights', 'Visa fees', 'Personal expenses'],
          maxGroupSize: 12,
          availableDates: ['2024-03-15', '2024-04-10', '2024-05-05'],
          seasonalPricing: {
            peak: 1.3,
            shoulder: 1.0,
            low: 0.8
          },
          location: 'Thimphu, Punakha, Paro',
          highlights: ['Tiger\'s Nest Monastery', 'Punakha Dzong', 'Traditional Markets'],
          requirements: ['Valid passport', 'Moderate fitness level'],
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-20T14:30:00Z'
        },
        {
          id: '2',
          title: 'Himalayan Trekking Adventure',
          description: 'Experience the majestic Himalayas with this challenging trekking adventure.',
          price: 3500,
          basePriceUSD: 3500,
          duration: 14,
          difficulty: 'Challenging',
          category: 'Adventure',
          status: 'active',
          bookings: 28,
          rating: 4.9,
          images: ['/tours/trek-1.jpg', '/tours/trek-2.jpg'],
          itinerary: [
            'Day 1-2: Preparation in Paro',
            'Day 3-5: Trek to Base Camp',
            'Day 6-10: High Altitude Trekking',
            'Day 11-13: Return Journey',
            'Day 14: Departure'
          ],
          included: ['Camping equipment', 'All meals', 'Permits', 'Guides'],
          excluded: ['International flights', 'Personal gear', 'Insurance'],
          maxGroupSize: 8,
          availableDates: ['2024-04-01', '2024-05-15', '2024-09-01'],
          seasonalPricing: {
            peak: 1.4,
            shoulder: 1.1,
            low: 0.9
          },
          location: 'Paro, Bhutan-Tibet Border',
          highlights: ['Mount Jomolhari', 'High altitude lakes', 'Yak herders'],
          requirements: ['Excellent fitness', 'Trekking experience', 'Medical clearance'],
          createdAt: '2024-01-10T08:00:00Z',
          updatedAt: '2024-01-25T16:45:00Z'
        }
      ];

      setTours(mockTours);
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPricingRules = async () => {
    try {
      // Mock pricing rules
      const mockRules: PricingRule[] = [
        {
          id: '1',
          tourId: '1',
          season: 'peak',
          startDate: '2024-03-01',
          endDate: '2024-05-31',
          multiplier: 1.3,
          isActive: true
        },
        {
          id: '2',
          tourId: '1',
          season: 'shoulder',
          startDate: '2024-06-01',
          endDate: '2024-08-31',
          multiplier: 1.0,
          isActive: true
        }
      ];
      setPricingRules(mockRules);
    } catch (error) {
      console.error('Error fetching pricing rules:', error);
    }
  };

  const handleCreateTour = () => {
    setEditMode(false);
    setFormData({
      title: '',
      description: '',
      price: 0,
      basePriceUSD: 0,
      duration: 1,
      difficulty: 'Easy',
      category: '',
      status: 'draft',
      maxGroupSize: 10,
      location: '',
      highlights: [],
      requirements: [],
      included: [],
      excluded: [],
      itinerary: [],
      seasonalPricing: {
        peak: 1.3,
        shoulder: 1.0,
        low: 0.8
      }
    });
    setIsDialogOpen(true);
  };

  const handleEditTour = (tour: Tour) => {
    setEditMode(true);
    setFormData(tour);
    setSelectedTour(tour);
    setIsDialogOpen(true);
  };

  const handleSaveTour = async () => {
    try {
      setLoading(true);
      if (editMode && selectedTour) {
        // Update tour
        const updatedTours = tours.map(tour =>
          tour.id === selectedTour.id
            ? { ...tour, ...formData, updatedAt: new Date().toISOString() }
            : tour
        );
        setTours(updatedTours);
      } else {
        // Create new tour
        const newTour: Tour = {
          ...formData,
          id: Date.now().toString(),
          bookings: 0,
          rating: 0,
          images: [],
          availableDates: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        } as Tour;
        setTours([...tours, newTour]);
      }
      setIsDialogOpen(false);
      setSelectedTour(null);
    } catch (error) {
      console.error('Error saving tour:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTour = async (tourId: string) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      try {
        setTours(tours.filter(tour => tour.id !== tourId));
      } catch (error) {
        console.error('Error deleting tour:', error);
      }
    }
  };

  const calculateDynamicPrice = (tour: Tour, season: 'peak' | 'shoulder' | 'low') => {
    return Math.round(tour.basePriceUSD * tour.seasonalPricing[season]);
  };

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || tour.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || tour.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ['Cultural', 'Adventure', 'Spiritual', 'Luxury', 'Photography', 'Festival'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tour Management</h2>
        <Button onClick={handleCreateTour}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Tour
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search Tours</Label>
              <Input
                id="search"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setFilterCategory('all');
                setFilterStatus('all');
              }}>
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tours List */}
      <div className="grid gap-4">
        {filteredTours.map((tour) => (
          <Card key={tour.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{tour.title}</h3>
                    <Badge variant={tour.status === 'active' ? 'default' : 
                                  tour.status === 'inactive' ? 'secondary' : 'outline'}>
                      {tour.status}
                    </Badge>
                    <Badge variant="outline">{tour.category}</Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{tour.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span>${tour.price}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span>{tour.duration} days</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span>{tour.bookings} bookings</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{tour.rating}/5</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Dynamic Pricing:</span>
                    <Badge variant="outline">Peak: ${calculateDynamicPrice(tour, 'peak')}</Badge>
                    <Badge variant="outline">Shoulder: ${calculateDynamicPrice(tour, 'shoulder')}</Badge>
                    <Badge variant="outline">Low: ${calculateDynamicPrice(tour, 'low')}</Badge>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditTour(tour)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDeleteTour(tour.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create/Edit Tour Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editMode ? 'Edit Tour' : 'Create New Tour'}
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList>
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Tour Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter tour title"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="duration">Duration (days)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select value={formData.difficulty} onValueChange={(value: 'Easy' | 'Moderate' | 'Challenging') => setFormData({...formData, difficulty: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Moderate">Moderate</SelectItem>
                      <SelectItem value="Challenging">Challenging</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Enter tour description"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Tour locations"
                  />
                </div>
                <div>
                  <Label htmlFor="maxGroupSize">Max Group Size</Label>
                  <Input
                    id="maxGroupSize"
                    type="number"
                    value={formData.maxGroupSize}
                    onChange={(e) => setFormData({...formData, maxGroupSize: parseInt(e.target.value)})}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="basePriceUSD">Base Price (USD)</Label>
                  <Input
                    id="basePriceUSD"
                    type="number"
                    value={formData.basePriceUSD}
                    onChange={(e) => setFormData({...formData, basePriceUSD: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="currentPrice">Current Price (USD)</Label>
                  <Input
                    id="currentPrice"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Seasonal Pricing Multipliers</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="peakMultiplier">Peak Season</Label>
                    <Input
                      id="peakMultiplier"
                      type="number"
                      step="0.1"
                      value={formData.seasonalPricing?.peak}
                      onChange={(e) => setFormData({
                        ...formData,
                        seasonalPricing: {
                          ...formData.seasonalPricing!,
                          peak: parseFloat(e.target.value)
                        }
                      })}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      ${Math.round((formData.basePriceUSD || 0) * (formData.seasonalPricing?.peak || 1))}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="shoulderMultiplier">Shoulder Season</Label>
                    <Input
                      id="shoulderMultiplier"
                      type="number"
                      step="0.1"
                      value={formData.seasonalPricing?.shoulder}
                      onChange={(e) => setFormData({
                        ...formData,
                        seasonalPricing: {
                          ...formData.seasonalPricing!,
                          shoulder: parseFloat(e.target.value)
                        }
                      })}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      ${Math.round((formData.basePriceUSD || 0) * (formData.seasonalPricing?.shoulder || 1))}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="lowMultiplier">Low Season</Label>
                    <Input
                      id="lowMultiplier"
                      type="number"
                      step="0.1"
                      value={formData.seasonalPricing?.low}
                      onChange={(e) => setFormData({
                        ...formData,
                        seasonalPricing: {
                          ...formData.seasonalPricing!,
                          low: parseFloat(e.target.value)
                        }
                      })}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      ${Math.round((formData.basePriceUSD || 0) * (formData.seasonalPricing?.low || 1))}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="highlights">Tour Highlights (one per line)</Label>
                  <Textarea
                    id="highlights"
                    value={formData.highlights?.join('\n') || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      highlights: e.target.value.split('\n').filter(h => h.trim())
                    })}
                    placeholder="Enter tour highlights, one per line"
                    rows={4}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="included">Included (one per line)</Label>
                    <Textarea
                      id="included"
                      value={formData.included?.join('\n') || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        included: e.target.value.split('\n').filter(i => i.trim())
                      })}
                      placeholder="What's included in the tour"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="excluded">Excluded (one per line)</Label>
                    <Textarea
                      id="excluded"
                      value={formData.excluded?.join('\n') || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        excluded: e.target.value.split('\n').filter(e => e.trim())
                      })}
                      placeholder="What's not included"
                      rows={4}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="requirements">Requirements (one per line)</Label>
                  <Textarea
                    id="requirements"
                    value={formData.requirements?.join('\n') || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      requirements: e.target.value.split('\n').filter(r => r.trim())
                    })}
                    placeholder="Tour requirements and prerequisites"
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="itinerary" className="space-y-4">
              <div>
                <Label htmlFor="itinerary">Daily Itinerary (one day per line)</Label>
                <Textarea
                  id="itinerary"
                  value={formData.itinerary?.join('\n') || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    itinerary: e.target.value.split('\n').filter(day => day.trim())
                  })}
                  placeholder="Day 1: Arrival and orientation&#10;Day 2: City tour&#10;Day 3: Mountain excursion"
                  rows={8}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTour} disabled={loading}>
              {loading ? 'Saving...' : (editMode ? 'Update Tour' : 'Create Tour')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TourManagementInterface;
