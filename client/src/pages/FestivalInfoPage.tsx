import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, Clock, MapPin, Star, Users, Camera, 
  Music, Palette, Heart, Info, BookOpen, Ticket
} from "lucide-react";
import { Link } from "wouter";

export default function FestivalInfoPage() {
  const festivalCategories = [
    {
      name: "Religious Festivals (Tsechus)",
      description: "Sacred celebrations honoring Guru Rinpoche with masked dances and spiritual ceremonies",
      icon: "🙏",
      significance: "These festivals commemorate the life and teachings of Guru Rinpoche, who brought Buddhism to Bhutan in the 8th century. Each tsechu is believed to cleanse sins and bring merit to those who attend."
    },
    {
      name: "Cultural Celebrations",
      description: "Traditional festivals celebrating Bhutanese heritage, arts, and community bonds",
      icon: "🎭",
      significance: "These festivals preserve and celebrate Bhutan's rich cultural heritage, showcasing traditional arts, crafts, music, and dance that have been passed down through generations."
    },
    {
      name: "Seasonal Festivals",
      description: "Celebrations marking agricultural cycles and natural phenomena",
      icon: "🌸",
      significance: "Connected to Bhutan's agricultural calendar, these festivals celebrate the harmony between humans and nature, marking important seasonal transitions and harvests."
    }
  ];

  const majorFestivals = [
    {
      name: "Paro Tsechu",
      dates: "March/April (varies by lunar calendar)",
      location: "Paro Rinpung Dzong",
      duration: "5 days",
      description: "One of Bhutan's most spectacular and popular festivals, featuring sacred mask dances performed by monks and the unfurling of a giant thangka (religious painting) that is believed to cleanse sins by sight alone.",
      highlights: [
        "Unfurling of the sacred Guru Tshengye thangka at dawn",
        "Cham dances performed by monks in elaborate costumes",
        "Traditional atsara (clown) performances",
        "Blessing ceremonies and prayer offerings",
        "Local food stalls and traditional crafts market"
      ],
      significance: "This festival commemorates the victory of good over evil and is considered one of the most auspicious times to visit Bhutan. The giant thangka is displayed only once a year at dawn on the final day.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Thimphu Tshechu",
      dates: "September/October (varies by lunar calendar)",
      location: "Tashichho Dzong, Thimphu",
      duration: "3 days",
      description: "The capital's grandest festival, established in 1867, featuring elaborate religious mask dances, traditional music, and colorful ceremonies attended by thousands including the royal family.",
      highlights: [
        "Royal family attendance and blessings",
        "Elaborate mask dances in the dzong courtyard",
        "Traditional Bhutanese music and instruments",
        "Cultural exhibitions and handicraft displays",
        "Community feast and social gatherings"
      ],
      significance: "As the capital's premier festival, it represents the unity of the nation and the continuity of Buddhist traditions in modern Bhutan.",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Punakha Drubchen & Tshechu",
      dates: "February/March (varies by lunar calendar)",
      location: "Punakha Dzong",
      duration: "4 days",
      description: "A unique festival that recreates the 17th-century battle against Tibetan invaders, followed by traditional religious ceremonies. The dramatic war dances and historical reenactments make this festival particularly captivating.",
      highlights: [
        "Historical war dance reenactments",
        "Traditional weapons and armor displays",
        "Pazaps (local militia) in traditional dress",
        "Religious ceremonies and blessings",
        "Scenic location at river confluence"
      ],
      significance: "This festival celebrates Bhutan's military history and the successful defense of the kingdom, while also honoring spiritual traditions.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Bumthang Jambay Lhakhang Drup",
      dates: "October/November (varies by lunar calendar)",
      location: "Jambay Lhakhang, Bumthang",
      duration: "3 days",
      description: "One of Bhutan's most ancient and mystical festivals, featuring the famous fire ceremony and sacred naked dance performed at midnight. This festival offers a glimpse into Bhutan's most esoteric Buddhist practices.",
      highlights: [
        "Sacred fire ceremony (mewang)",
        "Midnight naked dance (ter cham)",
        "Ancient temple rituals and prayers",
        "Traditional butter lamp offerings",
        "Spiritual blessings and merit-making"
      ],
      significance: "Held at one of Bhutan's oldest temples, this festival is deeply spiritual and offers participants the opportunity to witness rare and sacred Buddhist rituals.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const festivalElements = [
    {
      name: "Cham Dances",
      description: "Sacred mask dances performed by monks to drive away evil spirits and bring blessings",
      details: "These elaborate dances, performed in colorful silk costumes and intricate masks, tell stories from Buddhist mythology and serve both spiritual and educational purposes."
    },
    {
      name: "Traditional Music",
      description: "Ancient melodies played on traditional instruments during ceremonies",
      details: "Festivals feature traditional instruments like dungchen (long horns), rolmo (cymbals), and nga (drums) that create the sacred soundscape for religious ceremonies."
    },
    {
      name: "Thangka Displays",
      description: "Giant religious paintings unfurled during special ceremonies",
      details: "These massive silk paintings, some over 100 feet tall, are considered sacred and are believed to bestow blessings and purify negative karma simply by viewing them."
    },
    {
      name: "Community Participation",
      description: "Local families dress in their finest traditional attire to attend festivals",
      details: "Festivals are major social events where communities come together, strengthening bonds and passing cultural traditions to younger generations."
    }
  ];

  const festivalEtiquette = [
    {
      title: "Dress Respectfully",
      description: "Wear modest clothing and remove hats when entering sacred areas"
    },
    {
      title: "Photography Guidelines",
      description: "Ask permission before photographing people and respect no-photo zones"
    },
    {
      title: "Maintain Silence",
      description: "Keep quiet during religious ceremonies and avoid disrupting performances"
    },
    {
      title: "Follow Local Customs",
      description: "Observe how locals behave and follow their lead in showing respect"
    },
    {
      title: "Arrive Early",
      description: "Popular festivals can be crowded, so arrive early for the best viewing spots"
    },
    {
      title: "Stay Hydrated",
      description: "Bring water and snacks as festivals can last many hours"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 bg-gradient-to-br from-amber-50 to-red-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-amber-600 text-white text-sm px-4 py-2 mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            Festival Information
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Sacred Celebrations of <span className="gradient-text">Bhutan</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover the spiritual heart of Bhutan through its vibrant festivals, where ancient Buddhist traditions come alive through colorful mask dances, sacred ceremonies, and community celebrations that have remained unchanged for centuries.
          </p>
        </div>

        {/* Festival Categories */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {festivalCategories.map((category, index) => (
            <Card key={index} className="text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-4">{category.icon}</div>
                <CardTitle className="text-xl text-gray-900">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <p className="text-sm text-gray-500 italic">{category.significance}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Festival Information */}
        <Tabs defaultValue="major-festivals" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="major-festivals">Major Festivals</TabsTrigger>
            <TabsTrigger value="elements">Festival Elements</TabsTrigger>
            <TabsTrigger value="calendar">2025 Calendar</TabsTrigger>
            <TabsTrigger value="etiquette">Visitor Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="major-festivals" className="space-y-8">
            {majorFestivals.map((festival, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={festival.image}
                      alt={festival.name}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{festival.name}</h3>
                      <Badge variant="secondary">{festival.duration}</Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{festival.dates}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{festival.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-6">{festival.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Festival Highlights:</h4>
                        <ul className="space-y-2">
                          {festival.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Star className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-600">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Cultural Significance:</h4>
                        <p className="text-sm text-gray-600">{festival.significance}</p>
                        
                        <div className="mt-4">
                          <Link href="/festivals">
                            <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                              <Ticket className="w-4 h-4 mr-2" />
                              Book Festival Tour
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="elements" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              {festivalElements.map((element, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <Music className="w-6 h-6 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{element.name}</h3>
                      <p className="text-gray-600 mb-3">{element.description}</p>
                      <p className="text-sm text-gray-500">{element.details}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Festival Calendar 2025</CardTitle>
                <p className="text-center text-gray-600">
                  Festival dates vary according to the lunar calendar. Exact dates are confirmed closer to the time.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid md:grid-cols-4 gap-4 p-4 bg-teal-50 rounded-lg">
                    <div className="font-semibold text-teal-900">Spring (Mar-May)</div>
                    <div className="text-sm text-gray-700">Paro Tsechu</div>
                    <div className="text-sm text-gray-700">Punakha Drubchen</div>
                    <div className="text-sm text-gray-700">Ura Yakchoe</div>
                  </div>
                  
                  <div className="grid md:grid-cols-4 gap-4 p-4 bg-green-50 rounded-lg">
                    <div className="font-semibold text-green-900">Summer (Jun-Aug)</div>
                    <div className="text-sm text-gray-700">Kurjey Tshechu</div>
                    <div className="text-sm text-gray-700">Nimalung Tshechu</div>
                    <div className="text-sm text-gray-700">Mushroom Festival</div>
                  </div>
                  
                  <div className="grid md:grid-cols-4 gap-4 p-4 bg-orange-50 rounded-lg">
                    <div className="font-semibold text-orange-900">Autumn (Sep-Nov)</div>
                    <div className="text-sm text-gray-700">Thimphu Tshechu</div>
                    <div className="text-sm text-gray-700">Wangdue Tshechu</div>
                    <div className="text-sm text-gray-700">Jambay Lhakhang Drup</div>
                  </div>
                  
                  <div className="grid md:grid-cols-4 gap-4 p-4 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg">
                    <div className="font-semibold text-gray-900">Winter (Dec-Feb)</div>
                    <div className="text-sm text-gray-700">Trongsa Tshechu</div>
                    <div className="text-sm text-gray-700">Punakha Tshechu</div>
                    <div className="text-sm text-gray-700">Chorten Kora</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="etiquette" className="space-y-6">
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl">Festival Etiquette & Visitor Guidelines</CardTitle>
                <p className="text-gray-600">
                  Respect local customs and traditions while enjoying these sacred celebrations.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {festivalEtiquette.map((rule, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg">
                      <div className="bg-orange-100 p-2 rounded-full">
                        <Info className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{rule.title}</h4>
                        <p className="text-sm text-gray-600">{rule.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-orange-50 rounded-xl">
                  <h4 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Remember
                  </h4>
                  <p className="text-orange-800">
                    Festivals are sacred occasions for Bhutanese people. Your respectful participation helps preserve these ancient traditions and creates meaningful cultural exchange. Consider hiring a local guide to better understand the spiritual significance of what you're witnessing.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-amber-600 to-red-600 text-white">
            <h2 className="text-3xl font-bold mb-4">Experience Bhutan's Sacred Festivals</h2>
            <p className="text-xl mb-6 opacity-90">
              Join us for an authentic cultural immersion during Bhutan's most spectacular celebrations.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/festivals">
                <Button className="bg-gradient-to-br from-white to-teal-50 text-amber-600 hover:bg-gray-100 px-8 py-3">
                  <Calendar className="w-5 h-5 mr-2" />
                  View Festival Calendar
                </Button>
              </Link>
              <Link href="/tours?category=festival">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-amber-600 px-8 py-3">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Festival Tour Packages
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}