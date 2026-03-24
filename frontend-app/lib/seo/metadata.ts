import type { Metadata } from 'next';

export const defaultMetadata = {
  siteName: 'Figure Fixing Felix',
  title: 'Figure Fixing Felix - Fix Your Action Figures',
  description: 'Community-sourced tutorials and guides for fixing common action figure problems. Learn how to repair loose parts, stiff joints, broken pieces, and more.',
  keywords: [
    'action figures',
    'figure repair',
    'toy fixing',
    'Revoltech',
    'Amazing Yamaguchi',
    'figure maintenance',
    'loose joints',
    'stiff parts',
    'broken figures',
    'DIY figure repair',
    'action figure tutorial'
  ],
  author: 'Figure Fixing Felix Community',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL 
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
};

interface GenerateMetadataProps {
  title?: string;
  description?: string;
  path?: string;
  locale?: string;
  image?: string;
  type?: 'website' | 'article';
}

export function generateSEOMetadata({
  title,
  description,
  path = '',
  locale = 'en',
  image,
  type = 'website',
}: GenerateMetadataProps): Metadata {
  const pageTitle = title 
    ? `${title} | ${defaultMetadata.siteName}` 
    : defaultMetadata.title;
  const pageDescription = description || defaultMetadata.description;
  const fullUrl = `${defaultMetadata.siteUrl}${path}`;
  const ogImage = image || `${defaultMetadata.siteUrl}/og-image.png`;

  // Map locale codes to full language names
  const localeMap: Record<string, string> = {
    en: 'en_US',
    es: 'es_ES',
    ja: 'ja_JP',
  };

  const ogLocale = localeMap[locale] || 'en_US';

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: defaultMetadata.keywords,
    authors: [{ name: defaultMetadata.author }],
    creator: defaultMetadata.author,
    publisher: defaultMetadata.siteName,
    metadataBase: new URL(defaultMetadata.siteUrl),
    alternates: {
      canonical: fullUrl,
      languages: {
        'en': `${defaultMetadata.siteUrl}/en${path.replace(/^\/(en|es|ja)/, '')}`,
        'es': `${defaultMetadata.siteUrl}/es${path.replace(/^\/(en|es|ja)/, '')}`,
        'ja': `${defaultMetadata.siteUrl}/ja${path.replace(/^\/(en|es|ja)/, '')}`,
      },
    },
    openGraph: {
      type,
      locale: ogLocale,
      url: fullUrl,
      siteName: defaultMetadata.siteName,
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
      creator: '@figurefixingfelix',
      site: '@figurefixingfelix',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // Add your verification codes when you have them
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },
  };
}

// Language-specific page titles and descriptions
export const pageTranslations = {
  en: {
    home: {
      title: 'Home - Figure Fixing Felix',
      description: 'Welcome to Figure Fixing Felix. Find community-sourced tutorials and guides for fixing common action figure problems.',
    },
    about: {
      title: 'About Us',
      description: 'Learn about Figure Fixing Felix and our mission to help collectors maintain and repair their action figures.',
    },
    tutorials: {
      title: 'Tutorials',
      description: 'Browse our comprehensive collection of action figure repair tutorials for loose parts, stiff joints, broken pieces, and more.',
    },
    contact: {
      title: 'Contact Us',
      description: 'Get in touch with the Figure Fixing Felix community. Share your feedback, questions, or suggestions.',
    },
    questionnaire: {
      title: 'Fix Your Figures',
      description: 'Use our interactive questionnaire to find the right repair solution for your action figure problems.',
    },
  },
  es: {
    home: {
      title: 'Inicio - Figure Fixing Felix',
      description: 'Bienvenido a Figure Fixing Felix. Encuentra tutoriales y guías de la comunidad para arreglar problemas comunes de figuras de acción.',
    },
    about: {
      title: 'Sobre Nosotros',
      description: 'Aprende sobre Figure Fixing Felix y nuestra misión de ayudar a los coleccionistas a mantener y reparar sus figuras de acción.',
    },
    tutorials: {
      title: 'Tutoriales',
      description: 'Explora nuestra colección completa de tutoriales de reparación de figuras de acción para partes sueltas, articulaciones rígidas, piezas rotas y más.',
    },
    contact: {
      title: 'Contáctanos',
      description: 'Ponte en contacto con la comunidad de Figure Fixing Felix. Comparte tus comentarios, preguntas o sugerencias.',
    },
    questionnaire: {
      title: 'Arregla Tus Figuras',
      description: 'Usa nuestro cuestionario interactivo para encontrar la solución de reparación adecuada para tus problemas de figuras de acción.',
    },
  },
  ja: {
    home: {
      title: 'ホーム - Figure Fixing Felix',
      description: 'Figure Fixing Felixへようこそ。アクションフィギュアの一般的な問題を修正するためのコミュニティソースのチュートリアルとガイドを見つけてください。',
    },
    about: {
      title: '私たちについて',
      description: 'Figure Fixing Felixと、コレクターがアクションフィギュアを維持・修理するのを支援する私たちの使命について学びましょう。',
    },
    tutorials: {
      title: 'チュートリアル',
      description: 'ゆるいパーツ、硬い関節、壊れたピースなどのアクションフィギュア修理チュートリアルの包括的なコレクションを閲覧してください。',
    },
    contact: {
      title: 'お問い合わせ',
      description: 'Figure Fixing Felixコミュニティにお問い合わせください。フィードバック、質問、提案を共有してください。',
    },
    questionnaire: {
      title: 'フィギュアを修理する',
      description: 'インタラクティブなアンケートを使用して、アクションフィギュアの問題に適した修理ソリューションを見つけてください。',
    },
  },
};
