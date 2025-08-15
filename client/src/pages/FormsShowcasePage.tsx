import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FormLauncher, { 
  ContactFormLauncher, 
  BookingFormLauncher, 
  CustomTourFormLauncher,
  QuoteFormLauncher,
  AllFormsLauncher,
  FloatingContactButton,
  SmartFormLauncher 
} from "@/components/FormLauncher";
import {
  Sparkles, Zap, Star, Heart, MessageSquare, Calendar, 
  DollarSign, UserPlus, Home, ArrowRight, CheckCircle,
  Layout, Mouse, Grid3X3, Layers, Code, Palette
} from "lucide-react";

export default function FormsShowcasePage() {
  const [currentSection, setCurrentSection] = useState("overview");

  const sections = [
    { id: "overview", label: "Overview", icon: Layout },
    { id: "inline", label: "Inline Forms", icon: Mouse },
    { id: "grid", label: "Grid Layout", icon: Grid3X3 },
    { id: "floating", label: "Floating Buttons", icon: Layers },
    { id: "smart", label: "Smart Launchers", icon: Zap },
    { id: "customization", label: "Customization", icon: Palette }
  ];

  const formFeatures = [
    {
      title: "Interactive Sections",
      description: "Collapsible form sections with progress tracking",
      icon: Layers
    },
    {
      title: "Real-time Validation", 
      description: "Form validation with helpful error messages",
      icon: CheckCircle
    },
    {
      title: "Brand Consistency",
      description: "Consistent styling across all form types",
      icon: Palette
    },
    {
      title: "Mobile Responsive",
      description: "Optimized for all screen sizes and devices",
      icon: Layout
    },
    {
      title: "Multiple Layouts",
      description: "Inline, floating, and grid layout options",
      icon: Grid3X3
    },
    {
      title: "Context Aware",
      description: "Smart form selection based on page context",
      icon: Zap
    }
  ];

  const formTypes = [
    {
      type: "contact",
      name: "Contact Form",
      description: "General inquiries and questions",
      gradient: "from-emerald-500 to-teal-600",
      icon: MessageSquare,
      features: ["Personal info", "Message", "Additional details"]
    },
    {
      type: "booking",
      name: "Booking Form", 
      description: "Tour and activity reservations",
      gradient: "from-blue-500 to-indigo-600",
      icon: Calendar,
      features: ["Trip details", "Preferences", "Special requests"]
    },
    {
      type: "custom-tour",
      name: "Custom Tour Form",
      description: "Personalized itinerary requests",
      gradient: "from-purple-500 to-pink-600", 
      icon: Sparkles,
      features: ["Interests", "Destinations", "Accommodation"]
    },
    {
      type: "quote",
      name: "Quote Request",
      description: "Pricing and detailed proposals",
      gradient: "from-green-500 to-emerald-600",
      icon: DollarSign,
      features: ["Budget range", "Requirements", "Timeline"]
    },
    {
      type: "guide-registration",
      name: "Guide Registration",
      description: "Professional guide/driver signup",
      gradient: "from-orange-500 to-red-600",
      icon: UserPlus,
      features: ["Professional info", "Specializations", "Documents"]
    },
    {
      type: "hotel-booking",
      name: "Hotel Booking",
      description: "Accommodation reservations",
      gradient: "from-amber-500 to-orange-600",
      icon: Home,
      features: ["Dates", "Room preferences", "Guest details"]
    }
  ];

  const renderSection = () => {
    switch (currentSection) {
      case "overview":
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center bg-gradient-to-r from-emerald-50 to-indigo-50 rounded-3xl p-12">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold brand-heading mb-4">
                Enhanced Interactive Forms
              </h1>
              <p className="text-xl brand-body max-w-3xl mx-auto leading-relaxed">
                Modern, user-friendly forms with collapsible sections, smart validation, 
                and beautiful animations. All forms are responsive and maintain brand consistency.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formFeatures.map((feature, index) => (
                <Card key={index} className="brand-card hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-brand-light rounded-full flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-brand-primary" />
                      </div>
                      <h3 className="font-bold brand-heading">{feature.title}</h3>
                    </div>
                    <p className="brand-body text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Form Types Overview */}
            <div>
              <h2 className="text-2xl font-bold brand-heading mb-6 text-center">Available Form Types</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {formTypes.map((form, index) => (
                  <Card key={index} className="brand-card overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className={`h-2 bg-gradient-to-r ${form.gradient}`} />
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${form.gradient} flex items-center justify-center`}>
                          <form.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{form.name}</CardTitle>
                          <CardDescription>{form.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700 mb-2">Key Features:</p>
                        {form.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case "inline":
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold brand-heading mb-4">Inline Form Triggers</h2>
              <p className="text-lg brand-body max-w-2xl mx-auto">
                Traditional button triggers that can be placed anywhere in your content
              </p>
            </div>

            {/* Single Form Launchers */}
            <Card className="brand-card">
              <CardHeader>
                <CardTitle>Individual Form Launchers</CardTitle>
                <CardDescription>Each form type can be launched individually</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <ContactFormLauncher variant="inline" size="md" />
                    <span className="text-sm text-gray-600">→ Opens contact/inquiry form</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <BookingFormLauncher variant="inline" size="md" />
                    <span className="text-sm text-gray-600">→ Opens tour booking form</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <CustomTourFormLauncher variant="inline" size="md" />
                    <span className="text-sm text-gray-600">→ Opens custom tour design form</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <QuoteFormLauncher variant="inline" size="md" />
                    <span className="text-sm text-gray-600">→ Opens quote request form</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Multiple Forms */}
            <Card className="brand-card">
              <CardHeader>
                <CardTitle>Multiple Form Options</CardTitle>
                <CardDescription>Show multiple form options at once</CardDescription>
              </CardHeader>
              <CardContent>
                <FormLauncher 
                  triggers={["contact", "booking", "custom-tour"]}
                  variant="inline"
                  size="md"
                />
              </CardContent>
            </Card>

            {/* Different Sizes */}
            <Card className="brand-card">
              <CardHeader>
                <CardTitle>Different Sizes</CardTitle>
                <CardDescription>Available in small, medium, and large sizes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <FormLauncher triggers={["contact"]} variant="inline" size="sm" />
                  <Badge variant="outline">Small</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <FormLauncher triggers={["contact"]} variant="inline" size="md" />
                  <Badge variant="outline">Medium</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <FormLauncher triggers={["contact"]} variant="inline" size="lg" />
                  <Badge variant="outline">Large</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "grid":
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold brand-heading mb-4">Grid Layout</h2>
              <p className="text-lg brand-body max-w-2xl mx-auto">
                Beautiful card-based layout perfect for showcasing multiple form options
              </p>
            </div>

            <Card className="brand-card">
              <CardHeader>
                <CardTitle>All Forms Grid</CardTitle>
                <CardDescription>All available forms displayed in a responsive grid</CardDescription>
              </CardHeader>
              <CardContent>
                <AllFormsLauncher variant="grid" />
              </CardContent>
            </Card>

            <Card className="brand-card">
              <CardHeader>
                <CardTitle>Selective Grid</CardTitle>
                <CardDescription>Show only specific forms in grid format</CardDescription>
              </CardHeader>
              <CardContent>
                <FormLauncher 
                  triggers={["contact", "booking", "custom-tour"]}
                  variant="grid"
                />
              </CardContent>
            </Card>
          </div>
        );

      case "floating":
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold brand-heading mb-4">Floating Buttons</h2>
              <p className="text-lg brand-body max-w-2xl mx-auto">
                Persistent floating action buttons that stay accessible as users scroll
              </p>
            </div>

            <Card className="brand-card">
              <CardHeader>
                <CardTitle>Floating Contact Button</CardTitle>
                <CardDescription>
                  A floating contact button is already active on this page. Look for it in the bottom-right corner!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-amber-600" />
                    <span className="font-semibold text-amber-800">Try it out!</span>
                  </div>
                  <p className="text-amber-700 text-sm">
                    Scroll around the page and notice how the floating contact button stays in position. 
                    Hover over it to see the tooltip, then click to open the form.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="brand-card">
              <CardHeader>
                <CardTitle>Multiple Floating Buttons</CardTitle>
                <CardDescription>
                  You can have multiple floating buttons positioned at different corners
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button 
                    onClick={() => {
                      // This would add additional floating buttons
                      alert("In a real implementation, this would show floating buttons at different positions");
                    }}
                    variant="outline"
                  >
                    <Layers className="w-4 h-4 mr-2" />
                    Demo Multiple Floating Buttons
                  </Button>
                  <p className="text-sm text-gray-600">
                    Note: Only one floating button is shown in this demo to avoid cluttering the interface.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "smart":
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold brand-heading mb-4">Smart Launchers</h2>
              <p className="text-lg brand-body max-w-2xl mx-auto">
                Context-aware form launchers that show relevant forms based on the current page
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="brand-card">
                <CardHeader>
                  <CardTitle>Tours Page Context</CardTitle>
                  <CardDescription>Shows booking, custom tour, and quote options</CardDescription>
                </CardHeader>
                <CardContent>
                  <SmartFormLauncher page="tours" />
                </CardContent>
              </Card>

              <Card className="brand-card">
                <CardHeader>
                  <CardTitle>Hotels Page Context</CardTitle>
                  <CardDescription>Shows hotel booking and contact options</CardDescription>
                </CardHeader>
                <CardContent>
                  <SmartFormLauncher page="hotels" />
                </CardContent>
              </Card>

              <Card className="brand-card">
                <CardHeader>
                  <CardTitle>Contact Page Context</CardTitle>
                  <CardDescription>Shows contact and quote request options</CardDescription>
                </CardHeader>
                <CardContent>
                  <SmartFormLauncher page="contact" />
                </CardContent>
              </Card>

              <Card className="brand-card">
                <CardHeader>
                  <CardTitle>Default Context</CardTitle>
                  <CardDescription>Shows general options for other pages</CardDescription>
                </CardHeader>
                <CardContent>
                  <SmartFormLauncher page="default" />
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "customization":
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold brand-heading mb-4">Customization Options</h2>
              <p className="text-lg brand-body max-w-2xl mx-auto">
                Extensive customization options for different use cases and designs
              </p>
            </div>

            {/* Code Examples */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="brand-card">
                <CardHeader>
                  <CardTitle>Usage Examples</CardTitle>
                  <CardDescription>Common implementation patterns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Basic Contact Form:</h4>
                    <code className="text-sm text-gray-700">
                      {`<ContactFormLauncher variant="inline" size="md" />`}
                    </code>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Multiple Forms Grid:</h4>
                    <code className="text-sm text-gray-700">
                      {`<FormLauncher 
  triggers={["contact", "booking", "quote"]}
  variant="grid" 
/>`}
                    </code>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Floating Button:</h4>
                    <code className="text-sm text-gray-700">
                      {`<FloatingContactButton />`}
                    </code>
                  </div>
                </CardContent>
              </Card>

              <Card className="brand-card">
                <CardHeader>
                  <CardTitle>Advanced Features</CardTitle>
                  <CardDescription>Advanced customization options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">✨ Auto-trigger Forms</h4>
                    <p className="text-sm text-gray-600">Automatically open forms based on user actions or page load</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">🎯 Context Data</h4>
                    <p className="text-sm text-gray-600">Pre-populate forms with contextual information</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">📱 Responsive Design</h4>
                    <p className="text-sm text-gray-600">Optimized layouts for mobile and desktop</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">🎨 Brand Consistency</h4>
                    <p className="text-sm text-gray-600">Maintains your brand colors and styling</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">⚡ Performance</h4>
                    <p className="text-sm text-gray-600">Lazy-loaded modals and optimized rendering</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-brand-light-gradient pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Navigation */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={currentSection === section.id ? "default" : "outline"}
                onClick={() => setCurrentSection(section.id)}
                className={`${
                  currentSection === section.id 
                    ? 'btn-brand-primary' 
                    : 'btn-brand-outline hover:scale-105'
                } transition-all duration-200`}
              >
                <section.icon className="w-4 h-4 mr-2" />
                {section.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Content */}
        {renderSection()}

        {/* Floating Contact Button - Active on this page */}
        <FloatingContactButton />

      </div>
    </div>
  );
}
