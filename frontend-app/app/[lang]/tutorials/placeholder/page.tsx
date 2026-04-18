import { redirect } from "next/navigation";

export default async function RootLangPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    redirect(`/${lang}/tutorials`);
}
