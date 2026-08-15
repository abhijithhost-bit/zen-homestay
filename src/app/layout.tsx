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
  title: "Alleppey Homestay on Punnamada Lake | Zen Homestay – Best in Alleppey",
  description: "Zen Homestay is the best Alleppey homestay — a secluded waterfront retreat on Punnamada Lake with direct lake views, complimentary 5-min speedboat transfer & authentic Kerala breakfast. Book direct for best rates.",
  keywords: [
    "alleppey homestay",
    "best alleppey homestay",
    "homestay in alleppey",
    "punnamada lake homestay",
    "waterfront homestay alleppey",
    "kerala backwater homestay",
    "alleppey lake view homestay",
    "best home stay in alleppey",
    "boat race finishing point stay",
    "private lake view rooms alleppey",
    "heritage homestay kerala",
    "zen homestay alleppey"
  ],
  authors: [{ name: "Abhijith" }],
  creator: "Zen Homestay",
  openGraph: {
    title: "Alleppey Homestay on Punnamada Lake | Zen Homestay – Best in Alleppey",
    description: "The best Alleppey homestay — direct Punnamada Lake views, complimentary 5-min speedboat transfer & authentic Kerala breakfast. Book direct, zero commission.",
    url: "https://zen-homestay.vercel.app",
    siteName: "Zen Homestay Alleppey",
    images: [
      {
        url: "/kerala_backwaters_hero_1786702183985.jpg",
        width: 1200,
        height: 630,
        alt: "Zen Homestay – Best Alleppey Homestay on Punnamada Lake",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alleppey Homestay | Zen Homestay on Punnamada Lake",
    description: "The best Alleppey homestay — wake up to direct Punnamada Lake views. Speedboat access, Kerala breakfast & zero commission booking.",
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
      "name": "Zen Homestay – Alleppey Homestay",
      "headline": "Best Alleppey Homestay on Punnamada Lake",
      "description": "Zen Homestay is the best alleppey homestay — a secluded waterfront retreat on Punnamada Lake with direct lake views, complimentary 5-minute speedboat transfer from the Nehru Trophy Boat Race finishing point, and authentic Kerala home cooking.",
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
          "name": "What makes Zen Homestay the best alleppey homestay?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Zen Homestay is rated the best alleppey homestay because it sits directly on the banks of Punnamada Lake with zero road access, offering unmatched privacy, direct lake views from every room, complimentary speedboat pickup, and authentic Kerala home cooking — all at direct-host rates with no booking commissions."
          }
        },
        {
          "@type": "Question",
          "name": "How do guests arrive at this alleppey homestay?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Guests arrive at the Nehru Trophy Boat Race Finishing Point in Alleppey and are picked up via a complimentary, scenic 5-minute speed boat ride directly to this alleppey homestay's private dock on Punnamada Lake."
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
          "name": "What views can I enjoy from the rooms at this alleppey homestay?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Guests at this alleppey homestay can wake up to beautiful, direct views of Punnamada Lake right from the room and from the private traditional teak wooden balcony."
          }
        },
        {
          "@type": "Question",
          "name": "How can I book or contact the host?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can connect directly with the host, Abhijith, via WhatsApp or phone call at +91 7012 761 588 for instant booking and best rates for this alleppey homestay."
          }
        },
        {
          "@type": "Question",
          "name": "What meals are included at this alleppey homestay?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Every booking at Zen Homestay includes a complimentary authentic Kerala breakfast with Appam, Puttu, fresh fruits and local tea or coffee served beside the water."
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
      lang="en-IN"
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
