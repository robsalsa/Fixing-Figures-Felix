'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navigation } from '@/components/pages/Navigation';
import { Footer } from '@/components/pages/Footer';

interface GuildRouterPageProps {
  params: Promise<{ lang: string }>;
}

const guilds = [
  {
    id: 'loose-parts',
    title: 'Loose Parts',
    description: 'When it comes to easy to pop-out hands or loose legs that constantly fall out. These things are not good by any means but we can fix it!',
    href: 'loose-parts',
    category: 'free fix'
  },
  {
    id: 'stiff-parts',
    title: 'Stiff Parts',
    description: 'Sometimes figures come a little too tight. Unfortunately, one wrong push or pull it might snap! Good thing there is ways to loosen up these parts!',
    href: 'stiff-parts',
    category: 'paid fix'
  },
  {
    id: 'defective-parts',
    title: 'Warping / Defective Parts',
    description: 'Ever got a piece or part that seems a little... off? Let\'s squash the weirdness and fix it!',
    href: 'defective-parts',
    category: 'paid fix'
  },
  {
    id: 'accessories',
    title: 'Accessories Customs / Fixes',
    description: '"These accessories suck! I bet I can make a better one!" Luckily we can help, so let\'s fix it!',
    href: 'accesories',
    category: 'special glue'
  },
  {
    id: 'broken-parts',
    title: 'Broken Parts',
    description: 'Broken parts are the worst, unfortunately this is one of the harder things to DIY. Even if it\'s hard that doesn\'t mean we cannot try to fix it! So, let\'s fix it!',
    href: 'broken-parts',
    category: 'paid fix'
  }
];

const mockStats = [
  { title: 'Test Data Poll', value: 100 },
  { title: 'Test Data Poll 2', value: 75 },
  { title: 'Test Data Poll 3', value: 50 },
  { title: 'Test Data Poll 4', value: 25 },
  { title: 'Test Data Poll 5', value: 0 }
];

export default async function GuildRouterPage({ params }: GuildRouterPageProps) {
  const { lang } = await params;

  return (
    <div className="guild-guide-page">
      <Navigation lang={lang} currentPage="guild-router" />


      <nav className="guild-trace-strip" aria-label="Guild path">
        <div className="container guild-trace-inner">
          <Link href={`/${lang}`}>Home</Link>
          <span aria-hidden="true">/</span>
          <span className="current">Guilds</span>
        </div>
      </nav>

      <main className="site-main">
        {/* Hero Section */}
        <section className="loose-container" style={{ padding: '36px 0 28px' }}>
          <div className="container">
            <h1 style={{ fontSize: '30px', margin: '0 0 12px' }}>General Guilds</h1>

            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h3 style={{ margin: '0 0 12px' }}>Let's Get To Fixing This!</h3>
              <p className="muted" style={{ margin: '0' }}>
                This guild centralizes community reports about loose, stiff or broken parts on figures. Note that
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
              Please Select What Guild You Wish to Follow!
            </h2>

            <div className="services-container" id="servicesContainer" style={{ marginTop: '24px' }}>
              {guilds.map((guild) => (
                <article key={guild.id} className="service-column card" data-category={guild.category}>
                  <h4>{guild.title}</h4>
                  <p className="muted">{guild.description}</p>
                  <div className="card-actions">
                    <Link href={`/${lang}/guild/${guild.href}`} className="btn primary" style={{ flex: '1' }}>
                      Let's Fix It!
                    </Link>
                    <a href="#" className="btn outline" style={{ flex: '1' }} onClick={(e) => e.preventDefault()}>
                      Video Tutorial
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="goal-section" style={{ padding: '36px 0 54px' }}>
          <div className="container">
            <div className="goal-grid">
              <div className="goal-content">
                <h3 style={{ margin: '0 0 16px' }}>Most Viewed Guilds</h3>
                <ul className="stats-list" aria-live="polite">
                  {mockStats.map((stat, index) => (
                    <li key={index}>
                      <div className="stat-meta">
                        <span className="stat-title">{stat.title}</span>
                        <span className="stat-value">{stat.value}%</span>
                      </div>
                      <div className="stat-bar">
                        <div style={{ width: `${stat.value}%` }}></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="goal-stats">
                <h3 style={{ margin: '0 0 16px' }}>Most Common Issues</h3>
                <ul className="stats-list" aria-live="polite">
                  {mockStats.map((stat, index) => (
                    <li key={index}>
                      <div className="stat-meta">
                        <span className="stat-title">{stat.title}</span>
                        <span className="stat-value">{stat.value}%</span>
                      </div>
                      <div className="stat-bar">
                        <div style={{ width: `${stat.value}%` }}></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <div className="guild-return-row">
          <Link href={`/${lang}`} className="btn secondary small">
            Back Home
          </Link>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
