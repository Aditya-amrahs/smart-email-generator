import { useState } from "react";
import { generateSubject } from "../api";
import ResultCard from "./ResultCard";

const STYLES = ["corporate", "friendly", "sales"];
const TONES  = ["formal", "professional", "friendly", "assertive", "empathetic", "casual"];

const DEFAULTS = {
  email_body: "",
  tone: "formal",
  style: "corporate",
  context: "",
};

/**
 * Subject Tab — maps to POST /generate-subject
 * User pastes an existing email body and gets an optimised subject line.
 */
export default function SubjectTab() {
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
        email_body: form.email_body,
        tone: form.tone,
        style: form.style,
        context: form.context || undefined,
      };
      const data = await generateSubject(payload);
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
        <p className="section-title">Email Body</p>
        <div className="form-grid full" style={{ marginBottom: "1.25rem" }}>
          <div className="field">
            <label htmlFor="subject-body">
              Paste your email body <span className="required-star">*</span>
            </label>
            <textarea
              id="subject-body"
              className="tall"
              placeholder={"Dear Sales Team #1,\n\nPlease share the weekly sales report…\n\nRegards,\nAditya"}
              value={form.email_body}
              onChange={e => set("email_body", e.target.value)}
              required
              minLength={10}
            />
          </div>
        </div>

        <p className="section-title">Style & Tone</p>
        <div className="form-grid" style={{ marginBottom: "1.25rem" }}>
          <div className="field">
            <label htmlFor="subject-style">Style <span className="required-star">*</span></label>
            <select id="subject-style" value={form.style} onChange={e => set("style", e.target.value)}>
              {STYLES.map(s => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="subject-tone">Tone <span className="required-star">*</span></label>
            <select id="subject-tone" value={form.tone} onChange={e => set("tone", e.target.value)}>
              {TONES.map(t => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        <p className="section-title">Context (Optional)</p>
        <div className="form-grid full" style={{ marginBottom: "1.5rem" }}>
          <div className="field">
            <label htmlFor="subject-context">Any extra context</label>
            <input
              id="subject-context"
              type="text"
              placeholder="e.g. Internal request for management review preparation"
              value={form.context}
              onChange={e => set("context", e.target.value)}
            />
          </div>
        </div>

        <div className="form-footer">
          <button type="button" className="btn btn-ghost btn-sm"
            onClick={() => { setForm(DEFAULTS); setResult(null); setError(null); }}>
            Reset
          </button>
          <button
            id="btn-generate-subject"
            type="submit"
            className="btn btn-primary"
            disabled={loading || !form.email_body.trim()}
          >
            {loading ? <><span className="spinner" /> Generating…</> : "🏷️ Generate Subject"}
          </button>
        </div>

        {loading && (
          <div className="loading-row" style={{ marginTop: "0.75rem" }}>
            <span className="spinner" />
            Sending to <code style={{ color: "var(--accent2)", fontSize: "0.8rem" }}>/generate-subject</code>…
          </div>
        )}

        {error && (
          <div className="error-box" style={{ marginTop: "0.75rem" }}>
            <span>⚠️</span><span>{error}</span>
          </div>
        )}
      </form>

      {result && <ResultCard result={result} mode="subject" />}
    </div>
  );
}
