import { db } from "./db";
import { enhancedToursData } from "./enhanced-tours";
import { enhancedHotelsData, enhancedHotelRoomsData } from "./enhanced-hotels";
import { enhancedFestivalsData } from "./enhanced-festivals";
import { additionalToursData } from "./additional-tours";
import { additionalHotelsData, additionalHotelRoomsData } from "./additional-hotels";

export async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Clear existing data
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

    // Seed tour operators based on top Bhutan tour operators
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
      tourOperatorsData.map(operator => db.tourOperator.create({ data: operator }))
    );

    // Use enhanced and additional tour data inspired by top Bhutan tour operators and global tour companies
    const allToursData = [...enhancedToursData, ...additionalToursData];
    const toursData = allToursData.map((tour, index) => ({
      ...tour,
      tourOperatorId: createdOperators[index % createdOperators.length].id
    }));

    await db.tour.createMany({
      data: toursData
    });

    // Seed enhanced and additional hotels
    const allHotelsData = [...enhancedHotelsData, ...additionalHotelsData];
    const hotelsData = allHotelsData;
    const createdHotels = await Promise.all(
      hotelsData.map(hotel => db.hotel.create({ data: hotel }))
    );

    // Seed enhanced and additional hotel rooms
    const allHotelRoomsData = [...enhancedHotelRoomsData, ...additionalHotelRoomsData];
    const hotelRoomsData = allHotelRoomsData.map((room, index) => ({
      ...room,
      hotelId: createdHotels[index % createdHotels.length].id
    }));

    await db.hotelRoom.createMany({
      data: hotelRoomsData
    });

    // Seed enhanced festivals
    const festivalsData = enhancedFestivalsData;
    await db.festival.createMany({
      data: festivalsData
    });

    // Seed comprehensive testimonials
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

    // Seed blog posts
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

    // Seed user accounts
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

    console.log("✅ Database seeded successfully!");
    console.log("📊 Created", createdOperators.length, "tour operators");
    console.log("🎯 Created", toursData.length, "tours");
    console.log("💬 Created", testimonialsData.length, "testimonials");
    console.log("📝 Created", blogPostsData.length, "blog posts");
    console.log("🎉 Created", festivalsData.length, "festivals");
    console.log("🏨 Created", hotelsData.length, "hotels");
    console.log("🛏️ Created", hotelRoomsData.length, "hotel rooms");

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
