import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Users, Star, ArrowRight } from "lucide-react";
import type { Festival } from "@shared/schema";

export default function UpcomingEventsSection() {
  const { data: festivals = [] } = useQuery<Festival[]>({
    queryKey: ["/api/festivals"],
  });

  // Filter upcoming festivals (events that haven't ended yet)
  const upcomingFestivals = festivals
    .filter(festival => new Date(festival.endDate) >= new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 4);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntil = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Ongoing";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    return `${diffDays} days`;
  };

  const getEventStatus = (startDate: string, endDate: string) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (today >= start && today <= end) return "ongoing";
    if (today < start) return "upcoming";
    return "past";
  };

  if (upcomingFestivals.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="brand-section-header mb-6">
            <Calendar className="w-5 h-5" />
            Upcoming Events
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Sacred Festivals &
            <span className="gradient-text"> Cultural Events</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience Bhutan's vibrant cultural calendar with authentic festivals, 
            traditional ceremonies, and spiritual celebrations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {upcomingFestivals.map((festival) => {
            const status = getEventStatus(festival.startDate, festival.endDate);
            const daysUntil = getDaysUntil(festival.startDate);
            
            return (
              <Card key={festival.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-teal-100 group">
                <div className="relative">
                  <img 
                    src={festival.imageUrl} 
                    alt={festival.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge 
                      className={`${
                        status === 'ongoing' 
                          ? 'bg-green-600 text-white' 
                          : status === 'upcoming'
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-600 text-white'
                      }`}
                    >
                      {status === 'ongoing' ? 'Live Now' : daysUntil}
                    </Badge>
                    <Badge variant="outline" className="bg-white/90 text-gray-700">
                      {festival.category}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gray-900 group-hover:text-teal-600 transition-colors">
                    {festival.name}
                  </CardTitle>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {festival.location}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        {formatDate(festival.startDate)} - {formatDate(festival.endDate)}
                      </span>
                    </div>
                    
                    {festival.maxCapacity && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span>Max {festival.maxCapacity} attendees</span>
                      </div>
                    )}
                    
                    {festival.ticketPrice && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Entry Fee:</span>
                        <span className="font-semibold text-teal-600">${festival.ticketPrice}</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {festival.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Link to={`/festivals/info/${festival.id}`}>
                      <Button 
                        size="sm" 
                        className="bg-teal-600 hover:bg-teal-700 text-white"
                      >
                        Learn More
                      </Button>
                    </Link>
                    {status === 'ongoing' && (
                      <Badge className="bg-green-100 text-green-800 animate-pulse">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        Live
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Festival Highlights */}
        <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl p-8 shadow-lg border border-teal-100">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Year-Round Celebrations</h3>
              <p className="text-sm text-gray-600">
                Experience authentic Bhutanese festivals throughout the year with traditional dances and ceremonies.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Cultural Immersion</h3>
              <p className="text-sm text-gray-600">
                Join locals in sacred rituals, witness masked dances, and receive blessings from monks.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Small Group Experience</h3>
              <p className="text-sm text-gray-600">
                Limited capacity ensures intimate experiences and meaningful cultural exchanges.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/festivals">
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
              View All Festivals
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}