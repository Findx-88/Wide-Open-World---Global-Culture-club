import Link from 'next/link';
import dynamic from 'next/dynamic';
import Countdown from '../components/Countdown';
import { FEATURED_BOOKS } from '../data/books-data';

// MapComponent uses browser APIs, so it should only run on the client
const MapComponent = dynamic(() => import('../components/MapComponent'), { ssr: false });

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section id="hero">
        <div className="hero-left">
          {/* Active Expedition Pill Badge */}
          <div className="active-expedition-badge">
            <span className="pulse-dot"></span>
            <span className="badge-text">Active Expedition · Iran 🇮🇷</span>
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

        {/* Active Expedition Dossier Panel */}
        <div className="hero-book-side reveal reveal-right" style={{ flexShrink: 0 }}>
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '1.2rem',
            width: '100%', maxWidth: '460px',
            background: 'rgba(20, 17, 14, 0.85)',
            border: '1px solid rgba(255,255,255,0.07)',
            padding: '1.8rem',
            borderRadius: '6px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
          }}>

            {/* Header label */}
            <div style={{ textAlign: 'center', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--amber-light)', fontFamily: "'Jost', sans-serif", opacity: 0.8 }}>
              Featured in this Expedition
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }}></div>

            {/* Cards Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '1rem', alignItems: 'stretch' }}>

              {/* ── Book Card ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Link href="/expeditions/iran" style={{ display: 'block', textDecoration: 'none' }}>
                  <div style={{
                    position: 'relative', height: '280px',
                    background: 'linear-gradient(160deg, #1e3a54 0%, #16293d 40%, #0d1e2e 100%)',
                    borderRadius: '2px 5px 5px 2px',
                    boxShadow: '8px 14px 35px rgba(0,0,0,0.55)',
                    overflow: 'hidden',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                  }}>
                    {/* Spine */}
                    <div style={{
                      position: 'absolute', left: 0, top: 0, bottom: 0, width: '14px',
                      background: 'linear-gradient(to right, #0a1826, #1c3a54)',
                      borderRight: '1px solid rgba(255,255,255,0.06)'
                    }}></div>
                    {/* Country code top */}
                    <div style={{ paddingLeft: '1.6rem', paddingTop: '1.1rem', paddingRight: '0.9rem' }}>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '2rem', fontWeight: 700,
                        color: '#fff', lineHeight: 1, letterSpacing: '0.02em'
                      }}>IR</div>
                    </div>
                    {/* Title + Author bottom */}
                    <div style={{ paddingLeft: '1.6rem', paddingBottom: '1.1rem', paddingRight: '0.9rem' }}>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '1rem', fontWeight: 700,
                        color: '#e8dfc8', lineHeight: 1.3, marginBottom: '0.3rem'
                      }}>Touba &amp; the Meaning of Night</div>
                      <div style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: '0.52rem', letterSpacing: '0.12em',
                        textTransform: 'uppercase', color: 'rgba(232,223,200,0.55)'
                      }}>S. Parsipur</div>
                    </div>
                  </div>
                </Link>
                <div style={{ textAlign: 'center', fontSize: '0.6rem', letterSpacing: '0.12em', opacity: 0.5, textTransform: 'uppercase', fontFamily: "'Jost', sans-serif" }}>
                  📖 The Book
                </div>
              </div>

              {/* ── Film Ticket Card ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Link href="/expeditions/iran" style={{ display: 'block', textDecoration: 'none', height: '280px' }}>
                  <div style={{
                    height: '100%',
                    background: 'linear-gradient(160deg, #1a1510 0%, #110e0b 100%)',
                    border: '1px dashed rgba(232, 154, 62, 0.45)',
                    borderRadius: '5px',
                    padding: '1.1rem 0.9rem',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    position: 'relative', overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
                  }}>
                    {/* Ticket punch holes */}
                    <div style={{ position: 'absolute', left: '-8px', top: '40%', width: '16px', height: '16px', background: 'var(--bg-base,#0a0807)', borderRadius: '50%' }}></div>
                    <div style={{ position: 'absolute', right: '-8px', top: '40%', width: '16px', height: '16px', background: 'var(--bg-base,#0a0807)', borderRadius: '50%' }}></div>
                    <div style={{ fontSize: '1.3rem', lineHeight: 1 }}>🎬</div>
                    <div>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '1.25rem', fontWeight: 700,
                        color: 'var(--amber-light,#e8a85a)',
                        lineHeight: 1.2, marginBottom: '0.35rem'
                      }}>A Separation</div>
                      <div style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: '0.55rem', textTransform: 'uppercase',
                        letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)'
                      }}>Dir. Asghar Farhadi</div>
                    </div>
                    <div style={{
                      borderTop: '1px solid rgba(255,255,255,0.07)',
                      paddingTop: '0.5rem',
                      fontFamily: "'Jost', sans-serif",
                      fontSize: '0.52rem', letterSpacing: '0.1em',
                      textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)'
                    }}>Golden Globe Winner</div>
                  </div>
                </Link>
                <div style={{ textAlign: 'center', fontSize: '0.6rem', letterSpacing: '0.12em', opacity: 0.5, textTransform: 'uppercase', fontFamily: "'Jost', sans-serif" }}>
                  🎥 The Film
                </div>
              </div>
            </div>

            {/* ── Speaker Row ── */}
            <Link href="/expeditions/iran" style={{
              display: 'flex', alignItems: 'center', gap: '0.9rem',
              background: 'rgba(255,250,240,0.02)', border: '1px solid rgba(255,255,255,0.07)',
              padding: '0.9rem 1rem', borderRadius: '5px', textDecoration: 'none'
            }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #c9a052 0%, #2a5a40 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 700,
                fontSize: '1.1rem', color: '#1a1209',
                border: '2px solid rgba(201,160,82,0.35)'
              }}>Mo</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', fontWeight: 600, color: '#e8dfc8' }}>Guest Speaker: Mr. Mo</div>
                <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic', marginTop: '0.1rem' }}>Broadcasting live from Tehran, Iran</div>
              </div>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', color: 'var(--amber-light,#e8a85a)', whiteSpace: 'nowrap' }}>👤 The Friend &rarr;</span>
            </Link>

          </div>
        </div>
      </section>

      {/* SESSION BANNER */}
      <section id="session">
        <div>
          <div className="session-label">WOW Launch Meeting</div>
          <div className="session-time">Sunday, June 28 · 6:00 PM IST</div>
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
        <div className="stat">
          <span className="stat-num">10+</span>
          <span className="stat-label">Active Explorers</span>
        </div>
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
