import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlightBookingFormLauncher } from "@/components/FormLauncher";
import { 
  Plane, Clock, MapPin, Calendar, Users, Star, 
  Mountain, Compass, Camera, Shield, Phone, Mail,
  CheckCircle, AlertTriangle, Info, ExternalLink,
  Route, Globe, Luggage
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function FlightsPage() {
  const [isFlightFormOpen, setIsFlightFormOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);

  const handleBookFlight = (route?: any) => {
    setSelectedRoute(route || null);
    setIsFlightFormOpen(true);
  };
  const drukAirRoutes = [
    {
      from: "Delhi (DEL)",
      to: "Paro (PBH)",
      duration: "2h 30m",
      frequency: "Daily",
      aircraft: "Airbus A319",
      scenic: "Himalayan views"
    },
    {
      from: "Kolkata (CCU)",
      to: "Paro (PBH)",
      duration: "1h 50m",
      frequency: "4x weekly",
      aircraft: "ATR 42-500",
      scenic: "Eastern Himalayas"
    },
    {
      from: "Kathmandu (KTM)",
      to: "Paro (PBH)",
      duration: "1h 15m",
      frequency: "Daily",
      aircraft: "ATR 42-500",
      scenic: "Everest region"
    },
    {
      from: "Bangkok (BKK)",
      to: "Paro (PBH)",
      duration: "3h 45m",
      frequency: "3x weekly",
      aircraft: "Airbus A319",
      scenic: "Southeast Asia"
    },
    {
      from: "Singapore (SIN)",
      to: "Paro (PBH)",
      duration: "4h 30m",
      frequency: "2x weekly",
      aircraft: "Airbus A319",
      scenic: "Bay of Bengal"
    },
    {
      from: "Dhaka (DAC)",
      to: "Paro (PBH)",
      duration: "1h 30m",
      frequency: "2x weekly",
      aircraft: "ATR 42-500",
      scenic: "Bengal plains"
    },
    {
      from: "Bagdogra (IXB)",
      to: "Paro (PBH)",
      duration: "45m",
      frequency: "2x weekly",
      aircraft: "ATR 42-500",
      scenic: "Tea gardens"
    },
    {
      from: "Guwahati (GAU)",
      to: "Paro (PBH)",
      duration: "1h 0m",
      frequency: "2x weekly",
      aircraft: "ATR 42-500",
      scenic: "Brahmaputra river"
    },
    {
      from: "Gaya (GAY)",
      to: "Paro (PBH)",
      duration: "1h 20m",
      frequency: "Seasonal",
      aircraft: "ATR 42-500",
      scenic: "Buddhist circuit"
    },
    {
      from: "Dubai (DXB)",
      to: "Paro (PBH)",
      duration: "5h 30m",
      frequency: "1x weekly",
      aircraft: "Airbus A319",
      scenic: "Desert to mountains"
    }
  ];

  const bhutanAirlinesRoutes = [
    {
      from: "Delhi (DEL)",
      to: "Paro (PBH)",
      duration: "2h 15m",
      frequency: "5x weekly",
      aircraft: "Airbus A320neo",
      scenic: "Himalayan peaks"
    },
    {
      from: "Kathmandu (KTM)",
      to: "Paro (PBH)",
      duration: "1h 10m",
      frequency: "Daily",
      aircraft: "ATR 72-600",
      scenic: "Everest corridor"
    },
    {
      from: "Bangkok (BKK)",
      to: "Paro (PBH)",
      duration: "3h 30m",
      frequency: "4x weekly",
      aircraft: "Airbus A320neo",
      scenic: "Southeast Asian landscapes"
    },
    {
      from: "Kolkata (CCU)",
      to: "Paro (PBH)",
      duration: "1h 45m",
      frequency: "3x weekly",
      aircraft: "Airbus A320neo",
      scenic: "Ganges delta"
    }
  ];

  const helicopterServices = [
    {
      service: "Paro-Thimphu Transfer",
      duration: "15 minutes",
      price: "From $200",
      description: "Quick transfer between airport and capital",
      highlights: ["Valley views", "Time-saving", "Luxury experience"]
    },
    {
      service: "Tiger's Nest Helicopter Tour",
      duration: "45 minutes",
      price: "From $500",
      description: "Aerial view of iconic monastery",
      highlights: ["Aerial photography", "Monastery views", "Mountain scenery"]
    },
    {
      service: "Himalayan Scenic Flight",
      duration: "1 hour",
      price: "From $800",
      description: "Panoramic Himalayan mountain views",
      highlights: ["Everest views", "Himalayan peaks", "Photo opportunities"]
    },
    {
      service: "Remote Destination Access",
      duration: "Variable",
      price: "Custom pricing",
      description: "Access to remote trekking areas",
      highlights: ["Remote access", "Trekking support", "Emergency evacuation"]
    }
  ];

  const flightSchedule = [
    { day: "Monday", routes: ["DEL-PBH", "KTM-PBH", "CCU-PBH"] },
    { day: "Tuesday", routes: ["DEL-PBH", "BKK-PBH", "KTM-PBH"] },
    { day: "Wednesday", routes: ["DEL-PBH", "KTM-PBH", "SIN-PBH"] },
    { day: "Thursday", routes: ["DEL-PBH", "CCU-PBH", "BKK-PBH"] },
    { day: "Friday", routes: ["DEL-PBH", "KTM-PBH", "CCU-PBH"] },
    { day: "Saturday", routes: ["DEL-PBH", "BKK-PBH", "SIN-PBH"] },
    { day: "Sunday", routes: ["DEL-PBH", "KTM-PBH", "CCU-PBH"] }
  ];

  const travelTips = [
    {
      title: "Book Early",
      description: "Druk Air has limited seats. Book 2-3 months in advance, especially for peak season.",
      icon: Calendar
    },
    {
      title: "Weather Dependent",
      description: "Flights may be delayed or cancelled due to weather. Plan flexible itineraries.",
      icon: Mountain
    },
    {
      title: "Baggage Allowance",
      description: "Check baggage limits. Excess baggage fees apply for overweight luggage.",
      icon: Luggage
    },
    {
      title: "Scenic Views",
      description: "Choose left side seats for best Himalayan views when flying from Kathmandu.",
      icon: Camera
    }
  ];

  const paroAirportInfo = {
    elevation: "7,332 feet (2,235 meters)",
    runway: "6,500 feet long",
    challenges: "One of world's most challenging airports",
    pilots: "Only certified pilots can land",
    weather: "Weather dependent operations"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 bg-gradient-to-br from-teal-50 to-teal-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-teal-600 text-white text-sm px-4 py-2 mb-4">
            <Plane className="w-4 h-4 mr-2" />
            Flights & Aviation
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Your Journey to <span className="bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">Bhutan</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover flight options with Druk Air, Bhutan's national carrier, and premium helicopter services. 
            Experience one of the world's most scenic and challenging airport approaches at Paro.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center border-teal-100">
            <CardContent className="p-6">
              <Plane className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Daily Flights</h3>
              <p className="text-teal-600 font-bold">7+</p>
            </CardContent>
          </Card>
          <Card className="text-center border-teal-100">
            <CardContent className="p-6">
              <Globe className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Destinations</h3>
              <p className="text-teal-600 font-bold">5 Cities</p>
            </CardContent>
          </Card>
          <Card className="text-center border-teal-100">
            <CardContent className="p-6">
              <Mountain className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Airport Elevation</h3>
              <p className="text-teal-600 font-bold">7,332 ft</p>
            </CardContent>
          </Card>
          <Card className="text-center border-teal-100">
            <CardContent className="p-6">
              <Plane className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Helicopter Services</h3>
              <p className="text-teal-600 font-bold">Available</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="druk-air" className="space-y-8">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="druk-air">Druk Air</TabsTrigger>
            <TabsTrigger value="bhutan-airlines">Bhutan Airlines</TabsTrigger>
            <TabsTrigger value="helicopter">Helicopter Services</TabsTrigger>
            <TabsTrigger value="schedule">Flight Schedule</TabsTrigger>
            <TabsTrigger value="airport">Paro Airport</TabsTrigger>
            <TabsTrigger value="domestic-land">Domestic & Land</TabsTrigger>
          </TabsList>

          {/* Bhutan Airlines Tab */}
          <TabsContent value="bhutan-airlines" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="w-5 h-5 text-teal-600" />
                  Bhutan Airlines - Premium Service
                </CardTitle>
                <p className="text-gray-600">
                  Bhutan's newest airline offering modern aircraft, enhanced comfort, and exceptional service to the Kingdom.
                  <a href="https://www.bhutanairlines.bt/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline ml-2">
                    Visit bhutanairlines.bt <ExternalLink className="w-4 h-4 inline ml-1" />
                  </a>
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bhutanAirlinesRoutes.map((route, index) => (
                    <Card key={index} className="border-teal-100">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge className="bg-teal-600">{route.frequency}</Badge>
                          <Badge variant="outline">{route.duration}</Badge>
                        </div>
                        <CardTitle className="text-lg">
                          {route.from} → {route.to}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Plane className="w-4 h-4 text-teal-600" />
                            <span>{route.aircraft}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Mountain className="w-4 h-4 text-teal-600" />
                            <span>{route.scenic}</span>
                          </div>
                          <div className="pt-2">
                            <Button 
                              className="w-full btn-teal" 
                              size="sm"
                              onClick={() => handleBookFlight(route)}
                            >
                              Book This Flight
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-teal-50 border border-teal-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-teal-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-emerald-800 mb-2">About Bhutan Airlines</h4>
                      <ul className="text-sm text-teal-700 space-y-1">
                        <li>• Modern fleet with latest Airbus A320neo and ATR 72-600 aircraft</li>
                        <li>• Enhanced passenger comfort with premium seating options</li>
                        <li>• Competitive pricing and flexible booking policies</li>
                        <li>• Excellent safety record and professional crew</li>
                        <li>• Founded to provide additional connectivity to Bhutan</li>
                        <li>• Committed to sustainable aviation practices</li>
                        <li>• Visit <a href="https://www.bhutanairlines.bt/" target="_blank" rel="noopener noreferrer" className="underline">bhutanairlines.bt</a> for direct bookings</li>
                        <li>• Contact Tashi Dorji for best rates and travel packages</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Why Choose Bhutan Airlines?</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• More flight options and flexibility</li>
                        <li>• Modern aircraft with better fuel efficiency</li>
                        <li>• Enhanced in-flight entertainment systems</li>
                        <li>• Improved baggage allowances</li>
                        <li>• Better connectivity to international destinations</li>
                        <li>• Competitive pricing compared to Druk Air</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Druk Air Tab */}
          <TabsContent value="druk-air" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="w-5 h-5 text-teal-600" />
                  Druk Air - Royal Bhutan Airlines
                </CardTitle>
                <p className="text-gray-600">
                  Bhutan's national carrier offering safe, reliable flights with spectacular Himalayan views.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {drukAirRoutes.map((route, index) => (
                    <Card key={index} className="border-teal-100">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge className="bg-teal-600">{route.frequency}</Badge>
                          <Badge variant="outline">{route.duration}</Badge>
                        </div>
                        <CardTitle className="text-lg">
                          {route.from} → {route.to}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Plane className="w-4 h-4 text-teal-600" />
                            <span>{route.aircraft}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Mountain className="w-4 h-4 text-teal-600" />
                            <span>{route.scenic}</span>
                          </div>
                          <div className="pt-2">
                            <Button 
                              className="w-full btn-teal" 
                              size="sm"
                              onClick={() => handleBookFlight(route)}
                            >
                              Book This Flight
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-teal-50 border border-teal-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-teal-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-emerald-800 mb-2">Booking Information & Tourism Policy</h4>
                      <ul className="text-sm text-teal-700 space-y-1">
                        <li>• All flights must be booked through licensed tour operators like us.</li>
                        <li>• A Sustainable Development Fee (SDF) of $100 per person per night is applicable for most nationalities.</li>
                        <li>• Indian nationals have a different SDF of 1,200 INR per person per night.</li>
                        <li>• Advance booking is highly recommended, especially during peak seasons (2-3 months prior).</li>
                        <li>• Flights are subject to weather conditions and may be delayed or cancelled.</li>
                        <li>• Baggage allowance is typically 20kg for checked luggage and 7kg for carry-on.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Travel Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Flight Travel Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {travelTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-teal-50 rounded-lg">
                      <div className="bg-teal-100 p-2 rounded-full">
                        <tip.icon className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{tip.title}</h4>
                        <p className="text-sm text-gray-600">{tip.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Domestic & Land Tab */}
          <TabsContent value="domestic-land" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="w-5 h-5 text-teal-600" />
                  Domestic Flights
                </CardTitle>
                <p className="text-gray-600">
                  Explore more of Bhutan with domestic flights, connecting Paro to other regions of the country.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="border-teal-100">
                    <CardHeader>
                      <CardTitle className="text-lg">Paro ↔ Bumthang</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">Access the spiritual heartland of Bhutan.</p>
                    </CardContent>
                  </Card>
                  <Card className="border-teal-100">
                    <CardHeader>
                      <CardTitle className="text-lg">Paro ↔ Gelephu</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">Connect to the southern border region.</p>
                    </CardContent>
                  </Card>
                  <Card className="border-teal-100">
                    <CardHeader>
                      <CardTitle className="text-lg">Paro ↔ Yongphulla</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">Explore the remote eastern landscapes.</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-teal-600" />
                  Land Border Crossings
                </CardTitle>
                <p className="text-gray-600">
                  Enter Bhutan by land from India through three official border crossings.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-teal-100">
                    <CardHeader>
                      <CardTitle className="text-lg">Phuentsholing</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">The main and most popular border crossing in the west.</p>
                    </CardContent>
                  </Card>
                  <Card className="border-teal-100">
                    <CardHeader>
                      <CardTitle className="text-lg">Gelephu</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">Located in the central region of Bhutan.</p>
                    </CardContent>
                  </Card>
                  <Card className="border-teal-100">
                    <CardHeader>
                      <CardTitle className="text-lg">Samdrup Jongkhar</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">The eastern border crossing, ideal for exploring eastern Bhutan.</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Helicopter Services Tab */}
          <TabsContent value="helicopter" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="w-5 h-5 text-teal-600" />
                  Premium Helicopter Services
                </CardTitle>
                <p className="text-gray-600">
                  Experience Bhutan from above with our luxury helicopter services and scenic flights.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {helicopterServices.map((service, index) => (
                    <Card key={index} className="border-teal-100">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge className="bg-teal-600">{service.duration}</Badge>
                          <Badge variant="outline">{service.price}</Badge>
                        </div>
                        <CardTitle className="text-lg">{service.service}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        <div className="space-y-2">
                          <h5 className="font-semibold text-gray-900">Highlights:</h5>
                          <ul className="space-y-1">
                            {service.highlights.map((highlight, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-4">
                          <Button 
                            className="w-full btn-teal" 
                            size="sm"
                            onClick={() => handleBookFlight(service)}
                          >
                            Book Service
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-800 mb-2">Safety & Weather</h4>
                      <ul className="text-sm text-amber-700 space-y-1">
                        <li>• All helicopter flights are weather dependent</li>
                        <li>• Professional pilots with extensive mountain flying experience</li>
                        <li>• Modern aircraft with full safety equipment</li>
                        <li>• Advance booking required (subject to availability)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Flight Schedule Tab */}
          <TabsContent value="schedule" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  Weekly Flight Schedule
                </CardTitle>
                <p className="text-gray-600">
                  Regular flight schedule (subject to seasonal variations and weather conditions).
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {flightSchedule.map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-teal-50 rounded-lg">
                      <div className="font-semibold text-gray-900 w-24">{day.day}</div>
                      <div className="flex-1 flex flex-wrap gap-2">
                        {day.routes.map((route, idx) => (
                          <Badge key={idx} variant="outline" className="border-teal-200 text-teal-700">
                            {route}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Route Codes:</h4>
                  <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                    <div>DEL - Delhi, India</div>
                    <div>PBH - Paro, Bhutan</div>
                    <div>KTM - Kathmandu, Nepal</div>
                    <div>CCU - Kolkata, India</div>
                    <div>BKK - Bangkok, Thailand</div>
                    <div>SIN - Singapore</div>
                    <div>BOM - Mumbai, India</div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-teal-50 border border-teal-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-teal-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-emerald-800 mb-2">Booking with Tashi Dorji</h4>
                      <ul className="text-sm text-teal-700 space-y-1">
                        <li>• Expert assistance with flight bookings and connections</li>
                        <li>• Competitive rates for both Druk Air and Bhutan Airlines</li>
                        <li>• Complete travel coordination including visas and permits</li>
                        <li>• 24/7 support for flight changes and emergencies</li>
                        <li>• Group booking discounts available</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Paro Airport Tab */}
          <TabsContent value="airport" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mountain className="w-5 h-5 text-teal-600" />
                  Paro International Airport
                </CardTitle>
                <p className="text-gray-600">
                  One of the world's most challenging and scenic airports, nestled in the Himalayas.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Airport Specifications</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                        <span className="text-gray-700">Elevation</span>
                        <span className="font-semibold text-teal-600">{paroAirportInfo.elevation}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                        <span className="text-gray-700">Runway Length</span>
                        <span className="font-semibold text-teal-600">{paroAirportInfo.runway}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                        <span className="text-gray-700">Operations</span>
                        <span className="font-semibold text-teal-600">{paroAirportInfo.weather}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Landing Challenges</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                        <Mountain className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div>
                          <div className="font-semibold text-amber-800">High Altitude</div>
                          <div className="text-sm text-amber-700">Thin air affects aircraft performance</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                        <Compass className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div>
                          <div className="font-semibold text-amber-800">Narrow Valley</div>
                          <div className="text-sm text-amber-700">Requires precise navigation skills</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                        <Users className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div>
                          <div className="font-semibold text-amber-800">Certified Pilots Only</div>
                          <div className="text-sm text-amber-700">Special training required</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Camera className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Scenic Approach</h4>
                      <p className="text-sm text-green-700">
                        The approach to Paro Airport offers breathtaking views of the Himalayas, traditional Bhutanese 
                        architecture, and pristine valleys. Many consider it one of the most beautiful airport approaches in the world.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Airport Services */}
            <Card>
              <CardHeader>
                <CardTitle>Airport Services & Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-teal-50 rounded-lg">
                    <Shield className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">Immigration</h4>
                    <p className="text-sm text-gray-600">Visa stamping and entry procedures</p>
                  </div>
                  <div className="text-center p-4 bg-teal-50 rounded-lg">
                    <Luggage className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">Baggage</h4>
                    <p className="text-sm text-gray-600">Baggage handling and customs</p>
                  </div>
                  <div className="text-center p-4 bg-teal-50 rounded-lg">
                    <Route className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">Transport</h4>
                    <p className="text-sm text-gray-600">Airport transfers and car rentals</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Fly to Bhutan?</h2>
            <p className="text-xl mb-6 opacity-90">
              Let Tashi Dorji, your trusted Bhutan travel expert, arrange your flights and ensure a smooth journey to the Last Shangri-La. With years of experience and partnerships with both airlines, get the best deals and seamless travel coordination.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                className="bg-gradient-to-br from-white to-teal-50 text-teal-600 hover:bg-gray-100 px-8 py-3"
                onClick={() => handleBookFlight()}
              >
                <Plane className="w-5 h-5 mr-2" />
                Book Flights
              </Button>
              <Link to="/tours">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600 px-8 py-3">
                  View Tour Packages
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Flight Booking Form */}
      <FlightBookingFormLauncher 
        isOpen={isFlightFormOpen}
        onClose={() => setIsFlightFormOpen(false)}
        selectedRoute={selectedRoute}
      />
    </div>
  );
}
