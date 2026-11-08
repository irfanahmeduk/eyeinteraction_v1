// SAMPLE DATA for the dashboard preview.
// Later this comes from the Google sign-in (name, email, photo) and the saved
// Career Blueprint answers. Nothing here is real user data.

export const sampleUser = {
  google: {
    name: "Irfan Ahmed",
    givenName: "Irfan",
    email: "irfan.sample@gmail.com",
    picture: null, // Google profile photo URL goes here after sign-in
    emailVerified: true,
  },
  joinedAt: "2026-11-08",
  profile: {
    phone: "",
    country: "Pakistan",
    city: "",
    nationality: "",
    jobTitle: "Software Engineer",
    company: "",
    linkedin: "",
  },
  cv: null, // { fileName, uploadedAt } once uploaded
  evaluation: { status: "not-started" }, // not-started | in-review | ready
  blueprintCompletedAt: "2026-11-08",
  answers: {
    role: "software",
    experience: "6-10",
    environment: "product-led",
    achievement: "built-product",
    recognition: ["awards", "media"],
    ambition: "lead-products",
  },
};
