
export interface Hotel {
  id: number;
  name: string;
  description: string;
  location: string;
  address: string;
  imageUrl: string;
  images: string[];
  category: "luxury" | "boutique" | "heritage" | "eco-lodge" | "mid-range" | "budget-friendly";
  starRating: number;
  amenities: string[];
  features: string[];
  pricePerNight: number;
  isActive: boolean;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy?: string;
  rooms?: HotelRoom[];
}

export interface HotelRoom {
  id: number;
  hotelId: number;
  roomType: string;
  roomName: string;
  description: string;
  imageUrl: string;
  images: string[];
  maxOccupancy: number;
  bedType: string;
  roomSize?: string;
  amenities: string[];
  pricePerNight: number;
  totalRooms: number;
  isActive: boolean;
}

export const hotels: Hotel[] = [
  // Thimphu
  {
    id: 1,
    name: "Pemako Thimphu",
    description: "A luxurious hotel in the heart of Thimphu.",
    location: "Thimphu",
    address: "Thimphu, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    images: [],
    category: "luxury",
    starRating: 5,
    amenities: ["WiFi", "Spa", "Restaurant", "Parking"],
    features: [],
    pricePerNight: 800,
    isActive: true,
    checkInTime: "2:00 PM",
    checkOutTime: "12:00 PM",
  },
  {
    id: 2,
    name: "Le Meridien Thimphu",
    description: "Experience timeless luxury and comfort at Le Meridien Thimphu.",
    location: "Thimphu",
    address: "Thimphu, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    images: [],
    category: "luxury",
    starRating: 5,
    amenities: ["WiFi", "Spa", "Restaurant", "Parking", "Fitness"],
    features: [],
    pricePerNight: 750,
    isActive: true,
    checkInTime: "2:00 PM",
    checkOutTime: "12:00 PM",
  },
  {
    id: 3,
    name: "Lemon Tree Resort, Thimphu",
    description: "A beautiful resort offering stunning views of the surrounding mountains.",
    location: "Thimphu",
    address: "Thimphu, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    images: [],
    category: "mid-range",
    starRating: 4,
    amenities: ["WiFi", "Restaurant", "Parking"],
    features: [],
    pricePerNight: 400,
    isActive: true,
    checkInTime: "2:00 PM",
    checkOutTime: "12:00 PM",
  },
  {
    id: 10,
    name: "Hotel Norbuling",
    description: "A popular choice for travelers looking for a comfortable stay in Thimphu.",
    location: "Thimphu",
    address: "Thimphu, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    images: [],
    category: "mid-range",
    starRating: 3,
    amenities: ["WiFi", "Restaurant"],
    features: [],
    pricePerNight: 200,
    isActive: true,
    checkInTime: "2:00 PM",
    checkOutTime: "12:00 PM",
  },
  {
    id: 11,
    name: "Hotel Osel",
    description: "A 4-star hotel in the heart of Thimphu, offering a blend of traditional Bhutanese hospitality and modern amenities.",
    location: "Thimphu",
    address: "Thimphu, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    images: [],
    category: "mid-range",
    starRating: 4,
    amenities: ["WiFi", "Restaurant", "Parking", "Fitness"],
    features: [],
    pricePerNight: 300,
    isActive: true,
    checkInTime: "2:00 PM",
    checkOutTime: "12:00 PM",
  },
  // Paro
  {
    id: 4,
    name: "COMO Uma Paro",
    description: "An intimate resort with panoramic views of the Paro Valley.",
    location: "Paro",
    address: "Paro, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    images: [],
    category: "luxury",
    starRating: 5,
    amenities: ["WiFi", "Spa", "Restaurant", "Parking"],
    features: [],
    pricePerNight: 900,
    isActive: true,
    checkInTime: "2:00 PM",
    checkOutTime: "12:00 PM",
  },
  {
    id: 5,
    name: "Zhiwaling Heritage",
    description: "A stunning hotel that showcases the best of Bhutanese architecture.",
    location: "Paro",
    address: "Paro, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    images: [],
    category: "heritage",
    starRating: 5,
    amenities: ["WiFi", "Spa", "Restaurant", "Parking"],
    features: [],
    pricePerNight: 600,
    isActive: true,
    checkInTime: "2:00 PM",
    checkOutTime: "12:00 PM",
  },
  {
    id: 6,
    name: "Naksel Boutique Hotel & Spa",
    description: "A community-based project that is eco-friendly and sustainable.",
    location: "Paro",
    address: "Paro, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    images: [],
    category: "boutique",
    starRating: 4,
    amenities: ["WiFi", "Spa", "Restaurant", "Parking"],
    features: [],
    pricePerNight: 350,
    isActive: true,
    checkInTime: "2:00 PM",
    checkOutTime: "12:00 PM",
  },
  {
    id: 12,
    name: "Tiger Nest Resort",
    description: "A beautiful resort located near the famous Tiger's Nest Monastery.",
    location: "Paro",
    address: "Paro, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    images: [],
    category: "mid-range",
    starRating: 4,
    amenities: ["WiFi", "Restaurant", "Parking"],
    features: [],
    pricePerNight: 250,
    isActive: true,
    checkInTime: "2:00 PM",
    checkOutTime: "12:00 PM",
  },
  // Punakha
  {
    id: 7,
    name: "Pemako Punakha",
    description: "A luxury resort in the lush Punakha Valley.",
    location: "Punakha",
    address: "Punakha, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    images: [],
    category: "luxury",
    starRating: 5,
    amenities: ["WiFi", "Spa", "Restaurant", "Parking"],
    features: [],
    pricePerNight: 850,
    isActive: true,
    checkInTime: "2:00 PM",
    checkOutTime: "12:00 PM",
  },
  {
    id: 8,
    name: "Dhensa Boutique Resort",
    description: "A beautiful resort offering stunning views of the Punakha Valley.",
    location: "Punakha",
    address: "Punakha, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    images: [],
    category: "boutique",
    starRating: 4,
    amenities: ["WiFi", "Spa", "Restaurant", "Parking"],
    features: [],
    pricePerNight: 450,
    isActive: true,
    checkInTime: "2:00 PM",
    checkOutTime: "12:00 PM",
  },
  {
    id: 13,
    name: "RKPO Green Resort",
    description: "An eco-friendly resort in the heart of Punakha.",
    location: "Punakha",
    address: "Punakha, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    images: [],
    category: "eco-lodge",
    starRating: 4,
    amenities: ["WiFi", "Restaurant", "Parking"],
    features: [],
    pricePerNight: 300,
    isActive: true,
    checkInTime: "2:00 PM",
    checkOutTime: "12:00 PM",
  },
  // Phuntsholing
  {
    id: 9,
    name: "Park Hotel Bhutan",
    description: "A comfortable and convenient hotel in the border town of Phuntsholing.",
    location: "Phuntsholing",
    address: "Phuntsholing, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    images: [],
    category: "mid-range",
    starRating: 3,
    amenities: ["WiFi", "Restaurant", "Parking"],
    features: [],
    pricePerNight: 150,
    isActive: true,
    checkInTime: "2:00 PM",
    checkOutTime: "12:00 PM",
  },
  {
    id: 14,
    name: "Lhaki Hotel",
    description: "A modern hotel in Phuntsholing, offering a comfortable stay for business and leisure travelers.",
    location: "Phuntsholing",
    address: "Phuntsholing, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    images: [],
    category: "mid-range",
    starRating: 3,
    amenities: ["WiFi", "Restaurant", "Parking"],
    features: [],
    pricePerNight: 120,
    isActive: true,
    checkInTime: "2:00 PM",
    checkOutTime: "12:00 PM",
  },
  {
    id: 15,
    name: "Amankora",
    description: "A series of luxury pavilion-style lodges across Bhutan's five stunning valleys - Paro, Thimphu, Punakha, Gangtey, and Bumthang. Experience Bhutan's finest luxury with traditional architecture, world-class service, and unprecedented access to the kingdom's cultural treasures.",
    location: "Various",
    address: "Five lodges across Paro, Thimphu, Punakha, Gangtey, and Bumthang valleys",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80"
    ],
    category: "luxury",
    starRating: 5,
    amenities: ["Butler Service", "World-Class Spa", "Fine Dining", "Cultural Immersion", "Helicopter Transfers", "Private Pavilions", "Yoga Studio", "Library", "Infinity Pool", "Wine Cellar"],
    features: ["20 pavilion suites per lodge", "Traditional Bhutanese architecture", "Multi-lodge journey experiences", "Cultural immersion programs", "Wellness and spa sanctuary", "Private guided tours", "Helicopter access", "Carbon-neutral operations"],
    pricePerNight: 2000,
    isActive: true,
    contactEmail: "reservations@aman.com",
    contactPhone: "+975-8-272333",
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    cancellationPolicy: "Free cancellation up to 7 days before arrival",
    website: "https://www.aman.com/resorts/amankora"
  },
  {
    id: 16,
    name: "Taj Tashi Bhutan",
    description: "Luxury heritage hotel in the heart of Thimphu, combining traditional Bhutanese architecture with contemporary elegance. Features stunning valley views, world-class dining, and authentic cultural experiences.",
    location: "Thimphu",
    address: "Samten Lam, Chubachu, Thimphu, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    ],
    category: "luxury",
    starRating: 5,
    amenities: ["Jiva Spa", "Fine Dining Restaurant", "Indoor Pool", "Fitness Center", "Business Center", "Cultural Activities", "Concierge Service", "Valley Views", "Traditional Architecture", "Conference Facilities"],
    features: ["Views of the Thimphu valley", "Traditional Bhutanese architecture with modern luxury", "Jiva Spa with traditional treatments", "Award-winning cuisine", "Cultural immersion programs", "Business facilities", "Sustainable practices", "Local artisan collaborations"],
    pricePerNight: 950,
    isActive: true,
    contactEmail: "tajtashi.thimphu@tajhotels.com",
    contactPhone: "+975-2-336899",
    checkInTime: "3:00 PM",
    checkOutTime: "12:00 PM",
    cancellationPolicy: "Free cancellation up to 2 days before arrival",
    website: "https://www.tajhotels.com/en-in/taj/taj-tashi-thimphu-bhutan/"
  },
  {
    id: 17,
    name: "Six Senses Thimphu",
    description: "Sustainable luxury resort offering wellness programs and organic cuisine in the heart of the Himalayas. Features eco-friendly practices, holistic wellness, and authentic cultural experiences.",
    location: "Thimphu",
    address: "Thimphu Valley, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80"
    ],
    category: "luxury",
    starRating: 5,
    amenities: ["Six Senses Spa", "Organic Restaurant", "Wellness Programs", "Meditation Center", "Fitness Center", "Kids Club", "Organic Gardens", "Cultural Activities", "Mountain Views", "Sustainable Practices"],
    features: ["20 suites and villas", "Wellness-focused experiences", "Sustainable and eco-friendly practices", "Organic gardens and farm-to-table dining", "Holistic wellness programs", "Cultural immersion activities", "Carbon-neutral operations", "Local community support"],
    pricePerNight: 1500,
    isActive: true,
    contactEmail: "reservations-bhutan@sixsenses.com",
    contactPhone: "+975-2-336666",
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    cancellationPolicy: "Free cancellation up to 7 days before arrival",
    website: "https://www.sixsenses.com/en/resorts/bhutan"
  },
  {
    id: 18,
    name: "Gangtey Lodge",
    description: "Boutique lodge in the pristine Phobjikha Valley, offering intimate luxury with stunning views of the Black Mountain range and rare black-necked cranes. Perfect for nature lovers and cultural enthusiasts.",
    location: "Phobjikha Valley",
    address: "Phobjikha Valley, Wangdue Phodrang, Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80"
    ],
    category: "boutique",
    starRating: 4,
    amenities: ["Valley Views", "Fine Dining", "Bar & Lounge", "Garden Terrace", "Cultural Activities", "Bird Watching", "Nature Walks", "Library", "Fireplace Lounge", "Organic Gardens"],
    features: ["Black-necked crane viewing", "Pristine valley location", "Sustainable eco-luxury", "Wildlife and nature experiences", "Cultural immersion programs", "Conservation support", "Local community partnerships", "Seasonal crane migration viewing"],
    pricePerNight: 580,
    isActive: true,
    contactEmail: "info@gangteylodge.com",
    contactPhone: "+975-17-123456",
    checkInTime: "2:00 PM",
    checkOutTime: "11:00 AM",
    cancellationPolicy: "Free cancellation up to 5 days before arrival",
    website: "https://www.gangteylodge.com"
  },
];
