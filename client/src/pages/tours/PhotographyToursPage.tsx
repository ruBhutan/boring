import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookNowFormLauncher } from "@/components/FormLauncher";
import { 
  Camera, Sunrise, Mountain, Flower2, Bird, 
  MapPin, Clock, Users, Star, Award, Calendar,
  Aperture, Focus, Palette, Eye
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Tour } from "@shared/schema";

const photographyHighlights = [
  {
    icon: Sunrise,
    title: "Golden Hour Shoots",
    description: "Capture stunning sunrise and sunset moments in pristine mountain settings"
  },
  {
    icon: Mountain,
    title: "Landscape Photography",
    description: "Photograph dramatic Himalayan peaks, valleys, and pristine wilderness"
  },
  {
    icon: Flower2,
    title: "Macro & Wildlife",
    description: "Close-up shots of rare flora, fauna, and endemic species"
  },
  {
    icon: Palette,
    title: "Cultural Portraits",
    description: "Authentic portraits of local people in traditional settings"
  }
];

const photographyTechniques = [
  {
    title: "High-Altitude Photography",
    description: "Master techniques for shooting in thin air and extreme conditions",
    icon: Mountain,
    difficulty: "Advanced"
  },
  {
    title: "Wildlife Photography",
    description: "Capture rare birds, mammals, and insects in their natural habitat",
    icon: Bird,
    difficulty: "Intermediate"
  },
  {
    title: "Cultural Documentation",
    description: "Respectful photography of festivals, ceremonies, and daily life",
    icon: Eye,
    difficulty: "Beginner"
  },
  {
    title: "Landscape Composition",
    description: "Frame dramatic mountain vistas and pristine valleys",
    icon: Aperture,
    difficulty: "Intermediate"
  }
];

export default function PhotographyToursPage() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isBookNowFormOpen, setIsBookNowFormOpen] = useState(false);

  const { data: tours = [] } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });

  const photographyTours = tours.filter(tour => 
    tour.category === "Photography" || 
    tour.name.toLowerCase().includes("photography") ||
    tour.description.toLowerCase().includes("photography")
  );

  const handleBookNow = (tour: Tour) => {
    setSelectedTour(tour);
    setIsBookNowFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 bg-gradient-to-br from-teal-50 via-emerald-50 to-amber-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-teal-900 via-emerald-900 to-teal-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-white/20 bg-stripes-diagonal"></div>
        </div>
        <div className="container mx-auto px-4 max-w-7xl relative">
          <div className="text-center">
            <Badge className="bg-white/20 text-white mb-4 backdrop-blur-sm">
              <Camera className="w-4 h-4 mr-2" />
              Photography Tours
            </Badge>
            <h1 className="text-5xl font-bold mb-6">
              Capture <span className="text-amber-200">Bhutan's Beauty</span>
            </h1>
            <p className="text-xl text-teal-50 max-w-3xl mx-auto leading-relaxed">
              Join expert photographers on specialized tours designed to capture Bhutan's most 
              stunning landscapes, wildlife, and cultural moments through your lens.
            </p>
          </div>
        </div>
      </section>

      {/* Photography Highlights */}
      <section className="py-16 bg-gradient-to-br from-white to-teal-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Photography <span className="bg-gradient-to-r from-teal-600 to-teal-600 bg-clip-text text-transparent">Specialties</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Master different photography styles in Bhutan's diverse environments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {photographyHighlights.map((highlight, index) => (
              <Card key={index} className="text-center border-teal-100 hover:shadow-lg transition-shadow card-modern">
                <CardContent className="p-6">
                  <div className="bg-gradient-to-br from-teal-100 to-emerald-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <highlight.icon className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                  <p className="text-sm text-gray-600">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Photography Techniques */}
      <section className="py-16 bg-gradient-to-br from-teal-50 to-emerald-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Master <span className="bg-gradient-to-r from-teal-600 to-teal-600 bg-clip-text text-transparent">Photography Techniques</span>
            </h2>
            <p className="text-lg text-gray-600">
              Learn specialized techniques from professional photographers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {photographyTechniques.map((technique, index) => (
              <Card key={index} className="card-modern">
                <CardHeader>
                  <div className="bg-gradient-to-br from-teal-100 to-emerald-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <technique.icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <CardTitle className="text-center text-lg">{technique.title}</CardTitle>
                  <Badge 
                    variant="outline" 
                    className={`mx-auto ${
                      technique.difficulty === 'Beginner' ? 'border-teal-500 text-teal-600' :
                      technique.difficulty === 'Intermediate' ? 'border-amber-500 text-amber-600' :
                      'border-red-500 text-red-600'
                    }`}
                  >
                    {technique.difficulty}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 text-sm">{technique.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Photography Tours Grid */}
      <section className="py-16 bg-gradient-to-br from-white to-teal-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Photography Tour Packages ({photographyTours.length})
            </h2>
          </div>

          {photographyTours.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photographyTours.map((tour) => (
                <Card key={tour.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group card-modern">
                  <div className="relative">
                    <img
                      src={tour.imageUrl}
                      alt={tour.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-teal-600 to-teal-600 text-white">
                      Photography
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
                        {tour.maxGroupSize || 8}
                      </div>
                      <div className="flex items-center">
                        <Camera className="w-4 h-4 mr-1 text-teal-600" />
                        Pro Guide
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
                        <Link to={`/tours/${tour.id}`}>
                          <Button variant="outline" size="sm" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                            View Details
                          </Button>
                        </Link>
                        <Button 
                          size="sm" 
                          onClick={() => handleBookNow(tour)}
                          className="bg-gradient-to-r from-teal-600 to-teal-600 hover:from-teal-700 hover:to-emerald-700 text-white"
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center pt-20 pb-20">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Photography Tours Coming Soon</h3>
              <p className="text-gray-500 mb-6">We're developing specialized photography tours. Contact us for custom photography experiences.</p>
              <Link to="/custom-tour">
                <Button className="bg-gradient-to-r from-teal-600 to-teal-600 text-white">
                  Request Custom Photography Tour
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Equipment & Tips */}
      <section className="py-16 bg-gradient-to-r from-teal-900 via-emerald-900 to-teal-800 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Photography Equipment & Tips</h2>
            <p className="text-xl text-teal-50 max-w-3xl mx-auto">
              Essential gear and professional tips for photographing in Bhutan's unique conditions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <Focus className="w-12 h-12 text-amber-300 mb-4" />
                <CardTitle>Essential Gear</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-teal-100">
                  <li>• Wide-angle lens for landscapes</li>
                  <li>• Telephoto lens for wildlife</li>
                  <li>• Sturdy tripod for stability</li>
                  <li>• Extra batteries (cold weather)</li>
                  <li>• Polarizing filters</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <Aperture className="w-12 h-12 text-amber-300 mb-4" />
                <CardTitle>Camera Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-teal-100">
                  <li>• Shoot in RAW format</li>
                  <li>• Use manual focus in low light</li>
                  <li>• Bracket exposures for HDR</li>
                  <li>• Higher ISO for wildlife</li>
                  <li>• Golden hour timing</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <Award className="w-12 h-12 text-amber-300 mb-4" />
                <CardTitle>Pro Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-teal-100">
                  <li>• Respect local customs</li>
                  <li>• Ask permission for portraits</li>
                  <li>• Protect gear from moisture</li>
                  <li>• Plan shots around weather</li>
                  <li>• Backup your images daily</li>
                </ul>
              </CardContent>
            </Card>
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