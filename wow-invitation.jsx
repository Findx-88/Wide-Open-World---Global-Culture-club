import { useState } from "react";

const COUNTRIES = [
  { name: "India", flag: "🇮🇳" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "Nigeria", flag: "🇳🇬" },
  { name: "Brazil", flag: "🇧🇷" },
  { name: "Morocco", flag: "🇲🇦" },
  { name: "France", flag: "🇫🇷" },
  { name: "South Korea", flag: "🇰🇷" },
  { name: "Colombia", flag: "🇨🇴" },
  { name: "Egypt", flag: "🇪🇬" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "Turkey", flag: "🇹🇷" },
  { name: "Argentina", flag: "🇦🇷" },
  { name: "China", flag: "🇨🇳" },
  { name: "Kenya", flag: "🇰🇪" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "Mexico", flag: "🇲🇽" },
  { name: "Iran", flag: "🇮🇷" },
  { name: "Ethiopia", flag: "🇪🇹" },
  { name: "Russia", flag: "🇷🇺" },
];

function Globe({ size = 80, color = "#C9A052" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <path id="ga" d="M 7,50 A 43,43 0 0,1 93,50" />
        <path id="gb" d="M 7,50 A 43,43 0 0,0 93,50" />
      </defs>
      <circle cx="50" cy="50" r="46" fill="none" stroke={color} strokeWidth="1.6" opacity="0.9" />
      <circle cx="50" cy="50" r="41" fill="none" stroke={color} strokeWidth="0.6" opacity="0.35" />
      <ellipse cx="50" cy="50" rx="43" ry="19" fill="none" stroke={color} strokeWidth="0.9" opacity="0.7" />
      <ellipse cx="50" cy="50" rx="43" ry="33" fill="none" stroke={color} strokeWidth="0.7" opacity="0.55" />
      <line x1="50" y1="7" x2="50" y2="93" stroke={color} strokeWidth="0.7" opacity="0.4" />
      <line x1="7" y1="50" x2="93" y2="50" stroke={color} strokeWidth="0.7" opacity="0.4" />
      <ellipse cx="50" cy="50" rx="22" ry="43" fill="none" stroke={color} strokeWidth="0.8" opacity="0.6" />
      <ellipse cx="50" cy="50" rx="38" ry="43" fill="none" stroke={color} strokeWidth="0.6" opacity="0.4" />
      <text
        x="50" y="54" textAnchor="middle" dominantBaseline="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="13" fontWeight="700" fill={color} letterSpacing="3"
      >WOW</text>
    </svg>
  );
}

function Divider({ w = 300 }) {
  const m = w / 2;
  return (
    <svg width={w} height="22" viewBox={`0 0 ${w} 22`} aria-hidden="true">
      <line x1="0" y1="11" x2={m - 32} y2="11" stroke="#C9A052" strokeWidth="0.8" opacity="0.55" />
      <polygon points={`${m - 22},11 ${m - 14},6 ${m - 6},11 ${m - 14},16`} fill="none" stroke="#C9A052" strokeWidth="1" opacity="0.7" />
      <circle cx={m} cy="11" r="3.5" fill="#C9A052" opacity="0.85" />
      <polygon points={`${m + 6},11 ${m + 14},6 ${m + 22},11 ${m + 14},16`} fill="none" stroke="#C9A052" strokeWidth="1" opacity="0.7" />
      <line x1={m + 32} y1="11" x2={w} y2="11" stroke="#C9A052" strokeWidth="0.8" opacity="0.55" />
    </svg>
  );
}

function Corner({ tl, tr, bl, br }) {
  const corners = [
    { x: tl ? 8 : undefined, y: tl ? 8 : undefined, sx: 1, sy: 1 },
    { x: tr ? undefined : undefined, right: tr ? 8 : undefined, y: tr ? 8 : undefined, sx: -1, sy: 1 },
    { x: bl ? 8 : undefined, bottom: bl ? 8 : undefined, sx: 1, sy: -1 },
    { right: br ? 8 : undefined, bottom: br ? 8 : undefined, sx: -1, sy: -1 },
  ];
  return corners.map((c, i) => {
    const show = [tl, tr, bl, br][i];
    if (!show) return null;
    const posStyle = {};
    if (c.x !== undefined) posStyle.left = c.x;
    if (c.right !== undefined) posStyle.right = c.right;
    if (c.y !== undefined) posStyle.top = c.y;
    if (c.bottom !== undefined) posStyle.bottom = c.bottom;
    return (
      <div key={i} style={{ position: "absolute", ...posStyle, pointerEvents: "none" }}>
        <svg width="36" height="36" viewBox="0 0 44 44" aria-hidden="true"
          style={{ display: "block", transform: `scale(${c.sx},${c.sy})` }}>
          <path d="M1 43 L1 7 Q1 1 7 1 L43 1" fill="none" stroke="rgba(201,160,82,0.7)" strokeWidth="1.5" />
          <path d="M8 36 L8 12 Q8 8 12 8 L36 8" fill="none" stroke="rgba(201,160,82,0.28)" strokeWidth="0.8" />
          <circle cx="1" cy="22" r="1.8" fill="rgba(201,160,82,0.5)" />
          <circle cx="22" cy="1" r="1.8" fill="rgba(201,160,82,0.5)" />
        </svg>
      </div>
    );
  });
}

export default function WOWInvitation() {
  const [phase, setPhase] = useState("envelope");
  const [cracking, setCracking] = useState(false);
  const [cardOut, setCardOut] = useState(false);
  const [name, setName] = useState("Priya Sharma");
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [nameInput, setNameInput] = useState("Priya Sharma");
  const [countryIdx, setCountryIdx] = useState(0);

  const firstName = name.split(" ")[0];

  const openCard = () => {
    if (cracking || phase !== "envelope") return;
    setCracking(true);
    setTimeout(() => setPhase("card"), 900);
    setTimeout(() => setCracking(false), 950);
  };

  const closeCard = () => {
    setCardOut(true);
    setTimeout(() => { setPhase("envelope"); setCardOut(false); }, 420);
  };

  const apply = () => {
    setName(nameInput);
    setCountry(COUNTRIES[countryIdx]);
    setPhase("envelope");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Caveat:wght@400;700&family=Jost:wght@300;400;500;600&display=swap');

        @keyframes wowFloat {
          0%,100% { transform: rotate(-1.5deg) translateY(0); }
          50%      { transform: rotate(-1.5deg) translateY(-10px); }
        }
        @keyframes wowFadeScale {
          from { opacity:1; transform:rotate(-1.5deg) scale(1) translateY(0); }
          to   { opacity:0; transform:rotate(-1.5deg) scale(0.91) translateY(-16px); }
        }
        @keyframes wowSealCrack {
          0%   { transform:scale(1) rotate(0deg); opacity:1; }
          35%  { transform:scale(1.22) rotate(-4deg); opacity:0.9; }
          100% { transform:scale(0.2) rotate(30deg); opacity:0; filter:blur(3px); }
        }
        @keyframes wowCardIn {
          from { opacity:0; transform:translateY(28px) scale(0.96); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes wowCardOut {
          from { opacity:1; transform:scale(1); }
          to   { opacity:0; transform:scale(0.96) translateY(14px); }
        }
        @keyframes shimmerGold {
          0%   { background-position: -300% center; }
          100% { background-position: 300% center; }
        }
        @keyframes wowParticle {
          0%,100% { transform:translateY(0) translateX(0); opacity:0.22; }
          40%      { transform:translateY(-22px) translateX(8px); opacity:0.55; }
          70%      { transform:translateY(-12px) translateX(-6px); opacity:0.3; }
        }
        @keyframes wowPulse {
          0%,100% { box-shadow:0 0 0 0 rgba(201,160,82,0.4); }
          50%      { box-shadow:0 0 0 10px rgba(201,160,82,0); }
        }

        .wow-envelope-wrap {
          animation: wowFloat 4.5s ease-in-out infinite;
        }
        .wow-envelope-wrap.cracking {
          animation: wowFadeScale 0.85s cubic-bezier(0.4,0,1,1) forwards;
        }
        .wow-seal {
          transition: transform 0.25s;
          animation: wowPulse 2.8s ease-in-out infinite;
        }
        .wow-seal:hover { transform: scale(1.07); cursor: pointer; }
        .wow-seal.cracking {
          animation: wowSealCrack 0.75s cubic-bezier(0.4,0,0.8,1) forwards !important;
        }
        .wow-card-in  { animation: wowCardIn  0.72s cubic-bezier(0.34,1.38,0.64,1) forwards; }
        .wow-card-out { animation: wowCardOut 0.38s ease forwards; }

        .wow-gold-shimmer {
          background: linear-gradient(90deg,#8a5e10 0%,#C9A052 22%,#f5d87a 40%,#ffe9a0 50%,#f5d87a 60%,#C9A052 78%,#8a5e10 100%);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerGold 3.6s linear infinite;
        }

        .wow-open-btn {
          margin-top: 18px;
          padding: 9px 26px;
          background: transparent;
          border: 1px solid rgba(201,160,82,0.45);
          color: rgba(201,160,82,0.75);
          font-family: 'Jost', sans-serif;
          font-size: 9.5px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.22s;
        }
        .wow-open-btn:hover {
          background: rgba(201,160,82,0.08);
          border-color: rgba(201,160,82,0.9);
          color: #C9A052;
          letter-spacing: 0.38em;
        }
        .wow-close-btn {
          margin-top: 10px;
          padding: 7px 20px;
          background: transparent;
          border: 0.5px solid rgba(27,61,42,0.25);
          color: rgba(27,61,42,0.45);
          font-family: 'Jost', sans-serif;
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }
        .wow-close-btn:hover {
          border-color: rgba(27,61,42,0.55);
          color: rgba(27,61,42,0.75);
        }
        .wow-field-label {
          font-family: 'Jost', sans-serif;
          font-size: 8px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(201,160,82,0.5);
          margin-bottom: 6px;
          display: block;
        }
        .wow-input, .wow-select {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 0.5px solid rgba(201,160,82,0.18);
          padding: 9px 12px;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          color: rgba(201,160,82,0.85);
          outline: none;
          transition: border-color 0.2s;
          font-weight: 400;
          border-radius: 0;
          -webkit-appearance: none;
          appearance: none;
        }
        .wow-input::placeholder { color: rgba(201,160,82,0.28); }
        .wow-input:focus, .wow-select:focus { border-color: rgba(201,160,82,0.5); }
        .wow-select { cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(201%2C160%2C82%2C0.7)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 10px center; padding-right:30px; background-color:rgba(255,255,255,0.04); }
        .wow-select option { background:#1a2e1f; color:#c9a052; }
        .wow-apply-btn {
          width: 100%;
          padding: 11px;
          background: rgba(201,160,82,0.12);
          border: 0.5px solid rgba(201,160,82,0.4);
          color: #C9A052;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s;
          margin-top: 4px;
        }
        .wow-apply-btn:hover { background: rgba(201,160,82,0.2); }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 35% 45%, #1a3828 0%, #0c1e12 55%, #060e09 100%)",
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "28px 16px 44px", position: "relative", overflow: "hidden",
        fontFamily: "'Jost', sans-serif",
      }}>

        {/* Atmospheric gold dust particles */}
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} aria-hidden="true" style={{
            position: "absolute",
            width: i % 4 === 0 ? 3 : 2, height: i % 4 === 0 ? 3 : 2,
            borderRadius: "50%", background: "#C9A052",
            left: `${4 + i * 5.2}%`, top: `${8 + (i * 17) % 84}%`,
            animation: `wowParticle ${3.2 + i * 0.35}s ease-in-out infinite`,
            animationDelay: `${i * 0.28}s`,
          }} />
        ))}

        {/* Subtle radial vignette lines */}
        <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }}>
          <defs>
            <pattern id="gridpat" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#C9A052" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridpat)" />
        </svg>

        {/* Top label */}
        <div style={{
          fontFamily: "'Jost', sans-serif", fontSize: 8.5, letterSpacing: "0.4em",
          textTransform: "uppercase", color: "rgba(201,160,82,0.3)",
          marginBottom: 28, zIndex: 2, position: "relative",
        }}>Wide Open World · Membership Invitation</div>

        {/* ─── ENVELOPE ─── */}
        {phase === "envelope" && (
          <div className={`wow-envelope-wrap${cracking ? " cracking" : ""}`}
            style={{ zIndex: 2, position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>

            {/* Envelope card */}
            <div
              onClick={openCard}
              style={{
                width: "min(490px, 94vw)",
                background: "linear-gradient(148deg, #1f4530 0%, #152e1e 45%, #0d2016 100%)",
                border: "1px solid rgba(201,160,82,0.22)",
                padding: "44px 40px 38px",
                display: "flex", flexDirection: "column", alignItems: "center",
                position: "relative", cursor: "pointer",
                boxShadow: "0 30px 90px rgba(0,0,0,0.7), 0 8px 28px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,160,82,0.08)",
              }}>

              {/* Outer decorative border */}
              <div aria-hidden="true" style={{ position: "absolute", inset: 10, border: "0.5px solid rgba(201,160,82,0.14)", pointerEvents: "none" }} />

              {/* Corner ornaments */}
              {[
                { top: 7, left: 7 },
                { top: 7, right: 7, flipH: true },
                { bottom: 7, left: 7, flipV: true },
                { bottom: 7, right: 7, flipH: true, flipV: true },
              ].map(({ flipH, flipV, ...pos }, i) => (
                <div key={i} aria-hidden="true" style={{ position: "absolute", ...pos }}>
                  <svg width="26" height="26" viewBox="0 0 38 38"
                    style={{ display: "block", transform: `scale(${flipH ? -1 : 1},${flipV ? -1 : 1})` }}>
                    <path d="M1 37 L1 6 Q1 1 6 1 L37 1" fill="none" stroke="rgba(201,160,82,0.5)" strokeWidth="1.5" />
                    <circle cx="1" cy="19" r="1.6" fill="rgba(201,160,82,0.38)" />
                    <circle cx="19" cy="1" r="1.6" fill="rgba(201,160,82,0.38)" />
                  </svg>
                </div>
              ))}

              {/* Postage stamp (top right) */}
              <div aria-hidden="true" style={{
                position: "absolute", top: 18, right: 18,
                width: 38, height: 48,
                border: "1px solid rgba(201,160,82,0.3)",
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", gap: 2,
                background: "rgba(201,160,82,0.04)",
                boxShadow: "inset 0 0 0 3px rgba(0,0,0,0.3)",
              }}>
                <Globe size={22} color="rgba(201,160,82,0.45)" />
                <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 5, letterSpacing: "0.12em", color: "rgba(201,160,82,0.35)" }}>WOW</div>
              </div>

              {/* Envelope fold lines */}
              <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
                <line x1="0" y1="0" x2="50%" y2="42%" stroke="rgba(201,160,82,0.06)" strokeWidth="1" />
                <line x1="100%" y1="0" x2="50%" y2="42%" stroke="rgba(201,160,82,0.06)" strokeWidth="1" />
              </svg>

              {/* Globe */}
              <Globe size={78} color="rgba(201,160,82,0.72)" />

              <div style={{
                fontFamily: "'Jost',sans-serif", fontSize: 8, letterSpacing: "0.44em",
                textTransform: "uppercase", color: "rgba(201,160,82,0.42)", marginTop: 10,
              }}>WIDE OPEN WORLD</div>

              <div style={{ width: 100, height: 0.5, background: "rgba(201,160,82,0.22)", margin: "14px 0" }} />

              <div style={{
                fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic",
                fontSize: 12.5, letterSpacing: "0.22em", textTransform: "uppercase",
                color: "rgba(201,160,82,0.38)", marginBottom: 20,
              }}>An Official Invitation</div>

              {/* Wax seal */}
              <div className={`wow-seal${cracking ? " cracking" : ""}`}
                style={{
                  width: 96, height: 96, borderRadius: "50%",
                  background: "radial-gradient(circle at 38% 35%, #a5401a, #7a2810 50%, #4f1a0a)",
                  display: "flex", flexDirection: "column", alignItems: "center",
                  justifyContent: "center", gap: 3, marginBottom: 22,
                  border: "1px solid rgba(160,80,30,0.6)",
                  boxShadow: "0 4px 18px rgba(0,0,0,0.6), 0 1px 0 rgba(255,140,60,0.15) inset",
                }}>
                <Globe size={38} color="rgba(230,185,110,0.9)" />
                <div style={{
                  fontFamily: "'Jost',sans-serif", fontSize: 6, letterSpacing: "0.2em",
                  textTransform: "uppercase", color: "rgba(230,185,110,0.65)",
                }}>SEALED</div>
              </div>

              {/* Recipient */}
              <div style={{
                fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic",
                fontSize: 13, color: "rgba(201,160,82,0.38)", marginBottom: 5,
              }}>Sealed for</div>

              <div style={{
                fontFamily: "'Caveat',cursive", fontSize: 36, fontWeight: 700,
                color: "#C9A052", letterSpacing: "0.01em", lineHeight: 1.1, textAlign: "center",
              }}>{name}</div>

              <div style={{
                fontFamily: "'Jost',sans-serif", fontSize: 9, letterSpacing: "0.18em",
                color: "rgba(201,160,82,0.38)", marginTop: 7,
              }}>{country.flag}  {country.name.toUpperCase()}</div>

              <button className="wow-open-btn" onClick={openCard}>
                Click to Unseal ✦
              </button>
            </div>
          </div>
        )}

        {/* ─── INVITATION CARD ─── */}
        {phase === "card" && (
          <div
            className={cardOut ? "wow-card-out" : "wow-card-in"}
            style={{ zIndex: 2, position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>

            <div style={{
              width: "min(450px, 94vw)",
              background: "linear-gradient(168deg, #fdf8ec 0%, #f8f1d8 55%, #f2e8c8 100%)",
              border: "0.5px solid rgba(201,160,82,0.35)",
              padding: "38px 34px 34px",
              position: "relative",
              boxShadow: "0 28px 90px rgba(0,0,0,0.6), 0 8px 30px rgba(0,0,0,0.4)",
            }}>

              {/* Paper texture */}
              <div aria-hidden="true" style={{
                position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "inherit",
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
              }} />

              {/* Ornamental borders */}
              <div aria-hidden="true" style={{ position: "absolute", inset: 8, border: "1px solid rgba(201,160,82,0.55)", pointerEvents: "none" }} />
              <div aria-hidden="true" style={{ position: "absolute", inset: 12, border: "0.5px solid rgba(201,160,82,0.22)", pointerEvents: "none" }} />

              {/* Corner ornaments on card */}
              {[
                { top: 5, left: 5 },
                { top: 5, right: 5, flipH: true },
                { bottom: 5, left: 5, flipV: true },
                { bottom: 5, right: 5, flipH: true, flipV: true },
              ].map(({ flipH, flipV, ...pos }, i) => (
                <div key={i} aria-hidden="true" style={{ position: "absolute", ...pos }}>
                  <svg width="32" height="32" viewBox="0 0 44 44"
                    style={{ display: "block", transform: `scale(${flipH ? -1 : 1},${flipV ? -1 : 1})` }}>
                    <path d="M1 43 L1 7 Q1 1 7 1 L43 1" fill="none" stroke="rgba(201,160,82,0.75)" strokeWidth="1.5" />
                    <path d="M8 36 L8 12 Q8 8 12 8 L36 8" fill="none" stroke="rgba(201,160,82,0.28)" strokeWidth="0.8" />
                    <circle cx="1" cy="22" r="1.8" fill="rgba(201,160,82,0.55)" />
                    <circle cx="22" cy="1" r="1.8" fill="rgba(201,160,82,0.55)" />
                  </svg>
                </div>
              ))}

              {/* Card body */}
              <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>

                <div style={{
                  fontFamily: "'Jost',sans-serif", fontSize: 7.5, letterSpacing: "0.36em",
                  textTransform: "uppercase", color: "rgba(27,61,42,0.38)", marginBottom: 14,
                }}>Wide Open World · Cultural Membership</div>

                <Globe size={62} color="#1B3D2A" />

                <div style={{
                  fontFamily: "'Jost',sans-serif", fontSize: 8, letterSpacing: "0.32em",
                  textTransform: "uppercase", color: "rgba(27,61,42,0.35)", marginTop: 9,
                }}>Membership Invitation</div>

                <div style={{ width: 140, height: 0.5, background: "rgba(201,160,82,0.45)", margin: "13px 0" }} />

                {/* "You are invited" */}
                <div style={{
                  fontFamily: "'Playfair Display',serif", fontStyle: "italic",
                  fontSize: 30, fontWeight: 400, color: "#1B3D2A",
                  lineHeight: 1.1, marginBottom: 14, textAlign: "center",
                }}>
                  You are{" "}
                  <span className="wow-gold-shimmer"
                    style={{ fontStyle: "normal", fontWeight: 700, fontSize: 32 }}>
                    invited
                  </span>
                </div>

                <Divider w={310} />

                {/* Letter body */}
                <div style={{ width: "100%", marginTop: 16 }}>

                  <div style={{
                    fontFamily: "'Caveat',cursive", fontSize: 23, fontWeight: 700,
                    color: "#1B3D2A", marginBottom: 12, letterSpacing: "0.01em",
                  }}>Dear {firstName},</div>

                  <div style={{
                    fontFamily: "'Cormorant Garamond',serif", fontSize: 15,
                    lineHeight: 1.82, color: "rgba(13,31,21,0.7)", marginBottom: 12,
                  }}>
                    We're building something we believe in. A place where curious people gather
                    to understand the world through the eyes of someone{" "}
                    <em style={{ color: "rgba(13,31,21,0.85)", fontStyle: "italic" }}>living in it.</em>
                  </div>

                  <div style={{
                    fontFamily: "'Cormorant Garamond',serif", fontSize: 15,
                    lineHeight: 1.82, color: "rgba(13,31,21,0.62)", marginBottom: 12,
                  }}>
                    Every two months, we pick a country. We read a book from there, watch a film,
                    and have a real conversation with someone who calls it home.
                  </div>

                  <div style={{
                    fontFamily: "'Cormorant Garamond',serif", fontSize: 15,
                    lineHeight: 1.82, color: "rgba(13,31,21,0.58)",
                  }}>
                    We'd love for you to join us in this expedition.
                  </div>
                </div>

                {/* Country block */}
                <div style={{
                  width: "100%", margin: "20px 0 4px",
                  background: "rgba(27,61,42,0.07)",
                  borderLeft: "2.5px solid rgba(201,160,82,0.75)",
                  padding: "12px 16px",
                  display: "flex", alignItems: "center", gap: 14,
                }}>
                  <div style={{ fontSize: 30, lineHeight: 1 }}>{country.flag}</div>
                  <div>
                    <div style={{
                      fontFamily: "'Jost',sans-serif", fontSize: 7.5, letterSpacing: "0.2em",
                      textTransform: "uppercase", color: "rgba(27,61,42,0.42)", marginBottom: 3,
                    }}>Joining from</div>
                    <div style={{
                      fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 700,
                      color: "#1B3D2A",
                    }}>{country.name}</div>
                  </div>
                </div>

                <div style={{ margin: "18px 0 4px" }}><Divider w={310} /></div>

                {/* Journey begins */}
                <div style={{ textAlign: "center", margin: "12px 0 18px" }}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic",
                    fontSize: 15.5, color: "rgba(27,61,42,0.55)", lineHeight: 1.78,
                  }}>
                    Your passport number is WOW-2025-xxx<br />
                    Your visas will arrive as you explore.<br />
                    Grab a cup of tea. Let's begin.
                  </div>
                </div>

                {/* Signature */}
                <div style={{
                  width: "100%",
                  borderTop: "0.5px solid rgba(201,160,82,0.38)",
                  paddingTop: 16,
                }}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic",
                    fontSize: 12.5, color: "rgba(27,61,42,0.42)", marginBottom: 5,
                  }}>With warmth and wonder,</div>

                  <div style={{
                    fontFamily: "'Caveat',cursive", fontSize: 26, fontWeight: 700,
                    color: "#1B3D2A", letterSpacing: "0.01em", marginBottom: 3,
                  }}>The WOW Team</div>

                  <div style={{
                    fontFamily: "'Jost',sans-serif", fontSize: 8, letterSpacing: "0.18em",
                    textTransform: "uppercase", color: "rgba(27,61,42,0.35)",
                  }}>Wide Open World · #WOW · wideopen.world</div>
                </div>

                {/* Bottom globe seal */}
                <div style={{ marginTop: 22, opacity: 0.3 }}>
                  <Globe size={38} color="#1B3D2A" />
                </div>

              </div>
            </div>

            <button className="wow-close-btn" onClick={closeCard}>← Reseal Envelope</button>
          </div>
        )}

        {/* ─── CUSTOMIZER ─── */}
        <div style={{
          marginTop: 36, width: "min(450px, 94vw)", zIndex: 2, position: "relative",
          background: "rgba(255,255,255,0.025)",
          border: "0.5px solid rgba(201,160,82,0.12)",
          padding: "22px 24px",
        }}>
          <div style={{
            fontFamily: "'Jost',sans-serif", fontSize: 8, letterSpacing: "0.35em",
            textTransform: "uppercase", color: "rgba(201,160,82,0.4)",
            textAlign: "center", marginBottom: 18,
          }}>Customize for a Member</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

            <div>
              <label htmlFor="wow-name-input" className="wow-field-label">
                Member Name
              </label>
              <input
                id="wow-name-input"
                className="wow-input"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                placeholder="e.g. Priya Sharma"
              />
            </div>

            <div>
              <label htmlFor="wow-country-select" className="wow-field-label">
                Their Country
              </label>
              <select
                id="wow-country-select"
                className="wow-select"
                value={countryIdx}
                onChange={e => setCountryIdx(parseInt(e.target.value))}
              >
                {COUNTRIES.map((c, i) => (
                  <option key={i} value={i}>{c.flag}  {c.name}</option>
                ))}
              </select>
            </div>

            <button className="wow-apply-btn" onClick={apply}>
              ✦ Generate Invitation
            </button>
          </div>
        </div>

      </div>
    </>
  );
}
