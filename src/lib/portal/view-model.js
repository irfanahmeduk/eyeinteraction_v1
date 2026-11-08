import {
  ACHIEVEMENTS,
  AMBITIONS,
  CHAPTERS,
  ENVIRONMENTS,
  EXPERIENCE,
  RECOGNITION,
  ROLES,
  chapterSummaries,
  find,
} from "@/components/verixa/blueprint-data";

/** Turns stored user data into what the dashboard displays. */
export function buildViewModel(user) {
  const a = user.answers || {};
  const summaries = chapterSummaries(a);

  const blueprint = {
    complete: summaries.every(Boolean),
    chapters: CHAPTERS.map((c, i) => ({ ...c, summary: summaries[i] })),
    answers: [
      { chapter: 1, question: "Role", value: find(ROLES, a.role)?.label },
      { chapter: 1, question: "Experience in digital technology", value: find(EXPERIENCE, a.experience)?.label },
      { chapter: 1, question: "Where you made most contributions", value: find(ENVIRONMENTS, a.environment)?.label },
      { chapter: 2, question: "Achievement that best shows your impact", value: find(ACHIEVEMENTS, a.achievement)?.label },
      {
        chapter: 3,
        question: "Recognition beyond your team",
        value: (a.recognition || []).map((id) => find(RECOGNITION, id)?.label).filter(Boolean).join(" · "),
      },
      { chapter: 4, question: "What you want to achieve in the UK", value: find(AMBITIONS, a.ambition)?.label },
    ],
  };

  const profileFields = [
    { key: "phone", label: "Phone number" },
    { key: "country", label: "Country of residence" },
    { key: "city", label: "City" },
    { key: "nationality", label: "Nationality" },
    { key: "jobTitle", label: "Current job title" },
    { key: "company", label: "Current company" },
    { key: "linkedin", label: "LinkedIn profile" },
  ].map((f) => ({ ...f, value: user.profile?.[f.key] || "" }));
  const filled = profileFields.filter((f) => f.value).length;

  const steps = [
    { label: "Create your account", detail: "Signed in with Google", done: true },
    { label: "Complete your Career Blueprint", detail: "4 of 4 chapters", done: blueprint.complete },
    { label: "Add your personal details", detail: `${filled} of ${profileFields.length} added`, done: filled === profileFields.length, href: "/dashboard/profile" },
    { label: "Upload your CV", detail: user.cv ? user.cv.fileName : "PDF or Word, up to 5 MB", done: Boolean(user.cv) },
    { label: "Receive your Verixa evaluation", detail: "Sent to your email", done: user.evaluation?.status === "ready" },
  ];
  // Weighted: account + blueprint count most; personal details count proportionally.
  const completeness = Math.round(
    20 + (blueprint.complete ? 30 : 0) + (filled / profileFields.length) * 20 + (user.cv ? 20 : 0) + (user.evaluation?.status === "ready" ? 10 : 0),
  );

  return { google: user.google, blueprint, profileFields, filled, steps, completeness };
}

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
