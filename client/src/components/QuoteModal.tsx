import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Users, DollarSign, Send, X } from "lucide-react";
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-green-600" />
              Get Custom Quote
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          {tour && (
            <p className="text-gray-600">
              Request a personalized quote for: <span className="font-semibold">{tour.name}</span>
            </p>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={quoteData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={quoteData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={quoteData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={quoteData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="country">Country of Residence *</Label>
              <Input
                id="country"
                value={quoteData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Trip Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Trip Details</h3>
            
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
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Additional Information</h3>
            
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
          </div>

          {/* Information Box */}
          <div className="bg-teal-50 p-4 rounded-lg">
            <h4 className="font-semibold text-teal-900 mb-2">What happens next?</h4>
            <ul className="text-sm text-emerald-800 space-y-1">
              <li>• Our travel experts will review your requirements</li>
              <li>• You'll receive a personalized quote within 24 hours</li>
              <li>• We'll include detailed itinerary and pricing breakdown</li>
              <li>• No obligation - free consultation and quote</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-emerald-700"
            >
              {isSubmitting ? (
                "Submitting..."
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