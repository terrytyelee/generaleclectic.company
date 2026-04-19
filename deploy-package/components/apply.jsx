// Apply flow — 4-step intake
function Apply({ setPage }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: "", project: "", email: "",
    discipline: [], stage: "",
    bio: "", inspirations: "",
    tracks: [
      { name: "velour.wav", len: "3:42", key: "F#m", tag: "MASTER" },
      { name: "opening_state.wav", len: "2:51", key: "Cmaj", tag: "ROUGH" },
    ],
    needs: [],
  });

  const steps = ["Identity", "Discipline", "Work", "Intent"];

  const next = () => setStep(s => Math.min(s + 1, 3));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const toggle = (field, v) => setData(d => ({
    ...d,
    [field]: d[field].includes(v) ? d[field].filter(x => x !== v) : [...d[field], v]
  }));

  return (
    <div className="apply">
      <div className="apply__progress">
        {steps.map((s, i) => (
          <div key={s} className={`apply__step ${i < step ? "is-done" : ""} ${i === step ? "is-active" : ""}`}>
            {String(i + 1).padStart(2, "0")} — {s}
          </div>
        ))}
      </div>

      <div className="apply__eyebrow">
        <span className="eyebrow">Roster Intake · v1.0</span>
      </div>

      {step === 0 && <Step0 data={data} setData={setData} />}
      {step === 1 && <Step1 data={data} toggle={toggle} setData={setData} />}
      {step === 2 && <Step2 data={data} setData={setData} />}
      {step === 3 && <Step3 data={data} toggle={toggle} setData={setData} setPage={setPage} />}

      {step < 3 && (
        <div className="apply__footer">
          <button className="btn btn--ghost" onClick={back} disabled={step === 0} style={{ opacity: step === 0 ? 0.3 : 1 }}>
            ← Back
          </button>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span className="code">{String(step + 1).padStart(2, "0")} / 04</span>
            <button className="btn btn--primary" onClick={next}>Continue →</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Step0({ data, setData }) {
  return (
    <div>
      <h1 className="apply__display">Who are <em>you.</em></h1>
      <p className="apply__sub">
        We review applications in the order they arrive. State your name, your project, and where to reach you.
      </p>

      <div className="field">
        <label className="field__label">Legal Name</label>
        <input className="field__input" placeholder="Eliza Moreau" value={data.name} onChange={e => setData({...data, name: e.target.value})} />
      </div>
      <div className="field">
        <label className="field__label">Project / Alias</label>
        <input className="field__input" placeholder="Velour. // The Ensemble. // as yourself." value={data.project} onChange={e => setData({...data, project: e.target.value})} />
      </div>
      <div className="field">
        <label className="field__label">Contact</label>
        <input className="field__input" placeholder="you@domain.com" value={data.email} onChange={e => setData({...data, email: e.target.value})} />
        <div className="field__help">Reviewed within 48 hours. No auto-responders.</div>
      </div>
    </div>
  );
}

function Step1({ data, toggle, setData }) {
  const disciplines = ["Recording Artist", "Producer", "Composer", "Songwriter", "Collective", "Vocalist", "Instrumentalist", "Beatmaker"];
  const stages = ["Pre-debut", "Debut Cycle", "Catalog (1–3 releases)", "Established (4+ releases)"];
  return (
    <div>
      <h1 className="apply__display">What <em>kind</em> of work.</h1>
      <p className="apply__sub">Eclecticism is a feature. Select every discipline that applies.</p>

      <div className="field">
        <label className="field__label">Discipline — select all</label>
        <div className="chip-row">
          {disciplines.map(d => (
            <button key={d} className={`chip ${data.discipline.includes(d) ? "is-on" : ""}`} onClick={() => toggle("discipline", d)}>
              {d}
            </button>
          ))}
        </div>
      </div>
      <div className="field">
        <label className="field__label">Stage</label>
        <div className="chip-row">
          {stages.map(s => (
            <button key={s} className={`chip ${data.stage === s ? "is-on" : ""}`} onClick={() => setData({...data, stage: s})}>
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="field">
        <label className="field__label">Short Bio</label>
        <textarea className="field__textarea" rows="3" placeholder="Two sentences. The shape of the work — not the résumé." value={data.bio} onChange={e => setData({...data, bio: e.target.value})} />
      </div>
    </div>
  );
}

function Step2({ data, setData }) {
  return (
    <div>
      <h1 className="apply__display">The <em>work</em> speaks.</h1>
      <p className="apply__sub">Upload up to five tracks. WAV, FLAC, or high-bitrate MP3. Stems welcome.</p>

      <div className="drop">
        <div className="drop__icon">↑</div>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: 17, color: "var(--ink)", marginBottom: 4 }}>Drop audio files here.</div>
        <div className="drop__note">Or · Click to browse · Max 5 files · 100mb each</div>
      </div>

      <div className="track-list">
        {data.tracks.map((t, i) => (
          <div key={i} className="track">
            <div className="track__num">{String(i + 1).padStart(2, "0")}</div>
            <div className="track__name">{t.name}</div>
            <div className="track__meta">{t.len} · {t.key}</div>
            <div><span className="track__tag">{t.tag}</span></div>
            <div className="track__meta" style={{ textAlign: "right", cursor: "pointer" }}>Remove ×</div>
          </div>
        ))}
      </div>

      <div className="field" style={{ marginTop: 32 }}>
        <label className="field__label">Inspirations / Constellation</label>
        <textarea className="field__textarea" rows="2" placeholder="Three artists, one filmmaker, one book. Not for taste matching — for mapping." value={data.inspirations} onChange={e => setData({...data, inspirations: e.target.value})} />
      </div>
    </div>
  );
}

function Step3({ data, toggle, setPage }) {
  const needs = ["A&R / Taste", "Release Ops", "Publishing", "Sync", "Touring", "Visual Identity", "Financing", "Full Infrastructure"];
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div style={{ paddingTop: 40, textAlign: "left" }}>
        <div className="eyebrow" style={{ marginBottom: 20 }}>05 — Received</div>
        <h1 className="apply__display">In the <em>queue.</em></h1>
        <p className="apply__sub" style={{ maxWidth: "48ch" }}>
          Your application is logged. Maya has opened a review file. A human from the A&R desk will reach out within 48 hours. If we move forward, you'll receive portal credentials by the end of the week.
        </p>
        <div className="code" style={{ marginBottom: 32 }}>
          TICKET #GE-2026-0418-{Math.floor(Math.random()*9000)+1000} · {new Date().toISOString().slice(0,10).replace(/-/g, ".")}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn--primary" onClick={() => setPage("portal")}>Preview the Portal →</button>
          <button className="btn btn--ghost" onClick={() => setPage("home")}>Back to Index</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="apply__display">What do you <em>need.</em></h1>
      <p className="apply__sub">Select the infrastructure layers you want from us. Everything else, you keep.</p>

      <div className="field">
        <div className="chip-row">
          {needs.map(n => (
            <button key={n} className={`chip ${data.needs.includes(n) ? "is-on" : ""}`} onClick={() => toggle("needs", n)}>{n}</button>
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--rule)", padding: "24px 0", marginTop: 32 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Summary</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-3)" }}>
          <div>Name<br/><span style={{ color: "var(--ink)", fontFamily: "var(--font-sans)", fontSize: 14, textTransform: "none", letterSpacing: "-0.01em" }}>{data.name || "—"}</span></div>
          <div>Project<br/><span style={{ color: "var(--ink)", fontFamily: "var(--font-sans)", fontSize: 14, textTransform: "none", letterSpacing: "-0.01em" }}>{data.project || "—"}</span></div>
          <div>Discipline<br/><span style={{ color: "var(--ink)", fontFamily: "var(--font-sans)", fontSize: 14, textTransform: "none", letterSpacing: "-0.01em" }}>{data.discipline.join(" · ") || "—"}</span></div>
          <div>Stage<br/><span style={{ color: "var(--ink)", fontFamily: "var(--font-sans)", fontSize: 14, textTransform: "none", letterSpacing: "-0.01em" }}>{data.stage || "—"}</span></div>
          <div>Tracks<br/><span style={{ color: "var(--ink)", fontFamily: "var(--font-sans)", fontSize: 14, textTransform: "none", letterSpacing: "-0.01em" }}>{data.tracks.length} attached</span></div>
          <div>Needs<br/><span style={{ color: "var(--ink)", fontFamily: "var(--font-sans)", fontSize: 14, textTransform: "none", letterSpacing: "-0.01em" }}>{data.needs.join(" · ") || "—"}</span></div>
        </div>
      </div>

      <div className="apply__footer">
        <button className="btn btn--ghost">← Back</button>
        <button className="btn btn--primary" onClick={() => setSent(true)}>Submit Application →</button>
      </div>
    </div>
  );
}

Object.assign(window, { Apply });
