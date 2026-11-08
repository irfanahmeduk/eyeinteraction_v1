import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Verixa",
  description:
    "Explore your professional experience, achievements and recognition to build a clearer picture of your UK Global Talent profile.",
};

// Figma: "Global Talent screen style 1" (Verixa Final Design 2026, node 1:3)
export default function VerixaPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="container-custom flex flex-col items-center pb-16 pt-28 text-center lg:pt-[149px]">
        <h1 className="max-w-[805px] font-sans text-[28px] font-normal leading-tight tracking-[-0.03em] text-[#181824] sm:text-[40px] sm:leading-[48px]">
          Your work tells a story. Let&apos;s discover it.
        </h1>

        <p className="mt-[21px] max-w-[579px] text-base font-medium leading-[1.625] text-[#475569] sm:text-[18px] sm:leading-[29.25px]">
          Explore your professional experience, achievements and recognition to build a clearer
          picture of your UK Global Talent profile.
        </p>

        <div className="mt-[26px] flex flex-wrap items-center justify-center gap-[13px]">
          <Link
            href="/verixa/blueprint"
            className="btn btn-primary h-[46px] rounded-[12px] px-5 text-[14px] leading-5 sm:w-[167px]"
          >
            Build My Blueprint
          </Link>
          <Link
            href="/opportunities/united-kingdom#categories"
            className="btn btn-outline h-[46px] w-[117px] rounded-[12px] px-0 text-[14px] leading-5 shadow-[0px_4px_20px_0px_rgba(37,99,184,0.12)]"
          >
            Go back
          </Link>
        </div>

        <div className="relative mt-[5px] w-full max-w-[1116px]">
          <Image
            src="/images/verixa/pipeline-hub.png"
            alt="Verixa connects four areas of your profile: Identity, Impact, Recognition and Direction"
            width={1916}
            height={821}
            priority
            sizes="(min-width: 1180px) 1116px, 100vw"
            className="h-auto w-full"
          />
          {/* Soft white fade on both edges, as in the design */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-[24.5%] bg-gradient-to-r from-white to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-[24.5%] bg-gradient-to-l from-white to-transparent"
          />
        </div>

        <Link
          href="#"
          className="mt-1 inline-flex items-center gap-[5px] text-[14px] font-semibold leading-5 text-[#2563b8] hover:underline"
        >
          How does this work?
          <span className="relative inline-block size-[11px]" aria-hidden="true">
            <img
              src="/images/verixa/open-in-new-tab.svg"
              alt=""
              width={9.66667}
              height={9.66675}
              className="absolute left-[8.34%] top-[8.33%]"
            />
          </span>
        </Link>
      </section>
    </main>
  );
}
