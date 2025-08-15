import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { Tour } from "@shared/schema";
import { EXPERT_GUIDES } from "@/data/premiumTours";
import { 
  Star, Calendar, MapPin, Users, Clock, Award, 
  Crown, Heart, Shield, Sparkles, TrendingUp,
  Camera, Mountain, TreePine, Compass, Gift
} from "lucide-react";

export function FeaturedToursSection() {
  const { data: tours = [] } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });
  
  // Get premium tours (luxury, custom, and high-rated tours)
  const featuredTours = tours
    .filter(tour => 
      tour.category === "Luxury" || 
      tour.category === "Custom" || 
      (tour.rating && tour.rating >= 4.8)
    )
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 3);

  return (
    <section className="py-20 bg-gradient-to-br from-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured <span className="gradient-text">Premium Package</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Handcrafted experiences that showcase the very best of Bhutan's culture, 
            landscapes, and spiritual heritage with unparalleled luxury and authenticity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {featuredTours.map((tour) => (
            <Card key={tour.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative">
                <img 
                  src={tour.imageUrl} 
                  alt={tour.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-teal-600 text-white">
                    {tour.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">
                    {tour.difficulty}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">{tour.name}</CardTitle>
                <p className="text-gray-600">{tour.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {tour.duration} days
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {tour.groupSize}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Tour Highlights:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {tour.highlights.slice(0, 3).map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Star className="w-3 h-3 text-teal-600 mt-0.5 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        ${tour.price.toLocaleString()}
                      </span>
                      <span className="text-gray-500 ml-1">per person</span>
                    </div>
                    <Link to={`/tours/${tour.id}`}>
                      <Button className="btn-primary">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/tours?category=luxury">
            <Button variant="outline" size="lg">
              View All Premium Package
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function FestivalCalendarSection() {
  const { data: festivals = [] } = useQuery({
    queryKey: ["/api/festivals"],
  });

  // Get featured festivals (next 3 upcoming)
  const featuredFestivals = festivals
    .filter((festival: any) => new Date(festival.startDate) > new Date())
    .sort((a: any, b: any) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 3);

  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="brand-section-header mb-6">
            <Calendar className="w-6 h-6" />
            Upcoming Festivals
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 brand-heading">
            <span className="gradient-text">Sacred Celebrations</span> 2025
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto brand-body">
            Join us for Bhutan's most vibrant spiritual celebrations where ancient traditions come alive 
            through colorful masked dances, sacred ceremonies, and community festivities that have remained 
            unchanged for centuries.
          </p>
        </div>

        {featuredFestivals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredFestivals.map((festival: any, index: number) => {
              const startDate = new Date(festival.startDate);
              const endDate = new Date(festival.endDate);
              const dateRange = `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
              
              return (
                <Card key={festival.id} className="overflow-hidden brand-card hover:shadow-xl transition-all duration-300 group">
                  <div className="relative">
                    <img 
                      src={festival.imageUrl} 
                      alt={festival.name}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg">
                        <Calendar className="w-3 h-3 mr-1" />
                        {dateRange}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-800 capitalize">
                        {festival.category}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">{festival.location}</span>
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900 brand-heading">{festival.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 text-sm brand-body line-clamp-3">{festival.description}</p>
                    
                    {festival.highlights && (
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-700">Festival Highlights:</p>
                        <ul className="space-y-1">
                          {festival.highlights.slice(0, 2).map((highlight: string, idx: number) => (
                            <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                              <Sparkles className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-sm text-gray-500">
                        {festival.ticketPrice ? `From $${festival.ticketPrice}` : 'Free Entry'}
                      </div>
                      <Link to={`/festivals/${festival.id}`}>
                        <Button size="sm" className="btn-teal">
                          <Gift className="w-4 h-4 mr-1" />
                          Plan Visit
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Upcoming Festivals</h3>
            <p className="text-gray-500 mb-6">Check back soon for upcoming festival announcements</p>
            <Link to="/festivals">
              <Button variant="outline">
                View Festival Calendar
              </Button>
            </Link>
          </div>
        )}

        <div className="text-center">
          <Link to="/festivals">
            <Button variant="outline" size="lg" className="btn-teal-outline">
              <Calendar className="w-5 h-5 mr-2" />
              View Complete Festival Calendar
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function LuxuryAccommodationsSection() {
  const { data: hotels = [] } = useQuery({
    queryKey: ["/api/hotels"],
  });

  // Get luxury hotels
  const luxuryHotels = hotels
    .filter((hotel: any) => hotel.category === "luxury" || hotel.starRating >= 4)
    .sort((a: any, b: any) => (b.starRating || 0) - (a.starRating || 0))
    .slice(0, 3);

  return (
    <section className="py-20 bg-gradient-to-br from-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="brand-section-header mb-6">
            <Crown className="w-6 h-6" />
            Premium Stays
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 brand-heading">
            Luxury <span className="gradient-text">Accommodations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto brand-body">
            Indulge in Bhutan's most distinguished hotels and lodges, where centuries-old 
            architectural traditions meet world-class luxury amenities, creating sanctuaries 
            of comfort in the heart of the Himalayas.
          </p>
        </div>

        {luxuryHotels.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {luxuryHotels.map((hotel: any, index: number) => (
              <Card key={hotel.id} className="overflow-hidden brand-card hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  <img 
                    src={hotel.imageUrl} 
                    alt={hotel.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg capitalize">
                      {hotel.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center bg-white/90 rounded-full px-2 py-1 shadow-lg">
                      {[...Array(hotel.starRating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Badge className="bg-green-600 text-white">
                      From ${hotel.pricePerNight}/night
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 brand-heading">{hotel.name}</CardTitle>
                  <p className="text-gray-600 flex items-center gap-1 brand-body">
                    <MapPin className="w-4 h-4" />
                    {hotel.location}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 line-clamp-2">{hotel.description}</p>
                  
                  {hotel.features && (
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-700">Key Features:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {hotel.features.slice(0, 3).map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Shield className="w-3 h-3 text-teal-600 mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>Check-in: {hotel.checkInTime}</span>
                    </div>
                    <Link to={`/hotels/${hotel.id}`}>
                      <Button size="sm" className="btn-teal">
                        <Crown className="w-4 h-4 mr-1" />
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Crown className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Luxury Hotels Available</h3>
            <p className="text-gray-500 mb-6">Check back soon for luxury accommodation options</p>
            <Link to="/hotels">
              <Button variant="outline">
                View All Hotels
              </Button>
            </Link>
          </div>
        )}

        <div className="text-center">
          <Link to="/hotels">
            <Button variant="outline" size="lg" className="btn-teal-outline">
              <Crown className="w-5 h-5 mr-2" />
              Explore All Accommodations
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ExpertGuidesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Meet Our <span className="gradient-text">Expert Guides</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our certified guides are born and raised in Bhutan, bringing authentic 
            cultural insight, warm hospitality, and deep knowledge of our kingdom's traditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EXPERT_GUIDES.map((guide, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <img 
                    src={guide.image} 
                    alt={guide.name}
                    className="w-full h-full object-cover rounded-full border-4 border-teal-100"
                  />
                  <div className="absolute -bottom-2 -right-2">
                    <Badge className="bg-green-600 text-white text-xs p-1">
                      <Award className="w-3 h-3" />
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-xl text-gray-900">{guide.name}</CardTitle>
                <p className="text-teal-600 font-medium">{guide.title}</p>
                <p className="text-sm text-gray-500">{guide.experience} Experience</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {guide.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Languages:</strong> {guide.languages.join(', ')}</p>
                    <p><strong>Certification:</strong> {guide.certification}</p>
                  </div>
                  
                  <p className="text-sm text-gray-600 italic">{guide.bio}</p>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    Request This Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}