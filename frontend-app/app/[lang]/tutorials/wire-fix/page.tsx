'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/pages/Navigation';
import Footer from '@/components/pages/Footer';

interface WireFixPageProps {
  params: Promise<{ lang: string }>;
}

export default function WireFixPage({ params }: WireFixPageProps) {
  const [lang, setLang] = useState<string>('en');

  useEffect(() => {
    params.then((p) => setLang(p.lang));
  }, [params]);

  return (
    <div className="loose-guide-page">
      <Navigation lang={lang} currentPage="guild" />

      <nav className="guild-trace-strip" aria-label="Tutorial path">
        <div className="container guild-trace-inner">
          <Link href={`/${lang}`}>Home</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/${lang}/tutorials`}>Tutorials</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/${lang}/tutorials/broken-parts`}>Broken Parts Tutorial</Link>
          <span aria-hidden="true">/</span>
          <span className="current">Other</span>
          <span aria-hidden="true">/</span>
          <span className="current">Wire Fix</span>
        </div>
      </nav>

      <main className="site-main">
        <section className="guide-hero" id="top">
          <div className="container hero-grid">
            <div className="hero-copy-block">
              <p className="eyebrow">EXTRA Generic Tutorial: Broken Parts</p>
              <h1>Using a Wire to Fix Broken Parts</h1>
              <p className="hero-lead">
                This guide is currently under construction. Check back soon for the full tutorial on using a metal wire as a replacement joint for broken wedged pieces.
              </p>

              <ul className="hero-pill-list" aria-label="Guild highlights">
                <li>NOT Beginner friendly</li>
                <li>Moderate cost</li>
                <li>Permanent figure alteration</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="content-section" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <div className="container">
            <h2 style={{ color: 'black', fontSize: '30px', marginBottom: '1rem' }}>🚧 Coming Soon</h2>
            <p className="muted" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
              This tutorial is still being written. In the meantime, check out the main Broken Parts tutorial for the recommended repair method.
            </p>
          </div>
        </section>

        <div className="guild-return-row">
          <Link href={`/${lang}/tutorials`} className="btn outline small">
            Back to Tutorials
          </Link>
          <Link href={`/${lang}/tutorials/broken-parts`} className="btn secondary small">
            Broken Parts Tutorial
          </Link>
          <a href="#top" className="btn primary small" style={{ color: 'black' }}>
            Back To Top
          </a>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
