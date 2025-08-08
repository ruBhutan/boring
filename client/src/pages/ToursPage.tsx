import BookingModal from "@/components/BookingModal";
import TourGrid from "@/components/TourGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TOUR_FILTER_CATEGORIES } from "@/lib/tourCategories";
import type { Tour } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Map, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";



export default function ToursPage() {
  const [location] = useLocation();
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: tours = [], isLoading } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
      setActiveFilter(categoryParam);
    }
  }, [location]);

  const filteredTours = tours.filter(tour => {
    const matchesFilter = activeFilter === "all" || tour.category.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch = tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleBookNow = (tour: Tour) => {
    setSelectedTour(tour);
    setIsBookingModalOpen(true);
  };

  const getCategoryColor = (category: string) => {
    const cat = TOUR_FILTER_CATEGORIES.find(c => c.value === category);
    return cat?.color || 'bg-gray-600';
  };

  return (
    <div className="pt-20 pb-20 bg-gradient-to-br from-teal-50 to-emerald-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="brand-section-header mb-4">
            <Map className="w-5 h-5" />
            Packages
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 brand-heading mb-4 brand-heading">
            Discover
            <span className="gradient-text"> Bhutan</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto brand-body brand-body">
            Choose from our carefully curated selection of transformative journeys through 
            the Last Shangri-La, each designed to create unforgettable memories.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search tours..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {TOUR_FILTER_CATEGORIES.map((category) => (
              <Button
                key={category.value}
                onClick={() => setActiveFilter(category.value)}
                className={activeFilter === category.value ? "btn-teal" : "btn-teal-outline"}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Tour Count and Custom Package */}
        <div className="mb-8 flex justify-between items-center">
          <p className="text-gray-600">
            Showing {filteredTours.length} of {tours.length} tours
          </p>
          <Link href="/custom-tour">
            <Button className="btn-teal-outline">
              Custom Package
            </Button>
          </Link>
        </div>

        {/* Tours Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-teal-50 rounded-2xl shadow-lg bg-gradient-to-br from-white to-teal-50 animate-pulse">
                <div className="h-48 bg-gray-300 rounded-t-2xl"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <TourGrid 
            tours={filteredTours} 
            onBookNow={handleBookNow} 
            showAll={true}
          />
        )}

        {/* Why Choose Us Section */}
        <section className="mt-20 brand-card-teal p-8 lg:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 brand-heading">Why Choose Our Package?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto brand-body">
              Every journey with us is more than just a tour—it's a transformation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-teal-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-teal-600 font-bold text-xl">7+</span>
              </div>
              <h3 className="font-semibold text-gray-700 mb-2">Years Experience</h3>
              <p className="text-gray-600 text-sm">Deep local knowledge and expertise</p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-teal-600 font-bold text-xl">100%</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Local Guides</h3>
              <p className="text-gray-600 text-sm">Authentic insights from Bhutanese experts</p>
            </div>
            
            <div className="text-center">
              <div className="bg-amber-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-amber-600 font-bold text-xl">500+</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Happy Travelers</h3>
              <p className="text-gray-600 text-sm">Transformed lives and lasting memories</p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-teal-600 font-bold text-xl">24/7</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
              <p className="text-gray-600 text-sm">We're with you every step of the way</p>
            </div>
          </div>
        </section>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        tour={selectedTour}
      />
    </div>
  );
}
