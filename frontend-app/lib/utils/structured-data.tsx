// Structured Data (JSON-LD) helpers for SEO

export interface StructuredDataProps {
  type: 'WebSite' | 'Organization' | 'HowTo' | 'FAQPage' | 'BreadcrumbList';
  data: Record<string, any>;
}

export function generateStructuredData(props: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
    process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000';

  const baseData = {
    '@context': 'https://schema.org',
    '@type': props.type,
    ...props.data,
  };

  return baseData;
}

export function WebsiteStructuredData() {
  return generateStructuredData({
    type: 'WebSite',
    data: {
      name: 'Figure Fixing Felix',
      description: 'Learn how to fix loose, stiff, and broken parts on your action figures',
      url: process.env.NEXT_PUBLIC_SITE_URL || 
        process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}` 
        : 'http://localhost:3000',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 
            process.env.VERCEL_URL 
            ? `https://${process.env.VERCEL_URL}` 
            : 'http://localhost:3000'}/en/tutorials?search={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
  });
}

export function OrganizationStructuredData() {
  return generateStructuredData({
    type: 'Organization',
    data: {
      name: 'Figure Fixing Felix',
      description: 'Community-driven action figure repair tutorials and guides',
      url: process.env.NEXT_PUBLIC_SITE_URL || 
        process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}` 
        : 'http://localhost:3000',
    },
  });
}

export function HowToStructuredData(params: {
  name: string;
  description: string;
  totalTime?: string;
  steps: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
  supply?: Array<string>;
  tool?: Array<string>;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
    process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000';

  return generateStructuredData({
    type: 'HowTo',
    data: {
      name: params.name,
      description: params.description,
      totalTime: params.totalTime || 'PT15M',
      supply: params.supply || [],
      tool: params.tool || [],
      step: params.steps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
        image: step.image ? `${baseUrl}${step.image}` : undefined,
      })),
    },
  });
}

export function BreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return generateStructuredData({
    type: 'BreadcrumbList',
    data: {
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    },
  });
}

export function StructuredDataScript({ data }: { data: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
