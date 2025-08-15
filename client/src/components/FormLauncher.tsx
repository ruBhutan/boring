import { useState } from "react";
import { Button } from "@/components/ui/button";
import EnhancedInteractiveForm from "./EnhancedInteractiveForm";
import {
  MessageSquare, Calendar, Sparkles, DollarSign, UserPlus, 
  Home, Phone, Mail, Heart, MapPin, Users, Mountain, Camera,
  Send, ArrowRight, Zap, Plane, Quote, FileText
} from "lucide-react";

type FormType = "contact" | "booking" | "custom-tour" | "quote" | "guide-registration" | "hotel-booking" | "flight-booking" | "get-in-touch" | "book-now" | "get-quote" | "join-team" | "festival-booking";

interface FormTriggerConfig {
  type: FormType;
  label: string;
  icon: React.ComponentType<any>;
  description: string;
  gradient: string;
  ctaText: string;
  floatingPosition?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

interface FormLauncherProps {
  triggers: FormType[];
  variant?: "floating" | "inline" | "grid";
  size?: "sm" | "md" | "lg";
  className?: string;
  showLabels?: boolean;
  autoTrigger?: FormType; // Auto-open a specific form
  contextData?: any; // Pass contextual data to forms
}

const FORM_TRIGGER_CONFIGS: Record<FormType, FormTriggerConfig> = {
  contact: {
    type: "contact",
    label: "Get In Touch",
    icon: MessageSquare,
    description: "Have questions? We'd love to help!",
    gradient: "bg-brand-gradient",
    ctaText: "Contact Us",
    floatingPosition: "bottom-right"
  },
  booking: {
    type: "booking", 
    label: "Book Now",
    icon: Calendar,
    description: "Ready to start your adventure?",
    gradient: "bg-brand-gradient",
    ctaText: "Book Your Trip",
    floatingPosition: "bottom-left"
  },
  "custom-tour": {
    type: "custom-tour",
    label: "Custom Tour",
    icon: Sparkles,
    description: "Design your perfect journey",
    gradient: "bg-brand-gradient",
    ctaText: "Plan My Trip",
    floatingPosition: "bottom-right"
  },
  quote: {
    type: "quote",
    label: "Get Quote",
    icon: DollarSign,
    description: "Get personalized pricing",
    gradient: "bg-brand-gradient",
    ctaText: "Request Quote",
    floatingPosition: "top-right"
  },
  "guide-registration": {
    type: "guide-registration",
    label: "Join Our Team",
    icon: UserPlus,
    description: "Become a guide or driver",
    gradient: "bg-brand-gradient",
    ctaText: "Register Now",
    floatingPosition: "top-left"
  },
  "hotel-booking": {
    type: "hotel-booking",
    label: "Book Hotel",
    icon: Home,
    description: "Reserve your accommodation",
    gradient: "bg-brand-gradient",
    ctaText: "Book Room",
    floatingPosition: "bottom-right"
  },
  "flight-booking": {
    type: "flight-booking",
    label: "Book Flight",
    icon: Plane,
    description: "Book your flight to Bhutan",
    gradient: "bg-brand-gradient",
    ctaText: "Book Flight",
    floatingPosition: "top-right"
  },
  "get-in-touch": {
    type: "get-in-touch",
    label: "Get In Touch",
    icon: MessageSquare,
    description: "Contact us for any inquiries",
    gradient: "bg-brand-gradient",
    ctaText: "Get In Touch",
    floatingPosition: "bottom-right"
  },
  "book-now": {
    type: "book-now",
    label: "Book Now",
    icon: Calendar,
    description: "Start your booking process",
    gradient: "bg-brand-gradient",
    ctaText: "Book Now",
    floatingPosition: "bottom-left"
  },
  "get-quote": {
    type: "get-quote",
    label: "Get Quote",
    icon: Quote,
    description: "Request a personalized quote",
    gradient: "bg-brand-gradient",
    ctaText: "Get Quote",
    floatingPosition: "top-right"
  },
  "join-team": {
    type: "join-team",
    label: "Join Our Team",
    icon: UserPlus,
    description: "Apply to work with us",
    gradient: "bg-brand-gradient",
    ctaText: "Join Team",
    floatingPosition: "top-left"
  },
  "festival-booking": {
    type: "festival-booking",
    label: "Book Festival",
    icon: Calendar,
    description: "Book your spot at the festival",
    gradient: "bg-brand-gradient",
    ctaText: "Book Festival",
    floatingPosition: "bottom-right"
  }
};

const FloatingFormButton = ({ 
  config, 
  onClick, 
  size = "md" 
}: { 
  config: FormTriggerConfig; 
  onClick: () => void;
  size?: "sm" | "md" | "lg";
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16", 
    lg: "w-20 h-20"
  };
  
  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  const positionClasses = {
    "bottom-right": "fixed bottom-6 right-6 z-50",
    "bottom-left": "fixed bottom-6 left-6 z-50",
    "top-right": "fixed top-24 right-6 z-50",
    "top-left": "fixed top-24 left-6 z-50"
  };

  return (
    <div className={positionClasses[config.floatingPosition || "bottom-right"]}>
      <div className="flex items-center gap-3">
        {/* Tooltip */}
        {isHovered && (
          <div className="bg-white shadow-xl border rounded-lg p-3 max-w-xs animate-in slide-in-from-right-2">
            <div className="flex items-center gap-2 mb-1">
              <config.icon className="w-4 h-4 text-gray-600" />
              <span className="font-semibold text-gray-900">{config.label}</span>
            </div>
            <p className="text-sm text-gray-600">{config.description}</p>
          </div>
        )}
        
        {/* Floating Button */}
        <Button
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`${sizeClasses[size]} rounded-full shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:scale-110 ${config.gradient} border-4 border-white`}
        >
          <config.icon className={`${iconSizes[size]} text-white`} />
        </Button>
      </div>
    </div>
  );
};

const InlineFormButton = ({ 
  config, 
  onClick, 
  size = "md",
  showLabel = true 
}: { 
  config: FormTriggerConfig; 
  onClick: () => void;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <Button
      onClick={onClick}
      className={`btn-brand-primary ${sizeClasses[size]} transform transition-all duration-200 hover:scale-105`}
    >
      <config.icon className="w-5 h-5 mr-2" />
      {showLabel ? config.ctaText : ""}
    </Button>
  );
};

const GridFormCard = ({ 
  config, 
  onClick 
}: { 
  config: FormTriggerConfig; 
  onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="brand-card cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`h-2 ${config.gradient} transition-all duration-300 ${isHovered ? 'h-4' : ''}`} />
      
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-full ${config.gradient} flex items-center justify-center`}>
            <config.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold brand-heading">{config.label}</h3>
            <p className="text-sm brand-body">{config.description}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Click to get started</span>
          <ArrowRight className={`w-5 h-5 text-gray-400 transition-all duration-300 ${isHovered ? 'text-brand-primary translate-x-1' : ''}`} />
        </div>
      </div>
    </div>
  );
};

export default function FormLauncher({
  triggers,
  variant = "inline",
  size = "md", 
  className = "",
  showLabels = true,
  autoTrigger,
  contextData = {}
}: FormLauncherProps) {
  const [activeForm, setActiveForm] = useState<FormType | null>(autoTrigger || null);
  const [isFormOpen, setIsFormOpen] = useState(!!autoTrigger);

  const openForm = (formType: FormType) => {
    setActiveForm(formType);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setActiveForm(null);
  };

  const handleFormSuccess = (data: any) => {
    console.log("Form submitted successfully:", data);
    // You can add additional logic here, like tracking analytics
  };

  const renderTriggers = () => {
    const configs = triggers.map(type => FORM_TRIGGER_CONFIGS[type]);

    switch (variant) {
      case "floating":
        return (
          <>
            {configs.map((config) => (
              <FloatingFormButton
                key={config.type}
                config={config}
                onClick={() => openForm(config.type)}
                size={size}
              />
            ))}
          </>
        );

      case "grid":
        return (
          <div className={`grid gap-6 ${triggers.length <= 2 ? 'md:grid-cols-2' : triggers.length <= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'} ${className}`}>
            {configs.map((config) => (
              <GridFormCard
                key={config.type}
                config={config}
                onClick={() => openForm(config.type)}
              />
            ))}
          </div>
        );

      case "inline":
      default:
        return (
          <div className={`flex flex-wrap gap-4 ${className}`}>
            {configs.map((config) => (
              <InlineFormButton
                key={config.type}
                config={config}
                onClick={() => openForm(config.type)}
                size={size}
                showLabel={showLabels}
              />
            ))}
          </div>
        );
    }
  };

  return (
    <>
      {renderTriggers()}
      
      {/* Form Modal */}
      {activeForm && (
        <EnhancedInteractiveForm
          formType={activeForm}
          isOpen={isFormOpen}
          onClose={closeForm}
          initialData={contextData}
          onSubmitSuccess={handleFormSuccess}
        />
      )}
    </>
  );
}

// Predefined combinations for common use cases
export const ContactFormLauncher = (props: Omit<FormLauncherProps, 'triggers'>) => (
  <FormLauncher {...props} triggers={["contact"]} />
);

export const BookingFormLauncher = (props: Omit<FormLauncherProps, 'triggers'>) => (
  <FormLauncher {...props} triggers={["booking"]} />
);

export const CustomTourFormLauncher = (props: Omit<FormLauncherProps, 'triggers'>) => (
  <FormLauncher {...props} triggers={["custom-tour"]} />
);

export const QuoteFormLauncher = (props: Omit<FormLauncherProps, 'triggers'>) => (
  <FormLauncher {...props} triggers={["quote"]} />
);

interface FlightBookingFormLauncherProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoute?: any;
}

export const FlightBookingFormLauncher = ({ isOpen, onClose, selectedRoute }: FlightBookingFormLauncherProps) => {
  if (!isOpen) return null;
  
  return (
    <EnhancedInteractiveForm
      formType="flight-booking"
      isOpen={isOpen}
      onClose={onClose}
      initialData={{ selectedRoute }}
      onSubmitSuccess={(data) => {
        console.log("Flight booking submitted:", data);
        onClose();
      }}
    />
  );
};

export const GetInTouchFormLauncher = (props: Omit<FormLauncherProps, 'triggers'>) => (
  <FormLauncher {...props} triggers={["get-in-touch"]} />
);

interface BookNowFormLauncherProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTour?: any;
}

export const BookNowFormLauncher = ({ isOpen, onClose, selectedTour }: BookNowFormLauncherProps) => {
  if (!isOpen) return null;
  
  return (
    <EnhancedInteractiveForm
      formType="book-now"
      isOpen={isOpen}
      onClose={onClose}
      initialData={{ selectedTour }}
      onSubmitSuccess={(data) => {
        console.log("Booking submitted:", data);
        onClose();
      }}
    />
  );
};

interface GetQuoteFormLauncherProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTour?: any;
}

export const GetQuoteFormLauncher = ({ isOpen, onClose, selectedTour }: GetQuoteFormLauncherProps) => {
  if (!isOpen) return null;
  
  return (
    <EnhancedInteractiveForm
      formType="get-quote"
      isOpen={isOpen}
      onClose={onClose}
      initialData={{ selectedTour }}
      onSubmitSuccess={(data) => {
        console.log("Quote request submitted:", data);
        onClose();
      }}
    />
  );
};

export const JoinTeamFormLauncher = (props: Omit<FormLauncherProps, 'triggers'>) => (
  <FormLauncher {...props} triggers={["join-team"]} />
);

export const HotelBookingFormLauncher = (props: Omit<FormLauncherProps, 'triggers'>) => (
  <FormLauncher {...props} triggers={["hotel-booking"]} />
);

interface FestivalBookingFormLauncherProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFestival?: any;
}

export const FestivalBookingFormLauncher = ({ isOpen, onClose, selectedFestival }: FestivalBookingFormLauncherProps) => {
  if (!isOpen) return null;
  
  return (
    <EnhancedInteractiveForm
      formType="festival-booking"
      isOpen={isOpen}
      onClose={onClose}
      initialData={{ selectedFestival }}
      onSubmitSuccess={(data) => {
        console.log("Festival booking submitted:", data);
        onClose();
      }}
    />
  );
};

export const AllFormsLauncher = (props: Omit<FormLauncherProps, 'triggers'>) => (
  <FormLauncher {...props} triggers={["contact", "booking", "custom-tour", "quote", "guide-registration", "hotel-booking", "flight-booking", "festival-booking"]} />
);

// Quick floating contact button for any page
export const FloatingContactButton = () => (
  <FormLauncher triggers={["contact"]} variant="floating" size="md" />
);

// Smart form launcher that shows different forms based on page context
export const SmartFormLauncher = ({ page }: { page: string }) => {
  const getTriggersForPage = (page: string): FormType[] => {
    switch (page) {
      case 'tours':
      case 'tour-detail':
        return ["booking", "custom-tour", "quote"];
      case 'hotels':
      case 'hotel-detail':
        return ["hotel-booking", "contact"];
      case 'flights':
      case 'flight-detail':
        return ["flight-booking", "contact"];
      case 'festivals':
      case 'festival-detail':
        return ["festival-booking", "contact"];
      case 'contact':
        return ["contact", "quote"];
      case 'guide-registration':
        return ["guide-registration"];
      default:
        return ["contact", "booking", "custom-tour"];
    }
  };

  return (
    <FormLauncher 
      triggers={getTriggersForPage(page)}
      variant="inline"
      size="md"
    />
  );
};