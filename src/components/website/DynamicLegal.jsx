"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useWebsiteContent } from "./WebsitePreviewProvider";

export function DynamicLegal({ legalKey, initialPage }) {
  const content = useWebsiteContent();
  const page = content?.legal?.[legalKey] || initialPage;

  if (!page) return null;

  const isHtml = /<[a-z][\s\S]*>/i.test(page.content || "");

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-blue text-white pt-28 pb-14">
        <div className="container-custom max-w-4xl">
          <nav className="flex items-center gap-1.5 text-xs text-blue-200/80 mb-5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span>{page.title}</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight">{page.title}</h1>
          {page.summary && <p className="text-blue-100/90 text-lg max-w-2xl leading-relaxed">{page.summary}</p>}
        </div>
      </div>

      <main className="container-custom max-w-4xl py-12 md:py-16">
        <article className="card bg-white p-8 md:p-14 shadow-sm border border-slate-200/80 rounded-2xl">
          {page.updatedAt && (
            <div className="flex items-center gap-2 mb-8 pb-6 border-b border-slate-100">
              <span className="w-2 h-2 rounded-full bg-brand-500"></span>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Last updated {page.updatedAt}
              </p>
            </div>
          )}

          {isHtml ? (
            <div
              className="cms-rich-content text-slate-700 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          ) : (
            <div className="space-y-6 text-slate-700 leading-8">
              {(page.content || "").split(/\n\n+/).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
