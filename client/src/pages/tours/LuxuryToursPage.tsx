import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TourCard from "@/components/TourCard";
import { BookNowFormLauncher } from "@/components/FormLauncher";
import { 
  Star, Crown, Sparkles, MapPin, Clock, Users, 
  Plane, Hotel, Utensils, Camera, Waves, Wine,
  ChevronRight, Award, Heart, Mountain, Phone
} from "lucide-react";
import type { Tour } from "@shared/schema";

const luxuryFeatures = [
  {
    icon: Crown,
    title: "Ultra-Luxury Accommodations",
    description: "Stay at Amankora, Uma, Six Senses, and other world-class resorts",
    highlights: ["Private villas", "Spa treatments", "Michelin-starred dining"]
  },
  {
    icon: Plane,
    title: "Private Helicopter Transfers",
    description: "Scenic helicopter flights between destinations",
    highlights: ["Tiger's Nest aerial view", "Himalayan panoramas", "VIP airport transfers"]
  },
  {
    icon: Award,
    title: "Exclusive Access",
    description: "Private monastery visits and royal palace tours",
    highlights: ["After-hours dzong visits", "Private audiences", "Royal garden access"]
  },
  {
    icon: Utensils,
    title: "Gourmet Experiences",
    description: "Private dining with royal chefs and wine pairings",
    highlights: ["Farm-to-table cuisine", "Traditional cooking classes", "Wine cellar tours"]
  }
];



const luxuryAccommodations = [
  {
    name: "Amankora",
    location: "Thimphu, Paro, Punakha, Gangtey, Bumthang",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    features: ["Private pavilions", "Spa sanctuary", "Farm-to-table dining"],
    priceRange: "$1,500 - $3,000/night"
  },
  {
    name: "Uma by COMO",
    location: "Paro & Punakha",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
    features: ["Himalayan views", "COMO Shambhala Spa", "Adventure activities"],
    priceRange: "$800 - $1,500/night"
  },
  {
    name: "Six Senses Bhutan",
    location: "Thimphu & Paro",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    features: ["Wellness programs", "Organic cuisine", "Cultural immersion"],
    priceRange: "$1,200 - $2,200/night"
  }
];

export default function LuxuryToursPage() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isBookNowFormOpen, setIsBookNowFormOpen] = useState(false);

  const { data: tours = [] } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });

  const luxuryToursData = tours.filter(tour => tour.category === "Luxury");

  const handleBookNow = (tour: Tour) => {
    setSelectedTour(tour);
    setIsBookNowFormOpen(true);
  };

  return (
    <div className="pt-20">

      {/* Luxury Features */}
      <section className="py-20 section-purple-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our
              <span className="gradient-text"> Luxury Tours</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto brand-body">
              Unparalleled luxury meets authentic Bhutanese culture in our carefully curated experiences
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
                    {feature.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-sm text-teal-600 flex items-center">
                        <Star className="w-4 h-4 mr-2 fill-current" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Luxury Tours */}
      <section className="py-20 bg-gradient-to-br from-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="brand-section-header-light mb-6">
              <Award className="w-5 h-5" />
              Featured Luxury Tours
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Curated
              <span className="gradient-text"> Luxury Experiences</span>
            </h2>
          </div>



          {/* All Luxury Tours */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {luxuryToursData.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                onBookNow={handleBookNow}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Accommodations */}
      <section className="py-20 section-purple-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="brand-section-header mb-6">
              <Hotel className="w-5 h-5" />
              Luxury Accommodations
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              World-Class
              <span className="gradient-text"> Resorts & Lodges</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto brand-body">
              Stay at Bhutan's most exclusive properties, each offering unparalleled luxury and authentic experiences
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {luxuryAccommodations.map((hotel, index) => (
              <Card key={index} className="brand-card overflow-hidden">
                <div className="relative">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-amber-400 fill-current mr-1" />
                      <span className="text-sm font-medium">{hotel.rating}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{hotel.location}</span>
                  </div>
                  <div className="space-y-2 mb-4">
                    {hotel.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <Sparkles className="w-4 h-4 text-teal-600 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <div className="text-lg font-bold text-teal-600">{hotel.priceRange}</div>
                    <Button variant="outline" className="w-full mt-3 btn-teal-outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-teal-gradient-dark text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready for the Ultimate Luxury Experience?
          </h2>
          <p className="text-xl mb-8 text-teal-100">
            Let our luxury travel specialists create a bespoke journey tailored to your preferences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-br from-white to-teal-50 text-teal-900 hover:bg-teal-50 text-lg px-8 py-4">
              <Crown className="w-5 h-5 mr-2" />
              Plan My Luxury Journey
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-900 text-lg px-8 py-4">
              <Phone className="w-5 h-5 mr-2" />
              Call +975-2-323251
            </Button>
          </div>
        </div>
      </section>

      <BookNowFormLauncher
        isOpen={isBookNowFormOpen}
        onClose={() => setIsBookNowFormOpen(false)}
        selectedTour={selectedTour}
      />
    </div>
  );
}