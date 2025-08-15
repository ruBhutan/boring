import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { 
  Clock, Users, Mountain, Calendar, MapPin, Star, 
  Camera, Binoculars, TreePine, Heart, Award, CheckCircle,
  X, User, Mail, Phone, MessageSquare
} from "lucide-react";
import { AUTHENTIC_TOURS, BHUTAN_DESTINATIONS, BHUTAN_CULTURE_INFO } from "@/data/authenticTours";
import { TOUR_FILTER_CATEGORIES } from "@/lib/tourCategories";
import EnhancedInteractiveForm from "@/components/EnhancedInteractiveForm";
import type { Tour } from "@shared/schema";

interface AuthenticToursSectionProps {
  tours?: Tour[];
  onBookNow?: (tour: Tour) => void;
}

export function AuthenticToursSection({ tours, onBookNow }: AuthenticToursSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCustomTourFormOpen, setIsCustomTourFormOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  
  // Use provided tours or fallback to authentic tours data
  const availableTours = tours || AUTHENTIC_TOURS;
  
  const categories = TOUR_FILTER_CATEGORIES.map(cat => ({
    id: cat.value,
    label: cat.value === 'all' ? 'All Package' : cat.label,
    count: cat.value === 'all' 
      ? availableTours.length 
      : availableTours.filter(t => t.category === cat.value).length
  })).filter(cat => cat.count > 0);

  const filteredTours = selectedCategory === 'all' 
    ? availableTours 
    : availableTours.filter(tour => tour.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: React.ComponentType<{ className?: string }> } = {
      Cultural: Camera,
      Trekking: Mountain,
      Festival: Calendar,
      Wildlife: Binoculars,
      Adventure: TreePine,
      Spiritual: Heart
    };
    return icons[category] || Star;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-teal-600 text-white text-sm px-4 py-2 mb-4">
            <Award className="w-4 h-4 mr-2" />
            Authentic Bhutan Experiences
          </Badge>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">Transformative Journeys</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Curated experiences from Bhutan's most trusted operators. Each tour is crafted 
            by local experts who understand the heart and soul of the Last Shangri-La.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category.id);
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 ${
                  selectedCategory === category.id 
                    ? "bg-gradient-to-r from-teal-600 to-green-600 text-white" 
                    : "hover:bg-teal-50"
                }`}
              >
{React.createElement(Icon, { className: "w-4 h-4" })}
                {category.label}
                <Badge variant="secondary" className="ml-1 text-xs">
                  {category.count}
                </Badge>
              </Button>
            );
          })}
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => {
            const Icon = getCategoryIcon(tour.category);
            return (
              <Card key={tour.id} className="premium-card group overflow-hidden">
                <div className="relative">
                  <img
                    src={tour.imageUrl}
                    alt={tour.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`bg-gradient-to-r from-teal-600 to-green-600 text-white`}>
                      {React.createElement(Icon, { className: "w-3 h-3 mr-1" })}
                      {tour.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-black/70 text-white">
                      <Clock className="w-3 h-3 mr-1" />
                      {tour.duration} days
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                      {tour.name}
                    </h3>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">${tour.price}</p>
                      <p className="text-sm text-gray-500">per person</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {tour.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2 text-teal-500" />
                      <span>{tour.groupSize}</span>
                      <div className="mx-3 w-1 h-1 bg-gray-300 rounded-full"></div>
                      <Mountain className="w-4 h-4 mr-2 text-green-500" />
                      <span>{tour.difficulty}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                      <span>{tour.bestSeason}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Tour Highlights:</h4>
                    <ul className="space-y-1">
                      {tour.highlights.slice(0, 3).map((highlight, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-3 h-3 mr-2 text-green-500 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                      {tour.highlights.length > 3 && (
                        <li className="text-sm text-teal-600 font-medium">
                          +{tour.highlights.length - 3} more highlights
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/tours/${tour.id}`} className="flex-1">
                      <Button 
                        className="w-full bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        View Details
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      className="flex-shrink-0 border-teal-200 text-teal-600 hover:bg-teal-50"
                      onClick={() => {
                        if (onBookNow) {
                          onBookNow(tour as Tour);
                        } else {
                          setSelectedTour(tour as Tour);
                          setIsBookingFormOpen(true);
                        }
                      }}
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-teal-600 to-green-600 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Can't Find Your Perfect Adventure?
            </h3>
            <p className="text-xl opacity-90 mb-6">
              Our Bhutan experts can create a custom itinerary tailored to your interests, 
              group size, and travel dates. Every journey is unique, just like you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-teal-700 hover:bg-teal-50 hover:text-teal-800 font-semibold px-8 py-3 shadow-lg border-2 border-white transition-all duration-200"
                onClick={() => setIsCustomTourFormOpen(true)}
              >
                Create Custom Tour
              </Button>
              <Button 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-teal-700 font-semibold px-8 py-3 shadow-lg transition-all duration-200"
                onClick={() => setIsContactFormOpen(true)}
              >
                Speak to Expert
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom Tour Form */}
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
      
      {/* Contact Form */}
      {isContactFormOpen && (
        <EnhancedInteractiveForm
          formType="contact"
          isOpen={isContactFormOpen}
          onClose={() => setIsContactFormOpen(false)}
          initialData={{}}
          onSubmitSuccess={(data) => {
            console.log("Contact request submitted:", data);
            setIsContactFormOpen(false);
          }}
        />
      )}
      
      {/* Booking Form Modal */}
      {isBookingFormOpen && selectedTour && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Book Your Tour</h2>
                  <p className="text-gray-600">Complete your booking for {selectedTour.name}</p>
                </div>
                <button
                  onClick={() => {
                    setIsBookingFormOpen(false);
                    setSelectedTour(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Mountain className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedTour.name}</h3>
                    <p className="text-sm text-gray-600">
                      {selectedTour.duration} days • ${selectedTour.price} per person
                    </p>
                  </div>
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Personal Information
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="your.email@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="+975 XXXXXXXX"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  {/* Trip Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Trip Details</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Dates *
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Travelers *
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                        <option value="">Select number of travelers</option>
                        {[1,2,3,4,5,6,7,8,9,10].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country of Residence
                      </label>
                      <input
                        type="text"
                        placeholder="Your country"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Special Requirements */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Special Requirements
                  </h3>
                  <textarea
                    placeholder="Any special requests, dietary requirements, accessibility needs, or additional information..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                {/* Tour Highlights */}
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h4 className="font-medium text-teal-900 mb-2">Tour Highlights:</h4>
                  <ul className="text-sm text-emerald-800 space-y-1">
                    {selectedTour.highlights?.slice(0, 5).map((highlight, index) => (
                      <li key={index}>• {highlight}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-center pt-6">
                  <Button 
                    className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold"
                    onClick={() => {
                      // Handle form submission
                      console.log("Booking submitted for:", selectedTour.name);
                      setIsBookingFormOpen(false);
                      setSelectedTour(null);
                    }}
                  >
                    Book This Tour
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function BhutanDestinationsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Explore <span className="gradient-text">Bhutan's Wonders</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From sacred monasteries perched on cliff faces to pristine valleys 
            where time stands still, discover the destinations that make Bhutan magical.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BHUTAN_DESTINATIONS.map((destination, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white mb-1">{destination.name}</h3>
                  <p className="text-white/90 text-sm flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {destination.altitude} altitude
                  </p>
                </div>
              </div>
              
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">{destination.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Must-See Attractions:</h4>
                  <ul className="space-y-1">
                    {destination.highlights.slice(0, 3).map((highlight, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <Star className="w-3 h-3 mr-2 text-amber-500 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-1 text-green-500" />
                    <span>{destination.bestTime}</span>
                  </div>
                  <Link to={`/destinations/${destination.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BhutanCultureSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Understanding <span className="gradient-text">Bhutan's Soul</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what makes Bhutan unique - a kingdom where happiness is measured, 
            tradition thrives, and spirituality guides daily life.
          </p>
        </div>

        <Tabs defaultValue="gnh" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            <TabsTrigger value="gnh">Gross National Happiness</TabsTrigger>
            <TabsTrigger value="buddhism">Buddhism</TabsTrigger>
            <TabsTrigger value="arts">Arts & Crafts</TabsTrigger>
            <TabsTrigger value="festivals">Festivals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gnh" className="space-y-6">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {BHUTAN_CULTURE_INFO.grossNationalHappiness.title}
              </h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {BHUTAN_CULTURE_INFO.grossNationalHappiness.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BHUTAN_CULTURE_INFO.grossNationalHappiness.principles.map((principle, index) => (
                  <div key={index} className="flex items-center p-4 bg-teal-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-800">{principle}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="buddhism" className="space-y-6">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {BHUTAN_CULTURE_INFO.buddhism.title}
              </h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {BHUTAN_CULTURE_INFO.buddhism.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BHUTAN_CULTURE_INFO.buddhism.features.map((feature, index) => (
                  <div key={index} className="flex items-center p-4 bg-orange-50 rounded-lg">
                    <Heart className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-800">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="arts" className="space-y-6">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {BHUTAN_CULTURE_INFO.textiles.title}
              </h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {BHUTAN_CULTURE_INFO.textiles.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BHUTAN_CULTURE_INFO.textiles.crafts.map((craft, index) => (
                  <div key={index} className="flex items-center p-4 bg-teal-50 rounded-lg">
                    <Star className="w-5 h-5 text-teal-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-800">{craft}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="festivals" className="space-y-6">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {BHUTAN_CULTURE_INFO.festivals.title}
              </h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {BHUTAN_CULTURE_INFO.festivals.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BHUTAN_CULTURE_INFO.festivals.major_festivals.map((festival, index) => (
                  <div key={index} className="flex items-center p-4 bg-green-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-800">{festival}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}