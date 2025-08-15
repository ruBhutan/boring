import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Crown, Heart, Mountain, Camera, Users, Star,
  Compass, TreePine, Flower, Moon, Sun, Wind,
  Award, Shield, Globe, Calendar, Clock, MapPin,
  Sparkles, Zap, Eye, Palette, Music, Book
} from "lucide-react";
import { Link } from "react-router-dom";

export default function UniqueExperiencesPage() {
  const spiritualExperiences = [
    {
      title: "Meditation with Monks",
      description: "Join Buddhist monks for morning meditation sessions in ancient monasteries",
      duration: "2-3 hours",
      difficulty: "Easy",
      highlights: ["Authentic practice", "Monastery setting", "Monk guidance", "Inner peace"],
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=600&q=80",
      icon: Heart
    },
    {
      title: "Prayer Flag Ceremony",
      description: "Participate in traditional prayer flag hanging ceremonies at sacred sites",
      duration: "1-2 hours",
      difficulty: "Easy",
      highlights: ["Sacred ritual", "Mountain views", "Blessing ceremony", "Cultural immersion"],
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=600&q=80",
      icon: Wind
    },
    {
      title: "Monastery Overnight Stay",
      description: "Experience monastic life with overnight stays in traditional monasteries",
      duration: "1-2 nights",
      difficulty: "Moderate",
      highlights: ["Monastic life", "Dawn prayers", "Simple living", "Spiritual insight"],
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
      icon: Moon
    }
  ];

  const culturalExperiences = [
    {
      title: "Traditional Archery Competition",
      description: "Join locals in Bhutan's national sport with traditional bamboo bows",
      duration: "Half day",
      difficulty: "Easy",
      highlights: ["National sport", "Local interaction", "Traditional equipment", "Celebration"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
      icon: Award
    },
    {
      title: "Farmhouse Homestay",
      description: "Live with Bhutanese families and experience authentic rural life",
      duration: "1-3 nights",
      difficulty: "Easy",
      highlights: ["Family life", "Home cooking", "Farm activities", "Cultural exchange"],
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b830?auto=format&fit=crop&w=600&q=80",
      icon: Users
    },
    {
      title: "Traditional Craft Workshop",
      description: "Learn ancient crafts like weaving, wood carving, and thangka painting",
      duration: "2-4 hours",
      difficulty: "Moderate",
      highlights: ["Master artisans", "Hands-on learning", "Take home creation", "Cultural skills"],
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80",
      icon: Palette
    }
  ];

  const adventureExperiences = [
    {
      title: "High Altitude Camping",
      description: "Camp under pristine Himalayan skies at altitudes above 4,000m",
      duration: "2-5 nights",
      difficulty: "Challenging",
      highlights: ["Stargazing", "Mountain views", "Pristine wilderness", "Adventure camping"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
      icon: Mountain
    },
    {
      title: "Yak Herder Experience",
      description: "Join nomadic yak herders in high-altitude pastures",
      duration: "1-2 days",
      difficulty: "Moderate",
      highlights: ["Nomadic life", "Yak herding", "High pastures", "Traditional lifestyle"],
      image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=600&q=80",
      icon: Compass
    },
    {
      title: "Helicopter to Sacred Lakes",
      description: "Helicopter access to remote sacred lakes in the high Himalayas",
      duration: "Full day",
      difficulty: "Easy",
      highlights: ["Helicopter flight", "Sacred lakes", "Remote access", "Pristine nature"],
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=600&q=80",
      icon: Zap
    }
  ];

  const seasonalExperiences = [
    {
      season: "Spring",
      title: "Rhododendron Festival",
      description: "Witness the spectacular blooming of rhododendrons across Bhutan",
      timing: "March - May",
      highlights: ["National flower", "Forest blooms", "Photography", "Nature walks"],
      icon: Flower,
      color: "text-pink-600"
    },
    {
      season: "Summer",
      title: "Monsoon Meditation Retreats",
      description: "Indoor spiritual practices during the peaceful monsoon season",
      timing: "June - August",
      highlights: ["Meditation focus", "Indoor activities", "Spiritual growth", "Peaceful atmosphere"],
      icon: Heart,
      color: "text-teal-600"
    },
    {
      season: "Autumn",
      title: "Festival Season",
      description: "Experience multiple traditional festivals across the kingdom",
      timing: "September - November",
      highlights: ["Multiple festivals", "Cultural celebrations", "Traditional dances", "Local participation"],
      icon: Music,
      color: "text-amber-600"
    },
    {
      season: "Winter",
      title: "Black-Necked Crane Festival",
      description: "Celebrate the arrival of endangered black-necked cranes",
      timing: "November - February",
      highlights: ["Rare birds", "Conservation", "Cultural celebration", "Wildlife viewing"],
      icon: Eye,
      color: "text-teal-400"
    }
  ];

  const exclusiveAccess = [
    {
      title: "Private Dzong Tours",
      description: "Exclusive access to fortress-monasteries with private guides",
      access: "Special permission required",
      highlights: ["Private access", "Historical insights", "Architecture", "Photography"]
    },
    {
      title: "Royal Botanical Garden",
      description: "Private tours of the royal family's botanical collections",
      access: "By arrangement only",
      highlights: ["Royal gardens", "Rare plants", "Exclusive access", "Botanical knowledge"]
    },
    {
      title: "Traditional Medicine Center",
      description: "Learn about traditional Bhutanese medicine and healing practices",
      access: "Guided visits only",
      highlights: ["Traditional medicine", "Healing practices", "Herbal knowledge", "Cultural health"]
    },
    {
      title: "Artisan Workshops",
      description: "Meet master craftsmen in their private workshops",
      access: "Pre-arranged visits",
      highlights: ["Master artisans", "Traditional skills", "Private workshops", "Cultural preservation"]
    }
  ];

  const photographySpots = [
    {
      location: "Tiger's Nest at Sunrise",
      description: "Capture the iconic monastery in golden morning light",
      bestTime: "6:00 AM - 8:00 AM",
      difficulty: "Moderate hike",
      tips: ["Early start", "Telephoto lens", "Tripod recommended", "Weather dependent"]
    },
    {
      location: "Dochula Pass Prayer Flags",
      description: "Colorful prayer flags against Himalayan backdrop",
      bestTime: "Clear weather days",
      difficulty: "Easy access",
      tips: ["Wide angle lens", "Clear day essential", "Multiple compositions", "Respectful photography"]
    },
    {
      location: "Punakha Dzong Reflection",
      description: "Fortress reflection in the confluence of two rivers",
      bestTime: "Late afternoon",
      difficulty: "Easy walk",
      tips: ["Polarizing filter", "River level dependent", "Golden hour", "Multiple angles"]
    },
    {
      location: "Bumthang Valley Landscapes",
      description: "Rolling hills, traditional houses, and pastoral scenes",
      bestTime: "Morning and evening",
      difficulty: "Easy to moderate",
      tips: ["Landscape lens", "Local interactions", "Seasonal variations", "Cultural sensitivity"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 bg-gradient-to-br from-teal-50 to-teal-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-teal-600 text-white text-sm px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Unique Experiences
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Extraordinary <span className="bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">Bhutan Adventures</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover once-in-a-lifetime experiences that go beyond ordinary tourism. From spiritual awakenings 
            to cultural immersions, create memories that will transform your understanding of happiness.
          </p>
        </div>

        {/* Experience Categories */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center border-teal-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Heart className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Spiritual</h3>
              <p className="text-sm text-gray-600">Inner peace & enlightenment</p>
            </CardContent>
          </Card>
          <Card className="text-center border-teal-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Users className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Cultural</h3>
              <p className="text-sm text-gray-600">Authentic local experiences</p>
            </CardContent>
          </Card>
          <Card className="text-center border-teal-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Mountain className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Adventure</h3>
              <p className="text-sm text-gray-600">Thrilling outdoor activities</p>
            </CardContent>
          </Card>
          <Card className="text-center border-teal-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Crown className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Exclusive</h3>
              <p className="text-sm text-gray-600">Private & special access</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="spiritual" className="space-y-8">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="spiritual">Spiritual</TabsTrigger>
            <TabsTrigger value="cultural">Cultural</TabsTrigger>
            <TabsTrigger value="adventure">Adventure</TabsTrigger>
            <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
            <TabsTrigger value="exclusive">Exclusive</TabsTrigger>
            <TabsTrigger value="photography">Photography</TabsTrigger>
          </TabsList>

          {/* Spiritual Experiences Tab */}
          <TabsContent value="spiritual" className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              {spiritualExperiences.map((experience, index) => (
                <Card key={index} className="overflow-hidden border-teal-100">
                  <div className="relative">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full">
                      <experience.icon className="w-5 h-5 text-teal-600" />
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-teal-600">{experience.duration}</Badge>
                      <Badge variant="outline">{experience.difficulty}</Badge>
                    </div>
                    <CardTitle className="text-lg">{experience.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{experience.description}</p>
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900">Highlights:</h5>
                      <div className="flex flex-wrap gap-1">
                        {experience.highlights.map((highlight, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-teal-200 text-teal-700">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button className="w-full btn-teal" size="sm">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Cultural Experiences Tab */}
          <TabsContent value="cultural" className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              {culturalExperiences.map((experience, index) => (
                <Card key={index} className="overflow-hidden border-teal-100">
                  <div className="relative">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full">
                      <experience.icon className="w-5 h-5 text-teal-600" />
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-teal-600">{experience.duration}</Badge>
                      <Badge variant="outline">{experience.difficulty}</Badge>
                    </div>
                    <CardTitle className="text-lg">{experience.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{experience.description}</p>
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900">Highlights:</h5>
                      <div className="flex flex-wrap gap-1">
                        {experience.highlights.map((highlight, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-teal-200 text-teal-700">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button className="w-full btn-teal" size="sm">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Adventure Experiences Tab */}
          <TabsContent value="adventure" className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              {adventureExperiences.map((experience, index) => (
                <Card key={index} className="overflow-hidden border-teal-100">
                  <div className="relative">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full">
                      <experience.icon className="w-5 h-5 text-teal-600" />
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-teal-600">{experience.duration}</Badge>
                      <Badge variant="outline">{experience.difficulty}</Badge>
                    </div>
                    <CardTitle className="text-lg">{experience.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{experience.description}</p>
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900">Highlights:</h5>
                      <div className="flex flex-wrap gap-1">
                        {experience.highlights.map((highlight, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-teal-200 text-teal-700">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button className="w-full btn-teal" size="sm">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Seasonal Experiences Tab */}
          <TabsContent value="seasonal" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {seasonalExperiences.map((experience, index) => (
                <Card key={index} className="border-teal-100">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-teal-600">{experience.timing}</Badge>
                      <experience.icon className={`w-6 h-6 ${experience.color}`} />
                    </div>
                    <CardTitle className="text-xl">{experience.title}</CardTitle>
                    <Badge variant="outline" className="w-fit">{experience.season}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{experience.description}</p>
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900">Highlights:</h5>
                      <div className="flex flex-wrap gap-2">
                        {experience.highlights.map((highlight, idx) => (
                          <Badge key={idx} variant="outline" className="border-teal-200 text-teal-700">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Exclusive Access Tab */}
          <TabsContent value="exclusive" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-teal-600" />
                  Exclusive Access Experiences
                </CardTitle>
                <p className="text-gray-600">
                  Special arrangements for unique access to restricted or private locations.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {exclusiveAccess.map((access, index) => (
                    <div key={index} className="p-6 bg-teal-50 rounded-lg border border-teal-100">
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="font-semibold text-gray-900 text-lg">{access.title}</h4>
                        <Badge variant="outline" className="border-teal-300 text-teal-700">
                          {access.access}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">{access.description}</p>
                      <div className="space-y-2">
                        <h5 className="font-semibold text-gray-900">Features:</h5>
                        <div className="flex flex-wrap gap-1">
                          {access.highlights.map((highlight, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs border-teal-200 text-teal-700">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Photography Tab */}
          <TabsContent value="photography" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-teal-600" />
                  Photography Hotspots
                </CardTitle>
                <p className="text-gray-600">
                  Capture Bhutan's beauty at the most photogenic locations with expert tips.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {photographySpots.map((spot, index) => (
                    <div key={index} className="p-6 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 text-lg">{spot.location}</h4>
                          <p className="text-gray-600">{spot.description}</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-teal-600 mb-2">{spot.bestTime}</Badge>
                          <br />
                          <Badge variant="outline">{spot.difficulty}</Badge>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Photography Tips:</h5>
                        <div className="flex flex-wrap gap-2">
                          {spot.tips.map((tip, idx) => (
                            <Badge key={idx} variant="outline" className="border-green-200 text-green-700">
                              {tip}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
            <h2 className="text-3xl font-bold mb-4">Create Your Unique Bhutan Story</h2>
            <p className="text-xl mb-6 opacity-90">
              Combine multiple unique experiences to create a personalized journey that matches your interests and dreams.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/custom-tour">
                <Button className="bg-gradient-to-br from-white to-teal-50 text-teal-600 hover:bg-gray-100 px-8 py-3">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Design Custom Experience
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600 px-8 py-3">
                  Speak with Expert
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}