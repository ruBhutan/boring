import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TourCard from "@/components/TourCard";
import BookingModal from "@/components/BookingModal";
import { 
  Award, Calendar, Users, Star, MapPin, Clock,
  Crown, Heart, Camera, Book, Music, Palette
} from "lucide-react";
import { Link } from "wouter";
import type { Tour } from "@shared/schema";

export default function CulturalToursPage() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const { data: tours = [] } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });

  const culturalTours = tours.filter(tour => tour.category === "Cultural");

  const handleBookNow = (tour: Tour) => {
    setSelectedTour(tour);
    setIsBookingModalOpen(true);
  };

  const culturalHighlights = [
    {
      title: "Ancient Dzongs",
      description: "Fortress-monasteries showcasing traditional architecture",
      icon: Crown
    },
    {
      title: "Buddhist Monasteries",
      description: "Sacred sites with centuries of spiritual heritage",
      icon: Heart
    },
    {
      title: "Traditional Arts",
      description: "Witness master craftsmen creating timeless pieces",
      icon: Palette
    },
    {
      title: "Local Festivals",
      description: "Colorful celebrations of Bhutanese culture",
      icon: Music
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="brand-section-header mb-4">
            <Award className="w-4 h-4" />
            Cultural Tours
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 brand-heading">
            Discover Bhutan's <span className="gradient-text">Rich Heritage</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed brand-body">
            Immerse yourself in the living culture of Bhutan through ancient traditions, sacred monasteries, 
            and authentic experiences that have remained unchanged for centuries.
          </p>
        </div>

        {/* Cultural Highlights */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {culturalHighlights.map((highlight, index) => (
            <div key={index} className="brand-card text-center p-6">
              <div className="bg-teal-gradient-light p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center teal-glow">
                <highlight.icon className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 brand-heading">{highlight.title}</h3>
              <p className="text-sm text-gray-600 brand-body">{highlight.description}</p>
            </div>
          ))}
        </div>

        {/* Tours Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Cultural Tour Packages ({culturalTours.length})
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {culturalTours.map((tour) => (
              <Card key={tour.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={tour.imageUrl}
                    alt={tour.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-teal-600 text-white">
                    Cultural
                  </Badge>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg text-sm flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {tour.duration} days
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {tour.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {tour.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {tour.duration}d
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {tour.maxGroupSize || 12}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-amber-400 fill-current" />
                      {tour.rating || 5.0}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        ${tour.price?.toLocaleString() || '0'}
                      </span>
                      <span className="text-gray-500 text-sm ml-1">per person</span>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/tours/${tour.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        onClick={() => handleBookNow(tour)}
                        className="btn-teal text-white"
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

        {/* Cultural Experience Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              What Makes Our Cultural Tours Special
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-teal-100 p-2 rounded-full mr-4 mt-1">
                  <Crown className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Ancient Dzongs & Monasteries</h3>
                  <p className="text-gray-600">Visit centuries-old fortress-monasteries like Punakha Dzong and Tiger's Nest, experiencing living Buddhist culture and traditional architecture.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-teal-100 p-2 rounded-full mr-4 mt-1">
                  <Palette className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Traditional Arts & Crafts</h3>
                  <p className="text-gray-600">Witness master artisans creating thangka paintings, wood carvings, and traditional textiles using techniques passed down through generations.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-teal-100 p-2 rounded-full mr-4 mt-1">
                  <Music className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Festival Celebrations</h3>
                  <p className="text-gray-600">Participate in colorful tsechus (festivals) with masked dances, traditional music, and spiritual ceremonies that connect you to Bhutan's soul.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop" 
              alt="Bhutanese cultural experience" 
              className="rounded-lg shadow-lg w-full h-80 object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-teal-600 text-white p-4 rounded-lg">
              <div className="text-2xl font-bold">1000+</div>
              <div className="text-sm">Years of Culture</div>
            </div>
          </div>
        </div>

        {/* Cultural Itinerary Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Typical Cultural Tour Itinerary
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="bg-teal-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <span className="text-teal-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Arrival in Paro</h3>
              <p className="text-sm text-gray-600">Airport pickup, hotel check-in, and orientation about Bhutanese culture and customs.</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="bg-teal-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <span className="text-teal-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Thimphu Exploration</h3>
              <p className="text-sm text-gray-600">Visit Tashichho Dzong, National Memorial Chorten, and traditional craft centers.</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="bg-teal-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <span className="text-teal-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Punakha Heritage</h3>
              <p className="text-sm text-gray-600">Explore Punakha Dzong, Chimi Lhakhang temple, and traditional village life.</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="bg-teal-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <span className="text-teal-600 font-bold">4</span>
              </div>
              <h3 className="font-semibold mb-2">Tiger's Nest Trek</h3>
              <p className="text-sm text-gray-600">Hike to the iconic Paro Taktsang monastery and experience spiritual Bhutan.</p>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="p-8 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Explore Bhutan's Culture?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join us for an authentic cultural journey through the Last Shangri-La.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/custom-tour">
                <Button className="bg-gradient-to-br from-white to-teal-50 text-teal-600 hover:bg-gray-100 px-8 py-3">
                  <Award className="w-5 h-5 mr-2" />
                  Customize Tour
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600 px-8 py-3">
                  Contact Expert
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        tour={selectedTour}
      />
    </div>
  );
}