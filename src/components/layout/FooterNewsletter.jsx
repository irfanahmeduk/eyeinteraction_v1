"use client";

import { Mail, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function FooterNewsletter({ content = {} }) {
  return (
    <div className="border-b border-slate-800">
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <h3 className="text-base font-semibold text-white mb-1">
            {content.heading || "Stay Ahead in Research, Technology & Innovation"}
            </h3>
            <p className="text-sm text-slate-400">
            {content.description || "Receive practical insights on professional profile development, research communication, digital technology, innovation and career growth."}
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2 w-full md:w-auto shrink-0"
          >
            <div className="relative flex-1 md:w-72">
              <Mail
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none z-10"
              />
              <Input
                type="email"
                name="email"
                required
                placeholder={content.placeholder || "Enter your email address"}
                className="!pl-7 !bg-slate-800 !border-slate-700 !text-white placeholder:!text-slate-500 hover:!border-slate-600 focus:!border-brand-500 focus:!ring-1 focus:!ring-brand-500/40 focus:!shadow-none"
              />
            </div>
            <Button type="submit" size="sm" className="shrink-0 px-4 py-2.5 h-auto">
              {content.buttonLabel || "Subscribe"}
              <Send size={13} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
