import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    ArrowLeft,
    Calendar,
    Camera,
    Cloud,
    MapPin,
    Mountain,
    Snowflake,
    Star,
    Sun,
    Thermometer
} from "lucide-react";
import { Link } from "react-router-dom";

const DESTINATION_DETAILS = {
  "paro": {
    name: "Paro Valley",
    description: "The gateway to Bhutan and home to the country's only international airport, Paro Valley is a treasure trove of cultural and natural wonders. This pristine valley, surrounded by terraced fields and traditional farmhouses, offers visitors their first glimpse into Bhutan's timeless way of life.",
    altitude: "2,200m",
    bestTime: "March-May, September-November",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Tiger's Nest Monastery (Paro Taktsang)",
      "Rinpung Dzong - Fortress of the Heap of Jewels",
      "National Museum of Bhutan",
      "Drukgyel Dzong ruins",
      "Traditional farmhouses and villages",
      "Paro Weekend Market",
      "Kyichu Lhakhang - oldest temple in Bhutan"
    ],
    activities: [
      "Tiger's Nest Monastery hike (3-4 hours)",
      "Cultural sightseeing tours",
      "Traditional archery experiences",
      "Farmhouse visits and home-cooked meals",
      "Photography walks through rice terraces",
      "Mountain biking in the valley",
      "Hot stone bath experiences"
    ],
    accommodation: [
      "Amankora Paro - Ultra-luxury lodge",
      "Uma Paro by COMO - Contemporary luxury",
      "Le Méridien Paro - International standard",
      "Zhiwa Ling Heritage Hotel - Boutique heritage",
      "Traditional guesthouses and homestays"
    ],
    weather: {
      spring: "15-20°C, clear skies, rhododendron blooms",
      summer: "20-25°C, monsoon rains, lush greenery",
      autumn: "10-18°C, crystal clear views, perfect weather",
      winter: "5-15°C, cold but sunny, snow-capped peaks"
    },
    culturalSignificance: "Paro holds immense spiritual significance as the location of Tiger's Nest Monastery, where Guru Rinpoche first brought Buddhism to Bhutan. The valley is dotted with sacred sites and ancient temples that have been pilgrimage destinations for over 1,300 years."
  },
  "thimphu": {
    name: "Thimphu - The Capital",
    description: "Bhutan's capital and largest city, Thimphu uniquely blends ancient traditions with modern development. As the political and economic center, it showcases how Bhutan maintains its cultural identity while embracing sustainable progress.",
    altitude: "2,320m",
    bestTime: "Year-round destination",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Buddha Dordenma - World's largest sitting Buddha statue",
      "Tashichho Dzong - Seat of government",
      "Weekend Market - Authentic local produce",
      "Memorial Chorten - Always bustling with devotees",
      "Traditional Medicine Institute",
      "Textile Museum showcasing Bhutanese weaving",
      "Centenary Farmers Market"
    ],
    activities: [
      "Weekend market exploration",
      "Buddha Point sunset viewing",
      "Traditional arts and crafts shopping",
      "Dzong architecture tours",
      "Local restaurant food tours",
      "Hiking to Tango and Cheri monasteries",
      "Cultural performances at Royal Academy"
    ],
    accommodation: [
      "Amankora Thimphu - Luxury in the capital",
      "Six Senses Thimphu - Eco-luxury resort",
      "Taj Tashi - Grand luxury hotel",
      "Hotel Druk - Heritage property",
      "Boutique hotels and modern guesthouses"
    ],
    weather: {
      spring: "12-18°C, pleasant weather, clear mountain views",
      summer: "18-24°C, warm days, occasional rain",
      autumn: "8-16°C, crisp air, excellent visibility",
      winter: "2-12°C, cold but sunny, clear skies"
    },
    culturalSignificance: "As Bhutan's capital since 1961, Thimphu represents the country's unique approach to modernization while preserving tradition. It's the only world capital without traffic lights, symbolizing Bhutan's human-centered approach to development."
  }
};

export default function DestinationDetailPage() {
  // For demo purposes, showing Paro details
  const destination = DESTINATION_DETAILS.paro;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 bg-gradient-to-br from-teal-50 to-emerald-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/#destinations">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Destinations
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="relative mb-8">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-96 object-cover rounded-2xl shadow-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h1 className="text-5xl font-bold mb-4">{destination.name}</h1>
            <div className="flex items-center space-x-6 text-lg">
              <div className="flex items-center">
                <Mountain className="w-5 h-5 mr-2" />
                <span>{destination.altitude} altitude</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{destination.bestTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Overview */}
        <Card className="mb-8 p-8">
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            {destination.description}
          </p>
          <div className="bg-teal-50 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Cultural Significance</h3>
            <p className="text-gray-700">{destination.culturalSignificance}</p>
          </div>
        </Card>

        {/* Detailed Information */}
        <Tabs defaultValue="attractions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="attractions">Attractions</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="accommodation">Stay</TabsTrigger>
            <TabsTrigger value="weather">Weather</TabsTrigger>
          </TabsList>

          <TabsContent value="attractions" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Must-Visit Attractions</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {destination.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start p-4 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl">
                    <Star className="w-5 h-5 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {highlight.split(' - ')[0]}
                      </h4>
                      {highlight.includes(' - ') && (
                        <p className="text-sm text-gray-600">
                          {highlight.split(' - ')[1]}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Things to Do</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {destination.activities.map((activity, index) => (
                  <div key={index} className="flex items-start p-4 bg-green-50 rounded-xl">
                    <Camera className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{activity}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="accommodation" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Where to Stay</h3>
              <div className="space-y-4">
                {destination.accommodation.map((hotel, index) => (
                  <div key={index} className="flex items-start p-4 bg-teal-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-teal-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {hotel.split(' - ')[0]}
                      </h4>
                      {hotel.includes(' - ') && (
                        <p className="text-sm text-gray-600">
                          {hotel.split(' - ')[1]}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="weather" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Seasonal Weather Guide</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center mb-3">
                    <Sun className="w-6 h-6 text-green-600 mr-2" />
                    <h4 className="font-bold text-gray-900">Spring (Mar-May)</h4>
                  </div>
                  <p className="text-gray-700">{destination.weather.spring}</p>
                </div>
                
                <div className="p-4 bg-teal-50 rounded-xl">
                  <div className="flex items-center mb-3">
                    <Cloud className="w-6 h-6 text-teal-600 mr-2" />
                    <h4 className="font-bold text-gray-900">Summer (Jun-Aug)</h4>
                  </div>
                  <p className="text-gray-700">{destination.weather.summer}</p>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-xl">
                  <div className="flex items-center mb-3">
                    <Thermometer className="w-6 h-6 text-amber-600 mr-2" />
                    <h4 className="font-bold text-gray-900">Autumn (Sep-Nov)</h4>
                  </div>
                  <p className="text-gray-700">{destination.weather.autumn}</p>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl">
                  <div className="flex items-center mb-3">
                    <Snowflake className="w-6 h-6 text-gray-600 mr-2" />
                    <h4 className="font-bold text-gray-900">Winter (Dec-Feb)</h4>
                  </div>
                  <p className="text-gray-700">{destination.weather.winter}</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <Card className="mt-8 p-8 bg-gradient-to-r from-teal-50 to-green-50">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Explore {destination.name}?
            </h3>
            <p className="text-gray-600 mb-6">
              Let our local experts create the perfect itinerary for your visit to this magical destination.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/tours">
                <Button>
                  View Tour Packages
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline">
                  Plan Custom Trip
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}