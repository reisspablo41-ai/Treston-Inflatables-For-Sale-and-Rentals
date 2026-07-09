import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

const baseUrl = 'https://yourveryownbouncehousepartyrental.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Treston Inflatable for Sale and Rentals | Your Ultimate Party, Delivered",
    template: "%s | Treston Inflatable for Sale and Rentals"
  },
  description: "Inflatables, Mechanical Bulls, Concessions, Event Essentials, and more. Clean, sanitized, and on-time delivery across the DFW Metro.",
  keywords: ["party rentals", "bounce house rentals", "mechanical bull rental", "water slides", "event equipment", "DFW party rentals"],
  authors: [{ name: "Treston Inflatable for Sale and Rentals" }],
  creator: "Treston Inflatable for Sale and Rentals",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Treston Inflatable for Sale and Rentals",
    title: "Treston Inflatable for Sale and Rentals | Your Ultimate Party, Delivered",
    description: "Inflatables, Mechanical Bulls, Concessions, Event Essentials, and more. Clean, sanitized, and on-time delivery.",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Treston Inflatable for Sale and Rentals"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Treston Inflatable for Sale and Rentals | Your Ultimate Party, Delivered",
    description: "Inflatables, Mechanical Bulls, Concessions, Event Essentials, and more. Clean, sanitized, and on-time delivery.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
