"use client";
import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { WOW_MEMBERS } from '../../data/members';
import '../passport/passport.css';

// ── Passport Generator (embedded, pre-fillable) ──
function PassportGenerator({ prefilledNumber = '' }) {
  const [numInput, setNumInput] = useState(prefilledNumber);
  const [err, setErr] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [passportData, setPassportData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const stampsContainerRef = useRef(null);

  const lookupPassport = () => {
    const input = numInput.trim();
    if (!input) { setErr('Please enter a Passport Number.'); return; }
    setIsVerifying(true);
    setErr('');
    setTimeout(() => {
      const data = WOW_MEMBERS.find(m => m.passport_number.toUpperCase() === input.toUpperCase());
      if (data) {
        // bridge local Iran visa stamp
        const localIranVisa = typeof window !== 'undefined' && localStorage.getItem('visa_iran') === 'true';
        const cloned = { ...data, visas: [...data.visas] };
        if (localIranVisa && !cloned.visas.includes('iran')) cloned.visas.push('iran');
        setPassportData(cloned);
      } else {
        setErr('Passport not found. Please check your number.');
      }
      setIsVerifying(false);
    }, 600);
  };

  const openPassport = () => {
    setIsOpen(true);
    setTimeout(() => {
      if (stampsContainerRef.current) stampsContainerRef.current.style.display = 'flex';
      window.scrollBy({ top: 300, behavior: 'smooth' });
    }, 800);
  };

  if (!passportData) {
    return (
      <div className="pp-generator-wrap">
        <div className="exp-section-header" style={{ marginBottom: '2rem' }}>
          <h2 className="exp-section-title">WOW Digital Passport</h2>
          <p className="exp-section-desc">
            Enter your passport number to view your personal cultural bio-data and earned visa stamps.
          </p>
        </div>
        <div id="passport-auth">
          <div className="auth-card">
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: 'var(--pp-gold)', marginBottom: '1.5rem' }}>
              Access Passport
            </h3>
            {err && <div style={{ color: 'var(--pp-red)', fontSize: '0.85rem', marginBottom: '1rem' }}>{err}</div>}
            <input
              type="text"
              value={numInput}
              onChange={e => setNumInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && lookupPassport()}
              placeholder="Enter Passport No. (e.g. WOW-2026-0001)"
              style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(195,156,93,0.4)', color: 'var(--cream)', fontFamily: "'Space Mono', monospace", textAlign: 'center', marginBottom: '1.5rem', outline: 'none', borderRadius: '4px' }}
            />
            <button onClick={lookupPassport} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={isVerifying}>
              {isVerifying ? 'Verifying...' : 'Retrieve Documents'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const name = passportData.member_name;
  const num = passportData.passport_number;
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  const mrzName = name.toUpperCase().replace(/\s+/g, '<<');
  const numStamps = passportData.visas.length;
  const rank = numStamps > 5 ? 'Senior' : 'Explorer';
  const hasIranVisa = passportData.visas.includes('iran');

  return (
    <div className="pp-generator-wrap">
      <div className="exp-section-header" style={{ marginBottom: '2rem' }}>
        <div className="section-eyebrow">Your Journey Log</div>
        <h2 className="exp-section-title">WOW Digital Passport</h2>
      </div>
      <div id="passport-viewer" style={{ display: 'block' }}>
        <div className="passport-container" id="pp-container">
          <div className={`pp-front-cover ${isOpen ? 'open' : ''}`} id="pp-cover" onClick={openPassport}>
            <div className="pp-front-cover-inner">
              <div className="pp-eyebrow" style={{ marginBottom: '4rem' }}>Wide Open World<br /><span style={{ opacity: 0.5, fontSize: '0.6rem' }}>EST. 2026</span></div>
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="var(--pp-gold)" strokeWidth="1" style={{ marginBottom: '2rem' }}>
                <circle cx="50" cy="50" r="40" strokeDasharray="2 4" />
                <circle cx="50" cy="50" r="35" strokeWidth="2" />
                <ellipse cx="50" cy="50" rx="15" ry="35" />
                <path d="M15,50 L85,50" />
                <text x="50" y="55" fontFamily="'Cormorant Garamond', serif" fontWeight="700" fontSize="20" fill="var(--pp-gold)" stroke="none" textAnchor="middle" letterSpacing="4">WOW</text>
              </svg>
              <div className="pp-title">Cultural<br />Passport</div>
              <div className="pp-handwritten" style={{ color: 'var(--pp-gold)', marginTop: 'auto', borderTop: '1px solid rgba(195,156,93,0.3)', paddingTop: '1.5rem', width: '60%' }}>{name}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: 'rgba(195,156,93,0.6)', marginTop: '1rem' }}>{num}</div>
              <div style={{ position: 'absolute', bottom: '-40px', fontSize: '0.6rem', color: 'rgba(195,156,93,0.8)', letterSpacing: '0.2em', animation: 'pulse 2s infinite' }}>CLICK TO OPEN</div>
            </div>
          </div>

          <div className="pp-spread" id="spread-1">
            <div className="pp-crease"></div>
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
                  Valid for all 195 countries<br />Issued by Wide Open World<br />Global Culture Club
                </div>
              </div>
            </div>

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
                <div><div className="pp-stat-num">{numStamps}</div><div className="pp-stat-label">Countries</div></div>
                <div><div className="pp-stat-num">{numStamps}</div><div className="pp-stat-label">Stamps</div></div>
                <div><div className="pp-stat-num">{rank}</div><div className="pp-stat-label">Rank</div></div>
              </div>

              <div style={{ marginTop: 'auto' }}>
                <div className="pp-handwritten" style={{ fontSize: '2.2rem', marginBottom: '-10px' }}>{name}</div>
                <div className="pp-label" style={{ borderTop: '1px solid rgba(43,35,28,0.1)', paddingTop: '0.5rem', marginBottom: '1.5rem' }}>Holder&apos;s Signature</div>
                <div className="pp-mrz">
                  WOW&lt;&lt;{mrzName}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br />
                  {num.replace(/-/g, '')}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;4
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stamps spread */}
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

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button className="btn-ghost" onClick={() => { setPassportData(null); setIsOpen(false); setNumInput(''); }}>
          ← Look up another passport
        </button>
      </div>
    </div>
  );
}

// ── Main Members Page (reads ?uid= from URL for deep-linking) ──
function MembersPageInner() {
  const searchParams = useSearchParams();
  const uidFromUrl = searchParams.get('uid') || '';
  const [selectedPassport, setSelectedPassport] = useState(uidFromUrl);

  // Auto-scroll to passport section when arriving via ?uid= link
  useEffect(() => {
    if (uidFromUrl) {
      setTimeout(() => {
        document.getElementById('passport-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [uidFromUrl]);

  const handleMemberClick = (passportNumber) => {
    setSelectedPassport(passportNumber);
    setTimeout(() => {
      document.getElementById('passport-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <main>
      {/* PAGE HERO */}
      <div className="section-header page-hero">
        <div className="section-eyebrow">The Crew</div>
        <h1 className="section-title">Explorers</h1>
        <p className="section-desc">Our founding cohort of cultural explorers. Click any member to view their digital passport.</p>
      </div>

      {/* MEMBERS GRID */}
      <section className="exp-section">
        <div className="exp-members-grid">
          {WOW_MEMBERS.map((member, i) => (
            <button
              key={member.passport_number}
              className={`exp-member-card ${selectedPassport === member.passport_number ? 'selected' : ''}`}
              onClick={() => handleMemberClick(member.passport_number)}
            >
              <div className="exp-member-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="exp-member-avatar">
                {member.member_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="exp-member-info">
                <div className="exp-member-name">{member.member_name}</div>
                <div className="exp-member-country">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://flagcdn.com/w40/${member.country_code}.png`}
                    alt={member.country}
                    width={member.country_code === 'np' ? 14 : 20}
                    height={member.country_code === 'np' ? 20 : 14}
                    style={{
                      borderRadius: '2px',
                      objectFit: member.country_code === 'np' ? 'contain' : 'cover',
                      flexShrink: 0,
                    }}
                  />
                  {member.country}
                </div>
              </div>
              <div className="exp-member-passport">
                <div className="exp-passport-label">Passport No.</div>
                <div className="exp-passport-num">{member.passport_number}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* PASSPORT TOOL */}
      <section className="exp-section exp-members-section" id="passport-section" style={{ background: 'var(--bg-base)' }}>
        <PassportGenerator key={selectedPassport} prefilledNumber={selectedPassport} />
      </section>
    </main>
  );
}

export default function MembersPage() {
  return (
    <Suspense fallback={<main style={{ minHeight: '100vh' }} />}>
      <MembersPageInner />
    </Suspense>
  );
}
