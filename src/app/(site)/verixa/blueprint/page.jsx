import BlueprintQuestionnaire from "@/components/verixa/BlueprintQuestionnaire";

export const metadata = {
  title: "Build Your Career Blueprint",
  description:
    "Answer a few questions about your role, impact, recognition and ambitions to build your Verixa Career Blueprint.",
};

// Figma: "QUestionnaire screen 1-8" (Verixa Final Design 2026)
export default function VerixaBlueprintPage() {
  return (
    <main className="min-h-screen bg-white">
      <BlueprintQuestionnaire />
    </main>
  );
}
