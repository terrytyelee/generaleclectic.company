// Landing page — industrial spec-sheet (JP 80s)
function Landing({ setPage }) {
  const now = new Date();
  const docNo = "GE-" + now.getFullYear() + "-" + String(now.getMonth()+1).padStart(2,"0") + String(now.getDate()).padStart(2,"0") + "-001";

  return (
    <div style={{ position: "relative" }}>
      {/* 株式会社 strip */}
      <div className="kaisha">
        <div className="kaisha__left">
          <span>株式会社</span>
          <span style={{ color: "var(--gold)" }}>G.E. CREATIVE INFRASTRUCTURES</span>
        </div>
        <div className="kaisha__mid">TECHNICAL OVERVIEW · v1.0</div>
        <div className="kaisha__right">
          <span className="jp">技術仕様書</span>
          <span>Doc. {docNo}</span>
          <span>04 / 18 / 26</span>
        </div>
      </div>

      {/* HERO — spec sheet */}
      <section className="hero-jp">
        <div className="tombo tombo--tl" style={{ top: 12, left: 12 }}></div>
        <div className="tombo tombo--tr" style={{ top: 12, right: 12 }}></div>

        <div className="hero-jp__meta">
          <span className="doc-no">FIG. 01 — 総合</span>
          <span>General Eclectic · Creative Infrastructure Platform</span>
          <span className="jp">機密 / CONFIDENTIAL</span>
          <span>Page 01 of 04</span>
        </div>

        <div className="hero-jp__grid">
          {/* vertical tategaki */}
          <div className="hero-jp__vertical">
            <span>株式会社</span><br/>
            <em>芸術のための知性</em>
          </div>

          {/* wordmark block */}
          <div>
            <div className="hero-jp__wm-block">
              <div className="hero-jp__jp-title">ゼネラル・エクレクティック</div>
              <h1 className="hero-jp__wm">GENERAL<br/>ECLECTIC</h1>
              <div className="hero-jp__tagline">
                <span className="en">Intelligence for Artistry.</span>
                <span className="jp">芸術家のための知性。</span>
              </div>
            </div>

            <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, maxWidth: 720 }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 8 }}>概要 · Abstract</div>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: 15, lineHeight: 1.55, color: "var(--ink-2)", margin: 0 }}>
                  We build the pipes, the rails, the power grid — but for artists. Infrastructure over spectacle. Rigor meets taste.
                </p>
              </div>
              <div>
                <div className="eyebrow" style={{ marginBottom: 8 }}>方針 · Principles</div>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: 15, lineHeight: 1.55, color: "var(--ink-2)", margin: 0 }}>
                  Artistry is serious work. We treat creative output with the same precision as quantitative analysis.
                </p>
              </div>
            </div>
          </div>

          {/* right spec table */}
          <aside className="hero-jp__right">
            <div className="table">
              <div><span className="lbl">Entity<span className="jp">法人名</span></span><span className="v">G.E. C.I.</span></div>
              <div><span className="lbl">Founded<span className="jp">設立</span></span><span className="v">2026</span></div>
              <div><span className="lbl">Domain<span className="jp">領域</span></span><span className="v">.company</span></div>
              <div><span className="lbl">Roster<span className="jp">所属</span></span><span className="v gold">14 artists</span></div>
              <div><span className="lbl">Agents<span className="jp">配備</span></span><span className="v gold">10 / 10</span></div>
              <div><span className="lbl">Signal<span className="jp">信号</span></span><span className="v" style={{ color: "var(--signal)" }}>● Active</span></div>
            </div>
            <div className="hero-jp__cta">
              <button className="btn btn--primary" onClick={() => setPage("apply")}>Apply to Roster →</button>
              <button className="btn btn--ghost" onClick={() => setPage("portal")}>Open Portal 開く</button>
            </div>
          </aside>
        </div>
      </section>

      {/* Spec strip */}
      <div style={{ maxWidth: 1520, margin: "0 auto", padding: "24px 48px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "var(--rule)", border: "1px solid var(--rule)", borderLeft: 0, borderRight: 0 }}>
        {[
          ["14", "Artists on active roster.", "所属アーティスト"],
          ["10", "A&R agents via artiste.md.", "配備エージェント"],
          ["∞", "Release formats supported.", "リリース形式"],
          ["4%", "Watermark opacity, always.", "透かし濃度"],
        ].map((m, i) => (
          <div key={i} style={{ background: "var(--bg)", padding: "20px 22px" }}>
            <div style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 44, lineHeight: 1, letterSpacing: "-0.04em", color: i === 1 || i === 2 ? "var(--gold)" : "var(--ink)" }}>{m[0]}</div>
            <div style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)", marginTop: 10 }}>{m[1]}</div>
            <div style={{ fontFamily: "var(--font-jp)", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", color: "var(--ink-4)", marginTop: 4 }}>{m[2]}</div>
          </div>
        ))}
      </div>

      {/* CHAPTER 壱 — The Model */}
      <section className="section-jp">
        <div className="section-jp__chapter">
          <div className="section-jp__num">
            <span className="no">01</span>
            <span className="kanji">壱 · 模型</span>
          </div>
          <h2 className="section-jp__title-en">The old label is linear.<br/>We built something <em>dynamic.</em></h2>
          <div className="section-jp__slug">Ch. 01 / 04</div>
        </div>

        <div className="spec-compare">
          <div className="head">Parameter<span className="jp">項目</span></div>
          <div className="head">Legacy Model<span className="jp">旧モデル</span></div>
          <div className="head">G.E. Protocol<span className="jp">新方式</span></div>

          {[
            ["Release cadence", "配信頻度", "Quarterly", "Continuous"],
            ["A&R process", "選抜方式", "Taste-Led", "Maya + Taste"],
            ["Royalty settlement", "印税精算", "Bi-Annual", "Real-Time"],
            ["Format fidelity", "形式対応", "Singular", "Eclectic"],
            ["Upside", "利得配分", "Asymmetric", "Shared"],
          ].map(([k, jp, l, d], i) => (
            <React.Fragment key={i}>
              <div className="row-label">{k}<span className="jp">{jp}</span></div>
              <div className="legacy">{l}</div>
              <div className="dynamic">{d}</div>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* CHAPTER 弐 — The Stack */}
      <section className="section-jp">
        <div className="section-jp__chapter">
          <div className="section-jp__num">
            <span className="no">02</span>
            <span className="kanji">弐 · 構成</span>
          </div>
          <h2 className="section-jp__title-en">artiste.md — a suite of <em>ten A&R agents.</em></h2>
          <div className="section-jp__slug">Ch. 02 / 04</div>
        </div>

        <div className="stack-jp">
          {[
            ["01", "零壱", "Voice", "声", "Vocal identity modeling. Timbre, cadence, signature phrasing.", "v0.4.2", "stable"],
            ["02", "零弐", "Personality", "人格", "Long-horizon persona coherence across releases.", "v0.3.1", "stable"],
            ["03", "零参", "Engagement", "関与", "Fan telemetry. Who shows up, and when they stop.", "v0.5.0", "stable"],
            ["04", "零肆", "Streaming", "配信", "Platform-aware release timing and payload.", "v0.4.7", "stable"],
            ["05", "零伍", "Touring", "巡業", "Routing, markets, demand-weighted calendars.", "v0.2.0", "beta"],
            ["06", "零陸", "Localization", "翻訳", "Translation + cultural context by market.", "v0.4.3", "stable"],
            ["07", "零漆", "Liquid API", "開口部", "Open surface for collaborators and partners.", "v0.1.9", "beta"],
            ["08", "零捌", "Social Sync", "連動", "Narrative continuity across platforms.", "v0.3.8", "stable"],
            ["09", "零玖", "Intelligence", "諜報", "Market, mood, and competitive read-outs.", "v0.5.2", "stable"],
            ["10", "壱零", "Reports", "報告", "Daily A&R briefings. Machine-written, human-edited.", "v0.4.1", "stable"],
          ].map(([n, k, title, jp, desc, v, s]) => (
            <div key={n} className="stack-jp__cell">
              <div className="stack-jp__num">
                <span>{n}</span>
                <span className="kanji">{k}</span>
              </div>
              <h4 className="stack-jp__title">{title}</h4>
              <div className="stack-jp__title-jp">{jp}</div>
              <p className="stack-jp__desc">{desc}</p>
              <div className="stack-jp__foot">
                <span>{v}</span>
                <span style={{ color: s === "stable" ? "var(--signal)" : "var(--gold)" }}>● {s}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CHAPTER 参 — Thesis */}
      <section className="section-jp" style={{ padding: "100px 48px" }}>
        <div className="section-jp__chapter">
          <div className="section-jp__num">
            <span className="no">03</span>
            <span className="kanji">参 · 論</span>
          </div>
          <h2 className="section-jp__title-en">Bloomberg Terminal meets<br/><em>Criterion Collection.</em></h2>
          <div className="section-jp__slug">Ch. 03 / 04</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 64, alignItems: "start" }}>
          <div className="stamp">認可<br/>APP.</div>
          <div>
            <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 32, lineHeight: 1.25, letterSpacing: "-0.01em", margin: 0, maxWidth: "24ch", color: "var(--ink)" }}>
              We treat creative output with the same precision as quantitative analysis. The best ideas live at <em style={{ color: "var(--gold)" }}>intersections.</em>
            </p>
            <div style={{ marginTop: 32, paddingTop: 16, borderTop: "1px solid var(--rule)", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32 }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 6 }}>序文 · Foreword</div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 14, color: "var(--ink-2)" }}>Founding Memo, 04 / 2026</div>
              </div>
              <div>
                <div className="eyebrow" style={{ marginBottom: 6 }}>著者 · Author</div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 14, color: "var(--ink-2)" }}>G.E. Partners</div>
              </div>
              <div>
                <div className="eyebrow" style={{ marginBottom: 6 }}>版 · Edition</div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 14, color: "var(--ink-2)" }}>v1.0 · April 2026</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 肆 — Ask */}
      <section className="section-jp" style={{ position: "relative" }}>
        <div className="section-jp__chapter">
          <div className="section-jp__num">
            <span className="no">04</span>
            <span className="kanji">肆 · 応募</span>
          </div>
          <h2 className="section-jp__title-en">If you are building something <em>eclectic,</em><br/>bring it here.</h2>
          <div className="section-jp__slug">Ch. 04 / 04</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 22, lineHeight: 1.35, color: "var(--gold)", margin: "0 0 32px", maxWidth: "36ch" }}>
              Intelligence for Artistry. 芸術家のための知性。Applications reviewed continuously.
            </p>
            <div style={{ display: "flex", gap: 10, marginBottom: 40 }}>
              <button className="btn btn--primary" onClick={() => setPage("apply")}>Begin Application →</button>
              <button className="btn btn--ghost" onClick={() => setPage("portal")}>Portal Preview</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px 40px" }}>
              {[
                ["対象", "For", "Recording artists, producers, composers, collectives."],
                ["方針", "Commitment", "Infrastructure-first. No spectacle, no hype cycle."],
                ["地域", "Geography", "Global. Maya localizes to any market."],
                ["選考", "Selection", "Rolling. First read inside 48 hours."],
              ].map(([jp, en, body]) => (
                <div key={en}>
                  <div style={{ fontFamily: "var(--font-jp-sans)", fontSize: 11, letterSpacing: "0.24em", color: "var(--ink-3)", marginBottom: 4 }}>{jp}</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 6 }}>{en}</div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, color: "var(--ink)", lineHeight: 1.35 }}>{body}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ border: "1px solid var(--rule)", padding: "24px", background: "var(--bg-2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", paddingBottom: 16, marginBottom: 16, borderBottom: "1px solid var(--rule)" }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 4 }}>応募用紙 · Form A</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>4 pages · ~6 minutes</div>
              </div>
              <div className="stamp-sq">受付中</div>
            </div>
            <ol style={{ listStyle: "none", padding: 0, margin: 0, counterReset: "step" }}>
              {["Identity 身元", "Discipline 分野", "Work 作品", "Intent 意向"].map((s, i) => (
                <li key={s} style={{ display: "grid", gridTemplateColumns: "32px 1fr auto", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--rule)", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  <span style={{ color: "var(--gold)" }}>0{i+1}</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, letterSpacing: "-0.01em", textTransform: "none" }}>{s}</span>
                  <span style={{ color: "var(--ink-3)" }}>—</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="foot-jp">
        <div>
          <span className="jp">発行 · Issued</span>
          <span>© 2026 G.E. Creative Infrastructures.<br/>All rights reserved.</span>
        </div>
        <div>
          <span className="jp">領域 · Domain</span>
          <span>generaleclectic.company</span>
        </div>
        <div style={{ textAlign: "right" }}>
          <span className="jp">信号 · Signal</span>
          <span style={{ color: "var(--signal)" }}>● Active · Last ping 00:04 ago</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Landing });
