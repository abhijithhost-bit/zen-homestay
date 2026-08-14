import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
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
  metadataBase: new URL('https://zen-homestay.vercel.app'),
  title: "Best Home stay in alleppey | Zen Homestay Punnamada Lake",
  description: "Wake up to beautiful, direct views of Punnamada Lake at Zen Homestay. Exclusive waterfront heritage stay near the boat race finishing point, accessible via complimentary 5-minute speed boat transfer.",
  keywords: [
    "best home stay in alleppey",
    "punnamada lake homestay",
    "waterfront homestay alleppey",
    "boat race finishing point stay",
    "kerala backwater homestay",
    "private lake view rooms alleppey",
    "heritage homestay kerala",
    "zen homestay alleppey"
  ],
  authors: [{ name: "Abhijith" }],
  creator: "Zen Homestay",
  openGraph: {
    title: "Best Home stay in alleppey | Zen Homestay Punnamada Lake",
    description: "Wake up to beautiful, direct views of Punnamada Lake. Exclusive waterfront privacy with complimentary 5-minute speed boat transfer.",
    url: "https://zen-homestay.vercel.app",
    siteName: "Zen Homestay Alleppey",
    images: [
      {
        url: "/kerala_backwaters_hero_1786702183985.jpg",
        width: 1200,
        height: 630,
        alt: "Zen Homestay - Best Home stay in alleppey on Punnamada Lake",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Home stay in alleppey | Zen Homestay",
    description: "Wake up to beautiful, direct views of Punnamada Lake at Zen Homestay. Exclusive speedboat access & ultimate privacy.",
    images: ["/kerala_backwaters_hero_1786702183985.jpg"],
  },
  alternates: {
    canonical: "https://zen-homestay.vercel.app",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BedAndBreakfast",
      "@id": "https://zen-homestay.vercel.app/#lodging",
      "name": "Zen Homestay",
      "headline": "Best Home stay in alleppey",
      "description": "Wake up to beautiful, direct views of Punnamada Lake right from the room. Exclusive waterfront heritage homestay with complimentary 5-minute private speed boat pickup from the boat race finishing point.",
      "image": [
        "https://zen-homestay.vercel.app/kerala_backwaters_hero_1786702183985.jpg",
        "https://zen-homestay.vercel.app/kerala_heritage_room_1786702263227.jpg",
        "https://zen-homestay.vercel.app/kerala_boat_arrival_1786708991444.jpg",
        "https://zen-homestay.vercel.app/kerala_lake_dining_1786708655762.jpg",
        "https://zen-homestay.vercel.app/kerala_balcony_view_1786702364116.jpg"
      ],
      "telephone": "+91-7012-761-588",
      "priceRange": "₹₹",
      "currenciesAccepted": "INR",
      "paymentAccepted": "Cash, UPI, Bank Transfer",
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
        "latitude": 9.5015,
        "longitude": 76.3537
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.98",
        "reviewCount": "48",
        "bestRating": "5",
        "worstRating": "1"
      },
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Direct Punnamada Lake View", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Complimentary Speedboat Transfer", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Authentic Kerala Breakfast", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Air Conditioning", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Free High-Speed Wi-Fi", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Private Wooden Balcony", "value": true }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://zen-homestay.vercel.app/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do guests arrive at Zen Homestay?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Guests arrive at the Nehru Trophy Boat Race Finishing Point in Alleppey and are picked up via a complimentary, scenic 5-minute speed boat ride directly to the homestay's private dock."
          }
        },
        {
          "@type": "Question",
          "name": "Is there road connectivity to Zen Homestay?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Zen Homestay deliberately has no road connectivity. This ensures 100% privacy, peaceful silence, and an authentic waterfront escape without traffic or noise."
          }
        },
        {
          "@type": "Question",
          "name": "What views can I enjoy from the rooms?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Guests can wake up to beautiful, direct views of Punnamada Lake right from the room and from the private traditional teak wooden balcony."
          }
        },
        {
          "@type": "Question",
          "name": "How can I book or contact the host?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can connect directly with the host, Abhijith, via WhatsApp or phone call at +91 7012 761 588 for instant booking and best rates."
          }
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
      lang="en"
      style={{ colorScheme: 'light' }}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
