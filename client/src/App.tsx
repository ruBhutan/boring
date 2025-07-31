import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/components/AuthContext";
import HomePage from "@/pages/HomePage";
import ToursPage from "@/pages/ToursPage";
import AboutPage from "@/pages/AboutPage";
import GalleryPage from "@/pages/GalleryPage";
import BlogPage from "@/pages/BlogPage";
import ContactPage from "@/pages/ContactPage";
import GuideRegistrationPage from "@/pages/GuideRegistrationPage";
import CustomTourPage from "@/pages/CustomTourPage";
import AdminPage from "@/pages/AdminPage";
import AdminCRUDPage from "@/pages/AdminCRUDPage";
import FestivalsPage from "@/pages/FestivalsPage";
import HotelsPage from "@/pages/HotelsPage";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LiveChat from "@/components/LiveChat";
import BottomNavigation from "@/components/BottomNavigation";
import NotFound from "@/pages/not-found";
import TourDetailPage from "@/pages/TourDetailPage";
import BlogDetailPage from "@/pages/BlogDetailPage";
import DestinationDetailPage from "@/pages/DestinationDetailPage";
import FestivalInfoPage from "@/pages/FestivalInfoPage";
import HotelInfoPage from "@/pages/HotelInfoPage";
import VisaInfoPage from "@/pages/VisaInfoPage";
import FlightsPage from "@/pages/FlightsPage";
import GeographyPage from "@/pages/GeographyPage";
import UniqueExperiencesPage from "@/pages/UniqueExperiencesPage";
import TravelTipsPage from "@/pages/TravelTipsPage";
import FAQPage from "@/pages/FAQPage";
import CulturalToursPage from "@/pages/tours/CulturalToursPage";
import LuxuryToursPage from "@/pages/tours/LuxuryToursPage";
import AdventureToursPage from "@/pages/tours/AdventureToursPage";
import SpiritualToursPage from "@/pages/tours/SpiritualToursPage";
import FestivalToursPage from "@/pages/tours/FestivalToursPage";
import BespokeToursPage from "@/pages/tours/BespokeToursPage";
import PhotographyToursPage from "@/pages/tours/PhotographyToursPage";
import BirdWatchingToursPage from "@/pages/tours/BirdWatchingToursPage";
import CyclingToursPage from "@/pages/tours/CyclingToursPage";
import PilgrimageToursPage from "@/pages/tours/PilgrimageToursPage";
import WellnessToursPage from "@/pages/tours/WellnessToursPage";
import LuxuryHotelsPage from "@/pages/hotels/LuxuryHotelsPage";
import BoutiqueHotelsPage from "@/pages/hotels/BoutiqueHotelsPage";
import HomestaysPage from "@/pages/hotels/HomestaysPage";
import FarmstaysPage from "@/pages/hotels/FarmstaysPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/tours" component={ToursPage} />
      <Route path="/tours/:id" component={TourDetailPage} />
      <Route path="/festivals" component={FestivalsPage} />
      <Route path="/festivals/info" component={FestivalInfoPage} />
      <Route path="/hotels" component={HotelsPage} />
      <Route path="/hotels/info" component={HotelInfoPage} />
      <Route path="/visa-info" component={VisaInfoPage} />
      <Route path="/flights" component={FlightsPage} />
      <Route path="/geography" component={GeographyPage} />
      <Route path="/unique-experiences" component={UniqueExperiencesPage} />
      <Route path="/travel-tips" component={TravelTipsPage} />
      <Route path="/faq" component={FAQPage} />
      <Route path="/tours/cultural" component={CulturalToursPage} />
      <Route path="/tours/luxury" component={LuxuryToursPage} />
      <Route path="/tours/adventure" component={AdventureToursPage} />
      <Route path="/tours/spiritual" component={SpiritualToursPage} />
      <Route path="/tours/festival" component={FestivalToursPage} />
      <Route path="/tours/bespoke" component={BespokeToursPage} />
      <Route path="/tours/photography" component={PhotographyToursPage} />
      <Route path="/tours/birdwatching" component={BirdWatchingToursPage} />
      <Route path="/tours/cycling" component={CyclingToursPage} />
      <Route path="/tours/pilgrimage" component={PilgrimageToursPage} />
      <Route path="/tours/wellness" component={WellnessToursPage} />
      <Route path="/hotels/luxury" component={LuxuryHotelsPage} />
      <Route path="/hotels/boutique" component={BoutiqueHotelsPage} />
      <Route path="/hotels/homestays" component={HomestaysPage} />
      <Route path="/hotels/farmstays" component={FarmstaysPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/destinations/:name" component={DestinationDetailPage} />
      <Route path="/gallery" component={GalleryPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:id" component={BlogDetailPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/guide-registration" component={GuideRegistrationPage} />
      <Route path="/custom-tour" component={CustomTourPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/admin/crud" component={AdminCRUDPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 flex flex-col">
            <Navigation />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
            <LiveChat />
            <BottomNavigation />
          </div>
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
