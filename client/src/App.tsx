import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/HomePage";
import ToursPage from "@/pages/ToursPage";
import AboutPage from "@/pages/AboutPage";
import GalleryPage from "@/pages/GalleryPage";
import BlogPage from "@/pages/BlogPage";
import ContactPage from "@/pages/ContactPage";
import GuideRegistrationPage from "@/pages/GuideRegistrationPage";
import CustomTourPage from "@/pages/CustomTourPage";
import AdminPage from "@/pages/AdminPage";
import FestivalsPage from "@/pages/FestivalsPage";
import HotelsPage from "@/pages/HotelsPage";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LiveChat from "@/components/LiveChat";
import BottomNavigation from "@/components/BottomNavigation";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/tours" component={ToursPage} />
      <Route path="/festivals" component={FestivalsPage} />
      <Route path="/hotels" component={HotelsPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/gallery" component={GalleryPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/guide-registration" component={GuideRegistrationPage} />
      <Route path="/custom-tour" component={CustomTourPage} />
      <Route path="/admin" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
          <LiveChat />
          <BottomNavigation />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
