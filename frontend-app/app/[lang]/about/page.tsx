import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/pages/Navigation';
import Footer from '@/components/pages/Footer';
import aboutTranslations from '@/lib/translations/about.json';
import { generateSEOMetadata, pageTranslations } from '@/lib/seo/metadata';

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

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
	const { lang } = await params;
	const locale = ['en', 'es', 'ja'].includes(lang) ? lang : 'en';
	const translations = pageTranslations[locale as keyof typeof pageTranslations];

	return generateSEOMetadata({
		title: translations.about.title,
		description: translations.about.description,
		path: `/${locale}/about`,
		locale,
	});
}

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

	return (
		<>
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

