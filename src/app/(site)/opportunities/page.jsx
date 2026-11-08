import { OpportunitiesPage } from "@/components/opportunities/OpportunitiesPage";
import { opportunityDestinations } from "@/lib/data/opportunities";

export const metadata = {
  title: "Explore Global Opportunities",
  description:
    "Explore professional, research and innovation opportunities across the United Kingdom, United States, Europe and Saudi Arabia.",
};

export default function OpportunitiesRoute() {
  return <OpportunitiesPage destinations={opportunityDestinations} />;
}
