import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from './_data/posts';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Alleppey Travel Blog — Backwater Tips, Guides & Local Insights | Zen Homestay',
  description: 'Discover Alleppey through our travel blog — the best time to visit, things to do beyond the houseboat, how to reach Alleppey, honeymoon guide, Nehru Trophy Boat Race, and more.',
  keywords: ['alleppey travel blog', 'alleppey travel tips', 'kerala backwater guide', 'alleppey homestay blog', 'punnamada lake guide'],
  alternates: { canonical: 'https://zenhomestay.in/blog' },
  openGraph: {
    title: 'Alleppey Travel Blog | Zen Homestay',
    description: 'Backwater tips, seasonal guides, honeymoon advice, and local insights from a homestay directly on Punnamada Lake.',
    url: 'https://zenhomestay.in/blog',
    images: [{ url: 'https://zenhomestay.in/kerala_backwaters_hero_1786702183985.jpg', width: 1200, height: 630 }],
  },
};

const categoryColors: Record<string, string> = {
  'Travel Guide': 'bg-sky-50 text-sky-700 border-sky-200',
  'Things To Do': 'bg-orange-50 text-orange-700 border-orange-200',
  'Honeymoon': 'bg-rose-50 text-rose-700 border-rose-200',
  'Events': 'bg-amber-50 text-amber-700 border-amber-200',
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image src="/zen-homestay-logo.jpg" alt="Zen Homestay Logo" width={36} height={36}
              className="object-contain rounded-xl shadow-md" style={{ width: '36px', height: '36px' }} />
            <div>
              <span className="font-extrabold text-slate-900 text-sm block leading-none group-hover:text-sky-600 transition-colors">Zen Homestay</span>
              <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">Alleppey · Kerala</span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/" className="hidden sm:flex items-center gap-1.5 bg-slate-100 text-slate-700 border border-slate-200 px-3.5 py-2 rounded-full text-xs font-bold hover:bg-slate-200 transition-all">
              ← Back to Homestay
            </Link>
            <a href="https://wa.me/917012761588" target="_blank" rel="noreferrer"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-xs font-extrabold transition-all shadow-md">
              Book Direct
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        {/* Page Hero */}
        <div className="text-center py-14 sm:py-20">
          <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <BookOpen className="w-3.5 h-3.5" />
            Alleppey Travel Blog
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Discover Alleppey &amp;<br className="hidden sm:block" />
            <span className="text-sky-600"> Kerala Backwaters</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Local guides, seasonal tips, activity roundups, and honest travel advice — written from a homestay directly on Punnamada Lake.
          </p>
        </div>

        {/* Featured Post */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group block rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[340px]">
              <Image
                src={featured.heroImage}
                alt={featured.heroImageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${categoryColors[featured.category] ?? 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                  {featured.category}
                </span>
              </div>
            </div>
            <div className="p-7 sm:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mb-3">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {featured.readTime}
                </span>
                <span>·</span>
                <span>{new Date(featured.publishedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug mb-3 group-hover:text-sky-700 transition-colors">
                {featured.title}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center gap-1.5 text-sky-600 font-bold text-sm group-hover:gap-3 transition-all">
                Read article <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Link>

        {/* Rest of posts grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Card image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={post.heroImage}
                  alt={post.heroImageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${categoryColors[post.category] ?? 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium mb-2">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                  <span>·</span>
                  {new Date(post.publishedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
                <h2 className="font-extrabold text-slate-900 text-base leading-snug mb-2 group-hover:text-sky-700 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-slate-500 text-xs leading-relaxed flex-1 line-clamp-3">{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-1 text-sky-600 font-bold text-xs group-hover:gap-2 transition-all">
                  Read article <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <div className="mt-16 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 rounded-3xl p-8 sm:p-10 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <p className="text-amber-400 text-xs font-extrabold uppercase tracking-widest mb-3">Stay Where the Stories Happen</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Zen Homestay on Punnamada Lake
            </h2>
            <p className="text-slate-300 text-sm max-w-lg mx-auto mb-7 leading-relaxed">
              Direct lake views, complimentary speedboat pickup &amp; drop-off, authentic Kerala breakfast, and a host who responds in under 5 minutes. Zero commission — book direct.
            </p>
            <a
              href="https://wa.me/917012761588"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg text-sm transition-all hover:-translate-y-0.5"
            >
              Reserve via WhatsApp
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 text-xs py-6 text-center">
        <p>© {new Date().getFullYear()} Zen Homestay · Punnamada Lake, Alleppey, Kerala</p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <Link href="/" className="hover:text-slate-300 transition-colors">Homestay Home</Link>
          <Link href="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
          <Link href="/blog" className="hover:text-slate-300 transition-colors">Blog</Link>
        </div>
      </footer>
    </div>
  );
}
