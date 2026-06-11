"use client";
import { useState, useMemo, useEffect } from 'react';
import { LIBRARY_BOOKS, slugify, getBookMetadata, flagUrl } from '../../data/books-data';

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeContinent, setActiveContinent] = useState('all');
  const [genreFilter, setGenreFilter] = useState('all');
  const [lengthFilter, setLengthFilter] = useState('all');
  const [selectedBook, setSelectedBook] = useState(null);

  const continents = ['all', 'Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania', 'Caribbean'];

  // Handle hash scroll on mount
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, []);

  const filteredCountries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const result = [];

    // Sort alphabetically by country name
    const sortedLibrary = [...LIBRARY_BOOKS].sort((a, b) => a[0].localeCompare(b[0]));

    for (const [country, code, continent, books] of sortedLibrary) {
      if (activeContinent !== 'all' && continent !== activeContinent) continue;

      const filteredBooks = books.filter(b => {
        const meta = getBookMetadata(b[0]);
        const titleAuth = (b[0] + ' ' + b[1]).toLowerCase();
        
        // Search
        const matchSearch = !q || titleAuth.includes(q) || (country + ' ' + titleAuth).toLowerCase().includes(q);
        
        // Genre
        const matchGenre = genreFilter === 'all' || meta.genre === genreFilter;
        
        // Length
        let matchLength = true;
        if (lengthFilter === 'short') matchLength = meta.pages < 250;
        else if (lengthFilter === 'medium') matchLength = meta.pages >= 250 && meta.pages <= 500;
        else if (lengthFilter === 'long') matchLength = meta.pages > 500;

        return matchSearch && matchGenre && matchLength;
      });

      if (filteredBooks.length > 0) {
        result.push([country, code, continent, filteredBooks]);
      }
    }

    return result;
  }, [searchQuery, activeContinent, genreFilter, lengthFilter]);

  const openLibraryModal = (title, author, country, code) => {
    const meta = getBookMetadata(title);
    setSelectedBook({ title, author, country, code, meta });
  };

  const closeModal = () => setSelectedBook(null);
  
  const closeModalOutside = (e) => {
    if (e.target.id === 'modal-overlay') closeModal();
  };

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedBook) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedBook]);

  return (
    <main>
      <div className="library-header page-hero">
        <div className="section-eyebrow">The Collection</div>
        <h1 className="section-title">Country-Wise Library</h1>
        <p className="section-desc">
          A growing archive of the world's literature, organized by country. Each nation's stories are a window into its soul.
        </p>
      </div>

      <div className="library-controls">
        <div className="search-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="16.65" y1="16.65" x2="21" y2="21" />
          </svg>
          <input 
            type="text" 
            placeholder="Search by book title, author, or country…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-row">
          <div className="filter-group">
            <span className="filter-group-label">Continent:</span>
            <div className="filter-chips">
              {continents.map(c => (
                <button 
                  key={c}
                  className={`filter-chip ${activeContinent === c ? 'active' : ''}`}
                  onClick={() => setActiveContinent(c)}
                >
                  {c === 'all' ? 'All' : c === 'North America' ? 'N. America' : c === 'South America' ? 'S. America' : c}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="filter-row" style={{ marginTop: '0.5rem' }}>
          <div className="filter-group">
            <span className="filter-group-label" style={{ minWidth: '60px' }}>Genre:</span>
            <select 
              className="custom-dropdown" 
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
            >
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
          <div className="filter-group">
            <span className="filter-group-label" style={{ minWidth: '60px' }}>Length:</span>
            <select 
              className="custom-dropdown" 
              value={lengthFilter}
              onChange={(e) => setLengthFilter(e.target.value)}
            >
              <option value="all">Any Length</option>
              <option value="short">Short (&lt; 250)</option>
              <option value="medium">Medium (250–500)</option>
              <option value="long">Long (&gt; 500)</option>
            </select>
          </div>
        </div>
      </div>

      <div id="library-countries">
        {filteredCountries.length === 0 ? (
          <div className="no-results" style={{ display: 'block' }}>No countries match your search.</div>
        ) : (
          filteredCountries.map(([country, code, continent, books]) => (
            <div key={country} className="country-section" id={slugify(country)}>
              <div className="country-header">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={flagUrl(code, 80)} alt={`${country} flag`} className="country-flag-img" />
                <span className="country-name">{country}</span>
                <span className="country-book-count">{books.length} book{books.length > 1 ? 's' : ''}</span>
              </div>
              <div className="country-books-list">
                {books.map((b, i) => {
                  const title = b[0];
                  const author = b[1];
                  const meta = getBookMetadata(title);
                  
                  return (
                    <div 
                      key={title}
                      className="library-book-item"
                      onClick={() => openLibraryModal(title, author, country, code)}
                    >
                      <span className="lib-book-num">{String(i + 1).padStart(2, '0')}</span>
                      <div className="lib-book-info">
                        <div className="lib-book-title">{title}</div>
                        <div className="lib-book-author">
                          {author} <span style={{ opacity: 0.5, fontSize: '0.8em', marginLeft: '8px' }}>· {meta.genre} · {meta.pages} pages</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

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
