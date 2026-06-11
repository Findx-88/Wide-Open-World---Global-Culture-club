"use client";
import { useState } from 'react';

export default function RecommendPage() {
  const [formData, setFormData] = useState({ 
    bookTitle: '', 
    bookAuthor: '', 
    movieTitle: '', 
    movieDirector: '', 
    country: '', 
    name: '', 
    why: '' 
  });
  const [status, setStatus] = useState('idle');
  const [toast, setToast] = useState({ visible: false, message: '', isError: false });

  const showToast = (message, isError = false) => {
    setToast({ visible: true, message, isError });
    setTimeout(() => setToast({ visible: false, message: '', isError: false }), 4000);
  };

  const handleSubmit = () => {
    const { bookTitle, bookAuthor, movieTitle, movieDirector, country, name, why } = formData;
    
    if (!bookTitle.trim() && !movieTitle.trim()) {
      showToast('Please suggest at least a book title or a movie title.', true);
      return;
    }

    if (!country.trim()) {
      showToast('Please specify the country for your suggestion.', true);
      return;
    }

    setStatus('submitting');
    
    // Simulate API call for static deployment
    setTimeout(() => {
      setStatus('idle');
      showToast('Thank you for your suggestion! Our curators will review it. 📚🎬');
      setFormData({ 
        bookTitle: '', 
        bookAuthor: '', 
        movieTitle: '', 
        movieDirector: '', 
        country: '', 
        name: '', 
        why: '' 
      });
    }, 1000);
  };

  return (
    <main>
      <div className="suggest-page-hero" style={{ padding: '6rem 2rem 1.5rem', textAlign: 'center' }}>
        <div className="section-eyebrow">Your Voice</div>
        <h1 className="section-title" style={{ fontSize: '2.5rem' }}>Recommend a WOW Experience</h1>
        <p className="section-desc" style={{ maxWidth: '600px', margin: '0.5rem auto 0', fontSize: '0.85rem' }}>
          Know a book or movie from a country that captures its cultural soul? Share your recommendation — and help expand our global map.
        </p>
      </div>

      <div className="suggest-form-wrap" style={{ maxWidth: '620px', margin: '1.5rem auto 5rem', padding: '0 1.5rem' }}>
        <div className="suggest-form" style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--divider)' }}>
          
          <div className="form-field" style={{ padding: '0.8rem 1.2rem' }}>
            <div className="form-label" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--parchment)', opacity: 0.6, marginBottom: '0.3rem' }}>Country</div>
            <input 
              className="form-input" 
              type="text" 
              placeholder="e.g. India"
              value={formData.country}
              onChange={(e) => setFormData({...formData, country: e.target.value})}
              style={{ width: '100%', padding: '0.5rem 0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--divider)', color: 'var(--cream)', fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', outline: 'none', borderRadius: '8px' }}
            />
          </div>

          <div className="form-field" style={{ padding: '0.8rem 1.2rem' }}>
            <div className="form-label" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--parchment)', opacity: 0.6, marginBottom: '0.3rem' }}>Your Name</div>
            <input 
              className="form-input" 
              type="text" 
              placeholder="e.g. Priya"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={{ width: '100%', padding: '0.5rem 0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--divider)', color: 'var(--cream)', fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', outline: 'none', borderRadius: '8px' }}
            />
          </div>

          {/* Book Suggestion Section */}
          <div className="form-field" style={{ padding: '0.8rem 1.2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="form-label" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--amber-light)', opacity: 0.8, marginBottom: '0.3rem' }}>Book Title</div>
            <input 
              className="form-input" 
              type="text" 
              placeholder="e.g. Midnight's Children"
              value={formData.bookTitle}
              onChange={(e) => setFormData({...formData, bookTitle: e.target.value})}
              style={{ width: '100%', padding: '0.5rem 0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--divider)', color: 'var(--cream)', fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', outline: 'none', borderRadius: '8px' }}
            />
          </div>

          <div className="form-field" style={{ padding: '0.8rem 1.2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="form-label" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--amber-light)', opacity: 0.8, marginBottom: '0.3rem' }}>Book Author</div>
            <input 
              className="form-input" 
              type="text" 
              placeholder="e.g. Salman Rushdie"
              value={formData.bookAuthor}
              onChange={(e) => setFormData({...formData, bookAuthor: e.target.value})}
              style={{ width: '100%', padding: '0.5rem 0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--divider)', color: 'var(--cream)', fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', outline: 'none', borderRadius: '8px' }}
            />
          </div>

          {/* Movie Suggestion Section */}
          <div className="form-field" style={{ padding: '0.8rem 1.2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="form-label" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--teal-light)', opacity: 0.8, marginBottom: '0.3rem' }}>Movie Title</div>
            <input 
              className="form-input" 
              type="text" 
              placeholder="e.g. A Separation"
              value={formData.movieTitle}
              onChange={(e) => setFormData({...formData, movieTitle: e.target.value})}
              style={{ width: '100%', padding: '0.5rem 0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--divider)', color: 'var(--cream)', fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', outline: 'none', borderRadius: '8px' }}
            />
          </div>

          <div className="form-field" style={{ padding: '0.8rem 1.2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="form-label" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--teal-light)', opacity: 0.8, marginBottom: '0.3rem' }}>Movie Director</div>
            <input 
              className="form-input" 
              type="text" 
              placeholder="e.g. Asghar Farhadi"
              value={formData.movieDirector}
              onChange={(e) => setFormData({...formData, movieDirector: e.target.value})}
              style={{ width: '100%', padding: '0.5rem 0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--divider)', color: 'var(--cream)', fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', outline: 'none', borderRadius: '8px' }}
            />
          </div>

          <div className="form-field full" style={{ padding: '0.8rem 1.2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="form-label" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--parchment)', opacity: 0.6, marginBottom: '0.3rem' }}>Why these recommendations? Why this country?</div>
            <textarea 
              className="form-input" 
              placeholder="Tell us what makes these selections worth experiencing as a window into the country's culture…"
              value={formData.why}
              onChange={(e) => setFormData({...formData, why: e.target.value})}
              style={{ width: '100%', padding: '0.6rem 0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--divider)', color: 'var(--cream)', fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', minHeight: '80px', resize: 'vertical', outline: 'none', borderRadius: '8px' }}
            />
          </div>

          <div className="form-submit full" style={{ textAlign: 'center', gridColumn: '1 / -1', paddingTop: '1.5rem' }}>
            <button 
              className="btn-primary" 
              onClick={handleSubmit}
              disabled={status === 'submitting'}
              style={{ opacity: status === 'submitting' ? 0.5 : 1, cursor: status === 'submitting' ? 'not-allowed' : 'pointer', padding: '0.8rem 2.2rem', background: 'var(--amber)', color: 'var(--ink)', border: 'none', borderRadius: '20px', fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit Suggestions →'}
            </button>
          </div>
        </div>
      </div>

      <div 
        className={`toast-notification ${toast.visible ? 'show' : ''}`} 
        style={{ 
          position: 'fixed', bottom: '2rem', left: '50%', transform: toast.visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(20px)', opacity: toast.visible ? 1 : 0, 
          background: toast.isError ? '#d06050' : 'var(--amber)', color: toast.isError ? '#fff' : 'var(--ink)', 
          padding: '1rem 2rem', borderRadius: '20px', fontFamily: "'Jost', sans-serif", fontWeight: 500, boxShadow: '0 10px 30px rgba(0,0,0,0.3)', transition: 'all 0.3s ease', zIndex: 1000, pointerEvents: 'none' 
        }}
      >
        {toast.message}
      </div>
    </main>
  );
}
