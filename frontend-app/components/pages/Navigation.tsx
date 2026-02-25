'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import translations from '@/lib/translations/headfoot.json';

interface NavigationProps {
  lang: string;
  currentPage?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ lang, currentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[lang as keyof typeof translations] || translations.en;
  const navT = t.navigation;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (page: string) => currentPage === page ? 'active' : '';

  return (
    <header>
      <div className="container headerInner">
        <Link href={`/${lang}`} className="brand">
          <Image
            src="/assets/kat.jpg"
            alt={navT.brandAlt}
            width={44}
            height={44}
            className="brandIcon"
          />
          <span className="brandTitle">{navT.brandTitle}</span>
        </Link>

        <nav role="navigation" aria-label={navT.mainNavAriaLabel}>
          <ul className={`burgerMenu ${isMobileMenuOpen ? 'active' : ''}`}>
            <li>
              <Link 
                href={`/${lang}/home`} 
                className={`burgerItem ${isActive('home')}`}
                onClick={closeMobileMenu}
              style={{color:"black"}}>
                {navT.home}
              </Link>
            </li>
            <li>
              <Link 
                href={`/${lang}/about`} 
                className={`burgerItem ${isActive('about')}`}
                onClick={closeMobileMenu}
              style={{color:"black"}}>
                {navT.about}
              </Link>
            </li>
            <li>
              <Link 
                href={`/${lang}/questionnaire`} 
                className={`burgerItem ${isActive('questionnaire')}`}
                onClick={closeMobileMenu}
              style={{color:"black"}}>
                {navT.fixYourFigures}
              </Link>
            </li>
            <li>
              <Link 
                href={`/${lang}/contact`} 
                className={`burgerItem ${isActive('contact')}`}
                onClick={closeMobileMenu}
              style={{color:"black"}}>
                {navT.contactUs}
              </Link>
            </li>
          </ul>
        </nav>

        <button 
          className="burger" 
          type="button" 
          aria-label={navT.toggleNavigation}
          aria-expanded={isMobileMenuOpen}
          onClick={toggleMobileMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </header>
  );
};

export default Navigation;
