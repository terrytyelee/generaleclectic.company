// Apply — invitation / referral-only intake
function Apply({ setPage }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [project, setProject] = useState("");
  const [email, setEmail] = useState("");
  const [invite, setInvite] = useState("");
  const [referrer, setReferrer] = useState("");
  const [bio, setBio] = useState("");
  const [needs, setNeeds] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const steps = ["Credential", "Identity", "Work", "Intent"];

  const score = useMemo(() => {
    let s = 0.42;
    if (invite.length >= 4)  s += 0.10;
    if (referrer.length > 2) s += 0.06;
    if (name.length > 2)     s += 0.04;
    if (project.length > 2)  s += 0.06;
    if (email.includes("@")) s += 0.05;
    if (bio.length > 40)     s += 0.10 + Math.min(0.08, bio.length / 1000);
    if (needs.length > 0)    s += 0.05 + needs.length * 0.02;
    if (step >= 2)           s += 0.04;
    return Math.min(0.94, s);
  }, [invite, referrer, name, project, email, bio, needs, step]);

  const toggleNeed = (n) => setNeeds(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n]);

  return (
    <div className="apply">
      <div className="invite-banner">
        <span className="invite-banner__dot" />
        <span><strong>Closed roster.</strong> 14 artists, max. By invitation code or curator referral only.</span>
      </div>

      <div className="apply__scoreband">
        <span>Maya is reading · Fit Score</span>
        <span><b>{score.toFixed(2)}</b> <span style={{ opacity: 0.6, marginLeft: 6 }}>/ 1.00</span></span>
      </div>

      <div className="steps">
        {steps.map((s, i) => (
          <div key={s} className={`step ${i < step ? "is-done" : ""} ${i === step ? "is-on" : ""}`}>
            {String(i+1).padStart(2,"0")} · {s}
          </div>
        ))}
      </div>

      {!submitted && step === 0 && (
        <>
          <h1 className="apply__h">Show your <em>credential.</em></h1>
          <p className="apply__sub">Roster slots open by invitation only. Drop your invite code, or the name of a curator, artist, or producer who pointed you here.</p>
          <div className="field"><label className="field__lbl">Invitation Code <span style={{ opacity: 0.5 }}>· optional if referred</span></label><input className="field__in" placeholder="GE-XXXX-2026" value={invite} onChange={e=>setInvite(e.target.value.toUpperCase())} /></div>
          <div className="field"><label className="field__lbl">Referred by</label><input className="field__in" placeholder="Name of curator, artist, or producer" value={referrer} onChange={e=>setReferrer(e.target.value)} /></div>
          <p style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.08em", opacity: 0.55, marginTop: -4 }}>
            No code, no referral? Continue anyway — you'll go on the waiting list. We open one slot per quarter to cold submissions.
          </p>
        </>
      )}

      {!submitted && step === 1 && (
        <>
          <h1 className="apply__h">Who are <em>you.</em></h1>
          <p className="apply__sub">Eclecticism is a feature. Tell us the shape — not the résumé.</p>
          <div className="field"><label className="field__lbl">Legal Name</label><input className="field__in" placeholder="Eliza Moreau" value={name} onChange={e=>setName(e.target.value)} /></div>
          <div className="field"><label className="field__lbl">Project / Alias</label><input className="field__in" placeholder="Velour. // The Ensemble." value={project} onChange={e=>setProject(e.target.value)} /></div>
          <div className="field"><label className="field__lbl">Contact</label><input className="field__in" placeholder="you@domain.com" value={email} onChange={e=>setEmail(e.target.value)} /></div>
          <div className="field">
            <label className="field__lbl">Short bio</label>
            <textarea className="field__in tarea" rows="4" placeholder="Two sentences about the work you make." value={bio} onChange={e=>setBio(e.target.value)} />
          </div>
        </>
      )}

      {!submitted && step === 2 && (
        <>
          <h1 className="apply__h">The <em>work</em> speaks.</h1>
          <p className="apply__sub">Drop up to 5 audio files. WAV / FLAC / high-bitrate MP3.</p>
          <div className="field" style={{ border: "3px dashed var(--ink)", borderRadius: 18, padding: "40px 20px", textAlign: "center", background: "#fff" }}>
            <div style={{ fontFamily: "var(--f-display)", fontWeight: 800, fontSize: 42, color: "var(--cherry)", textShadow: "3px 3px 0 var(--ink)" }}>↑</div>
            <div style={{ fontFamily: "var(--f-display)", fontWeight: 800, fontSize: 18, marginTop: 8 }}>Drop audio here</div>
            <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.12em", opacity: 0.6, marginTop: 6 }}>OR CLICK TO BROWSE</div>
          </div>
        </>
      )}

      {!submitted && step === 3 && (
        <>
          <h1 className="apply__h">What do you <em>need.</em></h1>
          <p className="apply__sub">Pick the layers you want from us. Everything else, you keep.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            {["A&R / Taste","Release Ops","Publishing","Sync","Touring","Visual Identity","Financing"].map(n => (
              <button
                key={n} type="button" onClick={() => toggleNeed(n)}
                className="step"
                style={{
                  flex: "0 0 auto", padding: "10px 16px", cursor: "pointer",
                  background: needs.includes(n) ? "var(--cherry)" : "transparent",
                  color: needs.includes(n) ? "#fff" : "var(--ink)",
                  opacity: 1, transform: "none",
                }}
              >
                {needs.includes(n) ? "✓ " : ""}{n}
              </button>
            ))}
          </div>
        </>
      )}

      {submitted && (
        <>
          <h1 className="apply__h">{(invite.length >= 4 || referrer.length > 2) ? <>In the <em>queue.</em></> : <>On the <em>list.</em></>}</h1>
          <p className="apply__sub">
            {(invite.length >= 4 || referrer.length > 2)
              ? <>Credential verified. Maya opened a review file with your fit score of <b>{score.toFixed(2)}</b>. A&R will reach you within <b>48 hours</b>.</>
              : <>Logged on the cold-submission waitlist with a fit score of <b>{score.toFixed(2)}</b>. We open one slot per quarter from the list — expect a response window of <b>4–12 weeks</b>.</>}
          </p>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 12, letterSpacing: "0.12em", opacity: 0.65, marginBottom: 24 }}>
            TICKET #GE-2026-0426-{Math.floor(Math.random()*9000)+1000}
            {(invite.length >= 4 || referrer.length > 2) && <span style={{ marginLeft: 12, color: "var(--cherry)" }}>· PRIORITY</span>}
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="btn btn--primary" onClick={() => setPage("portal")}>Preview Portal →</button>
            <button className="btn btn--gold" onClick={() => setPage("home")}>Back to Index</button>
          </div>
        </>
      )}

      {!submitted && (
        <div className="applyfoot">
          <button className="btn btn--ghost" onClick={() => setStep(s => Math.max(0, s-1))} style={{ opacity: step === 0 ? 0.3 : 0.7 }}>← Back</button>
          <button className="btn btn--primary" onClick={() => {
            if (step < 3) setStep(step+1);
            else setSubmitted(true);
          }}>{step < 3 ? "Continue →" : "Submit →"}</button>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Apply });
