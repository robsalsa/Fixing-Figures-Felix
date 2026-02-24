'use client';

import React, { useState } from 'react';
import Navigation from '@/components/pages/Navigation';
import Footer from '@/components/pages/Footer';

export default function QuestionnairePage({ params }: { params: { lang: string } }) {
	const lang = params?.lang ?? 'en';
	const [currentStep, setCurrentStep] = useState(0);
	const [showSplash, setShowSplash] = useState(false);

	const steps = [
		{
			id: 'choose-track',
			title: 'What would you like to do?',
			intro: 'Would you kindly choose a path to proceed with, please.',
			type: 'choice',
			options: [
				{ label: "I'm looking for a fix", value: 'fix' },
				{ label: "I'm looking to help others", value: 'data' },
				{ label: "I'm just looking around", value: 'home' }
			]
		},
		{
			id: 'name-question',
			title: 'Name of the Figure',
			intro: 'Please enter the name of the figure.',
			type: 'input',
			placeholder: 'Example: "Marvel Amazing Yamaguchi Revoltech Deadpool (Ver. 2.5)"',
			note: 'Please use the full name of the figure for more accuracy. If you do not know the full name please refer to your items listing on your sellers website.'
		},
		{
			id: 'brand-question',
			title: 'Brand Name',
			intro: 'Would you kindly enter the name of the brand this figure is from.',
			type: 'input',
			placeholder: 'Example: Kaiyodo, Medicom Toy, Max Factory, or e.t.c',
			note: 'If you do not know what is the brand of your figure we recommend you to please look it up.'
		},
		{
			id: 'product-question',
			title: 'Product Line Name',
			intro: 'Would you kindly enter the name of the Product Line of this figure.',
			type: 'input',
			placeholder: 'Example: figma, MAFEX, Revoltech, Amazing Yamaguchi, or e.t.c',
			note: 'If you do know what is the product line this figure originates from please consult the box this figure is from.'
		}
	];

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		} else if (currentStep === steps.length - 1) {
			setShowSplash(true);
		}
	};

	const handleBack = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleFinish = () => {
		window.location.href = `/${lang}/home`;
	};

	const step = steps[currentStep];
	const totalSteps = steps.length;

	return (
		<>
			<Navigation lang={lang} currentPage="questionnaire" />
			<main id="app" aria-live="polite" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'auto' }}>
				<div id="card" className="card">
					<header className="cardHeader">
						<div className="stepLabel">{currentStep + 1} / {totalSteps}</div>
						<div className="cardTitle" id="cardTitle">{step.title}</div>
					</header>

					<section className="cardBody" id="cardBody">
						<div className="stepPanel">
							<p className="lead">{step.intro}</p>

							{step.type === 'choice' && (
							<div className="choiceGrid">
								{step.options?.map((option, idx) => (
									<button
										key={idx}
										className="choice"
											onClick={() => {
												if (option.value === 'home') {
													window.location.href = `/${lang}/home`;
												} else {
													handleNext();
												}
											}}
										>
											{option.label}
										</button>
									))}
								</div>
							)}

							{step.type === 'input' && (
								<div>
									<input
										type="text"
									className="input"
									placeholder={step.placeholder}
									onKeyPress={(e) => {
										if (e.key === 'Enter') handleNext();
									}}
								/>
								{step.note && <p className="smallNote">{step.note}</p>}
								</div>
							)}
						</div>
					</section>

					<footer className="cardFooter">
						<button
							id="backBtn"
							className="btn ghost"
							onClick={handleBack}
							aria-hidden={currentStep === 0}
							disabled={currentStep === 0}
							style={{ visibility: currentStep === 0 ? 'hidden' : 'visible' }}
						>
							Back
						</button>
						<button
							id="nextBtn"
							className="btn primary"
							onClick={handleNext}
						>
							{currentStep === steps.length - 1 ? 'Finish' : 'Next'}
						</button>
					</footer>
				</div>

			<div id="splash" className={`splash ${showSplash ? '' : 'hidden'}`} aria-hidden={!showSplash}>
				<div className="splashInner">
					<h2>Your Personal Plan</h2>
					<p id="splashGoal">You will reach your goal before —</p>
					<div id="viz" className="viz">Complete!</div>
					<button id="finishBtn" className="btn primary" onClick={handleFinish}>
							Go to Home
						</button>
					</div>
				</div>
			</main>

			<Footer lang={lang} />

			<style>{`
				body.questionnaire {
					--brand-deep: #576A8F;
					--brand-muted: #B7BDF7;
					--brand-warm: #FFF8DE;
					--bg: var(--brand-warm);
					--card: #ffffff;
					--muted: #6b6b6b;
					--accent: var(--brand-deep);
					--accent-soft: var(--brand-muted);
					--danger: #e05555;
					--shadow: 0 10px 30px rgba(23, 31, 52, 0.08);
					--radius: 14px;
					font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
					color-scheme: light;
					margin: 0;
					background: linear-gradient(180deg, #FFF8DE 0%, rgba(183, 189, 247, 0.06) 100%);
					display: flex;
					flex-direction: column;
					align-items: stretch;
					justify-content: flex-start;
					min-height: 100vh;
					padding: 20px;
					overflow-x: hidden;
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale;
				}
			`}</style>
		</>
	);
}