package com.example.courier_tracking_backend.config;

import com.example.courier_tracking_backend.model.dto.CourierLocationDTO;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.ConcurrentHashMap;

/**
 * Configuration for the in-memory courier location store.
 * Uses ConcurrentHashMap instead of Redis for portability.
 */
@Configuration
public class ConcurrentMapConfig {

    @Bean
    public ConcurrentHashMap<String, CourierLocationDTO> courierLocations() {
        return new ConcurrentHashMap<>();
    }
}

