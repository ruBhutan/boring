import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "wouter";
import { CONTACT_INFO } from "@/lib/constants";
import BhutanLogo from "@/components/BhutanLogo";

export default function Footer() {
  return (
    <footer className="section-teal-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <BhutanLogo size="md" className="mr-3" />
              <span className="text-2xl font-bold !text-white brand-heading">
                Bhutan Mind Break
              </span>
            </div>
            <p className="!text-white mb-6 max-w-md brand-body leading-relaxed">
              Your gateway to the Last Shangri-La. We create transformative journeys that connect you 
              with Bhutan's ancient wisdom, pristine nature, and authentic culture.
            </p>
            <div className="flex space-x-4">
              <a
                href={CONTACT_INFO.social.facebook}
                className="bg-teal-800/50 hover:bg-teal-600 p-3 rounded-full transition-colors teal-glow"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={CONTACT_INFO.social.instagram}
                className="bg-teal-800/50 hover:bg-pink-600 p-3 rounded-full transition-colors teal-glow"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={CONTACT_INFO.social.twitter}
                className="bg-teal-800/50 hover:bg-teal-400 p-3 rounded-full transition-colors teal-glow"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={CONTACT_INFO.social.youtube}
                className="bg-teal-800/50 hover:bg-red-600 p-3 rounded-full transition-colors teal-glow"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 brand-heading text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tours" className="text-gray-300 hover:text-white transition-colors">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-white transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Travel Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 brand-heading text-white">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-gray-300 text-sm">
                  {CONTACT_INFO.address.street}, {CONTACT_INFO.address.city}
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-gray-300 text-sm">{CONTACT_INFO.phones[0]}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                <Link href="/contact" className="text-gray-300 text-sm hover:text-white transition-colors">
                  {CONTACT_INFO.emails[0]}
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-teal-700/50 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2024 Bhutan Mind Break. All rights reserved. | Licensed by Tourism Council of Bhutan
          </p>
        </div>
      </div>
    </footer>
  );
}
