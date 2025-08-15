import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EnhancedInteractiveForm from "@/components/EnhancedInteractiveForm";

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
  Wifi,
  X,
  User,
  MessageSquare
} from "lucide-react";
import { useState } from "react";
import { hotels as allHotels, Hotel, HotelRoom } from "@/data/hotels";

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
  const [isHotelBookingFormOpen, setIsHotelBookingFormOpen] = useState(false);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const hotels = allHotels;

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
    { value: "mid-range", label: "Mid-Range" },
    { value: "budget-friendly", label: "Budget" },
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


  const openBookingModal = (hotel: Hotel, room?: HotelRoom) => {
    setSelectedHotel(hotel);
    setSelectedRoom(room || null);
    setIsHotelBookingFormOpen(true);
    setIsViewingDetails(false);
  };

  const openHotelDetails = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsViewingDetails(true);
    setIsHotelBookingFormOpen(false);
  };


  return (
    <div className="min-h-screen bg-brand-light pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Home className="w-8 h-8 text-brand-primary" />
            <span className="text-sm font-semibold text-brand-primary uppercase tracking-wide">Luxury Accommodations</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold brand-heading mb-6">
            Exceptional Bhutanese Hospitality
          </h1>
          <p className="text-xl brand-body max-w-3xl mx-auto leading-relaxed">
            Discover Bhutan's most distinguished accommodations where traditional architecture meets world-class luxury. From heritage palaces converted into boutique hotels to eco-luxury lodges nestled in pristine valleys, each property offers an authentic gateway to Bhutanese culture while providing unparalleled comfort and service.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={categoryFilter === category.value ? "default" : "outline"}
              onClick={() => setCategoryFilter(category.value)}
              className={`mb-2 transition-all duration-200 ${
                categoryFilter === category.value 
                  ? 'brand-btn-primary' 
                  : 'brand-btn-outline hover:scale-105'
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Hotels Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {filteredHotels.map((hotel) => (
            <Card key={hotel.id} className="brand-card overflow-hidden">
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
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                  <span className="text-sm font-semibold text-brand-primary">
                    From ${hotel.pricePerNight}/night
                  </span>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-2xl brand-heading">{hotel.name}</CardTitle>
                <CardDescription className="flex items-center gap-1 text-base brand-body">
                  <MapPin className="w-4 h-4" />
                  {hotel.location}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="brand-body line-clamp-3">{hotel.description}</p>
                
                {/* Amenities */}
                <div>
                  <h4 className="font-semibold text-sm mb-2 brand-heading">Amenities:</h4>
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
                <div className="flex flex-wrap gap-4 text-sm brand-body">
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
                <div className="flex gap-4 text-sm brand-body">
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
                    onClick={() => openHotelDetails(hotel)}
                    className="flex-1 brand-btn-outline"
                  >
                    View Details
                  </Button>
                  <Button
                    onClick={() => openBookingModal(hotel)}
                    className="flex-1 brand-btn-primary"
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
            <p className="brand-body">No hotels found for the selected category.</p>
          </div>
        )}
      </div>

      {/* Hotel Details Modal */}
      <Dialog open={!!selectedHotel && isViewingDetails && !isHotelBookingFormOpen} onOpenChange={() => { setSelectedHotel(null); setIsViewingDetails(false); }}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto brand-card">
          {selectedHotel && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl brand-heading">{selectedHotel.name}</DialogTitle>
                <DialogDescription className="flex items-center gap-2 text-lg brand-body">
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
                    <h3 className="font-semibold mb-2 text-xl brand-heading">About This Hotel</h3>
                    <p className="brand-body mb-4">{selectedHotel.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{selectedHotel.category}</Badge>
                        <div className="flex items-center">
                          {[...Array(selectedHotel.starRating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold brand-heading">Features:</h4>
                        <div className="grid grid-cols-1 gap-1">
                          {selectedHotel.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-brand-primary" />
                              <span className="text-sm brand-body">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2 text-xl brand-heading">Amenities & Services</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedHotel.amenities.map((amenity, index) => {
                        const IconComponent = amenityIcons[amenity] || CheckCircle;
                        return (
                          <div key={index} className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4 text-brand-primary" />
                            <span className="text-sm brand-body">{amenity}</span>
                          </div>
                        );
                      })}
                    </div>
                    
                    {selectedHotel.cancellationPolicy && (
                      <div className="mt-4">
                        <h4 className="font-semibold mb-1 brand-heading">Cancellation Policy:</h4>
                        <p className="text-sm brand-body">{selectedHotel.cancellationPolicy}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Available Rooms */}
                <div>
                  <h3 className="font-semibold mb-4 text-xl brand-heading">Available Rooms</h3>
                  <div className="grid gap-4">
                    {hotelRooms.map((room) => (
                      <Card key={room.id} className="p-4 brand-card">
                        <div className="flex gap-4">
                          <img
                            src={room.imageUrl}
                            alt={room.roomName}
                            className="w-32 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-semibold brand-heading">{room.roomName}</h4>
                                <p className="text-sm brand-body">{room.description}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-semibold text-brand-primary">
                                  ${room.pricePerNight}/night
                                </div>
                                <div className="text-xs brand-body">
                                  {room.totalRooms} rooms available
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex gap-4 text-sm brand-body mb-2">
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                Up to {room.maxOccupancy} guests
                              </span>
                              <span className="flex items-center gap-1">
                                <Bed className="w-3 h-3" />
                                {room.bedType}
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
                                className="brand-btn-primary"
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

      {/* Hotel Booking Form Modal */}
      <EnhancedInteractiveForm
        formType="hotel-booking"
        isOpen={isHotelBookingFormOpen}
        onClose={() => {
          setIsHotelBookingFormOpen(false);
          setSelectedHotel(null);
          setSelectedRoom(null);
        }}
        initialData={{
          selectedHotel: selectedHotel?.name,
          selectedRoom: selectedRoom?.roomName,
          pricePerNight: selectedRoom?.pricePerNight
        }}
        onSubmitSuccess={(data) => {
          console.log("Hotel booking submitted:", data);
          setIsHotelBookingFormOpen(false);
          setSelectedHotel(null);
          setSelectedRoom(null);
        }}
      />
    </div>
  );
}
