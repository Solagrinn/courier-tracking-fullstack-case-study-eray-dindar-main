# 🗺 Courier Tracking Frontend

React + TypeScript single-page application for visualizing real-time courier locations, store proximity events, and courier route histories on interactive Leaflet maps.

---

## Tech Stack

| Technology           | Version  | Purpose                                          |
|----------------------|----------|--------------------------------------------------|
| React                | 19       | UI library                                        |
| TypeScript           | 5.9      | Type-safe JavaScript                              |
| Vite                 | 7        | Build tool & dev server                           |
| MUI (Material UI)    | 7        | Component library & theming                       |
| Leaflet              | 1.9      | Interactive maps                                  |
| react-leaflet        | 5        | React bindings for Leaflet                        |
| TanStack Query       | 5        | Server-state management, caching, auto-refetch    |
| React Router         | 7        | Client-side routing                               |
| Axios                | 1.x      | HTTP client                                       |
| date-fns             | 4        | Date formatting utilities                         |
| Prettier             | 3.8      | Code formatting                                   |
| ESLint               | 9        | Linting (with react-hooks & react-refresh plugins)|

---

## Getting Started

### Prerequisites

- **Node.js 18+** and **npm 9+**

### Install & Run

```bash
npm install
npm run dev
```

The app starts on **http://localhost:5173**. Make sure the backend is running on `http://localhost:8080` (or set `VITE_API_URL`).

### Available Scripts

| Script          | Description                            |
|-----------------|----------------------------------------|
| `npm run dev`   | Start Vite dev server with HMR         |
| `npm run build` | Type-check (`tsc -b`) then build       |
| `npm run lint`  | Run ESLint                             |
| `npm run preview` | Preview production build locally     |

### Environment Variables

| Variable        | Default                  | Description            |
|-----------------|--------------------------|------------------------|
| `VITE_API_URL`  | `http://localhost:8080`  | Backend API base URL   |

---

## Project Structure

```
src/
├── main.tsx                        # App bootstrap (React 19, BrowserRouter, QueryClient, MUI theme)
├── App.tsx                         # Route definitions
├── theme.ts                        # Custom MUI Migros theme
│
├── api/
│   └── client.ts                   # Axios instance (baseURL from VITE_API_URL)
│
├── assets/
│   └── Logo.tsx                    # Migros SVG logo component
│
├── components/
│   ├── cards/
│   │   ├── CourierInfoCard.tsx                    # Courier metadata card (name, distance, status, store)
│   │   ├── CourierLastEnteredStoreFiltersCard.tsx  # Filters for the Couriers page table
│   │   ├── DashboardStoreEntranceFiltersCard.tsx   # Filters for the Dashboard entrance logs
│   │   ├── DashboardStoreEntranceLogsCard.tsx      # Store entrance log list on Dashboard
│   │   ├── StoreTimelineCard.tsx                   # MUI Timeline of store visits on CourierDetail
│   │   └── ui/
│   │       └── CardUnavailable.tsx                 # Placeholder when no data available
│   │
│   ├── leaflet-maps/
│   │   ├── LeafletMap.tsx          # Full-page map (Dashboard) with all couriers & stores
│   │   ├── LeafletMiniMap.tsx      # Mini-map (CourierDetail) with single courier trail
│   │   ├── MapController.tsx       # Programmatic map centering on courier selection
│   │   ├── map-objects/
│   │   │   ├── CourierPath.tsx     # Polyline route overlay from breadcrumbs
│   │   │   ├── InStoreMarker.tsx   # Store entrance marker on mini-map
│   │   │   └── MopedMarker.tsx     # Animated moped icon for courier position
│   │   └── styles/
│   │       └── MapObjectStyles.css # Custom marker & path CSS
│   │
│   ├── tables/
│   │   └── LastEnteredStoreTable.tsx  # Sortable table of couriers & their last store
│   │
│   └── typography/
│       └── InfoRow.tsx             # Label + value row component
│
├── hooks/
│   ├── data-fetchers/              # TanStack Query hooks (each wraps one API endpoint)
│   │   ├── useCourierEntranceLogs.ts
│   │   ├── useCourierInfo.ts
│   │   ├── useCourierLastEntrances.ts
│   │   ├── useCourierLocationHistory.ts
│   │   ├── useLiveCourierLocations.ts
│   │   ├── useStoreEntanceLogs.ts
│   │   └── useStoreLocations.ts
│   │
│   └── logic/
│       ├── useUrlFilters.ts        # Generic hook to sync filter state ↔ URL search params
│       └── useSnappedRoute.ts      # Route-snapping hook (OSRM placeholder)
│
├── layout/
│   ├── MainLayout.tsx              # App shell with TopBar, Footer, Outlet
│   ├── TopBar.tsx                  # Navigation header with Migros logo
│   └── Footer.tsx                  # Page footer
│
└── pages/
    ├── Dashboard.tsx               # Live map + entrance logs + courier info sidebar
    ├── Couriers.tsx                # Courier list with filters + info card
    └── CourierDetail.tsx           # Single courier: info + mini-map + store timeline
```

---

## Pages & Routes

| Route                               | Page            | Description                                        |
|--------------------------------------|-----------------|----------------------------------------------------|
| `/`                                  | –               | Redirects to `/dashboard`                          |
| `/dashboard`                         | Dashboard       | Real-time map, store entrance logs, courier info   |
| `/couriers`                          | Couriers        | Courier table with filters and info card           |
| `/couriers/detail/:courierId`        | CourierDetail   | Mini-map, breadcrumb trail, store entrance timeline|

---

## Key Features

### 🗺 Interactive Leaflet Maps
- **Dashboard Map** — Displays all active couriers as animated moped markers and all Migros stores. Clicking a courier selects it and shows its info card.
- **Detail Mini-Map** — Shows a single courier's breadcrumb path as a polyline with store entrance markers.

### 🔄 Real-time Data with TanStack Query
All data-fetching hooks use TanStack Query with automatic polling/refetch intervals, providing near-real-time updates without WebSockets:
- `useLiveCourierLocations` — Polls current courier positions
- `useStoreEntanceLogs` — Polls store entrance log data
- `useCourierInfo` — Fetches individual courier metadata

### 🔗 URL-Persisted Filters (`useUrlFilters`)
A custom generic hook syncs any filter object to URL search parameters with configurable debounce (default 500 ms). This means:
- Refreshing the page preserves all active filters
- Filter state is shareable via URL
- Works across Dashboard, Couriers, and any future page

### 🛣 Route Snapping (`useSnappedRoute`)
Placeholder hook designed to integrate with an [OSRM Match Service](https://project-osrm.org/docs/v5.5.1/api/) for snapping raw GPS breadcrumbs to road geometry. Currently passes through raw coordinates with a fallback.

---

## Theming

The app uses a custom MUI theme (`theme.ts`) with Migros brand colors applied globally via `ThemeProvider`. `CssBaseline` ensures consistent cross-browser styling.

---

## Development Notes

- **Tree Shaking** — `@mui/icons-material` imports are tree-shaken by Vite; only used icons are bundled.
- **Strict Mode** — React `<StrictMode>` is enabled for development.
- **ESLint** — Configured with `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `typescript-eslint`, and `@tanstack/eslint-plugin-query`.
- **TypeScript** — Strict config via `tsconfig.app.json` with `tsc -b` used as a pre-build type-check step.
