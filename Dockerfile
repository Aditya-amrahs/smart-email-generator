# ── Backend Dockerfile ──────────────────────────────────────────────────────
# Multi-stage: slim Python image for production

FROM python:3.12-slim AS base

WORKDIR /app

# Install deps first (layer cache)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source
COPY backend/ ./backend/
COPY .env.example .env.example

# Expose FastAPI port
EXPOSE 8000

# Run with uvicorn
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
