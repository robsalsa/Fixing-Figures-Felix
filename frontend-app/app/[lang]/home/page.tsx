import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { connection } from 'next/server';
import { Metadata } from 'next';
import Navigation from '@/components/pages/Navigation';
import Footer from '@/components/pages/Footer';
import DynamicFigureStats from '@/components/pages/DynamicFigureStats';
import RankingCard from '@/components/pages/RankingCard';
import { getTopFiguresByMentions, getTopBrandsByQCIssues, getTopIssues, getTopTutorialViews } from '@/lib/supabase/figure-data/figureFunctions';
import homeTranslations from '@/lib/translations/home.json';
import { WebsiteStructuredData, OrganizationStructuredData, StructuredDataScript } from '@/lib/utils/structured-data';

type HomePageProps = {
	params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
	const { lang } = await params;
	const t = homeTranslations[lang as keyof typeof homeTranslations] || homeTranslations.en;
	
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
		process.env.VERCEL_URL 
		? `https://${process.env.VERCEL_URL}` 
		: 'http://localhost:3000';

	const titles: Record<string, string> = {
		en: 'Home - Action Figure Repair Community',
		es: 'Inicio - Comunidad de Reparación de Figuras',
		ja: 'ホーム - フィギュア修理コミュニティ',
	};

	const descriptions: Record<string, string> = {
		en: 'Join our community to learn how to fix loose, stiff, and broken parts on action figures. Free tutorials, community stats, and repair guides.',
		es: 'Únete a nuestra comunidad para aprender a reparar partes sueltas, rígidas y rotas de figuras de acción. Tutoriales gratuitos y guías de reparación.',
		ja: 'アクションフィギュアの緩い部品、固い部品、壊れた部品の修理方法を学ぶコミュニティに参加しましょう。無料のチュートリアルと修理ガイド。',
	};

	return {
		title: titles[lang] || titles.en,
		description: descriptions[lang] || descriptions.en,
		openGraph: {
			title: titles[lang] || titles.en,
			description: descriptions[lang] || descriptions.en,
			url: `${baseUrl}/${lang}/home`,
			images: [
				{
					url: '/assets/og-home.png',
					width: 1200,
					height: 630,
					alt: 'Figure Fixing Felix Home',
				},
			],
		},
	};
}

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
	await connection();
	const { lang } = await params;
	const t = homeTranslations[lang as keyof typeof homeTranslations] || homeTranslations.en;

	// Fetch top X figures from Supabase
	const topFigures = await getTopFiguresByMentions(10);

	// Fetch all brands and issues for expandable cards
	// We fetch all (1000 is practical max) and slice for preview
	const allBrands = await getTopBrandsByQCIssues(1000);
	const topBrands = allBrands.slice(0, 7); // First 7 for preview

	const allIssues = await getTopIssues(1000);
	const topIssues = allIssues.slice(0, 4);

	const allTutorialViews = await getTopTutorialViews(1000);
	const topTutorialViews = allTutorialViews.slice(0, 4);

	return (
		<>
			<StructuredDataScript data={WebsiteStructuredData()} />
			<StructuredDataScript data={OrganizationStructuredData()} />
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
								{/* <a href="#guides" className="btn outline">
									{t.communityStatsCTA}
								</a> */}
								<Link href={`/${lang}/tutorials`} className="btn outline">
									{t.communityStatsCTA}
								</Link>
							</div>
						</div>


						{/* The Hero Images SUCK ASS!!! */}
						{/* <figure className="heroIllustration" aria-hidden="true">
							<Image
								src="/assets/part-images/broken(igawa).png"
								alt="Figure being fixed"
								width={240}
								height={160}
								className="figIllustration"
							/>
						</figure> */}
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
						<div className="cards">
							<RankingCard
								title={t.brandsWithQCTitle}
								items={topBrands}
								allItems={allBrands}
								description={t.brandsWithQCDesc}
								linkText={t.peekAtStatsLink}
								noDataText="No brand data yet"
							/>

							<RankingCard
								title={t.commonIssuesTitle}
								items={topIssues}
								allItems={allIssues}
								description={t.commonIssuesDesc}
								linkText={t.peekAtStatsLink}
								noDataText="No issue data yet"
							/>

							<RankingCard
								title={t.viewedIssuesTitle}
								items={topTutorialViews}
								allItems={allTutorialViews}
								description={t.viewedIssuesDesc}
								linkText={t.peekAtStatsLink}
								noDataText="No view data yet"
							/>
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

