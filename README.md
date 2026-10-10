# Event Platform

A **micro-frontend event services platform** built with **React 19**, **Nx**, and **Webpack Module Federation**.
Each service (hall booking, photography, …) is an independently built and deployable app, loaded at runtime into a shared host shell.

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
```

| Project | Type | Port | Route | Description |
|---|---|---|---|---|
| `apps/shell` | Host | 4200 | `/` | Main container: navigation, routing, loads remotes |
| `apps/hallbooking` | Remote | 4202 | `/hallbooking/*` | Hall / venue booking module |
| `apps/photography` | Remote | 4201 | `/photography/*` | Photography services module |
| `libs/shared-ui` | Library | – | – | Shared React components |

## 🛠️ Tech stack

| Area | Tools |
|---|---|
| UI | React 19, React Router 6, Tailwind CSS |
| Monorepo | Nx 22 |
| Micro-frontends | Webpack Module Federation (`@module-federation/enhanced`) |
| Language | TypeScript 5.9 |
| Testing | Jest, Vitest, React Testing Library |
| Code quality | ESLint 9, Prettier |
| CI | GitHub Actions (`nx run-many -t lint test build`) |

## 🚀 Getting started

**Prerequisites:** Node.js 20+ and npm.

```bash
git clone https://github.com/ravindarballa/Event-Platform.git
cd Event-Platform
npm install
```

Run the whole platform (host + all remotes):

```bash
npx nx serve shell
```

Then open http://localhost:4200.

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
│   └── photography/    # remote app
├── libs/
│   └── shared-ui/      # shared components
├── .github/workflows/  # CI pipeline
└── nx.json             # Nx workspace config
```

## 🗺️ Roadmap

- [ ] Hall booking: venue listing, availability calendar, booking form
- [ ] Photography: packages, portfolio gallery, enquiry form
- [ ] Backend API with NestJS
- [ ] Authentication
- [ ] Deploy host and remotes (e.g. Vercel / Netlify)

## 👤 Author

**Ravindar Balla** – [GitHub](https://github.com/ravindarballa)

## 📄 License

MIT
