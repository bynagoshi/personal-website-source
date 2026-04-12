import React, { useState } from "react";

// ====== EDIT THESE ======
const PROFILE = {
  name: "Ben Nagoshi",
  title: "Software Engineer",
  about:
    "Masters CS graduate from the University of Florida, passionate about full-stack development, AI, and ML.",
  projects: [
    {
      name: "League of Legends Draft Predictor",
      status: "",
      description:
        "ML model predicting match outcomes from champion selections. Trained on 80,000 matches from the Riot Games API with Selenium scraping. Preliminary 65% accuracy predicting professional Esports matches.",
      tags: ["Python", "ML", "Selenium", "SQL"],
      accent: "#9b72cf",
      href: "https://draftprediction.vercel.app",
    },
    {
      name: "Startup Search",
      status: "",
      description:
        "Startup discovery engine identifying early-stage companies via automated job-posting and community data ingestion with semantic search and heuristic scoring.",
      tags: ["Python", "NLP", "SQL"],
      accent: "#0bc4e3",
      href: "https://github.com/bynagoshi/startup-search",
    },
    {
      name: "Multi-user Whiteboard",
      status: "",
      description:
        "Real-time collaborative whiteboard built in Godot using SpacetimeDB. Supports simultaneous drawing, color/pen controls, and undo/redo.",
      tags: ["Godot", "C#", "SpacetimeDB"],
      accent: "#c89b3c",
      href: "https://github.com/bynagoshi/whiteboard",
    },
  ],
  skills: {
    languages: ["Python", "C++", "C#", "Java", "JavaScript/Typescript", "SQL"],
    tools: [
      "Git",
      "REST APIs",
      "Prisma Studio",
      "Godot",
      "SpacetimeDB",
      "OpenCV",
    ],
  },
  social: [
    {
      label: "Email",
      href: "mailto:bynagoshi@gmail.com",
      description: "bynagoshi@gmail.com",
      color: "#c89b3c",
    },
    {
      label: "GitHub",
      href: "https://github.com/bynagoshi",
      description: "Projects & open source work",
      color: "#f0e6d3",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/benjamin-nagoshi/",
      description: "Connect professionally",
      color: "#0bc4e3",
    },
  ],
};
// ========================

const C = {
  dark: "#010a13",
  panel: "#0a1628",
  panelBorder: "#2e4568",
  gold: "#c89b3c",
  goldLight: "#f0e6d3",
  blue: "#0bc4e3",
  muted: "#d4e8f8",
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function PanelCorners({ color = C.gold }: { color?: string }) {
  const base: React.CSSProperties = {
    position: "absolute",
    width: 11,
    height: 11,
    borderStyle: "solid",
    borderColor: color,
    borderWidth: 0,
  };
  return (
    <>
      <div
        style={{
          ...base,
          top: 0,
          left: 0,
          borderTopWidth: 2,
          borderLeftWidth: 2,
        }}
      />
      <div
        style={{
          ...base,
          top: 0,
          right: 0,
          borderTopWidth: 2,
          borderRightWidth: 2,
        }}
      />
      <div
        style={{
          ...base,
          bottom: 0,
          left: 0,
          borderBottomWidth: 2,
          borderLeftWidth: 2,
        }}
      />
      <div
        style={{
          ...base,
          bottom: 0,
          right: 0,
          borderBottomWidth: 2,
          borderRightWidth: 2,
        }}
      />
    </>
  );
}

function TopBar({ color }: { color: string }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "15%",
        right: "15%",
        height: 1,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity: 0.45,
      }}
    />
  );
}

function SectionLabel({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <p
        style={{
          color: C.muted,
          fontSize: "0.68rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          margin: "0 0 4px",
        }}
      >
        {eyebrow}
      </p>
      <h2
        style={{
          fontFamily: "'Cinzel', serif",
          color: C.goldLight,
          fontSize: "1.3rem",
          fontWeight: 700,
          margin: "0 0 10px",
        }}
      >
        {title}
      </h2>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            height: 1,
            width: 48,
            background: `linear-gradient(90deg, ${C.gold}50, transparent)`,
          }}
        />
        <div
          style={{
            width: 4,
            height: 4,
            background: `${C.gold}60`,
            transform: "rotate(45deg)",
          }}
        />
      </div>
    </div>
  );
}

function lightenHex(hex: string, amount: number) {
  const cleaned = hex.replace("#", "");
  if (cleaned.length !== 6) return hex;
  const value = Number.parseInt(cleaned, 16);
  if (Number.isNaN(value)) return hex;

  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;

  const mix = (channel: number) =>
    Math.min(255, Math.round(channel + (255 - channel) * amount));

  const toHex = (channel: number) => mix(channel).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function Tag({
  label,
  color = C.gold,
  textColor,
}: {
  label: string;
  color?: string;
  textColor?: string;
}) {
  return (
    <span
      style={{
        background: `${color}22`,
        border: `1px solid ${color}66`,
        color: textColor ?? `${color}ff`,
        fontSize: "0.7rem",
        padding: "2px 9px",
        borderRadius: 2,
        fontFamily: "'Cinzel', serif",
        letterSpacing: "0.03em",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

// ── Sections ─────────────────────────────────────────────────────────────────

function ProjectsSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <div style={{ marginBottom: 44 }}>
      <SectionLabel eyebrow="Selected Work" title="Projects" />
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {PROFILE.projects.map(
          ({ name, status, description, tags, accent, href }) => {
            const isHovered = hovered === name;
            const tagTextColor =
              name === "League of Legends Draft Predictor"
                ? lightenHex(accent, 0.65)
                : lightenHex(accent, 0.45);
            return (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setHovered(name)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative",
                  display: "block",
                  background: `linear-gradient(145deg, ${C.panel} 0%, #0d1f35 100%)`,
                  border: `1px solid ${isHovered ? accent : C.panelBorder}`,
                  borderRadius: 3,
                  padding: "18px 22px",
                  transition: "border-color 0.22s, box-shadow 0.22s",
                  boxShadow: isHovered ? `0 0 20px ${accent}20` : "none",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                <PanelCorners color={isHovered ? accent : C.panelBorder} />
                <TopBar color={accent} />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cinzel', serif",
                      color: isHovered ? accent : C.goldLight,
                      fontWeight: 700,
                      fontSize: "0.92rem",
                      transition: "color 0.22s",
                    }}
                  >
                    {name}
                  </span>
                  {status && (
                    <span
                      style={{
                        background: `${accent}18`,
                        border: `1px solid ${accent}40`,
                        color: accent,
                        fontSize: "0.65rem",
                        padding: "1px 7px",
                        borderRadius: 2,
                        letterSpacing: "0.08em",
                      }}
                    >
                      {status}
                    </span>
                  )}
                  <span
                    style={{
                      marginLeft: "auto",
                      color: isHovered ? accent : `${C.muted}60`,
                      fontSize: "0.9rem",
                      transition: "color 0.22s, transform 0.22s",
                      transform: isHovered ? "translateX(3px)" : "none",
                    }}
                  >
                    →
                  </span>
                </div>
                <p
                  style={{
                    color: C.muted,
                    fontSize: "0.82rem",
                    lineHeight: 1.65,
                    margin: "0 0 12px",
                  }}
                >
                  {description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {tags.map((t) => (
                    <Tag
                      key={t}
                      label={t}
                      color={accent}
                      textColor={tagTextColor}
                    />
                  ))}
                </div>
              </a>
            );
          },
        )}
      </div>
    </div>
  );
}

function SkillsSection() {
  return (
    <div style={{ marginBottom: 44 }}>
      <SectionLabel eyebrow="Technologies" title="Skills" />
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <p
            style={{
              color: C.muted,
              fontSize: "0.68rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              margin: "0 0 8px",
            }}
          >
            Languages
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {PROFILE.skills.languages.map((s) => (
              <Tag key={s} label={s} textColor={lightenHex(C.gold, 0.54)} />
            ))}
          </div>
        </div>
        <div>
          <p
            style={{
              color: C.muted,
              fontSize: "0.68rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              margin: "0 0 8px",
            }}
          >
            Tools & Frameworks
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {PROFILE.skills.tools.map((s) => (
              <Tag
                key={s}
                label={s}
                color={C.blue}
                textColor={lightenHex(C.blue, 0.54)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ConnectSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <div style={{ marginBottom: 0 }}>
      <SectionLabel eyebrow="Links & Contact" title="Connect" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {PROFILE.social.map(({ label, href, description, color }) => {
          const isHovered = hovered === label;
          return (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setHovered(label)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "15px 20px",
                background: isHovered
                  ? `linear-gradient(135deg, ${C.panel}, #0d1f35)`
                  : `${C.panel}99`,
                border: `1px solid ${isHovered ? color : C.panelBorder}`,
                borderRadius: 3,
                textDecoration: "none",
                transition: "all 0.22s",
                boxShadow: isHovered ? `0 0 22px ${color}1e` : "none",
              }}
            >
              <PanelCorners color={isHovered ? color : C.panelBorder} />
              <TopBar color={color} />
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    color: isHovered ? color : C.goldLight,
                    transition: "color 0.22s",
                  }}
                >
                  {label}
                </div>
                <div
                  style={{ color: C.muted, fontSize: "0.76rem", marginTop: 2 }}
                >
                  {description}
                </div>
              </div>
              <div
                style={{
                  color: isHovered ? color : `${C.muted}50`,
                  fontSize: "1rem",
                  transition: "color 0.22s, transform 0.22s",
                  transform: isHovered ? "translateX(3px)" : "none",
                }}
              >
                →
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

function Main() {
  return (
    <div
      className="hex-bg"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        padding: "60px 24px",
        color: C.goldLight,
      }}
    >
      {/* Decorative rings */}
      {[700, 480].map((size) => (
        <div
          key={size}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: size,
            height: size,
            border: `1px solid ${C.gold}09`,
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
      ))}

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 640,
        }}
      >
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              marginBottom: 22,
            }}
          >
            <div
              style={{
                flex: 1,
                height: 1,
                background: `linear-gradient(90deg, transparent, ${C.gold})`,
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                background: C.gold,
                transform: "rotate(45deg)",
              }}
            />
            <div
              style={{
                flex: 1,
                height: 1,
                background: `linear-gradient(90deg, ${C.gold}, transparent)`,
              }}
            />
          </div>

          <h1
            className="hero-title"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(2.2rem, 8vw, 3.5rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              margin: "0 0 10px",
            }}
          >
            {PROFILE.name}
          </h1>

          <p
            style={{
              fontFamily: "'Cinzel', serif",
              color: C.blue,
              fontSize: "0.8rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              margin: "0 0 20px",
            }}
          >
            {PROFILE.title}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 32,
                height: 1,
                background: `linear-gradient(90deg, transparent, ${C.gold}60)`,
              }}
            />
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 4,
                  height: 4,
                  background: `${C.gold}60`,
                  transform: "rotate(45deg)",
                }}
              />
            ))}
            <div
              style={{
                width: 32,
                height: 1,
                background: `linear-gradient(90deg, ${C.gold}60, transparent)`,
              }}
            />
          </div>

          <p
            style={{
              color: C.muted,
              fontSize: "0.95rem",
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            {PROFILE.about}
          </p>
        </div>

        <ProjectsSection />
        <SkillsSection />
        <ConnectSection />

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            margin: "36px 0 16px",
          }}
        >
          <div
            style={{
              flex: 1,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${C.gold}25)`,
            }}
          />
          <div
            style={{
              width: 5,
              height: 5,
              background: `${C.gold}35`,
              transform: "rotate(45deg)",
            }}
          />
          <div
            style={{
              flex: 1,
              height: 1,
              background: `linear-gradient(90deg, ${C.gold}25, transparent)`,
            }}
          />
        </div>
        <p
          style={{
            textAlign: "center",
            color: `${C.muted}40`,
            fontSize: "0.72rem",
            margin: 0,
          }}
        >
          © 2025 {PROFILE.name}
        </p>
      </div>
    </div>
  );
}

export default Main;
