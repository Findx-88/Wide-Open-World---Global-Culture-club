"use client";
import { useState } from 'react';

export default function RecommendPage() {
  const [formData, setFormData] = useState({
    bookTitle: '', bookAuthor: '', movieTitle: '', movieDirector: '', country: '', name: '', why: ''
  });
  const [status, setStatus] = useState('idle');
  const [toast, setToast] = useState({ visible: false, message: '', isError: false });

  const showToast = (message, isError = false) => {
    setToast({ visible: true, message, isError });
    setTimeout(() => setToast({ visible: false, message: '', isError: false }), 4000);
  };

  const handleSubmit = () => {
    if (!formData.bookTitle.trim() && !formData.movieTitle.trim()) {
      showToast('Please add at least a book or movie title.', true); return;
    }
    if (!formData.country.trim()) { showToast('Please add the country.', true); return; }
    setStatus('submitting');
    setTimeout(() => {
      setStatus('idle');
      showToast('Thank you! Our curators will review your suggestion. 📚');
      setFormData({ bookTitle: '', bookAuthor: '', movieTitle: '', movieDirector: '', country: '', name: '', why: '' });
    }, 1000);
  };

  return (
    <main>
      {/* Hero */}
      <div style={{ padding: '6rem 2rem 2rem', textAlign: 'center' }}>
        <div className="section-eyebrow">Your Voice</div>
        <h1 className="section-title" style={{ fontSize: '2.5rem' }}>Recommend a WOW Experience</h1>
        <p className="section-desc" style={{ maxWidth: '600px', margin: '0.5rem auto 0', fontSize: '0.85rem' }}>
          Know a book or movie from a country that captures its cultural soul? Share your recommendation — and help expand our global map.
        </p>
      </div>

      {/* Form Container */}
      <div className="suggest-form-wrap" style={{ maxWidth: '680px', margin: '1.5rem auto 6rem', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          
          {/* Row 1: Country & Name */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
            <div className="form-field">
              <div style={labelStyle}>Country</div>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. India"
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                style={inputStyle}
              />
            </div>
            <div className="form-field">
              <div style={labelStyle}>Your Name</div>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. Priya"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Row 2: Book Title & Book Author */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
            <div className="form-field">
              <div style={{ ...labelStyle, color: 'var(--amber-light)' }}>Book Title</div>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. Midnight's Children"
                value={formData.bookTitle}
                onChange={(e) => setFormData({...formData, bookTitle: e.target.value})}
                style={inputStyle}
              />
            </div>
            <div className="form-field">
              <div style={{ ...labelStyle, color: 'var(--amber-light)' }}>Book Author</div>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. Salman Rushdie"
                value={formData.bookAuthor}
                onChange={(e) => setFormData({...formData, bookAuthor: e.target.value})}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Row 3: Movie Title & Movie Director */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
            <div className="form-field">
              <div style={{ ...labelStyle, color: 'var(--teal-light)' }}>Movie Title</div>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. A Separation"
                value={formData.movieTitle}
                onChange={(e) => setFormData({...formData, movieTitle: e.target.value})}
                style={inputStyle}
              />
            </div>
            <div className="form-field">
              <div style={{ ...labelStyle, color: 'var(--teal-light)' }}>Movie Director</div>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. Asghar Farhadi"
                value={formData.movieDirector}
                onChange={(e) => setFormData({...formData, movieDirector: e.target.value})}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Row 4: Why */}
          <div className="form-field">
            <div style={labelStyle}>Why these recommendations? Why this country?</div>
            <textarea
              className="form-input"
              placeholder="Tell us what makes these selections worth experiencing as a window into the country's culture…"
              value={formData.why}
              onChange={(e) => setFormData({...formData, why: e.target.value})}
              style={{ ...inputStyle, minHeight: '100px', resize: 'vertical', lineHeight: '1.5' }}
            />
          </div>

          {/* Submit */}
          <div className="form-submit" style={{ textAlign: 'center', paddingTop: '1rem' }}>
            <button
              className="btn-primary"
              onClick={handleSubmit}
              disabled={status === 'submitting'}
              style={{
                opacity: status === 'submitting' ? 0.5 : 1,
                cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                padding: '0.8rem 2.5rem',
                background: 'var(--amber)',
                color: 'var(--ink)',
                border: 'none',
                borderRadius: '20px',
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase'
              }}
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit Suggestions →'}
            </button>
          </div>

        </div>
      </div>

      {/* Toast Notification */}
      <div style={{
        position: 'fixed', bottom: '2rem', left: '50%',
        transform: toast.visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(20px)',
        opacity: toast.visible ? 1 : 0,
        background: toast.isError ? '#d06050' : 'var(--amber)', color: toast.isError ? '#fff' : 'var(--ink)',
        padding: '1rem 2rem', borderRadius: '20px',
        fontFamily: "'Jost', sans-serif", fontWeight: 500,
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)', transition: 'all 0.3s ease',
        zIndex: 1000, pointerEvents: 'none',
      }}>
        {toast.message}
      </div>
    </main>
  );
}

const labelStyle = {
  fontSize: '0.65rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--parchment)',
  opacity: 0.6,
  marginBottom: '0.4rem',
  fontFamily: "'Jost', sans-serif",
  fontWeight: '500',
};

const inputStyle = {
  width: '100%',
  padding: '0.6rem 0.9rem',
  background: 'rgba(0,0,0,0.2)',
  border: '1px solid var(--divider)',
  color: 'var(--cream)',
  fontFamily: "'Jost', sans-serif",
  fontSize: '0.82rem',
  outline: 'none',
  borderRadius: '8px',
  boxSizing: 'border-box',
};
