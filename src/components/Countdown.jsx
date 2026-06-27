"use client";
import { useEffect, useState } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ d: '00', h: '00', m: '00', s: '00' });

  useEffect(() => {
    const target = new Date('2026-07-05T12:00:00Z');
    
    const updateCountdown = () => {
      const now = new Date();
      const diff = target - now;
      if (diff < 0) return;
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      
      setTimeLeft({
        d: String(d).padStart(2, '0'),
        h: String(h).padStart(2, '0'),
        m: String(m).padStart(2, '0'),
        s: String(s).padStart(2, '0')
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="session-countdown" id="countdown">
      <div className="countdown-unit"><span className="countdown-num" id="cd-days">{timeLeft.d}</span><span className="countdown-label">Days</span></div>
      <div className="countdown-unit"><span className="countdown-num" id="cd-hours">{timeLeft.h}</span><span className="countdown-label">Hours</span></div>
      <div className="countdown-unit"><span className="countdown-num" id="cd-mins">{timeLeft.m}</span><span className="countdown-label">Mins</span></div>
      <div className="countdown-unit"><span className="countdown-num" id="cd-secs">{timeLeft.s}</span><span className="countdown-label">Secs</span></div>
    </div>
  );
}
