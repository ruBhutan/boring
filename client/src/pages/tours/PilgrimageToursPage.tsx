import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Church, Mountain, Clock, Users, Star, Heart, Compass, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function PilgrimageToursPage() {
  const pilgrimageTours = [
    {
      id: 1,
      title: "Sacred Tiger's Nest Pilgrimage",
      duration: "3 Days",
      difficulty: "Moderate",
      groupSize: "6-12 people",
      price: "$650",
      image: "/api/placeholder/400/250",
      highlights: ["Paro Taktsang Monastery", "Meditation sessions", "Prayer flag ceremony", "Sacred caves"],
      description: "Journey to Bhutan's most iconic monastery, perched dramatically on a cliff face 3,000 feet above Paro valley."
    },
    {
      id: 2,
      title: "Bumthang Sacred Valley Pilgrimage",
      duration: "7 Days",
      difficulty: "Easy",
      groupSize: "8-15 people",
      price: "$1,400",
      image: "/api/placeholder/400/250",
      highlights: ["Jambay Lhakhang", "Kurjey Lhakhang", "Tamshing Monastery", "Guru Rinpoche sites"],
      description: "Explore the spiritual heartland of Bhutan, visiting ancient temples and sacred sites in the blessed Bumthang valleys."
    },
    {
      id: 3,
      title: "Punakha Dzong & Chimi Lhakhang Pilgrimage",
      duration: "4 Days",
      difficulty: "Easy",
      groupSize: "4-10 people",
      price: "$850",
      image: "/api/placeholder/400/250",
      highlights: ["Punakha Dzong", "Fertility temple", "River confluence", "Traditional blessings"],
      description: "Visit the majestic Punakha Dzong and the famous fertility temple, seeking blessings in sacred riverside locations."
    },
    {
      id: 4,
      title: "Thimphu Spiritual Circuit",
      duration: "2 Days",
      difficulty: "Easy",
      groupSize: "6-12 people",
      price: "$450",
      image: "/api/placeholder/400/250",
      highlights: ["Buddha Dordenma", "Tashichho Dzong", "Memorial Chorten", "Weekend market"],
      description: "Comprehensive spiritual tour of Bhutan's capital, combining major religious sites with cultural experiences."
    }
  ];

  const sacredSites = [
    {
      icon: Church,
      title: "Ancient Monasteries",
      description: "Visit centuries-old monasteries with active monk communities and sacred relics."
    },
    {
      icon: Mountain,
      title: "Sacred Mountains",
      description: "Experience the spiritual energy of Bhutan's holy peaks and meditation caves."
    },
    {
      icon: Heart,
      title: "Blessing Ceremonies",
      description: "Participate in traditional blessing rituals and receive sacred protection cords."
    },
    {
      icon: BookOpen,
      title: "Buddhist Teachings",
      description: "Learn from resident monks about Buddhist philosophy and meditation practices."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 bg-gradient-to-br from-amber-50 via-white to-amber-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/90 to-amber-600/90"></div>
        <div className="absolute inset-0 bg-[url('/api/placeholder/1200/600')] bg-cover bg-center"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Church className="w-16 h-16 text-white mr-4" />
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Pilgrimage Tours
            </h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Embark on a spiritual journey through Bhutan's most sacred sites. Experience profound peace and ancient wisdom in the Land of the Thunder Dragon.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
              <Church className="w-4 h-4 mr-2" />
              Sacred Sites
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
              <Heart className="w-4 h-4 mr-2" />
              Spiritual Growth
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
              <BookOpen className="w-4 h-4 mr-2" />
              Ancient Wisdom
            </Badge>
          </div>
        </div>
      </section>

      {/* Sacred Sites Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sacred Experiences Await</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with centuries of Buddhist tradition and find inner peace in Bhutan's holiest places
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sacredSites.map((site, index) => (
              <Card key={index} className="text-center border-amber-100 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <site.icon className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">{site.title}</h3>
                  <p className="text-sm text-gray-600">{site.description}</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sacred Pilgrimage Journeys</h2>
            <p className="text-lg text-gray-600">
              Choose your path to spiritual enlightenment and cultural discovery
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {pilgrimageTours.map((tour) => (
              <Card key={tour.id} className="overflow-hidden hover:shadow-xl transition-shadow border-amber-100">
                <div className="relative">
                  <img 
                    src={tour.image} 
                    alt={tour.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-amber-600 text-white">
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
                    <h4 className="font-semibold text-gray-900 mb-2">Sacred Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tour.highlights.map((highlight, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-amber-200 text-amber-700">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-amber-600">{tour.price}</div>
                    <Button className="bg-amber-600 hover:bg-amber-700">
                      Book Pilgrimage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Spiritual Practices */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Spiritual Practices & Rituals</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Heart className="w-6 h-6 text-amber-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Meditation Sessions</h3>
                    <p className="text-gray-600">Join guided meditation sessions in sacred spaces with experienced Buddhist practitioners.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Compass className="w-6 h-6 text-amber-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Prayer Wheel Spinning</h3>
                    <p className="text-gray-600">Learn the proper way to spin prayer wheels and understand their spiritual significance.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Star className="w-6 h-6 text-amber-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Blessing Ceremonies</h3>
                    <p className="text-gray-600">Receive traditional blessings from monks and participate in sacred rituals.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <BookOpen className="w-6 h-6 text-amber-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Buddhist Philosophy</h3>
                    <p className="text-gray-600">Learn about Buddhist teachings, karma, and the path to enlightenment from resident monks.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/api/placeholder/500/400" 
                alt="Buddhist meditation"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Begin Your Spiritual Journey
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Discover inner peace and ancient wisdom in Bhutan's most sacred places
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-br from-white to-teal-50 text-amber-600 hover:bg-gray-100">
                Plan Your Pilgrimage
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