import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Shield, Users, Clock, Award, CheckCircle, Phone, Globe, MapPin, Heart, Quote } from "lucide-react";
import EnhancedInteractiveForm from "@/components/EnhancedInteractiveForm";

export function WhyChooseUsSection() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);
  const advantages = [
    {
      icon: Heart,
      title: "High-Value, Low-Impact Tourism",
      description: "Experience authentic Bhutan through sustainable tourism practices rooted in Gross National Happiness philosophy. We curate immersive journeys that connect you with local communities.",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: Users,
      title: "Experienced Team of Professionals",
      description: "Over 70% of Bhutan is covered in pristine forests. Our committed team includes certified guides, safe transportation, and cultural experts ensuring authentic experiences.",
      color: "bg-teal-100 text-teal-600"
    },
    {
      icon: Shield,
      title: "Guarantee of Service Quality", 
      description: "We guarantee top-notch service without compromising quality. Certified by Tourism Council of Bhutan with transparent pricing and no hidden charges.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Star,
      title: "Hand-picked Premium Properties",
      description: "Carefully selected certified accommodations for convenience, comfort, and exceptional service. From luxury resorts to authentic homestays.",
      color: "bg-teal-100 text-teal-600"
    },
    {
      icon: MapPin,
      title: "Professional Guide & Transportation",
      description: "Best guides and safe, comfortable transportation throughout your journey. Our team ensures you experience the real Bhutan with complete safety.",
      color: "bg-orange-100 text-amber-600"
    },
    {
      icon: Globe,
      title: "Tailored Itinerary Development",
      description: "Organized and customized itineraries until satisfaction. We cover numerous desirable destinations with authentic cultural immersion programs.",
      color: "bg-teal-100 text-teal-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="gradient-text">Bhutan Mind Break</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our executives are friendlier, easier to approach, and better communicators 
            who put you at ease so you can convey your vacation requirements to us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow group">
              <CardContent className="p-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${advantage.color}`}>
                  <advantage.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
                <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-teal-600 to-green-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Experience the Best of Bhutan?
            </h3>
            <p className="text-xl opacity-90 mb-6">
              Join over 21,000 happy travelers from 120+ countries who trusted us with their Bhutan journey
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => setIsContactFormOpen(true)}
                className="bg-white text-teal-700 hover:bg-teal-50 hover:text-teal-800 font-semibold px-8 py-3 shadow-lg border-2 border-white transform hover:scale-105 transition-all duration-200"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now
              </Button>
              <Button 
                size="lg" 
                onClick={() => setIsQuoteFormOpen(true)}
                className="border-2 border-white text-white hover:bg-white hover:text-teal-700 font-semibold px-8 py-3 shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Quote className="w-5 h-5 mr-2" />
                Get Free Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Form */}
      {isContactFormOpen && (
        <EnhancedInteractiveForm
          formType="contact"
          isOpen={isContactFormOpen}
          onClose={() => setIsContactFormOpen(false)}
          initialData={{}}
          onSubmitSuccess={(data) => {
            console.log("Contact request submitted:", data);
            setIsContactFormOpen(false);
          }}
        />
      )}
      
      {/* Quote Form */}
      {isQuoteFormOpen && (
        <EnhancedInteractiveForm
          formType="get-quote"
          isOpen={isQuoteFormOpen}
          onClose={() => setIsQuoteFormOpen(false)}
          initialData={{}}
          onSubmitSuccess={(data) => {
            console.log("Quote request submitted:", data);
            setIsQuoteFormOpen(false);
          }}
        />
      )}
    </section>
  );
}

export function BookingProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Tell Us Your Dreams",
      description: "Share your travel preferences, group size, dates, and special interests with our expert consultants."
    },
    {
      number: "02", 
      title: "Custom Itinerary Design",
      description: "We craft a personalized itinerary based on your needs, including accommodations, activities, and guide assignments."
    },
    {
      number: "03",
      title: "Confirm & Secure",
      description: "Review your detailed itinerary, make any adjustments, and secure your booking with flexible payment options."
    },
    {
      number: "04",
      title: "Experience Bhutan",
      description: "Arrive to warm hospitality and expert guidance as you embark on your transformative Bhutan journey."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple <span className="gradient-text">Booking Process</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From dream to reality in just four easy steps. Our streamlined process 
            ensures your Bhutan adventure is perfectly planned and stress-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-16 w-full h-0.5 bg-gradient-to-r from-teal-600 to-green-600 opacity-30"></div>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Badge className="bg-green-600 text-white text-lg px-4 py-2">
            <CheckCircle className="w-4 h-4 mr-2" />
            Free Consultation & Quote
          </Badge>
        </div>
      </div>
    </section>
  );
}