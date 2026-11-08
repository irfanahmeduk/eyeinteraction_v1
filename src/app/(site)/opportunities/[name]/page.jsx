import { notFound } from "next/navigation";
import { OpportunityDestinationPage } from "@/components/opportunities/OpportunityDestinationPage";
import { getOpportunityDestination } from "@/lib/data/opportunities";

export const dynamicParams = true;

async function findDestination(params) {
  const { name } = await params;
  return getOpportunityDestination(name);
}

export async function generateMetadata({ params }) {
  const destination = await findDestination(params);
  if (!destination) return { title: "Destination Not Found" };

  return {
    title: `${destination.name} Opportunities`,
    description: destination.heroDescription,
  };
}

export default async function OpportunityDestinationRoute({ params }) {
  const destination = await findDestination(params);
  if (!destination) notFound();

  return <OpportunityDestinationPage destination={destination} />;
}
