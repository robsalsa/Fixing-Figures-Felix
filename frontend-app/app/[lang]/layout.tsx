import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { generateSEOMetadata, pageTranslations } from '@/lib/seo/metadata';
import { StructuredData, generateWebsiteSchema } from '@/lib/seo/structured-data';

const supportedLanguages = ['en', 'es', 'ja'] as const;
type SupportedLanguage = typeof supportedLanguages[number];

export function generateStaticParams() {
	return supportedLanguages.map((lang) => ({ lang }));
}

type LangLayoutProps = {
	children: ReactNode;
	params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: LangLayoutProps): Promise<Metadata> {
	const { lang } = await params;
	const locale = (supportedLanguages.includes(lang as SupportedLanguage) ? lang : 'en') as SupportedLanguage;
	const translations = pageTranslations[locale];

	return generateSEOMetadata({
		title: translations.home.title,
		description: translations.home.description,
		path: `/${locale}`,
		locale,
	});
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
	const { lang } = await params;
	const locale = (supportedLanguages.includes(lang as SupportedLanguage) ? lang : 'en') as SupportedLanguage;
	const websiteSchema = generateWebsiteSchema(locale);

	// Language name mapping for HTML lang attribute
	const langMap: Record<string, string> = {
		en: 'en',
		es: 'es',
		ja: 'ja',
	};

	return (
		<div lang={langMap[locale]}>
			<StructuredData schema={websiteSchema} />
			{children}
		</div>
	);
}