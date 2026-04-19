// Shared atoms for GE portal
const { useState, useEffect, useRef, useMemo } = React;

function Eyebrow({ children }) {
  return <div className="eyebrow">{children}</div>;
}

function Wordmark({ size = "md", className = "" }) {
  return (
    <span className={`wordmark wordmark--${size} ${className}`}>
      <span style={{ display: "block" }}>GENERAL</span>
      <span style={{ display: "block" }}>ECLECTIC</span>
    </span>
  );
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); io.disconnect(); }
    }, { threshold: 0.15 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${on ? "in" : ""}`} style={{ transitionDelay: delay + "ms" }}>
      {children}
    </div>
  );
}

function Clock() {
  const [t, setT] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const s = t.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "America/New_York" });
  return <span>{s} NYC</span>;
}

function TopBar({ page, setPage }) {
  const nav = [
    { id: "home", label: "Index" },
    { id: "apply", label: "Apply" },
    { id: "portal", label: "Portal" },
  ];
  return (
    <div className="bar">
      <div className="bar__mark" onClick={() => setPage("home")}>
        <div className="wm">
          <span>General</span>
          <span>Eclectic</span>
        </div>
        <div style={{ borderLeft: "1px solid var(--rule)", height: 28, paddingLeft: 14 }}>
          <div className="eyebrow" style={{ marginBottom: 2 }}>G.E.</div>
          <div className="code" style={{ fontSize: 9 }}>Creative Infrastructures</div>
        </div>
      </div>
      <div className="bar__nav">
        {nav.map(n => (
          <a key={n.id} className={page === n.id ? "is-active" : ""} onClick={() => setPage(n.id)}>{n.label}</a>
        ))}
      </div>
      <div className="bar__right">
        <Clock />
        <span style={{ color: "var(--signal)" }}>● LIVE</span>
        {page !== "apply" ? (
          <button className="bar__cta bar__cta--primary" onClick={() => setPage("apply")}>Apply →</button>
        ) : (
          <button className="bar__cta" onClick={() => setPage("home")}>Back</button>
        )}
      </div>
    </div>
  );
}

function Sparkline({ points }) {
  const w = 120, h = 28;
  const max = Math.max(...points), min = Math.min(...points);
  const d = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((p - min) / (max - min || 1)) * (h - 4) - 2;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <path d={d} />
    </svg>
  );
}

Object.assign(window, { Eyebrow, Wordmark, Reveal, Clock, TopBar, Sparkline });
