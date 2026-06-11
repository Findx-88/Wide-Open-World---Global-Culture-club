"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function VisaBox() {
  const [hasVisa, setHasVisa] = useState(false);
  const [stamping, setStamping] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('visa_iran') === 'true') {
      setHasVisa(true);
    }
  }, []);

  const stampIranVisa = () => {
    setStamping(true);
    setTimeout(() => {
      localStorage.setItem('visa_iran', 'true');
      setHasVisa(true);
      setStamping(false);
    }, 800);
  };

  if (hasVisa) {
    return (
      <div className="claim-visa-box" id="visa-box">
        <div className="claimed-text">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          Visa Stamped Successfully!
        </div>
        <p style={{ fontSize: '0.75rem', opacity: 0.6, margin: 0 }}>
          The Iran Visa stamp has been added to your passport page.
        </p>
        <Link className="btn-ghost" href="/passport" style={{ fontSize: '0.7rem', padding: '0.5rem 1.2rem' }}>
          View Passport
        </Link>
      </div>
    );
  }

  return (
    <div className="claim-visa-box" id="visa-box">
      <div style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--amber)' }}>
        Passport Stamps Office
      </div>
      <p style={{ fontSize: '0.78rem', opacity: 0.65, margin: 0 }}>
        Have you registered or attended the Iran expedition session? Claims your virtual visa stamp to add it to your Digital Passport.
      </p>
      <button 
        className="btn-primary" 
        onClick={stampIranVisa} 
        disabled={stamping}
        style={stamping ? { opacity: 0.5, pointerEvents: 'none' } : {}}
      >
        {stamping ? 'Stamping...' : 'Stamp My Passport'}
      </button>
    </div>
  );
}
