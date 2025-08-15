import { Button } from "@/components/ui/button";
import { 
  Menu, X, ChevronDown, Plane, 
  MapPin, BookOpen, Phone, Star,
  Users, Award, Globe, Clock, ArrowRight, Search, User
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FEATURED_CATEGORIES } from "@/lib/tourCategories";
import { NAVBAR_ACCOMMODATIONS } from "@/lib/accommodationTypes";
import { scrollToTopInstant } from "@/lib/scrollUtils";
import BhutanLogo from "@/components/BhutanLogo";
import GlobalSearch from "@/components/GlobalSearch";

export default function Navigation() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const tourCategories = FEATURED_CATEGORIES;

  const travelInfo = [
    { to: "/visa-info", label: "Visa & Entry", icon: Globe, desc: "Requirements & procedures" },
    { to: "/flights", label: "Flights", icon: Plane, desc: "Druk Air & helicopter services" },
    { to: "/geography", label: "Geography", icon: MapPin, desc: "Regions & destinations" },
    { to: "/unique-experiences", label: "Unique Experiences", icon: Award, desc: "Special activities & attractions" },
    { to: "/travel-tips", label: "Travel Tips", icon: Clock, desc: "Essential information" },
    { to: "/faq", label: "FAQ", icon: BookOpen, desc: "Frequently asked questions" }
  ];

  const accommodations = NAVBAR_ACCOMMODATIONS;

  const isActive = (path: string) => {
    return location.pathname === path || (path !== "/" && location.pathname.startsWith(path));
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeDropdowns();
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav 
      ref={navRef} 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-brand-border' 
          : 'bg-white/80 backdrop-blur-lg border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group" onClick={handleLinkClick}>
            <BhutanLogo size="lg" />
            <span className="ml-3 text-2xl font-bold text-brand-primary tracking-tight transition-colors">
              Bhutan Mind Break
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavItem to="/" label="Home" active={isActive("/")} onClick={handleLinkClick} />
            
            <NavItem to="/tours" label="Tours" active={isActive("/tours")} onClick={handleLinkClick} />

            <NavItem to="/hotels" label="Hotels" active={isActive("/hotels")} onClick={handleLinkClick} />

            <NavItem to="/festivals" label="Festivals" active={isActive("/festivals")} onClick={handleLinkClick} />
            <NavItem to="/gallery" label="Gallery" active={isActive("/gallery")} onClick={handleLinkClick} />
            <NavItem to="/about" label="About" active={isActive("/about")} onClick={handleLinkClick} />
            
            <DropdownMenu 
              label="Travel Info" 
              active={isActive("/travel-info")} 
              onToggle={() => handleDropdownToggle('travel')} 
              isOpen={activeDropdown === 'travel'}
            >
              <div className="p-8 w-96">
                <h3 className="font-bold text-brand-text mb-6 text-lg">Plan Your Trip</h3>
                <div className="grid grid-cols-1 gap-3">
                  {travelInfo.map((info) => (
                    <DropdownLink 
                      key={info.to} 
                      to={info.to} 
                      icon={info.icon} 
                      label={info.label} 
                      desc={info.desc} 
                      onClick={handleLinkClick} 
                    />
                  ))}
                </div>
              </div>
            </DropdownMenu>
            
            <NavItem to="/contact" label="Contact" active={isActive("/contact")} onClick={handleLinkClick} />
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <GlobalSearch />
            <Button asChild className="brand-btn-primary" onClick={handleLinkClick}>
              <Link to="/tours">Book Now</Link>
            </Button>
            <Button variant="ghost" size="icon" className="text-brand-text-muted hover:text-brand-primary hover:bg-brand-emerald-50">
              <User className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="text-brand-text hover:text-brand-primary hover:bg-brand-emerald-50"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-brand-border shadow-xl">
          <div className="px-4 pt-4 pb-6 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
            {/* Mobile Search */}
            <div className="mb-6">
              <GlobalSearch />
            </div>
            
            <MobileNavItem to="/" label="Home" onClick={handleMobileLinkClick} />
            <MobileNavItem to="/tours" label="Tours" onClick={handleMobileLinkClick} />
            <MobileNavItem to="/hotels" label="Hotels" onClick={handleMobileLinkClick} />
            <MobileNavItem to="/festivals" label="Festivals" onClick={handleMobileLinkClick} />
            <MobileNavItem to="/gallery" label="Gallery" onClick={handleMobileLinkClick} />
            <MobileNavItem to="/about" label="About Us" onClick={handleMobileLinkClick} />
            
            <MobileDropdown label="Travel Information">
              {travelInfo.map((info) => (
                <MobileNavItem key={info.to} to={info.to} label={info.label} onClick={handleMobileLinkClick} />
              ))}
            </MobileDropdown>
            
            <MobileNavItem to="/contact" label="Contact" onClick={handleMobileLinkClick} />
            
            <div className="pt-6 border-t border-brand-border space-y-4">
              <Button asChild className="w-full brand-btn-primary" onClick={handleMobileLinkClick}>
                <Link to="/tours">Book Now</Link>
              </Button>
              <Button variant="outline" className="w-full brand-btn-outline">
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// Helper Components

const NavItem = ({ to, label, active, onClick }: { to: string, label: string, active: boolean, onClick: () => void }) => (
  <Link 
    to={to} 
    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
      active 
        ? 'bg-brand-emerald-100 text-brand-primary shadow-sm' 
        : 'text-brand-text-muted hover:bg-brand-emerald-50 hover:text-brand-primary'
    }`} 
    onClick={onClick}
  >
    {label}
  </Link>
);

const DropdownMenu = ({ label, active, onToggle, isOpen, children }: { label: string, active: boolean, onToggle: () => void, isOpen: boolean, children: React.ReactNode }) => (
  <div className="relative">
    <button 
      onClick={onToggle} 
      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center ${
        active || isOpen 
          ? 'bg-brand-emerald-100 text-brand-primary shadow-sm' 
          : 'text-brand-text-muted hover:bg-brand-emerald-50 hover:text-brand-primary'
      }`}
    >
      {label}
      <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    {isOpen && (
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-2xl shadow-2xl border border-brand-border z-50 overflow-hidden animate-in fade-in-0 slide-in-from-top-2 duration-200">
        {children}
      </div>
    )}
  </div>
);

const DropdownLink = ({ to, icon: Icon, label, desc, onClick }: { to: string, icon?: React.ElementType, label: string, desc?: string, onClick: () => void }) => (
  <Link 
    to={to} 
    className="flex items-center p-4 rounded-xl hover:bg-brand-emerald-50 transition-all duration-200 group" 
    onClick={onClick}
  >
    {Icon && (
      <div className="p-2 bg-brand-emerald-100 rounded-lg mr-4 group-hover:bg-brand-emerald-200 transition-colors">
        <Icon className="w-5 h-5 text-brand-primary" />
      </div>
    )}
    <div>
      <div className="font-semibold text-brand-text group-hover:text-brand-primary transition-colors">{label}</div>
      {desc && <div className="text-sm text-brand-text-muted mt-1">{desc}</div>}
    </div>
  </Link>
);

const MobileNavItem = ({ to, label, onClick }: { to: string, label: string, onClick: () => void }) => (
  <Link 
    to={to} 
    className="block px-4 py-3 text-base font-semibold text-brand-text rounded-xl hover:bg-brand-emerald-50 hover:text-brand-primary transition-all duration-200" 
    onClick={onClick}
  >
    {label}
  </Link>
);

const MobileDropdown = ({ label, children }: { label: string, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center px-4 py-3 text-base font-semibold text-brand-text rounded-xl hover:bg-brand-emerald-50 transition-all duration-200"
      >
        {label}
        <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pl-4 mt-2 space-y-2 border-l-2 border-brand-emerald-200">
          {children}
        </div>
      )}
    </div>
  );
};