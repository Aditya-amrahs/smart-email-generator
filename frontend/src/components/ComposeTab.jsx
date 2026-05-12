import { useState } from "react";
import { generateEmail } from "../api";
import ResultCard from "./ResultCard";

const STYLES = ["corporate", "friendly", "sales"];
const TONES  = ["formal", "professional", "friendly", "assertive", "empathetic", "casual"];

const DEFAULTS = {
  prompt: "",
  tone: "formal",
  style: "corporate",
  recipient_name: "",
  sender_name: "",
  additional_context: "",
};

/**
 * Compose Email Tab — maps to POST /generate-email (unified route)
 * Style dropdown value is sent as the `style` JSON field.
 */
export default function ComposeTab() {
  const [form, setForm] = useState(DEFAULTS);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
    setError(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const payload = {
        prompt: form.prompt,
        tone: form.tone,
        style: form.style,
        recipient_name: form.recipient_name || undefined,
        sender_name: form.sender_name || undefined,
        additional_context: form.additional_context || undefined,
      };
      const data = await generateEmail(payload);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <form className="card" onSubmit={handleSubmit}>
        {/* ── Style & Tone ── */}
        <p className="section-title">Email Style</p>
        <div className="form-grid" style={{ marginBottom: "1.25rem" }}>
          <div className="field">
            <label htmlFor="compose-style">
              Style <span className="required-star">*</span>
            </label>
            <select
              id="compose-style"
              value={form.style}
              onChange={e => set("style", e.target.value)}
            >
              {STYLES.map(s => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="compose-tone">
              Tone <span className="required-star">*</span>
            </label>
            <select
              id="compose-tone"
              value={form.tone}
              onChange={e => set("tone", e.target.value)}
            >
              {TONES.map(t => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ── What to write ── */}
        <p className="section-title">Content</p>
        <div className="form-grid full" style={{ marginBottom: "1.25rem" }}>
          <div className="field">
            <label htmlFor="compose-prompt">
              What should the email say? <span className="required-star">*</span>
            </label>
            <textarea
              id="compose-prompt"
              className="tall"
              placeholder="e.g. Ask Sales Team #1 to share the weekly sales report"
              value={form.prompt}
              onChange={e => set("prompt", e.target.value)}
              required
              minLength={5}
            />
          </div>
        </div>

        {/* ── Names ── */}
        <p className="section-title">People (Optional)</p>
        <div className="form-grid" style={{ marginBottom: "1.25rem" }}>
          <div className="field">
            <label htmlFor="compose-recipient">Recipient Name</label>
            <input
              id="compose-recipient"
              type="text"
              placeholder="e.g. Sales Team #1"
              value={form.recipient_name}
              onChange={e => set("recipient_name", e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="compose-sender">Your Name (Sender)</label>
            <input
              id="compose-sender"
              type="text"
              placeholder="e.g. Aditya"
              value={form.sender_name}
              onChange={e => set("sender_name", e.target.value)}
            />
          </div>
        </div>

        {/* ── Context ── */}
        <p className="section-title">Additional Context (Optional)</p>
        <div className="form-grid full" style={{ marginBottom: "1.5rem" }}>
          <div className="field">
            <label htmlFor="compose-context">Extra details for the AI</label>
            <textarea
              id="compose-context"
              placeholder="e.g. Need the report before 5 PM today."
              value={form.additional_context}
              onChange={e => set("additional_context", e.target.value)}
            />
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="form-footer">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => { setForm(DEFAULTS); setResult(null); setError(null); }}
          >
            Reset
          </button>
          <button
            id="btn-generate-email"
            type="submit"
            className="btn btn-primary"
            disabled={loading || !form.prompt.trim()}
          >
            {loading ? <><span className="spinner" /> Generating…</> : "✨ Generate Email"}
          </button>
        </div>

        {loading && (
          <div className="loading-row" style={{ marginTop: "0.75rem" }}>
            <span className="spinner" />
            Sending to <code style={{ color: "var(--accent2)", fontSize: "0.8rem" }}>/generate-email</code>…
          </div>
        )}

        {error && (
          <div className="error-box" style={{ marginTop: "0.75rem" }}>
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}
      </form>

      {result && <ResultCard result={result} mode="email" />}
    </div>
  );
}
