import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, MapPin, Wifi, Car, Utensils, Waves, Coffee, 
  Palette, Heart, Camera, Award, Crown, Sparkles,
  Users, Calendar, Phone, Mail
} from "lucide-react";
import { HotelBookingFormLauncher } from "@/components/FormLauncher";

const boutiqueFeatures = [
  {
    icon: Palette,
    title: "Unique Design",
    description: "Each property tells its own story through distinctive architecture and curated interiors"
  },
  {
    icon: Heart,
    title: "Personal Touch",
    description: "Intimate service with attention to detail that makes every guest feel special"
  },
  {
    icon: Crown,
    title: "Exclusive Experience",
    description: "Limited rooms ensure privacy and exclusivity for a truly personalized stay"
  },
  {
    icon: Award,
    title: "Local Character",
    description: "Authentic Bhutanese culture woven into every aspect of your accommodation"
  }
];

const sampleBoutiqueHotels = [
  {
    id: 1,
    name: "Zhiwa Ling Heritage Hotel",
    location: "Paro",
    category: "boutique",
    starRating: 4,
    pricePerNight: 650,
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    description: "A masterpiece of traditional Bhutanese architecture showcasing authentic craftsmanship and cultural heritage.",
    amenities: ["Traditional Spa", "Heritage Restaurant", "Cultural Library", "Craft Workshops"],
    features: ["Hand-carved woodwork", "Traditional textiles", "Cultural programs", "Organic gardens"],
    highlights: ["UNESCO-style architecture", "Master craftsmen built", "Cultural immersion", "Authentic experience"]
  },
  {
    id: 2,
    name: "Gangtey Lodge",
    location: "Gangtey Valley",
    category: "boutique",
    starRating: 4,
    pricePerNight: 580,
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    description: "Eco-luxury lodge overlooking the pristine Gangtey Valley with stunning views of the Himalayas.",
    amenities: ["Valley Views", "Eco-friendly Design", "Local Cuisine", "Nature Walks"],
    features: ["Sustainable materials", "Local artisan decor", "Organic farming", "Wildlife viewing"],
    highlights: ["Black-necked cranes", "Pristine valley views", "Eco-luxury comfort", "Nature immersion"]
  },
  {
    id: 3,
    name: "Dewachen Hotel",
    location: "Thimphu",
    category: "boutique",
    starRating: 3,
    pricePerNight: 420,
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    description: "Charming boutique hotel in the heart of Thimphu combining modern comfort with traditional Bhutanese hospitality.",
    amenities: ["City Center Location", "Traditional Decor", "Local Cuisine", "Cultural Tours"],
    features: ["Central location", "Traditional architecture", "Local art collection", "Personalized service"],
    highlights: ["Walking distance to attractions", "Local art gallery", "Traditional hospitality", "Cultural experiences"]
  }
];

export default function BoutiqueHotelsPage() {
  const { data: hotels = [] } = useQuery({ queryKey: ["/api/hotels"] });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [isHotelBookingFormOpen, setIsHotelBookingFormOpen] = useState(false);
  
  // Use sample data if no hotels from API
  const boutiqueHotels = hotels.length > 0 
    ? hotels.filter((hotel: any) => hotel.category === "boutique")
    : sampleBoutiqueHotels;
    
  const handleBookNow = (hotel: any) => {
    setSelectedHotel(hotel);
    setSelectedRoom(null);
    setIsHotelBookingFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 bg-gradient-to-br from-amber-50 to-amber-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">
            <Badge className="bg-white/20 text-white mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Boutique Collection
            </Badge>
            <h1 className="text-5xl font-bold mb-6">
              Boutique Hotels in <span className="text-teal-200">Bhutan</span>
            </h1>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
              Discover intimate properties where traditional Bhutanese craftsmanship meets 
              contemporary luxury, each telling its own unique story.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-white to-teal-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-teal-600">Boutique Hotels</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of intimacy, authenticity, and luxury
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {boutiqueFeatures.map((feature, index) => (
              <Card key={index} className="text-center border-teal-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-teal-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hotels Grid */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-amber-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured <span className="text-teal-600">Boutique Properties</span>
            </h2>
            <p className="text-lg text-gray-600">
              Handpicked collection of Bhutan's finest boutique accommodations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boutiqueHotels.map((hotel: any) => (
              <Card key={hotel.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-teal-100">
                <div className="relative">
                  <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-56 object-cover" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-teal-600 text-white">
                      <Crown className="w-3 h-3 mr-1" />
                      Boutique
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1">
                    <div className="flex items-center">
                      {[...Array(hotel.starRating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-2 text-teal-600" />
                      <span>{hotel.location}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{hotel.description}</p>
                  </div>

                  {hotel.highlights && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Highlights:</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {hotel.highlights.slice(0, 4).map((highlight: string, idx: number) => (
                          <div key={idx} className="flex items-center text-xs text-gray-600">
                            <Sparkles className="w-3 h-3 text-teal-500 mr-1" />
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {hotel.amenities && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Amenities:</h4>
                      <div className="flex flex-wrap gap-1">
                        {hotel.amenities.slice(0, 3).map((amenity: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs border-teal-200 text-teal-700">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-teal-100">
                    <div>
                      <span className="text-2xl font-bold text-teal-600">${hotel.pricePerNight}</span>
                      <span className="text-gray-500 text-sm ml-1">per night</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-teal-200 text-teal-700 hover:bg-teal-50">
                        <Camera className="w-4 h-4" />
                      </Button>
                      <Button 
                        className="btn-teal text-white"
                        onClick={() => handleBookNow(hotel)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Boutique Section */}
      <section className="py-16 bg-gradient-to-br from-white to-teal-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                The <span className="text-teal-600">Boutique Difference</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-teal-100 p-2 rounded-full mr-4 mt-1">
                    <Users className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Intimate Scale</h3>
                    <p className="text-gray-600">With fewer rooms, you'll enjoy personalized attention and a more exclusive atmosphere.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-teal-100 p-2 rounded-full mr-4 mt-1">
                    <Palette className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Unique Character</h3>
                    <p className="text-gray-600">Each property has its own personality, reflecting local culture and artistic vision.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-teal-100 p-2 rounded-full mr-4 mt-1">
                    <Heart className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Personal Service</h3>
                    <p className="text-gray-600">Staff know you by name and cater to your individual preferences and needs.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop" 
                alt="Boutique hotel interior" 
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-teal-600 text-white p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-700">7+</div>
                <div className="text-sm">Boutique Properties</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for a Boutique Experience?</h2>
          <p className="text-xl text-teal-100 mb-8">
            Let our experts help you find the perfect boutique hotel for your Bhutan journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-br from-white to-teal-50 text-teal-600 hover:bg-teal-50">
              <Phone className="w-5 h-5 mr-2" />
              Call +975-2-323251
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600">
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </Button>
          </div>
        </div>
      </section>
      
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
