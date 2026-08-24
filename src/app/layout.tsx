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
  title: "Alleppey Homestay on Punnamada Lake | Zen Homestay – Best in Alleppey",
  description: "Zen Homestay is the best Alleppey homestay — a modern lakefront retreat on Punnamada Lake, located directly opposite the Nehru Trophy Boat Race finishing point. Enjoy direct lake views, beautiful sunsets, complimentary speedboat pickup & drop-off & authentic Kerala breakfast. Book direct for best rates.",
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
    description: "The best Alleppey homestay — directly across Punnamada Lake from the Nehru Trophy finishing point. Direct lake views, complimentary speedboat pickup & drop-off & authentic Kerala breakfast. Book direct, zero commission.",
    url: "https://zenhomestay.in",
    siteName: "Zen Homestay Alleppey",
    images: [
      {
        url: "https://zenhomestay.in/kerala_backwaters_hero_1786702183985.jpg",
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
    description: "The best Alleppey homestay — wake up to direct Punnamada Lake views opposite the Nehru Trophy finishing point. Speedboat pickup & drop-off, Kerala breakfast & zero commission booking.",
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
    google: "DNNTBKuN-gS4T_vMrmELRf8nQyOGaiKOdtleVeRTyPA",
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
        "ratingValue": "4.98",
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
      "name": "Alleppey Homestay on Punnamada Lake | Zen Homestay – Best in Alleppey",
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
    },
    {
      "@type": "FAQPage",
      "@id": "https://zenhomestay.in/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What makes Zen Homestay the best alleppey homestay?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Zen Homestay is located on Punnamada Lake, directly across the water from the famous Nehru Trophy Boat Race Finishing Point — which you can see from the homestay. Guests enjoy direct lake views, beautiful sunsets, complimentary speedboat pickup AND drop-off, morning tea, authentic home-cooked Kerala breakfast, and personalized host care from Abhijith — all at direct-host rates with zero commission."
          }
        },
        {
          "@type": "Question",
          "name": "How does the complimentary speedboat pickup and drop-off work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "When you arrive in Alleppey, head to the Nehru Trophy Boat Race Finishing Point. Host Abhijith meets you there and brings you across Punnamada Lake by private speedboat in about 5 minutes. When you check out, we drop you back to the same point. Both pickup and drop-off are 100% complimentary for all guests."
          }
        },
        {
          "@type": "Question",
          "name": "Can I see the Nehru Trophy Boat Race Finishing Point from the homestay?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Zen Homestay is located on the opposite bank of Punnamada Lake from the Nehru Trophy Finishing Point. You can clearly see the finishing point from the property, and during boat race season you get a stunning front-row view from across the water."
          }
        },
        {
          "@type": "Question",
          "name": "What meals are included with the stay?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Every booking includes morning tea and a freshly prepared authentic Kerala breakfast featuring classic favorites like hot Appam with stew, Puttu, fresh tropical fruits, and freshly brewed local tea or coffee."
          }
        },
        {
          "@type": "Question",
          "name": "What water activities are available at Zen Homestay?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Abhijith can arrange Shikara rides, kayaking, and speedboat rides on Punnamada Lake — all available at an extra charge. Just let him know in advance and he'll arrange everything for your stay."
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
