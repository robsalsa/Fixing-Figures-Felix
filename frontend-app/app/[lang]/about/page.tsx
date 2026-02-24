import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/pages/Navigation';
import Footer from '@/components/pages/Footer';

export default function AboutPage({ params }: { params: { lang: string } }) {
	const lang = params?.lang ?? 'en';

	return (
		<>
			<Navigation lang={lang} currentPage="about" />
		<main>
			{/* Hero Section */}
			<section className="hero">
				<div className="container heroInner">
					<div className="heroCopy">
						<h1 className="heroTitle">About Us... or just me for now</h1>
						<p className="lead">
								<strong style={{ color: 'black' }}>TL;DR</strong> I am Pilk and I built a{' '}
								<a href="https://www.ifixit.com/" target="_blank" rel="noopener noreferrer">
									IFixIt
								</a>
								-like website to provide guides to fix figures and statistics about certain
								figure&apos;s likelihood to have an issue.
							</p>

						<div className="heroCtas">
							<Link href={`/${lang}/questionnaire`} className="btn primary">
								Fix Your Figures
							</Link>
							<a href="#community" className="btn outline">
								Figure Stats
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

				{/* About Section */}
			<section id="about" className="goalSection">
				<div className="container">
					<div className="goalGrid">
						<div className="goalContent">
								<h2 style={{ color: 'black' }}>
									About Me:{' '}
									<a href="https://www.reddit.com/user/uhhh_ehhh_idk/" style={{ color: '#155db0' }}>
										PilkMilk
									</a>
								</h2>
								<p>
									<strong style={{ color: 'black' }}>
										Hello, my name is Pilk (awful name I know), but it&apos;s most likely the
										one you know from Reddit.
									</strong>
									To give a little background on both me and why I am doing any of this, beginning with who am
									I. <strong>I am relatively new to collecting figures, started since maybe around 2021. </strong>
									It started with a Berserk figure that I thought just looked pretty cool at Target, then
									spiraled into a fervor to collect strange, nostalgic, photogenic, or just fun figures to
									pose when I am bored or needing to expel some steam.
								</p>

								<h3>The Issue I Think a Lot of Collectors Have</h3>
								<p>
									With all of that, it brings me to the reason I built this website. <strong style={{ color: 'black' }}>
										I
										have broken figures, these figures are expensive ($25 - +$100), and just like my figures
										I am also broke so I can not exactly buy replacements.
										Unfortunately, for as much as I want to fix these figures, sometimes it seems impossible
										to find tutorials or proof a fix would actually fix this figure, let alone the fact I
										have a hard time deciding which is the best fix and if all fails, will this permanent
										fix/augment actually do anything to help.
									</strong>
								</p>

								<h3>IFixIt is the GOAT</h3>
								<p>
									Finally, this leads me to this website: I built this website to provide as much information
									to the collectors as possible.
									I have taken deep inspiration from{' '}
									<a href="https://www.ifixit.com/" target="_blank" rel="noopener noreferrer">
										iFixit
									</a>
									{' '}and their
									amazing guides on fixing tech items.
									<strong style={{ color: 'black' }}>
										From that admiration and my formal experience with Software & Web
										Development, I wanted to create something that works the same and hopefully help a lot
										of collectors to give their figures a second life.
									</strong>
								</p>

								<h3>The Point of All of This</h3>
								<p>
									<strong style={{ color: 'black' }}>
										My goal with this website is to do two things: provide users{' '}
										<a href="https://www.ifixit.com/" target="_blank" rel="noopener noreferrer">
											iFixit
										</a>
										-like guides to fix figures, and provide
										&quot;community sourced&quot; data analytics on figures and brands.
									</strong>
									For example, a lot of people love Amazing Yamaguchi, but equally as many know that sometimes
									a certain line, figure, or something is riddled with QC (Quality Control) issues, so I would
									like to capture that data to then create statistics of how likely this figure would have an
									issue, where this issue is (loose joints, fragile pegs, or other errors), and many other
									important things collectors should see before buying a figure.
								</p>
							</div>

							<aside className="goalStats" id="community">
								<h3>Contact Us!</h3>
								<p>
									Email us for any questions you have or if you&apos;d like to help me out on this project. Your
									help would be deeply appreciated
								</p>
								<div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '8px' }}>
									<Image
										src="/assets/kat.jpg"
										alt="Pilk profile"
										width={56}
										height={56}
										style={{ borderRadius: '8px', flex: '0 0 56px' }}
									/>
									<div>
										<div style={{ fontWeight: '800' }}>Figure Fixing Felix&apos;s: Pilk</div>
										<div className="muted small">Please allow some time when contacting me.</div>
									</div>
								</div>
								<div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
									<a 
										href="mailto:felixfigurepm@gmail.com" 
										className="btn primary"
									>
										Email Me
									</a>
								</div>
							</aside>
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
								I strive to have the information here to be as accurate as possible. That being said please do not
								take this site as truth!
							</span>
						</div>
					</div>
				</section>
			</main>

			<Footer lang={lang} />
		</>
	);
}
