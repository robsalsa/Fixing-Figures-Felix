import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
  process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}` 
  : 'http://localhost:3000';

const supportedLanguages = ['en', 'es', 'ja'];

// Define all your routes here
const routes = [
  '', // Root redirects to /home via [lang]/page.tsx
  '/home',
  '/about',
  '/contact',
  '/questionnaire',
  '/tutorials',
  '/tutorials/loose-parts',
  '/tutorials/stiff-parts',
  '/tutorials/broken-parts',
  '/tutorials/defective-parts',
  '/tutorials/hair-dryer',
  '/tutorials/lubricant',
  '/tutorials/sticky-tack',
  '/tutorials/wet-paper-towel',
  '/tutorials/wire-fix',
  '/tutorials/accesories',
  '/instruments',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = [];

  // Add routes for each language
  supportedLanguages.forEach((lang) => {
    routes.forEach((route) => {
      const url = `${baseUrl}/${lang}${route}`;
      
      sitemap.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === '/home' || route === '' ? 'daily' : 'weekly',
        priority: route === '/home' || route === '' ? 1.0 : 
                  route.startsWith('/tutorials') ? 0.8 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            supportedLanguages.map((l) => [l, `${baseUrl}/${l}${route}`])
          ),
        },
      });
    });
  });

  return sitemap;
}
