"use client";
import { useEffect } from 'react';
import Link from 'next/link';
import MeetingTime from '../../../components/MeetingTime';

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
      <div className="iran-header reveal" style={{ marginBottom: '1.5rem', textAlign: 'center', paddingTop: '7rem' }}>
        {/* Expedition Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(232, 154, 62, 0.1)', border: '1px solid rgba(232, 154, 62, 0.35)', borderRadius: '999px', padding: '0.35rem 1rem', marginBottom: '1.2rem' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber)', display: 'inline-block', animation: 'pulse 2s infinite', flexShrink: 0 }}></span>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--amber)', fontWeight: 600 }}>Expedition No. 01</span>
        </div>
        <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', background: 'linear-gradient(135deg, var(--cream), var(--amber-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          Explore Iran
          <img src="https://flagcdn.com/w40/ir.png" alt="Iran flag" style={{ width: '44px', height: 'auto', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.4)', display: 'inline-block', flexShrink: 0 }} />
        </h1>
        <p className="section-desc" style={{ maxWidth: '600px', margin: '0.8rem auto 0', color: 'var(--parchment)' }}>
          Embark on a two-month immersion into the heart of Persia. Through Shahrnush Parsipur's magic realist prose and Asghar Farhadi's intense realist cinema, we discover the beauty, contradictions, and spirit of modern Iranian society.
        </p>
      </div>

      {/* BENTO GRID */}
      <div className="bento-grid">
        
        {/* Card 1: Hero Photo Showcase */}
        <div className="bento-card bento-col-2" style={{ padding: 0, minHeight: '360px' }}>
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <img
              src="/iran_hero.png"
              alt="Nasir al-Mulk Mosque in Shiraz, Iran"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
              className="hero-image-hover"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7, 14, 23, 0.95) 0%, rgba(7, 14, 23, 0.3) 60%, transparent 100%)' }}></div>
          </div>
          <div style={{ position: 'relative', zIndex: 10, padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--amber)', fontWeight: 600 }}>Cultural Showcase</span>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: 'var(--cream)', lineHeight: 1.2, margin: 0 }}>Nasir al-Mulk Mosque</h3>
            <p style={{ fontSize: '0.82rem', opacity: 0.8, margin: 0, maxWidth: '500px', lineHeight: 1.5 }}>
              Known as the Pink Mosque, this 19th-century masterpiece in Shiraz, Iran, is famous for its colorful stained glass windows that transform the interior into a kaleidoscope of light.
            </p>
            <div style={{ fontSize: '0.65rem', opacity: 0.5, fontStyle: 'italic', marginTop: '0.3rem' }}>
              Photo Credit: Wide Open World Travel Archive (Shiraz, Iran)
            </div>
          </div>
        </div>

        {/* Card 2: The Friend / Guest Speaker */}
        <div className="bento-card" style={{ justifyContent: 'space-between', minHeight: '360px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', alignItems: 'center', textAlign: 'center' }}>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--teal-light)', alignSelf: 'center' }}>The Friend</span>
            <div style={{ position: 'relative', width: '90px', height: '90px' }}>
              <div style={{ position: 'absolute', inset: '-6px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--amber) 0%, var(--teal) 100%)', opacity: 0.3, filter: 'blur(8px)', animation: 'spin 8s linear infinite' }}></div>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'linear-gradient(135deg, var(--amber) 0%, var(--teal) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: '2.5rem', color: 'var(--ink)', border: '2.5px solid var(--cream)', boxShadow: '0 8px 20px rgba(0,0,0,0.5)', position: 'relative', zIndex: 2 }}>
                SK
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: 'var(--cream)', margin: '0 0 0.15rem' }}>Shafagh Kazemi</h3>
              <div style={{ fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--teal-light)' }}>
                Iran
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', lineHeight: 1.6, opacity: 0.8, fontStyle: 'italic', margin: 0, padding: '0 0.5rem' }}>
              "These two stories capture the two dimensions of Iran: the deep historical, spiritual roots of our past (Touba), and the complex, raw dilemmas of our modern urban life (A Separation)."
            </p>
          </div>
          <Link className="btn-primary" href="/join" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
            Step into the meeting
          </Link>
        </div>

        {/* Card 3: The Book / Literature Focus */}
        <div className="bento-card bento-col-2">
          <div>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--teal-light)', display: 'block', marginBottom: '1.5rem' }}>The Literature Focus</span>
            <div className="literature-focus-grid">
              {/* 3D Book Showcase */}
              <div className="book-showcase" style={{ margin: '0.5rem 0' }}>
                <div className="book-cover" style={{ width: '140px', height: '210px', background: 'linear-gradient(135deg, #1c3f60 0%, #0d1e30 50%, #070f17 100%)' }}>
                  <div className="book-cover-spine" style={{ background: 'linear-gradient(to right, #0d1e30, #1c3f60)', width: '15px', borderRight: '1px solid rgba(255,255,255,0.1)' }}></div>
                  <div style={{ position: 'absolute', right: '-4px', top: '2px', bottom: '2px', width: '4px', background: '#e2d7c0', borderRadius: '0 2px 2px 0', borderLeft: '1px solid rgba(0,0,0,0.2)', boxShadow: 'inset -1px 0 2px rgba(0,0,0,0.1)' }}></div>
                  <div className="book-cover-art" style={{ padding: '1rem 1rem 1rem 1.4rem' }}>
                    <div className="book-cover-flag" style={{ fontSize: '1.8rem' }}>🇮🇷</div>
                    <div>
                      <div className="book-cover-title" style={{ fontSize: '0.75rem', color: 'var(--cream)', lineHeight: 1.2 }}>Touba and the Meaning of Night</div>
                      <div className="book-cover-author" style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.2rem' }}>Shahrnush Parsipur</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Book Details */}
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', color: 'var(--cream)', lineHeight: 1.2, margin: '0 0 0.2rem' }}>Touba and the Meaning of Night</h3>
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '0.8rem' }}>
                  Novel · 1989 · 368 Pages
                </div>
                <p style={{ fontSize: '0.8rem', lineHeight: 1.7, opacity: 0.75, margin: '0 0 1rem' }}>
                  Weaving history and magical realism, the novel follows Touba over eighty years as she seeks spiritual independence in a male-dominated Tehran. From the Qajar dynasty to the 1979 Revolution, her household becomes a sanctuary for political dissenters, mystics, and outcasts.
                </p>
                <div style={{ background: 'rgba(60, 174, 163, 0.08)', borderLeft: '2px solid var(--teal-light)', padding: '0.8rem 1rem', fontStyle: 'italic', fontSize: '0.75rem', color: 'var(--cream)' }}>
                  "Parsipur presents a courageous critique of class divisions, religious authority, and patriarchy in 20th-century Iran, using Touba's household as a mirror for a changing nation."
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: The Film / Cinema Focus */}
        <div className="bento-card" style={{ justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--amber)', display: 'block', marginBottom: '0.75rem' }}>The Cinema Focus</span>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', color: 'var(--cream)', lineHeight: 1.2, margin: '0 0 0.15rem' }}>A Separation</h3>
            <div style={{ fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--teal-light)', marginBottom: '0.8rem' }}>
              Directed by Asghar Farhadi · 2011
            </div>
            <p style={{ fontSize: '0.78rem', lineHeight: 1.6, opacity: 0.75, margin: 0 }}>
              A middle-class couple separates when the wife wants to leave Iran to secure better opportunities for their daughter, while the husband must stay in Tehran to care for his father suffering from Alzheimer's.
            </p>
          </div>
          
          <div style={{ borderTop: '1px dashed rgba(232, 154, 62, 0.2)', paddingTop: '1.25rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', border: '1px solid var(--amber)', padding: '0.35rem 0.8rem', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, borderRadius: '2px', display: 'inline-block' }}>
              Oscar Winner
            </div>
            <div style={{ fontSize: '0.62rem', opacity: 0.5, marginTop: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Best Foreign Language Film
            </div>
          </div>
        </div>

        {/* Card 5: Expedition Timetable */}
        <div className="bento-card bento-col-3">
          <div>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--teal-light)', display: 'block', marginBottom: '1.2rem' }}>Expedition Timetable</span>
            <div className="timetable-grid">
              
              <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'start' }}>
                <div style={{ background: 'var(--amber)', color: 'var(--ink)', fontWeight: 700, fontSize: '0.75rem', padding: '0.3rem 0.6rem', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: "'Jost', sans-serif", flexShrink: 0 }}>
                  Jul 5
                </div>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--cream)', margin: '0 0 0.15rem' }}>Meeting 1: Launch & Intro</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '0.4rem' }}><MeetingTime /> · Google Meet</div>
                  <p style={{ fontSize: '0.78rem', opacity: 0.7, lineHeight: 1.6, margin: 0 }}>
                    Shafagh Kazemi will introduce the country, historical backdrop, and open up our reading and film focus.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'start' }}>
                <div style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--parchment)', fontWeight: 700, fontSize: '0.75rem', padding: '0.3rem 0.6rem', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: "'Jost', sans-serif", flexShrink: 0 }}>
                  Aug 30
                </div>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--cream)', margin: '0 0 0.15rem' }}>Meeting 2: Discussion & Q&A</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '0.4rem' }}><MeetingTime utcString="2026-08-30T12:00:00Z" /> · Google Meet</div>
                  <p style={{ fontSize: '0.78rem', opacity: 0.7, lineHeight: 1.6, margin: 0 }}>
                    Group discussion on the themes of the book and film, accompanied by a live Q&A panel with Shafagh Kazemi.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
