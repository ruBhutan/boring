import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import {
  Bed,
  Car,
  CheckCircle, Clock,
  Coffee,
  CreditCard,
  Globe,
  Home,
  Mail,
  MapPin,
  Phone,
  Heart,
  Star,
  Users,
  Utensils,
  Wifi
} from "lucide-react";
import { useState } from "react";

interface Hotel {
  id: number;
  name: string;
  description: string;
  location: string;
  address: string;
  imageUrl: string;
  images: string[];
  category: string;
  starRating: number;
  amenities: string[];
  features: string[];
  pricePerNight: number;
  isActive: boolean;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy?: string;
  rooms?: HotelRoom[];
}

interface HotelRoom {
  id: number;
  hotelId: number;
  roomType: string;
  roomName: string;
  description: string;
  imageUrl: string;
  images: string[];
  maxOccupancy: number;
  bedType: string;
  roomSize?: string;
  amenities: string[];
  pricePerNight: number;
  totalRooms: number;
  isActive: boolean;
}

interface HotelBooking {
  hotelId: number;
  roomId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfRooms: number;
  numberOfGuests: number;
  totalAmount: number;
  specialRequests?: string;
}

export default function HotelsPage() {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<HotelRoom | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState<Partial<HotelBooking>>({
    numberOfRooms: 1,
    numberOfGuests: 2,
  });
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const { toast } = useToast();

  const { data: hotels = [], isLoading } = useQuery<Hotel[]>({
    queryKey: ["/api/hotels"],
  });

  const { data: hotelRooms = [] } = useQuery<HotelRoom[]>({
    queryKey: [`/api/hotels/${selectedHotel?.id}/rooms`],
    enabled: !!selectedHotel?.id,
  });

  const filteredHotels = hotels.filter(hotel => 
    categoryFilter === "all" || hotel.category === categoryFilter
  );

  const categories = [
    { value: "all", label: "All Hotels" },
    { value: "luxury", label: "Luxury" },
    { value: "boutique", label: "Boutique" },
    { value: "heritage", label: "Heritage" },
    { value: "eco-lodge", label: "Eco-Lodge" },
  ];

  const amenityIcons: { [key: string]: any } = {
    "WiFi": Wifi,
    "Spa": Heart,
    "Restaurant": Utensils,
    "Parking": Car,
    "Coffee": Coffee,
    "Room Service": Home,
    "Fitness": Users,
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedHotel || !selectedRoom || !bookingData.firstName || !bookingData.lastName || 
        !bookingData.email || !bookingData.checkInDate || !bookingData.checkOutDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const nights = calculateNights(bookingData.checkInDate, bookingData.checkOutDate);
    const totalAmount = selectedRoom.pricePerNight * nights * (bookingData.numberOfRooms || 1);

    try {
      const response = await fetch("/api/hotel-bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...bookingData,
          hotelId: selectedHotel.id,
          roomId: selectedRoom.id,
          totalAmount,
        }),
      });

      if (response.ok) {
        toast({
          title: "Booking Successful!",
          description: "Your hotel booking has been submitted. We'll contact you with confirmation details.",
        });
        setIsBookingModalOpen(false);
        setBookingData({ numberOfRooms: 1, numberOfGuests: 2 });
        setSelectedHotel(null);
        setSelectedRoom(null);
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

  const openBookingModal = (hotel: Hotel, room: HotelRoom) => {
    setSelectedHotel(hotel);
    setSelectedRoom(room);
    setIsBookingModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading luxury accommodations...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Luxury Accommodations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience Bhutan's finest hotels and resorts, from traditional heritage properties 
            to modern luxury retreats, all offering exceptional comfort and authentic hospitality.
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

        {/* Hotels Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {filteredHotels.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img
                  src={hotel.imageUrl}
                  alt={hotel.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">
                    {hotel.category}
                  </Badge>
                  <div className="flex items-center bg-white/90 rounded-full px-2 py-1">
                    {[...Array(hotel.starRating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                  <span className="text-sm font-semibold text-green-600">
                    From ${hotel.pricePerNight}/night
                  </span>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-2xl">{hotel.name}</CardTitle>
                <CardDescription className="flex items-center gap-1 text-base">
                  <MapPin className="w-4 h-4" />
                  {hotel.location}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 line-clamp-3">{hotel.description}</p>
                
                {/* Amenities */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">Amenities:</h4>
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.slice(0, 6).map((amenity, index) => {
                      const IconComponent = amenityIcons[amenity] || CheckCircle;
                      return (
                        <div key={index} className="flex items-center gap-1 text-xs bg-gray-100 rounded-full px-2 py-1">
                          <IconComponent className="w-3 h-3" />
                          <span>{amenity}</span>
                        </div>
                      );
                    })}
                    {hotel.amenities.length > 6 && (
                      <Badge variant="outline" className="text-xs">
                        +{hotel.amenities.length - 6} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  {hotel.contactPhone && (
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      <span>{hotel.contactPhone}</span>
                    </div>
                  )}
                  {hotel.contactEmail && (
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      <span>{hotel.contactEmail}</span>
                    </div>
                  )}
                  {hotel.website && (
                    <div className="flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      <span>Website</span>
                    </div>
                  )}
                </div>

                {/* Check-in/out times */}
                <div className="flex gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Check-in: {hotel.checkInTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Check-out: {hotel.checkOutTime}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedHotel(hotel)}
                    className="flex-1"
                  >
                    View Details
                  </Button>
                  <Button
                    onClick={() => setSelectedHotel(hotel)}
                    className="flex-1"
                  >
                    <Bed className="w-4 h-4 mr-1" />
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No hotels found for the selected category.</p>
          </div>
        )}
      </div>

      {/* Hotel Details Modal */}
      <Dialog open={!!selectedHotel && !isBookingModalOpen} onOpenChange={() => setSelectedHotel(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          {selectedHotel && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl">{selectedHotel.name}</DialogTitle>
                <DialogDescription className="flex items-center gap-2 text-lg">
                  <MapPin className="w-4 h-4" />
                  {selectedHotel.address}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Hotel Images */}
                <div className="grid md:grid-cols-2 gap-4">
                  <img
                    src={selectedHotel.imageUrl}
                    alt={selectedHotel.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  {selectedHotel.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {selectedHotel.images.slice(0, 4).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${selectedHotel.name} ${index + 1}`}
                          className="w-full h-30 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2 text-xl">About This Hotel</h3>
                    <p className="text-gray-600 mb-4">{selectedHotel.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{selectedHotel.category}</Badge>
                        <div className="flex items-center">
                          {[...Array(selectedHotel.starRating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold">Features:</h4>
                        <div className="grid grid-cols-1 gap-1">
                          {selectedHotel.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2 text-xl">Amenities & Services</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedHotel.amenities.map((amenity, index) => {
                        const IconComponent = amenityIcons[amenity] || CheckCircle;
                        return (
                          <div key={index} className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4 text-blue-500" />
                            <span className="text-sm">{amenity}</span>
                          </div>
                        );
                      })}
                    </div>
                    
                    {selectedHotel.cancellationPolicy && (
                      <div className="mt-4">
                        <h4 className="font-semibold mb-1">Cancellation Policy:</h4>
                        <p className="text-sm text-gray-600">{selectedHotel.cancellationPolicy}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Available Rooms */}
                <div>
                  <h3 className="font-semibold mb-4 text-xl">Available Rooms</h3>
                  <div className="grid gap-4">
                    {hotelRooms.map((room) => (
                      <Card key={room.id} className="p-4">
                        <div className="flex gap-4">
                          <img
                            src={room.imageUrl}
                            alt={room.roomName}
                            className="w-32 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-semibold">{room.roomName}</h4>
                                <p className="text-sm text-gray-600">{room.description}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-semibold text-green-600">
                                  ${room.pricePerNight}/night
                                </div>
                                <div className="text-xs text-gray-500">
                                  {room.totalRooms} rooms available
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex gap-4 text-sm text-gray-500 mb-2">
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                Up to {room.maxOccupancy} guests
                              </span>
                              <span className="flex items-center gap-1">
                                <Bed className="w-3 h-3" />
                                {room.bedType} bed
                              </span>
                              {room.roomSize && (
                                <span className="flex items-center gap-1">
                                  <Home className="w-3 h-3" />
                                  {room.roomSize}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div className="flex flex-wrap gap-1">
                                {room.amenities.slice(0, 3).map((amenity, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {amenity}
                                  </Badge>
                                ))}
                                {room.amenities.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{room.amenities.length - 3}
                                  </Badge>
                                )}
                              </div>
                              <Button
                                size="sm"
                                onClick={() => openBookingModal(selectedHotel, room)}
                              >
                                Book This Room
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Booking Modal */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Book Your Stay</DialogTitle>
            <DialogDescription>
              {selectedHotel?.name} • {selectedRoom?.roomName}
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
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="checkInDate">Check-in Date *</Label>
                <Input
                  id="checkInDate"
                  type="date"
                  value={bookingData.checkInDate || ""}
                  onChange={(e) => setBookingData({ ...bookingData, checkInDate: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="checkOutDate">Check-out Date *</Label>
                <Input
                  id="checkOutDate"
                  type="date"
                  value={bookingData.checkOutDate || ""}
                  onChange={(e) => setBookingData({ ...bookingData, checkOutDate: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="numberOfRooms">Number of Rooms</Label>
                <Input
                  id="numberOfRooms"
                  type="number"
                  min="1"
                  max={selectedRoom?.totalRooms || 5}
                  value={bookingData.numberOfRooms || 1}
                  onChange={(e) => setBookingData({ ...bookingData, numberOfRooms: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="numberOfGuests">Number of Guests</Label>
                <Input
                  id="numberOfGuests"
                  type="number"
                  min="1"
                  max={(selectedRoom?.maxOccupancy || 2) * (bookingData.numberOfRooms || 1)}
                  value={bookingData.numberOfGuests || 2}
                  onChange={(e) => setBookingData({ ...bookingData, numberOfGuests: parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>
            
            {selectedRoom && bookingData.checkInDate && bookingData.checkOutDate && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Room rate per night:</span>
                    <span>${selectedRoom.pricePerNight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Number of nights:</span>
                    <span>{calculateNights(bookingData.checkInDate, bookingData.checkOutDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Number of rooms:</span>
                    <span>{bookingData.numberOfRooms || 1}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-green-600 border-t pt-1">
                    <span>Total Amount:</span>
                    <span>
                      ${selectedRoom.pricePerNight * 
                        calculateNights(bookingData.checkInDate, bookingData.checkOutDate) * 
                        (bookingData.numberOfRooms || 1)}
                    </span>
                  </div>
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
                <CreditCard className="w-4 h-4 mr-2" />
                Book Now
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}