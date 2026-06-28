/* eslint-disable @next/next/no-img-element */
export default function Footer() {
  return (
    <footer>
      <div className="footer-logo" style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/wow-expeditions-logo-v3.png"
          alt="W.O.W — WIDE OPEN WORLD"
          style={{
            height: '36px',
            width: 'auto',
            display: 'block',
            objectFit: 'contain'
          }}
        />
      </div>
      <div className="footer-note">Two months · One country · A book, a film, a friend</div>
      <div className="footer-note">Monthly Meetings · Open to all globally</div>
    </footer>
  );
}
