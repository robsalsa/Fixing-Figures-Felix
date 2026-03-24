import { defaultMetadata } from './metadata';

export interface StructuredDataProps {
  type: 'Organization' | 'Website' | 'HowTo' | 'BreadcrumbList';
  data?: any;
}

// Organization Schema
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: defaultMetadata.siteName,
    url: defaultMetadata.siteUrl,
    logo: `${defaultMetadata.siteUrl}/logo.png`,
    description: defaultMetadata.description,
    sameAs: [
      // Add your social media URLs here when available
      // 'https://twitter.com/figurefixingfelix',
      // 'https://www.facebook.com/figurefixingfelix',
      // 'https://www.instagram.com/figurefixingfelix',
    ],
  };
}

// Website Schema
export function generateWebsiteSchema(locale: string = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: defaultMetadata.siteName,
    url: `${defaultMetadata.siteUrl}/${locale}`,
    description: defaultMetadata.description,
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${defaultMetadata.siteUrl}/${locale}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// HowTo Schema for Tutorial Pages
export function generateHowToSchema(props: {
  name: string;
  description: string;
  image?: string;
  estimatedCost?: string;
  supply?: string[];
  tool?: string[];
  steps: Array<{
    name: string;
    text: string;
    image?: string;
    url?: string;
  }>;
  locale?: string;
}) {
  const { name, description, image, estimatedCost, supply = [], tool = [], steps, locale = 'en' } = props;

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    image: image ? `${defaultMetadata.siteUrl}${image}` : undefined,
    estimatedCost: estimatedCost
      ? {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: estimatedCost,
        }
      : undefined,
    supply: supply.map((item) => ({
      '@type': 'HowToSupply',
      name: item,
    })),
    tool: tool.map((item) => ({
      '@type': 'HowToTool',
      name: item,
    })),
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image ? `${defaultMetadata.siteUrl}${step.image}` : undefined,
      url: step.url ? `${defaultMetadata.siteUrl}${step.url}` : undefined,
    })),
    inLanguage: locale,
  };
}

// BreadcrumbList Schema
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${defaultMetadata.siteUrl}${item.url}`,
    })),
  };
}

// Component to render structured data
export function StructuredData({ schema }: { schema: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
