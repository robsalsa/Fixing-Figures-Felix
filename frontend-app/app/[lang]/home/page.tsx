import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/pages/Navigation';
import Footer from '@/components/pages/Footer';
import homeTranslations from '@/lib/translations/home.json';

function NavigationSkeleton() {
	return (
		<header style={{ background: '#f0f0f0', height: '60px', animation: 'pulse 2s infinite' }}>
			<div style={{ opacity: 0.5 }}>Loading navigation...</div>
		</header>
	);
}

function FooterSkeleton() {
	return (
		<footer style={{ background: '#f0f0f0', height: '100px', animation: 'pulse 2s infinite' }}>
			<div style={{ opacity: 0.5 }}>Loading footer...</div>
		</footer>
	);
}

export default function HomePage({ params }: { params: { lang: string } }) {
	const { lang } = params;
	const t = homeTranslations[lang as keyof typeof homeTranslations] || homeTranslations.en;

	return (
		<>
			<Suspense fallback={<NavigationSkeleton />}>
				<Navigation lang={lang} currentPage="home" />
			</Suspense>
			<main>
				{/* Hero Section */}
				<section className="hero">
					<div className="container heroInner">
						<div className="heroCopy">
							<h1>"{t.heroQuote}"</h1>
							<div className="heroCtas">
								<Link href={`/${lang}/questionnaire`} className="btn primary">
									{t.questionnaireCTA}
								</Link>
								<a href="#community" className="btn outline">
									{t.communityStatsCTA}
								</a>
							</div>
						</div>

						<figure className="heroIllustration" aria-hidden="true">
							<Image
								src="/assets/kat.jpg"
								alt="Figure being fixed"
								width={240}
								height={160}
								className="figIllustration"
							/>
						</figure>
					</div>
				</section>

				{/* Mission Section */}
				<section id="about" className="goalSection">
					<div className="container">
						<div className="goalGrid">
							<div className="goalContent">
								<h2>{t.missionTitle}</h2>
								<p>
									{t.missionDescription}
								</p>
								<p>
									{t.personalStory1}
								</p>
								<p>
									{t.personalStory2}
								</p>
								<p>
									{t.personalStory3}
								</p>
								<p>
									{t.personalStory4}
								</p>
								<p>
									{t.personalStory5}
								</p>

								<div className="benefits">
									<Link href="https://linktr.ee/felixfigurepm" target="_blank" rel="noopener noreferrer" className="btn secondary">
										{t.socialsCTA}
									</Link>
								</div>
							</div>

							<aside className="goalStats" id="community">
								<h3>{t.communityQAStats}</h3>

								<div className="warning" role="note" aria-live="polite">
									<span className="warningLabel">{t.warningNotice}</span>
									<span>{t.warningText}</span>
								</div>

								<ul className="statsList" aria-live="polite">
									<li>
										<div className="statsMeta">
											<span>{t.testDataPoll}</span>
											<span className="statValue">100%</span>
										</div>
										<div className="statBar">
											<div style={{ width: '100%' }}></div>
										</div>
									</li>
									<li>
										<div className="statsMeta">
											<span>{t.testDataPoll2}</span>
											<span className="statValue">75%</span>
										</div>
										<div className="statBar">
											<div style={{ width: '75%' }}></div>
										</div>
									</li>
									<li>
										<div className="statsMeta">
											<span>{t.testDataPoll3}</span>
											<span className="statValue">50%</span>
										</div>
										<div className="statBar">
											<div style={{ width: '50%' }}></div>
										</div>
									</li>
									<li>
										<div className="statsMeta">
											<span>{t.testDataPoll4}</span>
											<span className="statValue">25%</span>
										</div>
										<div className="statBar">
											<div style={{ width: '25%' }}></div>
										</div>
									</li>
									<li>
										<div className="statsMeta">
											<span>{t.testDataPoll5}</span>
											<span className="statValue">0%</span>
										</div>
										<div className="statBar">
											<div style={{ width: '0%' }}></div>
										</div>
									</li>
								</ul>

								<Link href={`/${lang}/about#emailContact`} className="btn outline small">
									{t.reportIssuesCTA}
								</Link>
							</aside>
						</div>
					</div>
				</section>

				{/* Featured Guides Section */}
				<section id="guides" className="featuredGuides">
					<div className="container">
						{/* <h3>{t.mostCollectedDataTitle}</h3> */}
						<div className="cards">
							<article className="card">
								<h4>{t.amazingYamaguchiBrand}</h4>
								<p className="cardDesc">{t.amazingYamaguchiDesc}</p>
								<a className="cardLink" href="#">{t.peekAtStatsLink}</a>
							</article>

							<article className="card">
								<h4>{t.top5FiguresTitle}</h4>
								<p className="cardDesc">{t.top5FiguresDesc}</p>
								<a className="cardLink" href="#">{t.peekAtStatsLink}</a>
							</article>

							<article className="card">
								<h4>{t.reliableBrandsTitle}</h4>
								<p className="cardDesc">{t.reliableBrandsDesc}</p>
								<a className="cardLink" href="#">{t.peekAtStatsLink}</a>
							</article>
						</div>
					</div>
				</section>

				{/* Warning Section */}
				<section>
					<div className="container">
						<div className="warning" role="note" aria-live="polite">
							<span className="warningLabel">{t.warningTitle}</span>
							<span>
								{t.warningContent}
								<ul>
									<li>{t.warningIncorrect}</li>
									<li>{t.warningOutdated}</li>
									<li>{t.warningIncomplete}</li>
								</ul>
								{t.warningDisclaimer}
							</span>
						</div>
					</div>
				</section>
			</main>

			<Suspense fallback={<FooterSkeleton />}>
				<Footer lang={lang} />
			</Suspense>
		</>
	);
}

