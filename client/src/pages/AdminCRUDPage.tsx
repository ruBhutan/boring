import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, Edit, Trash2, Save, X, 
  Plane, Calendar, Hotel, Users, 
  Star, Building, MessageSquare, FileText
} from "lucide-react";

export default function AdminCRUDPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("tours");

  // Tours CRUD
  const { data: tours = [] } = useQuery({ queryKey: ["/api/tours"] });
  const [tourForm, setTourForm] = useState({
    name: "", description: "", duration: 0, price: 0, category: "", 
    imageUrl: "", highlights: "", maxGroupSize: 0, difficulty: "", bestSeason: ""
  });
  const [editingTour, setEditingTour] = useState<number | null>(null);

  const createTour = useMutation({
    mutationFn: (data: any) => fetch("/api/tours", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tours"] });
      setTourForm({ name: "", description: "", duration: 0, price: 0, category: "", imageUrl: "", highlights: "", maxGroupSize: 0, difficulty: "", bestSeason: "" });
      toast({ title: "Tour created successfully" });
    }
  });

  const updateTour = useMutation({
    mutationFn: ({ id, data }: { id: number, data: any }) => fetch(`/api/tours/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tours"] });
      setEditingTour(null);
      toast({ title: "Tour updated successfully" });
    }
  });

  const deleteTour = useMutation({
    mutationFn: (id: number) => fetch(`/api/tours/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tours"] });
      toast({ title: "Tour deleted successfully" });
    }
  });

  // Festivals CRUD
  const { data: festivals = [] } = useQuery({ queryKey: ["/api/festivals"] });
  const [festivalForm, setFestivalForm] = useState({
    name: "", description: "", location: "", startDate: "", endDate: "", 
    imageUrl: "", category: "", highlights: "", ticketPrice: 0, maxCapacity: 0
  });
  const [editingFestival, setEditingFestival] = useState<number | null>(null);

  const createFestival = useMutation({
    mutationFn: (data: any) => fetch("/api/festivals", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/festivals"] });
      setFestivalForm({ name: "", description: "", location: "", startDate: "", endDate: "", imageUrl: "", category: "", highlights: "", ticketPrice: 0, maxCapacity: 0 });
      toast({ title: "Festival created successfully" });
    }
  });

  // Hotels CRUD
  const { data: hotels = [] } = useQuery({ queryKey: ["/api/hotels"] });
  const [hotelForm, setHotelForm] = useState({
    name: "", description: "", location: "", address: "", imageUrl: "", 
    category: "", starRating: 0, amenities: "", features: "", pricePerNight: 0
  });

  const createHotel = useMutation({
    mutationFn: (data: any) => fetch("/api/hotels", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/hotels"] });
      setHotelForm({ name: "", description: "", location: "", address: "", imageUrl: "", category: "", starRating: 0, amenities: "", features: "", pricePerNight: 0 });
      toast({ title: "Hotel created successfully" });
    }
  });

  // Testimonials CRUD
  const { data: testimonials = [] } = useQuery({ queryKey: ["/api/testimonials"] });
  const [testimonialForm, setTestimonialForm] = useState({
    name: "", country: "", imageUrl: "", text: "", rating: 5, tripName: "", duration: ""
  });

  const createTestimonial = useMutation({
    mutationFn: (data: any) => fetch("/api/testimonials", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      setTestimonialForm({ name: "", country: "", imageUrl: "", text: "", rating: 5, tripName: "", duration: "" });
      toast({ title: "Testimonial created successfully" });
    }
  });

  // Blog Posts CRUD
  const { data: blogPosts = [] } = useQuery({ queryKey: ["/api/blog"] });
  const [blogForm, setBlogForm] = useState({
    title: "", content: "", excerpt: "", imageUrl: "", category: "", readTime: "", author: "", authorImage: ""
  });

  const createBlogPost = useMutation({
    mutationFn: (data: any) => fetch("/api/blog", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      setBlogForm({ title: "", content: "", excerpt: "", imageUrl: "", category: "", readTime: "", author: "", authorImage: "" });
      toast({ title: "Blog post created successfully" });
    }
  });

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...tourForm,
      highlights: tourForm.highlights.split(",").map(h => h.trim()),
      isActive: true
    };
    if (editingTour) {
      updateTour.mutate({ id: editingTour, data });
    } else {
      createTour.mutate(data);
    }
  };

  const handleFestivalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...festivalForm,
      startDate: new Date(festivalForm.startDate),
      endDate: new Date(festivalForm.endDate),
      highlights: festivalForm.highlights.split(",").map(h => h.trim()),
      isActive: true
    };
    createFestival.mutate(data);
  };

  const handleHotelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...hotelForm,
      amenities: hotelForm.amenities.split(",").map(a => a.trim()),
      features: hotelForm.features.split(",").map(f => f.trim()),
      isActive: true
    };
    createHotel.mutate(data);
  };

  const handleTestimonialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...testimonialForm, isActive: true };
    createTestimonial.mutate(data);
  };

  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...blogForm, isPublished: true, publishedAt: new Date() };
    createBlogPost.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 bg-gradient-to-br from-teal-50 to-emerald-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin CRUD Panel</h1>
          <p className="text-xl text-gray-600">Manage all website content</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="tours" className="flex items-center gap-2">
              <Plane className="w-4 h-4" />
              Tours
            </TabsTrigger>
            <TabsTrigger value="festivals" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Festivals
            </TabsTrigger>
            <TabsTrigger value="hotels" className="flex items-center gap-2">
              <Hotel className="w-4 h-4" />
              Hotels
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="operators" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Operators
            </TabsTrigger>
          </TabsList>

          {/* Tours Tab */}
          <TabsContent value="tours" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create/Edit Tour</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTourSubmit} className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input value={tourForm.name} onChange={(e) => setTourForm({...tourForm, name: e.target.value})} required />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Input value={tourForm.category} onChange={(e) => setTourForm({...tourForm, category: e.target.value})} required />
                  </div>
                  <div>
                    <Label>Duration (days)</Label>
                    <Input type="number" value={tourForm.duration} onChange={(e) => setTourForm({...tourForm, duration: parseInt(e.target.value)})} required />
                  </div>
                  <div>
                    <Label>Price ($)</Label>
                    <Input type="number" value={tourForm.price} onChange={(e) => setTourForm({...tourForm, price: parseInt(e.target.value)})} required />
                  </div>
                  <div>
                    <Label>Max Group Size</Label>
                    <Input type="number" value={tourForm.maxGroupSize} onChange={(e) => setTourForm({...tourForm, maxGroupSize: parseInt(e.target.value)})} />
                  </div>
                  <div>
                    <Label>Difficulty</Label>
                    <Input value={tourForm.difficulty} onChange={(e) => setTourForm({...tourForm, difficulty: e.target.value})} />
                  </div>
                  <div className="col-span-2">
                    <Label>Description</Label>
                    <Textarea value={tourForm.description} onChange={(e) => setTourForm({...tourForm, description: e.target.value})} required />
                  </div>
                  <div className="col-span-2">
                    <Label>Image URL</Label>
                    <Input value={tourForm.imageUrl} onChange={(e) => setTourForm({...tourForm, imageUrl: e.target.value})} required />
                  </div>
                  <div className="col-span-2">
                    <Label>Highlights (comma separated)</Label>
                    <Input value={tourForm.highlights} onChange={(e) => setTourForm({...tourForm, highlights: e.target.value})} />
                  </div>
                  <div className="col-span-2">
                    <Button type="submit" className="w-full">
                      <Save className="w-4 h-4 mr-2" />
                      {editingTour ? "Update Tour" : "Create Tour"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tours List ({tours.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {tours.map((tour: any) => (
                    <div key={tour.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{tour.name}</h3>
                        <p className="text-sm text-gray-600">{tour.category} • {tour.duration} days • ${tour.price}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => {
                          setTourForm({
                            name: tour.name, description: tour.description, duration: tour.duration,
                            price: tour.price, category: tour.category, imageUrl: tour.imageUrl,
                            highlights: tour.highlights?.join(", ") || "", maxGroupSize: tour.maxGroupSize || 0,
                            difficulty: tour.difficulty || "", bestSeason: tour.bestSeason || ""
                          });
                          setEditingTour(tour.id);
                        }}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteTour.mutate(tour.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Festivals Tab */}
          <TabsContent value="festivals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Festival</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFestivalSubmit} className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input value={festivalForm.name} onChange={(e) => setFestivalForm({...festivalForm, name: e.target.value})} required />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input value={festivalForm.location} onChange={(e) => setFestivalForm({...festivalForm, location: e.target.value})} required />
                  </div>
                  <div>
                    <Label>Start Date</Label>
                    <Input type="date" value={festivalForm.startDate} onChange={(e) => setFestivalForm({...festivalForm, startDate: e.target.value})} required />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input type="date" value={festivalForm.endDate} onChange={(e) => setFestivalForm({...festivalForm, endDate: e.target.value})} required />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Input value={festivalForm.category} onChange={(e) => setFestivalForm({...festivalForm, category: e.target.value})} required />
                  </div>
                  <div>
                    <Label>Ticket Price ($)</Label>
                    <Input type="number" value={festivalForm.ticketPrice} onChange={(e) => setFestivalForm({...festivalForm, ticketPrice: parseInt(e.target.value)})} />
                  </div>
                  <div className="col-span-2">
                    <Label>Description</Label>
                    <Textarea value={festivalForm.description} onChange={(e) => setFestivalForm({...festivalForm, description: e.target.value})} required />
                  </div>
                  <div className="col-span-2">
                    <Label>Image URL</Label>
                    <Input value={festivalForm.imageUrl} onChange={(e) => setFestivalForm({...festivalForm, imageUrl: e.target.value})} required />
                  </div>
                  <div className="col-span-2">
                    <Label>Highlights (comma separated)</Label>
                    <Input value={festivalForm.highlights} onChange={(e) => setFestivalForm({...festivalForm, highlights: e.target.value})} />
                  </div>
                  <div className="col-span-2">
                    <Button type="submit" className="w-full">
                      <Save className="w-4 h-4 mr-2" />
                      Create Festival
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Festivals List ({festivals.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {festivals.map((festival: any) => (
                    <div key={festival.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{festival.name}</h3>
                        <p className="text-sm text-gray-600">{festival.location} • {festival.category}</p>
                      </div>
                      <Badge>{festival.category}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hotels Tab */}
          <TabsContent value="hotels" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Hotel</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleHotelSubmit} className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input value={hotelForm.name} onChange={(e) => setHotelForm({...hotelForm, name: e.target.value})} required />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input value={hotelForm.location} onChange={(e) => setHotelForm({...hotelForm, location: e.target.value})} required />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Input value={hotelForm.category} onChange={(e) => setHotelForm({...hotelForm, category: e.target.value})} required />
                  </div>
                  <div>
                    <Label>Star Rating</Label>
                    <Input type="number" min="1" max="5" value={hotelForm.starRating} onChange={(e) => setHotelForm({...hotelForm, starRating: parseInt(e.target.value)})} required />
                  </div>
                  <div>
                    <Label>Price per Night ($)</Label>
                    <Input type="number" value={hotelForm.pricePerNight} onChange={(e) => setHotelForm({...hotelForm, pricePerNight: parseInt(e.target.value)})} required />
                  </div>
                  <div>
                    <Label>Address</Label>
                    <Input value={hotelForm.address} onChange={(e) => setHotelForm({...hotelForm, address: e.target.value})} required />
                  </div>
                  <div className="col-span-2">
                    <Label>Description</Label>
                    <Textarea value={hotelForm.description} onChange={(e) => setHotelForm({...hotelForm, description: e.target.value})} required />
                  </div>
                  <div className="col-span-2">
                    <Label>Image URL</Label>
                    <Input value={hotelForm.imageUrl} onChange={(e) => setHotelForm({...hotelForm, imageUrl: e.target.value})} required />
                  </div>
                  <div>
                    <Label>Amenities (comma separated)</Label>
                    <Input value={hotelForm.amenities} onChange={(e) => setHotelForm({...hotelForm, amenities: e.target.value})} />
                  </div>
                  <div>
                    <Label>Features (comma separated)</Label>
                    <Input value={hotelForm.features} onChange={(e) => setHotelForm({...hotelForm, features: e.target.value})} />
                  </div>
                  <div className="col-span-2">
                    <Button type="submit" className="w-full">
                      <Save className="w-4 h-4 mr-2" />
                      Create Hotel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hotels List ({hotels.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {hotels.map((hotel: any) => (
                    <div key={hotel.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{hotel.name}</h3>
                        <p className="text-sm text-gray-600">{hotel.location} • {hotel.category} • ${hotel.pricePerNight}/night</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {[...Array(hotel.starRating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Testimonial</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTestimonialSubmit} className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input value={testimonialForm.name} onChange={(e) => setTestimonialForm({...testimonialForm, name: e.target.value})} required />
                  </div>
                  <div>
                    <Label>Country</Label>
                    <Input value={testimonialForm.country} onChange={(e) => setTestimonialForm({...testimonialForm, country: e.target.value})} required />
                  </div>
                  <div>
                    <Label>Trip Name</Label>
                    <Input value={testimonialForm.tripName} onChange={(e) => setTestimonialForm({...testimonialForm, tripName: e.target.value})} required />
                  </div>
                  <div>
                    <Label>Duration</Label>
                    <Input value={testimonialForm.duration} onChange={(e) => setTestimonialForm({...testimonialForm, duration: e.target.value})} required />
                  </div>
                  <div>
                    <Label>Rating (1-5)</Label>
                    <Input type="number" min="1" max="5" value={testimonialForm.rating} onChange={(e) => setTestimonialForm({...testimonialForm, rating: parseInt(e.target.value)})} required />
                  </div>
                  <div>
                    <Label>Image URL</Label>
                    <Input value={testimonialForm.imageUrl} onChange={(e) => setTestimonialForm({...testimonialForm, imageUrl: e.target.value})} required />
                  </div>
                  <div className="col-span-2">
                    <Label>Testimonial Text</Label>
                    <Textarea value={testimonialForm.text} onChange={(e) => setTestimonialForm({...testimonialForm, text: e.target.value})} required />
                  </div>
                  <div className="col-span-2">
                    <Button type="submit" className="w-full">
                      <Save className="w-4 h-4 mr-2" />
                      Create Testimonial
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Testimonials List ({testimonials.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {testimonials.map((testimonial: any) => (
                    <div key={testimonial.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600">{testimonial.country} • {testimonial.tripName}</p>
                        <p className="text-sm text-gray-500 mt-1">{testimonial.text.substring(0, 100)}...</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Blog Post</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBlogSubmit} className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input value={blogForm.title} onChange={(e) => setBlogForm({...blogForm, title: e.target.value})} required />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Input value={blogForm.category} onChange={(e) => setBlogForm({...blogForm, category: e.target.value})} required />
                  </div>
                  <div>
                    <Label>Author</Label>
                    <Input value={blogForm.author} onChange={(e) => setBlogForm({...blogForm, author: e.target.value})} required />
                  </div>
                  <div>
                    <Label>Read Time</Label>
                    <Input value={blogForm.readTime} onChange={(e) => setBlogForm({...blogForm, readTime: e.target.value})} required />
                  </div>
                  <div className="col-span-2">
                    <Label>Excerpt</Label>
                    <Textarea value={blogForm.excerpt} onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})} required />
                  </div>
                  <div className="col-span-2">
                    <Label>Content</Label>
                    <Textarea rows={6} value={blogForm.content} onChange={(e) => setBlogForm({...blogForm, content: e.target.value})} required />
                  </div>
                  <div>
                    <Label>Image URL</Label>
                    <Input value={blogForm.imageUrl} onChange={(e) => setBlogForm({...blogForm, imageUrl: e.target.value})} required />
                  </div>
                  <div>
                    <Label>Author Image URL</Label>
                    <Input value={blogForm.authorImage} onChange={(e) => setBlogForm({...blogForm, authorImage: e.target.value})} required />
                  </div>
                  <div className="col-span-2">
                    <Button type="submit" className="w-full">
                      <Save className="w-4 h-4 mr-2" />
                      Create Blog Post
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Blog Posts List ({blogPosts.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {blogPosts.map((post: any) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{post.title}</h3>
                        <p className="text-sm text-gray-600">{post.category} • {post.author} • {post.readTime}</p>
                        <p className="text-sm text-gray-500 mt-1">{post.excerpt}</p>
                      </div>
                      <Badge variant={post.isPublished ? "default" : "secondary"}>
                        {post.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tour Operators Tab */}
          <TabsContent value="operators" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tour Operators</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Tour operators management will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}