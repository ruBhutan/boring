import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FestivalBookingFormLauncher } from "@/components/FormLauncher";
import { 
  ArrowLeft, Calendar, Clock, Users, MapPin, Star, 
  CheckCircle, X, Camera, Heart, Share2, Home, Utensils, Car
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Festival } from "@shared/schema";

export default function FestivalInfoPage() {
  const params = useParams();
  const [isBookNowFormOpen, setIsBookNowFormOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const festivalId = params?.id;

  const { data: festival, isLoading } = useQuery<Festival>({
    queryKey: [`/api/festivals/${festivalId}`],
    enabled: !!festivalId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 bg-gradient-to-br from-teal-50 to-emerald-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading festival details...</div>
        </div>
      </div>
    );
  }

  if (!festival) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 bg-gradient-to-br from-teal-50 to-emerald-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Festival Not Found</h1>
          <Link to="/festivals">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Festivals
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const festivalImages = [
    festival.imageUrl,
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 bg-gradient-to-br from-teal-50 to-emerald-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/festivals">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Festivals
            </Button>
          </Link>
        </div>

        {/* Festival Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={festivalImages[selectedImageIndex]}
                alt={festival.name}
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-gradient-to-r from-pink-600 to-rose-600 text-white">
                  {festival.category}
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
              {festivalImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${festival.name} ${index + 1}`}
                  className={`w-full h-20 object-cover rounded-lg cursor-pointer transition-all ${
                    selectedImageIndex === index 
                      ? 'ring-2 ring-pink-500 opacity-100' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Festival Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{festival.name}</h1>
              <p className="text-xl text-gray-600 leading-relaxed">{festival.description}</p>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                <MapPin className="w-6 h-6 text-rose-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-semibold text-gray-900">{festival.location}</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                <Calendar className="w-6 h-6 text-pink-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-semibold text-gray-900">{new Date(festival.startDate).toLocaleDateString()} - {new Date(festival.endDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                <Users className="w-6 h-6 text-rose-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Capacity</p>
                  <p className="font-semibold text-gray-900">{festival.maxCapacity ? `${festival.maxCapacity} people` : 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                <Clock className="w-6 h-6 text-pink-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-semibold text-gray-900">{festival.category}</p>
                </div>
              </div>
            </div>

            {/* Pricing & Booking */}
            <Card className="p-6 bg-gradient-to-r from-pink-50 to-rose-50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-3xl font-bold text-gray-900">${festival.ticketPrice?.toLocaleString() || 'Free'}</p>
                  <p className="text-gray-600">per person</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 text-white"
                  onClick={() => setIsBookNowFormOpen(true)}
                >
                  Book This Festival
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Detailed Information */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="highlights">Highlights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About the Festival</h3>
              <p className="text-gray-700">{festival.description}</p>
            </Card>
          </TabsContent>

          <TabsContent value="highlights" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Festival Highlights</h3>
                <div className="space-y-3">
                  {Array.isArray(festival.highlights) && festival.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-rose-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </Card>
          </TabsContent>
        </Tabs>
      </div>

      <FestivalBookingFormLauncher
        isOpen={isBookNowFormOpen}
        onClose={() => setIsBookNowFormOpen(false)}
        selectedFestival={festival}
      />
    </div>
  );
}
