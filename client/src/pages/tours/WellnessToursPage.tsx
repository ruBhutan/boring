import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Heart, Clock, Users, Sparkles, Wind, Sun, Droplets } from "lucide-react";
import { Link } from "react-router-dom";

export default function WellnessToursPage() {
  const wellnessTours = [
    {
      id: 1,
      title: "Himalayan Wellness Retreat",
      duration: "7 Days",
      difficulty: "Relaxing",
      groupSize: "6-10 people",
      price: "$1,800",
      image: "/api/placeholder/400/250",
      highlights: ["Hot stone baths", "Meditation sessions", "Yoga classes", "Herbal treatments"],
      description: "Rejuvenate your mind, body, and soul with traditional Bhutanese wellness practices in serene mountain settings."
    },
    {
      id: 2,
      title: "Traditional Medicine & Spa Experience",
      duration: "5 Days",
      difficulty: "Gentle",
      groupSize: "4-8 people",
      price: "$1,200",
      image: "/api/placeholder/400/250",
      highlights: ["Sowa Rigpa medicine", "Herbal consultations", "Therapeutic massages", "Detox programs"],
      description: "Experience authentic Bhutanese traditional medicine combined with luxury spa treatments for holistic healing."
    },
    {
      id: 3,
      title: "Mindfulness & Meditation Retreat",
      duration: "10 Days",
      difficulty: "Contemplative",
      groupSize: "8-12 people",
      price: "$2,500",
      image: "/api/placeholder/400/250",
      highlights: ["Silent meditation", "Mindfulness training", "Buddhist philosophy", "Nature immersion"],
      description: "Deep dive into mindfulness practices with experienced meditation masters in peaceful monastery settings."
    },
    {
      id: 4,
      title: "Forest Bathing & Nature Therapy",
      duration: "4 Days",
      difficulty: "Easy",
      groupSize: "6-12 people",
      price: "$950",
      image: "/api/placeholder/400/250",
      highlights: ["Forest immersion", "Breathing exercises", "Nature meditation", "Eco-therapy"],
      description: "Connect with nature through Japanese-inspired forest bathing techniques in Bhutan's pristine forests."
    }
  ];

  const wellnessFeatures = [
    {
      icon: Leaf,
      title: "Natural Healing",
      description: "Traditional Bhutanese medicine using pure mountain herbs and ancient healing wisdom."
    },
    {
      icon: Heart,
      title: "Holistic Wellness",
      description: "Comprehensive approach addressing physical, mental, and spiritual well-being."
    },
    {
      icon: Wind,
      title: "Pure Mountain Air",
      description: "Breathe the cleanest air on earth in Bhutan's pollution-free environment."
    },
    {
      icon: Sparkles,
      title: "Luxury Comfort",
      description: "Premium accommodations and world-class spa facilities in stunning natural settings."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 to-teal-600/90"></div>
        <div className="absolute inset-0 bg-[url('/api/placeholder/1200/600')] bg-cover bg-center"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Leaf className="w-16 h-16 text-white mr-4" />
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Wellness Tours
            </h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Restore your inner balance and vitality through ancient Bhutanese wellness traditions. Experience holistic healing in the world's most pristine environment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
              <Heart className="w-4 h-4 mr-2" />
              Holistic Healing
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
              <Leaf className="w-4 h-4 mr-2" />
              Natural Medicine
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Luxury Wellness
            </Badge>
          </div>
        </div>
      </section>

      {/* Wellness Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Himalayan Wellness Experience</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the healing power of Bhutan's ancient wellness traditions combined with modern luxury
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {wellnessFeatures.map((feature, index) => (
              <Card key={index} className="text-center border-teal-100 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <feature.icon className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 bg-gradient-to-br from-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Wellness Retreat Programs</h2>
            <p className="text-lg text-gray-600">
              Choose your path to rejuvenation and inner peace
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {wellnessTours.map((tour) => (
              <Card key={tour.id} className="overflow-hidden hover:shadow-xl transition-shadow border-teal-100">
                <div className="relative">
                  <img 
                    src={tour.image} 
                    alt={tour.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-teal-600 text-white">
                    {tour.difficulty}
                  </Badge>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">{tour.title}</CardTitle>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {tour.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {tour.groupSize}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 mb-4">{tour.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Wellness Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tour.highlights.map((highlight, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-teal-200 text-teal-700">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-teal-600">{tour.price}</div>
                    <Button className="btn-teal">
                      Book Retreat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Traditional Treatments */}
      <section className="py-16 bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Traditional Bhutanese Treatments</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Droplets className="w-6 h-6 text-teal-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Hot Stone Baths</h3>
                    <p className="text-gray-600">Traditional Bhutanese hot stone baths using river stones heated over juniper wood fires for deep relaxation.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Leaf className="w-6 h-6 text-teal-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Herbal Medicine</h3>
                    <p className="text-gray-600">Sowa Rigpa traditional medicine using pure Himalayan herbs for natural healing and detoxification.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Sun className="w-6 h-6 text-teal-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Meditation Therapy</h3>
                    <p className="text-gray-600">Guided meditation sessions in sacred spaces to reduce stress and achieve mental clarity.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Wind className="w-6 h-6 text-teal-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Breathing Practices</h3>
                    <p className="text-gray-600">Ancient pranayama techniques combined with pure mountain air for respiratory wellness.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/api/placeholder/500/400" 
                alt="Traditional wellness treatment"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Your Wellness Journey
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Restore your vitality and find inner peace in Bhutan's pristine healing environment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-br from-white to-teal-50 text-teal-600 hover:bg-gray-100">
                Plan Your Retreat
              </Button>
            </Link>
            <Link to="/tours">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View All Tours
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}