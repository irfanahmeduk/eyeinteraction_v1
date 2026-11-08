import { EligibilityForm } from "@/components/forms/EligibilityForm";
import { div as MotionDiv } from "framer-motion/client";

const ELIGIBILITY_EASE = [0.22, 1, 0.36, 1];

export const metadata = {
  title: "Check UK Global Talent Eligibility | Eye Interaction",
  description:
    "Evaluate your eligibility for Global Talent Endorsement. Complete our quick assessment for an expert evaluation and personalized endorsement roadmap.",
};

export default function EligibilityPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Band */}
      <MotionDiv
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.72, ease: ELIGIBILITY_EASE }}
        className="bg-gradient-blue text-white pt-28 pb-14 border-b border-blue-950/20"
      >
        <div className="container-custom text-center max-w-3xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-200 mb-3 px-3.5 py-1 glass-dark rounded-full">
          GLOBAL TALENT PROFILE REVIEW
          </span>
          <h1 className="text-display-md md:text-display-lg font-display font-bold mb-4 leading-tight">
          Understand and Strengthen Your Professional Profile
          </h1>
          <p className="text-blue-100/90 text-base md:text-lg leading-relaxed">
          Share your background, achievements and supporting materials to receive a non-legal review focused on profile structure, document presentation and areas for improvement.
          </p>
        </div>
      </MotionDiv>

      {/* Form Container */}
      <MotionDiv
        className="container-custom py-12 -mt-4"
        initial={{ opacity: 0, y: 24, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.2, ease: ELIGIBILITY_EASE }}
      >
        <EligibilityForm />
      </MotionDiv>
    </div>
  );
}

