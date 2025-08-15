import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import FormLauncher, { 
  SmartFormLauncher, 
  AllFormsLauncher, 
  ContactFormLauncher, 
  BookingFormLauncher,
  FloatingContactButton 
} from "@/components/FormLauncher";
import { CONTACT_INFO } from "@/lib/constants";
import { 
  Award, Clock, Globe, Mail, MapPin, MessageCircle, Phone, 
  Facebook, Instagram, Twitter, Youtube, Sparkles, Zap, 
  MessageSquare, Calendar, Users, Star, ArrowRight, CheckCircle
} from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"inquiry" | "booking">("inquiry");

  return (
    <div className="pt-20 pb-20 bg-brand-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="bg-brand-gradient-primary rounded-3xl p-12 text-white mb-8">
            <div className="flex items-center justify-center mb-4">
              <MessageSquare className="w-12 h-12 mr-3" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Let's Start the Conversation
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
              Whether you have questions, want to book a tour, or need a custom itinerary, 
              we're here to help make your Bhutan journey unforgettable.
            </p>
          </div>

          {/* Primary Form Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="brand-card hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-brand-gradient-primary rounded-full flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Quick Inquiry</CardTitle>
                    <CardDescription>Ask questions, get information, or share feedback</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-brand-text-muted">
                    <CheckCircle className="w-4 h-4 text-brand-primary" />
                    <span>Personal assistance within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-brand-text-muted">
                    <CheckCircle className="w-4 h-4 text-brand-primary" />
                    <span>Expert travel advice included</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-brand-text-muted">
                    <CheckCircle className="w-4 h-4 text-brand-primary" />
                    <span>No obligation, completely free</span>
                  </div>
                  <ContactFormLauncher variant="inline" size="lg" className="w-full brand-btn-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="brand-card hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-brand-gradient-secondary rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Plan Your Journey</CardTitle>
                    <CardDescription>Ready to book? Let's design your perfect trip</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-brand-text-muted">
                    <CheckCircle className="w-4 h-4 text-brand-primary" />
                    <span>Personalized itinerary planning</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-brand-text-muted">
                    <CheckCircle className="w-4 h-4 text-brand-primary" />
                    <span>All permits and visas handled</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-brand-text-muted">
                    <CheckCircle className="w-4 h-4 text-brand-primary" />
                    <span>Local guides and drivers included</span>
                  </div>
                  <BookingFormLauncher variant="inline" size="lg" className="w-full brand-btn-secondary" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Interactive Form Options */}
          <div className="space-y-8">
            <Card className="brand-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-brand-primary" />
                  <CardTitle className="text-2xl">Choose Your Perfect Form</CardTitle>
                </div>
                <CardDescription>
                  We have specialized forms for different types of requests. Pick the one that best fits your needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SmartFormLauncher page="contact" />
              </CardContent>
            </Card>

            <Card className="brand-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-brand-secondary" />
                  <span>Why Our Forms Are Better</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-emerald-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-brand-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Smart Sections</div>
                      <div className="text-sm text-brand-text-muted">Collapsible sections help you focus on what matters</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-gold-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-brand-secondary" />
                    </div>
                    <div>
                      <div className="font-medium">Progress Tracking</div>
                      <div className="text-sm text-brand-text-muted">See your completion progress in real-time</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-burgundy-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-brand-accent" />
                    </div>
                    <div>
                      <div className="font-medium">Smart Validation</div>
                      <div className="text-sm text-brand-text-muted">Helpful hints and instant error checking</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Main Contact Info */}
            <div className="brand-card p-8">
              <h3 className="text-2xl font-bold brand-heading mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-brand-light p-3 rounded-full mr-4 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold brand-text mb-1">Visit Our Office</h4>
                    <p className="brand-body">
                      {CONTACT_INFO.address.street}<br />
                      {CONTACT_INFO.address.city}<br />
                      {CONTACT_INFO.address.country}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-brand-light p-3 rounded-full mr-4 flex-shrink-0">
                    <Phone className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold brand-text mb-1">Call Us</h4>
                    <div className="brand-body">
                      {CONTACT_INFO.phones.map((phone, index) => (
                        <div key={index}>
                          <a href={`tel:${phone}`} className="hover:text-brand-primary transition-colors">
                            {phone}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-brand-light p-3 rounded-full mr-4 flex-shrink-0">
                    <Mail className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold brand-text mb-1">Email Us</h4>
                    <div className="brand-body">
                      {CONTACT_INFO.emails.map((email, index) => (
                        <div key={index}>
                          <a href={`mailto:${email}`} className="hover:text-brand-primary transition-colors">
                            {email}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-brand-light p-3 rounded-full mr-4 flex-shrink-0">
                    <Globe className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold brand-text mb-1">Follow Us</h4>
                    <div className="flex space-x-3 mt-2">
                      <a href={CONTACT_INFO.social.facebook} className="text-gray-400 hover:text-brand-primary transition-colors">
                        <Facebook className="w-5 h-5" />
                      </a>
                      <a href={CONTACT_INFO.social.instagram} className="text-gray-400 hover:text-pink-600 transition-colors">
                        <Instagram className="w-5 h-5" />
                      </a>
                      <a href={CONTACT_INFO.social.twitter} className="text-gray-400 hover:text-brand-primary transition-colors">
                        <Twitter className="w-5 h-5" />
                      </a>
                      <a href={CONTACT_INFO.social.youtube} className="text-gray-400 hover:text-red-600 transition-colors">
                        <Youtube className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="brand-card p-8">
              <div className="flex items-center mb-6">
                <Clock className="w-6 h-6 text-brand-primary mr-3" />
                <h3 className="text-xl font-bold brand-heading">Business Hours</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="brand-body">Monday - Friday</span>
                  <span className="font-medium brand-text">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="brand-body">Saturday</span>
                  <span className="font-medium brand-text">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="brand-body">Sunday</span>
                  <span className="font-medium brand-text">Closed</span>
                </div>
                <div className="mt-4 pt-4 border-t border-brand-primary/20">
                  <p className="text-sm brand-body">
                    <strong>Emergency Contact:</strong> Available 24/7 for travelers currently in Bhutan
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-brand-gradient-primary rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Award className="w-6 h-6 mr-3" />
                Why Choose Us?
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">24/7</div>
                  <div className="text-sm opacity-90">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">100%</div>
                  <div className="text-sm opacity-90">Local Team</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">7+</div>
                  <div className="text-sm opacity-90">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">500+</div>
                  <div className="text-sm opacity-90">Happy Travelers</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-20 bg-white rounded-3xl p-8 lg:p-12 shadow-xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <MessageCircle className="w-8 h-8 text-brand-primary mr-3" />
              <h2 className="text-3xl font-bold brand-heading">Frequently Asked Questions</h2>
            </div>
            <p className="text-lg brand-body max-w-2xl mx-auto">
              Get quick answers to common questions about traveling to Bhutan.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold brand-text mb-2">Do I need a visa to visit Bhutan?</h4>
                <p className="brand-body text-sm">
                  Yes, all visitors except Indian, Bangladeshi, and Maldivian nationals need a visa. 
                  We handle all visa arrangements as part of our service.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold brand-text mb-2">What is the Sustainable Development Fee?</h4>
                <p className="brand-body text-sm">
                  Bhutan charges a Sustainable Development Fee of $100 per person per night. 
                  This supports conservation and sustainable tourism initiatives.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold brand-text mb-2">When is the best time to visit?</h4>
                <p className="brand-body text-sm">
                  Spring (March-May) and autumn (September-November) offer the best weather. 
                  We can help you choose the perfect time based on your interests.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold brand-text mb-2">How far in advance should I book?</h4>
                <p className="brand-body text-sm">
                  We recommend booking 2-3 months in advance, especially for peak seasons. 
                  However, we can often arrange trips with shorter notice.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold brand-text mb-2">What's included in your tour packages?</h4>
                <p className="brand-body text-sm">
                  All tours include accommodation, meals, transportation, guides, permits, 
                  and entrance fees. International flights are typically separate.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold brand-text mb-2">Can you arrange custom itineraries?</h4>
                <p className="brand-body text-sm">
                  Absolutely! We specialize in creating personalized experiences based on 
                  your interests, timeline, and budget. Every traveler is unique.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="brand-body mb-4">Still have questions?</p>
            <Button className="brand-btn-primary">
              Contact Our Experts
            </Button>
          </div>
        </section>

        {/* Enhanced Forms Section */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-brand-primary mr-3" />
              <h2 className="text-3xl font-bold brand-heading">More Ways to Connect</h2>
            </div>
            <p className="text-lg brand-body max-w-2xl mx-auto">
              Choose the perfect form for your needs. Our enhanced interactive forms make it easy to get exactly what you need.
            </p>
          </div>

          {/* Smart Form Launchers */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl mb-12">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-3">
                <Zap className="w-6 h-6 text-brand-primary mr-2" />
                <h3 className="text-2xl font-bold brand-heading">Smart Form Options</h3>
              </div>
              <p className="brand-body">Context-aware forms that adapt to your specific needs</p>
            </div>
            
            <div className="mb-8">
              <SmartFormLauncher page="contact" />
            </div>
          </div>

          {/* All Forms Grid */}
          <div className="bg-brand-light rounded-3xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold brand-heading mb-3">All Available Forms</h3>
              <p className="brand-body max-w-2xl mx-auto">
                Explore all our specialized forms designed for different types of inquiries and requests
              </p>
            </div>
            
            <AllFormsLauncher variant="grid" />
          </div>
        </section>

        {/* Emergency Contact Banner */}
        <section className="mt-16">
          <div className="bg-brand-accent/10 border border-brand-accent/20 rounded-2xl p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-brand-accent mb-2">
                Emergency Support for Current Travelers
              </h3>
              <p className="text-brand-accent/80 mb-4">
                If you're currently in Bhutan and need immediate assistance, call our 24/7 emergency line:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="tel:+97517112436" className="brand-btn brand-btn-secondary">
                  Emergency: +975 17 112 436
                </a>
                <span className="text-brand-accent/80 text-sm">Available 24/7</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Floating Contact Button - Always accessible */}
        <FloatingContactButton />
      </div>
    </div>
  );
}