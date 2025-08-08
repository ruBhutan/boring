import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Hero from "@/components/Hero";
import TourGrid from "@/components/TourGrid";
import BookingModal from "@/components/BookingModal";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Award, Calendar, Compass } from "lucide-react";
import { TOUR_CATEGORIES } from "@/lib/constants";
import { FeaturedToursSection, FestivalCalendarSection, LuxuryAccommodationsSection, ExpertGuidesSection } from "@/components/PremiumFeaturesSection";
import { TrustIndicatorsSection, ReviewsSection } from "@/components/TrustIndicators";
import { AuthenticToursSection, BhutanDestinationsSection, BhutanCultureSection } from "@/components/AuthenticToursSection";
import { BhutanVisaSection, BhutanLifestyleSection, HotStoneBathSection, BhutanRaftingSection } from "@/components/BhutanInfoHub";
import UpcomingEventsSection from "@/components/UpcomingEventsSection";
import type { Tour, Testimonial } from "@shared/schema";

export default function HomePage() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [experienceType, setExperienceType] = useState("all");

  const { data: tours = [] } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });

  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });



  const filteredTours = tours.filter(tour => {
    const categoryMatch = activeFilter === "all" || tour.category.toLowerCase() === activeFilter.toLowerCase();
    const experienceMatch = experienceType === "all" || 
      (experienceType === "curated" && tour.featured) ||
      (experienceType === "authentic" && !tour.featured);
    return categoryMatch && experienceMatch;
  });

  const handleBookNow = (tour: Tour) => {
    setSelectedTour(tour);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="pt-16">
      <Hero />
      
      {/* Destination Highlights - New section inspired by top tourism sites */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-teal-100 text-teal-800 px-4 py-2">
              🏞️ Iconic Destinations
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Must-Visit
              <span className="gradient-text"> Destinations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore Bhutan's most breathtaking locations, each offering unique experiences and unforgettable memories.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop" 
                alt="Tiger's Nest Monastery" 
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Tiger's Nest</h3>
                <p className="text-gray-200 mb-4">Sacred monastery perched on cliff</p>
                <Link href="/tours">
                  <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30">
                    Explore Tours
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&h=600&fit=crop" 
                alt="Himalayan Landscapes" 
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Himalayan Peaks</h3>
                <p className="text-gray-200 mb-4">Majestic mountain adventures</p>
                <Link href="/tours">
                  <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30">
                    View Treks
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop" 
                alt="Cultural Festivals" 
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Cultural Festivals</h3>
                <p className="text-gray-200 mb-4">Vibrant traditional celebrations</p>
                <Link href="/festivals">
                  <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30">
                    See Festivals
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Packages Section - Enhanced */}
      <section id="tours" className="py-20 section-teal-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-teal-100 text-teal-800 px-4 py-2">
              🎨 Curated Experiences
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 brand-heading">
              Transformative
              <span className="gradient-text"> Journeys</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto brand-body">
              Carefully crafted experiences that blend adventure, culture, and spiritual discovery 
              in the heart of the Himalayas.
            </p>
            
            {/* Experience Type Filter */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <button
                onClick={() => setExperienceType("all")}
                className={`px-6 py-3 font-semibold transition-all duration-300 rounded-full ${
                  experienceType === "all" 
                    ? "bg-teal-600 text-white shadow-lg transform scale-105" 
                    : "border-2 border-teal-600 text-teal-600 hover:bg-teal-50"
                }`}
              >
                All Experiences
              </button>
              <button
                onClick={() => setExperienceType("curated")}
                className={`px-6 py-3 font-semibold transition-all duration-300 rounded-full flex items-center gap-2 ${
                  experienceType === "curated" 
                    ? "bg-teal-600 text-white shadow-lg transform scale-105" 
                    : "border-2 border-teal-600 text-teal-600 hover:bg-teal-50"
                }`}
              >
                🎨 Curated Experiences
              </button>
              <button
                onClick={() => setExperienceType("authentic")}
                className={`px-6 py-3 font-semibold transition-all duration-300 rounded-full flex items-center gap-2 ${
                  experienceType === "authentic" 
                    ? "bg-teal-600 text-white shadow-lg transform scale-105" 
                    : "border-2 border-teal-600 text-teal-600 hover:bg-teal-50"
                }`}
              >
                🏛️ Authentic Bhutan Experiences
              </button>
            </div>
          </div>
          
          {/* Enhanced filter buttons with icons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {TOUR_CATEGORIES.slice(0, 6).map((category) => (
              <Button
                key={category.value}
                variant={activeFilter === category.value ? "default" : "outline"}
                onClick={() => setActiveFilter(category.value)}
                className={`${activeFilter === category.value 
                  ? "bg-teal-600 text-white shadow-lg transform scale-105" 
                  : "border-teal-200 text-teal-700 hover:bg-teal-50 hover:border-teal-300"} 
                  transition-all duration-300 rounded-full px-6 py-2 font-medium`}
              >
                {category.label}
              </Button>
            ))}
          </div>
          
          <div className="text-center mb-12">
            <Link href="/tours">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full font-semibold">
                View All Categories
              </Button>
            </Link>
          </div>
          
          {/* Tour Cards Grid */}
          <TourGrid 
            tours={filteredTours} 
            onBookNow={handleBookNow} 
            showAll={false}
          />
        </div>
      </section>







      {/* Testimonials Section - Enhanced with social proof */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-amber-100 text-amber-800 px-4 py-2">
              ⭐ Traveler Reviews
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Stories from the
              <span className="gradient-text"> Heart</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-current" />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-700">4.9/5</span>
              <span className="text-gray-500">from 500+ reviews</span>
            </div>
          </div>
          
          {/* Featured Testimonial */}
          {testimonials.length > 0 && (
            <div className="bg-teal-gradient-light rounded-3xl p-8 shadow-teal-lg mb-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[0].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-amber-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-2xl md:text-3xl text-gray-700 mb-8 italic leading-relaxed font-light">
                  "{testimonials[0].text}"
                </blockquote>
                <div className="flex items-center justify-center">
                  <img
                    src={testimonials[0].imageUrl}
                    alt={testimonials[0].name}
                    className="w-16 h-16 rounded-full object-cover mr-4 ring-4 ring-white shadow-lg"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 text-lg">{testimonials[0].name}</div>
                    <div className="text-gray-500">{testimonials[0].country} • {testimonials[0].tripName}</div>
                    <div className="text-sm text-teal-600">{testimonials[0].duration}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Testimonials Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.slice(1, 4).map((testimonial) => (
              <div key={testimonial.id} className="bg-gradient-to-br from-white to-teal-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="flex text-amber-400 mr-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{testimonial.tripName}</span>
                </div>
                <blockquote className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </blockquote>
                <div className="flex items-center">
                  <img
                    src={testimonial.imageUrl}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.country}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <UpcomingEventsSection />

      {/* Featured Premium Sections - Streamlined */}
      <AuthenticToursSection />
      <TrustIndicatorsSection />

      {/* Quick Action Section - Inspired by top tourism sites */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Bhutan Adventure?
            </h2>
            <p className="text-xl text-teal-100 mb-8">
              Join hundreds of travelers who have discovered the magic of the Last Shangri-La with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tours">
                <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold shadow-xl">
                  <Compass className="w-5 h-5 mr-2" />
                  Browse All Tours
                </Button>
              </Link>
              <Link href="/custom-tour">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-teal-600 px-8 py-4 rounded-full font-semibold">
                  <Users className="w-5 h-5 mr-2" />
                  Plan Custom Trip
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        tour={selectedTour}
      />
    </div>
  );
}
