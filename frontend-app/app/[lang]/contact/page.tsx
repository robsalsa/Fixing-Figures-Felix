import { redirect } from 'next/navigation';

type ContactPageProps = {
	params: Promise<{ lang: string }>;
};

export default async function ContactPage({ params }: ContactPageProps) {
	const { lang } = await params;
	redirect(`/${lang}/home`);
}