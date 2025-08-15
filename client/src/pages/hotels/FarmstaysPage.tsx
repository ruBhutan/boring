import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Star, MapPin, Wheat, TreePine, Sunrise, Beef, 
  Apple, Droplets, Users, Heart, Camera, Award,
  Phone, Mail, Calendar, CheckCircle, Leaf
} from "lucide-react";
import { HotelBookingFormLauncher } from "@/components/FormLauncher";

const farmstayBenefits = [
  {
    icon: Wheat,
    title: "Farm-to-Table Experience",
    description: "Enjoy fresh, organic produce grown right on the farm and participate in harvesting"
  },
  {
    icon: Beef,
    title: "Animal Interactions",
    description: "Meet friendly farm animals including yaks, cows, chickens, and learn about animal care"
  },
  {
    icon: TreePine,
    title: "Rural Tranquility",
    description: "Escape to peaceful countryside surrounded by pristine nature and mountain views"
  },
  {
    icon: Sunrise,
    title: "Agricultural Learning",
    description: "Learn traditional farming methods and sustainable agriculture practices"
  }
];

const sampleFarmstays = [
  {
    id: 1,
    name: "Paro Organic Farm Retreat",
    location: "Paro Valley",
    category: "farmstay",
    pricePerNight: 95,
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
    description: "Working organic farm in the heart of Paro Valley offering hands-on farming experiences with stunning mountain views.",
    farmType: "Organic Vegetables & Grains",
    animals: ["Yaks", "Cows", "Chickens", "Horses"],
    activities: ["Crop harvesting", "Animal feeding", "Organic gardening", "Traditional farming"],
    amenities: ["Farm-fresh meals", "Organic produce", "Mountain views", "Traditional farmhouse"],
    highlights: ["Himalayan backdrop", "Organic certification", "Traditional methods", "Fresh dairy products"]
  },
  {
    id: 2,
    name: "Bumthang Apple Farm Stay",
    location: "Bumthang Valley",
    category: "farmstay",
    pricePerNight: 85,
    imageUrl: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=600&fit=crop",
    description: "Family-run apple orchard and farm in the beautiful Bumthang Valley, famous for its apples and traditional farming.",
    farmType: "Apple Orchard & Mixed Farming",
    animals: ["Yaks", "Sheep", "Chickens"],
    activities: ["Apple picking", "Cider making", "Sheep herding", "Valley walks"],
    amenities: ["Apple orchard tours", "Fresh apple products", "Traditional meals", "Valley views"],
    highlights: ["Famous Bumthang apples", "Traditional cider", "Sacred valley", "Seasonal harvests"]
  },
  {
    id: 3,
    name: "Thimphu Highland Farm",
    location: "Thimphu Highlands",
    category: "farmstay",
    pricePerNight: 75,
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop",
    description: "High-altitude farm specializing in traditional crops and yak herding with panoramic views of the Thimphu valley.",
    farmType: "Highland Crops & Yak Herding",
    animals: ["Yaks", "Dzos", "Goats"],
    activities: ["Yak herding", "Highland trekking", "Traditional weaving", "Cheese making"],
    amenities: ["Yak products", "Highland views", "Traditional shelter", "Local crafts"],
    highlights: ["High altitude farming", "Yak cheese", "Panoramic views", "Traditional lifestyle"]
  }
];

const farmActivities = [
  {
    title: "Morning Farm Chores",
    description: "Start your day by helping with feeding animals and collecting fresh eggs",
    icon: Sunrise,
    time: "6:00 AM - 8:00 AM"
  },
  {
    title: "Crop Cultivation",
    description: "Learn traditional planting, weeding, and harvesting techniques",
    icon: Wheat,
    time: "9:00 AM - 12:00 PM"
  },
  {
    title: "Farm-to-Table Lunch",
    description: "Enjoy meals prepared with ingredients harvested from the farm",
    icon: Apple,
    time: "12:00 PM - 1:00 PM"
  },
  {
    title: "Animal Care",
    description: "Help with milking, grooming, and caring for farm animals",
    icon: Beef,
    time: "3:00 PM - 5:00 PM"
  }
];

export default function FarmstaysPage() {
  const { data: hotels = [] } = useQuery({ queryKey: ["/api/hotels"] });
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [isHotelBookingFormOpen, setIsHotelBookingFormOpen] = useState(false);
  
  // Use sample data if no hotels from API
  const farmstays = hotels.length > 0 
    ? hotels.filter((hotel: any) => hotel.category === "farmstay")
    : sampleFarmstays;
    
  const handleBookNow = (hotel: any) => {
    setSelectedHotel(hotel);
    setSelectedRoom(null);
    setIsHotelBookingFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 bg-gradient-to-br from-teal-100 via-blue-100 to-teal-100">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-teal-600 via-emerald-600 to-emerald-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-white/20 bg-stripes-diagonal"></div>
        </div>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">
            <Badge className="bg-white/20 text-white mb-4">
              <Wheat className="w-4 h-4 mr-2" />
              Farm Experiences
            </Badge>
            <h1 className="text-5xl font-bold mb-6">
              Experience <span className="text-cyan-200">Farm Life</span> in Bhutan
            </h1>
            <p className="text-xl text-teal-50 max-w-3xl mx-auto leading-relaxed">
              Connect with nature and traditional agriculture by staying on working farms. 
              Participate in daily farm activities and enjoy fresh, organic produce straight from the source.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-white to-teal-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose <span className="bg-gradient-to-r from-teal-600 to-teal-600 bg-clip-text text-transparent">Farmstays</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Immerse yourself in sustainable agriculture and rural Bhutanese life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {farmstayBenefits.map((benefit, index) => (
              <Card key={index} className="text-center border-green-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-gradient-to-br from-teal-200 to-teal-200 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <benefit.icon className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Farmstays Grid */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-green-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured <span className="bg-gradient-to-r from-teal-600 to-teal-600 bg-clip-text text-transparent">Farm Experiences</span>
            </h2>
            <p className="text-lg text-gray-600">
              Working farms offering authentic agricultural experiences and rural hospitality
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {farmstays.map((farmstay: any) => (
              <Card key={farmstay.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-green-100">
                <div className="relative">
                  <img src={farmstay.imageUrl} alt={farmstay.name} className="w-full h-56 object-cover" />
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-teal-600 to-teal-600 text-white">
                    <Wheat className="w-3 h-3 mr-1" />
                    Farmstay
                  </Badge>
                  <div className="absolute top-4 right-4 bg-white/90 rounded-lg px-2 py-1">
                    <div className="flex items-center text-sm">
                      <Leaf className="w-4 h-4 text-teal-600 mr-1" />
                      <span className="font-medium">Organic</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{farmstay.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-2 text-teal-600" />
                      <span>{farmstay.location}</span>
                    </div>
                    {farmstay.farmType && (
                      <div className="flex items-center text-gray-600 mb-3">
                        <Wheat className="w-4 h-4 mr-2 text-teal-600" />
                        <span className="text-sm">{farmstay.farmType}</span>
                      </div>
                    )}
                    <p className="text-gray-600 text-sm leading-relaxed">{farmstay.description}</p>
                  </div>

                  {farmstay.animals && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Farm Animals:</h4>
                      <div className="flex flex-wrap gap-1">
                        {farmstay.animals.map((animal: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs border-teal-200 text-teal-700">
                            {animal}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {farmstay.activities && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Farm Activities:</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {farmstay.activities.slice(0, 4).map((activity: string, idx: number) => (
                          <div key={idx} className="flex items-center text-xs text-gray-600">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                            {activity}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-green-100">
                    <div>
                      <span className="text-2xl font-bold text-teal-600">${farmstay.pricePerNight}</span>
                      <span className="text-gray-500 text-sm ml-1">per night</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50">
                        <Camera className="w-4 h-4" />
                      </Button>
                      <Button 
                        className="bg-gradient-to-r from-teal-600 to-teal-600 hover:from-teal-700 hover:to-emerald-700 text-white"
                        onClick={() => handleBookNow(farmstay)}
                      >
                        Book Farm Stay
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Schedule Section */}
      <section className="py-16 bg-gradient-to-br from-white to-teal-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              A Day on the <span className="bg-gradient-to-r from-teal-600 to-teal-600 bg-clip-text text-transparent">Farm</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the rhythm of farm life with hands-on activities throughout the day
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {farmActivities.map((activity, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-teal-200 to-teal-200 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <activity.icon className="w-10 h-10 text-teal-600" />
                </div>
                <div className="bg-gradient-to-r from-teal-600 to-teal-600 text-white px-3 py-1 rounded-full text-sm mb-3 inline-block">
                  {activity.time}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{activity.title}</h3>
                <p className="text-sm text-gray-600">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-green-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Sustainable <span className="bg-gradient-to-r from-teal-600 to-teal-600 bg-clip-text text-transparent">Agriculture</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-teal-200 to-teal-200 p-2 rounded-full mr-4 mt-1">
                    <Leaf className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Organic Farming</h3>
                    <p className="text-gray-600">Learn chemical-free farming methods that preserve soil health and biodiversity.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-teal-200 to-teal-200 p-2 rounded-full mr-4 mt-1">
                    <Droplets className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Water Conservation</h3>
                    <p className="text-gray-600">Discover traditional irrigation methods and water-saving techniques.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-teal-200 to-teal-200 p-2 rounded-full mr-4 mt-1">
                    <TreePine className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Ecosystem Balance</h3>
                    <p className="text-gray-600">Understand how traditional farming maintains harmony with nature.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop" 
                alt="Organic farming in Bhutan" 
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-teal-600 to-teal-600 text-white p-4 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm">Organic Farms</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 via-emerald-600 to-emerald-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-white/20 bg-stripes-vertical"></div>
        </div>
        <div className="container mx-auto px-4 max-w-4xl text-center relative">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Farm Life?</h2>
          <p className="text-xl text-teal-50 mb-8">
            Book your authentic farm experience and connect with Bhutan's agricultural heritage
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-br from-white to-teal-50 text-teal-600 hover:bg-teal-50">
              <Phone className="w-5 h-5 mr-2" />
              Call +975-2-323251
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600">
              <Calendar className="w-5 h-5 mr-2" />
              Book Farm Stay
            </Button>
          </div>
        </div>
      </section>
      
      {/* Hotel Booking Form */}
      <HotelBookingFormLauncher
        isOpen={isHotelBookingFormOpen}
        onClose={() => setIsHotelBookingFormOpen(false)}
        selectedHotel={selectedHotel}
        selectedRoom={selectedRoom}
      />
    </div>
  );
}
