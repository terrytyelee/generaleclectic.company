// scenes.jsx — General Eclectic intro video scenes
// Thesis: a label that uses MAYA to make hits.

// ─────────────────────────────────────────────────────────────────────────────
// Brand tokens
// ─────────────────────────────────────────────────────────────────────────────
const GE = {
  green:      '#1B4332',
  greenDeep:  '#143328',
  gold:       '#F0B429',
  goldLight:  '#F5CC5E',
  white:      '#FFFFFF',
  black:      '#0A0A0A',
  gray:       '#9CA3AF',
  signal:     '#34D399',
  sans:       '"IBM Plex Sans", system-ui, sans-serif',
  serif:      '"IBM Plex Serif", Georgia, serif',
  mono:       '"IBM Plex Mono", ui-monospace, monospace',
};

// ─────────────────────────────────────────────────────────────────────────────
// Shared chrome — eyebrow + watermark + frame + timestamp meta
// ─────────────────────────────────────────────────────────────────────────────
function BrandChrome() {
  const t = useTime();
  const eyebrowOpacity = animate({ from: 0, to: 1, start: 0.3, end: 1.1, ease: Easing.easeOutCubic })(t);
  const watermarkOpacity = animate({ from: 0, to: 0.045, start: 0.8, end: 1.8 })(t);
  // Hide chrome during final wordmark reveal — it has its own eyebrow
  const chromeOut = animate({ from: 1, to: 0, start: 26.8, end: 27.6, ease: Easing.easeInCubic })(t);

  return (
    <React.Fragment>
      <div style={{
        position: 'absolute', top: 64, left: 96,
        fontFamily: GE.sans, fontWeight: 600, fontSize: 18,
        letterSpacing: '0.22em', color: GE.gold, textTransform: 'uppercase',
        opacity: eyebrowOpacity * chromeOut,
      }}>
        G.E. <span style={{opacity: 0.55}}>·</span> Creative Infrastructures
      </div>

      <div style={{
        position: 'absolute', right: 72, bottom: 56,
        fontFamily: GE.sans, fontWeight: 800, fontSize: 240,
        letterSpacing: '-0.06em', lineHeight: 0.85,
        color: GE.white, opacity: watermarkOpacity * chromeOut,
        pointerEvents: 'none',
      }}>
        GE
      </div>

      <div style={{
        position: 'absolute', inset: 36,
        border: `1px solid rgba(255,255,255,0.06)`,
        opacity: chromeOut,
        pointerEvents: 'none',
      }}/>

      <div style={{
        position: 'absolute', left: 96, bottom: 56,
        fontFamily: GE.mono, fontSize: 12,
        letterSpacing: '0.12em',
        color: 'rgba(255,255,255,0.45)',
        textTransform: 'uppercase',
        opacity: chromeOut,
      }}>
        GE · 04.2026 · INTRO v2
      </div>
    </React.Fragment>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Scene 01 — OPEN (0 → 4s)
// "A record label." Plain. Declarative.
// ─────────────────────────────────────────────────────────────────────────────
function SceneOpen() {
  return (
    <Sprite start={0} end={4.2}>
      {({ localTime }) => {
        const ruleH = animate({ from: 0, to: 140, start: 0.4, end: 1.3, ease: Easing.easeOutExpo })(localTime);
        const ruleOpacity = animate({ from: 0, to: 1, start: 0.4, end: 0.9 })(localTime);
        const exitFade = animate({ from: 1, to: 0, start: 3.6, end: 4.2, ease: Easing.easeInCubic })(localTime);

        const word = (delay) => {
          const enter = animate({ from: 0, to: 1, start: delay, end: delay + 0.55, ease: Easing.easeOutCubic })(localTime);
          const ty = (1 - enter) * 14;
          return { opacity: enter * exitFade, transform: `translateY(${ty}px)` };
        };

        const capIn = animate({ from: 0, to: 1, start: 2.4, end: 3.0, ease: Easing.easeOutCubic })(localTime);

        return (
          <div style={{ position: 'absolute', left: 96, top: 300, opacity: exitFade }}>
            <div style={{
              position: 'absolute', left: 0, top: -60,
              width: 2, height: ruleH,
              background: GE.gold, opacity: ruleOpacity,
            }}/>

            <div style={{ marginLeft: 28 }}>
              <div style={{
                fontFamily: GE.sans, fontWeight: 600, fontSize: 16,
                letterSpacing: '0.22em', color: GE.gold,
                textTransform: 'uppercase', marginBottom: 44,
                ...word(1.0),
              }}>
                01 · First Principle
              </div>

              <div style={{
                fontFamily: GE.sans, fontWeight: 800, fontSize: 148,
                letterSpacing: '-0.045em', lineHeight: 0.92, color: GE.white,
              }}>
                <div style={word(1.3)}>A record</div>
                <div style={word(1.7)}>
                  <span style={{ fontFamily: GE.serif, fontWeight: 400, fontStyle: 'italic', color: GE.goldLight }}>
                    label.
                  </span>
                </div>
              </div>

              <div style={{
                fontFamily: GE.serif, fontStyle: 'italic',
                fontSize: 28, color: 'rgba(255,255,255,0.7)',
                marginTop: 44, maxWidth: 860,
                opacity: capIn * exitFade,
              }}>
                We sign artists. We release music. We build careers.
              </div>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Scene 02 — THE PROBLEM (4 → 9s)
// "100,000 songs uploaded today." A grid of tracks, most fade to nothing.
// ─────────────────────────────────────────────────────────────────────────────
function SceneProblem() {
  // Deterministic grid
  const GRID_COLS = 40;
  const GRID_ROWS = 18;
  const cells = React.useMemo(() => {
    const rng = (seed) => {
      let s = seed;
      return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    };
    const r = rng(1337);
    const out = [];
    for (let i = 0; i < GRID_COLS * GRID_ROWS; i++) {
      out.push({ delay: r() * 1.2, fadeDelay: 2.0 + r() * 1.8, hit: r() < 0.006 });
    }
    return out;
  }, []);

  return (
    <Sprite start={4} end={9.3}>
      {({ localTime }) => {
        const titleIn = animate({ from: 0, to: 1, start: 0.2, end: 0.9, ease: Easing.easeOutCubic })(localTime);
        const exitFade = animate({ from: 1, to: 0, start: 4.6, end: 5.3, ease: Easing.easeInCubic })(localTime);

        const gridLeft = 820;
        const gridTop = 240;
        const gridW = 980;
        const gridH = 600;
        const cellW = gridW / GRID_COLS;
        const cellH = gridH / GRID_ROWS;

        return (
          <div style={{ position: 'absolute', inset: 0, opacity: exitFade }}>
            {/* Left copy */}
            <div style={{
              position: 'absolute', left: 96, top: 300,
              opacity: titleIn, transform: `translateY(${(1 - titleIn) * 10}px)`,
            }}>
              <div style={{
                fontFamily: GE.mono, fontSize: 14, letterSpacing: '0.22em',
                color: GE.gold, textTransform: 'uppercase', marginBottom: 32,
              }}>
                02 · The Problem
              </div>
              <div style={{
                fontFamily: GE.sans, fontWeight: 800,
                fontSize: 108, letterSpacing: '-0.04em', lineHeight: 0.92,
                color: GE.white,
              }}>
                100,000<br/>
                <span style={{ fontFamily: GE.serif, fontWeight: 400, fontStyle: 'italic', color: GE.goldLight }}>
                  songs
                </span> today.
              </div>
              <div style={{
                fontFamily: GE.serif, fontStyle: 'italic', fontSize: 26,
                color: 'rgba(255,255,255,0.7)', marginTop: 36, maxWidth: 620,
              }}>
                Almost none of them will be heard.
              </div>
            </div>

            {/* Right: grid of tracks, most fade out, a few stay gold */}
            <div style={{
              position: 'absolute', left: gridLeft, top: gridTop,
              width: gridW, height: gridH,
            }}>
              {cells.map((c, i) => {
                const row = Math.floor(i / GRID_COLS);
                const col = i % GRID_COLS;
                const enter = animate({ from: 0, to: 1, start: c.delay, end: c.delay + 0.3, ease: Easing.easeOutCubic })(localTime);
                const fade = c.hit
                  ? 1
                  : animate({ from: 1, to: 0.06, start: c.fadeDelay, end: c.fadeDelay + 1.0, ease: Easing.easeInCubic })(localTime);
                const color = c.hit ? GE.gold : GE.white;
                const barH = 4 + (i * 7 % 11);
                return (
                  <div key={i} style={{
                    position: 'absolute',
                    left: col * cellW + 2,
                    top: row * cellH + (cellH - barH) / 2,
                    width: cellW - 4,
                    height: barH,
                    background: color,
                    opacity: enter * fade,
                    boxShadow: c.hit && localTime > 3.5 ? `0 0 16px ${GE.gold}` : 'none',
                  }}/>
                );
              })}
            </div>

            {/* Label under grid */}
            <div style={{
              position: 'absolute', left: gridLeft, top: gridTop + gridH + 24,
              fontFamily: GE.mono, fontSize: 12, letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase',
              opacity: titleIn,
            }}>
              Fig. A — Daily release volume, DSP index
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Scene 03 — MAYA (9 → 18s)
// "We built MAYA." LLM of popularity — live signal intake.
// ─────────────────────────────────────────────────────────────────────────────
function SceneMAYA() {
  return (
    <Sprite start={9.1} end={18.2}>
      {({ localTime }) => {
        const titleIn = animate({ from: 0, to: 1, start: 0.3, end: 1.0, ease: Easing.easeOutCubic })(localTime);
        const defIn = animate({ from: 0, to: 1, start: 1.1, end: 1.8, ease: Easing.easeOutCubic })(localTime);

        const streams = [
          { label: '01 · Trend velocity',     start: 1.9, val: 0.94, signal: false },
          { label: '02 · Audience sentiment', start: 2.3, val: 0.71, signal: false },
          { label: '03 · Sound adjacency',    start: 2.7, val: 0.86, signal: true  },
          { label: '04 · Release timing',     start: 3.1, val: 0.63, signal: false },
          { label: '05 · Cultural gap',       start: 3.5, val: 0.82, signal: true  },
        ];

        const quoteIn = animate({ from: 0, to: 1, start: 6.0, end: 6.8, ease: Easing.easeOutCubic })(localTime);
        const exitFade = animate({ from: 1, to: 0, start: 8.4, end: 9.1, ease: Easing.easeInCubic })(localTime);

        return (
          <div style={{ position: 'absolute', inset: 0, opacity: exitFade }}>
            <div style={{
              position: 'absolute', left: 96, top: 280,
              opacity: titleIn, transform: `translateY(${(1 - titleIn) * 10}px)`,
            }}>
              <div style={{
                fontFamily: GE.mono, fontSize: 14, letterSpacing: '0.22em',
                color: GE.gold, textTransform: 'uppercase', marginBottom: 28,
              }}>
                03 · The Instrument
              </div>
              <div style={{
                fontFamily: GE.sans, fontWeight: 800,
                fontSize: 172, letterSpacing: '-0.05em', lineHeight: 0.9,
                color: GE.gold,
              }}>
                MAYA.
              </div>
              <div style={{
                fontFamily: GE.sans, fontWeight: 700,
                fontSize: 38, color: GE.white,
                marginTop: 24, letterSpacing: '-0.01em',
              }}>
                An <span style={{ fontFamily: GE.serif, fontWeight: 400, fontStyle: 'italic', color: GE.goldLight }}>LLM</span> of popularity.
              </div>
              <div style={{
                fontFamily: GE.serif, fontStyle: 'italic',
                fontSize: 24, color: 'rgba(255,255,255,0.68)',
                marginTop: 28, maxWidth: 640,
                opacity: defIn,
              }}>
                Trained on what makes culture move — and applied to every decision we make.
              </div>
            </div>

            {/* Signal streams */}
            <div style={{ position: 'absolute', right: 140, top: 300, width: 580 }}>
              <div style={{
                fontFamily: GE.mono, fontSize: 12, letterSpacing: '0.18em',
                color: GE.signal, textTransform: 'uppercase', marginBottom: 22,
                opacity: titleIn,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{
                  display: 'inline-block', width: 8, height: 8,
                  borderRadius: 4, background: GE.signal,
                  boxShadow: `0 0 10px ${GE.signal}`,
                }}/>
                Live · Signal Intake
              </div>
              {streams.map((s, i) => {
                const rowIn = animate({ from: 0, to: 1, start: s.start, end: s.start + 0.4, ease: Easing.easeOutCubic })(localTime);
                const barFill = animate({ from: 0, to: s.val, start: s.start + 0.2, end: s.start + 0.9, ease: Easing.easeOutExpo })(localTime);
                return (
                  <div key={i} style={{
                    opacity: rowIn,
                    transform: `translateY(${(1 - rowIn) * 8}px)`,
                    padding: '14px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{
                        fontFamily: GE.sans, fontSize: 15, fontWeight: 500,
                        color: 'rgba(255,255,255,0.85)', letterSpacing: '0.02em',
                      }}>
                        {s.label}
                      </span>
                      <span style={{
                        fontFamily: GE.mono, fontSize: 13,
                        color: s.signal ? GE.signal : GE.gold,
                        fontVariantNumeric: 'tabular-nums',
                      }}>
                        {(barFill * 100).toFixed(1)}
                      </span>
                    </div>
                    <div style={{
                      height: 2, background: 'rgba(255,255,255,0.1)',
                      position: 'relative', overflow: 'hidden',
                    }}>
                      <div style={{
                        position: 'absolute', left: 0, top: 0, bottom: 0,
                        width: `${barFill * 100}%`,
                        background: s.signal ? GE.signal : GE.gold,
                      }}/>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom quote */}
            <div style={{
              position: 'absolute', left: 96, right: 96, top: 860,
              opacity: quoteIn,
              transform: `translateY(${(1 - quoteIn) * 10}px)`,
              display: 'flex', alignItems: 'baseline', gap: 28,
            }}>
              <div style={{
                width: 60, height: 2, background: GE.gold, flexShrink: 0,
                transform: 'translateY(-8px)',
              }}/>
              <div style={{
                fontFamily: GE.serif, fontStyle: 'italic',
                fontSize: 32, color: GE.white,
                letterSpacing: '-0.005em', lineHeight: 1.25,
              }}>
                Traditional A&amp;R is instinct.
                &nbsp;<span style={{ color: GE.gold }}>MAYA is instinct with a hundred million data points behind it.</span>
              </div>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Scene 04 — HITS (18 → 27s)
// "We use her to make hits." Four signals converge on one highlighted track.
// ─────────────────────────────────────────────────────────────────────────────
function SceneHits() {
  return (
    <Sprite start={18} end={27.2}>
      {({ localTime }) => {
        const titleIn = animate({ from: 0, to: 1, start: 0.2, end: 0.9, ease: Easing.easeOutCubic })(localTime);
        const exitFade = animate({ from: 1, to: 0, start: 8.5, end: 9.2, ease: Easing.easeInCubic })(localTime);

        // Four decision outputs stagger in
        const decisions = [
          { k: 'WHO',   v: 'to sign',    start: 1.4 },
          { k: 'WHAT',  v: 'to release', start: 1.9 },
          { k: 'WHEN',  v: 'to drop it', start: 2.4 },
          { k: 'WHERE', v: 'to aim',     start: 2.9 },
        ];

        // "HITS." reveal
        const hitsIn = animate({ from: 0, to: 1, start: 4.6, end: 5.6, ease: Easing.easeOutBack })(localTime);
        const hitsGlow = animate({ from: 0, to: 1, start: 4.8, end: 6.0, ease: Easing.easeOutCubic })(localTime);

        // Confirmation line
        const chartIn = animate({ from: 0, to: 1, start: 6.4, end: 7.2, ease: Easing.easeOutCubic })(localTime);

        // Chart curve goes up
        const curveT = animate({ from: 0, to: 1, start: 6.8, end: 8.2, ease: Easing.easeOutExpo })(localTime);

        return (
          <div style={{ position: 'absolute', inset: 0, opacity: exitFade }}>
            <div style={{
              position: 'absolute', left: 96, top: 240,
              opacity: titleIn,
            }}>
              <div style={{
                fontFamily: GE.mono, fontSize: 14, letterSpacing: '0.22em',
                color: GE.gold, textTransform: 'uppercase', marginBottom: 28,
              }}>
                04 · The Output
              </div>
              <div style={{
                fontFamily: GE.sans, fontWeight: 800,
                fontSize: 82, letterSpacing: '-0.035em', lineHeight: 1.0,
                color: GE.white,
              }}>
                She tells us
              </div>
            </div>

            {/* Decisions list */}
            <div style={{
              position: 'absolute', left: 124, top: 420,
              display: 'flex', flexDirection: 'column', gap: 18,
            }}>
              {decisions.map((d, i) => {
                const rowIn = animate({ from: 0, to: 1, start: d.start, end: d.start + 0.5, ease: Easing.easeOutCubic })(localTime);
                return (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'baseline', gap: 28,
                    opacity: rowIn,
                    transform: `translateX(${(1 - rowIn) * -20}px)`,
                  }}>
                    <span style={{
                      fontFamily: GE.mono, fontSize: 16,
                      color: GE.gold, letterSpacing: '0.16em',
                      width: 88,
                    }}>
                      {d.k}
                    </span>
                    <span style={{
                      fontFamily: GE.serif, fontStyle: 'italic',
                      fontSize: 48, color: GE.white,
                      letterSpacing: '-0.005em',
                    }}>
                      {d.v}.
                    </span>
                  </div>
                );
              })}
            </div>

            {/* HITS. reveal — right side */}
            <div style={{
              position: 'absolute',
              right: 140, top: 280,
              textAlign: 'right',
            }}>
              <div style={{
                fontFamily: GE.mono, fontSize: 14, letterSpacing: '0.22em',
                color: GE.gold, textTransform: 'uppercase',
                opacity: hitsIn, marginBottom: 24,
              }}>
                Result
              </div>
              <div style={{
                fontFamily: GE.sans, fontWeight: 800,
                fontSize: 380, letterSpacing: '-0.06em', lineHeight: 0.85,
                color: GE.gold,
                opacity: hitsIn,
                transform: `scale(${0.92 + 0.08 * hitsIn})`,
                transformOrigin: 'right center',
                textShadow: `0 0 ${60 * hitsGlow}px rgba(240,180,41,${0.55 * hitsGlow})`,
              }}>
                HITS.
              </div>
            </div>

            {/* Rising curve visualization */}
            {chartIn > 0 && (
              <svg style={{
                position: 'absolute',
                right: 140, top: 720,
                width: 760, height: 220,
                opacity: chartIn,
              }} viewBox="0 0 760 220" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={GE.gold} stopOpacity="0.35"/>
                    <stop offset="100%" stopColor={GE.gold} stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {/* Baseline */}
                <line x1="0" y1="200" x2="760" y2="200" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                {(() => {
                  const pts = [
                    [0, 200], [100, 195], [180, 190], [260, 175],
                    [340, 160], [420, 130], [500, 100], [580, 70],
                    [660, 42], [760, 18],
                  ];
                  const lastIdx = Math.floor(curveT * (pts.length - 1));
                  const frac = curveT * (pts.length - 1) - lastIdx;
                  const partial = [];
                  for (let i = 0; i <= lastIdx; i++) partial.push(pts[i]);
                  if (lastIdx < pts.length - 1) {
                    const a = pts[lastIdx], b = pts[lastIdx + 1];
                    partial.push([a[0] + (b[0] - a[0]) * frac, a[1] + (b[1] - a[1]) * frac]);
                  }
                  const path = partial.map((p, i) => (i === 0 ? 'M' : 'L') + p[0] + ' ' + p[1]).join(' ');
                  const fillPath = path + ` L ${partial[partial.length-1][0]} 200 L 0 200 Z`;
                  return (
                    <React.Fragment>
                      <path d={fillPath} fill="url(#chartFill)"/>
                      <path d={path} stroke={GE.gold} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                      <circle
                        cx={partial[partial.length-1][0]}
                        cy={partial[partial.length-1][1]}
                        r="6" fill={GE.gold}/>
                    </React.Fragment>
                  );
                })()}
              </svg>
            )}

            {/* Footer caption */}
            <div style={{
              position: 'absolute', left: 124, bottom: 180,
              opacity: chartIn,
              transform: `translateY(${(1 - chartIn) * 10}px)`,
              display: 'flex', alignItems: 'baseline', gap: 20,
              maxWidth: 720,
            }}>
              <div style={{ width: 40, height: 2, background: GE.gold }}/>
              <div style={{
                fontFamily: GE.serif, fontStyle: 'italic', fontSize: 26,
                color: 'rgba(255,255,255,0.82)', lineHeight: 1.3,
              }}>
                We engineer them. Instead of hoping for them.
              </div>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Scene 05 — WORDMARK (27 → 36s)
// Canonical brand lockup. Hold on tagline.
// ─────────────────────────────────────────────────────────────────────────────
function SceneWordmark() {
  return (
    <Sprite start={27} end={36}>
      {({ localTime }) => {
        const eyebrowIn = animate({ from: 0, to: 1, start: 0.3, end: 1.0, ease: Easing.easeOutCubic })(localTime);
        const genIn = animate({ from: 0, to: 1, start: 0.7, end: 1.5, ease: Easing.easeOutExpo })(localTime);
        const eclIn = animate({ from: 0, to: 1, start: 1.1, end: 1.9, ease: Easing.easeOutExpo })(localTime);
        const dividerIn = animate({ from: 0, to: 1, start: 2.1, end: 2.9, ease: Easing.easeOutExpo })(localTime);
        const taglineIn = animate({ from: 0, to: 1, start: 2.7, end: 3.5, ease: Easing.easeOutCubic })(localTime);
        const urlIn = animate({ from: 0, to: 1, start: 3.7, end: 4.5, ease: Easing.easeOutCubic })(localTime);

        const breath = Math.sin((localTime - 2) * 0.45) * 0.003 + 1;

        return (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', paddingLeft: 160,
          }}>
            <div style={{
              fontFamily: GE.sans, fontWeight: 600,
              fontSize: 20, letterSpacing: '0.24em',
              color: GE.gold, textTransform: 'uppercase',
              opacity: eyebrowIn,
              transform: `translateY(${(1 - eyebrowIn) * 12}px)`,
              marginBottom: 48,
            }}>
              G.E. <span style={{opacity: 0.55}}>·</span> Creative Infrastructures
            </div>

            <div style={{
              fontFamily: GE.sans, fontWeight: 800,
              fontSize: 260, letterSpacing: '-0.045em',
              lineHeight: 0.88, color: GE.white,
              transform: `scale(${breath})`,
              transformOrigin: 'left center',
            }}>
              <div style={{
                opacity: genIn,
                transform: `translateY(${(1 - genIn) * 30}px)`,
              }}>GENERAL</div>
              <div style={{
                opacity: eclIn,
                transform: `translateY(${(1 - eclIn) * 30}px)`,
              }}>ECLECTIC</div>
            </div>

            <div style={{
              width: 240 * dividerIn,
              height: 2, background: GE.gold, marginTop: 44,
            }}/>

            <div style={{
              fontFamily: GE.serif, fontStyle: 'italic', fontWeight: 400,
              fontSize: 44, color: GE.gold, marginTop: 28,
              opacity: taglineIn,
              transform: `translateY(${(1 - taglineIn) * 10}px)`,
              letterSpacing: '-0.005em',
            }}>
              Intelligence for Artistry.
            </div>

            <div style={{
              fontFamily: GE.mono, fontSize: 16,
              letterSpacing: '0.16em',
              color: 'rgba(255,255,255,0.55)',
              marginTop: 44,
              opacity: urlIn,
              textTransform: 'uppercase',
            }}>
              generaleclectic.company
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// Expose scenes globally
Object.assign(window, {
  GE,
  BrandChrome,
  SceneOpen,
  SceneProblem,
  SceneMAYA,
  SceneHits,
  SceneWordmark,
});
