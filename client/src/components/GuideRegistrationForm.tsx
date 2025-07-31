import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { insertGuideSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { UserCheck, Upload, Phone, Mail, User, Mountain, Heart, Camera } from "lucide-react";
import type { Tour } from "@shared/schema";

const guideFormSchema = insertGuideSchema.extend({
  confirmEmail: z.string().email("Please enter a valid email address"),
  specializations: z.array(z.string()).min(1, "Please select at least one specialization")
}).refine((data) => data.email === data.confirmEmail, {
  message: "Emails don't match",
  path: ["confirmEmail"]
});

type GuideFormData = z.infer<typeof guideFormSchema>;

export default function GuideRegistrationForm() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch available tours for specializations
  const { data: tours = [] } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });

  // Define tour specializations based on available tours and categories
  const tourSpecializations = [
    { id: "cultural", label: "Cultural Tours(package)", icon: Heart, description: "Traditional festivals, monasteries, cultural immersion" },
    { id: "adventure", label: "Adventure Tours(package)", icon: Mountain, description: "Trekking, hiking, outdoor activities" },
    { id: "spiritual", label: "Spiritual Tours(package)", icon: Camera, description: "Meditation retreats, spiritual journeys" },
    { id: "photography", label: "Photography Tours(package)", icon: Camera, description: "Landscape and cultural photography" },
    { id: "festival", label: "Festival Tours(package)", icon: Heart, description: "Traditional festivals and celebrations" },
    { id: "wildlife", label: "Wildlife Tours(package)", icon: Mountain, description: "Bird watching, nature exploration" },
    ...tours.map(tour => ({
      id: tour.name.toLowerCase().replace(/\s+/g, '-'),
      label: tour.name,
      icon: tour.category === 'cultural' ? Heart : tour.category === 'adventure' ? Mountain : Camera,
      description: `${tour.duration} - ${tour.category} tour`
    }))
  ];

  const form = useForm<GuideFormData>({
    resolver: zodResolver(guideFormSchema),
    defaultValues: {
      name: "",
      email: "",
      confirmEmail: "",
      phone: "",
      licenseImageUrl: "",
      registrationType: "guide",
      specializations: []
    }
  });

  const registerMutation = useMutation({
    mutationFn: async (data: Omit<GuideFormData, 'confirmEmail'>) => {
      const response = await fetch("/api/guides/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: (response) => {
      setIsSubmitted(true);
      toast({
        title: "Registration Successful!",
        description: "Your registration has been submitted successfully. We will review and contact you soon.",
        duration: 5000
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: GuideFormData) => {
    const { confirmEmail, ...submitData } = data;
    registerMutation.mutate(submitData);
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
              <p className="text-gray-600">
                Thank you for registering with us. We will call and inform you if we require your services.
              </p>
            </div>
            <Button onClick={() => setIsSubmitted(false)} variant="outline">
              Register Another Guide/Driver
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Guide & Driver Registration
        </CardTitle>
        <p className="text-center text-gray-600">
          Join our team of professional guides and drivers in Bhutan
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </h3>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
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
                      <FormLabel className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address *
                      </FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Confirm your email" {...field} />
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
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone Number *
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="+975 XXXXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Professional Details</h3>
                
                <FormField
                  control={form.control}
                  name="registrationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registration Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="guide">Tour Guide</SelectItem>
                          <SelectItem value="driver">Driver</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="licenseImageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        License/Certification Document *
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Upload your guide/driving license (URL)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-gray-500">
                        Please provide a URL to your guide license or driving license document
                      </p>
                    </FormItem>
                  )}
                />

                <div className="bg-teal-50 p-4 rounded-lg">
                  <h4 className="font-medium text-teal-900 mb-2">Requirements:</h4>
                  <ul className="text-sm text-emerald-800 space-y-1">
                    <li>• Valid guide license or driving permit</li>
                    <li>• Minimum 2 years experience</li>
                    <li>• Good English communication skills</li>
                    <li>• Knowledge of Bhutanese culture</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Specializations Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Mountain className="w-5 h-5" />
                Tour Specializations
              </h3>
              <p className="text-sm text-gray-600">
                Select the types of tours you specialize in or are experienced with. Choose multiple options that match your expertise.
              </p>
              
              <FormField
                control={form.control}
                name="specializations"
                render={() => (
                  <FormItem>
                    <FormLabel>Select Your Specializations *</FormLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tourSpecializations.map((specialization) => (
                        <FormField
                          key={specialization.id}
                          control={form.control}
                          name="specializations"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={specialization.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(specialization.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, specialization.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== specialization.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="flex items-center gap-2 text-sm font-medium">
                                    <specialization.icon className="w-4 h-4" />
                                    {specialization.label}
                                  </FormLabel>
                                  <p className="text-xs text-gray-500">
                                    {specialization.description}
                                  </p>
                                </div>
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

            <div className="flex justify-center pt-6">
              <Button 
                type="submit" 
                className="w-full md:w-auto px-8 py-3"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? "Registering..." : "Register Now"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}