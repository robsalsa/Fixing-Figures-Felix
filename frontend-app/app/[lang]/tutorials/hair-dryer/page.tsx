'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/pages/Navigation';
import Footer from '@/components/pages/Footer';

interface HairDryerPageProps {
  params: Promise<{ lang: string }>;
}

export default function HairDryerPage({ params }: HairDryerPageProps) {
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
          <Link href={`/${lang}/tutorials/stiff-parts`}>Stiff Parts Tutorial</Link>
          <span aria-hidden="true">/</span>
          <span className="current">Other</span>
          <span aria-hidden="true">/</span>
          <span className="current">Hair Dryer</span>
        </div>
      </nav>

      <main className="site-main">
        <section className="guide-hero" id="top">
          <div className="container hero-grid">
            <div className="hero-copy-block">
              <p className="eyebrow">EXTRA Generic Tutorial: Stiff Parts</p>
              <h1>Using a Hair Dryer to Loosen Stiff Parts</h1>
              <p className="hero-lead">
                This guide is currently under construction. Check back soon for the full tutorial on using a hair dryer to carefully warm up and loosen stiff joints on your figures.
              </p>

              <ul className="hero-pill-list" aria-label="Guild highlights">
                <li>Beginner friendly</li>
                <li>Low cost</li>
                <li>No permanent figure alterations</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="content-section" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <div className="container">
            <h2 style={{ color: 'black', fontSize: '30px', marginBottom: '1rem' }}>🚧 Coming Soon</h2>
            <p className="muted" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
              This tutorial is still being written. In the meantime, check out the main Stiff Parts tutorial for the recommended warm water method.
            </p>
          </div>
        </section>

        <div className="guild-return-row">
          <Link href={`/${lang}/tutorials`} className="btn outline small">
            Back to Tutorials
          </Link>
          <Link href={`/${lang}/tutorials/stiff-parts`} className="btn secondary small">
            Stiff Parts Tutorial
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
