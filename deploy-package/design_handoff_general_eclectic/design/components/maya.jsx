// Maya — right-rail intelligence agent
function Maya() {
  const seedMsgs = [
    { role: "maya", text: "Good evening, Velour. Three artifacts overnight. Start with Berlin?" },
    { role: "you", text: "What's the Berlin read?" },
    { role: "maya", text: "Undertow is up 4× in Berlin across two editorial playlists. Likely a curator pull. Recommend holding the remix ten days to let the original breathe, then release into the lift." },
  ];
  const [msgs, setMsgs] = useState(seedMsgs);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, typing]);

  const send = (text) => {
    const t = (text || input).trim();
    if (!t) return;
    setMsgs(m => [...m, { role: "you", text: t }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs(m => [...m, { role: "maya", text: generateReply(t) }]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  };

  const suggestions = [
    "Summarize this week's signal.",
    "Who should open for us in EU?",
    "Draft the A24 sync response.",
    "Show me underperforming markets.",
  ];

  return (
    <aside className="dash__maya">
      <div className="maya__head">
        <div className="maya__orb"></div>
        <div className="maya__title">Maya <span className="tag">Most Advanced Yet Acceptable</span></div>
        <div className="maya__status">● Online</div>
      </div>
      <div className="maya__body" ref={bodyRef}>
        {msgs.map((m, i) => (
          <div key={i} className={`maya__msg ${m.role === "maya" ? "from-maya" : ""}`}>
            <div className="role">{m.role === "maya" ? "Maya" : "Velour."}</div>
            <div className="text" dangerouslySetInnerHTML={{ __html: markEm(m.text) }}></div>
          </div>
        ))}
        {typing && (
          <div className="maya__msg from-maya">
            <div className="role">Maya</div>
            <div className="typing"><span></span><span></span><span></span></div>
          </div>
        )}
      </div>
      <div className="maya__suggest">
        {suggestions.map(s => (
          <button key={s} onClick={() => send(s)}>{s} →</button>
        ))}
      </div>
      <div className="maya__input">
        <input
          placeholder="Ask Maya..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
        />
        <button onClick={() => send()}>Send</button>
      </div>
    </aside>
  );
}

function markEm(text) {
  // wrap certain key phrases in <em> for warmth
  return text
    .replace(/</g, "&lt;")
    .replace(/\b(Berlin|4×|ten days|breathe|steady|continuously|quiet|Maya)\b/g, "<em>$1</em>");
}

function generateReply(q) {
  const lower = q.toLowerCase();
  if (lower.includes("berlin") || lower.includes("signal")) {
    return "Signal is steady. Berlin 4×, Utrecht 38%, Mexico City holding. One anomaly in SF — low priority, will watch.";
  }
  if (lower.includes("open") || lower.includes("tour") || lower.includes("eu")) {
    return "For the EU leg: Astrid Moreau (vocal adjacency) or The Ensemble (audience overlap 41%). Both available. I can draft the ask.";
  }
  if (lower.includes("a24") || lower.includes("sync")) {
    return "Drafted. Two paragraphs. Keeps the cold-open exclusivity but caps it at 90 days. L. Bianchi has the file — review by end of day.";
  }
  if (lower.includes("under") || lower.includes("weak") || lower.includes("lag")) {
    return "Three markets below benchmark: Tokyo, Seoul, São Paulo. Common thread: no localized artwork. Queue for Localization agent?";
  }
  if (lower.includes("royalt") || lower.includes("money") || lower.includes("paid")) {
    return "Balance $24,810 available. Next settlement in 2 hours. Cadence is continuous — you can draw any time.";
  }
  if (lower.includes("release") || lower.includes("next")) {
    return "Next window opens May 8. Undertow remix is mastered. Given Berlin lift, I'd hold ten days. The Infinite Age EP is still on for June 2.";
  }
  return "Noted. Pulling context — one moment while I check the stack.";
}

Object.assign(window, { Maya });
