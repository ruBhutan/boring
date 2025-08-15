import CustomTourRequestForm from "@/components/CustomTourRequestForm";

export default function CustomTourPage() {
  return (
    <div className="brand-nav-spacing pb-20 bg-gradient-to-br from-emerald-50 via-indigo-50 to-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Create Your
            <span className="brand-gradient-text block">Dream Journey</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Design a completely personalized Bhutan experience tailored to your interests, 
            budget, and travel style. Our experts will craft the perfect itinerary just for you.
          </p>
        </div>

        <CustomTourRequestForm />
      </div>
    </div>
  );
}
