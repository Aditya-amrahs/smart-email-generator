import { useState } from "react";

/** Reusable copy-to-clipboard button with confirmation flash */
export default function CopyButton({ text, label = "Copy", className = "" }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for non-HTTPS
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return copied ? (
    <span className="copy-success">✓ Copied!</span>
  ) : (
    <button id="btn-copy" className={`btn btn-ghost btn-sm ${className}`} onClick={handleCopy}>
      📋 {label}
    </button>
  );
}
