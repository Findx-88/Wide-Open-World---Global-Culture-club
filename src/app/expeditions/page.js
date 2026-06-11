"use client";
import { useState, useRef, useEffect } from 'react';
import { FEATURED_BOOKS, ALL_DISCOVERABLE_BOOKS, flagUrl, getBookMetadata } from '../../data/books-data';

export default function ExpeditionsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedBook, setSelectedBook] = useState(null);
  
  const [rndGenre, setRndGenre] = useState('all');
  const [rndPages, setRndPages] = useState('all');
  const [spinState, setSpinState] = useState({
    isVisible: false,
    isSpinning: false,
    result: null,
    tempResult: null
  });
  const lastPickedRef = useRef(null);
  const resultRef = useRef(null);

  const tabs = [
    { id: 'all', label: 'All Books' },
    { id: 'reading', label: 'Currently Reading' },
    { id: 'completed', label: 'Completed' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'community', label: 'Community Picks' }
  ];

  const statusLabel = {
    'reading': 'Active Expedition',
    'completed': 'Archived',
    'upcoming': 'Future Journey',
    'community': 'Community Pick'
  };

  const getFilteredBooks = () => {
    if (activeTab === 'all') return FEATURED_BOOKS;
    return FEATURED_BOOKS.filter(b => b.status === activeTab);
  };

  const openModal = (title, author, country, code) => {
    const meta = getBookMetadata(title);
    setSelectedBook({ title, author, country, code, meta });
  };

  const closeModal = () => setSelectedBook(null);

  const closeModalOutside = (e) => {
    if (e.target.id === 'modal-overlay') closeModal();
  };

  useEffect(() => {
    if (selectedBook) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedBook]);

  const spinRandom = () => {
    let pool = ALL_DISCOVERABLE_BOOKS.filter(b => {
      if (rndGenre !== 'all' && b.genre !== rndGenre) return false;
      if (rndPages !== 'all') {
        const [min, max] = rndPages.split('-').map(Number);
        if (b.pages < min || b.pages > max) return false;
      }
      return true;
    });

    if (pool.length > 1 && lastPickedRef.current) {
      pool = pool.filter(b => b.title !== lastPickedRef.current.title);
    }

    if (pool.length === 0) {
      setSpinState(prev => ({ ...prev, isVisible: false }));
      alert('No books match your filters. Try broadening your selection!');
      return;
    }

    setSpinState({ isVisible: false, isSpinning: true, result: null, tempResult: null });

    setTimeout(() => {
      setSpinState(prev => ({ ...prev, isVisible: true }));
      if (resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      let shuffles = 0;
      const shuffleInterval = setInterval(() => {
        const shufflePick = pool[Math.floor(Math.random() * pool.length)];
        
        setSpinState(prev => ({
          ...prev,
          tempResult: {
            title: shufflePick.title,
            country: shufflePick.country,
            author: '...',
            desc: 'Finding your next adventure...',
            flag: '🌍',
            genre: '',
            pages: ''
          }
        }));

        shuffles++;
        if (shuffles > 15) {
          clearInterval(shuffleInterval);
          const pick = pool[Math.floor(Math.random() * pool.length)];
          lastPickedRef.current = pick;
          
          setSpinState({
            isVisible: true,
            isSpinning: false,
            tempResult: null,
            result: {
              ...pick,
              authorText: pick.author + (pick.year ? ', ' + pick.year : ''),
              descText: pick.desc || 'Explore the rich literary heritage of ' + pick.country + ' through this captivating work.',
              genreText: '· ' + pick.genre,
              pagesText: '· ' + pick.pages + ' pages'
            }
          });
        }
      }, 40);
    }, 100);
  };

  return (
    <main>
      <div className="section-header page-hero">
        <div className="section-eyebrow">The Archive</div>
        <h1 className="section-title">Our Reading Journey</h1>
        <p className="section-desc">
          Every book is a country. Every country is a conversation. Browse our complete reading list, past and future.
        </p>
      </div>

      <div className="stats-bar">
        <div className="stat"><span className="stat-num">00</span><span className="stat-label">Expeditions Completed</span></div>
        <div className="stat"><span className="stat-num">01</span><span className="stat-label">Active Journey</span></div>
        <div className="stat"><span className="stat-num">24+</span><span className="stat-label">Active Explorers</span></div>
        <div className="stat"><span className="stat-num">190+</span><span className="stat-label">Countries Visitable</span></div>
      </div>

      <div className="tabs-container" style={{ marginTop: '3rem' }}>
        <div className="tabs">
          {tabs.map(t => (
            <button 
              key={t.id} 
              className={`tab ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="tab-content active">
        <div className="books-grid">
          {getFilteredBooks().map(b => (
            <div key={b.title} className={`book-card ${b.status}`}>
              <div className="book-card-status">
                <span className="status-indicator"></span> {statusLabel[b.status]}
              </div>
              <div className="book-showcase" style={{ perspective: '1000px', margin: '1.5rem 0' }}>
                <div 
                  className="book-cover" 
                  onClick={() => openModal(b.title, b.author, b.country, b.code)}
                >
                  <div className="book-cover-spine"></div>
                  <div className="book-cover-art">
                    <div className="book-cover-flag">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={flagUrl(b.code)} alt="" className="flag-icon" />
                    </div>
                    <div>
                      <div className="book-cover-title">{b.title}</div>
                      <div className="book-cover-author">{b.author}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="book-card-info">
                <h3>{b.country}</h3>
                <p className="book-card-meta">{b.month}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Book Discoverer Section */}
      <section className="discover-section" style={{ textAlign: 'center', maxWidth: '800px', margin: '4rem auto 0', paddingTop: '2rem', borderTop: '1px solid rgba(139, 115, 85, 0.1)' }}>
        <h2 className="section-title">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5" style={{ verticalAlign: 'middle', marginTop: '-4px', marginRight: '8px' }}>
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
          </svg>
          Book Discoverer
        </h2>
        <p className="section-desc">Can't decide what to read next? Let fate pick for you. Explore our entire library of global stories.</p>

        <div className="random-controls" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '2rem', flexWrap: 'wrap', marginTop: '3rem', marginBottom: '2rem' }}>
          <div className="random-field">
            <span className="random-label">Genre</span>
            <select className="custom-dropdown" value={rndGenre} onChange={e => setRndGenre(e.target.value)}>
              <option value="all">All Genres</option>
              <option value="Fiction">Fiction</option>
              <option value="Historical Fiction">Historical Fiction</option>
              <option value="Magical Realism">Magical Realism</option>
              <option value="Philosophy">Philosophy</option>
              <option value="Political Fiction">Political Fiction</option>
              <option value="Coming-of-Age">Coming-of-Age</option>
              <option value="Satire">Satire</option>
              <option value="Fable">Fable</option>
              <option value="Autobiography">Autobiography</option>
              <option value="Non-Fiction">Non-Fiction</option>
            </select>
          </div>
          <div className="random-field">
            <span className="random-label">Page Range</span>
            <select className="custom-dropdown" value={rndPages} onChange={e => setRndPages(e.target.value)}>
              <option value="all">Any Length</option>
              <option value="0-250">Short (&lt; 250)</option>
              <option value="250-500">Medium (250 – 500)</option>
              <option value="500-9999">Long (500+)</option>
            </select>
          </div>
          <div className="random-field">
            <span className="random-label" style={{ visibility: 'hidden' }}>Action</span>
            <button 
              className="random-spin" 
              onClick={spinRandom}
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', minWidth: '14rem' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: spinState.isSpinning ? 'spin 0.5s linear infinite' : 'none' }}>
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-9.21l.75-.85" />
              </svg>
              Discover Random
            </button>
          </div>
        </div>

        <div ref={resultRef} className={`random-result ${spinState.isVisible ? 'visible' : ''}`} style={{ textAlign: 'left', margin: '3rem auto 0', maxWidth: '600px' }}>
          {spinState.tempResult && (
            <>
              <div className="random-result-flag">{spinState.tempResult.flag}</div>
              <div className="random-result-info">
                <div className="random-result-country">{spinState.tempResult.country}</div>
                <div className="random-result-title">{spinState.tempResult.title}</div>
                <div className="random-result-author">{spinState.tempResult.author}</div>
                <div className="random-result-desc">{spinState.tempResult.desc}</div>
                <div className="random-result-meta">
                  <span>{spinState.tempResult.genre}</span>
                  <span>{spinState.tempResult.pages}</span>
                </div>
              </div>
            </>
          )}
          {spinState.result && (
            <>
              <div className="random-result-flag">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={flagUrl(spinState.result.code)} alt="" className="country-flag-img" />
              </div>
              <div className="random-result-info">
                <div className="random-result-country">{spinState.result.country}</div>
                <div className="random-result-title">{spinState.result.title}</div>
                <div className="random-result-author">{spinState.result.authorText}</div>
                <div className="random-result-desc">{spinState.result.descText}</div>
                <div className="random-result-meta">
                  <span>{spinState.result.genreText}</span>
                  <span>{spinState.result.pagesText}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* MODAL */}
      <div 
        className={`modal-overlay ${selectedBook ? 'open' : ''}`} 
        id="modal-overlay" 
        onClick={closeModalOutside}
      >
        {selectedBook && (
          <div className="modal" id="modal-content">
            <div className="modal-header">
              <div className="modal-flag">🌍</div>
              <div>
                <div className="modal-country-label">{selectedBook.country}</div>
                <div className="modal-title">{selectedBook.title}</div>
                <div className="modal-author">{selectedBook.author}</div>
              </div>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="modal-body">
              <div className="modal-section-title">About the Book</div>
              <div className="modal-text">{selectedBook.meta.desc}</div>
              <div className="modal-why">
                <div className="modal-why-title">Why This Book?</div>
                <div className="modal-why-text">{selectedBook.meta.why}</div>
              </div>
            </div>
          </div>
        )}
      </div>

    </main>
  );
}
