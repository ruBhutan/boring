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
import { ACCOMMODATION_SELECT_OPTIONS } from "@/lib/accommodationTypes";
import { TOUR_CATEGORIES } from "@/lib/tourCategories";

const customTourFormSchema = insertCustomTourRequestSchema.extend({
  interests: z.array(z.string()).min(1, "Please select at least one interest"),
  destinations: z.array(z.string()).min(1, "Please select at least one destination")
});

type CustomTourFormData = z.infer<typeof customTourFormSchema>;

const INTERESTS_OPTIONS = [
  ...TOUR_CATEGORIES.map(cat => cat.label.replace(' Tours', '')),
  "Local Cuisine", "Traditional Crafts", "Festivals", "Hot Stone Baths",
  "Archery", "Meditation", "Textile Weaving", "Yak Herding", "Farmhouse Experience"
];

const DESTINATIONS_OPTIONS = [
  "Thimphu", "Paro", "Punakha", "Wangdue", "Bumthang", 
  "Trongsa", "Mongar", "Trashigang", "Haa Valley", "Samtse"
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
      accommodationType: "none",
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
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-teal-gradient-light rounded-full flex items-center justify-center mx-auto teal-glow">
            <Heart className="w-8 h-8 text-teal-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 brand-heading">Request Submitted!</h3>
            <p className="text-gray-600 brand-body">
              Thank you for your custom tour request. Our team will review your requirements 
              and contact you within 24 hours with a personalized itinerary and pricing.
            </p>
          </div>
          <Button onClick={() => setIsSubmitted(false)} className="btn-teal-outline">
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="brand-card max-w-4xl mx-auto">
      <div className="p-8 border-b border-teal-100">
        <h2 className="text-2xl font-bold text-center brand-heading">
          Design Your Perfect Bhutan Journey
        </h2>
        <p className="text-center text-gray-600 brand-body mt-2">
          Tell us your preferences and we'll create a personalized itinerary just for you
        </p>
      </div>
      <div className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information */}
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

            {/* Trip Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5" />
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

            {/* Preferences */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Heart className="w-5 h-5" />
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

            {/* Accommodation & Transport */}
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
                        {ACCOMMODATION_SELECT_OPTIONS.map((option) => (
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
                className="btn-teal w-full md:w-auto px-12 py-3"
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