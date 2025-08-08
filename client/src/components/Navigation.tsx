import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, X, ChevronDown, Plane, Calendar, 
  Hotel, MapPin, Camera, BookOpen, Phone, Star,
  Compass, Heart, Users, Award, Globe, Clock, Bird,
  Bike, Church, Leaf, ArrowRight
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { FEATURED_CATEGORIES } from "@/lib/tourCategories";
import { NAVBAR_ACCOMMODATIONS } from "@/lib/accommodationTypes";
import { scrollToTopInstant } from "@/lib/scrollUtils";
import BhutanLogo from "@/components/BhutanLogo";

export default function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const tourCategories = FEATURED_CATEGORIES;

  const travelInfo = [
    { href: "/visa-info", label: "Visa & Entry", icon: Globe, desc: "Requirements & procedures" },
    { href: "/flights", label: "Flights", icon: Plane, desc: "Druk Air & helicopter services" },
    { href: "/geography", label: "Geography", icon: MapPin, desc: "Regions & destinations" },
    { href: "/unique-experiences", label: "Unique Experiences", icon: Award, desc: "Special activities & attractions" },
    { href: "/travel-tips", label: "Travel Tips", icon: Clock, desc: "Essential information" },
    { href: "/faq", label: "FAQ", icon: BookOpen, desc: "Frequently asked questions" }
  ];

  const accommodations = NAVBAR_ACCOMMODATIONS;

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  const handleLinkClick = () => {
    closeDropdowns();
    scrollToTopInstant();
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
    scrollToTopInstant();
  };

  return (
    <nav className="fixed top-0 w-full nav-teal z-50 shadow-teal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center" onClick={handleLinkClick}>
            <BhutanLogo size="md" className="mr-3" />
            <span className="text-xl brand-heading text-gray-600">
              Bhutan Mind Break
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-1">

              {/* Tours Mega Menu */}
              <div className="relative">
                <button
                  className={`px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 flex items-center ${
                    isActive("/tours") || activeDropdown === 'tours'
                      ? "text-teal-600 bg-teal-50 shadow-sm"
                      : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                  }`}
                  onClick={() => handleDropdownToggle('tours')}
                >
                  Tours & Packages
                  <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${
                    activeDropdown === 'tours' ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {activeDropdown === 'tours' && (
                  <div className="absolute top-full left-0 mt-1 w-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50">
                    <div className="grid grid-cols-2 gap-6">
                      {/* Left Column - Tour Categories */}
                      <div>
                        <div className="border-b border-gray-100 pb-3 mb-4">
                          <h3 className="font-bold text-gray-900 mb-1">Tour Categories</h3>
                          <p className="text-sm text-gray-500">Discover authentic experiences</p>
                        </div>
                        <div className="space-y-2">
                          {tourCategories.slice(0, 6).map((category) => (
                            <Link key={category.href} href={category.href}>
                              <div className="flex items-center p-3 rounded-xl hover:bg-teal-50 transition-all duration-200 cursor-pointer group" onClick={handleLinkClick}>
                                <category.icon className="w-5 h-5 text-teal-600 mr-3 group-hover:scale-110 transition-transform" />
                                <div>
                                  <div className="font-medium text-gray-900 group-hover:text-teal-700">{category.label}</div>
                                  <div className="text-xs text-gray-500">{category.desc}</div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                      
                      {/* Right Column - Special Offers & CTA */}
                      <div>
                        <div className="border-b border-gray-100 pb-3 mb-4">
                          <h3 className="font-bold text-gray-900 mb-1">Popular Choices</h3>
                          <p className="text-sm text-gray-500">Most booked experiences</p>
                        </div>
                        
                        {/* Featured tour highlight */}
                        <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-4 mb-4 border border-teal-100">
                          <div className="flex items-center mb-2">
                            <Star className="w-4 h-4 text-amber-400 fill-current mr-1" />
                            <span className="text-sm font-medium text-gray-700">Most Popular</span>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-1">Tiger's Nest Trek</h4>
                          <p className="text-sm text-gray-600 mb-3">8-day cultural journey</p>
                          <Link href="/tours">
                            <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700 text-white" onClick={handleLinkClick}>
                              View Details
                            </Button>
                          </Link>
                        </div>
                        
                        <Link href="/custom-tour">
                          <div className="flex items-center p-3 rounded-xl hover:bg-amber-50 transition-all duration-200 cursor-pointer group border border-amber-200" onClick={handleLinkClick}>
                            <Users className="w-5 h-5 text-amber-600 mr-3 group-hover:scale-110 transition-transform" />
                            <div>
                              <div className="font-medium text-gray-900 group-hover:text-amber-700">Custom Package</div>
                              <div className="text-xs text-gray-500">Tailored to your preferences</div>
                            </div>
                          </div>
                        </Link>
                        
                        <div className="mt-4">
                          <Link href="/tours">
                            <Button className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold rounded-xl" onClick={handleLinkClick}>
                              View All Tours
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Travel Info Dropdown */}
              <div className="relative">
                <button
                  className={`px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 flex items-center ${
                    activeDropdown === 'travel'
                      ? "text-teal-600 bg-teal-50 shadow-sm"
                      : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                  }`}
                  onClick={() => handleDropdownToggle('travel')}
                >
                  Travel Info
                  <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${
                    activeDropdown === 'travel' ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {activeDropdown === 'travel' && (
                  <div className="absolute top-full left-0 mt-1 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50">
                    <div className="mb-4">
                      <h3 className="font-bold text-gray-900 mb-1">Travel Information</h3>
                      <p className="text-sm text-gray-500">Everything you need to know</p>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2">
                      {travelInfo.map((info) => (
                        <Link key={info.href} href={info.href}>
                          <div className="flex items-start p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer group" onClick={handleLinkClick}>
                            <div className="p-2 bg-teal-50 rounded-lg mr-3 group-hover:bg-teal-100 transition-colors">
                              <info.icon className="w-4 h-4 text-teal-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 text-sm group-hover:text-teal-700">{info.label}</div>
                              <div className="text-xs text-gray-500">{info.desc}</div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    {/* Quick contact */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-3 border border-teal-100">
                        <div className="flex items-center mb-2">
                          <Phone className="w-4 h-4 text-teal-600 mr-2" />
                          <span className="text-sm font-medium text-gray-700">Need Help?</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">Speak with our travel experts</p>
                        <Link href="/contact">
                          <Button size="sm" variant="outline" className="w-full border-teal-200 text-teal-600 hover:bg-teal-50" onClick={handleLinkClick}>
                            Contact Us
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Hotels Dropdown */}
              <div className="relative">
                <button
                  className={`px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 flex items-center ${
                    isActive("/hotels") || activeDropdown === 'hotels'
                      ? "text-teal-600 bg-teal-50 shadow-sm"
                      : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                  }`}
                  onClick={() => handleDropdownToggle('hotels')}
                >
                  Hotels
                  <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${
                    activeDropdown === 'hotels' ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {activeDropdown === 'hotels' && (
                  <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50">
                    <div className="mb-4">
                      <h3 className="font-bold text-gray-900 mb-1">Accommodations</h3>
                      <p className="text-sm text-gray-500">From luxury to authentic stays</p>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2">
                      {accommodations.map((hotel) => (
                        <Link key={hotel.href} href={hotel.href}>
                          <div className="p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer group" onClick={handleLinkClick}>
                            <div className="font-medium text-gray-900 text-sm group-hover:text-teal-700">{hotel.label}</div>
                            <div className="text-xs text-gray-500">{hotel.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    {/* Featured accommodation */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-3 border border-amber-100">
                        <div className="flex items-center mb-2">
                          <Award className="w-4 h-4 text-amber-600 mr-2" />
                          <span className="text-sm font-medium text-gray-700">Recommended</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">Luxury Mountain Lodges</h4>
                        <p className="text-xs text-gray-600 mb-2">Premium comfort in pristine nature</p>
                        <Link href="/hotels/luxury">
                          <Button size="sm" className="w-full bg-amber-600 hover:bg-amber-700 text-white" onClick={handleLinkClick}>
                            Explore Luxury
                          </Button>
                        </Link>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <Link href="/hotels">
                        <Button variant="outline" className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl" onClick={handleLinkClick}>
                          View All Hotels
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/festivals">
                <span
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive("/festivals")
                      ? "text-teal-600 bg-teal-50 shadow-sm"
                      : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                  }`}
                  onClick={handleLinkClick}
                >
                  Festivals
                </span>
              </Link>

              <Link href="/gallery">
                <span
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive("/gallery")
                      ? "text-teal-600 bg-teal-50 shadow-sm"
                      : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                  }`}
                  onClick={handleLinkClick}
                >
                  Gallery
                </span>
              </Link>

              <Link href="/blog">
                <span
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive("/blog")
                      ? "text-teal-600 bg-teal-50 shadow-sm"
                      : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                  }`}
                  onClick={handleLinkClick}
                >
                  Blog
                </span>
              </Link>

              <Link href="/about">
                <span
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive("/about")
                      ? "text-teal-600 bg-teal-50 shadow-sm"
                      : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                  }`}
                  onClick={handleLinkClick}
                >
                  About
                </span>
              </Link>

              <Link href="/contact">
                <span
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive("/contact")
                      ? "text-teal-600 bg-teal-50 shadow-sm"
                      : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                  }`}
                  onClick={handleLinkClick}
                >
                  Contact
                </span>
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-3">
            <Link href="/tours">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md font-medium transition-all duration-200 shadow-sm hover:shadow-md" onClick={handleLinkClick}>
                Book Now
              </Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-teal-600"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-teal-100">
            <div className="px-2 pt-2 pb-3 space-y-1 max-h-96 overflow-y-auto">
              
              <div className="border-l-2 border-teal-200 ml-3 pl-3 space-y-1">
                <div className="text-sm font-semibold text-teal-800 px-3 py-1">Tours & Packages</div>
                {tourCategories.map((category) => (
                  <Link key={category.href} href={category.href}>
                    <span
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-md cursor-pointer"
                      onClick={handleMobileLinkClick}
                    >
                      {category.label}
                    </span>
                  </Link>
                ))}
                <Link href="/custom-tour">
                  <span
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-md cursor-pointer"
                    onClick={handleMobileLinkClick}
                  >
                    Custom Package
                  </span>
                </Link>
                <Link href="/tours">
                  <span
                    className="block px-3 py-2 text-sm text-teal-600 font-medium hover:bg-teal-50 rounded-md cursor-pointer flex items-center"
                    onClick={handleMobileLinkClick}
                  >
                    Explore More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </span>
                </Link>
              </div>
              
              <div className="border-l-2 border-teal-200 ml-3 pl-3 space-y-1">
                <div className="text-sm font-semibold text-teal-800 px-3 py-1">Travel Information</div>
                {travelInfo.map((info) => (
                  <Link key={info.href} href={info.href}>
                    <span
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-md cursor-pointer"
                      onClick={handleMobileLinkClick}
                    >
                      {info.label}
                    </span>
                  </Link>
                ))}
              </div>
              
              <Link href="/hotels">
                <span
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer ${
                    isActive("/hotels")
                      ? "text-teal-600 bg-teal-50"
                      : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                  }`}
                  onClick={handleMobileLinkClick}
                >
                  Hotels
                </span>
              </Link>
              
              <Link href="/festivals">
                <span
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer ${
                    isActive("/festivals")
                      ? "text-teal-600 bg-teal-50"
                      : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                  }`}
                  onClick={handleMobileLinkClick}
                >
                  Festivals
                </span>
              </Link>
              
              <Link href="/gallery">
                <span
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer ${
                    isActive("/gallery")
                      ? "text-teal-600 bg-teal-50"
                      : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                  }`}
                  onClick={handleMobileLinkClick}
                >
                  Gallery
                </span>
              </Link>
              
              <Link href="/blog">
                <span
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer ${
                    isActive("/blog")
                      ? "text-teal-600 bg-teal-50"
                      : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                  }`}
                  onClick={handleMobileLinkClick}
                >
                  Blog
                </span>
              </Link>
              
              <Link href="/about">
                <span
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer ${
                    isActive("/about")
                      ? "text-teal-600 bg-teal-50"
                      : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                  }`}
                  onClick={handleMobileLinkClick}
                >
                  About
                </span>
              </Link>
              
              <Link href="/contact">
                <span
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer ${
                    isActive("/contact")
                      ? "text-teal-600 bg-teal-50"
                      : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                  }`}
                  onClick={handleMobileLinkClick}
                >
                  Contact
                </span>
              </Link>
              
              <div className="border-t border-teal-100 pt-3 mt-3 space-y-2">
                <Link href="/tours">
                  <Button
                    className="w-full btn-teal"
                    onClick={handleMobileLinkClick}
                  >
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Overlay for dropdown menus */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 bg-black/10 z-[-1]" 
          onClick={closeDropdowns}
        />
      )}
    </nav>
  );
}
