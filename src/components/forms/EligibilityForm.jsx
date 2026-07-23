"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, ChevronLeft, CheckCircle2,
  Loader2, Check, User, FileText, Briefcase, FolderOpen, ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FormSelect } from "@/components/forms/FormSelect";
import { DateInput } from "@/components/ui/date-input";

// ── Validation Schema ────────────────────────────────────────
const eligibilitySchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Enter a valid email address"),
  phoneCountryCode: z.string().min(1, "Select country code"),
  phone: z.string().min(6, "Enter a valid phone number"),
  nationality: z.string().min(1, "Please select your nationality"),
  currentCountry: z.string().min(1, "Please select your current country"),
  visaType: z.string().min(1, "Please select a visa type"),
  targetCountry: z.string().min(1, "Please select target country"),
  purposeOfVisit: z.string().min(1, "Please describe your purpose"),
  intendedDuration: z.string().min(1, "Please select duration"),
  occupation: z.string().min(2, "Occupation is required"),
  employmentStatus: z.string().min(1, "Please select employment status"),
  annualIncome: z.string().min(1, "Please select income range"),
  yearsExperience: z.string().min(1, "Please select experience"),
  hasPassport: z.boolean(),
  passportExpiry: z.string().optional(),
  hasBankStatements: z.boolean(),
  hasEmploymentLetter: z.boolean(),
  previousVisaRefusals: z.boolean(),
  refusalDetails: z.string().optional(),
  agreeToTerms: z.literal(true, { errorMap: () => ({ message: "You must agree to the terms" }) }),
  agreeToPrivacy: z.literal(true, { errorMap: () => ({ message: "You must agree to the privacy policy" }) }),
  subscribeToUpdates: z.boolean(),
});

// ── Config ───────────────────────────────────────────────────
const STEPS = [
  { id: 1, title: "Personal Details", description: "Tell us about yourself", icon: User, fields: ["firstName", "lastName", "email", "phoneCountryCode", "phone", "nationality", "currentCountry"] },
  { id: 2, title: "Visa Information", description: "What visa are you applying for?", icon: FileText, fields: ["visaType", "targetCountry", "purposeOfVisit", "intendedDuration"] },
  { id: 3, title: "Professional Background", description: "Your work history", icon: Briefcase, fields: ["occupation", "employmentStatus", "annualIncome", "yearsExperience"] },
  { id: 4, title: "Documents", description: "Documents you currently have", icon: FolderOpen, fields: ["hasPassport", "hasBankStatements", "hasEmploymentLetter"] },
  { id: 5, title: "Declarations", description: "Final confirmations", icon: ShieldCheck, fields: ["previousVisaRefusals", "agreeToTerms", "agreeToPrivacy"] },
];

const VISA_TYPES = ["Skilled Worker Visa", "Global Talent Visa", "Intra-company Transfer", "Business Visa", "Innovator Founder Visa", "Student Visa", "Family Reunification", "Other"];
const COUNTRIES = ["United Kingdom", "United States", "Canada", "Australia", "Germany", "France", "Netherlands", "UAE", "Pakistan", "India", "China", "Brazil", "South Africa", "Other"];
const INCOME_RANGES = ["Under £20,000", "£20,000 – £40,000", "£40,000 – £60,000", "£60,000 – £100,000", "Over £100,000"];
const EXPERIENCE_LEVELS = ["Less than 1 year", "1–3 years", "3–5 years", "5–10 years", "10+ years"];
const EMPLOYMENT_STATUSES = ["Employed (Full-time)", "Employed (Part-time)", "Self-employed", "Business Owner", "Freelancer", "Student", "Unemployed"];
const DURATION_OPTIONS = ["Less than 6 months", "6–12 months", "1–2 years", "2–5 years", "Permanent residency"];

// Flags removed — clean code + country abbreviation only
const PHONE_CODES = [
  { code: "+44", label: "+44  UK" },
  { code: "+1", label: "+1   US" },
  { code: "+61", label: "+61  AU" },
  { code: "+91", label: "+91  IN" },
  { code: "+92", label: "+92  PK" },
  { code: "+971", label: "+971 UAE" },
  { code: "+49", label: "+49  DE" },
  { code: "+33", label: "+33  FR" },
  { code: "+86", label: "+86  CN" },
  { code: "+27", label: "+27  ZA" },
  { code: "+234", label: "+234 NG" },
  { code: "+880", label: "+880 BD" },
];

// ── Micro-components ─────────────────────────────────────────
function FieldError({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: "auto", marginTop: 6 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.15 }}
          className="text-xs text-red-500 flex items-center gap-1.5 overflow-hidden"
        >
          <span className="w-3.5 h-3.5 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-[9px] font-bold shrink-0">!</span>
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function FormField({ label, error, required, children }) {
  return (
    <div className="space-y-1.5">
      <p className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </p>
      {children}
      <FieldError message={error} />
    </div>
  );
}

/**
 * PhoneInput — unified outer border shell.
 * Uses a native <select> for the country code (no flags — just "+XX CC").
 * The select sits in a fixed-width wrapper so it never stretches,
 * and shares a single border shell with the number input beside it.
 */
function PhoneInput({ control, errors }) {
  const hasError = !!(errors?.phone?.message || errors?.phoneCountryCode?.message);

  return (
    <div>
      <p className="text-sm font-medium text-slate-700 mb-1.5">
        Phone Number <span className="text-red-500 ml-1">*</span>
      </p>

      {/* Single outer border — focus ring lives here */}
      <div
        className={cn(
          "flex items-stretch w-full overflow-hidden rounded-[var(--radius-md)]",
          "border-[1.5px] bg-white transition-[border-color,box-shadow] duration-150",
          "focus-within:border-[var(--color-primary)] focus-within:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]",
          hasError
            ? "border-red-400 focus-within:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
            : "border-[var(--color-border)] hover:border-[#93c5fd]"
        )}
      >
        {/* Fixed-width native select — no flags */}
        <div className="w-28 shrink-0 border-r border-[var(--color-border)]">
          <Controller
            control={control}
            name="phoneCountryCode"
            render={({ field }) => (
              <select
                ref={field.ref}
                name={field.name}
                value={field.value ?? "+44"}
                onChange={field.onChange}
                onBlur={field.onBlur}
                className={cn(
                  "h-full w-full px-2.5",
                  "border-0 outline-none shadow-none rounded-none",
                  "bg-slate-50 hover:bg-slate-100/80 transition-colors cursor-pointer",
                  "text-[13px] font-semibold text-slate-700"
                )}
              >
                {PHONE_CODES.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.label}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

        {/* Phone number text input */}
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <input
              ref={field.ref}
              name={field.name}
              type="tel"
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="7700 900000"
              className="flex-1 min-w-0 h-full min-h-[2.75rem] px-3 bg-transparent text-[0.9375rem] text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-muted)]"
            />
          )}
        />
      </div>

      <FieldError message={errors?.phone?.message || errors?.phoneCountryCode?.message} />
    </div>
  );
}

function CheckboxField({ id, label, checked, onChange, description }) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex items-start gap-3 p-4 rounded-xl cursor-pointer border transition-all duration-150",
        checked
          ? "border-brand-200 bg-brand-50/60"
          : "border-[var(--color-border)] hover:border-[#93c5fd] hover:bg-[var(--color-light)]/40"
      )}
    >
      <Checkbox id={id} checked={checked} onCheckedChange={(v) => onChange(v === true)} className="mt-0.5 shrink-0" />
      <div className="grid gap-0.5 leading-snug select-none">
        <span className="text-sm font-medium text-slate-800">{label}</span>
        {description && <p className="text-xs text-slate-400 leading-relaxed">{description}</p>}
      </div>
    </label>
  );
}

// ── Step progress bar ────────────────────────────────────────
function StepBar({ currentStep, totalSteps, onGoTo }) {
  const pct = Math.round((currentStep / totalSteps) * 100);
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-sm text-slate-500 font-medium">
          Step <strong className="text-slate-800 font-bold">{currentStep}</strong> of {totalSteps}
        </span>
        <span className="text-sm font-bold text-brand-600">{pct}% Complete</span>
      </div>

      {/* Track */}
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-5">
        <motion.div
          className="h-full rounded-full bg-gradient-blue"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Bubbles with horizontal connector line behind them */}
      <div className="relative flex justify-between">
        <div className="absolute top-4 inset-x-0 h-px bg-slate-200 pointer-events-none" />
        {STEPS.map((step) => {
          const done = step.id < currentStep;
          const active = step.id === currentStep;
          const Icon = step.icon;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => done && onGoTo(step.id)}
              className={cn("relative z-10 flex flex-col items-center gap-2", done ? "cursor-pointer" : "cursor-default")}
            >
              <motion.div
                animate={{ scale: active ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center ring-4 transition-colors duration-200",
                  done ? "bg-brand-600 ring-brand-100 text-white"
                    : active ? "bg-brand-600 ring-brand-100 text-white shadow-md shadow-brand-400/30"
                      : "bg-white ring-white text-slate-300 border border-slate-200"
                )}
              >
                {done
                  ? <Check size={13} strokeWidth={3} />
                  : <Icon size={13} strokeWidth={active ? 2.5 : 1.8} />
                }
              </motion.div>
              <span className={cn(
                "hidden md:block text-[10.5px] font-semibold tracking-wide whitespace-nowrap transition-colors",
                active ? "text-brand-600" : done ? "text-slate-500" : "text-slate-300"
              )}>
                {step.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────
export function EligibilityForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, control, handleSubmit, watch, setValue, trigger, formState: { errors } } = useForm({
    resolver: zodResolver(eligibilitySchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneCountryCode: "+92",
      phone: "",
      nationality: "",
      currentCountry: "",
      visaType: "",
      targetCountry: "",
      purposeOfVisit: "",
      intendedDuration: "",
      occupation: "",
      employmentStatus: "",
      annualIncome: "",
      yearsExperience: "",
      passportExpiry: "",
      refusalDetails: "",
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

  const w = watch();

  const goNext = async () => {
    const valid = await trigger(STEPS[currentStep - 1].fields);
    if (valid) setCurrentStep((s) => Math.min(s + 1, STEPS.length));
  };
  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 2000));
      console.log("Form data:", data);
      setIsSubmitted(true);
      toast.success("Application submitted! We'll be in touch within 24 hours.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto text-center py-20 px-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-500/30">
          <CheckCircle2 size={36} className="text-white" />
        </div>
        <h2 className="text-2xl font-display font-bold text-slate-900 mb-3">Application Received</h2>
        <p className="text-slate-500 leading-relaxed">
          Our team will review your profile and reach out within <strong className="text-slate-700 font-semibold">24 hours</strong>.
        </p>
      </motion.div>
    );
  }

  const StepIcon = STEPS[currentStep - 1].icon;

  return (
    <div className="max-w-3xl mx-auto">
      <StepBar currentStep={currentStep} totalSteps={STEPS.length} onGoTo={setCurrentStep} />

      {/* Card — `layout` prop animates height changes smoothly */}
      <motion.div
        layout
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="card relative overflow-hidden p-0 hover:transform-none hover:shadow-[var(--shadow-card)]"
      >

        <div className="px-8 pt-8 pb-6">
          {/* Step header */}
          <motion.div layout className="mb-6">
            <h2 className="text-base font-semibold text-slate-900 leading-tight">
              {STEPS[currentStep - 1].title}
            </h2>
            <p className="text-slate-400 text-sm mt-0.5">{STEPS[currentStep - 1].description}</p>
          </motion.div>

          {/* Animated step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >

              {/* ── Step 1 ── */}
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

                  {/* Phone — no flags, code + country abbreviation only */}
                  <PhoneInput control={control} errors={errors} />

                  <FormField label="Nationality" error={errors.nationality?.message} required>
                    <FormSelect control={control} name="nationality" placeholder="Select nationality…" options={COUNTRIES} error={errors.nationality?.message} />
                  </FormField>
                  <FormField label="Current Country" error={errors.currentCountry?.message} required>
                    <FormSelect control={control} name="currentCountry" placeholder="Select country…" options={COUNTRIES} error={errors.currentCountry?.message} />
                  </FormField>
                </div>
              )}

              {/* ── Step 2 ── */}
              {currentStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField label="Visa Type" error={errors.visaType?.message} required>
                    <FormSelect control={control} name="visaType" placeholder="Select visa type…" options={VISA_TYPES} error={errors.visaType?.message} />
                  </FormField>
                  <FormField label="Target Country" error={errors.targetCountry?.message} required>
                    <FormSelect control={control} name="targetCountry" placeholder="Select country…" options={COUNTRIES} error={errors.targetCountry?.message} />
                  </FormField>
                  <FormField label="Intended Duration" error={errors.intendedDuration?.message} required>
                    <FormSelect control={control} name="intendedDuration" placeholder="Select duration…" options={DURATION_OPTIONS} error={errors.intendedDuration?.message} />
                  </FormField>
                  <div className="md:col-span-2">
                    <FormField label="Purpose of Visit" error={errors.purposeOfVisit?.message} required>
                      <Textarea placeholder="Briefly describe your purpose of visit…" rows={3} className={cn(errors.purposeOfVisit && "border-red-400")} {...register("purposeOfVisit")} />
                    </FormField>
                  </div>
                </div>
              )}

              {/* ── Step 3 ── */}
              {currentStep === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField label="Current Occupation" error={errors.occupation?.message} required>
                    <Input placeholder="e.g. Software Engineer" {...register("occupation")} />
                  </FormField>
                  <FormField label="Employment Status" error={errors.employmentStatus?.message} required>
                    <FormSelect control={control} name="employmentStatus" placeholder="Select status…" options={EMPLOYMENT_STATUSES} error={errors.employmentStatus?.message} />
                  </FormField>
                  <FormField label="Annual Income" error={errors.annualIncome?.message} required>
                    <FormSelect control={control} name="annualIncome" placeholder="Select range…" options={INCOME_RANGES} error={errors.annualIncome?.message} />
                  </FormField>
                  <FormField label="Years of Experience" error={errors.yearsExperience?.message} required>
                    <FormSelect control={control} name="yearsExperience" placeholder="Select experience…" options={EXPERIENCE_LEVELS} error={errors.yearsExperience?.message} />
                  </FormField>
                </div>
              )}

              {/* ── Step 4 ── */}
              {currentStep === 4 && (
                <div className="space-y-3">
                  <p className="text-sm text-slate-400 mb-4">Indicate which documents you currently have available:</p>
                  <CheckboxField id="hasPassport" label="Valid Passport" checked={w.hasPassport} onChange={(v) => setValue("hasPassport", v)} description="Passport valid for at least 6 months beyond intended stay" />
                  <AnimatePresence>
                    {w.hasPassport && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="ml-6 overflow-hidden">
                        <FormField label="Passport Expiry Date">
                          <DateInput control={control} name="passportExpiry" />
                        </FormField>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <CheckboxField id="hasBankStatements" label="Bank Statements" checked={w.hasBankStatements} onChange={(v) => setValue("hasBankStatements", v)} description="3–6 months of bank statements showing sufficient funds" />
                  <CheckboxField id="hasEmploymentLetter" label="Employment Letter" checked={w.hasEmploymentLetter} onChange={(v) => setValue("hasEmploymentLetter", v)} description="Letter from employer confirming position, salary, and duration" />
                </div>
              )}

              {/* ── Step 5 ── */}
              {currentStep === 5 && (
                <div className="space-y-3">
                  <CheckboxField id="previousVisaRefusals" label="I have had previous visa refusals" checked={w.previousVisaRefusals} onChange={(v) => setValue("previousVisaRefusals", v)} description="Have you ever been refused a visa for any country?" />
                  <AnimatePresence>
                    {w.previousVisaRefusals && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="ml-6 overflow-hidden">
                        <FormField label="Please provide details">
                          <Textarea rows={3} placeholder="Which country, when, and reason if known…" {...register("refusalDetails")} />
                        </FormField>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="pt-1 space-y-3">
                    <CheckboxField id="agreeToTerms" label="I agree to the Terms of Service" checked={w.agreeToTerms} onChange={(v) => setValue("agreeToTerms", v)} />
                    <FieldError message={errors.agreeToTerms?.message} />
                    <CheckboxField id="agreeToPrivacy" label="I agree to the Privacy Policy" checked={w.agreeToPrivacy} onChange={(v) => setValue("agreeToPrivacy", v)} />
                    <FieldError message={errors.agreeToPrivacy?.message} />
                    <CheckboxField id="subscribeToUpdates" label="Subscribe to visa updates and news" checked={w.subscribeToUpdates} onChange={(v) => setValue("subscribeToUpdates", v)} description="Optional — we'll keep you informed about relevant visa changes" />
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer nav */}
        <motion.div layout className="flex items-center justify-between px-8 py-5 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
          <button
            type="button"
            onClick={goPrev}
            className={cn(
              "btn btn-ghost text-sm px-5 py-2.5 gap-2",
              currentStep === 1 && "invisible pointer-events-none"
            )}
          >
            <ChevronLeft size={16} /> Back
          </button>

          {currentStep < STEPS.length ? (
            <button type="button" onClick={goNext} className="btn btn-primary text-sm px-7 py-2.5">
              Continue <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="btn btn-primary text-sm px-7 py-2.5 min-w-[10.5rem] justify-center disabled:opacity-60 disabled:pointer-events-none"
            >
              {isSubmitting
                ? <><Loader2 size={16} className="animate-spin" /> Submitting…</>
                : <><CheckCircle2 size={16} /> Submit Application</>
              }
            </button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}