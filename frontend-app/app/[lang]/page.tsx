import { redirect } from "next/navigation";

export default function RootLangPage({ params }: { params: { lang: string } }) {
	const lang = params?.lang ?? 'en';
	redirect(`/${lang}/home`);
}
