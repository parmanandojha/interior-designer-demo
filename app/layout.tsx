import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import PageTransition from "@/components/PageTransition";
import ChatBot from "@/components/ChatBot";

export const metadata: Metadata = {
  title: "Noma — Interior & Architecture Studio",
  description:
    "Noma is an interior and architecture studio in Silver Lake, Los Angeles. Calm, clarity, and a touch of boldness.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <head />
      <body className="bg-bone text-ink font-sans">
        <SmoothScroll />
        <Preloader />
        <Nav />
        <PageTransition>
          <main>{children}</main>
          <Footer />
        </PageTransition>
        <ChatBot />
      </body>
    </html>
  );
}
