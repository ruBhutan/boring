import {
  type BlogPost,
  type Booking,
  type CustomTourRequest,
  type Festival,
  type FestivalBooking,
  type Guide,
  type Hotel,
  type HotelBooking,
  type HotelRoom,
  type Inquiry,
  type InsertBlogPost,
  type InsertBooking,
  type InsertCustomTourRequest,
  type InsertFestival,
  type InsertFestivalBooking,
  type InsertGuide,
  type InsertHotel,
  type InsertHotelBooking,
  type InsertHotelRoom,
  type InsertInquiry,
  type InsertItinerary,
  type InsertItineraryDay,
  type InsertTestimonial,
  type InsertTour,
  type InsertUser,
  type InsertUserAccount,
  type InsertUserFeedback,
  type Itinerary,
  type ItineraryDay,
  type Testimonial,
  type Tour,
  type User,
  type UserAccount,
  type UserFeedback
} from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Tours
  getAllTours(): Promise<Tour[]>;
  getToursByCategory(category: string): Promise<Tour[]>;
  getTour(id: number): Promise<Tour | undefined>;
  createTour(tour: InsertTour): Promise<Tour>;

  // Bookings
  getAllBookings(): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;

  // Inquiries
  getAllInquiries(): Promise<Inquiry[]>;
  getInquiry(id: number): Promise<Inquiry | undefined>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;

  // Testimonials
  getAllTestimonials(): Promise<Testimonial[]>;
  getActiveTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Blog Posts
  getAllBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;

  // Guides
  getAllGuides(): Promise<Guide[]>;
  getGuide(id: number): Promise<Guide | undefined>;
  createGuide(guide: InsertGuide): Promise<Guide>;
  updateGuideStatus(id: number, status: string): Promise<Guide | undefined>;
  getAvailableGuides(type: string): Promise<Guide[]>;

  // Itineraries
  getAllItineraries(): Promise<Itinerary[]>;
  getItinerary(id: number): Promise<Itinerary | undefined>;
  createItinerary(itinerary: InsertItinerary): Promise<Itinerary>;
  updateItinerary(id: number, updates: Partial<Itinerary>): Promise<Itinerary | undefined>;
  deleteItinerary(id: number): Promise<boolean>;

  // Itinerary Days
  getItineraryDays(itineraryId: number): Promise<ItineraryDay[]>;
  createItineraryDay(day: InsertItineraryDay): Promise<ItineraryDay>;
  updateItineraryDay(id: number, updates: Partial<ItineraryDay>): Promise<ItineraryDay | undefined>;
  deleteItineraryDay(id: number): Promise<boolean>;

  // Custom Tour Requests
  getAllCustomTourRequests(): Promise<CustomTourRequest[]>;
  getCustomTourRequest(id: number): Promise<CustomTourRequest | undefined>;
  createCustomTourRequest(request: InsertCustomTourRequest): Promise<CustomTourRequest>;
  updateCustomTourRequest(id: number, updates: Partial<CustomTourRequest>): Promise<CustomTourRequest | undefined>;

  // Festivals
  getAllFestivals(): Promise<Festival[]>;
  getActiveFestivals(): Promise<Festival[]>;
  getFestival(id: number): Promise<Festival | undefined>;
  createFestival(festival: InsertFestival): Promise<Festival>;
  updateFestival(id: number, updates: Partial<Festival>): Promise<Festival | undefined>;
  deleteFestival(id: number): Promise<boolean>;

  // Festival Bookings
  getAllFestivalBookings(): Promise<FestivalBooking[]>;
  getFestivalBooking(id: number): Promise<FestivalBooking | undefined>;
  createFestivalBooking(booking: InsertFestivalBooking): Promise<FestivalBooking>;
  updateFestivalBookingStatus(id: number, status: string): Promise<FestivalBooking | undefined>;

  // Hotels
  getAllHotels(): Promise<Hotel[]>;
  getActiveHotels(): Promise<Hotel[]>;
  getHotel(id: number): Promise<Hotel | undefined>;
  createHotel(hotel: InsertHotel): Promise<Hotel>;
  updateHotel(id: number, updates: Partial<Hotel>): Promise<Hotel | undefined>;
  deleteHotel(id: number): Promise<boolean>;

  // Hotel Rooms
  getHotelRooms(hotelId: number): Promise<HotelRoom[]>;
  getHotelRoom(id: number): Promise<HotelRoom | undefined>;
  createHotelRoom(room: InsertHotelRoom): Promise<HotelRoom>;
  updateHotelRoom(id: number, updates: Partial<HotelRoom>): Promise<HotelRoom | undefined>;
  deleteHotelRoom(id: number): Promise<boolean>;

  // Hotel Bookings
  getAllHotelBookings(): Promise<HotelBooking[]>;
  getHotelBooking(id: number): Promise<HotelBooking | undefined>;
  createHotelBooking(booking: InsertHotelBooking): Promise<HotelBooking>;
  updateHotelBookingStatus(id: number, status: string): Promise<HotelBooking | undefined>;

  // User Accounts
  getAllUserAccounts(): Promise<UserAccount[]>;
  getUserAccount(id: number): Promise<UserAccount | undefined>;
  getUserAccountByEmail(email: string): Promise<UserAccount | undefined>;
  createUserAccount(user: InsertUserAccount): Promise<UserAccount>;
  updateUserAccount(id: number, updates: Partial<UserAccount>): Promise<UserAccount | undefined>;
  updateUserLastLogin(id: number): Promise<UserAccount | undefined>;

  // User Feedback
  getAllUserFeedback(): Promise<UserFeedback[]>;
  getUserFeedback(id: number): Promise<UserFeedback | undefined>;
  getUserFeedbackByUser(userId: number): Promise<UserFeedback[]>;
  getPublicFeedback(): Promise<UserFeedback[]>;
  createUserFeedback(feedback: InsertUserFeedback): Promise<UserFeedback>;
  updateUserFeedback(id: number, updates: Partial<UserFeedback>): Promise<UserFeedback | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private tours: Map<number, Tour>;
  private bookings: Map<number, Booking>;
  private inquiries: Map<number, Inquiry>;
  private testimonials: Map<number, Testimonial>;
  private blogPosts: Map<number, BlogPost>;
  private guides: Map<number, Guide>;
  private itineraries: Map<number, Itinerary>;
  private itineraryDays: Map<number, ItineraryDay>;
  private customTourRequests: Map<number, CustomTourRequest>;
  private festivals: Map<number, Festival>;
  private currentUserId: number;
  private currentTourId: number;
  private currentBookingId: number;
  private currentInquiryId: number;
  private currentTestimonialId: number;
  private currentBlogPostId: number;
  private currentGuideId: number;
  private currentItineraryId: number;
  private currentItineraryDayId: number;
  private currentCustomTourRequestId: number;
  private currentFestivalId: number;

  constructor() {
    this.users = new Map();
    this.tours = new Map();
    this.bookings = new Map();
    this.inquiries = new Map();
    this.testimonials = new Map();
    this.blogPosts = new Map();
    this.guides = new Map();
    this.itineraries = new Map();
    this.itineraryDays = new Map();
    this.customTourRequests = new Map();
    this.festivals = new Map();
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

  private initializeData() {
    // Initialize tours
    const sampleTours: InsertTour[] = [
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
        isActive: true,
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
        isActive: true,
      },
      {
        name: "Spiritual Awakening Journey",
        description: "Find inner peace through meditation retreats, mindfulness training, and spiritual teachings.",
        duration: 7,
        price: 1890,
        category: "spiritual",
        imageUrl: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&h=600&fit=crop",
        rating: 5.0,
        reviewCount: 31,
        highlights: ["Meditation Retreats", "Spiritual Teachings", "Mindfulness Training"],
        isActive: true,
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
        isActive: true,
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
        isActive: true,
      },
      {
        name: "Royal Heritage Tour",
        description: "Exclusive access to royal palaces, private audiences, and premium accommodations in luxury resorts.",
        duration: 9,
        price: 4500,
        category: "cultural",
        imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
        rating: 5.0,
        reviewCount: 12,
        highlights: ["Royal Palaces", "Private Audiences", "Luxury Accommodations"],
        isActive: true,
      },
      {
        name: 'Laya Gasa Trek',
        duration: 14,
        price: 3800,
        category: 'trekking',
        imageUrl: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop',
        rating: 4.9,
        reviewCount: 12,
        highlights: ['Laya Village', 'Gasa Hot Springs', 'Stunning Himalayan Views', 'Diverse Flora and Fauna'],
        isActive: true,
      },
      {
        name: 'Bhutan Birding Tour',
        duration: 10,
        price: 2800,
        category: 'birdwatching',
        imageUrl: 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=800&h=600&fit=crop',
        rating: 4.8,
        reviewCount: 8,
        highlights: ['Spotting rare birds', 'Phobjikha Valley', 'Jigme Dorji National Park', 'Expert Ornithologist Guide'],
        isActive: true,
      },
      {
        name: 'Western Bhutan Cycling Tour',
        duration: 8,
        price: 2200,
        category: 'cycling',
        imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop',
        rating: 4.7,
        reviewCount: 10,
        highlights: ['Cycling over Dochula Pass', 'Punakha Dzong', 'Thimphu city ride', 'Support vehicle included'],
        isActive: true,
      }
    ];

    sampleTours.forEach(tour => this.createTour(tour));

    // Initialize testimonials
    const sampleTestimonials: InsertTestimonial[] = [
      {
        name: "Sarah Mitchell",
        country: "Australia",
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        text: "Bhutan changed my perspective on life. The team at Bhutan Mind Break didn't just show us temples—they showed us a way of being. The meditation sessions with Karma were life-changing.",
        rating: 5,
        tripName: "Cultural Immersion Tour",
        duration: "10 days",
        isActive: true,
      },
      {
        name: "Marcus Weber",
        country: "Germany",
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        text: "The Tiger's Nest trek was incredible, but what made it special was understanding its spiritual significance through our guide's eyes. Pema's knowledge of the terrain was exceptional.",
        rating: 5,
        tripName: "Himalayan Trek",
        duration: "14 days",
        isActive: true,
      },
      {
        name: "Yuki Tanaka",
        country: "Japan",
        imageUrl: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop",
        text: "I've traveled to 50+ countries, but Bhutan's happiness philosophy and this team's genuine warmth was truly unique. Every day brought new insights into mindful living.",
        rating: 5,
        tripName: "Happiness & Wellness Journey",
        duration: "7 days",
        isActive: true,
      },
    ];

    sampleTestimonials.forEach(testimonial => this.createTestimonial(testimonial));

    // Initialize blog posts
    const sampleBlogPosts: InsertBlogPost[] = [
      {
        title: "Understanding Bhutan's Gross National Happiness",
        excerpt: "Discover how Bhutan measures progress not just in economic terms, but through the holistic well-being of its people and environment.",
        content: "Full article content here...",
        imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop",
        category: "Culture",
        author: "Tenzin Norbu",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
        readTime: "5 min read",
        isPublished: true,
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
        isPublished: true,
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
        isPublished: true,
      },
    ];

    sampleBlogPosts.forEach(post => this.createBlogPost(post));

    // Initialize festivals
    const sampleFestivals: InsertFestival[] = [
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
        maxCapacity: 200,
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
        maxCapacity: null,
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
        maxCapacity: null,
      },
    ];

    sampleFestivals.forEach(festival => this.createFestival(festival));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Tour methods
  async getAllTours(): Promise<Tour[]> {
    return Array.from(this.tours.values()).filter(tour => tour.isActive);
  }

  async getToursByCategory(category: string): Promise<Tour[]> {
    return Array.from(this.tours.values()).filter(tour => 
      tour.isActive && tour.category === category
    );
  }

  async getTour(id: number): Promise<Tour | undefined> {
    return this.tours.get(id);
  }

  async createTour(insertTour: InsertTour): Promise<Tour> {
    const id = this.currentTourId++;
    const tour: Tour = {
      ...insertTour,
      id,
      isActive: insertTour.isActive ?? true,
      includes: insertTour.includes ?? [],
      excludes: insertTour.excludes ?? [],
      rating: insertTour.rating ?? 5.0,
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
  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const booking: Booking = { 
      ...insertBooking,
      id, 
      phone: insertBooking.phone ?? null,
      specialRequests: insertBooking.specialRequests ?? null,
      status: "pending",
      createdAt: new Date()
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (booking) {
      booking.status = status;
      this.bookings.set(id, booking);
      return booking;
    }
    return undefined;
  }

  // Inquiry methods
  async getAllInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }

  async getInquiry(id: number): Promise<Inquiry | undefined> {
    return this.inquiries.get(id);
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.currentInquiryId++;
    const inquiry: Inquiry = { 
      ...insertInquiry, 
      id, 
      phone: insertInquiry.phone ?? null,
      tourInterest: insertInquiry.tourInterest ?? null,
      preferredDates: insertInquiry.preferredDates ?? null,
      groupSize: insertInquiry.groupSize ?? null,
      message: insertInquiry.message ?? null,
      status: "new",
      createdAt: new Date()
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getActiveTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(testimonial => testimonial.isActive);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { 
      ...insertTestimonial, 
      id, 
      isActive: insertTestimonial.isActive ?? true 
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  // Blog post methods
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(post => post.isPublished);
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const blogPost: BlogPost = { 
      ...insertBlogPost, 
      id, 
      publishedAt: new Date(),
      isPublished: insertBlogPost.isPublished ?? true
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  // Guide methods
  async getAllGuides(): Promise<Guide[]> {
    return Array.from(this.guides.values());
  }

  async getGuide(id: number): Promise<Guide | undefined> {
    return this.guides.get(id);
  }

  async createGuide(guide: InsertGuide): Promise<Guide> {
    const id = this.currentGuideId++;
    const newGuide: Guide = { 
      ...guide, 
      id, 
      specializations: guide.specializations ?? [],
      status: "not_assigned", 
      createdAt: new Date() 
    };
    this.guides.set(id, newGuide);
    return newGuide;
  }

  async updateGuideStatus(id: number, status: string): Promise<Guide | undefined> {
    const guide = this.guides.get(id);
    if (guide) {
      guide.status = status;
      return guide;
    }
    return undefined;
  }

  async getAvailableGuides(type: string): Promise<Guide[]> {
    return Array.from(this.guides.values()).filter(guide => guide.registrationType === type);
  }

  // Itinerary methods
  async getAllItineraries(): Promise<Itinerary[]> {
    return Array.from(this.itineraries.values());
  }

  async getItinerary(id: number): Promise<Itinerary | undefined> {
    return this.itineraries.get(id);
  }

  async createItinerary(itinerary: InsertItinerary): Promise<Itinerary> {
    const id = this.currentItineraryId++;
    const newItinerary: Itinerary = { 
      ...itinerary, 
      id, 
      description: itinerary.description ?? null,
      startDate: typeof itinerary.startDate === 'string' ? new Date(itinerary.startDate) : itinerary.startDate,
      endDate: typeof itinerary.endDate === 'string' ? new Date(itinerary.endDate) : itinerary.endDate,
      guideId: itinerary.guideId ?? null,
      driverId: itinerary.driverId ?? null,
      maxParticipants: itinerary.maxParticipants ?? 12,
      currentParticipants: 0, 
      status: "active", 
      createdAt: new Date() 
    };
    this.itineraries.set(id, newItinerary);
    return newItinerary;
  }

  async updateItinerary(id: number, updates: Partial<Itinerary>): Promise<Itinerary | undefined> {
    const itinerary = this.itineraries.get(id);
    if (itinerary) {
      Object.assign(itinerary, updates);
      return itinerary;
    }
    return undefined;
  }

  async deleteItinerary(id: number): Promise<boolean> {
    return this.itineraries.delete(id);
  }

  // Itinerary Days methods
  async getItineraryDays(itineraryId: number): Promise<ItineraryDay[]> {
    return Array.from(this.itineraryDays.values()).filter(day => day.itineraryId === itineraryId);
  }

  async createItineraryDay(day: InsertItineraryDay): Promise<ItineraryDay> {
    const id = this.currentItineraryDayId++;
    const newDay: ItineraryDay = { 
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

  async updateItineraryDay(id: number, updates: Partial<ItineraryDay>): Promise<ItineraryDay | undefined> {
    const day = this.itineraryDays.get(id);
    if (day) {
      Object.assign(day, updates);
      return day;
    }
    return undefined;
  }

  async deleteItineraryDay(id: number): Promise<boolean> {
    return this.itineraryDays.delete(id);
  }

  // Custom Tour Request methods
  async getAllCustomTourRequests(): Promise<CustomTourRequest[]> {
    return Array.from(this.customTourRequests.values());
  }

  async getCustomTourRequest(id: number): Promise<CustomTourRequest | undefined> {
    return this.customTourRequests.get(id);
  }

  async createCustomTourRequest(request: InsertCustomTourRequest): Promise<CustomTourRequest> {
    const id = this.currentCustomTourRequestId++;
    const newRequest: CustomTourRequest = { 
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
      createdAt: new Date() 
    };
    this.customTourRequests.set(id, newRequest);
    return newRequest;
  }

  async updateCustomTourRequest(id: number, updates: Partial<CustomTourRequest>): Promise<CustomTourRequest | undefined> {
    const request = this.customTourRequests.get(id);
    if (request) {
      Object.assign(request, updates);
      return request;
    }
    return undefined;
  }

  // Festival methods
  async getAllFestivals(): Promise<Festival[]> {
    return Array.from(this.festivals.values());
  }

  async getActiveFestivals(): Promise<Festival[]> {
    return Array.from(this.festivals.values()).filter(festival => festival.isActive);
  }

  async getFestival(id: number): Promise<Festival | undefined> {
    return this.festivals.get(id);
  }

  async createFestival(insertFestival: InsertFestival): Promise<Festival> {
    const id = this.currentFestivalId++;
    const festival: Festival = {
      ...insertFestival,
      id,
      isActive: insertFestival.isActive ?? true,
      ticketPrice: insertFestival.ticketPrice ?? null,
      maxCapacity: insertFestival.maxCapacity ?? null,
    };
    this.festivals.set(id, festival);
    return festival;
  }

  async updateFestival(id: number, updates: Partial<Festival>): Promise<Festival | undefined> {
    const festival = this.festivals.get(id);
    if (festival) {
      Object.assign(festival, updates);
      return festival;
    }
    return undefined;
  }

  async deleteFestival(id: number): Promise<boolean> {
    return this.festivals.delete(id);
  }

  // Festival Booking methods (stub implementations)
  async getAllFestivalBookings(): Promise<FestivalBooking[]> {
    return [];
  }

  async getFestivalBooking(id: number): Promise<FestivalBooking | undefined> {
    return undefined;
  }

  async createFestivalBooking(booking: InsertFestivalBooking): Promise<FestivalBooking> {
    throw new Error("Festival booking not implemented in MemStorage");
  }

  async updateFestivalBookingStatus(id: number, status: string): Promise<FestivalBooking | undefined> {
    return undefined;
  }

  // Hotel methods (stub implementations)
  async getAllHotels(): Promise<Hotel[]> {
    return [];
  }

  async getActiveHotels(): Promise<Hotel[]> {
    return [];
  }

  async getHotel(id: number): Promise<Hotel | undefined> {
    return undefined;
  }

  async createHotel(hotel: InsertHotel): Promise<Hotel> {
    throw new Error("Hotel management not implemented in MemStorage");
  }

  async updateHotel(id: number, updates: Partial<Hotel>): Promise<Hotel | undefined> {
    return undefined;
  }

  async deleteHotel(id: number): Promise<boolean> {
    return false;
  }

  // Hotel Room methods (stub implementations)
  async getHotelRooms(hotelId: number): Promise<HotelRoom[]> {
    return [];
  }

  async getHotelRoom(id: number): Promise<HotelRoom | undefined> {
    return undefined;
  }

  async createHotelRoom(room: InsertHotelRoom): Promise<HotelRoom> {
    throw new Error("Hotel room management not implemented in MemStorage");
  }

  async updateHotelRoom(id: number, updates: Partial<HotelRoom>): Promise<HotelRoom | undefined> {
    return undefined;
  }

  async deleteHotelRoom(id: number): Promise<boolean> {
    return false;
  }

  // Hotel Booking methods (stub implementations)
  async getAllHotelBookings(): Promise<HotelBooking[]> {
    return [];
  }

  async getHotelBooking(id: number): Promise<HotelBooking | undefined> {
    return undefined;
  }

  async createHotelBooking(booking: InsertHotelBooking): Promise<HotelBooking> {
    throw new Error("Hotel booking not implemented in MemStorage");
  }

  async updateHotelBookingStatus(id: number, status: string): Promise<HotelBooking | undefined> {
    return undefined;
  }

  // User Account methods (stub implementations)
  async getAllUserAccounts(): Promise<UserAccount[]> {
    return [];
  }

  async getUserAccount(id: number): Promise<UserAccount | undefined> {
    return undefined;
  }

  async getUserAccountByEmail(email: string): Promise<UserAccount | undefined> {
    return undefined;
  }

  async createUserAccount(user: InsertUserAccount): Promise<UserAccount> {
    throw new Error("User account management not implemented in MemStorage");
  }

  async updateUserAccount(id: number, updates: Partial<UserAccount>): Promise<UserAccount | undefined> {
    return undefined;
  }

  async updateUserLastLogin(id: number): Promise<UserAccount | undefined> {
    return undefined;
  }

  // User Feedback methods (stub implementations)
  async getAllUserFeedback(): Promise<UserFeedback[]> {
    return [];
  }

  async getUserFeedback(id: number): Promise<UserFeedback | undefined> {
    return undefined;
  }

  async getUserFeedbackByUser(userId: number): Promise<UserFeedback[]> {
    return [];
  }

  async getPublicFeedback(): Promise<UserFeedback[]> {
    return [];
  }

  async createUserFeedback(feedback: InsertUserFeedback): Promise<UserFeedback> {
    throw new Error("User feedback not implemented in MemStorage");
  }

  async updateUserFeedback(id: number, updates: Partial<UserFeedback>): Promise<UserFeedback | undefined> {
    return undefined;
  }
}

// Database Storage Implementation using Prisma
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const user = await db.user.findUnique({
      where: { id }
    });
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const user = await db.user.findUnique({
      where: { username }
    });
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    return await db.user.create({
      data: insertUser
    });
  }

  async getAllTours(): Promise<Tour[]> {
    return await db.tour.findMany({
      where: { isActive: true }
    });
  }

  async getToursByCategory(category: string): Promise<Tour[]> {
    return await db.tour.findMany({
      where: { 
        category,
        isActive: true 
      }
    });
  }

  async getTour(id: number): Promise<Tour | undefined> {
    const tour = await db.tour.findUnique({
      where: { id }
    });
    return tour || undefined;
  }

  async createTour(insertTour: InsertTour): Promise<Tour> {
    return await db.tour.create({
      data: insertTour
    });
  }

  async getAllBookings(): Promise<Booking[]> {
    return await db.booking.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    const booking = await db.booking.findUnique({
      where: { id }
    });
    return booking || undefined;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    return await db.booking.create({
      data: insertBooking
    });
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    try {
      const booking = await db.booking.update({
        where: { id },
        data: { status }
      });
      return booking;
    } catch (error) {
      return undefined;
    }
  }

  async getAllInquiries(): Promise<Inquiry[]> {
    return await db.inquiry.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getInquiry(id: number): Promise<Inquiry | undefined> {
    const inquiry = await db.inquiry.findUnique({
      where: { id }
    });
    return inquiry || undefined;
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    return await db.inquiry.create({
      data: insertInquiry
    });
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return await db.testimonial.findMany();
  }

  async getActiveTestimonials(): Promise<Testimonial[]> {
    return await db.testimonial.findMany({
      where: { isActive: true }
    });
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    return await db.testimonial.create({
      data: insertTestimonial
    });
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return await db.blogPost.findMany({
      orderBy: { publishedAt: 'desc' }
    });
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' }
    });
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const post = await db.blogPost.findUnique({
      where: { id }
    });
    return post || undefined;
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    return await db.blogPost.create({
      data: insertBlogPost
    });
  }

  // Guide Management
  async getAllGuides(): Promise<Guide[]> {
    return await db.guide.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getGuide(id: number): Promise<Guide | undefined> {
    const guide = await db.guide.findUnique({
      where: { id }
    });
    return guide || undefined;
  }

  async createGuide(guide: InsertGuide): Promise<Guide> {
    return await db.guide.create({
      data: guide
    });
  }

  async updateGuideStatus(id: number, status: string): Promise<Guide | undefined> {
    try {
      const guide = await db.guide.update({
        where: { id },
        data: { status }
      });
      return guide;
    } catch (error) {
      return undefined;
    }
  }

  async getAvailableGuides(type: string): Promise<Guide[]> {
    return await db.guide.findMany({
      where: { registrationType: type },
      orderBy: { createdAt: 'desc' }
    });
  }

  // Itinerary Management
  async getAllItineraries(): Promise<Itinerary[]> {
    return await db.itinerary.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getItinerary(id: number): Promise<Itinerary | undefined> {
    const itinerary = await db.itinerary.findUnique({
      where: { id }
    });
    return itinerary || undefined;
  }

  async createItinerary(itinerary: InsertItinerary): Promise<Itinerary> {
    const data = {
      ...itinerary,
      startDate: typeof itinerary.startDate === 'string' ? new Date(itinerary.startDate) : itinerary.startDate,
      endDate: typeof itinerary.endDate === 'string' ? new Date(itinerary.endDate) : itinerary.endDate,
    };
    
    return await db.itinerary.create({
      data
    });
  }

  async updateItinerary(id: number, updates: Partial<Itinerary>): Promise<Itinerary | undefined> {
    try {
      const itinerary = await db.itinerary.update({
        where: { id },
        data: updates
      });
      return itinerary;
    } catch (error) {
      return undefined;
    }
  }

  async deleteItinerary(id: number): Promise<boolean> {
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
  async getItineraryDays(itineraryId: number): Promise<ItineraryDay[]> {
    return await db.itineraryDay.findMany({
      where: { itineraryId },
      orderBy: { dayNumber: 'asc' }
    });
  }

  async createItineraryDay(day: InsertItineraryDay): Promise<ItineraryDay> {
    return await db.itineraryDay.create({
      data: day
    });
  }

  async updateItineraryDay(id: number, updates: Partial<ItineraryDay>): Promise<ItineraryDay | undefined> {
    try {
      const day = await db.itineraryDay.update({
        where: { id },
        data: updates
      });
      return day;
    } catch (error) {
      return undefined;
    }
  }

  async deleteItineraryDay(id: number): Promise<boolean> {
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
  async getAllCustomTourRequests(): Promise<CustomTourRequest[]> {
    return await db.customTourRequest.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getCustomTourRequest(id: number): Promise<CustomTourRequest | undefined> {
    const request = await db.customTourRequest.findUnique({
      where: { id }
    });
    return request || undefined;
  }

  async createCustomTourRequest(request: InsertCustomTourRequest): Promise<CustomTourRequest> {
    return await db.customTourRequest.create({
      data: request
    });
  }

  async updateCustomTourRequest(id: number, updates: Partial<CustomTourRequest>): Promise<CustomTourRequest | undefined> {
    try {
      const request = await db.customTourRequest.update({
        where: { id },
        data: updates
      });
      return request;
    } catch (error) {
      return undefined;
    }
  }

  // Festival Management
  async getAllFestivals(): Promise<Festival[]> {
    return await db.festival.findMany({
      orderBy: { startDate: 'asc' }
    });
  }

  async getActiveFestivals(): Promise<Festival[]> {
    return await db.festival.findMany({
      where: { isActive: true },
      orderBy: { startDate: 'asc' }
    });
  }

  async getFestival(id: number): Promise<Festival | undefined> {
    const festival = await db.festival.findUnique({
      where: { id }
    });
    return festival || undefined;
  }

  async createFestival(festival: InsertFestival): Promise<Festival> {
    const data = {
      ...festival,
      startDate: typeof festival.startDate === 'string' ? new Date(festival.startDate) : festival.startDate,
      endDate: typeof festival.endDate === 'string' ? new Date(festival.endDate) : festival.endDate,
    };
    
    return await db.festival.create({
      data
    });
  }

  async updateFestival(id: number, updates: Partial<Festival>): Promise<Festival | undefined> {
    try {
      const festival = await db.festival.update({
        where: { id },
        data: updates
      });
      return festival;
    } catch (error) {
      return undefined;
    }
  }

  async deleteFestival(id: number): Promise<boolean> {
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
  async getAllFestivalBookings(): Promise<FestivalBooking[]> {
    return await db.festivalBooking.findMany({
      orderBy: { createdAt: 'desc' },
      include: { festival: true }
    });
  }

  async getFestivalBooking(id: number): Promise<FestivalBooking | undefined> {
    const booking = await db.festivalBooking.findUnique({
      where: { id },
      include: { festival: true }
    });
    return booking || undefined;
  }

  async createFestivalBooking(booking: InsertFestivalBooking): Promise<FestivalBooking> {
    return await db.festivalBooking.create({
      data: booking
    });
  }

  async updateFestivalBookingStatus(id: number, status: string): Promise<FestivalBooking | undefined> {
    try {
      const booking = await db.festivalBooking.update({
        where: { id },
        data: { status }
      });
      return booking;
    } catch (error) {
      return undefined;
    }
  }

  // Hotel Management
  async getAllHotels(): Promise<Hotel[]> {
    return await db.hotel.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getActiveHotels(): Promise<Hotel[]> {
    return await db.hotel.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    });
  }

  async getHotel(id: number): Promise<Hotel | undefined> {
    const hotel = await db.hotel.findUnique({
      where: { id },
      include: { rooms: true }
    });
    return hotel || undefined;
  }

  async createHotel(hotel: InsertHotel): Promise<Hotel> {
    return await db.hotel.create({
      data: hotel
    });
  }

  async updateHotel(id: number, updates: Partial<Hotel>): Promise<Hotel | undefined> {
    try {
      const hotel = await db.hotel.update({
        where: { id },
        data: updates
      });
      return hotel;
    } catch (error) {
      return undefined;
    }
  }

  async deleteHotel(id: number): Promise<boolean> {
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
  async getHotelRooms(hotelId: number): Promise<HotelRoom[]> {
    return await db.hotelRoom.findMany({
      where: { hotelId },
      orderBy: { roomType: 'asc' }
    });
  }

  async getHotelRoom(id: number): Promise<HotelRoom | undefined> {
    const room = await db.hotelRoom.findUnique({
      where: { id },
      include: { hotel: true }
    });
    return room || undefined;
  }

  async createHotelRoom(room: InsertHotelRoom): Promise<HotelRoom> {
    return await db.hotelRoom.create({
      data: room
    });
  }

  async updateHotelRoom(id: number, updates: Partial<HotelRoom>): Promise<HotelRoom | undefined> {
    try {
      const room = await db.hotelRoom.update({
        where: { id },
        data: updates
      });
      return room;
    } catch (error) {
      return undefined;
    }
  }

  async deleteHotelRoom(id: number): Promise<boolean> {
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
  async getAllHotelBookings(): Promise<HotelBooking[]> {
    return await db.hotelBooking.findMany({
      orderBy: { createdAt: 'desc' },
      include: { hotel: true, room: true }
    });
  }

  async getHotelBooking(id: number): Promise<HotelBooking | undefined> {
    const booking = await db.hotelBooking.findUnique({
      where: { id },
      include: { hotel: true, room: true }
    });
    return booking || undefined;
  }

  async createHotelBooking(booking: InsertHotelBooking): Promise<HotelBooking> {
    const data = {
      ...booking,
      checkInDate: typeof booking.checkInDate === 'string' ? new Date(booking.checkInDate) : booking.checkInDate,
      checkOutDate: typeof booking.checkOutDate === 'string' ? new Date(booking.checkOutDate) : booking.checkOutDate,
    };
    
    return await db.hotelBooking.create({
      data
    });
  }

  async updateHotelBookingStatus(id: number, status: string): Promise<HotelBooking | undefined> {
    try {
      const booking = await db.hotelBooking.update({
        where: { id },
        data: { status }
      });
      return booking;
    } catch (error) {
      return undefined;
    }
  }

  // User Account Management
  async getAllUserAccounts(): Promise<UserAccount[]> {
    return await db.userAccount.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getUserAccount(id: number): Promise<UserAccount | undefined> {
    const user = await db.userAccount.findUnique({
      where: { id }
    });
    return user || undefined;
  }

  async getUserAccountByEmail(email: string): Promise<UserAccount | undefined> {
    const user = await db.userAccount.findUnique({
      where: { email }
    });
    return user || undefined;
  }

  async createUserAccount(user: InsertUserAccount): Promise<UserAccount> {
    return await db.userAccount.create({
      data: user
    });
  }

  async updateUserAccount(id: number, updates: Partial<UserAccount>): Promise<UserAccount | undefined> {
    try {
      const user = await db.userAccount.update({
        where: { id },
        data: updates
      });
      return user;
    } catch (error) {
      return undefined;
    }
  }

  async updateUserLastLogin(id: number): Promise<UserAccount | undefined> {
    try {
      const user = await db.userAccount.update({
        where: { id },
        data: { lastLoginAt: new Date() }
      });
      return user;
    } catch (error) {
      return undefined;
    }
  }

  // User Feedback Management
  async getAllUserFeedback(): Promise<UserFeedback[]> {
    return await db.userFeedback.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: true, tour: true, itinerary: true }
    });
  }

  async getUserFeedback(id: number): Promise<UserFeedback | undefined> {
    const feedback = await db.userFeedback.findUnique({
      where: { id },
      include: { user: true, tour: true, itinerary: true }
    });
    return feedback || undefined;
  }

  async getUserFeedbackByUser(userId: number): Promise<UserFeedback[]> {
    return await db.userFeedback.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { tour: true, itinerary: true }
    });
  }

  async getPublicFeedback(): Promise<UserFeedback[]> {
    return await db.userFeedback.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: 'desc' },
      include: { user: true, tour: true }
    });
  }

  async createUserFeedback(feedback: InsertUserFeedback): Promise<UserFeedback> {
    return await db.userFeedback.create({
      data: feedback
    });
  }

  async updateUserFeedback(id: number, updates: Partial<UserFeedback>): Promise<UserFeedback | undefined> {
    try {
      const feedback = await db.userFeedback.update({
        where: { id },
        data: updates
      });
      return feedback;
    } catch (error) {
      return undefined;
    }
  }
}

// Use database storage when DATABASE_URL is available, otherwise use memory storage
export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();