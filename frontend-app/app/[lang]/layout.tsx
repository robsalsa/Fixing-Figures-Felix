import { ReactNode } from 'react';
import { Metadata } from 'next';

const supportedLanguages = ['en', 'es', 'ja'] as const;
type SupportedLanguage = typeof supportedLanguages[number];

const languageNames: Record<SupportedLanguage, string> = {
	en: 'English',
	es: 'Español',
	ja: '日本語',
};

const languageLocales: Record<SupportedLanguage, string> = {
	en: 'en_US',
	es: 'es_ES',
	ja: 'ja_JP',
};

export function generateStaticParams() {
	return supportedLanguages.map((lang) => ({ lang }));
}

type LangLayoutProps = {
	children: ReactNode;
	params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: LangLayoutProps): Promise<Metadata> {
	const { lang } = await params;
	const currentLang = (supportedLanguages.includes(lang as SupportedLanguage) 
		? lang 
		: 'en') as SupportedLanguage;

	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
		process.env.VERCEL_URL 
		? `https://${process.env.VERCEL_URL}` 
		: 'http://localhost:3000';

	// Generate language alternates
	const languages: Record<string, string> = {};
	supportedLanguages.forEach((l) => {
		languages[l] = `${baseUrl}/${l}`;
	});

	return {
		alternates: {
			canonical: `${baseUrl}/${currentLang}`,
			languages,
		},
		openGraph: {
			locale: languageLocales[currentLang],
		},
		other: {
			'language': languageNames[currentLang],
		},
	};
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
	const { lang } = await params;
	const htmlLang = supportedLanguages.includes(lang as SupportedLanguage) ? lang : 'en';
	
	return (
		<div lang={htmlLang}>
			{children}
		</div>
	);
}