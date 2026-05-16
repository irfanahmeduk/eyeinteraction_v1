import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
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
    default: "Eye Interaction | Global Visa Endorsement Platform",
    template: "%s | Eye Interaction",
  },
  description:
    "Expert visa endorsement services with industry-leading success rates. Navigate your immigration journey with confidence.",
  keywords: [
    "visa endorsement",
    "immigration services",
    "visa application",
    "global talent visa",
    "work permit",
  ],
  openGraph: {
    title: "Eye Interaction | Global Visa Endorsement Platform",
    description:
      "Expert visa endorsement services with industry-leading success rates.",
    url: "https://eyeinteraction.com",
    siteName: "Eye Interaction",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eye Interaction | Global Visa Endorsement Platform",
    description:
      "Expert visa endorsement services with industry-leading success rates.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {/* Custom Cursor — desktop only */}
        <CustomCursor />

        {/* Lenis Smooth Scroll */}
        <SmoothScrollProvider>
          {/* Navigation */}
          <Navbar />

          {/* Page Content */}
          <main className="min-h-screen">{children}</main>

          {/* Footer */}
          <Footer />
        </SmoothScrollProvider>

        {/* Toast Notifications */}
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
