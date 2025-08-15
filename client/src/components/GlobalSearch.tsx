import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Camera, 
  Mountain,
  Star,
  Clock,
  ArrowRight,
  Sparkles,
  Globe,
  Building2,
  Plane,
  BookOpen
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchResult {
  id: string;
  title: string;
  type: 'tour' | 'destination' | 'hotel' | 'blog' | 'page';
  description: string;
  url: string;
  image?: string;
  rating?: number;
  price?: string;
  location?: string;
  category?: string;
}

const GlobalSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  // Comprehensive mock data for search results
  const mockResults: SearchResult[] = [
    // Tours
    {
      id: '1',
      title: 'Cultural Heritage Tour',
      type: 'tour',
      description: 'Explore ancient monasteries and traditional villages',
      url: '/tours/cultural',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
      rating: 4.8,
      price: '$2,400',
      location: 'Thimphu, Paro',
      category: 'Cultural'
    },
    {
      id: '2',
      title: 'Luxury Bhutan Experience',
      type: 'tour', 
      description: 'Premium accommodations and exclusive experiences',
      url: '/tours/luxury',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
      rating: 4.9,
      price: '$5,200',
      location: 'Multiple locations',
      category: 'Luxury'
    },
    {
      id: '3',
      title: 'Adventure Trekking Tours',
      type: 'tour',
      description: 'Himalayan trekking and outdoor adventures',
      url: '/tours/adventure',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      rating: 4.7,
      price: '$1,800',
      location: 'Himalayas',
      category: 'Adventure'
    },
    {
      id: '4',
      title: 'Photography Expedition',
      type: 'tour',
      description: 'Capture Bhutan\'s stunning landscapes and culture',
      url: '/tours/photography',
      price: '$3,200',
      category: 'Photography',
      location: 'Various locations'
    },
    {
      id: '5',
      title: 'Spiritual Journey & Meditation',
      type: 'tour',
      description: 'Monastery visits and meditation retreats',
      url: '/tours/spiritual',
      rating: 4.8,
      price: '$2,800',
      category: 'Spiritual',
      location: 'Thimphu, Punakha'
    },
    {
      id: '6',
      title: 'Festival Tours',
      type: 'tour',
      description: 'Experience traditional Bhutanese festivals',
      url: '/tours/festival',
      rating: 4.9,
      price: '$3,500',
      category: 'Festival',
      location: 'Various dzongs'
    },
    // Destinations
    {
      id: '7',
      title: "Tiger's Nest Monastery",
      type: 'destination',
      description: 'Iconic monastery perched on a cliff face',
      url: '/destinations/tigers-nest',
      image: 'https://images.unsplash.com/photo-1570298935625-388cee4792ca',
      location: 'Paro Valley'
    },
    {
      id: '8',
      title: 'Thimphu Capital City',
      type: 'destination',
      description: 'Modern capital with traditional architecture',
      url: '/destinations/thimphu',
      location: 'Thimphu Valley'
    },
    {
      id: '9',
      title: 'Punakha Dzong',
      type: 'destination',
      description: 'Ancient fortress at river confluence',
      url: '/destinations/punakha',
      location: 'Punakha Valley'
    },
    {
      id: '10',
      title: 'Paro Valley',
      type: 'destination',
      description: 'Historic valley with airport and Tiger\'s Nest',
      url: '/destinations/paro',
      location: 'Paro'
    },
    // Hotels
    {
      id: '11',
      title: 'Amankora Luxury Resort',
      type: 'hotel',
      description: 'Ultra-luxury pavilion-style resort',
      url: '/hotels/luxury',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      rating: 5.0,
      location: 'Thimphu, Paro',
      price: '$1,800/night'
    },
    {
      id: '12',
      title: 'Uma Paro by COMO',
      type: 'hotel',
      description: 'Contemporary luxury with valley views',
      url: '/hotels/luxury',
      rating: 4.9,
      location: 'Paro',
      price: '$1,200/night'
    },
    {
      id: '13',
      title: 'Traditional Farmstays',
      type: 'hotel',
      description: 'Authentic rural experience with local families',
      url: '/hotels/farmstays',
      rating: 4.5,
      location: 'Rural valleys',
      price: '$80/night'
    },
    {
      id: '14',
      title: 'Boutique Heritage Hotels',
      type: 'hotel',
      description: 'Charming properties in historic buildings',
      url: '/hotels/boutique',
      rating: 4.6,
      location: 'Various',
      price: '$250/night'
    },
    // Pages & Information
    {
      id: '15',
      title: 'Visa Information',
      type: 'page',
      description: 'Requirements and application process',
      url: '/visa-info'
    },
    {
      id: '16',
      title: 'Flight Information',
      type: 'page',
      description: 'Airlines, schedules, and booking',
      url: '/flights'
    },
    {
      id: '17',
      title: 'Festival Calendar',
      type: 'page',
      description: 'Annual festivals and events',
      url: '/festivals'
    },
    {
      id: '18',
      title: 'Geography & Climate',
      type: 'page',
      description: 'Regions, altitudes, and weather patterns',
      url: '/geography'
    },
    {
      id: '19',
      title: 'Travel Tips',
      type: 'page',
      description: 'Essential information for travelers',
      url: '/travel-tips'
    },
    {
      id: '20',
      title: 'Contact Us',
      type: 'page',
      description: 'Get in touch with our travel experts',
      url: '/contact'
    },
    // Blog posts
    {
      id: '21',
      title: 'Best Time to Visit Bhutan',
      type: 'blog',
      description: 'Complete guide to seasons and weather patterns',
      url: '/blog/best-time-to-visit-bhutan'
    },
    {
      id: '22',
      title: 'Bhutanese Cuisine Guide',
      type: 'blog',
      description: 'Traditional dishes and dining experiences',
      url: '/blog/bhutanese-cuisine'
    },
    {
      id: '23',
      title: 'Photography Tips for Bhutan',
      type: 'blog',
      description: 'Capture the perfect shots in the Himalayas',
      url: '/blog/photography-tips'
    }
  ];

  const popularSearches = [
    'Tiger\'s Nest',
    'Cultural Tours', 
    'Luxury Hotels',
    'Paro',
    'Thimphu',
    'Photography Tours',
    'Trekking',
    'Visa Requirements'
  ];

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (debouncedQuery.length > 2) {
      performSearch(debouncedQuery);
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const performSearch = async (searchQuery: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const filtered = mockResults.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setResults(filtered);
    setIsLoading(false);
  };

  const handleSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    if (!recentSearches.includes(searchTerm) && searchTerm.length > 2) {
      const updated = [searchTerm, ...recentSearches.slice(0, 4)];
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    }
  };

  const handleResultClick = (result: SearchResult) => {
    navigate(result.url);
    setIsOpen(false);
    setQuery('');
  };

  const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'tour': return <Calendar className="w-4 h-4" />;
      case 'destination': return <MapPin className="w-4 h-4" />;
      case 'hotel': return <Building2 className="w-4 h-4" />;
      case 'blog': return <BookOpen className="w-4 h-4" />;
      case 'page': return <Globe className="w-4 h-4" />;
      default: return <Search className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: SearchResult['type']) => {
    switch (type) {
      case 'tour': return 'bg-emerald-100 text-emerald-700';
      case 'destination': return 'bg-indigo-100 text-indigo-700';
      case 'hotel': return 'bg-purple-100 text-purple-700';
      case 'blog': return 'bg-amber-100 text-amber-700';
      case 'page': return 'bg-slate-100 text-slate-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="relative p-2 text-brand-text hover:text-brand-primary hover:bg-brand-light transition-all duration-200 rounded-full"
          title="Search (⌘K)"
        >
          <Search className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            Global Search
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-6 pt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              ref={searchInputRef}
              placeholder="Search anything on our website..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-4 h-12 text-lg border-2 border-slate-200 focus:border-emerald-500 rounded-xl"
              autoFocus
            />
            {isLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* Search Results */}
          {results.length > 0 && (
            <div className="mt-6 space-y-2 max-h-60 overflow-y-auto">
              <h3 className="text-sm font-semibold text-slate-600 px-2">Search Results</h3>
              {results.map((result) => (
                <div
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group"
                >
                  {result.image && (
                    <img 
                      src={result.image} 
                      alt={result.title}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={`${getTypeColor(result.type)} border-0 text-xs`}>
                        {getTypeIcon(result.type)}
                        <span className="ml-1 capitalize">{result.type}</span>
                      </Badge>
                      {result.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-current" />
                          <span className="text-xs text-slate-600">{result.rating}</span>
                        </div>
                      )}
                    </div>
                    <h4 className="font-semibold text-slate-900 truncate group-hover:text-emerald-600">
                      {result.title}
                    </h4>
                    <p className="text-sm text-slate-600 line-clamp-1">{result.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      {result.location && (
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <MapPin className="w-3 h-3" />
                          {result.location}
                        </div>
                      )}
                      {result.price && (
                        <div className="text-sm font-semibold text-emerald-600">
                          {result.price}
                        </div>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {query.length > 2 && results.length === 0 && !isLoading && (
            <div className="mt-6 text-center py-8">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No results found</h3>
              <p className="text-slate-600">Try searching with different keywords or browse our popular searches below.</p>
            </div>
          )}

          {/* Recent & Popular Searches */}
          {query.length === 0 && (
            <div className="mt-6 space-y-4">
              {recentSearches.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-600 mb-3">Recent Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="px-3 py-1.5 text-sm bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-colors flex items-center gap-2"
                      >
                        <Clock className="w-3 h-3" />
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-semibold text-slate-600 mb-3">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(search)}
                      className="px-3 py-1.5 text-sm bg-emerald-50 text-emerald-700 rounded-full hover:bg-emerald-100 transition-colors flex items-center gap-2"
                    >
                      <Sparkles className="w-3 h-3" />
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalSearch;
