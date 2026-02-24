import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/pages/Navigation';
import Footer from '@/components/pages/Footer';

export default function HomePage({ params }: { params: { lang: string } }) {
	const lang = params?.lang ?? 'en';

	return (
		<>
			<Navigation lang={lang} currentPage="home" />
			<main>
				{/* Hero Section */}
				<section className="hero">
					<div className="container heroInner">
						<div className="heroCopy">
							<h1>"Never take broken for an answer!"</h1>
							<div className="heroCtas">
								<Link href={`/${lang}/questionnaire`} className="btn primary">
									Fill out this questionnaire to find the best tutorial for you
								</Link>
								<a href="#community" className="btn outline">
									Community Stats (beta)
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
								<h2>Our Mission</h2>
								<p>
									Figure Fixing Felix is dedicated to providing clear, reliable repair guides and showcasing
									statistics on figure flaws and quality issues.
								</p>
								<p>
									As a figure collector myself, I truly love many of the figures I&apos;ve collected. I own figures
									from various brands and lines such as MAFEX, Amazing Yamaguchi, figma, and many more. From
									those lines, I&apos;ve collected figures like Manticora (SexyIce), Pumpkin Princess (SnailShell),
									Arkham Knight Batman (Amazing Yamaguchi), and more, even some bootlegs/third-party figures.
								</p>
								<p>
									While I really enjoy collecting figures that hold pieces of my childhood such as the Arkham
									series or new favorites like the Artificial Evolution line from SexyIce, they are
									unfortunately not immune to the passage of time or quality assurance (QA) issues.
								</p>
								<p>
									As my passion for this hobby has grown, I&apos;ve realized how expensive figures can be and how
									unreliable many DIY tutorials are. Even on Reddit, you&apos;re more likely to find collectors
									asking, &quot;How do you fix…?&quot; rather than saying, &quot;This is how you fix…&quot;.
								</p>
								<p>
									Which brings me to the mission of this project. I want to provide collectors like
									myself who&apos;ve fallen into the unfortunate rabbit hole of unreliable information, a way out.
									Through an iFixit-style web application, this project aims to provide clear, high quality
									repair instructions and real-world data on which figures, brands, or product lines experience the
									most issues or the highest peaks.
								</p>
								<p>
									That way, collectors can make more informed decisions and better understand both the
									strengths and weaknesses of a figure you might be keen on collecting.
								</p>

								<div className="benefits">
									<Link href="https://linktr.ee/felixfigurepm" target="_blank" rel="noopener noreferrer" className="btn secondary">
										Check the socials
									</Link>
								</div>
							</div>

							<aside className="goalStats" id="community">
								<h3>Community QA Stats</h3>

								<div className="warning" role="note" aria-live="polite">
									<span className="warningLabel">Notice:</span>
									<span>Information is community sourced please take information with a grain of salt and do
										not take information collected here as truth.</span>
								</div>

								<ul className="statsList" aria-live="polite">
									<li>
										<div className="statsMeta">
											<span>Test Data Poll</span>
											<span className="statValue">100%</span>
										</div>
										<div className="statBar">
											<div style={{ width: '100%' }}></div>
										</div>
									</li>
									<li>
										<div className="statsMeta">
											<span>Test Data Poll 2</span>
											<span className="statValue">75%</span>
										</div>
										<div className="statBar">
											<div style={{ width: '75%' }}></div>
										</div>
									</li>
									<li>
										<div className="statsMeta">
											<span>Test Data Poll 3</span>
											<span className="statValue">50%</span>
										</div>
										<div className="statBar">
											<div style={{ width: '50%' }}></div>
										</div>
									</li>
									<li>
										<div className="statsMeta">
											<span>Test Data Poll 4</span>
											<span className="statValue">25%</span>
										</div>
										<div className="statBar">
											<div style={{ width: '25%' }}></div>
										</div>
									</li>
									<li>
										<div className="statsMeta">
											<span>Test Data Poll 5</span>
											<span className="statValue">0%</span>
										</div>
										<div className="statBar">
											<div style={{ width: '0%' }}></div>
										</div>
									</li>
								</ul>

								<Link href={`/${lang}/contact`} className="btn outline small">
									Report Issues
								</Link>
							</aside>
						</div>
					</div>
				</section>

				{/* Featured Guides Section */}
				<section id="guides" className="featuredGuides">
					<div className="container">
						<h3>Most Collected Data for...</h3>
						<div className="cards">
							<article className="card">
								<h4>Common Issues for Amazing Yamaguchi</h4>
								<p className="cardDesc">sample text sample text sample text sample text</p>
								<a className="cardLink" href="#">Peek at the stats →</a>
							</article>

							<article className="card">
								<h4>Top 5 figures being collected</h4>
								<p className="cardDesc">sample text sample text sample text sample text</p>
								<a className="cardLink" href="#">Peek at the stats →</a>
							</article>

							<article className="card">
								<h4>Most reliable brands</h4>
								<p className="cardDesc">sample text sample text sample text sample text</p>
								<a className="cardLink" href="#">Peek at the stats →</a>
							</article>
						</div>
					</div>
				</section>

				{/* Warning Section */}
				<section>
					<div className="container">
						<div className="warning" role="note" aria-live="polite">
							<span className="warningLabel">Notice:</span>
							<span>
								Information is community sourced and might be:
								<ul>
									<li>Incorrect</li>
									<li>Out Dated</li>
									<li>Incomplete</li>
								</ul>
								We strive for accuracy and will attempt to minimize as much misinformation possible but please do
								take information with a grain of salt.
							</span>
						</div>
					</div>
				</section>
			</main>

			<Footer lang={lang} />
		</>
	);
}

