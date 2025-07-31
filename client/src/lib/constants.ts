export const TOUR_CATEGORIES = [
  { value: 'all', label: 'All Tours', color: 'bg-gray-600' },
  { value: 'Cultural', label: 'Cultural', color: 'bg-teal-600' },
  { value: 'Adventure', label: 'Adventure', color: 'bg-amber-600' },
  { value: 'Spiritual', label: 'Spiritual', color: 'bg-teal-600' },
  { value: 'Luxury', label: 'Luxury', color: 'bg-amber-600' },
  { value: 'Budget', label: 'Budget', color: 'bg-emerald-600' },
  { value: 'Family', label: 'Family', color: 'bg-teal-600' },
  { value: 'Custom', label: 'Custom', color: 'bg-amber-600' },
  { value: 'Classic', label: 'Classic', color: 'bg-teal-600' },
  { value: 'Cycling', label: 'Cycling', color: 'bg-teal-600' },
  { value: 'Pilgrimage', label: 'Pilgrimage', color: 'bg-amber-600' },
  { value: 'Wellness', label: 'Wellness', color: 'bg-emerald-600' }
] as const;

export const TEAM_MEMBERS = [
  {
    name: "Tashi Dorji",
    role: "Founder & Owner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    bio: "Born in Thimphu, Tashi has been sharing Bhutan's stories for over 15 years. Expert in Bhutanese culture with deep knowledge of Buddhist philosophy and local traditions.",
    specialties: ["Cultural Tours", "Monastery Visits", "Travel Planning"]
  },
  {
    name: "Pema Choden",
    role: "Adventure Specialist",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop",
    bio: "Expert trekking guide who knows every hidden trail in the Himalayas. Certified in wilderness first aid and high-altitude trekking.",
    specialties: ["Himalayan Treks", "Adventure Tours", "Wildlife Spotting"]
  },
  {
    name: "Karma Wangchuk",
    role: "Spiritual Journey Guide",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
    bio: "Former monk who brings deep spiritual insight to every journey. Specializes in meditation retreats and spiritual awakening experiences.",
    specialties: ["Meditation Retreats", "Spiritual Tours", "Mindfulness Training"]
  },
  {
    name: "Sonam Dorji",
    role: "Photography Guide",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop",
    bio: "Award-winning photographer who captures the soul of Bhutan. Helps travelers document their journey with professional techniques.",
    specialties: ["Photography Tours", "Landscape Shots", "Cultural Documentation"]
  }
];

export const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
    alt: "Majestic Tiger's Nest monastery dramatically perched on mountain cliff",
    title: "Tiger's Nest Monastery",
    description: "The most iconic landmark of Bhutan",
    category: "landmarks"
  },
  {
    src: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=400&fit=crop",
    alt: "Colorful Tibetan prayer flags fluttering in mountain wind",
    title: "Prayer Flags",
    description: "Sacred symbols of peace and compassion",
    category: "culture"
  },
  {
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    alt: "Traditional Bhutanese festival dance performance with colorful costumes",
    title: "Cultural Festival",
    description: "Vibrant celebrations of Bhutanese heritage",
    category: "culture"
  },
  {
    src: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=600&h=400&fit=crop",
    alt: "Serene mountain lake perfectly reflecting snow-capped peaks",
    title: "Sacred Lakes",
    description: "Pristine alpine waters in the Himalayas",
    category: "nature"
  },
  {
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    alt: "Smiling Bhutanese children wearing traditional colorful dress",
    title: "Local Culture",
    description: "The warm heart of Bhutanese society",
    category: "culture"
  }
];

export const BHUTAN_VIDEOS = [
  {
    id: "tigers-nest",
    title: "Tiger's Nest Monastery - Sacred Journey",
    description: "Experience the spiritual pilgrimage to Bhutan's most iconic monastery, perched dramatically on a cliff face 900 meters above Paro Valley.",
    thumbnailUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "4:32"
  },
  {
    id: "cultural-heritage",
    title: "Living Buddhist Culture",
    description: "Discover the authentic Buddhist traditions that have been preserved for centuries in the Last Shangri-La.",
    thumbnailUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "6:15"
  },
  {
    id: "himalayan-landscapes",
    title: "Himalayan Majesty",
    description: "Soar through the breathtaking landscapes of the Eastern Himalayas, from pristine forests to snow-capped peaks.",
    thumbnailUrl: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&h=600&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "3:45"
  },
  {
    id: "festival-celebrations",
    title: "Festival of Colors - Paro Tsechu",
    description: "Immerse yourself in the vibrant mask dances and spiritual celebrations of Bhutan's most important festivals.",
    thumbnailUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "5:28"
  },
  {
    id: "sustainable-tourism",
    title: "Carbon Negative Kingdom",
    description: "Learn about Bhutan's unique approach to sustainable tourism and how we preserve our environment for future generations.",
    thumbnailUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "7:12"
  },
  {
    id: "luxury-experiences",
    title: "Luxury in the Last Shangri-La",
    description: "Experience world-class luxury accommodations and services while maintaining harmony with Bhutan's pristine environment.",
    thumbnailUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "4:56"
  }
];

export const CONTACT_INFO = {
  address: {
    street: "Chang Lam",
    city: "Thimphu 11001",
    country: "Kingdom of Bhutan"
  },
  phones: ["+975 2 323 251", "+975 17 112 436"],
  emails: ["hello@bhutanmindbreak.com", "tours@bhutanmindbreak.com"],
  social: {
    facebook: "#",
    instagram: "#",
    twitter: "#",
    youtube: "#"
  }
};
