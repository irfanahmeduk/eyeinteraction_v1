"use client";

import { Mail, Send } from "lucide-react";

export function FooterNewsletter() {
  return (
    <div className="border-b border-slate-800">
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <h3 className="text-base font-semibold text-white mb-1">
              Stay ahead with the latest visa updates
            </h3>
            <p className="text-sm text-slate-400">
              Get immigration news, policy changes & tips ? straight to your inbox. No spam.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2 w-full md:w-auto shrink-0"
          >
            <div className="relative flex-1 md:w-72">
              <Mail
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold transition-colors shrink-0"
            >
              Subscribe
              <Send size={13} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}