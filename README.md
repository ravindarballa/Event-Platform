# Event Platform

A **full-stack micro-frontend event services platform** built with **React 19**, **Nx**, **Webpack Module Federation**, **NestJS**, and **MongoDB**.
Each service (hall booking, photography, …) is an independently built and deployable frontend, loaded at runtime into a shared host shell, and backed by its own feature module in a NestJS API.

> 🚧 **Status:** Architecture and app scaffolding in place; feature screens are in progress.

![CI](https://github.com/ravindarballa/Event-Platform/actions/workflows/ci.yml/badge.svg)

---

## ✨ Why micro-frontends?

- **Independent apps** – each service can be developed, tested, and deployed on its own.
- **Lazy loading** – remotes are only downloaded when the user navigates to them.
- **Shared UI library** – common components (e.g. the navbar) live in one place.
- **Scalable** – new event services (catering, decoration, music…) can be added as new remotes without touching existing ones.

## 🏗️ Architecture

```
                ┌──────────────────────────┐
                │   shell (host) :4200     │
                │  Navbar + React Router   │
                └───────────┬──────────────┘
          lazy-loads via Module Federation
              ┌─────────────┴─────────────┐
              ▼                           ▼
   ┌─────────────────────┐     ┌─────────────────────┐
   │ hallbooking  :4202  │     │ photography  :4201  │
   │   (remote)          │     │   (remote)          │
   └─────────────────────┘     └─────────────────────┘

        libs/shared-ui  →  shared components (Navbar)

   shell proxies /api/*  ──►  api (NestJS) :3000  ──►  MongoDB :27017
                                 ├─ HallBookingModule   (libs/api/hall)
                                 └─ PhotographyModule   (libs/api/photography)
```

| Project | Type | Port | Route | Description |
|---|---|---|---|---|
| `apps/shell` | Host | 4200 | `/` | Main container: navigation, routing, loads remotes |
| `apps/hallbooking` | Remote | 4202 | `/hallbooking/*` | Hall / venue booking module |
| `apps/photography` | Remote | 4201 | `/photography/*` | Photography services module |
| `apps/api` | Backend | 3000 | `/api` | NestJS REST API |
| `apps/api-e2e` | Tests | – | – | End-to-end tests for the API |
| `libs/shared-ui` | Library | – | – | Shared React components |
| `libs/api/hall/*` | Library | – | – | Hall booking controller, service, Mongoose entity |
| `libs/api/photography/*` | Library | – | – | Photography controller, service, Mongoose entity |

Backend libraries follow the Nx **feature / data-access** split: `feature` holds the NestJS controller and module, `data-access` holds the Mongoose schema, DTOs and service.

## 🔌 API endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Server + MongoDB status |
| GET | `/api/hall-booking` | List hall bookings |
| GET | `/api/hall-booking/:id` | Get one booking |
| POST | `/api/hall-booking` | Create a booking |
| PUT | `/api/hall-booking/:id` | Update a booking |
| DELETE | `/api/hall-booking/:id` | Delete a booking |
| GET | `/api/photography` | List photography entries |
| GET | `/api/photography/:id` | Get one entry |
| POST | `/api/photography` | Create an entry |
| PATCH | `/api/photography/:id` | Update an entry |
| DELETE | `/api/photography/:id` | Delete an entry |

## 🛠️ Tech stack

| Area | Tools |
|---|---|
| UI | React 19, React Router 6, Tailwind CSS |
| Backend | NestJS 11, Mongoose 9 |
| Database | MongoDB |
| Monorepo | Nx 22 |
| Micro-frontends | Webpack Module Federation (`@module-federation/enhanced`) |
| Language | TypeScript 5.9 |
| Testing | Jest, Vitest, React Testing Library |
| Code quality | ESLint 9, Prettier |
| CI | GitHub Actions (`nx run-many -t lint test build`) |

## 🚀 Getting started

**Prerequisites:** Node.js 20+, npm, and MongoDB running locally on port 27017.
No MongoDB installed? Start one with Docker:

```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

```bash
git clone https://github.com/ravindarballa/Event-Platform.git
cd Event-Platform
npm install
```

Start the API (http://localhost:3000, health check at `/health`):

```bash
npx nx serve api
```

In a second terminal, run the frontend (host + all remotes):

```bash
npx nx serve shell
```

Then open http://localhost:4200. Requests to `/api` are proxied to the NestJS server.

Run a single remote on its own:

```bash
npx nx serve hallbooking   # http://localhost:4202
npx nx serve photography   # http://localhost:4201
```

## 📜 Common commands

| Command | What it does |
|---|---|
| `npx nx graph` | Visualise the project dependency graph |
| `npx nx build shell` | Production build of the host (and its remotes) |
| `npx nx run-many -t test` | Run tests in all projects |
| `npx nx run-many -t lint` | Lint all projects |
| `npx nx affected -t build` | Build only what changed |

## 📁 Project structure

```
Event-Platform/
├── apps/
│   ├── shell/          # host app
│   ├── hallbooking/    # remote app
│   ├── photography/    # remote app
│   ├── api/            # NestJS backend
│   └── api-e2e/        # API end-to-end tests
├── libs/
│   ├── shared-ui/      # shared React components
│   └── api/
│       ├── hall/           # hall booking feature + data-access
│       └── photography/    # photography feature + data-access
├── .github/workflows/  # CI pipeline
└── nx.json             # Nx workspace config
```

## 🗺️ Roadmap

- [ ] Hall booking: venue listing, availability calendar, booking form
- [ ] Photography: packages, portfolio gallery, enquiry form
- [x] NestJS API with MongoDB (hall booking & photography CRUD)
- [ ] Connect frontend screens to the API
- [ ] Request validation with DTOs (`class-validator`)
- [ ] Move MongoDB URI to an environment variable
- [ ] Authentication
- [ ] Deploy host and remotes (e.g. Vercel / Netlify)

## 👤 Author

**Ravindar Balla** – [GitHub](https://github.com/ravindarballa)

## 📄 License

MIT
