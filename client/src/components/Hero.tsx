import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { 
  ChevronDown, Compass, Play, Phone, Star, Users, Calendar, MapPin
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GetQuoteFormLauncher } from "@/components/FormLauncher";

export default function Hero() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero background with parallax effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&h=1080&fit=crop"
          alt="Bhutan mountain landscape with traditional monastery"
          className="w-full h-full object-cover scale-110 animate-pulse"
        />
      </div>
      

      
      <div className="relative z-20 text-center text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 mb-6">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium">Discover the Last Shangri-La</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="block">Experience</span>
            <span className="brand-gradient-text">
              Bhutan's Magic
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl mb-12 text-gray-200 max-w-5xl mx-auto leading-relaxed font-light">
            Journey through pristine Himalayan landscapes where ancient traditions meet 
            <span className="text-brand-highlight"> Gross National Happiness</span>. 
            Discover authentic experiences in the world's only carbon-negative country.
          </p>
          
          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link to="/tours">
              <Button size="lg" className="brand-btn-primary">
                <Compass className="w-6 h-6 mr-3" />
                Explore Our Tours
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              className="brand-btn-outline"
              onClick={() => setIsVideoModalOpen(true)}
            >
              <Play className="w-6 h-6 mr-3 fill-current" />
              Watch Video
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              className="text-white px-10 py-6 rounded-full font-bold text-lg hover:bg-white/10 backdrop-blur-sm border border-white/30 shadow-xl"
              onClick={() => setIsQuoteFormOpen(true)}
            >
              <Phone className="w-6 h-6 mr-3" />
              Get Free Quote
            </Button>
          </div>


        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white text-sm font-medium">Scroll to explore</span>
          <ChevronDown className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-emerald-700">Discover the Magic of Bhutan</DialogTitle>
            <DialogDescription className="text-lg">
              Watch this immersive journey through the Last Shangri-La and experience the beauty that awaits you.
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dKe_FGtLSSM"
              title="Bhutan - The Last Shangri-La"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>

      <GetQuoteFormLauncher
        isOpen={isQuoteFormOpen}
        onClose={() => setIsQuoteFormOpen(false)}
      />
    </section>
  );
}