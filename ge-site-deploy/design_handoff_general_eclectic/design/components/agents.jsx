// artiste.md — 10 agent prototypes
// Each agent gets its own view with distinct, interactive UI.

const AGENT_META = {
  voice: ["01", "Voice", "artiste.md / voice", "Timbre modeling. Cadence analysis. Signature phrasing. Vocal identity rendered as a living system."],
  personality: ["02", "Personality", "artiste.md / persona", "Long-horizon persona coherence. Every release, every interview, every post — reconciled against a single vector."],
  engagement: ["03", "Engagement", "artiste.md / engagement", "Fan telemetry. Who shows up, who sticks, who leaves. The honest audience read."],
  streaming: ["04", "Streaming", "artiste.md / streaming", "Platform-aware release orchestration. Payload, timing, and placement — per surface."],
  touring: ["05", "Touring", "artiste.md / touring", "Routing, markets, demand-weighted calendars. The map is always redrawing."],
  localization: ["06", "Localization", "artiste.md / localize", "Translation with cultural context. Not lossy — additive."],
  liquid: ["07", "Liquid API", "artiste.md / liquid", "An open surface for collaborators, partners, and downstream agents."],
  social: ["08", "Social Sync", "artiste.md / social", "Narrative continuity across platforms. One voice, scheduled precisely."],
  intel: ["09", "Intelligence", "artiste.md / signal", "Market read-outs, competitive context, and anomaly detection. The morning brief."],
  reports: ["10", "Reports", "artiste.md / reports", "Machine-written, human-edited. Published 06:00 ET, every weekday."],
};

function AgentView({ agentKey, caps, toggleCap, back }) {
  const [num, name, slug, desc] = AGENT_META[agentKey];
  const active = caps[agentKey];

  const Body = {
    voice: VoiceAgent,
    personality: PersonalityAgent,
    engagement: EngagementAgent,
    streaming: StreamingAgent,
    touring: TouringAgent,
    localization: LocalizationAgent,
    liquid: LiquidAgent,
    social: SocialAgent,
    intel: IntelAgent,
    reports: ReportsAgent,
  }[agentKey];

  return (
    <div className="agent">
      <button className="agent__back" onClick={back}>← artiste.md · stack</button>

      <div className="agent__head">
        <div>
          <div className="agent__slug">{num} — {slug}</div>
          <h1 className="agent__title">{name.split(" ")[0]} <em>{name.includes(" ") ? name.split(" ").slice(1).join(" ") : "agent"}.</em></h1>
          <p className="agent__sub">{desc}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
          <div className={`agent__status ${active ? "" : "off"}`}>
            ● {active ? "Active" : "Standby"}
          </div>
          <button className="btn btn--ghost" style={{ padding: "8px 12px", fontSize: 9 }} onClick={() => toggleCap(agentKey)}>
            {active ? "Deactivate" : "Activate"}
          </button>
        </div>
      </div>

      <Body />
    </div>
  );
}

/* ============ 01 — VOICE ============ */
function VoiceAgent() {
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0.12);
  const [bars, setBars] = useState(() => Array.from({length: 80}, () => 0.3 + Math.random() * 0.7));
  const [params, setParams] = useState({ timbre: 62, breath: 48, grain: 31, formant: 55, vibrato: 22 });

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setPos(p => (p + 0.004) % 1);
      setBars(b => b.map((v, i) => 0.2 + Math.abs(Math.sin(Date.now() / 140 + i * 0.3)) * 0.8));
    }, 80);
    return () => clearInterval(id);
  }, [playing]);

  const samples = [
    ["Opening State · Vrs 1", "F#m", "3:42", "MASTER"],
    ["Undertow · Vrs 2", "Cmaj", "2:51", "ROUGH"],
    ["Velvet Sermon · Demo", "Dmin", "1:34", "SKETCH"],
  ];

  return (
    <div>
      <div className="wave-box">
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 4 }}>Vocal Signature · Velour.</div>
            <div className="code">train on 14 stems · model v0.4.2 · last updated 04.17</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button className="btn btn--primary" style={{ padding: "8px 14px", fontSize: 10 }} onClick={() => setPlaying(p => !p)}>
              {playing ? "■ Pause" : "▶ Play"}
            </button>
            <button className="btn btn--ghost" style={{ padding: "8px 14px", fontSize: 10 }}>Retrain</button>
          </div>
        </div>
        <div className="wave">
          {bars.map((h, i) => (
            <div key={i} className={`wave__bar ${i / bars.length > pos ? "dim" : ""}`} style={{ height: `${h * 100}%` }}></div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
          <span className="code">0:00</span>
          <span className="code">{(pos * 222).toFixed(0)}s / 3:42</span>
        </div>
      </div>

      <div className="vbox">
        <div className="vbox__cell">
          <div className="vbox__label">Fundamental Frequency</div>
          <div className="vbox__val">184.3<span className="unit">Hz avg</span></div>
        </div>
        <div className="vbox__cell">
          <div className="vbox__label">Signature Phonemes</div>
          <div className="vbox__val">/ɛɪ/ · /oʊ/ · /ʃ/</div>
        </div>
        <div className="vbox__cell">
          <div className="vbox__label">Consistency Index</div>
          <div className="vbox__val" style={{ color: "var(--signal)" }}>94.2%</div>
        </div>
      </div>

      <h2 className="dash__h2">Model parameters</h2>
      {Object.entries(params).map(([k, v]) => (
        <div key={k} className="slider-row">
          <span className="lbl">{k}</span>
          <input type="range" min="0" max="100" value={v} onChange={e => setParams(p => ({...p, [k]: +e.target.value}))} />
          <span className="v">{v}</span>
        </div>
      ))}

      <h2 className="dash__h2" style={{ marginTop: 32 }}>Training corpus</h2>
      {samples.map(([name, key, len, tag], i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "36px 1fr 80px 80px 90px", gap: 16, padding: "12px 0", borderBottom: "1px solid var(--rule)", alignItems: "center" }}>
          <span className="code">{String(i+1).padStart(2,"0")}</span>
          <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15, letterSpacing: "-0.015em" }}>{name}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{key}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.08em" }}>{len}</span>
          <span className="track__tag">{tag}</span>
        </div>
      ))}
    </div>
  );
}

/* ============ 02 — PERSONALITY ============ */
function PersonalityAgent() {
  const axes = [
    ["Restraint", "Abandon", 34],
    ["Opaque", "Legible", 68],
    ["Warm", "Cold", 42],
    ["Literary", "Spoken", 58],
    ["Low-fi", "Cinematic", 76],
    ["Serious", "Playful", 39],
  ];
  const cx = 150, cy = 150, r = 110;
  const n = axes.length;
  const points = axes.map(([, , v], i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    const rr = (v / 100) * r;
    return [cx + rr * Math.cos(angle), cy + rr * Math.sin(angle)];
  });
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ") + " Z";

  const [drift, setDrift] = useState([
    ["2024 · Debut EP", 42, 55, 38],
    ["2025 · Catalog cycle", 38, 61, 40],
    ["2026 · Current vector", 34, 68, 42],
  ]);

  return (
    <div>
      <div className="radar-box">
        <svg viewBox="0 0 300 300">
          {[0.25, 0.5, 0.75, 1].map(f => (
            <polygon key={f}
              points={axes.map((_, i) => {
                const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
                return `${cx + r * f * Math.cos(angle)},${cy + r * f * Math.sin(angle)}`;
              }).join(" ")}
              fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          ))}
          {axes.map((_, i) => {
            const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
            return <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(angle)} y2={cy + r * Math.sin(angle)} stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />;
          })}
          <path d={pathD} fill="#F0B429" fillOpacity="0.15" stroke="#F0B429" strokeWidth="1.4" />
          {points.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#F0B429" />)}
          {axes.map(([a, b], i) => {
            const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
            const lx = cx + (r + 18) * Math.cos(angle);
            const ly = cy + (r + 18) * Math.sin(angle);
            return (
              <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
                fontFamily="IBM Plex Mono" fontSize="8" letterSpacing="1" fill="rgba(255,255,255,0.6)">
                {b.toUpperCase()}
              </text>
            );
          })}
        </svg>
        <div>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Current Persona Vector</div>
          <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 22, lineHeight: 1.3, marginBottom: 20, color: "var(--ink)" }}>
            Restrained, legible, low-fi-adjacent. The work is confident without being loud. Warmth held at arm's length.
          </div>
          <div className="code" style={{ marginBottom: 6 }}>COHERENCE · 87% (high)</div>
          <div className="code" style={{ color: "var(--signal)" }}>DRIFT · 4.2% over 18 months (acceptable)</div>
        </div>
      </div>

      <h2 className="dash__h2">Vector drift · timeline</h2>
      <div style={{ borderTop: "1px solid var(--rule)" }}>
        {drift.map(([era, a, b, c], i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "180px 1fr 1fr 1fr", gap: 20, padding: "14px 0", borderBottom: "1px solid var(--rule)", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13, letterSpacing: "-0.01em" }}>{era}</span>
            {[a, b, c].map((v, j) => (
              <div key={j}>
                <div style={{ height: 3, background: "var(--rule)", position: "relative" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: v + "%", background: "var(--gold)" }}></div>
                </div>
                <div className="code" style={{ fontSize: 10, marginTop: 6 }}>{["Restraint", "Legible", "Warm"][j]} · {v}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ 03 — ENGAGEMENT ============ */
function EngagementAgent() {
  const cohorts = [
    ["Core loyalists", 8420, 86, 92],
    ["Post-EP adopters", 14880, 68, 71],
    ["Playlist surfers", 24100, 42, 38],
    ["Algorithmic drift-ins", 52700, 18, 14],
    ["College radio cohort", 3180, 74, 82],
    ["Berlin surge", 1240, 64, 88],
    ["Dormant · 90d+", 8920, 0, 0],
  ];
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <div className="vbox">
        <div className="vbox__cell"><div className="vbox__label">Monthly listeners</div><div className="vbox__val">142,880</div></div>
        <div className="vbox__cell"><div className="vbox__label">Active / dormant</div><div className="vbox__val">61<span className="unit">%</span> <span style={{ color: "var(--ink-3)", fontWeight: 500 }}>/ 39<span className="unit">%</span></span></div></div>
        <div className="vbox__cell"><div className="vbox__label">Median save rate</div><div className="vbox__val" style={{ color: "var(--signal)" }}>28.4<span className="unit" style={{ color: "var(--ink-3)" }}>%</span></div></div>
      </div>

      <h2 className="dash__h2">Fan cohorts</h2>
      <div style={{ borderTop: "1px solid var(--rule)" }}>
        {cohorts.map(([name, count, ret, save], i) => (
          <div key={name} className="cohort" onClick={() => setSelected(i)} style={{ background: selected === i ? "var(--bg-2)" : "transparent", cursor: "pointer" }}>
            <div className="cohort__name">{name}</div>
            <div className="cohort__bar"><div className="cohort__fill" style={{ width: ret + "%" }}></div></div>
            <div className="cohort__count">{count.toLocaleString()}</div>
            <div className="cohort__save" style={{ color: save > 0 ? "var(--signal)" : "var(--ink-3)" }}>{save || "—"}{save ? "%" : ""}</div>
          </div>
        ))}
      </div>

      <h2 className="dash__h2" style={{ marginTop: 32 }}>Maya's read on · {cohorts[selected][0]}</h2>
      <div style={{ background: "var(--bg-2)", border: "1px solid var(--rule)", padding: "20px 24px" }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Intelligence</div>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 16, lineHeight: 1.55, color: "var(--ink-2)", margin: 0 }}>
          {[
            "The bedrock. They pre-save, they share, they travel to shows. Do not over-market to them — they already know. Reserve them for drops and rarities.",
            "Discovered you through Opening State. High save rate (71%) suggests the hook lands. Worth a gentle nurture — a b-side, a studio dispatch.",
            "Passive but wide. Low retention, but they keep the discovery algorithms warm. Treat as weather, not audience.",
            "Volume with no loyalty. Don't chase. If they convert to playlist surfers, good — if not, also fine.",
            "Median age 22. They call into shows. They want a physical format. Consider a limited cassette run.",
            "Concentrated in two neighborhoods. Either an editorial pull or a single influential DJ. Worth a 48h watch before acting.",
            "Not dead — dormant. A well-timed release can reactivate 15–25%. Don't discount them.",
          ][selected]}
        </p>
      </div>
    </div>
  );
}

/* ============ 04 — STREAMING ============ */
function StreamingAgent() {
  const [platforms, setPlatforms] = useState({
    spotify: true, apple: true, tidal: true, bandcamp: true,
    soundcloud: false, youtube: true, amazon: false, beatport: false,
  });
  const [day, setDay] = useState(15);
  const [time, setTime] = useState("09:00");

  const toggle = (k) => setPlatforms(p => ({...p, [k]: !p[k]}));

  const row = [
    ["spotify", "Spotify", "142k listeners"],
    ["apple", "Apple Music", "38k listeners"],
    ["tidal", "Tidal", "4.2k listeners"],
    ["bandcamp", "Bandcamp", "2.1k direct"],
    ["soundcloud", "SoundCloud", "18k plays"],
    ["youtube", "YouTube", "86k views"],
    ["amazon", "Amazon Music", "6.4k listeners"],
    ["beatport", "Beatport", "830 buys"],
  ];

  return (
    <div>
      <h2 className="dash__h2">Release · Opening State — target platforms</h2>
      <div className="platform-grid">
        {row.map(([k, name, meta]) => (
          <div key={k} className={`platform ${platforms[k] ? "on" : ""}`} onClick={() => toggle(k)}>
            <div className="platform__name">{name}</div>
            <div className="platform__meta">{meta}</div>
          </div>
        ))}
      </div>

      <h2 className="dash__h2">Release window · May 2026</h2>
      <div className="cal-grid">
        {Array.from({length: 28}, (_, i) => i + 1).map(d => {
          const heat = d === 2 ? 0 : d === 8 ? 3 : d === 9 ? 2 : d === 15 ? 2 : d === 22 ? 1 : d === 16 ? 1 : d === 23 ? 1 : 0;
          return (
            <div key={d} className={`cal-day heat-${heat} ${day === d ? "selected" : ""}`} onClick={() => setDay(d)}>{d}</div>
          );
        })}
      </div>
      <div className="code" style={{ marginBottom: 32 }}>
        Heatmap · Maya's optimal drop window · highest density May 8 · Friday · 00:00 ET
      </div>

      <div className="vbox">
        <div className="vbox__cell"><div className="vbox__label">Selected date</div><div className="vbox__val">MAY {String(day).padStart(2,"0")}</div></div>
        <div className="vbox__cell">
          <div className="vbox__label">Release time (ET)</div>
          <select value={time} onChange={e => setTime(e.target.value)} style={{ background: "transparent", border: "none", color: "var(--ink)", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 22, letterSpacing: "-0.02em", outline: "none" }}>
            <option>00:00</option><option>03:00</option><option>06:00</option><option>09:00</option><option>12:00</option>
          </select>
        </div>
        <div className="vbox__cell"><div className="vbox__label">Maya's confidence</div><div className="vbox__val" style={{ color: day === 8 ? "var(--signal)" : "var(--ink-2)" }}>{day === 8 ? "HIGH" : day === 15 ? "MED" : "LOW"}</div></div>
      </div>

      <button className="btn btn--primary" style={{ marginTop: 24 }}>Lock release window →</button>
    </div>
  );
}

/* ============ 05 — TOURING ============ */
function TouringAgent() {
  const stops = [
    ["London", "Village Underground", 680, "JUN 04"],
    ["Utrecht", "TivoliVredenburg", 920, "JUN 07"],
    ["Berlin", "Berghain Kantine", 780, "JUN 09"],
    ["Paris", "Le Trianon", 540, "JUN 12"],
    ["Amsterdam", "Paradiso Noord", 610, "JUN 14"],
    ["Copenhagen", "VEGA Jr.", 420, "JUN 17"],
    ["Stockholm", "Nalen", 380, "JUN 19"],
  ];
  const [order, setOrder] = useState(stops.map((_, i) => i));
  const [drag, setDrag] = useState(null);

  const move = (from, to) => {
    setOrder(o => {
      const n = [...o]; const [x] = n.splice(from, 1); n.splice(to, 0, x); return n;
    });
  };

  const total = stops.reduce((s, [, , d]) => s + d, 0);

  return (
    <div>
      <div className="vbox">
        <div className="vbox__cell"><div className="vbox__label">Total demand</div><div className="vbox__val">{total.toLocaleString()}</div></div>
        <div className="vbox__cell"><div className="vbox__label">Routing uplift</div><div className="vbox__val" style={{ color: "var(--signal)" }}>+38<span className="unit">%</span></div></div>
        <div className="vbox__cell"><div className="vbox__label">Carbon per head</div><div className="vbox__val">4.2<span className="unit">kg CO₂</span></div></div>
      </div>

      <h2 className="dash__h2">EU Leg · drag to re-route</h2>
      <div className="tour-list">
        {order.map((idx, pos) => {
          const [city, venue, demand, date] = stops[idx];
          return (
            <div key={idx} className={`tour-stop ${drag === pos ? "ghost" : ""}`}
              draggable
              onDragStart={() => setDrag(pos)}
              onDragOver={e => e.preventDefault()}
              onDrop={() => { if (drag !== null && drag !== pos) move(drag, pos); setDrag(null); }}
              onDragEnd={() => setDrag(null)}
            >
              <div className="tour-num">{String(pos + 1).padStart(2, "0")}</div>
              <div className="tour-city">{city}<span className="venue">{venue}</span></div>
              <div className="tour-demand"><strong>{demand}</strong>est. attendance</div>
              <div className="tour-demand" style={{ color: demand > 700 ? "var(--signal)" : "var(--ink-3)" }}>{demand > 700 ? "HOT" : demand > 500 ? "WARM" : "COOL"}</div>
              <div className="tour-date">{date}</div>
            </div>
          );
        })}
      </div>

      <div style={{ background: "var(--bg-2)", border: "1px solid var(--rule)", padding: "18px 22px", marginTop: 24 }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>Maya · routing note</div>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 15, lineHeight: 1.55, color: "var(--ink-2)", margin: 0, fontStyle: "italic" }}>
          Utrecht before Berlin. 38% demand uplift vs. published order. Berlin's surge is editorial-driven — let the signal compound another ten days before booking.
        </p>
      </div>
    </div>
  );
}

/* ============ 06 — LOCALIZATION ============ */
function LocalizationAgent() {
  const [src] = useState("Opening State is the first thing I wrote without flinching.");
  const locales = [
    ["ES · MX", "“Opening State” es lo primero que escribí sin titubear.", "→ adjust 'flinching' → titubear (Mexico City usage)"],
    ["FR · FR", "« Opening State » est la première chose que j'ai écrite sans broncher.", "→ 'broncher' preserves register"],
    ["DE · DE", `„Opening State" ist das Erste, was ich ohne Zögern geschrieben habe.`, "→ 'Zögern' softer than 'Zucken'"],
    ["JA · JP", "「Opening State」は、ひるまずに書いた初めての曲だ。", "→ casual copula, dropped subject per press style"],
    ["KO · KR", "《Opening State》는 움츠리지 않고 쓴 첫 곡이에요.", "→ polite -요 form for press"],
    ["PT · BR", "“Opening State” é a primeira coisa que escrevi sem hesitar.", "→ Brazilian PT; European PT swaps 'hesitar' → 'vacilar'"],
  ];
  const [edits, setEdits] = useState(locales.map(l => l[1]));

  return (
    <div>
      <div style={{ padding: "20px 24px", background: "var(--bg-2)", border: "1px solid var(--rule)", marginBottom: 24 }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Source · EN</div>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, lineHeight: 1.35, fontStyle: "italic" }}>{src}</div>
      </div>

      <h2 className="dash__h2">Localized renderings</h2>
      <div style={{ borderTop: "1px solid var(--rule)" }}>
        {locales.map(([flag, , note], i) => (
          <div key={flag} className="locale-grid">
            <div className="locale-flag">{flag}</div>
            <input className="locale-input" value={edits[i]} onChange={e => setEdits(ed => ed.map((v, j) => j === i ? e.target.value : v))} />
            <div className="code" style={{ fontSize: 10, color: "var(--ink-3)", textTransform: "none", letterSpacing: 0, fontStyle: "italic" }}>{note}</div>
            <button className="btn btn--ghost" style={{ padding: "6px 10px", fontSize: 9 }}>Approve</button>
          </div>
        ))}
      </div>

      <div className="code" style={{ marginTop: 20, color: "var(--signal)" }}>6 LOCALES · ALL APPROVED BY MAYA · 2 PENDING HUMAN REVIEW</div>
    </div>
  );
}

/* ============ 07 — LIQUID API ============ */
function LiquidAgent() {
  const [key, setKey] = useState("ge_live_v1_•••••••••_8a4f");
  const [copied, setCopied] = useState(false);
  const endpoints = [
    ["GET", "get", "/v1/artist/velour", "12ms"],
    ["GET", "get", "/v1/artist/velour/catalog", "18ms"],
    ["GET", "get", "/v1/artist/velour/signal", "24ms"],
    ["POST", "post", "/v1/artist/velour/sync-hold", "84ms"],
    ["POST", "post", "/v1/artist/velour/collab-invite", "102ms"],
    ["GET", "get", "/v1/artist/velour/royalties", "14ms"],
    ["DELETE", "del", "/v1/artist/velour/sync-hold/{id}", "64ms"],
  ];

  return (
    <div>
      <div style={{ padding: "18px 22px", background: "var(--bg-2)", border: "1px solid var(--rule)", marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 4 }}>API Key · Velour.</div>
          <div className="code" style={{ fontSize: 14, color: "var(--ink)" }}>{key}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn--ghost" style={{ padding: "8px 14px", fontSize: 10 }} onClick={() => { navigator.clipboard?.writeText(key); setCopied(true); setTimeout(() => setCopied(false), 1200); }}>
            {copied ? "✓ Copied" : "Copy"}
          </button>
          <button className="btn btn--ghost" style={{ padding: "8px 14px", fontSize: 10 }} onClick={() => setKey("ge_live_v1_•••••••••_" + Math.random().toString(16).slice(2, 6))}>Rotate</button>
        </div>
      </div>

      <h2 className="dash__h2">Example — fetch catalog</h2>
      <div className="terminal">
<span className="c"># curl request</span>{"\n"}
<span className="s">curl</span> <span className="k">-X GET</span> <span className="p">"https://api.generaleclectic.company/v1/artist/velour/catalog"</span> \{"\n"}
  <span className="k">-H</span> <span className="p">"Authorization: Bearer ge_live_v1_..."</span>{"\n\n"}
<span className="c"># response 200 OK</span>{"\n"}
{`{`}{"\n"}
{`  `}<span className="k">"artist"</span>: <span className="p">"velour"</span>,{"\n"}
{`  `}<span className="k">"releases"</span>: [{"\n"}
{`    { `}<span className="k">"id"</span>: <span className="p">"opening-state"</span>, <span className="k">"type"</span>: <span className="p">"single"</span>, <span className="k">"state"</span>: <span className="s">"live"</span> {`},`}{"\n"}
{`    { `}<span className="k">"id"</span>: <span className="p">"undertow-remix"</span>, <span className="k">"state"</span>: <span className="s">"scheduled"</span> {`},`}{"\n"}
{`    { `}<span className="k">"id"</span>: <span className="p">"the-infinite-age"</span>, <span className="k">"type"</span>: <span className="p">"ep"</span> {`}`}{"\n"}
{`  ],`}{"\n"}
{`  `}<span className="k">"dynamic_index"</span>: <span className="s">68</span>{"\n"}
{`}`}
      </div>

      <h2 className="dash__h2">Endpoints</h2>
      <div style={{ borderTop: "1px solid var(--rule)" }}>
        {endpoints.map(([method, mc, path, lat], i) => (
          <div key={i} className="endpoint-row">
            <span className={`endpoint-method ${mc}`}>{method}</span>
            <span className="endpoint-path">{path}</span>
            <span className="endpoint-latency">{lat}</span>
            <button className="btn btn--ghost" style={{ padding: "4px 10px", fontSize: 9 }}>Try it →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ 08 — SOCIAL SYNC ============ */
function SocialAgent() {
  const [draft, setDraft] = useState("Opening State drops this Friday. Mastered on cassette tape. No video. No single art yet — coming when it's ready.");
  const [scheduled, setScheduled] = useState([
    { platform: "Instagram", time: "APR 22 · 18:00 ET", body: "Opening State — Friday. One image, one caption, no hype." },
    { platform: "Twitter / X", time: "APR 22 · 18:00 ET", body: "opening state drops friday. mastered on tape." },
    { platform: "TikTok", time: "APR 23 · 21:00 ET", body: "15s clip · vocal outro · caption: 'this is the one i didn't flinch on'" },
    { platform: "Newsletter", time: "APR 23 · 09:00 ET", body: "Short dispatch. Context, lyric sheet, pre-save link." },
  ]);

  return (
    <div>
      <h2 className="dash__h2">Master message</h2>
      <div style={{ background: "var(--bg-2)", border: "1px solid var(--rule)", padding: "18px 22px", marginBottom: 24 }}>
        <textarea
          className="field__textarea"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          style={{ background: "transparent", border: "none", padding: 0, fontSize: 17, minHeight: 70, color: "var(--ink)" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--rule)" }}>
          <span className="code">{draft.length} chars · Maya will adapt per platform</span>
          <button className="btn btn--primary" style={{ padding: "8px 14px", fontSize: 10 }}>Regenerate variants</button>
        </div>
      </div>

      <h2 className="dash__h2">Scheduled posts</h2>
      {scheduled.map((p, i) => (
        <div key={i} className="post-card">
          <div className="post-card__top">
            <span className="post-card__platform">{p.platform}</span>
            <span className="post-card__time">{p.time}</span>
          </div>
          <div className="post-card__body">{p.body}</div>
          <div className="post-card__meta">
            <span>Draft</span>
            <span style={{ color: "var(--signal)" }}>● Queued</span>
            <span style={{ marginLeft: "auto", cursor: "pointer", color: "var(--ink-2)" }}>Edit</span>
            <span style={{ cursor: "pointer", color: "var(--ink-2)" }}>Unschedule</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============ 09 — INTELLIGENCE ============ */
function IntelAgent() {
  const [filter, setFilter] = useState("all");
  const all = [
    ["anomaly", "Berlin · Undertow spike", "4× play velocity across two editorial playlists. Curator likely Anja Schneider's desk. Hold remix 10d."],
    ["competitive", "Adjacent · Claire Rousay", "New release 'before and after' performing +62% vs. her Q1 average. Overlap audience 31%. Worth watching."],
    ["market", "Sync · A24 cluster", "A24 moodboarding three 2026 features around 'quiet devastation' aesthetic. Three agencies circling. Our asset in the mix."],
    ["anomaly", "SF · dormant reactivation", "847 dormant listeners returned in 72h. No campaign ran. Possible Letterboxd or Are.na pull. Investigating."],
    ["competitive", "Adjacent · Phoebe Bridgers", "Silent for 14 months. Pre-release chatter beginning. If she drops Q3, avoid window ±3 weeks."],
    ["market", "Format · cassette revival", "Vinyl plateaued; cassette up 34% YoY for indie labels. Velour. EP candidate for limited cassette (400 units)."],
    ["anomaly", "Tokyo · college radio", "J-Wave spinning Opening State twice in 48h. Unusual — no sync fee triggered. Reaching out to programmer."],
  ];
  const items = filter === "all" ? all : all.filter(r => r[0] === filter);

  return (
    <div>
      <div className="chip-row" style={{ marginBottom: 24 }}>
        {[["all", "All signal"], ["anomaly", "Anomalies"], ["competitive", "Competitive"], ["market", "Market"]].map(([k, l]) => (
          <button key={k} className={`chip ${filter === k ? "is-on" : ""}`} onClick={() => setFilter(k)}>{l}</button>
        ))}
      </div>

      {items.map(([cat, title, body], i) => (
        <div key={i} className="intel-card">
          <div className="intel-card__eyebrow">{cat.toUpperCase()} · filed {["06:14", "05:48", "04:22", "03:51", "02:19", "01:04", "00:18"][i % 7]} ET</div>
          <h3 className="intel-card__title">{title}</h3>
          <p className="intel-card__body">{body}</p>
        </div>
      ))}
    </div>
  );
}

/* ============ 10 — REPORTS ============ */
function ReportsAgent() {
  const [streaming, setStreaming] = useState(false);
  const [lines, setLines] = useState([]);
  const full = [
    { strong: "Cycle 03 · Week 14 — Daily Brief", body: "" },
    { strong: "Signal is steady.", body: "Monthly listeners +4.2% w/w. Save rate stable at 28.4%. Berlin continues to surge; Tokyo worth localization attention." },
    { strong: "Tour routing finalized.", body: "EU leg re-sequenced to put Utrecht before Berlin. Net demand uplift 38%. Holds expire Friday — Ops moving today." },
    { strong: "Sync · A24.", body: "Counter-offer drafted: cold-open exclusivity capped at 90 days, fee terms unchanged. L. Bianchi reviewing end of day." },
    { strong: "Royalties.", body: "$24,810 settled and available. Continuous cadence holds. No disputes on the last 21 statements." },
    { strong: "Next 48 hours.", body: "Opening State release Friday 00:00 ET. Localization approvals for ES/FR/JP before EOD Thursday. Fan Q&A paused." },
    { strong: "Anomaly watch.", body: "SF dormant-reactivation cluster up to 847 accounts. Not attributable to campaign. Investigating via Signal desk." },
  ];

  const start = () => {
    setStreaming(true);
    setLines([]);
    let i = 0;
    const id = setInterval(() => {
      if (i >= full.length) { clearInterval(id); setStreaming(false); return; }
      setLines(l => [...l, full[i]]);
      i++;
    }, 450);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <button className="btn btn--primary" onClick={start} disabled={streaming}>
          {streaming ? "⎈ Generating..." : "▶ Generate today's brief"}
        </button>
        <button className="btn btn--ghost">Archive (48)</button>
        <button className="btn btn--ghost">Subscribe · email</button>
      </div>

      <div className="compose">
        <div className="compose__col">
          <div className="compose__head">
            <span>Maya · drafting</span>
            <span className={streaming ? "live" : ""}>{streaming ? "● LIVE" : "● IDLE"}</span>
          </div>
          {lines.map((l, i) => (
            <div key={i} className="compose__line">
              {l.strong && <strong>{l.strong}</strong>}
              {l.strong && l.body ? " " : ""}
              {l.body}
            </div>
          ))}
          {streaming && <div className="typing"><span></span><span></span><span></span></div>}
        </div>
        <div className="compose__col compose__col--draft">
          <div className="compose__head">
            <span>Editor · Ines Okafor</span>
            <span>Pending review</span>
          </div>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: 14, lineHeight: 1.55, color: "var(--ink-2)", margin: "0 0 14px" }}>
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Editor notes will appear here once Maya's draft is complete.</em>
          </p>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: 13, lineHeight: 1.55, color: "var(--ink-3)", margin: 0 }}>
            Every brief is human-approved before it lands in your inbox. Machine-written, <em style={{ fontStyle: "italic" }}>human-edited.</em> No exceptions.
          </p>
        </div>
      </div>

      <div className="code">AUTO-PUBLISH 06:00 ET · LAST 30 BRIEFS ARCHIVED · 94% READ RATE</div>
    </div>
  );
}

Object.assign(window, { AgentView });
