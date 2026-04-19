// Portal — Akai 80s console shell.
// Three views: overview, maya, stack. Left-rail nav, LCD readouts, VU meters.

const AGENTS = [
  ["01", "零壱", "Voice",        "声",   "Vocal identity modeling. Timbre, cadence, signature phrasing.", "v0.4.2", "stable", 72],
  ["02", "零弐", "Personality",  "人格", "Long-horizon persona coherence across releases.",               "v0.3.1", "stable", 64],
  ["03", "零参", "Engagement",   "関与", "Fan telemetry. Who shows up, and when they stop.",              "v0.5.0", "stable", 88],
  ["04", "零肆", "Streaming",    "配信", "Platform-aware release timing and payload.",                    "v0.4.7", "stable", 76],
  ["05", "零伍", "Touring",      "巡業", "Routing, markets, demand-weighted calendars.",                  "v0.2.0", "beta",   42],
  ["06", "零陸", "Localization", "翻訳", "Translation and cultural context by market.",                   "v0.4.3", "stable", 58],
  ["07", "零漆", "Liquid API",   "開口部","Open surface for collaborators and partners.",                  "v0.1.9", "beta",   34],
  ["08", "零捌", "Social Sync",  "連動", "Narrative continuity across platforms.",                        "v0.3.8", "stable", 80],
  ["09", "零玖", "Intelligence", "諜報", "Market, mood, and competitive read-outs.",                      "v0.5.2", "stable", 91],
  ["10", "壱零", "Reports",      "報告", "Daily A&R briefings. Machine-written, human-edited.",           "v0.4.1", "stable", 70],
];

const AGENT_URLS = {
  "01": "agents/voice.html",
  "02": "agents/personality.html",
  "03": "agents/engagement.html",
  "04": "agents/streaming.html",
  "05": "agents/touring.html",
  "06": "agents/localization.html",
  "07": "agents/liquid-api.html",
  "08": "agents/social-sync.html",
};

// Pre-baked Maya conversation
const CONVERSATION = [
  { role: "m", body: "Good morning. Overnight: engagement on Velour's 'Cassette' up 14% across the APAC cluster after the Tokyo blog pickup. Streaming is pacing the week above forecast. Touring is quiet.", sig: "— M." },
  { role: "y", body: "What's driving the APAC lift?" },
  { role: "m", body: "Two things, roughly equal weight. A j-pop Spotify curator added 'Cassette' to a 380k-follower playlist Sunday night. And a moderately-sized fashion account in Seoul used the bridge under a Margiela try-on. I'd act on the second before it cools. Recommend pushing the Korean translation of the liner note within 48 hours and pre-queueing a second clip for the same sound.", sig: "— M." },
];

function Dashboard() {
  const [view, setView] = useState(() => localStorage.getItem("ge:view") || "overview");
  useEffect(() => { localStorage.setItem("ge:view", view); }, [view]);
  return (
    <div className="console">
      <Rail view={view} setView={setView} />
      <div className="stage">
        <StageHead view={view} />
        <div className="stage__body">
          {view === "overview" && <Overview />}
          {view === "maya" && <Maya />}
          {view === "stack" && <Stack />}
          {view === "releases" && <Placeholder title="Releases" jp="配信" />}
          {view === "reports" && <Placeholder title="Reports" jp="報告" />}
          {view === "signal" && <Placeholder title="Signal" jp="信号" />}
        </div>
      </div>
    </div>
  );
}

function Rail({ view, setView }) {
  const items = [
    { id: "overview", n: "01", label: "Overview",  led: "amber" },
    { id: "maya",     n: "02", label: "Maya",      led: "amber" },
    { id: "stack",    n: "03", label: "artiste.md", led: "amber" },
    { id: "releases", n: "04", label: "Releases",  led: "dim" },
    { id: "reports",  n: "05", label: "Reports",   led: "dim" },
    { id: "signal",   n: "06", label: "Signal",    led: "dim" },
  ];
  return (
    <aside className="rail">
      <div className="rail__brand">
        <div className="wm">General<br/>Eclectic</div>
        <div className="sub">Portal · 機密</div>
      </div>
      <div className="rail__screen">
        <div className="r"><span className="k">User</span><span className="v">VELOUR.</span></div>
        <div className="r"><span className="k">Cycle</span><span className="v">03 / 12</span></div>
        <div className="r"><span className="k">Agents</span><span className="v">08 / 08</span></div>
        <div className="r"><span className="k">Queue</span><span className="v">03</span></div>
      </div>
      <nav className="rail__nav">
        <h4>Console · 操作</h4>
        <ul>
          {items.map(it => (
            <li key={it.id} className={view === it.id ? "is-active" : ""} onClick={() => setView(it.id)}>
              <span className="led" />
              <span>{it.label}</span>
              <span className="n">{it.n}</span>
            </li>
          ))}
        </ul>
      </nav>
      <div className="rail__foot">
        <div className="row"><span>Sig.</span><span className="v">ACTIVE</span></div>
        <div className="row"><span>Rec.</span><span className="v rec">● ARMED</span></div>
        <div className="row"><span>Lat.</span><span className="v">04ms</span></div>
      </div>
    </aside>
  );
}

function StageHead({ view }) {
  const labels = {
    overview: ["OVERVIEW", "総合"],
    maya:     ["MAYA — A&R AGENT", "担当"],
    stack:    ["ARTISTE.MD — STACK", "構成"],
    releases: ["RELEASES", "配信"],
    reports:  ["REPORTS", "報告"],
    signal:   ["SIGNAL", "信号"],
  };
  const [en, jp] = labels[view] || labels.overview;
  const [clock, setClock] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const s = d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "America/New_York" });
      setClock(s);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="stage__head">
      <div className="crumb">Portal / <strong>{en}</strong> <span className="jp">{jp}</span></div>
      <div className="transport">
        <button className="tr-btn lcd">◄◄</button>
        <button className="tr-btn lcd">■</button>
        <button className="tr-btn amb on">▶</button>
        <button className="tr-btn lcd">►►</button>
        <button className="tr-btn rec">●</button>
      </div>
      <div className="master"><span className="lbl">NYC</span><span className="val">{clock}</span></div>
    </div>
  );
}

/* ============================================================
   OVERVIEW — streams, social buzz, what's hot, briefing, pads
   ============================================================ */
function Overview() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
      {/* Row 1: Streams + Signal */}
      <div className="panel panel--screwed" style={{ gridColumn: "span 2" }}>
        <div className="panel__head">
          <div className="panel__title"><span className="dot"></span>Today — 今日</div>
          <div className="panel__meta">Cycle 03 · {new Date().toLocaleDateString("en-US", { month:"short", day:"2-digit" })}</div>
        </div>
        <div className="panel__body" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 28, alignItems: "center" }}>
          <div>
            <div className="seven">214.8K</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", color: "var(--ink-3)", textTransform: "uppercase", marginTop: 8 }}>
              Streams <span className="jp" style={{ fontFamily: "var(--font-jp-sans)", letterSpacing: "0.08em", marginLeft: 8, color: "var(--ink-4)" }}>再生数</span>
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--lcd)", marginTop: 12, textShadow: "0 0 4px rgba(156,255,107,0.3)" }}>+14.2% vs. forecast</div>
          </div>
          <VUStack />
        </div>
      </div>

      <div className="panel panel--screwed">
        <div className="panel__head">
          <div className="panel__title"><span className="dot"></span>Signal · 信号</div>
          <div className="panel__meta">LIVE</div>
        </div>
        <div className="panel__body" style={{ display: "grid", gap: 12 }}>
          <div className="lcd">
            <div className="lcd__row"><span className="k">Artists</span><span className="v">03</span></div>
            <div className="lcd__row"><span className="k">Releases</span><span className="v">05</span></div>
            <div className="lcd__row"><span className="k">Queue</span><span className="v amber">03</span></div>
            <div className="lcd__row"><span className="k">Alerts</span><span className="v red">01</span></div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
            <Knob label="Gain" val="+2.3dB" />
            <Knob label="Taste" val="72" />
            <Knob label="Risk" val="34" />
          </div>
        </div>
      </div>

      {/* Row 2: Social Buzz + What's Hot */}
      <div className="panel panel--screwed" style={{ gridColumn: "span 2" }}>
        <div className="panel__head">
          <div className="panel__title"><span className="dot" style={{ background: "#e040fb" }}></span>Social · バズ</div>
          <div className="panel__meta">24h · All Platforms</div>
        </div>
        <div className="panel__body" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ display: "grid", gap: 10 }}>
            <SocialRow platform="TikTok" metric="Sounds Using" value="2,847" delta="+412" up={true} icon="♪" />
            <SocialRow platform="Instagram" metric="Story Mentions" value="1,203" delta="+89" up={true} icon="◎" />
            <SocialRow platform="Spotify" metric="Playlist Adds" value="18" delta="+3" up={true} icon="≡" />
            <SocialRow platform="Shazam" metric="Lookups" value="4,612" delta="+1.8K" up={true} icon="◇" />
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            <SocialRow platform="X" metric="Mentions" value="892" delta="-14" up={false} icon="✕" />
            <SocialRow platform="YouTube" metric="Shorts Using" value="347" delta="+128" up={true} icon="▷" />
            <SocialRow platform="Apple Music" metric="Saves" value="8,941" delta="+2.1K" up={true} icon="♫" />
            <SocialRow platform="SoundCloud" metric="Reposts" value="156" delta="+22" up={true} icon="≋" />
          </div>
        </div>
      </div>

      <div className="panel panel--screwed">
        <div className="panel__head">
          <div className="panel__title"><span className="dot" style={{ background: "#ff6b35" }}></span>Buzzing · 話題</div>
          <div className="panel__meta">TREND</div>
        </div>
        <div className="panel__body" style={{ display: "grid", gap: 10 }}>
          <BuzzItem rank="01" title="Cassette — Bridge Loop" source="TikTok KR" heat="hot" count="2.1K creates" />
          <BuzzItem rank="02" title="Dormer EP — Track 3" source="Spotify DE" heat="warm" count="14 playlists" />
          <BuzzItem rank="03" title="Velour × Margiela" source="IG Tokyo" heat="hot" count="890K reach" />
          <BuzzItem rank="04" title="Unit Writing Session" source="X Lisbon" heat="cool" count="monitoring" />
        </div>
      </div>

      {/* Row 3: Briefing + Pads */}
      <div className="panel panel--screwed" style={{ gridColumn: "span 2" }}>
        <div className="panel__head">
          <div className="panel__title"><span className="dot"></span>Daily Briefing — 報告</div>
          <div className="panel__meta">Reports · Agent 10</div>
        </div>
        <div className="panel__body" style={{ display: "grid", gap: 14, fontFamily: "var(--font-serif)", fontSize: 15, lineHeight: 1.6, color: "var(--ink)" }}>
          <p style={{ margin: 0 }}>
            <strong style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--amber)", display: "block", marginBottom: 6 }}>01 · Velour. — Cassette</strong>
            APAC engagement up 14% overnight. A Tokyo fashion account drove the lift via a Margiela try-on using the bridge. TikTok sounds jumped 412 in 24h — 68% from South Korea. Shazam lookups spiking in Seoul subway zones. Recommend fast-tracking Korean liner-note translation within 48 hours.
          </p>
          <p style={{ margin: 0 }}>
            <strong style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--amber)", display: "block", marginBottom: 6 }}>02 · Mori, H. — Dormer EP</strong>
            Streaming flat at 18.2K/day, but save-rate climbing to 11.4% — up from 7.8% last week. Audience is saving without playing, a leading indicator. 14 editorial playlists added Track 3 in DACH region. Consider a second single pull-forward before the save cohort ages out.
          </p>
          <p style={{ margin: 0, color: "var(--ink-2)" }}>
            <strong style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-3)", display: "block", marginBottom: 6 }}>03 · The Unit — No Release</strong>
            Writing session in Lisbon, day 4 of 7. Personality agent flags drift from release-04 aesthetic — lyrical tone shifted 2.3σ toward introspection. Instagram stories from the studio got 24K views, 3.2% save rate on the snippet.
          </p>
        </div>
      </div>

      <div className="panel panel--screwed">
        <div className="panel__head">
          <div className="panel__title"><span className="dot"></span>Pads · 配列</div>
          <div className="panel__meta">Agents 01—08</div>
        </div>
        <div className="panel__body"><PadPreview /></div>
      </div>
    </div>
  );
}

function SocialRow({ platform, metric, value, delta, up, icon }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "28px 1fr auto auto", gap: 10, alignItems: "center", padding: "8px 10px", background: "var(--panel-2)", border: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--ink-3)", textAlign: "center" }}>{icon}</div>
      <div>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{platform}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", color: "var(--ink-4)", textTransform: "uppercase" }}>{metric}</div>
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 700, color: "var(--ink)", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{value}</div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: up ? "var(--lcd)" : "#b83a2a", textShadow: up ? "0 0 4px rgba(156,255,107,0.3)" : "0 0 4px rgba(184,58,42,0.3)", textAlign: "right", minWidth: 48 }}>{delta}</div>
    </div>
  );
}

function BuzzItem({ rank, title, source, heat, count }) {
  const colors = { hot: "#ff6b35", warm: "var(--amber)", cool: "var(--ink-3)" };
  return (
    <div style={{ padding: "10px 12px", background: "var(--panel-2)", border: "1px solid rgba(255,255,255,0.04)", borderLeft: `3px solid ${colors[heat]}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", color: colors[heat] }}>{rank}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", color: "var(--ink-4)", textTransform: "uppercase" }}>{source}</div>
      </div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{title}</div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: colors[heat], marginTop: 4 }}>{count}</div>
    </div>
  );
}

function VUStack() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <VU label="Streams" jp="再生" value={0.78} peak="+2" />
      <VU label="Engage." jp="関与" value={0.62} peak="-1" />
      <VU label="Save-rt." jp="保存" value={0.45} peak="-4" />
    </div>
  );
}

function VU({ label, jp, value, peak }) {
  const angle = -30 + value * 60;
  return (
    <div className="vu">
      <div className="vu__dial">
        <svg className="vu__scale" viewBox="0 0 120 48" preserveAspectRatio="none">
          <path d="M 10 44 Q 60 4 110 44" fill="none" stroke="#3a2f20" strokeWidth="0.6" />
          <path d="M 10 44 Q 60 4 110 44" fill="none" stroke="#3a2f20" strokeWidth="0.4" transform="translate(0 4)" />
          {[...Array(11)].map((_, i) => {
            const t = i / 10; const a = -30 + t * 60; const rad = (a - 90) * Math.PI / 180;
            const x1 = 60 + Math.cos(rad) * 36; const y1 = 44 + Math.sin(rad) * 36;
            const x2 = 60 + Math.cos(rad) * 32; const y2 = 44 + Math.sin(rad) * 32;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={t > 0.75 ? "#b83a2a" : "#3a2f20"} strokeWidth={t % 0.2 === 0 ? "0.8" : "0.4"} />;
          })}
          <path d="M 88 22 L 108 42" stroke="#b83a2a" strokeWidth="1.4" fill="none" opacity="0.7" />
          <line x1="60" y1="44" x2={60 + Math.cos((angle - 90) * Math.PI / 180) * 30} y2={44 + Math.sin((angle - 90) * Math.PI / 180) * 30} stroke="#111" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="60" cy="44" r="2.5" fill="#1a1d20" stroke="#3a2f20" strokeWidth="0.5" />
          <text x="60" y="22" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="5" fill="#3a2f20" letterSpacing="0.1em" fontWeight="700">VU</text>
        </svg>
        <div className="vu__lbl"><span>-20</span><span>0</span><span>+3</span></div>
      </div>
      <div className="vu__side"><div>{label}</div><div style={{ fontFamily: "var(--font-jp-sans)", fontSize: 9, color: "var(--ink-4)" }}>{jp}</div><div><strong>PK {peak}dB</strong></div></div>
    </div>
  );
}

function Knob({ label, val }) {
  return (<div className="knob"><div className="knob__disc" /><div className="knob__val">{val}</div><div className="knob__lbl">{label}</div></div>);
}

function PadPreview() {
  const lit = AGENTS.slice(0, 8);
  return (
    <div className="pads">
      {lit.map((a, i) => {
        const cls = i % 3 === 0 ? "lit-g" : i % 3 === 1 ? "lit" : "lit-r";
        const url = AGENT_URLS[a[0]];
        return (
          <a key={a[0]} href={url} className={`pad ${cls}`} style={{ textDecoration: "none", cursor: "pointer", transition: "transform 0.15s ease, box-shadow 0.15s ease" }}
             onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(255,176,32,0.3)"; }}
             onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
            <div className="n">{a[0]}</div>
            <div className="t">{a[2]}</div>
            <div className="j">{a[3]}</div>
          </a>
        );
      })}
      {[9, 10, 11, 12, 13, 14, 15, 16].map((n) => (
        <div key={n} className="pad"><div className="n">{String(n).padStart(2, "0")}</div><div className="t" style={{ color: "var(--ink-4)" }}>—</div><div className="j">&nbsp;</div></div>
      ))}
    </div>
  );
}

/* ============================================================
   MAYA — Reel-to-reel chat
   ============================================================ */
function Maya() {
  const [messages, setMessages] = useState(CONVERSATION);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const send = () => {
    if (!draft.trim()) return;
    setMessages(m => [...m, { role: "y", body: draft }]);
    setDraft(""); setPending(true);
    setTimeout(() => { setMessages(m => [...m, { role: "m", body: "Noted. Pulling telemetry and cross-referencing with the last 30-day cohort. Stand by.", sig: "— M." }]); setPending(false); }, 1400);
  };
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div className="panel panel--screwed">
        <div className="reel-head">
          <div className={`reel ${pending ? "" : "slow"}`} />
          <div className="reel-head__mid"><div className="reel-head__title">Maya</div><div className="reel-head__sub">A&R Agent · Live<span className="jp">担当 · 稼働中</span></div></div>
          <div className={`reel ${pending ? "" : "slow"}`} style={{ animationDirection: "reverse" }} />
        </div>
        <div className="chat">
          <div className="chat__log">
            {messages.map((m, i) => (<div key={i} className="chat__msg"><div className={`chat__tag ${m.role}`}>{m.role === "m" ? "M." : "YOU"}</div><div className={`chat__body ${m.role}`}>{m.body}{m.sig && <sig>{m.sig}</sig>}</div></div>))}
            {pending && (<div className="chat__msg"><div className="chat__tag m">M.</div><div className="chat__body m" style={{ color: "var(--ink-3)", fontStyle: "italic" }}>Spooling…</div></div>)}
          </div>
          <div className="chat__composer"><span className="prompt">&gt;</span><input placeholder="Ask Maya — engagement, releases, intel…" value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} /><button className="send" onClick={send}>Send</button></div>
        </div>
      </div>
      <div className="panel">
        <div className="panel__head"><div className="panel__title"><span className="dot"></span>Active Stack · 構成</div><div className="panel__meta">Agents contributing</div></div>
        <div className="panel__body" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
          {AGENTS.slice(0, 5).map(a => (
            <div key={a[0]} style={{ padding: "10px 12px", background: "rgba(255,176,32,0.06)", border: "1px solid rgba(255,176,32,0.2)", borderRadius: 2, display: "grid", gap: 2 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", color: "var(--amber)" }}>{a[0]} · {a[1]}</div>
              <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 13, color: "var(--ink)" }}>{a[2]}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--lcd)", textShadow: "0 0 4px rgba(156,255,107,0.3)" }}>● LIVE · {a[5]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   STACK — 10 channel strips, mixer style
   ============================================================ */
function Stack() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div className="panel panel--screwed">
        <div className="panel__head"><div className="panel__title"><span className="dot"></span>artiste.md · Channel View</div><div className="panel__meta">10 / 10 loaded</div></div>
        <div className="panel__body" style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 6 }}>{AGENTS.map(a => <Channel key={a[0]} a={a} />)}</div>
      </div>
      <div className="panel">
        <div className="panel__head"><div className="panel__title"><span className="dot"></span>Agent Detail · 詳細</div><div className="panel__meta">Click to open agent</div></div>
        <div className="panel__body" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
          {AGENTS.map(a => {
            const url = AGENT_URLS[a[0]];
            const inner = (
              <div style={{ padding: "14px 16px", border: "1px solid var(--black)", background: "var(--panel-2)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)", display: "grid", gridTemplateColumns: "48px 1fr auto", gap: 14, alignItems: "start", cursor: url ? "pointer" : "default", transition: "border-color 0.2s ease" }}
                onMouseEnter={(e) => { if (url) e.currentTarget.style.borderColor = "rgba(255,176,32,0.4)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--black)"; }}>
                <div style={{ display: "grid", placeItems: "center", padding: "10px 0", background: "rgba(255,176,32,0.08)", border: "1px solid rgba(255,176,32,0.2)", borderRadius: 2 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--amber)", letterSpacing: "0.1em" }}>{a[0]}</div>
                  <div style={{ fontFamily: "var(--font-jp)", fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>{a[1]}</div>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>{a[2]}</div>
                  <div style={{ fontFamily: "var(--font-jp)", fontSize: 11, color: "var(--ink-3)", marginBottom: 8 }}>{a[3]}</div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5 }}>{a[4]}</div>
                </div>
                <div style={{ textAlign: "right", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", color: "var(--ink-4)" }}>
                  <div>{a[5]}</div>
                  <div style={{ color: a[6] === "stable" ? "var(--lcd)" : "var(--amber)", marginTop: 4, textShadow: a[6] === "stable" ? "0 0 4px rgba(156,255,107,0.3)" : "0 0 4px rgba(255,176,32,0.3)" }}>● {a[6]}</div>
                </div>
              </div>
            );
            return url ? <a key={a[0]} href={url} style={{ textDecoration: "none", color: "inherit" }}>{inner}</a> : <div key={a[0]}>{inner}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

function Channel({ a }) {
  const [btns, setBtns] = useState({ mute: false, solo: false, rec: false });
  const toggle = (k) => setBtns(b => ({ ...b, [k]: !b[k] }));
  const level = a[7];
  return (
    <div className="channel">
      <div className="channel__head"><div className="n">{a[0]} · {a[1]}</div><div className="k">{a[3]}</div><div className="t">{a[2]}</div></div>
      <div className="channel__peak"><div className="bar" style={{ position: "relative", opacity: 1 }}><div style={{ position: "absolute", left: -1, right: -1, top: 0, height: `${100 - level}%`, background: "rgba(10,14,10,0.82)" }} /></div><div className="lv">{String(level).padStart(3, " ")}</div></div>
      <div style={{ display: "grid", gap: 4 }}><Fader level={level} /></div>
      <div className="channel__btns">
        <button className={btns.mute ? "on" : ""} onClick={() => toggle("mute")}>MUTE</button>
        <button className={`solo ${btns.solo ? "on" : ""}`} onClick={() => toggle("solo")}>SOLO</button>
        <button className={`rec ${btns.rec ? "on" : ""}`} onClick={() => toggle("rec")}>REC</button>
        <button>ARM</button>
      </div>
      <div className="channel__ver"><span>{a[5]}</span><span className="status">● {a[6] === "stable" ? "ON" : "BETA"}</span></div>
    </div>
  );
}

function Fader({ level }) {
  const pos = 100 - level;
  return (<div className="fader"><div className="fader__track"><div className="fader__cap" style={{ top: `calc(${pos}% - 11px)` }} /></div><div className="fader__lbl">LVL</div></div>);
}

function Placeholder({ title, jp }) {
  return (
    <div className="panel panel--screwed" style={{ minHeight: 360, display: "grid", placeItems: "center" }}>
      <div style={{ textAlign: "center", padding: 48 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.24em", color: "var(--ink-4)", textTransform: "uppercase" }}>In development</div>
        <div style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 48, letterSpacing: "-0.03em", color: "var(--ink)", margin: "12px 0 6px" }}>{title}</div>
        <div style={{ fontFamily: "var(--font-jp)", fontSize: 16, color: "var(--amber)", letterSpacing: "0.14em" }}>{jp}</div>
      </div>
    </div>
  );
}

Object.assign(window, { Dashboard });
