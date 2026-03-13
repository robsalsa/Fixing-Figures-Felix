'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/pages/Navigation';
import Footer from '@/components/pages/Footer';
import TutorialStats from '@/components/pages/TutorialStats';

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
      title: 'Stage 1: Diagnose Where The Issue Is',
      content: ['Identify what peices are loose for you to apply this glue.'],
      tips: [
        'Figure out what part is loose because the location where the glue will go with be according to certain pieces. For instance pieces like the: ',
        '------------------------------------------------------------------------------------',
        'Ball Joint',
        'Hinge Joint',
        'Double Hinge',
        'Swivel Joint',
        'and so on...',
        '------------------------------------------------------------------------------------',
        'The reason that we place a lot of emphisis on this is becuase depending on what type of joint the location to apply this glue will vary.',
        'Some you will apply directly on a joint piece such as the Ball Joint, but on something like Knee Hinge it would be better to apply the glue within the socket.',
        '------------------------------------------------------------------------------------',
        'I will be fixing both the Amazing Yamaguchi Arkham Knight and the Amazing Yamaguchi One Punch Man figures.',
        'With the Arkham Knight I will show case how to apply the glue with Knee Hinges while with One Punch Man I will show case how to apply with a ball joint.',


        'add images here!!!!!',


      ],
    },
    {
      id: 'tighten',
      title: 'Stage 2: Spit Some Glue To It',
      content: ['After isolating what piece(s) are loose the next thing to do is glue it.'],
      tips: [
        'Beginning with the Arkham Kinght, since with this figure it\'s knee hinge is loose the best way to apply the glue will be through poping off the upper leg from lower leg.',
        'This might be different on non-Amazing Yamaguchi figures but when it comes to hinge-like peices the part that has this socket: (IMAGE HERE OF THE SOCKET ON ARKHAM KNIGHT) Will be the part were the glue will be applied in.',
        'Apply a few drops into the socket, then reassemble parts together, move them a bit to ensure that both male and female peices are completely coated, and let it settle for a few minutes.',
        '*!*',
        'ADD THREE IMAGES LIKE IFIXIT TO BETTER SHOW WHATS GOING ON THROUGH TEXT',
        '*!*',
        '------------------------------------------------------------------------------------',
        '*!*',
        'Something important to keep in mind is that if the hinge seems to still be loose apply a little more through the gap inside the knee. Move the figure again to coat and let it rest until the glue solidifies.',
        '*!*',
        '------------------------------------------------------------------------------------',
        'Now it\'s time for ball joint-like parts. This one should be pretty easy since a direct application of the glue will sufice.',
        'Note that depending on the type of ball joint the method should be very similar to one another.',
        '*!*',
        'SHOW IMAGES OF THE ONE PUNCH MAN BALL JOINT BEING STIFFENED UP',
        '*!*',
      ],
    },
    {
      id: 'lock',
      title: 'Stage 3: Check and Clean Up',
      content: ['Since this is the most effective method to solve these type of loose part problems. That pretty much it.'],
      tips: [
        'For whatever excess of glue was used simply use a paper towel to clean it off.',
        'Note that some spill over is perfectly fine when it only spill onto the same piece',
        'In the other hand if the spill of glue is reaching another unrelated piece, it\'s recommended to clean up before the glue settles.',
      ],
    },
    {
      id: 'other-options',
      title: 'Other Options for Figure Glue',
      content: ['While in this tutorial the use of the MPS Fix Loose Joint glue this is not the only glue of this type. Luckily, there is multiple glues for you to use.'],
      tips: [
        'MPS Fix Loose Joints (Amazon)',
        'Kiki Fix Loose Joints Solution (Amazon)',
        '43ml Fix Loose Joints Solution (Amazon)',
        '*!* Note that unfortunately MPS Fix Loose Joints is the ONLY glue we can vouch for. Simple because we own and use this glue specifically *!*',
      ],
    },
  ];

  const methods: Method[] = [
    {
      id: 'warm-water',
      title: 'Using a Wet Paper Towel',
      description: 'Stuffing a wet paper towel piece into a socked to apply friction. Due to this added friction the pieces should now "stick" onto each other.',
      cost: 'Free',
      effectiveness:'Somewhat',
      best_for:'Hinge-like Parts',
      category: 'free fix',
    },
    {
      id: 'micro-tack',
      title: 'Using a Dot of Sticky Tack',
      description: 'Applying a well placed dot of sticky tack or sticky putty can go a long way. Best used for smaller pieces such as loose accesories, hand pieces, and other smaller parts on figures.',
      cost: 'Low',
      effectiveness:'Very Effective!',
      best_for:'Hand-Swaps, Small Accesories, Small Joints, Small Hinges',
      category: 'special glue',
    },
    {
      id: 'ptfe-tape',
      title: 'Taking Up Space With Saran Wrap',
      description: 'Similar to the Wet Paper Towel method\'s goal is to do the same thing. Take up space and cause more friction for loose parts to "stick together".',
      cost: 'Low',
      effectiveness:'Somewhat',
      best_for:'Hinge-like Parts',
      category: 'friction',
    },
  ];

  const prepChecklist = [
    'Check and ensure, that the figure in question is not broken.',
    'Purchase glue. In this case there is multiple glues to use but for the purposes of this tutorial I will be using "MPS Fix Loose Joints"',
    'Have a clean and orginized location to apply glue. Note that the glue flakes after application so be mindful after application.',
    'Prepare glue. In this case the glue in question should have a tube to directly apply in locations needed. Ensure that the tube is clear from harden glue.',
    'Although this fix is not permenent it will make it a bit difficult to seperate parts next time. Ensure that the part that is loose is not an interchangable piece.',
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

      <nav className="guild-trace-strip" aria-label="Tutorial path">
        <div className="container guild-trace-inner">
          <Link href={`/${lang}`}>Home</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/${lang}/guild`}>Tutorials</Link>
          <span aria-hidden="true">/</span>
          <span className="current">Loose Parts Tutorial</span>
        </div>
      </nav>

      <main className="site-main">
        {/* Hero Section */}
        <section className="guide-hero" id="top">
          <div className="container hero-grid">
            <div className="hero-copy-block">
              <p className="eyebrow">Generic Tutorial: Loose Parts</p>
              <h1>Let's tighten up figures through easy fixes.</h1>
              <p className="hero-lead">
                In this guild we will show you how to apply a "Special Glue" that will tighten loose joints. Note that there is many of these types of glues for example: 
                <a href="https://www.amazon.com/Joints-Various-Models-Action-Figures/dp/B0CBVPXQLS/ref=sr_1_1?sr=8-1" style={{color:"blue"}}>MPS Fix Loose Joints</a>, 
                <a href="https://www.amazon.com/Joints-Solution-Action-Figures-Models/dp/B0DLB26L8X/ref=sr_1_1?sr=8-1" style={{color:"blue"}}> Kiki Fix Loose Joints Solution</a>,
                and many others, but for the purposes of this guild we will be using <a href="https://www.amazon.com/Joints-Various-Models-Action-Figures/dp/B0CBVPXQLS/ref=sr_1_1?sr=8-1" style={{color:"blue"}}>MPS Fix Loose Joints</a>.

              </p>
              <div className="hero-cta-row">
                <a href="#workflow" className="btn primary">
                  Jump To The Tutorial
                </a>
                <a href="#watch" className="btn outline">
                  Jump To Video Tutorial
                </a>
              </div>

              <ul className="hero-pill-list" aria-label="Guild highlights">
                <li>Beginner friendly</li>
                {/* <li>No teardown required first</li> */}
                <li>Multiple methods</li>
                <li>No perminent figure alterations</li>
              </ul>
            </div>

            <aside className="hero-side-card" aria-label="Quick navigation">
              <h2>Tutorial Map</h2>
              <a href="#prep">1. Pre-Fix Checklist</a>
              <a href="#workflow">2. Step-By-Step Tutorial</a>
              <a href="#watch">3. Video Tutorial</a>
              <a href="#method-library">4. Other Methods</a>
              <a href="#stats">5. Figure Tutorial Stats</a>
            </aside>
          </div>
        </section>

        {/* Pre-Fix Checklist */}
        <section className="prep-section" id="prep">
          <div className="container prep-grid">
            <div>
              <h2 style={{color:"black", fontSize:"30px"}}>Pre-Fix Checklist</h2>
              <p className="muted" style={{color:"black"}}>
                This tutorial will show you how to use the most effective fix for Loose Parts.
                Which is to use special glue made specifically for figures.
              </p>
              {/* <p className="muted">
                Check these first to reduce risk. This tracker updates as you mark items complete.
              </p> */}

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
            <h2 style={{color:"black", fontSize:"30px"}}>Repair Workflow: Using MPS Glue </h2>
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
            <h2 style={{color:"black", fontSize:"30px"}}>Video Tutorial</h2>
            <p className="muted">
              This is the visual version of the tutorial. Both have the same set of information only in a visual method. Please feel free to follow our YouTube channel. <a href="https://www.youtube.com/@PilkMilkFactory" style={{color:"blue"}}>Pilk Milk Factory</a>
            </p>

            <div className="video-grid">
              <article className="video-card">
                <h3>Using MPS Glue to Solve Loose Joints on Figures</h3>
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
                    Your browser does not support embedded video playback.
                  </video>
                </div>
              </article>             
            </div>
          </div>
        </section>

        {/* Directory for other fixes */}
        <section className="content-section" id="method-library">
          <div className="container">
            <h2 className="section-title">Other Fixes for Loose Parts</h2>
            <p className="muted">
              This is a directory for other fixes that very in effectiveness. 
              Note that these fixes are sourced by the Internet and Personal accounts, mostly sourced by Reddit but verified by our Team.
            </p>

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
            <TutorialStats
              tutorialSlug="loose-parts"
              viewsTitle="Most Viewed Tutorials"
              issuesTitle="Most Common Issues"
            />
          </div>
        </section>

        {/* Tutorial Return Row */}
        <div className="guild-return-row">
          <Link href={`/${lang}/guild`} className="btn outline small">
            Back to Tutorials
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
