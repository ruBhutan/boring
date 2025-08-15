import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Star, Crown, Sparkles, MapPin, 
  Utensils, Waves, Mountain, 
  ChevronRight, Heart, ArrowRight,
  Wifi, Car, Coffee, Shield
} from "lucide-react";
import { FloatingContactButton, SmartFormLauncher, HotelBookingFormLauncher } from "@/components/FormLauncher";

const luxuryHotels = [
  {
    id: 1,
    name: "Amankora Thimphu",
    location: "Thimphu",
    rating: 5.0,
    reviews: 245,
    price: 1800,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    description: "Perched on a wooded hillside overlooking Thimphu valley, this luxury pavilion-style resort offers unparalleled views and service.",
    amenities: ["Spa Sanctuary", "Fine Dining", "Private Pavilions", "Butler Service", "Yoga Studio", "Library"],
    highlights: ["20 pavilion suites", "Traditional architecture", "Panoramic valley views", "World-class spa"],
    category: "Ultra-Luxury Resort"
  },
  {
    id: 2,
    name: "Uma Paro by COMO",
    location: "Paro",
    rating: 4.9,
    reviews: 189,
    price: 1200,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
    description: "Nestled in a tranquil valley with views of ancient Paro Dzong, offering contemporary luxury with Bhutanese touches.",
    amenities: ["COMO Shambhala Spa", "Adventure Center", "Bukhari Restaurant", "Yoga Pavilion", "Heated Pool", "Library"],
    highlights: ["29 rooms and suites", "Adventure activities", "Himalayan views", "Wellness programs"],
    category: "Luxury Resort"
  },
  {
    id: 3,
    name: "Six Senses Thimphu",
    location: "Thimphu",
    rating: 4.8,
    reviews: 156,
    price: 1500,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    description: "Sustainable luxury resort offering wellness programs and organic cuisine in the heart of the Himalayas.",
    amenities: ["Six Senses Spa", "Organic Restaurant", "Wellness Programs", "Meditation Center", "Fitness Center", "Kids Club"],
    highlights: ["20 suites and villas", "Wellness focus", "Sustainable practices", "Organic gardens"],
    category: "Wellness Resort"
  }
];

const luxuryFeatures = [
  {
    icon: Crown,
    title: "Royal Treatment",
    description: "Experience service fit for royalty with personal butlers and concierge",
    details: ["24/7 butler service", "Personal concierge", "VIP airport transfers", "Private dining"]
  },
  {
    icon: Waves,
    title: "World-Class Spas",
    description: "Rejuvenate with traditional and modern wellness treatments",
    details: ["Traditional hot stone baths", "Himalayan salt treatments", "Meditation sessions", "Yoga classes"]
  },
  {
    icon: Utensils,
    title: "Gourmet Dining",
    description: "Savor exquisite cuisine from renowned chefs and local specialties",
    details: ["Michelin-trained chefs", "Organic ingredients", "Wine cellars", "Private dining"]
  },
  {
    icon: Mountain,
    title: "Spectacular Views",
    description: "Wake up to breathtaking Himalayan vistas and pristine valleys",
    details: ["Panoramic mountain views", "Valley overlooks", "Sunrise terraces", "Private balconies"]
  }
];

export default function LuxuryHotelsPage() {
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [isHotelBookingFormOpen, setIsHotelBookingFormOpen] = useState(false);
  
  const handleViewDetails = (hotel: any) => {
    // Navigate to hotel detail page or open modal
    console.log('View details for:', hotel.name);
    setSelectedHotel(hotel);
    // You can implement navigation logic here
  };
  
  const handleBookNow = (hotel: any) => {
    setSelectedHotel(hotel);
    setSelectedRoom(null); // For hotels without specific room selection
    setIsHotelBookingFormOpen(true);
  };

  return (
    <div className="pt-20 min-h-screen bg-brand-light-gradient">

      {/* Luxury Features */}
      <section className="py-20 section-purple-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Luxury
              <span className="gradient-text"> Features</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto brand-body">
              Every luxury hotel in Bhutan offers exceptional service and unique experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {luxuryFeatures.map((feature, index) => (
              <Card key={index} className="brand-card text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-teal-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-teal-600 flex items-center">
                        <Star className="w-4 h-4 mr-2 fill-current" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hotels Grid */}
      <section className="py-20 bg-gradient-to-br from-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Luxury Hotels
            </h2>
          </div>

          <div className="space-y-8">
            {luxuryHotels.map((hotel) => (
              <Card key={hotel.id} className="brand-card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                <div className="lg:flex">
                  <div className="lg:w-1/2 relative">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0">
                      <Crown className="w-3 h-3 mr-1" />
                      {hotel.category}
                    </Badge>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-amber-400 fill-current mr-1" />
                        <span className="text-sm font-medium text-gray-900">{hotel.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/2 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{hotel.name}</h3>
                        <div className="flex items-center text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{hotel.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <div className="flex text-amber-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({hotel.reviews} reviews)</span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{hotel.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Highlights:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {hotel.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-700">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div>
                        <span className="text-3xl font-bold text-emerald-600">${hotel.price}</span>
                        <span className="text-gray-500 ml-2 text-sm">per night</span>
                      </div>
                      <div className="flex gap-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-medium"
                          onClick={() => handleViewDetails(hotel)}
                        >
                          View Details
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium"
                          onClick={() => handleBookNow(hotel)}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-teal-gradient-dark text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready for Luxury in the Himalayas?
          </h2>
          <p className="text-xl mb-8 text-teal-100">
            Let us help you find the perfect luxury accommodation for your Bhutan journey
          </p>
          <div className="mb-8">
            <SmartFormLauncher page="hotels" />
          </div>
        </div>
      </section>

      {/* Floating Contact Button */}
      <FloatingContactButton />
      
      {/* Hotel Booking Form */}
      <HotelBookingFormLauncher
        isOpen={isHotelBookingFormOpen}
        onClose={() => setIsHotelBookingFormOpen(false)}
        selectedHotel={selectedHotel}
        selectedRoom={selectedRoom}
      />
    </div>
  );
}
