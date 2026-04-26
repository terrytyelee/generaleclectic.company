// IntroReel — 4-act sequential intro film. Acts cross-fade based on `act` prop.
// Acts: wordmark / problem / instrument / callout / output
function IntroReel({ act, time }) {
  return (
    <div className="film2">
      <ActWordmark   active={act === "wordmark"} />
      <ActProblem    active={act === "problem"} />
      <ActInstrument active={act === "instrument"} time={time} />
      <ActCallout    active={act === "callout"} />
      <ActOutput     active={act === "output"} />
    </div>
  );
}

/* ── ACT 1 — WORDMARK ──────────────────────────────────────── */
function ActWordmark({ active }) {
  return (
    <div className={`act act--wordmark ${active ? "is-on" : ""}`}>
      <div className="act__col act__col--left">
        <div className="film2__eyebrow film2__eyebrow--gold">G.E. · CREATIVE INFRASTRUCTURES</div>
        <h1 className="film2__wm">
          <span className="film2__wm-l">GENERAL</span>
          <span className="film2__wm-l">ECLECTIC</span>
        </h1>
        <div className="film2__rule" />
        <div className="film2__tagline"><em>Intelligence for Artistry.</em></div>
        <div className="film2__url">GENERALECLECTIC.COMPANY</div>
      </div>
    </div>
  );
}

/* ── ACT 2 — THE PROBLEM ───────────────────────────────────── */
function ActProblem({ active }) {
  // 22 cols × 16 rows of tiny tiles. Most white, some grey, a few gold.
  const COLS = 22, ROWS = 16;
  const tiles = useMemo(() => {
    const out = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const seed = (r * 7 + c * 13) % 17;
        let kind = "tile";
        if (seed === 3 || seed === 11) kind = "tile tile--grey";
        // Sparse gold accents
        if ((r === 0 && c === 19) || (r === 6 && c === 1) || (r === 6 && c === 12) ||
            (r === 12 && c === 5) || (r === 12 && c === 13) || (r === 14 && c === 20)) {
          kind = "tile tile--gold";
        }
        out.push({ r, c, kind });
      }
    }
    return out;
  }, []);

  return (
    <div className={`act act--problem ${active ? "is-on" : ""}`}>
      <div className="act__col act__col--left">
        <div className="film2__chapter">02 · THE PROBLEM</div>
        <h2 className="film2__h">
          <span className="film2__h-num">100,000</span>
          <span><em className="film2__h-em">songs</em> today.</span>
        </h2>
        <p className="film2__sub"><em>Almost none of them will be heard.</em></p>
      </div>
      <div className="act__col act__col--right">
        <div className="grid">
          {tiles.map((t, i) => (
            <span
              key={i}
              className={t.kind}
              style={{ animationDelay: `${(t.r * COLS + t.c) * 4}ms` }}
            />
          ))}
        </div>
        <div className="grid__caption">FIG. A — DAILY RELEASE VOLUME, DSP INDEX</div>
      </div>
    </div>
  );
}

/* ── ACT 3 — THE INSTRUMENT (MAYA) ─────────────────────────── */
function ActInstrument({ active, time }) {
  const SIGNALS = [
    { num: "01", label: "Trend velocity",     target: 94, color: "gold" },
    { num: "02", label: "Audience sentiment", target: 71, color: "gold" },
    { num: "03", label: "Sound adjacency",    target: 86, color: "gold" },
    { num: "04", label: "Release timing",     target: 63, color: "green" },
    { num: "05", label: "Cultural gap",       target: 82, color: "green" },
  ];
  // Reveal one bar at a time over the act duration
  const t = Math.max(0, time - 12); // 12s = act start
  return (
    <div className={`act act--instrument ${active ? "is-on" : ""}`}>
      <div className="act__col act__col--left">
        <div className="film2__chapter">03 · THE INSTRUMENT</div>
        <h2 className="film2__h film2__h--maya">MAYA<span className="film2__h-dot">.</span></h2>
        <div className="film2__sub2">An <em>LLM</em> of popularity.</div>
        <p className="film2__body"><em>Trained on what makes culture move — and applied to every decision we make.</em></p>
      </div>
      <div className="act__col act__col--right">
        <div className="signal__head">
          <span className="signal__dot" /> <span>LIVE · SIGNAL INTAKE</span>
        </div>
        <div className="signal__list">
          {SIGNALS.map((s, i) => {
            const start = i * 1.0;
            const localT = Math.max(0, Math.min(1.4, t - start)) / 1.4;
            const v = Math.round(s.target * Math.min(1, localT * 1.05));
            const visible = t > start - 0.1;
            return (
              <div key={s.num} className={`signal__row ${visible ? "is-on" : ""}`}>
                <div className="signal__lbl">
                  <span className="signal__num">{s.num}</span>
                  <span> · {s.label}</span>
                </div>
                <div className="signal__track">
                  <div className={`signal__fill signal__fill--${s.color}`} style={{ width: `${v}%` }} />
                </div>
                <div className="signal__val">{v.toFixed(1)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── ACT 3.5 — CALLOUT ─────────────────────────────────────── */
function ActCallout({ active }) {
  return (
    <div className={`act act--callout ${active ? "is-on" : ""}`}>
      <div className="act__col act__col--full">
        <div className="callout">
          <span className="callout__rule" />
          <span className="callout__text">
            <em>Traditional A&amp;R is instinct.</em>{" "}
            <em className="callout__gold">MAYA is instinct with a hundred million data points behind it.</em>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── ACT 4 — THE OUTPUT (HITS.) ────────────────────────────── */
function ActOutput({ active }) {
  const ROWS = [
    { lbl: "WHO",   txt: "to sign." },
    { lbl: "WHAT",  txt: "to release." },
    { lbl: "WHEN",  txt: "to drop it." },
    { lbl: "WHERE", txt: "to aim." },
  ];
  return (
    <div className={`act act--output ${active ? "is-on" : ""}`}>
      <div className="act__col act__col--left">
        <div className="film2__chapter">04 · THE OUTPUT</div>
        <h2 className="film2__h film2__h--white">She tells us</h2>
        <div className="rows">
          {ROWS.map((r, i) => (
            <div key={r.lbl} className="rows__row" style={{ animationDelay: `${i * 0.18 + 0.3}s` }}>
              <span className="rows__lbl">{r.lbl}</span>
              <span className="rows__txt"><em>{r.txt}</em></span>
            </div>
          ))}
        </div>
      </div>
      <div className="act__col act__col--right act__col--hits">
        <div className="hits__lbl">RESULT</div>
        <div className="hits__word">HITS<span className="hits__dot">.</span></div>
      </div>
    </div>
  );
}

Object.assign(window, { IntroReel, ActWordmark, ActProblem, ActInstrument, ActCallout, ActOutput });
