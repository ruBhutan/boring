import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { 
  ChevronDown, Compass, Play, Star, Award, Users, 
  Calendar, MapPin, Phone, ArrowRight, Shield, Clock
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Hero() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Trust indicators floating */}
      <div className="absolute top-24 right-8 z-20 hidden lg:block">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/30">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-5 h-5 !text-amber-400 fill-current" />
            <span className="font-bold !text-gray-900">4.9/5</span>
          </div>
          <div className="text-sm !text-gray-700">500+ Reviews</div>
        </div>
      </div>

      <div className="absolute top-32 left-8 z-20 hidden lg:block">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/30">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="w-5 h-5 !text-teal-600" />
            <span className="font-bold !text-gray-900">Licensed</span>
          </div>
          <div className="text-sm !text-gray-700">Tour Operator</div>
        </div>
      </div>

      <div className="absolute bottom-32 right-8 z-20 hidden lg:block">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/30">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-5 h-5 !text-emerald-600" />
            <span className="font-bold !text-gray-900">24/7</span>
          </div>
          <div className="text-sm !text-gray-700">Support</div>
        </div>
      </div>

      {/* Hero background with parallax effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&h=1080&fit=crop"
          alt="Bhutan mountain landscape with traditional monastery"
          className="w-full h-full object-cover scale-105"
        />
      </div>
      
      <div className="relative z-20 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="animate-fade-in">
          <Badge className="mb-6 bg-teal-600/90 text-white px-4 py-2 text-sm font-medium backdrop-blur-sm">
            🏔️ Last Shangri-La Experience
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Discover the Magic of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
              Bhutan
            </span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Journey to the world's only carbon-negative kingdom where ancient wisdom meets pristine nature, 
            and every step is a meditation in paradise.
          </p>
          
          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/tours">
              <Button size="lg" className="px-8 py-4 rounded-full font-semibold text-lg bg-teal-600 hover:bg-teal-700 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
                <Compass className="w-5 h-5 mr-2" />
                Explore Tours
              </Button>
            </Link>
            <Link href="/gallery?filter=videos">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-teal-900 transition-all duration-300 backdrop-blur-sm bg-white/10 shadow-xl"
              >
                <Play className="w-5 h-5 mr-2 fill-current" />
                Watch Video
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                variant="ghost" 
                size="lg"
                className="text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 backdrop-blur-sm border border-white/30"
              >
                <Phone className="w-5 h-5 mr-2" />
                Get Quote
              </Button>
            </Link>
          </div>
          
          {/* Enhanced stats with 4 columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 hover:bg-white/20 transition-all duration-300 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-teal-400 mb-2">7+</div>
              <div className="text-xs md:text-sm text-gray-200">Years Experience</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 hover:bg-white/20 transition-all duration-300 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-teal-400 mb-2">500+</div>
              <div className="text-xs md:text-sm text-gray-200">Happy Travelers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 hover:bg-white/20 transition-all duration-300 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-teal-400 mb-2">98%</div>
              <div className="text-xs md:text-sm text-gray-200">Satisfaction Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 hover:bg-white/20 transition-all duration-300 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-teal-400 mb-2">24/7</div>
              <div className="text-xs md:text-sm text-gray-200">Support</div>
            </div>
          </div>

          {/* Quick booking bar inspired by top tourism sites */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 md:p-6 max-w-5xl mx-auto shadow-2xl border border-white/30">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="text-left">
                <label className="text-sm font-medium !text-gray-800 block mb-2">Destination</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg !text-gray-900 bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                  <option>Paro Valley</option>
                  <option>Thimphu</option>
                  <option>Punakha</option>
                  <option>Bumthang</option>
                  <option>All Destinations</option>
                </select>
              </div>
              <div className="text-left">
                <label className="text-sm font-medium !text-gray-800 block mb-2">Duration</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg !text-gray-900 bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                  <option>5-7 days</option>
                  <option>8-10 days</option>
                  <option>11-14 days</option>
                  <option>15+ days</option>
                </select>
              </div>
              <div className="text-left">
                <label className="text-sm font-medium !text-gray-800 block mb-2">Travel Date</label>
                <input 
                  type="date" 
                  placeholder="mm/dd/yyyy"
                  className="w-full p-3 border border-gray-300 rounded-lg !text-gray-900 bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div className="text-left">
                <Link href="/tours">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 !text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Find Tours
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white" />
      </div>

      {/* Video Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Discover the Magic of Bhutan</DialogTitle>
            <DialogDescription>
              Watch this immersive journey through the Last Shangri-La and experience the beauty that awaits you.
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
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
    </section>
  );
}
