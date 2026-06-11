"use client";
import { useEffect } from 'react';
import Link from 'next/link';
import VisaBox from '../../../components/VisaBox';

export default function IranExpedition() {
  useEffect(() => {
    document.body.classList.add('theme-iran');
    return () => {
      document.body.classList.remove('theme-iran');
    };
  }, []);

  return (
    <main>
      {/* Decorative Persian Geometric Background Grid */}
      <div className="iran-geometric-bg"></div>

      {/* HEADER */}
      <div className="iran-header reveal">
        <svg width="80" height="80" viewBox="0 0 100 100" style={{ margin: '0 auto 1rem', color: 'var(--amber-light)' }} fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M50 5 L55 45 L95 50 L55 55 L50 95 L45 55 L5 50 L45 45 Z" />
          <circle cx="50" cy="50" r="20" strokeDasharray="4 4" />
        </svg>
        <div className="section-eyebrow" style={{ color: 'var(--amber)', display: 'inline-flex', animation: 'pulse 2s infinite' }}>Expedition #01</div>
        <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', background: 'linear-gradient(135deg, var(--cream), var(--amber-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Explore Iran 🇮🇷</h1>
        <p className="section-desc" style={{ maxWidth: '600px', margin: '0.8rem auto 0', color: 'var(--parchment)' }}>
          Embark on a two-month immersion into the heart of Persia. Through Shahrnush Parsipur's magic realist prose and Asghar Farhadi's intense realist cinema, we discover the beauty, contradictions, and spirit of modern Iranian society.
        </p>
      </div>

      {/* CONTENT GRID */}
      <div className="iran-grid">
        {/* Left Column: The Material (Book & Film) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          {/* The Book Section */}
          <div className="reveal reveal-left">
            <h2 className="iran-section-title"><span>📖</span> The Literature focus</h2>
            <div className="iran-tiles" style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '2rem', alignItems: 'start' }}>
              
              {/* 3D Book Showcase */}
              <div className="book-showcase">
                <div className="book-cover" style={{ width: '170px', height: '250px', background: 'linear-gradient(135deg, #1c3f60 0%, #0d1e30 50%, #070f17 100%), repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.02) 10px, rgba(255,255,255,0.02) 20px)' }}>
                  <div className="book-cover-spine" style={{ background: 'linear-gradient(to right, #0d1e30, #1c3f60)', width: '18px', borderRight: '1px solid rgba(255,255,255,0.1)' }}></div>
                  <div style={{ position: 'absolute', right: '-4px', top: '2px', bottom: '2px', width: '4px', background: '#e2d7c0', borderRadius: '0 2px 2px 0', borderLeft: '1px solid rgba(0,0,0,0.2)', boxShadow: 'inset -1px 0 2px rgba(0,0,0,0.1)' }}></div>
                  <div className="book-cover-art" style={{ padding: '1.2rem 1.2rem 1.2rem 1.8rem' }}>
                    <div className="book-cover-flag" style={{ fontSize: '2.2rem' }}>🇮🇷</div>
                    <div>
                      <div className="book-cover-title" style={{ fontSize: '0.85rem', color: 'var(--cream)' }}>Touba and the Meaning of Night</div>
                      <div className="book-cover-author" style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.6)' }}>Shahrnush Parsipur</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Book details */}
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', color: 'var(--cream)', lineHeight: 1.2, marginBottom: '0.2rem' }}>Touba and the Meaning of Night</h3>
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '1rem' }}>
                  Novel · 1989 · 368 Pages
                </div>
                <p style={{ fontSize: '0.82rem', lineHeight: 1.8, opacity: 0.75, marginBottom: '1.2rem' }}>
                  Weaving history and magical realism, the novel follows Touba over eighty years as she seeks spiritual independence in a male-dominated Tehran. From the Qajar dynasty to the 1979 Revolution, her household becomes a sanctuary for political dissenters, mystics, and outcasts.
                </p>
                <div style={{ background: 'rgba(60, 174, 163, 0.08)', borderLeft: '2px solid var(--teal-light)', padding: '0.8rem 1rem', fontStyle: 'italic', fontSize: '0.8rem', color: 'var(--cream)' }}>
                  "Parsipur presents a courageous critique of class divisions, religious authority, and patriarchy in 20th-century Iran, using Touba's household as a mirror for a changing nation."
                </div>
              </div>
            </div>
          </div>

          {/* The Film Section */}
          <div className="reveal reveal-left">
            <h2 className="iran-section-title"><span>🎬</span> The Cinema focus</h2>
            <div className="iran-tiles" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
              <div className="film-ticket-card" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', cursor: 'default' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '10px', backgroundImage: 'radial-gradient(circle, var(--ink) 4px, transparent 5px)', backgroundSize: '15px 15px', backgroundPosition: 'center top' }}></div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '10px', backgroundImage: 'radial-gradient(circle, var(--ink) 4px, transparent 5px)', backgroundSize: '15px 15px', backgroundPosition: 'center bottom' }}></div>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-30deg)', fontSize: '4rem', fontWeight: 800, color: 'rgba(255,255,255,0.03)', whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none' }}>ADMIT ONE</div>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: 'var(--cream)', lineHeight: 1.2, marginBottom: '0.2rem' }}>A Separation</h3>
                  <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '1.2rem' }}>
                    Drama/Mystery · Directed by Asghar Farhadi · 2011
                  </div>
                  <p style={{ fontSize: '0.82rem', lineHeight: 1.8, opacity: 0.75, marginBottom: '1rem' }}>
                    A middle-class couple separates when the wife wants to leave Iran to secure better opportunities for their daughter, while the husband must stay in Tehran to care for his father suffering from Alzheimer's. A chain of events spiraling out of control reveals the deep fissures of class, religion, and gender in modern Iran.
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderLeft: '1px dashed rgba(232, 154, 62, 0.2)', paddingLeft: '1.5rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 300, color: 'var(--amber-light)', lineHeight: 1 }}>99%</div>
                  <div style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '1rem' }}>Rotten Tomatoes</div>
                  
                  <div style={{ fontSize: '0.65rem', border: '1px solid var(--amber)', padding: '0.3rem 0.6rem', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}>
                    Oscar Winner
                  </div>
                  <div style={{ fontSize: '0.55rem', opacity: 0.4, marginTop: '0.3rem' }}>Best Foreign Language Film</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: The Connection (Speaker, Timeline, Stamping) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          {/* The Friend Section */}
          <div className="reveal reveal-right">
            <h2 className="iran-section-title"><span>👤</span> The Friend (Guest Speaker)</h2>
            <div className="iran-tiles" style={{ textAlign: 'center' }}>
              {/* Stylized CSS Calligraphy/Stamp Portrait */}
              <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 1.5rem' }}>
                <div style={{ position: 'absolute', inset: '-8px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--amber) 0%, var(--teal) 100%)', opacity: 0.3, filter: 'blur(10px)', animation: 'spin 8s linear infinite' }}></div>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'linear-gradient(135deg, var(--amber) 0%, var(--teal) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: '2.8rem', color: 'var(--ink)', border: '3px solid var(--cream)', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', position: 'relative', zIndex: 2 }}>
                  Mo
                </div>
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: 'var(--cream)', marginBottom: '0.2rem' }}>Mr. Mo</h3>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--teal-light)', marginBottom: '1rem' }}>
                Tehran, Iran · Cultural Ambassador
              </div>
              <p style={{ position: 'relative', fontSize: '0.8rem', lineHeight: 1.7, opacity: 0.8, maxWidth: '320px', margin: '0 auto 1.5rem', fontStyle: 'italic' }}>
                <span style={{ position: 'absolute', top: '-15px', left: '-15px', fontSize: '3rem', color: 'var(--amber)', opacity: 0.3, fontFamily: 'serif' }}>"</span>
                These two stories capture the two dimensions of Iran: the deep historical, spiritual roots of our past (Touba), and the complex, raw dilemmas of our modern urban life (A Separation). I look forward to introducing you to Tehran next week.
                <span style={{ position: 'absolute', bottom: '-30px', right: '-10px', fontSize: '3rem', color: 'var(--amber)', opacity: 0.3, fontFamily: 'serif' }}>"</span>
              </p>
              <Link className="btn-primary" href="/join" style={{ width: '100%', justifyContent: 'center' }}>
                Step into the meeting
              </Link>
            </div>
          </div>

          {/* Timeline & Schedule */}
          <div className="reveal reveal-right">
            <h2 className="iran-section-title"><span>📅</span> Expedition Timetable</h2>
            <div className="iran-tiles" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'start', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '1rem' }}>
                <div style={{ background: 'var(--amber)', color: 'var(--ink)', fontWeight: 600, fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '2px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: "'Jost', sans-serif" }}>
                  Jun 6
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--cream)' }}>Meeting 1: Launch & Intro</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '0.1rem' }}>Saturday · 8:00 PM IST · Google Meet</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '0.4rem' }}>Mr. Mo will introduce the country, historical backdrop, and open up our reading and film focus.</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                <div style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--parchment)', fontWeight: 600, fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '2px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: "'Jost', sans-serif" }}>
                  Jul 4
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--cream)' }}>Meeting 2: Discussion & Q&A</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '0.1rem' }}>Saturday · 8:00 PM IST · Google Meet</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '0.4rem' }}>Group discussion on the themes of the book and film, accompanied by a live Q&A panel with Mr. Mo.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Passport Stamping (Visa Box) */}
          <div className="reveal reveal-right">
            <h2 className="iran-section-title"><span>🛂</span> Visa Office</h2>
            <div className="iran-tiles" style={{ padding: '1.5rem' }}>
              <VisaBox />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
