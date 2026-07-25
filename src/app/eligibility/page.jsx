import { EligibilityForm } from "@/components/forms/EligibilityForm";

export const metadata = {
  title: "Check UK Global Talent Visa Eligibility | Eye Interaction",
  description:
    "Evaluate your eligibility for the UK Global Talent Visa. Complete our quick assessment for an expert evaluation and personalized endorsement roadmap.",
};

export default function EligibilityPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Band */}
      <div className="bg-gradient-blue text-white pt-28 pb-14 border-b border-blue-950/20">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-200 mb-3 px-3.5 py-1 glass-dark rounded-full">
            UK Global Talent Visa Assessment
          </span>
          <h1 className="text-display-md md:text-display-lg font-display font-bold mb-4 leading-tight">
            Check Your Eligibility for the UK Global Talent Visa
          </h1>
          <p className="text-blue-100/90 text-base md:text-lg leading-relaxed">
            Wondering whether you qualify and how close you are to endorsement? Fill out our free eligibility assessment to receive a quick expert evaluation and discover your next steps.
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="container-custom py-12 -mt-4">
        <EligibilityForm />
      </div>
    </div>
  );
}
