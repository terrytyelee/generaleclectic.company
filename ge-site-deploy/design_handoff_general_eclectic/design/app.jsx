// App root
function App() {
  const [page, setPage] = useState(() => localStorage.getItem("ge:page") || "home");
  useEffect(() => { localStorage.setItem("ge:page", page); }, [page]);
  useEffect(() => {
    const mode = (window.__TWEAKS__ && window.__TWEAKS__.mode) || "dark";
    document.body.setAttribute("data-mode", mode);
  }, []);

  return (
    <>
      <TopBar page={page} setPage={setPage} />
      {page === "home" && <Landing setPage={setPage} />}
      {page === "apply" && <Apply setPage={setPage} />}
      {page === "portal" && <Dashboard />}
      <Tweaks />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
