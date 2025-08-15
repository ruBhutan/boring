import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import TourGrid from "@/components/TourGrid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Award, Calendar, Compass } from "lucide-react";
import { TOUR_CATEGORIES } from "@/lib/tourCategories";
import { TrustIndicatorsSection } from "@/components/TrustIndicators";
import { AuthenticToursSection } from "@/components/AuthenticToursSection";
import UpcomingEventsSection from "@/components/UpcomingEventsSection";
import { WhyChooseUsSection, BookingProcessSection } from "@/components/WhyChooseUs";
import { FloatingContactButton, SmartFormLauncher, BookNowFormLauncher } from "@/components/FormLauncher";
import EnhancedInteractiveForm from "@/components/EnhancedInteractiveForm";
import type { Tour, Testimonial } from "@shared/schema";

export default function HomePage() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isBookNowFormOpen, setIsBookNowFormOpen] = useState(false);
  const [isCustomTourFormOpen, setIsCustomTourFormOpen] = useState(false);
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
    setIsBookNowFormOpen(true);
  };

  return (
    <div className="pt-20">
      <Hero />
      
      {/* Tour Packages Section */}
      <section id="tours" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="brand-section-header">
              🎨 Curated Experiences
            </div>
            <h2 className="text-4xl md:text-5xl font-bold brand-heading mb-4">
              Transformative
              <span className="brand-gradient-text"> Journeys</span>
            </h2>
            <p className="text-xl brand-body max-w-3xl mx-auto">
              Carefully crafted experiences that blend adventure, culture, and spiritual discovery 
              in the heart of the Himalayas.
            </p>
            
            {/* Experience Type Filter */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <button
                onClick={() => setExperienceType("all")}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  experienceType === "all"
                    ? "brand-btn-primary"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All Experiences
              </button>
              <button
                onClick={() => setExperienceType("curated")}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  experienceType === "curated"
                    ? "brand-btn-primary"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                🎨 Curated Tours
              </button>
              <button
                onClick={() => setExperienceType("authentic")}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  experienceType === "authentic"
                    ? "brand-btn-primary"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                🏔️ Authentic Adventures
              </button>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <Badge
                variant={activeFilter === "all" ? "default" : "secondary"}
                className={`cursor-pointer transition-all ${
                  activeFilter === "all" ? "bg-brand-primary hover:bg-brand-secondary" : "hover:bg-gray-200"
                }`}
                onClick={() => setActiveFilter("all")}
              >
                All Tours
              </Badge>
              {TOUR_CATEGORIES.map((category) => (
                <Badge
                  key={category.value}
                  variant={activeFilter === category.value ? "default" : "secondary"}
                  className={`cursor-pointer transition-all ${
                    activeFilter === category.value ? "bg-brand-primary hover:bg-brand-secondary" : "hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveFilter(category.value)}
                >
                  {category.label.replace(' Tours', '')}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tours Grid */}
          <TourGrid
            tours={filteredTours}
            onBookNow={handleBookNow}
          />
        </div>
      </section>

      {/* Trust Indicators Section */}
      <TrustIndicatorsSection testimonials={testimonials} />

      {/* Authentic Tours Section */}
      <AuthenticToursSection tours={tours.filter(tour => !tour.featured).slice(0, 3)} onBookNow={handleBookNow} />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Booking Process Section */}
      <BookingProcessSection />

      {/* Upcoming Events Section */}
      <UpcomingEventsSection />

      
      {/* Call to Action Section */}
      <section className="py-20 bg-brand-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Bhutan Adventure?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join hundreds of travelers who have discovered the magic of the Last Shangri-La with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tours">
                <Button size="lg" className="brand-btn-primary">
                  <Compass className="w-5 h-5 mr-2" />
                  Browse All Tours
                </Button>
              </Link>
              <Button 
                size="lg" 
                onClick={() => setIsCustomTourFormOpen(true)}
                className="brand-btn-outline"
              >
                <Users className="w-5 h-5 mr-2" />
                Plan Custom Trip
              </Button>
            </div>
          </div>
        </div>
      </section>

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

      {/* Floating Contact Button */}
      <FloatingContactButton />
    </div>
  );
}