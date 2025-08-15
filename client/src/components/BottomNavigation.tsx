import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Camera,
  Clock,
  ExternalLink,
  HeadphonesIcon,
  Info,
  Mail,
  MapPin,
  MessageCircle,
  Mountain,
  Phone,
  Plane,
  Shield,
  UserCog,
  Users
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AdminPanel from "./AdminPanel";

export default function BottomNavigation() {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const navigationItems = [
    {
      id: 'emergency',
      icon: Shield,
      label: 'Emergency',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 'management',
      icon: UserCog,
      label: 'Admin',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    },
    {
      id: 'social',
      icon: MessageCircle,
      label: 'Connect',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'quicklinks',
      icon: Info,
      label: 'Quick Links',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    },
    {
      id: 'contact',
      icon: HeadphonesIcon,
      label: 'Contact',
      color: 'text-amber-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const emergencyContacts = [
    { label: "Police", number: "113" },
    { label: "Fire Department", number: "110" },
    { label: "Medical Emergency", number: "112" },
    { label: "Tourist Helpline", number: "+975-2-323251" },
    { label: "Paro Airport", number: "+975-8-271316" }
  ];

  const quickLinks = [
    {
      icon: MapPin,
      title: "Popular Destinations",
      links: [
        { name: "Tiger's Nest Monastery", href: "/destinations/tigers-nest" },
        { name: "Thimphu Capital", href: "/destinations/thimphu" },
        { name: "Punakha Dzong", href: "/destinations/punakha" },
        { name: "Paro Valley", href: "/destinations/paro" }
      ]
    },
    {
      icon: Mountain,
      title: "Tour Categories",
      links: [
        { name: "Cultural Tours(package)", href: "/tours?category=cultural" },
        { name: "Adventure Trekking", href: "/tours?category=adventure" },
        { name: "Spiritual Journeys", href: "/tours?category=spiritual" },
        { name: "Photography Tours(package)", href: "/tours?category=photography" }
      ]
    },
    {
      icon: Camera,
      title: "Travel Information",
      links: [
        { name: "Visa Requirements", href: "/visa-info" },
        { name: "Best Time to Visit", href: "/travel-guide" },
        { name: "Bhutan Culture", href: "/culture" },
        { name: "Travel Tips", href: "/travel-tips" }
      ]
    },
    {
      icon: Users,
      title: "Services",
      links: [
        { name: "Join Us - Guide Registration", href: "/guide-registration" },
        { name: "Custom Tour Request", href: "/custom-tour" },
        { name: "Group Bookings", href: "/group-bookings" },
        { name: "Travel Insurance", href: "/insurance" }
      ]
    }
  ];

  const contactInfo = [
    { icon: Phone, label: "Emergency", value: "+975-2-323251" },
    { icon: Mail, label: "Support", value: "info@bhutanmindbreak.com" },
    { icon: Clock, label: "Office Hours", value: "9 AM - 6 PM BST" },
    { icon: Plane, label: "Airport Code", value: "PBH (Paro)" }
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/bhutantourism",
      color: "bg-teal-600 hover:bg-teal-700"
    },
    {
      name: "Instagram", 
      href: "https://www.instagram.com/bhutan",
      color: "bg-pink-600 hover:bg-pink-700"
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/bhutantourism", 
      color: "bg-red-600 hover:bg-red-700"
    },
    {
      name: "Official Portal",
      href: "https://bhutan.travel",
      color: "bg-green-600 hover:bg-green-700"
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'emergency':
        return (
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800">
                <Shield className="w-5 h-5" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-br from-white to-teal-50 rounded-lg">
                    <span className="font-medium text-gray-900">{contact.label}:</span>
                    <a href={`tel:${contact.number}`} className="text-red-600 font-bold hover:text-red-700">
                      {contact.number}
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'management':
        return (
          <Card className="border-teal-200 bg-teal-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-800">
                <UserCog className="w-5 h-5" />
                Management Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-teal-700 mb-4">
                Login to access your dashboard and manage tours, bookings, and more.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Link to="/login">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">
                    <UserCog className="w-4 h-4 mr-2" />
                    Staff Login
                  </Button>
                </Link>
                <Button 
                  variant="outline"
                  className="w-full border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
                  onClick={() => window.open('/guide-registration', '_blank')}
                >
                  Join Our Team
                </Button>
              </div>
              <div className="mt-4 p-3 bg-white/60 rounded-lg">
                <p className="text-xs text-teal-700">
                  <strong>For Staff:</strong> Access admin panel, manage tours, view bookings
                  <br />
                  <strong>For Guides/Drivers:</strong> View assignments, reviews, and schedule
                </p>
              </div>
            </CardContent>
          </Card>
        );

      case 'social':
        return (
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <MessageCircle className="w-5 h-5" />
                Stay Connected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-700 mb-4">
                Follow us on social media for the latest updates, travel tips, and stunning photos from Bhutan.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 p-3 text-white rounded-lg transition-colors ${social.color}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">{social.name}</span>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'quicklinks':
        return (
          <Card className="border-teal-200 bg-teal-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-teal-800">
                <Info className="w-5 h-5" />
                Quick Links & Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickLinks.map((section, index) => (
                  <div key={index}>
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
                      <section.icon className="w-5 h-5 text-teal-600" />
                      {section.title}
                    </h4>
                    <ul className="space-y-2">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link to={link.href} className="text-gray-600 hover:text-teal-600 transition-colors text-sm flex items-center gap-1 group">
                            {link.name}
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'contact':
        return (
          <Card className="border-amber-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <HeadphonesIcon className="w-5 h-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-br from-white to-teal-50 rounded-lg">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <info.icon className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{info.label}</p>
                      <p className="font-medium text-gray-900">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gradient-to-br from-white to-teal-50 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-2">Office Address</h5>
                <p className="text-gray-700">
                  Chang Lam, Thimphu 11001<br />
                  Kingdom of Bhutan
                </p>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-transparent backdrop-blur-md border-t border-white/20 shadow-lg z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around items-center py-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(activeTab === item.id ? null : item.id)}
                className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                  activeTab === item.id 
                    ? `${item.bgColor} ${item.color}` 
                    : 'text-teal-600 hover:text-teal-700 hover:bg-white/20 font-medium'
                }`}
              >
                <item.icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content Overlay */}
      {activeTab && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30" onClick={() => setActiveTab(null)}>
          <div className="absolute bottom-16 left-0 right-0 max-h-[70vh] overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 pb-4">
              <div onClick={(e) => e.stopPropagation()}>
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Panel Modal */}
      <AdminPanel 
        isOpen={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
      />

      {/* Bottom padding to prevent content from being hidden behind bottom nav */}
      <div className="h-20"></div>
    </>
  );
}