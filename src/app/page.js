import Link from 'next/link';
import dynamic from 'next/dynamic';
import Countdown from '../components/Countdown';
import { FEATURED_BOOKS } from '../data/books-data';
import { WOW_MEMBERS } from '../data/members';
import MeetingTime from '../components/MeetingTime';

// MapComponent uses browser APIs, so it should only run on the client
const MapComponent = dynamic(() => import('../components/MapComponent'), { ssr: false });

// 3D Globe — client only
const RotatingGlobe = dynamic(() => import('../components/RotatingGlobe'), { ssr: false });

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section id="hero">
        <div className="hero-left">
          {/* Active Expedition Pill Badge */}
          <div className="active-expedition-badge">
            <span className="pulse-dot"></span>
            <span className="badge-text" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>Active Expedition · Iran {/* eslint-disable-next-line @next/next/no-img-element */}<img src="https://flagcdn.com/w40/ir.png" alt="Iran" style={{ width: '20px', height: '13px', objectFit: 'cover', borderRadius: '2px', verticalAlign: 'middle', boxShadow: '0 1px 3px rgba(0,0,0,0.4)', flexShrink: 0 }} /></span>
          </div>

          <h1 className="hero-title">
            Wide Open World.<br />
            <span className="title-serif">Global Book & Film Club.</span>
          </h1>

          <p className="hero-subtitle">Two months. One country. A book, a film, a friend.</p>

          <p className="hero-description">
            We study one culture at a time around the world. Every two months, we read a landmark book, watch an acclaimed movie, and meet live with a guest speaker from that country—our "friend"—to discuss, ask questions, and build global connections.
          </p>

          <div className="hero-ctas">
            <Link className="btn-primary" href="/expeditions/iran">
              Explore Iran Expedition
            </Link>
            <Link className="btn-ghost" href="/library">The Library Archives</Link>
          </div>
        </div>

        {/* Active Expedition — Globe + Info Panel */}
        <div className="hero-book-side reveal reveal-right" style={{
          flexShrink: 0,
          position: 'relative',
          width: '100%',
          height: '100%',
          minHeight: '540px',
          alignSelf: 'stretch',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {/* 3D Globe blending directly into the background, shifted slightly down */}
          <div style={{ width: '100%', height: '100%', position: 'absolute', top: '10px', left: 0 }}>
            <RotatingGlobe />
          </div>

          {/* Floating Expedition info card (glassmorphism style) */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            right: '10px',
            background: 'rgba(10, 15, 12, 0.55)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(201, 160, 82, 0.22)',
            borderRadius: '6px',
            padding: '0.75rem 0.9rem',
            width: '240px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45)',
            zIndex: 10,
            pointerEvents: 'auto',
          }}>
            <div style={{
              fontSize: '0.52rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--amber-light)',
              fontFamily: "'Jost', sans-serif",
              opacity: 0.85,
              marginBottom: '0.35rem',
            }}>
              Current Expedition
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#e8dfc8', fontFamily: "'Cormorant Garamond', serif", display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                Iran
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://flagcdn.com/w40/ir.png" alt="Iran" style={{ width: '22px', height: '14px', objectFit: 'cover', borderRadius: '2px', boxShadow: '0 1px 4px rgba(0,0,0,0.4)' }} />
              </div>
              <div style={{ fontSize: '0.62rem', color: '#e8dfc8', opacity: 0.85, fontFamily: "'Jost', sans-serif", lineHeight: 1.25 }}>
                <span style={{ color: 'rgba(201, 160, 82, 0.65)', fontSize: '0.52rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginRight: '4px' }}>Book:</span>
                Touba &amp; the Meaning of Night
              </div>
              <div style={{ fontSize: '0.62rem', color: 'var(--amber-light)', opacity: 0.85, fontFamily: "'Jost', sans-serif", lineHeight: 1.25 }}>
                <span style={{ color: 'rgba(201, 160, 82, 0.65)', fontSize: '0.52rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginRight: '4px' }}>Film:</span>
                A Separation
              </div>
              <Link href="/expeditions/iran" style={{
                fontSize: '0.62rem',
                color: '#e8dfc8',
                textDecoration: 'none',
                marginTop: '0.2rem',
                paddingTop: '0.2rem',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontFamily: "'Jost', sans-serif"
              }}>
                <div>
                  <span style={{ color: 'rgba(201, 160, 82, 0.65)', fontSize: '0.52rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginRight: '4px' }}>Friend:</span>
                  Shafagh Kazemi
                </div>
                <span style={{ color: 'var(--amber-light)', fontWeight: 'bold' }}>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SESSION BANNER */}
      <section id="session">
        <div>
          <div className="session-label">WOW Launch Meeting</div>
          <div className="session-time"><MeetingTime /></div>
          <div className="session-detail">Introduction to Iran, the book & the film · Google Meet</div>
        </div>
        <Countdown />
        <Link className="session-join" href="/join">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
          </svg>
          Step into the World
        </Link>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        <div className="stat">
          <span className="stat-num">00</span>
          <span className="stat-label">Expeditions Completed</span>
        </div>
        <div className="stat">
          <span className="stat-num">01</span>
          <span className="stat-label">Active Journey</span>
        </div>
        <Link href="/members" className="stat" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span className="stat-num">{WOW_MEMBERS.length}+</span>
          <span className="stat-label">Active Explorers</span>
        </Link>
        <div className="stat">
          <span className="stat-num">190+</span>
          <span className="stat-label">Countries Visitable</span>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="map-section" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
        <div className="page-hero" style={{ marginBottom: '4rem' }}>
          <div className="section-eyebrow">The WOW Concept</div>
          <h2 className="section-title">A Journey in Two-Month Cycles</h2>
          <p className="section-desc">We deep dive into one cultural landscape at a time. Here is how our expedition flows:</p>
        </div>

        <div className="cycle-grid-two">
          <div className="cycle-step">
            <div className="cycle-num">01</div>
            <div className="cycle-body">
              <h3 className="cycle-title">Month 1: The Cultural Introduction</h3>
              <p className="cycle-text">We gather on Google Meet for our launch. A native guest speaker (our <em>Friend</em>) introduces the country's social context and explains why they nominated the chosen book and movie. We spend the month reading and watching.</p>
            </div>
          </div>
          <div className="cycle-step">
            <div className="cycle-num">02</div>
            <div className="cycle-body">
              <h3 className="cycle-title">Month 2: The Reflections & Discussion</h3>
              <p className="cycle-text">We meet a second time to dissect the book's themes, share our reactions to the movie, and discuss what we learned about the country. The session features a live Q&A panel with our speaker to bridge understanding.</p>
            </div>
          </div>
        </div>

        <div className="cycle-passport-note">
          <span className="note-icon">🎫</span>
          <p className="note-text">
            <strong>Passport Stamp Legacy:</strong> Upon completing the cycle, we record our reflections and provide a visa stamp of that country in your Passport.
          </p>
        </div>
      </section>

      {/* WORLD MAP */}
      <section className="map-section">
        <div className="page-hero">
          <div className="section-eyebrow">Explore the WOW Expedition Map</div>
          <h2 className="section-title">Our Active Destinations</h2>
          <p className="section-desc">Click glowing markers to embark on country expeditions. Iran is our active expedition gateway, with future countries waiting to be discovered.</p>
        </div>

        <MapComponent />

        <div className="map-legend">
          <div className="map-legend-item">
            <span className="legend-dot" style={{ background: 'var(--accent-gold)', boxShadow: '0 0 8px var(--accent-gold)' }}></span>
            Active Expedition (Iran)
          </div>
        </div>

        {/* Mobile Country Status Directory (Responsive component) */}
        <div className="mobile-country-status md:hidden">
          <h3 className="mobile-country-status-title">Expedition Status Directory</h3>
          <div className="mobile-country-list">
            {FEATURED_BOOKS.filter(b => b.status === 'reading').map(b => (
              <Link
                key={b.id}
                href={b.code === 'IR' ? '/expeditions/iran' : `/library#${b.country.toLowerCase()}`}
                className="mobile-country-item"
              >
                <div className="mobile-country-flag">
                  <img src={`https://flagcdn.com/w40/${b.code.toLowerCase()}.png`} alt={b.country} width="24" height="18" />
                </div>
                <div className="mobile-country-info">
                  <span className="mobile-country-name">{b.country}</span>
                  <span className="mobile-country-book">{b.title}</span>
                </div>
                <span className={`mobile-country-badge status-${b.status}`}>
                  {b.status === 'reading' ? 'Active' : 'Upcoming'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
