// Portal — full instrument grid
function Portal({ setPage }) {
  const [streams, setStreams] = useState(214203);
  useEffect(() => {
    const id = setInterval(() => setStreams(s => s + Math.floor(Math.random() * 80)), 1100);
    return () => clearInterval(id);
  }, []);

  const tiles = [
    { big: "14",                     lbl: "Artists",      sub: "所属",        delta: ["+2 Q",  "up"], color: "var(--gold)",   seed: 1 },
    { big: "10",                     lbl: "Agents",       sub: "配備 · Live", delta: ["all on","up"], color: "var(--sky)",    seed: 2 },
    { big: streams.toLocaleString(), lbl: "Streams · 24h",sub: "再生",        delta: ["LIVE",  "up"], color: "var(--signal)", seed: 4 },
    { big: "0.74",                   lbl: "Hit Index",    sub: "ロースター",  delta: ["+0.03","up"], color: "var(--cherry)", seed: 7 },
    { big: "+14%",                   lbl: "vs Forecast",  sub: "予測",        delta: ["24h",  "up"], color: "var(--gold)",   seed: 5 },
    { big: "03",                     lbl: "Cycle",        sub: "周期 / 12",   delta: ["on-track",""], color: "var(--cherry)",  seed: 9 },
  ];

  return (
    <section className="portal">
      <div className="wrap">
        <div className="portal__h">
          <SectionHead jp="機密 · 関係者用">Portal · Today's signal</SectionHead>
          <button className="btn btn--gold" onClick={() => setPage("home")}>← Back to Index</button>
        </div>
        <h1 className="apply__h" style={{ marginBottom: 20, marginTop: 8 }}>The roster, <em>live.</em></h1>

        <div className="tiles">
          {tiles.map((t, i) => (
            <div key={i} className="tile">
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
            <span>Daily Briefing · 報告</span>
            <span className="badge badge--llm">● MAYA · 0.91</span>
          </div>
          <div className="brief__body">
            APAC engagement on <em>Cassette</em> up 14% overnight. A Tokyo fashion account drove the lift via a Margiela try-on using the bridge. TikTok velocity +412 in 24h — 68% from South Korea. Recommend KR liner-note translation within 48 hours.
          </div>
        </div>
      </div>

      <Maya />
    </section>
  );
}

Object.assign(window, { Portal });
