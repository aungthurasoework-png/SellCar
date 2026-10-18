# AutoMatch AI

Responsive P2P used-car marketplace prototype built with React, Vite, custom CSS, Express, and Lucide icons.

## Features
- Responsive discovery page with make, model, budget, and AI-score filters
- Listing cards with save/favorite interactions and AI deal-score styling
- Listing detail view with seller profile, vehicle specs, and an illustrative vehicle health/value audit
- AI concierge sidebar with prompt starters for common vehicle issues, negotiation messages, and price context
- Multi-step sell flow with simulated VIN autofill, local image previews, AI-assisted description generation, and a sample price range
- Express API starter for health checks, inventory filtering, detail lookup, and draft listing submission

## Run locally

Requirements: Node.js 18+

```bash
npm install
npm run dev
```

Vite prints the local development URL. In another terminal, start the API with:

```bash
npm run server
```

API endpoints:
- `GET /api/health`
- `GET /api/cars?make=Honda&maxPrice=25000&minScore=90`
- `GET /api/cars/:id`
- `POST /api/listings` with JSON fields `year`, `make`, `model`, `mileage`, and optional `price`

## Demo limitations / production checklist
- Listing inventory, AI scores, history notes, and price range are sample data. The app does not connect to live market feeds, vehicle-history databases, VIN providers, or a real LLM.
- Chat responses are local demo responses, not a live AI integration.
- Photos are previewed in the browser only. Uploads are not stored.
- Add authentication, database persistence, image storage, VIN decoding, moderation, rate limiting, CSRF/security headers, privacy/consent flows, and a real AI provider before production.
- Price and vehicle-history statements must be verified with trustworthy external data. Never present the demo audit as a mechanical diagnosis or a verified history report.
