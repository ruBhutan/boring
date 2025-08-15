import { useState } from "react";
import { Star, Heart, Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import type { Tour } from "@shared/schema";
import TourDetailsModal from "./TourDetailsModal";

interface TourCardProps {
  tour: Tour;
  onBookNow: (tour: Tour) => void;
}

export default function TourCard({ tour, onBookNow }: TourCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'cultural': return 'bg-emerald-600';
      case 'adventure': return 'bg-amber-600';
      case 'spiritual': return 'bg-purple-600';
      case 'luxury': return 'bg-amber-600';
      case 'cycling': return 'bg-emerald-600';
      case 'pilgrimage': return 'bg-amber-600';
      case 'wellness': return 'bg-emerald-600';
      case 'photography': return 'bg-emerald-600';
      case 'budget': return 'bg-emerald-600';
      case 'family': return 'bg-emerald-600';
      case 'custom': return 'bg-amber-600';
      case 'classic': return 'bg-emerald-600';
      default: return 'bg-gray-600';
    }
  };

  const getCategoryLabel = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'challenging': return 'bg-orange-100 text-orange-800';
      case 'difficult': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-emerald-200 transform hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={tour.imageUrl}
          alt={tour.name}
          className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Category Badge */}
        <div className={`absolute top-4 left-4 ${getCategoryColor(tour.category)} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm`}>
          {getCategoryLabel(tour.category)}
        </div>
        
        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Heart className={`w-5 h-5 transition-colors duration-300 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-500'}`} />
        </button>
        
        {/* Duration Badge */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-600" />
          {tour.duration} days
        </div>
        
        {/* Max Group Size */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-600" />
          Max {tour.maxGroupSize}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors line-clamp-2">
          {tour.name}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {tour.description}
        </p>
        
        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex text-amber-400 mr-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(tour.rating)
                    ? "fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-gray-600 text-sm font-medium">({tour.reviewCount} reviews)</span>
        </div>
        
        {/* Highlights */}
        {tour.highlights && tour.highlights.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tour.highlights.slice(0, 3).map((highlight, index) => (
              <Badge key={index} variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-medium">
                {highlight}
              </Badge>
            ))}
          </div>
        )}
        
        {/* Difficulty & Best Season */}
        <div className="flex items-center gap-4 mb-6 text-sm">
          {tour.difficulty && (
            <div className={`px-3 py-1 rounded-full font-medium ${getDifficultyColor(tour.difficulty)}`}>
              {tour.difficulty}
            </div>
          )}
          {tour.bestSeason && (
            <div className="flex items-center gap-1 text-gray-600">
              <Calendar className="w-4 h-4" />
              {tour.bestSeason}
            </div>
          )}
        </div>
        
        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-3xl font-bold text-gray-900">${tour.price.toLocaleString()}</span>
            <span className="text-gray-600 text-sm ml-1">per person</span>
          </div>
          <div className="flex gap-3">
            <Link to={`/tours/${tour.id}`} className="flex-1" onClick={(e) => {
              console.log('Link clicked, navigating to tour:', tour.id, tour.name);
              // Ensure the link works by preventing any potential event issues
              e.stopPropagation();
            }}>
              <Button 
                variant="outline" 
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300 w-full"
              >
                Details
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button
              onClick={() => onBookNow(tour)}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex-1"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
      
      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      
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
