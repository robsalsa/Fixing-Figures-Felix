import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import Navigation from '@/components/pages/Navigation';
import Footer from '@/components/pages/Footer';
import aboutTranslations from '@/lib/translations/about.json';
import { BreadcrumbStructuredData, StructuredDataScript } from '@/lib/utils/structured-data';

type AboutPageProps = {
	params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
	const { lang } = await params;
	const t = aboutTranslations[lang as keyof typeof aboutTranslations] || aboutTranslations.en;
	
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
		process.env.VERCEL_URL 
		? `https://${process.env.VERCEL_URL}` 
		: 'http://localhost:3000';

	const titles: Record<string, string> = {
		en: 'About - Our Mission to Help Fix Action Figures',
		es: 'Acerca de - Nuestra Misión de Ayudar a Reparar Figuras',
		ja: '私たちについて - アクションフィギュアの修理支援',
	};

	const descriptions: Record<string, string> = {
		en: 'Learn about Figure Fixing Felix and our mission to help the action figure community fix loose, stiff, and broken parts through free tutorials.',
		es: 'Conoce Figure Fixing Felix y nuestra misión de ayudar a la comunidad de figuras de acción a reparar partes sueltas, rígidas y rotas.',
		ja: 'Figure Fixing Felixと、無料のチュートリアルを通じてアクションフィギュアコミュニティをサポートする私たちの使命について。',
	};

	return {
		title: titles[lang] || titles.en,
		description: descriptions[lang] || descriptions.en,
		openGraph: {
			title: titles[lang] || titles.en,
			description: descriptions[lang] || descriptions.en,
			url: `${baseUrl}/${lang}/about`,
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

type AboutPageProps = {
	params: Promise<{ lang: string }>;
};

export default function AboutPage({ params }: AboutPageProps) {
	return (
		<Suspense fallback={<main />}>
			<AboutPageContent params={params} />
		</Suspense>
	);
}

async function AboutPageContent({ params }: AboutPageProps) {
	const { lang } = await params;
	const t = aboutTranslations[lang as keyof typeof aboutTranslations] || aboutTranslations.en;

	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
		process.env.VERCEL_URL 
		? `https://${process.env.VERCEL_URL}` 
		: 'http://localhost:3000';

	const breadcrumbData = BreadcrumbStructuredData([
		{ name: 'Home', url: `${baseUrl}/${lang}/home` },
		{ name: 'About', url: `${baseUrl}/${lang}/about` },
	]);

	return (
		<>
			<StructuredDataScript data={breadcrumbData} />
			<Suspense fallback={<NavigationSkeleton />}>
				<Navigation lang={lang} currentPage="about" />
			</Suspense>
		<main>
			{/* Hero Section */}
			<section className="hero">
				<div className="container heroInner">
					<div className="heroCopy">
						<h1 className="heroTitle">{t.pageTitle}</h1>
						<p className="lead">
								<strong style={{ color: 'black' }}>{t.tldr}</strong> {t.tldrContent}
							</p>

						<div className="heroCtas">
							<Link href={`/${lang}/questionnaire`} className="btn primary">
								{t.fixYourFiguresCTA}
							</Link>
							{/* <a href="#community" className="btn outline">
								{t.figureStatsCTA}
							</a> */}
						</div>
					</div>

					{/* <figure className="heroIllustration" aria-hidden="true">
						<Image
							src="/assets/kat.jpg"
							alt="Figure being fixed"
							width={240}
							height={160}
							className="figIllustration"
							/>
					</figure> */}
					</div>
				</section>

				{/* About Section */}
			<section id="about" className="goalSection">
				<div className="container">
					<div className="goalGrid">
						<div className="goalContent">
								<h2 style={{ color: 'black' }}>
									{t.aboutMeTitle}{' '}
									<a href="https://www.reddit.com/user/uhhh_ehhh_idk/" style={{ color: '#155db0' }}>
										PilkMilk
									</a>
								</h2>
								<p>
									<strong style={{ color: 'black' }}>
										{t.helloIntro}
									</strong>
									{' '}{t.backgroundStory}
								</p>

								<h3>{t.issueTitle}</h3>
								<p>
									{t.issueContent}
								</p>

								<h3>{t.ifixitTitle}</h3>
								<p>
									{t.ifixitContent}
								</p>

								<h3>{t.goalTitle}</h3>
								<p>
									{t.goalContent}
								</p>
							</div>

							<aside className="goalStats" id="community">
								<h3 style={{color:"black"}}>{t.contactUsTitle}</h3>
								<p>
									{t.contactUsContent}
								</p>
								<div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '8px' }}>
									<Image
										src="/assets/my-images/icon.png"
										alt="Pilk profile"
										width={56}
										height={56}
										style={{ borderRadius: '8px', flex: '0 0 56px' }}
									/>
									<div>
										<div id="emailContact" className="emailContact" style={{ fontWeight: '800' }}>felixfigurepm@gmail.com</div>
										<div className="muted small">{t.pilkProfile}</div>
									</div>
								</div>
								
							</aside>
						</div>
					</div>
				</section>

				{/* Warning Section */}
				<section>
				<div className="container">
					<div className="warning" role="note" aria-live="polite">
						<span className="warningLabel">{t.warningNotice}</span>
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

