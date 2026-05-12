const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function post(endpoint, body) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(err.detail || "Request failed");
  }
  return res.json();
}

export async function checkHealth() {
  const res = await fetch(`${BASE_URL}/health`);
  return res.json();
}

/**
 * Generate an email.
 * Uses the unified /generate-email endpoint; style is included in the body.
 * @param {object} payload - { prompt, tone, style, recipient_name, sender_name, additional_context }
 */
export async function generateEmail(payload) {
  return post("/generate-email", payload);
}

/**
 * Generate a subject line from an existing email body.
 * @param {object} payload - { email_body, tone, style, context }
 */
export async function generateSubject(payload) {
  return post("/generate-subject", payload);
}

/**
 * Generate a reply to an email.
 * @param {object} payload - { original_email, reply_goal, tone, style, recipient_name, sender_name, additional_context }
 */
export async function generateReply(payload) {
  return post("/generate-reply", payload);
}
