import { z } from "zod";
import type {
  User, Tour, Booking, Inquiry, Testimonial, BlogPost,
  Guide, Itinerary, ItineraryDay, CustomTourRequest, TourOperator,
  Festival, FestivalBooking, Hotel, HotelRoom, HotelBooking,
  UserAccount, UserFeedback
} from "@prisma/client";

// Zod schemas for validation
export const insertUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const insertTourSchema = z.object({
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
  tourOperatorId: z.number().int().positive().optional(),
});

export const insertTourOperatorSchema = z.object({
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
  awards: z.array(z.string()).optional(),
});

export const insertBookingSchema = z.object({
  tourId: z.number().int().positive(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  travelDate: z.string().min(1),
  groupSize: z.number().int().positive(),
  specialRequests: z.string().optional(),
});

export const insertInquirySchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  tourInterest: z.string().optional(),
  preferredDates: z.string().optional(),
  groupSize: z.string().optional(),
  message: z.string().optional(),
});

export const insertTestimonialSchema = z.object({
  name: z.string().min(1),
  country: z.string().min(1),
  imageUrl: z.string().url(),
  text: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  tripName: z.string().min(1),
  duration: z.string().min(1),
  isActive: z.boolean().optional(),
});

export const insertBlogPostSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  imageUrl: z.string().url(),
  category: z.string().min(1),
  author: z.string().min(1),
  authorImage: z.string().url(),
  readTime: z.string().min(1),
  isPublished: z.boolean().optional(),
});

export const insertGuideSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  licenseImageUrl: z.string().url(),
  registrationType: z.enum(["guide", "driver"]),
  specializations: z.array(z.string()).optional(),
});

export const insertItinerarySchema = z.object({
  tourId: z.number().int().positive(),
  name: z.string().min(1),
  description: z.string().optional(),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()),
  guideId: z.number().int().positive().optional(),
  driverId: z.number().int().positive().optional(),
  maxParticipants: z.number().int().positive().optional(),
});

export const insertItineraryDaySchema = z.object({
  itineraryId: z.number().int().positive(),
  dayNumber: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string().min(1),
  activities: z.array(z.string()).optional(),
  accommodation: z.string().optional(),
  meals: z.array(z.string()).optional(),
  transportation: z.string().optional(),
  notes: z.string().optional(),
});

export const insertCustomTourRequestSchema = z.object({
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
  transportPreference: z.enum(["private", "shared", "mixed"]).optional(),
});

// Festival schemas
export const insertFestivalSchema = z.object({
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
  maxCapacity: z.number().int().positive().optional(),
});

export const insertFestivalBookingSchema = z.object({
  festivalId: z.number().int().positive(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  numberOfTickets: z.number().int().positive(),
  totalAmount: z.number().int().nonnegative(),
  specialRequests: z.string().optional(),
});

// Hotel schemas
export const insertHotelSchema = z.object({
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
  cancellationPolicy: z.string().optional(),
});

export const insertHotelRoomSchema = z.object({
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
  isActive: z.boolean().optional(),
});

export const insertHotelBookingSchema = z.object({
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
  specialRequests: z.string().optional(),
});

// User Account schemas
export const insertUserAccountSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
  role: z.enum(["tourist", "guide", "driver", "admin"]),
  profileImage: z.string().url().optional(),
});

export const insertUserFeedbackSchema = z.object({
  userId: z.number().int().positive(),
  itineraryId: z.number().int().positive().optional(),
  tourId: z.number().int().positive().optional(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
  category: z.enum(["tour", "guide", "driver", "accommodation", "overall"]),
  isPublic: z.boolean().optional(),
});

// Export Prisma types
export type {
  User, Tour, Booking, Inquiry, Testimonial, BlogPost,
  Guide, Itinerary, ItineraryDay, CustomTourRequest, TourOperator,
  Festival, FestivalBooking, Hotel, HotelRoom, HotelBooking,
  UserAccount, UserFeedback
};

// Export inferred types from Zod schemas
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertTour = z.infer<typeof insertTourSchema>;
export type InsertTourOperator = z.infer<typeof insertTourOperatorSchema>;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type InsertGuide = z.infer<typeof insertGuideSchema>;
export type InsertItinerary = z.infer<typeof insertItinerarySchema>;
export type InsertItineraryDay = z.infer<typeof insertItineraryDaySchema>;
export type InsertCustomTourRequest = z.infer<typeof insertCustomTourRequestSchema>;
export type InsertFestival = z.infer<typeof insertFestivalSchema>;
export type InsertFestivalBooking = z.infer<typeof insertFestivalBookingSchema>;
export type InsertHotel = z.infer<typeof insertHotelSchema>;
export type InsertHotelRoom = z.infer<typeof insertHotelRoomSchema>;
export type InsertHotelBooking = z.infer<typeof insertHotelBookingSchema>;
export type InsertUserAccount = z.infer<typeof insertUserAccountSchema>;
export type InsertUserFeedback = z.infer<typeof insertUserFeedbackSchema>;
