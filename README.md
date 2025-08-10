# ActorHub – Full-Stack Take-Home

Full-stack app that fetches the cast of TV show **“Under the Dome”** from TVMaze, caches results in memory (with TTL and optional **prewarm on startup**), lets you **add/delete comments per actor** (persisted to a `.txt` file), and displays everything in a modern, responsive React UI.

> Stack: **Node.js + Express + TypeScript** (server) · **React + Vite + TypeScript** (client) · **Axios** · **React Query** · **Tailwind** (dark mode)  
> Bonus implemented: **Prewarm cache** on server startup.

---

## Features

- **Web API** (Express) that calls the external API: `https://api.tvmaze.com/shows/1/cast`.
- **In-memory cache** (NodeCache) with configurable **TTL** (default 5m) and **manual delete per actor**.
- **Config-driven**: change cache TTL via config/env.
- **Comments**: Add/delete per actor; persisted line-by-line as JSON to `data/comments.txt`.
- **Client** (React + Vite):
  - Responsive layout (sidebar list of IDs, details panel, comments).
  - **Dark mode** (toggle + persistence).
  - Loading skeletons, error states with retry.
  - Optional **URL sharing** via Router: `/actor/:id`.
- **Bonus**: Cache **prewarm** on server start.

---

## Monorepo structure

.
├── server/ # Backend (Node + Express + TS)
├── package-lock.json
├── package.json
├── request.rest
├── src
│   ├── app.ts
│   ├── cache
│   │   └── cache.ts
│   ├── config
│   │   └── config.ts
│   ├── controllers
│   │   ├── cacheController.ts
│   │   ├── castController.ts
│   │   └── commentController.ts
│   ├── middlewares
│   │   ├── asyncHandler.ts
│   │   ├── errorHandler.ts
│   │   └── parseId.ts
│   ├── models
│   │   ├── actorModel.ts
│   │   └── commentModel.ts
│   ├── routes
│   │   ├── cacheRoutes.ts
│   │   ├── castRoutes.ts
│   │   └── commentRoutes.ts
│   ├── server.ts
│   ├── services
│   │   ├── cacheService.ts
│   │   ├── castService.ts
│   │   └── commentService.ts
│   └── utils
│       └── http.ts
└── tsconfig.json
│
└── client/ # Frontend (React + Vite + TS)
├── package-lock.json
├── package.json
├── public
│   └── vite.svg
├── README.md
├── src
│   ├── App.tsx
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── ActorCard.tsx
│   │   ├── CastList.tsx
│   │   ├── CommentForm.tsx
│   │   ├── ErrorState.tsx
│   │   ├── Header.tsx
│   │   └── Loading.tsx
│   ├── hooks
│   │   ├── useCast.ts
│   │   └── useComments.ts
│   ├── index.css
│   ├── lib
│   │   └── api.ts
│   ├── main.tsx
│   ├── pages
│   │   └── Home.tsx
│   ├── types.ts
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts


## Getting started

### Prerequisites
- Node.js **v20**+
- npm

### 1) Install

# From repo root
cd server && npm i
cd ../client && npm i
2) Configure env
Server (server/.env):

env
PORT=3000
CACHE_TTL_SECONDS=300   # 5 minutes by default (configurable)
PREWARM_CACHE=true      # Bonus: fetch+cache on startup
CORS_ORIGIN=http://localhost:5173
Client (Option A – proxy): client/vite.config.ts has:

ts
server: { proxy: { '/api': 'http://localhost:3000' } }
Then set API base to /api in client/src/lib/api.ts.

Client (Option B – env var): create client/.env.local:

env
VITE_API_BASE_URL=http://localhost:3000/api
Choose A or B. For dev, proxy is simplest.

3) Run (dev)

# Terminal 1
cd server
npm run dev     # nodemon + ts-node, prints: "Server listening on port 3000"

# Terminal 2
cd client
npm run dev     # Vite at http://localhost:5173
