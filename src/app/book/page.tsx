import type { Metadata } from 'next';
import BookCheckoutClient from './BookCheckoutClient';

export const metadata: Metadata = {
  title: 'Direct Booking Checkout | Zen Homestay Punnamada Lake, Alleppey',
  description:
    'Complete your direct booking with host Abhijith at Zen Homestay. Zero commissions, complimentary speedboat pickup & drop-off, authentic Kerala breakfast.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;

  return <BookCheckoutClient initialSearchParams={resolvedParams} />;
}

