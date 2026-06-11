"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar-container">
      <Link href="/" className="nav-logo" onClick={() => setIsOpen(false)}>
        <svg className="wow-logo-svg" viewBox="0 0 160 40" width="120" height="30" fill="currentColor">
          <path className="logo-book-left" d="M10,10 L18,30 L24,20 L30,30 L38,10 L33,10 L28,24 L24,15 L20,24 L15,10 Z" fill="var(--amber)" />
          <path className="logo-book-pages" d="M12,12 L17,25 L23,17 L24,17 L30,25 L35,12" fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
          <g className="logo-globe-container">
            <circle cx="58" cy="20" r="12" fill="none" stroke="var(--cream)" strokeWidth="2" />
            <ellipse cx="58" cy="20" rx="6" ry="12" fill="none" stroke="var(--cream)" strokeWidth="1" opacity="0.6">
              <animate attributeName="rx" values="12;0;12" dur="6s" repeatCount="indefinite" />
            </ellipse>
            <line x1="46" y1="20" x2="70" y2="20" stroke="var(--cream)" strokeWidth="1" opacity="0.6" />
            <line x1="58" y1="8" x2="58" y2="32" stroke="var(--cream)" strokeWidth="1" opacity="0.6" />
          </g>
          <path className="logo-film-right" d="M78,10 L86,30 L92,20 L98,30 L106,10 L101,10 L96,24 L92,15 L88,24 L83,10 Z" fill="var(--amber)" />
          <rect x="79" y="12" width="2" height="2" fill="var(--ink)" />
          <rect x="80.5" y="16" width="2" height="2" fill="var(--ink)" />
          <rect x="82" y="20" width="2" height="2" fill="var(--ink)" />
          <rect x="83.5" y="24" width="2" height="2" fill="var(--ink)" />
          <rect x="100.5" y="24" width="2" height="2" fill="var(--ink)" />
          <rect x="102" y="20" width="2" height="2" fill="var(--ink)" />
          <rect x="103.5" y="16" width="2" height="2" fill="var(--ink)" />
          <rect x="105" y="12" width="2" height="2" fill="var(--ink)" />
          <text x="114" y="22" fontFamily="'Jost', sans-serif" fontSize="12" fontWeight="600" fill="var(--cream)" letterSpacing="2">WOW</text>
          <text x="114" y="32" fontFamily="'Jost', sans-serif" fontSize="6" fontWeight="400" fill="var(--parchment)" opacity="0.5" letterSpacing="1">EXPEDITIONS</text>
        </svg>
      </Link>
      
      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 nav-desktop">
        <ul className="nav-links">
          <li><Link href="/expeditions">Expeditions</Link></li>
          <li><Link href="/library">Library</Link></li>
          <li><Link href="/passport">Passport</Link></li>
          <li><Link href="/recommend">Recommend</Link></li>
        </ul>
        <Link href="/join" className="btn-primary nav-join">Step into the World</Link>
      </div>

      {/* Hamburger Toggle */}
      <button className="md:hidden nav-mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
        <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        <span className={`bar ${isOpen ? 'open' : ''}`}></span>
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`nav-mobile-menu md:hidden ${isOpen ? 'open' : 'hidden'}`}>
        <ul>
          <li><Link href="/expeditions" onClick={() => setIsOpen(false)}>Expeditions</Link></li>
          <li><Link href="/library" onClick={() => setIsOpen(false)}>Library</Link></li>
          <li><Link href="/passport" onClick={() => setIsOpen(false)}>Passport</Link></li>
          <li><Link href="/recommend" onClick={() => setIsOpen(false)}>Recommend</Link></li>
          <li className="mobile-join-li">
            <Link href="/join" className="btn-primary nav-join-mobile" onClick={() => setIsOpen(false)}>Step into the World</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
