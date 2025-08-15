import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FestivalBookingFormLauncher } from "@/components/FormLauncher";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, Heart, MapPin, Star, Ticket, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Festival {
  id: number;
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  category: string;
  highlights: string[];
  isActive: boolean;
  ticketPrice: number | null;
  maxCapacity: number | null;
}

export default function FestivalsPage() {
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [isFestivalBookingFormOpen, setIsFestivalBookingFormOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const { data: festivals = [], isLoading } = useQuery<Festival[]>({
    queryKey: ["/api/festivals"],
  });

  const filteredFestivals = festivals.filter(festival => 
    categoryFilter === "all" || festival.category === categoryFilter
  );

  const categories = [
    { value: "all", label: "All Festivals" },
    { value: "religious", label: "Religious" },
    { value: "cultural", label: "Cultural" },
    { value: "seasonal", label: "Seasonal" },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };


  const openBookingModal = (festival: Festival) => {
    setSelectedFestival(festival);
    setIsFestivalBookingFormOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-light-gradient py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading festivals...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold brand-heading mb-4">
            Sacred Festivals of Bhutan
          </h1>
          <p className="text-xl brand-body max-w-3xl mx-auto">
            Immerse yourself in Bhutan's most sacred celebrations where ancient Buddhist traditions come alive through colorful mask dances, spiritual ceremonies, and community gatherings that have remained unchanged for centuries. Each festival offers a unique window into the soul of the Last Shangri-La.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={categoryFilter === category.value ? "default" : "outline"}
              onClick={() => setCategoryFilter(category.value)}
              className="mb-2"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Festivals Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredFestivals.map((festival) => (
            <Card key={festival.id} className="brand-card overflow-hidden">
              <div className="relative">
                <img
                  src={festival.imageUrl}
                  alt={festival.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge 
                    variant={festival.category === 'religious' ? 'default' : 
                            festival.category === 'cultural' ? 'secondary' : 'outline'}
                  >
                    {festival.category}
                  </Badge>
                </div>
                {festival.ticketPrice && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                    <span className="text-sm font-semibold text-green-600">
                      ${festival.ticketPrice}
                    </span>
                  </div>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl brand-heading">{festival.name}</CardTitle>
                <CardDescription className="line-clamp-2 brand-body">
                  {festival.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm brand-body">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {formatDate(festival.startDate)} - {formatDate(festival.endDate)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm brand-body">
                    <Clock className="w-4 h-4" />
                    <span>{calculateDuration(festival.startDate, festival.endDate)} days</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm brand-body">
                    <MapPin className="w-4 h-4" />
                    <span>{festival.location}</span>
                  </div>
                  
                  {festival.maxCapacity && (
                    <div className="flex items-center gap-2 text-sm brand-body">
                      <Users className="w-4 h-4" />
                      <span>Max {festival.maxCapacity} attendees</span>
                    </div>
                  )}
                </div>

                {festival.highlights.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2 brand-heading">Highlights:</h4>
                    <div className="flex flex-wrap gap-1">
                      {festival.highlights.slice(0, 3).map((highlight, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                      {festival.highlights.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{festival.highlights.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Link to={`/festivals/info/${festival.id}`} className="flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full btn-brand-outline"
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    onClick={() => openBookingModal(festival)}
                    className="flex-1 btn-brand-primary"
                  >
                    <Ticket className="w-4 h-4 mr-1" />
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFestivals.length === 0 && (
          <div className="text-center py-12">
            <p className="brand-body">No festivals found for the selected category.</p>
          </div>
        )}
      </div>

      {/* Festival Booking Form */}
      <FestivalBookingFormLauncher
        isOpen={isFestivalBookingFormOpen}
        onClose={() => setIsFestivalBookingFormOpen(false)}
        selectedFestival={selectedFestival}
      />
    </div>
  );
}
