import Link from 'next/link'

export default function Home({ params }: { params: { lang: string } }) {
	const lang = params?.lang ?? 'en'

	return (
		<main className="min-h-screen flex flex-col items-center justify-center p-8 bg-black">
			<h2>Fixing Figures — Home</h2>
        
			<p className="text-lg text-gray-600 mb-6 max-w-2xl text-center">
				Welcome to a sample home page for the Fixing Figures demo. Use the links below to
				explore the site and see example content for the About page, instruments and notes.
			</p>

			<div className="flex gap-3">
				<Link
					href={`/${lang}/about`}
					className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
				>
					About
				</Link>

				<Link
					href={`/instruments`}
					className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
				>
					Instruments
				</Link>

				<Link
					href={`/${lang}/notes`}
					className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
				>
					Notes
				</Link>
			</div>
		</main>
	)
}

