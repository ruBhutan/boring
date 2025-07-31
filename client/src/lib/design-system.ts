// Modern Design System for Bhutan Tourism Website
export const designSystem = {
  colors: {
    // Primary Brand Colors - Deep Teal & Gold
    primary: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6', // Main brand color
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a',
    },
    // Secondary - Warm Gold
    secondary: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b', // Accent gold
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    // Neutral Grays
    neutral: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
    },
    // Success, Warning, Error
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  
  gradients: {
    primary: 'bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500',
    secondary: 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500',
    hero: 'bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-800',
    card: 'bg-gradient-to-br from-white to-teal-50',
    button: 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800',
  },
  
  shadows: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg shadow-teal-500/10',
    xl: 'shadow-xl shadow-teal-500/20',
    '2xl': 'shadow-2xl shadow-teal-500/25',
  },
  
  spacing: {
    section: 'py-16 lg:py-24',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  },
  
  typography: {
    h1: 'text-4xl md:text-5xl lg:text-6xl font-bold',
    h2: 'text-3xl md:text-4xl lg:text-5xl font-bold',
    h3: 'text-2xl md:text-3xl font-bold',
    h4: 'text-xl md:text-2xl font-semibold',
    body: 'text-base md:text-lg',
    small: 'text-sm',
  },
  
  components: {
    card: 'bg-white rounded-2xl shadow-lg shadow-teal-500/10 border border-teal-100/50 hover:shadow-xl hover:shadow-teal-500/20 transition-all duration-300',
    button: {
      primary: 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-500/25',
      secondary: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/25',
      outline: 'border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300',
    },
    badge: 'bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium',
  },
  
  animations: {
    fadeIn: 'animate-in fade-in duration-500',
    slideUp: 'animate-in slide-in-from-bottom-4 duration-500',
    scaleIn: 'animate-in zoom-in-95 duration-300',
  }
};

// Missing Features from Reference Websites
export const missingFeatures = [
  'Photography Tours',
  'Bird Watching Tours',
  'Cycling Tours', 
  'Pilgrimage Trips',
  'High-end Expeditions',
  'Eco-tourism Focus',
  'Homestay Integration',
  'Cultural Immersion Programs',
  'Festival Calendar Integration',
  'Multi-day Trekking Packages',
  'Luxury Boutique Experiences',
  'Sustainable Tourism Certification',
  'Government Recognition Badges',
  'Budget-friendly Options',
  'Family-friendly Packages',
  'Customized Itineraries',
  'Group vs Private Tour Options',
  'Seasonal Tour Recommendations',
  'Weather-based Tour Suggestions',
  'Local Guide Profiles',
];