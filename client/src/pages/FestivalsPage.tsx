import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, Heart, MapPin, Star, Ticket, Users } from "lucide-react";
import { useState } from "react";

interface Festival {
  id: number;
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  category: string;
  highlights: string[];
  isActive: boolean;
  ticketPrice: number | null;
  maxCapacity: number | null;
}

interface FestivalBooking {
  festivalId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  numberOfTickets: number;
  totalAmount: number;
  specialRequests?: string;
}

export default function FestivalsPage() {
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState<Partial<FestivalBooking>>({
    numberOfTickets: 1,
  });
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const { toast } = useToast();

  const { data: festivals = [], isLoading } = useQuery<Festival[]>({
    queryKey: ["/api/festivals"],
  });

  const filteredFestivals = festivals.filter(festival => 
    categoryFilter === "all" || festival.category === categoryFilter
  );

  const categories = [
    { value: "all", label: "All Festivals" },
    { value: "religious", label: "Religious" },
    { value: "cultural", label: "Cultural" },
    { value: "seasonal", label: "Seasonal" },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFestival || !bookingData.firstName || !bookingData.lastName || !bookingData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const totalAmount = selectedFestival.ticketPrice 
      ? selectedFestival.ticketPrice * (bookingData.numberOfTickets || 1)
      : 0;

    try {
      const response = await fetch("/api/festival-bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...bookingData,
          festivalId: selectedFestival.id,
          totalAmount,
        }),
      });

      if (response.ok) {
        toast({
          title: "Booking Successful!",
          description: "Your festival booking has been submitted. We'll contact you with confirmation details.",
        });
        setIsBookingModalOpen(false);
        setBookingData({ numberOfTickets: 1 });
        setSelectedFestival(null);
      } else {
        throw new Error("Booking failed");
      }
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  const openBookingModal = (festival: Festival) => {
    setSelectedFestival(festival);
    setIsBookingModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading festivals...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Festival Calendar 2025
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience Bhutan's vibrant cultural heritage through traditional festivals, 
            sacred ceremonies, and colorful celebrations throughout the year.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={categoryFilter === category.value ? "default" : "outline"}
              onClick={() => setCategoryFilter(category.value)}
              className="mb-2"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Festivals Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredFestivals.map((festival) => (
            <Card key={festival.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={festival.imageUrl}
                  alt={festival.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge 
                    variant={festival.category === 'religious' ? 'default' : 
                            festival.category === 'cultural' ? 'secondary' : 'outline'}
                  >
                    {festival.category}
                  </Badge>
                </div>
                {festival.ticketPrice && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                    <span className="text-sm font-semibold text-green-600">
                      ${festival.ticketPrice}
                    </span>
                  </div>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">{festival.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {festival.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {formatDate(festival.startDate)} - {formatDate(festival.endDate)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{calculateDuration(festival.startDate, festival.endDate)} days</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{festival.location}</span>
                  </div>
                  
                  {festival.maxCapacity && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>Max {festival.maxCapacity} attendees</span>
                    </div>
                  )}
                </div>

                {festival.highlights.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Highlights:</h4>
                    <div className="flex flex-wrap gap-1">
                      {festival.highlights.slice(0, 3).map((highlight, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                      {festival.highlights.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{festival.highlights.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedFestival(festival)}
                    className="flex-1"
                  >
                    <Heart className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => openBookingModal(festival)}
                    className="flex-1"
                  >
                    <Ticket className="w-4 h-4 mr-1" />
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFestivals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No festivals found for the selected category.</p>
          </div>
        )}
      </div>

      {/* Festival Details Modal */}
      <Dialog open={!!selectedFestival && !isBookingModalOpen} onOpenChange={() => setSelectedFestival(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedFestival && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedFestival.name}</DialogTitle>
                <DialogDescription>
                  {selectedFestival.location} • {formatDate(selectedFestival.startDate)} - {formatDate(selectedFestival.endDate)}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <img
                  src={selectedFestival.imageUrl}
                  alt={selectedFestival.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">About This Festival</h3>
                    <p className="text-gray-600 mb-4">{selectedFestival.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{selectedFestival.category}</Badge>
                        <span className="text-sm text-gray-500">
                          {calculateDuration(selectedFestival.startDate, selectedFestival.endDate)} days
                        </span>
                      </div>
                      
                      {selectedFestival.ticketPrice && (
                        <div className="flex items-center gap-2">
                          <Ticket className="w-4 h-4" />
                          <span className="font-semibold text-green-600">
                            ${selectedFestival.ticketPrice} per person
                          </span>
                        </div>
                      )}
                      
                      {selectedFestival.maxCapacity && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>Limited to {selectedFestival.maxCapacity} attendees</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Festival Highlights</h3>
                    <div className="space-y-2">
                      {selectedFestival.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    onClick={() => openBookingModal(selectedFestival)}
                    className="flex-1"
                  >
                    <Ticket className="w-4 h-4 mr-2" />
                    Book This Festival
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Booking Modal */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book Festival Tickets</DialogTitle>
            <DialogDescription>
              {selectedFestival?.name} • {selectedFestival && formatDate(selectedFestival.startDate)}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={bookingData.firstName || ""}
                  onChange={(e) => setBookingData({ ...bookingData, firstName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={bookingData.lastName || ""}
                  onChange={(e) => setBookingData({ ...bookingData, lastName: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={bookingData.email || ""}
                onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={bookingData.phone || ""}
                onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="numberOfTickets">Number of Tickets</Label>
              <Input
                id="numberOfTickets"
                type="number"
                min="1"
                max={selectedFestival?.maxCapacity || 10}
                value={bookingData.numberOfTickets || 1}
                onChange={(e) => setBookingData({ ...bookingData, numberOfTickets: parseInt(e.target.value) })}
                required
              />
            </div>
            
            {selectedFestival?.ticketPrice && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span>Total Amount:</span>
                  <span className="font-semibold text-green-600">
                    ${selectedFestival.ticketPrice * (bookingData.numberOfTickets || 1)}
                  </span>
                </div>
              </div>
            )}
            
            <div>
              <Label htmlFor="specialRequests">Special Requests</Label>
              <Textarea
                id="specialRequests"
                value={bookingData.specialRequests || ""}
                onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                placeholder="Any special requirements or requests..."
              />
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsBookingModalOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Book Festival
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}