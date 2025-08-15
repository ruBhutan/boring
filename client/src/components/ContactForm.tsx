import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { insertInquirySchema } from "@shared/schema";
import { useInquiry } from "@/hooks/use-inquiry";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { User, Mail, Phone, MessageSquare, Calendar, Users, MapPin, Send, CheckCircle, Sparkles, Heart, ChevronDown, ChevronRight, Info, Globe } from "lucide-react";

interface ContactFormProps {
  formType: "inquiry" | "booking";
}

const contactFormSchema = insertInquirySchema.extend({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm({ formType }: ContactFormProps) {
  const { createInquiry } = useInquiry();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      tourInterest: "",
      preferredDates: "",
      groupSize: ""
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await createInquiry.mutateAsync(data);
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Message Sent Successfully! 🎉",
        description: "We'll get back to you within 24 hours.",
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
      console.error("Form submission failed:", error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="brand-card max-w-2xl mx-auto p-8">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto shadow-lg animate-pulse">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <div className="space-y-3">
            <h3 className="text-3xl font-bold text-slate-900">Thank You!</h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              {formType === "inquiry" 
                ? "Your message has been sent successfully. We'll respond within 24 hours!"
                : "We're excited to help plan your Bhutan adventure. Our team will contact you soon with a personalized proposal!"
              }
            </p>
          </div>
          <Button onClick={() => setIsSubmitted(false)} className="brand-btn-outline">
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="brand-card-gradient max-w-4xl mx-auto overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-indigo-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          {formType === "inquiry" ? (
            <MessageSquare className="w-8 h-8" />
          ) : (
            <Heart className="w-8 h-8" />
          )}
          <h3 className="text-2xl font-bold">
            {formType === "inquiry" ? "Send Us a Message" : "Plan Your Dream Adventure"}
          </h3>
        </div>
        <p className="text-emerald-100">
          {formType === "inquiry" 
            ? "We'd love to hear from you! Get in touch with any questions or feedback."
            : "Tell us about your dream Bhutan experience and we'll create the perfect itinerary for you."
          }
        </p>
      </div>

      {/* Form Section */}
      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Personal Information Section */}
            <div className="brand-form-section">
              <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-600" />
                Personal Information
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        First Name *
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your first name" 
                          className="transition-all duration-200 focus:ring-2 focus:ring-emerald-500"
                          {...field} 
                        />
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
                        <Input 
                          placeholder="Your last name"
                          className="transition-all duration-200 focus:ring-2 focus:ring-emerald-500"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
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
                        <Input 
                          type="email"
                          placeholder="your@email.com"
                          className="transition-all duration-200 focus:ring-2 focus:ring-emerald-500"
                          {...field} 
                        />
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
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="+1 (555) 123-4567"
                          className="transition-all duration-200 focus:ring-2 focus:ring-emerald-500"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Trip Planning Section (for booking type) */}
            {formType === "booking" && (
              <div className="brand-form-section">
                <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  Trip Planning
                </h4>
                
                <FormField
                  control={form.control}
                  name="tourInterest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tour Interest</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-emerald-500">
                            <SelectValue placeholder="Select a tour type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Cultural Immersion">Cultural Immersion</SelectItem>
                          <SelectItem value="Himalayan Trek">Himalayan Trek</SelectItem>
                          <SelectItem value="Spiritual Journey">Spiritual Journey</SelectItem>
                          <SelectItem value="Photography Tour">Photography Tour</SelectItem>
                          <SelectItem value="Wellness & Happiness">Wellness & Happiness</SelectItem>
                          <SelectItem value="Custom Experience">Custom Experience</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="preferredDates"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Preferred Dates
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., March 2024"
                            className="transition-all duration-200 focus:ring-2 focus:ring-emerald-500"
                            {...field} 
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
                          Group Size
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-emerald-500">
                              <SelectValue placeholder="Select group size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1 person">1 person</SelectItem>
                            <SelectItem value="2 people">2 people</SelectItem>
                            <SelectItem value="3-5 people">3-5 people</SelectItem>
                            <SelectItem value="6-10 people">6-10 people</SelectItem>
                            <SelectItem value="10+ people">10+ people</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {/* Message Section */}
            <div className="brand-form-section">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      {formType === "inquiry" ? "Your Message *" : "Tell us about your dream adventure *"}
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        rows={5}
                        placeholder={
                          formType === "inquiry"
                            ? "How can we help you today? Feel free to ask any questions about our services, destinations, or anything else!"
                            : "What draws you to Bhutan? Any specific interests, activities, or requirements you'd like us to include in your itinerary?"
                        }
                        className="transition-all duration-200 focus:ring-2 focus:ring-emerald-500 resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center space-y-4">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="btn-brand-primary px-8 py-3 text-lg font-semibold transform transition-all duration-200 hover:scale-105 disabled:scale-100"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    {formType === "inquiry" ? "Send Message" : "Start Planning My Journey"}
                  </>
                )}
              </Button>
              
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                <Sparkles className="w-4 h-4" />
                <span>We'll respond within 24 hours. For urgent matters, please call us directly.</span>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
