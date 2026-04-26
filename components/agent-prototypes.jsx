// AgentModal + 10 working prototype demos for each A&R agent.
// Each demo is a small interactive UI that simulates what the agent does.

function AgentModal({ agent, onClose }) {
  const [n, name, desc] = agent;
  // ESC closes
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  const Demo = AGENT_DEMOS[n] || (() => <div className="agm__empty">Prototype coming soon.</div>);

  return (
    <div className="agm" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="agm__panel" onClick={(e) => e.stopPropagation()}>
        <div className="agm__head">
          <div className="agm__head-left">
            <div className="agm__num">AGENT {n}</div>
            <div className="agm__name">{name}.</div>
            <div className="agm__desc">{desc}</div>
          </div>
          <div className="agm__head-right">
            <div className="agm__live"><span className="agm__live-dot" /> LIVE PROTOTYPE</div>
            <button className="agm__close" onClick={onClose} aria-label="Close">×</button>
          </div>
        </div>
        <div className="agm__body">
          <Demo />
        </div>
        <div className="agm__foot">
          <span>GE · AGENT {n} · v0.4.{n}</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────
   PROTOTYPES — each agent gets one
   ─────────────────────────────────────────────────────────── */

/* 01 · VOICE — voice memo → formatted document */
function VoiceDemo() {
  const [mode, setMode] = useState("press");
  const [recording, setRecording] = useState(false);
  const [transcribed, setTranscribed] = useState(false);
  const [bars, setBars] = useState(Array(28).fill(0.3));

  useEffect(() => {
    if (!recording) return;
    const id = setInterval(() => {
      setBars(Array(28).fill(0).map(() => 0.2 + Math.random() * 0.8));
    }, 80);
    return () => clearInterval(id);
  }, [recording]);

  const handleStop = () => {
    setRecording(false);
    setTimeout(() => setTranscribed(true), 600);
  };

  const OUTPUTS = {
    press: {
      title: "FOR IMMEDIATE RELEASE",
      body: 'Brooklyn-based artist VELOUR. announces "Cassette," her debut full-length, out April 26th on General Eclectic. Recorded over eighteen months in a Greenpoint loft, the record threads Y2K low-bitrate texture through warm analog drum machines and her unmistakable upper register. First single "Liner Notes" arrives March 1.',
    },
    rider: {
      title: "TECHNICAL RIDER · VELOUR.",
      body: "Sound: 1× DI box (active), 1× SM58 vocal, 1× pair AKG 414 stereo overheads. Stage: 8'×6' minimum, 2 monitor wedges. Power: 2× 20A circuits. Backline: provided by artist (drum machine, MS-20, Juno-60).",
    },
    bio: {
      title: "ARTIST BIO · LONG FORM",
      body: "VELOUR. (Eliza Moreau, b. 1998) makes records that sound like memory. Raised between Montréal and New York, she trained as a film composer before turning to song. Her debut, Cassette, arrives this April. The Fader called her sound 'a haunted lullaby for the algorithm.'",
    },
  };

  return (
    <div className="vd">
      <div className="vd__rec">
        <button className={`vd__btn ${recording ? "is-rec" : ""}`} onClick={() => recording ? handleStop() : (setRecording(true), setTranscribed(false))}>
          <span className="vd__btn-dot" />
          {recording ? "Stop Recording" : transcribed ? "Re-record" : "Hold to Speak"}
        </button>
        <div className="vd__waveform">
          {bars.map((b, i) => <span key={i} style={{ height: `${(recording ? b : 0.15) * 100}%`, opacity: recording ? 1 : 0.4 }} />)}
        </div>
        <div className="vd__time">{recording ? "● REC · 0:14" : transcribed ? "✓ Transcribed · 247 words" : "Ready"}</div>
      </div>

      <div className="vd__modes">
        {[["press","Press Release"],["rider","Technical Rider"],["bio","Artist Bio"]].map(([k,l]) => (
          <button key={k} className={`vd__mode ${mode===k ? "is-on" : ""}`} onClick={() => setMode(k)}>{l}</button>
        ))}
      </div>

      <div className={`vd__output ${transcribed ? "is-ready" : ""}`}>
        <div className="vd__output-h">{OUTPUTS[mode].title}</div>
        <div className="vd__output-b">
          {transcribed
            ? OUTPUTS[mode].body
            : <span className="vd__placeholder">— Output will appear here after transcription. Voice memo becomes a formatted document in your artist's tone.</span>}
        </div>
        {transcribed && <button className="agm__cta">Send to Maya for review →</button>}
      </div>
    </div>
  );
}

/* 02 · PERSONA — visual DNA card */
function PersonaDemo() {
  const [traits, setTraits] = useState({ warmth: 72, edge: 64, mythic: 58, intimate: 88, chaos: 31 });
  const adjust = (k, dv) => setTraits(t => ({ ...t, [k]: Math.max(0, Math.min(100, t[k] + dv)) }));

  // Derived "moodboard" colors based on traits
  const palette = useMemo(() => {
    return [
      `hsl(${20 + traits.warmth * 0.3}, ${40 + traits.edge * 0.3}%, ${30 + traits.intimate * 0.2}%)`,
      `hsl(${280 - traits.mythic * 0.6}, ${30 + traits.chaos * 0.4}%, ${50 + traits.warmth * 0.2}%)`,
      `hsl(${180 + traits.edge * 0.5}, ${20 + traits.intimate * 0.4}%, ${20 + traits.mythic * 0.3}%)`,
      `hsl(${40 + traits.warmth * 0.5}, ${60 + traits.chaos * 0.3}%, ${70 - traits.edge * 0.3}%)`,
    ];
  }, [traits]);

  const adjective = useMemo(() => {
    const top = Object.entries(traits).sort((a,b) => b[1]-a[1])[0][0];
    const map = { warmth: "Tender", edge: "Sharp-cornered", mythic: "Folkloric", intimate: "Whispered", chaos: "Volatile" };
    return map[top];
  }, [traits]);

  return (
    <div className="pd">
      <div className="pd__card">
        <div className="pd__card-head">
          <div>
            <div className="pd__card-eyebrow">PERSONA · VELOUR.</div>
            <div className="pd__card-adj">{adjective}.</div>
          </div>
          <div className="pd__card-id">DNA-{(traits.warmth + traits.edge + traits.mythic).toString(16).toUpperCase()}</div>
        </div>
        <div className="pd__card-palette">
          {palette.map((c, i) => <div key={i} style={{ background: c }} />)}
        </div>
        <div className="pd__card-body">
          <em>"{adjective.toLowerCase()}, {traits.intimate > 60 ? "close-mic'd" : "stadium-bright"}, {traits.chaos > 50 ? "structurally restless" : "patient"}."</em>
        </div>
      </div>

      <div className="pd__sliders">
        {Object.entries(traits).map(([k, v]) => (
          <div key={k} className="pd__slider">
            <div className="pd__slider-h">
              <span>{k}</span>
              <span className="pd__slider-v">{v}</span>
            </div>
            <div className="pd__slider-track">
              <div className="pd__slider-fill" style={{ width: `${v}%` }} />
              <input type="range" min="0" max="100" value={v} onChange={(e) => setTraits(t => ({ ...t, [k]: +e.target.value }))} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 03 · ENGAGE — fan DM triage */
function EngageDemo() {
  const initial = [
    { id: 1, who: "@cassette_kid_19", msg: "the bridge in liner notes wrecked me",  cat: "fan",   priority: 8 },
    { id: 2, who: "@dropoutmgmt",     msg: "interested in repping for SE Asia tour", cat: "biz",   priority: 9 },
    { id: 3, who: "@anya_listens",    msg: "any merch in EU sizing M??",             cat: "fan",   priority: 4 },
    { id: 4, who: "@thefader",        msg: "10 min tomorrow re: cover story?",       cat: "press", priority: 10 },
    { id: 5, who: "@brixhead",        msg: "your new song sucks",                    cat: "spam",  priority: 1 },
    { id: 6, who: "@indiewavemag",    msg: "stream of liner notes hit 1M, congrats", cat: "press", priority: 7 },
  ];
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState("all");

  const cats = { fan: "#6dd4a3", biz: "#e6b94a", press: "#4a90c8", spam: "#bd5b6b" };

  const filtered = filter === "all" ? items : items.filter(i => i.cat === filter);
  const handle = (id) => setItems(items.filter(i => i.id !== id));

  return (
    <div className="ed">
      <div className="ed__filters">
        {["all","fan","biz","press","spam"].map(f => (
          <button key={f} className={`ed__filter ${filter===f ? "is-on" : ""}`} onClick={() => setFilter(f)}>
            <span className="ed__filter-dot" style={{ background: cats[f] || "#f3ead0" }} /> {f}
          </button>
        ))}
        <span className="ed__count">{filtered.length} unread</span>
      </div>
      <div className="ed__list">
        {filtered.map(i => (
          <div key={i.id} className="ed__row">
            <span className="ed__row-cat" style={{ background: cats[i.cat] }}>{i.cat}</span>
            <div className="ed__row-body">
              <div className="ed__row-who">{i.who}</div>
              <div className="ed__row-msg">{i.msg}</div>
            </div>
            <div className="ed__row-pri">P{i.priority}</div>
            <div className="ed__row-acts">
              <button onClick={() => handle(i.id)}>Reply</button>
              <button className="ghost" onClick={() => handle(i.id)}>Skip</button>
            </div>
          </div>
        ))}
        {!filtered.length && <div className="ed__empty">Inbox zero. ✓</div>}
      </div>
    </div>
  );
}

/* 04 · STREAM — DSP placement tracker */
function StreamDemo() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1500);
    return () => clearInterval(id);
  }, []);
  const PLAYLISTS = [
    { name: "Indie Pop Discovery",   dsp: "Spotify",      adds: 142, base: 1.0 },
    { name: "Pollen",                dsp: "Spotify",      adds: 89,  base: 0.6 },
    { name: "The New Alt",           dsp: "Apple Music",  adds: 67,  base: 0.4 },
    { name: "BRAT Energy",           dsp: "Spotify",      adds: 54,  base: 0.8 },
    { name: "Tidal Rising",          dsp: "Tidal",        adds: 31,  base: 0.3 },
  ];
  return (
    <div className="sd">
      <div className="sd__strip">
        <div><span className="sd__strip-num">2.4M</span><span>streams · 24h</span></div>
        <div><span className="sd__strip-num">+18%</span><span>vs. yesterday</span></div>
        <div><span className="sd__strip-num">12.4%</span><span>skip rate</span></div>
        <div><span className="sd__strip-num">17</span><span>new playlists today</span></div>
      </div>
      <div className="sd__list">
        {PLAYLISTS.map((p, i) => {
          const live = Math.floor(p.adds + Math.sin(tick + i) * 4 + tick * p.base);
          return (
            <div key={p.name} className="sd__row">
              <div className="sd__row-name">{p.name}</div>
              <div className="sd__row-dsp">{p.dsp}</div>
              <div className="sd__row-bar">
                <div className="sd__row-bar-fill" style={{ width: `${Math.min(100, live * 0.5)}%` }} />
              </div>
              <div className="sd__row-num"><span className="sd__row-pulse" />{live}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* 05 · TOUR — routing optimizer */
function TourDemo() {
  const CITIES = [
    { id: "nyc", lbl: "NYC",    x: 22, y: 45, fans: 14000, picked: true  },
    { id: "phl", lbl: "PHL",    x: 19, y: 50, fans: 6200,  picked: false },
    { id: "dc",  lbl: "DC",     x: 17, y: 55, fans: 8400,  picked: true  },
    { id: "atl", lbl: "ATL",    x: 25, y: 70, fans: 7800,  picked: false },
    { id: "chi", lbl: "CHI",    x: 35, y: 42, fans: 11000, picked: true  },
    { id: "min", lbl: "MIN",    x: 38, y: 30, fans: 4900,  picked: false },
    { id: "den", lbl: "DEN",    x: 50, y: 50, fans: 5800,  picked: true  },
    { id: "aus", lbl: "AUS",    x: 45, y: 75, fans: 9100,  picked: false },
    { id: "sf",  lbl: "SF",     x: 78, y: 50, fans: 13000, picked: true  },
    { id: "la",  lbl: "LA",     x: 75, y: 62, fans: 16000, picked: true  },
    { id: "sea", lbl: "SEA",    x: 80, y: 28, fans: 7200,  picked: false },
    { id: "por", lbl: "PDX",    x: 78, y: 33, fans: 5400,  picked: false },
  ];
  const [picks, setPicks] = useState(() => Object.fromEntries(CITIES.map(c => [c.id, c.picked])));
  const route = CITIES.filter(c => picks[c.id]);
  const totalFans = route.reduce((s, c) => s + c.fans, 0);
  const miles = route.reduce((s, c, i) => i === 0 ? 0 : s + Math.round(Math.hypot((c.x - route[i-1].x) * 30, (c.y - route[i-1].y) * 18)), 0);

  return (
    <div className="td">
      <div className="td__map">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* route path */}
          {route.length > 1 && (
            <polyline
              points={route.map(c => `${c.x},${c.y}`).join(" ")}
              fill="none" stroke="#e6b94a" strokeWidth="0.4" strokeDasharray="0.8 0.6"
            />
          )}
        </svg>
        {CITIES.map(c => (
          <button
            key={c.id}
            className={`td__pin ${picks[c.id] ? "is-on" : ""}`}
            style={{ left: `${c.x}%`, top: `${c.y}%`, "--size": `${Math.sqrt(c.fans) * 0.35}px` }}
            onClick={() => setPicks(p => ({ ...p, [c.id]: !p[c.id] }))}
          >
            <span className="td__pin-dot" />
            <span className="td__pin-lbl">{c.lbl}</span>
          </button>
        ))}
      </div>
      <div className="td__stats">
        <div><span className="td__stats-num">{route.length}</span><span>cities</span></div>
        <div><span className="td__stats-num">{totalFans.toLocaleString()}</span><span>total fans reached</span></div>
        <div><span className="td__stats-num">{miles.toLocaleString()}</span><span>route miles</span></div>
        <div><span className="td__stats-num">${(miles * 4.2).toFixed(0)}</span><span>est. travel cost</span></div>
      </div>
    </div>
  );
}

/* 06 · LOCALIZE — translate copy across markets */
function LocalizeDemo() {
  const COPY = "Out April 26th: \"Cassette\" — eleven songs about memory, low-bitrate ghosts, and the way a hallway holds a voice.";
  const MARKETS = {
    en: { name: "English",     flag: "🇺🇸", body: COPY },
    es: { name: "Español",     flag: "🇪🇸", body: 'Disponible el 26 de abril: "Cassette" — once canciones sobre la memoria, los fantasmas de baja resolución y la forma en que un pasillo retiene una voz.' },
    ja: { name: "日本語",      flag: "🇯🇵", body: "4月26日リリース：『Cassette』— 記憶、低ビットレートの幽霊、そして廊下が声を抱きしめる仕方についての11曲。" },
    fr: { name: "Français",    flag: "🇫🇷", body: 'Sortie le 26 avril : "Cassette" — onze chansons sur la mémoire, les fantômes en basse définition, et la manière dont un couloir retient une voix.' },
    pt: { name: "Português",   flag: "🇧🇷", body: 'No dia 26 de abril: "Cassette" — onze canções sobre memória, fantasmas em baixa resolução e o jeito que um corredor segura uma voz.' },
    de: { name: "Deutsch",     flag: "🇩🇪", body: 'Ab 26. April: „Cassette" — elf Lieder über Erinnerung, niedrig aufgelöste Geister, und wie ein Flur eine Stimme festhält.' },
  };
  const [picked, setPicked] = useState(["en","es","ja","fr"]);
  const toggle = (k) => setPicked(p => p.includes(k) ? p.filter(x => x !== k) : [...p, k]);

  return (
    <div className="ld">
      <div className="ld__source">
        <div className="ld__source-h">SOURCE · Press copy</div>
        <div className="ld__source-b">{COPY}</div>
      </div>
      <div className="ld__chips">
        {Object.entries(MARKETS).map(([k, m]) => (
          <button key={k} className={`ld__chip ${picked.includes(k) ? "is-on" : ""}`} onClick={() => toggle(k)}>
            <span>{m.flag}</span> {m.name}
          </button>
        ))}
      </div>
      <div className="ld__grid">
        {picked.map(k => (
          <div key={k} className="ld__card">
            <div className="ld__card-h">{MARKETS[k].flag} {MARKETS[k].name}</div>
            <div className="ld__card-b">{MARKETS[k].body}</div>
            <div className="ld__card-f">✓ Tone-matched · ready to publish</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 07 · LIQUID — royalty advance modeler */
function LiquidDemo() {
  const [pct, setPct] = useState(35);
  const [months, setMonths] = useState(18);
  const baseMonthly = 22000; // est monthly royalty
  const totalEarn = baseMonthly * months;
  const advance = Math.round(totalEarn * (pct / 100));
  const fee = Math.round(advance * 0.12);
  const recoup = Math.round(advance / baseMonthly);

  return (
    <div className="lqd">
      <div className="lqd__sliders">
        <div className="lqd__slider">
          <div className="lqd__slider-h"><span>Advance % of forecast</span><b>{pct}%</b></div>
          <input type="range" min="10" max="80" step="5" value={pct} onChange={(e) => setPct(+e.target.value)} />
        </div>
        <div className="lqd__slider">
          <div className="lqd__slider-h"><span>Forecast window</span><b>{months} months</b></div>
          <input type="range" min="6" max="36" step="3" value={months} onChange={(e) => setMonths(+e.target.value)} />
        </div>
      </div>
      <div className="lqd__readout">
        <div className="lqd__big">
          <span className="lqd__big-lbl">Today, you receive</span>
          <span className="lqd__big-num">${advance.toLocaleString()}</span>
        </div>
        <div className="lqd__rows">
          <div><span>Forecast royalties ({months} mo)</span><span>${totalEarn.toLocaleString()}</span></div>
          <div><span>Advance rate</span><span>{pct}%</span></div>
          <div><span>GE fee (12%)</span><span>−${fee.toLocaleString()}</span></div>
          <div className="lqd__rows-em"><span>Net wired</span><span>${(advance - fee).toLocaleString()}</span></div>
          <div><span>Estimated recoupment</span><span>~{recoup} months</span></div>
        </div>
        <button className="agm__cta">Wire ${(advance - fee).toLocaleString()} to artist account →</button>
      </div>
    </div>
  );
}

/* 08 · SOCIAL — schedule grid */
function SocialDemo() {
  const PLATFORMS = ["IG", "TikTok", "X", "Threads"];
  const HOURS = ["8a", "11a", "2p", "5p", "8p", "11p"];
  const seed = (p, h) => ((p * 7 + h * 13) * 17) % 100;
  const [hover, setHover] = useState(null);

  return (
    <div className="scd">
      <div className="scd__head">
        <span>Engagement heat — week of Apr 26</span>
        <span className="scd__legend"><span /><span /><span /><span /> low → high</span>
      </div>
      <div className="scd__grid">
        <div className="scd__hours">
          <span></span>
          {HOURS.map(h => <span key={h}>{h}</span>)}
        </div>
        {PLATFORMS.map((p, pi) => (
          <div key={p} className="scd__plat">
            <span className="scd__plat-lbl">{p}</span>
            {HOURS.map((h, hi) => {
              const v = seed(pi, hi);
              const peak = v > 75;
              return (
                <button
                  key={h}
                  className={`scd__cell ${peak ? "is-peak" : ""}`}
                  style={{ background: `rgba(230,185,74,${v/120})` }}
                  onMouseEnter={() => setHover([p, h, v])}
                  onMouseLeave={() => setHover(null)}
                >
                  {peak && <span>★</span>}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="scd__queue">
        <div className="scd__queue-h">Queued posts (auto-scheduled to peak windows)</div>
        <div className="scd__post"><span className="scd__post-when">Tue 8p · IG</span><span>Studio bts — vinyl test press lands ✨</span></div>
        <div className="scd__post"><span className="scd__post-when">Wed 11p · TikTok</span><span>"liner notes" loop, hallway angle</span></div>
        <div className="scd__post"><span className="scd__post-when">Thu 5p · Threads</span><span>Pre-save link + tour announce teaser</span></div>
        {hover && <div className="scd__hover">{hover[0]} · {hover[1]} · engagement {hover[2]}</div>}
      </div>
    </div>
  );
}

/* 09 · INTEL — trend velocity dashboard */
function IntelDemo() {
  const TRENDS = [
    { lbl: "Y2K low-bitrate aesthetic",    velocity: 87, gap: "+12%", direction: "up" },
    { lbl: "Hallway / room-tone production", velocity: 71, gap: "+8%",  direction: "up" },
    { lbl: "Cassette ephemera",             velocity: 64, gap: "+5%",  direction: "up" },
    { lbl: "Hyperpop fragments",            velocity: 42, gap: "-3%",  direction: "down" },
    { lbl: "Phonk revival",                 velocity: 28, gap: "-14%", direction: "down" },
  ];
  const ADJACENT = [
    { from: "VELOUR.",    to: "Faye Webster",   strength: 0.78 },
    { from: "VELOUR.",    to: "Adrianne Lenker", strength: 0.69 },
    { from: "VELOUR.",    to: "Phoebe Bridgers", strength: 0.62 },
    { from: "VELOUR.",    to: "Yves Tumor",      strength: 0.41 },
  ];
  return (
    <div className="ind">
      <div className="ind__col">
        <div className="ind__h">Cultural velocity · what's accelerating</div>
        {TRENDS.map((t) => (
          <div key={t.lbl} className="ind__trend">
            <div className="ind__trend-lbl">{t.lbl}</div>
            <div className="ind__trend-bar">
              <div className={`ind__trend-fill is-${t.direction}`} style={{ width: `${t.velocity}%` }} />
            </div>
            <div className={`ind__trend-num is-${t.direction}`}>{t.gap}</div>
          </div>
        ))}
      </div>
      <div className="ind__col">
        <div className="ind__h">Sound adjacency — VELOUR.</div>
        <div className="ind__adj">
          <div className="ind__adj-center">VELOUR.</div>
          {ADJACENT.map((a, i) => (
            <div
              key={a.to}
              className="ind__adj-node"
              style={{
                "--angle": `${i * 90 - 45}deg`,
                "--dist":  `${110 + (1 - a.strength) * 60}px`,
                "--strength": a.strength,
              }}
            >
              <div className="ind__adj-line" />
              <div className="ind__adj-name">{a.to}</div>
              <div className="ind__adj-pct">{Math.round(a.strength * 100)}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 10 · REPORTS — quarterly report builder */
function ReportsDemo() {
  const SECTIONS = [
    { id: "summary",    lbl: "Executive Summary",      on: true  },
    { id: "streaming",  lbl: "Streaming Performance",  on: true  },
    { id: "social",     lbl: "Social Growth",          on: true  },
    { id: "press",      lbl: "Press & Press Pickup",   on: true  },
    { id: "tour",       lbl: "Tour & Live",            on: false },
    { id: "sync",       lbl: "Sync & Licensing",       on: true  },
    { id: "merch",      lbl: "Merch & D2C",            on: false },
    { id: "financial",  lbl: "Financial Snapshot",     on: true  },
    { id: "outlook",    lbl: "Q3 Outlook",             on: true  },
  ];
  const [secs, setSecs] = useState(() => Object.fromEntries(SECTIONS.map(s => [s.id, s.on])));
  const [generated, setGenerated] = useState(false);
  const count = Object.values(secs).filter(Boolean).length;

  return (
    <div className="rpd">
      <div className="rpd__cfg">
        <div className="rpd__cfg-h">Q2 Report · VELOUR. <span>{count} sections selected</span></div>
        {SECTIONS.map(s => (
          <label key={s.id} className={`rpd__sec ${secs[s.id] ? "is-on" : ""}`}>
            <input type="checkbox" checked={!!secs[s.id]} onChange={() => setSecs(x => ({ ...x, [s.id]: !x[s.id] }))} />
            <span className="rpd__sec-box">{secs[s.id] ? "✓" : ""}</span>
            <span className="rpd__sec-lbl">{s.lbl}</span>
          </label>
        ))}
        <button className="agm__cta" onClick={() => setGenerated(true)}>{generated ? "✓ Generated · download PDF" : "Generate Report →"}</button>
      </div>
      <div className="rpd__preview">
        <div className="rpd__pg">
          <div className="rpd__pg-head">
            <div>GENERAL ECLECTIC · ARTIST REPORT</div>
            <div>VELOUR. · Q2 2026</div>
          </div>
          <div className="rpd__pg-h1">Quarterly performance.</div>
          <div className="rpd__pg-tag">A summary of the quarter's signals — streaming, social, press, sync.</div>
          <div className="rpd__pg-stats">
            <div><b>2.4M</b><span>streams</span></div>
            <div><b>+18%</b><span>QoQ</span></div>
            <div><b>14</b><span>press hits</span></div>
            <div><b>3</b><span>sync placements</span></div>
          </div>
          <div className="rpd__pg-bars">
            {[40, 65, 52, 78, 88, 71, 92].map((h, i) => (
              <div key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="rpd__pg-foot">PG 1 / {count} · {generated ? "FINALIZED" : "DRAFT"}</div>
        </div>
      </div>
    </div>
  );
}

const AGENT_DEMOS = {
  "01": VoiceDemo,
  "02": PersonaDemo,
  "03": EngageDemo,
  "04": StreamDemo,
  "05": TourDemo,
  "06": LocalizeDemo,
  "07": LiquidDemo,
  "08": SocialDemo,
  "09": IntelDemo,
  "10": ReportsDemo,
};

Object.assign(window, { AgentModal, AGENT_DEMOS });
