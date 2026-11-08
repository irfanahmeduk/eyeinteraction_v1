import Link from "next/link";
import { ArrowRight, Upload, Clock, FileSearch, Mail } from "lucide-react";
import { sampleUser } from "@/lib/portal/sample-user";
import { buildViewModel, formatDate } from "@/lib/portal/view-model";
import { Avatar } from "@/components/portal/PortalShell";
import { Card, ChapterTiles, Checklist, GoogleBadge, PageTitle, ProgressRing } from "@/components/portal/ui";

export const metadata = { title: "My Dashboard" };

export default function DashboardOverviewPage() {
  const user = sampleUser;
  const vm = buildViewModel(user);

  return (
    <>
      <PageTitle
        title={`Welcome, ${user.google.givenName}`}
        subtitle={`Your Global Talent journey · member since ${formatDate(user.joinedAt)}`}
      />

      {/* Hero: blueprint status + completeness */}
      <section className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#0d3570] via-[#114182] to-[#2563b8] p-6 text-white sm:p-8">
        <div aria-hidden="true" className="absolute -right-16 -top-20 size-72 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-[560px]">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[12px] font-semibold">
              <span className="size-2 rounded-full bg-emerald-300" />
              Career Blueprint complete
            </span>
            <h2 className="mt-4 text-[24px] font-semibold leading-tight tracking-[-0.5px] sm:text-[28px]">
              Your next step: upload your CV for a personalised Verixa evaluation
            </h2>
            <p className="mt-2 text-[15px] text-white/80">
              We combine your blueprint with your CV to highlight strengths and areas to improve, then email your report.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                disabled
                title="Coming soon"
                className="inline-flex items-center gap-2 rounded-[12px] bg-white px-5 py-3 text-[14px] font-semibold text-[#114182] opacity-95"
              >
                <Upload size={17} aria-hidden="true" />
                Upload CV
              </button>
              <Link
                href="/dashboard/blueprint"
                className="inline-flex items-center gap-2 rounded-[12px] border border-white/40 px-5 py-3 text-[14px] font-semibold text-white hover:bg-white/10"
              >
                View my blueprint
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4 self-start md:self-auto">
            <ProgressRing value={vm.completeness} />
            <p className="max-w-[150px] text-[13px] text-white/80">Profile strength based on the steps you have completed</p>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-6">
          {/* Personal details summary */}
          <Card
            title="Personal details"
            action={
              <Link href="/dashboard/profile" className="inline-flex items-center gap-1 text-[14px] font-semibold text-[#2563b8] hover:underline">
                View all <ArrowRight size={15} aria-hidden="true" />
              </Link>
            }
          >
            <div className="flex flex-wrap items-center gap-4">
              <Avatar user={user.google} size={64} />
              <div className="min-w-0 flex-1">
                <p className="text-[18px] font-semibold">{user.google.name}</p>
                <p className="truncate text-[14px] text-slate-500">{user.google.email}</p>
                <div className="mt-2">
                  <GoogleBadge />
                </div>
              </div>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {vm.profileFields.slice(0, 4).map((f) => (
                <div key={f.key} className="rounded-[12px] bg-[#f4f7ff] px-3 py-2.5">
                  <dt className="text-[12px] text-slate-500">{f.label}</dt>
                  <dd className={`mt-0.5 truncate text-[14px] font-medium ${f.value ? "text-[#0f172a]" : "text-slate-400"}`}>
                    {f.value || "Not added"}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>

          {/* Blueprint */}
          <Card
            title="Your Career Blueprint"
            action={
              <Link href="/dashboard/blueprint" className="inline-flex items-center gap-1 text-[14px] font-semibold text-[#2563b8] hover:underline">
                Details <ArrowRight size={15} aria-hidden="true" />
              </Link>
            }
          >
            <ChapterTiles chapters={vm.blueprint.chapters} compact />
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card title="Your journey">
            <Checklist steps={vm.steps} />
          </Card>

          <Card title="Verixa evaluation">
            <ol className="flex flex-col gap-3">
              {[
                { icon: Upload, label: "CV received", state: "waiting" },
                { icon: FileSearch, label: "Profile under review", state: "waiting" },
                { icon: Mail, label: "Report emailed to you", state: "waiting" },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 rounded-[12px] border border-dashed border-slate-200 px-3 py-2.5">
                  <span className="grid size-9 place-items-center rounded-[10px] bg-slate-100 text-slate-400">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="text-[14px] font-medium text-slate-600">{label}</span>
                  <Clock size={15} className="ml-auto text-slate-300" aria-label="Not started" />
                </li>
              ))}
            </ol>
            <p className="mt-3 text-[13px] text-slate-500">Starts once you upload your CV.</p>
          </Card>
        </div>
      </div>
    </>
  );
}
