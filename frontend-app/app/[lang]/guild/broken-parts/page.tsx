'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/pages/Navigation';
import Footer from '@/components/pages/Footer';
import TutorialStats from '@/components/pages/TutorialStats';
import translations from '@/lib/translations/tutorial-languages/broken.json';

interface LoosePartsPageProps {
  params: Promise<{ lang: string }>;
}

export default function LoosePartsPage({ params }: LoosePartsPageProps) {
  const [lang, setLang] = useState<string>('en');
  const [expandedStep, setExpandedStep] = useState<string>('diagnose');
  const [prepPercent, setPrepPercent] = useState<number>(0);

  useEffect(() => {
    params.then((p) => setLang(p.lang));
  }, [params]);

  const t = translations[lang as keyof typeof translations] || translations.en;

  const handleChecklistChange = useCallback((checkedCount: number) => {
    setPrepPercent(Math.round((checkedCount / t.prep.checklist.length) * 100));
  }, [t.prep.checklist.length]);

  const handleAccordionToggle = (stepId: string) => {
    const isClosing = expandedStep === stepId;
    setExpandedStep(isClosing ? '' : stepId);

    if (!isClosing) {
      setTimeout(() => {
        document.getElementById(`step-${stepId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
    }
  };

  return (
    <div className="loose-guide-page">
      <Navigation lang={lang} currentPage="guild" />

      <nav className="guild-trace-strip" aria-label="Tutorial path">
        <div className="container guild-trace-inner">
          <Link href={`/${lang}`}>{t.breadcrumb.home}</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/${lang}/guild`}>{t.breadcrumb.tutorials}</Link>
          <span aria-hidden="true">/</span>
          <span className="current">{t.breadcrumb.current}</span>
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
                <a href="https://www.amazon.com/Joints-Solution-Action-Figures-Models/dp/B0DLB26L8X/ref=sr_1_1?sr=8-1" style={{color:"blue"}}>{t.hero.kikiLinkText}</a> */}
                {/* {t.hero.leadPart2}<a href="https://www.amazon.com/Joints-Various-Models-Action-Figures/dp/B0CBVPXQLS/ref=sr_1_1?sr=8-1" style={{color:"blue"}}>{t.hero.mpsLinkText}</a>. */}
                
              </p>
              <p className="hero-lead">
                {t.hero.leadPart2}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
                <Image
                  src="/assets/kat.jpg"
                  alt="Example of a broken ball joint"
                  width={250}
                  height={150}
                  style={{ borderRadius: '8px', maxWidth: '100%', height: 'auto' }}
                />
              </div>
              <p className="hero-lead">
                {t.hero.leadPart3}
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

            <div className="workflow-list">
              {t.workflow.steps.map((step) => (
                <article key={step.id} className="workflow-item" id={`step-${step.id}`}>
                  <button
                    className="workflow-trigger"
                    onClick={() => handleAccordionToggle(step.id)}
                    aria-expanded={expandedStep === step.id}
                    aria-controls={`panel-${step.id}`}
                  >
                    <span>{step.title}</span>
                    <span className="workflow-icon">+</span>
                  </button>
                  <div
                    className={`workflow-panel ${expandedStep === step.id ? 'open' : ''}`}
                    id={`panel-${step.id}`}
                  >
                    <div className="workflow-panel-inner">
                      {step.content.map((text, idx) => (
                        <p key={idx}>{text}</p>
                      ))}
                      <ul>
                        {step.tips.map((tip, idx) => {
                          if (typeof tip === 'object' && tip !== null && 'video' in tip) {
                            const tipObj = tip as { text: string; video: string };
                            return (
                              <li key={idx} style={{ listStyle: 'none', margin: '12px 0' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                  <video
                                    src={tipObj.video}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    style={{ maxWidth: '30%', width: '320px', borderRadius: '8px' }}
                                  />
                                  <span className="muted">{tipObj.text}</span>
                                </div>
                              </li>
                            );
                          }
                          if (typeof tip === 'object' && tip !== null && 'image' in tip) {
                            const tipObj = tip as { text: string; image: string };
                            return (
                              <li key={idx} className="tip-with-image">
                                <Image
                                  src={tipObj.image}
                                  alt={tipObj.text}
                                  width={120}
                                  height={120}
                                  className="tip-image"
                                />
                                <span>{tipObj.text}</span>
                              </li>
                            );
                          }
                          return <li key={idx}>{tip as string}</li>;
                        })}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
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
                    <a href={`#step-${method.category}`} className="btn primary">
                      {t.methods.viewGuide}
                    </a>
                    <a href="#watch" className="btn outline">
                      {t.methods.videoBtn}
                    </a>
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
              tutorialSlug="loose-parts"
              viewsTitle={t.stats.viewsTitle}
              issuesTitle={t.stats.issuesTitle}
            />
          </div>
        </section>

        {/* Tutorial Return Row */}
        <div className="guild-return-row">
          <Link href={`/${lang}/guild`} className="btn outline small">
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

      <Footer />
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
