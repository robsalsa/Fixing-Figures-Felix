import { ReactNode } from "react";
import SEOHead from "@/components/SEO/seo-head";


const supportedLanguages = ["en", "es", "ja"] as const;
type SupportedLang = typeof supportedLanguages[number];

export function generateStaticParams() {
  return supportedLanguages.map((lang) => ({ lang }));
}

type LangLayoutProps = {
  children: ReactNode;
  params: { lang: SupportedLang };
};

export default function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = params;

  // Example language-based SEO
  const titles = {
    en: "Fixing Figures Felix – Action Figure Repair Tutorials",
    es: "Fixing Figures Felix – Tutoriales de Reparación de Figuras de Acción",
    ja: "Fixing Figures Felix – アクションフィギュア修理チュートリアル",
  };

  const descriptions = {
    en: "Step-by-step guides to fix loose or stiff parts on action figures.",
    es: "Guías paso a paso para arreglar piezas sueltas o rígidas en figuras de acción.",
    ja: "アクションフィギュアの緩い部品や硬い部品を修理するステップバイステップガイド。",
  };

  return (
    <html lang={lang}>
      <head>
        <SEOHead
          title={titles[lang]}
          description={descriptions[lang]}
          canonical={`https://fixingfiguresfelix.com/${lang}`}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}