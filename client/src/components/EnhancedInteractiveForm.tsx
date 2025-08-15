import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import {
  User, Mail, Phone, MessageSquare, Calendar, Users, MapPin, Send, CheckCircle, 
  Sparkles, Heart, DollarSign, Camera, Car, Home, ChevronDown, ChevronRight,
  Plus, Minus, Upload, Star, Info, CreditCard, Globe, Mountain, ArrowRight,
  Plane, Quote, FileText, UserPlus, Briefcase, Clock
} from "lucide-react";

// Enhanced schema that covers all form types
const enhancedFormSchema = z.object({
  formType: z.enum(["contact", "booking", "custom-tour", "quote", "guide-registration", "hotel-booking", "flight-booking", "get-in-touch", "book-now", "get-quote", "join-team"]),
  
  // Personal Information (required for all forms)
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  country: z.string().optional(),
  
  // Trip/Tour Information
  message: z.string().min(10, "Please provide more details").optional(),
  tourInterest: z.string().optional(),
  preferredDates: z.string().optional(),
  groupSize: z.number().min(1).optional(),
  duration: z.number().optional(),
  budget: z.number().optional(),
  budgetRange: z.string().optional(),
  
  // Preferences & Customizations
  interests: z.array(z.string()).optional(),
  destinations: z.array(z.string()).optional(),
  accommodationType: z.string().optional(),
  transportPreference: z.string().optional(),
  specialRequests: z.string().optional(),
  
  // Professional Information (for guides/drivers)
  registrationType: z.enum(["guide", "driver", "admin", "manager"]).optional(),
  licenseImageUrl: z.string().optional(),
  specializations: z.array(z.string()).optional(),
  experience: z.string().optional(),
  qualifications: z.string().optional(),
  
  // Hotel-specific
  checkInDate: z.string().optional(),
  checkOutDate: z.string().optional(),
  numberOfRooms: z.number().optional(),
  
  // Flight-specific
  departureCity: z.string().optional(),
  arrivalCity: z.string().optional(),
  departureDate: z.string().optional(),
  returnDate: z.string().optional(),
  passengerCount: z.number().optional(),
  flightClass: z.string().optional(),
  
  // Additional Info
  hearAboutUs: z.string().optional(),
  dietaryRestrictions: z.array(z.string()).optional(),
  accessibilityNeeds: z.string().optional(),
  emergencyContact: z.string().optional()
});

type EnhancedFormData = z.infer<typeof enhancedFormSchema>;

interface FormConfig {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  gradient: string;
  sections: FormSection[];
  submitText: string;
  successTitle: string;
  successDescription: string;
}

interface FormSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  description: string;
  required?: boolean;
  fields: FormField[];
}

interface FormField {
  name: keyof EnhancedFormData;
  label: string;
  type: "text" | "email" | "tel" | "number" | "select" | "multiselect" | "checkbox" | "textarea" | "date" | "file";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  gridCols?: number;
}

interface EnhancedInteractiveFormProps {
  formType: "contact" | "booking" | "custom-tour" | "quote" | "guide-registration" | "hotel-booking" | "flight-booking" | "get-in-touch" | "book-now" | "get-quote" | "join-team";
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<EnhancedFormData>;
  onSubmitSuccess?: (data: EnhancedFormData) => void;
}

const FORM_CONFIGS: Record<string, FormConfig> = {
  contact: {
    title: "Connect with Bhutan Experts",
    description: "Experience authentic Bhutan through our local expertise. We're here to craft your perfect journey to the Last Shangri-La.",
    icon: MessageSquare,
    gradient: "bg-brand-gradient",
    submitText: "Send Message",
    successTitle: "Message Sent Successfully!",
    successDescription: "Tashi Delek! Our Bhutan travel experts will respond within 24 hours with personalized recommendations.",
    sections: [
      {
        id: "personal",
        title: "Personal Information",
        icon: User,
        description: "Let us know who you are",
        required: true,
        fields: [
          { name: "firstName", label: "First Name", type: "text", required: true, gridCols: 1 },
          { name: "lastName", label: "Last Name", type: "text", required: true, gridCols: 1 },
          { name: "email", label: "Email Address", type: "email", required: true, gridCols: 1 },
          { name: "phone", label: "Phone Number", type: "tel", placeholder: "+1 (555) 123-4567", gridCols: 1 }
        ]
      },
      {
        id: "inquiry",
        title: "Your Inquiry",
        icon: MessageSquare,
        description: "Tell us how we can help",
        required: true,
        fields: [
          { name: "message", label: "Your Message", type: "textarea", required: true, placeholder: "How can we help you today? Feel free to ask any questions about our services, destinations, or anything else!" }
        ]
      },
      {
        id: "additional",
        title: "Additional Information",
        icon: Info,
        description: "Optional details to help us serve you better",
        fields: [
          { name: "country", label: "Country of Residence", type: "text" },
          { name: "hearAboutUs", label: "How did you hear about us?", type: "select", options: [
            { value: "google", label: "Google Search" },
            { value: "social", label: "Social Media" },
            { value: "friend", label: "Friend Recommendation" },
            { value: "other", label: "Other" }
          ]}
        ]
      }
    ]
  },
  
  booking: {
    title: "Book Now",
    description: "Ready to experience Bhutan? Let's get your journey started!",
    icon: Calendar,
    gradient: "bg-brand-gradient",
    submitText: "Start Booking Process",
    successTitle: "Booking Started Successfully!",
    successDescription: "We'll process your booking request and contact you with next steps within 24 hours.",
    sections: [
      {
        id: "personal",
        title: "Traveler Information",
        icon: User,
        description: "Primary traveler details",
        required: true,
        fields: [
          { name: "firstName", label: "First Name", type: "text", required: true, gridCols: 1 },
          { name: "lastName", label: "Last Name", type: "text", required: true, gridCols: 1 },
          { name: "email", label: "Email Address", type: "email", required: true, gridCols: 1 },
          { name: "phone", label: "Phone Number", type: "tel", required: true, gridCols: 1 }
        ]
      },
      {
        id: "quick-details",
        title: "Quick Trip Details",
        icon: MapPin,
        description: "Essential information to get started",
        required: true,
        fields: [
          { name: "preferredDates", label: "When do you want to travel?", type: "text", placeholder: "e.g., March 2024 or I'm flexible", required: true, gridCols: 1 },
          { name: "groupSize", label: "How many travelers?", type: "number", required: true, gridCols: 1 },
          { name: "duration", label: "How many days?", type: "number", placeholder: "7", gridCols: 1 },
          { name: "budgetRange", label: "Budget per person (USD)", type: "select", options: [
            { value: "flexible", label: "I'm flexible - recommend the best value" },
            { value: "essential", label: "$2,500 - $3,500 (Essential Bhutan)" },
            { value: "comfort", label: "$3,500 - $5,500 (Comfort Plus)" },
            { value: "luxury", label: "$5,500 - $8,000+ (Luxury Experience)" },
            { value: "ultra-luxury", label: "$8,000+ (Ultra-Luxury & Exclusive)" }
          ], gridCols: 1 }
        ]
      }
    ]
  },
  
  "custom-tour": {
    title: "Design Your Bhutan Journey",
    description: "Craft your perfect adventure through the Land of the Thunder Dragon. Our local experts will design a personalized experience based on your interests and dreams.",
    icon: Sparkles,
    gradient: "bg-brand-gradient",
    submitText: "Create My Perfect Journey",
    successTitle: "Your Custom Journey Awaits!",
    successDescription: "Our certified Bhutan specialists will craft a personalized itinerary celebrating Gross National Happiness and contact you within 24 hours.",
    sections: [
      {
        id: "personal",
        title: "Personal Information",
        icon: User,
        description: "Your contact details",
        required: true,
        fields: [
          { name: "firstName", label: "First Name", type: "text", required: true, gridCols: 1 },
          { name: "lastName", label: "Last Name", type: "text", required: true, gridCols: 1 },
          { name: "email", label: "Email Address", type: "email", required: true, gridCols: 1 },
          { name: "phone", label: "Phone Number", type: "tel", gridCols: 1 },
          { name: "country", label: "Country of Residence", type: "text", gridCols: 2 }
        ]
      },
      {
        id: "trip-basics",
        title: "Trip Essentials",
        icon: Calendar,
        description: "Basic trip information",
        required: true,
        fields: [
          { name: "duration", label: "Duration (Days)", type: "number", required: true, gridCols: 1 },
          { name: "groupSize", label: "Group Size", type: "number", required: true, gridCols: 1 },
          { name: "budget", label: "Total Budget (USD)", type: "number", placeholder: "5000", gridCols: 1 },
          { name: "preferredDates", label: "Preferred Travel Dates", type: "text", placeholder: "e.g., March 2024 or flexible", gridCols: 1 }
        ]
      },
      {
        id: "interests",
        title: "Your Interests",
        icon: Heart,
        description: "What excites you most about Bhutan?",
        required: true,
        fields: [
          { name: "interests", label: "What draws you to Bhutan?", type: "checkbox", options: [
            { value: "cultural", label: "🏛️ Cultural Heritage & Dzongs" },
            { value: "trekking", label: "🏔️ Himalayan Trekking" },
            { value: "photography", label: "📸 Photography & Scenic Beauty" },
            { value: "wellness", label: "🧘 Meditation & Wellness Retreats" },
            { value: "festivals", label: "🎭 Traditional Festivals (Tsechus)" },
            { value: "cuisine", label: "🍛 Authentic Bhutanese Cuisine" },
            { value: "crafts", label: "🎨 Traditional Arts & Crafts" },
            { value: "wildlife", label: "🐅 Wildlife & Nature Reserves" },
            { value: "spiritual", label: "🙏 Spiritual Experiences & Monasteries" },
            { value: "luxury", label: "✨ Luxury & Exclusive Experiences" }
          ]},
          { name: "destinations", label: "Which regions interest you most?", type: "checkbox", options: [
            { value: "thimphu", label: "🏙️ Thimphu (Capital & Modern Culture)" },
            { value: "paro", label: "✈️ Paro (Tiger's Nest & Airport Gateway)" },
            { value: "punakha", label: "🏰 Punakha (Ancient Capital & Dzong)" },
            { value: "bumthang", label: "🏔️ Bumthang (Spiritual Heartland)" },
            { value: "haa", label: "🌸 Haa Valley (Hidden Gem)" },
            { value: "trongsa", label: "👑 Trongsa (Ancestral Home of Kings)" },
            { value: "wangdue", label: "🌊 Wangdue (River Valleys)" },
            { value: "eastern", label: "🌺 Eastern Bhutan (Authentic & Remote)" }
          ]}
        ]
      },
      {
        id: "accommodation",
        title: "Accommodation & Transport",
        icon: Home,
        description: "Your comfort preferences",
        fields: [
          { name: "accommodationType", label: "Accommodation Preference", type: "select", options: [
            { value: "homestay", label: "🏡 Traditional Homestays (Authentic Experience)" },
            { value: "standard", label: "🏨 Standard Hotels (Comfortable & Clean)" },
            { value: "boutique", label: "🏛️ Boutique Hotels (Character & Charm)" },
            { value: "luxury", label: "🌟 Luxury Resorts (Premium Comfort)" },
            { value: "heritage", label: "🏰 Heritage Properties (Historical Significance)" },
            { value: "mixed", label: "🎯 Mixed (Variety of Experiences)" }
          ]},
          { name: "transportPreference", label: "Transportation", type: "select", options: [
            { value: "private", label: "Private Vehicle" },
            { value: "shared", label: "Shared Transport" },
            { value: "mixed", label: "Mixed Options" }
          ]},
          { name: "specialRequests", label: "Special Requirements", type: "textarea", placeholder: "Dietary requirements, accessibility needs, or other preferences..." }
        ]
      }
    ]
  },

  quote: {
    title: "Design Your Perfect Journey",
    description: "Tell us your preferences and we'll create a personalized itinerary just for you",
    icon: Sparkles,
    gradient: "bg-brand-gradient",
    submitText: "Submit Custom Tour Request",
    successTitle: "Custom Tour Request Submitted!",
    successDescription: "Our travel experts will create a personalized itinerary and contact you within 24 hours.",
    sections: [
      {
        id: "personal",
        title: "Personal Information",
        icon: User,
        description: "Your contact details",
        required: true,
        fields: [
          { name: "firstName", label: "First Name", type: "text", required: true, gridCols: 1 },
          { name: "lastName", label: "Last Name", type: "text", required: true, gridCols: 1 },
          { name: "email", label: "Email Address", type: "email", required: true, gridCols: 1 },
          { name: "phone", label: "Phone Number", type: "tel", gridCols: 1 },
          { name: "country", label: "Country of Residence", type: "text", gridCols: 2 }
        ]
      },
      {
        id: "trip-basics",
        title: "Trip Essentials",
        icon: Calendar,
        description: "Basic trip information",
        required: true,
        fields: [
          { name: "duration", label: "Duration (Days)", type: "number", required: true, gridCols: 1 },
          { name: "groupSize", label: "Group Size", type: "number", required: true, gridCols: 1 },
          { name: "budget", label: "Total Budget (USD)", type: "number", placeholder: "5000", gridCols: 1 },
          { name: "preferredDates", label: "Preferred Travel Dates", type: "text", placeholder: "e.g., March 2024 or flexible", gridCols: 1 }
        ]
      },
      {
        id: "interests",
        title: "Your Interests",
        icon: Heart,
        description: "What excites you most about Bhutan?",
        required: true,
        fields: [
          { name: "interests", label: "Select Your Interests", type: "checkbox", options: [
            { value: "cultural", label: "Cultural Tours" },
            { value: "trekking", label: "Trekking & Hiking" },
            { value: "photography", label: "Photography" },
            { value: "wellness", label: "Wellness & Meditation" },
            { value: "festivals", label: "Traditional Festivals" },
            { value: "cuisine", label: "Local Cuisine" },
            { value: "crafts", label: "Traditional Crafts" },
            { value: "wildlife", label: "Wildlife & Nature" }
          ]},
          { name: "destinations", label: "Preferred Destinations", type: "checkbox", options: [
            { value: "thimphu", label: "Thimphu" },
            { value: "paro", label: "Paro" },
            { value: "punakha", label: "Punakha" },
            { value: "bumthang", label: "Bumthang" },
            { value: "haa", label: "Haa Valley" },
            { value: "trongsa", label: "Trongsa" }
          ]}
        ]
      },
      {
        id: "accommodation",
        title: "Accommodation & Transport",
        icon: Home,
        description: "Your comfort preferences",
        fields: [
          { name: "accommodationType", label: "Accommodation Type", type: "select", options: [
            { value: "budget", label: "Budget Hotels" },
            { value: "standard", label: "Standard Hotels" },
            { value: "luxury", label: "Luxury Hotels" },
            { value: "heritage", label: "Heritage Properties" }
          ]},
          { name: "transportPreference", label: "Transportation", type: "select", options: [
            { value: "private", label: "Private Vehicle" },
            { value: "shared", label: "Shared Transport" },
            { value: "mixed", label: "Mixed Options" }
          ]},
          { name: "specialRequests", label: "Special Requirements", type: "textarea", placeholder: "Dietary requirements, accessibility needs, or other preferences..." }
        ]
      }
    ]
  },

  "guide-registration": {
    title: "Join Our Team",
    description: "Apply to become a guide or driver with our team",
    icon: UserPlus,
    gradient: "bg-brand-gradient",
    submitText: "Submit Application",
    successTitle: "Application Submitted!",
    successDescription: "Thank you for your interest! We'll review your application and contact you soon.",
    sections: [
      {
        id: "personal",
        title: "Personal Information",
        icon: User,
        description: "Your basic details",
        required: true,
        fields: [
          { name: "firstName", label: "First Name", type: "text", required: true, gridCols: 1 },
          { name: "lastName", label: "Last Name", type: "text", required: true, gridCols: 1 },
          { name: "email", label: "Email Address", type: "email", required: true, gridCols: 1 },
          { name: "phone", label: "Phone Number", type: "tel", required: true, gridCols: 1 }
        ]
      },
      {
        id: "professional",
        title: "Professional Details",
        icon: Briefcase,
        description: "Your qualifications and experience",
        required: true,
        fields: [
          { name: "registrationType", label: "Position Applied For", type: "select", required: true, options: [
            { value: "guide", label: "Tour Guide" },
            { value: "driver", label: "Driver" },
            { value: "admin", label: "Administrative Staff" },
            { value: "manager", label: "Tour Manager" }
          ]},
          { name: "experience", label: "Years of Experience", type: "text", placeholder: "e.g., 5 years in tourism", gridCols: 1 },
          { name: "qualifications", label: "Qualifications", type: "textarea", placeholder: "List your relevant qualifications, certifications, and skills" },
          { name: "specialRequests", label: "Additional Information", type: "textarea", placeholder: "Tell us why you want to join our team and what makes you special" }
        ]
      }
    ]
  },

  "hotel-booking": {
    title: "Book Your Accommodation",
    description: "Find and reserve the perfect hotel for your stay",
    icon: Home,
    gradient: "bg-brand-gradient",
    submitText: "Check Availability",
    successTitle: "Hotel Booking Request Submitted!",
    successDescription: "We'll check availability and confirm your booking within 24 hours.",
    sections: [
      {
        id: "personal",
        title: "Guest Information",
        icon: User,
        description: "Primary guest details",
        required: true,
        fields: [
          { name: "firstName", label: "First Name", type: "text", required: true, gridCols: 1 },
          { name: "lastName", label: "Last Name", type: "text", required: true, gridCols: 1 },
          { name: "email", label: "Email Address", type: "email", required: true, gridCols: 1 },
          { name: "phone", label: "Phone Number", type: "tel", required: true, gridCols: 1 }
        ]
      },
      {
        id: "booking-details",
        title: "Booking Details",
        icon: Calendar,
        description: "When and where you want to stay",
        required: true,
        fields: [
          { name: "checkInDate", label: "Check-in Date", type: "text", placeholder: "e.g., March 15, 2024", required: true, gridCols: 1 },
          { name: "checkOutDate", label: "Check-out Date", type: "text", placeholder: "e.g., March 20, 2024", required: true, gridCols: 1 },
          { name: "numberOfRooms", label: "Number of Rooms", type: "number", required: true, gridCols: 1 },
          { name: "groupSize", label: "Number of Guests", type: "number", required: true, gridCols: 1 }
        ]
      },
      {
        id: "preferences",
        title: "Room Preferences",
        icon: Heart,
        description: "Your accommodation preferences",
        fields: [
          { name: "accommodationType", label: "Hotel Category", type: "select", options: [
            { value: "budget", label: "Budget Hotels" },
            { value: "standard", label: "Standard Hotels" },
            { value: "luxury", label: "Luxury Hotels" },
            { value: "heritage", label: "Heritage Properties" }
          ]},
          { name: "specialRequests", label: "Special Requests", type: "textarea", placeholder: "Room preferences, dietary requirements, accessibility needs, etc." }
        ]
      }
    ]
  },

  "flight-booking": {
    title: "Book Your Flight",
    description: "Reserve your flight to the Land of the Thunder Dragon",
    icon: Plane,
    gradient: "bg-brand-gradient",
    submitText: "Check Flight Availability",
    successTitle: "Flight Booking Request Submitted!",
    successDescription: "We'll check flight availability and send you booking options within 24 hours.",
    sections: [
      {
        id: "personal",
        title: "Passenger Information",
        icon: User,
        description: "Primary passenger details",
        required: true,
        fields: [
          { name: "firstName", label: "First Name", type: "text", required: true, gridCols: 1 },
          { name: "lastName", label: "Last Name", type: "text", required: true, gridCols: 1 },
          { name: "email", label: "Email Address", type: "email", required: true, gridCols: 1 },
          { name: "phone", label: "Phone Number", type: "tel", required: true, gridCols: 1 }
        ]
      },
      {
        id: "flight-details",
        title: "Flight Details",
        icon: Plane,
        description: "Your travel itinerary",
        required: true,
        fields: [
          { name: "departureCity", label: "Departure City", type: "select", required: true, options: [
            { value: "delhi", label: "Delhi (DEL)" },
            { value: "kolkata", label: "Kolkata (CCU)" },
            { value: "kathmandu", label: "Kathmandu (KTM)" },
            { value: "bangkok", label: "Bangkok (BKK)" },
            { value: "singapore", label: "Singapore (SIN)" },
            { value: "mumbai", label: "Mumbai (BOM)" }
          ], gridCols: 1 },
          { name: "arrivalCity", label: "Destination", type: "select", required: true, options: [
            { value: "paro", label: "Paro (PBH) - Bhutan" }
          ], gridCols: 1 },
          { name: "departureDate", label: "Departure Date", type: "text", placeholder: "e.g., March 15, 2024", required: true, gridCols: 1 },
          { name: "returnDate", label: "Return Date", type: "text", placeholder: "e.g., March 25, 2024", gridCols: 1 },
          { name: "passengerCount", label: "Number of Passengers", type: "number", required: true, gridCols: 1 },
          { name: "flightClass", label: "Class of Service", type: "select", options: [
            { value: "economy", label: "Economy Class" },
            { value: "business", label: "Business Class" }
          ], gridCols: 1 }
        ]
      },
      {
        id: "preferences",
        title: "Travel Preferences",
        icon: Heart,
        description: "Additional requirements",
        fields: [
          { name: "specialRequests", label: "Special Requirements", type: "textarea", placeholder: "Meal preferences, wheelchair assistance, seat preferences, etc." }
        ]
      }
    ]
  },

  // Alias forms that map to existing configurations
  "get-in-touch": {
    title: "Get In Touch",
    description: "We'd love to hear from you! Send us a message and we'll respond within 24 hours.",
    icon: MessageSquare,
    gradient: "bg-brand-gradient",
    submitText: "Send Message",
    successTitle: "Message Sent Successfully!",
    successDescription: "Thank you for reaching out. We'll get back to you within 24 hours.",
    sections: [
      {
        id: "personal",
        title: "Personal Information",
        icon: User,
        description: "Let us know who you are",
        required: true,
        fields: [
          { name: "firstName", label: "First Name", type: "text", required: true, gridCols: 1 },
          { name: "lastName", label: "Last Name", type: "text", required: true, gridCols: 1 },
          { name: "email", label: "Email Address", type: "email", required: true, gridCols: 1 },
          { name: "phone", label: "Phone Number", type: "tel", placeholder: "+1 (555) 123-4567", gridCols: 1 }
        ]
      },
      {
        id: "inquiry",
        title: "Your Message",
        icon: MessageSquare,
        description: "Tell us how we can help",
        required: true,
        fields: [
          { name: "message", label: "Your Message", type: "textarea", required: true, placeholder: "How can we help you today? Feel free to ask any questions about our services, destinations, or anything else!" }
        ]
      }
    ]
  },

  "book-now": {
    title: "Book Your Trip Now",
    description: "Ready to experience Bhutan? Let's get your journey started!",
    icon: Calendar,
    gradient: "bg-brand-gradient",
    submitText: "Start Booking Process",
    successTitle: "Booking Started Successfully!",
    successDescription: "We'll process your booking request and contact you with next steps within 24 hours.",
    sections: [
      {
        id: "personal",
        title: "Traveler Information",
        icon: User,
        description: "Primary traveler details",
        required: true,
        fields: [
          { name: "firstName", label: "First Name", type: "text", required: true, gridCols: 1 },
          { name: "lastName", label: "Last Name", type: "text", required: true, gridCols: 1 },
          { name: "email", label: "Email Address", type: "email", required: true, gridCols: 1 },
          { name: "phone", label: "Phone Number", type: "tel", required: true, gridCols: 1 }
        ]
      },
      {
        id: "quick-details",
        title: "Quick Trip Details",
        icon: MapPin,
        description: "Essential information to get started",
        required: true,
        fields: [
          { name: "preferredDates", label: "When do you want to travel?", type: "text", placeholder: "e.g., March 2024 or I'm flexible", required: true, gridCols: 1 },
          { name: "groupSize", label: "How many travelers?", type: "number", required: true, gridCols: 1 },
          { name: "duration", label: "How many days?", type: "number", placeholder: "7", gridCols: 1 },
          { name: "budgetRange", label: "Budget per person", type: "select", options: [
            { value: "flexible", label: "I'm flexible - advise me" },
            { value: "budget", label: "$2,000 - $3,500" },
            { value: "mid-range", label: "$3,500 - $5,000" },
            { value: "luxury", label: "$5,000 - $8,000+" }
          ], gridCols: 1 }
        ]
      }
    ]
  },

  "get-quote": {
    title: "Get Your Personalized Quote",
    description: "Tell us about your dream trip and we'll create a custom quote for you",
    icon: Quote,
    gradient: "bg-brand-gradient",
    submitText: "Get My Quote",
    successTitle: "Quote Request Received!",
    successDescription: "We'll prepare your personalized quote and send it to you within 24 hours.",
    sections: [
      {
        id: "personal",
        title: "Contact Information",
        icon: User,
        description: "Where to send your quote",
        required: true,
        fields: [
          { name: "firstName", label: "First Name", type: "text", required: true, gridCols: 1 },
          { name: "lastName", label: "Last Name", type: "text", required: true, gridCols: 1 },
          { name: "email", label: "Email Address", type: "email", required: true, gridCols: 1 },
          { name: "phone", label: "Phone Number", type: "tel", gridCols: 1 }
        ]
      },
      {
        id: "trip-overview",
        title: "Trip Overview",
        icon: MapPin,
        description: "Basic trip requirements",
        required: true,
        fields: [
          { name: "preferredDates", label: "Travel Dates", type: "text", placeholder: "e.g., March 15-25, 2024 or flexible", gridCols: 1 },
          { name: "groupSize", label: "Number of Travelers", type: "number", required: true, gridCols: 1 },
          { name: "duration", label: "Trip Duration (days)", type: "number", required: true, gridCols: 1 },
          { name: "budgetRange", label: "Preferred Budget Range", type: "select", options: [
            { value: "advice", label: "I'd like your advice" },
            { value: "economy", label: "$1,500 - $2,500 per person" },
            { value: "standard", label: "$2,500 - $4,000 per person" },
            { value: "premium", label: "$4,000 - $6,000 per person" },
            { value: "luxury", label: "$6,000+ per person" }
          ], gridCols: 1 }
        ]
      },
      {
        id: "preferences",
        title: "Your Preferences",
        icon: Heart,
        description: "Help us personalize your quote",
        fields: [
          { name: "tourInterest", label: "Main Interests", type: "checkbox", options: [
            { value: "cultural", label: "Cultural Tours" },
            { value: "adventure", label: "Adventure & Trekking" },
            { value: "spiritual", label: "Spiritual Journey" },
            { value: "photography", label: "Photography" },
            { value: "festivals", label: "Festivals" },
            { value: "nature", label: "Nature & Wildlife" }
          ]},
          { name: "specialRequests", label: "Special Requirements", type: "textarea", placeholder: "Any specific requests, dietary needs, accessibility requirements, or preferences?" }
        ]
      }
    ]
  },

  "join-team": {
    title: "Join Our Amazing Team",
    description: "Be part of sharing Bhutan's magic with the world. Apply for a position with us!",
    icon: UserPlus,
    gradient: "bg-brand-gradient",
    submitText: "Submit Application",
    successTitle: "Application Submitted Successfully!",
    successDescription: "Thank you for your interest in joining our team! We'll review your application and get back to you soon.",
    sections: [
      {
        id: "personal",
        title: "Personal Information",
        icon: User,
        description: "Tell us about yourself",
        required: true,
        fields: [
          { name: "firstName", label: "First Name", type: "text", required: true, gridCols: 1 },
          { name: "lastName", label: "Last Name", type: "text", required: true, gridCols: 1 },
          { name: "email", label: "Email Address", type: "email", required: true, gridCols: 1 },
          { name: "phone", label: "Phone Number", type: "tel", required: true, gridCols: 1 },
          { name: "country", label: "Country of Residence", type: "text", gridCols: 2 }
        ]
      },
      {
        id: "position",
        title: "Position & Experience",
        icon: Briefcase,
        description: "What role interests you?",
        required: true,
        fields: [
          { name: "registrationType", label: "Position of Interest", type: "select", required: true, options: [
            { value: "guide", label: "Tour Guide" },
            { value: "driver", label: "Driver/Guide" },
            { value: "admin", label: "Administrative Role" },
            { value: "manager", label: "Management Position" }
          ]},
          { name: "experience", label: "Relevant Experience", type: "textarea", placeholder: "Tell us about your experience in tourism, hospitality, or related fields", required: true },
          { name: "qualifications", label: "Skills & Qualifications", type: "textarea", placeholder: "Languages spoken, certifications, special skills, etc." }
        ]
      },
      {
        id: "motivation",
        title: "Why Join Us?",
        icon: Heart,
        description: "Tell us about your motivation",
        fields: [
          { name: "message", label: "Why do you want to work with us?", type: "textarea", placeholder: "Share your passion for Bhutan, tourism, or what excites you about this opportunity" }
        ]
      }
    ]
  }
};

export default function EnhancedInteractiveForm({
  formType, 
  isOpen, 
  onClose, 
  initialData = {},
  onSubmitSuccess 
}: EnhancedInteractiveFormProps) {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['personal']));
  const [currentStep, setCurrentStep] = useState(0);
  
  const config = FORM_CONFIGS[formType];
  const totalSteps = config.sections.length;
  
  const form = useForm<EnhancedFormData>({
    resolver: zodResolver(enhancedFormSchema),
    defaultValues: {
      formType,
      groupSize: 2,
      numberOfRooms: 1,
      duration: 7,
      interests: [],
      destinations: [],
      dietaryRestrictions: [],
      specializations: [],
      ...initialData
    }
  });

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const onSubmit = async (data: EnhancedFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      
      toast({
        title: config.successTitle,
        description: config.successDescription,
        duration: 5000,
      });

      if (onSubmitSuccess) {
        onSubmitSuccess(data);
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  const renderField = (field: FormField, section: FormSection) => {
    const gridClass = field.gridCols === 2 ? "md:col-span-2" : "md:col-span-1";

    switch (field.type) {
      case "text":
      case "email":
      case "tel":
      case "number":
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className={gridClass}>
                <FormLabel className="flex items-center gap-2">
                  {field.name === "email" && <Mail className="w-4 h-4" />}
                  {field.name === "phone" && <Phone className="w-4 h-4" />}
                  {field.name === "firstName" && <User className="w-4 h-4" />}
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </FormLabel>
                <FormControl>
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="transition-all duration-200 focus:ring-2 focus:ring-brand-primary"
                    {...formField}
                    onChange={(e) => {
                      const value = field.type === "number" ? parseInt(e.target.value) || 0 : e.target.value;
                      formField.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "select":
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className={gridClass}>
                <FormLabel>{field.label}</FormLabel>
                <Select onValueChange={formField.onChange} defaultValue={formField.value}>
                  <FormControl>
                    <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-brand-primary">
                      <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {field.options?.map((option) => (
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
        );

      case "checkbox":
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={() => (
              <FormItem className="md:col-span-2">
                <FormLabel className="text-base">{field.label}</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {field.options?.map((option) => (
                    <FormField
                      key={option.value}
                      control={form.control}
                      name={field.name}
                      render={({ field: formField }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={(formField.value as string[])?.includes(option.value)}
                              onCheckedChange={(checked) => {
                                const currentValue = formField.value as string[] || [];
                                const newValue = checked
                                  ? [...currentValue, option.value]
                                  : currentValue.filter((v) => v !== option.value);
                                formField.onChange(newValue);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "textarea":
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={field.placeholder}
                    rows={4}
                    className="transition-all duration-200 focus:ring-2 focus:ring-brand-primary resize-none"
                    {...formField}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      default:
        return null;
    }
  };

  const SuccessScreen = () => (
    <div className="brand-card max-w-2xl mx-auto p-8 text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce mb-6">
        <CheckCircle className="w-10 h-10 text-emerald-600" />
      </div>
      <div className="space-y-4">
        <h3 className="text-3xl font-bold brand-heading">{config.successTitle}</h3>
        <p className="text-lg brand-body leading-relaxed">{config.successDescription}</p>
        <div className="flex gap-3 justify-center pt-4">
          <Button onClick={() => setIsSubmitted(false)} className="btn-brand-outline">
            Submit Another Request
          </Button>
          <Button onClick={onClose} className="btn-brand-primary">
            Close
          </Button>
        </div>
      </div>
    </div>
  );

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <SuccessScreen />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <DialogHeader>
          <div className={`${config.gradient} p-6 -m-6 mb-6 text-white rounded-t-lg`}>
            <div className="flex items-center gap-3 mb-3">
              <config.icon className="w-8 h-8" />
              <DialogTitle className="text-2xl font-bold">{config.title}</DialogTitle>
            </div>
            <DialogDescription className="text-white/90 text-base">
              {config.description}
            </DialogDescription>
          </div>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Progress: {Math.round((currentStep + 1) / totalSteps * 100)}%
            </span>
            <span className="text-sm text-gray-500">
              Step {currentStep + 1} of {totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-brand-primary to-brand-secondary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {config.sections.map((section, index) => (
              <Collapsible
                key={section.id}
                open={expandedSections.has(section.id)}
                onOpenChange={() => toggleSection(section.id)}
              >
                <CollapsibleTrigger asChild>
                  <div className={`brand-form-section cursor-pointer transition-all duration-200 hover:shadow-md border-2 rounded-xl p-4 ${
                    expandedSections.has(section.id) ? 'border-brand-primary bg-brand-emerald-50' : 'border-brand-border hover:border-brand-primary/40'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                          expandedSections.has(section.id) ? 'bg-brand-primary text-white' : 'bg-brand-text-muted text-white'
                        }`}>
                          <section.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-brand-text flex items-center gap-2">
                            {section.title}
                            {section.required && <span className="text-brand-accent text-xs">*</span>}
                          </h4>
                          <p className="text-xs text-brand-text-muted">{section.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {expandedSections.has(section.id) ? (
                          <ChevronDown className="w-4 h-4 text-brand-primary transition-transform duration-200" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-brand-text-muted transition-transform duration-200" />
                        )}
                      </div>
                    </div>
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="space-y-4 animate-in slide-in-from-top-1 duration-200">
                  <div className="grid md:grid-cols-2 gap-4 pt-4 px-2">
                    {section.fields.map((field) => renderField(field, section))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}

            {/* Submit Button */}
            <div className="text-center space-y-4 pt-8 border-t">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="btn-brand-primary px-12 py-3 text-lg font-semibold transform transition-all duration-200 hover:scale-105 disabled:scale-100"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    {config.submitText}
                  </>
                )}
              </Button>
              
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                <Sparkles className="w-4 h-4" />
                <span>We'll respond within 24 hours. Your information is secure and confidential.</span>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
