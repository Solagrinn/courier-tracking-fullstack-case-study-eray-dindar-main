package com.example.courier_tracking_backend.utils.route_simulation;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.*;

@Service
@Getter
public class RouteLoaderUtil {

    private final Map<String, List<double[]>> routes = new HashMap<>();

    public RouteLoaderUtil() {
        loadRoutes();
    }

    private void loadRoutes() {

        try {
            ObjectMapper mapper = new ObjectMapper();

            InputStream is =
                    new ClassPathResource("dummy-data/routes.json")
                            .getInputStream();

            JsonNode root = mapper.readTree(is);

            root.fieldNames().forEachRemaining(routeName -> {

                List<double[]> coords = new ArrayList<>();

                for (JsonNode node : root.get(routeName)) {
                    double lng = node.get(0).asDouble();
                    double lat = node.get(1).asDouble();

                    coords.add(new double[]{lat, lng});
                }

                routes.put(routeName, coords);
            });

        } catch (Exception e) {
            throw new RuntimeException("Route loading failed", e);
        }
    }
}