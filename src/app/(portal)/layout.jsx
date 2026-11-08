import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata = {
  title: { default: "My Dashboard | Eye Interaction", template: "%s | Eye Interaction" },
  robots: { index: false, follow: false },
};

// Separate root layout for the signed-in user portal: no marketing navbar/footer.
export default function PortalRootLayout({ children }) {
  return (
    <html lang="en" className="native-cursor">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-[#f4f7ff] font-sans text-[#181824] antialiased`}>
        {children}
      </body>
    </html>
  );
}
