'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/pages/Navigation';
import Footer from '@/components/pages/Footer';

interface LoosePartsPageProps {
  params: Promise<{ lang: string }>;
}

interface WorkflowStep {
  id: string;
  title: string;
  content: string[];
  tips: string[];
}

interface Method {
  id: string;
  title: string;
  description: string;
  cost: string;
  category: string;
}

interface Stat {
  label: string;
  value: number;
}

export default function LoosePartsPage({ params }: LoosePartsPageProps) {
  const [lang, setLang] = useState<string>('en');
  const [expandedStep, setExpandedStep] = useState<string>('diagnose');
  const [prepPercent, setPrepPercent] = useState<number>(0);

  useEffect(() => {
    params.then((p) => setLang(p.lang));
  }, [params]);

  const workflowSteps: WorkflowStep[] = [
    {
      id: 'diagnose',
      title: 'Stage 1: Diagnose The Joint Type',
      content: ['Identify whether the loose part is a peg, hinge, ball joint, or sliding rail.'],
      tips: [
        'Check for side wobble vs full spin.',
        'Mark friction points with a removable pencil dot.',
        'Avoid force testing with accessories attached.',
      ],
    },
    {
      id: 'tighten',
      title: 'Stage 2: Apply Reversible Tightening',
      content: ['Use reversible methods first before glue or replacement parts.'],
      tips: [
        'PTFE tape micro-wrap for pegs and neck stems.',
        'Water-based floor polish micro-layer for hinge cups.',
        'Let each layer cure fully, then re-test range.',
      ],
    },
    {
      id: 'lock',
      title: 'Stage 3: Escalate To Semi-Permanent Methods',
      content: ['Only escalate when reversible fixes fail after repeated testing.'],
      tips: [
        'Micro-shim sleeves for neck and wrist pegs.',
        'Specialized tack formulas for intermittent slip.',
        'Track cure times and avoid movement while setting.',
      ],
    },
    {
      id: 'maintain',
      title: 'Stage 4: Maintenance Protocol',
      content: ['Maintenance keeps your fix effective and reduces rework frequency.'],
      tips: [
        'Monthly range-of-motion checks.',
        'De-pose heavy one-leg stances during storage.',
        'Reapply friction enhancer at first sign of drift.',
      ],
    },
  ];

  const methods: Method[] = [
    {
      id: 'warm-water',
      title: 'Warm Water Reset + Movement Cycling',
      description: 'A zero-cost baseline method for stiffness and micro-looseness.',
      cost: 'Free',
      category: 'free fix',
    },
    {
      id: 'micro-tack',
      title: 'Micro Tack Dot Strategy',
      description: 'Controlled tack points for joints that slip during dynamic posing.',
      cost: 'Low',
      category: 'special glue',
    },
    {
      id: 'ptfe-tape',
      title: 'PTFE Tape Micro-Wrap',
      description: 'Reliable friction boost for loose pegs without permanent changes.',
      cost: 'Low',
      category: 'friction',
    },
    {
      id: 'replacement-peg',
      title: 'Replacement Peg + Sleeve Kit',
      description: 'Best for severe wear where friction methods no longer hold poses.',
      cost: 'Medium',
      category: 'paid fix',
    },
    {
      id: 'custom-shim',
      title: 'Custom Shim Lock-In',
      description: 'A long-term option for display pieces that need maximum stability.',
      cost: 'Medium',
      category: 'permanent',
    },
  ];

  const prepChecklist = [
    'Wash hands and clear dust from joints',
    'Capture before-photos of current posing range',
    'Test movement dry before adding any material',
    'Prepare cotton swabs and microfiber cloth',
    'Decide whether you need reversible or permanent fix',
    'Test equipment and clear workspace',
  ];

  const statsData: Stat[] = [
    { label: 'Test Data Poll', value: 100 },
    { label: 'Test Data Poll 2', value: 75 },
    { label: 'Test Data Poll 3', value: 50 },
    { label: 'Test Data Poll 4', value: 25 },
    { label: 'Test Data Poll 5', value: 0 },
  ];

  const handleChecklistChange = (checkedCount: number) => {
    setPrepPercent(Math.round((checkedCount / prepChecklist.length) * 100));
  };

  const handleAccordionToggle = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? '' : stepId);
  };

  return (
    <div className="loose-guide-page">
      <Navigation lang={lang} currentPage="guild" />

      <nav className="guild-trace-strip" aria-label="Guild path">
        <div className="container guild-trace-inner">
          <Link href={`/${lang}`}>Home</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/${lang}/guild`}>Guilds</Link>
          <span aria-hidden="true">/</span>
          <span className="current">Loose Parts Guild</span>
        </div>
      </nav>

      <main className="site-main">
        {/* Hero Section */}
        <section className="guide-hero" id="top">
          <div className="container hero-grid">
            <div className="hero-copy-block">
              <p className="eyebrow">Community Guild: Loose Parts</p>
              <h1>Build tighter joints, safer poses, and longer figure life.</h1>
              <p className="hero-lead">
                This guild is a full learning path for collectors: diagnosis, tool prep, quick fixes,
                long-term methods, and embedded videos to follow step-by-step.
              </p>
              <div className="hero-cta-row">
                <a href="#workflow" className="btn primary">
                  Start The Guild
                </a>
                <a href="#watch" className="btn outline">
                  Jump To Videos
                </a>
              </div>
              <ul className="hero-pill-list" aria-label="Guild highlights">
                <li>Beginner friendly</li>
                <li>No teardown required first</li>
                <li>Free and paid pathways</li>
              </ul>
            </div>

            <aside className="hero-side-card" aria-label="Quick navigation">
              <h2>Guild Map</h2>
              <a href="#prep">1. Pre-Fix Checklist</a>
              <a href="#workflow">2. Repair Workflow</a>
              <a href="#watch">3. Video Learning Bay</a>
              <a href="#method-library">4. Method Library</a>
              <a href="#stats">5. Collector Benchmarks</a>
            </aside>
          </div>
        </section>

        {/* Pre-Fix Checklist */}
        <section className="prep-section" id="prep">
          <div className="container prep-grid">
            <div>
              <h2>Pre-Fix Checklist</h2>
              <p className="muted">
                Check these first to reduce risk. This tracker updates as you mark items complete.
              </p>

              <ChecklistItems
                items={prepChecklist}
                onChecklistChange={handleChecklistChange}
              />
            </div>

            <aside className="prep-progress-card" aria-live="polite">
              <p className="small-label">Readiness</p>
              <p className="progress-value">
                <span id="prepPercent">{prepPercent}%</span> complete
              </p>
              <div className="prep-progress-bar" aria-hidden="true">
                <div id="prepFill" style={{ width: `${prepPercent}%` }}></div>
              </div>
              <p className="muted small-note" id="prepStatus">
                {prepPercent === 0
                  ? 'Start with your first checklist item.'
                  : prepPercent === 100
                    ? 'You are fully prepared to begin!'
                    : `You are ${prepPercent}% ready. Keep going!`}
              </p>
            </aside>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="workflow-section" id="workflow">
          <div className="container">
            <h2>Repair Workflow: From Loose To Locked In</h2>
            <p className="muted workflow-intro">
              Expand each stage for exact actions, timing, and stop signs.
            </p>

            <div className="workflow-list">
              {workflowSteps.map((step) => (
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
                    {step.content.map((text, idx) => (
                      <p key={idx}>{text}</p>
                    ))}
                    <ul>
                      {step.tips.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="video-section" id="watch">
          <div className="container">
            <h2>Video Bay</h2>
            <p className="muted">
              Follow the local breakdown first, then continue with curated external walk-throughs.
            </p>

            <div className="video-grid">
              <article className="video-card">
                <h3>Hands-On Local Demo</h3>
                <div
                  style={{
                    width: '100%',
                    paddingBottom: '56.25%',
                    position: 'relative',
                    backgroundColor: '#000',
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
                    Your browser does not support embedded video playback.
                  </video>
                </div>
              </article>             
            </div>
          </div>
        </section>

        {/* Method Library */}
        <section className="content-section" id="method-library">
          <div className="container">
            <h2 className="section-title">Method Library</h2>
            <p className="muted">Filter by cost and permanence to pick your best path quickly.</p>

            <div className="services-container" id="servicesContainer">
              {methods.map((method) => (
                <article key={method.id} className="service-column card">
                  <h4>{method.title}</h4>
                  <p className="muted">{method.description}</p>
                  <p className="method-tag">Cost: {method.cost}</p>
                  <div className="card-actions">
                    <a href={`#step-${method.category}`} className="btn primary">
                      View Guide
                    </a>
                    <a href="#watch" className="btn outline">
                      Video
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
            <div className="goal-grid">
              <div className="goal-content">
                <h3>Most Viewed Guilds</h3>
                <ul className="stats-list" aria-live="polite">
                  {statsData.map((stat, idx) => (
                    <li key={idx}>
                      <div className="stat-meta">
                        <span className="stat-title">{stat.label}</span>
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
                <h3>Most Common Issues</h3>
                <ul className="stats-list" aria-live="polite">
                  {statsData.map((stat, idx) => (
                    <li key={idx}>
                      <div className="stat-meta">
                        <span className="stat-title">{stat.label}</span>
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

        {/* Guild Return Row */}
        <div className="guild-return-row">
          <Link href={`/${lang}/guild`} className="btn outline small">
            Back to Guilds
          </Link>
          <Link href={`/${lang}`} className="btn secondary small">
            Back Home
          </Link>
          <a href="#top" className="btn primary small" style={{color: "black"}}>
            Back To Top
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
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(items.length).fill(false));

  const handleCheck = (index: number) => {
    const newChecked = [...checkedItems];
    newChecked[index] = !newChecked[index];
    setCheckedItems(newChecked);
    onChecklistChange(newChecked.filter(Boolean).length);
  };

  return (
    <div className="prep-items" role="group" aria-label="Preparation checklist">
      {items.map((item, index) => (
        <label key={index}>
          <input
            type="checkbox"
            className="prep-check"
            checked={checkedItems[index]}
            onChange={() => handleCheck(index)}
          />
          {item}
        </label>
      ))}
    </div>
  );
}
