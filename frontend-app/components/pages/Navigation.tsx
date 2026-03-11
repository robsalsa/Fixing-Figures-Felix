'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import translations from '@/lib/translations/headfoot.json';

interface NavigationProps {
  lang?: string;
  currentPage?: string;
}

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'ja', label: '日本語' }
];

export const Navigation: React.FC<NavigationProps> = ({ lang, currentPage }) => {
  const safeLang = typeof lang === 'string' && lang.length > 0 ? lang : 'en';
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const t = translations[safeLang as keyof typeof translations] || translations.en;
  const navT = t.navigation;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const closeLanguageMenu = () => {
    setIsLanguageMenuOpen(false);
  };

  const isActive = (page: string) => currentPage === page ? 'active' : '';

  // Get the new path with a different language code
  const getLanguagePath = (newLang: string) => {
    if (!pathname) return `/${newLang}`;
    return pathname.replace(`/${safeLang}`, `/${newLang}`);
  };

  return (
    <header>
      <div className="container headerInner">
        <Link href={`/${safeLang}`} className="brand">
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
                href={`/${safeLang}/home`} 
                className={`burgerItem ${isActive('home')}`}
                onClick={closeMobileMenu}
              style={{color:"black"}}>
                {navT.home}
              </Link>
            </li>
            <li>
              <Link 
                href={`/${safeLang}/about`} 
                className={`burgerItem ${isActive('about')}`}
                onClick={closeMobileMenu}
              style={{color:"black"}}>
                {navT.about}
              </Link>
            </li>
            <li>
              <Link 
                href={`/${safeLang}/guild`} 
                className={`burgerItem ${isActive('guild')}`}
                onClick={closeMobileMenu}
              style={{color:"black"}}>
                {navT.guild}
              </Link>
            </li>
            <li>
              <Link 
                href={`/${safeLang}/questionnaire`} 
                className={`burgerItem ${isActive('questionnaire')}`}
                onClick={closeMobileMenu}
              style={{color:"black"}}>
                {navT.fixYourFigures}
              </Link>
            </li>
            {/* <li>
              <Link 
                href={`/${lang}/contact`} 
                className={`burgerItem ${isActive('contact')}`}
                onClick={closeMobileMenu}
              style={{color:"black"}}>
                {navT.contactUs}
              </Link>
            </li> */}
          </ul>
        </nav>

        {/* Language Switcher */}
        <div className="languageSwitcher" style={{ position: 'relative', marginRight: '10px' }}>
          <button 
            className="languageSwitcherBtn" 
            type="button"
            aria-label="Change language"
            aria-expanded={isLanguageMenuOpen}
            onClick={toggleLanguageMenu}
            style={{
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
              background: 'white',
              fontSize: '14px'
            }}
          >
            {/* Desktop: Full text */}
            <span style={{ display: 'none' }} className="langDesktop">
              Language
            </span>
            {/* Mobile: Language code */}
            <span className="langMobile">
              {safeLang.toUpperCase()}
            </span>
          </button>

          {/* Language Menu */}
          {isLanguageMenuOpen && (
            <ul 
              className="languageMenu"
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                background: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                listStyle: 'none',
                padding: 0,
                margin: '5px 0 0 0',
                minWidth: '120px',
                zIndex: 100
              }}
            >
              {languages.map((l) => (
                <li key={l.code}>
                  <Link
                    href={getLanguagePath(l.code)}
                    className={safeLang === l.code ? 'active' : ''}
                    onClick={closeLanguageMenu}
                    style={{
                      display: 'block',
                      padding: '10px 15px',
                      color: '#333',
                      textDecoration: 'none',
                      borderBottom: '1px solid #eee',
                      background: safeLang === l.code ? '#f0f0f0' : 'white',
                      fontWeight: safeLang === l.code ? 'bold' : 'normal'
                    }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

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

      <style jsx>{`
        @media (min-width: 768px) {
          .langDesktop {
            display: inline !important;
          }
          .langMobile {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Navigation;
