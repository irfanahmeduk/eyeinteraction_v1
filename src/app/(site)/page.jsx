import { getWebsiteContent } from "@/lib/website/content";
import { DynamicHome } from "@/components/website/DynamicHome";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Eye Interaction",
  description: "Expert profile endorsement with 98% success rate. Navigate your professional journey with confidence.",
};

export default async function HomePage() {
  const site = await getWebsiteContent();
  return <DynamicHome initialSections={site?.home?.sections || []} />;
}
