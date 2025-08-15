import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock, Star, CheckCircle } from "lucide-react";

export default function GuideDashboard() {
  // Mock data - replace with real API calls
  const assignedItineraries = [
    {
      id: 1,
      name: "Cultural Heritage Tour",
      tourist: "John Smith",
      startDate: "2024-02-15",
      endDate: "2024-02-22",
      status: "upcoming",
      location: "Thimphu - Paro"
    },
    {
      id: 2,
      name: "Tiger's Nest Trek",
      tourist: "Sarah Johnson",
      startDate: "2024-02-10",
      endDate: "2024-02-12",
      status: "active",
      location: "Paro"
    }
  ];

  const completedItineraries = [
    {
      id: 3,
      name: "Bhutan Festival Tour",
      tourist: "Mike Wilson",
      completedDate: "2024-01-28",
      rating: 5,
      location: "Punakha"
    },
    {
      id: 4,
      name: "Adventure Trekking",
      tourist: "Emma Davis",
      completedDate: "2024-01-15",
      rating: 4,
      location: "Bumthang"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-brand-primary">Guide Dashboard</h1>
        <Badge className="bg-brand-secondary text-white px-3 py-1">Licensed Guide</Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="brand-card">
          <CardContent className="p-6 text-center">
            <Calendar className="w-8 h-8 text-brand-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-brand-primary">{assignedItineraries.length}</div>
            <div className="text-sm text-brand-text/70">Assigned Tours</div>
          </CardContent>
        </Card>
        
        <Card className="brand-card">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-8 h-8 text-brand-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-brand-secondary">{completedItineraries.length}</div>
            <div className="text-sm text-brand-text/70">Completed Tours</div>
          </CardContent>
        </Card>
        
        <Card className="brand-card">
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 text-brand-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-brand-accent">4.8</div>
            <div className="text-sm text-brand-text/70">Average Rating</div>
          </CardContent>
        </Card>
        
        <Card className="brand-card">
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-brand-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-brand-primary">24</div>
            <div className="text-sm text-brand-text/70">Happy Tourists</div>
          </CardContent>
        </Card>
      </div>

      {/* Assigned Itineraries */}
      <section id="assigned">
        <Card className="brand-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-brand-primary">
              <Calendar className="w-5 h-5" />
              Assigned Itineraries
            </CardTitle>
          </CardHeader>
          <CardContent>
            {assignedItineraries.length === 0 ? (
              <div className="text-center py-8 text-brand-text/70">
                No assigned itineraries at the moment.
              </div>
            ) : (
              <div className="space-y-4">
                {assignedItineraries.map((itinerary) => (
                  <div key={itinerary.id} className="border border-brand-primary/20 rounded-lg p-4 hover:border-brand-primary transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-brand-text">{itinerary.name}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-brand-text/70">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {itinerary.tourist}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {itinerary.location}
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
                      <Button size="sm" className="btn-brand-primary">View Details</Button>
                      <Button size="sm" variant="outline">Contact Tourist</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Itinerary History */}
      <section id="history">
        <Card className="brand-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-brand-primary">
              <CheckCircle className="w-5 h-5" />
              Completed Tours
            </CardTitle>
          </CardHeader>
          <CardContent>
            {completedItineraries.length === 0 ? (
              <div className="text-center py-8 text-brand-text/70">
                No completed tours yet.
              </div>
            ) : (
              <div className="space-y-4">
                {completedItineraries.map((itinerary) => (
                  <div key={itinerary.id} className="border border-brand-primary/20 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-brand-text">{itinerary.name}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-brand-text/70">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {itinerary.tourist}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {itinerary.location}
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

      {/* Profile Section */}
      <section id="profile">
        <Card className="brand-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-brand-primary">
              <Users className="w-5 h-5" />
              My Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-brand-text mb-4">Personal Information</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Name:</strong> Tenzin Norbu</div>
                  <div><strong>License ID:</strong> BG-2024-001</div>
                  <div><strong>Languages:</strong> English, Dzongkha, Hindi</div>
                  <div><strong>Experience:</strong> 8 years</div>
                  <div><strong>Specialization:</strong> Cultural Tours, Trekking</div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-brand-text mb-4">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Email:</strong> tenzin.guide@bhutan.com</div>
                  <div><strong>Phone:</strong> +975 17 123 456</div>
                  <div><strong>Emergency Contact:</strong> +975 17 654 321</div>
                  <div><strong>Location:</strong> Thimphu, Bhutan</div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button className="btn-brand-primary">Edit Profile</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}