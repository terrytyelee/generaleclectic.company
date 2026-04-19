// Tweaks panel
function Tweaks() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(true);
  const [state, setState] = useState(window.__TWEAKS__ || { mode: "dark", accent: "gold" });

  useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === "__activate_edit_mode") setActive(true);
      if (e.data?.type === "__deactivate_edit_mode") setActive(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-mode", state.mode);
  }, [state.mode]);

  const set = (patch) => {
    const next = { ...state, ...patch };
    setState(next);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: patch }, "*");
  };

  if (!active) return null;

  return (
    <div className="tw">
      <div className="tw__head" onClick={() => setOpen(o => !o)}>
        <span>Tweaks</span>
        <span>{open ? "−" : "+"}</span>
      </div>
      {open && (
        <div className="tw__body">
          <div>
            <div className="tw__lbl">Mode</div>
            <div className="tw__opts">
              {["dark", "light"].map(m => (
                <button key={m} className={`tw__opt ${state.mode === m ? "on" : ""}`} onClick={() => set({ mode: m })}>{m}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Tweaks });
