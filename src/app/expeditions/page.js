"use client";
import { useState } from 'react';
import Link from 'next/link';

// 2026 Calendar data — Iran spans June & July; rest TBD
const CALENDAR_2026 = [
  { month: 'Jun', country: 'Iran', flagSrc: 'https://flagcdn.com/w80/ir.png', status: 'active' },
  { month: 'Jul', country: 'Iran', flagSrc: 'https://flagcdn.com/w80/ir.png', status: 'active' },
  { month: 'Aug', country: null, status: 'tbd' },
  { month: 'Sep', country: null, status: 'tbd' },
  { month: 'Oct', country: null, status: 'tbd' },
  { month: 'Nov', country: null, status: 'tbd' },
  { month: 'Dec', country: null, status: 'tbd' },
];

const IRAN = {
  title: 'Touba and the Meaning of Night',
  author: 'Shahrnush Parsipur',
  country: 'Iran',
  flagSrc: 'https://flagcdn.com/w40/ir.png',
  month: 'June – July 2026',
  film: 'A Separation',
  filmDirector: 'Asghar Farhadi',
  speaker: 'Mr. Mo',
  speakerLocation: 'Tehran, Iran',
  desc: 'An epic portrait of modern Iran tracing the life of Touba, a woman navigating a rapidly changing society through political turmoil, religious exploration, and the quest for independence over eighty years.',
  why: 'We chose this masterwork because it interweaves the personal resilience of a female protagonist with the historical forces that shaped modern Iran, offering a deep cultural and spiritual perspective.',
};

const EXP_TABS = [
  { id: 'current',   label: 'Current Expedition' },
  { id: 'completed', label: 'Completed' },
  { id: 'upcoming',  label: 'Upcoming' },
];

export default function ExpeditionsPage() {
  const [expTab, setExpTab] = useState('current');
  const [modal, setModal] = useState(false);

  return (
    <main>
      {/* PAGE HERO */}
      <div className="section-header page-hero">
        <div className="section-eyebrow">The WOW Archive</div>
        <h1 className="section-title">Our Reading Journey</h1>
        <p className="section-desc">
          Every two months, one country. One book. One film. One friend.<br />
          Here is our complete expedition record.
        </p>
      </div>

      {/* 2026 EXPEDITION CALENDAR */}
      <section className="exp-calendar-section">
        <div className="exp-cal-label-header">
          <h2 className="exp-cal-label-title">2026 Expedition Calendar</h2>
          <p className="exp-section-desc">Our cultural journey through the year — two months per country.</p>
        </div>

        <div className="exp-calendar-grid">
          {CALENDAR_2026.map((slot, i) => (
            <div key={i} className={`exp-cal-slot ${slot.status}`}>
              <div className="exp-cal-month">{slot.month}</div>
              {slot.status === 'active' ? (
                <>
                  <div className="exp-cal-flag">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={slot.flagSrc} alt={slot.country} width="40" height="28" style={{ borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.3)', objectFit: 'cover' }} />
                  </div>
                  <div className="exp-cal-country">{slot.country}</div>
                  <div className="exp-cal-badge">Active</div>
                </>
              ) : (
                <>
                  <div className="exp-cal-tbd-icon">✦</div>
                  <div className="exp-cal-tbd-text">Will be decided</div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* TABBED EXPEDITIONS BLOCK */}
      <section className="exp-section">
        {/* Tab headers */}
        <div className="exp-tab-bar">
          {EXP_TABS.map(t => (
            <button
              key={t.id}
              className={`exp-tab-btn ${expTab === t.id ? 'active' : ''}`}
              onClick={() => setExpTab(t.id)}
            >
              {t.label}
              {t.id === 'current' && <span className="exp-tab-dot"></span>}
            </button>
          ))}
        </div>

        {/* ── CURRENT EXPEDITION ── */}
        {expTab === 'current' && (
          <div className="exp-tab-panel">
            <div className="exp-current-card" onClick={() => setModal(true)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setModal(true)}>
              <div className="exp-current-badge">
                <span className="pulse-dot"></span> Active Expedition
              </div>
              <div className="exp-current-inner">
                {/* 3D Book Cover */}
                <div className="exp-book-cover-wrap">
                  <div className="exp-book-cover">
                    <div className="exp-book-spine"></div>
                    <div className="exp-book-art">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={IRAN.flagSrc} alt="Iran" className="exp-book-flag-img" />
                      <div className="exp-book-text">
                        <div className="exp-book-title">{IRAN.title}</div>
                        <div className="exp-book-author">{IRAN.author}</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Details */}
                <div className="exp-current-details">
                  <div className="exp-current-country">🇮🇷 Iran</div>
                  <h3 className="exp-current-title">{IRAN.title}</h3>
                  <p className="exp-current-author">by {IRAN.author}</p>
                  <div className="exp-current-meta-row">
                    <span className="exp-meta-pill">📅 {IRAN.month}</span>
                    <span className="exp-meta-pill">🎬 {IRAN.film}</span>
                  </div>
                  <div className="exp-current-speaker">
                    <div className="exp-speaker-avatar">Mo</div>
                    <div>
                      <div className="exp-speaker-name">Guest Speaker · {IRAN.speaker}</div>
                      <div className="exp-speaker-loc">Broadcasting from {IRAN.speakerLocation}</div>
                    </div>
                  </div>
                  <Link href="/expeditions/iran" className="exp-current-cta" onClick={e => e.stopPropagation()}>
                    Open Full Expedition →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── COMPLETED ── */}
        {expTab === 'completed' && (
          <div className="exp-tab-panel">
            <div className="exp-empty-state">
              <div className="exp-empty-icon">🗺️</div>
              <p className="exp-empty-title">No completed expeditions yet</p>
              <p className="exp-empty-desc">
                We are currently on our very first journey — Iran 🇮🇷. Our completed expedition archive will fill up here after each cycle concludes.
              </p>
            </div>
          </div>
        )}

        {/* ── UPCOMING ── */}
        {expTab === 'upcoming' && (
          <div className="exp-tab-panel">
            <div className="exp-empty-state">
              <div className="exp-empty-icon">🧭</div>
              <p className="exp-empty-title">Future destinations being charted</p>
              <p className="exp-empty-desc">
                Our next country will be voted on and announced at the end of the Iran cycle. Every explorer gets a say in where we travel next.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* IRAN BOOK MODAL */}
      {modal && (
        <div className="modal-overlay open" id="modal-overlay" onClick={e => { if (e.target.id === 'modal-overlay') setModal(false); }}>
          <div className="modal" id="modal-content">
            <div className="modal-header">
              <div className="modal-flag">🇮🇷</div>
              <div>
                <div className="modal-country-label">Iran</div>
                <div className="modal-title">{IRAN.title}</div>
                <div className="modal-author">{IRAN.author}</div>
              </div>
              <button className="modal-close" onClick={() => setModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="modal-section-title">About the Book</div>
              <div className="modal-text">{IRAN.desc}</div>
              <div className="modal-why">
                <div className="modal-why-title">Why This Book?</div>
                <div className="modal-why-text">{IRAN.why}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
