import { 
  Award, Compass, Heart, Calendar, Camera, Star,
  Bird, Bike, Church, Leaf, Users, Mountain
} from "lucide-react";

export interface TourCategory {
  value: string;
  label: string;
  href: string;
  icon: any;
  desc: string;
  color: string;
  featured?: boolean;
}

export const TOUR_CATEGORIES: TourCategory[] = [
  { 
    value: 'Cultural', 
    label: 'Cultural Tours', 
    href: '/tours/cultural', 
    icon: Award, 
    desc: 'Explore Bhutan\'s rich heritage', 
    color: 'bg-teal-600',
    featured: true
  },
  { 
    value: 'Luxury', 
    label: 'Luxury Tours', 
    href: '/tours/luxury', 
    icon: Star, 
    desc: 'Premium experiences & accommodations', 
    color: 'bg-amber-600',
    featured: true
  },
  { 
    value: 'Adventure', 
    label: 'Adventure Tours', 
    href: '/tours/adventure', 
    icon: Compass, 
    desc: 'Trekking & outdoor activities', 
    color: 'bg-amber-600',
    featured: true
  },
  { 
    value: 'Spiritual', 
    label: 'Spiritual Tours', 
    href: '/tours/spiritual', 
    icon: Heart, 
    desc: 'Meditation & monastery visits', 
    color: 'bg-teal-600',
    featured: true
  },
  { 
    value: 'Festival', 
    label: 'Festival Tours', 
    href: '/tours/festival', 
    icon: Calendar, 
    desc: 'Experience vibrant celebrations', 
    color: 'bg-emerald-600'
  },
  { 
    value: 'Bespoke', 
    label: 'Bespoke Tours', 
    href: '/tours/bespoke', 
    icon: Users, 
    desc: 'Customized private journeys', 
    color: 'bg-teal-600'
  },
  { 
    value: 'Photography', 
    label: 'Photography Tours', 
    href: '/tours/photography', 
    icon: Camera, 
    desc: 'Capture Bhutan\'s stunning beauty', 
    color: 'bg-amber-600'
  },
  { 
    value: 'Bird Watching', 
    label: 'Bird Watching Tours', 
    href: '/tours/birdwatching', 
    icon: Bird, 
    desc: 'Discover 770+ bird species', 
    color: 'bg-emerald-600'
  },
  { 
    value: 'Cycling', 
    label: 'Cycling Tours', 
    href: '/tours/cycling', 
    icon: Bike, 
    desc: 'Eco-friendly mountain adventures', 
    color: 'bg-teal-600'
  },
  { 
    value: 'Pilgrimage', 
    label: 'Pilgrimage Tours', 
    href: '/tours/pilgrimage', 
    icon: Church, 
    desc: 'Sacred sites & spiritual journeys', 
    color: 'bg-amber-600'
  },
  { 
    value: 'Wellness', 
    label: 'Wellness Tours', 
    href: '/tours/wellness', 
    icon: Leaf, 
    desc: 'Holistic healing & rejuvenation', 
    color: 'bg-emerald-600'
  }
];

export const FEATURED_CATEGORIES = TOUR_CATEGORIES.filter(cat => cat.featured);

export const TOUR_FILTER_CATEGORIES = [
  { value: 'all', label: 'All Tours', color: 'bg-gray-600' },
  ...TOUR_CATEGORIES.map(cat => ({
    value: cat.value,
    label: cat.label.replace(' Tours', ''),
    color: cat.color
  }))
];