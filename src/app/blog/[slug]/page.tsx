import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts, getPostBySlug, getAllSlugs } from '../_data/posts';
import { Clock, ArrowRight, MessageCircle, Phone, ChevronLeft, BookOpen } from 'lucide-react';

// ─── Static Generation ────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// ─── Per-Page Metadata ────────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: 'Abhijith — Zen Homestay' }],
    alternates: { canonical: `https://zenhomestay.in/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.description,
      url: `https://zenhomestay.in/blog/${post.slug}`,
      siteName: 'Zen Homestay Alleppey',
      images: [{ url: `https://zenhomestay.in${post.heroImage}`, width: 1200, height: 630, alt: post.heroImageAlt }],
      type: 'article',
      publishedTime: post.publishedDate,
      authors: ['Abhijith — Zen Homestay'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.description,
      images: [`https://zenhomestay.in${post.heroImage}`],
    },
  };
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // JSON-LD Article schema — enables Google Article rich results
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: `https://zenhomestay.in${post.heroImage}`,
    datePublished: post.publishedDate,
    dateModified: post.updatedDate ?? post.publishedDate,
    author: {
      '@type': 'Person',
      name: 'Abhijith',
      url: 'https://zenhomestay.in',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Zen Homestay',
      url: 'https://zenhomestay.in',
      logo: {
        '@type': 'ImageObject',
        url: 'https://zenhomestay.in/zen-homestay-logo.jpg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://zenhomestay.in/blog/${post.slug}`,
    },
    keywords: post.keywords.join(', '),
  };

  // Related posts (up to 3, excluding current)
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const categoryColors: Record<string, string> = {
    'Travel Guide': 'bg-sky-50 text-sky-700 border-sky-200',
    'Things To Do': 'bg-orange-50 text-orange-700 border-orange-200',
    'Honeymoon': 'bg-rose-50 text-rose-700 border-rose-200',
    'Events': 'bg-amber-50 text-amber-700 border-amber-200',
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image src="/zen-homestay-logo.jpg" alt="Zen Homestay Logo" width={36} height={36}
              className="object-contain rounded-xl shadow-md" style={{ width: '36px', height: '36px' }} />
            <div>
              <span className="font-extrabold text-slate-900 text-sm block leading-none group-hover:text-sky-600 transition-colors">Zen Homestay</span>
              <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">Alleppey · Kerala</span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/blog" className="hidden sm:flex items-center gap-1.5 bg-slate-100 text-slate-700 border border-slate-200 px-3.5 py-2 rounded-full text-xs font-bold hover:bg-slate-200 transition-all">
              <BookOpen className="w-3.5 h-3.5" /> All Articles
            </Link>
            <a href="https://wa.me/917012761588" target="_blank" rel="noreferrer"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-xs font-extrabold transition-all shadow-md">
              Book Direct
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium pt-6 pb-4" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-slate-700 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-slate-700 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-slate-600 truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Article layout */}
        <article className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">

          {/* ── LEFT: Article content ── */}
          <div>
            {/* Category + meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${categoryColors[post.category] ?? 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Clock className="w-3.5 h-3.5" /> {post.readTime}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {new Date(post.publishedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              {post.title}
            </h1>

            <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-8 border-b border-slate-200 pb-8">
              {post.excerpt}
            </p>

            {/* Hero image */}
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-10 shadow-lg">
              <Image
                src={post.heroImage}
                alt={post.heroImageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 65vw"
                className="object-cover"
              />
            </div>

            {/* Sections */}
            <div className="prose prose-slate max-w-none space-y-10">
              {post.sections.map((section, idx) => (
                <section key={idx}>
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-3 leading-snug">
                    {section.heading}
                  </h2>
                  {section.body.map((para, pIdx) => (
                    <p key={pIdx} className="text-slate-700 text-sm sm:text-base leading-relaxed mb-3 [&_a]:text-sky-600 [&_a]:underline hover:[&_a]:text-sky-800 transition-colors" dangerouslySetInnerHTML={{ __html: para }} />
                  ))}
                </section>
              ))}
            </div>

            {/* CTA Card */}
            <div className="mt-12 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 rounded-3xl p-7 sm:p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-56 h-56 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <p className="text-amber-400 text-[11px] font-extrabold uppercase tracking-widest mb-2">Zen Homestay · Punnamada Lake</p>
                <h3 className="text-xl font-extrabold text-white mb-2">{post.cta.heading}</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">{post.cta.body}</p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/917012761588?text=${encodeURIComponent(post.cta.whatsappText)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold px-5 py-3 rounded-2xl text-xs sm:text-sm shadow-lg transition-all hover:-translate-y-0.5 active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    Check Availability on WhatsApp
                  </a>
                  <a
                    href="tel:+917012761588"
                    className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-bold px-4 py-3 rounded-2xl text-xs sm:text-sm transition-all hover:bg-white/20 active:scale-95"
                  >
                    <Phone className="w-4 h-4 text-sky-400" />
                    +91 7012 761 588
                  </a>
                </div>
              </div>
            </div>

            {/* Back to blog */}
            <Link href="/blog" className="inline-flex items-center gap-2 mt-8 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors group">
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to all articles
            </Link>
          </div>

          {/* ── RIGHT: Sticky sidebar ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Quick booking card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center mb-4 shadow-md">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base mb-1">Stay on Punnamada Lake</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">
                  Direct lake views · Speedboat pickup · Kerala breakfast · ₹3,000/night
                </p>
                <a
                  href={`https://wa.me/917012761588?text=${encodeURIComponent(post.cta.whatsappText)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold py-3 rounded-2xl text-xs shadow-md transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  WhatsApp Host
                </a>
                <a
                  href="tel:+917012761588"
                  className="w-full flex items-center justify-center gap-2 mt-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-2xl text-xs transition-all active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 text-sky-600" />
                  Call +91 7012 761 588
                </a>
              </div>

              {/* Related posts */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                <h3 className="font-extrabold text-slate-900 text-sm mb-4">More Articles</h3>
                <div className="space-y-4">
                  {related.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/blog/${rel.slug}`}
                      className="group flex items-start gap-3"
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                        <Image src={rel.heroImage} alt={rel.heroImageAlt} fill sizes="56px" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900 leading-snug group-hover:text-sky-700 transition-colors line-clamp-2">{rel.title}</p>
                        <p className="text-[11px] text-slate-400 font-medium mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {rel.readTime}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/blog" className="flex items-center gap-1 mt-5 text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors">
                  All articles <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </aside>

        </article>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 text-xs py-6 text-center">
        <p>© {new Date().getFullYear()} Zen Homestay · Punnamada Lake, Alleppey, Kerala</p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <Link href="/" className="hover:text-slate-300 transition-colors">Homestay Home</Link>
          <Link href="/blog" className="hover:text-slate-300 transition-colors">Blog</Link>
          <Link href="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
