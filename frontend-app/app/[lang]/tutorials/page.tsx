'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navigation } from '@/components/pages/Navigation';
import { Footer } from '@/components/pages/Footer';
import TutorialStats from '@/components/pages/TutorialStats';
import translations from '@/lib/translations/general.json';

interface GuildRouterPageProps {
  params: Promise<{ lang: string }>;
}

export default function GuildRouterPage({ params }: GuildRouterPageProps) {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    params.then((p) => setLang(p.lang));
  }, [params]);

  const t = translations[lang as keyof typeof translations] || translations.en;

  const guilds = useMemo(() => [
    {
      id: 'loose-parts',
      title: t.loosePartsTitle,
      description: t.loosePartsDescription,
      href: 'loose-parts',
      category: t.categoryFreeFix,
      video: '/assets/videos/loose(spider).mp4'
    },
    {
      id: 'stiff-parts',
      title: t.stiffPartsTitle,
      description: t.stiffPartsDescription,
      href: 'stiff-parts',
      category: t.categoryPaidFix,
      video: '/assets/videos/Stiff(Vegi).mp4',
      hasAudio: true
    },
    // {
    //   id: 'defective-parts',
    //   title: 'Warping / Defective Parts',
    //   description: 'Ever got a piece or part that seems a little... off? Let\'s squash the weirdness and fix it!',
    //   href: 'defective-parts',
    //   category: t.categoryPaidFix
    // },
    // {
    //   id: 'accessories',
    //   title: 'Accessories Customs / Fixes',
    //   description: '"These accessories suck! I bet I can make a better one!" Luckily we can help, so let\'s fix it!',
    //   href: 'accesories',
    //   category: 'special glue'
    // },
    {
      id: 'broken-parts',
      title: t.brokenPartTitle,
      description: t.brokenPartDescription,
      href: 'broken-parts',
      category: t.categoryPaidFix,
      image: '/assets/broken(igawa).png'
    },
    {
      id: 'coming-soon',
      title: t.comingSoonTitle,
      description: [
        t.comingSoonAccessories,
        t.comingSoonDefective,
        t.comingSoonBroken
      ],
      href: '',
      image: '/assets/comingsoonbear.gif'
    }
  ], [t]);

  return (
    <div className="guild-guide-page">
      <Navigation lang={lang} currentPage="guild-router" />


      <nav className="guild-trace-strip" aria-label="Tutorial path">
        <div className="container guild-trace-inner">
          <Link href={`/${lang}`}>{t.breadcrumbHome}</Link>
          <span aria-hidden="true">/</span>
          <span className="current">{t.breadcrumbTutorials}</span>
        </div>
      </nav>

      <main className="site-main">
        {/* Hero Section */}
        <section className="loose-container" style={{ padding: '36px 0 28px' }}>
          <div className="container">
            <h1 style={{ fontSize: '30px', margin: '0 0 12px' }}>{t.pageTitle}</h1>

            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h3 style={{ margin: '0 0 12px' }}>{t.cardHeading}</h3>
              <p className="muted" style={{ margin: '0' }}>
                {t.cardDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="content-section" style={{ padding: '24px 0' }}>
          <div className="container">
            <h2 className="section-title" style={{ textAlign: 'center', margin: '0 0 20px' }}>
              {t.filterTitle}
            </h2>

            <div className="services-container" id="servicesContainer" style={{ marginTop: '24px' }}>
              {guilds.map((guild) => (
                <article key={guild.id} className="service-column card" data-category={guild.category}>
                  <h4>{guild.title}</h4>
                  {Array.isArray(guild.description) ? (
                    <ul className="muted" style={{ paddingLeft: '20px', margin: '0' }}>
                      {guild.description.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="muted">{guild.description}</p>
                  )}
                  {guild.video && (
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
                      <video
                        src={guild.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls={guild.hasAudio}
                        style={{ maxWidth: '70%', borderRadius: '8px' }}
                      />
                    </div>
                  )}
                  {guild.image && (
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
                      <Image
                        src={guild.image}
                        alt={guild.title}
                        width={guild.id === 'coming-soon' ? 250 : 500}
                        height={guild.id === 'coming-soon' ? 250 : 500}
                        style={{ maxWidth: '90%', height: 'auto', borderRadius: '8px' }}
                        unoptimized={guild.image.endsWith('.gif')}
                      />
                    </div>
                  )}
                  <div className="card-actions">
                    <Link href={guild.id === 'coming-soon' ? `/${lang}/tutorials` : `/${lang}/tutorials/${guild.href}`} className="btn primary" style={{ flex: '1' }}>
                      {t.letsFixIt}
                    </Link>
                    {/* <a href="#" className="btn outline" style={{ flex: '1' }} onClick={(e) => e.preventDefault()}>
                      Video Tutorial
                    </a> */}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="goal-section" style={{ padding: '36px 0 54px' }}>
          <div className="container">
            <TutorialStats
              viewsTitle={t.mostViewedTutorials}
              issuesTitle={t.mostCommonIssues}
              noViewsText={t.noViewsText}
              noIssuesText={t.noIssuesText}
            />
          </div>
        </section>

        <div className="guild-return-row">
          <Link href={`/${lang}`} className="btn secondary small">
            {t.backHome}
          </Link>
        </div>
        {/* (URL paths intentionally keep /guild/ — only visible labels say Tutorial) */}
      </main>

      <Footer lang={lang} />
    </div>
  );
}
