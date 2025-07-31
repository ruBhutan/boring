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
        specialties: ["Luxury travel", "Bespoke tours", "Premium accommodations", "Exclusive access"],
        rating: 4.9,
        reviewCount: 189,
        logoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        contactEmail: "info@bhutanswallowtail.com",
        contactPhone: "+975-2-456789",
        establishedYear: 2015,
        certifications: ["Luxury Tourism Certified", "Premium Service Licensed"],
        awards: ["Luxury Travel Excellence", "Bespoke Service Award"]
      },
      {
        name: "Bhutan Scenic Tour",
        website: "www.bhutanscenictour.com",
        description: "Family-run boutique operator with highly personalized service and intimate group experiences.",
        bestFeature: "Family-run boutique with highly personalized service",
        specialties: ["Boutique tours", "Personalized service", "Small groups", "Family experiences"],
        rating: 4.8,
        reviewCount: 298,
        logoUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b830?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        contactEmail: "info@bhutanscenictour.com",
        contactPhone: "+975-2-567890",
        establishedYear: 2007,
        certifications: ["Boutique Tourism Licensed", "Family Service Certified"],
        awards: ["Best Boutique Operator", "Personalized Service Excellence"]
      },
      {
        name: "Away to Bhutan",
        website: "www.awaytobhutan.com",
        description: "Festival-focused operator offering authentic Bhutanese cultural tours with deep cultural immersion.",
        bestFeature: "Festival-focused, authentic Bhutanese cultural tours",
        specialties: ["Festival tours", "Cultural immersion", "Traditional ceremonies", "Local festivals"],
        rating: 4.7,
        reviewCount: 356,
        logoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        contactEmail: "info@awaytobhutan.com",
        contactPhone: "+975-2-678901",
        establishedYear: 2009,
        certifications: ["Cultural Tourism Licensed", "Festival Guide Certified"],
        awards: ["Best Cultural Experience", "Festival Tourism Excellence"]
      },
      {
        name: "Totally Bhutan",
        website: "www.totallybhutan.com",
        description: "Budget-friendly adventure and cultural packages without compromising on quality and authentic experiences.",
        bestFeature: "Budget-friendly adventure and cultural packages",
        specialties: ["Budget tours", "Adventure packages", "Cultural experiences", "Value travel"],
        rating: 4.6,
        reviewCount: 445,
        logoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        contactEmail: "info@totallybhutan.com",
        contactPhone: "+975-2-789012",
        establishedYear: 2011,
        certifications: ["Budget Tourism Licensed", "Value Travel Certified"],
        awards: ["Best Value Operator", "Budget Excellence Award"]
      },
      {
        name: "Bhutan Travel Bureau",
        website: "www.bhutantravelbureau.com",
        description: "One of Bhutan's oldest and most trusted tour operators with decades of experience and established reputation.",
        bestFeature: "One of Bhutan's oldest, trusted tour operators",
        specialties: ["Established tours", "Traditional packages", "Reliable service", "Classic experiences"],
        rating: 4.8,
        reviewCount: 1234,
        logoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        contactEmail: "info@bhutantravelbureau.com",
        contactPhone: "+975-2-890123",
        establishedYear: 1991,
        certifications: ["Pioneer Tourism Licensed", "Heritage Operator Certified"],
        awards: ["Lifetime Achievement Award", "Pioneer in Tourism", "Trust Excellence Award"]
      }
    ];
    const createdOperators = await Promise.all(
      tourOperatorsData.map((operator) => db.tourOperator.create({ data: operator }))
    );
    const toursData = [
      // Heavenly Bhutan - Eco-friendly luxury tours
      {
        name: "Eco-Luxury Cultural Immersion",
        description: "Experience Bhutan's rich culture while staying in eco-friendly luxury accommodations. This tour combines authentic cultural experiences with sustainable tourism practices, featuring organic farm visits, traditional craft workshops, and carbon-neutral transportation.",
        duration: 8,
        price: 3200,
        category: "Cultural",
        imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        rating: 4.9,
        reviewCount: 127,
        highlights: [
          "Eco-luxury accommodations",
          "Organic farm-to-table dining",
          "Traditional craft workshops",
          "Carbon-neutral transportation",
          "Tiger's Nest Monastery hike"
        ],
        maxGroupSize: 8,
        difficulty: "Easy",
        bestSeason: "Spring & Autumn",
        includes: [
          "Eco-luxury accommodation",
          "Organic meals and local cuisine",
          "Licensed eco-guide",
          "Carbon-neutral transportation",
          "All entrance fees"
        ],
        excludes: [
          "International flights",
          "Travel insurance",
          "Personal expenses",
          "Tips and gratuities"
        ],
        tourOperatorId: createdOperators[0].id
      },
      {
        name: "Sustainable Himalayan Adventure",
        description: "Explore Bhutan's pristine wilderness with minimal environmental impact. This eco-adventure includes responsible trekking, wildlife conservation experiences, and community-based tourism initiatives.",
        duration: 12,
        price: 4500,
        category: "Adventure",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        rating: 4.8,
        reviewCount: 89,
        highlights: [
          "Responsible trekking practices",
          "Wildlife conservation experience",
          "Community-based tourism",
          "Eco-camping equipment",
          "Local guide training support"
        ],
        maxGroupSize: 6,
        difficulty: "Moderate",
        bestSeason: "Spring & Autumn",
        includes: [
          "Eco-friendly camping gear",
          "Conservation project visits",
          "Community homestays",
          "Sustainable meals",
          "Environmental guide"
        ],
        excludes: [
          "Personal trekking gear",
          "International flights",
          "Travel insurance",
          "Emergency evacuation"
        ],
        tourOperatorId: createdOperators[0].id
      },
      // Druk Asia - High-end private tours with visa processing
      {
        name: "Royal Bhutan Private Experience",
        description: "Exclusive private tour with seamless visa processing and luxury accommodations. Experience Bhutan like royalty with private guides, premium vehicles, and access to exclusive venues.",
        duration: 10,
        price: 5500,
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
        ],
        tourOperatorId: createdOperators[1].id
      },
      {
        name: "Customized Bhutan Discovery",
        description: "Fully customizable private tour designed around your interests and preferences. With expert local knowledge and flexible itinerary, discover Bhutan at your own pace.",
        duration: 7,
        price: 4200,
        category: "Custom",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        rating: 4.8,
        reviewCount: 203,
        highlights: [
          "Fully customizable itinerary",
          "Expert local consultation",
          "Flexible scheduling",
          "Personal interests focus",
          "Premium service standards"
        ],
        maxGroupSize: 6,
        difficulty: "Flexible",
        bestSeason: "Year-round",
        includes: [
          "Custom itinerary planning",
          "Premium accommodations",
          "Private transportation",
          "Specialized guides",
          "24/7 support"
        ],
        excludes: [
          "International flights",
          "Travel insurance",
          "Optional activities",
          "Personal expenses"
        ],
        tourOperatorId: createdOperators[1].id
      },
      // Bhutan Peaceful Tour - Spiritual journeys
      {
        name: "Mindfulness & Meditation Retreat",
        description: "Deep spiritual journey focusing on Buddhist meditation practices, mindfulness training, and inner peace cultivation. Perfect for those seeking spiritual growth and mental clarity.",
        duration: 14,
        price: 3800,
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
        ],
        tourOperatorId: createdOperators[2].id
      },
      {
        name: "Sacred Sites Pilgrimage",
        description: "Visit Bhutan's most sacred Buddhist sites and participate in traditional ceremonies. This spiritual journey includes temple visits, prayer flag ceremonies, and meetings with high lamas.",
        duration: 9,
        price: 3200,
        category: "Spiritual",
        imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        rating: 4.8,
        reviewCount: 134,
        highlights: [
          "Sacred temple visits",
          "Traditional ceremonies",
          "High lama meetings",
          "Prayer flag ceremonies",
          "Spiritual teachings"
        ],
        maxGroupSize: 8,
        difficulty: "Easy",
        bestSeason: "Spring & Autumn",
        includes: [
          "Temple entrance fees",
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
        ],
        tourOperatorId: createdOperators[2].id
      },
      // Wind Horse Tours - Trekking and adventure
      {
        name: "Jomolhari Base Camp Trek",
        description: "Challenging trek to the base camp of Jomolhari, one of Bhutan's most sacred mountains. Experience high-altitude trekking, pristine wilderness, and spectacular mountain views.",
        duration: 16,
        price: 4800,
        category: "Adventure",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        rating: 4.7,
        reviewCount: 92,
        highlights: [
          "Jomolhari base camp",
          "High-altitude trekking",
          "Pristine wilderness",
          "Mountain photography",
          "Yak herder encounters"
        ],
        maxGroupSize: 8,
        difficulty: "Challenging",
        bestSeason: "Autumn",
        includes: [
          "Professional trekking guide",
          "Camping equipment",
          "Porter services",
          "All meals during trek",
          "Emergency medical kit"
        ],
        excludes: [
          "Personal trekking gear",
          "International flights",
          "Travel insurance",
          "Emergency evacuation"
        ],
        tourOperatorId: createdOperators[3].id
      },
      {
        name: "Bhutan Festival & Wildlife Tour",
        description: "Combine cultural festival experiences with wildlife spotting in Bhutan's national parks. Perfect timing to witness traditional festivals and diverse Himalayan wildlife.",
        duration: 11,
        price: 3600,
        category: "Cultural",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        rating: 4.8,
        reviewCount: 167,
        highlights: [
          "Traditional festival participation",
          "Wildlife spotting",
          "National park visits",
          "Cultural performances",
          "Photography opportunities"
        ],
        maxGroupSize: 12,
        difficulty: "Moderate",
        bestSeason: "Spring & Autumn",
        includes: [
          "Festival entrance fees",
          "National park permits",
          "Wildlife guide",
          "Cultural performances",
          "Photography permits"
        ],
        excludes: [
          "International flights",
          "Professional camera fees",
          "Travel insurance",
          "Personal expenses"
        ],
        tourOperatorId: createdOperators[3].id
      },
      // Keys to Bhutan - Custom tours with local insights
      {
        name: "Hidden Gems of Eastern Bhutan",
        description: "Discover the lesser-known eastern regions of Bhutan with deep local insights. Visit remote villages, ancient temples, and experience authentic rural life away from tourist crowds.",
        duration: 13,
        price: 4100,
        category: "Cultural",
        imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        rating: 4.9,
        reviewCount: 78,
        highlights: [
          "Remote village visits",
          "Ancient temple exploration",
          "Authentic rural experiences",
          "Local family interactions",
          "Traditional craft learning"
        ],
        maxGroupSize: 6,
        difficulty: "Moderate",
        bestSeason: "Spring & Autumn",
        includes: [
          "Local expert guide",
          "Village homestays",
          "Traditional meals",
          "Craft workshops",
          "Cultural exchanges"
        ],
        excludes: [
          "International flights",
          "Western-style accommodations",
          "Travel insurance",
          "Personal shopping"
        ],
        tourOperatorId: createdOperators[4].id
      },
      // Bhutan Swallowtail - Luxury bespoke tours
      {
        name: "Ultimate Luxury Bhutan Experience",
        description: "The pinnacle of luxury travel in Bhutan with exclusive access to private venues, premium accommodations, and personalized service. Every detail crafted for the discerning traveler.",
        duration: 12,
        price: 8500,
        category: "Luxury",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        rating: 5,
        reviewCount: 45,
        highlights: [
          "Ultra-luxury accommodations",
          "Private helicopter transfers",
          "Exclusive venue access",
          "Personal concierge service",
          "Michelin-level dining"
        ],
        maxGroupSize: 4,
        difficulty: "Easy",
        bestSeason: "Year-round",
        includes: [
          "Luxury suite accommodations",
          "Private helicopter flights",
          "Personal butler service",
          "Gourmet dining experiences",
          "Exclusive cultural shows"
        ],
        excludes: [
          "International flights",
          "Personal shopping",
          "Spa treatments",
          "Alcoholic beverages"
        ],
        tourOperatorId: createdOperators[5].id
      },
      // Bhutan Scenic Tour - Family-run boutique
      {
        name: "Intimate Bhutan Family Experience",
        description: "Small group, personalized tour perfect for families or close friends. Experience Bhutan through the eyes of a local family with intimate cultural exchanges and personalized attention.",
        duration: 8,
        price: 2800,
        category: "Family",
        imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b830?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        rating: 4.9,
        reviewCount: 112,
        highlights: [
          "Small group experience",
          "Family-style accommodations",
          "Personal cultural exchanges",
          "Home-cooked meals",
          "Children-friendly activities"
        ],
        maxGroupSize: 6,
        difficulty: "Easy",
        bestSeason: "Spring & Autumn",
        includes: [
          "Family-run guesthouses",
          "Home-cooked meals",
          "Personal family guide",
          "Cultural activities",
          "Children's programs"
        ],
        excludes: [
          "International flights",
          "Travel insurance",
          "Personal expenses",
          "Optional activities"
        ],
        tourOperatorId: createdOperators[6].id
      },
      // Away to Bhutan - Festival-focused
      {
        name: "Bhutan Festival Calendar Tour",
        description: "Experience multiple traditional festivals across Bhutan throughout the year. Witness masked dances, traditional music, and colorful celebrations in different regions.",
        duration: 15,
        price: 4200,
        category: "Cultural",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        rating: 4.8,
        reviewCount: 156,
        highlights: [
          "Multiple festival experiences",
          "Traditional masked dances",
          "Regional cultural variations",
          "Festival photography",
          "Local celebration participation"
        ],
        maxGroupSize: 10,
        difficulty: "Easy",
        bestSeason: "Festival seasons",
        includes: [
          "Festival entrance fees",
          "Cultural guide",
          "Traditional costumes",
          "Festival meals",
          "Photography permits"
        ],
        excludes: [
          "International flights",
          "Professional camera fees",
          "Travel insurance",
          "Personal expenses"
        ],
        tourOperatorId: createdOperators[7].id
      },
      // Totally Bhutan - Budget-friendly
      {
        name: "Budget Bhutan Adventure",
        description: "Affordable yet authentic Bhutan experience without compromising on quality. Perfect for budget-conscious travelers who want to experience the real Bhutan.",
        duration: 7,
        price: 1800,
        category: "Budget",
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        rating: 4.6,
        reviewCount: 234,
        highlights: [
          "Budget-friendly pricing",
          "Authentic experiences",
          "Local guesthouses",
          "Traditional meals",
          "Cultural immersion"
        ],
        maxGroupSize: 12,
        difficulty: "Easy",
        bestSeason: "Spring & Autumn",
        includes: [
          "Budget accommodations",
          "Local transportation",
          "Traditional meals",
          "Cultural guide",
          "Basic entrance fees"
        ],
        excludes: [
          "International flights",
          "Luxury amenities",
          "Travel insurance",
          "Optional activities"
        ],
        tourOperatorId: createdOperators[8].id
      },
      // Bhutan Travel Bureau - Classic established tours
      {
        name: "Classic Bhutan Heritage Tour",
        description: "Time-tested classic tour covering all major highlights of Bhutan. Decades of experience ensure a well-organized, comprehensive introduction to the Land of the Thunder Dragon.",
        duration: 10,
        price: 3500,
        category: "Classic",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        rating: 4.8,
        reviewCount: 567,
        highlights: [
          "All major highlights",
          "Decades of experience",
          "Well-organized itinerary",
          "Reliable service",
          "Comprehensive coverage"
        ],
        maxGroupSize: 15,
        difficulty: "Easy",
        bestSeason: "Spring & Autumn",
        includes: [
          "Standard accommodations",
          "All major attractions",
          "Experienced guide",
          "Traditional meals",
          "Transportation"
        ],
        excludes: [
          "International flights",
          "Travel insurance",
          "Personal expenses",
          "Optional activities"
        ],
        tourOperatorId: createdOperators[9].id
      },
      // New Cycling Tours
      {
        name: "Thimphu Valley Cycling Adventure",
        description: "Explore Bhutan's capital valley on two wheels, combining urban cycling with scenic mountain trails. Perfect for eco-conscious travelers seeking active exploration.",
        duration: 3,
        price: 450,
        category: "Cycling",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        rating: 4.7,
        reviewCount: 89,
        highlights: [
          "Thimphu city exploration",
          "Traditional villages",
          "Mountain trails",
          "Cultural sites",
          "Eco-friendly travel"
        ],
        maxGroupSize: 8,
        difficulty: "Moderate",
        bestSeason: "Spring & Autumn",
        includes: [
          "Premium mountain bikes",
          "Safety equipment",
          "Expert cycling guide",
          "Support vehicle",
          "Traditional meals"
        ],
        excludes: [
          "International flights",
          "Personal cycling gear",
          "Travel insurance",
          "Bike maintenance"
        ],
        tourOperatorId: createdOperators[0].id
      },
      {
        name: "Paro to Punakha Cycling Expedition",
        description: "Epic cycling journey through Bhutan's most scenic landscapes, from Paro valley to the ancient capital of Punakha. Cross mountain passes and river valleys.",
        duration: 7,
        price: 1200,
        category: "Cycling",
        imageUrl: "https://images.unsplash.com/photo-1544191696-15693072b5d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        rating: 4.8,
        reviewCount: 67,
        highlights: [
          "Cross-country cycling",
          "Dochula Pass",
          "Ancient fortresses",
          "River valleys",
          "Mountain passes"
        ],
        maxGroupSize: 10,
        difficulty: "Challenging",
        bestSeason: "Spring & Autumn",
        includes: [
          "High-end mountain bikes",
          "Professional guide",
          "Support vehicle",
          "Camping equipment",
          "All meals"
        ],
        excludes: [
          "International flights",
          "Personal gear",
          "Travel insurance",
          "Emergency evacuation"
        ],
        tourOperatorId: createdOperators[3].id
      },
      // New Pilgrimage Tours
      {
        name: "Sacred Tiger's Nest Pilgrimage",
        description: "Journey to Bhutan's most iconic monastery, perched dramatically on a cliff face 3,000 feet above Paro valley. Experience deep spiritual connection and meditation.",
        duration: 3,
        price: 650,
        category: "Pilgrimage",
        imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        rating: 4.9,
        reviewCount: 156,
        highlights: [
          "Paro Taktsang Monastery",
          "Meditation sessions",
          "Prayer flag ceremony",
          "Sacred caves",
          "Spiritual guidance"
        ],
        maxGroupSize: 12,
        difficulty: "Moderate",
        bestSeason: "Spring & Autumn",
        includes: [
          "Monastery entrance fees",
          "Spiritual guide",
          "Meditation materials",
          "Traditional meals",
          "Blessing ceremonies"
        ],
        excludes: [
          "International flights",
          "Personal offerings",
          "Travel insurance",
          "Photography fees"
        ],
        tourOperatorId: createdOperators[2].id
      },
      {
        name: "Bumthang Sacred Valley Pilgrimage",
        description: "Explore the spiritual heartland of Bhutan, visiting ancient temples and sacred sites in the blessed Bumthang valleys. Connect with centuries of Buddhist tradition.",
        duration: 7,
        price: 1400,
        category: "Pilgrimage",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        rating: 4.8,
        reviewCount: 134,
        highlights: [
          "Jambay Lhakhang",
          "Kurjey Lhakhang",
          "Tamshing Monastery",
          "Guru Rinpoche sites",
          "Sacred valley walks"
        ],
        maxGroupSize: 15,
        difficulty: "Easy",
        bestSeason: "Spring & Autumn",
        includes: [
          "Temple entrance fees",
          "Spiritual guide",
          "Monastery stays",
          "Vegetarian meals",
          "Prayer materials"
        ],
        excludes: [
          "International flights",
          "Personal donations",
          "Travel insurance",
          "Optional ceremonies"
        ],
        tourOperatorId: createdOperators[2].id
      },
      // New Wellness Tours
      {
        name: "Himalayan Wellness Retreat",
        description: "Rejuvenate your mind, body, and soul with traditional Bhutanese wellness practices in serene mountain settings. Experience holistic healing and inner peace.",
        duration: 7,
        price: 1800,
        category: "Wellness",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        rating: 4.9,
        reviewCount: 98,
        highlights: [
          "Hot stone baths",
          "Meditation sessions",
          "Yoga classes",
          "Herbal treatments",
          "Mountain wellness"
        ],
        maxGroupSize: 10,
        difficulty: "Relaxing",
        bestSeason: "Year-round",
        includes: [
          "Wellness accommodations",
          "Spa treatments",
          "Yoga instructor",
          "Healthy meals",
          "Meditation guide"
        ],
        excludes: [
          "International flights",
          "Personal spa items",
          "Travel insurance",
          "Additional treatments"
        ],
        tourOperatorId: createdOperators[5].id
      },
      {
        name: "Traditional Medicine & Spa Experience",
        description: "Experience authentic Bhutanese traditional medicine combined with luxury spa treatments for holistic healing. Learn about Sowa Rigpa healing practices.",
        duration: 5,
        price: 1200,
        category: "Wellness",
        imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        rating: 4.8,
        reviewCount: 76,
        highlights: [
          "Sowa Rigpa medicine",
          "Herbal consultations",
          "Therapeutic massages",
          "Detox programs",
          "Wellness education"
        ],
        maxGroupSize: 8,
        difficulty: "Gentle",
        bestSeason: "Year-round",
        includes: [
          "Medical consultations",
          "Herbal treatments",
          "Spa services",
          "Wellness meals",
          "Health assessments"
        ],
        excludes: [
          "International flights",
          "Personal medications",
          "Travel insurance",
          "Extended treatments"
        ],
        tourOperatorId: createdOperators[5].id
      },
      // Additional Photography Tours
      {
        name: "Bhutan Photography Masterclass",
        description: "Professional photography workshop covering landscape, portrait, and cultural photography in Bhutan's most photogenic locations.",
        duration: 10,
        price: 2200,
        category: "Photography",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        rating: 4.9,
        reviewCount: 87,
        highlights: [
          "Professional instruction",
          "Tiger's Nest photography",
          "Festival documentation",
          "Portrait sessions",
          "Equipment provided"
        ],
        maxGroupSize: 8,
        difficulty: "Moderate",
        bestSeason: "Spring & Autumn",
        includes: [
          "Professional photographer guide",
          "Photography equipment",
          "Editing workshops",
          "Print portfolio",
          "All entrance fees"
        ],
        excludes: [
          "International flights",
          "Personal camera gear",
          "Travel insurance",
          "Photo processing"
        ],
        tourOperatorId: createdOperators[4].id
      },
      {
        name: "Himalayan Sunrise Photography Tour",
        description: "Capture the golden hour magic of the Himalayas with early morning photography sessions at the most scenic viewpoints.",
        duration: 6,
        price: 1500,
        category: "Photography",
        imageUrl: "https://images.unsplash.com/photo-1544191696-15693072b5d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        rating: 4.8,
        reviewCount: 65,
        highlights: [
          "Sunrise photography",
          "Mountain panoramas",
          "Golden hour techniques",
          "Composition training",
          "Digital editing"
        ],
        maxGroupSize: 6,
        difficulty: "Easy",
        bestSeason: "Autumn & Winter",
        includes: [
          "Photography guide",
          "Tripods and filters",
          "Transportation to viewpoints",
          "Hot beverages",
          "Photo critique sessions"
        ],
        excludes: [
          "International flights",
          "Camera equipment",
          "Travel insurance",
          "Accommodation upgrades"
        ],
        tourOperatorId: createdOperators[4].id
      },
      // Additional Bird Watching Tours
      {
        name: "Bhutan Birding Expedition",
        description: "Comprehensive birding tour covering all major habitats from subtropical forests to alpine meadows, targeting 200+ species.",
        duration: 14,
        price: 3200,
        category: "Birdwatching",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        rating: 4.9,
        reviewCount: 92,
        highlights: [
          "200+ bird species",
          "Endemic species focus",
          "Professional birding guide",
          "High-quality optics",
          "Habitat diversity"
        ],
        maxGroupSize: 8,
        difficulty: "Moderate",
        bestSeason: "Spring & Autumn",
        includes: [
          "Expert birding guide",
          "Binoculars and scopes",
          "Bird identification books",
          "Transportation",
          "All park fees"
        ],
        excludes: [
          "International flights",
          "Personal birding gear",
          "Travel insurance",
          "Photography equipment"
        ],
        tourOperatorId: createdOperators[3].id
      },
      {
        name: "Rare Birds of Eastern Bhutan",
        description: "Specialized birding tour focusing on rare and endemic species in Bhutan's eastern regions, including the elusive Ward's Trogon.",
        duration: 12,
        price: 2800,
        category: "Birdwatching",
        imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        rating: 4.8,
        reviewCount: 74,
        highlights: [
          "Ward's Trogon",
          "Beautiful Nuthatch",
          "Rufous-necked Hornbill",
          "Endemic species",
          "Remote locations"
        ],
        maxGroupSize: 6,
        difficulty: "Challenging",
        bestSeason: "Spring",
        includes: [
          "Specialist birding guide",
          "High-end optics",
          "Remote area permits",
          "4WD transportation",
          "Field notebooks"
        ],
        excludes: [
          "International flights",
          "Personal equipment",
          "Travel insurance",
          "Emergency evacuation"
        ],
        tourOperatorId: createdOperators[3].id
      }
    ];
    await db.tour.createMany({
      data: toursData
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
        tripName: "Hidden Gems of Eastern Bhutan",
        duration: "13 days",
        isActive: true
      },
      {
        name: "Robert Kim",
        country: "South Korea",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        text: "Bhutan Swallowtail's luxury experience was beyond our wildest dreams. The helicopter transfers, ultra-luxury accommodations, and personal butler service made this the trip of a lifetime. Absolutely worth the investment!",
        rating: 5,
        tripName: "Ultimate Luxury Bhutan Experience",
        duration: "12 days",
        isActive: true
      },
      {
        name: "Lisa Anderson",
        country: "United States",
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        text: "The family experience with Bhutan Scenic Tour was perfect for our group. The personalized attention, home-cooked meals, and intimate cultural exchanges made us feel like part of a Bhutanese family.",
        rating: 5,
        tripName: "Intimate Bhutan Family Experience",
        duration: "8 days",
        isActive: true
      },
      {
        name: "Michael Brown",
        country: "New Zealand",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        text: "Away to Bhutan's festival tour was incredible! We experienced multiple traditional festivals with masked dances and colorful celebrations. The cultural immersion was authentic and deeply moving.",
        rating: 5,
        tripName: "Bhutan Festival Calendar Tour",
        duration: "15 days",
        isActive: true
      },
      {
        name: "Sophie Martin",
        country: "France",
        imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b830?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        text: "Totally Bhutan proved that budget travel doesn't mean compromising on authenticity. The local guesthouses, traditional meals, and cultural experiences were genuine and memorable. Great value for money!",
        rating: 4,
        tripName: "Budget Bhutan Adventure",
        duration: "7 days",
        isActive: true
      },
      {
        name: "Thomas Mueller",
        country: "Germany",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        text: "Bhutan Travel Bureau's classic tour was perfectly organized. Their decades of experience showed in every detail. A comprehensive introduction to Bhutan that covered all the major highlights efficiently.",
        rating: 5,
        tripName: "Classic Bhutan Heritage Tour",
        duration: "10 days",
        isActive: true
      }
    ];
    await db.testimonial.createMany({
      data: testimonialsData
    });
    const blogData = [
      {
        title: "Understanding Bhutan's Gross National Happiness Philosophy",
        content: "Bhutan stands unique among nations for prioritizing Gross National Happiness over Gross Domestic Product. This revolutionary approach, introduced by the Fourth King of Bhutan, Jigme Singye Wangchuck, is built on four fundamental pillars: sustainable and equitable socio-economic development, environmental conservation, preservation and promotion of cultural values, and good governance.\n\nUnlike traditional economic models that focus solely on material wealth, GNH recognizes that true progress encompasses the spiritual, physical, social and environmental health of citizens. The philosophy emphasizes that development should be holistic, serving not just the economy but the collective well-being of all people.\n\nThe four pillars work in harmony: sustainable development ensures economic growth doesn't come at the expense of future generations; environmental conservation maintains Bhutan's pristine natural heritage with over 70% forest coverage mandated by the constitution; cultural preservation keeps alive the rich traditions, language, and values that define Bhutanese identity; and good governance ensures transparent, accountable leadership that serves the people.\n\nThis approach has made Bhutan carbon-negative, one of the happiest countries in Asia, and a model for sustainable development worldwide. The GNH philosophy proves that a nation can prosper while maintaining its soul, environment, and cultural integrity.",
        excerpt: "Discover how Bhutan revolutionized national development by prioritizing citizen happiness over economic growth through the four pillars of Gross National Happiness.",
        imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Culture",
        readTime: "8 min read",
        author: "Tashi Dorji",
        authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        isPublished: true,
        publishedAt: /* @__PURE__ */ new Date()
      },
      {
        title: "The Sacred Tiger's Nest: Journey to Paro Taktsang",
        content: "Perched dramatically on a cliff face 900 meters above the Paro Valley, Paro Taktsang, known as Tiger's Nest Monastery, is Bhutan's most iconic landmark and a testament to human devotion and architectural marvel. This sacred site holds profound spiritual significance as the place where Guru Rinpoche (Padmasambhava) meditated for three years, three months, three weeks, and three days in the 8th century.\n\nLegend tells that Guru Rinpoche flew to this location on the back of a tigress, who was actually his consort Yeshe Tsogyal in her wrathful form. The monastery, built around the cave where he meditated, has been a pilgrimage site for over 1,300 years, drawing devotees from across the Buddhist world.\n\nThe journey to Tiger's Nest is as transformative as the destination itself. The trek begins at the base in Paro Valley and winds through pine forests adorned with colorful prayer flags. The path offers breathtaking views of the valley below and the monastery clinging impossibly to the cliff face above. Pilgrims and visitors alike find the 2-3 hour hike a moving meditation, with each step bringing them closer to one of Buddhism's most sacred sites.\n\nThe monastery complex consists of four main temples and residential quarters for monks, all connected by narrow staircases carved into the rock face. Inside, ancient murals, golden statues, and the sacred cave where Guru Rinpoche meditated create an atmosphere of profound spirituality that has remained unchanged for centuries.",
        excerpt: "Explore the legendary Tiger's Nest Monastery, where Guru Rinpoche meditated for over three years and established one of Buddhism's most sacred pilgrimage sites.",
        imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Culture",
        readTime: "10 min read",
        author: "Tashi Dorji",
        authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        isPublished: true,
        publishedAt: /* @__PURE__ */ new Date()
      },
      {
        title: "Bhutan's High Value, Low Impact Tourism Model",
        content: "Bhutan has pioneered a revolutionary approach to tourism that prioritizes quality over quantity, environmental protection over profit, and cultural preservation over commercialization. The 'High Value, Low Impact' tourism policy, implemented since the 1970s, has made Bhutan a global leader in sustainable travel.\n\nAt the heart of this policy is the Sustainable Development Fee (SDF), which ensures that tourism contributes meaningfully to the country's development while limiting visitor numbers to protect the environment and culture. This fee supports free healthcare and education for all Bhutanese citizens, infrastructure development, and environmental conservation programs.\n\nUnlike mass tourism destinations that often suffer from overcrowding, environmental degradation, and cultural erosion, Bhutan maintains strict limits on visitor numbers. This approach ensures that tourists receive personalized, authentic experiences while local communities benefit directly from tourism revenue without being overwhelmed by crowds.\n\nThe policy mandates that all tourists (except those from India, Bangladesh, and the Maldives) travel through licensed tour operators, ensuring quality services and authentic cultural exchanges. Visitors must book comprehensive packages that include accommodation, meals, transportation, and guide services, guaranteeing that tourism revenue reaches local communities.\n\nThis model has preserved Bhutan's pristine environment, with over 70% forest coverage, and maintained its rich cultural heritage while providing sustainable livelihoods for thousands of Bhutanese. It proves that tourism can be a force for good when managed responsibly.",
        excerpt: "Learn how Bhutan's innovative tourism policy balances visitor experiences with environmental protection and cultural preservation through sustainable practices.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Travel Tips",
        readTime: "7 min read",
        author: "Tashi Dorji",
        authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        isPublished: true,
        publishedAt: /* @__PURE__ */ new Date()
      },
      {
        title: "The Seasons of Bhutan: When to Visit the Last Shangri-La",
        content: "Bhutan's diverse geography, from subtropical plains in the south to towering Himalayan peaks in the north, creates distinct seasons that each offer unique experiences for travelers. Understanding these seasonal variations is crucial for planning the perfect Bhutanese adventure.\n\nSpring (March to May) is arguably the most spectacular time to visit Bhutan. The valleys come alive with blooming rhododendrons, Bhutan's national flower, painting the mountainsides in brilliant reds, pinks, and whites. The weather is mild and pleasant, with clear skies offering stunning views of the snow-capped Himalayas. This is also the season when many festivals take place, including the famous Paro Tsechu.\n\nAutumn (September to November) is considered the peak tourist season, and for good reason. The monsoon rains have cleared, leaving crystal-clear skies and excellent visibility of the mountain ranges. The weather is crisp and comfortable, perfect for trekking and outdoor activities. Many of Bhutan's most important festivals occur during this period, offering visitors authentic cultural experiences.\n\nSummer (June to August) brings the monsoon season, with frequent afternoon showers that keep the landscape lush and green. While some may avoid this season due to rain, it offers unique advantages: fewer tourists, lower prices, and the most vibrant green landscapes. The rain typically falls in the afternoon and evening, leaving mornings clear for sightseeing.\n\nWinter (December to February) offers clear, crisp days with stunning mountain views, though temperatures can be quite cold, especially at higher elevations. This is an excellent time for photography and experiencing Bhutan's winter festivals, though some high-altitude areas may be inaccessible due to snow.",
        excerpt: "Discover the best time to visit Bhutan based on weather, festivals, and seasonal highlights from spring rhododendrons to autumn's crystal-clear mountain views.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Travel Tips",
        readTime: "6 min read",
        author: "Tashi Dorji",
        authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        isPublished: true,
        publishedAt: /* @__PURE__ */ new Date()
      },
      {
        title: "Bhutanese Festivals: Windows into an Ancient Culture",
        content: "Bhutan's festival calendar is a vibrant tapestry of spiritual celebration, cultural preservation, and community bonding that has remained largely unchanged for centuries. These festivals, known as 'tsechus' and 'drupchens,' are not mere tourist attractions but living expressions of Bhutanese Buddhist culture and identity.\n\nThe most famous of these celebrations is the Paro Tsechu, held annually in spring at the Paro Dzong. This four-day festival culminates with the unfurling of a giant thangka (religious painting) at dawn, believed to cleanse sins simply by viewing it. Masked dancers, representing various Buddhist deities and demons, perform sacred cham dances that tell stories of good triumphing over evil.\n\nEach festival has deep spiritual significance rooted in Bhutanese Buddhism. The masked dances are not entertainment but religious ceremonies that purify the environment and bring blessings to spectators. The elaborate costumes, intricate masks, and rhythmic movements have been passed down through generations of monks and lay performers.\n\nThimphu Tshechu, the capital's grandest festival, showcases the full spectrum of Bhutanese culture. Families dress in their finest traditional attire - the gho for men and kira for women - and gather to witness the sacred performances while socializing and sharing meals. The festival serves as a reunion for extended families and a reaffirmation of cultural identity.\n\nSmaller, more intimate festivals in remote valleys like Bumthang offer visitors authentic experiences away from crowds. These celebrations maintain their traditional character, with entire communities participating in age-old rituals that connect them to their ancestors and Buddhist heritage.\n\nAttending a Bhutanese festival is like stepping back in time, witnessing traditions that have survived in their original form while the rest of the world has modernized around them.",
        excerpt: "Experience Bhutan's sacred festivals where ancient Buddhist traditions come alive through masked dances, spiritual ceremonies, and community celebrations.",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Culture",
        readTime: "9 min read",
        author: "Tashi Dorji",
        authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        isPublished: true,
        publishedAt: /* @__PURE__ */ new Date()
      },
      {
        title: "The Last Carbon-Negative Country: Bhutan's Environmental Legacy",
        content: "In a world grappling with climate change, Bhutan stands as a beacon of environmental stewardship, holding the unique distinction of being the world's only carbon-negative country. This remarkable achievement is not accidental but the result of deliberate policies, constitutional mandates, and a deep-rooted cultural reverence for nature.\n\nBhutan's constitution mandates that at least 60% of the country must remain under forest cover for all time. Currently, over 70% of the country is forested, making it a massive carbon sink that absorbs more carbon dioxide than the entire nation produces. This constitutional provision ensures that future generations will inherit a pristine environment regardless of development pressures.\n\nThe country's commitment to environmental conservation extends beyond forest coverage. Bhutan has banned the export of raw timber, prohibited hunting of wildlife, and established an extensive network of protected areas covering over 50% of the country. These protected areas are connected by biological corridors, allowing wildlife to migrate freely and maintaining ecosystem integrity.\n\nHydroelectric power, generated from Bhutan's abundant rivers, provides clean energy not only for domestic use but also for export to neighboring countries, further contributing to regional carbon reduction. The government has committed to remaining carbon-neutral for all time, even as the country develops economically.\n\nBhutan's environmental philosophy is deeply rooted in Buddhist principles that emphasize the interconnectedness of all life. This spiritual foundation, combined with practical policies and strong governance, has created a model that other nations are studying and attempting to replicate.\n\nThe country's environmental success proves that economic development and environmental protection are not mutually exclusive but can work in harmony when guided by wisdom, foresight, and genuine commitment to future generations.",
        excerpt: "Discover how Bhutan became the world's only carbon-negative country through constitutional forest protection, renewable energy, and Buddhist environmental philosophy.",
        imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Environment",
        readTime: "8 min read",
        author: "Tashi Dorji",
        authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        isPublished: true,
        publishedAt: /* @__PURE__ */ new Date()
      }
    ];
    await db.blogPost.createMany({
      data: blogData
    });
    const festivalsData = [
      {
        name: "Paro Tsechu 2025",
        description: "One of Bhutan's most famous festivals featuring sacred mask dances, traditional music, and colorful celebrations at Paro Dzong. Witness the unfurling of the giant thangka and receive blessings from the monks.",
        location: "Paro Dzong, Paro",
        startDate: /* @__PURE__ */ new Date("2025-03-15"),
        endDate: /* @__PURE__ */ new Date("2025-03-19"),
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "religious",
        highlights: [
          "Sacred Cham dances",
          "Giant thangka unfurling",
          "Traditional music performances",
          "Monk blessings",
          "Local food stalls"
        ],
        isActive: true,
        ticketPrice: 50,
        maxCapacity: 500
      },
      {
        name: "Thimphu Tshechu 2025",
        description: "The capital's grandest festival held at Tashichho Dzong, featuring elaborate mask dances, traditional costumes, and spiritual ceremonies. A perfect introduction to Bhutanese culture and Buddhism.",
        location: "Tashichho Dzong, Thimphu",
        startDate: /* @__PURE__ */ new Date("2025-02-20"),
        endDate: /* @__PURE__ */ new Date("2025-02-22"),
        imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "religious",
        highlights: [
          "Royal family attendance",
          "Elaborate mask dances",
          "Traditional costumes",
          "Cultural exhibitions",
          "Local handicrafts market"
        ],
        isActive: true,
        ticketPrice: 75,
        maxCapacity: 800
      },
      {
        name: "Punakha Drubchen 2025",
        description: "A unique festival recreating the 17th-century battle against Tibetan invaders, featuring dramatic war dances and historical reenactments at the beautiful Punakha Dzong.",
        location: "Punakha Dzong, Punakha",
        startDate: /* @__PURE__ */ new Date("2025-02-08"),
        endDate: /* @__PURE__ */ new Date("2025-02-10"),
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "cultural",
        highlights: [
          "Historical war dances",
          "Battle reenactments",
          "Traditional weapons display",
          "Dzong architecture tours",
          "River confluence views"
        ],
        isActive: true,
        ticketPrice: 60,
        maxCapacity: 300
      },
      {
        name: "Bumthang Jambay Lhakhang Drup 2025",
        description: "Ancient festival at one of Bhutan's oldest temples, featuring the famous fire ceremony and naked dance performed at midnight. A deeply spiritual and mystical experience.",
        location: "Jambay Lhakhang, Bumthang",
        startDate: /* @__PURE__ */ new Date("2025-11-05"),
        endDate: /* @__PURE__ */ new Date("2025-11-07"),
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "religious",
        highlights: [
          "Sacred fire ceremony",
          "Midnight naked dance",
          "Ancient temple rituals",
          "Spiritual blessings",
          "Traditional butter lamps"
        ],
        isActive: true,
        ticketPrice: 40,
        maxCapacity: 200
      },
      {
        name: "Wangdue Tshechu 2025",
        description: "Intimate festival in the scenic Wangdue valley, offering authentic cultural experiences away from crowds. Features traditional dances and local community participation.",
        location: "Wangdue Dzong, Wangdue",
        startDate: /* @__PURE__ */ new Date("2025-10-12"),
        endDate: /* @__PURE__ */ new Date("2025-10-14"),
        imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "cultural",
        highlights: [
          "Intimate setting",
          "Local community dances",
          "Valley scenery",
          "Traditional crafts",
          "Authentic experience"
        ],
        isActive: true,
        ticketPrice: 35,
        maxCapacity: 150
      },
      {
        name: "Rhododendron Festival 2025",
        description: "Celebrate Bhutan's national flower during peak blooming season. Nature walks, photography workshops, and cultural performances amidst stunning rhododendron forests.",
        location: "Various locations across Bhutan",
        startDate: /* @__PURE__ */ new Date("2025-04-01"),
        endDate: /* @__PURE__ */ new Date("2025-05-31"),
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "seasonal",
        highlights: [
          "Rhododendron blooms",
          "Nature photography",
          "Guided forest walks",
          "Botanical workshops",
          "Cultural performances"
        ],
        isActive: true,
        ticketPrice: null,
        // Free festival
        maxCapacity: null
      }
    ];
    const createdFestivals = await Promise.all(
      festivalsData.map((festival) => db.festival.create({ data: festival }))
    );
    const hotelsData = [
      {
        name: "Amankora Thimphu",
        description: "Ultra-luxury resort offering unparalleled comfort and service in the heart of Bhutan's capital. Features traditional Bhutanese architecture with modern amenities, spa services, and fine dining.",
        location: "Thimphu",
        address: "Upper Motithang, Thimphu 11001, Bhutan",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        category: "luxury",
        starRating: 5,
        amenities: [
          "Spa & Wellness Center",
          "Fine Dining Restaurant",
          "24/7 Room Service",
          "Concierge Service",
          "Airport Transfer",
          "Laundry Service",
          "WiFi",
          "Fitness Center"
        ],
        features: [
          "Traditional Bhutanese Architecture",
          "Mountain Views",
          "Private Gardens",
          "Cultural Experiences",
          "Meditation Sessions"
        ],
        pricePerNight: 1200,
        isActive: true,
        contactEmail: "thimphu@amankora.com",
        contactPhone: "+975-2-333333",
        website: "https://www.aman.com/resorts/amankora",
        checkInTime: "15:00",
        checkOutTime: "12:00",
        cancellationPolicy: "Free cancellation up to 48 hours before check-in"
      },
      {
        name: "Uma Paro by COMO",
        description: "Sophisticated luxury hotel with stunning valley views and world-class spa. Combines contemporary design with Bhutanese traditions, offering exceptional dining and wellness experiences.",
        location: "Paro",
        address: "Paro Valley, Paro 12001, Bhutan",
        imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        images: [
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        category: "luxury",
        starRating: 5,
        amenities: [
          "COMO Shambhala Spa",
          "Bukhari Restaurant",
          "Yoga Studio",
          "Library",
          "Gift Shop",
          "Airport Transfer",
          "WiFi",
          "Room Service"
        ],
        features: [
          "Valley Views",
          "Contemporary Design",
          "Wellness Programs",
          "Cultural Activities",
          "Hiking Trails"
        ],
        pricePerNight: 950,
        isActive: true,
        contactEmail: "paro@comohotels.com",
        contactPhone: "+975-8-271597",
        website: "https://www.comohotels.com/uma-paro",
        checkInTime: "14:00",
        checkOutTime: "12:00",
        cancellationPolicy: "Free cancellation up to 24 hours before check-in"
      },
      {
        name: "Six Senses Thimphu",
        description: "Eco-luxury resort committed to sustainability and wellness. Features organic gardens, traditional healing practices, and breathtaking Himalayan views in a serene forest setting.",
        location: "Thimphu",
        address: "Thimphu Forest, Thimphu 11001, Bhutan",
        imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        category: "eco-lodge",
        starRating: 5,
        amenities: [
          "Six Senses Spa",
          "Organic Restaurant",
          "Yoga Pavilion",
          "Meditation Center",
          "Organic Gardens",
          "Library",
          "WiFi",
          "Sustainability Programs"
        ],
        features: [
          "Forest Setting",
          "Sustainable Design",
          "Himalayan Views",
          "Wellness Focus",
          "Traditional Healing"
        ],
        pricePerNight: 1100,
        isActive: true,
        contactEmail: "thimphu@sixsenses.com",
        contactPhone: "+975-2-336699",
        website: "https://www.sixsenses.com/thimphu",
        checkInTime: "15:00",
        checkOutTime: "11:00",
        cancellationPolicy: "Free cancellation up to 72 hours before check-in"
      },
      {
        name: "Taj Tashi Thimphu",
        description: "Grand luxury hotel in the heart of Thimphu, combining traditional Bhutanese architecture with modern luxury. Features multiple dining options, spa services, and panoramic city views.",
        location: "Thimphu",
        address: "Upper Chubachu, Thimphu 11001, Bhutan",
        imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        images: [
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        category: "luxury",
        starRating: 5,
        amenities: [
          "Jiva Spa",
          "Multiple Restaurants",
          "Business Center",
          "Fitness Center",
          "Gift Shop",
          "Concierge",
          "WiFi",
          "Valet Parking"
        ],
        features: [
          "City Center Location",
          "Traditional Architecture",
          "Panoramic Views",
          "Cultural Decor",
          "Shopping Access"
        ],
        pricePerNight: 800,
        isActive: true,
        contactEmail: "tashi.thimphu@tajhotels.com",
        contactPhone: "+975-2-336699",
        website: "https://www.tajhotels.com/taj-tashi-thimphu",
        checkInTime: "14:00",
        checkOutTime: "12:00",
        cancellationPolicy: "Free cancellation up to 24 hours before check-in"
      },
      {
        name: "Zhiwa Ling Heritage Hotel",
        description: "Boutique heritage hotel showcasing traditional Bhutanese architecture and craftsmanship. Features authentic cultural experiences, traditional cuisine, and personalized service in Paro valley.",
        location: "Paro",
        address: "Satsam Chorten, Paro 12001, Bhutan",
        imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        images: [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        category: "heritage",
        starRating: 4,
        amenities: [
          "Traditional Spa",
          "Authentic Restaurant",
          "Cultural Library",
          "Craft Workshops",
          "Garden Terrace",
          "WiFi",
          "Airport Transfer",
          "Cultural Programs"
        ],
        features: [
          "Heritage Architecture",
          "Cultural Authenticity",
          "Handcrafted Interiors",
          "Traditional Arts",
          "Valley Views"
        ],
        pricePerNight: 650,
        isActive: true,
        contactEmail: "info@zhiwaling.com",
        contactPhone: "+975-8-271111",
        website: "https://www.zhiwaling.com",
        checkInTime: "14:00",
        checkOutTime: "11:00",
        cancellationPolicy: "Free cancellation up to 48 hours before check-in"
      },
      {
        name: "Le M\xE9ridien Paro",
        description: "Contemporary luxury hotel with stunning mountain views and modern amenities. Features international cuisine, wellness facilities, and easy access to Paro's cultural attractions.",
        location: "Paro",
        address: "Olakha, Paro 12001, Bhutan",
        imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        images: [
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        category: "luxury",
        starRating: 5,
        amenities: [
          "Spa & Wellness",
          "International Restaurant",
          "Bar & Lounge",
          "Fitness Center",
          "Business Center",
          "WiFi",
          "Room Service",
          "Concierge"
        ],
        features: [
          "Mountain Views",
          "Contemporary Design",
          "Cultural Access",
          "Modern Comfort",
          "International Standards"
        ],
        pricePerNight: 750,
        isActive: true,
        contactEmail: "paro@lemeridien.com",
        contactPhone: "+975-8-272888",
        website: "https://www.marriott.com/le-meridien-paro",
        checkInTime: "15:00",
        checkOutTime: "12:00",
        cancellationPolicy: "Free cancellation up to 24 hours before check-in"
      }
    ];
    const createdHotels = await Promise.all(
      hotelsData.map((hotel) => db.hotel.create({ data: hotel }))
    );
    const hotelRoomsData = [];
    for (const hotel of createdHotels) {
      const roomTypes = [
        {
          roomType: "deluxe",
          roomName: "Deluxe Valley View",
          description: "Spacious room with panoramic valley views and traditional Bhutanese decor",
          imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          maxOccupancy: 2,
          bedType: "king",
          roomSize: "45 sqm",
          amenities: ["Valley View", "King Bed", "Sitting Area", "Mini Bar", "Safe"],
          pricePerNight: hotel.pricePerNight,
          totalRooms: 10
        },
        {
          roomType: "suite",
          roomName: "Executive Suite",
          description: "Luxurious suite with separate living area and premium amenities",
          imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          maxOccupancy: 4,
          bedType: "king",
          roomSize: "75 sqm",
          amenities: ["Separate Living Room", "King Bed", "Dining Area", "Premium Minibar", "Butler Service"],
          pricePerNight: Math.round(hotel.pricePerNight * 1.5),
          totalRooms: 5
        },
        {
          roomType: "standard",
          roomName: "Standard Room",
          description: "Comfortable room with modern amenities and mountain views",
          imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          maxOccupancy: 2,
          bedType: "queen",
          roomSize: "35 sqm",
          amenities: ["Mountain View", "Queen Bed", "Work Desk", "Mini Fridge", "WiFi"],
          pricePerNight: Math.round(hotel.pricePerNight * 0.7),
          totalRooms: 15
        }
      ];
      for (const roomType of roomTypes) {
        hotelRoomsData.push({
          ...roomType,
          hotelId: hotel.id,
          images: [roomType.imageUrl],
          isActive: true
        });
      }
    }
    await db.hotelRoom.createMany({
      data: hotelRoomsData
    });
    console.log("\u2705 Database seeded successfully!");
    console.log(`\u{1F4CA} Created ${tourOperatorsData.length} tour operators`);
    console.log(`\u{1F3AF} Created ${toursData.length} tours`);
    console.log(`\u{1F4AC} Created ${testimonialsData.length} testimonials`);
    console.log(`\u{1F4DD} Created ${blogData.length} blog posts`);
    console.log(`\u{1F389} Created ${festivalsData.length} festivals`);
    console.log(`\u{1F3E8} Created ${hotelsData.length} hotels`);
    console.log(`\u{1F6CF}\uFE0F Created ${hotelRoomsData.length} hotel rooms`);
    console.log(`\u{1F389} Created ${festivalsData.length} festivals`);
    console.log(`\u{1F3E8} Created ${hotelsData.length} hotels`);
    console.log(`\u{1F6CF}\uFE0F Created ${hotelRoomsData.length} hotel rooms`);
  } catch (error) {
    console.error("\u274C Error seeding database:", error);
    process.exit(1);
  }
}
if (import.meta.url === `file://${process.argv[1]}`) {
  seed().then(() => {
    process.exit(0);
  });
}

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
  // Festival methods (stub implementations for MemStorage)
  async getAllFestivals() {
    return [];
  }
  async getActiveFestivals() {
    return [];
  }
  async getFestival(id) {
    return void 0;
  }
  async createFestival(festival) {
    throw new Error("Festival management not implemented in MemStorage");
  }
  async updateFestival(id, updates) {
    return void 0;
  }
  async deleteFestival(id) {
    return false;
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
