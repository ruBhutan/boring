import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Hotel, Star, MapPin, Wifi, Car, Utensils, Flower, 
  Mountain, Leaf, Crown, Home, Award, CheckCircle, Info
} from "lucide-react";
import { Link } from "react-router-dom";

export default function HotelInfoPage() {
  const accommodationTypes = [
    {
      name: "Ultra-Luxury Resorts",
      description: "World-class luxury properties offering unparalleled comfort and service",
      icon: Crown,
      features: ["Private suites with valley views", "Personal butler service", "Spa and wellness centers", "Fine dining restaurants", "Helicopter transfers"],
      priceRange: "$800 - $2,500 per night",
      examples: ["Amankora Collection", "Six Senses Bhutan", "COMO Uma Hotels"]
    },
    {
      name: "Heritage Properties",
      description: "Traditional Bhutanese architecture with authentic cultural experiences",
      icon: Home,
      features: ["Traditional Bhutanese design", "Cultural programs", "Local craft workshops", "Organic gardens", "Heritage dining"],
      priceRange: "$400 - $800 per night",
      examples: ["Zhiwa Ling Heritage", "Hotel Druk", "Traditional farmhouses"]
    },
    {
      name: "Eco-Luxury Lodges",
      description: "Sustainable accommodations harmonizing with Bhutan's pristine environment",
      icon: Leaf,
      features: ["Carbon-neutral operations", "Organic farm-to-table dining", "Nature immersion programs", "Sustainable architecture", "Wildlife viewing"],
      priceRange: "$500 - $1,200 per night",
      examples: ["Six Senses Thimphu", "Gangtey Lodge", "Bhutan Spirit Sanctuary"]
    },
    {
      name: "Boutique Hotels",
      description: "Intimate properties offering personalized service and unique character",
      icon: Hotel,
      features: ["Personalized service", "Unique design elements", "Local cultural touches", "Intimate atmosphere", "Curated experiences"],
      priceRange: "$200 - $600 per night",
      examples: ["Le Méridien Paro", "Taj Tashi", "Hotel Olathang"]
    }
  ];

  const premiumProperties = [
    {
      name: "Amankora Paro",
      category: "Ultra-Luxury",
      location: "Paro Valley",
      description: "Nestled in a blue pine forest overlooking Paro valley, this ultra-luxury lodge combines traditional Bhutanese architecture with contemporary comfort. Each suite features a private courtyard and stunning mountain views.",
      highlights: [
        "24 spacious suites with private courtyards",
        "Traditional farmhouse-style architecture",
        "Panoramic views of Paro valley and mountains",
        "Spa with traditional hot stone baths",
        "Organic garden and farm-to-table dining"
      ],
      amenities: ["Spa & Wellness", "Fine Dining", "Private Courtyards", "Mountain Views", "Butler Service"],
      sustainability: "Committed to preserving local culture and environment through sustainable practices and community engagement.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Six Senses Thimphu",
      category: "Eco-Luxury",
      location: "Thimphu Valley",
      description: "Perched on a hillside overlooking Thimphu valley, this eco-luxury resort seamlessly blends into the natural landscape while offering world-class amenities and wellness programs focused on holistic well-being.",
      highlights: [
        "20 suites and villas with forest views",
        "Award-winning Six Senses Spa",
        "Organic gardens and sustainable dining",
        "Meditation and yoga pavilions",
        "Traditional Bhutanese healing programs"
      ],
      amenities: ["Eco-Spa", "Organic Dining", "Yoga Studio", "Forest Views", "Wellness Programs"],
      sustainability: "Carbon-neutral operations with extensive use of local materials and renewable energy sources.",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Zhiwa Ling Heritage Hotel",
      category: "Heritage",
      location: "Paro",
      description: "A masterpiece of traditional Bhutanese architecture, this heritage hotel showcases the finest craftsmanship and cultural authenticity while providing modern luxury and comfort.",
      highlights: [
        "Traditional Bhutanese architecture and design",
        "Handcrafted interiors by local artisans",
        "Cultural programs and traditional performances",
        "Authentic Bhutanese cuisine",
        "Museum-quality art and artifacts"
      ],
      amenities: ["Cultural Programs", "Traditional Spa", "Heritage Dining", "Art Collection", "Craft Workshops"],
      sustainability: "Preserves traditional building techniques and supports local artisan communities.",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Le Meridien Thimphu",
      category: "Boutique",
      location: "Thimphu",
      description: "Located in the heart of the capital city, Le Méridien Thimphu is a sophisticated hotel that blends contemporary design with Bhutanese motifs. It offers a vibrant social hub for travelers seeking a modern and culturally engaging experience.",
      highlights: [
        "Central location in Thimphu city",
        "Contemporary design with Bhutanese touches",
        "Explore Spa, fitness center, and indoor heated pool",
        "Latitude 27, a vibrant hub for coffee and cocktails",
        "Close proximity to key cultural sites"
      ],
      amenities: ["Spa & Wellness", "Fitness Center", "Indoor Pool", "Modern Design", "City Views"],
      sustainability: "Marriott's 'Serve 360' program guides the hotel's commitment to making a positive and sustainable impact.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Taj Tashi",
      category: "Luxury",
      location: "Thimphu",
      description: "A luxurious hotel that blends traditional Bhutanese Dzong architecture with modern elegance. Taj Tashi offers stunning views of the Thimphu valley and a gateway to the kingdom's rich heritage.",
      highlights: [
        "Hand-drawn murals and intricate woodwork",
        "Jiva Spa offering traditional Indian and Bhutanese therapies",
        "Multiple dining options with Bhutanese and international cuisine",
        "Spacious rooms with panoramic valley views",
        "Located in the heart of Thimphu"
      ],
      amenities: ["Luxury Spa", "Fine Dining", "Valley Views", "Cultural Architecture", "Butler Service"],
      sustainability: "Taj Hotels is committed to responsible tourism through its 'Paathya' framework, focusing on environmental stewardship and community engagement.",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const amenitiesGuide = [
    {
      category: "Wellness & Spa",
      icon: Flower,
      description: "Traditional hot stone baths, meditation spaces, and holistic wellness programs",
      details: "Most luxury properties offer traditional Bhutanese spa treatments including hot stone baths (dotsho), herbal therapies, and meditation sessions guided by local practitioners."
    },
    {
      category: "Dining Excellence",
      icon: Utensils,
      description: "Farm-to-table cuisine featuring local ingredients and international options",
      details: "Experience authentic Bhutanese cuisine alongside international dishes, often featuring organic ingredients from hotel gardens and local farms."
    },
    {
      category: "Cultural Immersion",
      icon: Home,
      description: "Traditional architecture, cultural programs, and authentic experiences",
      details: "Hotels incorporate traditional Bhutanese design elements and offer cultural programs including traditional dance performances, craft workshops, and local festivals."
    },
    {
      category: "Scenic Locations",
      icon: Mountain,
      description: "Breathtaking views of mountains, valleys, and pristine landscapes",
      details: "Properties are strategically located to offer stunning views of the Himalayas, ancient dzongs, and pristine valleys while maintaining harmony with the natural environment."
    }
  ];

  const bookingTips = [
    {
      title: "Book Early",
      description: "Luxury accommodations have limited rooms and high demand, especially during festival seasons"
    },
    {
      title: "Consider Seasons",
      description: "Spring and autumn offer the best weather but higher prices. Winter provides value with clear mountain views"
    },
    {
      title: "Package Deals",
      description: "Many hotels offer package deals including meals, activities, and cultural experiences"
    },
    {
      title: "Sustainable Choices",
      description: "Choose eco-certified properties that support local communities and environmental conservation"
    },
    {
      title: "Cultural Sensitivity",
      description: "Respect local customs and traditions, especially in heritage properties and rural areas"
    },
    {
      title: "Altitude Consideration",
      description: "Some properties are at high altitude - allow time for acclimatization if needed"
    }
  ];

  const uniqueFeatures = [
    {
      name: "Traditional Architecture",
      description: "Authentic Bhutanese design without nails, featuring intricate woodwork and colorful paintings"
    },
    {
      name: "Hot Stone Baths",
      description: "Traditional dotsho baths using river stones heated over wood fires, infused with medicinal herbs"
    },
    {
      name: "Organic Gardens",
      description: "Many properties grow their own organic vegetables and herbs for farm-to-table dining"
    },
    {
      name: "Cultural Programs",
      description: "Traditional dance performances, craft workshops, and interactions with local artisans"
    },
    {
      name: "Spiritual Experiences",
      description: "Meditation sessions, prayer flag ceremonies, and visits to nearby monasteries"
    },
    {
      name: "Adventure Access",
      description: "Easy access to trekking trails, cultural sites, and outdoor activities"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 bg-gradient-to-br from-teal-50 to-teal-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-teal-600 text-white text-sm px-4 py-2 mb-4">
            <Hotel className="w-4 h-4 mr-2" />
            Accommodation Guide
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Exceptional <span className="gradient-text">Bhutanese Hospitality</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover Bhutan's most distinguished accommodations where traditional architecture meets world-class luxury. From heritage palaces to eco-luxury lodges, each property offers an authentic gateway to Bhutanese culture while providing unparalleled comfort and service.
          </p>
        </div>

        {/* Accommodation Types */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {accommodationTypes.map((type, index) => (
            <Card key={index} className="text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="bg-teal-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <type.icon className="w-8 h-8 text-teal-600" />
                </div>
                <CardTitle className="text-lg text-gray-900">{type.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">{type.description}</p>
                <div className="text-sm font-semibold text-teal-600 mb-3">{type.priceRange}</div>
                <ul className="space-y-1 text-xs text-gray-500">
                  {type.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="premium-properties" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="premium-properties">Premium Properties</TabsTrigger>
            <TabsTrigger value="amenities">Amenities Guide</TabsTrigger>
            <TabsTrigger value="unique-features">Unique Features</TabsTrigger>
            <TabsTrigger value="booking-guide">Booking Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="premium-properties" className="space-y-8">
            {premiumProperties.map((property, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-2/5">
                    <img
                      src={property.image}
                      alt={property.name}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-3/5 p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{property.name}</h3>
                      <Badge variant="secondary">{property.category}</Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{property.location}</span>
                    </div>
                    
                    <p className="text-gray-700 mb-6">{property.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Property Highlights:</h4>
                        <ul className="space-y-2">
                          {property.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Star className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-600">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Amenities:</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {property.amenities.map((amenity, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="bg-green-50 p-3 rounded-lg">
                          <h5 className="font-medium text-green-900 mb-1 flex items-center gap-1">
                            <Leaf className="w-4 h-4" />
                            Sustainability
                          </h5>
                          <p className="text-xs text-green-800">{property.sustainability}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="amenities" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              {amenitiesGuide.map((amenity, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-teal-100 p-3 rounded-full">
                      <amenity.icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{amenity.category}</h3>
                      <p className="text-gray-600 mb-3">{amenity.description}</p>
                      <p className="text-sm text-gray-500">{amenity.details}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="unique-features" className="space-y-6">
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl">What Makes Bhutanese Hotels Special</CardTitle>
                <p className="text-gray-600">
                  Experience unique features that reflect Bhutan's culture and commitment to sustainability.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {uniqueFeatures.map((feature, index) => (
                    <div key={index} className="p-4 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">{feature.name}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="booking-guide" className="space-y-6">
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl">Booking Tips & Guidelines</CardTitle>
                <p className="text-gray-600">
                  Essential information for booking the perfect accommodation in Bhutan.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {bookingTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-teal-50 rounded-lg">
                      <div className="bg-teal-100 p-2 rounded-full">
                        <Info className="w-4 h-4 text-teal-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{tip.title}</h4>
                        <p className="text-sm text-gray-600">{tip.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-teal-50 rounded-xl">
                  <h4 className="font-bold text-teal-900 mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Quality Assurance
                  </h4>
                  <p className="text-emerald-800">
                    All accommodations in Bhutan are regulated by the Tourism Council of Bhutan, ensuring high standards of service, safety, and cultural authenticity. Many properties are also certified for sustainable tourism practices, contributing to Bhutan's carbon-negative status.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-teal-600 to-amber-600 text-white">
            <h2 className="text-3xl font-bold mb-4">Find Your Perfect Stay in Bhutan</h2>
            <p className="text-xl mb-6 opacity-90">
              From luxury resorts to heritage properties, discover accommodations that enhance your Bhutan experience.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/hotels">
                <Button className="bg-gradient-to-br from-white to-teal-50 text-teal-600 hover:bg-gray-100 px-8 py-3">
                  <Hotel className="w-5 h-5 mr-2" />
                  Browse Hotels
                </Button>
              </Link>
              <Link to="/tours">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600 px-8 py-3">
                  View Package Deals
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}