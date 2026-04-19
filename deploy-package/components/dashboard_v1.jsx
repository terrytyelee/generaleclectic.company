// Dashboard / Portal
function Dashboard({ openMaya }) {
  const [section, setSection] = useState("overview");
  const [agent, setAgent] = useState(null); // which artiste.md agent is open
  const [caps, setCaps] = useState({
    voice: true, personality: true, engagement: true, streaming: true,
    touring: false, localization: true, liquid: false, social: true, intel: true, reports: true,
  });
  const toggleCap = (k) => setCaps(c => ({...c, [k]: !c[k]}));

  return (
    <div className="dash">
      {/* SIDEBAR */}
      <aside className="dash__side">
        <div className="dash__artist">
          <div className="dash__avatar">VE</div>
          <div className="dash__aname">Velour.</div>
          <div className="dash__astatus"><span className="dot">●</span> Active · Cycle 03</div>
        </div>
        <ul className="dash__menu">
          {[
            ["overview", "Overview", ""],
            ["releases", "Releases", "3"],
            ["stack", "Stack", "7/10"],
            ["reports", "Reports", "12"],
            ["signal", "Signal", "LIVE"],
            ["royalties", "Royalties", ""],
            ["settings", "Settings", ""],
          ].map(([id, label, count]) => (
            <li key={id} className={section === id ? "is-active" : ""} onClick={() => setSection(id)}>
              <span>{label}</span>
              <span className="count">{count}</span>
            </li>
          ))}
        </ul>
        <div className="dash__side__foot">
          <div className="eyebrow" style={{ marginBottom: 8 }}>Your Desk</div>
          <div className="code" style={{ fontSize: 10 }}>
            A&R · Ines Okafor<br/>
            Ops · D. Suzuki<br/>
            Sync · L. Bianchi
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="dash__main">
        {section === "overview" && <Overview caps={caps} />}
        {section === "releases" && <Releases />}
        {section === "stack" && !agent && <Stack caps={caps} toggleCap={toggleCap} openAgent={(k) => setAgent(k)} />}
        {section === "stack" && agent && <AgentView agentKey={agent} caps={caps} toggleCap={toggleCap} back={() => setAgent(null)} />}
        {section === "reports" && <Reports />}
        {section === "signal" && <SignalView />}
        {section === "royalties" && <Royalties />}
        {section === "settings" && <Settings />}
      </main>

      {/* MAYA RAIL */}
      <Maya />
    </div>
  );
}

function Overview({ caps }) {
  const [dynamic, setDynamic] = useState(0);
  useEffect(() => { const t = setTimeout(() => setDynamic(68), 300); return () => clearTimeout(t); }, []);

  return (
    <div>
      <div className="dash__kicker">Overview · Cycle 03 · Week 14</div>
      <h1 className="dash__h1">Good evening, <em>Velour.</em></h1>
      <p className="dash__lede">
        Signal is <em>steady.</em> Maya flagged three artifacts overnight — one tour routing, one sync request, one anomaly in Berlin streaming.
      </p>

      <div className="meter">
        <div className="meter__top">
          <div className="meter__label">Dynamic Index · Last 7 days</div>
          <div className="meter__value">{dynamic}<span style={{ fontSize: 14, color: "var(--ink-3)", fontWeight: 500, marginLeft: 4 }}>/100</span></div>
        </div>
        <div className="meter__bar"><div className="meter__fill" style={{ width: dynamic + "%" }}></div></div>
        <div className="meter__ticks">
          <span>Latent</span><span>Forming</span><span>Active</span><span>Surge</span><span>Peak</span>
        </div>
      </div>

      <h2 className="dash__h2">Today's Signal</h2>
      <div className="metrics">
        {[
          { l: "Monthly listeners", v: "142,880", d: "+4.2% ▲", p: [20,22,24,23,26,28,32,31,34,36,38] },
          { l: "Average save rate", v: "28.4%", d: "+0.6% ▲", p: [24,25,26,25,27,28,27,28,29,28,28] },
          { l: "Cities with ≥1k plays", v: "47", d: "+3 ▲", p: [32,34,36,38,40,41,42,44,45,46,47] },
          { l: "Active Sync holds", v: "6", d: "—", p: [2,3,3,4,4,5,5,6,6,6,6] },
        ].map((m, i) => (
          <div key={i} className="metric">
            <div className="metric__label">{m.l}</div>
            <div className="metric__value">{m.v}</div>
            <Sparkline points={m.p} />
            <div className="metric__delta">{m.d}</div>
          </div>
        ))}
      </div>

      <h2 className="dash__h2" style={{ marginTop: 48 }}>This week's releases</h2>
      <div>
        <Rel date={["APR", "24"]} name="Velour. — Opening State" type="Single · Master delivered" status="live" statusText="● Live" />
        <Rel date={["MAY", "08"]} name="Velour. — Undertow (Remix)" type="Single · Sync hold" status="scheduled" statusText="Scheduled" />
        <Rel date={["JUN", "02"]} name="Velour. — The Infinite Age EP" type="EP · 6 tracks · mastering" status="scheduled" statusText="Scheduled" />
      </div>
    </div>
  );
}

function Rel({ date, name, type, status, statusText }) {
  return (
    <div className="rel">
      <div className="rel__date">{date[0]} <strong>{date[1]}</strong> 2026</div>
      <div className="rel__name">{name}</div>
      <div className="rel__type">{type}</div>
      <div className={`rel__status ${status}`}>{statusText}</div>
    </div>
  );
}

function Releases() {
  return (
    <div>
      <div className="dash__kicker">02 · Releases</div>
      <h1 className="dash__h1">Release <em>cadence.</em></h1>
      <p className="dash__lede">Continuous. Not linear. Every release is instrumented end-to-end.</p>
      <Rel date={["APR", "24"]} name="Opening State" type="Single · 3:42 · F#m" status="live" statusText="● Live" />
      <Rel date={["MAY", "08"]} name="Undertow (Remix)" type="Single · 4:11 · Cmaj" status="scheduled" statusText="Scheduled" />
      <Rel date={["JUN", "02"]} name="The Infinite Age" type="EP · 6 tracks" status="scheduled" statusText="Scheduled" />
      <Rel date={["JUL", "14"]} name="Velour. at Elsewhere (Live)" type="Live recording · Brooklyn" status="scheduled" statusText="Scheduled" />
      <Rel date={["SEP", "—"]} name="Untitled Collaboration (C. Moreau)" type="Single · draft · on Maya's desk" status="" statusText="Drafting" />
    </div>
  );
}

function Stack({ caps, toggleCap, openAgent }) {
  const rows = [
    ["voice", "Voice", "Timbre, cadence, signature phrasing.", "artiste.md / voice"],
    ["personality", "Personality", "Long-horizon persona coherence.", "artiste.md / persona"],
    ["engagement", "Engagement", "Fan telemetry. Who shows up, and when.", "artiste.md / engagement"],
    ["streaming", "Streaming", "Platform-aware release timing.", "artiste.md / streaming"],
    ["touring", "Touring", "Routing, markets, demand calendars.", "artiste.md / touring"],
    ["localization", "Localization", "Translation, cultural context by market.", "artiste.md / localize"],
    ["liquid", "Liquid API", "Open surface for collaborators.", "artiste.md / liquid"],
    ["social", "Social Sync", "Narrative continuity across platforms.", "artiste.md / social"],
    ["intel", "Intelligence", "Market and competitive read-outs.", "artiste.md / signal"],
    ["reports", "Reports", "Daily A&R briefings.", "artiste.md / reports"],
  ];
  return (
    <div>
      <div className="dash__kicker">03 · Stack</div>
      <h1 className="dash__h1">artiste<em>.md</em></h1>
      <p className="dash__lede">
        Ten agents. Each one narrow, each one lethal. Toggle only what you need — the rest stays <em>quiet.</em>
      </p>
      <div className="caps">
        {rows.map(([k, name, desc, slug]) => (
          <div key={k} className="cap" onClick={() => openAgent(k)}>
            <div>
              <div className="cap__name">{name} <span style={{ color: "var(--ink-3)", fontSize: 11, fontWeight: 500, marginLeft: 4 }}>↗</span></div>
              <p className="cap__desc">{desc}</p>
              <div className={`cap__status ${caps[k] ? "on" : ""}`}>
                <span className="dot"></span>
                <span>{caps[k] ? "Active — Intelligence" : "Standby"}</span>
                <span className="code" style={{ marginLeft: 12 }}>{slug}</span>
              </div>
            </div>
            <button className={`cap__toggle ${caps[k] ? "on" : ""}`} onClick={(e) => { e.stopPropagation(); toggleCap(k); }}></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Reports() {
  const items = [
    ["APR 18", "Berlin · Streaming anomaly", "Undertow is spiking 4× in Berlin across 2 playlists. Likely editorial pull. Recommend holding the remix for 10 days to let it breathe.", "Maya"],
    ["APR 17", "Sync — A24 tentative", "A24 holding Opening State for a spring 2026 feature. Asking for exclusivity on cold open. Deadline Friday. L. Bianchi reviewing.", "L. Bianchi"],
    ["APR 17", "Tour routing — EU leg", "Weighted demand pulls Utrecht before Berlin. 38% uplift vs. published schedule. Routing PDF attached.", "Maya"],
    ["APR 16", "Catalog — Velour. radio play", "4 US college stations playing Velour. in rotation. Median listener age 22. Sampling a cohort for survey.", "Maya"],
  ];
  return (
    <div>
      <div className="dash__kicker">04 · Reports · Daily A&R Intelligence</div>
      <h1 className="dash__h1">Daily <em>brief.</em></h1>
      <p className="dash__lede">Machine-written. Human-edited. Published 06:00 ET, every weekday.</p>
      <div style={{ borderTop: "1px solid var(--rule)" }}>
        {items.map(([date, title, body, by], i) => (
          <article key={i} style={{ padding: "28px 0", borderBottom: "1px solid var(--rule)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span className="code">{date} · 2026</span>
              <span className="eyebrow">filed by {by}</span>
            </div>
            <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 22, letterSpacing: "-0.02em", margin: "0 0 8px" }}>{title}</h3>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: 15, lineHeight: 1.55, color: "var(--ink-2)", margin: 0, maxWidth: "60ch" }}>{body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function SignalView() {
  const cities = [
    ["New York", 18420, 34], ["Los Angeles", 14880, 28], ["London", 11240, 22],
    ["Berlin", 9180, 51], ["Paris", 7410, 19], ["Mexico City", 6890, 24],
    ["Tokyo", 5120, 16], ["Sydney", 4680, 12], ["São Paulo", 4110, 21],
    ["Amsterdam", 3960, 18], ["Seoul", 3540, 14], ["Utrecht", 2810, 38],
  ];
  return (
    <div>
      <div className="dash__kicker">05 · Signal · Real-time intelligence</div>
      <h1 className="dash__h1">Where it's <em>happening.</em></h1>
      <p className="dash__lede">Top 12 cities by active-fan density, last 7 days.</p>
      <div style={{ borderTop: "1px solid var(--rule)" }}>
        {cities.map(([c, plays, delta], i) => (
          <div key={c} style={{ display: "grid", gridTemplateColumns: "36px 1fr 120px 100px", gap: 16, padding: "14px 0", borderBottom: "1px solid var(--rule)", alignItems: "center" }}>
            <div className="code" style={{ fontSize: 11 }}>{String(i+1).padStart(2,"0")}</div>
            <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 17, letterSpacing: "-0.015em" }}>{c}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.08em" }}>{plays.toLocaleString()} plays</div>
            <div style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 11, color: delta > 30 ? "var(--signal)" : "var(--ink-2)", textAlign: "right", letterSpacing: "0.08em" }}>+{delta}% ▲</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Royalties() {
  return (
    <div>
      <div className="dash__kicker">06 · Royalties · Real-time settlement</div>
      <h1 className="dash__h1">Settled <em>continuously.</em></h1>
      <p className="dash__lede">Not bi-annually. Not quarterly. <em>Continuously.</em></p>

      <div className="metrics" style={{ marginTop: 32 }}>
        {[
          { l: "Balance · available", v: "$24,810" },
          { l: "In-flight · 30 days", v: "$8,420" },
          { l: "YTD streams", v: "4.14M" },
          { l: "Effective rate", v: "$0.0051" },
        ].map((m, i) => (
          <div key={i} className="metric">
            <div className="metric__label">{m.l}</div>
            <div className="metric__value">{m.v}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 40 }}>
        <h2 className="dash__h2">Recent settlements</h2>
        {[
          ["APR 18", "Spotify · streaming", "+$1,842.10"],
          ["APR 18", "Apple Music · streaming", "+$612.44"],
          ["APR 17", "Sync advance · L. Bianchi hold", "+$3,500.00"],
          ["APR 16", "Bandcamp · direct", "+$948.00"],
          ["APR 14", "YouTube · ad share", "+$224.18"],
        ].map((r, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "100px 1fr 140px", gap: 16, padding: "12px 0", borderBottom: "1px solid var(--rule)", alignItems: "center" }}>
            <div className="code" style={{ fontSize: 10 }}>{r[0]} · 2026</div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 500 }}>{r[1]}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 13, color: "var(--signal)", textAlign: "right", letterSpacing: "0.04em" }}>{r[2]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Settings() {
  return (
    <div>
      <div className="dash__kicker">07 · Settings</div>
      <h1 className="dash__h1">Your <em>system.</em></h1>
      <p className="dash__lede">Everything configurable is here. Everything else is a conversation with your A&R desk.</p>
      <div className="caps" style={{ marginTop: 24 }}>
        {[
          ["Display name", "Velour."],
          ["Legal entity", "E. Moreau LLC"],
          ["Payout — bank", "Chase · ••3041"],
          ["Payout — cadence", "Continuous (real-time)"],
          ["Publishing split", "100% Velour. (self-published)"],
          ["Mechanical admin", "G.E. Creative Infrastructures"],
        ].map(([k, v]) => (
          <div key={k} className="cap">
            <div>
              <div className="cap__name" style={{ fontSize: 15 }}>{k}</div>
              <p className="cap__desc" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-2)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{v}</p>
            </div>
            <button className="btn btn--ghost" style={{ padding: "6px 10px", fontSize: 9 }}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Dashboard });
