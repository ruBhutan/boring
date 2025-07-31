import CustomTourRequestForm from "@/components/CustomTourRequestForm";

export default function CustomTourPage() {
  return (
    <div className="pt-20 pb-20 bg-gradient-to-br from-teal-50 to-emerald-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 brand-heading mb-4 brand-heading">
            Create Your
            <span className="gradient-text"> Dream Journey</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto brand-body brand-body">
            Design a completely personalized Bhutan experience tailored to your interests, 
            budget, and travel style. Our experts will craft the perfect itinerary just for you.
          </p>
        </div>

        <CustomTourRequestForm />
      </div>
    </div>
  );
}