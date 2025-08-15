import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Luggage, Shirt, Camera, Heart, Shield, Utensils,
  Banknote, Phone, Wifi, Car, Clock, AlertTriangle,
  CheckCircle, Info, Star, Globe, Mountain, Users,
  Thermometer, Droplets, Sun, Moon, Compass, Map
} from "lucide-react";
import { Link } from "react-router-dom";

export default function TravelTipsPage() {
  const packingEssentials = [
    {
      category: "Clothing",
      icon: Shirt,
      items: [
        "Layered clothing for varying temperatures",
        "Warm jacket for high altitudes",
        "Comfortable walking shoes",
        "Rain jacket or poncho",
        "Modest clothing for monasteries",
        "Sun hat and sunglasses"
      ]
    },
    {
      category: "Electronics",
      icon: Camera,
      items: [
        "Camera with extra batteries",
        "Power bank for long days",
        "Universal adapter (Type C, D, G)",
        "Headlamp or flashlight",
        "Phone with offline maps",
        "Portable charger"
      ]
    },
    {
      category: "Health & Safety",
      icon: Heart,
      items: [
        "Personal medications",
        "First aid kit basics",
        "Altitude sickness medication",
        "Sunscreen (high SPF)",
        "Insect repellent",
        "Hand sanitizer"
      ]
    },
    {
      category: "Documents",
      icon: Shield,
      items: [
        "Passport (6+ months validity)",
        "Visa clearance letter",
        "Travel insurance documents",
        "Flight confirmations",
        "Emergency contact information",
        "Copies of important documents"
      ]
    }
  ];

  const culturalEtiquette = [
    {
      title: "Monastery Visits",
      dos: [
        "Remove shoes before entering",
        "Dress modestly (cover shoulders/knees)",
        "Walk clockwise around stupas",
        "Ask permission before photographing"
      ],
      donts: [
        "Don't point feet toward Buddha statues",
        "Don't touch religious artifacts",
        "Don't wear revealing clothing",
        "Don't use flash photography"
      ]
    },
    {
      title: "Social Interactions",
      dos: [
        "Greet with 'Kuzuzangpo' (hello)",
        "Accept offerings with both hands",
        "Show respect to elders",
        "Remove hat when meeting people"
      ],
      donts: [
        "Don't point with single finger",
        "Don't touch someone's head",
        "Don't refuse hospitality rudely",
        "Don't show soles of feet"
      ]
    },
    {
      title: "Photography",
      dos: [
        "Ask permission for portraits",
        "Respect 'no photography' signs",
        "Be discreet during ceremonies",
        "Share photos with subjects if possible"
      ],
      donts: [
        "Don't photograph without permission",
        "Don't use flash in monasteries",
        "Don't photograph military installations",
        "Don't be intrusive during rituals"
      ]
    }
  ];

  const healthTips = [
    {
      topic: "Altitude Sickness",
      description: "Bhutan's high altitude can affect some visitors",
      symptoms: ["Headache", "Nausea", "Dizziness", "Fatigue"],
      prevention: [
        "Ascend gradually",
        "Stay hydrated",
        "Avoid alcohol initially",
        "Rest when needed",
        "Consider altitude medication"
      ]
    },
    {
      topic: "Food & Water Safety",
      description: "Enjoy local cuisine safely",
      symptoms: ["Stomach upset", "Dehydration", "Food poisoning"],
      prevention: [
        "Drink bottled or boiled water",
        "Eat at reputable restaurants",
        "Avoid raw vegetables initially",
        "Try local food gradually",
        "Carry probiotics"
      ]
    },
    {
      topic: "Weather Preparation",
      description: "Bhutan's weather can change quickly",
      symptoms: ["Sunburn", "Hypothermia", "Dehydration"],
      prevention: [
        "Layer clothing appropriately",
        "Use high SPF sunscreen",
        "Stay hydrated",
        "Check weather forecasts",
        "Carry rain protection"
      ]
    }
  ];

  const budgetGuide = [
    {
      category: "Sustainable Development Fee",
      amount: "$200 per person per day",
      description: "Mandatory fee covering most services",
      includes: ["3-star accommodation", "All meals", "Licensed guide", "Transportation", "Entrance fees"]
    },
    {
      category: "Additional Costs",
      amount: "$50-200 per day",
      description: "Personal expenses and upgrades",
      includes: ["Souvenirs", "Tips", "Drinks", "Luxury upgrades", "Optional activities"]
    },
    {
      category: "Visa & Flights",
      amount: "$500-2000",
      description: "One-time costs",
      includes: ["Visa fee ($40)", "International flights", "Travel insurance", "Airport taxes"]
    }
  ];

  const communicationTips = [
    {
      aspect: "Language",
      info: "Dzongkha is official, English widely spoken",
      tips: ["Learn basic Dzongkha phrases", "English works in tourist areas", "Guides speak excellent English"]
    },
    {
      aspect: "Internet",
      info: "WiFi available in hotels and cafes",
      tips: ["Buy local SIM card", "Download offline maps", "WiFi can be slow in remote areas"]
    },
    {
      aspect: "Phone",
      info: "International roaming available",
      tips: ["Check roaming charges", "Local SIM cards available", "WhatsApp works well"]
    }
  ];

  const transportationTips = [
    {
      mode: "Domestic Flights",
      description: "Limited helicopter services only",
      tips: ["Weather dependent", "Expensive but scenic", "Advance booking required"]
    },
    {
      mode: "Road Travel",
      description: "Primary mode of transportation",
      tips: ["Winding mountain roads", "Journey times can vary", "Scenic but can cause motion sickness"]
    },
    {
      mode: "Walking",
      description: "Essential for many attractions",
      tips: ["Comfortable shoes essential", "Some steep climbs", "Take your time at altitude"]
    }
  ];

  const seasonalAdvice = [
    {
      season: "Spring (Mar-May)",
      weather: "Clear skies, rhododendron blooms",
      clothing: "Layers, light jacket",
      activities: "Trekking, photography, festivals",
      tips: ["Book early", "Perfect weather", "Crowded season"]
    },
    {
      season: "Summer (Jun-Aug)",
      weather: "Monsoon rains, lush greenery",
      clothing: "Rain gear, quick-dry clothes",
      activities: "Cultural tours, indoor activities",
      tips: ["Fewer crowds", "Road conditions vary", "Beautiful landscapes"]
    },
    {
      season: "Autumn (Sep-Nov)",
      weather: "Clear skies, perfect visibility",
      clothing: "Warm layers, good shoes",
      activities: "Trekking, festivals, photography",
      tips: ["Peak season", "Book well in advance", "Excellent weather"]
    },
    {
      season: "Winter (Dec-Feb)",
      weather: "Cold, clear, snow at high altitudes",
      clothing: "Warm clothes, winter gear",
      activities: "Cultural tours, lower altitude areas",
      tips: ["Fewer tourists", "Some roads may close", "Clear mountain views"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 bg-gradient-to-br from-teal-50 to-teal-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-teal-600 text-white text-sm px-4 py-2 mb-4">
            <Compass className="w-4 h-4 mr-2" />
            Travel Tips & Advice
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Your Complete <span className="bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">Bhutan Guide</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Essential tips, cultural insights, and practical advice to help you make the most of your 
            journey to the Last Shangri-La. Be prepared, respectful, and ready for adventure.
          </p>
        </div>

        {/* Quick Tips */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center border-teal-100">
            <CardContent className="p-6">
              <Clock className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Plan Ahead</h3>
              <p className="text-sm text-gray-600">Book 2-3 months in advance</p>
            </CardContent>
          </Card>
          <Card className="text-center border-teal-100">
            <CardContent className="p-6">
              <Heart className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Respect Culture</h3>
              <p className="text-sm text-gray-600">Follow local customs</p>
            </CardContent>
          </Card>
          <Card className="text-center border-teal-100">
            <CardContent className="p-6">
              <Mountain className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Prepare for Altitude</h3>
              <p className="text-sm text-gray-600">Take it slow and steady</p>
            </CardContent>
          </Card>
          <Card className="text-center border-teal-100">
            <CardContent className="p-6">
              <Camera className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Capture Memories</h3>
              <p className="text-sm text-gray-600">Ask permission first</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="packing" className="space-y-8">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="packing">Packing</TabsTrigger>
            <TabsTrigger value="culture">Culture</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
          </TabsList>

          {/* Packing Tab */}
          <TabsContent value="packing" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Luggage className="w-5 h-5 text-teal-600" />
                  Essential Packing Guide
                </CardTitle>
                <p className="text-gray-600">
                  Pack smart for Bhutan's diverse climate and cultural requirements.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {packingEssentials.map((category, index) => (
                    <div key={index} className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-teal-100 p-2 rounded-full">
                          <category.icon className="w-5 h-5 text-teal-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 text-lg">{category.category}</h4>
                      </div>
                      <ul className="space-y-2">
                        {category.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-800 mb-2">Packing Tips</h4>
                      <ul className="text-sm text-amber-700 space-y-1">
                        <li>• Pack in layers - temperatures vary greatly by altitude</li>
                        <li>• Bring comfortable, broken-in walking shoes</li>
                        <li>• Pack modest clothing for monastery visits</li>
                        <li>• Bring extra batteries - cold weather drains them quickly</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Culture Tab */}
          <TabsContent value="culture" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-teal-600" />
                  Cultural Etiquette Guide
                </CardTitle>
                <p className="text-gray-600">
                  Respect local customs and traditions for a meaningful experience.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {culturalEtiquette.map((section, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-gray-900 text-lg mb-4">{section.title}</h4>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                          <h5 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Do's
                          </h5>
                          <ul className="space-y-2">
                            {section.dos.map((item, idx) => (
                              <li key={idx} className="text-sm text-green-700 flex items-start gap-2">
                                <span className="text-green-500 mt-1">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                          <h5 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            Don'ts
                          </h5>
                          <ul className="space-y-2">
                            {section.donts.map((item, idx) => (
                              <li key={idx} className="text-sm text-red-700 flex items-start gap-2">
                                <span className="text-red-500 mt-1">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Health Tab */}
          <TabsContent value="health" className="space-y-8">
            <div className="space-y-6">
              {healthTips.map((tip, index) => (
                <Card key={index} className="border-teal-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-teal-600" />
                      {tip.topic}
                    </CardTitle>
                    <p className="text-gray-600">{tip.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3">Symptoms to Watch:</h5>
                        <div className="flex flex-wrap gap-2">
                          {tip.symptoms.map((symptom, idx) => (
                            <Badge key={idx} variant="outline" className="border-red-200 text-red-700">
                              {symptom}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3">Prevention Tips:</h5>
                        <ul className="space-y-1">
                          {tip.prevention.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Budget Tab */}
          <TabsContent value="budget" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Banknote className="w-5 h-5 text-teal-600" />
                  Budget Planning Guide
                </CardTitle>
                <p className="text-gray-600">
                  Understand Bhutan's unique pricing structure and plan your budget accordingly.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {budgetGuide.map((item, index) => (
                    <div key={index} className="p-6 bg-teal-50 rounded-lg border border-teal-100">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 text-lg">{item.category}</h4>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-teal-600">{item.amount}</div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Includes:</h5>
                        <div className="flex flex-wrap gap-2">
                          {item.includes.map((include, idx) => (
                            <Badge key={idx} variant="outline" className="border-teal-200 text-teal-700">
                              {include}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-teal-50 border border-teal-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-teal-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-emerald-800 mb-2">Money Matters</h4>
                      <ul className="text-sm text-teal-700 space-y-1">
                        <li>• Bhutanese Ngultrum (BTN) is the local currency</li>
                        <li>• Indian Rupees are also accepted</li>
                        <li>• Credit cards accepted in major hotels and shops</li>
                        <li>• ATMs available in Thimphu and Paro</li>
                        <li>• Carry some cash for small purchases</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Communication Tab */}
          <TabsContent value="communication" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-teal-600" />
                  Communication & Connectivity
                </CardTitle>
                <p className="text-gray-600">
                  Stay connected and communicate effectively during your visit.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {communicationTips.map((tip, index) => (
                    <div key={index} className="p-4 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{tip.aspect}</h4>
                        <Badge variant="outline">{tip.info}</Badge>
                      </div>
                      <ul className="space-y-1">
                        {tip.tips.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">Useful Dzongkha Phrases</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-700">Hello</span>
                        <span className="font-medium">Kuzuzangpo</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-700">Thank you</span>
                        <span className="font-medium">Kadrinche</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-700">Goodbye</span>
                        <span className="font-medium">Logsho</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-700">Please</span>
                        <span className="font-medium">Zhugdra</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-700">Excuse me</span>
                        <span className="font-medium">Goenpa</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-700">How much?</span>
                        <span className="font-medium">Gachi ray?</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Seasonal Tab */}
          <TabsContent value="seasonal" className="space-y-8">
            <div className="space-y-6">
              {seasonalAdvice.map((season, index) => (
                <Card key={index} className="border-teal-100">
                  <CardHeader>
                    <CardTitle className="text-xl">{season.season}</CardTitle>
                    <p className="text-gray-600">{season.weather}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <Shirt className="w-4 h-4 text-teal-600" />
                          What to Pack
                        </h5>
                        <p className="text-sm text-gray-600">{season.clothing}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <Camera className="w-4 h-4 text-teal-600" />
                          Best Activities
                        </h5>
                        <p className="text-sm text-gray-600">{season.activities}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <Star className="w-4 h-4 text-teal-600" />
                          Travel Tips
                        </h5>
                        <div className="space-y-1">
                          {season.tips.map((tip, idx) => (
                            <p key={idx} className="text-sm text-gray-600">• {tip}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready for Your Bhutan Adventure?</h2>
            <p className="text-xl mb-6 opacity-90">
              Armed with these tips, you're ready to experience the magic of the Last Shangri-La.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/tours">
                <Button className="bg-gradient-to-br from-white to-teal-50 text-teal-600 hover:bg-gray-100 px-8 py-3">
                  <Compass className="w-5 h-5 mr-2" />
                  Explore Tours
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600 px-8 py-3">
                  Get Expert Advice
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}