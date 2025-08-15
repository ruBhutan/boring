import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TourCard from "@/components/TourCard";
import { BookNowFormLauncher } from "@/components/FormLauncher";
import { 
  Calendar, Music, Sparkles, MapPin, Clock, Users, 
  Crown, Drum, Palette, Camera, Star, Heart,
  ChevronRight, Award, PartyPopper, Zap
} from "lucide-react";
import type { Tour } from "@shared/schema";

const festivalHighlights = [
  {
    icon: Crown,
    title: "Royal Celebrations",
    description: "Witness centuries-old traditions in magnificent dzongs",
    features: ["Masked dances", "Royal ceremonies", "Traditional music"]
  },
  {
    icon: Palette,
    title: "Colorful Costumes",
    description: "Marvel at elaborate traditional dress and sacred masks",
    features: ["Silk brocades", "Sacred masks", "Intricate jewelry"]
  },
  {
    icon: Drum,
    title: "Sacred Performances",
    description: "Experience spiritual dances and ancient rituals",
    features: ["Cham dances", "Religious ceremonies", "Blessing rituals"]
  },
  {
    icon: Heart,
    title: "Cultural Immersion",
    description: "Join locals in authentic celebration and community",
    features: ["Local interactions", "Traditional food", "Cultural exchange"]
  }
];

const majorFestivals = [
  {
    name: "Paro Tsechu",
    location: "Paro Dzong",
    dates: "March/April",
    duration: "5 days",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop",
    description: "Bhutan's most famous festival featuring the unfurling of the giant thangka and sacred mask dances.",
    highlights: ["Giant thangka unfurling", "Guru Rinpoche dances", "Tiger's Nest pilgrimage", "Local blessing ceremonies"],
    significance: "Celebrates Guru Rinpoche's victory over demons",
    bestFor: "First-time visitors, photographers"
  },
  {
    name: "Thimphu Tshechu",
    location: "Tashichho Dzong",
    dates: "September/October", 
    duration: "3 days",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop",
    description: "The capital's grandest festival with elaborate royal ceremonies and traditional performances.",
    highlights: ["Royal family attendance", "Atsara performances", "Traditional crafts fair", "Cultural exhibitions"],
    significance: "Honors Guru Rinpoche and Buddhist teachings",
    bestFor: "Cultural enthusiasts, luxury travelers"
  },
  {
    name: "Punakha Drubchen",
    location: "Punakha Dzong",
    dates: "February/March",
    duration: "3 days", 
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    description: "Unique festival recreating ancient battles with spectacular warrior dances.",
    highlights: ["Pazap warrior dances", "Historical reenactments", "Dzong ceremonies", "Victory celebrations"],
    significance: "Commemorates victory over Tibetan invasions",
    bestFor: "History buffs, adventure seekers"
  },
  {
    name: "Bumthang Jambay Lhakhang Drup",
    location: "Bumthang Valley",
    dates: "October/November",
    duration: "5 days",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop",
    description: "Ancient festival at one of Bhutan's oldest temples with fire ceremonies.",
    highlights: ["Naked fire dance", "Ancient temple rituals", "Fertility blessings", "Sacred fire ceremonies"],
    significance: "Celebrates temple's founding in 659 AD",
    bestFor: "Spiritual seekers, cultural purists"
  }
];

const festivalTours = [
  {
    id: "festival-1",
    title: "Paro Tsechu Festival Tour",
    duration: "8 Days / 7 Nights",
    price: 2800,
    dates: "March 15-22, 2024",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
    highlights: ["Festival attendance", "Tiger's Nest hike", "Cultural workshops", "Photography sessions"],
    includes: ["Festival tickets", "Cultural guide", "Traditional lunch", "Photography permits"]
  },
  {
    id: "festival-2",
    title: "Thimphu Tshechu Royal Experience",
    duration: "6 Days / 5 Nights", 
    price: 3500,
    dates: "September 20-25, 2024",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    highlights: ["VIP festival seating", "Royal ceremony viewing", "Luxury accommodations", "Private cultural guide"],
    includes: ["Premium seating", "Royal ceremony access", "Luxury hotels", "Private guide"]
  },
  {
    id: "festival-3",
    title: "Bumthang Sacred Festivals",
    duration: "10 Days / 9 Nights",
    price: 3200,
    dates: "October 28 - November 6, 2024",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    highlights: ["Multiple festivals", "Sacred valley exploration", "Ancient temples", "Fire ceremonies"],
    includes: ["All festivals", "Temple visits", "Cultural immersion", "Sacred ceremonies"]
  }
];

const festivalCalendar = [
  { month: "January", festivals: ["Punakha Tshechu"] },
  { month: "February", festivals: ["Punakha Drubchen", "Chotse Tshechu"] },
  { month: "March", festivals: ["Paro Tsechu", "Gomphu Kora"] },
  { month: "April", festivals: ["Ura Yakchoe", "Kurjey Tshechu"] },
  { month: "May", festivals: ["Nimalung Tshechu", "Zhemgang Tshechu"] },
  { month: "June", festivals: ["Kurjey Tshechu", "Nimalung Tshechu"] },
  { month: "July", festivals: ["Mushroom Festival", "Haa Summer Festival"] },
  { month: "August", festivals: ["Wangdue Tshechu", "Chorten Kora"] },
  { month: "September", festivals: ["Thimphu Tshechu", "Wangdue Tshechu"] },
  { month: "October", festivals: ["Jambay Lhakhang Drup", "Prakhar Duchhoe"] },
  { month: "November", festivals: ["Jakar Tshechu", "Mongar Tshechu"] },
  { month: "December", festivals: ["Trashigang Tshechu", "Trongsa Tshechu"] }
];

export default function FestivalToursPage() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isBookNowFormOpen, setIsBookNowFormOpen] = useState(false);

  const { data: tours = [] } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });

  const festivalToursData = tours.filter(tour => tour.category === "Cultural" || tour.category === "Festival");

  const handleBookNow = (tour: Tour) => {
    setSelectedTour(tour);
    setIsBookNowFormOpen(true);
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&h=1080&fit=crop"
            alt="Colorful Bhutanese festival with masked dancers"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-pink-900/60"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="brand-section-header mb-6">
            <PartyPopper className="w-5 h-5" />
            Festival Tours
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Celebrate
            <span className="gradient-text-light"> Life</span>
            <br />in the Himalayas
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-teal-100">
            Join ancient celebrations where sacred traditions come alive through 
            colorful dances, royal ceremonies, and spiritual festivities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-teal text-lg px-8 py-4">
              <Calendar className="w-5 h-5 mr-2" />
              View Festival Calendar
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-900 text-lg px-8 py-4">
              <Camera className="w-5 h-5 mr-2" />
              Photography Tours
            </Button>
          </div>
        </div>
      </section>

      {/* Festival Highlights */}
      <section className="py-20 section-purple-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Festival
              <span className="gradient-text"> Highlights</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto brand-body">
              Experience the magic of Bhutanese festivals through sacred dances, royal ceremonies, and vibrant celebrations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {festivalHighlights.map((highlight, index) => (
              <Card key={index} className="brand-card text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-teal-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <highlight.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{highlight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{highlight.description}</p>
                  <ul className="space-y-2">
                    {highlight.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-teal-600 flex items-center">
                        <Sparkles className="w-4 h-4 mr-2 fill-current" />
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

      {/* Major Festivals */}
      <section className="py-20 bg-gradient-to-br from-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="brand-section-header-light mb-6">
              <Crown className="w-5 h-5" />
              Major Festivals
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Bhutan's Most
              <span className="gradient-text"> Spectacular Festivals</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {majorFestivals.map((festival, index) => (
              <Card key={index} className="brand-card overflow-hidden">
                <div className="relative">
                  <img
                    src={festival.image}
                    alt={festival.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <Badge className="bg-teal-600 text-white mb-2">{festival.dates}</Badge>
                    <h3 className="text-2xl font-bold">{festival.name}</h3>
                    <p className="text-teal-200">{festival.location}</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <div className="text-sm font-medium text-gray-900">{festival.duration}</div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{festival.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Festival Highlights:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {festival.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <ChevronRight className="w-4 h-4 text-teal-600 mr-2" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <div className="text-sm text-gray-500">Significance:</div>
                        <div className="text-sm font-medium text-teal-600">{festival.significance}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Best For:</div>
                        <div className="text-sm font-medium text-teal-600">{festival.bestFor}</div>
                      </div>
                    </div>
                    <Button className="w-full btn-teal">
                      View Festival Tours
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Festival Tours */}
      <section className="py-20 section-purple-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="brand-section-header mb-6">
              <Award className="w-5 h-5" />
              Featured Festival Tours
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Curated
              <span className="gradient-text"> Festival Experiences</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {festivalTours.map((tour) => (
              <Card key={tour.id} className="brand-card overflow-hidden">
                <div className="relative">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-teal-gradient text-white">
                    <Calendar className="w-3 h-3 mr-1" />
                    Festival Tour
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{tour.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{tour.duration}</span>
                  </div>
                  <div className="flex items-center text-teal-600 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">{tour.dates}</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <h4 className="font-semibold text-gray-900">Tour Highlights:</h4>
                    {tour.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <Star className="w-4 h-4 text-teal-600 mr-2" />
                        {highlight}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 mb-6">
                    <h4 className="font-semibold text-gray-900">Includes:</h4>
                    {tour.includes.map((item, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <ChevronRight className="w-4 h-4 text-teal-600 mr-2" />
                        {item}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-2xl font-bold text-teal-600">${tour.price}</span>
                      <span className="text-gray-500 ml-1">per person</span>
                    </div>
                    <Button className="btn-teal">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Festival Calendar */}
      <section className="py-20 bg-gradient-to-br from-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="brand-section-header-light mb-6">
              <Calendar className="w-5 h-5" />
              Festival Calendar
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Year-Round
              <span className="gradient-text"> Celebrations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto brand-body">
              Plan your visit around Bhutan's vibrant festival calendar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {festivalCalendar.map((month, index) => (
              <Card key={index} className="brand-card">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg text-teal-600">{month.month}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {month.festivals.map((festival, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center">
                        <Zap className="w-3 h-3 text-teal-600 mr-2" />
                        {festival}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Festival Tours */}
      <section className="py-20 section-purple-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              All Festival
              <span className="gradient-text"> Tours</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {festivalToursData.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                onBookNow={handleBookNow}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-teal-gradient-dark text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Join the Celebration?
          </h2>
          <p className="text-xl mb-8 text-teal-100">
            Experience the magic of Bhutanese festivals with our expert cultural guides
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-br from-white to-teal-50 text-teal-900 hover:bg-teal-50 text-lg px-8 py-4">
              <PartyPopper className="w-5 h-5 mr-2" />
              Book Festival Tour
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-900 text-lg px-8 py-4">
              <Calendar className="w-5 h-5 mr-2" />
              Download Calendar
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