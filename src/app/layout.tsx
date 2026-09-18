import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["BedAndBreakfast", "LodgingBusiness"],
      "@id": "https://zenhomestay.in/#lodging",
      "name": "Zen Homestay – Alleppey Homestay",
      "alternateName": "Zen Homestay Punnamada Lake Alleppey",
      "url": "https://zenhomestay.in",
      "headline": "Best Alleppey Homestay on Punnamada Lake",
      "description": "Zen Homestay is the best Alleppey homestay — a modern lakefront retreat on Punnamada Lake, situated directly across the water from the famous Nehru Trophy Boat Race Finishing Point, which guests can see from the property. Complimentary speedboat pickup AND drop-off from the finishing point, stunning sunset views, and authentic Kerala home cooking.",
      "image": [
        "https://zenhomestay.in/kerala_backwaters_hero_1786702183985.jpg",
        "https://zenhomestay.in/kerala_heritage_room_1786702263227.jpg",
        "https://zenhomestay.in/kerala_boat_arrival_1786708991444.jpg",
        "https://zenhomestay.in/kerala_lake_dining_1786708655762.jpg",
        "https://zenhomestay.in/kerala_balcony_view_1786702364116.jpg"
      ],
      "telephone": "+91-7012-761-588",
      "email": "hello@zenhomestay.in",
      "priceRange": "₹3,000 - ₹6,000",
      "currenciesAccepted": "INR",
      "paymentAccepted": "Cash, UPI, Bank Transfer",
      "checkinTime": "14:00",
      "checkoutTime": "11:00",
      "numberOfRooms": 2,
      "petsAllowed": false,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Near Nehru Trophy Boat Race Finishing Point, Punnamada Lake",
        "addressLocality": "Alleppey",
        "addressRegion": "Kerala",
        "postalCode": "688006",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 9.502023969622542,
        "longitude": 76.35757685613443
      },
      "hasMap": "https://maps.google.com/?q=9.502023969622542,76.35757685613443",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": 48,
        "bestRating": "5",
        "worstRating": "1"
      },
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Direct Punnamada Lake View", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Views of Nehru Trophy Finishing Point", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Complimentary Speedboat Pickup & Drop-off", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Authentic Kerala Breakfast Included", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Morning Tea Included", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Air Conditioning", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Free High-Speed Wi-Fi", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Private Lake-Facing Balcony", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Shikara Rides Available", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Kayaking Available", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Speedboat Rides Available", "value": true }
      ],
      "containsPlace": [
        {
          "@type": "HotelRoom",
          "name": "Lake View Bedroom 1",
          "description": "Modern AC lakefront room with direct panoramic Punnamada Lake views, comfortable king bed, attached bathroom, and lake-facing balcony. Located on the private 2nd floor.",
          "bed": {
            "@type": "BedDetails",
            "numberOfBeds": 1,
            "typeOfBed": "King Bed"
          },
          "occupancy": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 3
          }
        },
        {
          "@type": "HotelRoom",
          "name": "Lake View Bedroom 2",
          "description": "Modern AC lakefront room with direct Punnamada Lake views, comfortable king bed, and private attached bathroom. Located on the private 2nd floor with beautiful sunset views.",
          "bed": {
            "@type": "BedDetails",
            "numberOfBeds": 1,
            "typeOfBed": "King Bed"
          },
          "occupancy": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 3
          }
        }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://zenhomestay.in/#website",
      "url": "https://zenhomestay.in",
      "name": "Zen Homestay Alleppey",
      "description": "Official website for Zen Homestay — secluded waterfront homestay on Punnamada Lake, Alleppey.",
      "publisher": { "@id": "https://zenhomestay.in/#lodging" },
      "inLanguage": "en-IN"
    },
    {
      "@type": "WebPage",
      "@id": "https://zenhomestay.in/#webpage",
      "url": "https://zenhomestay.in",
      "name": "Homestay in Alleppey on Punnamada Lake | Zen Homestay",
      "isPartOf": { "@id": "https://zenhomestay.in/#website" },
      "about": { "@id": "https://zenhomestay.in/#lodging" },
      "description": "Zen Homestay is the best Alleppey homestay — a secluded waterfront retreat on Punnamada Lake with direct lake views, complimentary 5-min speedboat transfer & authentic Kerala breakfast.",
      "breadcrumb": { "@id": "https://zenhomestay.in/#breadcrumb" },
      "inLanguage": "en-IN"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://zenhomestay.in/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://zenhomestay.in"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Alleppey Homestay",
          "item": "https://zenhomestay.in/#stay"
        }
      ]
    }
  ]
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        {/* Preconnect hints — saves 200-400ms on FCP for fonts & maps */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
