import Link from 'next/link';
import dynamic from 'next/dynamic';
import Countdown from '../components/Countdown';

// MapComponent uses browser APIs, so it should only run on the client
const MapComponent = dynamic(() => import('../components/MapComponent'), { ssr: false });

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section id="hero">
        <div className="hero-left">
          <div className="hero-eyebrow">Active Expedition · Iran 🇮🇷</div>
          <h1 className="hero-title">Wide Open World.<br /><em>Global Book & Film Club.</em></h1>
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

        {/* Active Expedition Split Cards */}
        <div className="hero-book-side reveal reveal-right">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '440px' }}>
            <div style={{ textAlign: 'center', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--amber)' }}>
              Featured in this Expedition
            </div>
            <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(200, 130, 58, 0.3), transparent)', margin: '0.5rem 0' }}></div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {/* Book Showcase */}
              <div className="book-showcase" style={{ perspective: '1000px', width: '100%' }}>
                <Link href="/expeditions/iran" style={{ display: 'block', width: '100%', maxWidth: '180px' }}>
                  <div className="book-cover" style={{ width: '100%', height: '260px', background: 'linear-gradient(135deg, #1c3f60 0%, #0d1e30 50%, #070f17 100%)', borderRadius: '2px 4px 4px 2px' }}>
                    <div className="book-cover-spine" style={{ background: 'linear-gradient(to right, #0d1e30, #1c3f60)', width: '16px' }}></div>
                    <div className="book-cover-art" style={{ padding: '1rem 1rem 1rem 1.8rem' }}>
                      <div className="book-cover-flag" style={{ fontSize: '1.8rem' }}>🇮🇷</div>
                      <div>
                        <div className="book-cover-title" style={{ fontSize: '0.95rem', color: '#fff' }}>Touba & the Meaning of Night</div>
                        <div className="book-cover-author" style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.6)' }}>S. Parsipur</div>
                      </div>
                    </div>
                  </div>
                </Link>
                <div style={{ marginTop: '0.5rem', textAlign: 'center', fontSize: '0.65rem', letterSpacing: '0.1em', opacity: 0.6, textTransform: 'uppercase' }}>
                  📖 The Book
                </div>
              </div>

              {/* Movie Ticket Showcase */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <Link href="/expeditions/iran" style={{ display: 'block', height: '100%' }}>
                  <div className="film-ticket-card" style={{ height: '260px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.2rem', borderColor: 'rgba(232, 154, 62, 0.4)' }}>
                    <div style={{ fontSize: '1.5rem', lineHeight: 1 }}>🎬</div>
                    <div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 700, color: 'var(--amber-light)', lineHeight: 1.2, marginBottom: '0.2rem' }}>A Separation</div>
                      <div style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.5 }}>Dir. Asghar Farhadi</div>
                    </div>
                    <div style={{ fontSize: '0.55rem', opacity: 0.4, letterSpacing: '0.1em', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.4rem', textTransform: 'uppercase' }}>
                      Golden Globe Winner
                    </div>
                  </div>
                </Link>
                <div style={{ marginTop: '0.5rem', textAlign: 'center', fontSize: '0.65rem', letterSpacing: '0.1em', opacity: 0.6, textTransform: 'uppercase' }}>
                  🎥 The Film
                </div>
              </div>
            </div>

            {/* Speaker Spotlight */}
            <Link href="/expeditions/iran" style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,250,240,0.02)', border: '1px solid var(--divider)', padding: '1rem', borderRadius: '4px', cursor: 'pointer', textDecoration: 'none' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--amber) 0%, var(--teal) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: '1.2rem', color: 'var(--ink)', border: '2px solid var(--cream)', marginRight: '1rem', flexShrink: 0 }}>
                Mo
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--cream)' }}>Guest Speaker: Mr. Mo</div>
                <div style={{ fontSize: '0.65rem', opacity: 0.5, fontStyle: 'italic', color: 'var(--foreground)' }}>Broadcasting live from Tehran, Iran</div>
              </div>
              <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--amber-light)' }}>👤 The Friend &rarr;</span>
            </Link>

          </div>
        </div>
      </section>

      {/* SESSION BANNER */}
      <section id="session">
        <div>
          <div className="session-label">WOW Launch Meeting</div>
          <div className="session-time">Saturday, June 6 · 8:00 PM IST</div>
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
      <div className="section-divider"></div>
      <div className="stats-bar reveal">
        <div className="stat"><span className="stat-num">00</span><span className="stat-label">Expeditions Completed</span></div>
        <div className="stat"><span className="stat-num">01</span><span className="stat-label">Active Journey</span></div>
        <div className="stat"><span className="stat-num">24+</span><span className="stat-label">Active Explorers</span></div>
        <div className="stat"><span className="stat-num">190+</span><span className="stat-label">Countries Visitable</span></div>
      </div>

      {/* HOW IT WORKS */}
      <section className="map-section reveal" style={{ borderBottom: '1px solid var(--divider)', background: 'rgba(255,250,240,0.015)' }}>
        <div className="page-hero" style={{ marginBottom: '4rem' }}>
          <div className="section-eyebrow">The WOW Concept</div>
          <h2 className="section-title">A Journey in Two-Month Cycles</h2>
          <p className="section-desc">We deep dive into one cultural landscape at a time. Here is how our expedition flows:</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', maxWidth: '900px', margin: '0 auto', paddingBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '4rem', lineHeight: 1, fontWeight: 300, color: 'var(--amber-light)', opacity: 0.6 }}>01</div>
            <div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--cream)', marginBottom: '0.5rem' }}>Month 1: The Cultural Introduction</h3>
              <p style={{ fontSize: '0.82rem', lineHeight: 1.8, opacity: 0.6 }}>We gather on Google Meet for our launch. A native guest speaker (our <em>Friend</em>) introduces the country's social context and explains why they nominated the chosen book and movie. We spend the month reading and watching.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '4rem', lineHeight: 1, fontWeight: 300, color: 'var(--teal-light)', opacity: 0.6 }}>02</div>
            <div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--cream)', marginBottom: '0.5rem' }}>Month 2: The Reflections & Discussion</h3>
              <p style={{ fontSize: '0.82rem', lineHeight: 1.8, opacity: 0.6 }}>We meet a second time to dissect the book's themes, share our reactions to the movie, and discuss what we learned about the country. The session features a live Q&A panel with our speaker to bridge understanding.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WORLD MAP */}
      <section className="map-section reveal">
        <div className="page-hero">
          <div className="section-eyebrow">Explore the WOW Expedition Map</div>
          <h2 className="section-title">Our Active Destinations</h2>
          <p className="section-desc">Click glowing markers to embark on country expeditions. Iran is our active expedition gateway, with future countries waiting to be discovered.</p>
        </div>

        <MapComponent />

        <div className="map-legend">
          <div className="map-legend-item"><span className="legend-dot" style={{ background: '#e8a85a', boxShadow: '0 0 8px #e8a85a' }}></span> Active Expedition</div>
          <div className="map-legend-item"><span className="legend-dot" style={{ background: 'rgba(255,255,255,0.2)' }}></span> Future Expeditions</div>
        </div>
      </section>
    </main>
  );
}
