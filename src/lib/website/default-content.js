import { defaultStories } from "./default-stories.js";
export const defaultWebsiteContent = {
  navigation: {
    items: [
      { label: "Home", href: "/" },
      { label: "Success Stories", href: "/success-stories" },
      { label: "Opportunities", href: "/opportunities" },
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    secondaryButton: { label: "Book an Initial Review", href: "/eligibility" },
    primaryButton: { label: "Get Started", href: "/contact" },
  },
  home: {
    title: "Home",
    seo: { title: "Eye Interaction", description: "Expert profile endorsement with 98% success rate. Navigate your professional journey with confidence." },
    sections: [
      { id: "home-hero", type: "hero", name: "Hero", enabled: true, content: {
        announcement: "Now accepting professional profile review enquiries for {year}", headingPrefix: "Build a", headingHighlight: "Stronger Profile", headingSuffix: "For UK Global Talent Endorsement",
        description: "We help technology professionals, founders and researchers present their achievements for professional recognition, including the UK Global Talent Route.", badges: [],
        primaryButton: { label: "Request a Profile Review", href: "/eligibility" }, secondaryButton: { label: "Watch Success Stories", href: "/success-stories" },
      } },
      { id: "home-services", type: "services", name: "Services", enabled: true, content: {
        eyebrow: "Our Services", heading: "Profile Development, Research & Innovation Support",
        description: "From research communication and conference submissions to startup competitions and evidence presentation, we help clients build and communicate meaningful professional achievements.",
        items: [
          { title: "Professional Profile & Evidence Development", description: "We help technology professionals, founders and researchers build clear, credible profiles that communicate their experience, achievements and professional impact.", features: ["Profile structuring and professional storytelling", "Evidence organisation and presentation", "Research, innovation and leadership positioning"], href: "/eligibility", button: "Explore Profile Support", featured: false },
          { title: "Research, Conferences & Global Opportunities", description: "We support clients in preparing research papers, abstracts, presentations and professional materials for journals, conferences, exhibitions and international opportunities across Europe and beyond.", features: ["Research paper and abstract review", "Conference presentation preparation", "Startup competitions and opportunity support"], href: "/eligibility", button: "Explore Research Support", featured: false },
          { title: "Personalised Mentoring & Growth Strategy", description: "Work directly with an experienced mentor to strengthen your professional direction, improve how you communicate your achievements and identify meaningful next steps.", features: ["One-to-one mentoring sessions", "Personalised profile and career feedback", "Research, technology and innovation guidance"], href: "/eligibility", button: "Book a Mentoring Session", featured: true },
        ],
      } },
      { id: "home-process", type: "process", name: "Process", enabled: true, content: {
        eyebrow: "How We Work", heading: "Our 4-Step Profile Growth Process", description: "A clear and straightforward process to help you build a stronger, well-presented professional profile.",
        items: [
          { step: "01", title: "Profile & Gap Review", description: "We review your background to identify missing recognition, awards, impact, evidence and professional visibility." },
          { step: "02", title: "Personalised Growth Plan", description: "We create a clear timeline with practical goals for research, speaking, mentoring, competitions and industry engagement." },
          { step: "03", title: "Achievement Development Support", description: "We help you pursue relevant opportunities, strengthen your professional contributions and document measurable impact." },
          { step: "04", title: "Evidence & Profile Presentation", description: "We organise your achievements into a clear, credible and professionally presented profile." },
        ],
      } },
      { id: "home-testimonials", type: "testimonials", name: "Testimonials", enabled: true, content: {
        eyebrow: "Success Stories", heading: "Real People, Real Results", description: "Real feedback from professionals supported by our team.", button: { label: "View All Success Stories", href: "/success-stories" },
        items: [
          { name: "Valuable Candidate", role: "Business Analyst", country: "Pakistan → UK", quote: "The Eye Interaction team provided clear and professional support in organising my achievements and improving the presentation of my documents. Their feedback helped me communicate my experience with greater clarity and confidence.", rating: 5, tag: "Profile Development" },
          { name: "Valuable Candidate", role: "Senior Developer", country: "Pakistan → UK", quote: "Eye Interaction supported me with structured profile feedback and practical mentoring. Noor-e-Zehra was responsive throughout, and Irfan’s guidance on professional growth and the AI industry was particularly valuable.", rating: 5, tag: "Mentoring Support" },
          { name: "Valuable Candidate", role: "Software Engineer", country: "India → UK", quote: "The service was professional, organised and efficient. Communication was clear, the process was well managed, and the team was responsive whenever I needed support.", rating: 5, tag: "Document Support" },
        ],
      } },
      { id: "home-faq", type: "faq", name: "Frequently Asked Questions", enabled: true, content: {
        eyebrow: "Common Questions", heading: "Everything You Need to Know", description: "Clear answers about our professional profile and research support.",
        items: [
          { question: "Who can use Eye Interaction’s services?", answer: "We support researchers, technology professionals, startup founders, academics and innovators who want to strengthen how they present their work, achievements and professional impact." },
          { question: "What research support do you provide?", answer: "We provide support with research-profile development, publication planning, document structure, academic presentation, conference materials and the clear communication of research contributions. We do not guarantee publication or acceptance." },
          { question: "How do you support technology professionals and founders?", answer: "We help professionals and founders present technical projects, product development, innovation, leadership, industry contributions and measurable impact in a clear and well-structured professional profile." },
          { question: "What documents can your team review?", answer: "We can review CVs, professional biographies, personal statements, research summaries, publication records, project descriptions, achievement portfolios and supporting evidence for clarity, consistency, structure and presentation." },
        ],
      } },
    ],
  },
  pages: {
    about: { title: "About Us", sections: [
      { id:"about-header",type:"header",name:"Page header",enabled:true,content:{eyebrow:"About Eye Interaction",heading:"Your Partner in Research, Technology & Professional Growth",description:"We support researchers, technology professionals and founders in presenting their achievements with clarity, impact and confidence."}},
      { id:"about-mission",type:"mission",name:"Mission",enabled:true,content:{eyebrow:"Our Mission",heading:"Empowering Professionals to Present, Publish & Make an Impact",paragraphs:["Eye Interaction was founded to help professionals and researchers communicate their work more effectively. We combine industry experience with a human-first approach.","From your first step to your next professional milestone, our team supports you with honest guidance, careful attention to detail and complete confidentiality."],cardHeading:"Why clients choose us",items:[{title:"Personalised support",description:"Support tailored to your background and goals."},{title:"End-to-end document & profile support",description:"Help structuring your profile and refining your documents."},{title:"Expert guidance",description:"Experienced mentors help strengthen your impact and credibility."},{title:"Transparent process & pricing",description:"Clear timelines, honest communication and upfront pricing."}]}},
      { id:"about-stats",type:"stats",name:"Milestones",enabled:true,content:{items:[{value:"98%",label:"Success Rate"},{value:"5,000+",label:"Applicants Helped"},{value:"10+",label:"Countries"},{value:"3-6",label:"Avg. Timeline Months"}]}},
      { id:"about-values",type:"values",name:"Values",enabled:true,content:{eyebrow:"What We Stand For",heading:"Built on Trust & Expertise",description:"Three principles guide every case we handle.",items:[{title:"Global Professional Community",description:"Supporting researchers, founders and technology professionals worldwide."},{title:"Dedicated Support",description:"A personal case manager guides you through the profile journey."},{title:"Research & Technology Expertise",description:"Specialist support for research communication, technical projects and professional impact."}]}}
    ] },
    contact: { title:"Contact",sections:[
      {id:"contact-header",type:"header",name:"Page header",enabled:true,content:{eyebrow:"Get In Touch",heading:"Let's Start a Conversation",description:"Have a question or ready to begin your journey? Reach out and we'll respond within 24 hours."}},
      {id:"contact-info",type:"contactInfo",name:"Contact details",enabled:true,content:{items:[{label:"Call Us",value:"+44 7380 732477"},{label:"Email Us",value:"info@eyeinteraction.com"},{label:"Registered Office",value:"Office 8158, 321-323 High Road, Chadwell Heath, Essex, RM6 6AX"},{label:"Working Hours",value:"Mon–Fri, 9:00 AM – 5:00 PM"}]}},
      {id:"contact-form",type:"contactForm",name:"Contact form & FAQs",enabled:true,content:{heading:"Send Us a Message",description:"Fill out the form below and our team will get back to you shortly.",namePlaceholder:"Full name",emailPlaceholder:"Email address",phonePlaceholder:"Phone number",subjectPlaceholder:"Subject",messagePlaceholder:"Tell us more about your query",buttonLabel:"Send Message",faqHeading:"Quick Answers",faqs:[{question:"How soon will I get a response?",answer:"Our team typically replies within 24 business hours."},{question:"Do you offer free consultations?",answer:"Yes, your first consultation with a specialist is completely free."},{question:"Can I schedule a call instead?",answer:"Mention your preferred time in the message and we'll confirm."}]}}
    ] },
    eligibility: { title:"Eligibility",sections:[{id:"eligibility-header",type:"header",name:"Page header",enabled:true,content:{eyebrow:"Global Talent Profile Review",heading:"Understand and Strengthen Your Professional Profile",description:"Share your background, achievements and supporting materials to receive a non-legal review focused on profile structure, document presentation and areas for improvement."}},{id:"eligibility-form",type:"form",name:"Eligibility form",enabled:true,content:{}}] },
    successStories: { title: "Success Stories", eyebrow: "Real Applicants, Real Outcomes", heading: "Success Stories", description: "Real endorsement journeys — what worked, how long it took, and what made the difference." },
  },
  footer: {
    cta: { eyebrow: "Start Today", heading: "Ready to Strengthen Your Professional Profile?", description: "Present your research, technology experience, innovation and professional achievements with clarity through profile development, document review and personalised mentoring.", badges: ["Research & Academic Support", "Technology Profile Development", "Founder & Innovation Support"], primaryButton: { label: "Request a Profile Review", href: "/eligibility" }, secondaryButton: { label: "Book a Mentoring Session", href: "/contact" } },
    newsletter: { enabled: true, heading: "Stay Ahead in Research, Technology & Innovation", description: "Receive practical insights on professional profile development, research communication, digital technology, innovation and career growth.", placeholder: "Enter your email address", buttonLabel: "Subscribe" },
    description: "Eye Interaction provides educational resources, professional mentoring, and portfolio development support. We do not provide immigration advice, determine visa eligibility, or prepare immigration applications.",
    contact: { email: "info@eyeinteraction.com", phone: "+44 7380 732477", address: "London, United Kingdom" },
    services: [ { label: "UK Global Talent Profile Development", href: "/eligibility" }, { label: "Document Assessment", href: "/contact" }, { label: "AI Detection & Content Review", href: "/contact" }, { label: "Expert Mentoring Sessions", href: "/contact" }, { label: "UK Global Talent Guidance", href: "/eligibility" } ],
    company: [ { label: "About Us", href: "/about" }, { label: "Success Stories", href: "/success-stories" }, { label: "FAQ", href: "/#faq" }, { label: "Contact", href: "/contact" } ],
    legal: [ { label: "Privacy Policy", href: "/privacy-policy" }, { label: "Terms & Conditions", href: "/terms-and-conditions" }, { label: "Disclaimer", href: "/disclaimer" }, { label: "Copyright", href: "/copyright" } ],
    socials: [ { label: "LinkedIn", href: "https://uk.linkedin.com/company/eyeinteraction" }, { label: "Facebook", href: "https://www.facebook.com/eyeinteraction/" }, { label: "Instagram", href: "https://www.instagram.com/eyeinteractionltd/" } ],
    copyright: "© {year} Eye Interaction Ltd. All rights reserved.", strapline: "Supporting professionals worldwide on their UK Global Talent journey.",
  },
  legal: {
    "privacy-policy": { title: "Privacy Policy", summary: "How Eye Interaction collects, uses and protects personal information.", updatedAt: "21 September 2026", content: "Eye Interaction respects your privacy. We collect information that you provide through our contact and profile review forms so we can respond to your enquiry and provide the requested service.\n\nWe use reasonable technical and organisational measures to protect personal information. We do not sell personal data. We may use trusted service providers where needed to operate our website, communicate with you, and deliver our services.\n\nYou may contact us to ask about, correct or request deletion of your personal information, subject to applicable legal and operational requirements." },
    "terms-and-conditions": { title: "Terms & Conditions", summary: "The terms that apply when using this website and our services.", updatedAt: "21 September 2026", content: "By using this website, you agree to use it lawfully and not interfere with its operation or security. Website information is provided for general educational purposes.\n\nAny paid service, scope, timeline and fee will be confirmed separately in writing. You remain responsible for the accuracy of information and documents you provide and for decisions made using our support.\n\nWe may update these terms when our services or legal obligations change. The updated version will be published on this page." },
    disclaimer: { title: "Disclaimer", summary: "Important limits on the information and support provided by Eye Interaction.", updatedAt: "21 September 2026", content: "Eye Interaction provides educational resources, professional mentoring, profile development and document presentation support. We do not provide legal or immigration advice, determine visa eligibility, prepare immigration applications or guarantee any endorsement, publication, application or other outcome.\n\nInformation on this website is general and should not be treated as a substitute for advice from an appropriately qualified professional. Outcomes depend on individual circumstances and decisions made by independent organisations." },
    copyright: { title: "Copyright", summary: "Ownership and permitted use of material published on this website.", updatedAt: "21 September 2026", content: "Unless otherwise stated, website text, graphics, branding and original materials are owned by or licensed to Eye Interaction Ltd.\n\nYou may view and print website material for personal, non-commercial use. Reproduction, republication, distribution or commercial use requires prior written permission. Third-party names, logos and materials remain the property of their respective owners." },
  },
  stories: defaultStories,
  appearance: { primaryColor: "#2563b8", secondaryColor: "#173a66", accentColor: "#5b94d0", sectionSpacing: "comfortable" },
};

export function mergeWebsiteContent(value) {
  if (!value || typeof value !== "object") return structuredClone(defaultWebsiteContent);
  const savedNavigation = value.navigation || {};
  const savedItems = Array.isArray(savedNavigation.items) ? savedNavigation.items : defaultWebsiteContent.navigation.items;
  const navigationItems = savedItems.some((item) => item?.href === "/opportunities")
    ? savedItems
    : [...savedItems, { label: "Opportunities", href: "/opportunities" }];
  return { ...structuredClone(defaultWebsiteContent), ...value,
    navigation: { ...defaultWebsiteContent.navigation, ...savedNavigation, items: navigationItems }, home: { ...defaultWebsiteContent.home, ...value.home },
    pages: { ...defaultWebsiteContent.pages, ...value.pages }, footer: { ...defaultWebsiteContent.footer, ...value.footer },
    legal: { ...defaultWebsiteContent.legal, ...value.legal }, stories: Array.isArray(value.stories) ? value.stories : defaultStories, appearance: { ...defaultWebsiteContent.appearance, ...value.appearance },
  };
}
