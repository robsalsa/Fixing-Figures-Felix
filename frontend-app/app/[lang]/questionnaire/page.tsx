import { Suspense } from 'react';
import type { Metadata } from 'next';
import QuestionnairePageClient from '@/components/pages/QuestionnairePageClient';
import { generateSEOMetadata, pageTranslations } from '@/lib/seo/metadata';

type QuestionnairePageProps = {
	params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: QuestionnairePageProps): Promise<Metadata> {
	const { lang } = await params;
	const locale = ['en', 'es', 'ja'].includes(lang) ? lang : 'en';
	const translations = pageTranslations[locale as keyof typeof pageTranslations];

	return generateSEOMetadata({
		title: translations.questionnaire.title,
		description: translations.questionnaire.description,
		path: `/${locale}/questionnaire`,
		locale,
	});
}

export default function QuestionnairePage({ params }: QuestionnairePageProps) {
	return (
		<Suspense fallback={<main />}>
			<QuestionnairePageContent params={params} />
		</Suspense>
	);
}

async function QuestionnairePageContent({ params }: QuestionnairePageProps) {
	const { lang } = await params;

	return <QuestionnairePageClient lang={lang} />;
}
