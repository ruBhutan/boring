import { format, addDays, parseISO, isWithinInterval } from 'date-fns';

// Enhanced Tour Interface
export interface EnhancedTour {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: TourCategory;
  subcategory?: string;
  
  // Pricing
  basePriceUSD: number;
  currency: string;
  priceIncludes: string[];
  priceExcludes: string[];
  
  // Dynamic Pricing
  dynamicPricing: DynamicPricing;
  seasonalPackages: SeasonalPackage[];
  groupDiscounts: GroupDiscount[];
  
  // Tour Details
  duration: TourDuration;
  difficulty: DifficultyLevel;
  physicalRequirements: PhysicalRequirement[];
  maxGroupSize: number;
  minGroupSize: number;
  
  // Itinerary
  itinerary: ItineraryDay[];
  highlights: string[];
  uniqueExperiences: string[];
  
  // Location & Geography
  destinations: Destination[];
  startLocation: Location;
  endLocation: Location;
  altitude: AltitudeInfo;
  
  // Accommodation & Transport
  accommodations: AccommodationOption[];
  transportOptions: TransportOption[];
  mealPlans: MealPlan[];
  
  // Media & Marketing
  images: TourImage[];
  videos: TourVideo[];
  virtualTourUrl?: string;
  testimonials: Testimonial[];
  
  // Booking & Availability
  availability: AvailabilityCalendar;
  bookingRequirements: BookingRequirement[];
  cancellationPolicy: CancellationPolicy;
  
  // SEO & Marketing
  seoData: SEOData;
  marketingTags: string[];
  featured: boolean;
  popularityScore: number;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive' | 'draft' | 'archived';
  languages: string[];
}

export type TourCategory = 
  | 'Cultural' 
  | 'Adventure' 
  | 'Spiritual' 
  | 'Luxury' 
  | 'Photography' 
  | 'Festival' 
  | 'Birdwatching' 
  | 'Cycling' 
  | 'Wellness' 
  | 'Pilgrimage' 
  | 'Bespoke';

export type DifficultyLevel = 'Easy' | 'Moderate' | 'Challenging' | 'Extreme';

export interface TourDuration {
  days: number;
  nights: number;
  flexibleDuration: boolean;
  minDays?: number;
  maxDays?: number;
}

export interface PhysicalRequirement {
  type: 'fitness' | 'medical' | 'age' | 'experience';
  level: 'low' | 'medium' | 'high';
  description: string;
  required: boolean;
}

export interface DynamicPricing {
  enabled: boolean;
  baseMultiplier: number;
  factors: PricingFactor[];
  seasonalRates: SeasonalRate[];
  demandBasedPricing: boolean;
  lastMinuteDiscounts: LastMinuteDiscount[];
}

export interface PricingFactor {
  type: 'demand' | 'season' | 'group_size' | 'advance_booking' | 'special_event';
  name: string;
  multiplier: number;
  conditions: string[];
  startDate?: string;
  endDate?: string;
}

export interface SeasonalRate {
  season: 'peak' | 'shoulder' | 'low';
  name: string;
  startDate: string;
  endDate: string;
  multiplier: number;
  description: string;
}

export interface LastMinuteDiscount {
  daysBeforeTravel: number;
  discountPercentage: number;
  conditions: string[];
}

export interface GroupDiscount {
  minSize: number;
  maxSize: number;
  discountPercentage: number;
  description: string;
}

export interface SeasonalPackage {
  id: string;
  name: string;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  startDate: string;
  endDate: string;
  specialOffers: SpecialOffer[];
  includedExtras: string[];
  priceModifier: number;
  availability: number;
  description: string;
  images: string[];
}

export interface SpecialOffer {
  type: 'early_bird' | 'last_minute' | 'group' | 'repeat_customer' | 'seasonal';
  name: string;
  discountPercentage: number;
  validFrom: string;
  validTo: string;
  conditions: string[];
  maxRedemptions?: number;
  currentRedemptions?: number;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: Activity[];
  meals: ('breakfast' | 'lunch' | 'dinner')[];
  accommodation: string;
  transport: string;
  highlights: string[];
  optionalActivities: Activity[];
  estimatedTime: {
    start: string;
    end: string;
  };
  location: Location;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  duration: number; // minutes
  type: 'sightseeing' | 'cultural' | 'adventure' | 'spiritual' | 'leisure';
  difficulty: DifficultyLevel;
  cost?: number;
  optional: boolean;
  requirements: string[];
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  altitude: number;
  description: string;
  attractions: Attraction[];
  bestTimeToVisit: string[];
  culturalSignificance: string;
  images: string[];
}

export interface Location {
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address?: string;
  type: 'city' | 'airport' | 'hotel' | 'attraction' | 'border' | 'viewpoint';
}

export interface AltitudeInfo {
  minAltitude: number;
  maxAltitude: number;
  acclimatizationRequired: boolean;
  acclimatizationDays?: number;
}

export interface AccommodationOption {
  id: string;
  name: string;
  type: 'hotel' | 'resort' | 'guesthouse' | 'homestay' | 'camping' | 'monastery';
  category: 'budget' | 'standard' | 'deluxe' | 'luxury';
  location: string;
  amenities: string[];
  images: string[];
  pricePerNight?: number;
  rating?: number;
  description: string;
}

export interface TransportOption {
  type: 'flight' | 'bus' | 'car' | 'hiking' | 'helicopter' | 'train';
  description: string;
  duration: string;
  comfort: 'basic' | 'standard' | 'premium';
  included: boolean;
  cost?: number;
}

export interface MealPlan {
  type: 'full_board' | 'half_board' | 'breakfast_only' | 'no_meals';
  description: string;
  specialDiets: string[];
  localCuisine: boolean;
  cost?: number;
}

export interface TourImage {
  id: string;
  url: string;
  alt: string;
  caption: string;
  type: 'hero' | 'gallery' | 'itinerary' | 'accommodation' | 'activity';
  order: number;
  featured: boolean;
}

export interface TourVideo {
  id: string;
  url: string;
  title: string;
  description: string;
  type: 'promotional' | 'documentary' | 'testimonial' | 'preview';
  duration: number;
  thumbnail: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  customerCountry: string;
  customerImage?: string;
  rating: number;
  title: string;
  content: string;
  travelDate: string;
  verified: boolean;
  featured: boolean;
}

export interface AvailabilityCalendar {
  availableDates: AvailableDate[];
  blockedDates: BlockedDate[];
  minimumAdvanceBooking: number; // days
  maximumAdvanceBooking: number; // days
  flexibleDates: boolean;
}

export interface AvailableDate {
  date: string;
  availableSpots: number;
  priceMultiplier: number;
  specialNotes?: string;
  guideAssigned?: string;
}

export interface BlockedDate {
  startDate: string;
  endDate: string;
  reason: string;
  type: 'maintenance' | 'weather' | 'festival' | 'government' | 'custom';
}

export interface BookingRequirement {
  type: 'document' | 'health' | 'fitness' | 'age' | 'experience' | 'equipment';
  name: string;
  description: string;
  required: boolean;
  deadline: string; // days before travel
}

export interface CancellationPolicy {
  refundable: boolean;
  cancellationTiers: CancellationTier[];
  nonRefundableItems: string[];
  specialConditions: string[];
}

export interface CancellationTier {
  daysBeforeTravel: number;
  refundPercentage: number;
  description: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  slug: string;
  canonicalUrl: string;
  openGraphImage: string;
}

export interface Attraction {
  name: string;
  type: 'monastery' | 'dzong' | 'museum' | 'market' | 'viewpoint' | 'natural';
  description: string;
  significance: string;
  visitDuration: number; // minutes
}

// Custom Tour Builder Interface
export interface CustomTourRequest {
  id: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    country: string;
    groupSize: number;
    ageRange: string;
  };
  preferences: TourPreferences;
  requirements: CustomRequirement[];
  budget: {
    currency: string;
    minAmount: number;
    maxAmount: number;
    perPerson: boolean;
  };
  travelDates: {
    startDate: string;
    endDate: string;
    flexible: boolean;
    alternativeDates?: string[];
  };
  status: 'draft' | 'submitted' | 'in_review' | 'quoted' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface TourPreferences {
  categories: TourCategory[];
  interests: string[];
  activityTypes: string[];
  accommodationLevel: 'budget' | 'standard' | 'luxury' | 'mixed';
  transportPreference: string[];
  mealPreferences: string[];
  culturalExperiences: string[];
  physicalActivity: DifficultyLevel;
  destinations: string[];
  mustSeeAttractions: string[];
  specialOccasions: string[];
}

export interface CustomRequirement {
  type: 'accessibility' | 'dietary' | 'medical' | 'religious' | 'language' | 'other';
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

// Tour Comparison System
export interface TourComparison {
  tours: EnhancedTour[];
  comparisonCriteria: ComparisonCriterion[];
  userWeights: { [criterion: string]: number };
}

export interface ComparisonCriterion {
  key: string;
  name: string;
  type: 'numeric' | 'categorical' | 'boolean' | 'array';
  weight: number;
  displayType: 'star_rating' | 'progress_bar' | 'badge' | 'text' | 'list';
}

// Dynamic Pricing Engine
export class DynamicPricingEngine {
  private tour: EnhancedTour;
  private baseDate: Date;

  constructor(tour: EnhancedTour, baseDate: Date = new Date()) {
    this.tour = tour;
    this.baseDate = baseDate;
  }

  calculatePrice(
    travelDate: Date,
    groupSize: number,
    bookingDate: Date = new Date()
  ): PriceCalculation {
    let finalPrice = this.tour.basePriceUSD;
    const appliedFactors: AppliedPricingFactor[] = [];

    // Seasonal pricing
    const seasonalMultiplier = this.getSeasonalMultiplier(travelDate);
    if (seasonalMultiplier !== 1) {
      finalPrice *= seasonalMultiplier;
      appliedFactors.push({
        type: 'seasonal',
        name: `${this.getSeasonName(travelDate)} Season`,
        multiplier: seasonalMultiplier,
        amount: this.tour.basePriceUSD * (seasonalMultiplier - 1)
      });
    }

    // Group size discounts
    const groupDiscount = this.getGroupDiscount(groupSize);
    if (groupDiscount > 0) {
      const discountAmount = finalPrice * (groupDiscount / 100);
      finalPrice -= discountAmount;
      appliedFactors.push({
        type: 'group_discount',
        name: `Group Discount (${groupSize} people)`,
        multiplier: 1 - (groupDiscount / 100),
        amount: -discountAmount
      });
    }

    // Early bird / Last minute discounts
    const daysBetween = Math.floor((travelDate.getTime() - bookingDate.getTime()) / (1000 * 3600 * 24));
    const advanceBookingDiscount = this.getAdvanceBookingDiscount(daysBetween);
    if (advanceBookingDiscount > 0) {
      const discountAmount = finalPrice * (advanceBookingDiscount / 100);
      finalPrice -= discountAmount;
      appliedFactors.push({
        type: 'advance_booking',
        name: daysBetween > 60 ? 'Early Bird Discount' : 'Last Minute Discount',
        multiplier: 1 - (advanceBookingDiscount / 100),
        amount: -discountAmount
      });
    }

    // Demand-based pricing
    if (this.tour.dynamicPricing.demandBasedPricing) {
      const demandMultiplier = this.getDemandMultiplier(travelDate);
      if (demandMultiplier !== 1) {
        finalPrice *= demandMultiplier;
        appliedFactors.push({
          type: 'demand',
          name: demandMultiplier > 1 ? 'High Demand Surcharge' : 'Low Demand Discount',
          multiplier: demandMultiplier,
          amount: this.tour.basePriceUSD * (demandMultiplier - 1)
        });
      }
    }

    return {
      basePrice: this.tour.basePriceUSD,
      finalPrice: Math.round(finalPrice * 100) / 100,
      totalSavings: Math.max(0, this.tour.basePriceUSD - finalPrice),
      appliedFactors,
      priceValidUntil: this.getPriceValidityDate(bookingDate),
      currency: this.tour.currency
    };
  }

  private getSeasonalMultiplier(date: Date): number {
    const season = this.tour.dynamicPricing.seasonalRates.find(s => 
      isWithinInterval(date, {
        start: parseISO(s.startDate),
        end: parseISO(s.endDate)
      })
    );
    return season?.multiplier || 1;
  }

  private getSeasonName(date: Date): string {
    const season = this.tour.dynamicPricing.seasonalRates.find(s => 
      isWithinInterval(date, {
        start: parseISO(s.startDate),
        end: parseISO(s.endDate)
      })
    );
    return season?.name || 'Standard';
  }

  private getGroupDiscount(groupSize: number): number {
    const discount = this.tour.groupDiscounts.find(d => 
      groupSize >= d.minSize && groupSize <= d.maxSize
    );
    return discount?.discountPercentage || 0;
  }

  private getAdvanceBookingDiscount(daysInAdvance: number): number {
    const discount = this.tour.dynamicPricing.lastMinuteDiscounts.find(d => 
      daysInAdvance <= d.daysBeforeTravel
    );
    return discount?.discountPercentage || 0;
  }

  private getDemandMultiplier(date: Date): number {
    // This would typically connect to a booking database to check demand
    // For now, returning a simulated value based on date
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    return isWeekend ? 1.1 : 0.95;
  }

  private getPriceValidityDate(bookingDate: Date): string {
    return format(addDays(bookingDate, 7), 'yyyy-MM-dd');
  }
}

export interface PriceCalculation {
  basePrice: number;
  finalPrice: number;
  totalSavings: number;
  appliedFactors: AppliedPricingFactor[];
  priceValidUntil: string;
  currency: string;
}

export interface AppliedPricingFactor {
  type: string;
  name: string;
  multiplier: number;
  amount: number;
}

// Tour Package Builder
export class TourPackageBuilder {
  private baseTour: EnhancedTour;
  private customizations: TourCustomization[] = [];

  constructor(baseTour: EnhancedTour) {
    this.baseTour = baseTour;
  }

  addCustomization(customization: TourCustomization): this {
    this.customizations.push(customization);
    return this;
  }

  removeCustomization(customizationId: string): this {
    this.customizations = this.customizations.filter(c => c.id !== customizationId);
    return this;
  }

  build(): CustomTourPackage {
    const totalPriceModifier = this.customizations.reduce(
      (total, c) => total + c.priceModifier, 0
    );

    const additionalDays = this.customizations.reduce(
      (total, c) => total + (c.additionalDays || 0), 0
    );

    return {
      id: `custom_${Date.now()}`,
      baseTour: this.baseTour,
      customizations: this.customizations,
      totalPrice: this.baseTour.basePriceUSD + totalPriceModifier,
      totalDuration: {
        days: this.baseTour.duration.days + additionalDays,
        nights: this.baseTour.duration.nights + Math.max(0, additionalDays - 1)
      },
      createdAt: new Date().toISOString(),
      validUntil: format(addDays(new Date(), 30), 'yyyy-MM-dd')
    };
  }
}

export interface TourCustomization {
  id: string;
  type: 'accommodation' | 'transport' | 'activity' | 'meal' | 'extension' | 'upgrade';
  name: string;
  description: string;
  priceModifier: number;
  additionalDays?: number;
  requirements?: string[];
  availability?: 'always' | 'seasonal' | 'limited';
}

export interface CustomTourPackage {
  id: string;
  baseTour: EnhancedTour;
  customizations: TourCustomization[];
  totalPrice: number;
  totalDuration: TourDuration;
  createdAt: string;
  validUntil: string;
}

// Sample Enhanced Tour Data
export const sampleEnhancedTours: EnhancedTour[] = [
  {
    id: 'bhutan-cultural-heritage-2024',
    title: 'Bhutan Cultural Heritage Explorer',
    slug: 'bhutan-cultural-heritage-explorer',
    description: 'Immerse yourself in the rich cultural tapestry of Bhutan with visits to ancient monasteries, traditional festivals, and authentic local experiences.',
    shortDescription: 'Explore Bhutan\'s cultural treasures in this comprehensive 8-day journey.',
    category: 'Cultural',
    subcategory: 'Heritage & Tradition',
    
    basePriceUSD: 2500,
    currency: 'USD',
    priceIncludes: [
      'Accommodation in 3-star hotels',
      'All meals as per itinerary',
      'Private transport with driver',
      'English-speaking guide',
      'Entrance fees to monuments',
      'Bhutan visa fees',
      'All applicable taxes'
    ],
    priceExcludes: [
      'International flights to/from Paro',
      'Personal expenses',
      'Tips and gratuities',
      'Travel insurance',
      'Additional activities not mentioned'
    ],

    dynamicPricing: {
      enabled: true,
      baseMultiplier: 1.0,
      factors: [
        {
          type: 'season',
          name: 'Peak Season Premium',
          multiplier: 1.3,
          conditions: ['March-May', 'September-November'],
          startDate: '2024-03-01',
          endDate: '2024-05-31'
        }
      ],
      seasonalRates: [
        {
          season: 'peak',
          name: 'Peak Season',
          startDate: '2024-03-01',
          endDate: '2024-05-31',
          multiplier: 1.3,
          description: 'Clear weather and blooming rhododendrons'
        },
        {
          season: 'shoulder',
          name: 'Shoulder Season',
          startDate: '2024-06-01',
          endDate: '2024-08-31',
          multiplier: 1.0,
          description: 'Monsoon season with lush landscapes'
        },
        {
          season: 'low',
          name: 'Winter Season',
          startDate: '2024-12-01',
          endDate: '2024-02-28',
          multiplier: 0.8,
          description: 'Clear skies but cold temperatures'
        }
      ],
      demandBasedPricing: true,
      lastMinuteDiscounts: [
        {
          daysBeforeTravel: 14,
          discountPercentage: 10,
          conditions: ['Subject to availability']
        }
      ]
    },

    seasonalPackages: [
      {
        id: 'spring-festival-2024',
        name: 'Spring Festival Special',
        season: 'spring',
        startDate: '2024-03-01',
        endDate: '2024-05-31',
        specialOffers: [
          {
            type: 'early_bird',
            name: 'Early Bird Special',
            discountPercentage: 15,
            validFrom: '2023-12-01',
            validTo: '2024-01-31',
            conditions: ['Book 60 days in advance'],
            maxRedemptions: 50
          }
        ],
        includedExtras: [
          'Traditional archery experience',
          'Private monastery blessing ceremony',
          'Bhutanese cooking class'
        ],
        priceModifier: 200,
        availability: 25,
        description: 'Experience Bhutan during the magical spring season when rhododendrons bloom.',
        images: ['/images/spring-bhutan-1.jpg', '/images/spring-bhutan-2.jpg']
      }
    ],

    groupDiscounts: [
      {
        minSize: 4,
        maxSize: 6,
        discountPercentage: 5,
        description: 'Small group discount'
      },
      {
        minSize: 7,
        maxSize: 12,
        discountPercentage: 10,
        description: 'Large group discount'
      }
    ],

    duration: {
      days: 8,
      nights: 7,
      flexibleDuration: true,
      minDays: 6,
      maxDays: 12
    },

    difficulty: 'Easy',

    physicalRequirements: [
      {
        type: 'fitness',
        level: 'low',
        description: 'Basic walking ability required',
        required: true
      },
      {
        type: 'age',
        level: 'low',
        description: 'Suitable for all ages',
        required: false
      }
    ],

    maxGroupSize: 12,
    minGroupSize: 2,

    itinerary: [
      {
        day: 1,
        title: 'Arrival in Paro - Transfer to Thimphu',
        description: 'Welcome to Bhutan! Upon arrival at Paro Airport, meet your guide and drive to Thimphu, the capital city.',
        activities: [
          {
            id: 'paro-arrival',
            name: 'Airport Pickup',
            description: 'Meet and greet at Paro International Airport',
            duration: 30,
            type: 'leisure',
            difficulty: 'Easy',
            optional: false,
            requirements: []
          },
          {
            id: 'thimphu-drive',
            name: 'Scenic Drive to Thimphu',
            description: 'Beautiful 1.5-hour drive through valleys and villages',
            duration: 90,
            type: 'sightseeing',
            difficulty: 'Easy',
            optional: false,
            requirements: []
          }
        ],
        meals: ['dinner'],
        accommodation: 'Hotel Thimphu Tower (3-star)',
        transport: 'Private vehicle',
        highlights: ['First glimpse of Bhutanese landscape', 'Traditional welcome'],
        optionalActivities: [],
        estimatedTime: {
          start: '09:00',
          end: '18:00'
        },
        location: {
          name: 'Thimphu',
          coordinates: { latitude: 27.4728, longitude: 89.6396 },
          type: 'city'
        }
      }
      // ... more itinerary days
    ],

    highlights: [
      'Visit to Tiger\'s Nest Monastery',
      'Thimphu weekend market experience',
      'Traditional Bhutanese architecture',
      'Local family homestay experience',
      'Buddhist monastery ceremonies'
    ],

    uniqueExperiences: [
      'Private blessing ceremony with monks',
      'Traditional archery with locals',
      'Bhutanese cooking class',
      'Textile weaving demonstration'
    ],

    destinations: [
      {
        id: 'thimphu',
        name: 'Thimphu',
        region: 'Western Bhutan',
        coordinates: { latitude: 27.4728, longitude: 89.6396 },
        altitude: 2320,
        description: 'Capital and largest city of Bhutan',
        attractions: [
          {
            name: 'Tashichho Dzong',
            type: 'dzong',
            description: 'Fortress monastery housing government offices',
            significance: 'Seat of Bhutanese government',
            visitDuration: 90
          }
        ],
        bestTimeToVisit: ['March-May', 'September-November'],
        culturalSignificance: 'Modern capital preserving traditional architecture',
        images: ['/images/thimphu-1.jpg', '/images/thimphu-2.jpg']
      }
    ],

    startLocation: {
      name: 'Paro International Airport',
      coordinates: { latitude: 27.4033, longitude: 89.4244 },
      address: 'Paro Airport, Paro, Bhutan',
      type: 'airport'
    },

    endLocation: {
      name: 'Paro International Airport',
      coordinates: { latitude: 27.4033, longitude: 89.4244 },
      address: 'Paro Airport, Paro, Bhutan',
      type: 'airport'
    },

    altitude: {
      minAltitude: 1200,
      maxAltitude: 3100,
      acclimatizationRequired: false
    },

    accommodations: [
      {
        id: 'hotel-thimphu-tower',
        name: 'Hotel Thimphu Tower',
        type: 'hotel',
        category: 'standard',
        location: 'Thimphu City Center',
        amenities: ['WiFi', 'Restaurant', 'Room Service', 'Parking'],
        images: ['/images/hotel-thimphu-1.jpg'],
        rating: 3.5,
        description: 'Comfortable hotel in the heart of Thimphu'
      }
    ],

    transportOptions: [
      {
        type: 'car',
        description: 'Private vehicle with experienced driver',
        duration: 'Throughout tour',
        comfort: 'standard',
        included: true
      }
    ],

    mealPlans: [
      {
        type: 'full_board',
        description: 'Breakfast, lunch, and dinner included',
        specialDiets: ['Vegetarian', 'Vegan', 'Gluten-free available'],
        localCuisine: true
      }
    ],

    images: [
      {
        id: 'hero-image',
        url: '/images/bhutan-cultural-hero.jpg',
        alt: 'Bhutanese monastery in mountains',
        caption: 'Traditional monastery overlooking the Himalayas',
        type: 'hero',
        order: 1,
        featured: true
      }
    ],

    videos: [
      {
        id: 'promo-video',
        url: '/videos/bhutan-cultural-promo.mp4',
        title: 'Bhutan Cultural Heritage Tour Preview',
        description: 'Experience the magic of Bhutan\'s cultural treasures',
        type: 'promotional',
        duration: 180,
        thumbnail: '/images/video-thumb-cultural.jpg'
      }
    ],

    testimonials: [
      {
        id: 'testimonial-1',
        customerName: 'Sarah Johnson',
        customerCountry: 'United States',
        rating: 5,
        title: 'Absolutely Magical Experience',
        content: 'This tour exceeded all expectations. The cultural immersion was authentic and the guides were incredibly knowledgeable.',
        travelDate: '2023-04-15',
        verified: true,
        featured: true
      }
    ],

    availability: {
      availableDates: [
        {
          date: '2024-03-15',
          availableSpots: 8,
          priceMultiplier: 1.2,
          specialNotes: 'Peak season - book early'
        }
      ],
      blockedDates: [
        {
          startDate: '2024-07-15',
          endDate: '2024-08-15',
          reason: 'Monsoon season - limited activities',
          type: 'weather'
        }
      ],
      minimumAdvanceBooking: 14,
      maximumAdvanceBooking: 365,
      flexibleDates: true
    },

    bookingRequirements: [
      {
        type: 'document',
        name: 'Passport Copy',
        description: 'Clear copy of passport with minimum 6 months validity',
        required: true,
        deadline: '30'
      }
    ],

    cancellationPolicy: {
      refundable: true,
      cancellationTiers: [
        {
          daysBeforeTravel: 30,
          refundPercentage: 90,
          description: 'Full refund minus processing fees'
        },
        {
          daysBeforeTravel: 14,
          refundPercentage: 50,
          description: '50% refund'
        },
        {
          daysBeforeTravel: 7,
          refundPercentage: 0,
          description: 'No refund'
        }
      ],
      nonRefundableItems: ['Visa fees', 'Domestic flights'],
      specialConditions: ['Weather cancellations eligible for full refund']
    },

    seoData: {
      title: 'Bhutan Cultural Heritage Tour - 8 Days Authentic Experience',
      description: 'Explore Bhutan\'s rich cultural heritage with visits to monasteries, traditional festivals, and authentic local experiences. Book your 8-day cultural tour today.',
      keywords: ['Bhutan cultural tour', 'heritage tour', 'monastery visits', 'authentic Bhutan'],
      slug: 'bhutan-cultural-heritage-explorer',
      canonicalUrl: 'https://bhutanmindbreak.com/tours/bhutan-cultural-heritage-explorer',
      openGraphImage: '/images/bhutan-cultural-og.jpg'
    },

    marketingTags: ['Popular', 'Cultural Immersion', 'Authentic', 'Small Groups'],
    featured: true,
    popularityScore: 95,

    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    status: 'active',
    languages: ['English', 'Dzongkha']
  }
];

export default {
  EnhancedTour,
  DynamicPricingEngine,
  TourPackageBuilder,
  sampleEnhancedTours
};
