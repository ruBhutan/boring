import { BookNowFormLauncher } from "@/components/FormLauncher";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Tour } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import {
    Bell,
    ChevronRight,
    Clock,
    Flame,
    Flower2,
    Heart,
    Mountain,
    Sparkles,
    Sunrise,
    Users
} from "lucide-react";
import { useState } from "react";

const spiritualExperiences = [
  {
    icon: Flower2,
    title: "Meditation Retreats",
    description: "Learn ancient Buddhist meditation techniques from master monks",
    duration: "3-7 days",
    highlights: ["Silent meditation", "Mindfulness practice", "Inner peace cultivation"]
  },
  {
    icon: Bell,
    title: "Monastery Stays",
    description: "Live alongside monks and experience monastic life",
    duration: "2-5 days", 
    highlights: ["Dawn prayers", "Monastery chores", "Dharma teachings"]
  },
  {
    icon: Flame,
    title: "Sacred Rituals",
    description: "Participate in traditional Buddhist ceremonies and pujas",
    duration: "Half day",
    highlights: ["Butter lamp offerings", "Prayer wheel spinning", "Blessing ceremonies"]
  },
  {
    icon: Mountain,
    title: "Pilgrimage Journeys",
    description: "Visit sacred sites and holy mountains across Bhutan",
    duration: "5-14 days",
    highlights: ["Tiger's Nest hike", "Sacred lakes", "Holy caves"]
  }
];

const sacredSites = [
  {
    name: "Tiger's Nest Monastery",
    location: "Paro",
    significance: "Most sacred Buddhist site in Bhutan",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop",
    description: "Perched on a cliff 900m above Paro valley, this monastery is where Guru Rinpoche meditated for 3 years, 3 months, 3 weeks and 3 days.",
    activities: ["Meditation sessions", "Blessing ceremonies", "Spiritual guidance"]
  },
  {
    name: "Punakha Dzong",
    location: "Punakha",
    significance: "Winter residence of the Je Khenpo",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop",
    description: "The Palace of Great Happiness, where the spiritual leader of Bhutan resides during winter months.",
    activities: ["Private audiences", "Dharma teachings", "Sacred ceremonies"]
  },
  {
    name: "Bumthang Sacred Valley",
    location: "Bumthang",
    significance: "Spiritual heartland of Bhutan",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    description: "Home to ancient temples and the birthplace of Buddhism in Bhutan, filled with sacred energy.",
    activities: ["Temple visits", "Meditation walks", "Spiritual consultations"]
  }
];

const meditationPrograms = [
  {
    title: "Mindfulness Meditation Retreat",
    duration: "7 Days",
    level: "Beginner",
    location: "Thimphu & Paro",
    price: 1200,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    includes: ["Daily meditation sessions", "Dharma teachings", "Monastery visits", "Vegetarian meals"],
    description: "Perfect introduction to Buddhist meditation practices in serene mountain settings."
  },
  {
    title: "Advanced Vipassana Intensive",
    duration: "14 Days",
    level: "Advanced",
    location: "Bumthang Valley",
    price: 2400,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
    includes: ["Silent retreat", "One-on-one guidance", "Sacred site visits", "Certification"],
    description: "Deep dive into insight meditation with experienced Buddhist masters."
  },
  {
    title: "Monastery Immersion Experience",
    duration: "5 Days",
    level: "All Levels",
    location: "Various Monasteries",
    price: 800,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    includes: ["Monastery accommodation", "Monk interactions", "Daily rituals", "Spiritual guidance"],
    description: "Live like a monk and experience authentic monastic life in ancient monasteries."
  }
];

export default function SpiritualToursPage() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isBookNowFormOpen, setIsBookNowFormOpen] = useState(false);

  const { data: tours = [] } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });

  const spiritualTours = tours.filter(tour => tour.category === "Spiritual");

  const handleBookNow = (tour: Tour) => {
    setSelectedTour(tour);
    setIsBookNowFormOpen(true);
  };

  return (
    <div className="pt-20">

      {/* Spiritual Experiences */}
      <section className="py-20 section-purple-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Spiritual
              <span className="gradient-text"> Experiences</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto brand-body">
              Immerse yourself in ancient Buddhist traditions and find inner peace through authentic spiritual practices
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {spiritualExperiences.map((experience, index) => (
              <Card key={index} className="brand-card text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-teal-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <experience.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{experience.title}</CardTitle>
                  <Badge variant="outline" className="border-teal-200 text-teal-600">
                    {experience.duration}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{experience.description}</p>
                  <ul className="space-y-2">
                    {experience.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-sm text-teal-600 flex items-center">
                        <Sparkles className="w-4 h-4 mr-2 fill-current" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sacred Sites */}
      <section className="py-20 bg-gradient-to-br from-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="brand-section-header-light mb-6">
              <Mountain className="w-5 h-5" />
              Sacred Sites
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Holy Places of
              <span className="gradient-text"> Bhutan</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {sacredSites.map((site, index) => (
              <Card key={index} className="brand-card overflow-hidden">
                <div className="relative">
                  <img
                    src={site.image}
                    alt={site.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <Badge className="bg-teal-600 text-white mb-2">Sacred Site</Badge>
                    <h3 className="text-lg font-bold">{site.location}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{site.name}</h3>
                  <p className="text-teal-600 font-medium mb-3">{site.significance}</p>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{site.description}</p>
                  <div className="space-y-2 mb-4">
                    <h4 className="font-semibold text-gray-900">Spiritual Activities:</h4>
                    {site.activities.map((activity, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <ChevronRight className="w-4 h-4 text-teal-600 mr-2" />
                        {activity}
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full btn-teal-outline">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Meditation Programs */}
      <section className="py-20 section-purple-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="brand-section-header mb-6">
              <Flower2 className="w-5 h-5" />
              Meditation Programs
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Guided
              <span className="gradient-text"> Meditation Retreats</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto brand-body">
              Learn from experienced Buddhist masters in serene mountain settings
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {meditationPrograms.map((program, index) => (
              <Card key={index} className="brand-card overflow-hidden">
                <div className="relative">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className={`absolute top-4 left-4 ${
                    program.level === 'Beginner' ? 'bg-teal-500' :
                    program.level === 'Advanced' ? 'bg-amber-600' : 'bg-teal-600'
                  } text-white`}>
                    {program.level}
                  </Badge>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <div className="text-sm font-medium">{program.duration}</div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Mountain className="w-4 h-4 mr-2" />
                    <span className="text-sm">{program.location}</span>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">{program.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <h4 className="font-semibold text-gray-900">Includes:</h4>
                    {program.includes.map((item, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <ChevronRight className="w-4 h-4 text-teal-600 mr-2" />
                        {item}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-2xl font-bold text-teal-600">${program.price}</span>
                      <span className="text-gray-500 ml-1">per person</span>
                    </div>
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

      {/* All Spiritual Tours */}
      <section className="py-20 bg-gradient-to-br from-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Spiritual Tour Packages ({spiritualTours.length})
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spiritualTours.map((tour) => (
              <Card key={tour.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={tour.imageUrl}
                    alt={tour.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-teal-600 text-white">
                    Spiritual
                  </Badge>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg text-sm flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {tour.duration} days
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {tour.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {tour.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {tour.duration}d
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {tour.maxGroupSize || 12}
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1 text-teal-600" />
                      Peaceful
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        ${tour.price?.toLocaleString() || '0'}
                      </span>
                      <span className="text-gray-500 text-sm ml-1">per person</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleBookNow(tour)}
                        className="btn-teal text-white"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Spiritual Guidance */}
      <section className="py-20 bg-teal-gradient-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Spiritual Guidance & Support
            </h2>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto">
              Our experienced spiritual guides and Buddhist masters provide personalized support throughout your journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white text-center">
              <CardHeader>
                <Sunrise className="w-12 h-12 text-teal-300 mx-auto mb-4" />
                <CardTitle>Daily Practice</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-teal-100">
                  <li>• Morning meditation sessions</li>
                  <li>• Evening dharma teachings</li>
                  <li>• Personal reflection time</li>
                  <li>• Mindful walking practice</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white text-center">
              <CardHeader>
                <Bell className="w-12 h-12 text-teal-300 mx-auto mb-4" />
                <CardTitle>Sacred Rituals</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-teal-100">
                  <li>• Butter lamp offerings</li>
                  <li>• Prayer wheel ceremonies</li>
                  <li>• Blessing rituals</li>
                  <li>• Chanting sessions</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white text-center">
              <CardHeader>
                <Heart className="w-12 h-12 text-teal-300 mx-auto mb-4" />
                <CardTitle>Inner Transformation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-teal-100">
                  <li>• Compassion cultivation</li>
                  <li>• Wisdom development</li>
                  <li>• Emotional healing</li>
                  <li>• Spiritual awakening</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-gradient-to-br from-white to-teal-50 text-teal-900 hover:bg-teal-50 text-lg px-8 py-4">
              <Flower2 className="w-5 h-5 mr-2" />
              Start Your Spiritual Journey
            </Button>
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