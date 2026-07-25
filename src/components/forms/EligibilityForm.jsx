"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Loader2,
  Check,
  User,
  FileText,
  Briefcase,
  Award,
  CalendarCheck,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FormSelect } from "@/components/forms/FormSelect";

// ── Validation Schema ────────────────────────────────────────
const eligibilitySchema = z.object({
  "Email Address": z.string().email("Enter a valid email address"),
  Contact: z.string().min(2, "Full name is required"),
  "Phone Number (with country code)": z.string().min(6, "Phone number is required"),
  phoneCountryCode: z.string().min(1, "Select country code"),
  Country: z.string().min(1, "Please select current country"),
  Nationality: z.string().min(1, "Please select nationality"),

  "Why are you considering a Global Talent Visa? (Select all that apply)": z
    .array(z.string())
    .min(1, "Select at least one reason"),
  "Have you applied for any visa to this country before?": z.string().min(1, "Please make a selection"),
  "If yes, please describe the visa type and outcome.": z.string().optional(),
  "Preferred Endorsement": z.string().optional(),

  "Current Job Title": z.string().min(2, "Job title is required"),
  "Industry/Sector (e.g., Software, Design, Research, Media, etc.)": z.string().min(2, "Industry is required"),
  linkedin_profile: z.string().min(3, "LinkedIn or portfolio URL is required"),
  "Years of Professional Experience": z.string().min(1, "Select years of experience"),
  "What is your highest academic qualification?": z.string().min(1, "Select qualification"),

  "Have you received any awards, honors, or recognitions in your field?": z.string().min(1, "Select Yes or No"),
  "If yes, Please describe your awards or recognitions (Short answer)": z.string().optional(),
  "Have you been featured in any media, press, or published articles?": z.string().min(1, "Select Yes or No"),
  "If yes,  Provide links or details of media features/publications": z.string().optional(),
  "Have you made any public presentations, keynote speeches, or panel contributions?": z.string().min(1, "Select Yes or No"),
  "If yes,  Briefly describe where and when you presented.": z.string().optional(),
  "Are you involved in any open-source projects, startups, or innovation-driven work?": z.string().min(1, "Select Yes or No"),
  "If yes,  Describe your role and achievements in that work.": z.string().optional(),
  "Do you currently have any international clients or collaborations?": z.string().min(1, "Select Yes or No"),
  "Describe the international work or clients you’ve been involved with.": z.string().optional(),

  "When are you planning to apply for the Global Talent Visa?": z.string().min(1, "Select timeline"),
  "Have you already prepared any documents for a Global Talent Visa application?": z.string().min(1, "Select Yes or No"),
  "If yes, Please list any documents you've already prepared (e.g., reference letters, CV, evidence)": z.string().optional(),
  "Any questions or comments you'd like to share? (Optional)": z.string().optional(),
  "Do you consent to us contacting you via WhatsApp or email for the next steps?": z.string().min(1, "Consent is required"),
});

// ── Form Steps Configuration ────────────────────────────────
const STEPS = [
  {
    id: 1,
    title: "Personal Details",
    description: "Contact information and residence",
    icon: User,
    fields: ["Email Address", "Contact", "Phone Number (with country code)", "Country", "Nationality"],
  },
  {
    id: 2,
    title: "Visa & Motivation",
    description: "Your reasons and visa history",
    icon: FileText,
    fields: [
      "Why are you considering a Global Talent Visa? (Select all that apply)",
      "Have you applied for any visa to this country before?",
      "Preferred Endorsement",
    ],
  },
  {
    id: 3,
    title: "Professional Profile",
    description: "Job title, experience & qualifications",
    icon: Briefcase,
    fields: [
      "Current Job Title",
      "Industry/Sector (e.g., Software, Design, Research, Media, etc.)",
      "linkedin_profile",
      "Years of Professional Experience",
      "What is your highest academic qualification?",
    ],
  },
  {
    id: 4,
    title: "Talent & Evidence",
    description: "Awards, press, keynotes & international work",
    icon: Award,
    fields: [
      "Have you received any awards, honors, or recognitions in your field?",
      "Have you been featured in any media, press, or published articles?",
      "Have you made any public presentations, keynote speeches, or panel contributions?",
      "Are you involved in any open-source projects, startups, or innovation-driven work?",
      "Do you currently have any international clients or collaborations?",
    ],
  },
  {
    id: 5,
    title: "Timeline & Consent",
    description: "Application timeline and contact permission",
    icon: CalendarCheck,
    fields: [
      "When are you planning to apply for the Global Talent Visa?",
      "Have you already prepared any documents for a Global Talent Visa application?",
      "Do you consent to us contacting you via WhatsApp or email for the next steps?",
    ],
  },
];

const COUNTRIES = [
  "United Kingdom", "United States", "Canada", "Australia", "Germany", "France", "Netherlands",
  "UAE", "Pakistan", "India", "Nigeria", "Bangladesh", "China", "Brazil", "South Africa", "Other"
];

const REASONS = [
  "Avoid Studying Abroad",
  "Faster PR or immigration path",
  "Work and live freely in UK",
  "Other"
];

const ENDORSEMENT_BODIES = [
  "Tech Nation (Digital Technology)",
  "Royal Society (Science & Medicine)",
  "Royal Academy of Engineering (Engineering)",
  "British Academy (Humanities & Social Sciences)",
  "Arts Council England (Arts, Culture & Fashion)",
  "Not Sure / Need Guidance"
];

const EXPERIENCE_OPTIONS = ["Less than 3 years", "3–5 years", "6–10 years", "10+ years"];
const QUALIFICATION_OPTIONS = ["High school diploma", "Bachelor's degree", "Master’s degree", "PhD", "Other"];
const TIMELINE_OPTIONS = ["Immediately", "Within 3 months", "3–6 months", "6+ months", "Just exploring options"];

const PHONE_CODES = [
  { code: "+44", label: "+44  UK" },
  { code: "+1", label: "+1   US" },
  { code: "+92", label: "+92  PK" },
  { code: "+91", label: "+91  IN" },
  { code: "+971", label: "+971 UAE" },
  { code: "+234", label: "+234 NG" },
  { code: "+61", label: "+61  AU" },
  { code: "+49", label: "+49  DE" },
];

function FieldError({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: "auto", marginTop: 6 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.15 }}
          className="text-xs text-red-500 flex items-center gap-1.5 overflow-hidden font-medium"
        >
          <span className="w-3.5 h-3.5 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-[9px] font-bold shrink-0">!</span>
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function FormField({ label, error, required, children, description }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {description && <p className="text-xs text-slate-400 leading-snug">{description}</p>}
      {children}
      <FieldError message={error} />
    </div>
  );
}

function PhoneInput({ control, errors }) {
  const hasError = !!errors["Phone Number (with country code)"]?.message;

  return (
    <FormField label="Phone Number (with country code)" error={errors["Phone Number (with country code)"]?.message} required>
      <div
        className={cn(
          "flex items-stretch w-full overflow-hidden rounded-lg",
          "border border-slate-200 bg-white transition-all duration-150",
          "focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20",
          hasError && "border-red-400 focus-within:ring-red-400/20"
        )}
      >
        <div className="w-28 shrink-0 border-r border-slate-200 bg-slate-50 relative">
          <Controller
            control={control}
            name="phoneCountryCode"
            render={({ field }) => (
              <select
                {...field}
                className="h-full w-full px-2.5 bg-transparent border-0 outline-none cursor-pointer text-xs font-semibold text-slate-700 appearance-none pr-6"
              >
                {PHONE_CODES.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.label}
                  </option>
                ))}
              </select>
            )}
          />
          <ChevronDown size={14} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        <Controller
          control={control}
          name="Phone Number (with country code)"
          render={({ field }) => (
            <input
              {...field}
              type="tel"
              placeholder="7700 900000"
              className="flex-1 min-w-0 h-11 px-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 bg-transparent"
            />
          )}
        />
      </div>
    </FormField>
  );
}

function CustomRadioGroup({ options, value, onChange, disabled }) {
  return (
    <div className="flex flex-wrap gap-2.5 pt-1">
      {options.map((opt) => {
        const isSelected = value === opt;
        return (
          <button
            key={opt}
            type="button"
            disabled={disabled}
            onClick={() => onChange(opt)}
            className={cn(
              "px-4 py-2.5 rounded-lg text-xs font-medium border transition-all text-left flex items-center gap-2",
              isSelected
                ? "border-brand-600 bg-brand-50 text-brand-700 font-semibold shadow-xs"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
            )}
          >
            <span
              className={cn(
                "w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 transition-colors",
                isSelected ? "border-brand-600 bg-brand-600" : "border-slate-300"
              )}
            >
              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
            </span>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function YesNoRadio({ value, onChange, disabled }) {
  return <CustomRadioGroup options={["Yes", "No"]} value={value} onChange={onChange} disabled={disabled} />;
}

// ── Step progress bar ────────────────────────────────────────
function StepBar({ currentStep, totalSteps, onGoTo }) {
  const pct = Math.round((currentStep / totalSteps) * 100);
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-xs text-slate-500 font-medium">
          Step <strong className="text-slate-800 font-bold">{currentStep}</strong> of {totalSteps}
        </span>
        <span className="text-xs font-bold text-brand-600">{pct}% Complete</span>
      </div>

      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-5">
        <motion.div
          className="h-full rounded-full bg-gradient-blue"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

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
                  done
                    ? "bg-brand-600 ring-brand-100 text-white"
                    : active
                    ? "bg-brand-600 ring-brand-100 text-white shadow-md shadow-brand-400/30"
                    : "bg-white ring-white text-slate-300 border border-slate-200"
                )}
              >
                {done ? <Check size={13} strokeWidth={3} /> : <Icon size={13} strokeWidth={active ? 2.5 : 1.8} />}
              </motion.div>
              <span
                className={cn(
                  "hidden md:block text-[10.5px] font-semibold tracking-wide whitespace-nowrap transition-colors",
                  active ? "text-brand-600" : done ? "text-slate-500" : "text-slate-300"
                )}
              >
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

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(eligibilitySchema),
    defaultValues: {
      "Email Address": "",
      Contact: "",
      "Phone Number (with country code)": "",
      phoneCountryCode: "+44",
      Country: "",
      Nationality: "",
      "Why are you considering a Global Talent Visa? (Select all that apply)": [],
      "Have you applied for any visa to this country before?": "",
      "If yes, please describe the visa type and outcome.": "",
      "Preferred Endorsement": "",
      "Current Job Title": "",
      "Industry/Sector (e.g., Software, Design, Research, Media, etc.)": "",
      linkedin_profile: "",
      "Years of Professional Experience": "",
      "What is your highest academic qualification?": "",
      "Have you received any awards, honors, or recognitions in your field?": "",
      "If yes, Please describe your awards or recognitions (Short answer)": "",
      "Have you been featured in any media, press, or published articles?": "",
      "If yes,  Provide links or details of media features/publications": "",
      "Have you made any public presentations, keynote speeches, or panel contributions?": "",
      "If yes,  Briefly describe where and when you presented.": "",
      "Are you involved in any open-source projects, startups, or innovation-driven work?": "",
      "If yes,  Describe your role and achievements in that work.": "",
      "Do you currently have any international clients or collaborations?": "",
      "Describe the international work or clients you’ve been involved with.": "",
      "When are you planning to apply for the Global Talent Visa?": "",
      "Have you already prepared any documents for a Global Talent Visa application?": "",
      "If yes, Please list any documents you've already prepared (e.g., reference letters, CV, evidence)": "",
      "Any questions or comments you'd like to share? (Optional)": "",
      "Do you consent to us contacting you via WhatsApp or email for the next steps?": "",
    },
    mode: "onChange",
  });

  const w = watch();

  const handleReasonToggle = (reason) => {
    const current = w["Why are you considering a Global Talent Visa? (Select all that apply)"] || [];
    const next = current.includes(reason)
      ? current.filter((r) => r !== reason)
      : [...current, reason];
    setValue("Why are you considering a Global Talent Visa? (Select all that apply)", next, { shouldValidate: true });
  };

  const goNext = async () => {
    const currentFields = STEPS[currentStep - 1].fields;
    const valid = await trigger(currentFields);
    if (valid) {
      setCurrentStep((s) => Math.min(s + 1, STEPS.length));
    } else {
      toast.error("Please fill in all required fields marked with *");
    }
  };

  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const fullPhone = `${data.phoneCountryCode} ${data["Phone Number (with country code)"]}`;
      const payload = {
        ...data,
        "Phone Number (with country code)": fullPhone,
      };

      const response = await axios.post("/api/eligibility", payload);

      if (response.data.success && response.data.sheetSaved) {
        setIsSubmitted(true);
        toast.success("Eligibility assessment submitted successfully!");
      } else {
        toast.error("Failed to submit assessment.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto card p-8 text-center bg-white rounded-2xl shadow-xl border border-slate-100"
      >
        <div className="w-20 h-20 rounded-2xl bg-gradient-blue flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-500/20 text-white">
          <CheckCircle2 size={40} />
        </div>

        <h2 className="text-2xl font-display font-bold text-slate-900 mb-3">
          Assessment Received!
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          Thank you for completing your UK Global Talent Visa eligibility check. Our visa specialists are currently evaluating your profile details.
        </p>

        <div className="p-5 rounded-xl bg-brand-50/70 border border-brand-100 text-left mb-8 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Next Recommended Step</p>
          <h4 className="text-sm font-semibold text-slate-900">
            Book your 1-on-1 Consultation Session
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Reserve a 1-on-1 Zoom meeting with our senior Global Talent Visa advisor to discuss your endorsement pathway and evidence strategy.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://calendly.com/noor-eyeinteraction/uk-global-talent-visa-consultation-1-1-zoom-meeting"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary text-sm px-7 py-3 w-full sm:w-auto inline-flex items-center justify-center gap-2"
          >
            Book Your Session Now <ExternalLink size={15} />
          </a>
        </div>
      </motion.div>
    );
  }

  const StepIcon = STEPS[currentStep - 1].icon;

  return (
    <div className="max-w-3xl mx-auto">
      <StepBar currentStep={currentStep} totalSteps={STEPS.length} onGoTo={setCurrentStep} />

      <motion.div
        layout
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="card relative overflow-hidden p-0 hover:transform-none hover:shadow-[var(--shadow-card)]"
      >
        <div className="px-7 pt-8 pb-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0">
              <StepIcon size={18} className="text-brand-600" />
            </div>
            <div>
              <h2 className="text-base font-display font-bold text-slate-900 leading-tight">
                {STEPS[currentStep - 1].title}
              </h2>
              <p className="text-xs text-slate-400">{STEPS[currentStep - 1].description}</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {/* ── STEP 1 ── */}
              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField label="Full Name" error={errors.Contact?.message} required>
                    <Input placeholder="Your Full Name" {...register("Contact")} />
                  </FormField>

                  <FormField label="Email Address" error={errors["Email Address"]?.message} required>
                    <Input type="email" placeholder="name@example.com" {...register("Email Address")} />
                  </FormField>

                  <PhoneInput control={control} errors={errors} />

                  <FormField label="Current Country of Residence" error={errors.Country?.message} required>
                    <FormSelect
                      control={control}
                      name="Country"
                      placeholder="Select country..."
                      options={COUNTRIES}
                      error={errors.Country?.message}
                    />
                  </FormField>

                  <FormField label="Nationality" error={errors.Nationality?.message} required>
                    <FormSelect
                      control={control}
                      name="Nationality"
                      placeholder="Select nationality..."
                      options={COUNTRIES}
                      error={errors.Nationality?.message}
                    />
                  </FormField>
                </div>
              )}

              {/* ── STEP 2 ── */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <FormField
                    label="Why are you considering a Global Talent Visa? (Select all that apply)"
                    error={errors["Why are you considering a Global Talent Visa? (Select all that apply)"]?.message}
                    required
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {REASONS.map((reason) => {
                        const checked = (
                          w["Why are you considering a Global Talent Visa? (Select all that apply)"] || []
                        ).includes(reason);
                        return (
                          <label
                            key={reason}
                            onClick={() => handleReasonToggle(reason)}
                            className={cn(
                              "flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-all text-xs font-medium select-none",
                              checked
                                ? "border-brand-600 bg-brand-50/70 text-brand-900"
                                : "border-slate-200 hover:border-slate-300 bg-white text-slate-700"
                            )}
                          >
                            <Checkbox checked={checked} onCheckedChange={() => handleReasonToggle(reason)} />
                            <span>{reason}</span>
                          </label>
                        );
                      })}
                    </div>
                  </FormField>

                  <FormField
                    label="Have you applied for any visa to this country before?"
                    error={errors["Have you applied for any visa to this country before?"]?.message}
                    required
                  >
                    <Controller
                      control={control}
                      name="Have you applied for any visa to this country before?"
                      render={({ field }) => (
                        <YesNoRadio value={field.value} onChange={field.onChange} disabled={isSubmitting} />
                      )}
                    />
                  </FormField>

                  {w["Have you applied for any visa to this country before?"] === "Yes" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                      <FormField label="If yes, please describe the visa type and outcome.">
                        <Input
                          placeholder="e.g. Skilled Worker Visa - Granted / Refused in 2022"
                          {...register("If yes, please describe the visa type and outcome.")}
                        />
                      </FormField>
                    </motion.div>
                  )}

                  <FormField label="Preferred Endorsement Body (Optional)">
                    <FormSelect
                      control={control}
                      name="Preferred Endorsement"
                      placeholder="Select endorsement body if known..."
                      options={ENDORSEMENT_BODIES}
                    />
                  </FormField>
                </div>
              )}

              {/* ── STEP 3 ── */}
              {currentStep === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField label="Current Job Title" error={errors["Current Job Title"]?.message} required>
                    <Input placeholder="e.g. Senior Software Engineer / Lead Designer" {...register("Current Job Title")} />
                  </FormField>

                  <FormField
                    label="Industry/Sector"
                    description="e.g., Software, Design, Research, Media, FinTech"
                    error={errors["Industry/Sector (e.g., Software, Design, Research, Media, etc.)"]?.message}
                    required
                  >
                    <Input
                      placeholder="Your industry or sector"
                      {...register("Industry/Sector (e.g., Software, Design, Research, Media, etc.)")}
                    />
                  </FormField>

                  <div className="md:col-span-2">
                    <FormField
                      label="LinkedIn Profile URL or Portfolio Website"
                      error={errors.linkedin_profile?.message}
                      required
                    >
                      <Input placeholder="https://linkedin.com/in/yourprofile" {...register("linkedin_profile")} />
                    </FormField>
                  </div>

                  <div className="md:col-span-2">
                    <FormField
                      label="Years of Professional Experience"
                      error={errors["Years of Professional Experience"]?.message}
                      required
                    >
                      <Controller
                        control={control}
                        name="Years of Professional Experience"
                        render={({ field }) => (
                          <CustomRadioGroup
                            options={EXPERIENCE_OPTIONS}
                            value={field.value}
                            onChange={field.onChange}
                            disabled={isSubmitting}
                          />
                        )}
                      />
                    </FormField>
                  </div>

                  <div className="md:col-span-2">
                    <FormField
                      label="What is your highest academic qualification?"
                      error={errors["What is your highest academic qualification?"]?.message}
                      required
                    >
                      <Controller
                        control={control}
                        name="What is your highest academic qualification?"
                        render={({ field }) => (
                          <CustomRadioGroup
                            options={QUALIFICATION_OPTIONS}
                            value={field.value}
                            onChange={field.onChange}
                            disabled={isSubmitting}
                          />
                        )}
                      />
                    </FormField>
                  </div>
                </div>
              )}

              {/* ── STEP 4 ── */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  {/* Awards */}
                  <div>
                    <FormField
                      label="Have you received any awards, honors, or recognitions in your field?"
                      error={errors["Have you received any awards, honors, or recognitions in your field?"]?.message}
                      required
                    >
                      <Controller
                        control={control}
                        name="Have you received any awards, honors, or recognitions in your field?"
                        render={({ field }) => <YesNoRadio value={field.value} onChange={field.onChange} />}
                      />
                    </FormField>
                    {w["Have you received any awards, honors, or recognitions in your field?"] === "Yes" && (
                      <div className="mt-3">
                        <Input
                          placeholder="Briefly describe your awards or recognitions..."
                          {...register("If yes, Please describe your awards or recognitions (Short answer)")}
                        />
                      </div>
                    )}
                  </div>

                  {/* Media */}
                  <div>
                    <FormField
                      label="Have you been featured in any media, press, or published articles?"
                      error={errors["Have you been featured in any media, press, or published articles?"]?.message}
                      required
                    >
                      <Controller
                        control={control}
                        name="Have you been featured in any media, press, or published articles?"
                        render={({ field }) => <YesNoRadio value={field.value} onChange={field.onChange} />}
                      />
                    </FormField>
                    {w["Have you been featured in any media, press, or published articles?"] === "Yes" && (
                      <div className="mt-3">
                        <Input
                          placeholder="Provide links or details of media features/publications..."
                          {...register("If yes,  Provide links or details of media features/publications")}
                        />
                      </div>
                    )}
                  </div>

                  {/* Presentations */}
                  <div>
                    <FormField
                      label="Have you made any public presentations, keynote speeches, or panel contributions?"
                      error={
                        errors[
                          "Have you made any public presentations, keynote speeches, or panel contributions?"
                        ]?.message
                      }
                      required
                    >
                      <Controller
                        control={control}
                        name="Have you made any public presentations, keynote speeches, or panel contributions?"
                        render={({ field }) => <YesNoRadio value={field.value} onChange={field.onChange} />}
                      />
                    </FormField>
                    {w[
                      "Have you made any public presentations, keynote speeches, or panel contributions?"
                    ] === "Yes" && (
                      <div className="mt-3">
                        <Input
                          placeholder="Briefly describe where and when you presented..."
                          {...register("If yes,  Briefly describe where and when you presented.")}
                        />
                      </div>
                    )}
                  </div>

                  {/* Open source */}
                  <div>
                    <FormField
                      label="Are you involved in any open-source projects, startups, or innovation-driven work?"
                      error={
                        errors[
                          "Are you involved in any open-source projects, startups, or innovation-driven work?"
                        ]?.message
                      }
                      required
                    >
                      <Controller
                        control={control}
                        name="Are you involved in any open-source projects, startups, or innovation-driven work?"
                        render={({ field }) => <YesNoRadio value={field.value} onChange={field.onChange} />}
                      />
                    </FormField>
                    {w[
                      "Are you involved in any open-source projects, startups, or innovation-driven work?"
                    ] === "Yes" && (
                      <div className="mt-3">
                        <Input
                          placeholder="Describe your role and achievements in that work..."
                          {...register("If yes,  Describe your role and achievements in that work.")}
                        />
                      </div>
                    )}
                  </div>

                  {/* International Clients */}
                  <div>
                    <FormField
                      label="Do you currently have any international clients or collaborations?"
                      error={errors["Do you currently have any international clients or collaborations?"]?.message}
                      required
                    >
                      <Controller
                        control={control}
                        name="Do you currently have any international clients or collaborations?"
                        render={({ field }) => <YesNoRadio value={field.value} onChange={field.onChange} />}
                      />
                    </FormField>
                    {w["Do you currently have any international clients or collaborations?"] === "Yes" && (
                      <div className="mt-3">
                        <Input
                          placeholder="Describe the international work or clients you've been involved with..."
                          {...register("Describe the international work or clients you’ve been involved with.")}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── STEP 5 ── */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <FormField
                    label="When are you planning to apply for the Global Talent Visa?"
                    error={errors["When are you planning to apply for the Global Talent Visa?"]?.message}
                    required
                  >
                    <Controller
                      control={control}
                      name="When are you planning to apply for the Global Talent Visa?"
                      render={({ field }) => (
                        <CustomRadioGroup
                          options={TIMELINE_OPTIONS}
                          value={field.value}
                          onChange={field.onChange}
                          disabled={isSubmitting}
                        />
                      )}
                    />
                  </FormField>

                  <div>
                    <FormField
                      label="Have you already prepared any documents for a Global Talent Visa application?"
                      error={
                        errors[
                          "Have you already prepared any documents for a Global Talent Visa application?"
                        ]?.message
                      }
                      required
                    >
                      <Controller
                        control={control}
                        name="Have you already prepared any documents for a Global Talent Visa application?"
                        render={({ field }) => <YesNoRadio value={field.value} onChange={field.onChange} />}
                      />
                    </FormField>
                    {w["Have you already prepared any documents for a Global Talent Visa application?"] === "Yes" && (
                      <div className="mt-3">
                        <Textarea
                          rows={2}
                          placeholder="List documents prepared (e.g. Reference letters, CV, portfolio evidence)..."
                          {...register(
                            "If yes, Please list any documents you've already prepared (e.g., reference letters, CV, evidence)"
                          )}
                        />
                      </div>
                    )}
                  </div>

                  <FormField label="Any questions or comments you'd like to share? (Optional)">
                    <Textarea
                      rows={3}
                      placeholder="Feel free to share any details or specific questions..."
                      {...register("Any questions or comments you'd like to share? (Optional)")}
                    />
                  </FormField>

                  <FormField
                    label="Do you consent to us contacting you via WhatsApp or email for next steps?"
                    error={
                      errors[
                        "Do you consent to us contacting you via WhatsApp or email for the next steps?"
                      ]?.message
                    }
                    required
                  >
                    <Controller
                      control={control}
                      name="Do you consent to us contacting you via WhatsApp or email for the next steps?"
                      render={({ field }) => (
                        <CustomRadioGroup
                          options={["Yes, I consent", "No"]}
                          value={field.value}
                          onChange={field.onChange}
                          disabled={isSubmitting}
                        />
                      )}
                    />
                  </FormField>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-7 py-4 border-t border-slate-100 bg-slate-50/50">
          <button
            type="button"
            onClick={goPrev}
            className={cn(
              "btn btn-ghost text-xs px-4 py-2.5 gap-1.5",
              currentStep === 1 && "invisible pointer-events-none"
            )}
          >
            <ChevronLeft size={15} /> Back
          </button>

          {currentStep < STEPS.length ? (
            <button type="button" onClick={goNext} className="btn btn-primary text-xs px-6 py-2.5">
              Continue <ChevronRight size={15} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="btn btn-primary text-xs px-6 py-2.5 min-w-[11rem] justify-center disabled:opacity-60 disabled:pointer-events-none"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  <CheckCircle2 size={15} /> Submit Assessment
                </>
              )}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}