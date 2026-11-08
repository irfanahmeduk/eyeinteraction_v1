// Questions and answer options for the Verixa "Career Blueprint" questionnaire.
// Source: Figma "Verixa Final Design 2026", frames "QUestionnaire screen 1-8".
//
// `label`   - text on the answer card
// `chip`    - text shown in the "Current chapter" list on the left
// `summary` - phrase used to build the chapter summaries (left panel + final screen)
// `w`       - text box width in the design, so long labels wrap like in Figma

export const CHAPTERS = [
  { number: 1, title: "Discover Your Professional Identity", short: "Professional Identity" },
  { number: 2, title: "Discover Your Real-World Impact", short: "Real-World Impact" },
  { number: 3, title: "Explore Your Recognition & Evidence", short: "Recognition & Evidence" },
  { number: 4, title: "Define Your Future Direction", short: "Future Direction" },
];

export const ROLES = [
  { id: "software", label: "Software Engineer / Developer", summary: "Software Engineer", w: 163 },
  { id: "ai-data", label: "AI / Data Professional", summary: "AI / Data Professional", w: 185 },
  { id: "security", label: "Cybersecurity / Infrastructure Professional", summary: "Cybersecurity / Infrastructure Professional", w: 207 },
  { id: "product", label: "Product / Business Professional", summary: "Product / Business Professional", w: 163 },
  { id: "founder", label: "Startup Founder / Entrepreneur", summary: "Startup Founder", w: 163 },
  { id: "other", label: "Other / Still Exploring", summary: "Digital technology professional", w: 163 },
];

export const EXPERIENCE = [
  { id: "lt2", label: "Less than 2 years", chip: "Less than 2 Years Experience", summary: "less than 2 years" },
  { id: "2-5", label: "2–5 years", chip: "2-5 Years Experience", summary: "2–5 years" },
  { id: "6-10", label: "6–10 years", chip: "6-10 Years Experience", summary: "6–10 years" },
  { id: "gt10", label: "More than 10 years", chip: "10+ Years Experience", summary: "more than 10 years" },
];

export const ENVIRONMENTS = [
  { id: "product-led", label: "An established product-led technology company", chip: "Experience at a product-led technology company", short: "Product-led company", summary: "at Product-led company" },
  { id: "own-startup", label: "My own technology startup", chip: "Experience at my own technology startup", short: "Own startup", summary: "at own technology startup" },
  { id: "early-stage", label: "An early-stage technology company", chip: "Experience at an early-stage technology company", short: "Early-stage company", summary: "at early-stage company" },
  { id: "research", label: "A research or innovation organization", chip: "Experience at a research or innovation organization", short: "Research organization", summary: "at research organization" },
  { id: "consulting", label: "A consulting or service-based organization", chip: "Experience at a consulting or service-based organization", short: "Consulting organization", summary: "at consulting organization" },
  { id: "combination", label: "A combination of different environments", chip: "Experience across different environments", short: "Mixed environments", summary: "across different environments" },
];

export const ACHIEVEMENTS = [
  { id: "built-product", label: "Built or significantly improved a digital product", chip: "Built / improved a digital product", summary: "Built / improved a digital product that resulted in product adoption" },
  { id: "innovation", label: "Introduced an innovative technical solution", chip: "Introduced an innovative technical solution", summary: "Introduced an innovative technical solution" },
  { id: "growth", label: "Helped a product or company achieve substantial growth", chip: "Helped a product or company grow", summary: "Helped a product or company achieve substantial growth" },
  { id: "led-project", label: "Led an important technology project or initiative", chip: "Led an important technology project", summary: "Led an important technology project or initiative" },
  { id: "research", label: "Contributed to meaningful research or innovation", chip: "Contributed to research or innovation", summary: "Contributed to meaningful research or innovation" },
  { id: "developing", label: "I'm still developing my standout achievements", chip: "Still developing standout achievements", summary: "Still developing standout achievements" },
];

export const RECOGNITION_NONE = "none";

export const RECOGNITION = [
  { id: "awards", label: "Industry awards or professional distinctions", chip: "Received Industry awards / professional distinctions", summary: "industry awards", w: 174 },
  { id: "media", label: "Media coverage or publications featuring my work", chip: "Media coverage or publications", summary: "media coverage", w: 185 },
  { id: "speaking", label: "Invitations to speak at professional conferences", chip: "Invited to speak at conferences", summary: "speaking invitations", w: 168 },
  { id: "experts", label: "Recognition from established industry experts", chip: "Recognized by industry experts", summary: "recognition from experts", w: 163 },
  { id: "judging", label: "Invitations to judge or review professional work", chip: "Invited to judge or review work", summary: "judging invitations", w: 172 },
  { id: "independent", label: "Other independent professional recognition", chip: "Other independent recognition", summary: "independent recognition", w: 183 },
  { id: RECOGNITION_NONE, label: "Not yet / I'm unsure", chip: "Not yet / unsure", summary: "", w: 163 },
];

export const AMBITIONS = [
  { id: "lead-products", label: "Build or lead innovative digital products", chip: "Build / lead innovative digital products", summary: "build and lead innovative digital products in the UK.", image: "default", w: 174 },
  { id: "business", label: "Start or expand a technology business", chip: "Start or expand a technology business", summary: "start or expand a technology business in the UK.", image: "business", w: 174 },
  { id: "research", label: "Contribute to research and technology development", chip: "Contribute to research and technology", summary: "contribute to research and technology development in the UK.", image: "default", w: 177 },
  { id: "career", label: "Grow my professional career in the UK", chip: "Grow my professional career in the UK", summary: "grow a professional career in the UK.", image: "default", w: 174 },
  { id: "explore", label: "Explore opportunities and plan my next steps", chip: "Explore opportunities and next steps", summary: "explore opportunities and plan next steps in the UK.", image: "default", w: 174 },
  { id: "considering", label: "I'm still considering my options", chip: "Still considering my options", summary: "Still considering future options in the UK.", image: null, w: 163 },
];

export const find = (list, id) => list.find((item) => item.id === id);

function joinList(items) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** One-line summary per chapter, used in the left panel and on the final screen. */
export function chapterSummaries(answers) {
  const role = find(ROLES, answers.role);
  const experience = find(EXPERIENCE, answers.experience);
  const environment = find(ENVIRONMENTS, answers.environment);
  const achievement = find(ACHIEVEMENTS, answers.achievement);
  const ambition = find(AMBITIONS, answers.ambition);
  const recognition = (answers.recognition || [])
    .filter((id) => id !== RECOGNITION_NONE)
    .map((id) => find(RECOGNITION, id)?.summary)
    .filter(Boolean);

  const identity =
    role && experience && environment
      ? `${role.summary} with ${experience.summary} experience ${environment.summary}`
      : "";

  let recognitionText = "";
  if ((answers.recognition || []).includes(RECOGNITION_NONE)) {
    recognitionText = "Building independent recognition for professional achievements.";
  } else if (recognition.length) {
    recognitionText = `Recognized through ${joinList(recognition)}.`;
  }

  let ambitionText = "";
  if (ambition) {
    ambitionText = ambition.id === "considering" ? ambition.summary : `Aspires to ${ambition.summary}`;
  }

  return [identity, achievement?.summary || "", recognitionText, ambitionText];
}
