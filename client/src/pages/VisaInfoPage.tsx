import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, Clock, DollarSign, FileText, CheckCircle, 
  AlertTriangle, Plane, Users, Calendar, Shield, Phone, Mail,
  Download, ExternalLink, Info, Star
} from "lucide-react";
import { Link } from "react-router-dom";

export default function VisaInfoPage() {
  const visaRequirements = [
    {
      title: "Valid Passport",
      description: "Passport must be valid for at least 6 months from date of entry",
      icon: FileText,
      required: true
    },
    {
      title: "Visa Application Form",
      description: "Completed and signed visa application form",
      icon: FileText,
      required: true
    },
    {
      title: "Passport Photos",
      description: "2 recent passport-size photographs (white background)",
      icon: Users,
      required: true
    },
    {
      title: "Flight Itinerary",
      description: "Confirmed round-trip flight tickets",
      icon: Plane,
      required: true
    },
    {
      title: "Tour Confirmation",
      description: "Confirmed booking with licensed Bhutanese tour operator",
      icon: CheckCircle,
      required: true
    },
    {
      title: "Travel Insurance",
      description: "Comprehensive travel insurance covering medical expenses",
      icon: Shield,
      required: true
    }
  ];

  const visaTypes = [
    {
      type: "Tourist Visa",
      duration: "Up to 90 days",
      fee: "$40 USD",
      processing: "5-7 working days",
      description: "For leisure travel and sightseeing",
      features: ["Single/Multiple entry", "Extendable", "Most common visa type"]
    },
    {
      type: "Cultural Visa",
      duration: "Up to 90 days",
      fee: "$40 USD",
      processing: "5-7 working days",
      description: "For cultural exchange and educational purposes",
      features: ["Cultural programs", "Educational visits", "Research purposes"]
    },
    {
      type: "Business Visa",
      duration: "Up to 90 days",
      fee: "$40 USD",
      processing: "7-10 working days",
      description: "For business meetings and conferences",
      features: ["Business meetings", "Conferences", "Trade purposes"]
    }
  ];

  const exemptCountries = [
    { country: "India", note: "Entry permit required" },
    { country: "Bangladesh", note: "Entry permit required" },
    { country: "Maldives", note: "Visa on arrival" }
  ];

  const processingSteps = [
    {
      step: 1,
      title: "Choose Tour Operator",
      description: "Select a licensed Bhutanese tour operator (like Bhutan Mind Break)",
      icon: Users
    },
    {
      step: 2,
      title: "Submit Documents",
      description: "Provide all required documents to your tour operator",
      icon: FileText
    },
    {
      step: 3,
      title: "Application Processing",
      description: "Tour operator submits visa application to immigration",
      icon: Clock
    },
    {
      step: 4,
      title: "Visa Approval",
      description: "Receive visa clearance letter via email",
      icon: CheckCircle
    },
    {
      step: 5,
      title: "Visa Stamping",
      description: "Get visa stamped at Paro Airport upon arrival",
      icon: FileText
    }
  ];

  const sustainableFees = [
    {
      category: "High Season",
      period: "March-May, September-November",
      fee: "$200 per person per day",
      includes: ["3-star accommodation", "All meals", "Licensed guide", "Transportation", "Entrance fees"]
    },
    {
      category: "Low Season",
      period: "December-February, June-August",
      fee: "$200 per person per day",
      includes: ["3-star accommodation", "All meals", "Licensed guide", "Transportation", "Entrance fees"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 bg-gradient-to-br from-teal-50 to-teal-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-teal-600 text-white text-sm px-4 py-2 mb-4">
            <Globe className="w-4 h-4 mr-2" />
            Visa & Entry Information
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Your Gateway to <span className="bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">Bhutan</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Complete guide to Bhutan visa requirements, application process, and entry procedures. 
            We handle all visa formalities to ensure your smooth entry into the Last Shangri-La.
          </p>
        </div>

        {/* Quick Facts */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center border-teal-100">
            <CardContent className="p-6">
              <Clock className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Processing Time</h3>
              <p className="text-teal-600 font-bold">5-7 Days</p>
            </CardContent>
          </Card>
          <Card className="text-center border-teal-100">
            <CardContent className="p-6">
              <DollarSign className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Visa Fee</h3>
              <p className="text-teal-600 font-bold">$40 USD</p>
            </CardContent>
          </Card>
          <Card className="text-center border-teal-100">
            <CardContent className="p-6">
              <Calendar className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Validity</h3>
              <p className="text-teal-600 font-bold">Up to 90 Days</p>
            </CardContent>
          </Card>
          <Card className="text-center border-teal-100">
            <CardContent className="p-6">
              <Shield className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Success Rate</h3>
              <p className="text-teal-600 font-bold">99.9%</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="requirements" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="process">Process</TabsTrigger>
            <TabsTrigger value="types">Visa Types</TabsTrigger>
            <TabsTrigger value="fees">Fees & Tariff</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          {/* Requirements Tab */}
          <TabsContent value="requirements" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-600" />
                  Visa Requirements
                </CardTitle>
                <p className="text-gray-600">
                  All visitors to Bhutan (except Indian, Bangladeshi, and Maldivian nationals) require a visa.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {visaRequirements.map((req, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-teal-50 rounded-lg">
                      <div className="bg-teal-100 p-2 rounded-full">
                        <req.icon className="w-5 h-5 text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{req.title}</h4>
                          {req.required && (
                            <Badge variant="destructive" className="text-xs">Required</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{req.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-800 mb-2">Important Notes</h4>
                      <ul className="text-sm text-amber-700 space-y-1">
                        <li>• All tourists must book through a licensed Bhutanese tour operator</li>
                        <li>• Visa applications cannot be submitted directly by individuals</li>
                        <li>• Passport must have at least 6 months validity from entry date</li>
                        <li>• Two blank pages required in passport for visa stamping</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Exempt Countries */}
            <Card>
              <CardHeader>
                <CardTitle>Visa Exempt Countries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {exemptCountries.map((country, index) => (
                    <div key={index} className="p-4 border border-teal-100 rounded-lg">
                      <h4 className="font-semibold text-gray-900">{country.country}</h4>
                      <p className="text-sm text-gray-600">{country.note}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Process Tab */}
          <TabsContent value="process" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-teal-600" />
                  Visa Application Process
                </CardTitle>
                <p className="text-gray-600">
                  Simple 5-step process handled entirely by your tour operator.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {processingSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <step.icon className="w-5 h-5 text-teal-600" />
                          <h4 className="font-semibold text-gray-900">{step.title}</h4>
                        </div>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">We Handle Everything</h4>
                      <p className="text-sm text-green-700">
                        As your licensed tour operator, Bhutan Mind Break handles all visa formalities. 
                        Simply provide the required documents and we'll take care of the rest!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Visa Types Tab */}
          <TabsContent value="types" className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              {visaTypes.map((visa, index) => (
                <Card key={index} className="border-teal-100">
                  <CardHeader>
                    <CardTitle className="text-lg">{visa.type}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-teal-600">{visa.fee}</Badge>
                      <Badge variant="outline">{visa.duration}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{visa.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-teal-600" />
                        <span>Processing: {visa.processing}</span>
                      </div>
                      <div className="mt-4">
                        <h5 className="font-semibold text-gray-900 mb-2">Features:</h5>
                        <ul className="space-y-1">
                          {visa.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Fees Tab */}
          <TabsContent value="fees" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-teal-600" />
                  Sustainable Development Fee (SDF)
                </CardTitle>
                <p className="text-gray-600">
                  Bhutan's unique "High Value, Low Impact" tourism policy includes a daily sustainable development fee.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {sustainableFees.map((fee, index) => (
                    <Card key={index} className="border-teal-100">
                      <CardHeader>
                        <CardTitle className="text-lg">{fee.category}</CardTitle>
                        <Badge variant="outline">{fee.period}</Badge>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-teal-600 mb-4">{fee.fee}</div>
                        <h5 className="font-semibold text-gray-900 mb-2">Includes:</h5>
                        <ul className="space-y-1">
                          {fee.includes.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-teal-50 border border-teal-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-teal-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-emerald-800 mb-2">Additional Fees</h4>
                      <ul className="text-sm text-teal-700 space-y-1">
                        <li>• Visa Fee: $40 USD (paid separately)</li>
                        <li>• Airport Tax: Included in air ticket</li>
                        <li>• Monument Fees: Included in SDF</li>
                        <li>• Guide & Driver Tips: Optional but appreciated</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How long does visa processing take?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Visa processing typically takes 5-7 working days. During peak season (March-May, September-November), 
                    it may take up to 10 working days. We recommend applying at least 2 weeks before your travel date.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I extend my visa in Bhutan?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes, tourist visas can be extended for up to 90 days total. Extensions must be arranged through 
                    your tour operator and cost $40 USD per extension period.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What if my visa application is rejected?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Visa rejections are extremely rare (less than 0.1%) when all documents are properly submitted. 
                    If rejected, we provide full refund of visa fees and help identify the issue for reapplication.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do I need travel insurance?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes, comprehensive travel insurance covering medical expenses and emergency evacuation is mandatory. 
                    We can recommend suitable insurance providers if needed.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Visit Bhutan?</h2>
            <p className="text-xl mb-6 opacity-90">
              Let us handle all your visa formalities while you plan your dream journey.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-gradient-to-br from-white to-teal-50 text-teal-600 hover:bg-gray-100 px-8 py-3">
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Us
                </Button>
              </Link>
              <Link to="/tours">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600 px-8 py-3">
                  View Tours
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}