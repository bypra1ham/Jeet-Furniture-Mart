import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Tiro_Devanagari_Sanskrit } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import BackgroundDriftOverlay from "@/components/ui/BackgroundDriftOverlay";
import GlobalViewTracker from "@/components/GlobalViewTracker";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const tiro = Tiro_Devanagari_Sanskrit({
  variable: "--font-tiro-sanskrit",
  subsets: ["latin", "devanagari"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Jeet Furniture Mart | Handcrafted Mandirs, Modular Furniture & CNC Art",
  description: "Experience handcrafted luxury at Jeet Furniture Mart. Explore our premium Wooden Mandirs, Jhulas, Modern Modular Sofas, Beds, TV Units, and Precision CNC Carving Art.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${tiro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-base-bg text-charcoal-dark selection:bg-gold-accent/30 relative">
        <GlobalViewTracker />
        <ScrollProgress />
        <CustomCursor />
        <BackgroundDriftOverlay />
        <LoadingScreen />
        <Navbar />
        <main className="flex-grow relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
