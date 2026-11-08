import { Pencil, ShieldCheck, Lock } from "lucide-react";
import { sampleUser } from "@/lib/portal/sample-user";
import { buildViewModel, formatDate } from "@/lib/portal/view-model";
import { Avatar } from "@/components/portal/PortalShell";
import { Card, GoogleBadge, PageTitle } from "@/components/portal/ui";

export const metadata = { title: "Personal Details" };

function Field({ label, value, locked = false }) {
  return (
    <div className="rounded-[12px] border border-[#e3eaf5] px-4 py-3">
      <dt className="flex items-center gap-1.5 text-[12px] font-medium text-slate-500">
        {label}
        {locked && <Lock size={11} aria-label="From Google, can't be edited here" />}
      </dt>
      <dd className={`mt-1 break-words text-[15px] font-medium ${value ? "text-[#0f172a]" : "text-slate-400"}`}>{value || "Not added"}</dd>
    </div>
  );
}

const editButton = (
  <button
    type="button"
    disabled
    title="Editing comes next"
    className="inline-flex items-center gap-1.5 rounded-[10px] border border-[#2563b8]/30 px-3 py-1.5 text-[13px] font-semibold text-[#2563b8] opacity-70"
  >
    <Pencil size={14} aria-hidden="true" />
    Edit
  </button>
);

export default function PersonalDetailsPage() {
  const user = sampleUser;
  const vm = buildViewModel(user);
  const contact = vm.profileFields.filter((f) => ["phone", "country", "city", "nationality"].includes(f.key));
  const work = vm.profileFields.filter((f) => ["jobTitle", "company", "linkedin"].includes(f.key));

  return (
    <>
      <PageTitle title="Personal details" subtitle={`${vm.filled} of ${vm.profileFields.length} details added · keep them up to date for your evaluation`} />

      <Card>
        <div className="flex flex-wrap items-center gap-5">
          <Avatar user={user.google} size={84} />
          <div className="min-w-0 flex-1">
            <p className="text-[22px] font-semibold tracking-[-0.3px]">{user.google.name}</p>
            <p className="text-[15px] text-slate-500">{user.google.email}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <GoogleBadge />
              {user.google.emailVerified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[12px] font-semibold text-emerald-700">
                  <ShieldCheck size={13} aria-hidden="true" />
                  Email verified
                </span>
              )}
            </div>
          </div>
          <p className="text-[13px] text-slate-500">Member since {formatDate(user.joinedAt)}</p>
        </div>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card title="From your Google account">
          <dl className="grid gap-3">
            <Field label="Full name" value={user.google.name} locked />
            <Field label="Email address" value={user.google.email} locked />
            <Field label="Sign-in method" value="Google" locked />
          </dl>
          <p className="mt-3 text-[12px] text-slate-500">These come from Google and update when you sign in.</p>
        </Card>

        <Card title="Contact & location" action={editButton}>
          <dl className="grid gap-3 sm:grid-cols-2">
            {contact.map((f) => (
              <Field key={f.key} label={f.label} value={f.value} />
            ))}
          </dl>
        </Card>

        <Card title="Professional" action={editButton}>
          <dl className="grid gap-3 sm:grid-cols-2">
            {work.map((f) => (
              <Field key={f.key} label={f.label} value={f.value} />
            ))}
          </dl>
        </Card>

        <Card title="From your Career Blueprint">
          <dl className="grid gap-3">
            {vm.blueprint.answers.slice(0, 3).map((a) => (
              <Field key={a.question} label={a.question} value={a.value} />
            ))}
          </dl>
        </Card>
      </div>
    </>
  );
}
