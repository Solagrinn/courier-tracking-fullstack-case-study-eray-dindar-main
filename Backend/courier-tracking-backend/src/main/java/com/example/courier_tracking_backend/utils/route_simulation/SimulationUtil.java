package com.example.courier_tracking_backend.utils.route_simulation;

import com.example.courier_tracking_backend.model.dto.CourierLocationDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class SimulationUtil {

    private final RestTemplate restTemplate = new RestTemplate();
    private final RouteLoaderUtil routeLoaderUtil;

    // Constructor injection
    public SimulationUtil(RouteLoaderUtil routeLoaderUtil) {
        this.routeLoaderUtil = routeLoaderUtil;
    }

    @Async
    public void runSimulation() {

        log.info("Starting multi-district courier simulation");

        Map<String, List<double[]>> routes =
                routeLoaderUtil.getRoutes();

        Map<String, String> courierRoutes = Map.of(
                "M-01", "atasehir",
                "M-02", "bagcilar",
                "M-03", "beylikduzu",
                "M-04", "ortakoy",
                "M-05", "novada",
                "M-06", "caddebostan"
        );

        // Determine longest route length
        int maxSteps = courierRoutes.values().stream()
                .map(routes::get)
                .filter(route -> route != null && !route.isEmpty())
                .mapToInt(List::size)
                .max()
                .orElse(0);

        int step = 0;

        // Loop until the longest route finishes
        while (step < maxSteps) {

            for (var entry : courierRoutes.entrySet()) {

                String courierId = entry.getKey();
                String district = entry.getValue();

                List<double[]> route = routes.get(district);

                // Skip if route missing or finished
                if (route == null || route.isEmpty() || step >= route.size()) {
                    continue;
                }

                double[] point = route.get(step);

                CourierLocationDTO request =
                        CourierLocationDTO.builder()
                                .courierId(courierId)
                                .lat(Math.round(point[0] * 100000.0) / 100000.0)
                                .lng(Math.round(point[1] * 100000.0) / 100000.0)
                                .timestamp(LocalDateTime.now())
                                .build();

                try {
                    restTemplate.postForEntity(
                            "http://localhost:8080/api/couriers/locations",
                            request,
                            Void.class
                    );
                } catch (Exception e) {
                    log.error("Failed to send location for courier {}: {}",
                            courierId, e.getMessage());
                }
            }

            step++;

            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                log.warn("Simulation interrupted");
                break;
            }
        }

        log.info("Simulation finished after {} steps", step);
    }
}