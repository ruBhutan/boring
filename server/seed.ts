import { db } from "./db";

async function seed() {
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

    // Seed tour operators based on the 10 websites
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
      tourOperatorsData.map(operator => db.tourOperator.create({ data: operator }))
    );

    // Seed comprehensive tours based on different operators and their specialties
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
        rating: 5.0,
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
      }
    ];

    await db.tour.createMany({
      data: toursData
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

    // Seed comprehensive blog posts
    const blogData = [
      {
        title: "Understanding Bhutan's Gross National Happiness",
        content: "Discover how Bhutan measures success not by GDP but by the happiness and well-being of its people. The four pillars of Gross National Happiness - sustainable development, environmental conservation, cultural preservation, and good governance - form the foundation of Bhutanese society. This unique philosophy has made Bhutan a model for sustainable development worldwide, showing that economic growth and environmental protection can coexist harmoniously.",
        excerpt: "Learn about Bhutan's unique approach to measuring national success through the four pillars of Gross National Happiness.",
        imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Culture",
        readTime: "8 min read",
        author: "Tenzin Norbu",
        authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        isPublished: true,
        publishedAt: new Date()
      },
      {
        title: "Best Time to Visit Bhutan: A Seasonal Guide",
        content: "Planning your trip to Bhutan? Here's everything you need to know about the best times to visit this Himalayan kingdom. Spring (March-May) brings rhododendron blooms and clear mountain views, while autumn (September-November) offers perfect weather and festival seasons. Summer brings monsoons but fewer crowds, and winter provides clear skies but cold temperatures. Each season has its unique charm and advantages for different types of travelers.",
        excerpt: "From spring rhododendrons to autumn festivals, discover the perfect season for your Bhutan adventure.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Travel Tips",
        readTime: "6 min read",
        author: "Pema Lhamo",
        authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        isPublished: true,
        publishedAt: new Date()
      },
      {
        title: "Tiger's Nest Monastery: A Complete Guide",
        content: "Everything you need to know about visiting Bhutan's most iconic monastery perched on a cliff 3,000 feet above the Paro Valley. Paro Taktsang, or Tiger's Nest, is where Guru Rinpoche is said to have meditated for three years, three months, three weeks, and three days. The hike takes 2-3 hours each way, with stunning views and spiritual significance at every step. Learn about the history, hiking tips, what to expect, and how to make the most of your visit to this sacred site.",
        excerpt: "Your comprehensive guide to visiting Paro Taktsang, including hiking tips, history, and what to expect.",
        imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Attractions",
        readTime: "10 min read",
        author: "Karma Wangchuk",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        isPublished: true,
        publishedAt: new Date()
      },
      {
        title: "Sustainable Tourism in Bhutan: Leading by Example",
        content: "Bhutan's 'High Value, Low Impact' tourism policy has made it a global leader in sustainable tourism. With a daily sustainable development fee and limits on tourist numbers, Bhutan ensures that tourism benefits local communities while preserving the environment and culture. Learn how this approach has created a model for responsible tourism that other destinations are now trying to emulate.",
        excerpt: "Discover how Bhutan's sustainable tourism policy protects the environment while benefiting local communities.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Sustainability",
        readTime: "7 min read",
        author: "Sonam Choden",
        authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b830?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        isPublished: true,
        publishedAt: new Date()
      },
      {
        title: "Bhutanese Festivals: A Calendar of Celebrations",
        content: "Bhutan's festival calendar is filled with colorful celebrations throughout the year. From the famous Paro Tsechu to the remote Bumthang festivals, each celebration offers unique insights into Bhutanese culture and Buddhism. These festivals feature masked dances (cham), traditional music, and community gatherings that have remained unchanged for centuries. Plan your visit around these festivals for an authentic cultural experience.",
        excerpt: "Explore Bhutan's vibrant festival calendar and plan your visit around these colorful celebrations.",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Culture",
        readTime: "9 min read",
        author: "Jigme Dorji",
        authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        isPublished: true,
        publishedAt: new Date()
      }
    ];

    await db.blogPost.createMany({
      data: blogData
    });

    // Seed Festival Calendar 2025
    const festivalsData = [
      {
        name: "Paro Tsechu 2025",
        description: "One of Bhutan's most famous festivals featuring sacred mask dances, traditional music, and colorful celebrations at Paro Dzong. Witness the unfurling of the giant thangka and receive blessings from the monks.",
        location: "Paro Dzong, Paro",
        startDate: new Date("2025-04-15"),
        endDate: new Date("2025-04-19"),
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
        startDate: new Date("2025-09-20"),
        endDate: new Date("2025-09-22"),
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
        startDate: new Date("2025-03-08"),
        endDate: new Date("2025-03-10"),
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
        startDate: new Date("2025-11-05"),
        endDate: new Date("2025-11-07"),
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
        startDate: new Date("2025-10-12"),
        endDate: new Date("2025-10-14"),
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
        startDate: new Date("2025-04-01"),
        endDate: new Date("2025-05-31"),
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
        ticketPrice: null, // Free festival
        maxCapacity: null
      }
    ];

    const createdFestivals = await Promise.all(
      festivalsData.map(festival => db.festival.create({ data: festival }))
    );

    // Seed Luxury Hotels
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
        name: "Le Méridien Paro",
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
      hotelsData.map(hotel => db.hotel.create({ data: hotel }))
    );

    // Create sample hotel rooms for each hotel
    const hotelRoomsData = [];
    for (const hotel of createdHotels) {
      // Add different room types for each hotel
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

    console.log("✅ Database seeded successfully!");
    console.log(`📊 Created ${tourOperatorsData.length} tour operators`);
    console.log(`🎯 Created ${toursData.length} tours`);
    console.log(`💬 Created ${testimonialsData.length} testimonials`);
    console.log(`📝 Created ${blogData.length} blog posts`);
    console.log(`🎉 Created ${festivalsData.length} festivals`);
    console.log(`🏨 Created ${hotelsData.length} hotels`);
    console.log(`🛏️ Created ${hotelRoomsData.length} hotel rooms`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

// Run seed if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seed().then(() => {
    process.exit(0);
  });
}

export { seed };
