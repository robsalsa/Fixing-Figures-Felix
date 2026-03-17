import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import translations from '@/lib/translations/headfoot.json';

interface FooterProps {
  lang: string;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const footerT = t.footer;

  return (
    <footer role="contentinfo">
      <div className="container footerInner">
        <div className="footerLeft">
          <Link href={`/${lang}`} className="footerBrand">
            <Image
              src="/assets/my-images/icon.png"
              alt={footerT.brandAlt}
              width={44}
              height={44}
              className="brandIcon"
            />
          </Link>
          <p className="muted small">{footerT.communityDescription}</p>
        </div>

        <div className="footerRight">
          <nav className="footerNav" aria-label={footerT.footerNavAriaLabel}>
            <ul>
              <li><Link href={`/${lang}/home`} style={{color:"black"}}>{footerT.footerLinksHome}</Link></li>
              <li><Link href={`/${lang}/about`} style={{color:"black"}}>{footerT.footerLinksAbout}</Link></li>
              <li><Link href={`/${lang}/tutorials`} style={{color:"black"}}>{footerT.footerLinksContactUs}</Link></li>
              <li><Link href={`/${lang}/questionnaire`} style={{color:"black"}}>{footerT.footerLinksFixYourFigures}</Link></li>

              {/* <li><Link href={`/${lang}/contact`} style={{color:"black"}}>{footerT.footerLinksContactUs}</Link></li> */}
            </ul>
          </nav>
          {/* In the case if I have a more public personal website */}
          {/* <p className="small muted">
            {footerT.passionProject}{' '}
            <a href="https://operation-null-trace.vercel.app/" target="_blank" rel="noopener noreferrer" style={{color: "blue"}}>
              {footerT.devBackground}
            </a>
          </p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
