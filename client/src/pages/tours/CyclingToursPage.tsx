import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bike, Mountain, Clock, Users, MapPin, Star, Shield, Heart, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BookNowFormLauncher } from "@/components/FormLauncher";

export default function CyclingToursPage() {
  const [selectedTour, setSelectedTour] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookNow = (tour) => {
    setSelectedTour(tour);
    setIsBookingModalOpen(true);
  };

  const cyclingTours = [
    {
      id: 1,
      title: "Thimphu Valley Cycling Adventure",
      duration: "3 Days",
      difficulty: "Moderate",
      groupSize: "4-8 people",
      price: "$450",
      image: "/api/placeholder/400/250",
      highlights: ["Thimphu city exploration", "Traditional villages", "Mountain trails", "Cultural sites"],
      description: "Explore Bhutan's capital valley on two wheels, combining urban cycling with scenic mountain trails."
    },
    {
      id: 2,
      title: "Paro to Punakha Cycling Expedition",
      duration: "7 Days",
      difficulty: "Challenging",
      groupSize: "6-10 people",
      price: "$1,200",
      image: "/api/placeholder/400/250",
      highlights: ["Cross-country cycling", "Dochula Pass", "Ancient fortresses", "River valleys"],
      description: "Epic cycling journey through Bhutan's most scenic landscapes, from Paro valley to the ancient capital of Punakha."
    },
    {
      id: 3,
      title: "Bumthang Cultural Cycling Tour",
      duration: "5 Days",
      difficulty: "Easy",
      groupSize: "4-12 people",
      price: "$750",
      image: "/api/placeholder/400/250",
      highlights: ["Sacred valleys", "Ancient temples", "Local farmhouses", "Traditional crafts"],
      description: "Gentle cycling through Bumthang's spiritual heartland, visiting sacred sites and traditional communities."
    }
  ];

  const features = [
    {
      icon: Bike,
      title: "Premium Mountain Bikes",
      description: "High-quality Trek and Specialized bikes with full suspension and safety gear included."
    },
    {
      icon: Shield,
      title: "Expert Guides",
      description: "Certified cycling guides with extensive knowledge of local trails and safety protocols."
    },
    {
      icon: Heart,
      title: "Eco-Friendly Travel",
      description: "Sustainable tourism that minimizes environmental impact while maximizing cultural immersion."
    },
    {
      icon: Zap,
      title: "E-Bike Options",
      description: "Electric bike assistance available for challenging terrain and longer distances."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 to-teal-600/90"></div>
        <div className="absolute inset-0 bg-[url('/api/placeholder/1200/600')] bg-cover bg-center"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Bike className="w-16 h-16 text-white mr-4" />
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Cycling Tours
            </h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Discover Bhutan's pristine landscapes on two wheels. Experience eco-friendly adventure cycling through ancient valleys, mountain passes, and traditional villages.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
              <Mountain className="w-4 h-4 mr-2" />
              Mountain Trails
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              Small Groups
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Safety First
            </Badge>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Cycling Tours</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience Bhutan's natural beauty while supporting sustainable tourism practices
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-teal-100 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <feature.icon className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 bg-gradient-to-br from-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Cycling Adventures</h2>
            <p className="text-lg text-gray-600">
              From gentle valley rides to challenging mountain expeditions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cyclingTours.map((tour) => (
              <Card key={tour.id} className="overflow-hidden hover:shadow-xl transition-shadow border-teal-100">
                <div className="relative">
                  <img 
                    src={tour.image} 
                    alt={tour.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-teal-600 text-white">
                    {tour.difficulty}
                  </Badge>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">{tour.title}</CardTitle>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {tour.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {tour.groupSize}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 mb-4">{tour.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Tour Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tour.highlights.map((highlight, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-teal-200 text-teal-700">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-teal-600">{tour.price}</div>
                    <Button 
                      className="btn-teal"
                      onClick={() => handleBookNow(tour)}
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment & Safety */}
      <section className="py-16 bg-gradient-to-r from-teal-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Equipment & Safety</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Bike className="w-6 h-6 text-teal-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Premium Bicycles</h3>
                    <p className="text-gray-600">Trek and Specialized mountain bikes with full suspension, multiple gears, and regular maintenance.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-teal-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Safety Equipment</h3>
                    <p className="text-gray-600">Helmets, knee pads, first aid kits, and emergency communication devices provided for all riders.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-teal-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Route Planning</h3>
                    <p className="text-gray-600">Carefully planned routes with backup options, rest stops, and cultural interaction points.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/api/placeholder/500/400" 
                alt="Cycling equipment"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready for Your Cycling Adventure?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join us for an unforgettable eco-friendly journey through Bhutan's pristine landscapes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-br from-white to-teal-50 text-teal-600 hover:bg-gray-100">
                Plan Your Trip
              </Button>
            </Link>
            <Link to="/tours">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View All Tours
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {isBookingModalOpen && selectedTour && (
        <BookNowFormLauncher
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          tourData={{
            title: selectedTour.title,
            duration: selectedTour.duration,
            price: selectedTour.price,
            groupSize: selectedTour.groupSize
          }}
        />
      )}
    </div>
  );
}