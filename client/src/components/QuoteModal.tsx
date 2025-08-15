import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Users, DollarSign, Send, X, ChevronDown, ChevronRight, User, MapPin, Heart, Info } from "lucide-react";
import type { Tour } from "@shared/schema";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour?: Tour;
}

interface QuoteRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  tourId?: number;
  tourName?: string;
  preferredDates: string;
  groupSize: number;
  budgetRange: string;
  accommodationType: string;
  specialRequests: string;
  hearAboutUs: string;
}

export default function QuoteModal({ isOpen, onClose, tour }: QuoteModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['personal', 'trip']));
  const [quoteData, setQuoteData] = useState<QuoteRequest>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    tourId: tour?.id,
    tourName: tour?.name || "",
    preferredDates: "",
    groupSize: 2,
    budgetRange: "",
    accommodationType: "",
    specialRequests: "",
    hearAboutUs: ""
  });

  const budgetRanges = [
    { value: "budget", label: "$2,000 - $3,500 per person" },
    { value: "mid-range", label: "$3,500 - $5,000 per person" },
    { value: "luxury", label: "$5,000 - $8,000 per person" },
    { value: "ultra-luxury", label: "$8,000+ per person" },
    { value: "flexible", label: "Flexible - advise me" }
  ];

  const accommodationTypes = [
    { value: "standard", label: "Standard (3-star hotels)" },
    { value: "superior", label: "Superior (4-star hotels)" },
    { value: "luxury", label: "Luxury (5-star hotels/resorts)" },
    { value: "heritage", label: "Heritage properties" },
    { value: "eco-lodge", label: "Eco-luxury lodges" },
    { value: "mixed", label: "Mix of different types" }
  ];

  const hearAboutOptions = [
    { value: "google", label: "Google Search" },
    { value: "social-media", label: "Social Media" },
    { value: "friend", label: "Friend/Family Recommendation" },
    { value: "travel-agent", label: "Travel Agent" },
    { value: "previous-customer", label: "Previous Customer" },
    { value: "other", label: "Other" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quote-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quoteData),
      });

      if (response.ok) {
        toast({
          title: "Quote Request Submitted!",
          description: "Thank you for your interest. Our travel experts will contact you within 24 hours with a personalized quote.",
        });
        
        // Reset form
        setQuoteData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          country: "",
          tourId: tour?.id,
          tourName: tour?.name || "",
          preferredDates: "",
          groupSize: 2,
          budgetRange: "",
          accommodationType: "",
          specialRequests: "",
          hearAboutUs: ""
        });
        
        onClose();
      } else {
        throw new Error("Failed to submit quote request");
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your quote request. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof QuoteRequest, value: string | number) => {
    setQuoteData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-0 shadow-2xl">
        {/* Header with Brand Gradient */}
        <div className="bg-brand-gradient -m-6 mb-6 text-white rounded-t-lg p-6">
          <DialogHeader className="text-white">
            <DialogTitle className="text-3xl font-bold text-white flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
              Get Custom Quote
            </DialogTitle>
            <DialogDescription className="text-white/90 text-base mt-2">
              Tell us about your dream trip and we'll create a personalized quote tailored just for you.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Tour Information Card */}
        {tour && (
          <div className="brand-card-emerald p-6 mb-6 border-l-4 border-brand-secondary">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-secondary rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-brand-text text-lg mb-2">Quote for: {tour.name}</h3>
                <p className="text-brand-text-muted">We'll customize this tour based on your preferences and provide detailed pricing.</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="brand-form space-y-6">
          {/* Personal Information */}
          <Collapsible
            open={expandedSections.has('personal')}
            onOpenChange={() => toggleSection('personal')}
          >
            <CollapsibleTrigger asChild>
              <div className={`brand-form-section cursor-pointer transition-all duration-200 hover:shadow-md border-2 rounded-xl p-4 ${
                expandedSections.has('personal') ? 'border-brand-primary bg-brand-emerald-50' : 'border-brand-border hover:border-brand-primary/40'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-all duration-200 ${
                      expandedSections.has('personal') ? 'bg-brand-primary' : 'bg-brand-text-muted'
                    }`}>
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-brand-text flex items-center gap-2">
                        Personal Information
                        <span className="text-brand-accent text-xs">*</span>
                      </h4>
                      <p className="text-xs text-brand-text-muted">Your contact details</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {expandedSections.has('personal') ? (
                      <ChevronDown className="w-4 h-4 text-brand-primary transition-transform duration-200" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-brand-text-muted transition-transform duration-200" />
                    )}
                  </div>
                </div>
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="space-y-4 animate-in slide-in-from-top-1 duration-200">
              <div className="grid md:grid-cols-2 gap-4 pt-4 px-2">
                <div>
                  <Label className="brand-form-label" htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    className="brand-form-input"
                    value={quoteData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label className="brand-form-label" htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    className="brand-form-input"
                    value={quoteData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label className="brand-form-label" htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    className="brand-form-input"
                    value={quoteData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label className="brand-form-label" htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    className="brand-form-input"
                    value={quoteData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="brand-form-label" htmlFor="country">Country of Residence *</Label>
                  <Input
                    id="country"
                    className="brand-form-input"
                    value={quoteData.country}
                    onChange={(e) => handleInputChange("country", e.target.value)}
                    required
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Trip Details */}
          <Collapsible
            open={expandedSections.has('trip')}
            onOpenChange={() => toggleSection('trip')}
          >
            <CollapsibleTrigger asChild>
              <div className={`brand-form-section cursor-pointer transition-all duration-200 hover:shadow-md border-2 rounded-xl p-4 ${
                expandedSections.has('trip') ? 'border-brand-secondary bg-brand-gold-50' : 'border-brand-border hover:border-brand-secondary/40'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-all duration-200 ${
                      expandedSections.has('trip') ? 'bg-brand-secondary' : 'bg-brand-text-muted'
                    }`}>
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-brand-text flex items-center gap-2">
                        Trip Details
                        <span className="text-brand-accent text-xs">*</span>
                      </h4>
                      <p className="text-xs text-brand-text-muted">Travel preferences and requirements</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {expandedSections.has('trip') ? (
                      <ChevronDown className="w-4 h-4 text-brand-secondary transition-transform duration-200" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-brand-text-muted transition-transform duration-200" />
                    )}
                  </div>
                </div>
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="space-y-4 animate-in slide-in-from-top-1 duration-200">
              <div className="pt-4 px-2">
            
            {!tour && (
              <div>
                <Label htmlFor="tourName">Interested Tour/Experience</Label>
                <Input
                  id="tourName"
                  value={quoteData.tourName}
                  onChange={(e) => handleInputChange("tourName", e.target.value)}
                  placeholder="Cultural tour, trekking, festivals, etc."
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="preferredDates">Preferred Travel Dates</Label>
                <Input
                  id="preferredDates"
                  value={quoteData.preferredDates}
                  onChange={(e) => handleInputChange("preferredDates", e.target.value)}
                  placeholder="e.g., March 2025 or flexible"
                />
              </div>
              <div>
                <Label htmlFor="groupSize">Group Size *</Label>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <Input
                    id="groupSize"
                    type="number"
                    min="1"
                    max="20"
                    value={quoteData.groupSize}
                    onChange={(e) => handleInputChange("groupSize", parseInt(e.target.value))}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budgetRange">Budget Range per Person</Label>
                <Select value={quoteData.budgetRange} onValueChange={(value) => handleInputChange("budgetRange", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="accommodationType">Accommodation Preference</Label>
                <Select value={quoteData.accommodationType} onValueChange={(value) => handleInputChange("accommodationType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select accommodation type" />
                  </SelectTrigger>
                  <SelectContent>
                    {accommodationTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Additional Information */}
          <Collapsible
            open={expandedSections.has('additional')}
            onOpenChange={() => toggleSection('additional')}
          >
            <CollapsibleTrigger asChild>
              <div className={`brand-form-section cursor-pointer transition-all duration-200 hover:shadow-md border-2 rounded-xl p-4 ${
                expandedSections.has('additional') ? 'border-brand-accent bg-brand-burgundy-50' : 'border-brand-border hover:border-brand-accent/40'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-all duration-200 ${
                      expandedSections.has('additional') ? 'bg-brand-accent' : 'bg-brand-text-muted'
                    }`}>
                      <Info className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-brand-text">
                        Additional Information
                      </h4>
                      <p className="text-xs text-brand-text-muted">Special requests and preferences</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {expandedSections.has('additional') ? (
                      <ChevronDown className="w-4 h-4 text-brand-accent transition-transform duration-200" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-brand-text-muted transition-transform duration-200" />
                    )}
                  </div>
                </div>
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="space-y-4 animate-in slide-in-from-top-1 duration-200">
              <div className="pt-4 px-2">
            
            <div>
              <Label htmlFor="specialRequests">Special Requests or Interests</Label>
              <Textarea
                id="specialRequests"
                value={quoteData.specialRequests}
                onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                placeholder="Dietary requirements, accessibility needs, specific interests, celebration occasions, etc."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="hearAboutUs">How did you hear about us?</Label>
              <Select value={quoteData.hearAboutUs} onValueChange={(value) => handleInputChange("hearAboutUs", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Please select" />
                </SelectTrigger>
                <SelectContent>
                  {hearAboutOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Information Box */}
          <div className="bg-brand-emerald-50 p-6 rounded-xl border border-brand-primary/20">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Info className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-brand-text mb-3">What happens next?</h4>
                <ul className="text-sm text-brand-text-muted space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-primary rounded-full flex-shrink-0"></div>
                    Our travel experts will review your requirements
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-primary rounded-full flex-shrink-0"></div>
                    You'll receive a personalized quote within 24 hours
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-primary rounded-full flex-shrink-0"></div>
                    We'll include detailed itinerary and pricing breakdown
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-primary rounded-full flex-shrink-0"></div>
                    No obligation - free consultation and quote
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-6 border-t border-brand-border">
            <Button type="button" onClick={onClose} className="flex-1 btn-brand-outline">
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 btn-brand-primary"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Get My Quote
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}