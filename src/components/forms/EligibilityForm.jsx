"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// ── Validation Schema ────────────────────────────────────────
const eligibilitySchema = z.object({
  // Step 1: Personal
  firstName:      z.string().min(2, "First name is required"),
  lastName:       z.string().min(2, "Last name is required"),
  email:          z.string().email("Enter a valid email address"),
  phone:          z.string().min(7, "Enter a valid phone number"),
  nationality:    z.string().min(1, "Please select your nationality"),
  currentCountry: z.string().min(1, "Please select your current country"),

  // Step 2: Visa Details
  visaType:        z.string().min(1, "Please select a visa type"),
  targetCountry:   z.string().min(1, "Please select target country"),
  purposeOfVisit:  z.string().min(1, "Please describe your purpose"),
  intendedDuration: z.string().min(1, "Please select duration"),

  // Step 3: Professional
  occupation:         z.string().min(2, "Occupation is required"),
  employmentStatus:   z.string().min(1, "Please select employment status"),
  annualIncome:       z.string().min(1, "Please select income range"),
  yearsExperience:    z.string().min(1, "Please select experience"),

  // Step 4: Documents
  hasPassport:        z.boolean(),
  passportExpiry:     z.string().optional(),
  hasBankStatements:  z.boolean(),
  hasEmploymentLetter: z.boolean(),

  // Step 5: Declarations
  previousVisaRefusals: z.boolean(),
  refusalDetails:       z.string().optional(),
  agreeToTerms:         z.literal(true, { errorMap: () => ({ message: "You must agree to the terms" }) }),
  agreeToPrivacy:       z.literal(true, { errorMap: () => ({ message: "You must agree to the privacy policy" }) }),
  subscribeToUpdates:   z.boolean(),
});

// ── Form Steps Config ────────────────────────────────────────
const STEPS = [
  { id: 1, title: "Personal Details", description: "Tell us about yourself", fields: ["firstName", "lastName", "email", "phone", "nationality", "currentCountry"] },
  { id: 2, title: "Visa Information", description: "What visa are you applying for?", fields: ["visaType", "targetCountry", "purposeOfVisit", "intendedDuration"] },
  { id: 3, title: "Professional Background", description: "Your work history", fields: ["occupation", "employmentStatus", "annualIncome", "yearsExperience"] },
  { id: 4, title: "Documents", description: "Documents you currently have", fields: ["hasPassport", "hasBankStatements", "hasEmploymentLetter"] },
  { id: 5, title: "Declarations", description: "Final confirmations", fields: ["previousVisaRefusals", "agreeToTerms", "agreeToPrivacy"] },
];

const VISA_TYPES = [
  "Skilled Worker Visa",
  "Global Talent Visa",
  "Intra-company Transfer",
  "Business Visa",
  "Innovator Founder Visa",
  "Student Visa",
  "Family Reunification",
  "Other",
];

const COUNTRIES = [
  "United Kingdom", "United States", "Canada", "Australia",
  "Germany", "France", "Netherlands", "UAE", "Pakistan",
  "India", "China", "Brazil", "South Africa", "Other",
];

const INCOME_RANGES = [
  "Under £20,000", "£20,000 – £40,000", "£40,000 – £60,000",
  "£60,000 – £100,000", "Over £100,000",
];

const EXPERIENCE_LEVELS = [
  "Less than 1 year", "1–3 years", "3–5 years", "5–10 years", "10+ years",
];

const EMPLOYMENT_STATUSES = [
  "Employed (Full-time)", "Employed (Part-time)", "Self-employed",
  "Business Owner", "Freelancer", "Student", "Unemployed",
];

// ── Sub-Components ───────────────────────────────────────────
function FormField({ label, error, required, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}

function Input({ className, ...props }) {
  return (
    <input
      className={cn("input-base", className)}
      {...props}
    />
  );
}

function Select({ className, children, ...props }) {
  return (
    <select className={cn("input-base", className)} {...props}>
      {children}
    </select>
  );
}

function CheckboxField({ label, checked, onChange, description }) {
  return (
    <label className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-brand-300 hover:bg-brand-50/30 transition-colors cursor-pointer group">
      <div
        className={cn(
          "w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-colors border-2",
          checked
            ? "bg-brand-600 border-brand-600"
            : "border-slate-300 group-hover:border-brand-400"
        )}
        onClick={() => onChange(!checked)}
      >
        {checked && <CheckCircle2 size={12} className="text-white" />}
      </div>
      <div>
        <span className="text-sm font-medium text-slate-700">{label}</span>
        {description && (
          <p className="text-xs text-slate-400 mt-0.5">{description}</p>
        )}
      </div>
    </label>
  );
}

// ── Main Form Component ──────────────────────────────────────
export function EligibilityForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eligibilitySchema),
    defaultValues: {
      hasPassport: false,
      hasBankStatements: false,
      hasEmploymentLetter: false,
      previousVisaRefusals: false,
      agreeToTerms: false,
      agreeToPrivacy: false,
      subscribeToUpdates: false,
    },
    mode: "onChange",
  });

  const watchedValues = watch();

  const goNext = async () => {
    const step = STEPS[currentStep - 1];
    const valid = await trigger(step.fields);
    if (valid) setCurrentStep((s) => Math.min(s + 1, STEPS.length));
  };

  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // TODO: send to API route → /api/eligibility
      console.log("Form data:", data);
      setIsSubmitted(true);
      toast.success("Application submitted! We'll be in touch within 24 hours.");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-display font-bold text-slate-900 mb-3">
          Application Received!
        </h2>
        <p className="text-slate-500 max-w-md mx-auto">
          Thank you for submitting your eligibility request. Our team will review
          your profile and get back to you within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-slate-600">
            Step {currentStep} of {STEPS.length}
          </span>
          <span className="text-sm text-brand-600 font-semibold">
            {Math.round((currentStep / STEPS.length) * 100)}% Complete
          </span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-blue rounded-full"
            animate={{ width: `${(currentStep / STEPS.length) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mt-4">
          {STEPS.map((step) => (
            <button
              key={step.id}
              onClick={() => step.id < currentStep && setCurrentStep(step.id)}
              className={cn(
                "flex flex-col items-center gap-1.5 transition-all",
                step.id < currentStep ? "cursor-pointer" : "cursor-default"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                  step.id < currentStep
                    ? "bg-brand-600 text-white"
                    : step.id === currentStep
                    ? "bg-brand-600 text-white ring-4 ring-brand-100"
                    : "bg-slate-100 text-slate-400"
                )}
              >
                {step.id < currentStep ? (
                  <CheckCircle2 size={14} />
                ) : (
                  step.id
                )}
              </div>
              <span
                className={cn(
                  "hidden md:block text-xs font-medium",
                  step.id === currentStep ? "text-brand-600" : "text-slate-400"
                )}
              >
                {step.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="card p-8">
        <div className="mb-7">
          <h2 className="text-xl font-display font-bold text-slate-900">
            {STEPS[currentStep - 1].title}
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            {STEPS[currentStep - 1].description}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
          >
            {/* ── Step 1: Personal ─────────────────────── */}
            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField label="First Name" error={errors.firstName?.message} required>
                  <Input placeholder="John" {...register("firstName")} />
                </FormField>
                <FormField label="Last Name" error={errors.lastName?.message} required>
                  <Input placeholder="Smith" {...register("lastName")} />
                </FormField>
                <FormField label="Email Address" error={errors.email?.message} required>
                  <Input type="email" placeholder="john@example.com" {...register("email")} />
                </FormField>
                <FormField label="Phone Number" error={errors.phone?.message} required>
                  <Input type="tel" placeholder="+44 7700 900000" {...register("phone")} />
                </FormField>
                <FormField label="Nationality" error={errors.nationality?.message} required>
                  <Select {...register("nationality")}>
                    <option value="">Select nationality…</option>
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </Select>
                </FormField>
                <FormField label="Current Country" error={errors.currentCountry?.message} required>
                  <Select {...register("currentCountry")}>
                    <option value="">Select country…</option>
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </Select>
                </FormField>
              </div>
            )}

            {/* ── Step 2: Visa ─────────────────────────── */}
            {currentStep === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField label="Visa Type" error={errors.visaType?.message} required>
                  <Select {...register("visaType")}>
                    <option value="">Select visa type…</option>
                    {VISA_TYPES.map((v) => <option key={v} value={v}>{v}</option>)}
                  </Select>
                </FormField>
                <FormField label="Target Country" error={errors.targetCountry?.message} required>
                  <Select {...register("targetCountry")}>
                    <option value="">Select country…</option>
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </Select>
                </FormField>
                <FormField label="Intended Duration" error={errors.intendedDuration?.message} required>
                  <Select {...register("intendedDuration")}>
                    <option value="">Select duration…</option>
                    <option>Less than 6 months</option>
                    <option>6–12 months</option>
                    <option>1–2 years</option>
                    <option>2–5 years</option>
                    <option>Permanent residency</option>
                  </Select>
                </FormField>
                <div className="md:col-span-2">
                  <FormField label="Purpose of Visit" error={errors.purposeOfVisit?.message} required>
                    <textarea
                      placeholder="Briefly describe your purpose of visit…"
                      rows={3}
                      className="input-base resize-none"
                      {...register("purposeOfVisit")}
                    />
                  </FormField>
                </div>
              </div>
            )}

            {/* ── Step 3: Professional ─────────────────── */}
            {currentStep === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField label="Current Occupation" error={errors.occupation?.message} required>
                  <Input placeholder="e.g. Software Engineer" {...register("occupation")} />
                </FormField>
                <FormField label="Employment Status" error={errors.employmentStatus?.message} required>
                  <Select {...register("employmentStatus")}>
                    <option value="">Select status…</option>
                    {EMPLOYMENT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </Select>
                </FormField>
                <FormField label="Annual Income" error={errors.annualIncome?.message} required>
                  <Select {...register("annualIncome")}>
                    <option value="">Select range…</option>
                    {INCOME_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </Select>
                </FormField>
                <FormField label="Years of Experience" error={errors.yearsExperience?.message} required>
                  <Select {...register("yearsExperience")}>
                    <option value="">Select experience…</option>
                    {EXPERIENCE_LEVELS.map((e) => <option key={e} value={e}>{e}</option>)}
                  </Select>
                </FormField>
              </div>
            )}

            {/* ── Step 4: Documents ─────────────────────── */}
            {currentStep === 4 && (
              <div className="space-y-3">
                <p className="text-sm text-slate-500 mb-5">
                  Please indicate which documents you currently have available:
                </p>
                <CheckboxField
                  label="Valid Passport"
                  checked={watchedValues.hasPassport}
                  onChange={(v) => setValue("hasPassport", v)}
                  description="Passport valid for at least 6 months beyond intended stay"
                />
                {watchedValues.hasPassport && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="ml-4"
                  >
                    <FormField label="Passport Expiry Date">
                      <Input type="date" {...register("passportExpiry")} />
                    </FormField>
                  </motion.div>
                )}
                <CheckboxField
                  label="Bank Statements"
                  checked={watchedValues.hasBankStatements}
                  onChange={(v) => setValue("hasBankStatements", v)}
                  description="3–6 months of bank statements showing sufficient funds"
                />
                <CheckboxField
                  label="Employment Letter"
                  checked={watchedValues.hasEmploymentLetter}
                  onChange={(v) => setValue("hasEmploymentLetter", v)}
                  description="Letter from employer confirming position, salary, and duration"
                />
              </div>
            )}

            {/* ── Step 5: Declarations ──────────────────── */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <CheckboxField
                  label="Previous Visa Refusals"
                  checked={watchedValues.previousVisaRefusals}
                  onChange={(v) => setValue("previousVisaRefusals", v)}
                  description="Have you ever been refused a visa for any country?"
                />
                {watchedValues.previousVisaRefusals && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <FormField label="Please provide details">
                      <textarea
                        rows={3}
                        className="input-base resize-none"
                        placeholder="Which country, when, and reason if known…"
                        {...register("refusalDetails")}
                      />
                    </FormField>
                  </motion.div>
                )}

                <div className="pt-2 space-y-3">
                  <CheckboxField
                    label="I agree to the Terms of Service"
                    checked={watchedValues.agreeToTerms}
                    onChange={(v) => setValue("agreeToTerms", v)}
                  />
                  {errors.agreeToTerms && (
                    <p className="text-xs text-red-500 ml-8">{errors.agreeToTerms.message}</p>
                  )}

                  <CheckboxField
                    label="I agree to the Privacy Policy"
                    checked={watchedValues.agreeToPrivacy}
                    onChange={(v) => setValue("agreeToPrivacy", v)}
                  />
                  {errors.agreeToPrivacy && (
                    <p className="text-xs text-red-500 ml-8">{errors.agreeToPrivacy.message}</p>
                  )}

                  <CheckboxField
                    label="Subscribe to visa updates and news"
                    checked={watchedValues.subscribeToUpdates}
                    onChange={(v) => setValue("subscribeToUpdates", v)}
                    description="Optional — we'll keep you informed about relevant visa changes"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={goPrev}
            disabled={currentStep === 1}
            className={cn(
              "btn btn-ghost text-sm px-5 py-2.5 gap-2",
              currentStep === 1 && "invisible"
            )}
          >
            <ChevronLeft size={16} /> Back
          </button>

          {currentStep < STEPS.length ? (
            <button
              type="button"
              onClick={goNext}
              className="btn btn-primary text-sm px-7 py-2.5"
            >
              Continue <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="btn btn-primary text-sm px-7 py-2.5 min-w-[160px] justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  Submit Application
                  <CheckCircle2 size={16} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
