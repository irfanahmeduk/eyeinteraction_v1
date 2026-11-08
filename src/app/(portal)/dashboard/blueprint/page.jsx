import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { sampleUser } from "@/lib/portal/sample-user";
import { buildViewModel, formatDate } from "@/lib/portal/view-model";
import { Card, ChapterTiles, PageTitle } from "@/components/portal/ui";
import { CHAPTERS } from "@/components/verixa/blueprint-data";

export const metadata = { title: "Career Blueprint" };

export default function BlueprintPage() {
  const user = sampleUser;
  const vm = buildViewModel(user);

  return (
    <>
      <PageTitle
        title="Career Blueprint"
        subtitle={`Completed ${formatDate(user.blueprintCompletedAt)}`}
        action={
          <a
            href="/verixa/blueprint"
            className="inline-flex items-center gap-2 rounded-[12px] border-2 border-[#2563b8] px-4 py-2.5 text-[14px] font-semibold text-[#2563b8] hover:bg-[#eef4ff]"
          >
            <RotateCcw size={16} aria-hidden="true" />
            Retake questionnaire
          </a>
        }
      />

      <ChapterTiles chapters={vm.blueprint.chapters} />

      <Card title="Your answers" className="mt-6">
        <div className="flex flex-col divide-y divide-[#e3eaf5]">
          {CHAPTERS.map((chapter) => (
            <div key={chapter.number} className="py-4 first:pt-0 last:pb-0">
              <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#979797]">
                Chapter {chapter.number} · {chapter.title}
              </p>
              <dl className="mt-2 grid gap-2">
                {vm.blueprint.answers
                  .filter((a) => a.chapter === chapter.number)
                  .map((a) => (
                    <div key={a.question} className="grid gap-1 sm:grid-cols-[300px_1fr] sm:gap-4">
                      <dt className="text-[14px] text-slate-500">{a.question}</dt>
                      <dd className="text-[15px] font-medium text-[#2563b8]">{a.value || "—"}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          ))}
        </div>
      </Card>

      <p className="mt-6 text-[13px] text-slate-500">
        Want to change an answer? <Link href="/verixa/blueprint" className="font-semibold text-[#2563b8] hover:underline">Retake the questionnaire</Link> and save again.
      </p>
    </>
  );
}
