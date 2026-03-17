# Backend (Express + Resend)

This backend hosts the contact API with modular structure and production-oriented safeguards.

## Directory Layout

- `server.js` - thin entrypoint bootstrap
- `src/config` - environment and runtime config
- `src/controllers` - request handlers
- `src/routes` - route registration
- `src/services` - email sending and lock persistence
- `src/validators` - payload validation rules
- `src/utils` - reusable helpers
- `data/locks.json` - runtime lock persistence file

## Endpoints

- `GET /health` - health check
- `POST /api/contact` - send contact message via Resend

## Setup

1. Copy `.env.example` to `.env`.
2. Fill in required values:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL`
   - `FRONTEND_ORIGIN`
   - `PROXY_SHARED_SECRET` (must match frontend)
3. Install and run:

```bash
npm install
npm run dev
```

Default server URL: `http://localhost:4000`

## Security Controls

- Proxy token enforcement (`x-proxy-token`)
- CORS origin allowlist
- Server-side payload validation
- Honeypot trap (`company`)
- Submission timing validation
- Per-sender/IP rate limiting
- Per-email cooldown lock
- Sender softlock cooldown
- Global daily email limit
- Persistent lock state across restarts
