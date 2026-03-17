# Portfolio Monorepo

Production-oriented monorepo for a personal portfolio with a Next.js frontend and an Express backend.

## Structure

- `frontend/` - Next.js app (UI + frontend API proxy)
- `backend/` - Express API (contact form + anti-spam + persistent lock controls)

## Tech Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Node.js, Express, Resend

## Quick Start

1. Backend setup:
   - Copy `backend/.env.example` to `backend/.env`
   - Fill values (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `FRONTEND_ORIGIN`, `PROXY_SHARED_SECRET`)
2. Frontend setup:
   - Copy `frontend/.env.example` to `frontend/.env.local`
   - Fill values (`BACKEND_URL`, `PROXY_SHARED_SECRET`)
3. Run backend:
   - `cd backend`
   - `npm install`
   - `npm run dev`
4. Run frontend:
   - `cd frontend`
   - `npm install`
   - `npm run dev`

## Production Readiness Features

- Modular backend architecture (`config`, `controllers`, `routes`, `services`, `validators`, `utils`)
- Proxy-protected backend route (`x-proxy-token`)
- Contact anti-spam controls:
  - Honeypot field trap
  - Submission timing validation
  - Per-sender/IP rate limiting
  - Per-email 24h cooldown
  - Sender softlock cooldown
  - Global daily send cap
- Persistent lock state across backend restarts (`backend/data/locks.json` at runtime)
- Smooth-scroll UX components and mobile-first section behavior

## Scripts

### Backend

- `npm run dev` - start Express server
- `npm run start` - start Express server

### Frontend

- `npm run dev` - start Next.js dev server
- `npm run build` - production build
- `npm run start` - run production build
- `npm run lint` - lint frontend code

## Deployment Notes

- Set all required env vars in deployment platform.
- Ensure frontend `PROXY_SHARED_SECRET` exactly matches backend value.
- Use a persistent volume or external store if lock persistence must survive container replacement.
