import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { insertCustomTourRequestSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { MapPin, Calendar, Users, DollarSign, Heart, Car } from "lucide-react";
import { useState } from "react";

const customTourFormSchema = insertCustomTourRequestSchema.extend({
  interests: z.array(z.string()).min(1, "Please select at least one interest"),
  destinations: z.array(z.string()).min(1, "Please select at least one destination")
});

type CustomTourFormData = z.infer<typeof customTourFormSchema>;

const INTERESTS_OPTIONS = [
  "Cultural Tours", "Adventure Tours", "Trekking", "Photography", "Wellness",
  "Local Cuisine", "Traditional Crafts", "Festivals", "Hot Stone Baths",
  "Archery", "Meditation", "Textile Weaving", "Yak Herding", "Farmhouse Experience"
];

const DESTINATIONS_OPTIONS = [
  "Thimphu", "Paro", "Punakha", "Wangdue", "Bumthang", 
  "Trongsa", "Mongar", "Trashigang", "Haa Valley", "Samtse"
];

const ACCOMMODATION_OPTIONS = [
  { value: "budget", label: "Budget Hotels" },
  { value: "standard", label: "Standard Hotels" },
  { value: "luxury", label: "Luxury Hotels" }
];

export default function CustomTourRequestForm() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<CustomTourFormData>({
    resolver: zodResolver(customTourFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      duration: 7,
      groupSize: 2,
      budget: 5000,
      interests: [],
      preferredDates: "",
      specialRequirements: "",
      destinations: [],
      accommodationType: "standard",
      transportPreference: "private"
    }
  });

  const requestMutation = useMutation({
    mutationFn: (data: CustomTourFormData) => 
      apiRequest("POST", "/api/custom-tours", data),
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Custom Tour Request Submitted!",
        description: "We'll review your request and get back to you within 24 hours.",
        duration: 5000
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: CustomTourFormData) => {
    requestMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="brand-card max-w-2xl mx-auto p-8">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <Heart className="w-10 h-10 text-emerald-600" />
          </div>
          <div className="space-y-3">
            <h3 className="text-3xl font-bold text-slate-900">Request Submitted!</h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              Thank you for your custom tour request. Our team will review your requirements 
              and contact you within 24 hours with a personalized itinerary and pricing.
            </p>
          </div>
          <Button onClick={() => setIsSubmitted(false)} className="brand-btn-outline">
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="brand-card-gradient max-w-5xl mx-auto overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-indigo-600 p-8 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3">
            Design Your Perfect Bhutan Journey
          </h2>
          <p className="text-emerald-100 text-lg">
            Tell us your preferences and we'll create a personalized itinerary just for you
          </p>
        </div>
      </div>
      
      <div className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            {/* Personal Information Section */}
            <div className="brand-form-section">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-emerald-600" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 000-0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Trip Details Section */}
            <div className="brand-form-section">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-emerald-600" />
                Trip Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Duration (Days) *
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="3" 
                          max="30"
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="groupSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Group Size *
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          max="12"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Budget (USD)
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1000"
                          placeholder="5000"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="preferredDates"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Travel Dates</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., March 2024, Spring 2024, or specific dates" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Preferences Section */}
            <div className="brand-form-section">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Heart className="w-6 h-6 text-emerald-600" />
                Your Preferences
              </h3>

              <FormField
                control={form.control}
                name="interests"
                render={() => (
                  <FormItem>
                    <FormLabel>Interests & Activities *</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {INTERESTS_OPTIONS.map((interest) => (
                        <FormField
                          key={interest}
                          control={form.control}
                          name="interests"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(interest)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, interest])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== interest
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {interest}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="destinations"
                render={() => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Preferred Destinations *
                    </FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {DESTINATIONS_OPTIONS.map((destination) => (
                        <FormField
                          key={destination}
                          control={form.control}
                          name="destinations"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(destination)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, destination])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== destination
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {destination}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Accommodation & Transport Section */}
            <div className="brand-form-section">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Car className="w-6 h-6 text-emerald-600" />
                Accommodation & Transport
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="accommodationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Accommodation Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ACCOMMODATION_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="transportPreference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Car className="w-4 h-4" />
                        Transportation Preference
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="private">Private Vehicle</SelectItem>
                          <SelectItem value="shared">Shared Transport</SelectItem>
                          <SelectItem value="mixed">Mixed Options</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="specialRequirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requirements</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any special dietary requirements, accessibility needs, or other preferences..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center pt-6">
              <Button 
                type="submit" 
                className="btn-brand-primary w-full md:w-auto px-12 py-3"
                disabled={requestMutation.isPending}
              >
                {requestMutation.isPending ? "Submitting Request..." : "Submit Custom Tour Request"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
