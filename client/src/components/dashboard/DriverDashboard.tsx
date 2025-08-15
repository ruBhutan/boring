import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock, Star, CheckCircle, Truck } from "lucide-react";

export default function DriverDashboard() {
  // Mock data - replace with real API calls
  const assignedItineraries = [
    {
      id: 1,
      name: "Cultural Heritage Tour",
      tourist: "John Smith",
      guide: "Tenzin Norbu",
      startDate: "2024-02-15",
      endDate: "2024-02-22",
      status: "upcoming",
      route: "Thimphu - Paro - Punakha"
    },
    {
      id: 2,
      name: "Tiger's Nest Trek",
      tourist: "Sarah Johnson",
      guide: "Karma Wangchuk",
      startDate: "2024-02-10",
      endDate: "2024-02-12",
      status: "active",
      route: "Paro Valley"
    }
  ];

  const completedItineraries = [
    {
      id: 3,
      name: "Bhutan Festival Tour",
      tourist: "Mike Wilson",
      guide: "Pema Lhamo",
      completedDate: "2024-01-28",
      rating: 5,
      route: "Thimphu - Punakha"
    },
    {
      id: 4,
      name: "Adventure Trekking",
      tourist: "Emma Davis",
      guide: "Tenzin Norbu",
      completedDate: "2024-01-15",
      rating: 4,
      route: "Bumthang Circuit"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-brand-primary">Driver Dashboard</h1>
        <Badge className="bg-brand-secondary text-white px-3 py-1">Licensed Driver</Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="brand-card">
          <CardContent className="p-6 text-center">
            <Calendar className="w-8 h-8 text-brand-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-brand-primary">{assignedItineraries.length}</div>
            <div className="text-sm text-brand-text/70">Assigned Routes</div>
          </CardContent>
        </Card>
        
        <Card className="brand-card">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-8 h-8 text-brand-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-brand-secondary">{completedItineraries.length}</div>
            <div className="text-sm text-brand-text/70">Completed Trips</div>
          </CardContent>
        </Card>
        
        <Card className="brand-card">
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 text-brand-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-brand-accent">4.7</div>
            <div className="text-sm text-brand-text/70">Average Rating</div>
          </CardContent>
        </Card>
        
        <Card className="brand-card">
          <CardContent className="p-6 text-center">
            <Truck className="w-8 h-8 text-brand-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-brand-primary">15,420</div>
            <div className="text-sm text-brand-text/70">KM Driven</div>
          </CardContent>
        </Card>
      </div>

      {/* Assigned Itineraries */}
      <section id="assigned">
        <Card className="brand-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-brand-primary">
              <Calendar className="w-5 h-5" />
              Assigned Routes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {assignedItineraries.length === 0 ? (
              <div className="text-center py-8 text-brand-text/70">
                No assigned routes at the moment.
              </div>
            ) : (
              <div className="space-y-4">
                {assignedItineraries.map((itinerary) => (
                  <div key={itinerary.id} className="border border-brand-primary/20 rounded-lg p-4 hover:border-brand-primary transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-brand-text">{itinerary.name}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm text-brand-text/70">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            Tourist: {itinerary.tourist}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            Guide: {itinerary.guide}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            Route: {itinerary.route}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {itinerary.startDate} - {itinerary.endDate}
                          </div>
                        </div>
                      </div>
                      <Badge className={`${
                        itinerary.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {itinerary.status}
                      </Badge>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" className="btn-brand-primary">View Route Details</Button>
                      <Button size="sm" variant="outline">Contact Guide</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Trip History */}
      <section id="history">
        <Card className="brand-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-brand-primary">
              <CheckCircle className="w-5 h-5" />
              Completed Trips
            </CardTitle>
          </CardHeader>
          <CardContent>
            {completedItineraries.length === 0 ? (
              <div className="text-center py-8 text-brand-text/70">
                No completed trips yet.
              </div>
            ) : (
              <div className="space-y-4">
                {completedItineraries.map((itinerary) => (
                  <div key={itinerary.id} className="border border-brand-primary/20 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-brand-text">{itinerary.name}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm text-brand-text/70">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            Tourist: {itinerary.tourist}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            Guide: {itinerary.guide}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            Route: {itinerary.route}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Completed: {itinerary.completedDate}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-brand-accent fill-current" />
                        <span className="font-semibold text-brand-accent">{itinerary.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Profile & Vehicle Section */}
      <section id="profile">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="brand-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-brand-primary">
                <Users className="w-5 h-5" />
                My Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-brand-text mb-2">Personal Information</h3>
                  <div className="space-y-1 text-sm text-brand-text/80">
                    <div><strong>Name:</strong> Sonam Dorji</div>
                    <div><strong>License ID:</strong> BD-2024-001</div>
                    <div><strong>Experience:</strong> 12 years</div>
                    <div><strong>Specialization:</strong> Mountain Routes, Long Distance</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-brand-text mb-2">Contact Information</h3>
                  <div className="space-y-1 text-sm text-brand-text/80">
                    <div><strong>Email:</strong> sonam.driver@bhutan.com</div>
                    <div><strong>Phone:</strong> +975 17 789 012</div>
                    <div><strong>Emergency:</strong> +975 17 210 987</div>
                  </div>
                </div>
                <Button className="btn-brand-primary">Edit Profile</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="brand-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-brand-primary">
                <Truck className="w-5 h-5" />
                Vehicle Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-brand-text mb-2">Vehicle Information</h3>
                  <div className="space-y-1 text-sm text-brand-text/80">
                    <div><strong>Make & Model:</strong> Toyota Land Cruiser</div>
                    <div><strong>Year:</strong> 2022</div>
                    <div><strong>License Plate:</strong> BP-1-A-1234</div>
                    <div><strong>Capacity:</strong> 7 passengers</div>
                    <div><strong>Fuel Type:</strong> Diesel</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-brand-text mb-2">Maintenance Status</h3>
                  <div className="space-y-1 text-sm text-brand-text/80">
                    <div><strong>Last Service:</strong> 2024-01-15</div>
                    <div><strong>Next Service:</strong> 2024-04-15</div>
                    <div><strong>Insurance:</strong> Valid until Dec 2024</div>
                    <div className="flex items-center gap-2">
                      <strong>Status:</strong>
                      <Badge className="bg-green-100 text-green-800">Roadworthy</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="outline">Update Vehicle Info</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}