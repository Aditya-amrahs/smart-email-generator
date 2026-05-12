import { useState } from "react";
import { generateReply } from "../api";
import ResultCard from "./ResultCard";

const STYLES = ["corporate", "friendly", "sales"];
const TONES  = ["formal", "professional", "friendly", "assertive", "empathetic", "casual"];

const DEFAULTS = {
  original_email: "",
  reply_goal: "",
  tone: "professional",
  style: "corporate",
  recipient_name: "",
  sender_name: "",
  additional_context: "",
};

/**
 * Reply Tab — maps to POST /generate-reply
 * User pastes the received email and describes their reply goal.
 */
export default function ReplyTab() {
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
        original_email: form.original_email,
        reply_goal: form.reply_goal,
        tone: form.tone,
        style: form.style,
        recipient_name: form.recipient_name || undefined,
        sender_name: form.sender_name || undefined,
        additional_context: form.additional_context || undefined,
      };
      const data = await generateReply(payload);
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

        <p className="section-title">Original Email</p>
        <div className="form-grid full" style={{ marginBottom: "1.25rem" }}>
          <div className="field">
            <label htmlFor="reply-original">
              Paste the email you received <span className="required-star">*</span>
            </label>
            <textarea
              id="reply-original"
              className="tall"
              placeholder={"Hi Aditya,\n\nCan you please confirm whether the client presentation deck will be ready by tomorrow afternoon?\n\nThanks,\nRohit"}
              value={form.original_email}
              onChange={e => set("original_email", e.target.value)}
              required
              minLength={10}
            />
          </div>
        </div>

        <p className="section-title">Your Reply Goal</p>
        <div className="form-grid full" style={{ marginBottom: "1.25rem" }}>
          <div className="field">
            <label htmlFor="reply-goal">
              What do you want your reply to achieve? <span className="required-star">*</span>
            </label>
            <textarea
              id="reply-goal"
              placeholder="e.g. Confirm the deck will be ready by tomorrow noon and mention only minor edits remain"
              value={form.reply_goal}
              onChange={e => set("reply_goal", e.target.value)}
              required
              minLength={5}
            />
          </div>
        </div>

        <p className="section-title">Style & Tone</p>
        <div className="form-grid" style={{ marginBottom: "1.25rem" }}>
          <div className="field">
            <label htmlFor="reply-style">Style <span className="required-star">*</span></label>
            <select id="reply-style" value={form.style} onChange={e => set("style", e.target.value)}>
              {STYLES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="reply-tone">Tone <span className="required-star">*</span></label>
            <select id="reply-tone" value={form.tone} onChange={e => set("tone", e.target.value)}>
              {TONES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
            </select>
          </div>
        </div>

        <p className="section-title">People (Optional)</p>
        <div className="form-grid" style={{ marginBottom: "1.25rem" }}>
          <div className="field">
            <label htmlFor="reply-recipient">Recipient Name</label>
            <input id="reply-recipient" type="text" placeholder="e.g. Rohit"
              value={form.recipient_name} onChange={e => set("recipient_name", e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="reply-sender">Your Name (Sender)</label>
            <input id="reply-sender" type="text" placeholder="e.g. Aditya"
              value={form.sender_name} onChange={e => set("sender_name", e.target.value)} />
          </div>
        </div>

        <p className="section-title">Additional Context (Optional)</p>
        <div className="form-grid full" style={{ marginBottom: "1.5rem" }}>
          <div className="field">
            <label htmlFor="reply-context">Extra detail for the AI</label>
            <textarea id="reply-context"
              placeholder="e.g. The draft is nearly complete and only minor edits are pending"
              value={form.additional_context}
              onChange={e => set("additional_context", e.target.value)} />
          </div>
        </div>

        <div className="form-footer">
          <button type="button" className="btn btn-ghost btn-sm"
            onClick={() => { setForm(DEFAULTS); setResult(null); setError(null); }}>
            Reset
          </button>
          <button
            id="btn-generate-reply"
            type="submit"
            className="btn btn-primary"
            disabled={loading || !form.original_email.trim() || !form.reply_goal.trim()}
          >
            {loading ? <><span className="spinner" /> Generating…</> : "↩️ Generate Reply"}
          </button>
        </div>

        {loading && (
          <div className="loading-row" style={{ marginTop: "0.75rem" }}>
            <span className="spinner" />
            Sending to <code style={{ color: "var(--accent2)", fontSize: "0.8rem" }}>/generate-reply</code>…
          </div>
        )}

        {error && (
          <div className="error-box" style={{ marginTop: "0.75rem" }}>
            <span>⚠️</span><span>{error}</span>
          </div>
        )}
      </form>

      {result && <ResultCard result={result} mode="reply" />}
    </div>
  );
}
