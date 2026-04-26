// Shared atoms — Electric Co. edition
const { useState, useEffect, useRef, useMemo } = React;

const AGENTS = [
  ["01", "Voice",    "Press releases, riders, bios — generated in your artist's voice."],
  ["02", "Persona",  "Cultivates the visual & narrative DNA of every artist on the roster."],
  ["03", "Engage",   "Auto-triages fan DMs, comments, and replies — at the artist's tone."],
  ["04", "Stream",   "Tracks DSP placements, playlist adds, skip rates in real time."],
  ["05", "Tour",     "Routes a tour around audience density, venue fit, and travel cost."],
  ["06", "Localize", "Adapts copy, art, and audio for every market the artist enters."],
  ["07", "Liquid",   "Models royalty advances, splits, and liquidity windows."],
  ["08", "Social",   "Schedules cross-platform posts at peak engagement windows."],
  ["09", "Intel",    "Watches trend velocity, cultural gaps, and adjacency opportunities."],
  ["10", "Reports",  "Compiles weekly + quarterly artist reports for label and team."],
];

const NAV = [
  { id: "home",   label: "Index" },
  { id: "roster", label: "Roster" },
  { id: "apply",  label: "Apply" },
  { id: "portal", label: "Portal" },
];

const TICKER_ITEMS = [
  ["VELOUR · Cassette", "+14%", "up"],
  ["ENS · Liner Notes", "+412", "up"],
  ["KR Sync Index", "0.68", "up"],
  ["Hit Probability", "0.74", "up"],
  ["Touring Demand · NYC", "82%", "up"],
  ["TikTok Velocity", "+412/24h", "up"],
  ["Forecast Δ", "+14%", "up"],
  ["Maya Conf.", "0.91", "up"],
  ["JP Sync · Margiela", "QUEUED", ""],
  ["Cycle 03 / 12", "ON-TRACK", ""],
];

function Clock() {
  const [t, setT] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  return <span>{t.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })} NYC</span>;
}

function HitPill() {
  const [v, setV] = useState(0.74);
  useEffect(() => {
    const id = setInterval(() => {
      setV(prev => Math.max(0.62, Math.min(0.86, prev + (Math.random() - 0.45) * 0.02)));
    }, 1700);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="tb__hit">
      <span className="pulse" />
      HIT {v.toFixed(2)}
    </span>
  );
}

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {items.map((it, i) => (
          <span key={i} className="ticker__item">
            <span className="dot" />
            <span>{it[0]}</span>
            <b className={it[2] || ""}>{it[1]}</b>
          </span>
        ))}
      </div>
    </div>
  );
}

function TopBar({ page, setPage, openDrawer }) {
  return (
    <div className="tb">
      <div className="tb__brand" onClick={() => setPage("home")}>
        <div className="tb__dot" />
        <div className="tb__name">General Eclectic</div>
      </div>
      <div className="tb__nav">
        {NAV.map(n => (
          <a key={n.id} className={page === n.id ? "is-on" : ""} onClick={() => setPage(n.id)}>{n.label}</a>
        ))}
      </div>
      <div className="tb__right">
        <HitPill />
        <span className="tb__clock"><Clock /></span>
        <button className="tb__menu" onClick={openDrawer} aria-label="Open menu">
          <span />
        </button>
      </div>
    </div>
  );
}

function Drawer({ open, onClose, page, setPage }) {
  return (
    <div className={`drawer ${open ? "is-open" : ""}`} onClick={onClose}>
      <div className="drawer__panel" onClick={e => e.stopPropagation()}>
        <div className="drawer__head">
          <div className="tb__brand">
            <div className="tb__dot" />
            <div className="tb__name">General Eclectic</div>
          </div>
          <button className="drawer__close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="drawer__nav">
          {NAV.map(n => (
            <a key={n.id} className={page === n.id ? "is-on" : ""} onClick={() => setPage(n.id)}>{n.label} →</a>
          ))}
        </div>
        <div style={{ marginTop: "auto", fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.6, paddingTop: 24 }}>
          <Clock /> · <span style={{ color: "var(--cherry)" }}>● LIVE</span>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="foot">
      <span>© 2026 G.E.C.I.</span>
      <span>DOC. GE-2026-0426</span>
      <span style={{ color: "var(--gold)" }}>● Signal Active</span>
    </div>
  );
}

function SectionHead({ children, jp }) {
  return (
    <div className="section-head">
      <span>{children}</span>
      {jp && <span className="section-head__jp">{jp}</span>}
    </div>
  );
}

/* spark-bars indicator */
function SparkBars({ count = 14, color, seed = 7 }) {
  const heights = useMemo(() => {
    let r = seed * 6151;
    const rand = () => { r = (r * 6151 + 49297) % 233280; return r / 233280; };
    return Array.from({ length: count }, () => 4 + Math.floor(rand() * 14));
  }, [count, seed]);
  return (
    <span className="spark" style={{ color }}>
      {heights.map((h, i) => <span key={i} style={{ height: h }} />)}
    </span>
  );
}

/* sparkline svg */
function Sparkline({ seed = 1, color, points = 18, trend = "up" }) {
  const data = useMemo(() => {
    const out = [];
    let v = 50;
    let r = seed * 9301;
    const rand = () => { r = (r * 9301 + 49297) % 233280; return r / 233280; };
    for (let i = 0; i < points; i++) {
      v += (rand() - 0.5) * 18 + (trend === "up" ? 1.2 : -1.2);
      v = Math.max(10, Math.min(90, v));
      out.push(v);
    }
    return out;
  }, [seed, points, trend]);
  const W = 100, H = 26;
  const stepX = W / (data.length - 1);
  const path = data.map((y, i) => `${i === 0 ? "M" : "L"} ${(i * stepX).toFixed(1)} ${(H - (y / 100) * H).toFixed(1)}`).join(" ");
  const area = `${path} L ${W} ${H} L 0 ${H} Z`;
  return (
    <svg className="sparkline" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ color }}>
      <path className="area" d={area} />
      <path d={path} />
    </svg>
  );
}

Object.assign(window, { Clock, TopBar, Drawer, Footer, SectionHead, AGENTS, NAV, Ticker, HitPill, Sparkline, SparkBars });
