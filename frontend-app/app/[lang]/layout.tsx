import { ReactNode } from 'react';

const supportedLanguages = ['en', 'es', 'ja'] as const;

export function generateStaticParams() {
	return supportedLanguages.map((lang) => ({ lang }));
}

type LangLayoutProps = {
	children: ReactNode;
	params: Promise<{ lang: string }>;
};

export default function LangLayout({ children }: LangLayoutProps) {
	return children;
}