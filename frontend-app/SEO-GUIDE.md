# SEO Setup Guide for Figure Fixing Felix

This document outlines the SEO improvements implemented and next steps for optimal search engine visibility.

## What Has Been Implemented

### 1. Base URL Configuration ✅
- Fixed `metadataBase` in root layout.tsx to use proper production URL
- Environment variable support: `NEXT_PUBLIC_SITE_URL` 
- Fallback to `VERCEL_URL` for automatic deployment detection

### 2. Enhanced Metadata ✅
- **Root Layout** (`app/layout.tsx`):
  - Comprehensive title templates
  - Rich descriptions with keywords
  - Open Graph tags for social sharing
  - Twitter Card support
  - Robots directives for search engines
  - Format detection settings

### 3. Multilingual SEO ✅
- **Language Layout** (`app/[lang]/layout.tsx`):
  - `hreflang` alternates for en, es, ja
  - Canonical URLs for each language version
  - Proper language locale tags
  - Prevents duplicate content penalties

### 4. Sitemap Generation ✅
- **File**: `app/sitemap.ts`
- Automatically generates XML sitemap
- Includes all routes in all languages
- Sets proper priorities and change frequencies
- Includes language alternates in sitemap
- Accessible at: `/sitemap.xml`

### 5. Robots.txt ✅
- **File**: `app/robots.ts`
- Allows all search engines
- Blocks sensitive routes (auth, API, protected)
- Links to sitemap
- Accessible at: `/robots.txt`

### 6. Structured Data (JSON-LD) ✅
- **Helper**: `lib/utils/structured-data.tsx`
- Website schema
- Organization schema
- HowTo schema (for tutorials)
- Breadcrumb schema
- Example implementation in home page

### 7. Page-Level SEO ✅
- Example implementation in `app/[lang]/home/page.tsx`
- `generateMetadata` for dynamic metadata per language
- Structured data scripts included
- Open Graph images configured

## Required Setup Steps

### 1. Set Environment Variable ⚠️
Add to your Vercel project settings or `.env.local`:
```bash
NEXT_PUBLIC_SITE_URL=https://fixing-figures-felix-pilk.vercel.app
```

### 2. Create Open Graph Images 📸
Create these images in `public/assets/`:
- `og-image.png` (1200x630px) - General site image
- `og-home.png` (1200x630px) - Home page specific
- `twitter-image.png` (1200x630px) - Twitter card image

Use tools like:
- Canva (free templates)
- Figma (design your own)
- https://og-playground.vercel.app/

### 3. Submit to Search Engines 🔍

#### Google Search Console
1. Go to https://search.google.com/search-console
2. Add property: `https://fixing-figures-felix-pilk.vercel.app`
3. Verify ownership (DNS or HTML tag)
4. Submit sitemap: `https://fixing-figures-felix-pilk.vercel.app/sitemap.xml`

#### Bing Webmaster Tools
1. Go to https://www.bing.com/webmasters
2. Add site
3. Verify ownership
4. Submit sitemap

### 4. Add Verification Codes ✅
Google Search Console verification has been added!

In `app/layout.tsx`, the verification code is now active:
```typescript
verification: {
  google: 'NiarNh3UCDYMH7wELHZuH6u95_H3971yxDrOwNq5A3M',
  // Add Bing verification when you set it up:
  // bing: 'your-code-here',
}
```

**Next steps for Google Search Console:**
1. Return to Google Search Console
2. Click "Verify" to confirm ownership
3. Once verified, submit your sitemap: `https://fixing-figures-felix-pilk.vercel.app/sitemap.xml`

### 5. Implement SEO on Other Pages 📄

Apply the same pattern used in `home/page.tsx` to other important pages:

**Example for tutorials page:**
```typescript
import { Metadata } from 'next';
import { HowToStructuredData, StructuredDataScript, BreadcrumbStructuredData } from '@/lib/utils/structured-data';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  
  return {
    title: 'Tutorial Title',
    description: 'Tutorial description',
    openGraph: {
      title: 'Tutorial Title',
      description: 'Tutorial description',
      images: ['/assets/tutorial-og.png'],
    },
  };
}

// In your component:
const howToData = HowToStructuredData({
  name: 'How to Fix Loose Action Figure Joints',
  description: 'Step-by-step guide...',
  steps: [
    { name: 'Step 1', text: 'Description...' },
    // ... more steps
  ],
  supply: ['Clear nail polish', 'Paper towel'],
  tool: ['Tweezers'],
});

return (
  <>
    <StructuredDataScript data={howToData} />
    {/* Your content */}
  </>
);
```

## SEO Best Practices Applied

### Content Optimization
- ✅ Descriptive titles with keywords
- ✅ Meta descriptions (155-160 characters)
- ✅ Semantic HTML (h1, h2, section, nav)
- ✅ Alt text for images recommended
- ✅ Internal linking structure

### Technical SEO
- ✅ XML Sitemap with all pages
- ✅ robots.txt properly configured
- ✅ Canonical URLs to prevent duplicates
- ✅ Language alternates (hreflang)
- ✅ Mobile-responsive (via Tailwind)
- ✅ Fast loading (Next.js optimization)

### Multilingual SEO
- ✅ Proper hreflang tags
- ✅ Language-specific URLs (/en, /es, /ja)
- ✅ No duplicate content issues
- ✅ Proper locale tags

### Structured Data
- ✅ Organization schema
- ✅ Website schema with search action
- ✅ HowTo schema for tutorials
- ✅ Breadcrumb navigation

## Monitoring & Analytics

### Recommended Tools
1. **Google Search Console** - Track search performance
2. **Google Analytics** or **Plausible** - User behavior
3. **Lighthouse** - SEO score (built into Chrome DevTools)
4. **Ahrefs** or **SEMrush** - Keyword tracking (paid)

### Check Your SEO Score
Run Lighthouse in Chrome:
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Check "SEO" category
4. Run audit

Target score: 90+

## Testing Your Implementation

### 1. Test Sitemap
Visit: https://fixing-figures-felix-pilk.vercel.app/sitemap.xml
- Should show all your pages in all languages

### 2. Test Robots.txt
Visit: https://fixing-figures-felix-pilk.vercel.app/robots.txt
- Should show allow/disallow rules and sitemap link

### 3. Test Structured Data
1. Visit a page with structured data
2. Go to https://search.google.com/test/rich-results
3. Enter your page URL
4. Verify no errors

### 4. Test Language Alternates
1. View page source (Ctrl+U)
2. Look for `<link rel="alternate" hreflang="...">`
3. Should see links for en, es, ja

### 5. Test Open Graph
Use: https://www.opengraph.xyz/
- Enter your URL
- See how it appears on social media

## Performance Tips

### Image Optimization
- Use Next.js `<Image>` component (already using ✅)
- Compress images (use tinypng.com)
- Use WebP format when possible
- Add proper alt text

### Loading Speed
- ✅ Using Next.js App Router (fast by default)
- ✅ Using Suspense boundaries
- Consider lazy loading images below the fold
- Minimize JavaScript bundles

## Common Issues & Solutions

### Issue: Sitemap not updating
**Solution**: Clear Next.js cache and rebuild
```bash
rm -rf .next
npm run build
```

### Issue: Wrong canonical URL
**Solution**: Verify `NEXT_PUBLIC_SITE_URL` is set in Vercel

### Issue: Duplicate content warnings
**Solution**: Ensure language alternates and canonicals are correct (already implemented ✅)

### Issue: Pages not being indexed
**Solution**: 
1. Check robots.txt isn't blocking the page
2. Submit sitemap to Search Console
3. Request indexing manually in Search Console

## Future Enhancements

### Priority Items
1. ⬜ Add Open Graph images
2. ⬜ Set NEXT_PUBLIC_SITE_URL environment variable
3. 🔄 Submit to Google Search Console (verification code added - complete verification)
4. ⬜ Add metadata to all major pages
5. ⬜ Add HowTo structured data to tutorial pages

### Optional Improvements
- Add FAQ schema for common questions
- Implement breadcrumb structured data on deep pages
- Add review/rating schema if applicable
- Create blog posts for long-tail keywords
- Build backlinks from figure communities
- Add video schema if you create video tutorials

## Keywords to Target

### Primary Keywords
- action figure repair
- figure fixing
- revoltech repair
- amazing yamaguchi fix

### Long-tail Keywords
- how to fix loose action figure joints
- broken action figure parts repair
- stiff figure joints solution
- action figure maintenance guide

### Local Keywords (if applicable)
- [location] action figure repair
- [location] toy repair service

## Resources

- [Next.js Metadata Docs](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [hreflang Guide](https://developers.google.com/search/docs/specialty/international/localized-versions)

## Questions?

If you need help with any of these steps, refer to:
- Next.js documentation
- Vercel deployment docs
- Google Search Console help center

---

**Last Updated**: March 2026
**Implementation Status**: ✅ Core SEO features implemented
**Next Steps**: Environment variables → Open Graph images → Search Console submission
