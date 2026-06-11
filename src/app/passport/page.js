"use client";
import { useState, useEffect, useRef } from 'react';
import './passport.css';
import { WOW_MEMBERS } from '../../data/members';

export default function PassportPage() {
  const [numInput, setNumInput] = useState('');
  const [err, setErr] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [passportData, setPassportData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const stampsContainerRef = useRef(null);

  useEffect(() => {
    document.body.classList.add('theme-passport');
    return () => {
      document.body.classList.remove('theme-passport');
    };
  }, []);

  const lookupPassport = () => {
    const input = numInput.trim();
    if (!input) {
      setErr('Please enter a Passport Number.');
      return;
    }
    
    setIsVerifying(true);
    setErr('');

    setTimeout(() => {
      const data = WOW_MEMBERS.find(m => m.passport_number.toUpperCase() === input.toUpperCase());
      
      // Also check client-side local stamps (bridging demo behaviour)
      const localIranVisa = localStorage.getItem('visa_iran') === 'true';
      if (data && localIranVisa && !data.visas.includes('iran')) {
          data.visas.push('iran');
      }

      if (data) {
        setPassportData(data);
      } else {
        setErr('Passport not found. Please check your number.');
      }
      setIsVerifying(false);
    }, 600);
  };

  const openPassport = () => {
    setIsOpen(true);
    setTimeout(() => {
      if (stampsContainerRef.current) {
        stampsContainerRef.current.style.display = 'flex';
      }
      window.scrollBy({ top: 300, behavior: 'smooth' });
    }, 800);
  };

  if (!passportData) {
    return (
      <main>
        <div className="passport-header reveal">
          <div className="section-eyebrow">Your Journey Log</div>
          <h1 className="section-title">WOW Digital Passport</h1>
          <p className="section-desc" style={{ maxWidth: '600px', margin: '0.8rem auto 0' }}>
            Enter your securely assigned Passport Number to view your personal cultural bio-data, journey stats, and earned visa stamps.
          </p>
        </div>

        <div id="passport-auth" className="reveal reveal-scale">
          <div className="auth-card">
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: 'var(--pp-gold)', marginBottom: '1.5rem' }}>Access Passport</h3>
            {err && <div style={{ color: 'var(--pp-red)', fontSize: '0.85rem', marginBottom: '1rem' }}>{err}</div>}
            
            <input 
              type="text" 
              value={numInput}
              onChange={(e) => setNumInput(e.target.value)}
              placeholder="Enter Passport No. (e.g. WOW-2026-0001)" 
              style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(195,156,93,0.4)', color: 'var(--cream)', fontFamily: "'Space Mono', monospace", textAlign: 'center', marginBottom: '1.5rem', outline: 'none', borderRadius: '4px' }} 
            />
            <button 
              onClick={lookupPassport} 
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center' }}
              disabled={isVerifying}
            >
              {isVerifying ? 'Verifying...' : 'Retrieve Documents'}
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Derived passport data
  const name = passportData.member_name;
  const num = passportData.passport_number;
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  const mrzName = name.toUpperCase().replace(/\s+/g, '<<');
  const numStamps = passportData.visas.length;
  const rank = numStamps > 5 ? 'Senior' : 'Explorer';
  const hasIranVisa = passportData.visas.includes('iran');

  return (
    <main>
      <div className="passport-header reveal">
        <div className="section-eyebrow">Your Journey Log</div>
        <h1 className="section-title">WOW Digital Passport</h1>
      </div>

      <div id="passport-viewer" style={{ display: 'block' }}>
        <div className="passport-container" id="pp-container">
          
          {/* FRONT COVER */}
          <div className={`pp-front-cover ${isOpen ? 'open' : ''}`} id="pp-cover" onClick={openPassport}>
            <div className="pp-front-cover-inner">
              <div className="pp-eyebrow" style={{ marginBottom: '4rem' }}>Wide Open World<br/><span style={{ opacity: 0.5, fontSize: '0.6rem' }}>EST. 2026</span></div>
              
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="var(--pp-gold)" strokeWidth="1" style={{ marginBottom: '2rem' }}>
                <circle cx="50" cy="50" r="40" strokeDasharray="2 4" />
                <circle cx="50" cy="50" r="35" strokeWidth="2" />
                <ellipse cx="50" cy="50" rx="15" ry="35" />
                <path d="M15,50 L85,50" />
                <text x="50" y="55" fontFamily="'Cormorant Garamond', serif" fontWeight="700" fontSize="20" fill="var(--pp-gold)" stroke="none" textAnchor="middle" letterSpacing="4">WOW</text>
              </svg>

              <div className="pp-title">Cultural<br/>Passport</div>
              
              <div className="pp-handwritten" style={{ color: 'var(--pp-gold)', marginTop: 'auto', borderTop: '1px solid rgba(195,156,93,0.3)', paddingTop: '1.5rem', width: '60%' }}>{name}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: 'rgba(195,156,93,0.6)', marginTop: '1rem' }}>{num}</div>
              
              <div style={{ position: 'absolute', bottom: '-40px', fontSize: '0.6rem', color: 'rgba(195,156,93,0.8)', letterSpacing: '0.2em', animation: 'pulse 2s infinite' }}>CLICK TO OPEN</div>
            </div>
          </div>

          {/* SPREAD 1: BIO DATA & STAMPS */}
          <div className="pp-spread" id="spread-1">
            <div className="pp-crease"></div>
            
            {/* LEFT PAGE */}
            <div className="pp-page pp-page-dark" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <div style={{ border: '1px solid rgba(195,156,93,0.2)', width: 'calc(100% - 2rem)', height: 'calc(100% - 2rem)', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="var(--pp-gold)" strokeWidth="1" style={{ marginBottom: '2rem', opacity: 0.5 }}>
                  <circle cx="50" cy="50" r="45" />
                  <ellipse cx="50" cy="50" rx="15" ry="45" />
                  <path d="M5,50 L95,50" />
                </svg>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--pp-gold)', lineHeight: 2, marginBottom: '2rem' }}>
                  The world is a book and those who do not explore it read only one page.
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.2rem', color: 'rgba(195,156,93,0.7)', marginBottom: '4rem' }}>— Augustine, adapted</p>
                
                <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.5rem', letterSpacing: '0.2em', color: 'rgba(195,156,93,0.4)', textTransform: 'uppercase', lineHeight: 1.8 }}>
                  Valid for all 195 countries<br/>
                  Issued by Wide Open World<br/>
                  Global Culture Club
                </div>
              </div>
            </div>

            {/* RIGHT PAGE (Bio Data) */}
            <div className="pp-page" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(43,35,28,0.1)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                <div className="pp-eyebrow" style={{ color: 'var(--pp-ink)' }}>Cultural Passport</div>
                <div className="pp-eyebrow" style={{ color: 'var(--pp-ink)' }}>Type: CP</div>
              </div>

              <div className="pp-bio-grid">
                <div style={{ background: 'rgba(43,35,28,0.05)', border: '1px solid rgba(43,35,28,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Jost', sans-serif", fontSize: '2rem', color: 'rgba(43,35,28,0.3)' }}>{initials}</div>
                <div>
                  <div className="pp-label">Full Name</div>
                  <div className="pp-value pp-handwritten">{name}</div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <div className="pp-label">Date of Issue</div>
                      <div className="pp-value">{passportData.issue_date}</div>
                    </div>
                    <div>
                      <div className="pp-label">Passport No.</div>
                      <div className="pp-value" style={{ fontFamily: "'Space Mono', monospace" }}>{num}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pp-stats-row">
                <div>
                  <div className="pp-stat-num">{numStamps}</div>
                  <div className="pp-stat-label">Countries</div>
                </div>
                <div>
                  <div className="pp-stat-num">{numStamps}</div>
                  <div className="pp-stat-label">Stamps</div>
                </div>
                <div>
                  <div className="pp-stat-num">{rank}</div>
                  <div className="pp-stat-label">Rank</div>
                </div>
              </div>

              <div style={{ marginTop: 'auto' }}>
                <div className="pp-handwritten" style={{ fontSize: '2.2rem', marginBottom: '-10px' }}>{name}</div>
                <div className="pp-label" style={{ borderTop: '1px solid rgba(43,35,28,0.1)', paddingTop: '0.5rem', marginBottom: '1.5rem' }}>Holder's Signature</div>
                
                <div className="pp-mrz">
                  WOW&lt;&lt;{mrzName}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br/>
                  {num.replace(/-/g, '')}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;4
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Stamps Container */}
        <div className="passport-container" ref={stampsContainerRef} style={{ display: 'none', marginTop: '-4rem' }}>
          <div className="pp-spread">
            <div className="pp-crease"></div>
            <div className="pp-page" style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', fontFamily: "'Jost', sans-serif", fontSize: '0.6rem', color: 'rgba(43,35,28,0.3)' }}>03</div>
              <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', fontFamily: "'Jost', sans-serif", fontSize: '6rem', fontWeight: 700, color: 'rgba(43,35,28,0.03)', lineHeight: 0.7 }}>IR</div>
              
              {hasIranVisa && (
                <div className="stamp stamp-iran" style={{ top: '25%', left: '30%', transform: 'rotate(-5deg)' }}>
                  <div style={{ fontSize: '0.4rem', letterSpacing: '0.1em', marginBottom: '2px' }}>ADMITTED</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '2px' }}>TEHRAN, IRAN</div>
                  <div style={{ fontSize: '0.4rem', fontWeight: 600 }}>06 JUN 2026</div>
                </div>
              )}
            </div>
            <div className="pp-page" style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', fontFamily: "'Jost', sans-serif", fontSize: '0.6rem', color: 'rgba(43,35,28,0.3)' }}>04</div>
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', fontFamily: "'Jost', sans-serif", fontSize: '6rem', fontWeight: 700, color: 'rgba(43,35,28,0.03)', lineHeight: 0.7 }}>WOW</div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
