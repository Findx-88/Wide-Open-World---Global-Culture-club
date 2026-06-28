"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from '../lib/theme';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const ThemeIcon = () => theme === 'dark' ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.25rem', height: '1.25rem' }}>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.25rem', height: '1.25rem' }}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );

  return (
    <nav className={`navbar-container ${isScrolled ? 'scrolled' : ''} ${isOpen ? 'menu-open' : ''}`}>

      {/* Logo */}
      <Link href="/" className="nav-logo" onClick={() => setIsOpen(false)} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/wow-expeditions-logo.png"
          alt="W.O.W — EXPEDITIONS"
          style={{
            height: '40px',
            width: 'auto',
            display: 'block',
            objectFit: 'contain'
          }}
        />
      </Link>

      {/* Desktop nav — hidden on mobile via CSS */}
      <div className="nav-desktop">
        <ul className="nav-links">
          <li><Link href="/expeditions">Expeditions</Link></li>
          <li><Link href="/library">Library</Link></li>
          <li><Link href="/members">Members</Link></li>
          <li><Link href="/recommend">Recommend</Link></li>
        </ul>
        <Link href="/join" className="btn-invite-ghost nav-join">Step into the World</Link>
        <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
          <ThemeIcon />
        </button>
      </div>

      {/* Mobile controls — theme toggle + hamburger, hidden on desktop via CSS */}
      <div className="nav-mobile-controls">
        <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
          <ThemeIcon />
        </button>
        <button className="nav-mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      {/* Mobile fullscreen overlay */}
      <div className={`nav-mobile-menu-overlay ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-globe">
            <svg className="mobile-menu-globe-svg" viewBox="0 0 100 100" fill="none" stroke="var(--accent-gold)" strokeWidth="1">
              <circle cx="50" cy="50" r="40" strokeDasharray="2 4" />
              <circle cx="50" cy="50" r="35" strokeWidth="2" />
              <ellipse cx="50" cy="50" rx="15" ry="35" />
              <path d="M15 50h70" />
            </svg>
          </div>
          <ul className="mobile-nav-links">
            <li><Link href="/expeditions" onClick={() => setIsOpen(false)}>Expeditions</Link></li>
            <li><Link href="/library" onClick={() => setIsOpen(false)}>Library</Link></li>
            <li><Link href="/members" onClick={() => setIsOpen(false)}>Members</Link></li>
            <li><Link href="/recommend" onClick={() => setIsOpen(false)}>Recommend</Link></li>
          </ul>
          <Link href="/join" className="btn-primary nav-join-mobile" onClick={() => setIsOpen(false)}>
            Step into the World
          </Link>
        </div>
      </div>

    </nav>
  );
}
