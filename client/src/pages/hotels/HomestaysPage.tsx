import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Star, MapPin, Home, Users, Heart, Coffee, 
  Utensils, TreePine, Sunrise, Camera, Award,
  Phone, Mail, Calendar, CheckCircle
} from "lucide-react";
import { HotelBookingFormLauncher } from "@/components/FormLauncher";

const homestayBenefits = [
  {
    icon: Heart,
    title: "Authentic Experience",
    description: "Live with local families and experience genuine Bhutanese hospitality and daily life"
  },
  {
    icon: Utensils,
    title: "Home-Cooked Meals",
    description: "Enjoy traditional Bhutanese cuisine prepared with love by your host family"
  },
  {
    icon: Users,
    title: "Cultural Exchange",
    description: "Learn about local customs, traditions, and way of life through meaningful interactions"
  },
  {
    icon: TreePine,
    title: "Rural Setting",
    description: "Experience the peaceful countryside and traditional village life away from crowds"
  }
];

const sampleHomestays = [
  {
    id: 1,
    name: "Paro Valley Family Homestay",
    location: "Paro Valley",
    category: "homestay",
    pricePerNight: 85,
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    description: "Stay with the Wangchuk family in their traditional farmhouse overlooking the beautiful Paro Valley with views of the Himalayas.",
    hostFamily: "Wangchuk Family",
    rooms: 3,
    maxGuests: 8,
    amenities: ["Home-cooked meals", "Traditional architecture", "Organic garden", "Cultural activities"],
    activities: ["Farm work experience", "Traditional cooking classes", "Village walks", "Prayer flag making"],
    highlights: ["Himalayan views", "Organic farming", "Traditional lifestyle", "Family interactions"]
  },
  {
    id: 2,
    name: "Bumthang Heritage Homestay",
    location: "Bumthang Valley",
    category: "homestay",
    pricePerNight: 75,
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    description: "Experience traditional Bhutanese life with the Dorji family in the spiritual heartland of Bumthang Valley.",
    hostFamily: "Dorji Family",
    rooms: 2,
    maxGuests: 6,
    amenities: ["Traditional meals", "Cultural programs", "Local guide", "Handicraft workshops"],
    activities: ["Temple visits", "Weaving lessons", "Yak herding", "Local festivals"],
    highlights: ["Sacred valley", "Ancient temples", "Traditional crafts", "Spiritual experiences"]
  },
  {
    id: 3,
    name: "Thanza Village Homestay",
    location: "Thanza Village",
    category: "homestay",
    pricePerNight: 65,
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    description: "Remote mountain village homestay offering an authentic glimpse into traditional Bhutanese highland life.",
    hostFamily: "Tenzin Family",
    rooms: 2,
    maxGuests: 5,
    amenities: ["Mountain views", "Traditional food", "Local stories", "Nature walks"],
    activities: ["Highland trekking", "Yak cheese making", "Traditional games", "Star gazing"],
    highlights: ["Remote location", "Mountain culture", "Pristine nature", "Authentic lifestyle"]
  }
];

const whatToExpect = [
  {
    title: "Accommodation",
    description: "Clean, comfortable rooms in traditional Bhutanese homes with shared facilities",
    icon: Home
  },
  {
    title: "Meals",
    description: "Three traditional meals per day prepared by your host family using local ingredients",
    icon: Utensils
  },
  {
    title: "Activities",
    description: "Participate in daily farm work, cooking, and traditional crafts with the family",
    icon: TreePine
  },
  {
    title: "Cultural Learning",
    description: "Learn about Bhutanese customs, language, and way of life through daily interactions",
    icon: Award
  }
];

export default function HomestaysPage() {
  const { data: hotels = [] } = useQuery({ queryKey: ["/api/hotels"] });
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [isHotelBookingFormOpen, setIsHotelBookingFormOpen] = useState(false);
  
  // Use sample data if no hotels from API
  const homestays = hotels.length > 0 
    ? hotels.filter((hotel: any) => hotel.category === "homestay")
    : sampleHomestays;
    
  const handleBookNow = (hotel: any) => {
    setSelectedHotel(hotel);
    setSelectedRoom(null);
    setIsHotelBookingFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">
            <Badge className="bg-white/20 text-white mb-4">
              <Home className="w-4 h-4 mr-2" />
              Authentic Homestays
            </Badge>
            <h1 className="text-5xl font-bold mb-6">
              Live Like a <span className="text-green-200">Local</span> in Bhutan
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Experience genuine Bhutanese hospitality by staying with local families in their traditional homes. 
              Share meals, stories, and create lasting memories with your Bhutanese hosts.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-white to-teal-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-green-600">Homestays</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the heart of Bhutanese culture through authentic family experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {homestayBenefits.map((benefit, index) => (
              <Card key={index} className="text-center border-green-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <benefit.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Homestays Grid */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured <span className="text-green-600">Family Homestays</span>
            </h2>
            <p className="text-lg text-gray-600">
              Carefully selected families offering warm hospitality and authentic experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homestays.map((homestay: any) => (
              <Card key={homestay.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-green-100">
                <div className="relative">
                  <img src={homestay.imageUrl} alt={homestay.name} className="w-full h-56 object-cover" />
                  <Badge className="absolute top-4 left-4 bg-green-600 text-white">
                    <Home className="w-3 h-3 mr-1" />
                    Homestay
                  </Badge>
                  <div className="absolute top-4 right-4 bg-white/90 rounded-lg px-2 py-1">
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 text-green-600 mr-1" />
                      <span className="font-medium">{homestay.maxGuests || '4-6'} guests</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{homestay.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-2 text-green-600" />
                      <span>{homestay.location}</span>
                    </div>
                    {homestay.hostFamily && (
                      <div className="flex items-center text-gray-600 mb-3">
                        <Heart className="w-4 h-4 mr-2 text-green-600" />
                        <span className="text-sm">Hosted by {homestay.hostFamily}</span>
                      </div>
                    )}
                    <p className="text-gray-600 text-sm leading-relaxed">{homestay.description}</p>
                  </div>

                  {homestay.activities && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Activities:</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {homestay.activities.slice(0, 4).map((activity: string, idx: number) => (
                          <div key={idx} className="flex items-center text-xs text-gray-600">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                            {activity}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {homestay.amenities && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Includes:</h4>
                      <div className="flex flex-wrap gap-1">
                        {homestay.amenities.slice(0, 3).map((amenity: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs border-green-200 text-green-700">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-green-100">
                    <div>
                      <span className="text-2xl font-bold text-green-600">${homestay.pricePerNight}</span>
                      <span className="text-gray-500 text-sm ml-1">per night</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50">
                        <Camera className="w-4 h-4" />
                      </Button>
                      <Button 
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleBookNow(homestay)}
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

      {/* What to Expect Section */}
      <section className="py-16 bg-gradient-to-br from-white to-teal-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What to <span className="text-green-600">Expect</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your homestay experience includes everything you need for an authentic cultural immersion
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whatToExpect.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <item.icon className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guidelines Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Homestay <span className="text-green-600">Guidelines</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                    <Heart className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Respect Local Customs</h3>
                    <p className="text-gray-600">Follow your host family's traditions and participate respectfully in daily activities.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Engage with the Family</h3>
                    <p className="text-gray-600">Share stories, help with daily tasks, and learn about Bhutanese culture through conversation.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                    <TreePine className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Embrace Simple Living</h3>
                    <p className="text-gray-600">Enjoy the peaceful rural lifestyle and appreciate the beauty of simple, sustainable living.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop" 
                alt="Bhutanese family" 
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-green-600 text-white p-4 rounded-lg">
                <div className="text-2xl font-bold">25+</div>
                <div className="text-sm">Host Families</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for an Authentic Experience?</h2>
          <p className="text-xl text-green-100 mb-8">
            Connect with our local partners to find the perfect homestay for your Bhutan adventure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-br from-white to-teal-50 text-green-600 hover:bg-green-50">
              <Phone className="w-5 h-5 mr-2" />
              Call +975-2-323251
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              <Calendar className="w-5 h-5 mr-2" />
              Book Homestay
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
