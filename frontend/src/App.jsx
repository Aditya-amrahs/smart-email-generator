import { useState, useEffect } from "react";
import "./index.css";
import { checkHealth } from "./api";
import ComposeTab from "./components/ComposeTab";
import SubjectTab from "./components/SubjectTab";
import ReplyTab from "./components/ReplyTab";

const TABS = [
  { id: "compose", label: "Compose Email", icon: "✉️", sub: "Draft a new email from scratch" },
  { id: "subject", label: "Generate Subject", icon: "🏷️", sub: "Create a subject from a body" },
  { id: "reply",   label: "Reply to Email",  icon: "↩️", sub: "Craft a reply to a received email" },
];

export default function App() {
  const [tab, setTab] = useState("compose");
  const [health, setHealth] = useState(null); // null | "ok" | "err"

  useEffect(() => {
    checkHealth()
      .then(() => setHealth("ok"))
      .catch(() => setHealth("err"));
  }, []);

  const active = TABS.find(t => t.id === tab);

  return (
    <div className="app-shell">
      {/* ── Header ── */}
      <header className="header">
        <div className="logo">
          <div className="logo-icon">✉</div>
          Smart Email Generator
        </div>
        <div className="health-badge">
          <span className={`health-dot ${health === "ok" ? "ok" : health === "err" ? "err" : ""}`} />
          {health === "ok" ? "API Connected" : health === "err" ? "API Offline" : "Checking API…"}
        </div>
      </header>

      {/* ── Body ── */}
      <main className="main">
        {/* Sidebar */}
        <nav className="sidebar" aria-label="Feature tabs">
          <div className="sidebar-label">Features</div>
          {TABS.map(t => (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              className={`tab-btn${tab === t.id ? " active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              <span className="tab-icon">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </nav>

        {/* Panel */}
        <section className="panel">
          <div className="panel-header">
            <h1 className="panel-title">{active.label}</h1>
            <p className="panel-sub">{active.sub}</p>
          </div>

          {tab === "compose" && <ComposeTab />}
          {tab === "subject" && <SubjectTab />}
          {tab === "reply"   && <ReplyTab />}
        </section>
      </main>
    </div>
  );
}
