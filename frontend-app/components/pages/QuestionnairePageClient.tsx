'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/pages/Navigation';
import Footer from '@/components/pages/Footer';
import stepConfigData from '@/public/questions/questionnaire-steps.json';

type QuestionnairePageClientProps = {
	lang: string;
};

export default function QuestionnairePageClient({ lang }: QuestionnairePageClientProps) {
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
		materials: new Set() as Set<string>,
		other_materials: null as string | null,
		height: '',
		seller: null as string | null,
		age: null as string | null,
		auth: null as boolean | null,
		issue: new Set() as Set<string>,
		issue_description: null as string | null
	});

	const [route, setRoute] = useState(0);
	const [steps, setSteps] = useState<any[]>([]);
	const [showSplash, setShowSplash] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [noFixMessage, setNoFixMessage] = useState(false);
	const [navState, setNavState] = useState({ backVisible: false, nextEnabled: false });

	const [autocomplete, setAutocomplete] = useState({
		figure_name: [] as string[],
		series_title: [] as string[],
		product_line: [] as string[],
		scale: [] as string[],
		brand: [] as string[],
		seller: [] as string[],
		sculptor: [] as string[]
	});
	const [activeAutocomplete, setActiveAutocomplete] = useState<string | null>(null);

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

	const fetchAutocompleteSuggestions = async (field: string, query: string) => {
		if (!query || query.length < 1) {
			setAutocomplete((prev) => ({
				...prev,
				[field]: []
			}));
			return;
		}

		try {
			const { createClient } = await import('@/lib/supabase/client');
			const supabase = createClient();

			const fieldMap: { [key: string]: string } = {
				figure_name: 'figure_name',
				series_title: 'series_title',
				product_line: 'product_line',
				brand: 'brand',
				scale: 'scale',
				seller: 'seller',
				sculptor: 'sculptor'
			};

			const dbField = fieldMap[field];
			if (!dbField) return;

			const { data, error } = await supabase
				.from('figures')
				.select(dbField)
				.ilike(dbField, `%${query}%`)
				.limit(5);

			if (error) {
				console.error(`Error fetching autocomplete for ${field}:`, error);
				return;
			}

			const suggestions = Array.from(new Set(
				data?.map((row: any) => row[dbField]).filter((val: any) => val)
			));

			setAutocomplete((prev) => ({
				...prev,
				[field]: suggestions as string[]
			}));
		} catch (error) {
			console.error('Error in fetchAutocompleteSuggestions:', error);
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

	const isStepCompatible = (_id: string): boolean => {
		return true;
	};

	const hasAnySelection = (): boolean => {
		return !!(
			state.mode ||
			state.figure_name ||
			state.brand ||
			state.product_line ||
			state.series_title ||
			state.sculptor ||
			state.scale ||
			state.materials.size > 0 ||
			state.other_materials ||
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
		if (stepDef.type === 'multiselect' && stepDef.hasOtherInput) {
			const keyValue = (state as any)[stepDef.key];
			const hasOther = keyValue?.has('other');
			if (hasOther) {
				const otherValue = (state as any)[stepDef.otherKey];
				return keyValue.size > 1 || !!otherValue;
			}
			return keyValue?.size > 0;
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

	const handleFinish = async () => {
		if (isSubmitting) return;
		setIsSubmitting(true);

		try {
			const { saveFigureDataToSupabase } = await import('@/lib/supabase/figure-data/figureFunctions');
			const result = await saveFigureDataToSupabase(state);

			if (!result.success) {
				console.error('Failed to save data:', result.error);
			}

			if (state.mode === 'fix') {
				const issues = state.issue;
				const nonOtherIssues = [...issues].filter((i) => i !== 'other');

				if (nonOtherIssues.length === 0) {
					// Only "other" was selected
					setNoFixMessage(true);
					setIsSubmitting(false);
					return;
				}

				const issueToGuild: Record<string, string> = {
					broken_joint: 'broken-parts',
					stiff_part: 'stiff-parts',
					loose_joint: 'loose-parts',
				};

				if (nonOtherIssues.length === 1) {
					const guildSlug = issueToGuild[nonOtherIssues[0]] || 'guild';
					window.location.href = `/${lang}/guild/${guildSlug}`;
				} else {
					// Multiple issues selected — go to the guild router
					window.location.href = `/${lang}/guild`;
				}
			} else {
				window.location.href = `/${lang}/home`;
			}
		} catch (error) {
			console.error('Error in handleFinish:', error);
			setIsSubmitting(false);
			window.location.href = `/${lang}/home`;
		}
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
				{intro && <p className="lead" style={{ color: 'black' }}>{intro}</p>}

				{type === 'text' && currentStepDef.text && (
					<p>{currentStepDef.text}</p>
				)}

				{type === 'choice' && (
					<div className="choice-grid">
						{options?.map((option: any, idx: number) => (
							<button
								key={idx}
								style={{ color: 'black' }}
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

				{type === 'multiselect' && currentStepDef.hasOtherInput && keyValue?.has('other') && (
					<div className="input-row" style={{ marginTop: '1rem' }}>
						<input
							type="text"
							className="input"
							placeholder={currentStepDef.otherPlaceholder || 'Enter other values...'}
							value={(state as any)[currentStepDef.otherKey] || ''}
							onChange={(e) => {
								handleStateChange(currentStepDef.otherKey, e.target.value);
							}}
							onKeyPress={(e) => {
								if (e.key === 'Enter' && navState.nextEnabled) {
									handleNext();
								}
							}}
						/>
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
								const newValue = e.target.value;
								handleStateChange(key, newValue);

										if (['figure_name', 'series_title', 'sculptor', 'brand', 'product_line', 'scale', 'seller'].includes(key)) {
									fetchAutocompleteSuggestions(key, newValue);
									setActiveAutocomplete(key);
								}

								if (currentStepDef.onChange) {
									currentStepDef.onChange(newValue);
								}
							}}
							onFocus={() => {
								if (['figure_name', 'series_title', 'sculptor', 'brand', 'product_line', 'scale', 'seller'].includes(key) && keyValue) {
									setActiveAutocomplete(key);
								}
							}}
							onBlur={() => {
								setTimeout(() => setActiveAutocomplete(null), 200);
							}}
							onKeyPress={(e) => {
								if (e.key === 'Enter' && navState.nextEnabled) {
									handleNext();
								}
							}}
						/>

						{activeAutocomplete === key && (autocomplete as any)[key]?.length > 0 && (
							<div className="autocomplete-dropdown">
								{(autocomplete as any)[key].map((suggestion: string, idx: number) => (
									<div
										key={idx}
										className="autocomplete-item"
										onClick={() => {
											handleStateChange(key, suggestion);
											setActiveAutocomplete(null);
										}}
									>
										{suggestion}
									</div>
								))}
							</div>
						)}
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
						<div className="card-title" style={{ color: 'black' }} id="cardTitle">{currentStepDef?.title}</div>
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
							style={{ color: 'white', opacity: navState.nextEnabled ? 1 : 0.5, pointerEvents: navState.nextEnabled ? 'auto' : 'none' }}
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
						{noFixMessage ? (
							<>
								<p style={{ color: '#c0392b', fontWeight: 600, marginTop: '1rem' }}>
									Unfortunately we currently do not have a fix for this specific issue. Please forgive us.
								</p>
								<button id="finishBtn" className="btn primary" onClick={() => { window.location.href = `/${lang}/home`; }}>
									Go to Home
								</button>
							</>
						) : (
							<button id="finishBtn" className="btn primary" onClick={handleFinish} disabled={isSubmitting}>
								{isSubmitting ? 'Submitting...' : (state.mode === 'fix' ? 'Take Me to the Fix!' : 'Go to Home')}
							</button>
						)}
					</div>
				</div>
			</main>

			<Footer lang={lang} />
		</>
	);
}
