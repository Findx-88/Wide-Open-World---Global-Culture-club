"use client";
import { useState, useEffect } from 'react';

export default function JoinPage() {
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', mins: '00', secs: '00' });
  const [tz, setTz] = useState('');
  const [tzResult, setTzResult] = useState(null);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const target = new Date('2026-06-06T14:30:00Z');
      const diff = target - now;
      if (diff < 0) {
        setTimeLeft({ days: '00', hours: '00', mins: '00', secs: '00' });
        return;
      }
      setTimeLeft({
        days: String(Math.floor(diff / 86400000)).padStart(2, '0'),
        hours: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'),
        mins: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
        secs: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0')
      });
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTzChange = (e) => {
    const selectedTz = e.target.value;
    setTz(selectedTz);
    
    if (!selectedTz) {
      setTzResult(null);
      return;
    }
    
    const meetingTime = new Date('2026-06-06T14:30:00Z');
    const timeStr = meetingTime.toLocaleString('en-US', { timeZone: selectedTz, hour: '2-digit', minute: '2-digit', hour12: true, timeZoneName: 'short' });
    const dateStr = meetingTime.toLocaleString('en-US', { timeZone: selectedTz, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    setTzResult({ timeStr, dateStr });
  };

  return (
    <main>
      <div className="join-hero">
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>WOW Expedition #1 · Iran 🇮🇷</div>
        <h1 className="section-title">Saturday, June 6 · 8:00 PM IST</h1>
        <p className="section-desc" style={{ margin: '0.8rem auto 0' }}>
          Inaugural meeting introducing <em>Touba and the Meaning of Night</em> &amp; <em>A Separation</em> with Mr. Mo
        </p>
      </div>

      <div className="join-countdown" id="countdown">
        <div className="join-cd-unit">
          <span className="join-cd-num">{timeLeft.days}</span>
          <span className="join-cd-label">Days</span>
        </div>
        <div className="join-cd-unit">
          <span className="join-cd-num">{timeLeft.hours}</span>
          <span className="join-cd-label">Hours</span>
        </div>
        <div className="join-cd-unit">
          <span className="join-cd-num">{timeLeft.mins}</span>
          <span className="join-cd-label">Mins</span>
        </div>
        <div className="join-cd-unit">
          <span className="join-cd-num">{timeLeft.secs}</span>
          <span className="join-cd-label">Secs</span>
        </div>
      </div>

      <div className="join-meeting-info">
        until we gather again to read the world, one story at a time.
      </div>

      <div className="join-links">
        <a href="https://meet.google.com/syp-cysq-nok" target="_blank" rel="noreferrer" className="join-btn join-btn-meet">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
          </svg>
          Join Google Meet
        </a>
        <a href="https://chat.whatsapp.com/JYHDYANTQTG9UH71kIvLbe" target="_blank" rel="noreferrer" className="join-btn join-btn-whatsapp">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Join WhatsApp Group
        </a>
      </div>

      {/* TIMEZONE CONVERTER */}
      <div className="tz-section">
        <div className="tz-title">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5" style={{ verticalAlign: 'middle', marginTop: '-4px', marginRight: '6px' }}>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          What Time Is It For You?
        </div>
        <div className="tz-subtitle">Select your country to see the meeting time in your local timezone</div>
        <div className="tz-select-wrap">
          <select className="tz-select" value={tz} onChange={handleTzChange}>
            <option value="">Choose your country…</option>
            <optgroup label="Asia">
              <option value="Asia/Kabul">Afghanistan</option>
              <option value="Asia/Dhaka">Bangladesh</option>
              <option value="Asia/Shanghai">China</option>
              <option value="Asia/Kolkata">India</option>
              <option value="Asia/Jakarta">Indonesia</option>
              <option value="Asia/Tehran">Iran</option>
              <option value="Asia/Baghdad">Iraq</option>
              <option value="Asia/Jerusalem">Israel</option>
              <option value="Asia/Tokyo">Japan</option>
              <option value="Asia/Almaty">Kazakhstan</option>
              <option value="Asia/Seoul">South Korea</option>
              <option value="Asia/Kuwait">Kuwait</option>
              <option value="Asia/Beirut">Lebanon</option>
              <option value="Asia/Kuala_Lumpur">Malaysia</option>
              <option value="Asia/Kathmandu">Nepal</option>
              <option value="Asia/Karachi">Pakistan</option>
              <option value="Asia/Manila">Philippines</option>
              <option value="Asia/Riyadh">Saudi Arabia</option>
              <option value="Asia/Singapore">Singapore</option>
              <option value="Asia/Colombo">Sri Lanka</option>
              <option value="Asia/Damascus">Syria</option>
              <option value="Asia/Taipei">Taiwan</option>
              <option value="Asia/Bangkok">Thailand</option>
              <option value="Asia/Istanbul">Turkey</option>
              <option value="Asia/Dubai">UAE</option>
              <option value="Asia/Ho_Chi_Minh">Vietnam</option>
            </optgroup>
            <optgroup label="Europe">
              <option value="Europe/Vienna">Austria</option>
              <option value="Europe/Minsk">Belarus</option>
              <option value="Europe/Brussels">Belgium</option>
              <option value="Europe/Sofia">Bulgaria</option>
              <option value="Europe/Zagreb">Croatia</option>
              <option value="Europe/Prague">Czech Republic</option>
              <option value="Europe/Copenhagen">Denmark</option>
              <option value="Europe/Helsinki">Finland</option>
              <option value="Europe/Paris">France</option>
              <option value="Europe/Berlin">Germany</option>
              <option value="Europe/Athens">Greece</option>
              <option value="Europe/Budapest">Hungary</option>
              <option value="Atlantic/Reykjavik">Iceland</option>
              <option value="Europe/Dublin">Ireland</option>
              <option value="Europe/Rome">Italy</option>
              <option value="Europe/Amsterdam">Netherlands</option>
              <option value="Europe/Oslo">Norway</option>
              <option value="Europe/Warsaw">Poland</option>
              <option value="Europe/Lisbon">Portugal</option>
              <option value="Europe/Bucharest">Romania</option>
              <option value="Europe/Moscow">Russia</option>
              <option value="Europe/Belgrade">Serbia</option>
              <option value="Europe/Madrid">Spain</option>
              <option value="Europe/Stockholm">Sweden</option>
              <option value="Europe/Zurich">Switzerland</option>
              <option value="Europe/Kiev">Ukraine</option>
              <option value="Europe/London">United Kingdom</option>
            </optgroup>
            <optgroup label="Africa">
              <option value="Africa/Algiers">Algeria</option>
              <option value="Africa/Cairo">Egypt</option>
              <option value="Africa/Addis_Ababa">Ethiopia</option>
              <option value="Africa/Accra">Ghana</option>
              <option value="Africa/Nairobi">Kenya</option>
              <option value="Africa/Casablanca">Morocco</option>
              <option value="Africa/Lagos">Nigeria</option>
              <option value="Africa/Johannesburg">South Africa</option>
              <option value="Africa/Dar_es_Salaam">Tanzania</option>
              <option value="Africa/Tunis">Tunisia</option>
            </optgroup>
            <optgroup label="Americas">
              <option value="America/Argentina/Buenos_Aires">Argentina</option>
              <option value="America/Sao_Paulo">Brazil</option>
              <option value="America/Toronto">Canada (East)</option>
              <option value="America/Vancouver">Canada (West)</option>
              <option value="America/Santiago">Chile</option>
              <option value="America/Bogota">Colombia</option>
              <option value="America/Havana">Cuba</option>
              <option value="America/Mexico_City">Mexico</option>
              <option value="America/Lima">Peru</option>
              <option value="America/New_York">USA (East)</option>
              <option value="America/Chicago">USA (Central)</option>
              <option value="America/Denver">USA (Mountain)</option>
              <option value="America/Los_Angeles">USA (West)</option>
              <option value="America/Montevideo">Uruguay</option>
              <option value="America/Caracas">Venezuela</option>
            </optgroup>
            <optgroup label="Oceania">
              <option value="Australia/Sydney">Australia (East)</option>
              <option value="Australia/Perth">Australia (West)</option>
              <option value="Pacific/Fiji">Fiji</option>
              <option value="Pacific/Auckland">New Zealand</option>
            </optgroup>
          </select>
        </div>
        <div className={`tz-result ${tzResult ? 'visible' : ''}`}>
          <div className="tz-result-label">Your local meeting time</div>
          <div className="tz-result-time">{tzResult?.timeStr}</div>
          <div className="tz-result-date">{tzResult?.dateStr}</div>
        </div>
      </div>
    </main>
  );
}
