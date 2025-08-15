import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookNowFormLauncher, GetQuoteFormLauncher } from "@/components/FormLauncher";
import { 
  ArrowLeft, Calendar, Clock, Users, Mountain, Star, 
  CheckCircle, X, Camera, Heart, Share2, Home, Utensils, Car
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Tour } from "@shared/schema";

export default function TourDetailPage() {
  const params = useParams();
  const [isBookNowFormOpen, setIsBookNowFormOpen] = useState(false);
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const tourId = params?.id;
  
  console.log('TourDetailPage - tourId:', tourId, 'params:', params);

  const { data: tour, isLoading } = useQuery<Tour>({
    queryKey: [`/api/tours/${tourId}`],
    enabled: !!tourId,
  });

  const { data: similarTours = [] } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 bg-gradient-to-br from-teal-50 to-emerald-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading tour details...</div>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 bg-gradient-to-br from-teal-50 to-emerald-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tour Not Found</h1>
          <Link to="/tours">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Packages
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const similar = similarTours
    .filter(t => t.id !== tour.id && t.category === tour.category)
    .slice(0, 3);

  const tourImages = [
    tour.imageUrl,
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 bg-gradient-to-br from-teal-50 to-emerald-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/tours">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Packages
            </Button>
          </Link>
        </div>

        {/* Tour Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={tourImages[selectedImageIndex]}
                alt={tour.name}
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-gradient-to-r from-teal-600 to-green-600 text-white">
                  {tour.category}
                </Badge>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button size="sm" variant="secondary" className="bg-white/90">
                  <Camera className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="secondary" className="bg-white/90">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="secondary" className="bg-white/90">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {tourImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${tour.name} ${index + 1}`}
                  className={`w-full h-20 object-cover rounded-lg cursor-pointer transition-all ${
                    selectedImageIndex === index 
                      ? 'ring-2 ring-blue-500 opacity-100' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Tour Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{tour.name}</h1>
              <p className="text-xl text-gray-600 leading-relaxed">{tour.description}</p>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                <Clock className="w-6 h-6 text-teal-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-semibold text-gray-900">{tour.duration} days</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                <Users className="w-6 h-6 text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Group Size</p>
                  <p className="font-semibold text-gray-900">{tour.maxGroupSize || '2-12'} people</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                <Mountain className="w-6 h-6 text-amber-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Difficulty</p>
                  <p className="font-semibold text-gray-900">{tour.difficulty || 'Moderate'}</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                <Calendar className="w-6 h-6 text-teal-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Best Season</p>
                  <p className="font-semibold text-gray-900">{tour.bestSeason || 'Year-round'}</p>
                </div>
              </div>
            </div>

            {/* Pricing & Booking */}
            <Card className="p-6 bg-gradient-to-r from-teal-50 to-green-50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-3xl font-bold text-gray-900">${tour.price?.toLocaleString() || '0'}</p>
                  <p className="text-gray-600">per person</p>
                </div>
                {tour.rating && (
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-amber-400 fill-current mr-1" />
                    <span className="font-semibold">{tour.rating}</span>
                    <span className="text-gray-500 ml-1">({tour.reviewCount} reviews)</span>
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-gradient-to-r from-teal-600 to-green-600 text-white"
                  onClick={() => setIsBookNowFormOpen(true)}
                >
                  Book This Package
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-shrink-0"
                  onClick={() => setIsQuoteFormOpen(true)}
                >
                  Get Quote
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Detailed Information */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Tour Highlights</h3>
                <div className="space-y-3">
                  {Array.isArray(tour.highlights) && tour.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Package Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Category</span>
                    <Badge variant="secondary">{tour.category}</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold">{tour.duration} days</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Group Size</span>
                    <span className="font-semibold">{tour.maxGroupSize || '2-12'} people</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Difficulty Level</span>
                    <span className="font-semibold">{tour.difficulty || 'Moderate'}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600">Best Time</span>
                    <span className="font-semibold">{tour.bestSeason || 'Year-round'}</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="itinerary" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Day-by-Day Itinerary</h3>
              <div className="space-y-6">
                {Array.from({ length: tour.duration }, (_, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Day {index + 1}: {index === 0 ? 'Arrival in Paro' : 
                                         index === tour.duration - 1 ? 'Departure' : 
                                         `Explore ${tour.category} Sites`}
                      </h4>
                      <p className="text-gray-600 mb-3">
                        {index === 0 
                          ? 'Arrive at Paro International Airport. Meet your guide and transfer to hotel. Evening orientation and welcome dinner.'
                          : index === tour.duration - 1
                          ? 'Final breakfast and transfer to airport for departure. End of memorable Bhutan journey.'
                          : `Full day exploring ${tour.category.toLowerCase()} attractions and cultural sites. Includes guided tours, local interactions, and authentic experiences.`}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span className="flex items-center">
                          <Home className="w-4 h-4 mr-1" />
                          Hotel
                        </span>
                        <span className="flex items-center">
                          <Utensils className="w-4 h-4 mr-1" />
                          All Meals
                        </span>
                        <span className="flex items-center">
                          <Car className="w-4 h-4 mr-1" />
                          Transport
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="inclusions" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  What's Included
                </h3>
                <div className="space-y-3">
                  {Array.isArray(tour.includes) && tour.includes.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center text-red-600">
                  <X className="w-5 h-5 mr-2" />
                  What's Not Included
                </h3>
                <div className="space-y-3">
                  {Array.isArray(tour.excludes) && tour.excludes.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <X className="w-4 h-4 text-red-600 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Customer Reviews</h3>
                {tour.rating && (
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < Math.floor(tour.rating!) ? 'text-amber-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{tour.rating}/5</span>
                    <span className="text-gray-500 ml-1">({tour.reviewCount} reviews)</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-6">
                  <div className="flex items-center mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b830?w=40&h=40&fit=crop&crop=face"
                      alt="Reviewer"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">Sarah Johnson</p>
                      <div className="flex items-center">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">2 weeks ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    "Absolutely incredible experience! The tour was perfectly organized and our guide was knowledgeable and friendly. 
                    Bhutan exceeded all expectations - truly a magical destination."
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Similar Tours */}
        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Similar Packages</h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {similar.map((similarTour) => (
                <Card key={similarTour.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <img
                      src={similarTour.imageUrl}
                      alt={similarTour.name}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-teal-600 text-white">
                      {similarTour.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{similarTour.name}</CardTitle>
                    <p className="text-gray-600 text-sm line-clamp-2">{similarTour.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">${similarTour.price?.toLocaleString() || '0'}</span>
                        <span className="text-gray-500 ml-1">per person</span>
                      </div>
                      <Link to={`/tours/${similarTour.id}`}>
                        <Button size="sm">View Details</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <BookNowFormLauncher
        isOpen={isBookNowFormOpen}
        onClose={() => setIsBookNowFormOpen(false)}
        selectedTour={tour}
      />
      
      <GetQuoteFormLauncher
        isOpen={isQuoteFormOpen}
        onClose={() => setIsQuoteFormOpen(false)}
        selectedTour={tour}
      />
    </div>
  );
}