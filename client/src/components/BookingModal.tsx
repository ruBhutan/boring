import { useState } from "react";
import { X, Calendar, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBookingSchema } from "@shared/schema";
import type { Tour } from "@shared/schema";
import { z } from "zod";
import { useBooking } from "@/hooks/use-booking";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour: Tour | null;
}

const bookingFormSchema = insertBookingSchema.extend({
  tourId: z.number(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  travelDate: z.string().min(1, "Travel date is required"),
  groupSize: z.number().min(1, "Group size must be at least 1"),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

export default function BookingModal({ isOpen, onClose, tour }: BookingModalProps) {
  const { createBooking } = useBooking();
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      tourId: tour?.id || 0,
      groupSize: 1,
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    try {
      await createBooking.mutateAsync(data);
      reset();
      onClose();
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  if (!tour) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-0 shadow-2xl">
        {/* Header with Brand Gradient */}
        <div className="bg-brand-gradient -m-6 mb-6 text-white rounded-t-lg p-6">
          <DialogHeader className="text-white">
            <DialogTitle className="text-3xl font-bold text-white flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              Book Your Adventure
            </DialogTitle>
            <DialogDescription className="text-white/90 text-base mt-2">
              Complete the form below to book your transformative journey to Bhutan. We'll contact you within 24 hours to confirm details and arrange payment.
            </DialogDescription>
          </DialogHeader>
        </div>
        
        {/* Tour Summary Card */}
        <div className="brand-card-emerald p-6 mb-6 border-l-4 border-brand-primary">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-brand-text text-lg mb-2">{tour.name}</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-brand-text-muted">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {tour.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Max 12 people
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-brand-primary">${tour.price}</span>
                  <div className="text-sm text-brand-text-muted">per person</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="brand-form space-y-6">
          <input type="hidden" {...register("tourId")} value={tour.id} />
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="brand-form-label" htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                {...register("firstName")}
                className="brand-form-input"
                placeholder="Your first name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <Label className="brand-form-label" htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                {...register("lastName")}
                className="brand-form-input"
                placeholder="Your last name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          
          <div>
            <Label className="brand-form-label" htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className="brand-form-input"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <Label className="brand-form-label" htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              {...register("phone")}
              className="brand-form-input"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="brand-form-label" htmlFor="travelDate">Travel Date *</Label>
              <Input
                id="travelDate"
                type="date"
                {...register("travelDate")}
                className="brand-form-input"
              />
              {errors.travelDate && (
                <p className="text-red-500 text-sm mt-1">{errors.travelDate.message}</p>
              )}
            </div>
            <div>
              <Label className="brand-form-label" htmlFor="groupSize">Number of Travelers *</Label>
              <Select onValueChange={(value) => setValue("groupSize", parseInt(value))}>
                <SelectTrigger className="brand-form-select">
                  <SelectValue placeholder="Select group size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 person</SelectItem>
                  <SelectItem value="2">2 people</SelectItem>
                  <SelectItem value="3">3 people</SelectItem>
                  <SelectItem value="4">4 people</SelectItem>
                  <SelectItem value="5">5+ people</SelectItem>
                </SelectContent>
              </Select>
              {errors.groupSize && (
                <p className="text-red-500 text-sm mt-1">{errors.groupSize.message}</p>
              )}
            </div>
          </div>
          
          <div>
            <Label className="brand-form-label" htmlFor="specialRequests">Special Requests</Label>
            <Textarea
              id="specialRequests"
              {...register("specialRequests")}
              className="brand-form-textarea"
              rows={3}
              placeholder="Any dietary restrictions, accessibility needs, or special interests?"
            />
          </div>
          
          <div className="flex space-x-4 pt-6 border-t border-brand-border">
            <Button
              type="button"
              className="flex-1 btn-brand-outline"
              onClick={onClose}
            >
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
                  Processing...
                </>
              ) : (
                "Proceed to Payment"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
