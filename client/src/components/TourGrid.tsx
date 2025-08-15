import { useState } from "react";
import { Star, Clock, Users, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import type { Tour } from "@shared/schema";

interface TourGridProps {
  tours: Tour[];
  onBookNow: (tour: Tour) => void;
  showAll?: boolean;
}

export default function TourGrid({ tours, onBookNow, showAll = false }: TourGridProps) {
  const displayTours = showAll ? tours : tours.slice(0, 6);

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'cultural': return 'bg-teal-600';
      case 'adventure': return 'bg-amber-600';
      case 'spiritual': return 'bg-teal-600';
      case 'luxury': return 'bg-amber-600';
      case 'cycling': return 'bg-teal-600';
      case 'pilgrimage': return 'bg-amber-600';
      case 'wellness': return 'bg-emerald-600';
      case 'photography': return 'bg-teal-600';
      case 'budget': return 'bg-emerald-600';
      case 'family': return 'bg-teal-600';
      case 'custom': return 'bg-amber-600';
      case 'classic': return 'bg-teal-600';
      default: return 'bg-gray-600';
    }
  };

  if (tours.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <MapPin className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No tours found</h3>
        <p className="text-gray-600">Try adjusting your search or filters to find more tours.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayTours.map((tour) => (
        <Card key={tour.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-teal-100">
          <div className="relative">
            <img
              src={tour.imageUrl}
              alt={tour.name}
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <Badge className={`absolute top-4 left-4 ${getCategoryColor(tour.category)} text-white border-0`}>
              {tour.category}
            </Badge>
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {tour.duration}d
            </div>
          </div>
          
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
              {tour.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {tour.description}
            </p>
            
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                Max {tour.maxGroupSize || 12}
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-amber-400 fill-current" />
                {tour.rating || 5.0}
              </div>
            </div>
            
            {tour.highlights && tour.highlights.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tour.highlights.slice(0, 2).map((highlight, index) => (
                  <Badge key={index} variant="outline" className="text-xs border-teal-200 text-teal-700">
                    {highlight}
                  </Badge>
                ))}
                {tour.highlights.length > 2 && (
                  <Badge variant="outline" className="text-xs border-gray-200 text-gray-500">
                    +{tour.highlights.length - 2} more
                  </Badge>
                )}
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  ${tour.price?.toLocaleString() || '0'}
                </span>
                <span className="text-gray-500 text-sm ml-1">per person</span>
              </div>
              <div className="flex gap-2">
                <Link to={`/tours/${tour.id}`}>
                  <Button variant="outline" size="sm" className="border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300 transition-all duration-200">
                    <ArrowRight className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">Details</span>
                  </Button>
                </Link>
                <Button 
                  size="sm" 
                  onClick={() => onBookNow(tour)}
                  className="bg-teal-600 hover:bg-teal-700 text-white flex-1 sm:flex-initial"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
