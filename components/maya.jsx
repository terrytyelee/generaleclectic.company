// MAYA console — wrapped in .wrap
function Maya() {
  const [msgs, setMsgs] = useState([
    { who: "MAYA", text: "Morning. APAC engagement on 'Cassette' jumped 14% overnight — Tokyo fashion driving it.", score: 0.91 },
    { who: "YOU",  text: "Pull liner notes for KR translation." },
    { who: "MAYA", text: "Queued. Velour. has 412 new TikTok sounds in 24h. 68% from South Korea. Recommend fast-track.", score: 0.87 },
  ]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);
  const [conf, setConf] = useState(0.91);

  useEffect(() => {
    const id = setInterval(() => {
      setConf(prev => Math.max(0.82, Math.min(0.96, prev + (Math.random() - 0.45) * 0.02)));
    }, 2100);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, typing]);

  const send = (text) => {
    if (!text.trim()) return;
    setMsgs(m => [...m, { who: "YOU", text }]);
    setDraft("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const score = Math.round((0.78 + Math.random() * 0.18) * 100) / 100;
      const replies = [
        "On it. Pulling the signal now — give me a moment.",
        "Roster pulse: Velour. trending +14%, Ensemble. flat, three new sync requests open.",
        "Today's brief: Margiela bridge converted, KR localization queued, 03 of 12 cycle on-track.",
      ];
      setMsgs(m => [...m, { who: "MAYA", text: replies[Math.floor(Math.random() * replies.length)], score }]);
    }, 1100);
  };

  const pads = [
    { lbl: "Today's Brief",     n: "01", cls: "pad--gold",   q: "What's the brief for today?" },
    { lbl: "Roster Pulse",      n: "02", cls: "pad--cherry", q: "Show me roster pulse." },
    { lbl: "Streaming Signal",  n: "03", cls: "pad--sky",    q: "Streaming signal across the roster?" },
    { lbl: "What Should I Do?", n: "04", cls: "pad--cream",  q: "What should I do next?" },
  ];

  return (
    <section className="maya">
      <div className="wrap">
        <SectionHead jp="マヤ">MAYA · Talk to her</SectionHead>
        <div className="maya__shell">
          <div className="maya__head">
            <div className="maya__title">
              <div className="maya__orb" />
              <div className="maya__t-wrap">
                <h3>Maya</h3>
                <span className="maya__conf">CONFIDENCE · {conf.toFixed(2)}</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="maya__waveform" aria-hidden="true">
                <span /><span /><span /><span /><span />
              </span>
              <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.16em", color: "var(--signal)" }}>● LISTENING</span>
            </div>
          </div>

          <div className="maya__transcript" ref={scrollRef}>
            {msgs.map((m, i) => (
              <div key={i} className={`bubble bubble--${m.who === "MAYA" ? "maya" : "user"}`}>
                <span className="bubble__who">
                  {m.who}
                  {m.score && <span className="bubble__score">CONF {m.score.toFixed(2)}</span>}
                </span>
                {m.text}
              </div>
            ))}
            {typing && (
              <div className="bubble bubble--maya">
                <span className="bubble__who">MAYA · thinking</span>
                <div className="typing"><span/><span/><span/></div>
              </div>
            )}
          </div>

          <div className="maya__pads">
            {pads.map(p => (
              <button key={p.n} className={`pad ${p.cls}`} onClick={() => send(p.q)}>
                <span className="pad__n">{p.n}</span>
                {p.lbl}
              </button>
            ))}
          </div>

          <form className="maya__input" onSubmit={e => { e.preventDefault(); send(draft); }}>
            <input
              className="maya__field"
              placeholder="Ask Maya — roster, signal, sync, plans…"
              value={draft}
              onChange={e => setDraft(e.target.value)}
            />
            <button type="submit" className="maya__send">Send →</button>
          </form>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Maya });
