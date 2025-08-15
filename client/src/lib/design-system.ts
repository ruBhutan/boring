// Professional Design System for Bhutan Tourism Website
export const designSystem = {
  colors: {
    // Primary Brand Colors - Professional Teal Palette
    primary: {
      50: 'hsl(173, 100%, 97%)',
      100: 'hsl(173, 84%, 91%)',
      200: 'hsl(173, 83%, 80%)',
      300: 'hsl(173, 82%, 65%)',
      400: 'hsl(173, 76%, 51%)',
      500: 'hsl(173, 58%, 39%)', // Main brand color
      600: 'hsl(173, 56%, 31%)',
      700: 'hsl(173, 55%, 25%)',
      800: 'hsl(173, 50%, 21%)',
      900: 'hsl(173, 46%, 17%)',
      950: 'hsl(173, 84%, 10%)',
    },
    // Secondary - Professional Amber
    secondary: {
      50: 'hsl(48, 100%, 96%)',
      100: 'hsl(48, 96%, 89%)',
      200: 'hsl(48, 97%, 77%)',
      300: 'hsl(46, 97%, 65%)',
      400: 'hsl(43, 96%, 56%)',
      500: 'hsl(38, 92%, 50%)', // Accent amber
      600: 'hsl(32, 95%, 44%)',
      700: 'hsl(26, 90%, 37%)',
      800: 'hsl(23, 83%, 31%)',
      900: 'hsl(22, 78%, 26%)',
      950: 'hsl(21, 94%, 14%)',
    },
    // Neutral Professional Grays
    neutral: {
      50: 'hsl(210, 20%, 98%)',
      100: 'hsl(220, 14%, 96%)',
      200: 'hsl(220, 13%, 91%)',
      300: 'hsl(216, 12%, 84%)',
      400: 'hsl(218, 11%, 65%)',
      500: 'hsl(220, 9%, 46%)',
      600: 'hsl(215, 14%, 34%)',
      700: 'hsl(217, 19%, 27%)',
      800: 'hsl(215, 28%, 17%)',
      900: 'hsl(221, 39%, 11%)',
      950: 'hsl(224, 71%, 4%)',
    },
    // Semantic Colors
    success: 'hsl(142, 76%, 36%)',
    warning: 'hsl(38, 92%, 50%)',
    error: 'hsl(0, 84%, 60%)',
    info: 'hsl(199, 89%, 48%)',
    // Accent Colors
    emerald: 'hsl(160, 84%, 39%)',
    slate: 'hsl(215, 28%, 17%)',
    sky: 'hsl(199, 89%, 48%)',
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