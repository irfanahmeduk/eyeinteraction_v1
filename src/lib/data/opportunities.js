/**
 * Destination content is kept separate from the page template so this lookup
 * can later be replaced by CMS-backed content without changing destination URLs.
 * Add local image paths to `heroImage` and each category's `image` when assets
 * are supplied. The page has inline artwork fallbacks until then.
 */
const createCategory = (slug, title, description, tone, icon) => ({
  slug,
  title,
  description,
  tone,
  icon,
  image: null,
});

export const opportunityDestinations = [
  {
    name: "United Kingdom",
    slug: "united-kingdom",
    flag: "uk",
    scene: "london",
    description:
      "Global talent, career opportunities, research, startups and professional development.",
    heroTitle: "Explore Your Opportunities In The United Kingdom",
    heroDescription:
      "Access practical guides, resources and opportunities for global talent, careers, research, innovation and professional development.",
    heroImage: null,
    stats: [
      { value: "16,500+", label: "Active Candidates", icon: "users", tone: "blue" },
      { value: "7,500+", label: "Online Video Courses", icon: "courses", tone: "red" },
    ],
    categoriesHeading: "What Would You Like To Achieve In The UK?",
    categoriesDescription:
      "Select a category below to explore tailored guides, opportunities and resources.",
    categories: [
      createCategory("global-talent", "Global Talent", "Explore the UK Global Talent route, eligibility and profile-building tips.", "blue", "certificate"),
      createCategory("jobs-careers", "Jobs & Careers", "Discover UK jobs, career guidance and CV tips.", "purple", "briefcase"),
      createCategory("research-academia", "Research & Academia", "Explore research, PhD opportunities and academic resources.", "green", "book"),
      createCategory("startups-innovation", "Startups & Innovation", "Discover startups, accelerators, funding and innovation programmes.", "amber", "bulb"),
      createCategory("build-my-profile", "Build My Profile", "Strengthen your skills, achievements and professional profile.", "pink", "profile"),
      createCategory("events-opportunities", "Events & Opportunities", "Explore UK conferences, competitions and professional opportunities.", "cyan", "events"),
    ],
  },
  {
    name: "United States",
    slug: "united-states",
    flag: "us",
    scene: "new-york",
    description: "Career opportunities, talent pathways, research, innovation and entrepreneurship.",
    heroTitle: "Explore Your Opportunities In The United States",
    heroDescription: "Explore resources for careers, research, entrepreneurship and professional growth across the United States.",
    heroImage: null,
    stats: [
      { value: "16,500+", label: "Active Candidates", icon: "users", tone: "blue" },
      { value: "7,500+", label: "Online Video Courses", icon: "courses", tone: "red" },
    ],
    categoriesHeading: "What Would You Like To Achieve In The US?",
    categoriesDescription: "Choose an area to explore useful guides, resources and opportunities.",
    categories: [
      createCategory("careers-employment", "Careers & Employment", "Explore career paths, job-search resources and professional development.", "blue", "briefcase"),
      createCategory("research-universities", "Research & Universities", "Find research, academic and higher-education resources.", "purple", "book"),
      createCategory("startups-entrepreneurship", "Startups & Entrepreneurship", "Explore startup support, innovation and founder resources.", "green", "bulb"),
      createCategory("fellowships-funding", "Fellowships & Funding", "Browse general information about fellowships, grants and funding opportunities.", "amber", "certificate"),
      createCategory("professional-profile", "Professional Profile", "Build a clear profile of your skills, work and achievements.", "pink", "profile"),
      createCategory("events-networking", "Events & Networking", "Discover conferences, professional events and networking opportunities.", "cyan", "events"),
    ],
  },
  {
    name: "Europe",
    slug: "europe",
    flag: "eu",
    scene: "venice",
    description: "Explore career, research and innovation opportunities across Europe.",
    heroTitle: "Explore Your Opportunities In Europe",
    heroDescription: "Explore resources for career mobility, research, innovation and professional development across Europe.",
    heroImage: null,
    stats: [
      { value: "16,500+", label: "Active Candidates", icon: "users", tone: "blue" },
      { value: "7,500+", label: "Online Video Courses", icon: "courses", tone: "red" },
    ],
    categoriesHeading: "What Would You Like To Achieve In Europe?",
    categoriesDescription: "Choose a category to explore relevant guides, resources and opportunities.",
    categories: [
      createCategory("career-mobility", "Career Mobility", "Explore professional opportunities and career resources across Europe.", "blue", "briefcase"),
      createCategory("research-academia", "Research & Academia", "Find research, academic and collaboration resources.", "purple", "book"),
      createCategory("innovation-startups", "Innovation & Startups", "Explore entrepreneurship, innovation and startup support.", "green", "bulb"),
      createCategory("grants-funding", "Grants & Funding", "Browse general information about grants and funding opportunities.", "amber", "certificate"),
      createCategory("professional-growth", "Professional Growth", "Strengthen your skills, profile and professional impact.", "pink", "profile"),
      createCategory("events-exchange", "Events & Exchange", "Discover conferences, networks and international exchange opportunities.", "cyan", "events"),
    ],
  },
  {
    name: "Saudi Arabia",
    slug: "saudi-arabia",
    flag: "sa",
    scene: "riyadh",
    description: "Discover opportunities in technology, innovation and career development aligned with Vision 2030.",
    heroTitle: "Explore Your Opportunities In Saudi Arabia",
    heroDescription: "Explore resources for careers, research, entrepreneurship and professional development in Saudi Arabia.",
    heroImage: null,
    stats: [
      { value: "16,500+", label: "Active Candidates", icon: "users", tone: "blue" },
      { value: "7,500+", label: "Online Video Courses", icon: "courses", tone: "red" },
    ],
    categoriesHeading: "What Would You Like To Achieve In Saudi Arabia?",
    categoriesDescription: "Choose an area to explore practical guides, resources and opportunities.",
    categories: [
      createCategory("vision-2030-careers", "Vision 2030 Careers", "Explore career resources across emerging sectors and professions.", "blue", "briefcase"),
      createCategory("research-innovation", "Research & Innovation", "Discover research resources and opportunities to develop new ideas.", "purple", "book"),
      createCategory("startups-investment", "Startups & Investment", "Explore entrepreneurship, startup support and innovation resources.", "green", "bulb"),
      createCategory("skills-training", "Skills & Training", "Build relevant skills through learning and professional development.", "amber", "certificate"),
      createCategory("professional-profile", "Professional Profile", "Present your skills, achievements and professional impact clearly.", "pink", "profile"),
      createCategory("events-programmes", "Events & Programmes", "Discover professional events, competitions and development programmes.", "cyan", "events"),
    ],
  },
];

export function getOpportunityDestination(name) {
  if (typeof name !== "string") return undefined;
  const slug = name.trim().toLowerCase();
  return opportunityDestinations.find((destination) => destination.slug === slug);
}
