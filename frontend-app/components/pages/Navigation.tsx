'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavigationProps {
  lang: string;
  currentPage?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ lang, currentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            alt="Figure Fixing Felix logo"
            width={44}
            height={44}
            className="brandIcon"
          />
          <span className="brandTitle">Figure Fixing Felix</span>
        </Link>

        <nav role="navigation" aria-label="Main">
          <ul className={`burgerMenu ${isMobileMenuOpen ? 'active' : ''}`}>
            <li>
              <Link 
                href={`/${lang}/home`} 
                className={`burgerItem ${isActive('home')}`}
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href={`/${lang}/about`} 
                className={`burgerItem ${isActive('about')}`}
                onClick={closeMobileMenu}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                href={`/${lang}/questionnaire`} 
                className={`burgerItem ${isActive('questionnaire')}`}
                onClick={closeMobileMenu}
              >
                Fix Your Figures
              </Link>
            </li>
            <li>
              <Link 
                href={`/${lang}/contact`} 
                className={`burgerItem ${isActive('contact')}`}
                onClick={closeMobileMenu}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>

        <button 
          className="burger" 
          type="button" 
          aria-label="Toggle navigation"
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
