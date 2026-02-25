'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/pages/Navigation';
import Footer from '@/components/pages/Footer';
import stepConfigData from '@/public/questions/questionnaire-steps.json';

export default function QuestionnairePage({ params }: { params: { lang: string } }) {
	const lang = params?.lang ?? 'en';

	const [state, setState] = useState({
		mode: null as string | null,
		primaryGoal: null,
		focuses: new Set(),
		figure_name: null as string | null,
		brand: null as string | null,
		product_line: null as string | null,
		series_title: null as string | null,
		sculptor: null as string | null,
		scale: null as string | null,
		materials: null as string | null,
		height: '',
		seller: null as string | null,
		age: '',
		auth: null as boolean | null,
		issue: new Set() as Set<string>,
		issue_description: null as string | null
	});

	const [route, setRoute] = useState(0);
	const [steps, setSteps] = useState<any[]>([]);
	const [showSplash, setShowSplash] = useState(false);
	const [navState, setNavState] = useState({ backVisible: false, nextEnabled: false });

	const updateStepsList = () => {
		const flow = [
			'choose-track',
			'name-question',
			'brand-question',
			'product-question',
			'series-question',
			'sculpture-question',
			'scale-question',
			'material-question',
			'seller-question',
			'age-question',
			'auth-question',
			'issue-question',
			'issue-description-question',
			'splash'
		];

		const newSteps: any[] = [];
		flow.forEach((id) => {
			const def = (stepConfigData.steps as any)[id];
			if (def) {
				// Add dynamic logic for special steps
				const enrichedDef = { ...def };
				if (id === 'choose-track') {
					enrichedDef.note = {
						remark: (value: string) => {
							if (value === 'fix') return 'Okay, next steps are questions to better help.';
							if (value === 'data') return 'Thats great! Thank you! Now the next questions will be to better help others';
							return '';
						}
					};
					enrichedDef.onChange = (value: string) => {
						if (value === 'home') {
							window.location.href = `/${lang}/home`;
							return;
						}
					};
				}
				newSteps.push({
					id,
					title: def.title,
					def: enrichedDef
				});
			}
		});

		setSteps(newSteps);
		if (route >= newSteps.length) {
			setRoute(newSteps.length - 1);
		}
	};

	useEffect(() => {
		updateStepsList();
	}, []);

	const findNextIndex = (start: number): number => {
		for (let i = start; i < steps.length; i++) {
			if (isStepCompatible(steps[i].id)) return i;
		}
		return steps.length - 1;
	};

	const isStepCompatible = (id: string): boolean => {
		return true;
	};

	const hasAnySelection = (): boolean => {
		return (
			state.mode ||
			state.figure_name ||
			state.brand ||
			state.product_line ||
			state.series_title ||
			state.sculptor ||
			state.scale ||
			state.materials ||
			state.height ||
			state.seller ||
			state.age ||
			state.auth !== null ||
			state.issue.size > 0 ||
			state.issue_description
		);
	};

	const defaultValidate = (stepDef: any): boolean => {
		if (stepDef.validate) return stepDef.validate();
		if (stepDef.type === 'choice') {
			const keyValue = (state as any)[stepDef.key];
			return stepDef.multi
				? keyValue?.size > 0
				: keyValue !== null && keyValue !== undefined;
		}
		if (stepDef.type === 'multiselect') {
			const keyValue = (state as any)[stepDef.key];
			return keyValue?.size > 0;
		}
		if (stepDef.type === 'input' || stepDef.type === 'textarea') {
			const keyValue = (state as any)[stepDef.key];
			return !!keyValue;
		}
		return true;
	};

	const updateNavState = () => {
		const currentStepDef = steps[route]?.def;
		if (!currentStepDef) return;

		const backVisible = route > 0 && hasAnySelection();
		const nextEnabled = defaultValidate(currentStepDef);

		setNavState({
			backVisible,
			nextEnabled
		});
	};

	useEffect(() => {
		updateNavState();
	}, [route, state]);

	const handleStateChange = (key: string, value: any) => {
		setState((prev) => ({
			...prev,
			[key]: value
		}));
	};

	const handleNext = async () => {
		const currentStepDef = steps[route]?.def;
		if (currentStepDef && !defaultValidate(currentStepDef)) {
			return;
		}

		const nextRoute = findNextIndex(route + 1);
		setRoute(nextRoute);

		if (steps[nextRoute]?.id === 'splash') {
			setShowSplash(true);
		}
	};

	const handleBack = () => {
		if (route > 0) {
			setRoute(route - 1);
		}
	};

	const handleFinish = () => {
		// If mode is 'data', save to Supabase
		if (state.mode === 'data') {
			// TODO: Implement Supabase save logic
			console.log('Saving data to Supabase:', state);
			// await saveFigureDataToDatabase(state);
		}
		// If mode is 'fix', redirect to results/solutions page
		if (state.mode === 'fix') {
			// TODO: Implement search/fetch logic for solutions
			console.log('Fetching solutions for figure:', state);
			// window.location.href = `/${lang}/solutions?brand=${state.brand}&name=${state.figure_name}`;
		}
		window.location.href = `/${lang}/home`;
	};

	const computeGoalText = (): string => {
		const figureName = state.figure_name || 'your figure';
		const mode = state.mode === 'fix' ? 'find a fix for' : 'help others with';
		return `Thank you for providing information about ${figureName}. We'll ${mode} this figure.`;
	};

	const visualizeProgress = (): string => {
		const issueCount = state.issue.size;
		const brand = state.brand || 'Unknown brand';
		const auth = state.auth === true ? 'Authentic' : state.auth === false ? 'Bootleg' : 'Unknown authenticity';
		return `Figure: ${brand} | Issues: ${issueCount} | ${auth}`;
	};

	if (steps.length === 0) {
		return <div />;
	}

	const currentStepDef = steps[route]?.def;
	const totalSteps = steps.length;

	const renderStep = () => {
		if (!currentStepDef) return null;

		const { intro, type, options, input, note, extranote, key } = currentStepDef;
		const keyValue = (state as any)[key];

		return (
			<div className="step-panel fade-in-up">
				{intro && <p className="lead" style={{color:"black"}}>{intro}</p>}

				{type === 'text' && currentStepDef.text && (
					<p>{currentStepDef.text}</p>
				)}

				{type === 'choice' && (
					<div className="choice-grid">
						{options?.map((option: any, idx: number) => (
							<button
								key={idx}
								style={{color:"black"}}
								className={`choice ${keyValue === option.value ? 'selected' : ''}`}
								onClick={() => {
									handleStateChange(key, option.value);
									if (currentStepDef.onChange) {
										currentStepDef.onChange(option.value);
									}
								}}
								tabIndex={0}
							>
								{option.label}
							</button>
						))}
					</div>
				)}

				{type === 'multiselect' && (
					<div className="choice-grid">
						{options?.map((option: any, idx: number) => {
							const isSelected = keyValue?.has(option.value);
							return (
								<button
									key={idx}
									className={`choice ${isSelected ? 'selected' : ''}`}
									onClick={() => {
										const newSet = new Set(keyValue);
										if (newSet.has(option.value)) {
											newSet.delete(option.value);
										} else {
											newSet.add(option.value);
										}
										handleStateChange(key, newSet);
										if (currentStepDef.onChange) {
											currentStepDef.onChange(option.value);
										}
									}}
									tabIndex={0}
								>
									{option.label}
								</button>
							);
						})}
					</div>
				)}

				{type === 'input' && (
					<div className="input-row">
						<input
							type={input?.type || 'text'}
							className="input"
							placeholder={input?.placeholder || ''}
							value={keyValue || ''}
							onChange={(e) => {
								handleStateChange(key, e.target.value);
								if (currentStepDef.onChange) {
									currentStepDef.onChange(e.target.value);
								}
							}}
							onKeyPress={(e) => {
								if (e.key === 'Enter' && navState.nextEnabled) {
									handleNext();
								}
							}}
						/>
					</div>
				)}

				{type === 'textarea' && (
					<div className="input-row">
						<textarea
							className="input"
							placeholder={input?.placeholder || ''}
							value={keyValue || ''}
							onChange={(e) => {
								handleStateChange(key, e.target.value);
								if (currentStepDef.onChange) {
									currentStepDef.onChange(e.target.value);
								}
							}}
							rows={4}
						/>
					</div>
				)}

				{note && typeof note === 'string' && <div className="small-note">{note}</div>}
				{note && typeof note === 'object' && note.remark && (
					<div className="small-note">{note.remark(keyValue)}</div>
				)}
				{extranote && <div className="small-note">{extranote}</div>}
			</div>
		);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && navState.nextEnabled) {
			handleNext();
		}
	};

	return (
		<>
			<Navigation lang={lang} currentPage="questionnaire" />
			<main id="app" aria-live="polite" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'auto' }}>
				<div id="card" className="card">
					<header className="card-header">
						<div className="step-label">{route + 1} / {totalSteps}</div>
						<div className="card-title" style={{color:"black"}} id="cardTitle">{currentStepDef?.title}</div>
					</header>

					<section className="card-body" id="cardBody" onKeyPress={handleKeyPress}>
						{renderStep()}
					</section>

					<footer className="card-footer">
						<button
							id="backBtn"
							className="btn ghost"
							onClick={handleBack}
							aria-hidden={!navState.backVisible}
							disabled={!navState.backVisible}
							style={{ visibility: navState.backVisible ? 'visible' : 'hidden' }}
						>
							Back
						</button>
						<button
							id="nextBtn"
							className="btn primary"
							onClick={handleNext}
							disabled={!navState.nextEnabled}
							style={{ color:"white", opacity: navState.nextEnabled ? 1 : 0.5, pointerEvents: navState.nextEnabled ? 'auto' : 'none' }}
						>
							{route === steps.length - 1 ? 'Finish' : 'Next'}
						</button>
					</footer>
				</div>

				<div id="splash" className={`splash ${showSplash ? '' : 'hidden'}`} aria-hidden={!showSplash}>
					<div className="splash-inner">
						<h2>Submitted</h2>
						<p id="splashGoal">{computeGoalText()}</p>
						<div id="viz" className="viz">{visualizeProgress()}</div>
						<button id="finishBtn" className="btn primary" onClick={handleFinish}>
							Go to Home
						</button>
					</div>
				</div>
			</main>

			<Footer lang={lang} />
		</>
	);
}