# General Eclectic

**G.E. Creative Infrastructures — Intelligence for creativity.**

A design prototype for General Eclectic's operator portal, client-facing site, and custodial AI agents (Maya, artiste.md, etc). Built as a single-file HTML/JSX prototype with an Akai MPC-inspired console aesthetic.

## Structure

```
General Eclectic.html             # main entry — open in a browser
General Eclectic v1 - Spec Sheet.html
styles.css                        # all visual tokens + component styles
app.jsx                           # React root, page router
components/                       # React components (JSX, Babel-transpiled in-browser)
  landing.jsx
  apply.jsx
  dashboard.jsx                   # portal shell + overview
  maya.jsx
  artiste.jsx
  agents.jsx
  topbar.jsx
  tweaks.jsx
design_handoff_general_eclectic/  # developer handoff package with README + assets
screenshots/                      # reference screens
```

## Running locally

No build step. Serve the folder over HTTP (the `<script type="text/babel">` imports need http://, not file://):

```bash
cd generaleclectic.company
python3 -m http.server 8000
# open http://localhost:8000/General%20Eclectic.html
```

Or with Node:

```bash
npx serve .
```

## Developer handoff

See `design_handoff_general_eclectic/README.md` for the full spec, component inventory, and production-build guidance.

---

© General Eclectic
