import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import TourCard from "@/components/TourCard";
import { BookNowFormLauncher } from "@/components/FormLauncher";
import type { Tour } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Sparkles, Crown, Users, Calendar, MapPin, Clock, 
  Star, Heart, Camera, Plane, Hotel, Utensils,
  ChevronRight, Award, Palette, Compass, Phone
} from "lucide-react";

const bespokeServices = [
  {
    icon: Crown,
    title: "Royal Treatment",
    description: "VIP access to exclusive locations and private ceremonies",
    features: ["Private dzong tours", "Royal palace visits", "Exclusive monastery access", "Personal butler service"]
  },
  {
    icon: Plane,
    title: "Luxury Transportation",
    description: "Helicopter transfers and premium vehicle fleet",
    features: ["Helicopter sightseeing", "Luxury SUV fleet", "Private jet coordination", "Airport VIP service"]
  },
  {
    icon: Hotel,
    title: "Premium Accommodations",
    description: "Handpicked luxury resorts and heritage properties",
    features: ["5-star resorts", "Heritage hotels", "Private villas", "Exclusive lodges"]
  },
  {
    icon: Utensils,
    title: "Culinary Experiences",
    description: "Private dining with renowned chefs and local specialties",
    features: ["Private chef service", "Royal cuisine tasting", "Farm-to-table dining", "Wine pairing dinners"]
  }
];

const customizationOptions = [
  {
    category: "Interests",
    options: ["Cultural Heritage", "Adventure Sports", "Spiritual Journey", "Photography", "Wildlife", "Luxury Wellness", "Royal History", "Traditional Arts"]
  },
  {
    category: "Activities",
    options: ["Private Monastery Tours", "Helicopter Sightseeing", "Traditional Archery", "Meditation Retreats", "Cooking Classes", "Textile Workshops", "Royal Ceremonies", "Festival Participation"]
  },
  {
    category: "Accommodation",
    options: ["Ultra-Luxury Resorts", "Heritage Properties", "Boutique Hotels", "Private Villas", "Monastery Stays", "Eco-Lodges", "Glamping", "Royal Suites"]
  },
  {
    category: "Transportation",
    options: ["Helicopter Transfers", "Luxury Vehicles", "Traditional Horses", "Mountain Bikes", "Private Jets", "Scenic Flights", "Royal Carriages", "Hiking Guides"]
  }
];

const sampleItineraries = [
  {
    title: "Royal Heritage Journey",
    duration: "10 Days",
    price: "From $8,500",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop",
    highlights: ["Private royal palace tour", "Exclusive dzong ceremonies", "Heritage hotel stays", "Royal cuisine experiences"],
    description: "Experience Bhutan like royalty with exclusive access to palaces, private ceremonies, and luxury accommodations."
  },
  {
    title: "Spiritual Awakening Retreat",
    duration: "14 Days",
    price: "From $6,200",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop",
    highlights: ["Private meditation sessions", "Monastery immersion", "Sacred site pilgrimages", "Spiritual master meetings"],
    description: "Deep spiritual journey with personal meditation masters and exclusive access to sacred sites."
  },
  {
    title: "Adventure & Luxury Fusion",
    duration: "12 Days",
    price: "From $7,800",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    highlights: ["Helicopter trekking", "Luxury camping", "Adventure activities", "Spa treatments"],
    description: "Perfect blend of thrilling adventures and luxury comfort in pristine mountain settings."
  }
];

const planningSteps = [
  {
    step: 1,
    title: "Consultation",
    description: "Detailed discussion about your preferences, interests, and travel style",
    icon: Users
  },
  {
    step: 2,
    title: "Custom Design",
    description: "Our experts craft a personalized itinerary based on your requirements",
    icon: Palette
  },
  {
    step: 3,
    title: "Refinement",
    description: "We refine the itinerary based on your feedback until it's perfect",
    icon: Star
  },
  {
    step: 4,
    title: "Execution",
    description: "Flawless execution with dedicated support throughout your journey",
    icon: Award
  }
];

export default function BespokeToursPage() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isBookNowFormOpen, setIsBookNowFormOpen] = useState(false);

  const { data: tours = [] } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });

  const bespokeTours = tours.filter(tour => tour.category === "Custom" || tour.category === "Luxury");

  const handleBookNow = (tour: Tour) => {
    setSelectedTour(tour);
    setIsBookNowFormOpen(true);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    duration: "",
    budget: "",
    interests: [] as string[],
    specialRequests: ""
  });

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Bespoke tour request:", formData);
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&h=1080&fit=crop"
            alt="Luxury resort in Bhutan with mountain views"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-teal-900/70"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="brand-section-header mb-6">
            <Sparkles className="w-5 h-5" />
            Bespoke Tours
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Your Perfect
            <span className="gradient-text-light"> Journey</span>
            <br />Awaits
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-teal-100">
            Completely customized experiences crafted exclusively for you. 
            Every detail tailored to your dreams and desires.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-teal text-lg px-8 py-4">
              <Crown className="w-5 h-5 mr-2" />
              Start Planning
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-900 text-lg px-8 py-4">
              <Phone className="w-5 h-5 mr-2" />
              Speak to Expert
            </Button>
          </div>
        </div>
      </section>

      {/* Bespoke Services */}
      <section className="py-20 section-purple-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Bespoke
              <span className="gradient-text"> Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto brand-body">
              Every aspect of your journey is carefully curated to exceed your expectations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bespokeServices.map((service, index) => (
              <Card key={index} className="brand-card text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-teal-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-teal-600 flex items-center">
                        <Star className="w-4 h-4 mr-2 fill-current" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Planning Process */}
      <section className="py-20 bg-gradient-to-br from-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="brand-section-header-light mb-6">
              <Compass className="w-5 h-5" />
              Planning Process
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How We Create Your
              <span className="gradient-text"> Perfect Journey</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {planningSteps.map((step, index) => (
              <Card key={index} className="brand-card text-center relative">
                <CardHeader>
                  <div className="w-16 h-16 bg-teal-gradient rounded-full flex items-center justify-center mx-auto mb-4 relative">
                    <step.icon className="w-8 h-8 text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-teal-600">
                      <span className="text-sm font-bold text-teal-600">{step.step}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
                {index < planningSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="w-8 h-8 text-teal-300" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Itineraries */}
      <section className="py-20 section-purple-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="brand-section-header mb-6">
              <Award className="w-5 h-5" />
              Sample Itineraries
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Inspiration for Your
              <span className="gradient-text"> Bespoke Journey</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {sampleItineraries.map((itinerary, index) => (
              <Card key={index} className="brand-card overflow-hidden">
                <div className="relative">
                  <img
                    src={itinerary.image}
                    alt={itinerary.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-teal-gradient text-white">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Bespoke
                  </Badge>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <div className="text-sm font-medium">{itinerary.duration}</div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{itinerary.title}</h3>
                  <p className="text-gray-600 mb-4">{itinerary.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <h4 className="font-semibold text-gray-900">Highlights:</h4>
                    {itinerary.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <Crown className="w-4 h-4 text-teal-600 mr-2" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-lg font-bold text-teal-600">{itinerary.price}</div>
                    <Button className="btn-teal">
                      Customize This
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Customization Options */}
      <section className="py-20 bg-gradient-to-br from-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Endless
              <span className="gradient-text"> Possibilities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto brand-body">
              Choose from our extensive range of options to create your perfect journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {customizationOptions.map((category, index) => (
              <Card key={index} className="brand-card">
                <CardHeader>
                  <CardTitle className="text-lg text-teal-600 text-center">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.options.map((option, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center">
                        <ChevronRight className="w-3 h-3 text-teal-600 mr-2" />
                        {option}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke Tour Request Form */}
      <section className="py-20 section-purple-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="brand-section-header mb-6">
              <Heart className="w-5 h-5" />
              Plan Your Journey
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tell Us About Your
              <span className="gradient-text"> Dream Trip</span>
            </h2>
          </div>

          <Card className="brand-card">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Preferred Duration</Label>
                    <Input
                      id="duration"
                      placeholder="e.g., 7-10 days"
                      value={formData.duration}
                      onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="budget">Budget Range (USD)</Label>
                  <Input
                    id="budget"
                    placeholder="e.g., $5,000 - $10,000"
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Interests & Preferences</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                    {customizationOptions[0].options.map((interest) => (
                      <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(interest)}
                          onChange={() => handleInterestToggle(interest)}
                          className="rounded border-teal-300 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-700">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="specialRequests">Special Requests & Additional Information</Label>
                  <Textarea
                    id="specialRequests"
                    rows={4}
                    placeholder="Tell us about any special requirements, dietary restrictions, accessibility needs, or specific experiences you'd like to include..."
                    value={formData.specialRequests}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                    className="mt-1"
                  />
                </div>

                <div className="text-center">
                  <Button type="submit" size="lg" className="btn-teal text-lg px-12 py-4">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Create My Bespoke Journey
                  </Button>
                  <p className="text-sm text-gray-500 mt-3">
                    Our travel experts will contact you within 24 hours to discuss your perfect journey
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-teal-gradient-dark text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready for Your Bespoke Adventure?
          </h2>
          <p className="text-xl mb-8 text-teal-100">
            Let our experts craft the perfect journey tailored exclusively to your dreams
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-br from-white to-teal-50 text-teal-900 hover:bg-teal-50 text-lg px-8 py-4">
              <Crown className="w-5 h-5 mr-2" />
              Start Planning Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-900 text-lg px-8 py-4">
              <Phone className="w-5 h-5 mr-2" />
              Call +975-2-323251
            </Button>
          </div>
        </div>
      </section>

      {/* All Bespoke Tours */}
      <section className="py-20 section-purple-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Available Bespoke
              <span className="gradient-text"> Tours</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bespokeTours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                onBookNow={handleBookNow}
              />
            ))}
          </div>
        </div>
      </section>

      <BookNowFormLauncher
        isOpen={isBookNowFormOpen}
        onClose={() => setIsBookNowFormOpen(false)}
        selectedTour={selectedTour}
      />
    </div>
  );
}