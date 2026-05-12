# Swagger Test Payloads

Use these sample request bodies in Swagger at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

## US06: Auto Subject Generation

Endpoint: `POST /generate-subject`

```json
{
  "email_body": "Dear Sales Team #1,\n\nPlease share the weekly sales report for this week by 5 PM today. I need it for the management review meeting and would appreciate it if you could include the latest numbers, trends, and any major highlights.\n\nRegards,\nAditya",
  "tone": "formal",
  "style": "corporate",
  "context": "Internal request for management review preparation"
}
```

## US07: Reply Generation

Endpoint: `POST /generate-reply`

```json
{
  "original_email": "Hi Aditya,\n\nCan you please confirm whether the client presentation deck will be ready by tomorrow afternoon? We need to send it for final review before the meeting.\n\nThanks,\nRohit",
  "reply_goal": "Confirm that the presentation deck will be ready by tomorrow afternoon and mention that the final review version will be shared before noon.",
  "tone": "professional",
  "style": "corporate",
  "recipient_name": "Rohit",
  "sender_name": "Aditya",
  "additional_context": "The draft is nearly complete and only minor edits are pending."
}
```

## US08: Corporate Style Email

Endpoint: `POST /generate-email/corporate`

```json
{
  "prompt": "Write an email asking Sales Team #1 to send the weekly sales report.",
  "tone": "formal",
  "recipient_name": "Sales Team #1",
  "sender_name": "Aditya",
  "additional_context": "The report is needed by 5 PM today for a management review meeting."
}
```

## US09: Friendly Style Email

Endpoint: `POST /generate-email/friendly`

```json
{
  "prompt": "Write an email asking Sales Team #1 to send the weekly sales report.",
  "tone": "friendly",
  "recipient_name": "Sales Team #1",
  "sender_name": "Aditya",
  "additional_context": "Keep it warm and polite, and mention that the report will help prepare for today’s review meeting."
}
```

## US10: Sales Style Email

Endpoint: `POST /generate-email/sales`

```json
{
  "prompt": "Write a sales-style email to encourage a client to book a demo for our new productivity platform.",
  "tone": "assertive",
  "recipient_name": "Priya",
  "sender_name": "Aditya",
  "additional_context": "Focus on time savings, faster team coordination, and include a clear call to action for a 15-minute demo this week."
}
```

## Optional generic route

If you want to test the style dropdown using one route instead, use `POST /generate-email`:

```json
{
  "prompt": "Write an email asking Sales Team #1 to send the weekly sales report.",
  "tone": "formal",
  "style": "sales",
  "recipient_name": "Sales Team #1",
  "sender_name": "Aditya",
  "additional_context": "Need it before 5 PM today."
}
```
