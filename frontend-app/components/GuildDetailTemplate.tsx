'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/pages/Navigation';
import { Footer } from '@/components/pages/Footer';
import '@/app/guild-guide.css';

interface GuildDetailLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string; guild: string }>;
  title: string;
  description: string;
}

/**
 * Template component for guild-specific pages (loose-parts, stiff-parts, etc.)
 * This component provides consistent header, navigation, and footer structure
 * for all guild detail pages.
 */
export function GuildDetailTemplate({
  lang,
  guildName,
  guildTitle,
  children
}: {
  lang: string;
  guildName: string;
  guildTitle: string;
  children: ReactNode;
}) {
  return (
    <div className="guild-guide-page">
      <Navigation lang={lang} currentPage="guild-detail" />

      <nav className="guild-trace-strip" aria-label="Guild path">
        <div className="container guild-trace-inner">
          <Link href={`/${lang}`}>Home</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/${lang}/guild`}>Guilds</Link>
          <span aria-hidden="true">/</span>
          <span className="current">{guildTitle}</span>
        </div>
      </nav>

      <main className="site-main">
        {children}
      </main>

      <Footer lang={lang} />
    </div>
  );
}
