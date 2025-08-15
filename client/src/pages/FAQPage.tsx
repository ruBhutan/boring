import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    CheckCircle,
    ChevronDown,
    Globe,
    HelpCircle,
    Info,
    Phone,
    Plane,
    Shield,
    Star,
    Users
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const visaFAQs = [
    {
      id: "visa-1",
      question: "Do I need a visa to visit Bhutan?",
      answer: "Yes, all visitors to Bhutan (except Indian, Bangladeshi, and Maldivian nationals) require a visa. The visa must be arranged through a licensed Bhutanese tour operator before arrival."
    },
    {
      id: "visa-2",
      question: "How long does visa processing take?",
      answer: "Visa processing typically takes 5-7 working days. During peak season (March-May, September-November), it may take up to 10 working days. We recommend applying at least 2 weeks before travel."
    },
    {
      id: "visa-3",
      question: "What documents do I need for a visa?",
      answer: "You need: a valid passport (6+ months validity), completed visa application form, 2 passport photos, confirmed flight tickets, tour booking confirmation, and travel insurance."
    },
    {
      id: "visa-4",
      question: "Can I extend my visa in Bhutan?",
      answer: "Yes, tourist visas can be extended for up to 90 days total. Extensions cost $40 USD and must be arranged through your tour operator."
    },
    {
      id: "visa-5",
      question: "What if my visa application is rejected?",
      answer: "Visa rejections are extremely rare (less than 0.1%) when proper documents are submitted. If rejected, we provide a full refund and help identify issues for reapplication."
    }
  ];

  const travelFAQs = [
    {
      id: "travel-1",
      question: "What is the Sustainable Development Fee?",
      answer: "The SDF is $200 per person per day and covers 3-star accommodation, all meals, licensed guide, transportation, and entrance fees. This fee supports Bhutan's 'High Value, Low Impact' tourism policy."
    },
    {
      id: "travel-2",
      question: "Can I travel independently in Bhutan?",
      answer: "No, all tourists must book through a licensed Bhutanese tour operator and be accompanied by a licensed guide. This ensures cultural preservation and visitor safety."
    },
    {
      id: "travel-3",
      question: "What's the best time to visit Bhutan?",
      answer: "Spring (March-May) and autumn (September-November) offer the best weather with clear skies and comfortable temperatures. Winter is good for cultural tours, while summer has fewer crowds but monsoon rains."
    },
    {
      id: "travel-4",
      question: "How do I get to Bhutan?",
      answer: "Fly with Druk Air (Royal Bhutan Airlines) from Delhi, Kolkata, Kathmandu, Bangkok, or Singapore to Paro Airport. All flights must be booked through your tour operator."
    },
    {
      id: "travel-5",
      question: "Is Bhutan safe for tourists?",
      answer: "Yes, Bhutan is one of the safest countries in the world with very low crime rates. The biggest risks are altitude-related and weather conditions during trekking."
    }
  ];

  const cultureFAQs = [
    {
      id: "culture-1",
      question: "What should I wear in Bhutan?",
      answer: "Dress modestly, especially when visiting monasteries. Cover shoulders and knees. Bring layers for varying temperatures and comfortable walking shoes. Remove shoes before entering religious buildings."
    },
    {
      id: "culture-2",
      question: "Can I take photos in monasteries?",
      answer: "Photography rules vary by monastery. Always ask permission first. Flash photography is generally prohibited inside temples. Some monasteries charge photography fees."
    },
    {
      id: "culture-3",
      question: "What language is spoken in Bhutan?",
      answer: "Dzongkha is the official language, but English is widely spoken in tourist areas. Your guide will speak excellent English and help with local interactions."
    },
    {
      id: "culture-4",
      question: "What is the local currency?",
      answer: "Bhutanese Ngultrum (BTN) is the local currency. Indian Rupees are also accepted. Credit cards work in major hotels and shops. ATMs are available in Thimphu and Paro."
    },
    {
      id: "culture-5",
      question: "Are there any cultural taboos I should know?",
      answer: "Don't point with a single finger, touch someone's head, or show the soles of your feet. Walk clockwise around stupas. Be respectful during religious ceremonies and ask before photographing people."
    }
  ];

  const healthFAQs = [
    {
      id: "health-1",
      question: "Will I get altitude sickness in Bhutan?",
      answer: "Bhutan's elevation ranges from 200m to 7,000m+. Most tourist areas are at moderate altitude (2,000-3,000m). Ascend gradually, stay hydrated, and rest if you feel symptoms like headaches or nausea."
    },
    {
      id: "health-2",
      question: "What vaccinations do I need?",
      answer: "No specific vaccinations are required for Bhutan. However, ensure routine vaccinations (MMR, DPT, flu) are up to date. Consider Hepatitis A/B and Japanese Encephalitis depending on your travel history."
    },
    {
      id: "health-3",
      question: "Is the food safe to eat?",
      answer: "Yes, food in tourist restaurants is generally safe. Start with milder dishes and gradually try spicier local cuisine. Drink bottled or boiled water. Your tour includes all meals at reputable establishments."
    },
    {
      id: "health-4",
      question: "What medical facilities are available?",
      answer: "Thimphu and Paro have good hospitals and clinics. Remote areas have basic health posts. Serious medical emergencies may require evacuation to India or Thailand - ensure you have comprehensive travel insurance."
    },
    {
      id: "health-5",
      question: "Should I bring medications?",
      answer: "Bring personal medications in original containers with prescriptions. Consider altitude sickness medication, basic first aid supplies, and any specific medications you regularly use."
    }
  ];

  const practicalFAQs = [
    {
      id: "practical-1",
      question: "What's included in my tour package?",
      answer: "The SDF covers 3-star accommodation, all meals, licensed guide, private transportation, entrance fees, and government taxes. International flights, travel insurance, tips, and personal expenses are extra."
    },
    {
      id: "practical-2",
      question: "How much should I budget for extras?",
      answer: "Budget $50-200 per day for souvenirs, tips, drinks, optional activities, and accommodation upgrades. Luxury experiences and helicopter flights cost extra."
    },
    {
      id: "practical-3",
      question: "What's the internet connectivity like?",
      answer: "WiFi is available in most hotels and cafes in main towns. Internet can be slow in remote areas. Consider buying a local SIM card for better connectivity."
    },
    {
      id: "practical-4",
      question: "What electrical outlets are used?",
      answer: "Bhutan uses Type C, D, and G outlets (230V, 50Hz). Bring a universal adapter. Most hotels have charging facilities, but bring a power bank for long days out."
    },
    {
      id: "practical-5",
      question: "Can I use my credit cards?",
      answer: "Major credit cards are accepted in hotels, restaurants, and shops in main towns. Carry cash for small purchases, tips, and remote areas where cards aren't accepted."
    }
  ];

  const renderFAQSection = (faqs: any[], icon: any) => (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <Card key={faq.id} className="border-teal-100">
          <Collapsible open={openItems.includes(faq.id)} onOpenChange={() => toggleItem(faq.id)}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-teal-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <CardTitle className="text-left text-lg font-medium">{faq.question}</CardTitle>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-teal-600 transition-transform ${
                    openItems.includes(faq.id) ? 'rotate-180' : ''
                  }`} />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 bg-gradient-to-br from-teal-50 to-teal-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-teal-600 text-white text-sm px-4 py-2 mb-4">
            <HelpCircle className="w-4 h-4 mr-2" />
            Frequently Asked Questions
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Your <span className="bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">Bhutan Questions</span> Answered
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Find answers to the most common questions about visiting Bhutan. From visa requirements 
            to cultural etiquette, we've got you covered for a smooth and memorable journey.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center border-teal-100">
            <CardContent className="p-6">
              <Globe className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Visa Questions</h3>
              <p className="text-teal-600 font-bold">{visaFAQs.length} Answers</p>
            </CardContent>
          </Card>
          <Card className="text-center border-teal-100">
            <CardContent className="p-6">
              <Plane className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Travel Info</h3>
              <p className="text-teal-600 font-bold">{travelFAQs.length} Answers</p>
            </CardContent>
          </Card>
          <Card className="text-center border-teal-100">
            <CardContent className="p-6">
              <Users className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Culture & Customs</h3>
              <p className="text-teal-600 font-bold">{cultureFAQs.length} Answers</p>
            </CardContent>
          </Card>
          <Card className="text-center border-teal-100">
            <CardContent className="p-6">
              <Shield className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Health & Safety</h3>
              <p className="text-teal-600 font-bold">{healthFAQs.length} Answers</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Tabs */}
        <Tabs defaultValue="visa" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="visa">Visa & Entry</TabsTrigger>
            <TabsTrigger value="travel">Travel Basics</TabsTrigger>
            <TabsTrigger value="culture">Culture</TabsTrigger>
            <TabsTrigger value="health">Health & Safety</TabsTrigger>
            <TabsTrigger value="practical">Practical Info</TabsTrigger>
          </TabsList>

          <TabsContent value="visa" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-teal-600" />
                  Visa & Entry Requirements
                </CardTitle>
                <p className="text-gray-600">
                  Everything you need to know about getting your visa and entering Bhutan.
                </p>
              </CardHeader>
              <CardContent>
                {renderFAQSection(visaFAQs, Globe)}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="travel" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="w-5 h-5 text-teal-600" />
                  Travel Basics
                </CardTitle>
                <p className="text-gray-600">
                  Essential information about traveling to and within Bhutan.
                </p>
              </CardHeader>
              <CardContent>
                {renderFAQSection(travelFAQs, Plane)}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="culture" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-teal-600" />
                  Culture & Customs
                </CardTitle>
                <p className="text-gray-600">
                  Understanding Bhutanese culture and social etiquette.
                </p>
              </CardHeader>
              <CardContent>
                {renderFAQSection(cultureFAQs, Users)}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="health" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-teal-600" />
                  Health & Safety
                </CardTitle>
                <p className="text-gray-600">
                  Important health and safety information for your trip.
                </p>
              </CardHeader>
              <CardContent>
                {renderFAQSection(healthFAQs, Shield)}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="practical" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-teal-600" />
                  Practical Information
                </CardTitle>
                <p className="text-gray-600">
                  Practical tips for money, communication, and daily needs.
                </p>
              </CardHeader>
              <CardContent>
                {renderFAQSection(practicalFAQs, Info)}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Help Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <Card className="border-green-100 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                Still Have Questions?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-4">
                Our travel experts are here to help with any specific questions about your Bhutan journey.
              </p>
              <Link to="/contact">
                <Button className="btn-teal">
                  Contact Our Experts
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-teal-100 bg-teal-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-800">
                <Phone className="w-5 h-5" />
                Need Immediate Help?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-teal-700 mb-4">
                Call us directly for urgent questions or last-minute travel arrangements.
              </p>
              <div className="space-y-2">
                <p className="font-semibold text-emerald-800">+975-2-323251</p>
                <p className="text-sm text-teal-600">Available 9 AM - 6 PM (Bhutan Time)</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-teal-100 bg-teal-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-teal-800">
                <Star className="w-5 h-5" />
                Ready to Book?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-teal-700 mb-4">
                Found the answers you needed? Start planning your dream Bhutan adventure today.
              </p>
              <Link to="/tours">
                <Button className="btn-teal text-white">
                  Explore Tour Packages
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready for Your Bhutan Adventure?</h2>
            <p className="text-xl mb-6 opacity-90">
              With all your questions answered, it's time to start planning your journey to the Last Shangri-La.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/custom-tour">
                <Button className="bg-gradient-to-br from-white to-teal-50 text-teal-600 hover:bg-gray-100 px-8 py-3">
                  <HelpCircle className="w-5 h-5 mr-2" />
                  Plan Custom Trip
                </Button>
              </Link>
              <Link to="/tours">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600 px-8 py-3">
                  Browse All Tours
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}