// Roster — sticker artist cards
const ROSTER = [
  { initials: "VL",  name: "Velour.",        meta: "Pop · NYC",        tags: ["KR-trend", "TikTok"],   score: 0.86, accent: "var(--cherry)" },
  { initials: "TE",  name: "The Ensemble.",  meta: "Indie Rock · LDN",  tags: ["sync", "touring"],     score: 0.74, accent: "var(--sky)" },
  { initials: "CS",  name: "Cassette",       meta: "R&B · APAC",        tags: ["+14% 24h"],            score: 0.91, accent: "var(--gold)" },
  { initials: "MR",  name: "Moriarty",       meta: "Producer · BLN",    tags: ["dance", "EU sync"],    score: 0.78, accent: "var(--cherry)" },
  { initials: "OL",  name: "Olive Path",     meta: "Folk · LA",         tags: ["acoustic"],            score: 0.66, accent: "var(--gold)" },
  { initials: "KZ",  name: "KAIZO",          meta: "Hyperpop · TYO",    tags: ["JP", "fashion"],       score: 0.83, accent: "var(--sky)" },
  { initials: "BR",  name: "Branca",         meta: "Latin Alt · CDMX",  tags: ["MX", "rising"],        score: 0.71, accent: "var(--cherry)" },
  { initials: "EC",  name: "Echo Park",      meta: "Electronic · LA",    tags: ["sync queue"],          score: 0.69, accent: "var(--sky)" },
  { initials: "SL",  name: "Solene",         meta: "Jazz · PAR",        tags: ["festival"],            score: 0.64, accent: "var(--gold)" },
  { initials: "MK",  name: "Makers Mark",    meta: "Country · NSH",     tags: ["radio"],               score: 0.72, accent: "var(--cherry)" },
  { initials: "AS",  name: "Asahi",          meta: "Ambient · TYO",     tags: ["focus", "lofi"],       score: 0.68, accent: "var(--sky)" },
  { initials: "RN",  name: "Renno",          meta: "Drill · LDN",       tags: ["UK", "TikTok"],        score: 0.81, accent: "var(--cherry)" },
  { initials: "FR",  name: "Frequency",      meta: "House · BLN",       tags: ["club"],                score: 0.75, accent: "var(--gold)" },
  { initials: "WS",  name: "Wavestate",      meta: "Synth · STO",       tags: ["new"],                 score: 0.62, accent: "var(--sky)" },
];

function Roster({ setPage }) {
  return (
    <section className="roster">
      <div className="wrap">
        <SectionHead jp="ロースター · 14名">Roster · 14 artists, always on</SectionHead>
        <div className="roster__grid">
          {ROSTER.map((a, i) => (
            <div key={i} className="artist" style={{ ['--accent']: a.accent }}>
              <div className="artist__avatar">{a.initials}</div>
              <div className="artist__body">
                <div className="artist__name">{a.name}</div>
                <div className="artist__meta">{a.meta}</div>
                <div className="artist__tags">
                  {a.tags.map(t => <span key={t} className="artist__tag">{t}</span>)}
                </div>
              </div>
              <div className="artist__right">
                <div className="artist__score">{a.score.toFixed(2)}</div>
                <div className="artist__score-lbl">HIT</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
          <button className="btn btn--primary" onClick={() => setPage("apply")}>Join the Roster →</button>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Roster, ROSTER });
