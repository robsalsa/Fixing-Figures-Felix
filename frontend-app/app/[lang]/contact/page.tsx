import { redirect } from 'next/navigation';

type ContactPageProps = {
	params: { lang: string };
};

export default function ContactPage({ params }: ContactPageProps) {
	const { lang } = params;
	redirect(`/${lang}/home`);
}