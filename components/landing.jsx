// Landing — Electric Co. full-bleed responsive
function Landing({ setPage, openIntro }) {
  return (
    <main>
      <HitHero setPage={setPage} openIntro={openIntro} />
      <GUINav setPage={setPage} openIntro={openIntro} />
      <NowPlayingBlock />
      <PropertiesBlock setPage={setPage} />
      <AgentsBlock />
      <Maya />
      <PortalGlimpse setPage={setPage} />
    </main>
  );
}

/* ── HERO ────────────────────────────────────────────── */
function HitHero({ setPage, openIntro }) {
  const [hit, setHit] = useState(0.74);
  useEffect(() => {
    const id = setInterval(() => {
      setHit(prev => Math.max(0.62, Math.min(0.88, prev + (Math.random() - 0.45) * 0.025)));
    }, 1800);
    return () => clearInterval(id);
  }, []);
  const dashOffset = 251.3 * (1 - hit);

  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero__inner">
          <div className="hero__left">
            <div className="eyebrow">
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "currentColor" }} />
              For Artists · By Invitation · Est. 2026
            </div>
            <h1 className="wordmark">
              <span className="wordmark__line l1">general</span>
              <span className="wordmark__line l2">eclectic.</span>
            </h1>
            <p className="tag">
              The home for <span className="tag__strong">serious artists.</span>
            </p>
            <p className="lede">
              A creative infrastructure company for the Infinite Age. We back fourteen artists at a time — with our LLM <em>Maya</em>, ten A&R agents, and the tools they need to stay theirs. Part label, part technology studio, part distribution engine.
            </p>
            <div className="cta-row">
              <button className="btn btn--primary" onClick={() => setPage("apply")}>Request an Invitation →</button>
              <button className="btn btn--gold" onClick={() => setPage("portal")}>Preview the Portal ⌘</button>
              <button className="btn btn--ghost" onClick={() => openIntro && openIntro()}>▶ Replay Intro</button>
            </div>
            <div className="exclusive-note">
              <span className="exclusive-note__dot" /> Closed roster · 14 artists · By invitation or curator referral. Data shown is sample.
            </div>
          </div>
          <div className="hero__right">
            <div className="hit-panel">
              <div className="hit-panel__head">
                <span className="hit-panel__title">Hit Index · Roster avg.</span>
                <span className="hit-panel__live">LIVE</span>
              </div>
              <div className="hit-panel__body">
                <div className="gauge">
                  <svg viewBox="0 0 100 100">
                    <circle className="gauge__bg" cx="50" cy="50" r="40" />
                    <circle className="gauge__arc" cx="50" cy="50" r="40" style={{ strokeDashoffset: dashOffset }} />
                  </svg>
                  <div className="gauge__num">
                    <b>{hit.toFixed(2)}</b>
                    <small>HIT INDEX</small>
                  </div>
                </div>
                <div className="hit-panel__readout">
                  <div className="hit-panel__lbl">Above forecast · 24h</div>
                  <div className="hit-panel__big">+14% lift</div>
                  <div className="hit-panel__sub">
                    <SparkBars count={14} color="var(--signal)" seed={3} />
                    <span className="up">↑ trend</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── GUI NAV TILES ───────────────────────────────────── */
function GUINav({ setPage, openIntro }) {
  const tiles = [
    { id: "intro",  icon: "▶", lbl: "Intro",    sub: "Replay film",      metric: ["CH",   "03",   "up"], cls: "gtile--cream",  onClick: () => openIntro && openIntro() },
    { id: "maya",   icon: "M", lbl: "Maya",     sub: "Your AI Director", metric: ["CONF", "0.91", "up"], cls: "gtile--gold",   onClick: () => document.querySelector(".maya")?.scrollIntoView({ behavior: "smooth", block: "start" }) },
    { id: "roster", icon: "R", lbl: "Roster",   sub: "14 artists, max",  metric: ["AVG",  "0.74", "up"], cls: "",              onClick: () => setPage("roster") },
    { id: "apply",  icon: "→", lbl: "Apply",    sub: "Invite or referral", metric: ["~",  "48h",  ""],   cls: "gtile--cherry", onClick: () => setPage("apply") },
    { id: "charts", icon: "C", lbl: "Charts",   sub: "Sample · Live",    metric: ["KR",   "+412", "up"], cls: "gtile--sky",    onClick: () => setPage("portal") },
    { id: "portal", icon: "⌘", lbl: "Portal",   sub: "Artist console",   metric: ["NYC",  "DEMO", ""],   cls: "",              onClick: () => setPage("portal") },
  ];
  return (
    <section className="guinav">
      <div className="wrap">
        <div className="guinav__grid">
          {tiles.map(t => (
            <button key={t.id} className={`gtile ${t.cls}`} onClick={t.onClick}>
              <div className="gtile__top">
                <span className="gtile__icon">{t.icon}</span>
                <span className="gtile__metric">{t.metric[0]} <span className={t.metric[2]}>{t.metric[1]}</span></span>
              </div>
              <div className="gtile__lbl">{t.lbl}</div>
              <div className="gtile__sub">{t.sub}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── NOW PLAYING (SoundCloud in a cassette frame) ── */
function NowPlayingBlock() {
  return (
    <section className="np">
      <div className="wrap">
        <SectionHead jp="再生中">Now playing · From the lab</SectionHead>
        <div className="cassette">
          {/* corner screws */}
          <span className="cassette__screw cassette__screw--tl" />
          <span className="cassette__screw cassette__screw--tr" />
          <span className="cassette__screw cassette__screw--bl" />
          <span className="cassette__screw cassette__screw--br" />

          {/* label band */}
          <div className="cassette__label">
            <div className="cassette__label-l">
              <span className="cassette__brand">G.E.</span>
              <span className="cassette__model">TYPE-II · 90min</span>
            </div>
            <div className="cassette__label-c">
              <div className="cassette__title">Kimberley — Lofi Tendencies</div>
              <div className="cassette__artist">Taipa · A SIDE</div>
            </div>
            <div className="cassette__label-r">
              <span className="cassette__bars" aria-hidden="true">
                <span /><span /><span /><span /><span />
              </span>
            </div>
          </div>

          {/* reels */}
          <div className="cassette__reels">
            <div className="reel">
              <div className="reel__teeth">
                {[...Array(6)].map((_, i) => <span key={i} style={{ transform: `rotate(${i*60}deg)` }} />)}
              </div>
            </div>
            <div className="cassette__window">
              <iframe
                className="cassette__iframe"
                width="100%" height="100%"
                scrolling="no" frameBorder="no"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A1291616668&color=%23E63946&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=false"
                title="SoundCloud — Kimberley · Lofi Tendencies"
              />
            </div>
            <div className="reel">
              <div className="reel__teeth">
                {[...Array(6)].map((_, i) => <span key={i} style={{ transform: `rotate(${i*60}deg)` }} />)}
              </div>
            </div>
          </div>

          {/* footer credit */}
          <div className="cassette__credit">
            <a href="https://soundcloud.com/taipamusic" target="_blank" rel="noopener">Taipa ↗</a>
            <span>·</span>
            <a href="https://soundcloud.com/taipamusic/sets/kimberley-lofi-tendencies" target="_blank" rel="noopener">Kimberley — Lofi Tendencies ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── NOW SHOWING (Video in a CRT/VHS frame) ─────────── */
function NowShowingBlock() {
  const [t, setT] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = t.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  const date = t.toLocaleDateString("en-US", { year: "2-digit", month: "2-digit", day: "2-digit" }).replace(/\//g,".");

  // 8-bit typing overlay
  const lines = useMemo(() => [
    "> BOOT SEQUENCE INITIATED...",
    "> LOADING G.E. VISION v2.6.1",
    "> CHANNEL 03 // ROSTER FEED",
    "> SIGNAL ACQUIRED. STAND BY.",
    "> MAYA :: HIT INDEX = 0.74 // +0.03",
    "> NOW SHOWING — INTELLIGENCE FOR ARTISTRY.",
    "> PRESS ANY KEY TO CONTINUE_",
  ], []);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  useEffect(() => {
    const cur = lines[lineIdx];
    if (charIdx < cur.length) {
      const id = setTimeout(() => setCharIdx(c => c + 1), 38 + Math.random() * 30);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setLineIdx(i => (i + 1) % lines.length);
      setCharIdx(0);
    }, 1700);
    return () => clearTimeout(id);
  }, [charIdx, lineIdx, lines]);
  const visible = lines[lineIdx].slice(0, charIdx);

  return (
    <section className="ns">
      <div className="wrap">
        <SectionHead jp="放映中">Now showing · From the lab</SectionHead>
        <div className="crt">
          {/* antenna */}
          <div className="crt__antenna">
            <span className="crt__rod crt__rod--l" />
            <span className="crt__rod crt__rod--r" />
            <span className="crt__base" />
          </div>

          {/* TV body */}
          <div className="crt__body">
            {/* badge / brand strip */}
            <div className="crt__badge">
              <span className="crt__brand">G.E. VISION</span>
              <span className="crt__model">CV-2026 · COLOR · TRINITRON</span>
            </div>

            {/* the screen */}
            <div className="crt__bezel">
              <div className="crt__screen">
                <div className="crt__osd">
                  <span className="crt__osd-rec">● REC</span>
                  <span className="crt__osd-ch">CH 03</span>
                  <span className="crt__osd-time">{date} · {time}</span>
                  <span className="crt__osd-sp">SP</span>
                </div>
                <div className="crt__video">
                  <iframe
                    className="crt__iframe"
                    src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=0&mute=1&controls=1&rel=0&modestbranding=1"
                    title="G.E. Vision — Now showing"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* 8-bit typing terminal overlay */}
                <div className="crt__term" aria-hidden="true">
                  <span className="crt__term-text">{visible}</span>
                  <span className="crt__term-caret" />
                </div>

                <div className="crt__scanlines" aria-hidden="true" />
                <div className="crt__glare" aria-hidden="true" />
                <div className="crt__noise" aria-hidden="true" />
                <div className="crt__vignette" aria-hidden="true" />
              </div>
            </div>

            {/* control row */}
            <div className="crt__controls">
              <div className="crt__btns">
                <button className="crt__btn crt__btn--red" aria-label="power"><span /></button>
                <span className="crt__lbl">PWR</span>
                <button className="crt__btn" aria-label="ch up"><span>+</span></button>
                <button className="crt__btn" aria-label="ch dn"><span>−</span></button>
                <span className="crt__lbl">CH</span>
              </div>
              <div className="crt__display">
                <span>03</span>
              </div>
              <div className="crt__knobs">
                <div className="knob"><span /></div>
                <div className="knob knob--gold"><span /></div>
              </div>
            </div>
          </div>

          {/* feet */}
          <span className="crt__foot crt__foot--l" />
          <span className="crt__foot crt__foot--r" />
        </div>
      </div>
    </section>
  );
}

/* ── PROPERTIES ─────────────────────────────────────── */
function PropertiesBlock({ setPage }) {
  const props = [
    {
      n: "01", name: "MAYA", mono: false,
      tag: "The science of what makes culture move.",
      desc: "Hit-science LLM. Named for Raymond Loewy's Most Advanced Yet Acceptable. Trained on 1.4M cultural signals.",
      accent: "var(--cherry)", badge: ["llm", "● LLM"], score: 0.91,
      stats: [
        { lbl: "Predict.", val: "0.91", d: "+0.03", trend: "up" },
        { lbl: "Latency",  val: "180ms", d: "stable", trend: "" },
        { lbl: "Calls·24h", val: "12.4K", d: "+8%", trend: "up" },
      ],
    },
    {
      n: "02", name: "artiste.md", mono: true,
      tag: "Your creative DNA, on disk.",
      desc: "Like claude.md, but for artists. Ten A&R agents deployed as a stack around every roster member.",
      accent: "var(--sky)", badge: ["prod", "● Product"], score: 0.84,
      stats: [
        { lbl: "Agents", val: "10", d: "all live", trend: "up" },
        { lbl: "Roster", val: "14", d: "+2 this Q", trend: "up" },
        { lbl: "Sync Hits", val: "37", d: "+4 / week", trend: "up" },
      ],
    },
    {
      n: "03", name: "royalty.md", mono: true,
      tag: "Everybody needs to eat.",
      desc: "How artists get paid — real-time, transparent, programmable. Closes the loop.",
      accent: "var(--gold)", badge: ["dev", "● In Dev"], score: 0.42,
      stats: [
        { lbl: "Build", val: "42%", d: "Q3 ship", trend: "up" },
        { lbl: "Pilots", val: "03", d: "in test", trend: "" },
        { lbl: "Avg Pay·d", val: "$840", d: "+$120", trend: "up" },
      ],
    },
  ];

  return (
    <section className="props">
      <div className="wrap">
        <SectionHead jp="三つの所有">Three properties · One science</SectionHead>
        <div className="props__grid">
          {props.map(p => (
            <a key={p.n} className="prop" style={{ ['--accent']: p.accent }}>
              <div className="prop__head">
                <div className="prop__head-l">
                  <div className="prop__num">{p.n}</div>
                  <div className={`prop__name ${p.mono ? "prop__name--mono" : ""}`}>{p.name}</div>
                </div>
                <div className="minimeter" title={`Maya score ${p.score}`}>
                  <div className="minimeter__bar">
                    <div className="minimeter__fill" style={{ width: `${p.score * 100}%` }} />
                  </div>
                  <span className="minimeter__num">{p.score.toFixed(2)}</span>
                </div>
              </div>
              <div className="prop__tag">{p.tag}</div>
              <div className="prop__desc">{p.desc}</div>
              <div className="prop__stats">
                {p.stats.map((s, i) => (
                  <div key={i} className="statbox">
                    <div className="statbox__lbl">{s.lbl}</div>
                    <div className="statbox__val" style={{ color: p.accent === "var(--gold)" ? "var(--ink)" : p.accent }}>{s.val}</div>
                    <div className="statbox__delta"><span className={s.trend}>{s.d}</span></div>
                  </div>
                ))}
              </div>
              <div className="prop__foot">
                <span className={`badge badge--${p.badge[0]}`}>{p.badge[1]}</span>
                <span className="prop__foot-link">Open ↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── AGENTS ─────────────────────────────────────────── */
function AgentsBlock() {
  const [open, setOpen] = useState(null); // agent tuple or null
  return (
    <section className="agents-band">
      <div className="wrap">
        <SectionHead jp="十のエージェント">10 agents · always on</SectionHead>
        <div className="agents">
          {AGENTS.map((a) => {
            const [n, name, desc] = a;
            return (
              <button key={n} className="agent" onClick={() => setOpen(a)} type="button">
                <div className="agent__dot" />
                <div className="agent__n">{n}</div>
                <div className="agent__lbl">{name}</div>
                <div className="agent__open">↗</div>
              </button>
            );
          })}
        </div>
        <div className="agents__hint">— Click any agent to open its live prototype.</div>
      </div>
      {open && <AgentModal agent={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

/* ── PORTAL GLIMPSE ─────────────────────────────────── */
function PortalGlimpse({ setPage }) {
  const [streams, setStreams] = useState(214203);
  useEffect(() => {
    const id = setInterval(() => setStreams(s => s + Math.floor(Math.random() * 80)), 1100);
    return () => clearInterval(id);
  }, []);
  const tiles = [
    { big: "14",   lbl: "Artists",   sub: "所属 · Active",  delta: ["+2 Q",   "up"], color: "var(--gold)",   seed: 1 },
    { big: streams.toLocaleString(), lbl: "Streams · 24h", sub: "+14% vs forecast", delta: ["LIVE",  "up"], color: "var(--signal)", seed: 4 },
    { big: "0.74", lbl: "Hit Index", sub: "ロースター avg.",  delta: ["+0.03", "up"], color: "var(--cherry)", seed: 7 },
  ];
  return (
    <section className="portal">
      <div className="wrap">
        <div className="portal__h">
          <SectionHead jp="今日の信号">Today's signal · A peek</SectionHead>
          <button className="btn btn--primary" onClick={() => setPage("portal")}>Open Portal →</button>
        </div>
        <div className="tiles">
          {tiles.map((t, i) => (
            <div key={i} className="tile" onClick={() => setPage("portal")}>
              <div className="tile__big" style={{ color: t.color }}>{t.big}</div>
              <div className="tile__lbl">{t.lbl}</div>
              <div className="tile__sub">{t.sub}</div>
              <div style={{ color: t.color, marginTop: 2 }}>
                <Sparkline seed={t.seed} color={t.color} />
              </div>
              <div className={`tile__delta ${t.delta[1]}`}>{t.delta[1] === "up" ? "↑ " : ""}{t.delta[0]}</div>
            </div>
          ))}
        </div>
        <div className="brief">
          <div className="brief__head">
            <span>Daily Briefing · 報告 · 06:42 NYC</span>
            <span className="badge badge--llm">● MAYA</span>
          </div>
          <div className="brief__body">
            APAC engagement on <em>Cassette</em> up 14% overnight. A Tokyo fashion account drove the lift via a Margiela try-on using the bridge. TikTok velocity +412 in 24h — 68% from South Korea. Recommend KR liner-note translation within 48 hours.
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Landing, HitHero, GUINav, NowPlayingBlock, NowShowingBlock, PropertiesBlock, AgentsBlock, PortalGlimpse });
