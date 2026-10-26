import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://zenhomestay.in'),
  title: "Homestay in Alleppey | Zen Homestay – Punnamada Lake",
  description: "Homestay in Alleppey on Punnamada Lake — direct lake views, complimentary speedboat pickup & authentic Kerala breakfast. Book direct with host Abhijith. Zero commission.",
  keywords: [
    "homestay in alleppey",
    "waterfront homestay alleppey",
    "boat race finishing point stay",
    "private lake view rooms alleppey",
    "zen homestay alleppey",
    "speedboat homestay alleppey"
  ],
  authors: [{ name: "Abhijith" }],
  creator: "Zen Homestay",
  openGraph: {
    title: "Homestay in Alleppey | Zen Homestay on Punnamada Lake",
    description: "The top-rated homestay in Alleppey — on Punnamada Lake opposite the Nehru Trophy finishing point. Direct lake views, speedboat pickup & Kerala breakfast. Book direct, zero commission.",
    url: "https://zenhomestay.in",
    siteName: "Zen Homestay Alleppey",
    images: [
      {
        url: "https://zenhomestay.in/kerala_backwaters_hero_1786702183985.jpg",
        width: 1200,
        height: 630,
        alt: "Zen Homestay – Homestay in Alleppey on Punnamada Lake",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Homestay in Alleppey | Zen Homestay on Punnamada Lake",
    description: "Top-rated homestay in Alleppey — direct Punnamada Lake views, speedboat pickup & authentic Kerala breakfast. Zero commission booking with host Abhijith.",
    images: ["/kerala_backwaters_hero_1786702183985.jpg"],
  },
  alternates: {
    canonical: "https://zenhomestay.in",
  },
  icons: {
    icon: "/zen-homestay-logo.jpg",
    shortcut: "/zen-homestay-logo.jpg",
    apple: "/zen-homestay-logo.jpg",
  },
  verification: {
    google: "WujqYXq12BW06BfB0dpJMO2R1KppwB3JzYDMKk4FXEA",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      style={{ colorScheme: 'light' }}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {/* Preconnect hints — saves 200-400ms on FCP for fonts & maps */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        {children}
        <SpeedInsights />
        <Analytics />
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="c98fb9a1-4e7b-41fe-941d-19fd921c6b1e"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
