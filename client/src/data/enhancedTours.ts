// Enhanced tour categories and data inspired by reference tourism sites
// Including missing features like Photography, Bird Watching, Cycling, etc.

export const ENHANCED_TOUR_CATEGORIES = [
  {
    id: 'cultural',
    name: 'Cultural Tours',
    description: 'Step into the Soul of Bhutan: Discover ancient monasteries, timeless traditions, and Bhutan\'s rich cultural heritage.',
    icon: '🏛️',
    color: 'teal',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    features: ['Ancient Monasteries', 'Traditional Arts', 'Local Communities', 'Cultural Immersion']
  },
  {
    id: 'adventure',
    name: 'Adventure Tours',
    description: 'Thrill Beyond Boundaries: Embark on adrenaline-pumping adventures across Bhutan\'s wild landscapes.',
    icon: '🏔️',
    color: 'orange',
    image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&h=600&fit=crop',
    features: ['Mountain Trekking', 'White Water Rafting', 'Rock Climbing', 'Extreme Sports']
  },
  {
    id: 'trekking',
    name: 'Trekking Tours',
    description: 'Walk the Path of Legends: Trek through breathtaking Himalayan trails and untouched natural beauty.',
    icon: '🥾',
    color: 'green',
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop',
    features: ['Himalayan Peaks', 'Alpine Lakes', 'High Altitude', 'Wilderness Camping']
  },
  {
    id: 'festival',
    name: 'Festival Tours',
    description: 'Celebrate Bhutan\'s Living Heritage: Experience vibrant mask dances, sacred rituals, and joyous Tshechu festivals.',
    icon: '🎭',
    color: 'purple',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    features: ['Mask Dances', 'Sacred Rituals', 'Traditional Music', 'Local Celebrations']
  },
  {
    id: 'photography',
    name: 'Photography Tours',
    description: 'Capture the Essence: Professional photography tours through Bhutan\'s most photogenic locations.',
    icon: '📸',
    color: 'amber',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop',
    features: ['Golden Hour Shots', 'Portrait Photography', 'Landscape Captures', 'Cultural Documentation']
  },
  {
    id: 'birdwatching',
    name: 'Bird Watching Tours',
    description: 'Avian Paradise: Discover over 770 bird species in Bhutan\'s diverse ecosystems with expert ornithologists.',
    icon: '🦅',
    color: 'emerald',
    image: 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=800&h=600&fit=crop',
    features: ['Rare Species', 'Expert Guides', 'Prime Locations', 'Wildlife Photography']
  },
  {
    id: 'cycling',
    name: 'Cycling Tours',
    description: 'Pedal Through Paradise: Mountain biking and cycling adventures through scenic valleys and mountain passes.',
    icon: '🚴',
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop',
    features: ['Mountain Biking', 'Valley Routes', 'Scenic Paths', 'Support Vehicle']
  },
  {
    id: 'spiritual',
    name: 'Spiritual & Meditation',
    description: 'Inner Journey: Meditation retreats, spiritual practices, and mindfulness experiences in sacred locations.',
    icon: '🧘',
    color: 'indigo',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    features: ['Meditation Retreats', 'Monastery Visits', 'Spiritual Guidance', 'Mindfulness Practice']
  },
  {
    id: 'luxury',
    name: 'Luxury Tours',
    description: 'Ultimate Indulgence: Premium accommodations, private guides, and exclusive experiences in comfort.',
    icon: '✨',
    color: 'gold',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
    features: ['5-Star Hotels', 'Private Guides', 'Exclusive Access', 'Premium Service']
  },
  {
    id: 'wellness',
    name: 'Wellness Tours',
    description: 'Rejuvenate Your Soul: Holistic wellness experiences including hot stone baths and traditional therapies.',
    icon: '🌿',
    color: 'green',
    image: 'https://images.unsplash.com/photo-1540206276207-3af25c08abc4?w=800&h=600&fit=crop',
    features: ['Hot Stone Baths', 'Traditional Healing', 'Yoga Sessions', 'Spa Treatments']
  },
  {
    id: 'pilgrimage',
    name: 'Pilgrimage Tours',
    description: 'Sacred Journey: Visit the most sacred sites and experience the spiritual heart of Bhutan.',
    icon: '🙏',
    color: 'red',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop',
    features: ['Sacred Sites', 'Spiritual Guidance', 'Prayer Ceremonies', 'Religious Festivals']
  },
  {
    id: 'family',
    name: 'Family Tours',
    description: 'Family Adventures: Specially designed tours for families with children, combining fun and education.',
    icon: '👨‍👩‍👧‍👦',
    color: 'pink',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop',
    features: ['Kid-Friendly Activities', 'Educational Tours', 'Family Accommodations', 'Safe Adventures']
  }
];

export const POPULAR_PACKAGES = [
  {
    id: 1,
    name: 'Glimpse of Bhutan',
    duration: '5 Days / 4 Nights',
    destinations: ['Paro', 'Thimphu'],
    description: 'Perfect introduction to Bhutan with Tiger\'s Nest hike and cultural exploration.',
    price: '$1,200',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop',
    highlights: ['Tiger\'s Nest Monastery', 'Thimphu Sightseeing', 'Local Markets', 'Traditional Cuisine']
  },
  {
    id: 2,
    name: 'Kingdom Tour',
    duration: '7 Days / 6 Nights',
    destinations: ['Paro', 'Thimphu', 'Punakha'],
    description: 'Comprehensive tour covering the western highlights of Bhutan.',
    price: '$1,800',
    image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&h=600&fit=crop',
    highlights: ['Punakha Dzong', 'Dochula Pass', 'Chimi Lhakhang', 'Weekend Market']
  },
  {
    id: 3,
    name: 'Bliss of Bhutan',
    duration: '10 Days / 9 Nights',
    destinations: ['Paro', 'Thimphu', 'Punakha', 'Trongsa', 'Bumthang'],
    description: 'Extended journey through central Bhutan with cultural immersion.',
    price: '$2,500',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    highlights: ['Bumthang Valley', 'Trongsa Dzong', 'Traditional Villages', 'Festival Participation']
  },
  {
    id: 4,
    name: 'Druk Path Trek',
    duration: '6 Days / 5 Nights',
    destinations: ['Paro', 'High Altitude Lakes'],
    description: 'Classic trek with stunning views and alpine lakes.',
    price: '$1,500',
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop',
    highlights: ['High Altitude Trekking', 'Alpine Lakes', 'Mountain Views', 'Camping Experience']
  },
  {
    id: 5,
    name: 'Jumolhari Trek',
    duration: '12 Days / 11 Nights',
    destinations: ['Paro', 'Jumolhari Base Camp'],
    description: 'Challenging trek to the base of sacred Mount Jumolhari.',
    price: '$3,200',
    image: 'https://images.unsplash.com/photo-1464822759844-d150ad6d1c71?w=800&h=600&fit=crop',
    highlights: ['Mount Jumolhari Views', 'High Altitude Adventure', 'Remote Valleys', 'Yak Herder Communities']
  },
  {
    id: 6,
    name: 'Laya Gasa Trek',
    duration: '14 Days / 13 Nights',
    destinations: ['Paro', 'Laya', 'Gasa'],
    description: 'A challenging and rewarding trek through remote northern villages, offering stunning views of the Himalayas and a unique cultural experience.',
    price: '$3,800',
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop',
    highlights: ['Laya Village', 'Gasa Hot Springs', 'Stunning Himalayan Views', 'Diverse Flora and Fauna']
  },
  {
    id: 7,
    name: 'Bhutan Birding Tour',
    duration: '10 Days / 9 Nights',
    destinations: ['Thimphu', 'Punakha', 'Phobjikha'],
    description: 'An exclusive tour for bird lovers, exploring the rich avian diversity of Bhutan with an expert guide.',
    price: '$2,800',
    image: 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=800&h=600&fit=crop',
    highlights: ['Spotting rare birds', 'Phobjikha Valley', 'Jigme Dorji National Park', 'Expert Ornithologist Guide']
  },
  {
    id: 8,
    name: 'Western Bhutan Cycling Tour',
    duration: '8 Days / 7 Nights',
    destinations: ['Paro', 'Thimphu', 'Punakha'],
    description: 'An active cycling adventure through the beautiful valleys of western Bhutan, combining cultural sights with scenic rides.',
    price: '$2,200',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop',
    highlights: ['Cycling over Dochula Pass', 'Punakha Dzong', 'Thimphu city ride', 'Support vehicle included']
  }
];

export const SEASONAL_RECOMMENDATIONS = {
  spring: {
    season: 'Spring (March - May)',
    description: 'Perfect for rhododendron blooms and clear mountain views',
    bestFor: ['Trekking', 'Photography', 'Festival Tours'],
    weather: 'Mild temperatures, clear skies',
    highlights: ['Rhododendron Festival', 'Clear Himalayan Views', 'Pleasant Weather']
  },
  summer: {
    season: 'Summer (June - August)',
    description: 'Monsoon season with lush green landscapes',
    bestFor: ['Cultural Tours', 'Spiritual Retreats'],
    weather: 'Warm and humid with occasional rain',
    highlights: ['Lush Greenery', 'Cultural Festivals', 'Fewer Crowds']
  },
  autumn: {
    season: 'Autumn (September - November)',
    description: 'Best time for clear skies and major festivals',
    bestFor: ['All Tours', 'Trekking', 'Festival Tours'],
    weather: 'Cool and dry with excellent visibility',
    highlights: ['Thimphu Tshechu', 'Crystal Clear Views', 'Perfect Weather']
  },
  winter: {
    season: 'Winter (December - February)',
    description: 'Cold but crystal clear mountain views',
    bestFor: ['Cultural Tours', 'Photography', 'Bird Watching'],
    weather: 'Cold temperatures, clear skies',
    highlights: ['Snow-capped Peaks', 'Winter Wildlife', 'Cozy Experiences']
  }
};

export const TOUR_FEATURES = {
  sustainable: {
    icon: '🌱',
    title: 'Sustainable Tourism',
    description: 'Carbon-negative travel with minimal environmental impact'
  },
  authentic: {
    icon: '🏛️',
    title: 'Authentic Experiences',
    description: 'Genuine interactions with local communities and traditions'
  },
  expert: {
    icon: '👨‍🏫',
    title: 'Expert Guides',
    description: 'Licensed local guides with deep cultural knowledge'
  },
  safety: {
    icon: '🛡️',
    title: '24/7 Support',
    description: 'Round-the-clock assistance and emergency support'
  },
  luxury: {
    icon: '⭐',
    title: 'Premium Quality',
    description: 'Hand-picked accommodations and premium services'
  },
  flexible: {
    icon: '🎯',
    title: 'Customizable',
    description: 'Tailored itineraries to match your preferences'
  }
};
