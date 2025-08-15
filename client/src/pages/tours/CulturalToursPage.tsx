import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TourCard from "@/components/TourCard";
import { BookNowFormLauncher } from "@/components/FormLauncher";
import EnhancedInteractiveForm from "@/components/EnhancedInteractiveForm";
import { 
  Award, Calendar, Users, Star, MapPin, Clock,
  Crown, Heart, Camera, Book, Music, Palette,
  Filter, ChevronDown, DollarSign, ArrowUpDown
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Tour } from "@shared/schema";

export default function CulturalToursPage() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isBookNowFormOpen, setIsBookNowFormOpen] = useState(false);
  const [isCustomTourFormOpen, setIsCustomTourFormOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  
  // Filter states
  const [selectedDuration, setSelectedDuration] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");

  const { data: tours = [] } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });

  // Filter and sort tours
  const filteredAndSortedTours = useMemo(() => {
    let filtered = tours.filter(tour => tour.category === "Cultural");
    
    // Duration filter
    if (selectedDuration !== "all") {
      switch (selectedDuration) {
        case "short":
          filtered = filtered.filter(tour => tour.duration && tour.duration <= 3);
          break;
        case "medium":
          filtered = filtered.filter(tour => tour.duration && tour.duration >= 4 && tour.duration <= 7);
          break;
        case "long":
          filtered = filtered.filter(tour => tour.duration && tour.duration >= 8);
          break;
      }
    }
    
    // Price range filter
    if (selectedPriceRange !== "all") {
      switch (selectedPriceRange) {
        case "budget":
          filtered = filtered.filter(tour => tour.price && tour.price < 2000);
          break;
        case "mid":
          filtered = filtered.filter(tour => tour.price && tour.price >= 2000 && tour.price < 4000);
          break;
        case "luxury":
          filtered = filtered.filter(tour => tour.price && tour.price >= 4000);
          break;
      }
    }
    
    // Difficulty filter
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(tour => tour.difficulty === selectedDifficulty);
    }
    
    // Sort
    switch (sortBy) {
      case "price-low":
        filtered = filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        filtered = filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "duration-short":
        filtered = filtered.sort((a, b) => (a.duration || 0) - (b.duration || 0));
        break;
      case "duration-long":
        filtered = filtered.sort((a, b) => (b.duration || 0) - (a.duration || 0));
        break;
      case "rating":
        filtered = filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default: // featured
        // Keep original order for featured
        break;
    }
    
    return filtered;
  }, [tours, selectedDuration, selectedPriceRange, selectedDifficulty, sortBy]);

  const handleBookNow = (tour: Tour) => {
    setSelectedTour(tour);
    setIsBookNowFormOpen(true);
  };
  
  const clearAllFilters = () => {
    setSelectedDuration("all");
    setSelectedPriceRange("all");
    setSelectedDifficulty("all");
    setSortBy("featured");
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

        {/* Filter Controls */}
        <div className="mb-12">
          <Card className="p-6 bg-gradient-to-r from-white to-teal-50 border-teal-200">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-teal-600" />
                <span className="font-semibold text-gray-900">Filter Tours:</span>
              </div>
              
              <div className="flex flex-wrap gap-4 flex-1">
                {/* Duration Filter */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Any duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any duration</SelectItem>
                      <SelectItem value="short">1-3 days</SelectItem>
                      <SelectItem value="medium">4-7 days</SelectItem>
                      <SelectItem value="long">8+ days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Price Range Filter */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Any price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any price</SelectItem>
                      <SelectItem value="budget">Under $2,000</SelectItem>
                      <SelectItem value="mid">$2,000 - $4,000</SelectItem>
                      <SelectItem value="luxury">$4,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Difficulty Filter */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Any level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any level</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="challenging">Challenging</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Sort By */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Featured" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="duration-short">Duration: Short to Long</SelectItem>
                      <SelectItem value="duration-long">Duration: Long to Short</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={clearAllFilters}
                  className="border-teal-200 text-teal-700 hover:bg-teal-50"
                >
                  Clear Filters
                </Button>
                <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                  {filteredAndSortedTours.length} tours
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Tours Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Cultural Tour Packages ({filteredAndSortedTours.length})
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedTours.map((tour) => (
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
                      <Link to={`/tours/${tour.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        onClick={() => handleBookNow(tour)}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
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
              <Button 
                onClick={() => setIsCustomTourFormOpen(true)}
                className="bg-white text-teal-700 hover:bg-teal-50 hover:text-teal-800 font-semibold px-8 py-3 shadow-lg border-2 border-white transform hover:scale-105 transition-all duration-200"
              >
                <Award className="w-5 h-5 mr-2" />
                Customize Tour
              </Button>
              <Button 
                onClick={() => setIsContactFormOpen(true)}
                className="border-2 border-white text-white hover:bg-white hover:text-teal-700 font-semibold px-8 py-3 shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Heart className="w-5 h-5 mr-2" />
                Contact Expert
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <BookNowFormLauncher
        isOpen={isBookNowFormOpen}
        onClose={() => setIsBookNowFormOpen(false)}
        selectedTour={selectedTour}
      />
      
      {/* Custom Tour Form */}
      {isCustomTourFormOpen && (
        <EnhancedInteractiveForm
          formType="custom-tour"
          isOpen={isCustomTourFormOpen}
          onClose={() => setIsCustomTourFormOpen(false)}
          initialData={{}}
          onSubmitSuccess={(data) => {
            console.log("Custom tour request submitted:", data);
            setIsCustomTourFormOpen(false);
          }}
        />
      )}
      
      {/* Contact Form */}
      {isContactFormOpen && (
        <EnhancedInteractiveForm
          formType="contact"
          isOpen={isContactFormOpen}
          onClose={() => setIsContactFormOpen(false)}
          initialData={{}}
          onSubmitSuccess={(data) => {
            console.log("Contact request submitted:", data);
            setIsContactFormOpen(false);
          }}
        />
      )}
    </div>
  );
}