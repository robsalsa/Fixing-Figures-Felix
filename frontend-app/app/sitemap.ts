import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL 
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

  const languages = ['en', 'es', 'ja'];
  
  // Define all your static pages
  const pages = [
    '',
    '/home',
    '/about',
    '/contact',
    '/questionnaire',
    '/tutorials',
    '/tutorials/loose-parts',
    '/tutorials/stiff-parts',
    '/tutorials/broken-parts',
    '/tutorials/defective-parts',
    '/tutorials/accessories',
    '/tutorials/hair-dryer',
    '/tutorials/lubricant',
    '/tutorials/sticky-tack',
    '/tutorials/wet-paper-towel',
    '/tutorials/wire-fix',
  ];

  // Generate sitemap entries for each language and page
  const sitemapEntries: MetadataRoute.Sitemap = [];

  languages.forEach((lang) => {
    pages.forEach((page) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : page.includes('/tutorials/') ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : page.includes('/tutorials/') ? 0.8 : 0.7,
        alternates: {
          languages: {
            en: `${baseUrl}/en${page}`,
            es: `${baseUrl}/es${page}`,
            ja: `${baseUrl}/ja${page}`,
          },
        },
      });
    });
  });

  return sitemapEntries;
}
