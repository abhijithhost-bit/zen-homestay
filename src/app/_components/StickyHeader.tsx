'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, Phone } from 'lucide-react';

export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full transition-all duration-500 ease-in-out"
      style={scrolled ? { padding: '10px 16px' } : {}}
    >
      {/* Ultra-thin accent line */}
      <div
        className="h-[3px] bg-gradient-to-r from-sky-500 via-orange-400 to-sky-500 transition-all duration-500"
        style={scrolled ? { height: 0 } : {}}
      />

      <div
        className="transition-all duration-500 ease-in-out"
        style={scrolled
          ? {
            background: 'rgba(15,23,42,0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '9999px',
            boxShadow: '0 8px 40px -8px rgba(0,0,0,0.45)',
            border: '1px solid rgba(255,255,255,0.08)',
            maxWidth: '1050px',
            margin: '0 auto',
          }
          : {
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(203,213,225,0.7)',
            boxShadow: '0 4px 30px -5px rgba(0,0,0,0.08)',
          }
        }
      >
        <div
          className="transition-all duration-500 ease-in-out flex items-center justify-between"
          style={scrolled
            ? { padding: '6px 18px', gap: '10px' }
            : { maxWidth: '80rem', margin: '0 auto', padding: '0 1rem', height: '72px', gap: '16px' }
          }
        >
          {/* Brand Logo & Superhost Badge */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink min-w-0">
            <div className="relative shrink-0">
              <Image
                src="/zen-homestay-logo.jpg"
                alt="Zen Homestay Logo"
                width={44}
                height={44}
                className="object-contain rounded-xl transition-all duration-500"
                style={scrolled
                  ? { width: '32px', height: '32px', borderRadius: '8px' }
                  : { width: '48px', height: '48px', borderRadius: '14px', boxShadow: '0 4px 12px rgba(14,165,233,0.2)', outline: '3px solid rgb(224,242,254)' }
                }
              />
              {/* Live green dot */}
              <span
                className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 border-2 rounded-full transition-all duration-500"
                style={scrolled
                  ? { width: '8px', height: '8px', borderColor: 'rgb(15,23,42)' }
                  : { width: '10px', height: '10px', borderColor: 'white' }
                }
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span
                className="font-extrabold tracking-tight leading-none transition-all duration-500 truncate"
                style={scrolled ? { color: 'white', fontSize: '15px' } : { color: 'rgb(15,23,42)', fontSize: '19px' }}
              >
                Zen Homestay
              </span>
              <span
                className="font-bold tracking-wider uppercase flex items-center gap-1 truncate transition-all duration-500"
                style={scrolled
                  ? { color: 'rgb(125,211,252)', fontSize: '9px', marginTop: '1px' }
                  : { color: 'rgb(2,132,199)', fontSize: '11px', marginTop: '3px' }
                }
              >
                <span className="truncate">Punnamada Lake · Alleppey, Kerala</span>
              </span>
            </div>
          </Link>

          {/* Centre Nav — desktop only */}
          <nav
            className="hidden lg:flex items-center rounded-full p-1 text-xs font-bold gap-0.5 transition-all duration-500"
            style={scrolled
              ? { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }
              : { background: 'rgba(241,245,249,0.9)', border: '1px solid rgba(203,213,225,0.8)', boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.05)' }
            }
          >
            {[
              { href: '#arrival', label: 'Arrival Route' },
              { href: '#stay', label: 'Lakefront Rooms' },
              { href: '#amenities', label: 'Amenities' },
              { href: '#how-to-book', label: 'How to Book' },
              { href: '#faq', label: 'FAQs' },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="px-3.5 py-1.5 rounded-full transition-all duration-200 relative group whitespace-nowrap"
                style={scrolled
                  ? { color: 'rgba(255,255,255,0.8)' }
                  : { color: 'rgb(71,85,105)' }
                }
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = scrolled ? 'rgba(255,255,255,0.12)' : 'white';
                  (e.currentTarget as HTMLElement).style.color = scrolled ? 'white' : 'rgb(15,23,42)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = scrolled ? 'rgba(255,255,255,0.8)' : 'rgb(71,85,105)';
                }}
              >
                {label}
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 group-hover:w-4 h-[2px] bg-orange-400 rounded-full transition-all duration-200" />
              </a>
            ))}
            <div
              className="h-3.5 w-px mx-1"
              style={scrolled ? { background: 'rgba(255,255,255,0.15)' } : { background: 'rgb(203,213,225)' }}
            />
            <div
              className="flex items-center gap-1.5 px-3 py-0.5 text-[11px] font-extrabold"
              style={scrolled ? { color: 'rgb(251,146,60)' } : { color: 'rgb(234,88,12)' }}
            >
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full w-2 h-2 bg-orange-500" />
              </span>
              Direct Host Rates
            </div>
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* WhatsApp — visible from sm */}
            <a
              href="https://wa.me/917012761588"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full transition-all duration-300 active:scale-95"
              style={scrolled
                ? { background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.15)' }
                : { background: 'rgb(240,253,244)', color: 'rgb(6,78,59)', border: '1px solid rgba(187,247,208,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }
              }
            >
              <MessageCircle
                className="w-4 h-4"
                style={scrolled ? { color: 'rgb(134,239,172)' } : { color: 'rgb(22,163,74)' }}
              />
              <span>WhatsApp</span>
            </a>

            {/* WhatsApp icon-only — mobile */}
            <a
              href="https://wa.me/917012761588"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full active:scale-95 transition-all"
              style={scrolled
                ? { background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }
                : { background: 'rgb(240,253,244)', border: '1px solid rgba(187,247,208,0.8)' }
              }
            >
              <MessageCircle
                className="w-4 h-4"
                style={scrolled ? { color: 'rgb(134,239,172)' } : { color: 'rgb(22,163,74)' }}
              />
            </a>

            {/* Contact Host */}
            <Link
              href="/contact"
              className="bg-[#C05200] hover:bg-[#a34500] text-white text-xs font-extrabold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-200 shadow-md active:scale-95 flex items-center gap-1.5"
              style={scrolled
                ? { boxShadow: '0 4px 20px rgba(192,82,0,0.4)' }
                : { boxShadow: '0 4px 12px rgba(192,82,0,0.25)' }
              }
            >
              <Phone className="w-3.5 h-3.5 hidden sm:block" />
              <span>Contact Host</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
