'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navigation } from '@/components/pages/Navigation';
import { Footer } from '@/components/pages/Footer';
import TutorialStats from '@/components/pages/TutorialStats';

interface GuildRouterPageProps {
  params: Promise<{ lang: string }>;
}

const guilds = [
  {
    id: 'loose-parts',
    title: 'Loose Parts',
    description: 'When it comes to easy to pop-out hands or loose legs that constantly fall out. These things are not good by any means but we can fix it!',
    href: 'loose-parts',
    category: 'free fix',
    video: '/assets/videos/loose(spider).mp4'
  },
  {
    id: 'stiff-parts',
    title: 'Stiff Parts',
    description: 'Sometimes figures come a little too tight. Unfortunately, one wrong push or pull it might snap! Good thing there is ways to loosen up these parts! Unmute the video to hear the stiffness.',
    // description:'(Unmute the video to hear the stiffness)',
    href: 'stiff-parts',
    category: 'paid fix',
    video: '/assets/videos/Stiff(Vegi).mp4',
    hasAudio: true
  },
  // {
  //   id: 'defective-parts',
  //   title: 'Warping / Defective Parts',
  //   description: 'Ever got a piece or part that seems a little... off? Let\'s squash the weirdness and fix it!',
  //   href: 'defective-parts',
  //   category: 'paid fix'
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
    title: 'Broken Parts',
    description: 'Broken parts are the worst, unfortunately this is one of the harder things to DIY. Even if it\'s hard that doesn\'t mean we cannot try to fix it! So, let\'s fix it! Guide is only for Ball Joint-like pieces.',
    href: 'broken-parts',
    category: 'paid fix',
    image: '/assets/broken(igawa).png'
  }
];

export default function GuildRouterPage({ params }: GuildRouterPageProps) {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    params.then((p) => setLang(p.lang));
  }, [params]);

  return (
    <div className="guild-guide-page">
      <Navigation lang={lang} currentPage="guild-router" />


      <nav className="guild-trace-strip" aria-label="Tutorial path">
        <div className="container guild-trace-inner">
          <Link href={`/${lang}`}>Home</Link>
          <span aria-hidden="true">/</span>
          <span className="current">Tutorials</span>
        </div>
      </nav>

      <main className="site-main">
        {/* Hero Section */}
        <section className="loose-container" style={{ padding: '36px 0 28px' }}>
          <div className="container">
            <h1 style={{ fontSize: '30px', margin: '0 0 12px' }}>General Tutorials</h1>

            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h3 style={{ margin: '0 0 12px' }}>Let's Get To Fixing This!</h3>
              <p className="muted" style={{ margin: '0' }}>
                This tutorial hub centralizes community reports about loose, stiff or broken parts on figures. Note that
                these issues can appear on any figures outside of Amazing Yamaguchi and Revoltech figures. While
                unfortunate that this issue is not so uncommon, fixes for this is very common and easy to do.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="content-section" style={{ padding: '24px 0' }}>
          <div className="container">
            <h2 className="section-title" style={{ textAlign: 'center', margin: '0 0 20px' }}>
              Please Select What Tutorial You Wish to Follow!
            </h2>

            <div className="services-container" id="servicesContainer" style={{ marginTop: '24px' }}>
              {guilds.map((guild) => (
                <article key={guild.id} className="service-column card" data-category={guild.category}>
                  <h4>{guild.title}</h4>
                  <p className="muted">{guild.description}</p>
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
                        width={500}
                        height={500}
                        style={{ maxWidth: '90%', height: 'auto', borderRadius: '8px' }}
                      />
                    </div>
                  )}
                  <div className="card-actions">
                    <Link href={`/${lang}/tutorials/${guild.href}`} className="btn primary" style={{ flex: '1' }}>
                      Let's Fix It!
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
              viewsTitle="Most Viewed Tutorials"
              issuesTitle="Most Common Issues"
            />
          </div>
        </section>

        <div className="guild-return-row">
          <Link href={`/${lang}`} className="btn secondary small">
            Back Home
          </Link>
        </div>
        {/* (URL paths intentionally keep /guild/ — only visible labels say Tutorial) */}
      </main>

      <Footer lang={lang} />
    </div>
  );
}
