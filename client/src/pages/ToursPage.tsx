import { BookNowFormLauncher } from "@/components/FormLauncher";
import EnhancedInteractiveForm from "@/components/EnhancedInteractiveForm";
import TourGrid from "@/components/TourGrid";
import TourFilter from "@/components/TourFilter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TOUR_FILTER_CATEGORIES } from "@/lib/tourCategories";
import type { Tour } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { 
  Map, Search, Filter, Users, Star, Clock, DollarSign, 
  MapPin, Award, Shield, Headphones, CheckCircle2,
  TrendingUp, Calendar, Compass, Globe, Heart
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function ToursPage() {
  const location = useLocation();
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isBookNowFormOpen, setIsBookNowFormOpen] = useState(false);
  const [isCustomTourFormOpen, setIsCustomTourFormOpen] = useState(false);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data: tours = [], isLoading } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });

  useEffect(() => {
    if (tours.length > 0) {
      setFilteredTours(tours);
    }
  }, [tours]);

  const handleBookNow = (tour: Tour) => {
    setSelectedTour(tour);
    setIsBookNowFormOpen(true);
  };

  // Calculate statistics from tours
  const stats = {
    totalTours: tours.length,
    avgRating: tours.length ? (tours.reduce((sum, tour) => sum + (tour.rating || 0), 0) / tours.length).toFixed(1) : '0',
    priceRange: tours.length ? {
      min: Math.min(...tours.map(t => t.price)),
      max: Math.max(...tours.map(t => t.price))
    } : { min: 0, max: 0 },
    categories: [...new Set(tours.map(t => t.category))].length,
    destinations: [...new Set(tours.map(t => t.name.split(' ')[0]))].length
  };

  return (
    <div className="pt-20 pb-20 bg-brand-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Advanced Filter System */}
        <TourFilter 
          tours={tours} 
          onFilteredTours={setFilteredTours} 
        />

        {/* Results Header */}
        <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center space-x-4">
            <p className="text-brand-text font-medium">
              Showing <span className="text-brand-primary font-bold">{filteredTours.length}</span> of <span className="font-bold">{tours.length}</span> tours
            </p>
            {filteredTours.length !== tours.length && (
              <Badge variant="secondary" className="bg-brand-light text-brand-primary">
                Filtered results
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              onClick={() => setIsCustomTourFormOpen(true)}
              className="brand-btn-secondary"
            >
              <Heart className="w-4 h-4 mr-2" />
              <span>Create Custom Tour</span>
            </Button>
          </div>
        </div>

        {/* Tours Display */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-300"></div>
                <CardContent className="p-6 space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-8 bg-gray-300 rounded w-1/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredTours.length === 0 ? (
          <Card className="text-center py-16 brand-card">
            <CardContent>
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold brand-heading mb-2">No tours found</h3>
              <p className="brand-body mb-6">Try adjusting your filters or search terms</p>
              <Button 
                onClick={() => setIsCustomTourFormOpen(true)}
                className="brand-btn-primary"
              >
                Create Custom Tour Instead
              </Button>
            </CardContent>
          </Card>
        ) : (
          <TourGrid 
            tours={filteredTours} 
            onBookNow={handleBookNow} 
            showAll={true}
          />
        )}

        {/* Trust & Assurance Section */}
        <section className="mt-24 brand-card p-8 lg:p-16">
          <div className="text-center mb-16">
            <div className="brand-section-header mb-4">
              <Shield className="w-5 h-5" />
              Your Trust, Our Priority
            </div>
            <h2 className="text-3xl md:text-4xl font-bold brand-heading mb-6">Why 500+ Travelers Trust Us</h2>
            <p className="text-lg brand-body max-w-3xl mx-auto">
              Every journey with us is more than just a tour—it's a life-changing transformation 
              guided by local expertise, sustainable practices, and unwavering commitment to your experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-brand-gradient-primary rounded-2xl p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-xl">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold brand-heading mb-3 text-lg">10+ Years Experience</h3>
              <p className="brand-body text-sm leading-relaxed">Deep local knowledge and decade of expertise in crafting unforgettable Bhutanese experiences</p>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-brand-gradient-secondary rounded-2xl p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-xl">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold brand-heading mb-3 text-lg">100% Local Guides</h3>
              <p className="brand-body text-sm leading-relaxed">Authentic insights from certified Bhutanese guides who know every hidden gem and sacred story</p>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-brand-gradient-primary rounded-2xl p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-xl">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold brand-heading mb-3 text-lg">500+ Happy Travelers</h3>
              <p className="brand-body text-sm leading-relaxed">Transformed lives, lasting friendships, and memories that spark joy for years to come</p>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-brand-gradient-primary rounded-2xl p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-xl">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold brand-heading mb-3 text-lg">24/7 Support</h3>
              <p className="brand-body text-sm leading-relaxed">We're with you every step of the journey, from first inquiry to fond farewell</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-4 bg-white rounded-2xl p-2 shadow-lg">
              <Button 
                size="lg" 
                onClick={() => setIsCustomTourFormOpen(true)}
                className="brand-btn-primary rounded-xl px-8 py-4"
              >
                <Compass className="w-5 h-5 mr-2" />
                Plan Your Dream Journey
              </Button>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="brand-btn-outline rounded-xl px-8 py-4">
                  <Headphones className="w-5 h-5 mr-2" />
                  Talk to an Expert
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <BookNowFormLauncher
        isOpen={isBookNowFormOpen}
        onClose={() => setIsBookNowFormOpen(false)}
        selectedTour={selectedTour}
      />
      
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
    </div>
  );
}
