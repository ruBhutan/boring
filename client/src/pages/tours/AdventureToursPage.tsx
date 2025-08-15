import { BookNowFormLauncher } from "@/components/FormLauncher";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Tour } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import {
    Activity,
    Award, Backpack,
    Calendar,
    ChevronRight,
    Clock,
    Compass,
    Heart,
    Mountain,
    Route,
    Shield,
    Target,
    Users
} from "lucide-react";
import { useState } from "react";

const adventureActivities = [
  {
    icon: Mountain,
    title: "High-Altitude Trekking",
    description: "Multi-day treks through pristine Himalayan wilderness",
    difficulty: "Challenging",
    highlights: ["Snowman Trek", "Druk Path Trek", "Jomolhari Base Camp"]
  },
  {
    icon: Activity,
    title: "White Water Rafting",
    description: "Navigate thrilling rapids on pristine mountain rivers",
    difficulty: "Moderate",
    highlights: ["Mo Chhu River", "Pho Chhu River", "Grade III-IV rapids"]
  },
  {
    icon: Target,
    title: "Traditional Archery",
    description: "Master Bhutan's national sport with bamboo bows",
    difficulty: "Easy",
    highlights: ["Traditional techniques", "Local competitions", "Cultural immersion"]
  },
  {
    icon: Compass,
    title: "Mountain Biking",
    description: "Cycle through valleys and mountain passes",
    difficulty: "Moderate",
    highlights: ["Thimphu-Paro trail", "Bumthang circuits", "Village routes"]
  }
];

const trekDifficulties = [
  {
    level: "Easy",
    color: "green",
    description: "Suitable for beginners, minimal elevation gain",
    examples: ["Druk Path Trek", "Bumthang Cultural Trek"]
  },
  {
    level: "Moderate", 
    color: "yellow",
    description: "Some hiking experience required, moderate elevation",
    examples: ["Jomolhari Trek", "Dagala Thousand Lakes"]
  },
  {
    level: "Challenging",
    color: "orange", 
    description: "Experienced hikers only, high altitude",
    examples: ["Snowman Trek", "Laya Gasa Trek"]
  },
  {
    level: "Extreme",
    color: "red",
    description: "Expert level, technical climbing required",
    examples: ["Jhomolhari II Peak", "Table Mountain"]
  }
];

const featuredTreks = [
  {
    id: "trek-1",
    title: "Snowman Trek - Ultimate Challenge",
    duration: "25 Days",
    difficulty: "Extreme",
    maxAltitude: "5,320m",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    description: "One of the world's most difficult treks through remote Himalayan wilderness",
    highlights: ["11 high passes", "Remote villages", "Pristine wilderness", "Technical sections"]
  },
  {
    id: "trek-2",
    title: "Jomolhari Base Camp Trek",
    duration: "9 Days",
    difficulty: "Moderate",
    maxAltitude: "4,080m",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
    description: "Classic trek to the base of Bhutan's sacred mountain",
    highlights: ["Jomolhari views", "Yak herder camps", "Alpine lakes", "Rhododendron forests"]
  },
  {
    id: "trek-3",
    title: "Druk Path Trek",
    duration: "6 Days", 
    difficulty: "Easy",
    maxAltitude: "4,210m",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    description: "Perfect introduction to Bhutanese trekking",
    highlights: ["Ancient monasteries", "High altitude lakes", "Rhododendron blooms", "Panoramic views"]
  }
];

export default function AdventureToursPage() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isBookNowFormOpen, setIsBookNowFormOpen] = useState(false);

  const { data: tours = [] } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });

  const adventureTours = tours.filter(tour => tour.category === "Adventure");

  const handleBookNow = (tour: Tour) => {
    setSelectedTour(tour);
    setIsBookNowFormOpen(true);
  };

  return (
    <div className="pt-20">

      {/* Adventure Activities */}
      <section className="py-20 section-purple-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Adventure
              <span className="gradient-text"> Activities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto brand-body">
              From gentle nature walks to extreme high-altitude challenges, find your perfect adventure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {adventureActivities.map((activity, index) => (
              <Card key={index} className="brand-card text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-teal-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <activity.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{activity.title}</CardTitle>
                  <Badge 
                    variant="outline" 
                    className={`
                      ${activity.difficulty === 'Easy' ? 'border-green-500 text-green-600' : ''}
                      ${activity.difficulty === 'Moderate' ? 'border-amber-500 text-amber-600' : ''}
                      ${activity.difficulty === 'Challenging' ? 'border-amber-500 text-amber-600' : ''}
                    `}
                  >
                    {activity.difficulty}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{activity.description}</p>
                  <ul className="space-y-2">
                    {activity.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-sm text-teal-600 flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2" />
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

      {/* Trek Difficulty Guide */}
      <section className="py-20 bg-gradient-to-br from-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="brand-section-header-light mb-6">
              <Route className="w-5 h-5" />
              Trek Difficulty Guide
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your
              <span className="gradient-text"> Challenge Level</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trekDifficulties.map((level, index) => (
              <Card key={index} className="brand-card">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    level.color === 'green' ? 'bg-teal-100' :
                    level.color === 'yellow' ? 'bg-amber-100' :
                    level.color === 'orange' ? 'bg-amber-100' : 'bg-amber-100'
                  }`}>
                    <div className={`w-6 h-6 rounded-full ${
                      level.color === 'green' ? 'bg-teal-500' :
                      level.color === 'yellow' ? 'bg-amber-500' :
                      level.color === 'orange' ? 'bg-amber-600' : 'bg-amber-700'
                    }`}></div>
                  </div>
                  <CardTitle className="text-center">{level.level}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">{level.description}</p>
                  <div className="space-y-2">
                    {level.examples.map((example, idx) => (
                      <div key={idx} className="text-sm text-teal-600">
                        {example}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Treks */}
      <section className="py-20 section-purple-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="brand-section-header mb-6">
              <Award className="w-5 h-5" />
              Featured Treks
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Iconic
              <span className="gradient-text"> Himalayan Treks</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredTreks.map((trek) => (
              <Card key={trek.id} className="brand-card overflow-hidden">
                <div className="relative">
                  <img
                    src={trek.image}
                    alt={trek.title}
                    className="w-full h-64 object-cover"
                  />
                  <Badge className={`absolute top-4 left-4 ${
                    trek.difficulty === 'Easy' ? 'bg-teal-500' :
                    trek.difficulty === 'Moderate' ? 'bg-amber-500' :
                    trek.difficulty === 'Challenging' ? 'bg-amber-600' : 'bg-amber-700'
                  } text-white`}>
                    {trek.difficulty}
                  </Badge>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <div className="text-sm font-medium">{trek.maxAltitude}</div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{trek.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{trek.duration}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{trek.description}</p>
                  <div className="space-y-2 mb-6">
                    {trek.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <Mountain className="w-4 h-4 text-teal-600 mr-2" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                  <Button className="w-full btn-teal">
                    View Trek Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Adventure Tours */}
      <section className="py-20 bg-gradient-to-br from-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Adventure Tour Packages ({adventureTours.length})
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adventureTours.map((tour) => (
              <Card key={tour.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={tour.imageUrl}
                    alt={tour.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-amber-600 text-white">
                    Adventure
                  </Badge>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg text-sm flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
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
                      <Mountain className="w-4 h-4 mr-1 text-amber-600" />
                      {tour.difficulty || 'Moderate'}
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
                        className="bg-amber-600 hover:bg-amber-700 text-white"
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

      {/* Safety & Preparation */}
      <section className="py-20 bg-teal-gradient-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Safety & Preparation
            </h2>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto">
              Your safety is our priority. We provide comprehensive preparation and support for all adventures.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <Shield className="w-12 h-12 text-teal-300 mb-4" />
                <CardTitle>Safety First</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-teal-100">
                  <li>• Certified mountain guides</li>
                  <li>• Emergency communication</li>
                  <li>• First aid trained staff</li>
                  <li>• Weather monitoring</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <Heart className="w-12 h-12 text-teal-300 mb-4" />
                <CardTitle>Health Preparation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-teal-100">
                  <li>• Altitude acclimatization</li>
                  <li>• Fitness requirements</li>
                  <li>• Medical consultations</li>
                  <li>• Insurance coverage</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <Backpack className="w-12 h-12 text-teal-300 mb-4" />
                <CardTitle>Equipment</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-teal-100">
                  <li>• Professional gear rental</li>
                  <li>• Packing checklists</li>
                  <li>• Quality equipment</li>
                  <li>• Technical support</li>
                </ul>
              </CardContent>
            </Card>
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