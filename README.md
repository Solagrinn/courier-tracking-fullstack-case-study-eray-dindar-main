# 🚚 Courier Tracking – Fullstack Case Study

A full-stack web application for real-time courier geolocation tracking and visualization. The backend streams and processes courier location data, detects store proximity events, and exposes RESTful APIs. The frontend provides a rich, interactive dashboard with live maps, filters, and courier detail views.

---

## 📐 Architecture Overview

```
┌─────────────────────┐        HTTP/REST         ┌──────────────────────────┐
│                     │ ◄──────────────────────── │                          │
│   Spring Boot 4     │                           │  React 19 + TypeScript   │
│   (Java 25, H2 DB)  │ ────────────────────────► │  (Vite, MUI, Leaflet)    │
│                     │        JSON responses     │                          │
└─────────────────────┘                           └──────────────────────────┘
        │                                                   │
        ├── Observer Pattern (location events)              ├── Dashboard (live map + logs)
        ├── Strategy Pattern (distance calc)                ├── Couriers list + filters
        ├── Route Simulation (auto-generated)               └── Courier Detail (mini-map + timeline)
        └── H2 in-memory database
```

---

## 🛠 Tech Stack

| Layer    | Technology                                                                           |
|----------|--------------------------------------------------------------------------------------|
| Backend  | Java 25, Spring Boot 4.0.3, Spring Data JPA, H2 Database, Lombok                    |
| Frontend | React 19, TypeScript 5.9, Vite 7, MUI 7, Leaflet, TanStack Query, React Router v7   |

---

## 🚀 Quick Start

### Prerequisites

| Requirement         | Version    |
|---------------------|------------|
| Java (JDK)          | **25+**    |
| Node.js             | 18+        |
| npm                 | 9+         |

> ⚠️ **Spring Boot 4.0.3 requires JDK 25.** Verify with `java -version`. If you see an older version, install JDK 25 from [Oracle](https://www.oracle.com/java/technologies/downloads/) or via [SDKMAN](https://sdkman.io/) (`sdk install java 25-open`).
>
> **Troubleshooting:** Even if `java -version` shows 25, Maven may use a different JDK via `JAVA_HOME`. Make sure `JAVA_HOME` points to your JDK 25 installation:
> ```bash
> # Check current JAVA_HOME
> echo $JAVA_HOME            # macOS / Linux
> echo $env:JAVA_HOME        # Windows PowerShell
>
> # Set it (Windows PowerShell — adjust the path to your JDK 25 location)
> $env:JAVA_HOME = "C:\Program Files\Java\jdk-25.0.2"
>
> # Set it (macOS / Linux)
> export JAVA_HOME=$(/usr/libexec/java_home -v 25)
> ```

### 1. Clone the repository

```bash
git clone <repository-url>
cd courier-tracking-fullstack-case-study-eray-dindar
```

### 2. Start the Backend

```bash
cd Backend/courier-tracking-backend

# macOS / Linux
./mvnw spring-boot:run

# Windows (PowerShell / CMD)
mvnw.cmd spring-boot:run
```

The backend will start on **http://localhost:8080** and automatically begin the courier route simulation.

### 3. Start the Frontend

```bash
cd frontend/courier-tracking-frontend
npm install
npm run dev
```

The frontend will start on **http://localhost:5173** (default Vite port).

---

## 🎯 Design Patterns

### 1. Observer Pattern
The **`LocationEventPublisher`** acts as the subject/publisher. When a courier location ping arrives, it notifies all registered **`LocationObserver`** implementations:

| Observer                     | Responsibility                                                        |
|------------------------------|-----------------------------------------------------------------------|
| `StoreProximityObserver`     | Detects when a courier enters a 100m radius of a Migros store         |
| `MovementTrackingObserver`   | Accumulates total travel distance per courier using Haversine formula  |
| `BreadcrumbRecorder`         | Persists every location point as a breadcrumb for route history        |

### 2. Strategy Pattern
The **`DistanceStrategy`** interface abstracts distance calculation logic. The current implementation, **`HaversineDistanceStrategy`**, uses the Haversine formula to compute the great-circle distance between two geographic coordinates. This can be swapped with alternative implementations (e.g., Vincenty) without modifying consumers.

---

## 📂 Project Structure

```
├── Backend/
│   └── courier-tracking-backend/       # Spring Boot application
│       ├── controller/                 # REST API endpoints
│       ├── service/                    # Business logic
│       │   ├── observer/               # Observer pattern implementations
│       │   └── strategy/               # Strategy pattern implementations
│       ├── model/
│       │   ├── entity/                 # JPA entities (Courier, Store, Breadcrumb, StoreEntranceLog)
│       │   └── dto/                    # Data Transfer Objects
│       ├── repository/                 # Spring Data JPA repositories
│       │   └── specification/          # JPA Specifications for dynamic filtering
│       ├── config/                     # Bean configurations (ConcurrentHashMap)
│       └── utils/                      # Data initializer & route simulation
│
└── frontend/
    └── courier-tracking-frontend/      # React + TypeScript SPA
        └── src/
            ├── api/                    # Axios HTTP client
            ├── components/
            │   ├── cards/              # Reusable card components
            │   ├── leaflet-maps/       # Map components (LeafletMap, MiniMap)
            │   ├── tables/             # Data tables
            │   └── typography/         # Reusable text display components
            ├── hooks/
            │   ├── data-fetchers/      # TanStack Query hooks for API calls
            │   └── logic/              # Custom hooks (useUrlFilters, useSnappedRoute)
            ├── layout/                 # App shell (TopBar, Footer, MainLayout)
            └── pages/                  # Dashboard, Couriers, CourierDetail
```

---

## 🖥 Screens

### Dashboard (`/dashboard`)
- **Real-time map** with courier positions (moped markers) and Migros store locations
- **Store entrance logs** with filtering by courier, store, and date range
- **Courier info card** displayed on courier selection
- Filters are persisted in URL query parameters (page refresh retains the same view)

### Couriers (`/couriers`)
- List of all couriers showing ID, last known location, and total travel distance
- Search / filter functionality (by courier ID, store)
- Click on a courier row to navigate to the detail view

### Courier Detail (`/couriers/detail/:courierId`)
- Courier info card with full metadata
- **Mini-map** showing the courier's breadcrumb trail and entered stores
- **Store entrance timeline** with timestamps

---

## 📡 API Endpoints

### Courier Endpoints (`/api/couriers`)

| Method | Path                                  | Description                                      |
|--------|---------------------------------------|--------------------------------------------------|
| POST   | `/api/couriers/locations`             | Receive a streaming courier location ping         |
| GET    | `/api/couriers/locations/current`     | Get real-time current locations of all couriers   |
| GET    | `/api/couriers`                       | Get all couriers with info                        |
| GET    | `/api/couriers/{courierId}/info`      | Get single courier info (distance, status, etc.)  |
| GET    | `/api/couriers/{courierId}/history`   | Get courier breadcrumb history (paginated)        |
| GET    | `/api/couriers/{courierId}/store-entrance-logs` | Get store entrance logs for a courier  |
| GET    | `/api/couriers/entrances`             | Get filtered list of courier last-entrances       |

### Store Endpoints (`/api/stores`)

| Method | Path               | Description                                    |
|--------|--------------------|------------------------------------------------|
| GET    | `/api/stores`      | Get all Migros store locations                  |
| GET    | `/api/stores/logs` | Get filtered store entrance logs                |

---

## 🔁 Route Simulation

On startup, the backend automatically runs a **route simulation** that replays pre-defined courier routes from `routes.json`. Six couriers (`M-01` through `M-06`) traverse routes across different Istanbul districts (Ataşehir, Bağcılar, Beylikdüzü, Ortaköy, Novada, Caddebostan), posting location pings to the API. This populates the dashboard with live data without any manual setup.

---

## 📝 Notes

- **H2 Database**: The backend uses an in-memory H2 database — no external DB setup required. Data resets on every restart.
- **ConcurrentHashMap**: Real-time courier positions are held in an in-memory `ConcurrentHashMap` (injected as a Spring bean) for fast, thread-safe reads. This replaces the need for Redis in a development/demo context.
- **Store Proximity**: A courier entering within **100 meters** of a Migros store triggers a log entry. Re-entries to the same store within **1 minute** are ignored to prevent duplicate events.
- **URL State Persistence**: All filters on every screen are synced to URL search params via the custom `useUrlFilters` hook, so refreshing the page preserves the user's current view.


#  Thank you all for the opportunity