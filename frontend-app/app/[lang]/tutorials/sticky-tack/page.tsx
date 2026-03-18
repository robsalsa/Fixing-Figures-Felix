'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/pages/Navigation';
import Footer from '@/components/pages/Footer';
import TutorialStats from '@/components/pages/TutorialStats';
import translations from '@/lib/translations/tutorial-languages/sticky-tack.json';
// import translations from '@/lib/translations/tutorial-languages/loose.json';



interface LoosePartsPageProps {
  params: Promise<{ lang: string }>;
}

export default function LoosePartsPage({ params }: LoosePartsPageProps) {
  const [lang, setLang] = useState<string>('en');
  const [prepPercent, setPrepPercent] = useState<number>(0);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    params.then((p) => setLang(p.lang));
  }, [params]);

  const t = translations[lang as keyof typeof translations] || translations.en;

  const handleChecklistChange = useCallback((checkedCount: number) => {
    setPrepPercent(Math.round((checkedCount / t.prep.checklist.length) * 100));
  }, [t.prep.checklist.length]);

  return (
    <div className="loose-guide-page">
      <Navigation lang={lang} currentPage="guild" />

      <nav className="guild-trace-strip" aria-label="Tutorial path">
        <div className="container guild-trace-inner">
          <Link href={`/${lang}`}>{t.breadcrumb.home}</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/${lang}/tutorials`}>{t.breadcrumb.tutorials}</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/${lang}/tutorials/loose-parts`}>Loose Parts Tutorial</Link>
          <span aria-hidden="true">/</span>
          <span className="current">Other</span>
          <span aria-hidden="true">/</span>
          <span className="current">Sticky Tack</span>
          
        </div>
      </nav>

      <main className="site-main">
        {/* Hero Section */}
        <section className="guide-hero" id="top">
          <div className="container hero-grid">
            <div className="hero-copy-block">
              <p className="eyebrow">{t.hero.eyebrow}</p>
              <h1>{t.hero.title}</h1>
              <p className="hero-lead">
                {t.hero.leadPart1}
                {/* <a href="https://www.amazon.com/Joints-Various-Models-Action-Figures/dp/B0CBVPXQLS/ref=sr_1_1?sr=8-1" style={{color:"blue"}}>{t.hero.mpsLinkText}</a>,{' '}
                <a href="https://www.amazon.com/Joints-Solution-Action-Figures-Models/dp/B0DLB26L8X/ref=sr_1_1?sr=8-1" style={{color:"blue"}}>{t.hero.kikiLinkText}</a>
                {t.hero.leadPart2}<a href="https://www.amazon.com/Joints-Various-Models-Action-Figures/dp/B0CBVPXQLS/ref=sr_1_1?sr=8-1" style={{color:"blue"}}>{t.hero.mpsLinkText}</a>. */}
              </p>
              <div className="hero-cta-row">
                <a href="#workflow" className="btn primary">
                  {t.hero.jumpToTutorial}
                </a>
                <a href="#watch" className="btn outline">
                  {t.hero.jumpToVideo}
                </a>
              </div>

              <ul className="hero-pill-list" aria-label={t.hero.highlightsLabel}>
                <li>{t.hero.pillBeginner}</li>
                <li>{t.hero.pillMethods}</li>
                <li>{t.hero.pillNoAlterations}</li>
              </ul>
            </div>

            <aside className="hero-side-card" aria-label="Quick navigation">
              <h2>{t.tutorialMap.title}</h2>
              <a href="#prep">{t.tutorialMap.preFixChecklist}</a>
              <a href="#workflow">{t.tutorialMap.stepByStep}</a>
              <a href="#watch">{t.tutorialMap.videoTutorial}</a>
              <a href="#method-library">{t.tutorialMap.otherMethods}</a>
              <a href="#stats">{t.tutorialMap.figureStats}</a>
            </aside>
          </div>
        </section>

        {/* Pre-Fix Checklist */}
        <section className="prep-section" id="prep">
          <div className="container prep-grid">
            <div>
              <h2 style={{color:"black", fontSize:"30px"}}>{t.prep.title}</h2>
              <p className="muted" style={{color:"black"}}>
                {t.prep.description}
              </p>

              <ChecklistItems
                items={t.prep.checklist}
                onChecklistChange={handleChecklistChange}
              />
            </div>

            <aside className="prep-progress-card" aria-live="polite">
              <p className="small-label">{t.prep.readiness}</p>
              <p className="progress-value">
                <span id="prepPercent">{prepPercent}%</span> {t.prep.complete}
              </p>
              <div className="prep-progress-bar" aria-hidden="true">
                <div
                  id="prepFill"
                  style={{
                    width: `${prepPercent}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #FFC60B, #FF8B00)',
                    borderRadius: '999px',
                    transition: 'width 260ms ease',
                  }}
                ></div>
              </div>
              <p className="muted small-note" id="prepStatus">
                {prepPercent === 0
                  ? t.prep.statusStart
                  : prepPercent === 100
                    ? t.prep.statusDone
                    : t.prep.statusProgress.replace('{percent}', String(prepPercent))}
              </p>
            </aside>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="workflow-section" id="workflow">
          <div className="container">
            <h2 style={{color:"black", fontSize:"30px"}}>{t.workflow.title}</h2>
            <p className="muted workflow-intro">
              {t.workflow.intro}
            </p>

            <div className="wf-timeline">
              {t.workflow.steps.map((step, stepIdx) => {
                const tips = step.tips as (string | { text: string; image?: string; link?: string })[];
                const images = tips.filter(
                  (tip): tip is { text: string; image: string } =>
                    typeof tip === 'object' && tip !== null && 'image' in tip
                );
                const bulletColors = ['#FF1A1A', '#FF8B00', '#FFC60B'];

                return (
                  <article key={step.id} className="wf-step" id={`step-${step.id}`}>
                    <div className="wf-step-marker">
                      <span className="wf-step-number">{stepIdx + 1}</span>
                      {stepIdx < t.workflow.steps.length - 1 && <div className="wf-step-line" />}
                    </div>

                    <div className="wf-step-body">
                      <h3 className="wf-step-title">{step.title}</h3>

                      <div className={`wf-step-content${images.length > 0 ? ' wf-has-media' : ''}`}>
                        {images.length > 0 && (
                          <div className="wf-media-col">
                            {images.map((img, imgIdx) => (
                              <button
                                key={imgIdx}
                                type="button"
                                className="wf-thumb-btn"
                                onClick={() => setLightbox({ src: img.image, alt: img.text })}
                                aria-label={`View ${img.text} image`}
                              >
                                <Image
                                  src={img.image}
                                  alt={img.text}
                                  width={220}
                                  height={220}
                                  className="wf-thumb"
                                />
                                <span className="wf-thumb-label">{img.text}</span>
                              </button>
                            ))}
                          </div>
                        )}

                        <div className="wf-instructions">
                          {step.content.map((text, idx) => (
                            <p key={idx} className="wf-content-text">{text}</p>
                          ))}

                          <ul className="wf-bullet-list">
                            {tips.map((tip, idx) => {
                              if (typeof tip === 'object' && tip !== null && 'image' in tip) return null;

                              if (typeof tip === 'string' && tip.startsWith('----------')) {
                                return <li key={idx} className="wf-divider" aria-hidden="true" />;
                              }

                              if (typeof tip === 'string' && tip === '*!*') return null;

                              if (typeof tip === 'object' && tip !== null && 'link' in tip) {
                                const tipObj = tip as { text: string; link: string };
                                return (
                                  <li key={idx} className="wf-bullet-item">
                                    <span className="wf-bullet-dot" style={{ background: bulletColors[idx % 3] }} />
                                    <a href={tipObj.link} className="wf-link" target="_blank" rel="noopener noreferrer">{tipObj.text}</a>
                                  </li>
                                );
                              }

                              const tipStr = tip as string;
                              const isCallout = tips[idx - 1] === '*!*' || tips[idx + 1] === '*!*';

                              if (isCallout) {
                                return (
                                  <li key={idx} className="wf-callout">
                                    <span className="wf-callout-icon">&#9888;</span>
                                    <span>{tipStr}</span>
                                  </li>
                                );
                              }

                              return (
                                <li key={idx} className="wf-bullet-item">
                                  <span className="wf-bullet-dot" style={{ background: bulletColors[idx % 3] }} />
                                  <span>{tipStr}</span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="video-section" id="watch">
          <div className="container">
            <h2 style={{color:"black", fontSize:"30px"}}>{t.video.title}</h2>
            <p className="muted">
              {t.video.description}<a href="https://www.youtube.com/@PilkMilkFactory" style={{color:"blue"}}>{t.video.channelName}</a>
            </p>

            <div className="video-grid">
              <article className="video-card">
                <h3>{t.video.videoTitle}</h3>
                <div
                  style={{
                    width: '100%',
                    paddingBottom: '56.25%',
                    position: 'relative',
                    backgroundColor: 'black',
                    borderRadius: '12px',
                  }}
                >
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: '12px',
                    }}
                  >
                    <source src="/assets/videos/loose(spider).mp4" type="video/mp4" />
                    {t.video.videoFallback}
                  </video>
                </div>
              </article>             
            </div>
          </div>
        </section>

        {/* Directory for other fixes */}
        <section className="content-section" id="method-library">
          <div className="container">
            <h2 className="section-title">{t.methods.title}</h2>
            <p className="muted">
              {t.methods.description}
            </p>

            <div className="services-container" id="servicesContainer">
              {t.methods.items.map((method) => (
                <article key={method.id} className="service-column card">
                  <h4>{method.title}</h4>
                  <p className="muted">{method.description}</p>
                  <p className="method-tag">{t.methods.costLabel} {method.cost}</p>
                  {method.effectiveness && (
                    <p className="method-tag">{t.methods.effectivenessLabel} {method.effectiveness}</p>
                  )}
                  {method.best_for && (
                    <p className="method-tag">{t.methods.bestForLabel} {method.best_for}</p>
                  )}
                  <div className="card-actions">
                    <a href={`/${lang}/tutorials/${method.guide}`} className="btn primary">
                      {t.methods.viewGuide}
                    </a>
                    {/* <a href="#watch" className="btn outline">
                      {t.methods.videoBtn}
                    </a> */}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="goal-section" id="stats">
          <div className="container">
            <TutorialStats
              tutorialSlug="sticky-tack"
              viewsTitle={t.stats.viewsTitle}
              issuesTitle={t.stats.issuesTitle}
            />
          </div>
        </section>

        {/* Tutorial Return Row */}
        <div className="guild-return-row">
          <Link href={`/${lang}/tutorials`} className="btn outline small">
            {t.nav.backToTutorials}
          </Link>
          <Link href={`/${lang}`} className="btn secondary small">
            {t.nav.backHome}
          </Link>
          <a href="#top" className="btn primary small" style={{color: "black"}}>
            {t.nav.backToTop}
          </a>
        </div>
      </main>

      {lightbox && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              background: '#fff',
              borderRadius: '12px',
              padding: '16px',
            }}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close image"
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1,
              }}
            >
              &times;
            </button>
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              width={600}
              height={600}
              style={{ maxWidth: '85vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: '8px' }}
            />
            <p style={{ textAlign: 'center', marginTop: '8px', fontWeight: 600 }}>{lightbox.alt}</p>
          </div>
        </div>
      )}

      <Footer lang={lang} />
    </div>
  );
}

function ChecklistItems({
  items,
  onChecklistChange,
}: {
  items: string[];
  onChecklistChange: (checkedCount: number) => void;
}) {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(() =>
    new Array(items.length).fill(false),
  );

  // Keep checkedItems in sync when the items list changes length
  useEffect(() => {
    setCheckedItems((prev) => {
      if (prev.length === items.length) return prev;
      const next = new Array(items.length).fill(false);
      for (let i = 0; i < Math.min(prev.length, items.length); i++) {
        next[i] = prev[i];
      }
      return next;
    });
  }, [items.length]);

  useEffect(() => {
    onChecklistChange(checkedItems.filter(Boolean).length);
  }, [checkedItems, onChecklistChange]);

  const handleCheck = (index: number) => {
    setCheckedItems((prev) => {
      const newChecked = [...prev];
      newChecked[index] = !newChecked[index];
      return newChecked;
    });
  };

  return (
    <div className="prep-items" role="group" aria-label="Preparation checklist">
      {items.map((item, index) => (
        <label key={index}>
          <input
            type="checkbox"
            className="prep-check"
            checked={checkedItems[index] ?? false}
            onChange={() => handleCheck(index)}
          />
          {item}
        </label>
      ))}
    </div>
  );
}
