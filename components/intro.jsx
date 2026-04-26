// IntroOverlay — full-bleed cinematic intro reel (G.E. CREATIVE INFRASTRUCTURES style).
// 4 acts: Wordmark · The Problem · The Instrument · The Output → "Enter Site".
function IntroOverlay({ open, onClose }) {
  const TOTAL = 36; // seconds
  const ACTS = [
    { t: 0,  id: "wordmark"   },
    { t: 5,  id: "problem"    },
    { t: 12, id: "instrument" },
    { t: 20, id: "callout"    },
    { t: 25, id: "output"     },
  ];

  const [time, setTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const [closing, setClosing] = useState(false);
  const rafRef = useRef(null);
  const lastRef = useRef(performance.now());

  // ticker
  useEffect(() => {
    if (!open || paused) return;
    lastRef.current = performance.now();
    const tick = (now) => {
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;
      setTime(prev => {
        const next = prev + dt;
        if (next >= TOTAL) return TOTAL;
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [open, paused]);

  // Reset on open
  useEffect(() => {
    if (open) { setTime(0); setPaused(false); setClosing(false); }
  }, [open]);

  // Skip via ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") handleSkip(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleSkip = () => {
    setClosing(true);
    setTimeout(() => onClose && onClose(), 380);
  };

  if (!open) return null;

  // active act
  const activeAct = [...ACTS].reverse().find(a => time >= a.t)?.id || "wordmark";
  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = (s - m * 60);
    const whole = Math.floor(sec);
    const cs = Math.floor((sec - whole) * 100);
    return `${m}:${String(whole).padStart(2,"0")}.${String(cs).padStart(2,"0")}`;
  };

  return (
    <div className={`reel ${closing ? "reel--closing" : ""}`} role="dialog" aria-modal="true">
      {/* CHROME — fixed corners */}
      <div className="reel__chrome reel__chrome--tl">G.E. · CREATIVE INFRASTRUCTURES</div>
      <div className="reel__chrome reel__chrome--bl">GE · 04.2026 · INTRO V2</div>
      <div className="reel__watermark">GE</div>

      {/* THE FILM */}
      <div className="reel__stage">
        <IntroReel act={activeAct} time={time} />
      </div>

      {/* CENTER ENTER PILL — appears after wordmark */}
      {time > 2 && (
        <button className="reel__enter" onClick={handleSkip}>
          <span>Enter Site</span>
        </button>
      )}

      {/* BOTTOM CONTROLS */}
      <div className="reel__controls">
        <div className="reel__transport">
          <button className="reel__tbtn" onClick={() => setTime(0)} aria-label="Restart">
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 2v10M12 2 4 7l8 5z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
          </button>
          <button className="reel__tbtn reel__tbtn--play" onClick={() => setPaused(p => !p)} aria-label={paused ? "Play" : "Pause"}>
            {paused
              ? <svg width="12" height="14" viewBox="0 0 12 14"><path d="M1 1v12l10-6z" fill="currentColor"/></svg>
              : <svg width="10" height="14" viewBox="0 0 10 14"><path d="M1 1h2v12H1zM7 1h2v12H7z" fill="currentColor"/></svg>
            }
          </button>
          <div className="reel__time">{fmt(time)}</div>
          <div
            className="reel__bar"
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              const pct = (e.clientX - r.left) / r.width;
              setTime(Math.max(0, Math.min(TOTAL, pct * TOTAL)));
            }}
          >
            <div className="reel__bar-fill" style={{ width: `${(time / TOTAL) * 100}%` }} />
            <div className="reel__bar-knob" style={{ left: `${(time / TOTAL) * 100}%` }} />
          </div>
          <div className="reel__time reel__time--end">{fmt(TOTAL)}</div>
        </div>
        <button className="reel__skip" onClick={handleSkip}>Skip Intro <span>→</span></button>
      </div>
    </div>
  );
}

Object.assign(window, { IntroOverlay });
