import { useState } from "react";
import { 
  Filter, Calendar, DollarSign, Users, MapPin, Search, X, 
  SlidersHorizontal, Star, Mountain, Clock, Compass
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { TOUR_CATEGORIES } from "@/lib/constants";
import type { Tour } from "@shared/schema";

interface TourFilterProps {
  tours: Tour[];
  onFilteredTours: (tours: Tour[]) => void;
}

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'duration-short', label: 'Duration: Short to Long' },
  { value: 'duration-long', label: 'Duration: Long to Short' },
  { value: 'rating', label: 'Highest Rated' }
];

export default function TourFilter({ tours, onFilteredTours }: TourFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [filters, setFilters] = useState({
    category: "",
    duration: "",
    priceRange: "",
    groupSize: "",
    difficulty: "",
    season: "",
  });
  
  const activeFilterCount = Object.values(filters).filter(Boolean).length + (searchTerm ? 1 : 0);

  const applyFilters = () => {
    let filtered = [...tours];

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(tour => 
        tour.name.toLowerCase().includes(search) ||
        tour.description.toLowerCase().includes(search) ||
        tour.category.toLowerCase().includes(search)
      );
    }

    if (filters.category) {
      filtered = filtered.filter(tour => tour.category === filters.category);
    }

    if (filters.duration && filters.duration !== 'all') {
      const [min, max] = filters.duration.split("-").map(Number);
      filtered = filtered.filter(tour => {
        const duration = tour.duration;
        if (max) {
          return duration >= min && duration <= max;
        }
        return duration >= min;
      });
    }

    if (filters.priceRange && filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split("-").map(Number);
      filtered = filtered.filter(tour => {
        const price = tour.price;
        if (max) {
          return price >= min && price <= max;
        }
        return price >= min;
      });
    }

    if (filters.groupSize && filters.groupSize !== 'all') {
      const maxSize = parseInt(filters.groupSize);
      filtered = filtered.filter(tour => tour.maxGroupSize <= maxSize);
    }

    if (filters.difficulty && filters.difficulty !== 'all') {
      filtered = filtered.filter(tour => tour.difficulty === filters.difficulty);
    }

    // Apply sorting
    filtered = sortTours(filtered, sortBy);

    onFilteredTours(filtered);
  };
  
  const sortTours = (toursToSort: Tour[], sortOption: string) => {
    const sorted = [...toursToSort];
    
    switch (sortOption) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'duration-short':
        return sorted.sort((a, b) => a.duration - b.duration);
      case 'duration-long':
        return sorted.sort((a, b) => b.duration - a.duration);
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'popular':
      default:
        return sorted; // Keep original order for popular
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSortBy("popular");
    setFilters({
      category: "",
      duration: "",
      priceRange: "",
      groupSize: "",
      difficulty: "",
      season: "",
    });
    onFilteredTours(tours);
  };

  const updateFilter = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Auto-apply filters when changed
    setTimeout(() => {
      let filtered = [...tours];

      // Apply search
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        filtered = filtered.filter(tour => 
          tour.name.toLowerCase().includes(search) ||
          tour.description.toLowerCase().includes(search) ||
          tour.category.toLowerCase().includes(search)
        );
      }

      if (newFilters.category) {
        filtered = filtered.filter(tour => tour.category === newFilters.category);
      }

      if (newFilters.duration) {
        const [min, max] = newFilters.duration.split("-").map(Number);
        filtered = filtered.filter(tour => {
          const duration = tour.duration;
          if (max) {
            return duration >= min && duration <= max;
          }
          return duration >= min;
        });
      }

      if (newFilters.priceRange) {
        const [min, max] = newFilters.priceRange.split("-").map(Number);
        filtered = filtered.filter(tour => {
          const price = tour.price;
          if (max) {
            return price >= min && price <= max;
          }
          return price >= min;
        });
      }

      if (newFilters.groupSize) {
        const maxSize = parseInt(newFilters.groupSize);
        filtered = filtered.filter(tour => tour.maxGroupSize <= maxSize);
      }

      if (newFilters.difficulty) {
        filtered = filtered.filter(tour => tour.difficulty === newFilters.difficulty);
      }

      // Apply sorting
      filtered = sortTours(filtered, sortBy);

      onFilteredTours(filtered);
    }, 100);
  };
  
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setTimeout(() => {
      let filtered = [...tours];
      
      if (value) {
        const search = value.toLowerCase();
        filtered = filtered.filter(tour => 
          tour.name.toLowerCase().includes(search) ||
          tour.description.toLowerCase().includes(search) ||
          tour.category.toLowerCase().includes(search)
        );
      }
      
      // Apply other filters
      if (filters.category) {
        filtered = filtered.filter(tour => tour.category === filters.category);
      }
      // ... other filters would be applied here
      
      filtered = sortTours(filtered, sortBy);
      onFilteredTours(filtered);
    }, 300);
  };
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
    setTimeout(() => {
      let filtered = [...tours];
      // Apply all current filters first
      // ... filter logic here
      filtered = sortTours(filtered, value);
      onFilteredTours(filtered);
    }, 100);
  };

  return (
    <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl shadow-xl border-0 p-6 mb-8">
      {/* Search and Sort Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search tours, destinations, activities..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-12 h-12 border-teal-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-xl text-lg"
          />
        </div>
        
        <div>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="h-12 border-teal-200 focus:border-teal-500 rounded-xl">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Quick Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={filters.category === "" ? "default" : "outline"}
          size="sm"
          onClick={() => updateFilter("category", "")}
          className={`rounded-full transition-all duration-300 ${
            filters.category === ""
              ? "bg-teal-600 text-white shadow-lg transform scale-105"
              : "border-teal-200 text-teal-700 hover:bg-teal-50 hover:border-teal-300"
          }`}
        >
          All Tours
        </Button>
        {TOUR_CATEGORIES.filter(cat => cat.value !== 'all').slice(0, 6).map((category) => (
          <Button
            key={category.value}
            variant={filters.category === category.value ? "default" : "outline"}
            size="sm"
            onClick={() => updateFilter("category", category.value)}
            className={`rounded-full transition-all duration-300 ${
              filters.category === category.value
                ? "bg-teal-600 text-white shadow-lg transform scale-105"
                : "border-teal-200 text-teal-700 hover:bg-teal-50 hover:border-teal-300"
            }`}
          >
            {category.label}
          </Button>
        ))}
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            className="w-full flex items-center justify-between p-4 text-left border-teal-200 hover:bg-teal-50 rounded-xl"
          >
            <div className="flex items-center">
              <SlidersHorizontal className="w-5 h-5 mr-2 text-teal-600" />
              <span className="font-medium text-gray-800">Advanced Filters</span>
              {activeFilterCount > 0 && (
                <Badge className="ml-2 bg-teal-100 text-teal-800">
                  {activeFilterCount} active
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {tours.length} tours available
              </span>
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFilters();
                  }}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-6 pt-6 border-t border-teal-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Duration Filter */}
            <div className="space-y-3">
              <Label htmlFor="duration" className="text-sm font-semibold text-gray-700 flex items-center">
                <Clock className="w-4 h-4 mr-1 text-teal-600" />
                Duration
              </Label>
              <Select value={filters.duration} onValueChange={(value) => updateFilter("duration", value)}>
                <SelectTrigger className="border-teal-200 focus:border-teal-500 rounded-xl">
                  <SelectValue placeholder="Any Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Duration</SelectItem>
                  <SelectItem value="1-3">1-3 Days</SelectItem>
                  <SelectItem value="4-7">4-7 Days</SelectItem>
                  <SelectItem value="8-14">8-14 Days</SelectItem>
                  <SelectItem value="15">15+ Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-3">
              <Label htmlFor="priceRange" className="text-sm font-semibold text-gray-700 flex items-center">
                <DollarSign className="w-4 h-4 mr-1 text-teal-600" />
                Price Range
              </Label>
              <Select value={filters.priceRange} onValueChange={(value) => updateFilter("priceRange", value)}>
                <SelectTrigger className="border-teal-200 focus:border-teal-500 rounded-xl">
                  <SelectValue placeholder="Any Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Price</SelectItem>
                  <SelectItem value="0-2000">Under $2,000</SelectItem>
                  <SelectItem value="2000-4000">$2,000 - $4,000</SelectItem>
                  <SelectItem value="4000-6000">$4,000 - $6,000</SelectItem>
                  <SelectItem value="6000">$6,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Group Size Filter */}
            <div className="space-y-3">
              <Label htmlFor="groupSize" className="text-sm font-semibold text-gray-700 flex items-center">
                <Users className="w-4 h-4 mr-1 text-teal-600" />
                Group Size
              </Label>
              <Select value={filters.groupSize} onValueChange={(value) => updateFilter("groupSize", value)}>
                <SelectTrigger className="border-teal-200 focus:border-teal-500 rounded-xl">
                  <SelectValue placeholder="Any Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Size</SelectItem>
                  <SelectItem value="4">Small (1-4 people)</SelectItem>
                  <SelectItem value="8">Medium (5-8 people)</SelectItem>
                  <SelectItem value="12">Large (9-12 people)</SelectItem>
                  <SelectItem value="20">Extra Large (13+ people)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Difficulty Filter */}
            <div className="space-y-3">
              <Label htmlFor="difficulty" className="text-sm font-semibold text-gray-700 flex items-center">
                <Mountain className="w-4 h-4 mr-1 text-teal-600" />
                Difficulty
              </Label>
              <Select value={filters.difficulty} onValueChange={(value) => updateFilter("difficulty", value)}>
                <SelectTrigger className="border-teal-200 focus:border-teal-500 rounded-xl">
                  <SelectValue placeholder="Any Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Level</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Challenging">Challenging</SelectItem>
                  <SelectItem value="Difficult">Difficult</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Season Filter */}
            <div className="space-y-3">
              <Label htmlFor="season" className="text-sm font-semibold text-gray-700 flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-teal-600" />
                Best Season
              </Label>
              <Select value={filters.season} onValueChange={(value) => updateFilter("season", value)}>
                <SelectTrigger className="border-teal-200 focus:border-teal-500 rounded-xl">
                  <SelectValue placeholder="Any Season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Season</SelectItem>
                  <SelectItem value="Spring">Spring (Mar-May)</SelectItem>
                  <SelectItem value="Summer">Summer (Jun-Aug)</SelectItem>
                  <SelectItem value="Autumn">Autumn (Sep-Nov)</SelectItem>
                  <SelectItem value="Winter">Winter (Dec-Feb)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex space-x-4 pt-6 border-t border-teal-100">
            <Button 
              onClick={applyFilters} 
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-3 font-semibold shadow-lg"
            >
              <Compass className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
            <Button 
              onClick={clearFilters} 
              variant="outline" 
              className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-xl py-3 font-semibold"
            >
              <X className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}