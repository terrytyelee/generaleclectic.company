import { useState } from "react";

const properties = [
  {
    name: "Generally Eclectic",
    label: "001",
    tagline: "Managing eclectic humans",
    status: "Active",
    accent: "#6366f1",
    domain: "generallyeclectic.com",
  },
  {
    name: "artiste.md",
    label: "002",
    tagline: "Intelligent artistry",
    status: "Internal",
    accent: "#8b5cf6",
  },
  {
    name: "royalty.md",
    label: "003",
    tagline: "Everybody needs to eat",
    status: "In Development",
    accent: "#06b6d4",
  },
];

const StatusPill = ({ status }) => {
  const colors = {
    Active: "#10b981",
    Internal: "#8b5cf6",
    "In Development": "#f59e0b",
  };
  const c = colors[status] || "#94a3b8";
  return (
    <span
      style={{
        fontSize: "0.6rem",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: c,
        background: c + "12",
        borderRadius: "4px",
        padding: "3px 8px",
        fontFamily:
          "'IBM Plex Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {status}
    </span>
  );
};

const PropertyCard = ({ property, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderTop: `2px solid ${hovered ? property.accent : "#e5e7eb"}`,
        padding: "28px 0",
        transition: "all 0.25s ease",
        cursor: "default",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "14px",
        }}
      >
        <span
          style={{
            fontSize: "0.65rem",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#9ca3af",
            fontFamily:
              "'IBM Plex Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          {property.label}
        </span>
        <StatusPill status={property.status} />
      </div>
      <h3
        style={{
          fontSize: "1.35rem",
          fontWeight: 700,
          color: "#111827",
          margin: "0 0 8px 0",
          letterSpacing: "-0.02em",
          fontFamily:
            "'IBM Plex Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {property.name}
      </h3>
      <p
        style={{
          fontSize: "0.9rem",
          color: "#6b7280",
          margin: 0,
          lineHeight: 1.55,
          fontFamily:
            "'IBM Plex Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {property.tagline}
      </p>
    </div>
  );
};

export default function GeneralEclectic() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        color: "#111827",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px 24px",
        fontFamily:
          "'IBM Plex Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Header */}
      <header style={{ textAlign: "left", maxWidth: "720px", width: "100%", marginBottom: "56px" }}>
        <div
          style={{
            fontSize: "0.6rem",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#9ca3af",
            marginBottom: "16px",
          }}
        >
          G.E. Creative Infrastructures
        </div>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 800,
            letterSpacing: "-0.035em",
            margin: "0 0 16px 0",
            color: "#111827",
            lineHeight: 1.1,
          }}
        >
          General Eclectic
        </h1>
        <p
          style={{
            fontSize: "1.05rem",
            color: "#6b7280",
            maxWidth: "480px",
            lineHeight: 1.6,
            margin: 0,
            fontWeight: 400,
          }}
        >
          Intelligence for creativity.
        </p>
      </header>

      {/* Properties */}
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
        }}
      >
        {properties.map((p, i) => (
          <PropertyCard key={p.name} property={p} index={i} />
        ))}
      </div>

      {/* Footer */}
      <footer
        style={{
          marginTop: "72px",
          width: "100%",
          maxWidth: "720px",
          borderTop: "1px solid #f3f4f6",
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <span
          style={{
            color: "#d1d5db",
            fontSize: "0.7rem",
            fontWeight: 500,
            letterSpacing: "0.05em",
          }}
        >
          © 2026 G.E. Creative Infrastructures
        </span>
        <span
          style={{
            color: "#d1d5db",
            fontSize: "0.65rem",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          generaleclectic.company
        </span>
      </footer>
    </div>
  );
}
