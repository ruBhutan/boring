import {
  insertBookingSchema, insertCustomTourRequestSchema, insertGuideSchema, insertInquirySchema,
  insertItineraryDaySchema, insertItinerarySchema, insertTourOperatorSchema, insertFestivalSchema,
  insertFestivalBookingSchema, insertHotelSchema, insertHotelRoomSchema, insertHotelBookingSchema,
  insertUserAccountSchema, insertUserFeedbackSchema
} from "@shared/schema";
import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { db } from "./db";
import { seed } from "./seed";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Tours
  app.get("/api/tours", async (req, res) => {
    try {
      const { category } = req.query;
      let tours;
      
      if (category && typeof category === 'string') {
        tours = await storage.getToursByCategory(category);
      } else {
        tours = await storage.getAllTours();
      }
      
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tours" });
    }
  });

  // Specific category routes (must come before the generic :id route)
  app.get("/api/tours/cultural", async (req, res) => {
    try {
      const tours = await db.tour.findMany({
        where: { category: "Cultural", isActive: true }
      });
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cultural tours" });
    }
  });

  app.get("/api/tours/luxury", async (req, res) => {
    try {
      const tours = await db.tour.findMany({
        where: { category: "Luxury", isActive: true }
      });
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch luxury tours" });
    }
  });

  app.get("/api/tours/adventure", async (req, res) => {
    try {
      const tours = await db.tour.findMany({
        where: { category: "Adventure", isActive: true }
      });
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch adventure tours" });
    }
  });

  app.get("/api/tours/spiritual", async (req, res) => {
    try {
      const tours = await db.tour.findMany({
        where: { category: "Spiritual", isActive: true }
      });
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch spiritual tours" });
    }
  });

  app.get("/api/tours/festival", async (req, res) => {
    try {
      const tours = await db.tour.findMany({
        where: { category: "Cultural", isActive: true }
      });
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch festival tours" });
    }
  });

  app.get("/api/tours/bespoke", async (req, res) => {
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

  app.get("/api/tours/photography", async (req, res) => {
    try {
      const tours = await db.tour.findMany({
        where: { category: "Photography", isActive: true }
      });
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch photography tours" });
    }
  });

  app.get("/api/tours/birdwatching", async (req, res) => {
    try {
      const tours = await db.tour.findMany({
        where: { category: "Birdwatching", isActive: true }
      });
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bird watching tours" });
    }
  });

  app.get("/api/tours/cycling", async (req, res) => {
    try {
      const tours = await db.tour.findMany({
        where: { category: "Cycling", isActive: true }
      });
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cycling tours" });
    }
  });

  app.get("/api/tours/pilgrimage", async (req, res) => {
    try {
      const tours = await db.tour.findMany({
        where: { category: "Pilgrimage", isActive: true }
      });
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch pilgrimage tours" });
    }
  });

  app.get("/api/tours/wellness", async (req, res) => {
    try {
      const tours = await db.tour.findMany({
        where: { category: "Wellness", isActive: true }
      });
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch wellness tours" });
    }
  });

  app.get("/api/tours/:id", async (req, res) => {
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

  // Bookings
  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create booking" });
      }
    }
  });

  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  app.patch("/api/bookings/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status || typeof status !== 'string') {
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

  // Inquiries
  app.post("/api/inquiries", async (req, res) => {
    try {
      const inquiryData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(inquiryData);
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid inquiry data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create inquiry" });
      }
    }
  });

  app.get("/api/inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getAllInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });

  // Tours CRUD
  app.post("/api/tours", async (req, res) => {
    try {
      const tourData = req.body;
      const tour = await db.tour.create({ data: tourData });
      res.status(201).json(tour);
    } catch (error) {
      res.status(500).json({ message: "Failed to create tour" });
    }
  });

  app.put("/api/tours/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const tour = await db.tour.update({ where: { id }, data: updates });
      res.json(tour);
    } catch (error) {
      res.status(500).json({ message: "Failed to update tour" });
    }
  });

  app.delete("/api/tours/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await db.tour.delete({ where: { id } });
      res.json({ message: "Tour deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete tour" });
    }
  });

  // Testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getActiveTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const testimonialData = req.body;
      const testimonial = await db.testimonial.create({ data: testimonialData });
      res.status(201).json(testimonial);
    } catch (error) {
      res.status(500).json({ message: "Failed to create testimonial" });
    }
  });

  // Blog Posts
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getPublishedBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.post("/api/blog", async (req, res) => {
    try {
      const blogData = req.body;
      const post = await db.blogPost.create({ data: blogData });
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to create blog post" });
    }
  });

  app.get("/api/blog/:id", async (req, res) => {
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

  // Guide Registration and Management
  app.post("/api/guides/register", async (req, res) => {
    try {
      const guideData = insertGuideSchema.parse(req.body);
      const guide = await storage.createGuide(guideData);
      res.status(201).json({ 
        message: "Registration successful! We will call and inform you if we require your services.",
        guide 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid registration data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Registration failed" });
      }
    }
  });

  app.get("/api/guides", async (req, res) => {
    try {
      const { type } = req.query;
      let guides;
      
      if (type && typeof type === 'string') {
        guides = await storage.getAvailableGuides(type);
      } else {
        guides = await storage.getAllGuides();
      }
      
      res.json(guides);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch guides" });
    }
  });

  app.patch("/api/guides/:id/status", async (req, res) => {
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

  // Itinerary Management
  app.post("/api/itineraries", async (req, res) => {
    try {
      const itineraryData = insertItinerarySchema.parse(req.body);
      const itinerary = await storage.createItinerary(itineraryData);
      
      // Update guide and driver status to assigned if specified
      if (itineraryData.guideId) {
        await storage.updateGuideStatus(itineraryData.guideId, "assigned");
      }
      if (itineraryData.driverId) {
        await storage.updateGuideStatus(itineraryData.driverId, "assigned");
      }
      
      res.status(201).json(itinerary);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid itinerary data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create itinerary" });
      }
    }
  });

  app.get("/api/itineraries", async (req, res) => {
    try {
      const itineraries = await storage.getAllItineraries();
      res.json(itineraries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch itineraries" });
    }
  });

  app.get("/api/itineraries/:id", async (req, res) => {
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

  app.put("/api/itineraries/:id", async (req, res) => {
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

  app.delete("/api/itineraries/:id", async (req, res) => {
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

  // Itinerary Days Management
  app.post("/api/itineraries/:id/days", async (req, res) => {
    try {
      const itineraryId = parseInt(req.params.id);
      const dayData = { ...req.body, itineraryId };
      const parsedData = insertItineraryDaySchema.parse(dayData);
      
      const day = await storage.createItineraryDay(parsedData);
      res.status(201).json(day);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid day data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create itinerary day" });
      }
    }
  });

  app.put("/api/itinerary-days/:id", async (req, res) => {
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

  app.delete("/api/itinerary-days/:id", async (req, res) => {
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

  // Custom Tour Requests
  app.post("/api/custom-tours", async (req, res) => {
    try {
      const requestData = insertCustomTourRequestSchema.parse(req.body);
      const request = await storage.createCustomTourRequest(requestData);
      res.status(201).json(request);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid custom tour request", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create custom tour request" });
      }
    }
  });

  app.get("/api/custom-tours", async (req, res) => {
    try {
      const requests = await storage.getAllCustomTourRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch custom tour requests" });
    }
  });

  app.get("/api/custom-tours/:id", async (req, res) => {
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

  app.put("/api/custom-tours/:id", async (req, res) => {
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

  // Tour Operators Management
  app.get("/api/tour-operators", async (req, res) => {
    try {
      const operators = await db.tourOperator.findMany({
        orderBy: { createdAt: 'desc' }
      });
      res.json(operators);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tour operators" });
    }
  });

  app.get("/api/tour-operators/:id", async (req, res) => {
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

  app.post("/api/tour-operators", async (req, res) => {
    try {
      const operatorData = insertTourOperatorSchema.parse(req.body);
      const operator = await db.tourOperator.create({
        data: operatorData
      });
      res.status(201).json(operator);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid tour operator data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create tour operator" });
      }
    }
  });

  app.put("/api/tour-operators/:id", async (req, res) => {
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

  app.delete("/api/tour-operators/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      // First, update all tours to remove the operator reference
      await db.tour.updateMany({
        where: { tourOperatorId: id },
        data: { tourOperatorId: null }
      });
      
      // Then delete the operator
      await db.tourOperator.delete({
        where: { id }
      });
      
      res.json({ message: "Tour operator deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete tour operator" });
    }
  });

  // Database Management Operations
  app.post("/api/seed", async (req, res) => {
    try {
      console.log("🌱 Starting database seed from API...");
      await seed();
      
      // Get counts for response
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
      console.error("❌ Seed error:", error);
      res.status(500).json({
        message: "Failed to seed database",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.post("/api/clear-database", async (req, res) => {
    try {
      console.log("🗑️ Clearing database...");
      
      // Clear all data in the correct order (respecting foreign key constraints)
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
      
      console.log("✅ Database cleared successfully!");
      res.json({ message: "Database cleared successfully!" });
    } catch (error) {
      console.error("❌ Clear database error:", error);
      res.status(500).json({
        message: "Failed to clear database",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Festival Management Routes
  app.get("/api/festivals", async (req, res) => {
    try {
      const festivals = await storage.getActiveFestivals();
      res.json(festivals);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch festivals" });
    }
  });

  app.get("/api/festivals/:id", async (req, res) => {
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

  app.post("/api/festivals", async (req, res) => {
    try {
      const festivalData = insertFestivalSchema.parse(req.body);
      const festival = await storage.createFestival(festivalData);
      res.status(201).json(festival);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid festival data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create festival" });
      }
    }
  });

  app.put("/api/festivals/:id", async (req, res) => {
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

  app.delete("/api/festivals/:id", async (req, res) => {
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

  // Festival Booking Routes
  app.post("/api/festival-bookings", async (req, res) => {
    try {
      const bookingData = insertFestivalBookingSchema.parse(req.body);
      const booking = await storage.createFestivalBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create festival booking" });
      }
    }
  });

  app.get("/api/festival-bookings", async (req, res) => {
    try {
      const bookings = await storage.getAllFestivalBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch festival bookings" });
    }
  });

  app.patch("/api/festival-bookings/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status || typeof status !== 'string') {
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

  // Hotel Management Routes
  app.get("/api/hotels", async (req, res) => {
    try {
      const hotels = await storage.getActiveHotels();
      res.json(hotels);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hotels" });
    }
  });

  app.get("/api/hotels/:id", async (req, res) => {
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

  app.post("/api/hotels", async (req, res) => {
    try {
      const hotelData = insertHotelSchema.parse(req.body);
      const hotel = await storage.createHotel(hotelData);
      res.status(201).json(hotel);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid hotel data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create hotel" });
      }
    }
  });

  app.put("/api/hotels/:id", async (req, res) => {
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

  app.delete("/api/hotels/:id", async (req, res) => {
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

  // Hotel Room Routes
  app.get("/api/hotels/:hotelId/rooms", async (req, res) => {
    try {
      const hotelId = parseInt(req.params.hotelId);
      const rooms = await storage.getHotelRooms(hotelId);
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hotel rooms" });
    }
  });

  app.post("/api/hotel-rooms", async (req, res) => {
    try {
      const roomData = insertHotelRoomSchema.parse(req.body);
      const room = await storage.createHotelRoom(roomData);
      res.status(201).json(room);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid room data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create hotel room" });
      }
    }
  });

  app.put("/api/hotel-rooms/:id", async (req, res) => {
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

  app.delete("/api/hotel-rooms/:id", async (req, res) => {
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

  // Hotel Booking Routes
  app.post("/api/hotel-bookings", async (req, res) => {
    try {
      const bookingData = insertHotelBookingSchema.parse(req.body);
      const booking = await storage.createHotelBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create hotel booking" });
      }
    }
  });

  app.get("/api/hotel-bookings", async (req, res) => {
    try {
      const bookings = await storage.getAllHotelBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hotel bookings" });
    }
  });

  app.patch("/api/hotel-bookings/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status || typeof status !== 'string') {
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

  // Authentication Routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Mock authentication - in real app, verify against database
      const mockUsers = [
        { id: 1, email: 'admin@bhutan.com', password: 'admin123', firstName: 'Admin', lastName: 'User', role: 'admin' },
        { id: 2, email: 'guide@bhutan.com', password: 'guide123', firstName: 'Tenzin', lastName: 'Guide', role: 'guide' },
        { id: 3, email: 'driver@bhutan.com', password: 'driver123', firstName: 'Karma', lastName: 'Driver', role: 'driver' },
        { id: 4, email: 'tourist@bhutan.com', password: 'tourist123', firstName: 'John', lastName: 'Tourist', role: 'tourist' },
      ];

      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        res.json({ user: userWithoutPassword, token: 'mock-jwt-token' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Authentication failed' });
    }
  });

  // User Account Routes
  app.post("/api/user-accounts", async (req, res) => {
    try {
      const userData = insertUserAccountSchema.parse(req.body);
      const user = await storage.createUserAccount(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid user data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create user account" });
      }
    }
  });

  app.get("/api/user-accounts", async (req, res) => {
    try {
      const users = await storage.getAllUserAccounts();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user accounts" });
    }
  });

  app.get("/api/user-accounts/:id", async (req, res) => {
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

  // User Feedback Routes
  app.post("/api/user-feedback", async (req, res) => {
    try {
      const feedbackData = insertUserFeedbackSchema.parse(req.body);
      const feedback = await storage.createUserFeedback(feedbackData);
      res.status(201).json(feedback);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid feedback data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create feedback" });
      }
    }
  });

  app.get("/api/user-feedback", async (req, res) => {
    try {
      const { userId, public: isPublic } = req.query;
      
      let feedback;
      if (userId) {
        feedback = await storage.getUserFeedbackByUser(parseInt(userId as string));
      } else if (isPublic === 'true') {
        feedback = await storage.getPublicFeedback();
      } else {
        feedback = await storage.getAllUserFeedback();
      }
      
      res.json(feedback);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch feedback" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
