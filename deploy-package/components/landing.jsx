// Landing — Criterion-minimal. All the spectacle moved into the portal.
function Landing({ setPage }) {
  const [t, setT] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const date = t.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" }).toUpperCase();
  const time = t.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "America/New_York" });

  return (
    <div className="min-wrap">
      <div className="min-head">
        <div className="min-head__left">G.E. Creative Infrastructures · Est. 2026</div>
        <div className="min-head__mid">generaleclectic.company</div>
        <div className="min-head__right">
          <span className="jp">機密文書</span>
          <span>{date}</span>
          <span>{time} NYC</span>
        </div>
      </div>

      <div className="min-stage">
        <div className="min-stage__inner">
          <div className="min-eyebrow">
            Index 01 — The Company
            <span className="jp">ゼネラル・エクレクティック</span>
          </div>

          <h1 className="min-wm">
            <span className="jp-above">株式会社 芸術家のための知性</span>
            General<br/>Eclectic
          </h1>

          <p className="min-tag">
            Intelligence for Artistry.
            <span className="jp">芸術家のための知性。</span>
          </p>

          <p className="min-thesis">
            We build the pipes, the rails, the power grid — but for artists.
            Bloomberg Terminal meets Criterion Collection. Rigor meets taste.
            Fourteen artists on active roster. Ten A&R agents running as artiste.md.
          </p>

          <div className="min-cta">
            <button className="btn btn--primary" onClick={() => setPage("apply")}>Apply to Roster →</button>
            <button className="btn" onClick={() => setPage("portal")}>Open Portal</button>
          </div>

          <div className="min-meta">
            <div>
              <div className="v"><span className="gold">14</span></div>
              <div className="l">Artists<span className="jp">所属</span></div>
            </div>
            <div>
              <div className="v"><span className="gold">10</span></div>
              <div className="l">Agents<span className="jp">配備</span></div>
            </div>
            <div>
              <div className="v">∞</div>
              <div className="l">Formats<span className="jp">形式</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="min-foot">
        <div className="min-foot__left">© 2026 G.E.C.I.</div>
        <div className="min-foot__mid">Doc. GE-{t.getFullYear()}-{String(t.getMonth()+1).padStart(2,"0")}{String(t.getDate()).padStart(2,"0")}</div>
        <div className="min-foot__right">● Signal Active</div>
      </div>
    </div>
  );
}

Object.assign(window, { Landing });
