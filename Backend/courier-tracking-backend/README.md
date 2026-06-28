# 🛰 Courier Tracking Backend

Spring Boot REST API for real-time courier geolocation tracking, store proximity detection, and route simulation.

---

## Tech Stack

| Technology           | Version  | Purpose                                      |
|----------------------|----------|----------------------------------------------|
| Java                 | 25       | Language runtime                              |
| Spring Boot          | 4.0.3    | Application framework                         |
| Spring Data JPA      | –        | ORM / repository abstraction                  |
| H2 Database          | –        | In-memory relational database                 |
| Lombok               | –        | Boilerplate reduction (builders, getters, etc)|
| Jackson              | –        | JSON serialization / deserialization          |
| Maven Wrapper        | –        | Build tool (no local Maven install required)  |

---

## Getting Started

### Prerequisites

- **JDK 25+** installed and available on `PATH`

> ⚠️ **Spring Boot 4.0.3 requires JDK 25.** Verify with `java -version`. If you see an older version, install JDK 25 from [Oracle](https://www.oracle.com/java/technologies/downloads/) or via [SDKMAN](https://sdkman.io/) (`sdk install java 25-open`).
>
> **Troubleshooting:** Even if `java -version` shows 25, Maven may use a different JDK via `JAVA_HOME`. Make sure `JAVA_HOME` points to your JDK 25 installation:
> ```powershell
> # Check current JAVA_HOME (PowerShell)
> echo $env:JAVA_HOME
>
> # Set it to your JDK 25 path
> $env:JAVA_HOME = "C:\Program Files\Java\jdk-25"
>
> # Then re-run
> mvnw.cmd spring-boot:run
> ```

### Run

```bash
# macOS / Linux
./mvnw spring-boot:run

# Windows (PowerShell / CMD)
mvnw.cmd spring-boot:run
```

The server starts on **http://localhost:8080**. On startup, the route simulation begins automatically — no manual seeding required.

---

### H2 Console

While the application is running, the H2 database console is available at:

```
http://localhost:8080/h2-console
```

---

## Architecture & Design Patterns

### Observer Pattern

Every incoming courier location ping is published through the **`LocationEventPublisher`**. All beans implementing the **`LocationObserver`** interface are auto-discovered by Spring and notified in sequence:

```
CourierPingDTO
      │
      ▼
LocationEventPublisher.publish()
      │
      ├──► StoreProximityObserver   → Checks distance to all stores, logs entrance if < 100 m
      ├──► MovementTrackingObserver → Calculates incremental distance via Haversine, updates total
      └──► BreadcrumbRecorder       → Persists the GPS point as a breadcrumb entity
```

Adding a new observer is as simple as creating a `@Component` implementing `LocationObserver`.

### Strategy Pattern

Distance calculation is abstracted behind the **`DistanceStrategy`** interface:

```java
public interface DistanceStrategy {
    double calculate(double lat1, double lng1, double lat2, double lng2);
}
```

The active implementation, **`HaversineDistanceStrategy`**, computes great-circle distance. To switch algorithms (e.g., Vincenty), implement the interface and annotate with `@Primary`.

---

## Project Structure

```
src/main/java/com/example/courier_tracking_backend/
├── CourierTrackingBackendApplication.java   # Entry point, @EnableAsync
├── config/
│   └── ConcurrentMapConfig.java             # ConcurrentHashMap<String, CourierLocationDTO> bean
├── controller/
│   ├── CourierController.java               # /api/couriers endpoints
│   └── StoreController.java                 # /api/stores endpoints
├── model/
│   ├── dto/
│   │   ├── BreadcrumbHistoryDTO.java
│   │   ├── CourierEntranceFiltersDTO.java
│   │   ├── CourierInfoDTO.java
│   │   ├── CourierLastEntranceDTO.java
│   │   ├── CourierLocationDTO.java
│   │   ├── CourierPingDTO.java
│   │   ├── StoreDTO.java
│   │   ├── StoreEntranceFiltersDTO.java
│   │   └── StoreEntranceLogDTO.java
│   └── entity/
│       ├── Breadcrumb.java                  # GPS point history
│       ├── Courier.java                     # Courier master record
│       ├── Store.java                       # Migros store location
│       └── StoreEntranceLog.java            # Proximity event log
├── repository/
│   ├── BreadcrumbRepository.java
│   ├── CourierRepository.java
│   ├── StoreEntranceLogRepository.java
│   ├── StoreRepository.java
│   └── specification/
│       ├── CourierSpecification.java        # Dynamic JPA filters for courier queries
│       └── StoreEntranceLogSpecification.java
├── service/
│   ├── CourierInfoService.java              # Courier metadata & filtered queries
│   ├── CourierLocationService.java          # Location processing & breadcrumb retrieval
│   ├── LocationEventPublisher.java          # Observer publisher
│   ├── StoreEntranceLogService.java         # Store log queries
│   ├── StoreService.java                    # Store CRUD
│   ├── observer/
│   │   ├── LocationObserver.java            # Observer interface
│   │   ├── BreadcrumbRecorder.java
│   │   ├── MovementTrackingObserver.java
│   │   └── StoreProximityObserver.java
│   └── strategy/
│       ├── DistanceStrategy.java            # Strategy interface
│       └── HaversineDistanceStrategy.java
└── utils/
    ├── DataInitializer.java                 # Triggers simulation on ApplicationReadyEvent
    └── route_simulation/
        ├── RouteLoaderUtil.java             # Loads routes.json from classpath
        └── SimulationUtil.java              # Async multi-courier route replay
```

---

## API Reference

### Courier Endpoints — `/api/couriers`

| Method | Path                                            | Description                                     |
|--------|------------------------------------------------|-------------------------------------------------|
| POST   | `/api/couriers/locations`                       | Submit a courier location ping                   |
| GET    | `/api/couriers/locations/current`               | Real-time positions of all couriers              |
| GET    | `/api/couriers`                                 | List all couriers with metadata                  |
| GET    | `/api/couriers/{courierId}/info`                | Single courier info (distance, status, etc.)     |
| GET    | `/api/couriers/{courierId}/history`             | Breadcrumb trail (cursor-paginated, 250/page)    |
| GET    | `/api/couriers/{courierId}/store-entrance-logs` | Store entrance logs for one courier              |
| GET    | `/api/couriers/entrances`                       | Filtered list of courier last-entrances          |

#### Example — POST location ping

```json
POST /api/couriers/locations
{
  "courierId": "M-01",
  "lat": 40.9923,
  "lng": 29.1244,
  "timestamp": "2026-03-06T14:30:00"
}
```

### Store Endpoints — `/api/stores`

| Method | Path               | Description                          |
|--------|--------------------|--------------------------------------|
| GET    | `/api/stores`      | All Migros store locations           |
| GET    | `/api/stores/logs` | Filtered store entrance logs         |

---

## Data & Simulation

### Seed Data

- **Stores** are loaded from `resources/dummy-data/stores.json` and inserted via `data.sql` on startup.
- **Couriers** (M-01 through M-06) are also seeded via `data.sql`.

### Route Simulation

`SimulationUtil` runs asynchronously on `ApplicationReadyEvent`. It reads `resources/dummy-data/routes.json` and replays each route step-by-step by POSTing location pings to `http://localhost:8080/api/couriers/locations`. Each courier is assigned a different Istanbul district:

| Courier | District     |
|---------|-------------|
| M-01    | Ataşehir     |
| M-02    | Bağcılar     |
| M-03    | Beylikdüzü   |
| M-04    | Ortaköy      |
| M-05    | Novada       |
| M-06    | Caddebostan  |

---

## Key Implementation Details

| Topic                  | Detail                                                                                                                                                        |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Real-time store**    | `ConcurrentHashMap<String, CourierLocationDTO>` — injected as a Spring bean for thread-safe live reads, also "Is an easy Redis replacement" as the AI told me |
| **Proximity radius**   | 100 meters (Haversine)                                                                                                                                        |
| **Re-entry cooldown**  | 60 seconds — duplicate store entries within this window are ignored                                                                                           |
| **Breadcrumb paging**  | Cursor-based via `lastSeenId` query param; 250 records per page                                                                                               |
| **Dynamic filtering**  | JPA Specifications (`CourierSpecification`, `StoreEntranceLogSpecification`) for flexible query building                                                      |
| **CORS**               | `@CrossOrigin(origins = "*")` on both controllers for local development                                                                                       |


