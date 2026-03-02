import { ReactNode } from 'react';
import { notFound } from 'next/navigation';

const supportedLanguages = ['en', 'es', 'ja'] as const;

type SupportedLanguage = (typeof supportedLanguages)[number];

export function generateStaticParams() {
	return supportedLanguages.map((lang) => ({ lang }));
}

type LangLayoutProps = {
	children: ReactNode;
	params: { lang: string };
};

export default function LangLayout({ children, params }: LangLayoutProps) {
	const lang = params.lang as SupportedLanguage;

	if (!supportedLanguages.includes(lang)) {
		notFound();
	}

	return children;
}