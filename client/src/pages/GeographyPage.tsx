import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mountain, MapPin, Thermometer, Droplets, Wind, 
  TreePine, Flower, Users, Building, Crown, 
  Calendar, Camera, Compass, Route, Globe,
  Sun, Cloud, Snowflake, Leaf
} from "lucide-react";
import { Link } from "react-router-dom";

export default function GeographyPage() {
  const regions = [
    {
      name: "Western Bhutan",
      districts: ["Thimphu", "Paro", "Haa", "Chhukha", "Samtse"],
      elevation: "200m - 7,000m",
      climate: "Subtropical to Alpine",
      highlights: ["Capital city", "International airport", "Tiger's Nest", "Haa Valley"],
      description: "The most developed and visited region, home to the capital and main airport.",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
      attractions: ["Paro Taktsang", "Thimphu Dzong", "Haa Valley", "Chelela Pass"]
    },
    {
      name: "Central Bhutan",
      districts: ["Bumthang", "Trongsa", "Wangdue", "Punakha"],
      elevation: "1,200m - 5,500m",
      climate: "Temperate to Alpine",
      highlights: ["Cultural heartland", "Ancient dzongs", "Spiritual centers", "Bumthang valleys"],
      description: "The cultural and spiritual heart of Bhutan with ancient monasteries and dzongs.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      attractions: ["Punakha Dzong", "Bumthang Valley", "Trongsa Dzong", "Gangtey Valley"]
    },
    {
      name: "Eastern Bhutan",
      districts: ["Trashigang", "Mongar", "Lhuentse", "Pemagatshel", "Samdrup Jongkhar"],
      elevation: "200m - 4,500m",
      climate: "Subtropical to Temperate",
      highlights: ["Remote valleys", "Traditional culture", "Textiles", "Border trade"],
      description: "The most remote and traditional region, known for textiles and pristine culture.",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
      attractions: ["Trashigang Dzong", "Mongar", "Lhuentse Dzong", "Traditional villages"]
    }
  ];

  const climateZones = [
    {
      zone: "Subtropical Zone",
      elevation: "200m - 1,200m",
      temperature: "15°C - 30°C",
      rainfall: "1,500mm - 5,000mm",
      vegetation: "Tropical forests, bamboo, banana",
      wildlife: ["Elephants", "Tigers", "Leopards", "Hornbills"],
      locations: ["Southern foothills", "Samtse", "Gelephu"]
    },
    {
      zone: "Temperate Zone",
      elevation: "1,200m - 3,000m",
      temperature: "5°C - 25°C",
      rainfall: "1,000mm - 2,500mm",
      vegetation: "Oak, maple, rhododendron forests",
      wildlife: ["Black bears", "Red pandas", "Langurs", "Pheasants"],
      locations: ["Thimphu", "Paro", "Punakha", "Bumthang"]
    },
    {
      zone: "Alpine Zone",
      elevation: "3,000m - 4,500m",
      temperature: "-5°C - 15°C",
      rainfall: "500mm - 1,000mm",
      vegetation: "Coniferous forests, alpine meadows",
      wildlife: ["Blue sheep", "Snow leopards", "Yaks", "Golden eagles"],
      locations: ["High valleys", "Chelela Pass", "Dochula Pass"]
    },
    {
      zone: "Nival Zone",
      elevation: "Above 4,500m",
      temperature: "Below -5°C",
      rainfall: "Snow and glaciers",
      vegetation: "Sparse alpine plants, lichens",
      wildlife: ["Snow leopards", "Blue sheep", "Himalayan wolves"],
      locations: ["High peaks", "Glacial areas", "Snowman Trek route"]
    }
  ];

  const majorPeaks = [
    { name: "Gangkhar Puensum", elevation: "7,570m", status: "Unclimbed (world's highest)" },
    { name: "Kula Kangri", elevation: "7,538m", status: "Disputed border peak" },
    { name: "Chomolhari", elevation: "7,326m", status: "Sacred mountain" },
    { name: "Jichu Drake", elevation: "6,989m", status: "Popular trekking peak" },
    { name: "Masagang", elevation: "7,194m", status: "Remote northern peak" }
  ];

  const rivers = [
    {
      name: "Wang Chhu",
      source: "Himalayas",
      flows: "Through Thimphu",
      significance: "Capital's lifeline"
    },
    {
      name: "Paro Chhu",
      source: "Mount Chomolhari",
      flows: "Through Paro Valley",
      significance: "Airport valley river"
    },
    {
      name: "Mo Chhu",
      source: "Northern glaciers",
      flows: "Through Punakha",
      significance: "Punakha Dzong confluence"
    },
    {
      name: "Pho Chhu",
      source: "Tibetan plateau",
      flows: "Through Punakha",
      significance: "Punakha Dzong confluence"
    }
  ];

  const seasons = [
    {
      season: "Spring",
      months: "March - May",
      temperature: "10°C - 20°C",
      weather: "Clear skies, rhododendron blooms",
      activities: ["Trekking", "Photography", "Festivals"],
      icon: Flower,
      color: "text-pink-600"
    },
    {
      season: "Summer",
      months: "June - August",
      temperature: "15°C - 25°C",
      weather: "Monsoon rains, lush greenery",
      activities: ["Cultural tours", "Indoor activities"],
      icon: Droplets,
      color: "text-teal-600"
    },
    {
      season: "Autumn",
      months: "September - November",
      temperature: "5°C - 20°C",
      weather: "Clear skies, perfect visibility",
      activities: ["Trekking", "Festivals", "Photography"],
      icon: Leaf,
      color: "text-amber-600"
    },
    {
      season: "Winter",
      months: "December - February",
      temperature: "-5°C - 15°C",
      weather: "Cold, clear, snow at high altitudes",
      activities: ["Cultural tours", "Lower altitude treks"],
      icon: Snowflake,
      color: "text-teal-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 bg-gradient-to-br from-teal-50 to-teal-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-teal-600 text-white text-sm px-4 py-2 mb-4">
            <Globe className="w-4 h-4 mr-2" />
            Geography & Climate
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Discover <span className="bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">Bhutan's Landscape</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From subtropical plains to towering Himalayan peaks, explore Bhutan's diverse geography, 
            climate zones, and natural wonders across three distinct regions.
          </p>
        </div>

        {/* Quick Facts */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center border-teal-100">
            <CardContent className="p-6">
              <MapPin className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Total Area</h3>
              <p className="text-teal-600 font-bold">38,394 km²</p>
            </CardContent>
          </Card>
          <Card className="text-center border-teal-100">
            <CardContent className="p-6">
              <Mountain className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Highest Peak</h3>
              <p className="text-teal-600 font-bold">7,570m</p>
            </CardContent>
          </Card>
          <Card className="text-center border-teal-100">
            <CardContent className="p-6">
              <Thermometer className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Climate Zones</h3>
              <p className="text-teal-600 font-bold">4 Zones</p>
            </CardContent>
          </Card>
          <Card className="text-center border-teal-100">
            <CardContent className="p-6">
              <TreePine className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Forest Cover</h3>
              <p className="text-teal-600 font-bold">71%</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="regions" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="regions">Regions</TabsTrigger>
            <TabsTrigger value="climate">Climate Zones</TabsTrigger>
            <TabsTrigger value="peaks">Mountains</TabsTrigger>
            <TabsTrigger value="seasons">Seasons</TabsTrigger>
            <TabsTrigger value="rivers">Rivers</TabsTrigger>
          </TabsList>

          {/* Regions Tab */}
          <TabsContent value="regions" className="space-y-8">
            <div className="space-y-8">
              {regions.map((region, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-2/5">
                      <img
                        src={region.image}
                        alt={region.name}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-3/5 p-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">{region.name}</h3>
                        <Badge className="bg-teal-600">{region.districts.length} Districts</Badge>
                      </div>
                      
                      <p className="text-gray-700 mb-6">{region.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Key Information:</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Mountain className="w-4 h-4 text-teal-600" />
                              <span>Elevation: {region.elevation}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Thermometer className="w-4 h-4 text-teal-600" />
                              <span>Climate: {region.climate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Building className="w-4 h-4 text-teal-600" />
                              <span>Districts: {region.districts.join(", ")}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Major Attractions:</h4>
                          <div className="flex flex-wrap gap-2">
                            {region.attractions.map((attraction, idx) => (
                              <Badge key={idx} variant="outline" className="border-teal-200 text-teal-700">
                                {attraction}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="mt-4">
                            <h5 className="font-semibold text-gray-900 mb-2">Highlights:</h5>
                            <ul className="space-y-1">
                              {region.highlights.map((highlight, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                  <Camera className="w-3 h-3 text-teal-600" />
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Climate Zones Tab */}
          <TabsContent value="climate" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {climateZones.map((zone, index) => (
                <Card key={index} className="border-teal-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Thermometer className="w-5 h-5 text-teal-600" />
                      {zone.zone}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge className="bg-teal-600">{zone.elevation}</Badge>
                      <Badge variant="outline">{zone.temperature}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Climate:</h5>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Droplets className="w-4 h-4 text-teal-500" />
                          <span>Rainfall: {zone.rainfall}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Vegetation:</h5>
                        <p className="text-sm text-gray-600">{zone.vegetation}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Wildlife:</h5>
                        <div className="flex flex-wrap gap-1">
                          {zone.wildlife.map((animal, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs border-green-200 text-green-700">
                              {animal}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Locations:</h5>
                        <p className="text-sm text-gray-600">{zone.locations.join(", ")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Mountains Tab */}
          <TabsContent value="peaks" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mountain className="w-5 h-5 text-teal-600" />
                  Major Himalayan Peaks
                </CardTitle>
                <p className="text-gray-600">
                  Bhutan is home to some of the world's highest unclimbed peaks and sacred mountains.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {majorPeaks.map((peak, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-teal-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-900">{peak.name}</h4>
                        <p className="text-sm text-gray-600">{peak.status}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-teal-600">{peak.elevation}</div>
                        <div className="text-xs text-gray-500">above sea level</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Crown className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-800 mb-2">Sacred Mountains</h4>
                      <p className="text-sm text-amber-700">
                        Many peaks in Bhutan are considered sacred and climbing is prohibited to preserve 
                        their spiritual significance. Gangkhar Puensum remains the world's highest unclimbed mountain.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Seasons Tab */}
          <TabsContent value="seasons" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {seasons.map((season, index) => (
                <Card key={index} className="border-teal-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <season.icon className={`w-5 h-5 ${season.color}`} />
                      {season.season}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge className="bg-teal-600">{season.months}</Badge>
                      <Badge variant="outline">{season.temperature}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Weather:</h5>
                        <p className="text-sm text-gray-600">{season.weather}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Best Activities:</h5>
                        <div className="flex flex-wrap gap-2">
                          {season.activities.map((activity, idx) => (
                            <Badge key={idx} variant="outline" className="border-teal-200 text-teal-700">
                              {activity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Rivers Tab */}
          <TabsContent value="rivers" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-teal-600" />
                  Major Rivers & Waterways
                </CardTitle>
                <p className="text-gray-600">
                  Bhutan's rivers originate from glacial sources and flow through pristine valleys.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {rivers.map((river, index) => (
                    <div key={index} className="p-4 bg-teal-50 rounded-lg border border-teal-100">
                      <h4 className="font-semibold text-gray-900 mb-2">{river.name}</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mountain className="w-4 h-4 text-teal-600" />
                          <span>Source: {river.source}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Route className="w-4 h-4 text-teal-600" />
                          <span>Flows: {river.flows}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Crown className="w-4 h-4 text-teal-600" />
                          <span>Significance: {river.significance}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <TreePine className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Hydroelectric Power</h4>
                      <p className="text-sm text-green-700">
                        Bhutan's rivers provide abundant hydroelectric power, making the country carbon-negative. 
                        Major projects include Tala, Chukha, and Kurichhu hydroelectric plants.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
            <h2 className="text-3xl font-bold mb-4">Explore Bhutan's Diverse Landscapes</h2>
            <p className="text-xl mb-6 opacity-90">
              From subtropical valleys to alpine peaks, discover the incredible diversity of the Last Shangri-La.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/tours">
                <Button className="bg-gradient-to-br from-white to-teal-50 text-teal-600 hover:bg-gray-100 px-8 py-3">
                  <Compass className="w-5 h-5 mr-2" />
                  Explore Tours
                </Button>
              </Link>
              <Link to="/custom-tour">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600 px-8 py-3">
                  Plan Custom Journey
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}