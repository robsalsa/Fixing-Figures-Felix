import { Suspense } from 'react';
import QuestionnairePageClient from '@/components/pages/QuestionnairePageClient';

type QuestionnairePageProps = {
	params: Promise<{ lang: string }>;
};

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
