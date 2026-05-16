import { EligibilityForm } from "@/components/forms/EligibilityForm";

export const metadata = {
  title: "Check Your Eligibility",
  description:
    "Complete our comprehensive eligibility assessment and get a personalised report from our visa experts within 24 hours.",
};

export default function EligibilityPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-gradient-blue text-white pt-28 pb-14">
        <div className="container-custom text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-200 mb-3 px-3 py-1 glass-dark rounded-full">
            Free Assessment
          </span>
          <h1 className="text-display-lg font-display font-bold mb-4">
            Check Your Eligibility
          </h1>
          <p className="text-blue-100/80 text-lg max-w-xl mx-auto">
            Complete the form below and receive a personalised eligibility report
            from our expert team within 24 hours — completely free.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="container-custom py-14 -mt-4">
        <EligibilityForm />
      </div>
    </div>
  );
}
