import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MEMBER = {
  name: "Sarah Chen", initials: "SC",
  nationality: "Singaporean", from: "Singapore",
  joined: "JUNE 2026", num: "WOW-2025-042",
};

const MRZ_LINE1 = "WOW<<CHEN<<SARAH<<<<<<<<<<<<<<<<<<<<<<<<<<<<";
const MRZ_LINE2 = "WOW2025042SGP9201012F2512316<<<<<<<<4";

function MRZ({ dark }) {
  return (
    <div style={{ position:"absolute", bottom:7, left:0, right:0,
      display:"flex", flexDirection:"column", alignItems:"center", gap:1,
      pointerEvents:"none" }}>
      <div style={{ fontFamily:"'Special Elite',cursive", fontSize:5.5, letterSpacing:"0.05em",
        color: dark ? "rgba(201,160,82,0.16)" : "rgba(0,0,0,0.13)", whiteSpace:"nowrap" }}>{MRZ_LINE1}</div>
      <div style={{ fontFamily:"'Special Elite',cursive", fontSize:5.5, letterSpacing:"0.05em",
        color: dark ? "rgba(201,160,82,0.16)" : "rgba(0,0,0,0.13)", whiteSpace:"nowrap" }}>{MRZ_LINE2}</div>
    </div>
  );
}

const C = [
  {
    id:"jp", code:"JP", name:"Japan", flag:"🇯🇵",
    ink:"#791F1F", inkL:"#FCEBEB", inkB:"#E24B4A",
    book:{ title:"Norwegian Wood", by:"Haruki Murakami", yr:1987 },
    film:{ title:"Spirited Away", by:"Hayao Miyazaki", yr:2001 },
    guest:{ name:"Aiko Tanaka", city:"Osaka", init:"AT" },
    quote:"Murakami writes loneliness in a way that makes you feel less alone. This book is Japan beneath Japan.",
    note:"The Naoko vs. Midori debate ran two hours over time. I'll never forget it.",
    s1:{ date:"12 JAN 2025", done:true }, s2:{ date:"09 FEB 2025", done:true },
    period:"JAN – FEB 2025", complete:true,
  },
  {
    id:"ma", code:"MA", name:"Morocco", flag:"🇲🇦",
    ink:"#633806", inkL:"#FAEEDA", inkB:"#BA7517",
    book:{ title:"Dreams of Trespass", by:"Fatema Mernissi", yr:1994 },
    film:{ title:"Ali Zaoua", by:"Nabil Ayouch", yr:2000 },
    guest:{ name:"Fatima Zahra", city:"Marrakech", init:"FZ" },
    quote:"Morocco taught us that beauty and complexity live in the same street, the same family, the same breath.",
    note:"Fatima described her grandmother's harem in Fez. The whole group went silent.",
    s1:{ date:"16 MAR 2025", done:true }, s2:{ date:"13 APR 2025", done:true },
    period:"MAR – APR 2025", complete:true,
  },
  {
    id:"ng", code:"NG", name:"Nigeria", flag:"🇳🇬",
    ink:"#27500A", inkL:"#EAF3DE", inkB:"#639922",
    book:{ title:"Things Fall Apart", by:"Chinua Achebe", yr:1958 },
    film:{ title:"Half of a Yellow Sun", by:"Biyi Bandele", yr:2013 },
    guest:{ name:"Emeka Obi", city:"Lagos", init:"EO" },
    quote:"This is the book that told Africa its own story back to itself. It belongs to everyone who has watched a world dissolve.",
    note:"We agreed: Okonkwo is tragic, not a villain. That conversation shifted something.",
    s1:{ date:"11 MAY 2025", done:true }, s2:{ date:"08 JUN 2025", done:true },
    period:"MAY – JUN 2025", complete:true,
  },
  {
    id:"in", code:"IN", name:"India", flag:"🇮🇳",
    ink:"#712B13", inkL:"#FAECE7", inkB:"#D85A30",
    book:{ title:"A Fine Balance", by:"Rohinton Mistry", yr:1995 },
    film:{ title:"Lagaan", by:"Ashutosh Gowariker", yr:2001 },
    guest:{ name:"Priya Sharma", city:"Mumbai", init:"PS" },
    quote:"India holds suffering and dignity in the same hand without flinching. This book does too.",
    note:null,
    s1:{ date:"13 JUL 2025", done:true }, s2:{ date:"10 AUG 2025", done:false },
    period:"JUL – AUG 2025", complete:false,
  },
];

const PW = 290, PH = 420;

function StampSVG({ c, sessionNum, top, left, rot, anim }) {
  const s = sessionNum === 1 ? c.s1 : c.s2;
  const sLabel = sessionNum === 1 ? "I" : "II";
  const uid = `${c.id}s${sessionNum}${anim ? "a" : ""}`;
  const done = anim ? true : s.done;
  return (
    <div style={{
      position:"absolute", top, left,
      transform:`rotate(${rot}deg)`,
      opacity: done ? 0.84 : 0.38,
      width:84, height:84,
      animation: anim ? "wowStamp 0.75s cubic-bezier(0.25,0.46,0.45,0.94) forwards" : "none",
    }}>
      <svg width="84" height="84" viewBox="0 0 84 84">
        <defs>
          <path id={`tp${uid}`} d="M 8,42 A 34,34 0 0,1 76,42"/>
          <path id={`bp${uid}`} d="M 8,42 A 34,34 0 0,0 76,42"/>
        </defs>
        <circle cx="42" cy="42" r="38" fill="none" stroke={c.inkB} strokeWidth="2.5"
          strokeDasharray={done ? undefined : "5 3"}/>
        <circle cx="42" cy="42" r="31" fill="none" stroke={c.inkB} strokeWidth="1"/>
        <text x="42" y="44" textAnchor="middle" dominantBaseline="middle"
          fontFamily="Jost,sans-serif" fontSize="13" fontWeight="700"
          fill={c.inkB} letterSpacing="2">{c.code}</text>
        <text fontFamily="Jost,sans-serif" fontSize="6" fontWeight="600"
          fill={c.inkB} letterSpacing="2.5">
          <textPath href={`#tp${uid}`} startOffset="50%" textAnchor="middle">
            {c.name.toUpperCase()}
          </textPath>
        </text>
        <text fontFamily="Jost,sans-serif" fontSize="5" fill={c.inkB} letterSpacing="1.2">
          <textPath href={`#bp${uid}`} startOffset="50%" textAnchor="middle">
            {`SESSION ${sLabel} · ${s.date}`}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

function Seal({ c, top, left, rot }) {
  return (
    <div style={{
      position:"absolute", top, left,
      transform:`rotate(${rot}deg)`,
      width:128, opacity:0.92,
      background:c.inkL, border:`2px solid ${c.inkB}`,
      padding:"5px 8px",
    }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
        borderBottom:`0.5px solid ${c.inkB}`, paddingBottom:3, marginBottom:3 }}>
        <span style={{ fontFamily:"Jost,sans-serif", fontSize:6.5, letterSpacing:"0.12em",
          color:c.ink, fontWeight:600 }}>JOURNEY COMPLETE</span>
        <span style={{ fontSize:10 }}>{c.flag}</span>
      </div>
      <div style={{ fontFamily:"Playfair Display,serif", fontSize:12, fontWeight:700,
        color:c.ink, lineHeight:1.2 }}>{c.name}</div>
      <div style={{ fontFamily:"Jost,sans-serif", fontSize:7, color:c.ink,
        opacity:0.65, marginTop:2, letterSpacing:"0.06em" }}>{c.period}</div>
      <div style={{ fontFamily:"Jost,sans-serif", fontSize:6.5, color:c.ink,
        opacity:0.5, marginTop:2 }}>
        {c.book.title.length > 20 ? c.book.title.slice(0,20)+"…" : c.book.title}
      </div>
    </div>
  );
}

function Page({ children, isLeft, bg="#F8F2E2", style={} }) {
  return (
    <div style={{
      width:PW, height:PH, flexShrink:0,
      background:bg,
      backgroundImage:"linear-gradient(30deg,rgba(100,75,25,0.035) 1px,transparent 1px),linear-gradient(-30deg,rgba(100,75,25,0.035) 1px,transparent 1px)",
      backgroundSize:"15px 15px",
      position:"relative", overflow:"hidden",
      boxShadow: isLeft ? "inset -5px 0 16px rgba(0,0,0,0.1)" : "inset 5px 0 16px rgba(0,0,0,0.1)",
      ...style,
    }}>
      {children}
    </div>
  );
}

function Spine() {
  return <div style={{ width:8, height:PH, flexShrink:0, background:"#0D2418",
    boxShadow:"inset -2px 0 8px rgba(0,0,0,0.5), inset 2px 0 8px rgba(0,0,0,0.5)" }}/>;
}

function Pnum({ n, isLeft }) {
  return (
    <div style={{ position:"absolute", bottom:7, [isLeft?"left":"right"]:10,
      fontFamily:"Jost,sans-serif", fontSize:7, color:"rgba(0,0,0,0.18)",
      letterSpacing:"0.08em" }}>{String(n).padStart(2,"0")}</div>
  );
}

function CodeBg({ code }) {
  return (
    <div style={{ position:"absolute", bottom:12, right:12,
      fontFamily:"Jost,sans-serif", fontSize:52, fontWeight:900,
      color:"rgba(0,0,0,0.032)", lineHeight:1 }}>{code}</div>
  );
}

function CountryPage({ c, isLeft, partial }) {
  const pnMap = { jp:3, ma:5, ng:7, in:9 };
  const pn = pnMap[c.id] ?? 3;
  return (
    <Page isLeft={isLeft} bg={partial?"#FDF8F4":"#F8F2E2"}>
      <div style={{ height:94, background:c.ink, display:"flex", flexDirection:"column",
        justifyContent:"flex-end", padding:"10px 13px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:8, top:"50%", transform:"translateY(-50%)",
          fontFamily:"Jost,sans-serif", fontSize:52, fontWeight:900,
          color:"rgba(255,255,255,0.06)", letterSpacing:"0.05em", lineHeight:1 }}>{c.code}</div>
        {partial && (
          <div style={{ position:"absolute", top:8, right:8, background:"rgba(255,255,255,0.16)",
            padding:"2px 7px", fontFamily:"Jost,sans-serif", fontSize:6.5, letterSpacing:"0.14em",
            color:"rgba(255,255,255,0.8)" }}>IN PROGRESS</div>
        )}
        <div style={{ fontFamily:"Playfair Display,serif", fontSize:22, fontWeight:900,
          color:"#fff", lineHeight:1, position:"relative", zIndex:1 }}>{c.name}</div>
        <div style={{ fontFamily:"Jost,sans-serif", fontSize:7.5, letterSpacing:"0.2em",
          color:"rgba(255,255,255,0.58)", marginTop:3, position:"relative", zIndex:1 }}>{c.period}</div>
      </div>
      <div style={{ padding:"9px 12px", display:"flex", flexDirection:"column", gap:7 }}>
        <div style={{ display:"flex", gap:5 }}>
          {[{type:"BOOK",title:c.book.title,by:c.book.by},{type:"FILM",title:c.film.title,by:c.film.by}].map(m=>(
            <div key={m.type} style={{ flex:1, background:c.inkL, borderLeft:`2px solid ${c.inkB}`,
              padding:"5px 6px" }}>
              <div style={{ fontFamily:"Jost,sans-serif", fontSize:6, letterSpacing:"0.18em",
                color:c.ink, opacity:0.65, marginBottom:2 }}>{m.type}</div>
              <div style={{ fontFamily:"Playfair Display,serif", fontSize:9.5, fontWeight:700,
                color:c.ink, lineHeight:1.2 }}>{m.title.length>17?m.title.slice(0,17)+"…":m.title}</div>
              <div style={{ fontFamily:"Jost,sans-serif", fontSize:7, color:c.ink,
                opacity:0.5, marginTop:1 }}>{m.by.split(" ").slice(-1)[0]}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8,
          borderLeft:`2px solid ${c.inkB}`, padding:"5px 8px" }}>
          <div style={{ width:26, height:26, borderRadius:"50%", flexShrink:0,
            background:c.inkL, border:`1px solid ${c.inkB}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontFamily:"Jost,sans-serif", fontSize:8, fontWeight:600, color:c.ink }}>{c.guest.init}</div>
          <div>
            <div style={{ fontFamily:"Jost,sans-serif", fontSize:9.5, fontWeight:500,
              color:"#1a1a1a" }}>{c.guest.name}</div>
            <div style={{ fontFamily:"Jost,sans-serif", fontSize:7, letterSpacing:"0.08em",
              color:"#666", opacity:0.6 }}>{c.guest.city} · Cultural Guide</div>
          </div>
        </div>
        <div style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:10.5,
          lineHeight:1.58, color:"#2a2a2a", opacity:0.72 }}>
          "{c.quote.length>115?c.quote.slice(0,115)+"…":c.quote}"
        </div>
        <div style={{ border:"1px dashed rgba(0,0,0,0.14)", padding:"6px 8px", minHeight:38 }}>
          <div style={{ fontFamily:"Jost,sans-serif", fontSize:6.5, letterSpacing:"0.18em",
            color:"rgba(0,0,0,0.26)", marginBottom:3 }}>MY REFLECTION</div>
          {c.note
            ? <div style={{ fontFamily:"Georgia,serif", fontSize:9.5, fontStyle:"italic",
                color:"rgba(0,0,0,0.55)", lineHeight:1.45 }}>{c.note}</div>
            : <div style={{ fontFamily:"Jost,sans-serif", fontSize:8, color:"rgba(0,0,0,0.2)",
                fontStyle:"italic" }}>{partial?"Write your thoughts after Session II…":"—"}</div>}
        </div>
        <div style={{ display:"flex", gap:5 }}>
          {[c.s1,c.s2].map((s,i)=>(
            <div key={i} style={{ flex:1, padding:"4px 6px",
              border:`0.5px solid ${s.done?c.inkB:"rgba(0,0,0,0.1)"}`,
              background:s.done?c.inkL:"transparent" }}>
              <div style={{ fontFamily:"Jost,sans-serif", fontSize:6, letterSpacing:"0.1em",
                color:s.done?c.ink:"rgba(0,0,0,0.28)" }}>
                SESSION {i===0?"I":"II"} {s.done?"✓":"○"}
              </div>
              <div style={{ fontFamily:"Jost,sans-serif", fontSize:7, color:s.done?c.ink:"rgba(0,0,0,0.22)", opacity:0.85 }}>{s.date}</div>
            </div>
          ))}
        </div>
      </div>
      <MRZ/>
      <Pnum n={pn} isLeft={isLeft}/>
    </Page>
  );
}

const SPREAD_LABELS = [
  "Front Cover","Bio Data Page","Japan — Info & Stamps",
  "Morocco — Info & Stamps","Nigeria — Info & Stamps",
  "India — Info & Stamps","Journey Overview",
];

export default function WOWPassport() {
  const [spread,setSpread] = useState(0);
  const [dropped,setDropped] = useState(false);
  const [shareOpen,setShareOpen] = useState(false);
  const TOTAL = 7;
  const jp=C[0], ma=C[1], ng=C[2], india=C[3];

  const bookW = spread===0 ? PW : PW*2+8;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Caveat:wght@400;700&family=Special+Elite&family=Jost:wght@300;400;500;600&display=swap');
        @keyframes wowStamp {
          0%   { transform:scale(2.6) translateY(-18px); opacity:0; }
          58%  { transform:scale(0.92); opacity:0.88; }
          74%  { transform:scale(1.07); }
          88%  { transform:scale(0.98); }
          100% { transform:scale(1); opacity:0.84; }
        }
        .wow-sp {
          position:absolute; top:0; left:0; display:flex;
          transition:opacity 0.42s ease;
        }
        .wow-dot {
          width:6px; height:6px; border-radius:50%;
          border:none; cursor:pointer; padding:0;
          background:rgba(0,0,0,0.15); transition:all 0.28s;
        }
        .wow-dot.on { background:#633806; width:18px; border-radius:3px; }
        .wow-navbtn {
          width:34px; height:34px; border-radius:50%; border:0.5px solid var(--color-border-secondary,rgba(0,0,0,0.2));
          background:var(--color-background-primary,#fff); color:var(--color-text-primary,#1a1a1a);
          display:flex; align-items:center; justify-content:center; cursor:pointer;
          transition:background 0.15s;
        }
        .wow-navbtn:hover { background:var(--color-background-secondary,#f0f0f0); }
        .wow-navbtn:disabled { opacity:0.28; cursor:not-allowed; }
        .wow-btn {
          font-family:Jost,sans-serif; font-size:11px; letter-spacing:0.1em; text-transform:uppercase;
          padding:7px 15px; border-radius:8px; cursor:pointer; display:flex; align-items:center; gap:6px;
          border:0.5px solid var(--color-border-secondary,rgba(0,0,0,0.2));
          background:var(--color-background-primary,#fff); color:var(--color-text-primary,#1a1a1a);
          transition:background 0.14s;
        }
        .wow-btn:hover { background:var(--color-background-secondary,#f0f0f0); }
        .wow-btn:disabled { opacity:0.3; cursor:not-allowed; }
        .wow-btn.accent { background:#1B3D2A; color:#C9A052; border-color:#1B3D2A; }
        .wow-btn.accent:hover { background:#224d35; }
        .sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
      `}</style>

      <h2 className="sr-only">WOW Cultural Passport — interactive prototype for Sarah Chen. 7 navigable passport spreads showing stamp pages and country chapter pages for Japan, Morocco, Nigeria and India.</h2>

      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:20, padding:"20px 12px" }}>

        {/* ── HEADER ── */}
        <div style={{ textAlign:"center" }}>
          <div style={{ fontFamily:"Jost,sans-serif", fontSize:10, letterSpacing:"0.3em",
            color:"var(--color-text-secondary)", textTransform:"uppercase", marginBottom:4 }}>
            Interactive Prototype
          </div>
          <div style={{ fontFamily:"Playfair Display,serif", fontSize:20, fontStyle:"italic",
            color:"var(--color-text-primary)", fontWeight:400 }}>
            Wide Open World — Cultural Passport
          </div>
        </div>

        {/* ── VIEWER ── */}
        <div style={{ background:"var(--color-background-secondary)", borderRadius:12,
          padding:"20px 16px", display:"flex", flexDirection:"column", alignItems:"center", gap:14,
          border:"0.5px solid var(--color-border-tertiary)", width:"100%" }}>

          <div style={{ fontFamily:"Jost,sans-serif", fontSize:9.5, letterSpacing:"0.22em",
            color:"var(--color-text-secondary)", textTransform:"uppercase" }}>
            {SPREAD_LABELS[spread]}
          </div>

          {/* Passport */}
          <div style={{
            position:"relative", width:bookW, height:PH,
            transition:"width 0.5s cubic-bezier(0.4,0,0.2,1)",
            filter:"drop-shadow(0 10px 32px rgba(0,0,0,0.24))",
          }}>

            {/* ─── SPREAD 0: COVER ─── */}
            <div className="wow-sp" style={{ opacity:spread===0?1:0, pointerEvents:spread===0?"all":"none" }}>
              <div style={{ width:PW, height:PH, background:"#1B3D2A", display:"flex",
                flexDirection:"column", alignItems:"center", justifyContent:"space-between",
                padding:"28px 22px", position:"relative" }}>
                <div style={{ position:"absolute", inset:9, border:"1px solid rgba(201,160,82,0.18)", pointerEvents:"none" }}/>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"Jost,sans-serif", fontSize:7.5, letterSpacing:"0.44em",
                    color:"rgba(201,160,82,0.5)", textTransform:"uppercase", marginBottom:3 }}>WIDE OPEN WORLD</div>
                  <div style={{ fontFamily:"Jost,sans-serif", fontSize:6.5, letterSpacing:"0.28em",
                    color:"rgba(201,160,82,0.25)", textTransform:"uppercase" }}>Est. 2026</div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10 }}>
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(201,160,82,0.28)" strokeWidth="1.2"/>
                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(201,160,82,0.52)" strokeWidth="1.8"/>
                    <circle cx="50" cy="50" r="34" fill="none" stroke="rgba(201,160,82,0.13)" strokeWidth="0.7"/>
                    <ellipse cx="50" cy="50" rx="16" ry="34" fill="none" stroke="rgba(201,160,82,0.24)" strokeWidth="0.9"/>
                    <ellipse cx="50" cy="50" rx="31" ry="34" fill="none" stroke="rgba(201,160,82,0.16)" strokeWidth="0.7"/>
                    <ellipse cx="50" cy="50" rx="34" ry="13" fill="none" stroke="rgba(201,160,82,0.18)" strokeWidth="0.7"/>
                    <ellipse cx="50" cy="50" rx="34" ry="26" fill="none" stroke="rgba(201,160,82,0.12)" strokeWidth="0.6"/>
                    <text x="50" y="54" textAnchor="middle" dominantBaseline="middle"
                      fontFamily="Playfair Display,serif" fontSize="16" fontWeight="700"
                      fill="rgba(201,160,82,0.72)" letterSpacing="3">WOW</text>
                  </svg>
                  <div style={{ fontFamily:"Playfair Display,serif", fontSize:14.5, fontWeight:700,
                    letterSpacing:"0.18em", color:"#C9A052", textAlign:"center", lineHeight:1.3 }}>
                    CULTURAL<br/>PASSPORT
                  </div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                  <div style={{ width:52, height:1, background:"rgba(201,160,82,0.18)" }}/>
                  <div style={{ fontFamily:"Caveat,cursive", fontSize:24, fontWeight:700,
                    color:"#C9A052", letterSpacing:"0.02em" }}>{MEMBER.name}</div>
                  <div style={{ fontFamily:"Special Elite,cursive", fontSize:9,
                    color:"rgba(201,160,82,0.36)", letterSpacing:"0.13em" }}>{MEMBER.num}</div>
                </div>
              </div>
            </div>

            {/* ─── SPREAD 1: BIO ─── */}
            <div className="wow-sp" style={{ opacity:spread===1?1:0, pointerEvents:spread===1?"all":"none" }}>
              {/* Inside cover */}
              <div style={{ width:PW, height:PH, flexShrink:0, background:"#1B3D2A",
                display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                gap:13, padding:"28px 20px", position:"relative",
                boxShadow:"inset -3px 0 12px rgba(0,0,0,0.22)" }}>
                <div style={{ position:"absolute", inset:9, border:"1px solid rgba(201,160,82,0.1)", pointerEvents:"none" }}/>
                <svg width="42" height="42" viewBox="0 0 100 100" opacity="0.35">
                  <circle cx="50" cy="50" r="46" fill="none" stroke="#C9A052" strokeWidth="1.5"/>
                  <circle cx="50" cy="50" r="39" fill="none" stroke="#C9A052" strokeWidth="1"/>
                  <ellipse cx="50" cy="50" rx="16" ry="34" fill="none" stroke="#C9A052" strokeWidth="0.9"/>
                  <ellipse cx="50" cy="50" rx="34" ry="13" fill="none" stroke="#C9A052" strokeWidth="0.7"/>
                  <text x="50" y="54" textAnchor="middle" dominantBaseline="middle"
                    fontFamily="Playfair Display,serif" fontSize="16" fontWeight="700" fill="#C9A052" letterSpacing="3">WOW</text>
                </svg>
                <div style={{ fontFamily:"Jost,sans-serif", fontSize:7.5, letterSpacing:"0.28em",
                  color:"rgba(201,160,82,0.34)", textAlign:"center", lineHeight:2, maxWidth:185 }}>
                  THE WORLD IS A BOOK AND THOSE WHO DO NOT EXPLORE IT READ ONLY ONE PAGE.
                </div>
                <div style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:8.5,
                  color:"rgba(201,160,82,0.22)", textAlign:"center" }}>— Augustine, adapted</div>
                <div style={{ width:34, height:1, background:"rgba(201,160,82,0.14)" }}/>
                <div style={{ fontFamily:"Jost,sans-serif", fontSize:6.5, letterSpacing:"0.16em",
                  color:"rgba(201,160,82,0.18)", textAlign:"center", lineHeight:1.9 }}>
                  VALID FOR ALL 195 COUNTRIES<br/>ISSUED BY WIDE OPEN WORLD<br/>GLOBAL CULTURE CLUB
                </div>
              </div>
              <Spine/>
              {/* Bio page */}
              <Page isLeft={false}>
                <div style={{ position:"absolute", top:"42%", left:"50%",
                  transform:"translate(-50%,-50%)", fontFamily:"Jost,sans-serif", fontSize:56,
                  fontWeight:900, color:"rgba(0,0,0,0.022)", letterSpacing:"0.38em",
                  whiteSpace:"nowrap", pointerEvents:"none" }}>WOW</div>
                <div style={{ padding:"16px 16px 0", height:"100%", display:"flex", flexDirection:"column" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", paddingBottom:9,
                    borderBottom:"0.5px solid rgba(0,0,0,0.09)", marginBottom:14 }}>
                    <div style={{ fontFamily:"Jost,sans-serif", fontSize:7, letterSpacing:"0.18em",
                      color:"rgba(0,0,0,0.28)" }}>CULTURAL PASSPORT</div>
                    <div style={{ fontFamily:"Jost,sans-serif", fontSize:7, color:"rgba(0,0,0,0.28)",
                      letterSpacing:"0.12em" }}>TYPE: CP</div>
                  </div>
                  <div style={{ display:"flex", gap:13, marginBottom:16 }}>
                    <div style={{ width:68, height:86, flexShrink:0, border:"0.5px solid rgba(0,0,0,0.13)",
                      background:"#E8DCC8", display:"flex", alignItems:"center", justifyContent:"center",
                      fontFamily:"Jost,sans-serif", fontSize:17, fontWeight:500, color:"rgba(0,0,0,0.26)" }}>SC</div>
                    <div style={{ flex:1, display:"flex", flexDirection:"column", gap:9, justifyContent:"center" }}>
                      {[{l:"Surname",v:"Chen"},{l:"Given Names",v:"Sarah"},{l:"Nationality",v:MEMBER.nationality}].map(f=>(
                        <div key={f.l}>
                          <div style={{ fontFamily:"Jost,sans-serif", fontSize:6.5, letterSpacing:"0.14em",
                            color:"rgba(0,0,0,0.3)", textTransform:"uppercase", marginBottom:1 }}>{f.l}</div>
                          <div style={{ fontFamily:"Special Elite,cursive", fontSize:11.5,
                            color:"#1a1a1a", letterSpacing:"0.04em" }}>{f.v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginBottom:18 }}>
                    <div style={{ fontFamily:"Jost,sans-serif", fontSize:6.5, letterSpacing:"0.14em",
                      color:"rgba(0,0,0,0.3)", textTransform:"uppercase", marginBottom:2 }}>Date of Issue</div>
                    <div style={{ fontFamily:"Special Elite,cursive", fontSize:11.5, color:"#1a1a1a",
                      letterSpacing:"0.04em" }}>{MEMBER.joined}</div>
                  </div>
                  <div style={{ flex:1 }}/>
                  <div style={{ borderBottom:"1px solid rgba(0,0,0,0.13)", paddingBottom:6, marginBottom:32 }}>
                    <div style={{ fontFamily:"Caveat,cursive", fontSize:21, fontWeight:700, color:"#1a1a1a" }}>Sarah Chen</div>
                    <div style={{ fontFamily:"Jost,sans-serif", fontSize:6.5, letterSpacing:"0.14em",
                      color:"rgba(0,0,0,0.26)", textTransform:"uppercase", marginTop:2 }}>Holder's Signature</div>
                  </div>
                </div>
                <MRZ/>
                <Pnum n={2} isLeft={false}/>
              </Page>
            </div>

            {/* ─── SPREAD 2: JAPAN — Info + Stamps ─── */}
            <div className="wow-sp" style={{ opacity:spread===2?1:0, pointerEvents:spread===2?"all":"none" }}>
              <CountryPage c={jp} isLeft={true} partial={false}/>
              <Spine/>
              <Page isLeft={false}>
                <Pnum n={4} isLeft={false}/>
                <StampSVG c={jp} sessionNum={1} top={36} left={18} rot={-9}/>
                <StampSVG c={jp} sessionNum={2} top={22} left={160} rot={7}/>
                <Seal c={jp} top={156} left={46} rot={-4}/>
                <CodeBg code="JP"/>
                <MRZ/>
              </Page>
            </div>

            {/* ─── SPREAD 3: MOROCCO — Info + Stamps ─── */}
            <div className="wow-sp" style={{ opacity:spread===3?1:0, pointerEvents:spread===3?"all":"none" }}>
              <CountryPage c={ma} isLeft={true} partial={false}/>
              <Spine/>
              <Page isLeft={false}>
                <Pnum n={6} isLeft={false}/>
                <StampSVG c={ma} sessionNum={1} top={28} left={158} rot={13}/>
                <StampSVG c={ma} sessionNum={2} top={158} left={10} rot={-7}/>
                <Seal c={ma} top={44} left={14} rot={5}/>
                <CodeBg code="MA"/>
                <MRZ/>
              </Page>
            </div>

            {/* ─── SPREAD 4: NIGERIA — Info + Stamps ─── */}
            <div className="wow-sp" style={{ opacity:spread===4?1:0, pointerEvents:spread===4?"all":"none" }}>
              <CountryPage c={ng} isLeft={true} partial={false}/>
              <Spine/>
              <Page isLeft={false}>
                <Pnum n={8} isLeft={false}/>
                <StampSVG c={ng} sessionNum={1} top={30} left={22} rot={-12}/>
                <StampSVG c={ng} sessionNum={2} top={36} left={168} rot={6}/>
                <Seal c={ng} top={158} left={36} rot={-3}/>
                <CodeBg code="NG"/>
                <MRZ/>
              </Page>
            </div>

            {/* ─── SPREAD 5: INDIA — Info + Stamps ─── */}
            <div className="wow-sp" style={{ opacity:spread===5?1:0, pointerEvents:spread===5?"all":"none" }}>
              <CountryPage c={india} isLeft={true} partial={true}/>
              <Spine/>
              <Page isLeft={false}>
                <Pnum n={10} isLeft={false}/>
                <StampSVG c={india} sessionNum={1} top={28} left={24} rot={9}/>
                {!dropped ? (
                  <div style={{ position:"absolute", top:148, left:136,
                    transform:"rotate(-5deg)", width:84, height:84, opacity:0.36 }}>
                    <svg width="84" height="84" viewBox="0 0 84 84">
                      <defs><path id="ipend" d="M 8,42 A 34,34 0 0,0 76,42"/></defs>
                      <circle cx="42" cy="42" r="38" fill="none" stroke={india.inkB} strokeWidth="2" strokeDasharray="5 3"/>
                      <circle cx="42" cy="42" r="31" fill="none" stroke={india.inkB} strokeWidth="1" strokeDasharray="3 2"/>
                      <text x="42" y="34" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="7" fill={india.inkB} letterSpacing="1">UPCOMING</text>
                      <text x="42" y="46" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="7.5" fontWeight="700" fill={india.inkB}>{india.code}</text>
                      <text fontFamily="Jost,sans-serif" fontSize="5.2" fill={india.inkB} letterSpacing="1">
                        <textPath href="#ipend" startOffset="50%" textAnchor="middle">SESSION II · 10 AUG 2025</textPath>
                      </text>
                    </svg>
                  </div>
                ) : (
                  <StampSVG c={india} sessionNum={2} top={148} left={136} rot={-5} anim={true}/>
                )}
                <div style={{ position:"absolute", bottom:34, left:8, right:8 }}>
                  <div style={{ border:`1px dashed ${india.inkB}`, background:india.inkL,
                    padding:"5px 8px", opacity:0.78 }}>
                    <div style={{ fontFamily:"Jost,sans-serif", fontSize:7, letterSpacing:"0.12em",
                      color:india.ink, marginBottom:2 }}>INDIA · IN PROGRESS</div>
                    <div style={{ fontFamily:"Special Elite,cursive", fontSize:8.5, color:india.ink }}>
                      {dropped?"Session II stamped — journey sealed.":"Session II pending · 10 Aug 2025"}
                    </div>
                  </div>
                </div>
                <CodeBg code="IN"/>
                <MRZ/>
              </Page>
            </div>

            {/* ─── SPREAD 6: JOURNEY OVERVIEW ─── */}
            <div className="wow-sp" style={{ opacity:spread===6?1:0, pointerEvents:spread===6?"all":"none" }}>
              <Page isLeft={true}>
                <div style={{ height:68, background:"#1B3D2A", display:"flex",
                  flexDirection:"column", justifyContent:"center", padding:"10px 13px" }}>
                  <div style={{ fontFamily:"Playfair Display,serif", fontSize:15, fontWeight:700,
                    color:"#C9A052", letterSpacing:"0.05em" }}>Journey Overview</div>
                  <div style={{ fontFamily:"Jost,sans-serif", fontSize:7.5, letterSpacing:"0.2em",
                    color:"rgba(201,160,82,0.44)", marginTop:3 }}>SARAH CHEN · {MEMBER.num}</div>
                </div>
                <div style={{ padding:"12px 13px", display:"flex", flexDirection:"column", gap:9 }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:5 }}>
                    {[{n:"03",l:"Completed"},{n:"01",l:"In Progress"},{n:"07",l:"Sessions"},{n:"06",l:"Stamps"}].map(s=>(
                      <div key={s.l} style={{ textAlign:"center", padding:"8px 4px", background:"rgba(0,0,0,0.027)" }}>
                        <div style={{ fontFamily:"Playfair Display,serif", fontSize:26, fontWeight:900,
                          color:"#633806", lineHeight:1 }}>{s.n}</div>
                        <div style={{ fontFamily:"Jost,sans-serif", fontSize:6.5, letterSpacing:"0.1em",
                          color:"rgba(0,0,0,0.36)", textTransform:"uppercase", marginTop:2 }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontFamily:"Jost,sans-serif", fontSize:7, letterSpacing:"0.18em",
                      color:"rgba(0,0,0,0.3)", textTransform:"uppercase", marginBottom:6 }}>Countries Explored</div>
                    {C.map(ct=>(
                      <div key={ct.id} style={{ display:"flex", alignItems:"center",
                        justifyContent:"space-between", padding:"4px 0",
                        borderBottom:"0.5px solid rgba(0,0,0,0.06)" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                          <div style={{ width:8, height:8, borderRadius:"50%", background:ct.inkB, flexShrink:0 }}/>
                          <div style={{ fontFamily:"Jost,sans-serif", fontSize:9.5,
                            color:"var(--color-text-primary,#1a1a1a)" }}>{ct.flag} {ct.name}</div>
                        </div>
                        <div style={{ fontFamily:"Jost,sans-serif", fontSize:7.5,
                          color:"rgba(0,0,0,0.38)", letterSpacing:"0.04em" }}>
                          {ct.complete?"✓ Complete":"● Progress"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <MRZ/>
                <Pnum n={12} isLeft={true}/>
              </Page>
              <Spine/>
              <div style={{ width:PW, height:PH, flexShrink:0, background:"#1B3D2A",
                display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                gap:12, padding:"28px 20px", position:"relative",
                boxShadow:"inset 3px 0 12px rgba(0,0,0,0.22)" }}>
                <div style={{ position:"absolute", inset:9, border:"1px solid rgba(201,160,82,0.1)", pointerEvents:"none" }}/>
                <svg width="40" height="40" viewBox="0 0 100 100" opacity="0.3">
                  <circle cx="50" cy="50" r="46" fill="none" stroke="#C9A052" strokeWidth="1.5"/>
                  <circle cx="50" cy="50" r="39" fill="none" stroke="#C9A052" strokeWidth="1"/>
                  <ellipse cx="50" cy="50" rx="16" ry="34" fill="none" stroke="#C9A052" strokeWidth="0.9"/>
                  <ellipse cx="50" cy="50" rx="34" ry="13" fill="none" stroke="#C9A052" strokeWidth="0.7"/>
                  <text x="50" y="54" textAnchor="middle" dominantBaseline="middle"
                    fontFamily="Playfair Display,serif" fontSize="16" fontWeight="700" fill="#C9A052" letterSpacing="3">WOW</text>
                </svg>
                <div style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:11.5,
                  color:"rgba(201,160,82,0.46)", textAlign:"center", lineHeight:1.85, maxWidth:185 }}>
                  "More journeys await.<br/>More stories to share.<br/>More worlds to open."
                </div>
                <div style={{ width:34, height:1, background:"rgba(201,160,82,0.14)" }}/>
                <div style={{ fontFamily:"Jost,sans-serif", fontSize:7, letterSpacing:"0.24em",
                  color:"rgba(201,160,82,0.22)", textAlign:"center", lineHeight:1.9 }}>
                  WIDE OPEN WORLD<br/>GLOBAL CULTURE CLUB<br/>wideopen.world
                </div>
              </div>
            </div>

          </div>
          {/* end passport */}

          {/* Navigation */}
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <button className="wow-navbtn" disabled={spread===0} onClick={()=>setSpread(s=>Math.max(0,s-1))}>
              <ChevronLeft size={16}/>
            </button>
            <div style={{ display:"flex", gap:5, alignItems:"center" }}>
              {Array.from({length:TOTAL}).map((_,i)=>(
                <button key={i} className={`wow-dot${i===spread?" on":""}`} onClick={()=>setSpread(i)}/>
              ))}
            </div>
            <button className="wow-navbtn" disabled={spread===TOTAL-1} onClick={()=>setSpread(s=>Math.min(TOTAL-1,s+1))}>
              <ChevronRight size={16}/>
            </button>
          </div>

        </div>
        {/* end viewer */}

        {/* Actions */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center" }}>
          <button className="wow-btn accent" disabled={dropped}
            onClick={()=>{ setSpread(5); setTimeout(()=>setDropped(true),450); }}>
            {dropped?"India Session II Stamped ✓":"Demo: Drop India Session II Stamp"}
          </button>
          <button className="wow-btn" onClick={()=>setShareOpen(o=>!o)}>
            {shareOpen?"Hide Share Card":"Preview Share Card"}
          </button>
        </div>

        {/* Share card */}
        {shareOpen && (
          <div style={{ background:"var(--color-background-secondary)", borderRadius:12,
            border:"0.5px solid var(--color-border-tertiary)",
            padding:"20px", display:"flex", flexDirection:"column",
            alignItems:"center", gap:14, width:"100%" }}>
            <div style={{ fontFamily:"Jost,sans-serif", fontSize:10, letterSpacing:"0.22em",
              color:"var(--color-text-secondary)", textTransform:"uppercase" }}>Shareable Card Preview</div>
            <div style={{ background:"#1B3D2A", width:340, padding:"30px 24px 26px",
              display:"flex", flexDirection:"column", alignItems:"center", gap:11, position:"relative" }}>
              <div style={{ position:"absolute", inset:9, border:"1px solid rgba(201,160,82,0.18)", pointerEvents:"none" }}/>
              <svg width="56" height="56" viewBox="0 0 440 440" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <path id="shareA" d="M 88,220 A 132,132 0 0,1 352,220 A 132,132 0 0,1 88,220"/>
                  <path id="shareB" d="M 88,220 A 132,132 0 0,0 352,220 A 132,132 0 0,0 88,220"/>
                </defs>
                <circle cx="220" cy="220" r="160" fill="none" stroke="#C9A052" strokeWidth="3"/>
                <circle cx="220" cy="220" r="153" fill="none" stroke="#C9A052" strokeWidth="0.9" opacity="0.45"/>
                <polygon points="220,57 224,64 220,71 216,64" fill="#C9A052" opacity="0.9"/>
                <polygon points="220,369 224,376 220,383 216,376" fill="#C9A052" opacity="0.9"/>
                <polygon points="88,213 81,220 88,227 95,220" fill="#C9A052" opacity="0.95"/>
                <polygon points="352,213 345,220 352,227 359,220" fill="#C9A052" opacity="0.95"/>
                <text fontFamily="Jost,sans-serif" fontSize="13" fontWeight="500" fill="#C9A052" letterSpacing="4.5">
                  <textPath href="#shareA" startOffset="25%" textAnchor="middle">WIDE OPEN WORLD</textPath>
                </text>
                <text fontFamily="Jost,sans-serif" fontSize="11" fontWeight="400" fill="#C9A052" letterSpacing="3" dy="17">
                  <textPath href="#shareB" startOffset="25%" textAnchor="middle">A GLOBAL CULTURE CLUB</textPath>
                </text>
                <circle cx="220" cy="220" r="116" fill="none" stroke="#C9A052" strokeWidth="1.4" opacity="0.55"/>
                <circle cx="220" cy="220" r="102" fill="none" stroke="#C9A052" strokeWidth="2.4"/>
                <ellipse cx="220" cy="220" rx="102" ry="26" fill="none" stroke="#C9A052" strokeWidth="1.05" opacity="0.76"/>
                <ellipse cx="220" cy="220" rx="102" ry="52" fill="none" stroke="#C9A052" strokeWidth="0.9" opacity="0.60"/>
                <ellipse cx="220" cy="220" rx="26" ry="102" fill="none" stroke="#C9A052" strokeWidth="1.05" opacity="0.76"/>
                <ellipse cx="220" cy="220" rx="68" ry="102" fill="none" stroke="#C9A052" strokeWidth="0.9" opacity="0.60"/>
                <line x1="118" y1="220" x2="322" y2="220" stroke="#C9A052" strokeWidth="0.7" opacity="0.46"/>
                <line x1="220" y1="118" x2="220" y2="322" stroke="#C9A052" strokeWidth="0.7" opacity="0.46"/>
                <text x="220" y="225" textAnchor="middle" dominantBaseline="middle"
                  fontFamily="'Playfair Display',Georgia,serif" fontSize="46" fontWeight="700"
                  fill="#C9A052" letterSpacing="8">WOW</text>
              </svg>
              <div style={{ fontFamily:"Caveat,cursive", fontSize:30, fontWeight:700, color:"#C9A052" }}>Sarah Chen</div>
              <div style={{ display:"flex", gap:6 }}>
                {C.map(ct=>(
                  <div key={ct.id} style={{ width:38, height:38,
                    border:`2px solid ${ct.complete?ct.inkB:"rgba(201,160,82,0.2)"}`,
                    background:ct.complete?ct.inkL:"transparent",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontFamily:"Jost,sans-serif", fontSize:8, fontWeight:600,
                    color:ct.complete?ct.ink:"rgba(201,160,82,0.28)" }}>{ct.code}</div>
                ))}
              </div>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"Playfair Display,serif", fontSize:24, fontWeight:900,
                  color:"#C9A052", lineHeight:1 }}>3</div>
                <div style={{ fontFamily:"Jost,sans-serif", fontSize:7.5, letterSpacing:"0.2em",
                  color:"rgba(201,160,82,0.42)", textTransform:"uppercase" }}>Countries Explored</div>
              </div>
              <div style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:11,
                color:"rgba(201,160,82,0.4)", textAlign:"center", lineHeight:1.65, maxWidth:255 }}>
                "Reading the world, one country at a time."
              </div>
              <div style={{ fontFamily:"Jost,sans-serif", fontSize:8, letterSpacing:"0.2em",
                color:"rgba(201,160,82,0.25)", textTransform:"uppercase" }}>wideopen.world</div>
            </div>
            <div style={{ fontFamily:"Jost,sans-serif", fontSize:11,
              color:"var(--color-text-secondary)", textAlign:"center", maxWidth:320, lineHeight:1.65 }}>
              Members download this as a high-res image after each country — designed for Instagram and stories. Auto-updates with every new stamp.
            </div>
          </div>
        )}

      </div>
    </>
  );
}
