import CopyButton from "./CopyButton";

/**
 * Displays the generated email/subject result with badges and copy actions.
 * Props:
 *   result  - { subject, body, tone, style }
 *   mode    - "email" | "subject" | "reply"
 */
export default function ResultCard({ result, mode = "email" }) {
  if (!result) return null;

  const copyText =
    mode === "subject"
      ? result.subject
      : `Subject: ${result.subject}\n\n${result.body}`;

  return (
    <div className="result-card" id="result-card">
      <div className="result-header">
        <span className="result-title">
          {mode === "subject" ? "Generated Subject" : mode === "reply" ? "Generated Reply" : "Generated Email"}
        </span>
        <div className="badge-row">
          {result.tone && <span className="badge">{result.tone}</span>}
          {result.style && <span className="badge accent">{result.style}</span>}
          <CopyButton text={copyText} label={mode === "subject" ? "Copy Subject" : "Copy Email"} />
        </div>
      </div>

      <div className="result-subject">
        Subject: <span>{result.subject}</span>
      </div>

      {mode !== "subject" && result.body && (
        <pre className="result-body">{result.body}</pre>
      )}
    </div>
  );
}
