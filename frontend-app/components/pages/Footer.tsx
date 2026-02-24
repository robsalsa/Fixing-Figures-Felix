import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FooterProps {
  lang: string;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer role="contentinfo">
      <div className="container footerInner">
        <div className="footerLeft">
          <Link href={`/${lang}`} className="footerBrand">
            <Image
              src="/assets/kat.jpg"
              alt="Figure Fixing Felix logo"
              width={44}
              height={44}
              className="brandIcon"
            />
          </Link>
          <p className="muted small">Community sourced fixes and stats.</p>
        </div>

        <div className="footerRight">
          <nav className="footerNav" aria-label="Footer">
            <ul>
              <li><Link href={`/${lang}/home`} style={{color:"black"}}>Home</Link></li>
              <li><Link href={`/${lang}/about`} style={{color:"black"}}>About</Link></li>
              <li><Link href={`/${lang}/questionnaire`} style={{color:"black"}}>Fix Your Figures</Link></li>
              <li><Link href={`/${lang}/contact`} style={{color:"black"}}>Contact Us</Link></li>
            </ul>
          </nav>
          <p className="small muted">
            This is a passion project,{' '}
            <a href="https://operation-null-trace.vercel.app/" target="_blank" rel="noopener noreferrer" style={{color: "blue"}}>
              check out my website :)
            </a>
            {' '}for more dev background.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
