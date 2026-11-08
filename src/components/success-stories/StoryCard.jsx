import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/**
 * StoryCard
 * Compact success story card for grids / "more stories" rails.
 * Reuse this on the /success-stories listing page too.
 */
export function StoryCard({ story }) {
  return (
    <Link
      href={`/success-stories/${story.slug}`}
      className="group card overflow-hidden flex flex-col"
    >
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <Image
          src={story.coverImage || story.avatar || "/images/success-stories/irfan-ahmed-cover.jpg"}
          alt={story.name || "Candidate Story"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105 !object-[50%_-10%] !object-top"
        />
        <Badge className="absolute top-3 left-3 bg-white/90 text-[var(--color-secondary)] hover:bg-white gap-1 backdrop-blur-sm">
          <Award size={12} />
          {story.outcome || "Endorsement Approved"}
        </Badge>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-primary)] mb-1.5">
          {story.field}
        </p>
        <h3 className="font-display font-semibold text-lg text-[var(--color-secondary)] mb-2">
          {story.name}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 flex-1">
          {story.excerpt || story.subtitle || story.intro || ""}
        </p>

        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)]">
          Read full story
          <ArrowUpRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}