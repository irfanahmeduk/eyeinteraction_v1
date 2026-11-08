import { notFound } from "next/navigation";
import { getWebsiteContent } from "@/lib/website/content";
import { DynamicLegal } from "@/components/website/DynamicLegal";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { legal } = await params;
  const content = await getWebsiteContent();
  const page = content?.legal?.[legal];
  return page ? { title: page.title, description: page.summary } : {};
}

export default async function LegalPage({ params }) {
  const { legal } = await params;
  const content = await getWebsiteContent();
  const page = content?.legal?.[legal];
  if (!page) notFound();

  return <DynamicLegal legalKey={legal} initialPage={page} />;
}
