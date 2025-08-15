import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/components/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import ProtectedRoute from "@/components/ProtectedRoute";
import RoleProtectedRoute from "@/components/RoleProtectedRoute";
import GuideDriverDashboard from "@/components/GuideDriverDashboard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
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

// Dashboard components
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardOverview from "@/components/dashboard/DashboardOverview";

// Layout wrapper for main website
function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Layout>{children}</Layout>
      </main>
      <Footer />
      <LiveChat />
      <BottomNavigation />
    </div>
  );
}

function Router() {
  return (
    <Routes>
      {/* Admin Routes - Only for admin users */}
      <Route element={<RoleProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<WebsiteLayout><AdminPage /></WebsiteLayout>} />
        <Route path="/admin/crud" element={<WebsiteLayout><AdminCRUDPage /></WebsiteLayout>} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
      
      {/* Guide/Driver Dashboard */}
      <Route element={<RoleProtectedRoute allowedRoles={['guide', 'driver']} />}>
        <Route path="/guide-dashboard" element={<GuideDriverDashboard />} />
      </Route>
      
      {/* Website Routes - Wrapped in WebsiteLayout */}
      <Route path="/" element={<WebsiteLayout><HomePage /></WebsiteLayout>} />
      <Route path="/tours" element={<WebsiteLayout><ToursPage /></WebsiteLayout>} />
      <Route path="/tours/cultural" element={<WebsiteLayout><CulturalToursPage /></WebsiteLayout>} />
      <Route path="/tours/luxury" element={<WebsiteLayout><LuxuryToursPage /></WebsiteLayout>} />
      <Route path="/tours/adventure" element={<WebsiteLayout><AdventureToursPage /></WebsiteLayout>} />
      <Route path="/tours/spiritual" element={<WebsiteLayout><SpiritualToursPage /></WebsiteLayout>} />
      <Route path="/tours/festival" element={<WebsiteLayout><FestivalToursPage /></WebsiteLayout>} />
      <Route path="/tours/bespoke" element={<WebsiteLayout><BespokeToursPage /></WebsiteLayout>} />
      <Route path="/tours/photography" element={<WebsiteLayout><PhotographyToursPage /></WebsiteLayout>} />
      <Route path="/tours/birdwatching" element={<WebsiteLayout><BirdWatchingToursPage /></WebsiteLayout>} />
      <Route path="/tours/cycling" element={<WebsiteLayout><CyclingToursPage /></WebsiteLayout>} />
      <Route path="/tours/pilgrimage" element={<WebsiteLayout><PilgrimageToursPage /></WebsiteLayout>} />
      <Route path="/tours/wellness" element={<WebsiteLayout><WellnessToursPage /></WebsiteLayout>} />
      <Route path="/tours/:id" element={<WebsiteLayout><TourDetailPage /></WebsiteLayout>} />
      <Route path="/festivals" element={<WebsiteLayout><FestivalsPage /></WebsiteLayout>} />
      <Route path="/festivals/info/:id" element={<WebsiteLayout><FestivalInfoPage /></WebsiteLayout>} />
      <Route path="/hotels" element={<WebsiteLayout><HotelsPage /></WebsiteLayout>} />
      <Route path="/hotels/info" element={<WebsiteLayout><HotelInfoPage /></WebsiteLayout>} />
      <Route path="/visa-info" element={<WebsiteLayout><VisaInfoPage /></WebsiteLayout>} />
      <Route path="/flights" element={<WebsiteLayout><FlightsPage /></WebsiteLayout>} />
      <Route path="/geography" element={<WebsiteLayout><GeographyPage /></WebsiteLayout>} />
      <Route path="/unique-experiences" element={<WebsiteLayout><UniqueExperiencesPage /></WebsiteLayout>} />
      <Route path="/travel-tips" element={<WebsiteLayout><TravelTipsPage /></WebsiteLayout>} />
      <Route path="/faq" element={<WebsiteLayout><FAQPage /></WebsiteLayout>} />
      <Route path="/hotels/luxury" element={<WebsiteLayout><LuxuryHotelsPage /></WebsiteLayout>} />
      <Route path="/hotels/boutique" element={<WebsiteLayout><BoutiqueHotelsPage /></WebsiteLayout>} />
      <Route path="/hotels/homestays" element={<WebsiteLayout><HomestaysPage /></WebsiteLayout>} />
      <Route path="/hotels/farmstays" element={<WebsiteLayout><FarmstaysPage /></WebsiteLayout>} />
      <Route path="/about" element={<WebsiteLayout><AboutPage /></WebsiteLayout>} />
      <Route path="/destinations/:name" element={<WebsiteLayout><DestinationDetailPage /></WebsiteLayout>} />
      <Route path="/gallery" element={<WebsiteLayout><GalleryPage /></WebsiteLayout>} />
      <Route path="/blog" element={<WebsiteLayout><BlogPage /></WebsiteLayout>} />
      <Route path="/blog/:id" element={<WebsiteLayout><BlogDetailPage /></WebsiteLayout>} />
      <Route path="/contact" element={<WebsiteLayout><ContactPage /></WebsiteLayout>} />
      <Route path="/guide-registration" element={<WebsiteLayout><GuideRegistrationPage /></WebsiteLayout>} />
      <Route path="/custom-tour" element={<WebsiteLayout><CustomTourPage /></WebsiteLayout>} />
      <Route path="/login" element={<WebsiteLayout><LoginPage /></WebsiteLayout>} />
      <Route path="*" element={<WebsiteLayout><NotFound /></WebsiteLayout>} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <BrowserRouter>
            <Router />
            <Toaster />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
