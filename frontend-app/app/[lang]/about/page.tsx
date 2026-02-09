import Link from 'next/link'

export default function About({ params }: { params: { lang: string } }) {
	const lang = params?.lang ?? 'en'

	return (
		<main className="min-h-screen p-8 flex flex-col items-center bg-white">
			<h1 className="text-4xl font-extrabold mb-4">About Fixing Figures</h1>

			<p className="text-gray-700 max-w-3xl text-center mb-6">
				This is a sample About page created for the Fixing Figures starter. The project
				demonstrates a simple Next.js app layout with localized routes under the
				`/[lang]` segment. Replace this content with your real project information.
			</p>

			<section className="w-full max-w-3xl bg-gray-50 border p-6 rounded">
				<h2 className="text-2xl font-semibold mb-2">Our mission</h2>
				<p className="text-gray-600 mb-4">
					We help researchers and creators repair, annotate, and publish figures and notes
					so that scientific and creative work is easier to understand and reuse.
				</p>

				<h3 className="text-lg font-medium mb-1">Team</h3>
				<ul className="list-disc list-inside text-gray-600 mb-4">
					<li>Alice — Product</li>
					<li>Bob — Engineering</li>
					<li>Carol — Design</li>
				</ul>

				<div className="mt-4">
					<Link
						href={`/${lang}/home`}
						className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
					>
						Back to Home
					</Link>
				</div>
			</section>
		</main>
	)
}

