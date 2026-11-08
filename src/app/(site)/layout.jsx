import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getWebsiteContent } from "@/lib/website/content";
import { SiteTheme } from "@/components/website/SiteTheme";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { WebsitePreviewProvider } from "@/components/website/WebsitePreviewProvider";
import { SiteShell } from "@/components/website/SiteShell";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Eye Interaction | Global Profile & Endorsement Platform",
    template: "%s | Eye Interaction",
  },
  description:
    "Expert profile & endorsement services with industry-leading success rates.",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }) {
  const site = await getWebsiteContent();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="font-sans antialiased bg-background text-foreground">

        {/* Custom Cursor — desktop only */}
        <CustomCursor />

        <WebsitePreviewProvider initialContent={site}>
          <SiteShell>{children}</SiteShell>
        </WebsitePreviewProvider>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "white",
              color: "#0f172a",
              border: "1px solid #e2e8f0",
              borderRadius: "0.75rem",
            },
          }}
        />
      </body>
    </html>
  );
}

