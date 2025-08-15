// server/index.ts
import express2 from "express";

// shared/schema.ts
import { z } from "zod";
var insertUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});
var insertTourSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  duration: z.number().int().positive(),
  price: z.number().int().positive(),
  category: z.string().min(1),
  imageUrl: z.string().url(),
  rating: z.number().optional(),
  reviewCount: z.number().int().nonnegative().optional(),
  highlights: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
  maxGroupSize: z.number().int().positive().optional(),
  difficulty: z.string().optional(),
  bestSeason: z.string().optional(),
  includes: z.array(z.string()).optional(),
  excludes: z.array(z.string()).optional(),
  tourOperatorId: z.number().int().positive().optional()
});
var insertTourOperatorSchema = z.object({
  name: z.string().min(1),
  website: z.string().min(1),
  description: z.string().min(1),
  bestFeature: z.string().min(1),
  specialties: z.array(z.string()).optional(),
  rating: z.number().optional(),
  reviewCount: z.number().int().nonnegative().optional(),
  logoUrl: z.string().url().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  isActive: z.boolean().optional(),
  establishedYear: z.number().int().optional(),
  certifications: z.array(z.string()).optional(),
  awards: z.array(z.string()).optional()
});
var insertBookingSchema = z.object({
  tourId: z.number().int().positive(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  travelDate: z.string().min(1),
  groupSize: z.number().int().positive(),
  specialRequests: z.string().optional()
});
var insertInquirySchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  tourInterest: z.string().optional(),
  preferredDates: z.string().optional(),
  groupSize: z.string().optional(),
  message: z.string().optional()
});
var insertTestimonialSchema = z.object({
  name: z.string().min(1),
  country: z.string().min(1),
  imageUrl: z.string().url(),
  text: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  tripName: z.string().min(1),
  duration: z.string().min(1),
  isActive: z.boolean().optional()
});
var insertBlogPostSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  imageUrl: z.string().url(),
  category: z.string().min(1),
  author: z.string().min(1),
  authorImage: z.string().url(),
  readTime: z.string().min(1),
  isPublished: z.boolean().optional()
});
var insertGuideSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  licenseImageUrl: z.string().url(),
  registrationType: z.enum(["guide", "driver"]),
  specializations: z.array(z.string()).optional()
});
var insertItinerarySchema = z.object({
  tourId: z.number().int().positive(),
  name: z.string().min(1),
  description: z.string().optional(),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()),
  guideId: z.number().int().positive().optional(),
  driverId: z.number().int().positive().optional(),
  maxParticipants: z.number().int().positive().optional()
});
var insertItineraryDaySchema = z.object({
  itineraryId: z.number().int().positive(),
  dayNumber: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string().min(1),
  activities: z.array(z.string()).optional(),
  accommodation: z.string().optional(),
  meals: z.array(z.string()).optional(),
  transportation: z.string().optional(),
  notes: z.string().optional()
});
var insertCustomTourRequestSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  duration: z.number().int().positive(),
  groupSize: z.number().int().positive(),
  budget: z.number().int().positive().optional(),
  interests: z.array(z.string()).optional(),
  preferredDates: z.string().optional(),
  specialRequirements: z.string().optional(),
  destinations: z.array(z.string()).optional(),
  accommodationType: z.enum(["luxury", "standard", "budget"]).optional(),
  transportPreference: z.enum(["private", "shared", "mixed"]).optional()
});
var insertFestivalSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()),
  imageUrl: z.string().url(),
  category: z.enum(["religious", "cultural", "seasonal"]),
  highlights: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
  ticketPrice: z.number().int().nonnegative().optional(),
  maxCapacity: z.number().int().positive().optional()
});
var insertFestivalBookingSchema = z.object({
  festivalId: z.number().int().positive(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  numberOfTickets: z.number().int().positive(),
  totalAmount: z.number().int().nonnegative(),
  specialRequests: z.string().optional()
});
var insertHotelSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  address: z.string().min(1),
  imageUrl: z.string().url(),
  images: z.array(z.string().url()).optional(),
  category: z.enum(["luxury", "boutique", "heritage", "eco-lodge"]),
  starRating: z.number().int().min(1).max(5),
  amenities: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  pricePerNight: z.number().int().positive(),
  isActive: z.boolean().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  website: z.string().url().optional(),
  checkInTime: z.string().optional(),
  checkOutTime: z.string().optional(),
  cancellationPolicy: z.string().optional()
});
var insertHotelRoomSchema = z.object({
  hotelId: z.number().int().positive(),
  roomType: z.enum(["standard", "deluxe", "suite", "presidential"]),
  roomName: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().url(),
  images: z.array(z.string().url()).optional(),
  maxOccupancy: z.number().int().positive(),
  bedType: z.enum(["single", "double", "twin", "king", "queen"]),
  roomSize: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  pricePerNight: z.number().int().positive(),
  totalRooms: z.number().int().positive(),
  isActive: z.boolean().optional()
});
var insertHotelBookingSchema = z.object({
  hotelId: z.number().int().positive(),
  roomId: z.number().int().positive(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  checkInDate: z.string().or(z.date()),
  checkOutDate: z.string().or(z.date()),
  numberOfRooms: z.number().int().positive(),
  numberOfGuests: z.number().int().positive(),
  totalAmount: z.number().int().nonnegative(),
  specialRequests: z.string().optional()
});
var insertUserAccountSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
  role: z.enum(["tourist", "guide", "driver", "admin"]),
  profileImage: z.string().url().optional()
});
var insertUserFeedbackSchema = z.object({
  userId: z.number().int().positive(),
  itineraryId: z.number().int().positive().optional(),
  tourId: z.number().int().positive().optional(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
  category: z.enum(["tour", "guide", "driver", "accommodation", "overall"]),
  isPublic: z.boolean().optional()
});

// server/routes.ts
import { createServer } from "http";
import { z as z2 } from "zod";

// server/db.ts
import { PrismaClient } from "@prisma/client";
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var prisma = globalThis.__prisma || new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
});
if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma;
}
var db = prisma;
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

// server/enhanced-tours.ts
var enhancedToursData = [
  // Luxury Tours (inspired by Scott Dunn, Abercrombie & Kent)
  {
    name: "Royal Bhutan Private Experience",
    description: "Exclusive private tour with seamless visa processing and luxury accommodations. Experience Bhutan like royalty with private guides, premium vehicles, and access to exclusive venues.",
    duration: 10,
    price: 7500,
    category: "Luxury",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    reviewCount: 156,
    highlights: [
      "Seamless visa processing",
      "Private luxury vehicles",
      "Exclusive venue access",
      "Personal butler service",
      "Royal palace visits"
    ],
    maxGroupSize: 4,
    difficulty: "Easy",
    bestSeason: "Year-round",
    includes: [
      "Visa processing assistance",
      "Luxury accommodation",
      "Private guide and driver",
      "All meals at premium restaurants",
      "Exclusive experiences"
    ],
    excludes: [
      "International flights",
      "Personal shopping",
      "Spa treatments",
      "Alcoholic beverages"
    ]
  },
  {
    name: "Ultimate Luxury Bhutan",
    description: "The pinnacle of luxury travel in Bhutan with five-star accommodations, private helicopter transfers, exclusive dining experiences, and personalized service throughout.",
    duration: 14,
    price: 12e3,
    category: "Luxury",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 5,
    reviewCount: 89,
    highlights: [
      "Five-star luxury accommodations",
      "Private helicopter transfers",
      "Exclusive dining experiences",
      "Personal butler service",
      "VIP access to all attractions"
    ],
    maxGroupSize: 4,
    difficulty: "Easy",
    bestSeason: "Year-round",
    includes: [
      "Luxury hotel accommodations",
      "Private helicopter transfers",
      "Exclusive dining experiences",
      "Personal butler and guide",
      "All premium experiences"
    ],
    excludes: [
      "International flights",
      "Personal shopping",
      "Spa treatments",
      "Alcoholic beverages"
    ]
  },
  // Adventure Tours (inspired by Intrepid Travel)
  {
    name: "Jomolhari Base Camp Trek",
    description: "Challenging trek to the base camp of Jomolhari, one of Bhutan's most sacred mountains. Experience high-altitude trekking, pristine wilderness, and spectacular mountain views.",
    duration: 16,
    price: 5800,
    category: "Adventure",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    reviewCount: 92,
    highlights: [
      "High-altitude trekking",
      "Sacred mountain views",
      "Wilderness camping",
      "Local yak herder interaction",
      "Mountain photography"
    ],
    maxGroupSize: 8,
    difficulty: "Challenging",
    bestSeason: "Spring & Autumn",
    includes: [
      "Trekking permits",
      "Camping equipment",
      "Experienced trekking guide",
      "All meals during trek",
      "Emergency support"
    ],
    excludes: [
      "Personal trekking gear",
      "International flights",
      "Travel insurance",
      "Emergency evacuation"
    ]
  },
  {
    name: "Cycling Through Bhutan",
    description: "Explore Bhutan's scenic landscapes on two wheels. Cycle through valleys, over mountain passes, and along ancient trade routes with support vehicles and expert guides.",
    duration: 12,
    price: 4200,
    category: "Cycling",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.6,
    reviewCount: 92,
    highlights: [
      "Scenic cycling routes",
      "Mountain pass crossings",
      "Ancient trade routes",
      "Support vehicle backup",
      "Cultural village stops"
    ],
    maxGroupSize: 8,
    difficulty: "Moderate",
    bestSeason: "Spring & Autumn",
    includes: [
      "Quality mountain bikes",
      "Support vehicle",
      "Cycling guide",
      "Accommodation along route",
      "Meals and snacks"
    ],
    excludes: [
      "Personal cycling gear",
      "International flights",
      "Travel insurance",
      "Bike rental deposit"
    ]
  },
  // Cultural Tours (inspired by local Bhutan operators)
  {
    name: "Cultural Heritage Discovery",
    description: "Deep dive into Bhutan's rich cultural heritage through traditional arts, crafts, music, and dance. Learn from master artisans and participate in cultural preservation.",
    duration: 9,
    price: 3800,
    category: "Cultural",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviewCount: 123,
    highlights: [
      "Traditional arts workshops",
      "Master artisan meetings",
      "Cultural performances",
      "Heritage site visits",
      "Craft preservation"
    ],
    maxGroupSize: 10,
    difficulty: "Easy",
    bestSeason: "Year-round",
    includes: [
      "Cultural workshops",
      "Master artisan access",
      "Performance tickets",
      "Heritage site fees",
      "Cultural guide"
    ],
    excludes: [
      "International flights",
      "Personal purchases",
      "Travel insurance",
      "Optional activities"
    ]
  },
  {
    name: "Cultural Immersion & Homestay",
    description: "Authentic cultural immersion through homestays with local families, traditional activities, and deep connection with Bhutanese way of life.",
    duration: 8,
    price: 2800,
    category: "Cultural",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviewCount: 145,
    highlights: [
      "Local family homestays",
      "Traditional activities",
      "Cultural immersion",
      "Authentic experiences",
      "Local cuisine"
    ],
    maxGroupSize: 8,
    difficulty: "Easy",
    bestSeason: "Year-round",
    includes: [
      "Homestay accommodations",
      "Traditional meals",
      "Cultural activities",
      "Local guide",
      "Cultural workshops"
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ]
  },
  // Festival Tours (inspired by local Bhutan operators)
  {
    name: "Festival & Culture Adventure",
    description: "Immerse yourself in Bhutan's vibrant festivals and rich cultural heritage. Experience traditional dances, colorful costumes, and ancient rituals in authentic settings.",
    duration: 11,
    price: 3800,
    category: "Festival",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviewCount: 145,
    highlights: [
      "Traditional festival participation",
      "Cultural dance performances",
      "Ancient ritual witnessing",
      "Local artisan workshops",
      "Traditional costume experience"
    ],
    maxGroupSize: 12,
    difficulty: "Easy",
    bestSeason: "Spring & Autumn",
    includes: [
      "Festival entrance fees",
      "Cultural guide",
      "Traditional accommodations",
      "Local cuisine experiences",
      "Cultural workshops"
    ],
    excludes: [
      "International flights",
      "Personal shopping",
      "Travel insurance",
      "Optional activities"
    ]
  },
  {
    name: "Luxury Festival Experience",
    description: "Premium festival experience with VIP access, exclusive viewing positions, and luxury accommodations during Bhutan's most important cultural celebrations.",
    duration: 7,
    price: 6800,
    category: "Festival",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    reviewCount: 89,
    highlights: [
      "VIP festival access",
      "Exclusive viewing positions",
      "Luxury accommodations",
      "Cultural performances",
      "Traditional ceremonies"
    ],
    maxGroupSize: 6,
    difficulty: "Easy",
    bestSeason: "Spring & Autumn",
    includes: [
      "VIP festival access",
      "Luxury accommodations",
      "Exclusive viewing",
      "Cultural guide",
      "Traditional meals"
    ],
    excludes: [
      "International flights",
      "Personal shopping",
      "Travel insurance",
      "Optional activities"
    ]
  },
  // Spiritual Tours (inspired by Bhutan Peaceful Tour)
  {
    name: "Mindfulness & Meditation Retreat",
    description: "Deep spiritual journey focusing on Buddhist meditation practices, mindfulness training, and inner peace cultivation. Perfect for those seeking spiritual growth and mental clarity.",
    duration: 14,
    price: 4800,
    category: "Spiritual",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    reviewCount: 178,
    highlights: [
      "Daily meditation sessions",
      "Buddhist philosophy classes",
      "Mindfulness workshops",
      "Silent retreat periods",
      "Spiritual counseling"
    ],
    maxGroupSize: 10,
    difficulty: "Easy",
    bestSeason: "Spring & Autumn",
    includes: [
      "Monastery accommodation",
      "Vegetarian meals",
      "Meditation materials",
      "Spiritual guide",
      "Certificate of completion"
    ],
    excludes: [
      "International flights",
      "Personal meditation items",
      "Donations to monasteries",
      "Travel insurance"
    ]
  },
  {
    name: "Pilgrimage to Sacred Sites",
    description: "Spiritual journey to Bhutan's most sacred Buddhist sites, including remote monasteries, ancient temples, and power places where pilgrims have sought blessings for centuries.",
    duration: 11,
    price: 3800,
    category: "Pilgrimage",
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    reviewCount: 145,
    highlights: [
      "Sacred site visits",
      "Traditional ceremonies",
      "Monk blessings",
      "Prayer flag ceremonies",
      "Spiritual teachings"
    ],
    maxGroupSize: 10,
    difficulty: "Easy",
    bestSeason: "Spring & Autumn",
    includes: [
      "Sacred site access",
      "Ceremony participation",
      "Spiritual guide",
      "Traditional accommodations",
      "Blessed artifacts"
    ],
    excludes: [
      "International flights",
      "Personal offerings",
      "Travel insurance",
      "Photography fees"
    ]
  },
  // Photography Tours (inspired by global operators)
  {
    name: "Photography Expedition",
    description: "Capture Bhutan's stunning landscapes, vibrant culture, and spiritual essence through the lens. Expert photography guidance and access to exclusive shooting locations.",
    duration: 12,
    price: 5200,
    category: "Photography",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviewCount: 98,
    highlights: [
      "Expert photography guidance",
      "Exclusive shooting locations",
      "Golden hour sessions",
      "Cultural portrait opportunities",
      "Landscape photography workshops"
    ],
    maxGroupSize: 8,
    difficulty: "Easy",
    bestSeason: "Spring & Autumn",
    includes: [
      "Professional photography guide",
      "Exclusive location access",
      "Equipment recommendations",
      "Post-processing workshops",
      "Portfolio review sessions"
    ],
    excludes: [
      "Photography equipment",
      "International flights",
      "Travel insurance",
      "Printing services"
    ]
  },
  {
    name: "Luxury Photography Workshop",
    description: "Premium photography workshop with world-class instructors, exclusive access to Bhutan's most photogenic locations, and luxury accommodations throughout the journey.",
    duration: 10,
    price: 6800,
    category: "Photography",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    reviewCount: 67,
    highlights: [
      "World-class instructors",
      "Exclusive location access",
      "Luxury accommodations",
      "Advanced techniques",
      "Portfolio development"
    ],
    maxGroupSize: 6,
    difficulty: "Easy",
    bestSeason: "Spring & Autumn",
    includes: [
      "Expert photography instruction",
      "Luxury accommodations",
      "Exclusive location access",
      "Equipment recommendations",
      "Portfolio review"
    ],
    excludes: [
      "Photography equipment",
      "International flights",
      "Travel insurance",
      "Printing services"
    ]
  },
  // Wellness Tours (inspired by global luxury operators)
  {
    name: "Wellness & Healing Retreat",
    description: "Comprehensive wellness journey combining traditional Bhutanese healing practices, yoga, meditation, and natural therapies in serene mountain settings.",
    duration: 10,
    price: 4200,
    category: "Wellness",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviewCount: 156,
    highlights: [
      "Traditional healing practices",
      "Yoga and meditation sessions",
      "Natural therapy treatments",
      "Wellness consultations",
      "Serene mountain settings"
    ],
    maxGroupSize: 10,
    difficulty: "Easy",
    bestSeason: "Year-round",
    includes: [
      "Wellness center accommodation",
      "Healing sessions",
      "Yoga and meditation classes",
      "Natural therapy treatments",
      "Wellness consultation"
    ],
    excludes: [
      "International flights",
      "Personal wellness items",
      "Travel insurance",
      "Additional treatments"
    ]
  },
  {
    name: "Luxury Spa & Wellness",
    description: "Ultimate relaxation and rejuvenation experience combining traditional Bhutanese healing with modern spa treatments in luxurious mountain settings.",
    duration: 7,
    price: 5800,
    category: "Wellness",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    reviewCount: 98,
    highlights: [
      "Traditional healing treatments",
      "Modern spa therapies",
      "Luxury accommodations",
      "Mountain wellness",
      "Personal wellness consultation"
    ],
    maxGroupSize: 6,
    difficulty: "Easy",
    bestSeason: "Year-round",
    includes: [
      "Luxury spa accommodation",
      "Healing treatments",
      "Wellness consultation",
      "Mountain activities",
      "Gourmet wellness cuisine"
    ],
    excludes: [
      "International flights",
      "Additional treatments",
      "Travel insurance",
      "Personal wellness items"
    ]
  },
  // Special Interest Tours
  {
    name: "Bird Watching Paradise",
    description: "Discover Bhutan's rich avian diversity with expert ornithologists. Visit prime birding locations and spot rare Himalayan species in their natural habitats.",
    duration: 8,
    price: 3800,
    category: "Bird Watching",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    reviewCount: 78,
    highlights: [
      "Expert ornithologist guide",
      "Prime birding locations",
      "Rare species spotting",
      "Bird photography opportunities",
      "Conservation education"
    ],
    maxGroupSize: 6,
    difficulty: "Easy",
    bestSeason: "Spring & Autumn",
    includes: [
      "Expert birding guide",
      "Birding equipment",
      "Prime location access",
      "Conservation education",
      "Bird photography guidance"
    ],
    excludes: [
      "Personal binoculars",
      "International flights",
      "Travel insurance",
      "Photography equipment"
    ]
  },
  {
    name: "Bespoke Family Adventure",
    description: "Tailored family-friendly adventure combining education, fun, and cultural immersion. Perfect for families seeking meaningful experiences and quality time together.",
    duration: 9,
    price: 6800,
    category: "Family",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    reviewCount: 134,
    highlights: [
      "Family-friendly activities",
      "Educational experiences",
      "Cultural immersion",
      "Adventure activities",
      "Quality family time"
    ],
    maxGroupSize: 8,
    difficulty: "Easy",
    bestSeason: "Spring & Summer",
    includes: [
      "Family-friendly accommodations",
      "Educational activities",
      "Cultural workshops",
      "Adventure activities",
      "Child-friendly guides"
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ]
  },
  {
    name: "Bespoke Luxury Honeymoon",
    description: "Romantic luxury honeymoon experience with private accommodations, intimate cultural experiences, and personalized service for the perfect romantic getaway.",
    duration: 10,
    price: 8500,
    category: "Luxury",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 5,
    reviewCount: 67,
    highlights: [
      "Private luxury accommodations",
      "Romantic experiences",
      "Intimate cultural activities",
      "Personalized service",
      "Exclusive dining"
    ],
    maxGroupSize: 2,
    difficulty: "Easy",
    bestSeason: "Year-round",
    includes: [
      "Luxury honeymoon suite",
      "Private guide and driver",
      "Romantic experiences",
      "Exclusive dining",
      "Personalized service"
    ],
    excludes: [
      "International flights",
      "Personal shopping",
      "Travel insurance",
      "Additional activities"
    ]
  },
  // Additional tours inspired by the new Bhutan operators
  {
    name: "Shepherd's Himalayan Journey",
    description: "Authentic mountain experience following ancient shepherd trails through pristine valleys, remote villages, and high-altitude pastures where traditional nomadic life continues.",
    duration: 13,
    price: 4200,
    category: "Adventure",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    reviewCount: 89,
    highlights: [
      "Ancient shepherd trails",
      "Remote village visits",
      "High-altitude pastures",
      "Nomadic life experience",
      "Traditional yak herding"
    ],
    maxGroupSize: 6,
    difficulty: "Moderate",
    bestSeason: "Summer & Autumn",
    includes: [
      "Mountain guide",
      "Camping equipment",
      "Traditional meals",
      "Village homestays",
      "Transportation support"
    ],
    excludes: [
      "Personal gear",
      "International flights",
      "Travel insurance",
      "Emergency evacuation"
    ]
  },
  {
    name: "Truly Bhutan Authentic Experience",
    description: "Genuine Bhutanese experience focusing on authentic local interactions, traditional customs, and real cultural immersion away from tourist crowds.",
    duration: 11,
    price: 3200,
    category: "Cultural",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviewCount: 167,
    highlights: [
      "Authentic local interactions",
      "Traditional customs",
      "Real cultural immersion",
      "Off-the-beaten-path",
      "Local family experiences"
    ],
    maxGroupSize: 8,
    difficulty: "Easy",
    bestSeason: "Year-round",
    includes: [
      "Local accommodations",
      "Traditional meals",
      "Cultural activities",
      "Local guide",
      "Community experiences"
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ]
  },
  {
    name: "Bhutan Travel Center Classic",
    description: "Comprehensive introduction to Bhutan covering all major highlights including ancient dzongs, sacred monasteries, and stunning landscapes in a well-paced itinerary.",
    duration: 9,
    price: 3800,
    category: "Cultural",
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.6,
    reviewCount: 234,
    highlights: [
      "Ancient dzong visits",
      "Sacred monasteries",
      "Stunning landscapes",
      "Cultural highlights",
      "Well-paced itinerary"
    ],
    maxGroupSize: 12,
    difficulty: "Easy",
    bestSeason: "Year-round",
    includes: [
      "Quality accommodations",
      "Professional guide",
      "All entrance fees",
      "Transportation",
      "Daily meals"
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ]
  },
  {
    name: "Bokar Tours Mountain Adventure",
    description: "Thrilling mountain adventure combining challenging treks, high-altitude camping, and breathtaking Himalayan vistas with expert mountaineering guidance.",
    duration: 15,
    price: 5200,
    category: "Adventure",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviewCount: 76,
    highlights: [
      "Challenging treks",
      "High-altitude camping",
      "Himalayan vistas",
      "Expert mountaineering",
      "Remote wilderness"
    ],
    maxGroupSize: 6,
    difficulty: "Challenging",
    bestSeason: "Spring & Autumn",
    includes: [
      "Mountaineering guide",
      "Camping equipment",
      "Safety gear",
      "All meals",
      "Emergency support"
    ],
    excludes: [
      "Personal gear",
      "International flights",
      "Travel insurance",
      "Emergency evacuation"
    ]
  },
  {
    name: "Bhutan Travel Service Heritage",
    description: "Heritage-focused journey exploring Bhutan's rich historical sites, ancient architecture, and traditional way of life preserved through centuries.",
    duration: 10,
    price: 3600,
    category: "Cultural",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    reviewCount: 145,
    highlights: [
      "Historical site exploration",
      "Ancient architecture",
      "Traditional way of life",
      "Heritage preservation",
      "Cultural insights"
    ],
    maxGroupSize: 10,
    difficulty: "Easy",
    bestSeason: "Year-round",
    includes: [
      "Heritage guide",
      "Historical site access",
      "Traditional accommodations",
      "Cultural activities",
      "Transportation"
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ]
  },
  {
    name: "Bhutan Tour Travel Discovery",
    description: "Comprehensive discovery tour showcasing Bhutan's diverse landscapes, from subtropical valleys to alpine meadows, with rich biodiversity and cultural diversity.",
    duration: 12,
    price: 4200,
    category: "Nature",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.6,
    reviewCount: 189,
    highlights: [
      "Diverse landscapes",
      "Rich biodiversity",
      "Cultural diversity",
      "Subtropical to alpine",
      "Nature exploration"
    ],
    maxGroupSize: 10,
    difficulty: "Easy",
    bestSeason: "Spring & Autumn",
    includes: [
      "Nature guide",
      "Quality accommodations",
      "All transportation",
      "Daily meals",
      "Entrance fees"
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ]
  },
  {
    name: "Gemini Bhutan Luxury Collection",
    description: "Curated luxury collection featuring exclusive experiences, premium accommodations, and personalized service for discerning travelers seeking the finest Bhutan has to offer.",
    duration: 14,
    price: 9500,
    category: "Luxury",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 5,
    reviewCount: 45,
    highlights: [
      "Exclusive experiences",
      "Premium accommodations",
      "Personalized service",
      "Luxury transportation",
      "VIP access"
    ],
    maxGroupSize: 4,
    difficulty: "Easy",
    bestSeason: "Year-round",
    includes: [
      "Luxury accommodations",
      "Personal butler",
      "Exclusive experiences",
      "Premium dining",
      "VIP transportation"
    ],
    excludes: [
      "International flights",
      "Personal shopping",
      "Spa treatments",
      "Alcoholic beverages"
    ]
  },
  {
    name: "Bhutan Jewel Travel Boutique",
    description: "Boutique travel experience offering intimate group sizes, personalized attention, and carefully crafted itineraries that reveal Bhutan's hidden treasures.",
    duration: 8,
    price: 4800,
    category: "Boutique",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    reviewCount: 78,
    highlights: [
      "Intimate group sizes",
      "Personalized attention",
      "Hidden treasures",
      "Carefully crafted itineraries",
      "Boutique experience"
    ],
    maxGroupSize: 6,
    difficulty: "Easy",
    bestSeason: "Year-round",
    includes: [
      "Boutique accommodations",
      "Personal guide",
      "Customized experiences",
      "Quality meals",
      "Transportation"
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ]
  },
  {
    name: "Bhutan Himalayan Tours Expedition",
    description: "Expedition-style adventure exploring Bhutan's most remote Himalayan regions, challenging treks, and authentic mountain culture with experienced expedition leaders.",
    duration: 18,
    price: 6800,
    category: "Adventure",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviewCount: 56,
    highlights: [
      "Remote Himalayan regions",
      "Challenging treks",
      "Authentic mountain culture",
      "Expedition leaders",
      "Wilderness experience"
    ],
    maxGroupSize: 8,
    difficulty: "Challenging",
    bestSeason: "Spring & Autumn",
    includes: [
      "Expedition leader",
      "Camping equipment",
      "Safety gear",
      "All meals",
      "Emergency support"
    ],
    excludes: [
      "Personal gear",
      "International flights",
      "Travel insurance",
      "Emergency evacuation"
    ]
  },
  {
    name: "Bhutan Majestic Travel Royal",
    description: "Royal treatment with access to exclusive venues, private audiences, and experiences typically reserved for dignitaries and special guests of Bhutan.",
    duration: 12,
    price: 12e3,
    category: "Luxury",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 5,
    reviewCount: 23,
    highlights: [
      "Exclusive venue access",
      "Private audiences",
      "Royal treatment",
      "Dignitary experiences",
      "Special privileges"
    ],
    maxGroupSize: 4,
    difficulty: "Easy",
    bestSeason: "Year-round",
    includes: [
      "Royal accommodations",
      "Private audiences",
      "Exclusive access",
      "Personal butler",
      "VIP transportation"
    ],
    excludes: [
      "International flights",
      "Personal shopping",
      "Spa treatments",
      "Alcoholic beverages"
    ]
  },
  {
    name: "Bhutan Natural Eco-Adventure",
    description: "Eco-conscious adventure focusing on sustainable tourism, environmental conservation, and responsible travel practices while exploring Bhutan's natural wonders.",
    duration: 10,
    price: 3800,
    category: "Eco-Tourism",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    reviewCount: 134,
    highlights: [
      "Sustainable tourism",
      "Environmental conservation",
      "Responsible travel",
      "Natural wonders",
      "Eco-conscious practices"
    ],
    maxGroupSize: 8,
    difficulty: "Easy",
    bestSeason: "Year-round",
    includes: [
      "Eco-friendly accommodations",
      "Conservation activities",
      "Environmental guide",
      "Sustainable meals",
      "Carbon offset"
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ]
  },
  {
    name: "Bhutan Dreams Fantasy",
    description: "Dream-like journey through Bhutan's most magical locations, mystical experiences, and enchanting cultural encounters that feel like stepping into a fairy tale.",
    duration: 11,
    price: 5200,
    category: "Cultural",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviewCount: 98,
    highlights: [
      "Magical locations",
      "Mystical experiences",
      "Enchanting encounters",
      "Fairy tale atmosphere",
      "Dream-like journey"
    ],
    maxGroupSize: 8,
    difficulty: "Easy",
    bestSeason: "Year-round",
    includes: [
      "Enchanting accommodations",
      "Mystical experiences",
      "Cultural encounters",
      "Fantasy guide",
      "Transportation"
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ]
  },
  {
    name: "Bhutan Original Authentic",
    description: "Original and authentic Bhutanese experience focusing on traditional customs, ancient practices, and genuine cultural heritage preserved through generations.",
    duration: 9,
    price: 3400,
    category: "Cultural",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    reviewCount: 167,
    highlights: [
      "Traditional customs",
      "Ancient practices",
      "Genuine heritage",
      "Preserved traditions",
      "Authentic experience"
    ],
    maxGroupSize: 10,
    difficulty: "Easy",
    bestSeason: "Year-round",
    includes: [
      "Traditional accommodations",
      "Cultural activities",
      "Heritage guide",
      "Traditional meals",
      "Transportation"
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ]
  },
  {
    name: "Bhutan Inbound Specialized",
    description: "Specialized inbound tourism experience designed for international travelers, featuring comprehensive cultural orientation and seamless travel arrangements.",
    duration: 8,
    price: 3600,
    category: "Cultural",
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.6,
    reviewCount: 234,
    highlights: [
      "Cultural orientation",
      "Seamless arrangements",
      "International focus",
      "Comprehensive experience",
      "Specialized service"
    ],
    maxGroupSize: 12,
    difficulty: "Easy",
    bestSeason: "Year-round",
    includes: [
      "Cultural orientation",
      "Quality accommodations",
      "Professional guide",
      "All arrangements",
      "Daily meals"
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ]
  },
  {
    name: "Bhutan Dalam Travels Spiritual",
    description: "Deep spiritual journey exploring Bhutan's sacred sites, meditation practices, and Buddhist philosophy with experienced spiritual guides and monastic teachers.",
    duration: 12,
    price: 4200,
    category: "Spiritual",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    reviewCount: 89,
    highlights: [
      "Sacred site exploration",
      "Meditation practices",
      "Buddhist philosophy",
      "Spiritual guides",
      "Monastic teachers"
    ],
    maxGroupSize: 8,
    difficulty: "Easy",
    bestSeason: "Spring & Autumn",
    includes: [
      "Monastic accommodations",
      "Spiritual guidance",
      "Meditation sessions",
      "Philosophy classes",
      "Sacred site access"
    ],
    excludes: [
      "International flights",
      "Personal meditation items",
      "Donations",
      "Travel insurance"
    ]
  },
  {
    name: "Bhutan Tour Planner Custom",
    description: "Fully customized tour planning service where every detail is tailored to your preferences, interests, and travel style for a truly personalized Bhutan experience.",
    duration: 10,
    price: 5800,
    category: "Custom",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    reviewCount: 67,
    highlights: [
      "Fully customized planning",
      "Tailored experiences",
      "Personal preferences",
      "Individual interests",
      "Personalized service"
    ],
    maxGroupSize: 6,
    difficulty: "Flexible",
    bestSeason: "Year-round",
    includes: [
      "Custom planning service",
      "Personalized itinerary",
      "Flexible accommodations",
      "Private guide",
      "Tailored experiences"
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ]
  }
];

// server/enhanced-hotels.ts
var enhancedHotelsData = [
  // Luxury Hotels (inspired by Aman, COMO, Six Senses)
  {
    name: "Amankora Paro",
    description: "Ultra-luxury resort offering unparalleled views of the sacred Jomolhari mountain. Features private villas, world-class spa, and exclusive dining experiences in a pristine valley setting.",
    location: "Paro Valley",
    address: "Paro Valley, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "luxury",
    starRating: 5,
    amenities: [
      "Private infinity pool",
      "World-class spa",
      "Fine dining restaurant",
      "Mountain views",
      "Butler service",
      "Helicopter transfers",
      "Yoga studio",
      "Wine cellar"
    ],
    features: [
      "Carbon-neutral operations",
      "Local community support",
      "Sustainable practices",
      "Cultural experiences",
      "Private guided tours"
    ],
    pricePerNight: 1800,
    contactEmail: "reservations@amankora.com",
    contactPhone: "+975-8-272333",
    website: "https://www.aman.com/hotels/amankora",
    checkInTime: "15:00",
    checkOutTime: "11:00",
    cancellationPolicy: "Free cancellation up to 7 days before arrival"
  },
  {
    name: "Uma Paro by COMO",
    description: "Contemporary luxury resort with valley views and holistic wellness programs. Features modern design, award-winning spa, and authentic Bhutanese experiences.",
    location: "Paro",
    address: "Paro Valley, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "luxury",
    starRating: 5,
    amenities: [
      "Infinity pool",
      "COMO Shambhala spa",
      "Fine dining",
      "Valley views",
      "Yoga classes",
      "Cultural activities",
      "Library",
      "Garden"
    ],
    features: [
      "Holistic wellness programs",
      "Sustainable luxury",
      "Cultural immersion",
      "Local partnerships",
      "Wellness cuisine"
    ],
    pricePerNight: 1200,
    contactEmail: "reservations@umaparo.como.bz",
    contactPhone: "+975-8-271597",
    website: "https://www.comohotels.com/umaparo",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    cancellationPolicy: "Free cancellation up to 3 days before arrival"
  },
  // Boutique Hotels (inspired by local Bhutan operators)
  {
    name: "Gangtey Lodge",
    description: "Boutique lodge in the pristine Phobjikha Valley, offering intimate luxury with stunning views of the Black Mountain range and rare black-necked cranes.",
    location: "Phobjikha Valley",
    address: "Phobjikha Valley, Wangdue Phodrang, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "boutique",
    starRating: 4,
    amenities: [
      "Mountain views",
      "Restaurant",
      "Bar",
      "Garden",
      "Cultural activities",
      "Bird watching",
      "Hiking trails",
      "Library"
    ],
    features: [
      "Crane conservation",
      "Local community support",
      "Cultural experiences",
      "Sustainable tourism",
      "Wildlife viewing"
    ],
    pricePerNight: 450,
    contactEmail: "info@gangteylodge.com",
    contactPhone: "+975-17-123456",
    website: "https://www.gangteylodge.com",
    checkInTime: "14:00",
    checkOutTime: "11:00",
    cancellationPolicy: "Free cancellation up to 5 days before arrival"
  },
  {
    name: "Dhensa Boutique Resort",
    description: "Intimate boutique resort in Punakha Valley featuring contemporary Bhutanese architecture, organic gardens, and personalized service in a serene setting.",
    location: "Punakha Valley",
    address: "Punakha Valley, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "boutique",
    starRating: 4,
    amenities: [
      "Valley views",
      "Restaurant",
      "Spa",
      "Garden",
      "Cultural activities",
      "Yoga classes",
      "Hiking",
      "Organic garden"
    ],
    features: [
      "Contemporary Bhutanese design",
      "Organic cuisine",
      "Cultural immersion",
      "Sustainable practices",
      "Personalized service"
    ],
    pricePerNight: 380,
    contactEmail: "reservations@dhensa.com",
    contactPhone: "+975-2-584444",
    website: "https://www.dhensa.com",
    checkInTime: "14:00",
    checkOutTime: "11:00",
    cancellationPolicy: "Free cancellation up to 3 days before arrival"
  },
  // Heritage Hotels (inspired by traditional Bhutanese architecture)
  {
    name: "Taj Tashi Thimphu",
    description: "Luxury heritage hotel in the heart of Thimphu, combining traditional Bhutanese architecture with modern luxury amenities and authentic cultural experiences.",
    location: "Thimphu",
    address: "Samten Lam, Thimphu, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "heritage",
    starRating: 5,
    amenities: [
      "City center location",
      "Fine dining",
      "Spa",
      "Business center",
      "Cultural activities",
      "Garden",
      "Bar",
      "Concierge"
    ],
    features: [
      "Traditional architecture",
      "Cultural experiences",
      "Local partnerships",
      "Sustainable luxury",
      "Authentic cuisine"
    ],
    pricePerNight: 650,
    contactEmail: "reservations@tajtashi.com",
    contactPhone: "+975-2-336501",
    website: "https://www.tajhotels.com/taj-tashi",
    checkInTime: "15:00",
    checkOutTime: "12:00",
    cancellationPolicy: "Free cancellation up to 2 days before arrival"
  },
  {
    name: "Le Meridien Thimphu",
    description: "Modern luxury hotel in Thimphu offering contemporary comfort with Bhutanese cultural elements, perfect for both business and leisure travelers.",
    location: "Thimphu",
    address: "Chubachu, Thimphu, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "heritage",
    starRating: 4,
    amenities: [
      "City center location",
      "Restaurant",
      "Bar",
      "Fitness center",
      "Business facilities",
      "Cultural activities",
      "Garden",
      "Concierge"
    ],
    features: [
      "Modern comfort",
      "Cultural elements",
      "Business facilities",
      "Local experiences",
      "International standards"
    ],
    pricePerNight: 420,
    contactEmail: "reservations@lemeridienthimphu.com",
    contactPhone: "+975-2-337788",
    website: "https://www.marriott.com/hotels/travel/pbhtx-le-meridien-thimphu",
    checkInTime: "15:00",
    checkOutTime: "12:00",
    cancellationPolicy: "Free cancellation up to 1 day before arrival"
  },
  // Eco-Lodges (inspired by sustainable tourism)
  {
    name: "Six Senses Bhutan",
    description: "Collection of five lodges across Bhutan offering sustainable luxury with focus on wellness, culture, and environmental responsibility in stunning locations.",
    location: "Multiple locations",
    address: "Various locations across Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "eco-lodge",
    starRating: 5,
    amenities: [
      "Wellness programs",
      "Spa treatments",
      "Cultural activities",
      "Sustainable dining",
      "Mountain views",
      "Yoga classes",
      "Hiking trails",
      "Local experiences"
    ],
    features: [
      "Carbon-neutral operations",
      "Local community support",
      "Wellness focus",
      "Cultural immersion",
      "Environmental responsibility"
    ],
    pricePerNight: 950,
    contactEmail: "reservations@sixsenses.com",
    contactPhone: "+975-2-336666",
    website: "https://www.sixsenses.com/en/resorts/bhutan",
    checkInTime: "15:00",
    checkOutTime: "11:00",
    cancellationPolicy: "Free cancellation up to 7 days before arrival"
  },
  {
    name: "Terma Linca Resort & Spa",
    description: "Eco-friendly resort in Bumthang Valley offering traditional Bhutanese hospitality with modern comforts and focus on wellness and cultural experiences.",
    location: "Bumthang Valley",
    address: "Bumthang Valley, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "eco-lodge",
    starRating: 4,
    amenities: [
      "Valley views",
      "Spa",
      "Restaurant",
      "Cultural activities",
      "Hiking trails",
      "Garden",
      "Wellness programs",
      "Local experiences"
    ],
    features: [
      "Eco-friendly practices",
      "Traditional hospitality",
      "Cultural immersion",
      "Wellness focus",
      "Local partnerships"
    ],
    pricePerNight: 320,
    contactEmail: "info@termalinca.com",
    contactPhone: "+975-3-631111",
    website: "https://www.termalinca.com",
    checkInTime: "14:00",
    checkOutTime: "11:00",
    cancellationPolicy: "Free cancellation up to 3 days before arrival"
  }
];
var enhancedHotelRoomsData = [
  // Amankora Paro Rooms
  {
    roomType: "suite",
    roomName: "Valley Suite",
    description: "Spacious suite with panoramic valley views, private terrace, and traditional Bhutanese design elements. Features separate living area and luxurious bathroom.",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    maxOccupancy: 3,
    bedType: "king",
    roomSize: "85 sqm",
    amenities: [
      "Private terrace",
      "Valley views",
      "Separate living area",
      "Luxury bathroom",
      "Butler service",
      "Mini bar",
      "WiFi",
      "Air conditioning"
    ],
    pricePerNight: 2200,
    totalRooms: 8
  },
  {
    roomType: "presidential",
    roomName: "Royal Suite",
    description: "Ultimate luxury accommodation with private infinity pool, butler service, and exclusive mountain views. The most prestigious suite in the resort.",
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    maxOccupancy: 4,
    bedType: "king",
    roomSize: "150 sqm",
    amenities: [
      "Private infinity pool",
      "Butler service",
      "Mountain views",
      "Separate dining area",
      "Luxury spa bathroom",
      "Helicopter transfers",
      "Private chef",
      "Exclusive experiences"
    ],
    pricePerNight: 4500,
    totalRooms: 2
  },
  // Uma Paro Rooms
  {
    roomType: "deluxe",
    roomName: "Valley View Room",
    description: "Comfortable room with stunning valley views, modern amenities, and authentic Bhutanese design elements. Perfect for couples and small families.",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    maxOccupancy: 2,
    bedType: "king",
    roomSize: "45 sqm",
    amenities: [
      "Valley views",
      "Private balcony",
      "Modern bathroom",
      "Mini bar",
      "WiFi",
      "Air conditioning",
      "Room service",
      "Cultural activities"
    ],
    pricePerNight: 1400,
    totalRooms: 12
  },
  {
    roomType: "suite",
    roomName: "COMO Suite",
    description: "Luxurious suite with separate living area, valley views, and access to exclusive COMO Shambhala wellness programs and spa treatments.",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    maxOccupancy: 3,
    bedType: "king",
    roomSize: "75 sqm",
    amenities: [
      "Separate living area",
      "Valley views",
      "Private terrace",
      "Luxury bathroom",
      "Wellness programs",
      "Spa access",
      "Butler service",
      "Exclusive dining"
    ],
    pricePerNight: 2200,
    totalRooms: 6
  },
  // Gangtey Lodge Rooms
  {
    roomType: "deluxe",
    roomName: "Valley Suite",
    description: "Spacious suite with panoramic views of the Phobjikha Valley and Black Mountain range. Features traditional Bhutanese design with modern comforts.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    maxOccupancy: 3,
    bedType: "king",
    roomSize: "55 sqm",
    amenities: [
      "Valley views",
      "Private balcony",
      "Traditional design",
      "Modern bathroom",
      "Mini bar",
      "WiFi",
      "Heating",
      "Cultural activities"
    ],
    pricePerNight: 550,
    totalRooms: 8
  },
  // Dhensa Boutique Resort Rooms
  {
    roomType: "standard",
    roomName: "Garden Room",
    description: "Comfortable room with garden views and contemporary Bhutanese design. Perfect for couples seeking authentic experiences with modern comforts.",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    maxOccupancy: 2,
    bedType: "queen",
    roomSize: "35 sqm",
    amenities: [
      "Garden views",
      "Contemporary design",
      "Modern bathroom",
      "WiFi",
      "Heating",
      "Cultural activities",
      "Organic dining",
      "Yoga classes"
    ],
    pricePerNight: 420,
    totalRooms: 12
  }
];

// server/enhanced-festivals.ts
var enhancedFestivalsData = [
  {
    name: "Paro Tshechu",
    description: "One of Bhutan's most spectacular festivals, Paro Tshechu celebrates the victory of good over evil through elaborate masked dances, religious ceremonies, and cultural performances. The festival culminates with the unfurling of the sacred Thongdrel (giant thangka) at dawn.",
    location: "Paro",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    startDate: /* @__PURE__ */ new Date("2024-03-21"),
    endDate: /* @__PURE__ */ new Date("2024-03-25"),
    category: "religious",
    highlights: [
      "Sacred Thongdrel unfurling",
      "Traditional masked dances",
      "Religious ceremonies",
      "Cultural performances",
      "Local food and crafts"
    ],
    ticketPrice: 1200,
    maxCapacity: 200
  },
  {
    name: "Thimphu Tshechu",
    description: "The capital's grandest festival featuring elaborate masked dances, religious rituals, and cultural performances. This is Bhutan's largest and most important festival, attracting visitors from around the world.",
    location: "Thimphu",
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    startDate: /* @__PURE__ */ new Date("2024-09-26"),
    endDate: /* @__PURE__ */ new Date("2024-09-28"),
    category: "religious",
    highlights: [
      "Grand masked dance performances",
      "Royal family attendance",
      "Religious ceremonies",
      "Cultural exhibitions",
      "Traditional music"
    ],
    ticketPrice: 980,
    maxCapacity: 300
  },
  {
    name: "Punakha Drubchen & Tshechu",
    description: "Unique festival combining the ancient Drubchen (great accomplishment) ceremony with traditional Tshechu celebrations. Features dramatic reenactments of 17th-century battles and religious rituals.",
    location: "Punakha",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    startDate: /* @__PURE__ */ new Date("2024-02-19"),
    endDate: /* @__PURE__ */ new Date("2024-02-23"),
    category: "cultural",
    highlights: [
      "Battle reenactments",
      "Religious ceremonies",
      "Traditional dances",
      "Historical significance",
      "Cultural performances"
    ],
    ticketPrice: 1100,
    maxCapacity: 150
  },
  {
    name: "Jambay Lhakhang Drup",
    description: "Sacred festival at one of Bhutan's oldest temples, featuring the famous 'Mewang' (fire blessing) ceremony and 'Tercham' (naked dance) performed by monks to bless infertile women and children.",
    location: "Bumthang",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    startDate: /* @__PURE__ */ new Date("2024-11-05"),
    endDate: /* @__PURE__ */ new Date("2024-11-07"),
    category: "religious",
    highlights: [
      "Sacred fire blessing",
      "Traditional naked dance",
      "Religious ceremonies",
      "Spiritual significance",
      "Cultural performances"
    ],
    ticketPrice: 850,
    maxCapacity: 100
  },
  {
    name: "Wangdue Phodrang Tshechu",
    description: "Traditional festival in the historic Wangdue Phodrang Dzong featuring elaborate masked dances, religious ceremonies, and cultural performances in a stunning mountain setting.",
    location: "Wangdue Phodrang",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    startDate: /* @__PURE__ */ new Date("2024-10-15"),
    endDate: /* @__PURE__ */ new Date("2024-10-17"),
    category: "religious",
    highlights: [
      "Traditional masked dances",
      "Mountain setting",
      "Religious ceremonies",
      "Cultural performances",
      "Local traditions"
    ],
    ticketPrice: 750,
    maxCapacity: 120
  },
  {
    name: "Black-Necked Crane Festival",
    description: "Unique festival celebrating the arrival of endangered black-necked cranes in the Phobjikha Valley. Features cultural performances, environmental education, and wildlife conservation awareness.",
    location: "Phobjikha Valley",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    startDate: /* @__PURE__ */ new Date("2024-11-11"),
    endDate: /* @__PURE__ */ new Date("2024-11-12"),
    category: "seasonal",
    highlights: [
      "Crane watching",
      "Cultural performances",
      "Environmental education",
      "Conservation awareness",
      "Local traditions"
    ],
    ticketPrice: 650,
    maxCapacity: 80
  }
];

// server/additional-tours.ts
var additionalToursData = [
  {
    name: "Shepherd's Himalayan Journey",
    description: "Authentic mountain experience following ancient shepherd trails through pristine valleys, remote villages, and high-altitude pastures where traditional nomadic life continues.",
    duration: 13,
    price: 4200,
    category: "Adventure",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    reviewCount: 89,
    highlights: [
      "Ancient shepherd trails",
      "Remote village visits",
      "High-altitude pastures",
      "Nomadic life experience",
      "Traditional yak herding"
    ],
    maxGroupSize: 6,
    difficulty: "Moderate",
    bestSeason: "Summer & Autumn",
    includes: [
      "Mountain guide",
      "Camping equipment",
      "Traditional meals",
      "Village homestays",
      "Transportation support"
    ],
    excludes: [
      "Personal gear",
      "International flights",
      "Travel insurance",
      "Emergency evacuation"
    ]
  },
  {
    name: "Truly Bhutan Authentic Experience",
    description: "Genuine Bhutanese experience focusing on authentic local interactions, traditional customs, and real cultural immersion away from tourist crowds.",
    duration: 11,
    price: 3200,
    category: "Cultural",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviewCount: 167,
    highlights: [
      "Authentic local interactions",
      "Traditional customs",
      "Real cultural immersion",
      "Off-the-beaten-path",
      "Local family experiences"
    ],
    maxGroupSize: 8,
    difficulty: "Easy",
    bestSeason: "Year-round",
    includes: [
      "Local accommodations",
      "Traditional meals",
      "Cultural activities",
      "Local guide",
      "Community experiences"
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ]
  },
  {
    name: "Bhutan Travel Center Classic",
    description: "Comprehensive introduction to Bhutan covering all major highlights including ancient dzongs, sacred monasteries, and stunning landscapes in a well-paced itinerary.",
    duration: 9,
    price: 3800,
    category: "Cultural",
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.6,
    reviewCount: 234,
    highlights: [
      "Ancient dzong visits",
      "Sacred monasteries",
      "Stunning landscapes",
      "Cultural highlights",
      "Well-paced itinerary"
    ],
    maxGroupSize: 12,
    difficulty: "Easy",
    bestSeason: "Year-round",
    includes: [
      "Quality accommodations",
      "Professional guide",
      "All entrance fees",
      "Transportation",
      "Daily meals"
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ]
  },
  {
    name: "Bokar Tours Mountain Adventure",
    description: "Thrilling mountain adventure combining challenging treks, high-altitude camping, and breathtaking Himalayan vistas with expert mountaineering guidance.",
    duration: 15,
    price: 5200,
    category: "Adventure",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviewCount: 76,
    highlights: [
      "Challenging treks",
      "High-altitude camping",
      "Himalayan vistas",
      "Expert mountaineering",
      "Remote wilderness"
    ],
    maxGroupSize: 6,
    difficulty: "Challenging",
    bestSeason: "Spring & Autumn",
    includes: [
      "Mountaineering guide",
      "Camping equipment",
      "Safety gear",
      "All meals",
      "Emergency support"
    ],
    excludes: [
      "Personal gear",
      "International flights",
      "Travel insurance",
      "Emergency evacuation"
    ]
  },
  {
    name: "Bhutan Travel Service Heritage",
    description: "Heritage-focused journey exploring Bhutan's rich historical sites, ancient architecture, and traditional way of life preserved through centuries.",
    duration: 10,
    price: 3600,
    category: "Cultural",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    reviewCount: 145,
    highlights: [
      "Historical site exploration",
      "Ancient architecture",
      "Traditional way of life",
      "Heritage preservation",
      "Cultural insights"
    ],
    maxGroupSize: 10,
    difficulty: "Easy",
    bestSeason: "Year-round",
    includes: [
      "Heritage guide",
      "Historical site access",
      "Traditional accommodations",
      "Cultural activities",
      "Transportation"
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ]
  },
  {
    name: "Bhutan Tour Travel Discovery",
    description: "Comprehensive discovery tour showcasing Bhutan's diverse landscapes, from subtropical valleys to alpine meadows, with rich biodiversity and cultural diversity.",
    duration: 12,
    price: 4200,
    category: "Nature",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.6,
    reviewCount: 189,
    highlights: [
      "Diverse landscapes",
      "Rich biodiversity",
      "Cultural diversity",
      "Subtropical to alpine",
      "Nature exploration"
    ],
    maxGroupSize: 10,
    difficulty: "Easy",
    bestSeason: "Spring & Autumn",
    includes: [
      "Nature guide",
      "Quality accommodations",
      "All transportation",
      "Daily meals",
      "Entrance fees"
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ]
  },
  {
    name: "Gemini Bhutan Luxury Collection",
    description: "Curated luxury collection featuring exclusive experiences, premium accommodations, and personalized service for discerning travelers seeking the finest Bhutan has to offer.",
    duration: 14,
    price: 9500,
    category: "Luxury",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 5,
    reviewCount: 45,
    highlights: [
      "Exclusive experiences",
      "Premium accommodations",
      "Personalized service",
      "Luxury transportation",
      "VIP access"
    ],
    maxGroupSize: 4,
    difficulty: "Easy",
    bestSeason: "Year-round",
    includes: [
      "Luxury accommodations",
      "Personal butler",
      "Exclusive experiences",
      "Premium dining",
      "VIP transportation"
    ],
    excludes: [
      "International flights",
      "Personal shopping",
      "Spa treatments",
      "Alcoholic beverages"
    ]
  },
  {
    name: "Bhutan Jewel Travel Boutique",
    description: "Boutique travel experience offering intimate group sizes, personalized attention, and carefully crafted itineraries that reveal Bhutan's hidden treasures.",
    duration: 8,
    price: 4800,
    category: "Boutique",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    reviewCount: 78,
    highlights: [
      "Intimate group sizes",
      "Personalized attention",
      "Hidden treasures",
      "Carefully crafted itineraries",
      "Boutique experience"
    ],
    maxGroupSize: 6,
    difficulty: "Easy",
    bestSeason: "Year-round",
    includes: [
      "Boutique accommodations",
      "Personal guide",
      "Customized experiences",
      "Quality meals",
      "Transportation"
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ]
  },
  {
    name: "Bhutan Himalayan Tours Expedition",
    description: "Expedition-style adventure exploring Bhutan's most remote Himalayan regions, challenging treks, and authentic mountain culture with experienced expedition leaders.",
    duration: 18,
    price: 6800,
    category: "Adventure",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviewCount: 56,
    highlights: [
      "Remote Himalayan regions",
      "Challenging treks",
      "Authentic mountain culture",
      "Expedition leaders",
      "Wilderness experience"
    ],
    maxGroupSize: 8,
    difficulty: "Challenging",
    bestSeason: "Spring & Autumn",
    includes: [
      "Expedition leader",
      "Camping equipment",
      "Safety gear",
      "All meals",
      "Emergency support"
    ],
    excludes: [
      "Personal gear",
      "International flights",
      "Travel insurance",
      "Emergency evacuation"
    ]
  },
  {
    name: "Bhutan Majestic Travel Royal",
    description: "Royal treatment with access to exclusive venues, private audiences, and experiences typically reserved for dignitaries and special guests of Bhutan.",
    duration: 12,
    price: 12e3,
    category: "Luxury",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 5,
    reviewCount: 23,
    highlights: [
      "Exclusive venue access",
      "Private audiences",
      "Royal treatment",
      "Dignitary experiences",
      "Special privileges"
    ],
    maxGroupSize: 4,
    difficulty: "Easy",
    bestSeason: "Year-round",
    includes: [
      "Royal accommodations",
      "Private audiences",
      "Exclusive access",
      "Personal butler",
      "VIP transportation"
    ],
    excludes: [
      "International flights",
      "Personal shopping",
      "Spa treatments",
      "Alcoholic beverages"
    ]
  },
  {
    name: "Bhutan Natural Eco-Adventure",
    description: "Eco-conscious adventure focusing on sustainable tourism, environmental conservation, and responsible travel practices while exploring Bhutan's natural wonders.",
    duration: 10,
    price: 3800,
    category: "Eco-Tourism",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    reviewCount: 134,
    highlights: [
      "Sustainable tourism",
      "Environmental conservation",
      "Responsible travel",
      "Natural wonders",
      "Eco-conscious practices"
    ],
    maxGroupSize: 8,
    difficulty: "Easy",
    bestSeason: "Year-round",
    includes: [
      "Eco-friendly accommodations",
      "Conservation activities",
      "Environmental guide",
      "Sustainable meals",
      "Carbon offset"
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ]
  },
  {
    name: "Bhutan Dreams Fantasy",
    description: "Dream-like journey through Bhutan's most magical locations, mystical experiences, and enchanting cultural encounters that feel like stepping into a fairy tale.",
    duration: 11,
    price: 5200,
    category: "Cultural",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviewCount: 98,
    highlights: [
      "Magical locations",
      "Mystical experiences",
      "Enchanting encounters",
      "Fairy tale atmosphere",
      "Dream-like journey"
    ],
    maxGroupSize: 8,
    difficulty: "Easy",
    bestSeason: "Year-round",
    includes: [
      "Enchanting accommodations",
      "Mystical experiences",
      "Cultural encounters",
      "Fantasy guide",
      "Transportation"
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ]
  },
  {
    name: "Bhutan Original Authentic",
    description: "Original and authentic Bhutanese experience focusing on traditional customs, ancient practices, and genuine cultural heritage preserved through generations.",
    duration: 9,
    price: 3400,
    category: "Cultural",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    reviewCount: 167,
    highlights: [
      "Traditional customs",
      "Ancient practices",
      "Genuine heritage",
      "Preserved traditions",
      "Authentic experience"
    ],
    maxGroupSize: 10,
    difficulty: "Easy",
    bestSeason: "Year-round",
    includes: [
      "Traditional accommodations",
      "Cultural activities",
      "Heritage guide",
      "Traditional meals",
      "Transportation"
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ]
  },
  {
    name: "Bhutan Inbound Specialized",
    description: "Specialized inbound tourism experience designed for international travelers, featuring comprehensive cultural orientation and seamless travel arrangements.",
    duration: 8,
    price: 3600,
    category: "Cultural",
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.6,
    reviewCount: 234,
    highlights: [
      "Cultural orientation",
      "Seamless arrangements",
      "International focus",
      "Comprehensive experience",
      "Specialized service"
    ],
    maxGroupSize: 12,
    difficulty: "Easy",
    bestSeason: "Year-round",
    includes: [
      "Cultural orientation",
      "Quality accommodations",
      "Professional guide",
      "All arrangements",
      "Daily meals"
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ]
  },
  {
    name: "Bhutan Dalam Travels Spiritual",
    description: "Deep spiritual journey exploring Bhutan's sacred sites, meditation practices, and Buddhist philosophy with experienced spiritual guides and monastic teachers.",
    duration: 12,
    price: 4200,
    category: "Spiritual",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    reviewCount: 89,
    highlights: [
      "Sacred site exploration",
      "Meditation practices",
      "Buddhist philosophy",
      "Spiritual guides",
      "Monastic teachers"
    ],
    maxGroupSize: 8,
    difficulty: "Easy",
    bestSeason: "Spring & Autumn",
    includes: [
      "Monastic accommodations",
      "Spiritual guidance",
      "Meditation sessions",
      "Philosophy classes",
      "Sacred site access"
    ],
    excludes: [
      "International flights",
      "Personal meditation items",
      "Donations",
      "Travel insurance"
    ]
  },
  {
    name: "Bhutan Tour Planner Custom",
    description: "Fully customized tour planning service where every detail is tailored to your preferences, interests, and travel style for a truly personalized Bhutan experience.",
    duration: 10,
    price: 5800,
    category: "Custom",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    reviewCount: 67,
    highlights: [
      "Fully customized planning",
      "Tailored experiences",
      "Personal preferences",
      "Individual interests",
      "Personalized service"
    ],
    maxGroupSize: 6,
    difficulty: "Flexible",
    bestSeason: "Year-round",
    includes: [
      "Custom planning service",
      "Personalized itinerary",
      "Flexible accommodations",
      "Private guide",
      "Tailored experiences"
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ]
  }
];

// server/additional-hotels.ts
var additionalHotelsData = [
  {
    name: "Shepherd's Lodge Phobjikha",
    description: "Authentic mountain lodge in the pristine Phobjikha Valley, offering traditional Bhutanese hospitality with stunning views of the Black Mountain range and rare black-necked cranes.",
    location: "Phobjikha Valley",
    address: "Phobjikha Valley, Wangdue Phodrang, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "eco-lodge",
    starRating: 4,
    amenities: [
      "Mountain views",
      "Traditional restaurant",
      "Garden",
      "Cultural activities",
      "Bird watching",
      "Hiking trails",
      "Library",
      "Local experiences"
    ],
    features: [
      "Crane conservation",
      "Local community support",
      "Cultural experiences",
      "Sustainable tourism",
      "Wildlife viewing"
    ],
    pricePerNight: 380,
    contactEmail: "info@shepherdslodge.com",
    contactPhone: "+975-17-123456",
    website: "https://www.shepherdslodge.com",
    checkInTime: "14:00",
    checkOutTime: "11:00",
    cancellationPolicy: "Free cancellation up to 5 days before arrival"
  },
  {
    name: "Truly Bhutan Guesthouse",
    description: "Authentic local guesthouse offering genuine Bhutanese hospitality with traditional architecture, home-cooked meals, and intimate cultural experiences in a family setting.",
    location: "Thimphu",
    address: "Thimphu, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "guesthouse",
    starRating: 3,
    amenities: [
      "Traditional architecture",
      "Home-cooked meals",
      "Family atmosphere",
      "Cultural activities",
      "Local guide services",
      "Garden",
      "WiFi",
      "Traditional heating"
    ],
    features: [
      "Authentic local experience",
      "Family hospitality",
      "Traditional cuisine",
      "Cultural immersion",
      "Personalized service"
    ],
    pricePerNight: 120,
    contactEmail: "info@trulybhutanguesthouse.com",
    contactPhone: "+975-2-323456",
    website: "https://www.trulybhutanguesthouse.com",
    checkInTime: "14:00",
    checkOutTime: "11:00",
    cancellationPolicy: "Free cancellation up to 2 days before arrival"
  },
  {
    name: "Bhutan Travel Center Hotel",
    description: "Comfortable mid-range hotel in the heart of Thimphu, offering modern amenities with Bhutanese cultural elements and convenient access to major attractions.",
    location: "Thimphu",
    address: "Norzin Lam, Thimphu, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "heritage",
    starRating: 4,
    amenities: [
      "City center location",
      "Restaurant",
      "Bar",
      "Business center",
      "Cultural activities",
      "Garden",
      "WiFi",
      "Concierge"
    ],
    features: [
      "Modern comfort",
      "Cultural elements",
      "Business facilities",
      "Local experiences",
      "International standards"
    ],
    pricePerNight: 280,
    contactEmail: "reservations@bhutantravelcenter.com",
    contactPhone: "+975-2-334567",
    website: "https://www.bhutantravelcenter.com",
    checkInTime: "15:00",
    checkOutTime: "12:00",
    cancellationPolicy: "Free cancellation up to 1 day before arrival"
  },
  {
    name: "Bokar Mountain Resort",
    description: "Adventure-focused mountain resort offering comfortable accommodations for trekkers and outdoor enthusiasts, with stunning mountain views and expert guide services.",
    location: "Bumthang Valley",
    address: "Bumthang Valley, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "mountain-resort",
    starRating: 4,
    amenities: [
      "Mountain views",
      "Adventure equipment",
      "Guide services",
      "Restaurant",
      "Hiking trails",
      "Camping facilities",
      "WiFi",
      "Heating"
    ],
    features: [
      "Adventure focus",
      "Mountain culture",
      "Expert guides",
      "Outdoor activities",
      "Trekker-friendly"
    ],
    pricePerNight: 320,
    contactEmail: "info@bokarmountainresort.com",
    contactPhone: "+975-3-631234",
    website: "https://www.bokarmountainresort.com",
    checkInTime: "14:00",
    checkOutTime: "11:00",
    cancellationPolicy: "Free cancellation up to 3 days before arrival"
  },
  {
    name: "Bhutan Travel Service Heritage Inn",
    description: "Heritage-focused inn showcasing traditional Bhutanese architecture and cultural elements, offering authentic experiences with modern comfort in a historical setting.",
    location: "Punakha",
    address: "Punakha Valley, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "heritage",
    starRating: 4,
    amenities: [
      "Traditional architecture",
      "Cultural activities",
      "Heritage tours",
      "Restaurant",
      "Garden",
      "WiFi",
      "Traditional heating",
      "Local experiences"
    ],
    features: [
      "Heritage preservation",
      "Cultural immersion",
      "Traditional design",
      "Historical setting",
      "Authentic experiences"
    ],
    pricePerNight: 260,
    contactEmail: "reservations@bhutantravelservice.com",
    contactPhone: "+975-2-584321",
    website: "https://www.bhutantravelservice.com",
    checkInTime: "14:00",
    checkOutTime: "11:00",
    cancellationPolicy: "Free cancellation up to 2 days before arrival"
  },
  {
    name: "Bhutan Tour Travel Discovery Lodge",
    description: "Nature-focused lodge in a diverse landscape setting, offering comfortable accommodations for nature enthusiasts and cultural explorers with guided experiences.",
    location: "Wangdue Phodrang",
    address: "Wangdue Phodrang, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "nature-lodge",
    starRating: 4,
    amenities: [
      "Nature views",
      "Guided experiences",
      "Restaurant",
      "Hiking trails",
      "Cultural activities",
      "Garden",
      "WiFi",
      "Local guide services"
    ],
    features: [
      "Nature focus",
      "Cultural diversity",
      "Guided experiences",
      "Biodiversity",
      "Local insights"
    ],
    pricePerNight: 240,
    contactEmail: "info@bhutantourtravellodge.com",
    contactPhone: "+975-2-584567",
    website: "https://www.bhutantourtravellodge.com",
    checkInTime: "14:00",
    checkOutTime: "11:00",
    cancellationPolicy: "Free cancellation up to 3 days before arrival"
  },
  {
    name: "Gemini Bhutan Luxury Villa",
    description: "Exclusive luxury villa offering the highest standards of comfort and service, featuring private amenities, personalized attention, and premium experiences for discerning guests.",
    location: "Paro",
    address: "Paro Valley, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "luxury",
    starRating: 5,
    amenities: [
      "Private villa",
      "Personal butler",
      "Exclusive dining",
      "Luxury spa",
      "Private pool",
      "Helicopter transfers",
      "VIP services",
      "Premium experiences"
    ],
    features: [
      "Exclusive luxury",
      "Personalized service",
      "Premium experiences",
      "VIP treatment",
      "Private amenities"
    ],
    pricePerNight: 1500,
    contactEmail: "reservations@geminibhutan.com",
    contactPhone: "+975-8-271234",
    website: "https://www.geminibhutan.com",
    checkInTime: "15:00",
    checkOutTime: "11:00",
    cancellationPolicy: "Free cancellation up to 7 days before arrival"
  },
  {
    name: "Bhutan Jewel Travel Boutique Hotel",
    description: "Intimate boutique hotel offering personalized attention and carefully crafted experiences, featuring elegant design and hidden treasures for discerning travelers.",
    location: "Thimphu",
    address: "Thimphu, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "boutique",
    starRating: 4,
    amenities: [
      "Elegant design",
      "Personalized service",
      "Boutique restaurant",
      "Hidden treasures",
      "Cultural experiences",
      "Garden",
      "WiFi",
      "Concierge"
    ],
    features: [
      "Boutique experience",
      "Personalized attention",
      "Hidden treasures",
      "Elegant design",
      "Cultural immersion"
    ],
    pricePerNight: 450,
    contactEmail: "reservations@bhutanjeweltravel.com",
    contactPhone: "+975-2-345678",
    website: "https://www.bhutanjeweltravel.com",
    checkInTime: "14:00",
    checkOutTime: "11:00",
    cancellationPolicy: "Free cancellation up to 3 days before arrival"
  },
  {
    name: "Bhutan Himalayan Tours Base Camp",
    description: "Expedition-style base camp offering comfortable accommodations for adventure travelers, with expert guides, equipment storage, and expedition planning services.",
    location: "Haa Valley",
    address: "Haa Valley, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "adventure-lodge",
    starRating: 3,
    amenities: [
      "Expedition planning",
      "Expert guides",
      "Equipment storage",
      "Adventure restaurant",
      "Training facilities",
      "Safety equipment",
      "WiFi",
      "Heating"
    ],
    features: [
      "Expedition focus",
      "Expert guidance",
      "Adventure planning",
      "Safety equipment",
      "Mountain culture"
    ],
    pricePerNight: 180,
    contactEmail: "info@bhutanhimalayantours.com",
    contactPhone: "+975-17-234567",
    website: "https://www.bhutanhimalayantours.com",
    checkInTime: "14:00",
    checkOutTime: "11:00",
    cancellationPolicy: "Free cancellation up to 5 days before arrival"
  },
  {
    name: "Bhutan Majestic Travel Palace",
    description: "Palace-style luxury accommodation offering royal treatment with access to exclusive venues, private audiences, and experiences typically reserved for dignitaries.",
    location: "Thimphu",
    address: "Thimphu, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "luxury",
    starRating: 5,
    amenities: [
      "Palace architecture",
      "Royal treatment",
      "Exclusive access",
      "Private audiences",
      "Luxury dining",
      "Personal butler",
      "VIP services",
      "Royal experiences"
    ],
    features: [
      "Royal treatment",
      "Exclusive access",
      "Dignitary experiences",
      "Palace architecture",
      "Special privileges"
    ],
    pricePerNight: 2e3,
    contactEmail: "reservations@bhutanmajestictravel.com",
    contactPhone: "+975-2-356789",
    website: "https://www.bhutanmajestictravel.com",
    checkInTime: "15:00",
    checkOutTime: "11:00",
    cancellationPolicy: "Free cancellation up to 14 days before arrival"
  },
  {
    name: "Bhutan Natural Eco-Lodge",
    description: "Eco-conscious lodge focusing on sustainable tourism and environmental conservation, offering responsible travel experiences in harmony with nature.",
    location: "Bumthang Valley",
    address: "Bumthang Valley, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "eco-lodge",
    starRating: 4,
    amenities: [
      "Eco-friendly practices",
      "Conservation activities",
      "Sustainable dining",
      "Nature trails",
      "Environmental education",
      "Organic garden",
      "Solar power",
      "Local experiences"
    ],
    features: [
      "Sustainable tourism",
      "Environmental conservation",
      "Responsible travel",
      "Eco-friendly practices",
      "Nature harmony"
    ],
    pricePerNight: 220,
    contactEmail: "info@bhutannatural.com",
    contactPhone: "+975-3-632345",
    website: "https://www.bhutannatural.com",
    checkInTime: "14:00",
    checkOutTime: "11:00",
    cancellationPolicy: "Free cancellation up to 3 days before arrival"
  },
  {
    name: "Bhutan Dreams Fantasy Resort",
    description: "Dream-like resort offering magical experiences and enchanting encounters in a fairy tale atmosphere, perfect for those seeking mystical and extraordinary experiences.",
    location: "Paro Valley",
    address: "Paro Valley, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "boutique",
    starRating: 4,
    amenities: [
      "Magical experiences",
      "Enchanting encounters",
      "Fantasy atmosphere",
      "Mystical activities",
      "Dream-like setting",
      "Garden",
      "WiFi",
      "Cultural experiences"
    ],
    features: [
      "Magical experiences",
      "Enchanting encounters",
      "Fairy tale atmosphere",
      "Mystical activities",
      "Dream-like journey"
    ],
    pricePerNight: 380,
    contactEmail: "reservations@bhutandreams.com",
    contactPhone: "+975-8-273456",
    website: "https://www.bhutandreams.com",
    checkInTime: "14:00",
    checkOutTime: "11:00",
    cancellationPolicy: "Free cancellation up to 3 days before arrival"
  },
  {
    name: "Bhutan Original Heritage House",
    description: "Original heritage house showcasing traditional Bhutanese architecture and authentic cultural experiences, preserving ancient practices and genuine heritage.",
    location: "Punakha",
    address: "Punakha Valley, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "heritage",
    starRating: 4,
    amenities: [
      "Traditional architecture",
      "Ancient practices",
      "Heritage preservation",
      "Cultural activities",
      "Traditional meals",
      "Garden",
      "WiFi",
      "Local experiences"
    ],
    features: [
      "Original heritage",
      "Ancient practices",
      "Genuine heritage",
      "Preserved traditions",
      "Authentic experience"
    ],
    pricePerNight: 200,
    contactEmail: "info@bhutanoriginal.com",
    contactPhone: "+975-2-567890",
    website: "https://www.bhutanoriginal.com",
    checkInTime: "14:00",
    checkOutTime: "11:00",
    cancellationPolicy: "Free cancellation up to 2 days before arrival"
  },
  {
    name: "Bhutan Inbound International Hotel",
    description: "International-standard hotel designed for inbound travelers, offering comprehensive cultural orientation and seamless travel arrangements with modern comfort.",
    location: "Thimphu",
    address: "Thimphu, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "heritage",
    starRating: 4,
    amenities: [
      "International standards",
      "Cultural orientation",
      "Business facilities",
      "Restaurant",
      "Bar",
      "Garden",
      "WiFi",
      "Concierge"
    ],
    features: [
      "International focus",
      "Cultural orientation",
      "Seamless arrangements",
      "Comprehensive service",
      "Modern comfort"
    ],
    pricePerNight: 320,
    contactEmail: "reservations@bhutaninbound.com",
    contactPhone: "+975-2-678901",
    website: "https://www.bhutaninbound.com",
    checkInTime: "15:00",
    checkOutTime: "12:00",
    cancellationPolicy: "Free cancellation up to 1 day before arrival"
  },
  {
    name: "Bhutan Dalam Travels Monastery Guesthouse",
    description: "Sacred monastery guesthouse offering deep spiritual experiences with meditation practices, Buddhist philosophy, and monastic teachings in a serene setting.",
    location: "Bumthang",
    address: "Bumthang Valley, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "spiritual-retreat",
    starRating: 3,
    amenities: [
      "Sacred site access",
      "Meditation sessions",
      "Spiritual guidance",
      "Monastic teachings",
      "Vegetarian meals",
      "Serene setting",
      "WiFi",
      "Traditional heating"
    ],
    features: [
      "Sacred experiences",
      "Meditation practices",
      "Buddhist philosophy",
      "Spiritual guidance",
      "Monastic teachers"
    ],
    pricePerNight: 150,
    contactEmail: "info@bhutandalamtravels.com",
    contactPhone: "+975-3-634567",
    website: "https://www.bhutandalamtravels.com",
    checkInTime: "14:00",
    checkOutTime: "11:00",
    cancellationPolicy: "Free cancellation up to 3 days before arrival"
  },
  {
    name: "Bhutan Tour Planner Custom Villa",
    description: "Fully customizable villa where every detail is tailored to guest preferences, offering personalized service and flexible arrangements for truly individual experiences.",
    location: "Paro",
    address: "Paro Valley, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "custom-villa",
    starRating: 5,
    amenities: [
      "Customized experiences",
      "Personalized service",
      "Flexible arrangements",
      "Private villa",
      "Personal chef",
      "Custom activities",
      "WiFi",
      "Premium amenities"
    ],
    features: [
      "Fully customizable",
      "Personalized service",
      "Tailored experiences",
      "Flexible arrangements",
      "Individual preferences"
    ],
    pricePerNight: 800,
    contactEmail: "reservations@bhutantourplanner.com",
    contactPhone: "+975-8-274567",
    website: "https://www.bhutantourplanner.com",
    checkInTime: "15:00",
    checkOutTime: "11:00",
    cancellationPolicy: "Free cancellation up to 7 days before arrival"
  }
];
var additionalHotelRoomsData = [
  {
    roomType: "standard",
    roomName: "Traditional Room",
    description: "Comfortable traditional room with authentic Bhutanese design elements and modern amenities for a genuine local experience.",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    maxOccupancy: 2,
    bedType: "queen",
    roomSize: "30 sqm",
    amenities: [
      "Traditional design",
      "Modern bathroom",
      "WiFi",
      "Heating",
      "Local experiences",
      "Cultural elements",
      "Garden view",
      "Room service"
    ],
    pricePerNight: 180,
    totalRooms: 15
  },
  {
    roomType: "deluxe",
    roomName: "Heritage Suite",
    description: "Spacious heritage suite featuring traditional Bhutanese architecture with modern luxury amenities and cultural authenticity.",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    maxOccupancy: 3,
    bedType: "king",
    roomSize: "50 sqm",
    amenities: [
      "Heritage architecture",
      "Separate living area",
      "Luxury bathroom",
      "Cultural elements",
      "WiFi",
      "Heating",
      "Garden view",
      "Premium service"
    ],
    pricePerNight: 320,
    totalRooms: 8
  },
  {
    roomType: "suite",
    roomName: "Adventure Suite",
    description: "Adventure-focused suite with equipment storage, planning facilities, and comfortable accommodations for outdoor enthusiasts.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    maxOccupancy: 4,
    bedType: "king",
    roomSize: "60 sqm",
    amenities: [
      "Equipment storage",
      "Planning facilities",
      "Mountain views",
      "Adventure guide access",
      "WiFi",
      "Heating",
      "Safety equipment",
      "Training area"
    ],
    pricePerNight: 280,
    totalRooms: 6
  },
  {
    roomType: "luxury",
    roomName: "Royal Palace Suite",
    description: "Palace-style luxury suite offering royal treatment with exclusive access, private amenities, and dignitary-level service.",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    maxOccupancy: 4,
    bedType: "king",
    roomSize: "120 sqm",
    amenities: [
      "Palace architecture",
      "Royal treatment",
      "Exclusive access",
      "Private butler",
      "Luxury bathroom",
      "VIP services",
      "Royal experiences",
      "Premium amenities"
    ],
    pricePerNight: 1200,
    totalRooms: 2
  },
  {
    roomType: "eco",
    roomName: "Eco-Friendly Room",
    description: "Environmentally conscious room featuring sustainable materials, eco-friendly practices, and harmony with nature.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    maxOccupancy: 2,
    bedType: "queen",
    roomSize: "35 sqm",
    amenities: [
      "Sustainable materials",
      "Eco-friendly practices",
      "Nature views",
      "Organic amenities",
      "Solar power",
      "WiFi",
      "Heating",
      "Conservation activities"
    ],
    pricePerNight: 160,
    totalRooms: 12
  }
];

// server/seed.ts
async function seed() {
  console.log("\u{1F331} Seeding database...");
  try {
    await db.userFeedback.deleteMany();
    await db.hotelBooking.deleteMany();
    await db.festivalBooking.deleteMany();
    await db.hotelRoom.deleteMany();
    await db.hotel.deleteMany();
    await db.festival.deleteMany();
    await db.userAccount.deleteMany();
    await db.blogPost.deleteMany();
    await db.testimonial.deleteMany();
    await db.tour.deleteMany();
    await db.tourOperator.deleteMany();
    const tourOperatorsData = [
      {
        name: "Heavenly Bhutan",
        website: "www.heavenlybhutan.com",
        description: "Specializing in eco-friendly luxury tours with rich local experiences. Known for their sustainable tourism practices and authentic cultural immersion programs.",
        bestFeature: "Eco-friendly luxury tours with rich local experiences",
        specialties: ["Eco-tourism", "Luxury tours", "Cultural immersion", "Sustainable travel"],
        rating: 4.8,
        reviewCount: 245,
        logoUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        contactEmail: "info@heavenlybhutan.com",
        contactPhone: "+975-17617107",
        establishedYear: 2010,
        certifications: ["Bhutan Tourism Board Licensed", "Eco-Tourism Certified"],
        awards: ["Best Eco-Tourism Operator 2023", "Sustainable Travel Award"]
      },
      {
        name: "Druk Asia",
        website: "www.drukasia.com",
        description: "Official representative of Royal Bhutan Airlines with seamless visa processing and high-end private tours. Licensed operator in Bhutan, Singapore, and Malaysia.",
        bestFeature: "Seamless visa processing and high-end private tours",
        specialties: ["Visa processing", "Private tours", "Luxury travel", "Custom itineraries"],
        rating: 4.9,
        reviewCount: 835,
        logoUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        contactEmail: "info@drukasia.com",
        contactPhone: "+65-6223-7684",
        establishedYear: 2005,
        certifications: ["Royal Bhutan Airlines Representative", "Multi-country Licensed"],
        awards: ["TripAdvisor Travelers' Choice", "Excellence in Service Award"]
      },
      {
        name: "Bhutan Peaceful Tour",
        website: "www.bhutanpeacefultour.com",
        description: "Offering personalized cultural and spiritual journeys with deep focus on meditation, mindfulness, and Buddhist philosophy.",
        bestFeature: "Personalized cultural and spiritual journeys",
        specialties: ["Spiritual tours", "Meditation retreats", "Cultural experiences", "Buddhist philosophy"],
        rating: 4.9,
        reviewCount: 312,
        logoUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        contactEmail: "info@bhutanpeacefultour.com",
        contactPhone: "+975-2-323456",
        establishedYear: 2008,
        certifications: ["Spiritual Tourism Certified", "Buddhist Guide Licensed"],
        awards: ["Best Spiritual Tour Operator", "Mindfulness Travel Excellence"]
      },
      {
        name: "Wind Horse Tours",
        website: "www.windhorsetours.com",
        description: "Extensive trekking, festival, and wildlife options with expert guides and comprehensive adventure packages.",
        bestFeature: "Extensive trekking, festival, and wildlife options",
        specialties: ["Trekking", "Festival tours", "Wildlife expeditions", "Adventure travel"],
        rating: 4.7,
        reviewCount: 567,
        logoUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        contactEmail: "info@windhorsetours.com",
        contactPhone: "+975-2-334567",
        establishedYear: 2003,
        certifications: ["Adventure Tourism Licensed", "Wildlife Guide Certified"],
        awards: ["Best Adventure Operator", "Trekking Excellence Award"]
      },
      {
        name: "Keys to Bhutan",
        website: "www.keystobhutan.com",
        description: "Custom-designed trips with deep local insight, offering unique access to hidden gems and authentic experiences.",
        bestFeature: "Custom-designed trips with deep local insight",
        specialties: ["Custom tours", "Local insights", "Hidden gems", "Authentic experiences"],
        rating: 4.8,
        reviewCount: 423,
        logoUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        contactEmail: "info@keystobhutan.com",
        contactPhone: "+975-2-345678",
        establishedYear: 2012,
        certifications: ["Custom Tour Specialist", "Local Heritage Guide"],
        awards: ["Innovation in Tourism", "Authentic Experience Award"]
      },
      {
        name: "Bhutan Swallowtail",
        website: "www.bhutanswallowtail.com",
        description: "Luxury bespoke tours and hidden gem experiences with premium accommodations and exclusive access.",
        bestFeature: "Luxury bespoke tours and hidden gem experiences",
        specialties: ["Luxury tours", "Bespoke experiences", "Premium accommodations", "Exclusive access"],
        rating: 4.9,
        reviewCount: 289,
        logoUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        contactEmail: "info@bhutanswallowtail.com",
        contactPhone: "+975-2-356789",
        establishedYear: 2015,
        certifications: ["Luxury Tourism Certified", "Premium Service Provider"],
        awards: ["Luxury Travel Award", "Excellence in Bespoke Travel"]
      }
    ];
    const createdOperators = await Promise.all(
      tourOperatorsData.map((operator) => db.tourOperator.create({ data: operator }))
    );
    const allToursData = [...enhancedToursData, ...additionalToursData];
    const toursData = allToursData.map((tour, index) => ({
      ...tour,
      tourOperatorId: createdOperators[index % createdOperators.length].id
    }));
    await db.tour.createMany({
      data: toursData
    });
    const allHotelsData = [...enhancedHotelsData, ...additionalHotelsData];
    const hotelsData = allHotelsData;
    const createdHotels = await Promise.all(
      hotelsData.map((hotel) => db.hotel.create({ data: hotel }))
    );
    const allHotelRoomsData = [...enhancedHotelRoomsData, ...additionalHotelRoomsData];
    const hotelRoomsData = allHotelRoomsData.map((room, index) => ({
      ...room,
      hotelId: createdHotels[index % createdHotels.length].id
    }));
    await db.hotelRoom.createMany({
      data: hotelRoomsData
    });
    const festivalsData = enhancedFestivalsData;
    await db.festival.createMany({
      data: festivalsData
    });
    const testimonialsData = [
      {
        name: "Sarah Mitchell",
        country: "Australia",
        imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b830?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        text: "The eco-luxury experience with Heavenly Bhutan was transformative. Staying in sustainable accommodations while experiencing authentic culture was perfect. The organic farm visits and carbon-neutral transportation showed their commitment to responsible tourism.",
        rating: 5,
        tripName: "Eco-Luxury Cultural Immersion",
        duration: "8 days",
        isActive: true
      },
      {
        name: "James Chen",
        country: "Singapore",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        text: "Druk Asia's visa processing was seamless and their private tour exceeded all expectations. The luxury vehicles, exclusive access, and personal service made us feel like royalty. Worth every penny!",
        rating: 5,
        tripName: "Royal Bhutan Private Experience",
        duration: "10 days",
        isActive: true
      },
      {
        name: "Maria Rodriguez",
        country: "Spain",
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        text: "The meditation retreat with Bhutan Peaceful Tour was life-changing. The daily meditation sessions, Buddhist philosophy classes, and spiritual guidance helped me find inner peace I never knew existed.",
        rating: 5,
        tripName: "Mindfulness & Meditation Retreat",
        duration: "14 days",
        isActive: true
      },
      {
        name: "David Thompson",
        country: "United Kingdom",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        text: "Wind Horse Tours organized an incredible trek to Jomolhari base camp. The guides were professional, the equipment top-notch, and the mountain views absolutely breathtaking. A challenging but rewarding adventure!",
        rating: 5,
        tripName: "Jomolhari Base Camp Trek",
        duration: "16 days",
        isActive: true
      },
      {
        name: "Emma Wilson",
        country: "Canada",
        imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b830?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        text: "Keys to Bhutan showed us the hidden gems of Eastern Bhutan that no other tour operator covers. The remote village visits and authentic rural experiences were unforgettable. Truly off the beaten path!",
        rating: 5,
        tripName: "Hidden Gems Discovery",
        duration: "10 days",
        isActive: true
      },
      {
        name: "Robert Kim",
        country: "South Korea",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        text: "Bhutan Swallowtail's luxury experience was beyond our wildest dreams. The helicopter transfers, ultra-luxury accommodations, and personal butler service made this the trip of a lifetime. Absolutely worth the investment!",
        rating: 5,
        tripName: "Ultimate Luxury Bhutan",
        duration: "14 days",
        isActive: true
      },
      {
        name: "Lisa Anderson",
        country: "United States",
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        text: "The family experience was perfect for our group. The personalized attention, home-cooked meals, and intimate cultural exchanges made us feel like part of a Bhutanese family.",
        rating: 5,
        tripName: "Bespoke Family Adventure",
        duration: "9 days",
        isActive: true
      },
      {
        name: "Michael Brown",
        country: "New Zealand",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        text: "The festival tour was incredible! We experienced multiple traditional festivals with masked dances and colorful celebrations. The cultural immersion was authentic and deeply moving.",
        rating: 5,
        tripName: "Festival & Culture Adventure",
        duration: "11 days",
        isActive: true
      },
      {
        name: "Sophie Martin",
        country: "France",
        imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b830?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        text: "The photography expedition was a dream come true. Expert guidance, exclusive locations, and stunning landscapes made for incredible shots. The portfolio review was invaluable!",
        rating: 5,
        tripName: "Photography Expedition",
        duration: "12 days",
        isActive: true
      },
      {
        name: "Alex Johnson",
        country: "Germany",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        text: "The wellness retreat was exactly what I needed. Traditional healing practices, yoga sessions, and serene mountain settings helped me find balance and rejuvenation.",
        rating: 5,
        tripName: "Wellness & Healing Retreat",
        duration: "10 days",
        isActive: true
      }
    ];
    await db.testimonial.createMany({
      data: testimonialsData
    });
    const blogPostsData = [
      {
        title: "Ultimate Guide to Bhutan's Sacred Festivals",
        content: "Discover the spiritual significance and cultural richness of Bhutan's most important festivals, from the grand Paro Tshechu to the sacred Jambay Lhakhang Drup...",
        excerpt: "Explore the spiritual significance and cultural richness of Bhutan's most important festivals.",
        author: "Bhutan Travel Expert",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Culture",
        readTime: "8 min",
        isPublished: true
      },
      {
        title: "Luxury Travel in Bhutan: Beyond the Ordinary",
        content: "Experience the pinnacle of luxury travel in Bhutan with exclusive accommodations, private helicopter transfers, and personalized service that goes beyond expectations...",
        excerpt: "Experience the pinnacle of luxury travel in Bhutan with exclusive accommodations and personalized service.",
        author: "Luxury Travel Specialist",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Luxury",
        readTime: "6 min",
        isPublished: true
      },
      {
        title: "Sustainable Tourism: Bhutan's Green Revolution",
        content: "Learn how Bhutan leads the world in sustainable tourism with carbon-neutral operations, community-based tourism, and environmental conservation initiatives...",
        excerpt: "Learn how Bhutan leads the world in sustainable tourism with carbon-neutral operations.",
        author: "Sustainability Expert",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Sustainability",
        readTime: "7 min",
        isPublished: true
      },
      {
        title: "Adventure Photography in the Himalayas",
        content: "Capture stunning landscapes and cultural moments in Bhutan with expert photography guidance and access to exclusive shooting locations...",
        excerpt: "Capture stunning landscapes and cultural moments in Bhutan with expert photography guidance.",
        author: "Professional Photographer",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Photography",
        readTime: "9 min",
        isPublished: true
      },
      {
        title: "Wellness and Healing: Bhutan's Ancient Traditions",
        content: "Discover traditional Bhutanese healing practices, meditation techniques, and wellness programs that promote physical and spiritual well-being...",
        excerpt: "Discover traditional Bhutanese healing practices and wellness programs.",
        author: "Wellness Expert",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Wellness",
        readTime: "8 min",
        isPublished: true
      },
      {
        title: "Family Adventures in the Land of the Thunder Dragon",
        content: "Plan the perfect family vacation in Bhutan with educational experiences, cultural immersion, and adventure activities suitable for all ages...",
        excerpt: "Plan the perfect family vacation in Bhutan with educational experiences and cultural immersion.",
        author: "Family Travel Expert",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Family",
        readTime: "7 min",
        isPublished: true
      }
    ];
    await db.blogPost.createMany({
      data: blogPostsData
    });
    const userAccountsData = [
      {
        email: "admin@bhutantours.com",
        password: "admin123",
        firstName: "Admin",
        lastName: "User",
        role: "admin",
        phone: "+975-2-123456",
        isActive: true
      },
      {
        email: "guide@bhutantours.com",
        password: "guide123",
        firstName: "Tenzin",
        lastName: "Dorji",
        role: "guide",
        phone: "+975-17-123456",
        isActive: true
      },
      {
        email: "driver@bhutantours.com",
        password: "driver123",
        firstName: "Karma",
        lastName: "Wangchuk",
        role: "driver",
        phone: "+975-17-234567",
        isActive: true
      },
      {
        email: "tourist@example.com",
        password: "tourist123",
        firstName: "John",
        lastName: "Smith",
        role: "tourist",
        phone: "+1-555-123-4567",
        isActive: true
      }
    ];
    await db.userAccount.createMany({
      data: userAccountsData
    });
    console.log("\u2705 Database seeded successfully!");
    console.log("\u{1F4CA} Created", createdOperators.length, "tour operators");
    console.log("\u{1F3AF} Created", toursData.length, "tours");
    console.log("\u{1F4AC} Created", testimonialsData.length, "testimonials");
    console.log("\u{1F4DD} Created", blogPostsData.length, "blog posts");
    console.log("\u{1F389} Created", festivalsData.length, "festivals");
    console.log("\u{1F3E8} Created", hotelsData.length, "hotels");
    console.log("\u{1F6CF}\uFE0F Created", hotelRoomsData.length, "hotel rooms");
  } catch (error) {
    console.error("\u274C Error seeding database:", error);
    throw error;
  }
}
seed().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await db.$disconnect();
});

// server/storage.ts
var MemStorage = class {
  users;
  tours;
  bookings;
  inquiries;
  testimonials;
  blogPosts;
  guides;
  itineraries;
  itineraryDays;
  customTourRequests;
  festivals;
  currentUserId;
  currentTourId;
  currentBookingId;
  currentInquiryId;
  currentTestimonialId;
  currentBlogPostId;
  currentGuideId;
  currentItineraryId;
  currentItineraryDayId;
  currentCustomTourRequestId;
  currentFestivalId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.tours = /* @__PURE__ */ new Map();
    this.bookings = /* @__PURE__ */ new Map();
    this.inquiries = /* @__PURE__ */ new Map();
    this.testimonials = /* @__PURE__ */ new Map();
    this.blogPosts = /* @__PURE__ */ new Map();
    this.guides = /* @__PURE__ */ new Map();
    this.itineraries = /* @__PURE__ */ new Map();
    this.itineraryDays = /* @__PURE__ */ new Map();
    this.customTourRequests = /* @__PURE__ */ new Map();
    this.festivals = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentTourId = 1;
    this.currentBookingId = 1;
    this.currentInquiryId = 1;
    this.currentTestimonialId = 1;
    this.currentBlogPostId = 1;
    this.currentGuideId = 1;
    this.currentItineraryId = 1;
    this.currentItineraryDayId = 1;
    this.currentCustomTourRequestId = 1;
    this.currentFestivalId = 1;
    this.initializeData();
  }
  initializeData() {
    const sampleTours = [
      {
        name: "Cultural Immersion Experience",
        description: "Deep dive into Bhutanese culture with monastery visits, traditional ceremonies, and authentic local experiences.",
        duration: 10,
        price: 2450,
        category: "cultural",
        imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
        rating: 4.9,
        reviewCount: 24,
        highlights: ["Monastery Visits", "Traditional Ceremonies", "Local Family Stay"],
        isActive: true
      },
      {
        name: "Himalayan Trek Adventure",
        description: "Challenge yourself with breathtaking treks to Tiger's Nest and remote mountain villages.",
        duration: 14,
        price: 3200,
        category: "adventure",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        rating: 4.8,
        reviewCount: 18,
        highlights: ["Tiger's Nest Trek", "High Altitude Adventure", "Mountain Villages"],
        isActive: true
      },
      {
        name: "Spiritual Awakening Journey",
        description: "Find inner peace through meditation retreats, mindfulness training, and spiritual teachings.",
        duration: 7,
        price: 1890,
        category: "spiritual",
        imageUrl: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&h=600&fit=crop",
        rating: 5,
        reviewCount: 31,
        highlights: ["Meditation Retreats", "Spiritual Teachings", "Mindfulness Training"],
        isActive: true
      },
      {
        name: "Photography Expedition",
        description: "Capture Bhutan's beauty with professional guidance and access to the most photogenic locations.",
        duration: 12,
        price: 2800,
        category: "photography",
        imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
        rating: 4.7,
        reviewCount: 15,
        highlights: ["Professional Guidance", "Exclusive Locations", "Photo Workshops"],
        isActive: true
      },
      {
        name: "Wellness & Happiness Tour",
        description: "Experience Bhutan's Gross National Happiness philosophy through wellness practices and cultural immersion.",
        duration: 8,
        price: 2150,
        category: "spiritual",
        imageUrl: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&h=600&fit=crop",
        rating: 4.9,
        reviewCount: 22,
        highlights: ["Happiness Philosophy", "Wellness Practices", "Cultural Immersion"],
        isActive: true
      },
      {
        name: "Royal Heritage Tour",
        description: "Exclusive access to royal palaces, private audiences, and premium accommodations in luxury resorts.",
        duration: 9,
        price: 4500,
        category: "cultural",
        imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
        rating: 5,
        reviewCount: 12,
        highlights: ["Royal Palaces", "Private Audiences", "Luxury Accommodations"],
        isActive: true
      },
      {
        name: "Laya Gasa Trek",
        duration: 14,
        price: 3800,
        category: "trekking",
        imageUrl: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop",
        rating: 4.9,
        reviewCount: 12,
        highlights: ["Laya Village", "Gasa Hot Springs", "Stunning Himalayan Views", "Diverse Flora and Fauna"],
        isActive: true
      },
      {
        name: "Bhutan Birding Tour",
        duration: 10,
        price: 2800,
        category: "birdwatching",
        imageUrl: "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=800&h=600&fit=crop",
        rating: 4.8,
        reviewCount: 8,
        highlights: ["Spotting rare birds", "Phobjikha Valley", "Jigme Dorji National Park", "Expert Ornithologist Guide"],
        isActive: true
      },
      {
        name: "Western Bhutan Cycling Tour",
        duration: 8,
        price: 2200,
        category: "cycling",
        imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
        rating: 4.7,
        reviewCount: 10,
        highlights: ["Cycling over Dochula Pass", "Punakha Dzong", "Thimphu city ride", "Support vehicle included"],
        isActive: true
      }
    ];
    sampleTours.forEach((tour) => this.createTour(tour));
    const sampleTestimonials = [
      {
        name: "Sarah Mitchell",
        country: "Australia",
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        text: "Bhutan changed my perspective on life. The team at Bhutan Mind Break didn't just show us temples\u2014they showed us a way of being. The meditation sessions with Karma were life-changing.",
        rating: 5,
        tripName: "Cultural Immersion Tour",
        duration: "10 days",
        isActive: true
      },
      {
        name: "Marcus Weber",
        country: "Germany",
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        text: "The Tiger's Nest trek was incredible, but what made it special was understanding its spiritual significance through our guide's eyes. Pema's knowledge of the terrain was exceptional.",
        rating: 5,
        tripName: "Himalayan Trek",
        duration: "14 days",
        isActive: true
      },
      {
        name: "Yuki Tanaka",
        country: "Japan",
        imageUrl: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop",
        text: "I've traveled to 50+ countries, but Bhutan's happiness philosophy and this team's genuine warmth was truly unique. Every day brought new insights into mindful living.",
        rating: 5,
        tripName: "Happiness & Wellness Journey",
        duration: "7 days",
        isActive: true
      }
    ];
    sampleTestimonials.forEach((testimonial) => this.createTestimonial(testimonial));
    const sampleBlogPosts = [
      {
        title: "Understanding Bhutan's Gross National Happiness",
        excerpt: "Discover how Bhutan measures progress not just in economic terms, but through the holistic well-being of its people and environment.",
        content: "Full article content here...",
        imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop",
        category: "Culture",
        author: "Tenzin Norbu",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
        readTime: "5 min read",
        isPublished: true
      },
      {
        title: "Essential Gear for Himalayan Trekking",
        excerpt: "A comprehensive guide to packing for high-altitude adventures in Bhutan, from base layers to emergency supplies.",
        content: "Full article content here...",
        imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop",
        category: "Adventure",
        author: "Pema Choden",
        authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop",
        readTime: "8 min read",
        isPublished: true
      },
      {
        title: "A Culinary Journey Through Bhutan",
        excerpt: "From fiery ema datshi to traditional butter tea, explore the unique flavors that define Bhutanese cuisine and culture.",
        content: "Full article content here...",
        imageUrl: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&h=400&fit=crop",
        category: "Food",
        author: "Karma Wangchuk",
        authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop",
        readTime: "6 min read",
        isPublished: true
      }
    ];
    sampleBlogPosts.forEach((post) => this.createBlogPost(post));
    const sampleFestivals = [
      {
        name: "Laya Yak Festival",
        description: "A unique festival celebrating the culture of the nomadic people of Laya, featuring yak parades, traditional sports, and cultural performances.",
        location: "Laya, Gasa",
        startDate: "2025-10-23",
        endDate: "2025-10-24",
        imageUrl: "https://images.unsplash.com/photo-1604792136432-91b57c2055b4?w=800&h=600&fit=crop",
        category: "cultural",
        highlights: ["Yak Beauty Pageant", "Traditional Songs and Dances", "Local Handicrafts"],
        isActive: true,
        ticketPrice: 50,
        maxCapacity: 200
      },
      {
        name: "Thimphu Tshechu",
        description: "One of the biggest festivals in Bhutan, held in the capital city of Thimphu. It features colorful mask dances and religious ceremonies.",
        location: "Thimphu",
        startDate: "2025-09-08",
        endDate: "2025-09-10",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        category: "religious",
        highlights: ["Mask Dances (Chhams)", "Atsara (clown) performances", "Religious Blessings"],
        isActive: true,
        ticketPrice: null,
        maxCapacity: null
      },
      {
        name: "Paro Tshechu",
        description: "A popular festival in the beautiful Paro valley, known for the unfurling of the giant Thongdrel (religious scroll) on the last day.",
        location: "Paro",
        startDate: "2026-03-27",
        endDate: "2026-03-31",
        imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
        category: "religious",
        highlights: ["Unfurling of the Thongdrel", "Sacred Mask Dances", "Large Crowds"],
        isActive: true,
        ticketPrice: null,
        maxCapacity: null
      }
    ];
    sampleFestivals.forEach((festival) => this.createFestival(festival));
  }
  // User methods
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Tour methods
  async getAllTours() {
    return Array.from(this.tours.values()).filter((tour) => tour.isActive);
  }
  async getToursByCategory(category) {
    return Array.from(this.tours.values()).filter(
      (tour) => tour.isActive && tour.category === category
    );
  }
  async getTour(id) {
    return this.tours.get(id);
  }
  async createTour(insertTour) {
    const id = this.currentTourId++;
    const tour = {
      ...insertTour,
      id,
      isActive: insertTour.isActive ?? true,
      includes: insertTour.includes ?? [],
      excludes: insertTour.excludes ?? [],
      rating: insertTour.rating ?? 5,
      reviewCount: insertTour.reviewCount ?? 0,
      highlights: insertTour.highlights ?? [],
      maxGroupSize: insertTour.maxGroupSize ?? 12,
      difficulty: insertTour.difficulty ?? "Moderate",
      bestSeason: insertTour.bestSeason ?? "Spring",
      tourOperatorId: insertTour.tourOperatorId ?? null
    };
    this.tours.set(id, tour);
    return tour;
  }
  // Booking methods
  async getAllBookings() {
    return Array.from(this.bookings.values());
  }
  async getBooking(id) {
    return this.bookings.get(id);
  }
  async createBooking(insertBooking) {
    const id = this.currentBookingId++;
    const booking = {
      ...insertBooking,
      id,
      phone: insertBooking.phone ?? null,
      specialRequests: insertBooking.specialRequests ?? null,
      status: "pending",
      createdAt: /* @__PURE__ */ new Date()
    };
    this.bookings.set(id, booking);
    return booking;
  }
  async updateBookingStatus(id, status) {
    const booking = this.bookings.get(id);
    if (booking) {
      booking.status = status;
      this.bookings.set(id, booking);
      return booking;
    }
    return void 0;
  }
  // Inquiry methods
  async getAllInquiries() {
    return Array.from(this.inquiries.values());
  }
  async getInquiry(id) {
    return this.inquiries.get(id);
  }
  async createInquiry(insertInquiry) {
    const id = this.currentInquiryId++;
    const inquiry = {
      ...insertInquiry,
      id,
      phone: insertInquiry.phone ?? null,
      tourInterest: insertInquiry.tourInterest ?? null,
      preferredDates: insertInquiry.preferredDates ?? null,
      groupSize: insertInquiry.groupSize ?? null,
      message: insertInquiry.message ?? null,
      status: "new",
      createdAt: /* @__PURE__ */ new Date()
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }
  // Testimonial methods
  async getAllTestimonials() {
    return Array.from(this.testimonials.values());
  }
  async getActiveTestimonials() {
    return Array.from(this.testimonials.values()).filter((testimonial) => testimonial.isActive);
  }
  async createTestimonial(insertTestimonial) {
    const id = this.currentTestimonialId++;
    const testimonial = {
      ...insertTestimonial,
      id,
      isActive: insertTestimonial.isActive ?? true
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  // Blog post methods
  async getAllBlogPosts() {
    return Array.from(this.blogPosts.values());
  }
  async getPublishedBlogPosts() {
    return Array.from(this.blogPosts.values()).filter((post) => post.isPublished);
  }
  async getBlogPost(id) {
    return this.blogPosts.get(id);
  }
  async createBlogPost(insertBlogPost) {
    const id = this.currentBlogPostId++;
    const blogPost = {
      ...insertBlogPost,
      id,
      publishedAt: /* @__PURE__ */ new Date(),
      isPublished: insertBlogPost.isPublished ?? true
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }
  // Guide methods
  async getAllGuides() {
    return Array.from(this.guides.values());
  }
  async getGuide(id) {
    return this.guides.get(id);
  }
  async createGuide(guide) {
    const id = this.currentGuideId++;
    const newGuide = {
      ...guide,
      id,
      specializations: guide.specializations ?? [],
      status: "not_assigned",
      createdAt: /* @__PURE__ */ new Date()
    };
    this.guides.set(id, newGuide);
    return newGuide;
  }
  async updateGuideStatus(id, status) {
    const guide = this.guides.get(id);
    if (guide) {
      guide.status = status;
      return guide;
    }
    return void 0;
  }
  async getAvailableGuides(type) {
    return Array.from(this.guides.values()).filter((guide) => guide.registrationType === type);
  }
  // Itinerary methods
  async getAllItineraries() {
    return Array.from(this.itineraries.values());
  }
  async getItinerary(id) {
    return this.itineraries.get(id);
  }
  async createItinerary(itinerary) {
    const id = this.currentItineraryId++;
    const newItinerary = {
      ...itinerary,
      id,
      description: itinerary.description ?? null,
      startDate: typeof itinerary.startDate === "string" ? new Date(itinerary.startDate) : itinerary.startDate,
      endDate: typeof itinerary.endDate === "string" ? new Date(itinerary.endDate) : itinerary.endDate,
      guideId: itinerary.guideId ?? null,
      driverId: itinerary.driverId ?? null,
      maxParticipants: itinerary.maxParticipants ?? 12,
      currentParticipants: 0,
      status: "active",
      createdAt: /* @__PURE__ */ new Date()
    };
    this.itineraries.set(id, newItinerary);
    return newItinerary;
  }
  async updateItinerary(id, updates) {
    const itinerary = this.itineraries.get(id);
    if (itinerary) {
      Object.assign(itinerary, updates);
      return itinerary;
    }
    return void 0;
  }
  async deleteItinerary(id) {
    return this.itineraries.delete(id);
  }
  // Itinerary Days methods
  async getItineraryDays(itineraryId) {
    return Array.from(this.itineraryDays.values()).filter((day) => day.itineraryId === itineraryId);
  }
  async createItineraryDay(day) {
    const id = this.currentItineraryDayId++;
    const newDay = {
      ...day,
      id,
      activities: day.activities ?? [],
      accommodation: day.accommodation ?? null,
      meals: day.meals ?? [],
      transportation: day.transportation ?? null,
      notes: day.notes ?? null
    };
    this.itineraryDays.set(id, newDay);
    return newDay;
  }
  async updateItineraryDay(id, updates) {
    const day = this.itineraryDays.get(id);
    if (day) {
      Object.assign(day, updates);
      return day;
    }
    return void 0;
  }
  async deleteItineraryDay(id) {
    return this.itineraryDays.delete(id);
  }
  // Custom Tour Request methods
  async getAllCustomTourRequests() {
    return Array.from(this.customTourRequests.values());
  }
  async getCustomTourRequest(id) {
    return this.customTourRequests.get(id);
  }
  async createCustomTourRequest(request) {
    const id = this.currentCustomTourRequestId++;
    const newRequest = {
      ...request,
      id,
      phone: request.phone ?? null,
      budget: request.budget ?? null,
      interests: request.interests ?? [],
      preferredDates: request.preferredDates ?? null,
      specialRequirements: request.specialRequirements ?? null,
      destinations: request.destinations ?? [],
      accommodationType: request.accommodationType ?? null,
      transportPreference: request.transportPreference ?? null,
      status: "pending",
      adminNotes: null,
      estimatedPrice: null,
      assignedItineraryId: null,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.customTourRequests.set(id, newRequest);
    return newRequest;
  }
  async updateCustomTourRequest(id, updates) {
    const request = this.customTourRequests.get(id);
    if (request) {
      Object.assign(request, updates);
      return request;
    }
    return void 0;
  }
  // Festival methods
  async getAllFestivals() {
    return Array.from(this.festivals.values());
  }
  async getActiveFestivals() {
    return Array.from(this.festivals.values()).filter((festival) => festival.isActive);
  }
  async getFestival(id) {
    return this.festivals.get(id);
  }
  async createFestival(insertFestival) {
    const id = this.currentFestivalId++;
    const festival = {
      ...insertFestival,
      id,
      isActive: insertFestival.isActive ?? true,
      ticketPrice: insertFestival.ticketPrice ?? null,
      maxCapacity: insertFestival.maxCapacity ?? null
    };
    this.festivals.set(id, festival);
    return festival;
  }
  async updateFestival(id, updates) {
    const festival = this.festivals.get(id);
    if (festival) {
      Object.assign(festival, updates);
      return festival;
    }
    return void 0;
  }
  async deleteFestival(id) {
    return this.festivals.delete(id);
  }
  // Festival Booking methods (stub implementations)
  async getAllFestivalBookings() {
    return [];
  }
  async getFestivalBooking(id) {
    return void 0;
  }
  async createFestivalBooking(booking) {
    throw new Error("Festival booking not implemented in MemStorage");
  }
  async updateFestivalBookingStatus(id, status) {
    return void 0;
  }
  // Hotel methods (stub implementations)
  async getAllHotels() {
    return [];
  }
  async getActiveHotels() {
    return [];
  }
  async getHotel(id) {
    return void 0;
  }
  async createHotel(hotel) {
    throw new Error("Hotel management not implemented in MemStorage");
  }
  async updateHotel(id, updates) {
    return void 0;
  }
  async deleteHotel(id) {
    return false;
  }
  // Hotel Room methods (stub implementations)
  async getHotelRooms(hotelId) {
    return [];
  }
  async getHotelRoom(id) {
    return void 0;
  }
  async createHotelRoom(room) {
    throw new Error("Hotel room management not implemented in MemStorage");
  }
  async updateHotelRoom(id, updates) {
    return void 0;
  }
  async deleteHotelRoom(id) {
    return false;
  }
  // Hotel Booking methods (stub implementations)
  async getAllHotelBookings() {
    return [];
  }
  async getHotelBooking(id) {
    return void 0;
  }
  async createHotelBooking(booking) {
    throw new Error("Hotel booking not implemented in MemStorage");
  }
  async updateHotelBookingStatus(id, status) {
    return void 0;
  }
  // User Account methods (stub implementations)
  async getAllUserAccounts() {
    return [];
  }
  async getUserAccount(id) {
    return void 0;
  }
  async getUserAccountByEmail(email) {
    return void 0;
  }
  async createUserAccount(user) {
    throw new Error("User account management not implemented in MemStorage");
  }
  async updateUserAccount(id, updates) {
    return void 0;
  }
  async updateUserLastLogin(id) {
    return void 0;
  }
  // User Feedback methods (stub implementations)
  async getAllUserFeedback() {
    return [];
  }
  async getUserFeedback(id) {
    return void 0;
  }
  async getUserFeedbackByUser(userId) {
    return [];
  }
  async getPublicFeedback() {
    return [];
  }
  async createUserFeedback(feedback) {
    throw new Error("User feedback not implemented in MemStorage");
  }
  async updateUserFeedback(id, updates) {
    return void 0;
  }
};
var DatabaseStorage = class {
  async getUser(id) {
    const user = await db.user.findUnique({
      where: { id }
    });
    return user || void 0;
  }
  async getUserByUsername(username) {
    const user = await db.user.findUnique({
      where: { username }
    });
    return user || void 0;
  }
  async createUser(insertUser) {
    return await db.user.create({
      data: insertUser
    });
  }
  async getAllTours() {
    return await db.tour.findMany({
      where: { isActive: true }
    });
  }
  async getToursByCategory(category) {
    return await db.tour.findMany({
      where: {
        category,
        isActive: true
      }
    });
  }
  async getTour(id) {
    const tour = await db.tour.findUnique({
      where: { id }
    });
    return tour || void 0;
  }
  async createTour(insertTour) {
    return await db.tour.create({
      data: insertTour
    });
  }
  async getAllBookings() {
    return await db.booking.findMany({
      orderBy: { createdAt: "desc" }
    });
  }
  async getBooking(id) {
    const booking = await db.booking.findUnique({
      where: { id }
    });
    return booking || void 0;
  }
  async createBooking(insertBooking) {
    return await db.booking.create({
      data: insertBooking
    });
  }
  async updateBookingStatus(id, status) {
    try {
      const booking = await db.booking.update({
        where: { id },
        data: { status }
      });
      return booking;
    } catch (error) {
      return void 0;
    }
  }
  async getAllInquiries() {
    return await db.inquiry.findMany({
      orderBy: { createdAt: "desc" }
    });
  }
  async getInquiry(id) {
    const inquiry = await db.inquiry.findUnique({
      where: { id }
    });
    return inquiry || void 0;
  }
  async createInquiry(insertInquiry) {
    return await db.inquiry.create({
      data: insertInquiry
    });
  }
  async getAllTestimonials() {
    return await db.testimonial.findMany();
  }
  async getActiveTestimonials() {
    return await db.testimonial.findMany({
      where: { isActive: true }
    });
  }
  async createTestimonial(insertTestimonial) {
    return await db.testimonial.create({
      data: insertTestimonial
    });
  }
  async getAllBlogPosts() {
    return await db.blogPost.findMany({
      orderBy: { publishedAt: "desc" }
    });
  }
  async getPublishedBlogPosts() {
    return await db.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" }
    });
  }
  async getBlogPost(id) {
    const post = await db.blogPost.findUnique({
      where: { id }
    });
    return post || void 0;
  }
  async createBlogPost(insertBlogPost) {
    return await db.blogPost.create({
      data: insertBlogPost
    });
  }
  // Guide Management
  async getAllGuides() {
    return await db.guide.findMany({
      orderBy: { createdAt: "desc" }
    });
  }
  async getGuide(id) {
    const guide = await db.guide.findUnique({
      where: { id }
    });
    return guide || void 0;
  }
  async createGuide(guide) {
    return await db.guide.create({
      data: guide
    });
  }
  async updateGuideStatus(id, status) {
    try {
      const guide = await db.guide.update({
        where: { id },
        data: { status }
      });
      return guide;
    } catch (error) {
      return void 0;
    }
  }
  async getAvailableGuides(type) {
    return await db.guide.findMany({
      where: { registrationType: type },
      orderBy: { createdAt: "desc" }
    });
  }
  // Itinerary Management
  async getAllItineraries() {
    return await db.itinerary.findMany({
      orderBy: { createdAt: "desc" }
    });
  }
  async getItinerary(id) {
    const itinerary = await db.itinerary.findUnique({
      where: { id }
    });
    return itinerary || void 0;
  }
  async createItinerary(itinerary) {
    const data = {
      ...itinerary,
      startDate: typeof itinerary.startDate === "string" ? new Date(itinerary.startDate) : itinerary.startDate,
      endDate: typeof itinerary.endDate === "string" ? new Date(itinerary.endDate) : itinerary.endDate
    };
    return await db.itinerary.create({
      data
    });
  }
  async updateItinerary(id, updates) {
    try {
      const itinerary = await db.itinerary.update({
        where: { id },
        data: updates
      });
      return itinerary;
    } catch (error) {
      return void 0;
    }
  }
  async deleteItinerary(id) {
    try {
      await db.itinerary.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }
  // Itinerary Days Management
  async getItineraryDays(itineraryId) {
    return await db.itineraryDay.findMany({
      where: { itineraryId },
      orderBy: { dayNumber: "asc" }
    });
  }
  async createItineraryDay(day) {
    return await db.itineraryDay.create({
      data: day
    });
  }
  async updateItineraryDay(id, updates) {
    try {
      const day = await db.itineraryDay.update({
        where: { id },
        data: updates
      });
      return day;
    } catch (error) {
      return void 0;
    }
  }
  async deleteItineraryDay(id) {
    try {
      await db.itineraryDay.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }
  // Custom Tour Requests Management
  async getAllCustomTourRequests() {
    return await db.customTourRequest.findMany({
      orderBy: { createdAt: "desc" }
    });
  }
  async getCustomTourRequest(id) {
    const request = await db.customTourRequest.findUnique({
      where: { id }
    });
    return request || void 0;
  }
  async createCustomTourRequest(request) {
    return await db.customTourRequest.create({
      data: request
    });
  }
  async updateCustomTourRequest(id, updates) {
    try {
      const request = await db.customTourRequest.update({
        where: { id },
        data: updates
      });
      return request;
    } catch (error) {
      return void 0;
    }
  }
  // Festival Management
  async getAllFestivals() {
    return await db.festival.findMany({
      orderBy: { startDate: "asc" }
    });
  }
  async getActiveFestivals() {
    return await db.festival.findMany({
      where: { isActive: true },
      orderBy: { startDate: "asc" }
    });
  }
  async getFestival(id) {
    const festival = await db.festival.findUnique({
      where: { id }
    });
    return festival || void 0;
  }
  async createFestival(festival) {
    const data = {
      ...festival,
      startDate: typeof festival.startDate === "string" ? new Date(festival.startDate) : festival.startDate,
      endDate: typeof festival.endDate === "string" ? new Date(festival.endDate) : festival.endDate
    };
    return await db.festival.create({
      data
    });
  }
  async updateFestival(id, updates) {
    try {
      const festival = await db.festival.update({
        where: { id },
        data: updates
      });
      return festival;
    } catch (error) {
      return void 0;
    }
  }
  async deleteFestival(id) {
    try {
      await db.festival.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }
  // Festival Booking Management
  async getAllFestivalBookings() {
    return await db.festivalBooking.findMany({
      orderBy: { createdAt: "desc" },
      include: { festival: true }
    });
  }
  async getFestivalBooking(id) {
    const booking = await db.festivalBooking.findUnique({
      where: { id },
      include: { festival: true }
    });
    return booking || void 0;
  }
  async createFestivalBooking(booking) {
    return await db.festivalBooking.create({
      data: booking
    });
  }
  async updateFestivalBookingStatus(id, status) {
    try {
      const booking = await db.festivalBooking.update({
        where: { id },
        data: { status }
      });
      return booking;
    } catch (error) {
      return void 0;
    }
  }
  // Hotel Management
  async getAllHotels() {
    return await db.hotel.findMany({
      orderBy: { createdAt: "desc" }
    });
  }
  async getActiveHotels() {
    return await db.hotel.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" }
    });
  }
  async getHotel(id) {
    const hotel = await db.hotel.findUnique({
      where: { id },
      include: { rooms: true }
    });
    return hotel || void 0;
  }
  async createHotel(hotel) {
    return await db.hotel.create({
      data: hotel
    });
  }
  async updateHotel(id, updates) {
    try {
      const hotel = await db.hotel.update({
        where: { id },
        data: updates
      });
      return hotel;
    } catch (error) {
      return void 0;
    }
  }
  async deleteHotel(id) {
    try {
      await db.hotel.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }
  // Hotel Room Management
  async getHotelRooms(hotelId) {
    return await db.hotelRoom.findMany({
      where: { hotelId },
      orderBy: { roomType: "asc" }
    });
  }
  async getHotelRoom(id) {
    const room = await db.hotelRoom.findUnique({
      where: { id },
      include: { hotel: true }
    });
    return room || void 0;
  }
  async createHotelRoom(room) {
    return await db.hotelRoom.create({
      data: room
    });
  }
  async updateHotelRoom(id, updates) {
    try {
      const room = await db.hotelRoom.update({
        where: { id },
        data: updates
      });
      return room;
    } catch (error) {
      return void 0;
    }
  }
  async deleteHotelRoom(id) {
    try {
      await db.hotelRoom.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }
  // Hotel Booking Management
  async getAllHotelBookings() {
    return await db.hotelBooking.findMany({
      orderBy: { createdAt: "desc" },
      include: { hotel: true, room: true }
    });
  }
  async getHotelBooking(id) {
    const booking = await db.hotelBooking.findUnique({
      where: { id },
      include: { hotel: true, room: true }
    });
    return booking || void 0;
  }
  async createHotelBooking(booking) {
    const data = {
      ...booking,
      checkInDate: typeof booking.checkInDate === "string" ? new Date(booking.checkInDate) : booking.checkInDate,
      checkOutDate: typeof booking.checkOutDate === "string" ? new Date(booking.checkOutDate) : booking.checkOutDate
    };
    return await db.hotelBooking.create({
      data
    });
  }
  async updateHotelBookingStatus(id, status) {
    try {
      const booking = await db.hotelBooking.update({
        where: { id },
        data: { status }
      });
      return booking;
    } catch (error) {
      return void 0;
    }
  }
  // User Account Management
  async getAllUserAccounts() {
    return await db.userAccount.findMany({
      orderBy: { createdAt: "desc" }
    });
  }
  async getUserAccount(id) {
    const user = await db.userAccount.findUnique({
      where: { id }
    });
    return user || void 0;
  }
  async getUserAccountByEmail(email) {
    const user = await db.userAccount.findUnique({
      where: { email }
    });
    return user || void 0;
  }
  async createUserAccount(user) {
    return await db.userAccount.create({
      data: user
    });
  }
  async updateUserAccount(id, updates) {
    try {
      const user = await db.userAccount.update({
        where: { id },
        data: updates
      });
      return user;
    } catch (error) {
      return void 0;
    }
  }
  async updateUserLastLogin(id) {
    try {
      const user = await db.userAccount.update({
        where: { id },
        data: { lastLoginAt: /* @__PURE__ */ new Date() }
      });
      return user;
    } catch (error) {
      return void 0;
    }
  }
  // User Feedback Management
  async getAllUserFeedback() {
    return await db.userFeedback.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: true, tour: true, itinerary: true }
    });
  }
  async getUserFeedback(id) {
    const feedback = await db.userFeedback.findUnique({
      where: { id },
      include: { user: true, tour: true, itinerary: true }
    });
    return feedback || void 0;
  }
  async getUserFeedbackByUser(userId) {
    return await db.userFeedback.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { tour: true, itinerary: true }
    });
  }
  async getPublicFeedback() {
    return await db.userFeedback.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: "desc" },
      include: { user: true, tour: true }
    });
  }
  async createUserFeedback(feedback) {
    return await db.userFeedback.create({
      data: feedback
    });
  }
  async updateUserFeedback(id, updates) {
    try {
      const feedback = await db.userFeedback.update({
        where: { id },
        data: updates
      });
      return feedback;
    } catch (error) {
      return void 0;
    }
  }
};
var storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/tours", async (req, res) => {
    try {
      const { category } = req.query;
      let tours;
      if (category && typeof category === "string") {
        tours = await storage.getToursByCategory(category);
      } else {
        tours = await storage.getAllTours();
      }
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tours" });
    }
  });
  app2.get("/api/tours/cultural", async (req, res) => {
    try {
      const tours = await db.tour.findMany({
        where: { category: "Cultural", isActive: true }
      });
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cultural tours" });
    }
  });
  app2.get("/api/tours/luxury", async (req, res) => {
    try {
      const tours = await db.tour.findMany({
        where: { category: "Luxury", isActive: true }
      });
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch luxury tours" });
    }
  });
  app2.get("/api/tours/adventure", async (req, res) => {
    try {
      const tours = await db.tour.findMany({
        where: { category: "Adventure", isActive: true }
      });
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch adventure tours" });
    }
  });
  app2.get("/api/tours/spiritual", async (req, res) => {
    try {
      const tours = await db.tour.findMany({
        where: { category: "Spiritual", isActive: true }
      });
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch spiritual tours" });
    }
  });
  app2.get("/api/tours/festival", async (req, res) => {
    try {
      const tours = await db.tour.findMany({
        where: { category: "Cultural", isActive: true }
      });
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch festival tours" });
    }
  });
  app2.get("/api/tours/bespoke", async (req, res) => {
    try {
      const tours = await db.tour.findMany({
        where: {
          OR: [
            { category: "Custom" },
            { category: "Luxury" }
          ],
          isActive: true
        }
      });
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bespoke tours" });
    }
  });
  app2.get("/api/tours/photography", async (req, res) => {
    try {
      const tours = await db.tour.findMany({
        where: { category: "Photography", isActive: true }
      });
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch photography tours" });
    }
  });
  app2.get("/api/tours/birdwatching", async (req, res) => {
    try {
      const tours = await db.tour.findMany({
        where: { category: "Birdwatching", isActive: true }
      });
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bird watching tours" });
    }
  });
  app2.get("/api/tours/cycling", async (req, res) => {
    try {
      const tours = await db.tour.findMany({
        where: { category: "Cycling", isActive: true }
      });
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cycling tours" });
    }
  });
  app2.get("/api/tours/pilgrimage", async (req, res) => {
    try {
      const tours = await db.tour.findMany({
        where: { category: "Pilgrimage", isActive: true }
      });
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch pilgrimage tours" });
    }
  });
  app2.get("/api/tours/wellness", async (req, res) => {
    try {
      const tours = await db.tour.findMany({
        where: { category: "Wellness", isActive: true }
      });
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch wellness tours" });
    }
  });
  app2.get("/api/tours/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid tour ID" });
      }
      const tour = await storage.getTour(id);
      if (!tour) {
        return res.status(404).json({ message: "Tour not found" });
      }
      res.json(tour);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tour" });
    }
  });
  app2.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create booking" });
      }
    }
  });
  app2.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });
  app2.patch("/api/bookings/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      if (!status || typeof status !== "string") {
        return res.status(400).json({ message: "Status is required" });
      }
      const booking = await storage.updateBookingStatus(id, status);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to update booking status" });
    }
  });
  app2.post("/api/inquiries", async (req, res) => {
    try {
      const inquiryData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(inquiryData);
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ message: "Invalid inquiry data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create inquiry" });
      }
    }
  });
  app2.get("/api/inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getAllInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });
  app2.post("/api/tours", async (req, res) => {
    try {
      const tourData = req.body;
      const tour = await db.tour.create({ data: tourData });
      res.status(201).json(tour);
    } catch (error) {
      res.status(500).json({ message: "Failed to create tour" });
    }
  });
  app2.put("/api/tours/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const tour = await db.tour.update({ where: { id }, data: updates });
      res.json(tour);
    } catch (error) {
      res.status(500).json({ message: "Failed to update tour" });
    }
  });
  app2.delete("/api/tours/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await db.tour.delete({ where: { id } });
      res.json({ message: "Tour deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete tour" });
    }
  });
  app2.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getActiveTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });
  app2.post("/api/testimonials", async (req, res) => {
    try {
      const testimonialData = req.body;
      const testimonial = await db.testimonial.create({ data: testimonialData });
      res.status(201).json(testimonial);
    } catch (error) {
      res.status(500).json({ message: "Failed to create testimonial" });
    }
  });
  app2.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getPublishedBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });
  app2.post("/api/blog", async (req, res) => {
    try {
      const blogData = req.body;
      const post = await db.blogPost.create({ data: blogData });
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to create blog post" });
    }
  });
  app2.get("/api/blog/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getBlogPost(id);
      if (!post || !post.isPublished) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });
  app2.post("/api/guides/register", async (req, res) => {
    try {
      const guideData = insertGuideSchema.parse(req.body);
      const guide = await storage.createGuide(guideData);
      res.status(201).json({
        message: "Registration successful! We will call and inform you if we require your services.",
        guide
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ message: "Invalid registration data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Registration failed" });
      }
    }
  });
  app2.get("/api/guides", async (req, res) => {
    try {
      const { type } = req.query;
      let guides;
      if (type && typeof type === "string") {
        guides = await storage.getAvailableGuides(type);
      } else {
        guides = await storage.getAllGuides();
      }
      res.json(guides);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch guides" });
    }
  });
  app2.patch("/api/guides/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      if (!status || !["assigned", "not_assigned", "blacklisted"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      const guide = await storage.updateGuideStatus(id, status);
      if (!guide) {
        return res.status(404).json({ message: "Guide not found" });
      }
      res.json(guide);
    } catch (error) {
      res.status(500).json({ message: "Failed to update guide status" });
    }
  });
  app2.post("/api/itineraries", async (req, res) => {
    try {
      const itineraryData = insertItinerarySchema.parse(req.body);
      const itinerary = await storage.createItinerary(itineraryData);
      if (itineraryData.guideId) {
        await storage.updateGuideStatus(itineraryData.guideId, "assigned");
      }
      if (itineraryData.driverId) {
        await storage.updateGuideStatus(itineraryData.driverId, "assigned");
      }
      res.status(201).json(itinerary);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ message: "Invalid itinerary data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create itinerary" });
      }
    }
  });
  app2.get("/api/itineraries", async (req, res) => {
    try {
      const itineraries = await storage.getAllItineraries();
      res.json(itineraries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch itineraries" });
    }
  });
  app2.get("/api/itineraries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const itinerary = await storage.getItinerary(id);
      if (!itinerary) {
        return res.status(404).json({ message: "Itinerary not found" });
      }
      const days = await storage.getItineraryDays(id);
      res.json({ ...itinerary, days });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch itinerary" });
    }
  });
  app2.put("/api/itineraries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const itinerary = await storage.updateItinerary(id, updates);
      if (!itinerary) {
        return res.status(404).json({ message: "Itinerary not found" });
      }
      res.json(itinerary);
    } catch (error) {
      res.status(500).json({ message: "Failed to update itinerary" });
    }
  });
  app2.delete("/api/itineraries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteItinerary(id);
      if (!success) {
        return res.status(404).json({ message: "Itinerary not found" });
      }
      res.json({ message: "Itinerary deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete itinerary" });
    }
  });
  app2.post("/api/itineraries/:id/days", async (req, res) => {
    try {
      const itineraryId = parseInt(req.params.id);
      const dayData = { ...req.body, itineraryId };
      const parsedData = insertItineraryDaySchema.parse(dayData);
      const day = await storage.createItineraryDay(parsedData);
      res.status(201).json(day);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ message: "Invalid day data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create itinerary day" });
      }
    }
  });
  app2.put("/api/itinerary-days/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const day = await storage.updateItineraryDay(id, updates);
      if (!day) {
        return res.status(404).json({ message: "Itinerary day not found" });
      }
      res.json(day);
    } catch (error) {
      res.status(500).json({ message: "Failed to update itinerary day" });
    }
  });
  app2.delete("/api/itinerary-days/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteItineraryDay(id);
      if (!success) {
        return res.status(404).json({ message: "Itinerary day not found" });
      }
      res.json({ message: "Itinerary day deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete itinerary day" });
    }
  });
  app2.post("/api/custom-tours", async (req, res) => {
    try {
      const requestData = insertCustomTourRequestSchema.parse(req.body);
      const request = await storage.createCustomTourRequest(requestData);
      res.status(201).json(request);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ message: "Invalid custom tour request", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create custom tour request" });
      }
    }
  });
  app2.get("/api/custom-tours", async (req, res) => {
    try {
      const requests = await storage.getAllCustomTourRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch custom tour requests" });
    }
  });
  app2.get("/api/custom-tours/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const request = await storage.getCustomTourRequest(id);
      if (!request) {
        return res.status(404).json({ message: "Custom tour request not found" });
      }
      res.json(request);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch custom tour request" });
    }
  });
  app2.put("/api/custom-tours/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const request = await storage.updateCustomTourRequest(id, updates);
      if (!request) {
        return res.status(404).json({ message: "Custom tour request not found" });
      }
      res.json(request);
    } catch (error) {
      res.status(500).json({ message: "Failed to update custom tour request" });
    }
  });
  app2.get("/api/tour-operators", async (req, res) => {
    try {
      const operators = await db.tourOperator.findMany({
        orderBy: { createdAt: "desc" }
      });
      res.json(operators);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tour operators" });
    }
  });
  app2.get("/api/tour-operators/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const operator = await db.tourOperator.findUnique({
        where: { id },
        include: {
          tours: true
        }
      });
      if (!operator) {
        return res.status(404).json({ message: "Tour operator not found" });
      }
      res.json(operator);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tour operator" });
    }
  });
  app2.post("/api/tour-operators", async (req, res) => {
    try {
      const operatorData = insertTourOperatorSchema.parse(req.body);
      const operator = await db.tourOperator.create({
        data: operatorData
      });
      res.status(201).json(operator);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ message: "Invalid tour operator data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create tour operator" });
      }
    }
  });
  app2.put("/api/tour-operators/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const operator = await db.tourOperator.update({
        where: { id },
        data: updates
      });
      res.json(operator);
    } catch (error) {
      res.status(500).json({ message: "Failed to update tour operator" });
    }
  });
  app2.delete("/api/tour-operators/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await db.tour.updateMany({
        where: { tourOperatorId: id },
        data: { tourOperatorId: null }
      });
      await db.tourOperator.delete({
        where: { id }
      });
      res.json({ message: "Tour operator deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete tour operator" });
    }
  });
  app2.post("/api/seed", async (req, res) => {
    try {
      console.log("\u{1F331} Starting database seed from API...");
      await seed();
      const tourOperators = await db.tourOperator.count();
      const tours = await db.tour.count();
      const testimonials = await db.testimonial.count();
      const blogPosts = await db.blogPost.count();
      res.json({
        message: "Database seeded successfully!",
        tourOperators,
        tours,
        testimonials,
        blogPosts
      });
    } catch (error) {
      console.error("\u274C Seed error:", error);
      res.status(500).json({
        message: "Failed to seed database",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/clear-database", async (req, res) => {
    try {
      console.log("\u{1F5D1}\uFE0F Clearing database...");
      await db.itineraryDay.deleteMany();
      await db.itinerary.deleteMany();
      await db.customTourRequest.deleteMany();
      await db.booking.deleteMany();
      await db.inquiry.deleteMany();
      await db.guide.deleteMany();
      await db.blogPost.deleteMany();
      await db.testimonial.deleteMany();
      await db.tour.deleteMany();
      await db.tourOperator.deleteMany();
      await db.user.deleteMany();
      console.log("\u2705 Database cleared successfully!");
      res.json({ message: "Database cleared successfully!" });
    } catch (error) {
      console.error("\u274C Clear database error:", error);
      res.status(500).json({
        message: "Failed to clear database",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.get("/api/festivals", async (req, res) => {
    try {
      const festivals = await storage.getActiveFestivals();
      res.json(festivals);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch festivals" });
    }
  });
  app2.get("/api/festivals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const festival = await storage.getFestival(id);
      if (!festival) {
        return res.status(404).json({ message: "Festival not found" });
      }
      res.json(festival);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch festival" });
    }
  });
  app2.post("/api/festivals", async (req, res) => {
    try {
      const festivalData = insertFestivalSchema.parse(req.body);
      const festival = await storage.createFestival(festivalData);
      res.status(201).json(festival);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ message: "Invalid festival data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create festival" });
      }
    }
  });
  app2.put("/api/festivals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const festival = await storage.updateFestival(id, updates);
      if (!festival) {
        return res.status(404).json({ message: "Festival not found" });
      }
      res.json(festival);
    } catch (error) {
      res.status(500).json({ message: "Failed to update festival" });
    }
  });
  app2.delete("/api/festivals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteFestival(id);
      if (!success) {
        return res.status(404).json({ message: "Festival not found" });
      }
      res.json({ message: "Festival deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete festival" });
    }
  });
  app2.post("/api/festival-bookings", async (req, res) => {
    try {
      const bookingData = insertFestivalBookingSchema.parse(req.body);
      const booking = await storage.createFestivalBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create festival booking" });
      }
    }
  });
  app2.get("/api/festival-bookings", async (req, res) => {
    try {
      const bookings = await storage.getAllFestivalBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch festival bookings" });
    }
  });
  app2.patch("/api/festival-bookings/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      if (!status || typeof status !== "string") {
        return res.status(400).json({ message: "Status is required" });
      }
      const booking = await storage.updateFestivalBookingStatus(id, status);
      if (!booking) {
        return res.status(404).json({ message: "Festival booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to update festival booking status" });
    }
  });
  app2.get("/api/hotels", async (req, res) => {
    try {
      const hotels = await storage.getActiveHotels();
      res.json(hotels);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hotels" });
    }
  });
  app2.get("/api/hotels/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const hotel = await storage.getHotel(id);
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
      res.json(hotel);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hotel" });
    }
  });
  app2.post("/api/hotels", async (req, res) => {
    try {
      const hotelData = insertHotelSchema.parse(req.body);
      const hotel = await storage.createHotel(hotelData);
      res.status(201).json(hotel);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ message: "Invalid hotel data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create hotel" });
      }
    }
  });
  app2.put("/api/hotels/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const hotel = await storage.updateHotel(id, updates);
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
      res.json(hotel);
    } catch (error) {
      res.status(500).json({ message: "Failed to update hotel" });
    }
  });
  app2.delete("/api/hotels/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteHotel(id);
      if (!success) {
        return res.status(404).json({ message: "Hotel not found" });
      }
      res.json({ message: "Hotel deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete hotel" });
    }
  });
  app2.get("/api/hotels/:hotelId/rooms", async (req, res) => {
    try {
      const hotelId = parseInt(req.params.hotelId);
      const rooms = await storage.getHotelRooms(hotelId);
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hotel rooms" });
    }
  });
  app2.post("/api/hotel-rooms", async (req, res) => {
    try {
      const roomData = insertHotelRoomSchema.parse(req.body);
      const room = await storage.createHotelRoom(roomData);
      res.status(201).json(room);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ message: "Invalid room data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create hotel room" });
      }
    }
  });
  app2.put("/api/hotel-rooms/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const room = await storage.updateHotelRoom(id, updates);
      if (!room) {
        return res.status(404).json({ message: "Hotel room not found" });
      }
      res.json(room);
    } catch (error) {
      res.status(500).json({ message: "Failed to update hotel room" });
    }
  });
  app2.delete("/api/hotel-rooms/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteHotelRoom(id);
      if (!success) {
        return res.status(404).json({ message: "Hotel room not found" });
      }
      res.json({ message: "Hotel room deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete hotel room" });
    }
  });
  app2.post("/api/hotel-bookings", async (req, res) => {
    try {
      const bookingData = insertHotelBookingSchema.parse(req.body);
      const booking = await storage.createHotelBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create hotel booking" });
      }
    }
  });
  app2.get("/api/hotel-bookings", async (req, res) => {
    try {
      const bookings = await storage.getAllHotelBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hotel bookings" });
    }
  });
  app2.patch("/api/hotel-bookings/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      if (!status || typeof status !== "string") {
        return res.status(400).json({ message: "Status is required" });
      }
      const booking = await storage.updateHotelBookingStatus(id, status);
      if (!booking) {
        return res.status(404).json({ message: "Hotel booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to update hotel booking status" });
    }
  });
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const mockUsers = [
        { id: 1, email: "admin@bhutan.com", password: "admin123", firstName: "Admin", lastName: "User", role: "admin" },
        { id: 2, email: "guide@bhutan.com", password: "guide123", firstName: "Tenzin", lastName: "Guide", role: "guide" },
        { id: 3, email: "driver@bhutan.com", password: "driver123", firstName: "Karma", lastName: "Driver", role: "driver" },
        { id: 4, email: "tourist@bhutan.com", password: "tourist123", firstName: "John", lastName: "Tourist", role: "tourist" }
      ];
      const user = mockUsers.find((u) => u.email === email && u.password === password);
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        res.json({ user: userWithoutPassword, token: "mock-jwt-token" });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: "Authentication failed" });
    }
  });
  app2.post("/api/user-accounts", async (req, res) => {
    try {
      const userData = insertUserAccountSchema.parse(req.body);
      const user = await storage.createUserAccount(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ message: "Invalid user data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create user account" });
      }
    }
  });
  app2.get("/api/user-accounts", async (req, res) => {
    try {
      const users = await storage.getAllUserAccounts();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user accounts" });
    }
  });
  app2.get("/api/user-accounts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUserAccount(id);
      if (!user) {
        return res.status(404).json({ message: "User account not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user account" });
    }
  });
  app2.post("/api/user-feedback", async (req, res) => {
    try {
      const feedbackData = insertUserFeedbackSchema.parse(req.body);
      const feedback = await storage.createUserFeedback(feedbackData);
      res.status(201).json(feedback);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ message: "Invalid feedback data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create feedback" });
      }
    }
  });
  app2.get("/api/user-feedback", async (req, res) => {
    try {
      const { userId, public: isPublic } = req.query;
      let feedback;
      if (userId) {
        feedback = await storage.getUserFeedbackByUser(parseInt(userId));
      } else if (isPublic === "true") {
        feedback = await storage.getPublicFeedback();
      } else {
        feedback = await storage.getAllUserFeedback();
      }
      res.json(feedback);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch feedback" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import { nanoid } from "nanoid";
import path2 from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createLogger, createServer as createViteServer } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var __dirname = path.dirname(fileURLToPath(import.meta.url));
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
var __dirname2 = path2.dirname(fileURLToPath2(import.meta.url));
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    host: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5001;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
