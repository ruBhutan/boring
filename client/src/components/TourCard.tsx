import { useState } from "react";
import { Star, Heart, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import type { Tour } from "@shared/schema";
import TourDetailsModal from "./TourDetailsModal";

interface TourCardProps {
  tour: Tour;
  onBookNow: (tour: Tour) => void;
}

export default function TourCard({ tour, onBookNow }: TourCardProps) {
  const [showDetails, setShowDetails] = useState(false);
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

  const getCategoryLabel = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="brand-card card-hover overflow-hidden group">
      <div className="relative">
        <img
          src={tour.imageUrl}
          alt={tour.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className={`absolute top-4 left-4 ${getCategoryColor(tour.category)} text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg`}>
          {getCategoryLabel(tour.category)}
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors cursor-pointer teal-glow">
          <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
        </div>
        <div className="absolute bottom-4 left-4 bg-teal-gradient text-white px-3 py-1 rounded-full text-sm flex items-center shadow-teal">
          <Calendar className="w-4 h-4 mr-1" />
          {tour.duration}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors brand-heading">
          {tour.name}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3 brand-body">
          {tour.description}
        </p>
        
        <div className="flex items-center mb-4">
          <div className="flex text-amber-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(tour.rating)
                    ? "fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-gray-600 text-sm">({tour.reviewCount} reviews)</span>
        </div>
        
        {tour.highlights && tour.highlights.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tour.highlights.slice(0, 3).map((highlight, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {highlight}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-3xl font-bold text-gray-900">${tour.price}</span>
            <span className="text-gray-600 text-sm ml-1">per person</span>
          </div>
          <div className="flex gap-2">
            <Link href={`/tours/${tour.id}`}>
              <Button className="btn-teal-outline">
                View Details
              </Button>
            </Link>
            <Button
              onClick={() => onBookNow(tour)}
              className="btn-teal"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
      
      {/* Tour Details Modal */}
      <TourDetailsModal
        tour={tour}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        onBookNow={onBookNow}
      />
    </div>
  );
}
