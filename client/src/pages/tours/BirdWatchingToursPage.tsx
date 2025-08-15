import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookNowFormLauncher } from "@/components/FormLauncher";
import { 
  Bird, Binoculars, TreePine, Sunrise, 
  MapPin, Clock, Users, Star, Award, Calendar,
  Eye, Feather, Mountain, Camera
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Tour } from "@shared/schema";

const birdSpecies = [
  {
    name: "Himalayan Monal",
    description: "Nepal's national bird, stunning iridescent plumage",
    habitat: "High altitude forests",
    bestTime: "Spring & Autumn",
    rarity: "Rare"
  },
  {
    name: "Black-necked Crane",
    description: "Sacred bird, winters in Phobjikha Valley",
    habitat: "Wetlands & valleys",
    bestTime: "Winter",
    rarity: "Endangered"
  },
  {
    name: "Rufous-necked Hornbill",
    description: "Large forest bird with distinctive casque",
    habitat: "Subtropical forests",
    bestTime: "Year-round",
    rarity: "Vulnerable"
  },
  {
    name: "Fire-tailed Myzornis",
    description: "Colorful endemic species",
    habitat: "Rhododendron forests",
    bestTime: "Spring",
    rarity: "Endemic"
  }
];

const birdingLocations = [
  {
    name: "Phobjikha Valley",
    description: "Winter home to Black-necked Cranes",
    species: "120+ species",
    elevation: "3,000m",
    bestTime: "November - February"
  },
  {
    name: "Bumthang Valley",
    description: "Diverse habitats from wetlands to forests",
    species: "150+ species",
    elevation: "2,800m",
    bestTime: "March - May, September - November"
  },
  {
    name: "Zhemgang",
    description: "Subtropical forests with rare species",
    species: "200+ species",
    elevation: "200-1,500m",
    bestTime: "October - April"
  },
  {
    name: "Thrumshing La",
    description: "High-altitude birding paradise",
    species: "100+ species",
    elevation: "3,800m",
    bestTime: "May - September"
  }
];

export default function BirdWatchingToursPage() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isBookNowFormOpen, setIsBookNowFormOpen] = useState(false);

  const { data: tours = [] } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });

  const birdWatchingTours = tours.filter(tour => 
    tour.category === "Adventure" || 
    tour.name.toLowerCase().includes("bird") ||
    tour.description.toLowerCase().includes("wildlife")
  );

  const handleBookNow = (tour: Tour) => {
    setSelectedTour(tour);
    setIsBookNowFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-emerald-900 via-teal-900 to-green-900 text-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">
            <Badge className="bg-white/20 text-white mb-4">
              <Bird className="w-4 h-4 mr-2" />
              Bird Watching Tours
            </Badge>
            <h1 className="text-5xl font-bold mb-6">
              Discover <span className="text-amber-200">Bhutan's Avian Paradise</span>
            </h1>
            <p className="text-xl text-emerald-50 max-w-3xl mx-auto leading-relaxed">
              Explore one of the world's most biodiverse regions with over 770 bird species, 
              including rare endemics and endangered species in pristine Himalayan habitats.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Bird Species */}
      <section className="py-16 bg-gradient-to-br from-white to-teal-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Iconic <span className="bg-gradient-to-r from-teal-600 to-teal-600 bg-clip-text text-transparent">Bird Species</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encounter some of Bhutan's most spectacular and rare bird species
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {birdSpecies.map((bird, index) => (
              <Card key={index} className="card-modern">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Feather className="w-6 h-6 text-teal-600" />
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        bird.rarity === 'Endemic' ? 'border-teal-500 text-teal-600' :
                        bird.rarity === 'Endangered' ? 'border-red-500 text-red-600' :
                        bird.rarity === 'Rare' ? 'border-amber-500 text-amber-600' :
                        'border-teal-500 text-teal-600'
                      }`}
                    >
                      {bird.rarity}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{bird.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-3">{bird.description}</p>
                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <TreePine className="w-3 h-3 mr-2" />
                      {bird.habitat}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-2" />
                      {bird.bestTime}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Prime Birding Locations */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Prime <span className="bg-gradient-to-r from-teal-600 to-teal-600 bg-clip-text text-transparent">Birding Locations</span>
            </h2>
            <p className="text-lg text-gray-600">
              Explore Bhutan's diverse ecosystems from subtropical forests to alpine meadows
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {birdingLocations.map((location, index) => (
              <Card key={index} className="card-modern">
                <CardHeader>
                  <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-teal-600" />
                  </div>
                  <CardTitle className="text-center text-lg">{location.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 text-sm mb-4">{location.description}</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-center text-teal-600">
                      <Bird className="w-3 h-3 mr-1" />
                      {location.species}
                    </div>
                    <div className="flex items-center justify-center text-gray-500">
                      <Mountain className="w-3 h-3 mr-1" />
                      {location.elevation}
                    </div>
                    <div className="flex items-center justify-center text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {location.bestTime}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bird Watching Tours */}
      <section className="py-16 bg-gradient-to-br from-white to-teal-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Bird Watching Tour Packages ({birdWatchingTours.length})
            </h2>
          </div>

          {birdWatchingTours.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {birdWatchingTours.map((tour) => (
                <Card key={tour.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group card-modern">
                  <div className="relative">
                    <img
                      src={tour.imageUrl}
                      alt={tour.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-teal-600 to-teal-600 text-white">
                      Bird Watching
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
                        <Binoculars className="w-4 h-4 mr-1 text-teal-600" />
                        Expert Guide
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
                          <Button variant="outline" size="sm" className="border-teal-600 text-teal-600 hover:bg-emerald-50">
                            View Details
                          </Button>
                        </Link>
                        <Button 
                          size="sm" 
                          onClick={() => handleBookNow(tour)}
                          className="bg-gradient-to-r from-teal-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
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
              <Bird className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Specialized Bird Watching Tours Coming Soon</h3>
              <p className="text-gray-500 mb-6">We're developing dedicated bird watching tours. Contact us for custom birding experiences.</p>
              <Link to="/custom-tour">
                <Button className="bg-gradient-to-r from-teal-600 to-teal-600 text-white">
                  Request Custom Birding Tour
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Birding Equipment & Tips */}
      <section className="py-16 bg-gradient-to-r from-emerald-900 via-teal-900 to-green-900 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Birding Equipment & Tips</h2>
            <p className="text-xl text-emerald-50 max-w-3xl mx-auto">
              Essential gear and expert tips for successful bird watching in Bhutan's diverse habitats
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <Binoculars className="w-12 h-12 text-amber-300 mb-4" />
                <CardTitle>Essential Equipment</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-emerald-100">
                  <li>• High-quality binoculars (8x42)</li>
                  <li>• Spotting scope for distant birds</li>
                  <li>• Field guide to Himalayan birds</li>
                  <li>• Notebook for observations</li>
                  <li>• Camera with telephoto lens</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <Eye className="w-12 h-12 text-amber-300 mb-4" />
                <CardTitle>Birding Techniques</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-emerald-100">
                  <li>• Early morning is best (5-9 AM)</li>
                  <li>• Move slowly and quietly</li>
                  <li>• Listen for bird calls</li>
                  <li>• Use playback sparingly</li>
                  <li>• Focus on habitat edges</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <Award className="w-12 h-12 text-amber-300 mb-4" />
                <CardTitle>Conservation Ethics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-emerald-100">
                  <li>• Maintain safe distances</li>
                  <li>• Don't disturb nesting birds</li>
                  <li>• Stay on designated trails</li>
                  <li>• Report rare sightings</li>
                  <li>• Support local conservation</li>
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