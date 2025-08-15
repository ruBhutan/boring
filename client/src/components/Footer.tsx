import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube, Linkedin, Award, Shield, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CONTACT_INFO } from "@/lib/constants";
import BhutanLogo from "@/components/BhutanLogo";

export default function Footer() {
  return (
    <footer className="bg-brand-hero-gradient text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <BhutanLogo size="lg" className="mr-3" />
              <span className="text-2xl font-bold text-white">
                Bhutan Mind Break
              </span>
            </div>
            <p className="text-brand-text-muted mb-8 leading-relaxed">
              Linking People, Places, and Purpose! We are more than a gateway to Bhutan—we're a bridge 
              between experiences rooted in Gross National Happiness and High-Value, Low-Impact Tourism.
            </p>
            
            {/* Trust Badges */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-brand-text-muted">
                <Award className="w-5 h-5 text-brand-secondary" />
                <span>Licensed Tour Operator</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-brand-text-muted">
                <Shield className="w-5 h-5 text-brand-primary" />
                <span>Sustainable Tourism Certified</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-brand-text-muted">
                <Heart className="w-5 h-5 text-brand-accent" />
                <span>4.9/5 from 2,500+ Reviews</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href={CONTACT_INFO.social.facebook}
                className="bg-white/10 hover:bg-brand-primary p-3 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={CONTACT_INFO.social.instagram}
                className="bg-white/10 hover:bg-brand-primary p-3 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={CONTACT_INFO.social.twitter}
                className="bg-white/10 hover:bg-brand-primary p-3 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={CONTACT_INFO.social.youtube}
                className="bg-white/10 hover:bg-brand-primary p-3 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-brand-primary p-3 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/tours" className="text-brand-text-muted hover:text-brand-highlight transition-colors duration-300 flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  All Tours
                </Link>
              </li>
              <li>
                <Link to="/custom-tour" className="text-brand-text-muted hover:text-brand-highlight transition-colors duration-300 flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Custom Tours
                </Link>
              </li>
              <li>
                <Link to="/festivals" className="text-brand-text-muted hover:text-brand-highlight transition-colors duration-300 flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Festivals
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="text-brand-text-muted hover:text-brand-highlight transition-colors duration-300 flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Hotels
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-brand-text-muted hover:text-brand-highlight transition-colors duration-300 flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-brand-text-muted hover:text-brand-highlight transition-colors duration-300 flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Destinations */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-6 text-white">Destinations</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/destinations/paro" className="text-brand-text-muted hover:text-brand-highlight transition-colors duration-300 flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Paro Valley
                </Link>
              </li>
              <li>
                <Link to="/destinations/thimphu" className="text-brand-text-muted hover:text-brand-highlight transition-colors duration-300 flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Thimphu
                </Link>
              </li>
              <li>
                <Link to="/destinations/punakha" className="text-brand-text-muted hover:text-brand-highlight transition-colors duration-300 flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Punakha
                </Link>
              </li>
              <li>
                <Link to="/destinations/bumthang" className="text-brand-text-muted hover:text-brand-highlight transition-colors duration-300 flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Bumthang
                </Link>
              </li>
              <li>
                <Link to="/unique-experiences" className="text-brand-text-muted hover:text-brand-highlight transition-colors duration-300 flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Unique Experiences
                </Link>
              </li>
              <li>
                <Link to="/travel-tips" className="text-brand-text-muted hover:text-brand-highlight transition-colors duration-300 flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Travel Tips
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-6 text-white">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-brand-highlight mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-brand-text-muted text-sm leading-relaxed">
                    {CONTACT_INFO.address.street}<br />
                    {CONTACT_INFO.address.city}, Bhutan
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-brand-highlight flex-shrink-0" />
                <a href={`tel:${CONTACT_INFO.phones[0]}`} className="text-brand-text-muted hover:text-brand-highlight transition-colors duration-300 text-sm">
                  {CONTACT_INFO.phones[0]}
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-brand-highlight flex-shrink-0" />
                <a href={`mailto:${CONTACT_INFO.emails[0]}`} className="text-brand-text-muted hover:text-brand-highlight transition-colors duration-300 text-sm">
                  {CONTACT_INFO.emails[0]}
                </a>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4 text-white">Newsletter</h4>
              <p className="text-brand-text-muted text-sm mb-4">
                Get the latest updates on Bhutan tours and exclusive offers.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-brand-primary transition-colors"
                />
                <button className="px-6 py-3 bg-brand-primary hover:bg-brand-emerald-800 text-white font-semibold rounded-r-lg transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center justify-center md:justify-start space-x-6 text-sm text-gray-400">
              <span>© 2024 Bhutan Mind Break. All rights reserved.</span>
              <span>•</span>
              <span>Licensed by Tourism Council of Bhutan</span>
              <span>•</span>
              <span>Member of ABTO</span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-brand-highlight transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-brand-highlight transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-brand-highlight transition-colors duration-300">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}