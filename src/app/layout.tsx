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
  metadataBase: new URL('https://abhijithr.online'),
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
    url: "https://abhijithr.online",
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
    canonical: "https://abhijithr.online",
  },
  verification: {
    google: "DNNTBKuN-gS4T_vMrmELRf8nQyOGaiKOdtleVeRTyPA",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["BedAndBreakfast", "LodgingBusiness"],
      "@id": "https://abhijithr.online/#lodging",
      "name": "Zen Homestay – Alleppey Homestay",
      "alternateName": "Zen Homestay Punnamada Lake Alleppey",
      "url": "https://abhijithr.online",
      "headline": "Best Alleppey Homestay on Punnamada Lake",
      "description": "Zen Homestay is the best Alleppey homestay — a secluded waterfront retreat on Punnamada Lake with direct lake views, complimentary 5-minute speedboat transfer from the Nehru Trophy Boat Race finishing point, and authentic Kerala home cooking.",
      "image": [
        "https://abhijithr.online/kerala_backwaters_hero_1786702183985.jpg",
        "https://abhijithr.online/kerala_heritage_room_1786702263227.jpg",
        "https://abhijithr.online/kerala_boat_arrival_1786708991444.jpg",
        "https://abhijithr.online/kerala_lake_dining_1786708655762.jpg",
        "https://abhijithr.online/kerala_balcony_view_1786702364116.jpg"
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
        "latitude": 9.5015,
        "longitude": 76.3537
      },
      "hasMap": "https://maps.google.com/?q=9.5015,76.3537",
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
        { "@type": "LocationFeatureSpecification", "name": "Authentic Kerala Breakfast Included", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Air Conditioning", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Free High-Speed Wi-Fi", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Private Wooden Balcony", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Zero Road Noise Seclusion", "value": true }
      ],
      "containsPlace": [
        {
          "@type": "HotelRoom",
          "name": "Lake View Heritage Bedroom 1",
          "description": "Spacious heritage lakefront room with direct panoramic Punnamada Lake views, AC, and private wooden balcony.",
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
          "name": "Lake View Heritage Bedroom 2",
          "description": "Traditional Kerala teak wood interior with direct lake breeze, AC, and private waterfront veranda.",
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
      ],
      "review": [
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Arun Menon" },
          "datePublished": "2026-07-15",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "reviewBody": "The speedboat ride from the finishing point set the tone immediately. Best alleppey homestay I've ever stayed at — waking up to Punnamada Lake right outside the bedroom window was pure magic!"
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Lakshmi Thomas" },
          "datePublished": "2026-08-01",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "reviewBody": "Unmatched privacy at this homestay in Alleppey! No roads nearby means total silence and the most serene water views I've experienced. Abhijith was an incredible, attentive host throughout."
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Divya Varghese" },
          "datePublished": "2026-07-25",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "reviewBody": "We searched for the best waterfront homestay in Alleppey and Zen Homestay exceeded every expectation. The Kerala breakfast served by the lakeside was divine — Appam and stew tasted like a dream!"
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Vineeth Nair" },
          "datePublished": "2026-07-10",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "reviewBody": "Stayed here for our anniversary and it was phenomenal. This Punnamada Lake homestay is unlike anything else in Alleppey — the direct lake view from bed, the wooden balcony, the morning breeze. Absolutely 5 stars."
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Anju Jacob" },
          "datePublished": "2026-06-20",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "reviewBody": "If you're looking for a peaceful Kerala backwater homestay, stop searching — this is it. The speedboat pickup felt like arriving at a private island resort. Abhijith's hospitality is truly world-class."
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Siddharth Kumar" },
          "datePublished": "2026-06-15",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "reviewBody": "Traveled from Bangalore to experience Kerala's backwaters — this alleppey homestay on Punnamada Lake was the highlight of our entire trip. The authentic food, the silence, the lake... absolutely spectacular."
        }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://abhijithr.online/#website",
      "url": "https://abhijithr.online",
      "name": "Zen Homestay Alleppey",
      "description": "Official website for Zen Homestay — secluded waterfront homestay on Punnamada Lake, Alleppey.",
      "publisher": { "@id": "https://abhijithr.online/#lodging" },
      "inLanguage": "en-IN"
    },
    {
      "@type": "WebPage",
      "@id": "https://abhijithr.online/#webpage",
      "url": "https://abhijithr.online",
      "name": "Alleppey Homestay on Punnamada Lake | Zen Homestay – Best in Alleppey",
      "isPartOf": { "@id": "https://abhijithr.online/#website" },
      "about": { "@id": "https://abhijithr.online/#lodging" },
      "description": "Zen Homestay is the best Alleppey homestay — a secluded waterfront retreat on Punnamada Lake with direct lake views, complimentary 5-min speedboat transfer & authentic Kerala breakfast.",
      "breadcrumb": { "@id": "https://abhijithr.online/#breadcrumb" },
      "inLanguage": "en-IN"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://abhijithr.online/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://abhijithr.online"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Alleppey Homestay",
          "item": "https://abhijithr.online/#stay"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://abhijithr.online/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What makes Zen Homestay the best alleppey homestay?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Zen Homestay is rated the best alleppey homestay because it sits directly on the banks of Punnamada Lake with zero road access. Guests enjoy unmatched privacy, waking up to uninterrupted water views, authentic home-cooked Kerala cuisine, complimentary speedboat pickup, and personalized 5-star hospitality from host Abhijith — all at direct-host rates with no booking commissions."
          }
        },
        {
          "@type": "Question",
          "name": "How does the complimentary 5-minute speed boat transfer work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "When you arrive in Alleppey, you head to the iconic Nehru Trophy Boat Race Finishing Point. Our team greets you there and escorts you onto our private speed boat for a scenic 5-minute ride across Punnamada Lake directly to our private docks. The boat transfer is 100% complimentary for all our guests."
          }
        },
        {
          "@type": "Question",
          "name": "Why is there no road connectivity to the homestay?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our property was chosen deliberately to give our guests complete privacy and authentic backwater peace. Without roads or vehicular traffic, there is zero engine noise or pollution—only gentle water breezes, chirping birds, and tranquil lake vistas."
          }
        },
        {
          "@type": "Question",
          "name": "What meals are included with the stay?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Every booking includes a freshly prepared, authentic Kerala morning breakfast featuring classic favorites like hot Appam with stew, Puttu, fresh tropical fruits, and freshly brewed local tea or coffee served right beside the water."
          }
        },
        {
          "@type": "Question",
          "name": "How do I check room availability or reserve a date?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We believe in direct, hassle-free host communication without third-party commission markups. Simply message us on WhatsApp or call host Abhijith directly at +91 7012 761 588 to check your preferred dates and receive instant confirmation."
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
