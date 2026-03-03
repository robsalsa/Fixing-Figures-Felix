import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/pages/Navigation';
import Footer from '@/components/pages/Footer';
import DynamicFigureStats from '@/components/pages/DynamicFigureStats';
import { getTopFiguresByMentions } from '@/lib/supabase/figure-data/figureFunctions';
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

type HomePageProps = {
	params: Promise<{ lang: string }>;
};

export default function HomePage({ params }: HomePageProps) {
	return (
		<Suspense fallback={<main />}>
			<HomePageContent params={params} />
		</Suspense>
	);
}

async function HomePageContent({ params }: HomePageProps) {
	const { lang } = await params;
	const t = homeTranslations[lang as keyof typeof homeTranslations] || homeTranslations.en;

	// Fetch top X figures from Supabase
	const topFigures = await getTopFiguresByMentions(10);

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

						<DynamicFigureStats
							figures={topFigures}
							lang={lang}
							translations={{
								communityQAStats: t.communityQAStats,
								warningNotice: t.warningNotice,
								warningText: t.warningText,
								reportIssuesCTA: t.reportIssuesCTA,
							}}
						/>
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
									{/* <li>{t.warningOutdated}</li> */}
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

