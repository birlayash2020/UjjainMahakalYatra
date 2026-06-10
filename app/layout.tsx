import type { Metadata } from "next";
import { Outfit, Lora } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ujjain Mahakal & Omkareshwar Yatra | Spiritual Hindu & Jain Tour Packages",
  description: "Book custom travel packages to Ujjain Mahakaleshwar, Omkareshwar Mamleshwar, and sacred Hindu and Jain tirths. Check prices, itineraries, and book now.",
  keywords: ["Ujjain Mahakal Yatra", "Omkareshwar Yatra", "12 Jyotirlinga Tour", "Hindu Devotional Tour", "Jain Tirth India", "Mahakal Mandir Booking"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#2C2520] font-sans">
        {children}
      </body>
    </html>
  );
}
