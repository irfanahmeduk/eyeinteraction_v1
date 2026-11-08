"use client";

import { useWebsiteContent } from "./WebsitePreviewProvider";
import { SiteTheme } from "./SiteTheme";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";

export function SiteShell({ children }) {
  const content = useWebsiteContent();

  return (
    <>
      {content?.appearance && <SiteTheme appearance={content.appearance} />}
      <SmoothScrollProvider>
        <Navbar content={content?.navigation} />
        <main className="min-h-screen">{children}</main>
        <Footer content={content?.footer} />
      </SmoothScrollProvider>
    </>
  );
}
