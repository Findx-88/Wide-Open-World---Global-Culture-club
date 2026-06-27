"use client";
import { useEffect, useState } from 'react';

export default function MeetingTime({ utcString = '2026-07-05T12:00:00Z', className = '' }) {
  const [displayTime, setDisplayTime] = useState('Sunday, July 5 · 12:00 PM UTC');

  useEffect(() => {
    try {
      const date = new Date(utcString);
      const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // Format the date string (e.g. "Sunday, July 5")
      const dateStr = date.toLocaleString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        timeZone: localTz,
      });

      // Format time with SHORT timezone name — this gives "IST", "EST", "PST" etc.
      const timeWithTz = date.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZoneName: 'short',
        timeZone: localTz,
      });

      // timeWithTz looks like "05:30 PM IST" or "05:30 PM GMT+5:30"
      // Split on AM/PM to extract the timezone part
      const match = timeWithTz.match(/^(.+?(?:AM|PM))\s+(.+)$/);
      if (match) {
        const timePart = match[1].trim();   // e.g. "05:30 PM"
        let tzPart = match[2].trim();       // e.g. "IST" or "GMT+5:30"

        // If the browser gives GMT+X, try to get the IANA short name instead
        if (tzPart.startsWith('GMT') || tzPart.startsWith('UTC+') || tzPart.startsWith('UTC-')) {
          // Use 'long' style to try to get a proper name like "India Standard Time"
          const longTz = date.toLocaleString('en-US', {
            timeZoneName: 'longGeneric',
            timeZone: localTz,
          });
          // Fallback: use the IANA zone name suffix e.g. "Asia/Kolkata" → "IST"
          const ianaAbbr = getIANAAbbr(localTz, date);
          tzPart = ianaAbbr || tzPart;
        }

        setDisplayTime(`${dateStr} · ${timePart} ${tzPart}`);
      } else {
        setDisplayTime(`${dateStr} · ${timeWithTz}`);
      }
    } catch (e) {
      setDisplayTime('Sunday, July 5 · 12:00 PM UTC');
    }
  }, [utcString]);

  return <span className={className}>{displayTime}</span>;
}

// Map of common IANA timezones to their short abbreviations
function getIANAAbbr(iana, date) {
  const abbrs = {
    'Asia/Kolkata': 'IST',
    'Asia/Calcutta': 'IST',
    'Asia/Tehran': 'IRST',
    'Asia/Shanghai': 'CST',
    'Asia/Beijing': 'CST',
    'Asia/Chongqing': 'CST',
    'Asia/Hong_Kong': 'HKT',
    'Asia/Kathmandu': 'NPT',
    'Asia/Katmandu': 'NPT',
    'Asia/Tokyo': 'JST',
    'Asia/Seoul': 'KST',
    'Asia/Singapore': 'SGT',
    'Asia/Dhaka': 'BST',
    'Asia/Karachi': 'PKT',
    'Asia/Dubai': 'GST',
    'Asia/Riyadh': 'AST',
    'Asia/Baghdad': 'AST',
    'Asia/Beirut': 'EET',
    'Asia/Jakarta': 'WIB',
    'Asia/Bangkok': 'ICT',
    'Asia/Kuala_Lumpur': 'MYT',
    'Asia/Manila': 'PHT',
    'Asia/Taipei': 'CST',
    'Australia/Sydney': date && isDST(date, 'Australia/Sydney') ? 'AEDT' : 'AEST',
    'Australia/Melbourne': date && isDST(date, 'Australia/Melbourne') ? 'AEDT' : 'AEST',
    'Australia/Brisbane': 'AEST',
    'Pacific/Auckland': 'NZST',
    'Pacific/Honolulu': 'HST',
    'America/New_York': date && isDST(date, 'America/New_York') ? 'EDT' : 'EST',
    'America/Chicago': date && isDST(date, 'America/Chicago') ? 'CDT' : 'CST',
    'America/Denver': date && isDST(date, 'America/Denver') ? 'MDT' : 'MST',
    'America/Los_Angeles': date && isDST(date, 'America/Los_Angeles') ? 'PDT' : 'PST',
    'America/Phoenix': 'MST',
    'America/Toronto': date && isDST(date, 'America/Toronto') ? 'EDT' : 'EST',
    'America/Vancouver': date && isDST(date, 'America/Vancouver') ? 'PDT' : 'PST',
    'America/Sao_Paulo': 'BRT',
    'America/Argentina/Buenos_Aires': 'ART',
    'America/Mexico_City': date && isDST(date, 'America/Mexico_City') ? 'CDT' : 'CST',
    'Europe/London': date && isDST(date, 'Europe/London') ? 'BST' : 'GMT',
    'Europe/Paris': date && isDST(date, 'Europe/Paris') ? 'CEST' : 'CET',
    'Europe/Berlin': date && isDST(date, 'Europe/Berlin') ? 'CEST' : 'CET',
    'Europe/Madrid': date && isDST(date, 'Europe/Madrid') ? 'CEST' : 'CET',
    'Europe/Amsterdam': date && isDST(date, 'Europe/Amsterdam') ? 'CEST' : 'CET',
    'Europe/Moscow': 'MSK',
    'Europe/Istanbul': 'TRT',
    'Africa/Nairobi': 'EAT',
    'Africa/Lagos': 'WAT',
    'Africa/Cairo': 'EET',
    'UTC': 'UTC',
  };
  return abbrs[iana] || null;
}

function isDST(date, tz) {
  try {
    const jan = new Date(date.getFullYear(), 0, 1);
    const jul = new Date(date.getFullYear(), 6, 1);
    const janOff = getOffset(jan, tz);
    const julOff = getOffset(jul, tz);
    const nowOff = getOffset(date, tz);
    return nowOff !== Math.max(janOff, julOff);
  } catch { return false; }
}

function getOffset(date, tz) {
  const utc = date.getTime();
  const local = new Date(date.toLocaleString('en-US', { timeZone: tz })).getTime();
  return utc - local;
}
